"use client";

import Link from "next/link";
import { Plus } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

import { DataTable } from "@/components/admin/data-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { deleteAdminPromo, getAdminPromos } from "@/lib/api/admin-promo";
import { formatRupiah } from "@/lib/format-rupiah";
import type { Promo } from "@/types/promo";

function formatDiscount(promo: Promo) {
  if (promo.discountType === "percentage") {
    return `${promo.discountValue}%`;
  }

  return formatRupiah(promo.discountValue);
}

function formatPeriod(startsAt: string, endsAt: string) {
  const start = new Date(startsAt).toLocaleDateString("id-ID");
  const end = new Date(endsAt).toLocaleDateString("id-ID");
  return `${start} - ${end}`;
}

function getPromoStatus(promo: Promo) {
  const now = Date.now();
  const startsAt = new Date(promo.startsAt).getTime();
  const endsAt = new Date(promo.endsAt).getTime();

  if (now < startsAt) {
    return { label: "Belum Mulai", variant: "secondary" as const };
  }

  if (now > endsAt) {
    return { label: "Berakhir", variant: "outline" as const };
  }

  return { label: "Aktif", variant: "default" as const };
}

export function AdminPromosPageContent() {
  const [promos, setPromos] = useState<Promo[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadPromos = useCallback(async () => {
    setError(null);
    setIsLoading(true);

    try {
      const data = await getAdminPromos();
      setPromos(data);
    } catch (loadError) {
      setError(
        loadError instanceof Error
          ? loadError.message
          : "Gagal memuat daftar promo.",
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- initial promos fetch
    void loadPromos();
  }, [loadPromos]);

  async function handleDelete(promo: Promo) {
    const confirmed = window.confirm(
      `Hapus promo "${promo.code}"? Tindakan ini tidak dapat dibatalkan.`,
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteAdminPromo(promo.id);
      setPromos((current) => current.filter((item) => item.id !== promo.id));
    } catch (deleteError) {
      setError(
        deleteError instanceof Error
          ? deleteError.message
          : "Gagal menghapus promo.",
      );
    }
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
      <div className="flex justify-end">
        <Button nativeButton={false} render={<Link href="/admin/promos/new" />}>
          <Plus className="mr-2 size-4" />
          Tambah Promo
        </Button>
      </div>

      {error ? (
        <div className="rounded-xl border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      ) : null}

      <DataTable
        data={promos}
        getRowKey={(row) => row.id}
        emptyMessage="Belum ada promo."
        columns={[
          {
            id: "code",
            header: "Kode",
            cell: (row) => (
              <Link
                href={`/admin/promos/${row.id}/edit`}
                className="font-medium text-primary hover:underline"
              >
                {row.code}
              </Link>
            ),
          },
          {
            id: "name",
            header: "Nama",
            cell: (row) => row.name,
          },
          {
            id: "discount",
            header: "Diskon",
            cell: (row) => formatDiscount(row),
          },
          {
            id: "minPurchase",
            header: "Min. Belanja",
            cell: (row) => formatRupiah(row.minPurchase),
          },
          {
            id: "period",
            header: "Periode",
            cell: (row) => formatPeriod(row.startsAt, row.endsAt),
          },
          {
            id: "products",
            header: "Produk",
            cell: (row) =>
              row.productIds.length > 0
                ? `${row.productIds.length} produk`
                : "Semua produk",
          },
          {
            id: "status",
            header: "Status",
            cell: (row) => {
              const status = getPromoStatus(row);
              return <Badge variant={status.variant}>{status.label}</Badge>;
            },
          },
          {
            id: "actions",
            header: "",
            cell: (row) => (
              <div className="flex justify-end gap-2">
                <Button
                  nativeButton={false}
                  render={<Link href={`/admin/promos/${row.id}/edit`} />}
                  variant="outline"
                  size="sm"
                >
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => void handleDelete(row)}
                >
                  Hapus
                </Button>
              </div>
            ),
            className: "text-right",
          },
        ]}
      />
    </div>
  );
}
