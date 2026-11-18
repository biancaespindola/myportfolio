import type { Dictionary } from "@/app/[lang]/dictionaries";
import { shelf } from "@/content/home";
import { container, kicker, sectionTitle } from "../ui/styles";

const snowCap =
  "relative festive:before:absolute festive:before:-inset-x-1 festive:before:-top-1.5 festive:before:h-[22px] festive:before:rounded-[12px_12px_18px_18px/12px_12px_22px_22px] festive:before:bg-white festive:before:shadow-[0_2px_0_rgb(0_0_0/0.08)] festive:before:content-['']";

export function Shelf({ copy }: { copy: Dictionary["shelf"] }) {
  return (
    <section
      data-bookshelf
      aria-labelledby="shelf-h"
      className={`${container} py-16`}
    >
      <p className={`${kicker} text-accent`}>
        <span className="festive:hidden">{copy.kicker}</span>
        <span className="hidden festive:inline">{copy.festiveKicker}</span>
      </p>
      <h2 id="shelf-h" className={`${sectionTitle} mt-2 mb-8`}>
        <span className="festive:hidden">{copy.title}</span>
        <span className="hidden festive:inline">{copy.festiveTitle}</span>
      </h2>
      <ul className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
        {shelf.map(({ title, by, icon: Icon, cover }) => (
          <li key={title} className="group">
            <span
              aria-hidden
              className={`${cover} ${snowCap} mb-3 grid aspect-[160/220] place-items-center rounded-2xl transition group-hover:-translate-y-1.5 group-hover:-rotate-2`}
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
