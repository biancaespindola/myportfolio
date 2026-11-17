import { notFound } from "next/navigation";
import { lang } from "next/root-params";
import { hasLocale, type Locale } from "@/i18n/config";
import type en from "./dictionaries/en.json";

export type Dictionary = typeof en;

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  en: () => import("./dictionaries/en.json").then((m) => m.default),
  pt: () => import("./dictionaries/pt.json").then((m) => m.default),
  it: () => import("./dictionaries/it.json").then((m) => m.default),
  de: () => import("./dictionaries/de.json").then((m) => m.default),
};

export async function getDictionary(): Promise<Dictionary> {
  const locale = await lang();
  if (!hasLocale(locale)) notFound();
  return dictionaries[locale]();
}
