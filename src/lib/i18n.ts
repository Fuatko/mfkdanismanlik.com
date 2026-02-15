import fs from "fs";
import path from "path";
import type { Locale } from "./i18n-constants";
import { supabase } from "./supabase";

export { locales, defaultLocale, localeNames, isValidLocale } from "./i18n-constants";
export type { Locale } from "./i18n-constants";

const translationsCache: Partial<Record<Locale, Record<string, unknown>>> = {};

function getContentFromFile(locale: Locale): Record<string, unknown> {
  const filePath = path.join(process.cwd(), "content", "translations", `${locale}.json`);
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw) as Record<string, unknown>;
}

export async function getTranslations(locale: Locale): Promise<Record<string, unknown>> {
  if (translationsCache[locale]) return translationsCache[locale];
  if (supabase) {
    const { data } = await supabase.from("site_content").select("content").eq("locale", locale).single();
    if (data?.content && typeof data.content === "object") {
      const content = data.content as Record<string, unknown>;
      translationsCache[locale] = content;
      return content;
    }
  }
  const data = getContentFromFile(locale);
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
