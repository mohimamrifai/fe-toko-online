import { getTopBanners } from "@/lib/api/top-banner";

import { TopBannerContent } from "./top-banner-content";

export default async function TopBanner() {
  const banners = await getTopBanners();
  const banner = banners[0];

  if (!banner) {
    return null;
  }

  return <TopBannerContent banner={banner} />;
}
