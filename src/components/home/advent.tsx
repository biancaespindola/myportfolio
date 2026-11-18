"use client";

import { useEffect, useState } from "react";
import type { Dictionary } from "@/app/[lang]/dictionaries";
import { useAchievements, useDoors } from "@/stores/achievements";
import { container, kicker, sectionTitle } from "../ui/styles";
import { openableDay } from "./advent-day";

const ORDER = [
  7, 15, 2, 22, 10, 18, 4, 13, 24, 1, 20, 9, 16, 5, 12, 21, 3, 19, 11, 6, 23,
  14, 8, 17,
];
const FRONTS = [
  "bg-primary text-on-primary",
  "bg-accent text-on-primary",
  "bg-highlight text-[#2a1b2e]",
];

const fill = (text: string, values: Record<string, string | number>) =>
  text.replace(/\{(\w+)\}/g, (_, key) => String(values[key]));

export function Advent({ copy }: { copy: Dictionary["advent"] }) {
  const doors = useDoors();
  const openDoor = useAchievements((s) => s.openDoor);
  // Read on the client so the server-rendered page never bakes in a date.
  const [today, setToday] = useState(0);
  useEffect(() => setToday(openableDay(new Date())), []);

  return (
    <section
      aria-labelledby="advent-h"
      className={`${container} hidden py-16 festive:block`}
    >
      <div className="mb-8 flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className={`${kicker} text-primary`}>{copy.kicker}</p>
          <h2 id="advent-h" className={`${sectionTitle} mt-2`}>
            {copy.title}
          </h2>
        </div>
        <p aria-live="polite" className={`${kicker} text-muted`}>
          {today
            ? fill(copy.count, { n: doors.length, total: today })
            : copy.notYet}
        </p>
      </div>
      <ul className="grid grid-cols-4 gap-3 sm:grid-cols-6 lg:grid-cols-8">
        {ORDER.map((day, i) => {
          const locked = day > today;
          const open = doors.includes(day);
          const surprise = copy.surprises[day - 1];
          return (
            <li key={day}>
              <button
                type="button"
                data-day={day}
                disabled={locked}
                onClick={() => openDoor(day)}
                aria-label={fill(
                  locked ? copy.locked : open ? copy.opened : copy.open,
                  {
                    day,
                    surprise,
                  },
                )}
                className="relative block aspect-square w-full rounded-[14px] perspective-[600px] focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-highlight enabled:cursor-pointer disabled:cursor-not-allowed"
              >
                <span className="absolute inset-0 grid place-items-center overflow-hidden rounded-[14px] border-[1.5px] border-dashed border-line bg-surface p-1.5 text-center text-[11px] leading-tight break-words text-muted hyphens-auto sm:text-xs">
                  {!locked && surprise}
                </span>
                <span
                  aria-hidden
                  className={`${FRONTS[i % 3]} absolute inset-0 grid origin-left place-items-center rounded-[14px] font-display text-[28px] backface-hidden motion-safe:transition-transform motion-safe:duration-600 motion-safe:ease-[cubic-bezier(.2,.8,.2,1)] ${open ? "rotate-y-[-105deg]" : ""} ${locked ? "brightness-95 saturate-[.35]" : ""}`}
                >
                  {day}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
      <p className="mt-4 text-muted">{copy.note}</p>
    </section>
  );
}
