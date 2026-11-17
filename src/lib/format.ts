import type { Locale } from "@/i18n/config";

/** "Apr 2024 — now" from ISO year-months, in the visitor's language. */
export function period(
  locale: Locale,
  start: string,
  end: string | undefined,
  now: string,
) {
  const fmt = new Intl.DateTimeFormat(locale, {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
  const toDate = (ym: string) => new Date(`${ym}-01T00:00:00Z`);
  return `${fmt.format(toDate(start))} — ${end ? fmt.format(toDate(end)) : now}`;
}
