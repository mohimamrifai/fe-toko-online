"use client";

import Link from "next/link";
import { Search } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

import { DataTable } from "@/components/admin/data-table";
import { OrderStatusBadge } from "@/components/orders/order-status-badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";
import { Spinner } from "@/components/ui/spinner";
import { getAdminOrders } from "@/lib/api/admin-order";
import { formatOrderDate } from "@/lib/format-date";
import { formatRupiah } from "@/lib/format-rupiah";
import type { AdminOrderListItem } from "@/types/admin-order";
import type { OrderStatus } from "@/types/order";

const STATUS_FILTER_OPTIONS: Array<{ value: string; label: string }> = [
  { value: "", label: "Semua Status" },
  { value: "pending", label: "Menunggu Pembayaran" },
  { value: "paid", label: "Dibayar" },
  { value: "processing", label: "Diproses" },
  { value: "shipped", label: "Dikirim" },
  { value: "completed", label: "Selesai" },
  { value: "cancelled", label: "Dibatalkan" },
];

export function AdminOrdersPageContent() {
  const [orders, setOrders] = useState<AdminOrderListItem[]>([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [appliedSearch, setAppliedSearch] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadOrders = useCallback(async () => {
    setError(null);
    setIsLoading(true);

    try {
      const data = await getAdminOrders({
        status: statusFilter ? (statusFilter as OrderStatus) : undefined,
        search: appliedSearch,
      });
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
  }, [appliedSearch, statusFilter]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- initial orders fetch
    void loadOrders();
  }, [loadOrders]);

  function handleSearchSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setAppliedSearch(searchInput.trim());
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-16">
        <Spinner className="size-6 text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <form
          onSubmit={handleSearchSubmit}
          className="flex w-full max-w-xl flex-col gap-3 sm:flex-row"
        >
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={searchInput}
              onChange={(event) => setSearchInput(event.target.value)}
              placeholder="Cari nomor pesanan..."
              className="pl-9"
            />
          </div>
          <Button type="submit">Cari</Button>
        </form>

        <NativeSelect
          value={statusFilter}
          onChange={(event) => setStatusFilter(event.target.value)}
          className="w-full sm:w-56"
        >
          {STATUS_FILTER_OPTIONS.map((option) => (
            <NativeSelectOption key={option.value} value={option.value}>
              {option.label}
            </NativeSelectOption>
          ))}
        </NativeSelect>
      </div>

      {error ? (
        <div className="rounded-xl border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      ) : null}

      <DataTable
        data={orders}
        getRowKey={(row) => row.id}
        emptyMessage="Belum ada pesanan yang cocok dengan filter."
        columns={[
          {
            id: "orderNumber",
            header: "No. Pesanan",
            cell: (row) => (
              <Link
                href={`/admin/orders/${row.id}`}
                className="font-medium text-primary hover:underline"
              >
                {row.orderNumber}
              </Link>
            ),
          },
          {
            id: "customer",
            header: "Pelanggan",
            cell: (row) => (
              <div>
                <p className="font-medium text-foreground">
                  {row.customer.name ?? "-"}
                </p>
                <p className="text-xs text-muted-foreground">
                  {row.customer.email ?? "-"}
                </p>
              </div>
            ),
          },
          {
            id: "status",
            header: "Status",
            cell: (row) => <OrderStatusBadge status={row.status} />,
          },
          {
            id: "total",
            header: "Total",
            cell: (row) => formatRupiah(row.total),
          },
          {
            id: "createdAt",
            header: "Tanggal",
            cell: (row) => formatOrderDate(row.createdAt),
            className: "text-muted-foreground",
          },
          {
            id: "actions",
            header: "",
            cell: (row) => (
              <Button
                nativeButton={false}
                render={<Link href={`/admin/orders/${row.id}`} />}
                variant="outline"
                size="sm"
              >
                Detail
              </Button>
            ),
            className: "text-right",
          },
        ]}
      />
    </div>
  );
}
