"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";

import { useAuth } from "@/components/providers/auth-provider";
import { useCart } from "@/components/providers/cart-provider";
import { Button } from "@/components/ui/button";
import { formatRupiah } from "@/lib/format-rupiah";

const PLACEHOLDER_IMAGE =
  "https://placehold.co/600x600/png?text=Produk+Elektronik";

export function CartPageContent() {
  const { items, subtotal, updateQuantity, removeItem } = useCart();
  const { isAuthenticated } = useAuth();

  if (items.length === 0) {
    return (
      <section className="mx-auto max-w-7xl px-4 py-16 text-center md:px-8">
        <h1 className="text-xl font-bold text-foreground md:text-2xl">
          Keranjang Belanja
        </h1>
        <p className="mt-3 text-sm text-muted-foreground md:text-base">
          Keranjang Anda masih kosong. Yuk, mulai belanja produk elektronik
          favorit.
        </p>
        <Button render={<Link href="/" />} className="mt-6">
          Lanjut Belanja
        </Button>
      </section>
    );
  }

  const checkoutHref = isAuthenticated ? "/checkout" : "/login";

  return (
    <section className="mx-auto max-w-7xl px-4 py-6 md:px-8 md:py-8">
      <h1 className="text-xl font-bold text-foreground md:text-2xl">
        Keranjang Belanja
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        {items.length} produk di keranjang Anda
      </p>

      <div className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="space-y-4">
          {items.map((item) => (
            <article
              key={`${item.productId}:${item.variantId ?? ""}`}
              className="flex gap-4 rounded-xl border bg-card p-4"
            >
              <Link
                href={`/products/${item.slug}`}
                className="relative h-24 w-24 shrink-0 overflow-hidden rounded-lg bg-muted"
              >
                <Image
                  src={item.image || PLACEHOLDER_IMAGE}
                  alt={item.name}
                  fill
                  sizes="96px"
                  className="object-cover"
                />
              </Link>

              <div className="flex min-w-0 flex-1 flex-col gap-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <Link
                      href={`/products/${item.slug}`}
                      className="line-clamp-2 text-sm font-medium text-foreground hover:text-primary md:text-base"
                    >
                      {item.name}
                    </Link>
                    {item.variantName ? (
                      <p className="mt-1 text-xs text-muted-foreground">
                        Varian: {item.variantName}
                      </p>
                    ) : null}
                    <p className="mt-2 text-sm font-bold text-foreground md:text-base">
                      {formatRupiah(item.price)}
                    </p>
                  </div>

                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-sm"
                    aria-label={`Hapus ${item.name} dari keranjang`}
                    onClick={() => removeItem(item.productId, item.variantId)}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center rounded-lg border">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon-sm"
                      aria-label="Kurangi jumlah"
                      disabled={item.quantity <= 1}
                      onClick={() =>
                        updateQuantity(
                          item.productId,
                          item.variantId,
                          item.quantity - 1,
                        )
                      }
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="min-w-8 text-center text-sm font-medium">
                      {item.quantity}
                    </span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon-sm"
                      aria-label="Tambah jumlah"
                      disabled={item.quantity >= item.maxStock}
                      onClick={() =>
                        updateQuantity(
                          item.productId,
                          item.variantId,
                          item.quantity + 1,
                        )
                      }
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>

                  <p className="text-sm font-semibold text-foreground">
                    {formatRupiah(item.price * item.quantity)}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>

        <aside className="h-fit rounded-xl border bg-card p-5">
          <h2 className="text-base font-semibold text-foreground">
            Ringkasan Belanja
          </h2>

          <div className="mt-4 flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Subtotal</span>
            <span className="font-semibold text-foreground">
              {formatRupiah(subtotal)}
            </span>
          </div>

          <Button
            render={<Link href={checkoutHref} />}
            className="mt-6 w-full"
            size="lg"
          >
            Lanjut Checkout
          </Button>

          {!isAuthenticated ? (
            <p className="mt-3 text-center text-xs text-muted-foreground">
              Anda perlu masuk terlebih dahulu untuk melanjutkan checkout.
            </p>
          ) : null}
        </aside>
      </div>
    </section>
  );
}
