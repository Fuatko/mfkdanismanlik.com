import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";

const links = [
  { href: "/services", label: "Services" },
  { href: "/methodology", label: "Methodology" },
  { href: "/cases", label: "Cases" },
  { href: "/resources", label: "Resources" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Footer() {
  return (
    <footer className="border-t border-zinc-200/80 bg-zinc-50/50">
      <div className="mx-auto max-w-6xl px-4 py-12 md:px-8 md:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="mb-4 text-sm font-semibold text-zinc-900">Consulting</p>
            <p className="text-sm text-zinc-600">
              Premium management consulting for strategy, operations, and transformation.
            </p>
          </div>
          <div>
            <p className="mb-4 text-sm font-semibold text-zinc-900">Navigation</p>
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
            <p className="mb-4 text-sm font-semibold text-zinc-900">Contact</p>
            <ul className="space-y-2 text-sm text-zinc-600">
              <li className="flex items-center gap-2">
                <Mail size={14} className="shrink-0" />
                hello@consulting.example.com
              </li>
              <li className="flex items-center gap-2">
                <Phone size={14} className="shrink-0" />
                +1 (555) 123-4567
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={14} className="shrink-0" />
                123 Strategy Avenue
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-zinc-200/80 pt-8 text-center text-sm text-zinc-500">
          © {new Date().getFullYear()} Consulting. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
