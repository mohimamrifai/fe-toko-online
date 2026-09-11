import { httpClient } from "@/lib/http-client";
import type {
  ProductListItem,
  ProductSort,
  ProductsListResponse,
} from "@/types/product";

export interface GetProductsOptions {
  page?: number;
  limit?: number;
  category?: string;
  brand?: string;
  sort?: ProductSort;
}

export async function getProducts(
  options: GetProductsOptions = {},
): Promise<{ items: ProductListItem[]; meta: ProductsListResponse["data"]["meta"] }> {
  const searchParams = new URLSearchParams();

  if (options.page !== undefined) {
    searchParams.set("page", String(options.page));
  }

  if (options.limit !== undefined) {
    searchParams.set("limit", String(options.limit));
  }

  if (options.category) {
    searchParams.set("category", options.category);
  }

  if (options.brand) {
    searchParams.set("brand", options.brand);
  }

  if (options.sort) {
    searchParams.set("sort", options.sort);
  }

  const query = searchParams.toString();
  const path = query ? `/products?${query}` : "/products";

  try {
    const response = await httpClient<ProductsListResponse>(path, {
      revalidate: 60,
    });

    return response.data;
  } catch {
    return {
      items: [],
      meta: {
        page: options.page ?? 1,
        limit: options.limit ?? 12,
        total: 0,
        totalPages: 0,
      },
    };
  }
}
