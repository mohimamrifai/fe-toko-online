import { httpClient } from "@/lib/http-client";
import type {
  PromoSlide,
  PromoSlider,
  PromoSliderResponse,
} from "@/types/promo-slider";

const DEFAULT_CTA_LABEL = "Belanja Sekarang";

export async function getPromoSliders(): Promise<PromoSlider[]> {
  try {
    const response = await httpClient<PromoSliderResponse>("/promo-slider", {
      revalidate: 60,
    });

    return response.data;
  } catch {
    return [];
  }
}

export function mapPromoSlides(slides: PromoSlider[]): PromoSlide[] {
  return slides.map((slide) => ({
    id: slide.id,
    title: slide.title,
    description: "",
    image: slide.imageUrl,
    href: slide.href,
    ctaLabel: DEFAULT_CTA_LABEL,
  }));
}
