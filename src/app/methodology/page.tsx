import {
  Wrench,
  Ruler,
  Target,
  MessageSquare,
  BarChart3,
} from "lucide-react";
import { Section, Stepper, CTABox } from "@/components";
import { getPageContent } from "@/lib/content";

const STEPS = [
  { title: "Discover", description: "Understand your context, goals, and constraints." },
  { title: "Diagnose", description: "Analyze data, map processes, identify root causes." },
  { title: "Design", description: "Develop recommendations and implementation roadmap." },
  { title: "Deliver", description: "Execute with your team, building capabilities along the way." },
  { title: "Sustain", description: "Embed changes, measure outcomes, iterate as needed." },
];

const TOOLBOX_ICONS = [
  { icon: Wrench, label: "Value Stream Mapping" },
  { icon: Ruler, label: "Balanced Scorecard" },
  { icon: Target, label: "Stakeholder Analysis" },
  { icon: MessageSquare, label: "Workshop Facilitation" },
  { icon: BarChart3, label: "Process Metrics" },
];

export default function MethodologyPage() {
  const content = getPageContent("methodology");

  return (
    <>
      <Section>
        <h1 className="mb-4 text-3xl font-semibold text-zinc-900 md:text-4xl">
          {content?.frontmatter.title ?? "Methodology"}
        </h1>
        <p className="mb-12 max-w-2xl text-lg text-zinc-600">
          {content?.frontmatter.tagline}
        </p>

        <h2 className="mb-10 text-xl font-semibold text-zinc-900 md:text-2xl">
          Five-Step Process
        </h2>
        <Stepper steps={STEPS} />
      </Section>

      <Section className="bg-zinc-50/30">
        <h2 className="mb-8 text-xl font-semibold text-zinc-900 md:text-2xl">
          Our Toolbox
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
        <CTABox />
      </Section>
    </>
  );
}
