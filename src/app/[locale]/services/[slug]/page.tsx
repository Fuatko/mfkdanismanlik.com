import { notFound } from "next/navigation";
import { AlertCircle, Clock, PieChart, CheckCircle2 } from "lucide-react";
import {
  Section,
  HeroPlaceholder,
  Stepper,
  CTABox,
} from "@/components";
import { getTranslations } from "@/lib/i18n";

const PAIN_POINT_ICONS = [AlertCircle, Clock, PieChart];

const SLUG_TO_KEY: Record<string, string> = {
  "strategic-planning": "strategicPlanning",
  "organization-design": "organizationDesign",
  "performance-management": "performanceManagement",
  "human-resources": "humanResources",
  "executive-dashboard": "executiveDashboard",
};
const SLUG_TO_IMAGE_KEY: Record<string, string> = {
  "strategic-planning": "serviceStrategicPlanning",
  "organization-design": "serviceOrganizationDesign",
  "performance-management": "servicePerformanceManagement",
  "human-resources": "serviceHumanResources",
  "executive-dashboard": "serviceExecutiveDashboard",
};
const slugs = ["strategic-planning", "organization-design", "performance-management", "human-resources", "executive-dashboard"] as const;

function toArray(value: unknown): string[] {
  if (Array.isArray(value)) return value.filter((v): v is string => typeof v === "string");
  if (value && typeof value === "object") {
    return Object.keys(value)
      .sort((a, b) => Number(a) - Number(b))
      .map((k) => (value as Record<string, string>)[k])
      .filter((v): v is string => typeof v === "string");
  }
  return [];
}

export function generateStaticParams() {
  return slugs.flatMap((slug) =>
    (["tr", "en", "fr"] as const).map((locale) => ({ locale, slug }))
  );
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!slugs.includes(slug as (typeof slugs)[number])) notFound();

  const t = await getTranslations(locale as "tr" | "en" | "fr");
  const detail = t.serviceDetail as Record<string, unknown>;
  const steps = (detail?.steps as Record<string, string>) ?? {};
  const key = SLUG_TO_KEY[slug];
  const serviceData = key ? (t as Record<string, unknown>)[key] as Record<string, unknown> | undefined : undefined;
  const cta = t.cta as Record<string, string>;

  if (!serviceData) notFound();

  const title = serviceData.title as string;
  const tagline = serviceData.tagline as string;
  const painPoints = toArray(serviceData.painPoints);
  const deliverables = toArray(serviceData.deliverables);

  const images = (t as Record<string, unknown>).images as Record<string, string> | undefined;
  const imageKey = SLUG_TO_IMAGE_KEY[slug];
  const heroImageUrl = imageKey && images?.[imageKey] ? String(images[imageKey]).trim() : undefined;

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
        <HeroPlaceholder title={title} tagline={tagline} size="mini" imageUrl={heroImageUrl} imageAlt={title} />
      </Section>

      {painPoints.length > 0 && (
        <Section className="bg-zinc-50/30">
          <h2 className="mb-8 text-xl font-semibold text-zinc-900 md:text-2xl">
            {(detail?.painPoints as string) ?? ""}
          </h2>
          <ul className="space-y-6">
            {painPoints.map((text, i) => {
              const Icon = PAIN_POINT_ICONS[i % PAIN_POINT_ICONS.length];
              return (
                <li key={i} className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-zinc-100 text-zinc-700">
                    <Icon size={20} strokeWidth={1.5} />
                  </div>
                  <p className="pt-1.5 text-zinc-600">{text}</p>
                </li>
              );
            })}
          </ul>
        </Section>
      )}

      {deliverables.length > 0 && (
        <Section>
          <h2 className="mb-8 text-xl font-semibold text-zinc-900 md:text-2xl">
            {(detail?.deliverables as string) ?? ""}
          </h2>
          <ul className="space-y-4">
            {deliverables.map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <CheckCircle2
                  size={20}
                  className="mt-0.5 shrink-0 text-emerald-600"
                />
                <span className="text-zinc-600">{item}</span>
              </li>
            ))}
          </ul>
        </Section>
      )}

      <Section className="bg-zinc-50/30">
        <h2 className="mb-8 text-xl font-semibold text-zinc-900 md:text-2xl">
          {(detail?.approach as string) ?? ""}
        </h2>
        <Stepper steps={STEPS} />
      </Section>

      <Section>
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
