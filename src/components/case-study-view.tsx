import { ArrowLeft, Languages } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { lang } from "next/root-params";
import { getDictionary } from "@/app/[lang]/dictionaries";
import { CaseStudyGrid } from "@/components/case-study-grid";
import { card, container, kicker, tag } from "@/components/ui/styles";
import { caseStudyContent } from "@/content/case-studies";
import { type CaseStudySlug, caseStudies } from "@/content/home";
import { hasLocale } from "@/i18n/config";

export function caseStudyMetadata(slug: CaseStudySlug): Metadata {
  const study = caseStudyContent[slug];
  return {
    title: `${study.title} · Bianca Espindola`,
    description: study.lead,
  };
}

/** One static route per case study (see decision 027): unknown slugs get a real 404. */
export async function CaseStudyView({ slug }: { slug: CaseStudySlug }) {
  const [locale, dict] = await Promise.all([lang(), getDictionary()]);
  if (!hasLocale(locale)) notFound();

  const study = caseStudyContent[slug];
  const {
    icon: Icon,
    cover,
    tags,
  } = caseStudies.find((c) => c.slug === slug) ?? caseStudies[0];
  const labels = dict.caseStudy;
  const s = labels.sections;
  const sectionKicker = (n: number, label: string) => (
    <p className={`${kicker} text-primary`}>
      {String(n).padStart(2, "0")} · {label}
    </p>
  );
  const h2 =
    "font-display text-[clamp(28px,3.5vw,40px)] leading-[1.15] tracking-[-0.5px]";

  return (
    <main id="main" className={container}>
      <header className="grid gap-6 pt-8 pb-10">
        <Link
          href={`/${locale}/case-studies`}
          className="flex w-fit items-center gap-1.5 font-bold text-primary hover:underline"
        >
          <ArrowLeft aria-hidden className="size-5" />
          {labels.back}
        </Link>
        <ul className="flex flex-wrap gap-2">
          {tags.map((t) => (
            <li key={t} className={tag}>
              {t}
            </li>
          ))}
        </ul>
        {locale !== "en" && (
          <p className="flex w-fit items-center gap-2 rounded-full bg-accent-soft px-3 py-1.5 text-sm font-bold text-accent">
            <Languages aria-hidden className="size-4" />
            {labels.englishOnly}
          </p>
        )}
        <div lang="en" className="grid gap-6">
          <h1 className="font-display text-[clamp(40px,5.5vw,68px)] leading-[1.05] tracking-[-1.5px]">
            {study.title}
          </h1>
          <p className="max-w-[44ch] text-xl text-muted">{study.lead}</p>
        </div>
        <dl className="grid gap-4 sm:grid-cols-3">
          {(
            [
              [labels.role, study.meta.role],
              [labels.timeline, study.meta.timeline],
              [labels.stack, study.meta.stack],
            ] as const
          ).map(([k, v]) => (
            <div key={k} className={`${card} grid gap-1 rounded-2xl p-4`}>
              <dt className="font-pixel text-sm uppercase text-muted">{k}</dt>
              <dd lang="en" className="font-bold">
                {v}
              </dd>
            </div>
          ))}
        </dl>
      </header>

      <div
        aria-hidden
        className={`${cover} grid h-56 place-items-center rounded-[32px] text-primary sm:h-72`}
      >
        <Icon className="size-24" strokeWidth={1.25} />
      </div>

      <article
        lang="en"
        className="mx-auto grid max-w-[760px] gap-16 py-20 text-[19px] leading-relaxed"
      >
        <section className="grid gap-4">
          {sectionKicker(1, s.problem)}
          <h2 className={h2}>{study.problem.title}</h2>
          <p>{study.problem.body}</p>
        </section>

        <section className="grid gap-4">
          {sectionKicker(2, s.constraints)}
          <h2 className={h2}>{study.constraints.title}</h2>
          <ul className="grid list-disc gap-1.5 pl-6">
            {study.constraints.items.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </section>

        <section className="grid gap-4">
          {sectionKicker(3, s.options)}
          <h2 className={h2}>{study.options.title}</h2>
          <ul
            className={`grid gap-4 ${study.options.items.length === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2"}`}
          >
            {study.options.items.map((o) => (
              <li
                key={o.name}
                className={`grid content-start gap-2 rounded-3xl p-5 ${o.chosen ? "border-2 border-primary bg-primary-soft" : "border-[1.5px] border-line bg-surface"}`}
              >
                {o.chosen && (
                  <span
                    lang={locale}
                    className="w-fit rounded-full bg-primary px-2 py-0.5 font-pixel text-xs uppercase text-on-primary"
                  >
                    {labels.chosen}
                  </span>
                )}
                <h3 className="text-lg font-bold">{o.name}</h3>
                <p className="text-base text-muted">{o.text}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="grid gap-4">
          {sectionKicker(4, s.decision)}
          <h2 className={h2}>{study.decision.title}</h2>
          <figure className="grid gap-2 rounded-3xl border-l-4 border-accent bg-accent-soft p-6">
            <blockquote className="text-xl font-bold">
              “{study.decision.quote}”
            </blockquote>
            {study.decision.source && (
              <figcaption className="font-pixel text-sm text-accent">
                {study.decision.source}
              </figcaption>
            )}
          </figure>
        </section>

        <section className="grid gap-4">
          {sectionKicker(5, s.outcome)}
          <h2 className={h2}>{study.outcome.title}</h2>
          <ul
            className={`grid gap-4 ${study.outcome.metrics.length === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2"}`}
          >
            {study.outcome.metrics.map((m) => (
              <li key={m.label} className={`${card} grid gap-1 p-5`}>
                <span className="font-display text-4xl text-primary">
                  {m.value}
                </span>
                <span className="text-base text-muted">{m.label}</span>
              </li>
            ))}
          </ul>
          {study.outcome.body && <p>{study.outcome.body}</p>}
        </section>

        <section className="grid gap-4">
          {sectionKicker(6, s.learned)}
          <h2 className={h2}>{study.learned.title}</h2>
          <p>{study.learned.body}</p>
        </section>
      </article>

      <section aria-labelledby="next-h" className="pb-8">
        <h2 id="next-h" className={`${kicker} mb-6 text-primary`}>
          {labels.next}
        </h2>
        <CaseStudyGrid locale={locale} copy={dict.caseStudies} exclude={slug} />
      </section>
    </main>
  );
}
