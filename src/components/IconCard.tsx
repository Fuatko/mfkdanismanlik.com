import { LucideIcon, ReactNode } from "react";

interface IconCardProps {
  icon: LucideIcon;
  title: string;
  description?: string;
  children?: ReactNode;
}

export function IconCard({ icon: Icon, title, description, children }: IconCardProps) {
  return (
    <div className="rounded-xl border border-zinc-200/80 bg-white p-6 shadow-sm transition hover:border-zinc-300/80 hover:shadow-md md:p-8">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-zinc-100 text-zinc-700">
        <Icon size={24} strokeWidth={1.5} />
      </div>
      <h3 className="mb-2 text-lg font-semibold text-zinc-900">{title}</h3>
      {description && <p className="text-sm text-zinc-600">{description}</p>}
      {children}
    </div>
  );
}
