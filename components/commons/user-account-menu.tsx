"use client";

import Link from "next/link";
import {
  User,
  Package,
  Heart,
  MapPin,
  Settings,
  HelpCircle,
  LogOut,
  LogIn,
  UserPlus,
} from "lucide-react";

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

export default function UserAccountMenu() {
  const { user, isLoading, isAuthenticated, logout } = useAuth();

  if (isLoading) {
    return (
      <Button variant="outline" size="icon" className="rounded-full" disabled>
        <User className="h-5 w-5" />
      </Button>
    );
  }

  if (!isAuthenticated || !user) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button variant="outline" size="icon" className="rounded-full">
              <User className="h-5 w-5" />
            </Button>
          }
        />
        <DropdownMenuContent className="w-56" align="end">
          <DropdownMenuGroup>
            <DropdownMenuLabel>Akun</DropdownMenuLabel>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem render={<Link href="/login" />}>
              <LogIn className="mr-2 h-4 w-4" />
              Masuk
            </DropdownMenuItem>
            <DropdownMenuItem render={<Link href="/register" />}>
              <UserPlus className="mr-2 h-4 w-4" />
              Daftar
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button variant="outline" size="icon" className="rounded-full">
            <User className="h-5 w-5" />
          </Button>
        }
      />
      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuGroup>
          <DropdownMenuLabel>
            <span className="block truncate font-medium">{user.name}</span>
            <span className="block truncate text-xs font-normal text-muted-foreground">
              {user.email}
            </span>
          </DropdownMenuLabel>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem render={<Link href="/profile" />}>
            <User className="mr-2 h-4 w-4" />
            Profil
          </DropdownMenuItem>
          <DropdownMenuItem render={<Link href="/orders" />}>
            <Package className="mr-2 h-4 w-4" />
            Pesanan Saya
          </DropdownMenuItem>
          <DropdownMenuItem render={<Link href="/wishlist" />}>
            <Heart className="mr-2 h-4 w-4" />
            Wishlist
          </DropdownMenuItem>
          <DropdownMenuItem render={<Link href="/address" />}>
            <MapPin className="mr-2 h-4 w-4" />
            Alamat Pengiriman
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem render={<Link href="/settings" />}>
            <Settings className="mr-2 h-4 w-4" />
            Pengaturan Akun
          </DropdownMenuItem>
          <DropdownMenuItem render={<Link href="/help" />}>
            <HelpCircle className="mr-2 h-4 w-4" />
            Bantuan
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem
            className="text-destructive focus:text-destructive"
            onClick={logout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Keluar
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
