"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";
import { Spinner } from "@/components/ui/spinner";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  createAdminProduct,
  getAdminProduct,
  updateAdminProduct,
} from "@/lib/api/admin-product";
import { getBrands } from "@/lib/api/brand";
import { getCategories } from "@/lib/api/category";
import { uploadImage } from "@/lib/api/storage";
import { slugify } from "@/lib/slugify";
import type { Brand } from "@/types/brand";
import type { Category } from "@/types/category";

type ImageRow = {
  key: string;
  imageUrl: string;
  isPrimary: boolean;
  sortOrder: number;
  file?: File;
};

type SpecificationRow = {
  key: string;
  specKey: string;
  specValue: string;
  sortOrder: number;
};

type VariantRow = {
  key: string;
  variantName: string;
  priceAdjustment: string;
  stock: string;
  sku: string;
};

type AdminProductFormProps = {
  mode: "create" | "edit";
  productId?: string;
};

function createRowKey() {
  return `${Date.now()}-${Math.random()}`;
}

export function AdminProductForm({ mode, productId }: AdminProductFormProps) {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [brandId, setBrandId] = useState("");
  const [price, setPrice] = useState("");
  const [discountPrice, setDiscountPrice] = useState("");
  const [stock, setStock] = useState("0");
  const [sku, setSku] = useState("");
  const [warrantyMonths, setWarrantyMonths] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [images, setImages] = useState<ImageRow[]>([
    {
      key: createRowKey(),
      imageUrl: "",
      isPrimary: true,
      sortOrder: 1,
    },
  ]);
  const [specifications, setSpecifications] = useState<SpecificationRow[]>([]);
  const [variants, setVariants] = useState<VariantRow[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(mode === "edit");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const loadOptions = useCallback(async () => {
    const [categoryData, brandData] = await Promise.all([
      getCategories(),
      getBrands(),
    ]);
    setCategories(categoryData);
    setBrands(brandData);

    if (mode === "create") {
      setCategoryId(categoryData[0]?.id ?? "");
      setBrandId(brandData[0]?.id ?? "");
    }
  }, [mode]);

  const loadProduct = useCallback(async () => {
    if (mode !== "edit" || !productId) {
      return;
    }

    setError(null);
    setIsLoading(true);

    try {
      const product = await getAdminProduct(productId);
      setName(product.name);
      setSlug(product.slug);
      setDescription(product.description ?? "");
      setCategoryId(product.category.id);
      setBrandId(product.brand.id);
      setPrice(String(product.price));
      setDiscountPrice(
        product.discountPrice !== null ? String(product.discountPrice) : "",
      );
      setStock(String(product.stock));
      setSku(product.sku);
      setWarrantyMonths(
        product.warrantyMonths !== null ? String(product.warrantyMonths) : "",
      );
      setIsActive(product.isActive);
      setImages(
        product.images.map((image, index) => ({
          key: image.id ?? createRowKey(),
          imageUrl: image.imageUrl,
          isPrimary: image.isPrimary,
          sortOrder: image.sortOrder ?? index + 1,
        })),
      );
      setSpecifications(
        product.specifications.map((spec, index) => ({
          key: spec.id ?? createRowKey(),
          specKey: spec.specKey,
          specValue: spec.specValue,
          sortOrder: spec.sortOrder ?? index + 1,
        })),
      );
      setVariants(
        product.variants.map((variant) => ({
          key: variant.id ?? createRowKey(),
          variantName: variant.variantName,
          priceAdjustment: String(variant.priceAdjustment),
          stock: String(variant.stock),
          sku: variant.sku,
        })),
      );
    } catch (loadError) {
      setError(
        loadError instanceof Error
          ? loadError.message
          : "Gagal memuat data produk.",
      );
    } finally {
      setIsLoading(false);
    }
  }, [mode, productId]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- initial form options fetch
    void loadOptions();
  }, [loadOptions]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- initial product fetch for edit
    void loadProduct();
  }, [loadProduct]);

  function handleNameChange(value: string) {
    setName(value);

    if (mode === "create") {
      setSlug(slugify(value));
    }
  }

  function addImageRow() {
    setImages((current) => [
      ...current,
      {
        key: createRowKey(),
        imageUrl: "",
        isPrimary: current.length === 0,
        sortOrder: current.length + 1,
      },
    ]);
  }

  function updateImageRow(key: string, patch: Partial<ImageRow>) {
    setImages((current) =>
      current.map((row) => (row.key === key ? { ...row, ...patch } : row)),
    );
  }

  function setPrimaryImage(key: string) {
    setImages((current) =>
      current.map((row) => ({
        ...row,
        isPrimary: row.key === key,
      })),
    );
  }

  function removeImageRow(key: string) {
    setImages((current) => {
      const next = current.filter((row) => row.key !== key);
      if (!next.some((row) => row.isPrimary) && next[0]) {
        next[0] = { ...next[0], isPrimary: true };
      }
      return next;
    });
  }

  function addSpecificationRow() {
    setSpecifications((current) => [
      ...current,
      {
        key: createRowKey(),
        specKey: "",
        specValue: "",
        sortOrder: current.length + 1,
      },
    ]);
  }

  function updateSpecificationRow(
    key: string,
    patch: Partial<SpecificationRow>,
  ) {
    setSpecifications((current) =>
      current.map((row) => (row.key === key ? { ...row, ...patch } : row)),
    );
  }

  function removeSpecificationRow(key: string) {
    setSpecifications((current) => current.filter((row) => row.key !== key));
  }

  function addVariantRow() {
    setVariants((current) => [
      ...current,
      {
        key: createRowKey(),
        variantName: "",
        priceAdjustment: "0",
        stock: "0",
        sku: "",
      },
    ]);
  }

  function updateVariantRow(key: string, patch: Partial<VariantRow>) {
    setVariants((current) =>
      current.map((row) => (row.key === key ? { ...row, ...patch } : row)),
    );
  }

  function removeVariantRow(key: string) {
    setVariants((current) => current.filter((row) => row.key !== key));
  }

  async function resolveImageUrls() {
    const resolved = [];

    for (const [index, image] of images.entries()) {
      let imageUrl = image.imageUrl.trim();

      if (image.file) {
        imageUrl = await uploadImage(image.file, "products");
      }

      if (!imageUrl) {
        throw new Error("Setiap gambar wajib memiliki file atau URL.");
      }

      resolved.push({
        imageUrl,
        isPrimary: image.isPrimary,
        sortOrder: index + 1,
      });
    }

    return resolved;
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const resolvedImages = await resolveImageUrls();
      const payload = {
        categoryId,
        brandId,
        name: name.trim(),
        slug: slug.trim(),
        description: description.trim() || undefined,
        price: Number(price),
        discountPrice: discountPrice ? Number(discountPrice) : undefined,
        stock: Number(stock),
        sku: sku.trim(),
        warrantyMonths: warrantyMonths ? Number(warrantyMonths) : undefined,
        isActive,
        images: resolvedImages,
        specifications: specifications
          .filter((row) => row.specKey.trim() && row.specValue.trim())
          .map((row, index) => ({
            specKey: row.specKey.trim(),
            specValue: row.specValue.trim(),
            sortOrder: index + 1,
          })),
        variants: variants
          .filter((row) => row.variantName.trim() && row.sku.trim())
          .map((row) => ({
            variantName: row.variantName.trim(),
            priceAdjustment: Number(row.priceAdjustment || 0),
            stock: Number(row.stock || 0),
            sku: row.sku.trim(),
          })),
      };

      if (mode === "create") {
        const created = await createAdminProduct(payload);
        router.push(`/admin/products/${created.id}/edit`);
        return;
      }

      if (!productId) {
        throw new Error("ID produk tidak ditemukan.");
      }

      await updateAdminProduct(productId, payload);
      router.push("/admin/products");
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Gagal menyimpan produk.",
      );
    } finally {
      setIsSubmitting(false);
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
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <Button
          nativeButton={false}
          render={<Link href="/admin/products" />}
          variant="outline"
          size="sm"
        >
          Kembali
        </Button>
        <div className="flex items-center gap-3">
          <Label htmlFor="is-active">Aktif</Label>
          <Switch
            id="is-active"
            checked={isActive}
            onCheckedChange={setIsActive}
          />
        </div>
      </div>

      {error ? (
        <div className="rounded-xl border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      ) : null}

      <Card>
        <CardHeader>
          <CardTitle>Informasi Dasar</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="name">Nama Produk</Label>
            <Input
              id="name"
              value={name}
              onChange={(event) => handleNameChange(event.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="slug">Slug</Label>
            <Input
              id="slug"
              value={slug}
              onChange={(event) => setSlug(event.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="sku">SKU</Label>
            <Input
              id="sku"
              value={sku}
              onChange={(event) => setSku(event.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="category">Kategori</Label>
            <NativeSelect
              id="category"
              value={categoryId}
              onChange={(event) => setCategoryId(event.target.value)}
              className="w-full"
              required
            >
              {categories.map((category) => (
                <NativeSelectOption key={category.id} value={category.id}>
                  {category.name}
                </NativeSelectOption>
              ))}
            </NativeSelect>
          </div>
          <div className="space-y-2">
            <Label htmlFor="brand">Brand</Label>
            <NativeSelect
              id="brand"
              value={brandId}
              onChange={(event) => setBrandId(event.target.value)}
              className="w-full"
              required
            >
              {brands.map((brand) => (
                <NativeSelectOption key={brand.id} value={brand.id}>
                  {brand.name}
                </NativeSelectOption>
              ))}
            </NativeSelect>
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="description">Deskripsi</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              rows={4}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="price">Harga</Label>
            <Input
              id="price"
              type="number"
              min="0"
              value={price}
              onChange={(event) => setPrice(event.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="discount-price">Harga Diskon</Label>
            <Input
              id="discount-price"
              type="number"
              min="0"
              value={discountPrice}
              onChange={(event) => setDiscountPrice(event.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="stock">Stok</Label>
            <Input
              id="stock"
              type="number"
              min="0"
              value={stock}
              onChange={(event) => setStock(event.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="warranty">Garansi (bulan)</Label>
            <Input
              id="warranty"
              type="number"
              min="0"
              value={warrantyMonths}
              onChange={(event) => setWarrantyMonths(event.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Gambar Produk</CardTitle>
          <CardDescription>
            Upload file atau isi URL gambar. Tandai satu gambar sebagai utama.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {images.map((image, index) => (
            <div
              key={image.key}
              className="grid gap-4 rounded-xl border p-4 md:grid-cols-[96px_minmax(0,1fr)]"
            >
              <Image
                src={
                  image.file
                    ? URL.createObjectURL(image.file)
                    : image.imageUrl ||
                      "https://placehold.co/96x96/png?text=Preview"
                }
                alt={`Gambar ${index + 1}`}
                width={96}
                height={96}
                className="size-24 rounded-md object-cover"
              />
              <div className="space-y-3">
                <div className="space-y-2">
                  <Label>Upload File</Label>
                  <Input
                    type="file"
                    accept="image/jpeg,image/png,image/webp,image/gif"
                    onChange={(event) =>
                      updateImageRow(image.key, {
                        file: event.target.files?.[0],
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>URL Gambar</Label>
                  <Input
                    value={image.imageUrl}
                    onChange={(event) =>
                      updateImageRow(image.key, {
                        imageUrl: event.target.value,
                      })
                    }
                    placeholder="https://..."
                  />
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button
                    type="button"
                    variant={image.isPrimary ? "default" : "outline"}
                    size="sm"
                    onClick={() => setPrimaryImage(image.key)}
                  >
                    {image.isPrimary ? "Gambar Utama" : "Jadikan Utama"}
                  </Button>
                  {images.length > 1 ? (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeImageRow(image.key)}
                    >
                      Hapus
                    </Button>
                  ) : null}
                </div>
              </div>
            </div>
          ))}
          <Button type="button" variant="outline" onClick={addImageRow}>
            Tambah Gambar
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Spesifikasi</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {specifications.map((spec) => (
            <div key={spec.key} className="grid gap-3 md:grid-cols-[1fr_1fr_auto]">
              <Input
                value={spec.specKey}
                onChange={(event) =>
                  updateSpecificationRow(spec.key, {
                    specKey: event.target.value,
                  })
                }
                placeholder="Nama spesifikasi"
              />
              <Input
                value={spec.specValue}
                onChange={(event) =>
                  updateSpecificationRow(spec.key, {
                    specValue: event.target.value,
                  })
                }
                placeholder="Nilai"
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => removeSpecificationRow(spec.key)}
              >
                Hapus
              </Button>
            </div>
          ))}
          <Button type="button" variant="outline" onClick={addSpecificationRow}>
            Tambah Spesifikasi
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Varian</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {variants.map((variant) => (
            <div
              key={variant.key}
              className="grid gap-3 rounded-xl border p-4 md:grid-cols-2 xl:grid-cols-5"
            >
              <Input
                value={variant.variantName}
                onChange={(event) =>
                  updateVariantRow(variant.key, {
                    variantName: event.target.value,
                  })
                }
                placeholder="Nama varian"
              />
              <Input
                type="number"
                value={variant.priceAdjustment}
                onChange={(event) =>
                  updateVariantRow(variant.key, {
                    priceAdjustment: event.target.value,
                  })
                }
                placeholder="Penyesuaian harga"
              />
              <Input
                type="number"
                min="0"
                value={variant.stock}
                onChange={(event) =>
                  updateVariantRow(variant.key, { stock: event.target.value })
                }
                placeholder="Stok"
              />
              <Input
                value={variant.sku}
                onChange={(event) =>
                  updateVariantRow(variant.key, { sku: event.target.value })
                }
                placeholder="SKU varian"
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => removeVariantRow(variant.key)}
              >
                Hapus
              </Button>
            </div>
          ))}
          <Button type="button" variant="outline" onClick={addVariantRow}>
            Tambah Varian
          </Button>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-3">
        <Button
          nativeButton={false}
          render={<Link href="/admin/products" />}
          variant="outline"
          type="button"
        >
          Batal
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting
            ? "Menyimpan..."
            : mode === "create"
              ? "Buat Produk"
              : "Simpan Perubahan"}
        </Button>
      </div>
    </form>
  );
}
