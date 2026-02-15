import { Target, Layout, BarChart3 } from "lucide-react";
import {
  Section,
  IconCard,
  Stepper,
  CTABox,
  HeroPlaceholder,
} from "@/components";
import { getTranslations } from "@/lib/i18n";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations(locale as "tr" | "en" | "fr");
  const home = t.home as Record<string, unknown>;
  const cards = (home?.cards as Record<string, string>) ?? {};
  const steps = (home?.steps as Record<string, string>) ?? {};
  const cta = t.cta as Record<string, string>;

  const HOME_ICON_CARDS = [
    { icon: Target, title: cards.strategicPlanning, description: cards.strategicPlanningDesc },
    { icon: Layout, title: cards.organizationDesign, description: cards.organizationDesignDesc },
    { icon: BarChart3, title: cards.performanceManagement, description: cards.performanceManagementDesc },
  ];

  const STEPS = [
    { title: steps.discover, description: steps.discoverDesc },
    { title: steps.diagnose, description: steps.diagnoseDesc },
    { title: steps.design, description: steps.designDesc },
    { title: steps.deliver, description: steps.deliverDesc },
    { title: steps.sustain, description: steps.sustainDesc },
  ];

  return (
    <>
      <Section className="pb-8 md:pb-12">
        <HeroPlaceholder
          title={(home?.title as string) ?? ""}
          tagline={(home?.tagline as string) ?? ""}
          abstract={(home?.hero_abstract as string) ?? ""}
          size="full"
          imageUrl={((t as Record<string, unknown>).images as Record<string, string>)?.hero || undefined}
          imageAlt="MFK Danışmanlık"
        />
      </Section>

      <Section className="bg-zinc-50/30">
        <h2 className="mb-10 text-2xl font-semibold text-zinc-900 md:text-3xl">
          {(home?.whyUs as string) ?? ""}
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {HOME_ICON_CARDS.map((item) => (
            <IconCard
              key={item.title}
              icon={item.icon}
              title={item.title ?? ""}
              description={item.description ?? ""}
            />
          ))}
        </div>
      </Section>

      <Section>
        <h2 className="mb-10 text-2xl font-semibold text-zinc-900 md:text-3xl">
          {(home?.approach as string) ?? ""}
        </h2>
        <Stepper steps={STEPS} />
      </Section>

      <Section className="bg-zinc-50/30">
        <CTABox
          title={cta?.title}
          description={cta?.desc}
          href={`/${locale}/contact`}
          label={cta?.button}
        />
      </Section>
    </>
  );
}
