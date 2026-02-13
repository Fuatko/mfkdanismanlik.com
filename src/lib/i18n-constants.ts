export type Locale = "tr" | "en" | "fr";

export const locales: Locale[] = ["tr", "en", "fr"];
export const defaultLocale: Locale = "tr";

export const localeNames: Record<Locale, string> = {
  tr: "Türkçe",
  en: "English",
  fr: "Français",
};

export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}

export function getLocale(pathname: string): Locale {
  const segment = pathname.split("/")[1];
  return isValidLocale(segment) ? segment : defaultLocale;
}

export function pathWithLocale(pathname: string, locale: Locale): string {
  const base = pathname === "/" ? "" : pathname;
  return `/${locale}${base}`;
}
