import fs from "fs";
import path from "path";
import type { Locale } from "./i18n-constants";

export { locales, defaultLocale, localeNames, isValidLocale } from "./i18n-constants";
export type { Locale } from "./i18n-constants";

const translationsCache: Partial<Record<Locale, Record<string, unknown>>> = {};

export function getTranslations(locale: Locale): Record<string, unknown> {
  if (translationsCache[locale]) return translationsCache[locale];
  const filePath = path.join(process.cwd(), "content", "translations", `${locale}.json`);
  const raw = fs.readFileSync(filePath, "utf-8");
  const data = JSON.parse(raw) as Record<string, unknown>;
  translationsCache[locale] = data;
  return data;
}

export function t(
  translations: Record<string, unknown>,
  key: string
): unknown {
  const parts = key.split(".");
  let current: unknown = translations;
  for (const p of parts) {
    if (current == null || typeof current !== "object") return "";
    current = (current as Record<string, unknown>)[p];
  }
  return current != null ? current : "";
}
