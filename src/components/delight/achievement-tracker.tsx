"use client";

import { Trophy } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { Dictionary } from "@/app/[lang]/dictionaries";
import { useAchievements, useToastQueue } from "@/stores/achievements";

const KONAMI = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

/** Awards achievements from what the visitor does and announces new ones. */
export function AchievementTracker({
  labels,
}: {
  labels: Dictionary["achievements"];
}) {
  const pathname = usePathname();
  const [hydrated, setHydrated] = useState(false);
  const queue = useToastQueue();
  const { unlock, visit, seeLocale, dismiss, blizzard } =
    useAchievements.getState();

  useEffect(() => {
    Promise.resolve(useAchievements.persist.rehydrate()).then(() =>
      setHydrated(true),
    );
  }, []);

  // Pages and languages seen.
  useEffect(() => {
    if (!hydrated) return;
    const [, locale, page] = pathname.split("/");
    if (locale) seeLocale(locale);
    if (page) visit(page);
  }, [hydrated, pathname, seeLocale, visit]);

  // Theme: dark → night owl, festive → ho ho ho.
  useEffect(() => {
    if (!hydrated) return;
    const html = document.documentElement;
    const check = () => {
      const theme = html.getAttribute("data-theme");
      if (theme === "dark") unlock("nightowl");
      if (theme === "festive") unlock("hohoho");
    };
    check();
    const observer = new MutationObserver(check);
    observer.observe(html, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    return () => observer.disconnect();
  }, [hydrated, unlock]);

  // Bookshelf scrolled into view → bookworm.
  // biome-ignore lint/correctness/useExhaustiveDependencies: re-run per page to find that page's shelf
  useEffect(() => {
    if (!hydrated) return;
    const shelf = document.querySelector("[data-bookshelf]");
    if (!shelf) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) unlock("bookworm");
      },
      { threshold: 0.5 },
    );
    observer.observe(shelf);
    return () => observer.disconnect();
  }, [hydrated, pathname, unlock]);

  // ↑↑↓↓←→←→BA
  useEffect(() => {
    if (!hydrated) return;
    let pos = 0;
    const onKey = (e: KeyboardEvent) => {
      pos = e.key === KONAMI[pos] ? pos + 1 : e.key === KONAMI[0] ? 1 : 0;
      if (pos === KONAMI.length) {
        pos = 0;
        unlock("konami");
        blizzard();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [hydrated, unlock, blizzard]);

  const current = queue[0];
  useEffect(() => {
    if (!current) return;
    const timer = setTimeout(dismiss, 4000);
    return () => clearTimeout(timer);
  }, [current, dismiss]);

  return (
    <output
      aria-live="polite"
      className="pointer-events-none fixed right-4 bottom-4 z-50 print:hidden"
    >
      {current && (
        <div
          key={current}
          className="flex animate-[toast-in_.4s_cubic-bezier(.2,.8,.2,1)] items-center gap-3 rounded-2xl bg-[#2a1b2e] px-4 py-3 text-[#fff7f2] shadow-[0_12px_32px_rgb(42_27_46/0.3)]"
        >
          <span className="grid size-10 place-items-center rounded-lg bg-highlight text-[#2a1b2e]">
            <Trophy aria-hidden className="size-[22px]" />
          </span>
          <span>
            <span className="block font-pixel text-xs uppercase text-[#ffd166]">
              {labels.toast}
            </span>
            <span className="font-bold">
              {labels.items[current].name}: {labels.items[current].hint}
            </span>
          </span>
        </div>
      )}
    </output>
  );
}
