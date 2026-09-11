import type { ProductSort } from "@/types/product";

const DEFAULT_SORT: ProductSort = "terbaru";

export function brandProductsUrl(
  slug: string,
  options: { page?: number; sort?: ProductSort } = {},
) {
  const params = new URLSearchParams();
  const sort = options.sort ?? DEFAULT_SORT;

  if (sort !== DEFAULT_SORT) {
    params.set("sort", sort);
  }

  if (options.page !== undefined && options.page > 1) {
    params.set("page", String(options.page));
  }

  const query = params.toString();
  return query ? `/brands/${slug}?${query}` : `/brands/${slug}`;
}
