export interface PromoSlider {
  id: string;
  title: string;
  imageUrl: string;
  href: string;
}

export interface PromoSliderResponse {
  data: PromoSlider[];
}

export type PromoSlide = {
  id: string;
  title: string;
  description: string;
  image: string;
  href: string;
  ctaLabel: string;
};
