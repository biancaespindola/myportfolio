import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { lang } from "next/root-params";
import { PrintButton } from "@/components/print-button";
import { container, kicker } from "@/components/ui/styles";
import { experience } from "@/content/experience";
import { contact } from "@/content/home";
import { hasLocale } from "@/i18n/config";
import { pageMetadata } from "@/i18n/seo";
import { period } from "@/lib/format";
import { getDictionary } from "../dictionaries";

// The browser uses the document title as the default PDF file name.
export async function generateMetadata(): Promise<Metadata> {
  const [locale, { cv }] = await Promise.all([lang(), getDictionary()]);
  if (!hasLocale(locale)) notFound();
  return pageMetadata({
    locale,
    path: "/cv",
    title: cv.docTitle,
    description: cv.summary,
  });
}

const strip = (url: string) =>
  url.replace(/^https:\/\/(www\.)?/, "").replace(/\/$/, "");

export default async function CvPage() {
  const [locale, dict] = await Promise.all([lang(), getDictionary()]);
  if (!hasLocale(locale)) notFound();
  const { cv } = dict;
  const h3 =
    "mb-2 font-pixel text-[10px] uppercase tracking-wide text-[#b4235a]";

  return (
    <main id="main" className={`${container} print:max-w-none print:p-0`}>
      <div className="flex flex-wrap items-end justify-between gap-6 pt-6 pb-8 print:hidden">
        <div>
          <p className={`${kicker} text-primary`}>{cv.kicker}</p>
          <h1 className="mt-2 font-display text-[32px] tracking-[-0.5px]">
            {cv.title}
          </h1>
        </div>
        <PrintButton label={cv.print} />
      </div>

      {/* Fixed light colours: the sheet prints the same whatever the site theme. */}
      <article
        aria-label={cv.title}
        className="mx-auto grid w-full max-w-[794px] content-start gap-[18px] rounded bg-white px-6 py-8 text-[10.5px] leading-[1.45] text-[#2a1b2e] shadow-[0_16px_40px_rgb(42_27_46/0.12)] sm:min-h-[1123px] sm:px-14 sm:py-12 print:min-h-[297mm] print:w-[210mm] print:max-w-none print:rounded-none print:shadow-none"
      >
        <header className="flex flex-wrap items-center gap-5">
          <Image
            src="/images/cv-photo.jpg"
            alt="Bianca Espindola"
            width={88}
            height={110}
            className="h-[110px] w-[88px] rounded-xl object-cover"
          />
          <div className="flex-1">
            <h2 className="font-display text-[30px] leading-[1.1] tracking-[-0.5px]">
              Bianca Espindola
            </h2>
            <p className="mt-1 text-[13px] font-bold text-[#b4235a]">
              {cv.role}
            </p>
          </div>
          <ul className="grid gap-0.5 text-[10px] text-[#6e5a6b] sm:text-right">
            <li>{cv.place}</li>
            <li>
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
            </li>
            <li>
              <a href={contact.linkedin}>{strip(contact.linkedin)}</a>
            </li>
            <li>
              <a href={contact.github}>{strip(contact.github)}</a>
            </li>
          </ul>
        </header>

        <hr className="border-[#f2dde5]" />

        <section>
          <h3 className={h3}>{cv.headings.profile}</h3>
          <p>{cv.summary}</p>
        </section>

        <section>
          <h3 className={h3}>{cv.headings.experience}</h3>
          <ol className="grid gap-2.5">
            {experience.map((job) => {
              const text = job.text[locale];
              return (
                <li
                  key={job.id}
                  className="grid gap-x-4 sm:grid-cols-[110px_minmax(0,1fr)]"
                >
                  <span className="text-[9.5px] font-bold text-[#6e5a6b]">
                    {period(locale, job.start, job.end, dict.work.now)}
                  </span>
                  <div>
                    <p className="text-[11px] font-bold">
                      {text.role} · {job.company}
                    </p>
                    <p className="text-[9.5px] text-[#6e5a6b]">{text.place}</p>
                    <p>{text.bullets.join(" · ")}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </section>

        <div className="grid gap-x-8 gap-y-3.5 sm:grid-cols-2">
          <div className="grid content-start gap-3.5">
            <section>
              <h3 className={h3}>{cv.headings.skills}</h3>
              <ul className="grid gap-1">
                {cv.skills.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </section>
            <section>
              <h3 className={h3}>{cv.headings.publication}</h3>
              <p lang="en">
                Experimental evaluation of a security layer implemented in a
                cardiac wearable device for the Internet of Medical Things —
                SBSEG 2022, pp. 97–110
              </p>
            </section>
          </div>
          <div className="grid content-start gap-3.5">
            <section>
              <h3 className={h3}>{cv.headings.education}</h3>
              <p>{cv.education}</p>
            </section>
            <section>
              <h3 className={h3}>{cv.headings.languages}</h3>
              <ul className="grid gap-1">
                {cv.languages.map((l) => (
                  <li key={l}>{l}</li>
                ))}
              </ul>
            </section>
            <section>
              <h3 className={h3}>{cv.headings.awards}</h3>
              <p>{cv.award}</p>
            </section>
          </div>
        </div>
      </article>

      <p className="pt-6 text-center font-bold text-muted print:hidden">
        {cv.note}
      </p>
    </main>
  );
}
