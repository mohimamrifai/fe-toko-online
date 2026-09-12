export interface CartItem {
  productId: string;
  variantId?: string;
  slug: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  maxStock: number;
  variantName?: string;
}

export interface AddToCartPayload {
  productId: string;
  variantId?: string;
  slug: string;
  name: string;
  image: string;
  price: number;
  maxStock: number;
  variantName?: string;
}
