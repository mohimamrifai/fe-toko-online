"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import { OrderStatusBadge } from "@/components/orders/order-status-badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { getOrder } from "@/lib/api/order";
import { formatOrderDate } from "@/lib/format-date";
import { formatRupiah } from "@/lib/format-rupiah";
import type { OrderDetail } from "@/types/order";

const PLACEHOLDER_IMAGE =
  "https://placehold.co/600x600/png?text=Produk+Elektronik";

export function OrderDetailContent() {
  const params = useParams<{ id: string }>();
  const [order, setOrder] = useState<OrderDetail | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadOrder = useCallback(async () => {
    if (!params.id) {
      return;
    }

    setError(null);

    try {
      const data = await getOrder(params.id);
      setOrder(data);
    } catch (loadError) {
      setError(
        loadError instanceof Error
          ? loadError.message
          : "Gagal memuat detail pesanan.",
      );
    } finally {
      setIsLoading(false);
    }
  }, [params.id]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- initial order fetch
    void loadOrder();
  }, [loadOrder]);

  if (isLoading) {
    return (
      <section className="mx-auto flex max-w-7xl items-center justify-center px-4 py-16 md:px-8">
        <Spinner className="size-6 text-muted-foreground" />
      </section>
    );
  }

  if (error || !order) {
    return (
      <section className="mx-auto max-w-2xl px-4 py-16 text-center md:px-8">
        <h1 className="text-xl font-bold text-foreground md:text-2xl">
          Pesanan Tidak Ditemukan
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          {error ?? "Detail pesanan tidak tersedia."}
        </p>
        <Button
          nativeButton={false}
          render={<Link href="/orders" />}
          className="mt-6"
        >
          Kembali ke Daftar Pesanan
        </Button>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-6 md:px-8 md:py-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-xl font-bold text-foreground md:text-2xl">
            Detail Pesanan
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {order.orderNumber} · {formatOrderDate(order.createdAt)}
          </p>
          <div className="mt-3">
            <OrderStatusBadge status={order.status} />
          </div>
        </div>

        {order.status === "pending" ? (
          <Button
            nativeButton={false}
            render={<Link href={`/orders/${order.id}/pay`} />}
          >
            Bayar Sekarang
          </Button>
        ) : null}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Item Pesanan</CardTitle>
              <CardDescription>
                {order.itemCount} produk dalam pesanan ini.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {order.items.map((item) => (
                <article key={item.id} className="flex gap-4">
                  <Link
                    href={`/products/${item.slug}`}
                    className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-muted"
                  >
                    <Image
                      src={item.image || PLACEHOLDER_IMAGE}
                      alt={item.productName}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </Link>
                  <div className="min-w-0 flex-1">
                    <Link
                      href={`/products/${item.slug}`}
                      className="line-clamp-2 text-sm font-medium text-foreground hover:text-primary"
                    >
                      {item.productName}
                    </Link>
                    {item.variantName ? (
                      <p className="mt-1 text-xs text-muted-foreground">
                        Varian: {item.variantName}
                      </p>
                    ) : null}
                    <p className="mt-2 text-sm text-muted-foreground">
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

          <Card>
            <CardHeader>
              <CardTitle>Alamat Pengiriman</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              <p className="font-medium text-foreground">
                {order.shippingAddress.recipientName} ·{" "}
                {order.shippingAddress.phone}
              </p>
              <p className="mt-2">
                {order.shippingAddress.fullAddress},{" "}
                {order.shippingAddress.city}, {order.shippingAddress.province}{" "}
                {order.shippingAddress.postalCode}
              </p>
              {order.courier ? (
                <p className="mt-2">Kurir: {order.courier}</p>
              ) : null}
              {order.trackingNumber ? (
                <p className="mt-1">
                  No. Resi: {order.trackingNumber}
                </p>
              ) : null}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Status Pesanan</CardTitle>
              <CardDescription>
                Riwayat perubahan status pesanan Anda.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ol className="space-y-4">
                {order.statusHistory.map((entry, index) => (
                  <li key={entry.id} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <span
                        className={`mt-1 size-2.5 rounded-full ${
                          index === order.statusHistory.length - 1
                            ? "bg-primary"
                            : "bg-muted-foreground/40"
                        }`}
                      />
                      {index < order.statusHistory.length - 1 ? (
                        <span className="mt-1 h-full w-px bg-border" />
                      ) : null}
                    </div>
                    <div className="pb-2">
                      <p className="text-sm font-medium capitalize text-foreground">
                        {entry.status}
                      </p>
                      {entry.note ? (
                        <p className="mt-1 text-sm text-muted-foreground">
                          {entry.note}
                        </p>
                      ) : null}
                      <p className="mt-1 text-xs text-muted-foreground">
                        {formatOrderDate(entry.createdAt)}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>
        </div>

        <aside className="h-fit rounded-xl border bg-card p-5">
          <h2 className="text-base font-semibold text-foreground">
            Ringkasan Pembayaran
          </h2>
          <div className="mt-4 space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span>{formatRupiah(order.subtotal)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Ongkos Kirim</span>
              <span>{formatRupiah(order.shippingCost)}</span>
            </div>
            {order.discountAmount > 0 ? (
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Diskon</span>
                <span>-{formatRupiah(order.discountAmount)}</span>
              </div>
            ) : null}
            <div className="flex items-center justify-between border-t pt-3 text-base font-semibold">
              <span>Total</span>
              <span>{formatRupiah(order.total)}</span>
            </div>
          </div>

          <Button
            nativeButton={false}
            render={<Link href="/orders" />}
            variant="outline"
            className="mt-6 w-full"
          >
            Kembali ke Daftar Pesanan
          </Button>
        </aside>
      </div>
    </section>
  );
}
