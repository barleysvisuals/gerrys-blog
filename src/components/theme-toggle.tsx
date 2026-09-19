"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

type Theme = "light" | "dark";

const themeStorageKey = "gerry-theme";

function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
  document.documentElement.style.colorScheme = theme;
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const frame = window.requestAnimationFrame(() => {
      setTheme(document.documentElement.classList.contains("dark") ? "dark" : "light");
    });

    function followSystemTheme(event: MediaQueryListEvent) {
      if (localStorage.getItem(themeStorageKey)) {
        return;
      }

      const nextTheme = event.matches ? "dark" : "light";
      applyTheme(nextTheme);
      setTheme(nextTheme);
    }

    mediaQuery.addEventListener("change", followSystemTheme);

    return () => {
      window.cancelAnimationFrame(frame);
      mediaQuery.removeEventListener("change", followSystemTheme);
    };
  }, []);

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={() => {
        const nextTheme: Theme = isDark ? "light" : "dark";
        applyTheme(nextTheme);
        localStorage.setItem(themeStorageKey, nextTheme);
        setTheme(nextTheme);
      }}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line bg-surface text-petrol shadow-sm transition hover:border-petrol/35 hover:bg-surface-warm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-petrol"
      aria-label={isDark ? "Light Mode einschalten" : "Dark Mode einschalten"}
      title={isDark ? "Light Mode" : "Dark Mode"}
    >
      {isDark ? <Sun size={18} aria-hidden="true" /> : <Moon size={18} aria-hidden="true" />}
    </button>
  );
}
