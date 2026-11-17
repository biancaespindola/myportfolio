import type { Metadata } from "next";
import { Fraunces, Nunito, Pixelify_Sans } from "next/font/google";
import { notFound } from "next/navigation";
import { lang } from "next/root-params";
import { AchievementTracker } from "@/components/delight/achievement-tracker";
import { Snow } from "@/components/delight/snow";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ThemeScript } from "@/components/theme-script";
import { hasLocale, locales } from "@/i18n/config";
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
  if (!hasLocale(locale)) notFound();

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
        <SiteHeader locale={locale} dict={dict} />
        {children}
        <SiteFooter dict={dict} />
        <AchievementTracker labels={dict.achievements} />
        <Snow />
      </body>
    </html>
  );
}
