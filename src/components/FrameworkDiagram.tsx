interface FrameworkBlock {
  title: string;
  description?: string;
}

interface FrameworkDiagramProps {
  blocks: FrameworkBlock[];
  columns?: 2 | 4;
}

export function FrameworkDiagram({ blocks, columns = 2 }: FrameworkDiagramProps) {
  return (
    <div
      className={`grid gap-4 md:gap-6 ${
        columns === 4
          ? "grid-cols-2 lg:grid-cols-4"
          : "grid-cols-1 md:grid-cols-2"
      }`}
    >
      {blocks.map((block, i) => (
        <div
          key={i}
          className="rounded-xl border border-zinc-200/80 bg-white p-6 shadow-sm"
        >
          <h3 className="text-base font-semibold text-zinc-900">{block.title}</h3>
          {block.description && (
            <p className="mt-2 text-sm text-zinc-600">{block.description}</p>
          )}
        </div>
      ))}
    </div>
  );
}
