type LegalPageShellProps = {
  title: string;
  description: string;
  children: React.ReactNode;
};

export function LegalPageShell({
  title,
  description,
  children,
}: LegalPageShellProps) {
  return (
    <section className="mx-auto max-w-3xl px-4 py-8 md:px-8 md:py-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
          {title}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground md:text-base">
          {description}
        </p>
      </div>
      <div className="rounded-xl border bg-card p-5 md:p-6">{children}</div>
    </section>
  );
}
