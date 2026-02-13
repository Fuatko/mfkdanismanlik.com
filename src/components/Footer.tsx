import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import type { Locale } from "@/lib/i18n";

const linkKeys = ["services", "methodology", "cases", "resources", "about", "contact"] as const;
const linkPaths: Record<string, string> = {
  services: "/services",
  methodology: "/methodology",
  cases: "/cases",
  resources: "/resources",
  about: "/about",
  contact: "/contact",
};

interface FooterProps {
  locale: Locale;
  translations: Record<string, unknown>;
}

export function Footer({ locale, translations }: FooterProps) {
  const nav = (translations.nav as Record<string, string>) ?? {};
  const footer = (translations.footer as Record<string, string>) ?? {};

  const links = linkKeys.map((key) => ({
    href: `/${locale}${linkPaths[key]}`,
    label: nav[key] ?? key,
  }));

  return (
    <footer className="border-t border-zinc-200/80 bg-zinc-50/50">
      <div className="mx-auto max-w-6xl px-4 py-12 md:px-8 md:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="mb-4 text-sm font-semibold text-zinc-900">
              {footer.brand ?? "MFK Danışmanlık"}
            </p>
            <p className="text-sm text-zinc-600">{footer.brandDesc ?? ""}</p>
          </div>
          <div>
            <p className="mb-4 text-sm font-semibold text-zinc-900">
              {footer.navigation ?? "Navigation"}
            </p>
            <ul className="space-y-2">
              {links.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-zinc-600 transition hover:text-zinc-900"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mb-4 text-sm font-semibold text-zinc-900">
              {(translations.contact as Record<string, string>)?.contact ?? "Contact"}
            </p>
            <ul className="space-y-2 text-sm text-zinc-600">
              <li className="flex items-center gap-2">
                <Mail size={14} className="shrink-0" />
                hello@mfkdanismanlik.com
              </li>
              <li className="flex items-center gap-2">
                <Phone size={14} className="shrink-0" />
                +90 (555) 123 45 67
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={14} className="shrink-0" />
                İstanbul, Türkiye
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-zinc-200/80 pt-8 text-center text-sm text-zinc-500">
          © {new Date().getFullYear()} MFK Danışmanlık. {footer.rights ?? "All rights reserved."}
        </div>
      </div>
    </footer>
  );
}
