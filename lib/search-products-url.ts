import type { ProductSort } from "@/types/product";

const DEFAULT_SORT: ProductSort = "terbaru";

export function searchProductsUrl(
  query: string,
  options: { page?: number; sort?: ProductSort } = {},
) {
  const params = new URLSearchParams();
  params.set("q", query);

  const sort = options.sort ?? DEFAULT_SORT;

  if (sort !== DEFAULT_SORT) {
    params.set("sort", sort);
  }

  if (options.page !== undefined && options.page > 1) {
    params.set("page", String(options.page));
  }

  return `/search?${params.toString()}`;
}
