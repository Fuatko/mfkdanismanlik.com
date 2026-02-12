import { TrendingUp, Cog, Monitor, Users } from "lucide-react";
import { Section, IconCard, CTABox } from "@/components";
import { getPageContent } from "@/lib/content";

const CASE_CATEGORIES = [
  {
    icon: TrendingUp,
    title: "Strategy & Growth",
    description: "Strategic planning, market entry, portfolio optimization.",
  },
  {
    icon: Cog,
    title: "Operational Excellence",
    description: "Process redesign, cost reduction, quality improvement.",
  },
  {
    icon: Monitor,
    title: "Digital & Technology",
    description: "Digital transformation, technology roadmap.",
  },
  {
    icon: Users,
    title: "People & Culture",
    description: "Leadership development, culture change, talent strategy.",
  },
];

export default function CasesPage() {
  const content = getPageContent("cases");

  return (
    <>
      <Section>
        <h1 className="mb-4 text-3xl font-semibold text-zinc-900 md:text-4xl">
          {content?.frontmatter.title ?? "Case Studies"}
        </h1>
        <p className="mb-12 max-w-2xl text-lg text-zinc-600">
          {content?.frontmatter.tagline}
        </p>

        <h2 className="mb-8 text-xl font-semibold text-zinc-900 md:text-2xl">
          Selected Engagements
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {CASE_CATEGORIES.map((item) => (
            <IconCard
              key={item.title}
              icon={item.icon}
              title={item.title}
              description={item.description}
            />
          ))}
        </div>
      </Section>

      <Section className="bg-zinc-50/30">
        <CTABox />
      </Section>
    </>
  );
}
