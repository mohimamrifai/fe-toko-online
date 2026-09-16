"use client";

import Link from "next/link";
import { ArrowLeft, Store } from "lucide-react";

import { ADMIN_NAV_ITEMS } from "@/lib/admin/nav";
import { cn } from "@/lib/utils";

type AdminSidebarProps = {
  currentPath: string;
  onNavigate?: () => void;
};

export function AdminSidebar({ currentPath, onNavigate }: AdminSidebarProps) {
  return (
    <div className="flex h-full flex-col">
      <div className="border-b px-4 py-5">
        <Link
          href="/admin"
          className="flex items-center gap-2 font-semibold text-foreground"
          onClick={onNavigate}
        >
          <Store className="size-5 text-primary" />
          <span>Admin Panel</span>
        </Link>
        <p className="mt-1 text-xs text-muted-foreground">TokoElektronik</p>
      </div>

      <nav className="flex-1 space-y-1 p-3">
        {ADMIN_NAV_ITEMS.map((item) => {
          const isActive = item.exact
            ? currentPath === item.href
            : currentPath === item.href ||
              currentPath.startsWith(`${item.href}/`);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors",
                isActive
                  ? "bg-primary/10 font-medium text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
            >
              <Icon className="size-4 shrink-0" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t p-3">
        <Link
          href="/"
          onClick={onNavigate}
          className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Kembali ke Toko
        </Link>
      </div>
    </div>
  );
}
