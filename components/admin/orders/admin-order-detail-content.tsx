"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";

import { OrderStatusBadge } from "@/components/orders/order-status-badge";
import { OrderStatusTimeline } from "@/components/orders/order-status-timeline";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import {
  getAdminOrder,
  updateAdminOrderShipping,
  updateAdminOrderStatus,
} from "@/lib/api/admin-order";
import { getAdminNextStatusOptions } from "@/lib/admin/order-status";
import { formatOrderDate } from "@/lib/format-date";
import { formatRupiah } from "@/lib/format-rupiah";
import { SHIPPING_OPTIONS } from "@/lib/shipping-options";
import type { AdminOrderDetail } from "@/types/admin-order";
import type { OrderStatus } from "@/types/order";

const PLACEHOLDER_IMAGE =
  "https://placehold.co/600x600/png?text=Produk+Elektronik";

const STATUS_LABELS: Record<OrderStatus, string> = {
  pending: "Menunggu Pembayaran",
  paid: "Dibayar",
  processing: "Diproses",
  shipped: "Dikirim",
  completed: "Selesai",
  cancelled: "Dibatalkan",
};

export function AdminOrderDetailContent() {
  const params = useParams<{ id: string }>();
  const [order, setOrder] = useState<AdminOrderDetail | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [statusValue, setStatusValue] = useState<OrderStatus | "">("");
  const [statusNote, setStatusNote] = useState("");
  const [courier, setCourier] = useState<string>(SHIPPING_OPTIONS[0].courier);
  const [trackingNumber, setTrackingNumber] = useState("");
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const [isUpdatingShipping, setIsUpdatingShipping] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const nextStatusOptions = useMemo(
    () => (order ? getAdminNextStatusOptions(order.status) : []),
    [order],
  );

  const loadOrder = useCallback(async () => {
    if (!params.id) {
      return;
    }

    setError(null);

    try {
      const data = await getAdminOrder(params.id);
      setOrder(data);
      setCourier(data.courier ?? SHIPPING_OPTIONS[0].courier);
      setTrackingNumber(data.trackingNumber ?? "");
      setStatusValue(getAdminNextStatusOptions(data.status)[0] ?? "");
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

  async function handleStatusSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!order || !statusValue) {
      return;
    }

    setFormError(null);
    setIsUpdatingStatus(true);

    try {
      const updatedOrder = await updateAdminOrderStatus(order.id, {
        status: statusValue as Extract<
          OrderStatus,
          "processing" | "shipped" | "completed" | "cancelled"
        >,
        note: statusNote.trim() || undefined,
      });
      setOrder(updatedOrder);
      setStatusNote("");
      setStatusValue(getAdminNextStatusOptions(updatedOrder.status)[0] ?? "");
    } catch (submitError) {
      setFormError(
        submitError instanceof Error
          ? submitError.message
          : "Gagal memperbarui status pesanan.",
      );
    } finally {
      setIsUpdatingStatus(false);
    }
  }

  async function handleShippingSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!order) {
      return;
    }

    setFormError(null);
    setIsUpdatingShipping(true);

    try {
      const updatedOrder = await updateAdminOrderShipping(order.id, {
        courier,
        trackingNumber,
      });
      setOrder(updatedOrder);
    } catch (submitError) {
      setFormError(
        submitError instanceof Error
          ? submitError.message
          : "Gagal memperbarui data pengiriman.",
      );
    } finally {
      setIsUpdatingShipping(false);
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-16">
        <Spinner className="size-6 text-muted-foreground" />
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="rounded-xl border bg-card px-6 py-16 text-center">
        <h2 className="text-lg font-semibold text-foreground">
          Pesanan Tidak Ditemukan
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          {error ?? "Detail pesanan tidak tersedia."}
        </p>
        <Button
          nativeButton={false}
          render={<Link href="/admin/orders" />}
          className="mt-6"
        >
          Kembali ke Daftar Pesanan
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <Button
            nativeButton={false}
            render={<Link href="/admin/orders" />}
            variant="outline"
            size="sm"
          >
            Kembali
          </Button>
          <h2 className="mt-4 text-xl font-semibold text-foreground">
            {order.orderNumber}
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Dibuat pada {formatOrderDate(order.createdAt)}
          </p>
        </div>
        <OrderStatusBadge status={order.status} />
      </div>

      {formError ? (
        <div className="rounded-xl border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
          {formError}
        </div>
      ) : null}

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Item Pesanan</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 border-b pb-4 last:border-b-0 last:pb-0"
                >
                  <Image
                    src={item.image ?? PLACEHOLDER_IMAGE}
                    alt={item.productName}
                    width={72}
                    height={72}
                    className="size-[72px] rounded-lg object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-foreground">
                      {item.productName}
                    </p>
                    {item.variantName ? (
                      <p className="text-sm text-muted-foreground">
                        Varian: {item.variantName}
                      </p>
                    ) : null}
                    <p className="mt-2 text-sm text-muted-foreground">
                      {item.quantity} x {formatRupiah(item.price)}
                    </p>
                  </div>
                  <p className="text-sm font-medium">
                    {formatRupiah(item.price * item.quantity)}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Pelanggan</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                <p className="font-medium text-foreground">
                  {order.customer.name ?? "-"}
                </p>
                <p className="mt-1">{order.customer.email ?? "-"}</p>
                <p className="mt-1">{order.customer.phone ?? "-"}</p>
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
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Riwayat Status</CardTitle>
              <CardDescription>
                Perubahan status tercatat otomatis untuk pelanggan.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <OrderStatusTimeline history={order.statusHistory} />
            </CardContent>
          </Card>
        </div>

        <aside className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Ringkasan</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>{formatRupiah(order.subtotal)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Ongkos Kirim</span>
                <span>{formatRupiah(order.shippingCost)}</span>
              </div>
              <div className="flex items-center justify-between border-t pt-3 font-semibold">
                <span>Total</span>
                <span>{formatRupiah(order.total)}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Update Status</CardTitle>
              <CardDescription>
                Ubah status pesanan dan tambahkan catatan opsional.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {nextStatusOptions.length > 0 ? (
                <form onSubmit={handleStatusSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="status">Status Baru</Label>
                    <NativeSelect
                      id="status"
                      value={statusValue}
                      onChange={(event) =>
                        setStatusValue(event.target.value as OrderStatus)
                      }
                      className="w-full"
                      required
                    >
                      {nextStatusOptions.map((option) => (
                        <NativeSelectOption key={option} value={option}>
                          {STATUS_LABELS[option]}
                        </NativeSelectOption>
                      ))}
                    </NativeSelect>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="status-note">Catatan</Label>
                    <Textarea
                      id="status-note"
                      value={statusNote}
                      onChange={(event) => setStatusNote(event.target.value)}
                      placeholder="Opsional, misalnya: sedang dikemas"
                      rows={3}
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isUpdatingStatus}
                  >
                    {isUpdatingStatus ? "Menyimpan..." : "Simpan Status"}
                  </Button>
                </form>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Status pesanan ini tidak dapat diubah lagi.
                </p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Data Pengiriman</CardTitle>
              <CardDescription>
                Perbarui kurir dan nomor resi pengiriman.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleShippingSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="courier">Kurir</Label>
                  <NativeSelect
                    id="courier"
                    value={courier}
                    onChange={(event) => setCourier(event.target.value)}
                    className="w-full"
                    required
                  >
                    {SHIPPING_OPTIONS.map((option) => (
                      <NativeSelectOption
                        key={option.courier}
                        value={option.courier}
                      >
                        {option.courier}
                      </NativeSelectOption>
                    ))}
                  </NativeSelect>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tracking-number">Nomor Resi</Label>
                  <Input
                    id="tracking-number"
                    value={trackingNumber}
                    onChange={(event) => setTrackingNumber(event.target.value)}
                    placeholder="Contoh: JNE123456789"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isUpdatingShipping}
                >
                  {isUpdatingShipping ? "Menyimpan..." : "Simpan Pengiriman"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  );
}
