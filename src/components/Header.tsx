"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import { useState } from "react";
import type { Locale } from "@/lib/i18n-constants";
import { locales, localeNames } from "@/lib/i18n-constants";

const navKeys = ["home", "services", "methodology", "cases", "resources", "about", "contact"] as const;
const navPaths: Record<string, string> = {
  home: "/",
  services: "/services",
  methodology: "/methodology",
  cases: "/cases",
  resources: "/resources",
  about: "/about",
  contact: "/contact",
};

interface HeaderProps {
  locale: Locale;
  translations: Record<string, unknown>;
}

export function Header({ locale, translations }: HeaderProps) {
  const [open, setOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const pathname = usePathname();

  const nav = (translations.nav as Record<string, string>) ?? {};
  const navItems = navKeys.map((key) => ({
    href: `/${locale}${navPaths[key]}`,
    label: nav[key] ?? key,
  }));

  const basePath = pathname?.replace(/^\/(tr|en|fr)/, "") || "/";
  const currentLocale = (pathname?.split("/")[1] as Locale) ?? locale;

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200/80 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-4 py-4 md:px-8">
        <Link
          href={`/${locale}`}
          className="text-lg font-semibold text-zinc-900 hover:text-zinc-700"
        >
          MFK Danışmanlık
        </Link>
        <nav className="hidden md:flex md:items-center md:gap-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-zinc-600 transition hover:text-zinc-900"
            >
              {item.label}
            </Link>
          ))}
          <div className="relative ml-4">
            <button
              type="button"
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-1 rounded-lg border border-zinc-200 px-3 py-1.5 text-sm text-zinc-700 hover:bg-zinc-50"
            >
              {localeNames[currentLocale]}
              <ChevronDown size={14} />
            </button>
            {langOpen && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setLangOpen(false)}
                  aria-hidden
                />
                <div className="absolute right-0 top-full z-20 mt-1 min-w-[120px] rounded-lg border border-zinc-200 bg-white py-1 shadow-lg">
                  {locales.map((l) => (
                    <Link
                      key={l}
                      href={`/${l}${basePath}`}
                      className={`block px-4 py-2 text-sm hover:bg-zinc-50 ${
                        l === currentLocale ? "font-medium text-zinc-900" : "text-zinc-600"
                      }`}
                      onClick={() => setLangOpen(false)}
                    >
                      {localeNames[l]}
                    </Link>
                  ))}
                </div>
              </>
            )}
          </div>
        </nav>
        <div className="flex items-center gap-2">
          <div className="relative md:hidden">
            <button
              type="button"
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-1 rounded-lg border border-zinc-200 px-3 py-1.5 text-sm text-zinc-700"
            >
              {localeNames[currentLocale]}
              <ChevronDown size={14} />
            </button>
            {langOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setLangOpen(false)} aria-hidden />
                <div className="absolute right-0 top-full z-20 mt-1 min-w-[120px] rounded-lg border border-zinc-200 bg-white py-1 shadow-lg">
                  {locales.map((l) => (
                    <Link
                      key={l}
                      href={`/${l}${basePath}`}
                      className="block px-4 py-2 text-sm text-zinc-600 hover:bg-zinc-50"
                      onClick={() => setLangOpen(false)}
                    >
                      {localeNames[l]}
                    </Link>
                  ))}
                </div>
              </>
            )}
          </div>
          <button
            type="button"
            aria-label="Toggle menu"
            className="rounded-lg p-2 text-zinc-600 md:hidden"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
      {open && (
        <div className="border-t border-zinc-200/80 bg-white px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-3">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-zinc-600 hover:text-zinc-900"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-2 flex flex-col gap-2 border-t border-zinc-200 pt-3">
              <p className="text-xs font-medium text-zinc-500">Dil / Language</p>
              {locales.map((l) => (
                <Link
                  key={l}
                  href={`/${l}${basePath}`}
                  className="text-sm text-zinc-600 hover:text-zinc-900"
                  onClick={() => setOpen(false)}
                >
                  {localeNames[l]}
                </Link>
              ))}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
