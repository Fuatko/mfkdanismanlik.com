import { FileText, BookOpen, Video, Wrench } from "lucide-react";
import { Section, IconCard, CTABox } from "@/components";
import { getTranslations } from "@/lib/i18n";

export default async function ResourcesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = getTranslations(locale as "tr" | "en" | "fr");
  const r = t.resources as Record<string, unknown>;
  const types = (r?.types as Record<string, string>) ?? {};
  const cta = t.cta as Record<string, string>;

  const RESOURCE_TYPES = [
    { icon: FileText, title: types.articles, description: types.articlesDesc },
    { icon: BookOpen, title: types.whitepapers, description: types.whitepapersDesc },
    { icon: Video, title: types.videos, description: types.videosDesc },
    { icon: Wrench, title: types.tools, description: types.toolsDesc },
  ];

  return (
    <>
      <Section>
        <h1 className="mb-4 text-3xl font-semibold text-zinc-900 md:text-4xl">
          {(r?.title as string) ?? "Resources"}
        </h1>
        <p className="mb-12 max-w-2xl text-lg text-zinc-600">
          {(r?.tagline as string) ?? ""}
        </p>

        <h2 className="mb-8 text-xl font-semibold text-zinc-900 md:text-2xl">
          {(r?.hub as string) ?? ""}
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {RESOURCE_TYPES.map((item) => (
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
