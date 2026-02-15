import { Shield, Award, Users, Target } from "lucide-react";
import { Section, IconCard, CTABox, HeroPlaceholder } from "@/components";
import { getTranslations } from "@/lib/i18n";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations(locale as "tr" | "en" | "fr");
  const a = t.about as Record<string, unknown>;
  const vals = (a?.valuesList as Record<string, string>) ?? {};
  const cta = t.cta as Record<string, string>;
  const aboutImageUrl = ((t as Record<string, unknown>).images as Record<string, string>)?.aboutTeam;

  const VALUES = [
    { icon: Shield, title: vals.integrity, description: vals.integrityDesc },
    { icon: Award, title: vals.excellence, description: vals.excellenceDesc },
    { icon: Users, title: vals.collaboration, description: vals.collaborationDesc },
    { icon: Target, title: vals.impact, description: vals.impactDesc },
  ];

  return (
    <>
      <Section className="pb-8 md:pb-12">
        <HeroPlaceholder
          title={(a?.title as string) ?? "About Us"}
          tagline={(a?.tagline as string) ?? ""}
          size="mini"
          imageUrl={aboutImageUrl}
          imageAlt="Hakkımızda"
        />
      </Section>
      <Section>

        <h2 className="mb-6 text-xl font-semibold text-zinc-900 md:text-2xl">
          {(a?.whoWeAre as string) ?? ""}
        </h2>
        <p className="mb-12 max-w-2xl text-zinc-600">
          {(a?.whoWeAreText as string) ?? ""}
        </p>

        <h2 className="mb-8 text-xl font-semibold text-zinc-900 md:text-2xl">
          {(a?.values as string) ?? ""}
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map((item) => (
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
