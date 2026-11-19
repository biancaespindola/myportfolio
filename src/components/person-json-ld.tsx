import { contact } from "@/content/home";
import { SITE_URL } from "@/i18n/seo";

/** Tells search engines who the site is about, and that the LinkedIn and GitHub profiles are the same person. */
export function PersonJsonLd({ description }: { description: string }) {
  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Bianca Espindola",
    alternateName: "Bianca Espíndola",
    url: SITE_URL,
    image: `${SITE_URL}/images/hero-photo.jpg`,
    description,
    jobTitle: "Frontend Developer",
    worksFor: { "@type": "Organization", name: "ComeOn Group" },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Graz",
      addressCountry: "AT",
    },
    knowsLanguage: ["pt", "en", "it", "de"],
    sameAs: [contact.linkedin, contact.github],
  };
  return (
    <script
      type="application/ld+json"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: static JSON with "<" escaped, no user input
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(person).replace(/</g, "\\u003c"),
      }}
    />
  );
}
