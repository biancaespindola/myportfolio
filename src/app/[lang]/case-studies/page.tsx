import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { lang } from "next/root-params";
import { CaseStudyGrid } from "@/components/case-study-grid";
import { container, kicker } from "@/components/ui/styles";
import { hasLocale } from "@/i18n/config";
import { getDictionary } from "../dictionaries";

export async function generateMetadata(): Promise<Metadata> {
  const { caseStudies, caseStudy } = await getDictionary();
  return {
    title: `${caseStudies.kicker} · Bianca Espindola`,
    description: caseStudy.indexLead,
  };
}

export default async function CaseStudiesPage() {
  const [locale, dict] = await Promise.all([lang(), getDictionary()]);
  if (!hasLocale(locale)) notFound();

  return (
    <main id="main" className={container}>
      <header className="grid gap-6 pt-8 pb-12">
        <p className={`${kicker} text-primary`}>{dict.caseStudies.kicker}</p>
        <h1 className="font-display text-[clamp(44px,6vw,72px)] leading-[1.05] tracking-[-1.5px]">
          {dict.caseStudies.title}
        </h1>
        <p className="max-w-[46ch] text-xl text-muted">
          {dict.caseStudy.indexLead}
        </p>
      </header>
      <CaseStudyGrid locale={locale} copy={dict.caseStudies} />
    </main>
  );
}
