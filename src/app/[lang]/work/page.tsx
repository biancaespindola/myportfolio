import { Shield, Trophy } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { lang } from "next/root-params";
import { button, card, container, kicker, tag } from "@/components/ui/styles";
import { experience, skillGroups } from "@/content/experience";
import { contact } from "@/content/home";
import { hasLocale } from "@/i18n/config";
import { period } from "@/lib/format";
import { getDictionary } from "../dictionaries";

export async function generateMetadata(): Promise<Metadata> {
  const { work } = await getDictionary();
  return { title: `${work.kicker} · Bianca Espindola`, description: work.lead };
}

export default async function WorkPage() {
  const [locale, dict] = await Promise.all([lang(), getDictionary()]);
  if (!hasLocale(locale)) notFound();
  const { work } = dict;

  return (
    <main id="main" className={container}>
      <header className="grid gap-6 pt-8 pb-16">
        <p className={`${kicker} text-primary`}>{work.kicker}</p>
        <h1 className="font-display text-[clamp(44px,6vw,72px)] leading-[1.05] tracking-[-1.5px]">
          {work.title}
        </h1>
        <p className="max-w-[46ch] text-xl text-muted">{work.lead}</p>
        <div className="flex flex-wrap gap-3">
          <Link href={`/${locale}/cv`} className={button.primary}>
            {dict.hero.ctaCv}
          </Link>
          <a href={contact.linkedin} className={button.secondary}>
            {dict.contact.linkedin}
          </a>
        </div>
      </header>

      <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,1fr)_384px]">
        <section aria-labelledby="experience-h">
          <h2 id="experience-h" className="sr-only">
            {work.experience}
          </h2>
          <ol>
            {experience.map((job, i) => {
              const text = job.text[locale];
              const last = i === experience.length - 1;
              return (
                <li
                  key={job.id}
                  className="grid grid-cols-[24px_minmax(0,1fr)] gap-6"
                >
                  <span
                    aria-hidden
                    className="flex flex-col items-center pt-1.5"
                  >
                    <span className="size-3.5 shrink-0 rounded-full bg-primary ring-4 ring-primary-soft" />
                    {!last && <span className="mt-1.5 w-0.5 flex-1 bg-line" />}
                  </span>
                  <article className="grid grid-cols-1 gap-3 pb-12">
                    <p className={`${kicker} text-primary`}>
                      {period(locale, job.start, job.end, work.now)}
                    </p>
                    <h3 className="hyphens-auto break-words font-display text-[32px] leading-tight tracking-[-0.5px]">
                      {text.role}
                    </h3>
                    <p className="text-muted">
                      <strong className="text-ink">{job.company}</strong> ·{" "}
                      {text.place}
                    </p>
                    {job.award && (
                      <p className="flex w-fit max-w-full items-center gap-2 rounded-2xl bg-highlight px-3 py-1.5 font-pixel text-sm uppercase text-[#2a1b2e]">
                        <Trophy aria-hidden className="size-4" />
                        <span className="min-w-0">{work.award.badge}</span>
                      </p>
                    )}
                    <ul className="grid list-disc gap-1 pl-5">
                      {text.bullets.map((b) => (
                        <li key={b}>{b}</li>
                      ))}
                    </ul>
                    <ul className="flex flex-wrap gap-2">
                      {job.tags.map((t) => (
                        <li key={t} className={tag}>
                          {t}
                        </li>
                      ))}
                    </ul>
                  </article>
                </li>
              );
            })}
          </ol>
        </section>

        <aside className="grid gap-6 lg:sticky lg:top-6">
          <section
            aria-labelledby="award-h"
            className={`${card} grid gap-3 border-2 border-highlight p-6`}
          >
            <Trophy aria-hidden className="size-8 text-primary" />
            <p className={`${kicker} text-accent`}>{work.award.kicker}</p>
            <h2 id="award-h" className="font-display text-[32px] leading-tight">
              {work.award.title}
            </h2>
            <p className="text-muted">{work.award.body}</p>
          </section>

          <section
            aria-labelledby="skills-h"
            className={`${card} grid gap-4 p-6`}
          >
            <h2 id="skills-h" className="text-xl font-bold">
              {work.skills.title}
            </h2>
            {work.skills.groups.map((group, i) => (
              <div key={group} className="grid gap-2">
                <h3 className="font-bold text-muted">{group}</h3>
                <ul className="flex flex-wrap gap-2">
                  {skillGroups[i].map((t) => (
                    <li key={t} className={tag}>
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </section>

          <section aria-labelledby="edu-h" className={`${card} grid gap-2 p-6`}>
            <p className={`${kicker} text-primary`}>{work.education.kicker}</p>
            <h2 id="edu-h" className="text-xl font-bold">
              {work.education.degree}
            </h2>
            <p className="text-muted">{work.education.school}</p>
          </section>

          <section
            aria-labelledby="pub-h"
            className="grid gap-3 rounded-3xl bg-accent-soft p-6"
          >
            <p className={`${kicker} flex items-center gap-2 text-accent`}>
              <Shield aria-hidden className="size-5" />
              {work.publication.kicker}
            </p>
            <h2 id="pub-h" className="text-xl font-bold">
              {work.publication.title}
            </h2>
            <Link
              href={`/${locale}/case-studies/iomt-security`}
              className="font-bold text-accent hover:underline"
            >
              {work.publication.link} →
            </Link>
          </section>
        </aside>
      </div>
    </main>
  );
}
