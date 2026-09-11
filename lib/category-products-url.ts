import type { ProductSort } from "@/types/product";

const DEFAULT_SORT: ProductSort = "terbaru";

export function categoryProductsUrl(
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
  return query ? `/categories/${slug}?${query}` : `/categories/${slug}`;
}

export function parseProductSort(value: string | undefined): ProductSort {
  if (value === "terlaris" || value === "termurah" || value === "terbaru") {
    return value;
  }

  return DEFAULT_SORT;
}

export function parsePage(value: string | undefined): number {
  const page = Number.parseInt(value ?? "1", 10);
  return Number.isFinite(page) && page > 0 ? page : 1;
}
