"use client";

import Link from "next/link";
import Script from "next/script";
import { useParams, useRouter } from "next/navigation";
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
import { getOrder, payOrder } from "@/lib/api/order";
import { formatRupiah } from "@/lib/format-rupiah";
import {
  getMidtransClientKey,
  getMidtransSnapScriptUrl,
  waitForSnapReady,
} from "@/lib/midtrans";
import type { OrderDetail } from "@/types/order";

export function OrderPayContent() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [order, setOrder] = useState<OrderDetail | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPaying, setIsPaying] = useState(false);
  const [snapReady, setSnapReady] = useState(false);
  const [paymentMessage, setPaymentMessage] = useState<string | null>(null);

  const clientKey = getMidtransClientKey();

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

  async function handlePay() {
    if (!params.id || !order) {
      return;
    }

    setError(null);
    setPaymentMessage(null);
    setIsPaying(true);

    try {
      await waitForSnapReady();
      const payment = await payOrder(params.id);

      window.snap?.pay(payment.snapToken, {
        onSuccess: () => {
          setPaymentMessage("Pembayaran berhasil. Memuat status pesanan...");
          router.push(`/orders/${order.id}/confirmation`);
        },
        onPending: () => {
          setPaymentMessage(
            "Pembayaran menunggu konfirmasi. Silakan selesaikan instruksi pembayaran.",
          );
          router.push(`/orders/${order.id}/confirmation`);
        },
        onError: () => {
          setError("Pembayaran gagal. Silakan coba lagi.");
        },
        onClose: () => {
          setPaymentMessage("Popup pembayaran ditutup.");
        },
      });
    } catch (payError) {
      setError(
        payError instanceof Error
          ? payError.message
          : "Gagal membuka pembayaran Midtrans.",
      );
    } finally {
      setIsPaying(false);
    }
  }

  if (isLoading) {
    return (
      <section className="mx-auto flex max-w-7xl items-center justify-center px-4 py-16 md:px-8">
        <Spinner className="size-6 text-muted-foreground" />
      </section>
    );
  }

  if (error && !order) {
    return (
      <section className="mx-auto max-w-2xl px-4 py-16 text-center md:px-8">
        <h1 className="text-xl font-bold text-foreground md:text-2xl">
          Pembayaran Tidak Tersedia
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">{error}</p>
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

  if (!order) {
    return null;
  }

  if (order.status === "paid") {
    return (
      <section className="mx-auto max-w-2xl px-4 py-16 text-center md:px-8">
        <h1 className="text-xl font-bold text-foreground md:text-2xl">
          Pesanan Sudah Dibayar
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Pesanan {order.orderNumber} sudah lunas.
        </p>
        <Button
          nativeButton={false}
          render={<Link href={`/orders/${order.id}/confirmation`} />}
          className="mt-6"
        >
          Lihat Konfirmasi
        </Button>
      </section>
    );
  }

  return (
    <>
      <Script
        src={getMidtransSnapScriptUrl()}
        strategy="afterInteractive"
        data-client-key={clientKey}
        onReady={() => setSnapReady(true)}
      />

      <section className="mx-auto max-w-2xl px-4 py-6 md:px-8 md:py-8">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Pembayaran Pesanan</CardTitle>
            <CardDescription>
              Selesaikan pembayaran melalui Midtrans Snap.
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
              <div className="flex items-center justify-between border-t pt-2 text-base font-semibold">
                <span>Total Pembayaran</span>
                <span>{formatRupiah(order.total)}</span>
              </div>
            </div>

            {error ? (
              <p className="text-sm text-destructive" role="alert">{error}</p>
            ) : null}

            {paymentMessage ? (
              <p className="text-sm text-muted-foreground" role="status">
                {paymentMessage}
              </p>
            ) : null}

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                nativeButton={false}
                render={<Link href={`/orders/${order.id}/confirmation`} />}
                variant="outline"
                className="flex-1"
              >
                Kembali
              </Button>
              <Button
                className="flex-1"
                disabled={isPaying || !snapReady || !clientKey}
                onClick={() => {
                  void handlePay();
                }}
              >
                {isPaying ? "Membuka Pembayaran..." : "Bayar dengan Midtrans"}
              </Button>
            </div>

            {!clientKey ? (
              <p className="text-xs text-destructive">
                NEXT_PUBLIC_MIDTRANS_CLIENT_KEY belum dikonfigurasi.
              </p>
            ) : null}
          </CardContent>
        </Card>
      </section>
    </>
  );
}
