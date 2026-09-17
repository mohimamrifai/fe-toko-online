export interface AdminProductCategory {
  id: string;
  name: string;
  slug: string;
}

export interface AdminProductBrand {
  id: string;
  name: string;
  slug: string;
  logoUrl?: string | null;
}

export interface AdminProductImage {
  id?: string;
  imageUrl: string;
  isPrimary: boolean;
  sortOrder: number;
}

export interface AdminProductSpecification {
  id?: string;
  specKey: string;
  specValue: string;
  sortOrder: number;
}

export interface AdminProductVariant {
  id?: string;
  variantName: string;
  priceAdjustment: number;
  stock: number;
  sku: string;
}

export interface AdminProductListItem {
  id: string;
  name: string;
  slug: string;
  sku: string;
  price: number;
  discountPrice: number | null;
  stock: number;
  isActive: boolean;
  createdAt: string;
  primaryImage: string | null;
  category: AdminProductCategory;
  brand: AdminProductBrand;
}

export interface AdminProductDetail {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  price: number;
  discountPrice: number | null;
  stock: number;
  sku: string;
  warrantyMonths: number | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  category: AdminProductCategory;
  brand: AdminProductBrand;
  images: AdminProductImage[];
  specifications: AdminProductSpecification[];
  variants: AdminProductVariant[];
}

export interface AdminProductListResponse {
  data: {
    items: AdminProductListItem[];
    meta: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  };
}

export interface AdminProductResponse {
  data: AdminProductDetail;
}

export interface CreateAdminProductPayload {
  categoryId: string;
  brandId: string;
  name: string;
  slug: string;
  description?: string;
  price: number;
  discountPrice?: number;
  stock: number;
  sku: string;
  warrantyMonths?: number;
  isActive?: boolean;
  images: Array<{
    imageUrl: string;
    isPrimary?: boolean;
    sortOrder?: number;
  }>;
  specifications?: Array<{
    specKey: string;
    specValue: string;
    sortOrder?: number;
  }>;
  variants?: Array<{
    variantName: string;
    priceAdjustment?: number;
    stock: number;
    sku: string;
  }>;
}

export type UpdateAdminProductPayload = Partial<CreateAdminProductPayload>;
