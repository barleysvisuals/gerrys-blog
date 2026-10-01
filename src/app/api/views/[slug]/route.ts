import { NextResponse } from "next/server";

import { supabasePublicConfig } from "@/lib/supabase/public-config";

export const dynamic = "force-dynamic";

type RouteContext = {
  params: Promise<{ slug: string }>;
};

type SupabaseRow = {
  view_count: number;
};

const validSlugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function getSupabaseConfig() {
  const url =
    process.env.NEXT_PUBLIC_SUPABASE_URL ??
    process.env.SUPABASE_URL ??
    supabasePublicConfig.url;
  const key =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
    process.env.SUPABASE_PUBLISHABLE_KEY ??
    supabasePublicConfig.publishableKey;

  if (!url || !key) {
    return null;
  }

  return { url: url.replace(/\/$/, ""), key };
}

function supabaseHeaders(key: string) {
  return {
    apikey: key,
    "Content-Type": "application/json"
  };
}

function getRequestId(request: Request) {
  const suppliedId = request.headers.get("x-view-request-id");
  return suppliedId && /^[a-zA-Z0-9-]{8,80}$/.test(suppliedId)
    ? suppliedId
    : crypto.randomUUID();
}

function responseHeaders(requestId: string) {
  return {
    "Cache-Control": "no-store, max-age=0",
    "x-view-request-id": requestId,
  };
}

function logCounterEvent(details: {
  requestId: string;
  operation: "read" | "increment";
  slug: string;
  outcome: "success" | "error";
  durationMs: number;
  status?: number;
  upstreamCode?: string;
}) {
  const message = JSON.stringify({ event: "post-view-counter", ...details });
  if (details.outcome === "error") {
    console.error(message);
  } else {
    console.info(message);
  }
}

async function readErrorCode(response: Response) {
  try {
    const payload = (await response.clone().json()) as { code?: unknown };
    return typeof payload.code === "string" ? payload.code : undefined;
  } catch {
    return undefined;
  }
}

function errorResponse(message: string, status: number, requestId: string) {
  return NextResponse.json(
    { error: message, requestId },
    { status, headers: responseHeaders(requestId) },
  );
}

async function getValidSlug(context: RouteContext) {
  const { slug } = await context.params;
  return slug.length <= 120 && validSlugPattern.test(slug) ? slug : null;
}

export async function GET(request: Request, context: RouteContext) {
  const startedAt = performance.now();
  const requestId = getRequestId(request);
  const slug = await getValidSlug(context);
  const config = getSupabaseConfig();

  if (!slug) {
    return errorResponse("Beitrag nicht gefunden.", 404, requestId);
  }

  if (!config) {
    logCounterEvent({
      requestId,
      operation: "read",
      slug,
      outcome: "error",
      durationMs: Math.round(performance.now() - startedAt),
      status: 503,
      upstreamCode: "missing-config",
    });
    return errorResponse("Aufrufzähler nicht konfiguriert.", 503, requestId);
  }

  const query = new URLSearchParams({
    slug: `eq.${slug}`,
    select: "view_count",
    limit: "1"
  });
  let response: Response;
  try {
    response = await fetch(`${config.url}/rest/v1/post_views?${query}`, {
      headers: supabaseHeaders(config.key),
      cache: "no-store",
      signal: AbortSignal.timeout(8_000),
    });
  } catch (error) {
    logCounterEvent({
      requestId,
      operation: "read",
      slug,
      outcome: "error",
      durationMs: Math.round(performance.now() - startedAt),
      status: 502,
      upstreamCode: error instanceof Error ? error.name : "network-error",
    });
    return errorResponse("Aufrufzahl konnte nicht geladen werden.", 502, requestId);
  }

  if (!response.ok) {
    logCounterEvent({
      requestId,
      operation: "read",
      slug,
      outcome: "error",
      durationMs: Math.round(performance.now() - startedAt),
      status: response.status,
      upstreamCode: await readErrorCode(response),
    });
    return errorResponse("Aufrufzahl konnte nicht geladen werden.", 502, requestId);
  }

  const rows = (await response.json()) as SupabaseRow[];
  const count = rows[0]?.view_count ?? 0;
  logCounterEvent({
    requestId,
    operation: "read",
    slug,
    outcome: "success",
    durationMs: Math.round(performance.now() - startedAt),
    status: response.status,
  });
  return NextResponse.json(
    { count, requestId },
    { headers: responseHeaders(requestId) },
  );
}

export async function POST(request: Request, context: RouteContext) {
  const startedAt = performance.now();
  const requestId = getRequestId(request);
  const slug = await getValidSlug(context);
  const config = getSupabaseConfig();

  if (!slug) {
    return errorResponse("Beitrag nicht gefunden.", 404, requestId);
  }

  if (!config) {
    logCounterEvent({
      requestId,
      operation: "increment",
      slug,
      outcome: "error",
      durationMs: Math.round(performance.now() - startedAt),
      status: 503,
      upstreamCode: "missing-config",
    });
    return errorResponse("Aufrufzähler nicht konfiguriert.", 503, requestId);
  }

  let response: Response;
  try {
    response = await fetch(`${config.url}/rest/v1/rpc/increment_post_view`, {
      method: "POST",
      headers: supabaseHeaders(config.key),
      body: JSON.stringify({ post_slug: slug }),
      cache: "no-store",
      signal: AbortSignal.timeout(8_000),
    });
  } catch (error) {
    logCounterEvent({
      requestId,
      operation: "increment",
      slug,
      outcome: "error",
      durationMs: Math.round(performance.now() - startedAt),
      status: 502,
      upstreamCode: error instanceof Error ? error.name : "network-error",
    });
    return errorResponse("Aufruf konnte nicht gezählt werden.", 502, requestId);
  }

  if (!response.ok) {
    logCounterEvent({
      requestId,
      operation: "increment",
      slug,
      outcome: "error",
      durationMs: Math.round(performance.now() - startedAt),
      status: response.status,
      upstreamCode: await readErrorCode(response),
    });
    return errorResponse("Aufruf konnte nicht gezählt werden.", 502, requestId);
  }

  const value = await response.json();
  const count = Number(value);
  if (!Number.isSafeInteger(count) || count < 0) {
    logCounterEvent({
      requestId,
      operation: "increment",
      slug,
      outcome: "error",
      durationMs: Math.round(performance.now() - startedAt),
      status: 502,
      upstreamCode: "invalid-count",
    });
    return errorResponse("Aufrufzähler lieferte eine ungültige Antwort.", 502, requestId);
  }

  logCounterEvent({
    requestId,
    operation: "increment",
    slug,
    outcome: "success",
    durationMs: Math.round(performance.now() - startedAt),
    status: response.status,
  });
  return NextResponse.json(
    { count, requestId },
    { headers: responseHeaders(requestId) },
  );
}
