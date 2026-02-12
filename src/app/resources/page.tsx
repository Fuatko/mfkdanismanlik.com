import { FileText, BookOpen, Video, Wrench } from "lucide-react";
import { Section, IconCard, CTABox } from "@/components";
import { getPageContent } from "@/lib/content";

const RESOURCE_TYPES = [
  {
    icon: FileText,
    title: "Articles",
    description: "Short reads on strategy, operations, and leadership.",
  },
  {
    icon: BookOpen,
    title: "Whitepapers",
    description: "Deep dives into specific topics and frameworks.",
  },
  {
    icon: Video,
    title: "Videos",
    description: "Webinars and explainers.",
  },
  {
    icon: Wrench,
    title: "Tools",
    description: "Templates and self-assessment tools.",
  },
];

export default function ResourcesPage() {
  const content = getPageContent("resources");

  return (
    <>
      <Section>
        <h1 className="mb-4 text-3xl font-semibold text-zinc-900 md:text-4xl">
          {content?.frontmatter.title ?? "Resources"}
        </h1>
        <p className="mb-12 max-w-2xl text-lg text-zinc-600">
          {content?.frontmatter.tagline}
        </p>

        <h2 className="mb-8 text-xl font-semibold text-zinc-900 md:text-2xl">
          Knowledge Hub
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {RESOURCE_TYPES.map((item) => (
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
