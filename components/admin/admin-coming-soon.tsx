import { Construction } from "lucide-react";

type AdminComingSoonProps = {
  title: string;
  description?: string;
};

export function AdminComingSoon({ title, description }: AdminComingSoonProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border bg-card px-6 py-16 text-center">
      <Construction className="size-12 text-muted-foreground" />
      <h2 className="mt-4 text-lg font-semibold text-foreground">{title}</h2>
      <p className="mt-2 max-w-md text-sm text-muted-foreground">
        {description ??
          "Fitur ini sedang dalam pengembangan dan akan segera tersedia."}
      </p>
    </div>
  );
}
