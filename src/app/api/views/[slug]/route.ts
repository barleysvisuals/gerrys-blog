import { NextResponse } from "next/server";

type RouteContext = {
  params: Promise<{ slug: string }>;
};

type SupabaseRow = {
  view_count: number;
};

const validSlugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function getSupabaseConfig() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? process.env.SUPABASE_URL;
  const key =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
    process.env.SUPABASE_PUBLISHABLE_KEY;

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

async function getValidSlug(context: RouteContext) {
  const { slug } = await context.params;
  return slug.length <= 120 && validSlugPattern.test(slug) ? slug : null;
}

export async function GET(_request: Request, context: RouteContext) {
  const slug = await getValidSlug(context);
  const config = getSupabaseConfig();

  if (!slug) {
    return NextResponse.json({ error: "Beitrag nicht gefunden." }, { status: 404 });
  }

  if (!config) {
    return NextResponse.json({ error: "Aufrufzähler nicht konfiguriert." }, { status: 503 });
  }

  const query = new URLSearchParams({
    slug: `eq.${slug}`,
    select: "view_count",
    limit: "1"
  });
  const response = await fetch(`${config.url}/rest/v1/post_views?${query}`, {
    headers: supabaseHeaders(config.key),
    cache: "no-store"
  });

  if (!response.ok) {
    return NextResponse.json({ error: "Aufrufzahl konnte nicht geladen werden." }, { status: 502 });
  }

  const rows = (await response.json()) as SupabaseRow[];
  return NextResponse.json(
    { count: rows[0]?.view_count ?? 0 },
    { headers: { "Cache-Control": "no-store" } }
  );
}

export async function POST(_request: Request, context: RouteContext) {
  const slug = await getValidSlug(context);
  const config = getSupabaseConfig();

  if (!slug) {
    return NextResponse.json({ error: "Beitrag nicht gefunden." }, { status: 404 });
  }

  if (!config) {
    return NextResponse.json({ error: "Aufrufzähler nicht konfiguriert." }, { status: 503 });
  }

  const response = await fetch(`${config.url}/rest/v1/rpc/increment_post_view`, {
    method: "POST",
    headers: supabaseHeaders(config.key),
    body: JSON.stringify({ post_slug: slug }),
    cache: "no-store"
  });

  if (!response.ok) {
    return NextResponse.json({ error: "Aufruf konnte nicht gezählt werden." }, { status: 502 });
  }

  const count = (await response.json()) as number;
  return NextResponse.json(
    { count },
    { headers: { "Cache-Control": "no-store" } }
  );
}
