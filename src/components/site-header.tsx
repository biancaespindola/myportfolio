import Link from "next/link";
import type { Dictionary } from "@/app/[lang]/dictionaries";
import type { Locale } from "@/i18n/config";
import { StringLights } from "./delight/string-lights";
import { LanguageSwitcher } from "./language-switcher";
import { Logo } from "./logo";
import { ThemeToggle } from "./theme-toggle";
import { container } from "./ui/styles";

export function SiteHeader({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const links = [
    ["", dict.nav.home],
    ["work", dict.nav.work],
    ["case-studies", dict.nav.caseStudies],
    ["about", dict.nav.about],
    ["cv", dict.nav.cv],
  ] as const;

  return (
    <>
      <StringLights />
      <header
        className={`${container} flex flex-wrap items-center justify-between gap-x-6 gap-y-3 py-8 print:hidden`}
      >
        <Link href={`/${locale}`} className="shrink-0">
          <Logo className="h-11 w-auto" />
        </Link>
        <nav
          aria-label={dict.a11y.main}
          className="order-3 flex w-full gap-6 overflow-x-auto text-[15px] font-bold md:order-none md:w-auto md:gap-8"
        >
          {links.map(([slug, label]) => (
            <Link
              key={slug}
              href={slug ? `/${locale}/${slug}` : `/${locale}`}
              className="whitespace-nowrap hover:text-primary"
            >
              {label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <LanguageSwitcher current={locale} label={dict.a11y.language} />
          <ThemeToggle labels={dict.theme} ariaLabel={dict.a11y.theme} />
        </div>
      </header>
    </>
  );
}
