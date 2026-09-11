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
