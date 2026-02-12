import { notFound } from "next/navigation";
import { AlertCircle, Clock, PieChart, CheckCircle2 } from "lucide-react";
import {
  Section,
  HeroPlaceholder,
  Stepper,
  CTABox,
} from "@/components";
import { getPageContent, getAllPageSlugs } from "@/lib/content";

const PAIN_POINT_ICONS = [AlertCircle, Clock, PieChart];

const STEPS = [
  { title: "Discover", description: "Understand your context and goals." },
  { title: "Diagnose", description: "Analyze gaps and root causes." },
  { title: "Design", description: "Develop recommendations and roadmap." },
  { title: "Deliver", description: "Execute with your team." },
  { title: "Sustain", description: "Embed changes and measure outcomes." },
];

const DELIVERABLES: Record<string, string[]> = {
  strategy: [
    "Strategic plan with clear objectives and KPIs",
    "Portfolio prioritization and resource allocation framework",
    "Executive alignment workshops",
    "Roadmap for implementation and governance",
  ],
  operations: [
    "Process maps and value stream analysis",
    "Target operating model and improvement roadmap",
    "Pilot implementation with your team",
    "Metrics dashboard and governance model",
  ],
  transformation: [
    "Change impact assessment and stakeholder map",
    "Communications and training plan",
    "Integration playbook (for M&A) or transformation roadmap",
    "Post-implementation review and sustain plan",
  ],
  people: [
    "Organization design and role clarity",
    "Leadership development program design",
    "Culture assessment and action plan",
    "Talent and succession planning framework",
  ],
};

const PAIN_POINTS: Record<string, string[]> = {
  strategy: [
    "Unclear priorities — Too many initiatives, limited focus",
    "Slow decision-making — Analysis paralysis or reactive firefighting",
    "Execution gaps — Great plans that never fully land",
  ],
  operations: [
    "Inefficient processes — Red tape, rework, and bottlenecks",
    "Rising costs — Operational spend growing faster than revenue",
    "Quality issues — Defects, delays, and customer complaints",
  ],
  transformation: [
    "Resistance to change — People clinging to old ways",
    "Scope creep — Projects that grow beyond original intent",
    "Value leakage — Benefits that don't materialize post-go-live",
  ],
  people: [
    "Leadership gaps — Key roles without the right capabilities",
    "Misaligned culture — Values on the wall don't match behavior",
    "Talent attrition — Losing your best people to competitors",
  ],
};

export async function generateStaticParams() {
  const slugs = getAllPageSlugs();
  return slugs
    .filter((s) => s.startsWith("services/") && s !== "services")
    .map((slug) => ({ slug: slug.replace("services/", "") }));
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const fullSlug = `services/${slug}`;
  const content = getPageContent(fullSlug);

  if (!content) notFound();

  const painPoints = PAIN_POINTS[slug] ?? [];
  const deliverables = DELIVERABLES[slug] ?? [];

  return (
    <>
      <Section className="pb-8 md:pb-12">
        <HeroPlaceholder
          title={content.frontmatter.title}
          tagline={content.frontmatter.tagline}
          size="mini"
        />
      </Section>

      {painPoints.length > 0 && (
        <Section className="bg-zinc-50/30">
          <h2 className="mb-8 text-xl font-semibold text-zinc-900 md:text-2xl">
            Common Pain Points
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
            What You Get
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
          Our Approach
        </h2>
        <Stepper steps={STEPS} />
      </Section>

      <Section>
        <CTABox
          title="Ready to Start?"
          description={`Let's discuss how we can help with ${content.frontmatter.title}.`}
        />
      </Section>
    </>
  );
}
