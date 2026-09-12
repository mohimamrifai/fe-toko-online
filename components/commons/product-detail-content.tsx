"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Heart, ShoppingBag, Star } from "lucide-react";

import { useCart } from "@/components/providers/cart-provider";
import { Button } from "@/components/ui/button";
import { formatRupiah } from "@/lib/format-rupiah";
import type { ProductDetail } from "@/types/product";
import { cn } from "@/lib/utils";

const PLACEHOLDER_IMAGE =
  "https://placehold.co/800x800/png?text=Produk+Elektronik";

type ProductDetailContentProps = {
  product: ProductDetail;
};

export function ProductDetailContent({ product }: ProductDetailContentProps) {
  const { addItem } = useCart();
  const [cartMessage, setCartMessage] = useState<string | null>(null);

  const galleryImages = useMemo(() => {
    if (product.images.length > 0) {
      return product.images;
    }

    return [
      {
        id: "placeholder",
        imageUrl: PLACEHOLDER_IMAGE,
        isPrimary: true,
        sortOrder: 0,
      },
    ];
  }, [product.images]);

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedVariantId, setSelectedVariantId] = useState<string | null>(
    product.variants[0]?.id ?? null,
  );

  const selectedVariant = product.variants.find(
    (variant) => variant.id === selectedVariantId,
  );

  const displayPrice = selectedVariant?.finalPrice ?? product.price;
  const displayOriginalPrice =
    product.originalPrice !== null
      ? selectedVariant
        ? product.originalPrice + selectedVariant.priceAdjustment
        : product.originalPrice
      : null;
  const displayStock = selectedVariant?.stock ?? product.stock;
  const displaySku = selectedVariant?.sku ?? product.sku;
  const selectedImage = galleryImages[selectedImageIndex] ?? galleryImages[0];

  function handleAddToCart() {
    if (displayStock <= 0) {
      return;
    }

    if (product.variants.length > 0 && !selectedVariantId) {
      setCartMessage("Pilih varian produk terlebih dahulu.");
      return;
    }

    addItem({
      productId: product.id,
      variantId: selectedVariant?.id,
      slug: product.slug,
      name: product.name,
      image: selectedImage.imageUrl,
      price: displayPrice,
      maxStock: displayStock,
      variantName: selectedVariant?.variantName,
    });

    setCartMessage("Produk berhasil ditambahkan ke keranjang.");
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 md:px-8 md:py-10">
      <nav className="mb-6 text-sm text-muted-foreground">
        <ol className="flex flex-wrap items-center gap-2">
          <li>
            <Link href="/" className="hover:text-foreground">
              Home
            </Link>
          </li>
          <li>/</li>
          <li>
            <Link
              href={`/categories/${product.category.slug}`}
              className="hover:text-foreground"
            >
              {product.category.name}
            </Link>
          </li>
          <li>/</li>
          <li className="text-foreground">{product.name}</li>
        </ol>
      </nav>

      <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
        <div className="space-y-4">
          <div className="relative aspect-square overflow-hidden rounded-2xl border bg-muted">
            <Image
              src={selectedImage.imageUrl}
              alt={product.name}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              priority
            />
          </div>

          {galleryImages.length > 1 && (
            <div className="grid grid-cols-4 gap-3 sm:grid-cols-5">
              {galleryImages.map((image, index) => (
                <button
                  key={image.id}
                  type="button"
                  onClick={() => setSelectedImageIndex(index)}
                  className={cn(
                    "relative aspect-square overflow-hidden rounded-xl border bg-muted transition",
                    selectedImageIndex === index
                      ? "ring-2 ring-primary"
                      : "hover:opacity-80",
                  )}
                  aria-label={`Lihat gambar ${index + 1}`}
                >
                  <Image
                    src={image.imageUrl}
                    alt={`${product.name} ${index + 1}`}
                    fill
                    sizes="120px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div className="space-y-3">
            <Link
              href={`/brands/${product.brand.slug}`}
              className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
            >
              {product.brand.logoUrl ? (
                <Image
                  src={product.brand.logoUrl}
                  alt={product.brand.name}
                  width={20}
                  height={20}
                  className="rounded-full"
                />
              ) : null}
              {product.brand.name}
            </Link>

            <h1 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
              {product.name}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                <span className="font-medium text-foreground">
                  {product.rating}
                </span>
              </div>
              <span>Terjual {product.soldCount}+</span>
              <span>SKU: {displaySku}</span>
            </div>
          </div>

          <div className="space-y-1">
            <p className="text-3xl font-bold text-foreground">
              {formatRupiah(displayPrice)}
            </p>
            {displayOriginalPrice !== null &&
              displayOriginalPrice > displayPrice && (
              <p className="text-sm text-muted-foreground line-through">
                {formatRupiah(displayOriginalPrice)}
              </p>
            )}
          </div>

          <div className="grid gap-3 rounded-xl border bg-card p-4 text-sm sm:grid-cols-2">
            <div>
              <p className="text-muted-foreground">Stok</p>
              <p className="font-medium text-foreground">
                {displayStock > 0 ? `${displayStock} unit` : "Stok habis"}
              </p>
            </div>
            <div>
              <p className="text-muted-foreground">Garansi</p>
              <p className="font-medium text-foreground">
                {product.warrantyMonths
                  ? `${product.warrantyMonths} bulan`
                  : "Tidak tersedia"}
              </p>
            </div>
            <div>
              <p className="text-muted-foreground">Kategori</p>
              <Link
                href={`/categories/${product.category.slug}`}
                className="font-medium text-primary hover:underline"
              >
                {product.category.name}
              </Link>
            </div>
            <div>
              <p className="text-muted-foreground">Brand</p>
              <Link
                href={`/brands/${product.brand.slug}`}
                className="font-medium text-primary hover:underline"
              >
                {product.brand.name}
              </Link>
            </div>
          </div>

          {product.variants.length > 0 && (
            <div className="space-y-3">
              <p className="text-sm font-medium text-foreground">Pilih Varian</p>
              <div className="flex flex-wrap gap-2">
                {product.variants.map((variant) => (
                  <Button
                    key={variant.id}
                    type="button"
                    variant={
                      selectedVariantId === variant.id ? "default" : "outline"
                    }
                    size="sm"
                    onClick={() => setSelectedVariantId(variant.id)}
                  >
                    {variant.variantName}
                  </Button>
                ))}
              </div>
            </div>
          )}

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button
              type="button"
              size="lg"
              className="flex-1"
              disabled={displayStock <= 0}
              onClick={handleAddToCart}
            >
              <ShoppingBag className="h-4 w-4" />
              Tambah ke Keranjang
            </Button>
            <Button
              type="button"
              size="lg"
              variant="outline"
              onClick={() => undefined}
            >
              <Heart className="h-4 w-4" />
              Wishlist
            </Button>
          </div>

          {cartMessage ? (
            <p className="text-sm text-primary" role="status">{cartMessage}</p>
          ) : null}

          {product.description && (
            <div className="space-y-2">
              <h2 className="text-lg font-semibold text-foreground">
                Deskripsi Produk
              </h2>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {product.description}
              </p>
            </div>
          )}
        </div>
      </div>

      {product.specifications.length > 0 && (
        <section className="mt-10">
          <h2 className="mb-4 text-lg font-semibold text-foreground">
            Spesifikasi Teknis
          </h2>
          <div className="overflow-hidden rounded-xl border">
            <table className="w-full text-sm">
              <tbody>
                {product.specifications.map((specification) => (
                  <tr key={specification.id} className="border-b last:border-b-0">
                    <th className="w-1/3 bg-muted/40 px-4 py-3 text-left font-medium text-foreground">
                      {specification.specKey}
                    </th>
                    <td className="px-4 py-3 text-muted-foreground">
                      {specification.specValue}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </div>
  );
}
