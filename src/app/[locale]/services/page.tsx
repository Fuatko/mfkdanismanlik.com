import Link from "next/link";
import { Target, Layout, BarChart3 } from "lucide-react";
import {
  Section,
  IconCard,
  CTABox,
  FrameworkDiagram,
} from "@/components";
import { getTranslations } from "@/lib/i18n";

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations(locale as "tr" | "en" | "fr");
  const srv = t.services as Record<string, unknown>;
  const blocks = (srv?.frameworkBlocks as Record<string, string>) ?? {};
  const cta = t.cta as Record<string, string>;

  const SERVICE_CARDS = [
    { icon: Target, title: srv.strategicPlanning, description: srv.strategicPlanningDesc, href: "/services/strategic-planning" },
    { icon: Layout, title: srv.organizationDesign, description: srv.organizationDesignDesc, href: "/services/organization-design" },
    { icon: BarChart3, title: srv.performanceManagement, description: srv.performanceManagementDesc, href: "/services/performance-management" },
  ];

  const FRAMEWORK_BLOCKS = [
    { title: blocks.diagnose, description: blocks.diagnoseDesc },
    { title: blocks.design, description: blocks.designDesc },
    { title: blocks.implement, description: blocks.implementDesc },
    { title: blocks.sustain, description: blocks.sustainDesc },
  ];

  return (
    <>
      <Section>
        <h1 className="mb-4 text-3xl font-semibold text-zinc-900 md:text-4xl">
          {(srv?.title as string) ?? "Services"}
        </h1>
        <p className="mb-12 max-w-2xl text-lg text-zinc-600">
          {(srv?.tagline as string) ?? ""}
        </p>

        <h2 className="mb-8 text-xl font-semibold text-zinc-900 md:text-2xl">
          {(srv?.serviceAreas as string) ?? ""}
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICE_CARDS.map((item) => (
            <Link key={String(item.title)} href={`/${locale}${item.href}`}>
              <IconCard
                icon={item.icon}
                title={String(item.title ?? "")}
                description={String(item.description ?? "")}
              />
            </Link>
          ))}
        </div>
      </Section>

      <Section className="bg-zinc-50/30">
        <h2 className="mb-8 text-xl font-semibold text-zinc-900 md:text-2xl">
          {(srv?.framework as string) ?? ""}
        </h2>
        <FrameworkDiagram blocks={FRAMEWORK_BLOCKS} columns={4} />
      </Section>

      <Section>
        <CTABox href={`/${locale}/contact`} label={cta?.button} />
      </Section>
    </>
  );
}
