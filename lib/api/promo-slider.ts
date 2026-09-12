import { httpClient } from "@/lib/http-client";
import type {
  PromoSlide,
  PromoSlider,
  PromoSliderResponse,
} from "@/types/promo-slider";

const DEFAULT_CTA_LABEL = "Belanja Sekarang";
export const MAX_PROMO_SLIDES = 5;

export async function getPromoSliders(): Promise<PromoSlider[]> {
  try {
    const response = await httpClient<PromoSliderResponse>("/promo-slider", {
      revalidate: 60,
    });

    return response.data.slice(0, MAX_PROMO_SLIDES);
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
