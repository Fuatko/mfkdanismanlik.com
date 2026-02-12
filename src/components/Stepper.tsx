import { ReactNode } from "react";

export interface StepperStep {
  title: string;
  description?: string;
}

interface StepperProps {
  steps: StepperStep[];
  children?: (step: StepperStep, index: number) => ReactNode;
}

export function Stepper({ steps, children }: StepperProps) {
  return (
    <div className="space-y-8 md:space-y-12">
      {steps.map((step, i) => (
        <div
          key={i}
          className="flex flex-col gap-4 md:flex-row md:gap-8"
        >
          <div className="flex shrink-0 items-start">
            <span className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-zinc-900 bg-white text-sm font-semibold text-zinc-900">
              {i + 1}
            </span>
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-lg font-semibold text-zinc-900">{step.title}</h3>
            {step.description && (
              <p className="mt-2 text-sm text-zinc-600">{step.description}</p>
            )}
            {children?.(step, i)}
          </div>
        </div>
      ))}
    </div>
  );
}
