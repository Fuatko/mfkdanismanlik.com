import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface CTABoxProps {
  title?: string;
  description?: string;
  href?: string;
  label?: string;
}

const defaults = {
  title: "Ready to Start?",
  description: "Let's discuss how we can help you achieve your strategic objectives.",
  href: "/contact",
  label: "Get in Touch",
};

export function CTABox({
  title = defaults.title,
  description = defaults.description,
  href = defaults.href,
  label = defaults.label,
}: CTABoxProps) {
  return (
    <div className="rounded-xl border border-zinc-200/80 bg-zinc-50/50 p-8 text-center md:p-12">
      <h2 className="mb-3 text-xl font-semibold text-zinc-900 md:text-2xl">{title}</h2>
      <p className="mx-auto mb-6 max-w-xl text-sm text-zinc-600 md:text-base">
        {description}
      </p>
      <Link
        href={href}
        className="inline-flex items-center gap-2 rounded-lg bg-zinc-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-zinc-800"
      >
        {label}
        <ArrowRight size={16} />
      </Link>
    </div>
  );
}
