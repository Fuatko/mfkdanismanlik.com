import Link from "next/link";
import { Briefcase, Layout, TrendingUp, Building2 } from "lucide-react";
import {
  Section,
  IconCard,
  CTABox,
  FrameworkDiagram,
} from "@/components";
import { getPageContent } from "@/lib/content";

const SERVICE_CARDS = [
  {
    icon: Briefcase,
    title: "Strategy",
    description: "Strategic planning, portfolio optimization, growth strategy.",
    href: "/services/strategy",
  },
  {
    icon: Layout,
    title: "Operations",
    description: "Process improvement, supply chain, operational excellence.",
    href: "/services/operations",
  },
  {
    icon: TrendingUp,
    title: "Transformation",
    description: "Digital transformation, M&A integration, organizational change.",
    href: "/services/transformation",
  },
  {
    icon: Building2,
    title: "People",
    description: "Leadership development, talent strategy, culture transformation.",
    href: "/services/people",
  },
];

const FRAMEWORK_BLOCKS = [
  { title: "Diagnose", description: "Assess current state, identify gaps." },
  { title: "Design", description: "Develop target operating model." },
  { title: "Implement", description: "Execute with change management." },
  { title: "Sustain", description: "Embed capabilities and measure outcomes." },
];

export default function ServicesPage() {
  const content = getPageContent("services");

  return (
    <>
      <Section>
        <h1 className="mb-4 text-3xl font-semibold text-zinc-900 md:text-4xl">
          {content?.frontmatter.title ?? "Services"}
        </h1>
        <p className="mb-12 max-w-2xl text-lg text-zinc-600">
          {content?.frontmatter.tagline}
        </p>

        <h2 className="mb-8 text-xl font-semibold text-zinc-900 md:text-2xl">
          Our Service Areas
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICE_CARDS.map((item) => (
            <Link key={item.title} href={item.href}>
              <IconCard
                icon={item.icon}
                title={item.title}
                description={item.description}
              />
            </Link>
          ))}
        </div>
      </Section>

      <Section className="bg-zinc-50/30">
        <h2 className="mb-8 text-xl font-semibold text-zinc-900 md:text-2xl">
          Our Framework
        </h2>
        <FrameworkDiagram blocks={FRAMEWORK_BLOCKS} columns={4} />
      </Section>

      <Section>
        <CTABox />
      </Section>
    </>
  );
}
