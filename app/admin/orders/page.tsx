import type { Metadata } from "next";

import { AdminOrdersPageContent } from "@/components/admin/orders/admin-orders-page-content";

export const metadata: Metadata = {
  title: "Pesanan",
};

export default function AdminOrdersPage() {
  return <AdminOrdersPageContent />;
}
