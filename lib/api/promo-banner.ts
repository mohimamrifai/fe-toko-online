import { httpClient } from "@/lib/http-client";
import type {
  PromoBanner,
  PromoBannerResponse,
  PromoBannerView,
} from "@/types/promo-banner";

export async function getPromoBanners(): Promise<PromoBanner[]> {
  try {
    const response = await httpClient<PromoBannerResponse>("/promo-banners", {
      revalidate: 60,
    });

    return response.data;
  } catch {
    return [];
  }
}

export function mapPromoBanner(banner: PromoBanner): PromoBannerView {
  return {
    id: banner.id,
    title: banner.title,
    subtitle: banner.subtitle,
    buttonText: banner.buttonText,
    href: banner.href,
    image: banner.imageUrl,
    badge: banner.badge,
  };
}
