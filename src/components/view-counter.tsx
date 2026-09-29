"use client";

import { useEffect, useState } from "react";
import { Eye } from "lucide-react";

type ViewCounterProps = {
  slug: string;
};

type ViewResponse = {
  count: number;
};

export function ViewCounter({ slug }: ViewCounterProps) {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const storageKey = `gerry:viewed:${slug}`;
    let method = "POST";

    try {
      if (sessionStorage.getItem(storageKey)) {
        method = "GET";
      } else {
        sessionStorage.setItem(storageKey, "1");
      }
    } catch {
      // Privacy settings can disable sessionStorage. The counter still works.
    }

    async function loadViews() {
      try {
        const response = await fetch(`/api/views/${encodeURIComponent(slug)}`, {
          method,
          cache: "no-store",
          signal: controller.signal
        });

        if (!response.ok) {
          throw new Error("Aufrufzahl konnte nicht geladen werden.");
        }

        const data = (await response.json()) as ViewResponse;
        setCount(data.count);
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
        }
      }
    }

    void loadViews();

    return () => controller.abort();
  }, [slug]);

  return (
    <span className="inline-flex items-center gap-2" aria-live="polite">
      <Eye size={15} aria-hidden="true" />
      {count === null ? "Aufrufe …" : `${count.toLocaleString("de-DE")} ${count === 1 ? "Aufruf" : "Aufrufe"}`}
    </span>
  );
}
