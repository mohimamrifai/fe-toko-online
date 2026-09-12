import type { FlashSaleViewModel } from "@/lib/api/flash-sale";

import { FlashSaleCountdown } from "./flash-sale-countdown";
import { FlashSaleProductCardItem } from "./flash-sale-product-card";

type FlashSalePageContentProps = {
  flashSale: FlashSaleViewModel;
};

export function FlashSalePageContent({ flashSale }: FlashSalePageContentProps) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-6 md:px-8 md:py-8">
      <div className="mb-6">
        <FlashSaleCountdown
          name={flashSale.name}
          endsAt={flashSale.endsAt}
          showTitle={false}
        />
        <p className="mt-2 text-sm text-muted-foreground md:text-base">
          Penawaran terbatas — buruan sebelum kehabisan stok.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 sm:gap-4">
        {flashSale.products.map((product) => (
          <FlashSaleProductCardItem key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
