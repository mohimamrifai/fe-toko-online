export interface TopBanner {
  id: string;
  message: string;
  href: string | null;
}

export interface TopBannerResponse {
  data: TopBanner[];
}
