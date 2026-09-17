import type { Metadata } from "next";

import { AdminProductForm } from "@/components/admin/products/admin-product-form";

export const metadata: Metadata = {
  title: "Edit Produk",
};

export default async function AdminEditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <AdminProductForm mode="edit" productId={id} />;
}
