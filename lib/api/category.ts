import { httpClient } from "@/lib/http-client";
import type { Category, CategoryResponse } from "@/types/category";

export async function getCategories(): Promise<Category[]> {
  try {
    const response = await httpClient<CategoryResponse>("/categories", {
      revalidate: 60,
    });

    return response.data;
  } catch {
    return [];
  }
}

export async function getCategoryBySlug(
  slug: string,
): Promise<Category | null> {
  const categories = await getCategories();
  return categories.find((category) => category.slug === slug) ?? null;
}
