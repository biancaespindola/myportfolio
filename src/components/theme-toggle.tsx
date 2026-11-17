"use client";

import { useEffect, useLayoutEffect, useState } from "react";

const THEMES = ["light", "dark", "festive"] as const;
type Theme = (typeof THEMES)[number];

const isTheme = (value: string | null): value is Theme =>
  THEMES.includes(value as Theme);

export function ThemeToggle({
  labels,
  ariaLabel,
}: {
  labels: Record<Theme, string>;
  ariaLabel: string;
}) {
  const [theme, setTheme] = useState<Theme>("light");

  // React's dev remount clears the attribute the inline head script set; restore it.
  useLayoutEffect(() => {
    let stored: string | null = null;
    try {
      stored = localStorage.getItem("theme");
    } catch {}
    const current = isTheme(stored)
      ? stored
      : document.documentElement.getAttribute("data-theme");
    if (!isTheme(current)) return;
    document.documentElement.setAttribute("data-theme", current);
    setTheme(current);
  }, []);

  // The header and the mobile menu each render a toggle; keep both labels in sync.
  useEffect(() => {
    const html = document.documentElement;
    const observer = new MutationObserver(() => {
      const value = html.getAttribute("data-theme");
      if (isTheme(value)) setTheme(value);
    });
    observer.observe(html, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    return () => observer.disconnect();
  }, []);

  function cycle() {
    const next = THEMES[(THEMES.indexOf(theme) + 1) % THEMES.length];
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {}
  }

  return (
    <button
      type="button"
      onClick={cycle}
      className="rounded-full border-[1.5px] border-line bg-surface px-3 py-2 font-pixel text-sm uppercase"
    >
      <span className="sr-only">{ariaLabel}: </span>
      {labels[theme]}
    </button>
  );
}
