"use client";

import Image from "next/image";
import Link from "next/link";
import { Plus, Search } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

import { DataTable } from "@/components/admin/data-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";
import { Spinner } from "@/components/ui/spinner";
import { Switch } from "@/components/ui/switch";
import {
  deleteAdminProduct,
  getAdminProducts,
  updateAdminProduct,
} from "@/lib/api/admin-product";
import { getBrands } from "@/lib/api/brand";
import { getCategories } from "@/lib/api/category";
import { formatRupiah } from "@/lib/format-rupiah";
import type { AdminProductListItem } from "@/types/admin-product";
import type { Brand } from "@/types/brand";
import type { Category } from "@/types/category";

const PLACEHOLDER_IMAGE =
  "https://placehold.co/600x600/png?text=Produk+Elektronik";

const STATUS_FILTER_OPTIONS = [
  { value: "", label: "Semua Status" },
  { value: "true", label: "Aktif" },
  { value: "false", label: "Nonaktif" },
];

export function AdminProductsPageContent() {
  const [products, setProducts] = useState<AdminProductListItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [searchInput, setSearchInput] = useState("");
  const [appliedSearch, setAppliedSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [brandFilter, setBrandFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [updatingProductId, setUpdatingProductId] = useState<string | null>(
    null,
  );

  const loadProducts = useCallback(async () => {
    setError(null);
    setIsLoading(true);

    try {
      const data = await getAdminProducts({
        search: appliedSearch,
        categoryId: categoryFilter || undefined,
        brandId: brandFilter || undefined,
        isActive:
          statusFilter === ""
            ? undefined
            : statusFilter === "true",
      });
      setProducts(data.items);
    } catch (loadError) {
      setError(
        loadError instanceof Error
          ? loadError.message
          : "Gagal memuat daftar produk.",
      );
    } finally {
      setIsLoading(false);
    }
  }, [appliedSearch, brandFilter, categoryFilter, statusFilter]);

  useEffect(() => {
    void Promise.all([getCategories(), getBrands()])
      .then(([categoryData, brandData]) => {
        setCategories(categoryData);
        setBrands(brandData);
      })
      .catch(() => undefined);
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- initial products fetch
    void loadProducts();
  }, [loadProducts]);

  function handleSearchSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setAppliedSearch(searchInput.trim());
  }

  async function handleToggleActive(product: AdminProductListItem, checked: boolean) {
    setUpdatingProductId(product.id);

    try {
      await updateAdminProduct(product.id, { isActive: checked });
      setProducts((current) =>
        current.map((item) =>
          item.id === product.id ? { ...item, isActive: checked } : item,
        ),
      );
    } catch (toggleError) {
      setError(
        toggleError instanceof Error
          ? toggleError.message
          : "Gagal memperbarui status produk.",
      );
    } finally {
      setUpdatingProductId(null);
    }
  }

  async function handleDelete(product: AdminProductListItem) {
    const confirmed = window.confirm(
      `Hapus produk "${product.name}"? Tindakan ini tidak dapat dibatalkan.`,
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteAdminProduct(product.id);
      setProducts((current) => current.filter((item) => item.id !== product.id));
    } catch (deleteError) {
      setError(
        deleteError instanceof Error
          ? deleteError.message
          : "Gagal menghapus produk.",
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
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <form
          onSubmit={handleSearchSubmit}
          className="flex w-full max-w-xl flex-col gap-3 sm:flex-row"
        >
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={searchInput}
              onChange={(event) => setSearchInput(event.target.value)}
              placeholder="Cari nama, SKU, atau slug..."
              className="pl-9"
            />
          </div>
          <Button type="submit">Cari</Button>
        </form>

        <Button nativeButton={false} render={<Link href="/admin/products/new" />}>
          <Plus className="mr-2 size-4" />
          Tambah Produk
        </Button>
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        <NativeSelect
          value={categoryFilter}
          onChange={(event) => setCategoryFilter(event.target.value)}
          className="w-full"
        >
          <NativeSelectOption value="">Semua Kategori</NativeSelectOption>
          {categories.map((category) => (
            <NativeSelectOption key={category.id} value={category.id}>
              {category.name}
            </NativeSelectOption>
          ))}
        </NativeSelect>

        <NativeSelect
          value={brandFilter}
          onChange={(event) => setBrandFilter(event.target.value)}
          className="w-full"
        >
          <NativeSelectOption value="">Semua Brand</NativeSelectOption>
          {brands.map((brand) => (
            <NativeSelectOption key={brand.id} value={brand.id}>
              {brand.name}
            </NativeSelectOption>
          ))}
        </NativeSelect>

        <NativeSelect
          value={statusFilter}
          onChange={(event) => setStatusFilter(event.target.value)}
          className="w-full"
        >
          {STATUS_FILTER_OPTIONS.map((option) => (
            <NativeSelectOption key={option.value} value={option.value}>
              {option.label}
            </NativeSelectOption>
          ))}
        </NativeSelect>
      </div>

      {error ? (
        <div className="rounded-xl border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      ) : null}

      <DataTable
        data={products}
        getRowKey={(row) => row.id}
        emptyMessage="Belum ada produk yang cocok dengan filter."
        columns={[
          {
            id: "image",
            header: "Gambar",
            cell: (row) => (
              <Image
                src={row.primaryImage ?? PLACEHOLDER_IMAGE}
                alt={row.name}
                width={48}
                height={48}
                className="size-12 rounded-md object-cover"
              />
            ),
          },
          {
            id: "name",
            header: "Produk",
            cell: (row) => (
              <div>
                <Link
                  href={`/admin/products/${row.id}/edit`}
                  className="font-medium text-primary hover:underline"
                >
                  {row.name}
                </Link>
                <p className="text-xs text-muted-foreground">{row.sku}</p>
              </div>
            ),
          },
          {
            id: "category",
            header: "Kategori",
            cell: (row) => row.category.name,
          },
          {
            id: "brand",
            header: "Brand",
            cell: (row) => row.brand.name,
          },
          {
            id: "price",
            header: "Harga",
            cell: (row) => formatRupiah(row.discountPrice ?? row.price),
          },
          {
            id: "stock",
            header: "Stok",
            cell: (row) => row.stock,
          },
          {
            id: "status",
            header: "Status",
            cell: (row) => (
              <Badge variant={row.isActive ? "default" : "secondary"}>
                {row.isActive ? "Aktif" : "Nonaktif"}
              </Badge>
            ),
          },
          {
            id: "active",
            header: "Aktif",
            cell: (row) => (
              <Switch
                checked={row.isActive}
                disabled={updatingProductId === row.id}
                onCheckedChange={(checked) =>
                  void handleToggleActive(row, checked)
                }
              />
            ),
          },
          {
            id: "actions",
            header: "",
            cell: (row) => (
              <div className="flex justify-end gap-2">
                <Button
                  nativeButton={false}
                  render={<Link href={`/admin/products/${row.id}/edit`} />}
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
