export interface Brand {
  id: string;
  name: string;
  slug: string;
  logoUrl: string | null;
}

export interface BrandDetail extends Brand {
  productCount: number;
}

export interface BrandResponse {
  data: Brand[];
}

export interface BrandDetailResponse {
  data: BrandDetail;
}
