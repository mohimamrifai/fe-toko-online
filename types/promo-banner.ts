export interface PromoBanner {
  id: string;
  title: string;
  subtitle: string;
  buttonText: string;
  href: string;
  imageUrl: string;
  badge: string | null;
  sortOrder: number;
}

export interface PromoBannerResponse {
  data: PromoBanner[];
}

export interface PromoBannerView {
  id: string;
  title: string;
  subtitle: string;
  buttonText: string;
  href: string;
  image: string;
  badge: string | null;
}
