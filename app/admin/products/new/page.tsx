import type { Metadata } from "next";

import { AdminProductForm } from "@/components/admin/products/admin-product-form";

export const metadata: Metadata = {
  title: "Tambah Produk",
};

export default function AdminNewProductPage() {
  return <AdminProductForm mode="create" />;
}
