import fs from "fs";
import path from "path";
import { createClient } from "@supabase/supabase-js";
import type { Locale } from "./i18n-constants";
import { supabase } from "./supabase";

export { locales, defaultLocale, localeNames, isValidLocale } from "./i18n-constants";
export type { Locale } from "./i18n-constants";

function getContentFromFile(locale: Locale): Record<string, unknown> {
  const filePath = path.join(process.cwd(), "content", "translations", `${locale}.json`);
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw) as Record<string, unknown>;
}

/** Sunucuda içerik her istekte taze okunsun (resim/dil değişikliği hemen görünsün) */
function getSupabaseNoCache() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();
  if (!url || !key) return null;
  return createClient(url, key, {
    global: {
      fetch: (input, init) =>
        fetch(input, { ...init, cache: "no-store" as RequestCache }),
    },
  });
}

export async function getTranslations(locale: Locale): Promise<Record<string, unknown>> {
  const client = getSupabaseNoCache() ?? supabase;
  if (client) {
    const { data } = await client.from("site_content").select("content").eq("locale", locale).single();
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
