import { notFound } from "next/navigation";
import { lang } from "next/root-params";
import { Advent } from "@/components/home/advent";
import { CaseStudies } from "@/components/home/case-studies";
import { Contact } from "@/components/home/contact";
import { Hero } from "@/components/home/hero";
import { Highlights } from "@/components/home/highlights";
import { Shelf } from "@/components/home/shelf";
import { hasLocale } from "@/i18n/config";
import { getDictionary } from "./dictionaries";

export default async function Home() {
  const [locale, dict] = await Promise.all([lang(), getDictionary()]);
  if (!hasLocale(locale)) notFound();

  return (
    <main id="main">
      <Hero locale={locale} hero={dict.hero} />
      <Highlights highlights={dict.highlights} />
      <CaseStudies locale={locale} copy={dict.caseStudies} />
      <Advent copy={dict.advent} />
      <Shelf copy={dict.shelf} />
      <Contact copy={dict.contact} />
    </main>
  );
}
