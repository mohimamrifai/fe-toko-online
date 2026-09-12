import type { CartItem } from "@/types/cart";

const CART_KEY = "toko_elektronik_cart";

export function getCartLineKey(productId: string, variantId?: string) {
  return `${productId}:${variantId ?? ""}`;
}

export function getStoredCartItems(): CartItem[] {
  if (typeof window === "undefined") {
    return [];
  }

  const raw = localStorage.getItem(CART_KEY);

  if (!raw) {
    return [];
  }

  try {
    const parsed = JSON.parse(raw) as CartItem[];

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.filter(
      (item) =>
        item.productId &&
        item.slug &&
        item.name &&
        typeof item.price === "number" &&
        typeof item.quantity === "number",
    );
  } catch {
    return [];
  }
}

export function setStoredCartItems(items: CartItem[]) {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
}

export function clearStoredCart() {
  localStorage.removeItem(CART_KEY);
}
