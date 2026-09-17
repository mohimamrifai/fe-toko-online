import type { Metadata } from "next";

import { AdminPromoForm } from "@/components/admin/promos/admin-promo-form";

export const metadata: Metadata = {
  title: "Tambah Promo",
};

export default function AdminNewPromoPage() {
  return <AdminPromoForm mode="create" />;
}
