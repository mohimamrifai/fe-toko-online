"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  clearStoredCart,
  getCartLineKey,
  getStoredCartItems,
  setStoredCartItems,
} from "@/lib/cart-storage";
import type { AddToCartPayload, CartItem } from "@/types/cart";

interface CartContextValue {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  isHydrated: boolean;
  addItem: (payload: AddToCartPayload, quantity?: number) => void;
  updateQuantity: (
    productId: string,
    variantId: string | undefined,
    quantity: number,
  ) => void;
  removeItem: (productId: string, variantId?: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

function clampQuantity(quantity: number, maxStock: number) {
  return Math.max(1, Math.min(quantity, maxStock));
}

function calculateItemCount(items: CartItem[]) {
  return items.reduce((total, item) => total + item.quantity, 0);
}

function calculateSubtotal(items: CartItem[]) {
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
}

function applyAddItem(
  items: CartItem[],
  payload: AddToCartPayload,
  quantity: number,
) {
  if (payload.maxStock <= 0 || quantity <= 0) {
    return items;
  }

  const lineKey = getCartLineKey(payload.productId, payload.variantId);
  const existingIndex = items.findIndex(
    (item) => getCartLineKey(item.productId, item.variantId) === lineKey,
  );

  if (existingIndex === -1) {
    return [
      ...items,
      {
        productId: payload.productId,
        variantId: payload.variantId,
        slug: payload.slug,
        name: payload.name,
        image: payload.image,
        price: payload.price,
        quantity: clampQuantity(quantity, payload.maxStock),
        maxStock: payload.maxStock,
        variantName: payload.variantName,
      },
    ];
  }

  const existingItem = items[existingIndex];
  const nextItems = [...items];
  nextItems[existingIndex] = {
    ...existingItem,
    price: payload.price,
    maxStock: payload.maxStock,
    quantity: clampQuantity(
      existingItem.quantity + quantity,
      payload.maxStock,
    ),
  };

  return nextItems;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    // Hydrate cart from localStorage after mount to avoid SSR mismatch.
    // eslint-disable-next-line react-hooks/set-state-in-effect -- client-only cart state
    setItems(getStoredCartItems());
    setIsHydrated(true);
  }, []);

  const addItem = useCallback(
    (payload: AddToCartPayload, quantity = 1) => {
      setItems((currentItems) => {
        const nextItems = applyAddItem(currentItems, payload, quantity);
        setStoredCartItems(nextItems);
        return nextItems;
      });
    },
    [],
  );

  const updateQuantity = useCallback(
    (productId: string, variantId: string | undefined, quantity: number) => {
      setItems((currentItems) => {
        const lineKey = getCartLineKey(productId, variantId);
        const nextItems = currentItems
          .map((item) => {
            if (getCartLineKey(item.productId, item.variantId) !== lineKey) {
              return item;
            }

            return {
              ...item,
              quantity: clampQuantity(quantity, item.maxStock),
            };
          })
          .filter((item) => item.quantity > 0);

        setStoredCartItems(nextItems);
        return nextItems;
      });
    },
    [],
  );

  const removeItem = useCallback((productId: string, variantId?: string) => {
    setItems((currentItems) => {
      const lineKey = getCartLineKey(productId, variantId);
      const nextItems = currentItems.filter(
        (item) => getCartLineKey(item.productId, item.variantId) !== lineKey,
      );

      setStoredCartItems(nextItems);
      return nextItems;
    });
  }, []);

  const clearCart = useCallback(() => {
    clearStoredCart();
    setItems([]);
  }, []);

  const value = useMemo(
    () => ({
      items,
      itemCount: calculateItemCount(items),
      subtotal: calculateSubtotal(items),
      isHydrated,
      addItem,
      updateQuantity,
      removeItem,
      clearCart,
    }),
    [
      items,
      isHydrated,
      addItem,
      updateQuantity,
      removeItem,
      clearCart,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }

  return context;
}
