export interface CartItem {
  id?: string;
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

export interface CartResponse {
  items: CartItem[];
  subtotal: number;
  itemCount: number;
}

export interface CreateCartItemPayload {
  productId: string;
  variantId?: string;
  quantity: number;
}
