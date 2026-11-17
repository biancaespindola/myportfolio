import type { Metadata } from "next";
import { Fraunces, Nunito, Pixelify_Sans } from "next/font/google";
import Link from "next/link";
import { lang } from "next/root-params";
import { ThemeScript } from "@/components/theme-script";
import { ThemeToggle } from "@/components/theme-toggle";
import { locales } from "@/i18n/config";
import "../globals.css";
import { getDictionary } from "./dictionaries";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: "600",
  variable: "--font-fraunces",
});
const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-nunito",
});
const pixelify = Pixelify_Sans({
  subsets: ["latin"],
  weight: "500",
  variable: "--font-pixelify",
});

export function generateStaticParams() {
  return locales.map((locale) => ({ lang: locale }));
}

export async function generateMetadata(): Promise<Metadata> {
  const dict = await getDictionary();
  return {
    title: dict.meta.title,
    description: dict.meta.description,
    alternates: {
      languages: Object.fromEntries(locales.map((l) => [l, `/${l}`])),
    },
  };
}

export default async function RootLayout({ children }: LayoutProps<"/[lang]">) {
  const [locale, dict] = await Promise.all([lang(), getDictionary()]);

  return (
    <html
      lang={locale}
      data-theme="light"
      suppressHydrationWarning
      className={`${fraunces.variable} ${nunito.variable} ${pixelify.variable} antialiased`}
    >
      <body className="min-h-dvh font-sans text-[17px] leading-relaxed">
        <ThemeScript />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-on-primary"
        >
          {dict.a11y.skip}
        </a>
        <header className="mx-auto flex max-w-[1200px] items-center justify-between gap-6 px-6 py-8">
          <Link href={`/${locale}`} className="font-display text-3xl">
            bianca
          </Link>
          <div className="flex items-center gap-3">
            <nav aria-label={dict.a11y.language} className="flex gap-1">
              {locales.map((l) => (
                <Link
                  key={l}
                  href={`/${l}`}
                  hrefLang={l}
                  aria-current={l === locale ? "true" : undefined}
                  className="rounded-full px-3 py-2 font-pixel text-sm uppercase aria-[current=true]:bg-primary aria-[current=true]:text-on-primary"
                >
                  {l}
                </Link>
              ))}
            </nav>
            <ThemeToggle labels={dict.theme} ariaLabel={dict.a11y.theme} />
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
