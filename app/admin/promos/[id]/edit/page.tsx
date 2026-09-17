import type { Metadata } from "next";

import { AdminPromoForm } from "@/components/admin/promos/admin-promo-form";

export const metadata: Metadata = {
  title: "Edit Promo",
};

type AdminEditPromoPageProps = {
  params: Promise<{ id: string }>;
};

export default async function AdminEditPromoPage({
  params,
}: AdminEditPromoPageProps) {
  const { id } = await params;

  return <AdminPromoForm mode="edit" promoId={id} />;
}
