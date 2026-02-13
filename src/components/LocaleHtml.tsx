"use client";

import { useEffect } from "react";

export function LocaleHtml({ locale }: { locale: string }) {
  useEffect(() => {
    document.documentElement.lang = locale === "tr" ? "tr" : locale === "fr" ? "fr" : "en";
  }, [locale]);
  return null;
}
