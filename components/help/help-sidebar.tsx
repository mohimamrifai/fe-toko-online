import Link from "next/link";

import { HELP_LINKS } from "@/lib/content/help";
import { cn } from "@/lib/utils";

type HelpSidebarProps = {
  currentPath: string;
};

export function HelpSidebar({ currentPath }: HelpSidebarProps) {
  return (
    <aside className="h-fit rounded-xl border bg-card p-4">
      <h2 className="text-sm font-semibold text-foreground">Pusat Bantuan</h2>
      <nav className="mt-3 space-y-1">
        {HELP_LINKS.map((link) => {
          const isActive = currentPath === link.href;

          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "block rounded-md px-3 py-2 text-sm transition-colors",
                isActive
                  ? "bg-primary/10 font-medium text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
