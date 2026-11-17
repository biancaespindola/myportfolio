import type { Dictionary } from "@/app/[lang]/dictionaries";
import { highlightIcons } from "@/content/home";
import { card, container } from "../ui/styles";

export function Highlights({
  highlights,
}: {
  highlights: Dictionary["highlights"];
}) {
  return (
    <section aria-labelledby="highlights-h" className={`${container} py-8`}>
      <h2 id="highlights-h" className="sr-only">
        {highlights.title}
      </h2>
      <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {highlights.items.map((item, i) => {
          const Icon = highlightIcons[i];
          return (
            <li key={item.value} className={`${card} flex flex-col gap-2 p-6`}>
              <Icon aria-hidden className="size-8 text-primary" />
              <span className="text-[22px] font-bold leading-tight">
                {item.value}
              </span>
              <span className="text-muted">{item.caption}</span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
