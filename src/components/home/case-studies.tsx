import Link from "next/link";
import type { Dictionary } from "@/app/[lang]/dictionaries";
import type { Locale } from "@/i18n/config";
import { CaseStudyGrid } from "../case-study-grid";
import { container, kicker, sectionTitle } from "../ui/styles";

export function CaseStudies({
  locale,
  copy,
}: {
  locale: Locale;
  copy: Dictionary["caseStudies"];
}) {
  return (
    <section
      id="case-studies"
      aria-labelledby="case-studies-h"
      className={`${container} scroll-mt-8 py-16`}
    >
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className={`${kicker} text-primary`}>{copy.kicker}</p>
          <h2 id="case-studies-h" className={`${sectionTitle} mt-2`}>
            {copy.title}
          </h2>
        </div>
        <Link
          href={`/${locale}/case-studies`}
          className="font-bold text-primary hover:underline"
        >
          {copy.all} →
        </Link>
      </div>
      <CaseStudyGrid locale={locale} copy={copy} />
    </section>
  );
}
