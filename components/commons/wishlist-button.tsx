"use client";

import Link from "next/link";
import { Heart } from "lucide-react";

import { useWishlist } from "@/components/providers/wishlist-provider";
import { Button } from "../ui/button";

export default function WishlistButton() {
  const { itemCount, isHydrated } = useWishlist();
  const displayCount = isHydrated ? itemCount : 0;

  return (
    <Button
      variant="ghost"
      size="icon"
      className="relative hidden md:flex"
      nativeButton={false}
      render={<Link href="/wishlist" />}
    >
      <Heart className="h-5 w-5" />
      {displayCount > 0 && (
        <span className="absolute -top-1 -right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground">
          {displayCount > 99 ? "99+" : displayCount}
        </span>
      )}
      <span className="sr-only">Wishlist</span>
    </Button>
  );
}
