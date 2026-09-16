"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";

import { AdminHeader } from "@/components/admin/admin-header";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { getAdminPageMeta } from "@/lib/admin/nav";

type AdminShellProps = {
  children: React.ReactNode;
};

export function AdminShell({ children }: AdminShellProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const pageMeta = getAdminPageMeta(pathname);

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="mx-auto flex min-h-screen max-w-[1600px]">
        <aside className="hidden w-64 shrink-0 border-r bg-card lg:sticky lg:top-0 lg:block lg:h-screen">
          <AdminSidebar currentPath={pathname} />
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <AdminHeader
            title={pageMeta.label}
            description={pageMeta.description}
            onMenuClick={() => setMobileOpen(true)}
          />
          <main className="flex-1 p-4 md:p-6">{children}</main>
        </div>
      </div>

      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="left" className="w-72 p-0" showCloseButton={true}>
          <AdminSidebar
            currentPath={pathname}
            onNavigate={() => setMobileOpen(false)}
          />
        </SheetContent>
      </Sheet>
    </div>
  );
}
