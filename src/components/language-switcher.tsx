"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { type Locale, locales } from "@/i18n/config";

export function LanguageSwitcher({
  current,
  label,
}: {
  current: Locale;
  label: string;
}) {
  const rest = usePathname().split("/").slice(2).join("/");

  return (
    <nav aria-label={label} className="flex gap-1">
      {locales.map((l) => (
        <Link
          key={l}
          href={`/${l}${rest ? `/${rest}` : ""}`}
          hrefLang={l}
          lang={l}
          aria-current={l === current ? "true" : undefined}
          className="rounded-full px-3 py-2 font-pixel text-sm uppercase hover:bg-surface-alt aria-[current=true]:bg-primary aria-[current=true]:text-on-primary"
        >
          {l}
        </Link>
      ))}
    </nav>
  );
}
