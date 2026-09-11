import { getPromoBanners, mapPromoBanner } from "@/lib/api/promo-banner";

import { PromoBannerContent } from "./promo-banner-content";

export async function PromoBanner() {
  const banners = await getPromoBanners();

  if (banners.length === 0) {
    return null;
  }

  const banner = mapPromoBanner(banners[0]);

  return <PromoBannerContent banner={banner} />;
}
