import { httpClient } from "@/lib/http-client";
import type {
  Brand,
  BrandDetail,
  BrandDetailResponse,
  BrandResponse,
} from "@/types/brand";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function getBrands(): Promise<Brand[]> {
  try {
    const response = await httpClient<BrandResponse>("/brands", {
      revalidate: 60,
    });

    return response.data;
  } catch {
    return [];
  }
}

export async function getBrandBySlug(slug: string): Promise<BrandDetail | null> {
  if (!API_BASE_URL) {
    return null;
  }

  try {
    const res = await fetch(`${API_BASE_URL}/brands/${slug}`, {
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 60 },
    });

    if (res.status === 404) {
      return null;
    }

    if (!res.ok) {
      return null;
    }

    const response = (await res.json()) as BrandDetailResponse;
    return response.data;
  } catch {
    return null;
  }
}
