import type { Metadata } from "next";

import { AdminOrderDetailContent } from "@/components/admin/orders/admin-order-detail-content";

export const metadata: Metadata = {
  title: "Detail Pesanan",
};

export default function AdminOrderDetailPage() {
  return <AdminOrderDetailContent />;
}
