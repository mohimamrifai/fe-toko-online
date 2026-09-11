import { getProducts } from "@/lib/api/product";
import type { ProductSort } from "@/types/product";

import { ProductGridContent } from "./product-grid-content";

const DEFAULT_LIMIT = 8;

type ProductGridProps = {
  title?: string;
  sort?: ProductSort;
  page?: number;
  limit?: number;
};

export async function ProductGrid({
  title = "Terlaris",
  sort = "terlaris",
  page = 1,
  limit = DEFAULT_LIMIT,
}: ProductGridProps) {
  const { items } = await getProducts({ sort, page, limit });

  if (items.length === 0) {
    return null;
  }

  return (
    <ProductGridContent title={title} sort={sort} products={items} />
  );
}
