"use client";

import Link from "next/link";
import { LogOut, Menu, User } from "lucide-react";

import { useAuth } from "@/components/providers/auth-provider";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type AdminHeaderProps = {
  title: string;
  description?: string;
  onMenuClick: () => void;
};

export function AdminHeader({
  title,
  description,
  onMenuClick,
}: AdminHeaderProps) {
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-20 border-b bg-card/95 backdrop-blur supports-backdrop-filter:bg-card/80">
      <div className="flex items-center justify-between gap-4 px-4 py-4 md:px-6">
        <div className="flex min-w-0 items-start gap-3">
          <Button
            variant="outline"
            size="icon"
            className="shrink-0 lg:hidden"
            onClick={onMenuClick}
            aria-label="Buka menu admin"
          >
            <Menu className="size-4" />
          </Button>
          <div className="min-w-0">
            <h1 className="truncate text-lg font-semibold text-foreground md:text-xl">
              {title}
            </h1>
            {description ? (
              <p className="mt-0.5 truncate text-sm text-muted-foreground">
                {description}
              </p>
            ) : null}
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button variant="outline" className="max-w-[220px] gap-2">
                <User className="size-4 shrink-0" />
                <span className="truncate">{user?.name ?? "Admin"}</span>
              </Button>
            }
          />
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuGroup>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col gap-1">
                  <span className="font-medium">{user?.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {user?.email}
                  </span>
                </div>
              </DropdownMenuLabel>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem render={<Link href="/profile" />}>
              Profil Saya
            </DropdownMenuItem>
            <DropdownMenuItem render={<Link href="/" />}>
              Kembali ke Toko
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={logout}>
              <LogOut className="mr-2 size-4" />
              Keluar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
