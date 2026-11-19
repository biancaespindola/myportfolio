import type { MetadataRoute } from "next";
import { locales } from "@/i18n/config";
import { languageLinks, PAGES, SITE_URL } from "@/i18n/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  return PAGES.flatMap((path) => {
    const languages = Object.fromEntries(
      Object.entries(languageLinks(path)).map(([l, p]) => [l, SITE_URL + p]),
    );
    return locales.map((locale) => ({
      url: `${SITE_URL}/${locale}${path}`,
      alternates: { languages },
    }));
  });
}
