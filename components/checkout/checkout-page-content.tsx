"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";

import { useCart } from "@/components/providers/cart-provider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Spinner } from "@/components/ui/spinner";
import { getAddresses } from "@/lib/api/address";
import { checkoutOrder } from "@/lib/api/order";
import { formatRupiah } from "@/lib/format-rupiah";
import {
  getShippingCost,
  SHIPPING_OPTIONS,
  type ShippingCourier,
} from "@/lib/shipping-options";
import type { Address } from "@/types/address";

const PLACEHOLDER_IMAGE =
  "https://placehold.co/600x600/png?text=Produk+Elektronik";

export function CheckoutPageContent() {
  const router = useRouter();
  const { items, subtotal, isHydrated, clearCart } = useCart();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState("");
  const [selectedCourier, setSelectedCourier] = useState<ShippingCourier>(
    SHIPPING_OPTIONS[0].courier,
  );
  const [isLoadingAddresses, setIsLoadingAddresses] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const loadAddresses = useCallback(async () => {
    setError(null);

    try {
      const data = await getAddresses();
      setAddresses(data);

      const defaultAddress = data.find((address) => address.isDefault) ?? data[0];

      if (defaultAddress) {
        setSelectedAddressId(defaultAddress.id);
      }
    } catch (loadError) {
      setError(
        loadError instanceof Error
          ? loadError.message
          : "Gagal memuat alamat. Silakan coba lagi.",
      );
    } finally {
      setIsLoadingAddresses(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- initial address fetch
    void loadAddresses();
  }, [loadAddresses]);

  useEffect(() => {
    if (!isLoadingAddresses && addresses.length === 0) {
      router.replace("/address");
    }
  }, [addresses.length, isLoadingAddresses, router]);

  const shippingCost = useMemo(
    () => getShippingCost(selectedCourier),
    [selectedCourier],
  );
  const total = subtotal + shippingCost;

  async function handleCheckout() {
    if (!selectedAddressId) {
      setError("Pilih alamat pengiriman terlebih dahulu.");
      return;
    }

    setError(null);
    setIsSubmitting(true);

    try {
      const order = await checkoutOrder({
        shippingAddressId: selectedAddressId,
        courier: selectedCourier,
      });

      clearCart();
      router.push(`/orders/${order.id}/confirmation`);
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Checkout gagal. Silakan coba lagi.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  if (!isHydrated) {
    return (
      <section className="mx-auto flex max-w-7xl items-center justify-center px-4 py-16 md:px-8">
        <Spinner className="size-6 text-muted-foreground" />
      </section>
    );
  }

  if (items.length === 0) {
    return (
      <section className="mx-auto max-w-7xl px-4 py-16 text-center md:px-8">
        <h1 className="text-xl font-bold text-foreground md:text-2xl">
          Checkout
        </h1>
        <p className="mt-3 text-sm text-muted-foreground md:text-base">
          Keranjang Anda kosong. Tambahkan produk terlebih dahulu.
        </p>
        <Button
          nativeButton={false}
          render={<Link href="/" />}
          className="mt-6"
        >
          Lanjut Belanja
        </Button>
      </section>
    );
  }

  if (isLoadingAddresses) {
    return (
      <section className="mx-auto flex max-w-7xl items-center justify-center px-4 py-16 md:px-8">
        <Spinner className="size-6 text-muted-foreground" />
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-6 md:px-8 md:py-8">
      <h1 className="text-xl font-bold text-foreground md:text-2xl">Checkout</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Lengkapi alamat pengiriman dan pilih kurir untuk menyelesaikan pesanan.
      </p>

      <div className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Alamat Pengiriman</CardTitle>
              <CardDescription>
                Pilih alamat tujuan pengiriman pesanan Anda.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={selectedAddressId}
                onValueChange={setSelectedAddressId}
                className="gap-3"
              >
                {addresses.map((address) => (
                  <label
                    key={address.id}
                    className="flex cursor-pointer items-start gap-3 rounded-xl border p-4 has-data-checked:border-primary has-data-checked:bg-primary/5"
                  >
                    <RadioGroupItem
                      value={address.id}
                      className="mt-1"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-medium text-foreground">
                          {address.label || "Alamat"}
                        </span>
                        {address.isDefault ? (
                          <Badge variant="secondary">Utama</Badge>
                        ) : null}
                      </div>
                      <p className="mt-1 text-sm font-medium text-foreground">
                        {address.recipientName} · {address.phone}
                      </p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {address.fullAddress}, {address.city}, {address.province}{" "}
                        {address.postalCode}
                      </p>
                    </div>
                  </label>
                ))}
              </RadioGroup>

              <Button
                nativeButton={false}
                render={<Link href="/address" />}
                variant="outline"
                className="mt-4"
              >
                Kelola Alamat
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Kurir Pengiriman</CardTitle>
              <CardDescription>
                Pilih layanan pengiriman yang tersedia.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={selectedCourier}
                onValueChange={(value) =>
                  setSelectedCourier(value as ShippingCourier)
                }
                className="gap-3"
              >
                {SHIPPING_OPTIONS.map((option) => (
                  <label
                    key={option.courier}
                    className="flex cursor-pointer items-center justify-between gap-3 rounded-xl border p-4 has-data-checked:border-primary has-data-checked:bg-primary/5"
                  >
                    <div className="flex items-center gap-3">
                      <RadioGroupItem value={option.courier} />
                      <span className="text-sm font-medium text-foreground">
                        {option.courier}
                      </span>
                    </div>
                    <span className="text-sm font-semibold text-foreground">
                      {formatRupiah(option.cost)}
                    </span>
                  </label>
                ))}
              </RadioGroup>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Ringkasan Pesanan</CardTitle>
              <CardDescription>
                {items.length} produk dalam pesanan ini.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {items.map((item) => (
                <article
                  key={`${item.productId}:${item.variantId ?? ""}`}
                  className="flex gap-4"
                >
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-muted">
                    <Image
                      src={item.image || PLACEHOLDER_IMAGE}
                      alt={item.name}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="line-clamp-2 text-sm font-medium text-foreground">
                      {item.name}
                    </p>
                    {item.variantName ? (
                      <p className="mt-1 text-xs text-muted-foreground">
                        Varian: {item.variantName}
                      </p>
                    ) : null}
                    <p className="mt-1 text-xs text-muted-foreground">
                      {item.quantity} x {formatRupiah(item.price)}
                    </p>
                  </div>
                  <p className="text-sm font-semibold text-foreground">
                    {formatRupiah(item.price * item.quantity)}
                  </p>
                </article>
              ))}
            </CardContent>
          </Card>
        </div>

        <aside className="h-fit rounded-xl border bg-card p-5">
          <h2 className="text-base font-semibold text-foreground">
            Total Pembayaran
          </h2>

          <div className="mt-4 space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="font-medium text-foreground">
                {formatRupiah(subtotal)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Ongkos Kirim</span>
              <span className="font-medium text-foreground">
                {formatRupiah(shippingCost)}
              </span>
            </div>
            <div className="flex items-center justify-between border-t pt-3 text-base">
              <span className="font-semibold text-foreground">Total</span>
              <span className="font-bold text-foreground">
                {formatRupiah(total)}
              </span>
            </div>
          </div>

          {error ? (
            <p className="mt-4 text-sm text-destructive" role="alert">{error}</p>
          ) : null}

          <Button
            className="mt-6 w-full"
            size="lg"
            disabled={isSubmitting || !selectedAddressId}
            onClick={() => {
              void handleCheckout();
            }}
          >
            {isSubmitting ? "Memproses..." : "Bayar Sekarang"}
          </Button>
        </aside>
      </div>
    </section>
  );
}
