"use client";

import { Snowflake } from "lucide-react";
import { useSnow, useSnowOn } from "@/stores/snow";

/** Festive-only switch for the falling snow; hidden when the visitor prefers reduced motion, since snow never falls then. */
export function SnowToggle({
  label,
  compact = false,
}: {
  label: string;
  /** Snowflake only below 1280px, where the desktop header runs out of room. */
  compact?: boolean;
}) {
  const on = useSnowOn();
  const toggle = useSnow((s) => s.toggle);

  return (
    <button
      type="button"
      aria-pressed={on}
      onClick={toggle}
      className="hidden items-center gap-1.5 whitespace-nowrap rounded-full border-[1.5px] border-line bg-surface px-3 py-2 font-pixel text-sm uppercase festive:inline-flex motion-reduce:festive:hidden aria-pressed:border-primary aria-pressed:bg-primary aria-pressed:text-on-primary"
    >
      <Snowflake aria-hidden className="size-4" />
      <span className={compact ? "sr-only xl:not-sr-only" : undefined}>
        {label}
      </span>
    </button>
  );
}
