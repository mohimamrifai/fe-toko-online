import { HelpSidebar } from "@/components/help/help-sidebar";

type HelpPageShellProps = {
  title: string;
  description: string;
  currentPath: string;
  children: React.ReactNode;
};

export function HelpPageShell({
  title,
  description,
  currentPath,
  children,
}: HelpPageShellProps) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-8 md:px-8 md:py-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
          {title}
        </h1>
        <p className="mt-2 max-w-3xl text-sm text-muted-foreground md:text-base">
          {description}
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[260px_minmax(0,1fr)]">
        <HelpSidebar currentPath={currentPath} />
        <div className="min-w-0 rounded-xl border bg-card p-5 md:p-6">
          {children}
        </div>
      </div>
    </section>
  );
}
