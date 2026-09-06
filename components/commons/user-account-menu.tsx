"use client";

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
import {
  User,
  Package,
  Heart,
  MapPin,
  Settings,
  HelpCircle,
  LogOut,
} from "lucide-react";
import Link from "next/link";

export default function UserAccountMenu() {
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
          <DropdownMenuLabel>Akun Saya</DropdownMenuLabel>
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
          <DropdownMenuItem className="text-destructive focus:text-destructive">
            <LogOut className="mr-2 h-4 w-4" />
            Keluar
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
