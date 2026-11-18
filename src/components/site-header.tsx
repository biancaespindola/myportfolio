import Link from "next/link";
import type { Dictionary } from "@/app/[lang]/dictionaries";
import type { Locale } from "@/i18n/config";
import { SnowToggle } from "./delight/snow-toggle";
import { StringLights } from "./delight/string-lights";
import { LanguageSwitcher } from "./language-switcher";
import { Logo } from "./logo";
import { MobileMenu } from "./mobile-menu";
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
    [`/${locale}`, dict.nav.home],
    [`/${locale}/work`, dict.nav.work],
    [`/${locale}/case-studies`, dict.nav.caseStudies],
    [`/${locale}/about`, dict.nav.about],
    [`/${locale}/cv`, dict.nav.cv],
  ] as const;

  return (
    <>
      <StringLights />
      <header
        className={`${container} flex items-center justify-between gap-6 py-8 print:hidden`}
      >
        <Link href={`/${locale}`} className="shrink-0">
          <Logo className="h-11 w-auto" />
        </Link>
        <nav
          aria-label={dict.a11y.main}
          className="hidden gap-8 text-[15px] font-bold lg:flex"
        >
          {links.map(([href, label]) => (
            <Link
              key={href}
              href={href}
              className="whitespace-nowrap hover:text-primary"
            >
              {label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-2 lg:flex">
          <LanguageSwitcher current={locale} label={dict.a11y.language} />
          <SnowToggle label={dict.snow.toggle} compact />
          <ThemeToggle labels={dict.theme} ariaLabel={dict.a11y.theme} />
        </div>
        <MobileMenu locale={locale} links={links} dict={dict} />
      </header>
    </>
  );
}
