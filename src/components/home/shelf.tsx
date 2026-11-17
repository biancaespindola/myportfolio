import type { Dictionary } from "@/app/[lang]/dictionaries";
import { shelf } from "@/content/home";
import { container, kicker, sectionTitle } from "../ui/styles";

export function Shelf({ copy }: { copy: Dictionary["shelf"] }) {
  return (
    <section
      data-bookshelf
      aria-labelledby="shelf-h"
      className={`${container} py-16`}
    >
      <p className={`${kicker} text-accent`}>{copy.kicker}</p>
      <h2 id="shelf-h" className={`${sectionTitle} mt-2 mb-8`}>
        {copy.title}
      </h2>
      <ul className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
        {shelf.map(({ title, by, icon: Icon, cover }) => (
          <li key={title} className="group">
            <span
              aria-hidden
              className={`${cover} mb-3 grid aspect-[160/220] place-items-center rounded-2xl transition group-hover:-translate-y-1.5 group-hover:-rotate-2`}
            >
              <Icon className="size-11" strokeWidth={1.5} />
            </span>
            <span lang="en" className="block font-bold leading-snug">
              {title}
            </span>
            <span className="text-sm text-muted">{by}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
