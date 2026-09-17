import type { Metadata } from "next";

import { AdminPromosPageContent } from "@/components/admin/promos/admin-promos-page-content";

export const metadata: Metadata = {
  title: "Promo",
};

export default function AdminPromosPage() {
  return <AdminPromosPageContent />;
}
