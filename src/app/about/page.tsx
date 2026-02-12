import { Shield, Award, Users, Target } from "lucide-react";
import { Section, IconCard, CTABox } from "@/components";
import { getPageContent } from "@/lib/content";

const VALUES = [
  {
    icon: Shield,
    title: "Integrity",
    description: "We provide honest advice, even when it's difficult.",
  },
  {
    icon: Award,
    title: "Excellence",
    description: "We bring the highest standards to every engagement.",
  },
  {
    icon: Users,
    title: "Collaboration",
    description: "We work with your team, not just for them.",
  },
  {
    icon: Target,
    title: "Impact",
    description: "We measure success by your outcomes, not our outputs.",
  },
];

export default function AboutPage() {
  const content = getPageContent("about");

  return (
    <>
      <Section>
        <h1 className="mb-4 text-3xl font-semibold text-zinc-900 md:text-4xl">
          {content?.frontmatter.title ?? "About Us"}
        </h1>
        <p className="mb-12 max-w-2xl text-lg text-zinc-600">
          {content?.frontmatter.tagline}
        </p>

        <h2 className="mb-6 text-xl font-semibold text-zinc-900 md:text-2xl">
          Who We Are
        </h2>
        <p className="mb-12 max-w-2xl text-zinc-600">
          We are a boutique management consulting firm focused on strategy, operations,
          and organizational effectiveness. Our team combines Big Four experience with
          hands-on industry expertise.
        </p>

        <h2 className="mb-8 text-xl font-semibold text-zinc-900 md:text-2xl">
          Our Values
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map((item) => (
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
