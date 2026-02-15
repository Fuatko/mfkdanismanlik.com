import fs from "fs";
import path from "path";
import type { Locale } from "./i18n-constants";
import { supabase } from "./supabase";

export { locales, defaultLocale, localeNames, isValidLocale } from "./i18n-constants";
export type { Locale } from "./i18n-constants";

function getContentFromFile(locale: Locale): Record<string, unknown> {
  const filePath = path.join(process.cwd(), "content", "translations", `${locale}.json`);
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw) as Record<string, unknown>;
}

export async function getTranslations(locale: Locale): Promise<Record<string, unknown>> {
  if (supabase) {
    const { data } = await supabase.from("site_content").select("content").eq("locale", locale).single();
    if (data?.content && typeof data.content === "object") {
      return data.content as Record<string, unknown>;
    }
  }
  return getContentFromFile(locale);
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
