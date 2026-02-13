import {
  Wrench,
  Ruler,
  Target,
  MessageSquare,
  BarChart3,
} from "lucide-react";
import { Section, Stepper, CTABox } from "@/components";
import { getTranslations } from "@/lib/i18n";

export default async function MethodologyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = getTranslations(locale as "tr" | "en" | "fr");
  const m = t.methodology as Record<string, unknown>;
  const steps = (m?.steps as Record<string, string>) ?? {};
  const tools = (m?.tools as Record<string, string>) ?? {};
  const cta = t.cta as Record<string, string>;

  const STEPS = [
    { title: steps.discover, description: steps.discoverDesc },
    { title: steps.diagnose, description: steps.diagnoseDesc },
    { title: steps.design, description: steps.designDesc },
    { title: steps.deliver, description: steps.deliverDesc },
    { title: steps.sustain, description: steps.sustainDesc },
  ];

  const TOOLBOX_ICONS = [
    { icon: Wrench, label: tools.valueStream },
    { icon: Ruler, label: tools.scorecard },
    { icon: Target, label: tools.stakeholder },
    { icon: MessageSquare, label: tools.facilitation },
    { icon: BarChart3, label: tools.metrics },
  ];

  return (
    <>
      <Section>
        <h1 className="mb-4 text-3xl font-semibold text-zinc-900 md:text-4xl">
          {(m?.title as string) ?? "Methodology"}
        </h1>
        <p className="mb-12 max-w-2xl text-lg text-zinc-600">
          {(m?.tagline as string) ?? ""}
        </p>

        <h2 className="mb-10 text-xl font-semibold text-zinc-900 md:text-2xl">
          {(m?.fiveStep as string) ?? ""}
        </h2>
        <Stepper steps={STEPS} />
      </Section>

      <Section className="bg-zinc-50/30">
        <h2 className="mb-8 text-xl font-semibold text-zinc-900 md:text-2xl">
          {(m?.toolbox as string) ?? ""}
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {TOOLBOX_ICONS.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex flex-col items-center gap-3 rounded-xl border border-zinc-200/80 bg-white p-6 text-center"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-zinc-100 text-zinc-700">
                <Icon size={24} strokeWidth={1.5} />
              </div>
              <span className="text-sm font-medium text-zinc-700">{label}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <CTABox href={`/${locale}/contact`} label={cta?.button} />
      </Section>
    </>
  );
}
