"use client";

import { Trophy } from "lucide-react";
import type { Dictionary } from "@/app/[lang]/dictionaries";
import { ACHIEVEMENTS, useUnlocked } from "@/stores/achievements";

export function AchievementBoard({
  labels,
}: {
  labels: Dictionary["achievements"];
}) {
  const unlocked = useUnlocked();
  const progress = labels.progress
    .replace("{n}", String(unlocked.length))
    .replace("{total}", String(ACHIEVEMENTS.length));

  return (
    <>
      <p className="mb-6 font-pixel text-sm uppercase text-primary">
        {progress}
      </p>
      <ul className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-7">
        {ACHIEVEMENTS.map((id) => {
          const got = unlocked.includes(id);
          const item = labels.items[id];
          return (
            <li
              key={id}
              data-achievement={id}
              data-unlocked={got}
              className={`grid justify-items-center gap-2 rounded-3xl p-5 text-center ${got ? "border-2 border-highlight bg-surface" : "border-[1.5px] border-dashed border-line bg-surface-alt"}`}
            >
              <span
                className={`grid size-14 place-items-center rounded-full ${got ? "bg-highlight text-[#2a1b2e]" : "bg-line text-muted"}`}
              >
                <Trophy aria-hidden className="size-7" />
              </span>
              <span className="font-bold">{got ? item.name : "???"}</span>
              <span className="text-sm text-muted">{item.hint}</span>
              <span
                className={`font-pixel text-xs uppercase ${got ? "text-accent" : "text-muted"}`}
              >
                {got ? labels.unlocked : labels.locked}
              </span>
            </li>
          );
        })}
      </ul>
    </>
  );
}
