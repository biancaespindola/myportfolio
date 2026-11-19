import type { Metadata } from "next";
import { type Locale, locales } from "./config";

export const SITE_URL = "https://biancaespindola.is-a.dev";

/** Every page, as the path after the locale. */
export const PAGES = [
  "",
  "/work",
  "/case-studies",
  "/case-studies/this-site",
  "/case-studies/sportsbook",
  "/case-studies/iomt-security",
  "/about",
  "/cv",
] as const;
export type PagePath = (typeof PAGES)[number];

/** Canonical URL plus the same page in every language. x-default is the locale-less path, which the proxy sends to the visitor's language. */
export function languageLinks(path: PagePath) {
  return {
    ...Object.fromEntries(locales.map((l) => [l, `/${l}${path}`])),
    "x-default": path || "/",
  };
}

const SHARE_IMAGE = {
  url: "/images/og.png",
  width: 1200,
  height: 630,
  alt: "Bianca Espindola, frontend developer in Graz, Austria: I turn tricky problems into friendly interfaces.",
};

const OG_LOCALE: Record<Locale, string> = {
  en: "en_GB",
  pt: "pt_BR",
  it: "it_IT",
  de: "de_AT",
};

/** Title, description, canonical, language links and link previews for one page. */
export function pageMetadata({
  locale,
  path,
  title,
  description,
}: {
  locale: Locale;
  path: PagePath;
  title: string;
  description: string;
}): Metadata {
  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}${path}`,
      languages: languageLinks(path),
    },
    openGraph: {
      type: "website",
      siteName: "Bianca Espindola",
      url: `/${locale}${path}`,
      locale: OG_LOCALE[locale],
      title,
      description,
      images: [SHARE_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [SHARE_IMAGE],
    },
  };
}
