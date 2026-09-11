import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";

import { formatRupiah } from "@/lib/format-rupiah";
import type { ProductListItem } from "@/types/product";

const PLACEHOLDER_IMAGE =
  "https://placehold.co/600x600/png?text=Produk+Elektronik";

type ProductCardsGridProps = {
  products: ProductListItem[];
};

export function ProductCardsGrid({ products }: ProductCardsGridProps) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 sm:gap-4">
      {products.map((product) => (
        <Link
          key={product.id}
          href={`/products/${product.slug}`}
          className="group flex flex-col overflow-hidden rounded-xl border bg-card transition-shadow hover:shadow-md"
        >
          <div className="relative aspect-square w-full overflow-hidden bg-muted">
            <Image
              src={product.image ?? PLACEHOLDER_IMAGE}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>

          <div className="flex flex-1 flex-col p-3">
            <span className="text-[10px] font-medium text-muted-foreground">
              {product.category.name}
            </span>
            <h3 className="line-clamp-2 text-xs leading-tight text-foreground sm:text-sm mt-0.5">
              {product.name}
            </h3>

            <div className="mt-auto pt-2">
              <p className="text-sm font-bold text-foreground md:text-base">
                {formatRupiah(product.price)}
              </p>
              {product.originalPrice !== null && (
                <p className="text-[10px] text-muted-foreground line-through md:text-xs">
                  {formatRupiah(product.originalPrice)}
                </p>
              )}

              <div className="mt-2 flex items-center justify-between text-[10px] text-muted-foreground sm:text-xs">
                <div className="flex items-center gap-1">
                  <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                  <span className="font-medium text-foreground">
                    {product.rating}
                  </span>
                </div>
                <span>Terjual {product.soldCount}+</span>
              </div>

              <div className="mt-2.5 flex w-full items-center justify-center rounded-lg bg-primary py-1.5 text-[11px] font-semibold text-primary-foreground transition-colors group-hover:bg-primary/90 sm:mt-3 sm:py-2 sm:text-sm">
                Beli Sekarang
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
