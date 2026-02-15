export default function PanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-zinc-100 py-8">
      <div className="mx-auto max-w-4xl px-4">
        {children}
      </div>
    </div>
  );
}
