import { getPromoSliders, mapPromoSlides } from "@/lib/api/promo-slider";

import { PromoSliderContent } from "./promo-slider-content";

export async function PromoSlider() {
  const sliders = await getPromoSliders();

  if (sliders.length === 0) {
    return null;
  }

  return <PromoSliderContent slides={mapPromoSlides(sliders)} />;
}
