import { Target, Zap, BarChart3, Users } from "lucide-react";
import {
  Section,
  IconCard,
  Stepper,
  CTABox,
  HeroPlaceholder,
} from "@/components";
import { getPageContent } from "@/lib/content";

const HOME_ICON_CARDS = [
  {
    icon: Target,
    title: "Strategy",
    description: "Clarify direction and align resources for growth.",
  },
  {
    icon: Zap,
    title: "Operations",
    description: "Streamline processes and reduce waste.",
  },
  {
    icon: BarChart3,
    title: "Transformation",
    description: "Navigate change with minimal disruption.",
  },
  {
    icon: Users,
    title: "People",
    description: "Build capability and strengthen culture.",
  },
];

const STEPS = [
  { title: "Discover", description: "Understand your context, goals, and constraints." },
  { title: "Diagnose", description: "Analyze data, map processes, identify root causes." },
  { title: "Design", description: "Develop recommendations and implementation roadmap." },
  { title: "Deliver", description: "Execute with your team, building capabilities." },
  { title: "Sustain", description: "Embed changes, measure outcomes, iterate." },
];

export default function HomePage() {
  const content = getPageContent("home");

  return (
    <>
      <Section className="pb-8 md:pb-12">
        <HeroPlaceholder
          title={content?.frontmatter.title ?? "Premium Management Consulting"}
          tagline={content?.frontmatter.tagline}
          abstract={content?.frontmatter.hero_abstract}
          size="full"
        />
      </Section>

      <Section className="bg-zinc-50/30">
        <h2 className="mb-10 text-2xl font-semibold text-zinc-900 md:text-3xl">
          Why Partner With Us
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {HOME_ICON_CARDS.map((item) => (
            <IconCard
              key={item.title}
              icon={item.icon}
              title={item.title}
              description={item.description}
            />
          ))}
        </div>
      </Section>

      <Section>
        <h2 className="mb-10 text-2xl font-semibold text-zinc-900 md:text-3xl">
          Our Approach
        </h2>
        <Stepper steps={STEPS} />
      </Section>

      <Section className="bg-zinc-50/30">
        <CTABox
          title={content?.frontmatter.tagline ? "Ready to Start?" : undefined}
          description="Let's discuss how we can help you achieve your strategic objectives."
        />
      </Section>
    </>
  );
}
