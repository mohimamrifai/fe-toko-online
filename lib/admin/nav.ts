import type { LucideIcon } from "lucide-react";
import {
  Box,
  FolderTree,
  Image,
  LayoutDashboard,
  Package,
  Ticket,
  Zap,
} from "lucide-react";

export type AdminNavItem = {
  href: string;
  label: string;
  description: string;
  icon: LucideIcon;
  exact?: boolean;
};

export const ADMIN_NAV_ITEMS: AdminNavItem[] = [
  {
    href: "/admin",
    label: "Dashboard",
    description: "Ringkasan operasional toko hari ini.",
    icon: LayoutDashboard,
    exact: true,
  },
  {
    href: "/admin/orders",
    label: "Pesanan",
    description: "Kelola status pesanan dan pengiriman.",
    icon: Package,
  },
  {
    href: "/admin/products",
    label: "Produk",
    description: "Kelola katalog produk dan stok.",
    icon: Box,
  },
  {
    href: "/admin/categories",
    label: "Kategori",
    description: "Atur kategori dan urutan tampilan.",
    icon: FolderTree,
  },
  {
    href: "/admin/promos",
    label: "Promo",
    description: "Kelola kode promo dan diskon.",
    icon: Ticket,
  },
  {
    href: "/admin/flash-sales",
    label: "Flash Sale",
    description: "Atur event flash sale dan produk promo.",
    icon: Zap,
  },
  {
    href: "/admin/banners",
    label: "Banner",
    description: "Kelola banner, slider, dan promo visual.",
    icon: Image,
  },
];

export function getAdminPageMeta(pathname: string) {
  const matchedItem = ADMIN_NAV_ITEMS.find((item) => {
    if (item.exact) {
      return pathname === item.href;
    }

    return pathname === item.href || pathname.startsWith(`${item.href}/`);
  });

  return (
    matchedItem ?? {
      href: "/admin",
      label: "Admin",
      description: "Panel administrasi toko.",
      icon: LayoutDashboard,
    }
  );
}
