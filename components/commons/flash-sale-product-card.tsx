import Image from "next/image";
import Link from "next/link";

import { formatRupiah } from "@/lib/format-rupiah";
import type { FlashSaleProductCard } from "@/lib/api/flash-sale";

type FlashSaleProductCardProps = {
  product: FlashSaleProductCard;
};

export function FlashSaleProductCardItem({ product }: FlashSaleProductCardProps) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-xl border bg-card transition-shadow hover:shadow-md"
    >
      <div className="relative aspect-square w-full overflow-hidden bg-muted">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {product.discount > 0 && (
          <div className="absolute left-0 top-0 rounded-br-lg bg-red-600 px-2 py-1 text-[10px] font-bold text-white sm:text-xs">
            -{product.discount}%
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-2.5 sm:p-3">
        <h3 className="line-clamp-2 text-xs leading-tight text-foreground sm:text-sm">
          {product.name}
        </h3>

        <div className="mt-auto pt-2">
          <p className="text-sm font-bold text-red-600 md:text-base">
            {formatRupiah(product.price)}
          </p>
          {product.originalPrice > product.price && (
            <p className="text-[9px] text-muted-foreground line-through sm:text-[10px] md:text-xs">
              {formatRupiah(product.originalPrice)}
            </p>
          )}

          <div className="mt-2 flex items-center gap-1.5 sm:gap-2">
            <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-muted">
              <div
                className="absolute left-0 top-0 h-full rounded-full bg-red-600 transition-all"
                style={{ width: `${product.soldPercentage}%` }}
              />
            </div>
            <span className="whitespace-nowrap text-[9px] text-muted-foreground sm:text-[10px]">
              Sisa {product.remainingStock}
            </span>
          </div>

          <div className="mt-2.5 flex w-full items-center justify-center rounded-lg bg-primary py-1.5 text-[11px] font-semibold text-primary-foreground transition-colors group-hover:bg-primary/90 sm:mt-3 sm:py-2 sm:text-sm">
            Beli Sekarang
          </div>
        </div>
      </div>
    </Link>
  );
}
