"use client";

import Image from "next/image";
import Link from "next/link";
import { Package } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

import { OrderStatusBadge } from "@/components/orders/order-status-badge";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { getOrders } from "@/lib/api/order";
import { formatOrderDate } from "@/lib/format-date";
import { formatRupiah } from "@/lib/format-rupiah";
import type { OrderSummary } from "@/types/order";

const PLACEHOLDER_IMAGE =
  "https://placehold.co/600x600/png?text=Produk+Elektronik";

export function OrdersPageContent() {
  const [orders, setOrders] = useState<OrderSummary[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadOrders = useCallback(async () => {
    setError(null);

    try {
      const data = await getOrders();
      setOrders(data);
    } catch (loadError) {
      setError(
        loadError instanceof Error
          ? loadError.message
          : "Gagal memuat daftar pesanan.",
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- initial orders fetch
    void loadOrders();
  }, [loadOrders]);

  if (isLoading) {
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
        <Button className="mt-4" onClick={() => void loadOrders()}>
          Coba Lagi
        </Button>
      </section>
    );
  }

  if (orders.length === 0) {
    return (
      <section className="mx-auto max-w-7xl px-4 py-16 text-center md:px-8">
        <Package className="mx-auto size-10 text-muted-foreground" />
        <h1 className="mt-4 text-xl font-bold text-foreground md:text-2xl">
          Belum Ada Pesanan
        </h1>
        <p className="mt-3 text-sm text-muted-foreground md:text-base">
          Pesanan Anda akan muncul di sini setelah checkout berhasil.
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
    <section className="mx-auto max-w-7xl px-4 py-6 md:px-8 md:py-8">
      <h1 className="text-xl font-bold text-foreground md:text-2xl">
        Pesanan Saya
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        {orders.length} pesanan ditemukan
      </p>

      <div className="mt-6 space-y-4">
        {orders.map((order) => (
          <article
            key={order.id}
            className="rounded-xl border bg-card p-4 md:p-5"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex min-w-0 flex-1 gap-4">
                <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-muted">
                  <Image
                    src={order.previewItem?.image || PLACEHOLDER_IMAGE}
                    alt={order.previewItem?.productName || "Produk pesanan"}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </div>

                <div className="min-w-0">
                  <p className="text-sm font-semibold text-foreground">
                    {order.orderNumber}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {formatOrderDate(order.createdAt)}
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {order.itemCount} item · {formatRupiah(order.total)}
                  </p>
                  <div className="mt-3">
                    <OrderStatusBadge status={order.status} />
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 sm:flex-col sm:items-end">
                <Button
                  nativeButton={false}
                  render={<Link href={`/orders/${order.id}`} />}
                  variant="outline"
                >
                  Detail Pesanan
                </Button>
                {order.status === "pending" ? (
                  <Button
                    nativeButton={false}
                    render={<Link href={`/orders/${order.id}/pay`} />}
                  >
                    Bayar
                  </Button>
                ) : null}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
