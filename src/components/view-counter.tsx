"use client";

import { useEffect, useState } from "react";
import { Eye } from "lucide-react";

type ViewCounterProps = {
  slug: string;
};

type ViewResponse = {
  count: number;
  requestId?: string;
};

const numberFormatter = new Intl.NumberFormat("de-DE");

export function ViewCounter({ slug }: ViewCounterProps) {
  const [count, setCount] = useState<number | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [requestId] = useState(() =>
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(36).slice(2)}`,
  );

  useEffect(() => {
    const controller = new AbortController();
    const correlationId = requestId;

    async function requestViews(requestMethod: "GET" | "POST") {
      const response = await fetch(`/api/views/${encodeURIComponent(slug)}`, {
        method: requestMethod,
        cache: "no-store",
        headers: { "x-view-request-id": correlationId },
        signal: controller.signal,
      });

      if (!response.ok) {
        const responseRequestId = response.headers.get("x-view-request-id");
        throw new Error(
          `Aufrufzahl konnte nicht geladen werden (${response.status}, ${responseRequestId ?? "ohne ID"}).`,
        );
      }

      return (await response.json()) as ViewResponse;
    }

    async function loadViews() {
      try {
        const data = await requestViews("POST");
        setCount(data.count);
        setStatus("ready");
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }

        console.error("Aufruf konnte nicht gezählt werden.", error);

        try {
          const data = await requestViews("GET");
          setCount(data.count);
          setStatus("ready");
          return;
        } catch (readError) {
          console.error("Aufrufzahl konnte auch nicht gelesen werden.", readError);
        }

        setStatus("error");
      }
    }

    void loadViews();

    return () => controller.abort();
  }, [requestId, slug]);

  return (
    <span
      className="inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-full border border-petrol/20 bg-petrol/10 px-4 py-2 font-semibold text-petrol-dark shadow-sm sm:w-auto"
      aria-live="polite"
      aria-busy={status === "loading"}
      title={status === "error" ? "Die Aufrufzahl konnte gerade nicht aktualisiert werden." : undefined}
    >
      <Eye size={18} strokeWidth={2.25} aria-hidden="true" />
      <span>
        {status === "loading" && "Aufrufe werden geladen"}
        {status === "error" && "Aufrufe nicht verfügbar"}
        {status === "ready" && count !== null && (
          <>
            {numberFormatter.format(count)} {count === 1 ? "Aufruf" : "Aufrufe"}
          </>
        )}
      </span>
    </span>
  );
}
