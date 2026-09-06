"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, Search, ShoppingBag, Heart, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import TopBanner from "./top-banner";
import BrandLogo from "../commons/brand-logo";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Shop All", href: "/shop" },
  { label: "New Arrivals", href: "/new" },
  { label: "Categories", href: "/categories" },
];

export function Header() {
  const [isOpen, setIsOpen] = React.useState(false);
  const cartItemCount = 3; // Example dynamic count

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      {/* Top Banner (Optional for promos) */}
      <TopBanner />

      <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-2">
        {/* Mobile Menu Trigger */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger
            render={
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden shrink-0"
              />
            }
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </SheetTrigger>
          <SheetContent side="left" className="w-75 sm:w-100">
            <SheetHeader className="text-left pb-4 border-b">
              <BrandLogo />
            </SheetHeader>
            <nav className="flex flex-col gap-3 mt-2 px-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-base font-medium transition-colors hover:text-primary"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>

        {/* Brand Logo */}
        <BrandLogo />

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors text-muted-foreground hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Search Bar (Desktop center/right) */}
        <div className="hidden sm:flex relative max-w-md w-full mx-4">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search products..."
            className="pl-8 w-full bg-muted/50 focus-visible:bg-background"
          />
        </div>

        {/* User Utility Actions */}
        <div className="flex items-center gap-1 sm:gap-2">
          {/* Search trigger for mobile view only */}
          <Button variant="ghost" size="icon" className="sm:hidden">
            <Search className="h-5 w-5" />
          </Button>

          {/* Wishlist */}
          <Button
            variant="ghost"
            size="icon"
            className="hidden xs:flex"
            nativeButton={false}
            render={<Link href="/wishlist" />}
          >
            <Heart className="h-5 w-5" />
            <span className="sr-only">Wishlist</span>
          </Button>

          {/* Shopping Cart */}
          <Button
            variant="ghost"
            size="icon"
            className="relative"
            nativeButton={false}
            render={<Link href="/cart" />}
          >
            <ShoppingBag className="h-5 w-5" />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-[10px] font-bold text-primary-foreground flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
            <span className="sr-only">Cart</span>
          </Button>

          <Separator
            orientation="vertical"
            className="h-6 mx-1 hidden sm:block"
          />

          {/* User Profile Dropdown jika sudah login */}
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button variant="ghost" size="icon" className="rounded-full" />
              }
            >
              <User className="h-5 w-5" />
              <span className="sr-only">User account</span>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem render={<Link href="/profile" />}>
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem render={<Link href="/orders" />}>
                Orders
              </DropdownMenuItem>
              <DropdownMenuItem render={<Link href="/settings" />}>
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive focus:text-destructive">
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
