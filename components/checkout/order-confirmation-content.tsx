"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import { Badge } from "@/components/ui/badge";
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
import { formatRupiah } from "@/lib/format-rupiah";
import type { OrderDetail } from "@/types/order";

export function OrderConfirmationContent() {
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
          render={<Link href="/" />}
          className="mt-6"
        >
          Kembali ke Beranda
        </Button>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-2xl px-4 py-6 md:px-8 md:py-8">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Pesanan Berhasil Dibuat</CardTitle>
          <CardDescription>
            Pesanan Anda telah dibuat dan menunggu pembayaran.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="rounded-xl border bg-muted/30 p-4 text-center">
            <p className="text-sm text-muted-foreground">Nomor Pesanan</p>
            <p className="mt-1 text-lg font-bold text-foreground">
              {order.orderNumber}
            </p>
            <div className="mt-3 flex justify-center">
              <Badge variant="secondary">{order.status}</Badge>
            </div>
          </div>

          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span>{formatRupiah(order.subtotal)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Ongkos Kirim</span>
              <span>{formatRupiah(order.shippingCost)}</span>
            </div>
            <div className="flex items-center justify-between border-t pt-2 font-semibold">
              <span>Total</span>
              <span>{formatRupiah(order.total)}</span>
            </div>
          </div>

          <div className="rounded-xl border p-4 text-sm">
            <p className="font-medium text-foreground">Alamat Pengiriman</p>
            <p className="mt-2 text-muted-foreground">
              {order.shippingAddress.recipientName} · {order.shippingAddress.phone}
            </p>
            <p className="mt-1 text-muted-foreground">
              {order.shippingAddress.fullAddress},{" "}
              {order.shippingAddress.city}, {order.shippingAddress.province}{" "}
              {order.shippingAddress.postalCode}
            </p>
            {order.courier ? (
              <p className="mt-2 text-muted-foreground">
                Kurir: {order.courier}
              </p>
            ) : null}
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            {order.status === "pending" ? (
              <Button
                nativeButton={false}
                render={<Link href={`/orders/${order.id}/pay`} />}
                className="flex-1"
              >
                Bayar Sekarang
              </Button>
            ) : null}
            <Button
              nativeButton={false}
              render={<Link href="/" />}
              variant="outline"
              className="flex-1"
            >
              Lanjut Belanja
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
