import Link from "next/link";
import type { Dictionary } from "@/app/[lang]/dictionaries";
import { type CaseStudySlug, caseStudies } from "@/content/home";
import type { Locale } from "@/i18n/config";
import { card, tag } from "./ui/styles";

export function CaseStudyGrid({
  locale,
  copy,
  exclude,
}: {
  locale: Locale;
  copy: Dictionary["caseStudies"];
  exclude?: CaseStudySlug;
}) {
  const items = caseStudies.filter((c) => c.slug !== exclude);
  return (
    <ul
      className={`grid gap-6 ${items.length === 3 ? "md:grid-cols-3" : "md:grid-cols-2"}`}
    >
      {items.map(({ slug, icon: Icon, cover, tags }) => {
        const item = copy.items[slug];
        return (
          <li key={slug}>
            <Link
              href={`/${locale}/case-studies/${slug}`}
              className={`${card} group flex h-full flex-col overflow-hidden transition hover:-translate-y-1 hover:-rotate-[0.4deg]`}
            >
              <span
                className={`${cover} grid h-48 place-items-center text-primary`}
              >
                <Icon aria-hidden className="size-16" strokeWidth={1.5} />
              </span>
              <span className="flex flex-1 flex-col gap-3 p-6">
                <span className="flex flex-wrap gap-2">
                  {tags.map((t) => (
                    <span key={t} className={tag}>
                      {t}
                    </span>
                  ))}
                </span>
                <span className="text-xl font-bold">{item.title}</span>
                <span className="text-muted">{item.summary}</span>
                <span className="mt-auto font-bold text-primary group-hover:underline">
                  {copy.read} →
                </span>
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
