export type ProductSort = "terlaris" | "terbaru" | "termurah";

export interface ProductCategory {
  id: string;
  name: string;
  slug: string;
}

export interface ProductBrand {
  id: string;
  name: string;
  slug: string;
}

export interface ProductListItem {
  id: string;
  name: string;
  slug: string;
  image: string | null;
  price: number;
  originalPrice: number | null;
  rating: number;
  soldCount: number;
  category: ProductCategory;
  brand: ProductBrand;
}

export interface ProductsListMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface ProductsListResponse {
  data: {
    items: ProductListItem[];
    meta: ProductsListMeta;
  };
}

export interface ProductImage {
  id: string;
  imageUrl: string;
  isPrimary: boolean;
  sortOrder: number;
}

export interface ProductSpecification {
  id: string;
  specKey: string;
  specValue: string;
  sortOrder: number;
}

export interface ProductVariant {
  id: string;
  variantName: string;
  priceAdjustment: number;
  stock: number;
  sku: string;
  finalPrice: number;
}

export interface ProductBrandDetail extends ProductBrand {
  logoUrl: string | null;
}

export interface ProductDetail {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  price: number;
  originalPrice: number | null;
  stock: number;
  sku: string;
  warrantyMonths: number | null;
  rating: number;
  soldCount: number;
  category: ProductCategory;
  brand: ProductBrandDetail;
  images: ProductImage[];
  specifications: ProductSpecification[];
  variants: ProductVariant[];
}

export interface ProductDetailResponse {
  data: ProductDetail;
}
