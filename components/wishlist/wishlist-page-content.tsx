"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

import { ProductCardsGrid } from "@/components/commons/product-cards-grid";
import { useWishlist } from "@/components/providers/wishlist-provider";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { getWishlist } from "@/lib/api/wishlist";
import type { WishlistItem } from "@/types/wishlist";

export function WishlistPageContent() {
  const { items: providerItems, isHydrated } = useWishlist();
  const [items, setItems] = useState<WishlistItem[]>(providerItems);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadWishlist = useCallback(async () => {
    setError(null);

    try {
      const data = await getWishlist();
      setItems(data);
    } catch (loadError) {
      setError(
        loadError instanceof Error
          ? loadError.message
          : "Gagal memuat wishlist.",
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!isHydrated) {
      return;
    }

    // eslint-disable-next-line react-hooks/set-state-in-effect -- initial wishlist fetch
    void loadWishlist();
  }, [isHydrated, loadWishlist]);

  if (!isHydrated || isLoading) {
    return (
      <section className="mx-auto flex max-w-7xl items-center justify-center px-4 py-16 md:px-8">
        <Spinner className="size-6 text-muted-foreground" />
      </section>
    );
  }

  if (error) {
    return (
      <section className="mx-auto max-w-7xl px-4 py-16 text-center md:px-8">
        <p className="text-sm text-destructive" role="alert">{error}</p>
        <Button className="mt-4" onClick={() => void loadWishlist()}>
          Coba Lagi
        </Button>
      </section>
    );
  }

  if (items.length === 0) {
    return (
      <section className="mx-auto max-w-7xl px-4 py-16 text-center md:px-8">
        <Heart className="mx-auto size-10 text-muted-foreground" />
        <h1 className="mt-4 text-xl font-bold text-foreground md:text-2xl">
          Wishlist Kosong
        </h1>
        <p className="mt-3 text-sm text-muted-foreground md:text-base">
          Simpan produk favorit Anda di sini untuk dibeli nanti.
        </p>
        <Button
          nativeButton={false}
          render={<Link href="/" />}
          className="mt-6"
        >
          Mulai Belanja
        </Button>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 md:px-8">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-foreground md:text-2xl">
          Wishlist Saya
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {items.length} produk tersimpan
        </p>
      </div>
      <ProductCardsGrid products={items} />
    </section>
  );
}
