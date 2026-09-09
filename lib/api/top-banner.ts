import { httpClient } from "@/lib/http-client";
import type { TopBanner, TopBannerResponse } from "@/types/top-banner";

export async function getTopBanners(): Promise<TopBanner[]> {
  try {
    const response = await httpClient<TopBannerResponse>("/top-banner", {
      revalidate: 60, // cache 60 detik, cukup untuk data yang jarang berubah
    });

    return response.data;
  } catch {
    return [];
  }
}
