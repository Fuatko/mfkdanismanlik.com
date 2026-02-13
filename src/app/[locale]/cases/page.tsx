import { TrendingUp, Cog, Monitor, Users } from "lucide-react";
import { Section, IconCard, CTABox } from "@/components";
import { getTranslations } from "@/lib/i18n";

export default async function CasesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = getTranslations(locale as "tr" | "en" | "fr");
  const c = t.cases as Record<string, unknown>;
  const cats = (c?.categories as Record<string, string>) ?? {};
  const cta = t.cta as Record<string, string>;

  const CASE_CATEGORIES = [
    { icon: TrendingUp, title: cats.strategy, description: cats.strategyDesc },
    { icon: Cog, title: cats.operations, description: cats.operationsDesc },
    { icon: Monitor, title: cats.digital, description: cats.digitalDesc },
    { icon: Users, title: cats.people, description: cats.peopleDesc },
  ];

  return (
    <>
      <Section>
        <h1 className="mb-4 text-3xl font-semibold text-zinc-900 md:text-4xl">
          {(c?.title as string) ?? "Case Studies"}
        </h1>
        <p className="mb-12 max-w-2xl text-lg text-zinc-600">
          {(c?.tagline as string) ?? ""}
        </p>

        <h2 className="mb-8 text-xl font-semibold text-zinc-900 md:text-2xl">
          {(c?.selected as string) ?? ""}
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {CASE_CATEGORIES.map((item) => (
            <IconCard
              key={String(item.title)}
              icon={item.icon}
              title={String(item.title ?? "")}
              description={String(item.description ?? "")}
            />
          ))}
        </div>
      </Section>

      <Section className="bg-zinc-50/30">
        <CTABox href={`/${locale}/contact`} label={cta?.button} />
      </Section>
    </>
  );
}
