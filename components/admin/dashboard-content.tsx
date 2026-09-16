"use client";

import { AlertTriangle, Clock3, Package } from "lucide-react";

import { DataTable } from "@/components/admin/data-table";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatRupiah } from "@/lib/format-rupiah";

type DashboardStat = {
  id: string;
  label: string;
  value: string;
  hint: string;
  icon: typeof Package;
};

type RecentOrderRow = {
  id: string;
  orderNumber: string;
  customer: string;
  status: "pending_payment" | "processing" | "shipped";
  total: number;
  createdAt: string;
};

const DASHBOARD_STATS: DashboardStat[] = [
  {
    id: "orders-today",
    label: "Pesanan Hari Ini",
    value: "24",
    hint: "+12% dari kemarin",
    icon: Package,
  },
  {
    id: "pending-payment",
    label: "Menunggu Pembayaran",
    value: "7",
    hint: "Perlu tindak lanjut",
    icon: Clock3,
  },
  {
    id: "low-stock",
    label: "Stok Menipis",
    value: "5",
    hint: "Produk di bawah 10 unit",
    icon: AlertTriangle,
  },
];

const RECENT_ORDERS: RecentOrderRow[] = [
  {
    id: "1",
    orderNumber: "ORD-20260917-001",
    customer: "Budi Santoso",
    status: "pending_payment",
    total: 2499000,
    createdAt: "17 Sep 2026, 09:12",
  },
  {
    id: "2",
    orderNumber: "ORD-20260917-002",
    customer: "Siti Aminah",
    status: "processing",
    total: 4599000,
    createdAt: "17 Sep 2026, 08:45",
  },
  {
    id: "3",
    orderNumber: "ORD-20260916-118",
    customer: "Rizky Pratama",
    status: "shipped",
    total: 1299000,
    createdAt: "16 Sep 2026, 21:30",
  },
  {
    id: "4",
    orderNumber: "ORD-20260916-117",
    customer: "Dewi Lestari",
    status: "processing",
    total: 8990000,
    createdAt: "16 Sep 2026, 19:05",
  },
];

const STATUS_LABELS: Record<RecentOrderRow["status"], string> = {
  pending_payment: "Menunggu Bayar",
  processing: "Diproses",
  shipped: "Dikirim",
};

function getStatusVariant(status: RecentOrderRow["status"]) {
  if (status === "pending_payment") {
    return "secondary" as const;
  }

  if (status === "shipped") {
    return "default" as const;
  }

  return "outline" as const;
}

export function DashboardContent() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-base font-semibold text-foreground">
            Ringkasan Hari Ini
          </h2>
          <p className="text-sm text-muted-foreground">
            Data contoh untuk preview dashboard admin.
          </p>
        </div>
        <Badge variant="outline">Data Demo</Badge>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {DASHBOARD_STATS.map((stat) => {
          const Icon = stat.icon;

          return (
            <Card key={stat.id}>
              <CardHeader className="flex flex-row items-start justify-between gap-3">
                <div>
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.label}
                  </CardTitle>
                  <CardDescription className="sr-only">{stat.hint}</CardDescription>
                </div>
                <div className="rounded-lg bg-primary/10 p-2 text-primary">
                  <Icon className="size-5" />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-semibold text-foreground">
                  {stat.value}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">{stat.hint}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <section className="space-y-3">
        <div>
          <h2 className="text-base font-semibold text-foreground">
            Pesanan Terbaru
          </h2>
          <p className="text-sm text-muted-foreground">
            Preview tabel pesanan menggunakan komponen DataTable.
          </p>
        </div>

        <DataTable
          data={RECENT_ORDERS}
          getRowKey={(row) => row.id}
          columns={[
            {
              id: "orderNumber",
              header: "No. Pesanan",
              cell: (row) => (
                <span className="font-medium text-foreground">
                  {row.orderNumber}
                </span>
              ),
            },
            {
              id: "customer",
              header: "Pelanggan",
              cell: (row) => row.customer,
            },
            {
              id: "status",
              header: "Status",
              cell: (row) => (
                <Badge variant={getStatusVariant(row.status)}>
                  {STATUS_LABELS[row.status]}
                </Badge>
              ),
            },
            {
              id: "total",
              header: "Total",
              cell: (row) => formatRupiah(row.total),
              className: "text-right",
            },
            {
              id: "createdAt",
              header: "Waktu",
              cell: (row) => row.createdAt,
              className: "text-muted-foreground",
            },
          ]}
        />
      </section>
    </div>
  );
}
