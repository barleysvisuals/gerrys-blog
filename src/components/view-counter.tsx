"use client";

import { useEffect, useState } from "react";
import { Eye } from "lucide-react";

import { getSupabaseBrowserClient } from "@/lib/supabase/client";

type ViewCounterProps = {
  slug: string;
};

type ViewResponse = {
  count: number;
};

const numberFormatter = new Intl.NumberFormat("de-DE");

export function ViewCounter({ slug }: ViewCounterProps) {
  const [count, setCount] = useState<number | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    const controller = new AbortController();
    const storageKey = `gerry:viewed:v3:${slug}`;
    let method = "POST";

    try {
      if (sessionStorage.getItem(storageKey)) {
        method = "GET";
      } else {
        sessionStorage.setItem(storageKey, "pending");
      }
    } catch {
      // Privacy settings can disable sessionStorage. The counter still works.
    }

    async function requestViewsFromApi(requestMethod: string) {
      const response = await fetch(`/api/views/${encodeURIComponent(slug)}`, {
        method: requestMethod,
        cache: "no-store",
        signal: controller.signal
      });

      if (!response.ok) {
        throw new Error("Aufrufzahl konnte nicht geladen werden.");
      }

      return (await response.json()) as ViewResponse;
    }

    async function requestViewsDirectly(requestMethod: string): Promise<ViewResponse> {
      const supabase = getSupabaseBrowserClient();

      if (requestMethod === "POST") {
        const { data, error } = await supabase.rpc("increment_post_view", {
          post_slug: slug,
        });

        if (error) {
          throw error;
        }

        return { count: Number(data) };
      }

      const { data, error } = await supabase
        .from("post_views")
        .select("view_count")
        .eq("slug", slug)
        .maybeSingle();

      if (error) {
        throw error;
      }

      return { count: data?.view_count ?? 0 };
    }

    async function requestViews(requestMethod: string) {
      try {
        return await requestViewsDirectly(requestMethod);
      } catch (directError) {
        try {
          return await requestViewsFromApi(requestMethod);
        } catch (apiError) {
          console.error("Aufrufzahl konnte nicht geladen werden.", {
            directError,
            apiError,
          });
          throw apiError;
        }
      }
    }

    async function loadViews() {
      try {
        const data = await requestViews(method);
        setCount(data.count);
        setStatus("ready");

        if (method === "POST") {
          try {
            sessionStorage.setItem(storageKey, "counted");
          } catch {
            // Ignore unavailable browser storage.
          }
        }
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }

        if (method === "POST") {
          try {
            sessionStorage.removeItem(storageKey);
          } catch {
            // Ignore unavailable browser storage.
          }

          try {
            const data = await requestViews("GET");
            setCount(data.count);
            setStatus("ready");
            return;
          } catch {
            // The visible fallback below replaces an endless loading state.
          }
        }

        setStatus("error");
      }
    }

    void loadViews();

    return () => controller.abort();
  }, [slug]);

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
