"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import BrandLogo from "../commons/brand-logo";
import SearchMobile from "../commons/search-mobile";
import WishlistButton from "../commons/wishlist-button";
import ShoppingCart from "../commons/shopping-cart";
import UserAccountMenu from "../commons/user-account-menu";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Categories", href: "/categories" },
  { label: "Brands", href: "/brands" },
  { label: "Promos", href: "/promotions" },
];

export function HeaderContent() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
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
        <SearchMobile />
        <WishlistButton />
        <ShoppingCart />
        <UserAccountMenu />
      </div>
    </div>
  );
}
