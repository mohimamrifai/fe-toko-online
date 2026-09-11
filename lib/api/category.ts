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
