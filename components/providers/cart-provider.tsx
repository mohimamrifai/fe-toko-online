"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { useAuth } from "@/components/providers/auth-provider";
import {
  addCartItem,
  clearServerCart,
  getCart,
  removeCartItem,
  updateCartItem,
} from "@/lib/api/cart";
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

function findCartItem(
  items: CartItem[],
  productId: string,
  variantId?: string,
) {
  const lineKey = getCartLineKey(productId, variantId);
  return items.find(
    (item) => getCartLineKey(item.productId, item.variantId) === lineKey,
  );
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const { user, isAuthenticated, isLoading: isAuthLoading } = useAuth();
  const [items, setItems] = useState<CartItem[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);
  const syncedUserIdRef = useRef<string | null>(null);
  const wasAuthenticatedRef = useRef(false);

  useEffect(() => {
    if (isAuthLoading) {
      return;
    }

    if (wasAuthenticatedRef.current && !isAuthenticated) {
      setStoredCartItems(items);
      syncedUserIdRef.current = null;
    }

    wasAuthenticatedRef.current = isAuthenticated;
  }, [isAuthLoading, isAuthenticated, items]);

  useEffect(() => {
    if (isAuthLoading || isAuthenticated) {
      return;
    }

    // eslint-disable-next-line react-hooks/set-state-in-effect -- guest cart hydration
    setItems(getStoredCartItems());
    setIsHydrated(true);
  }, [isAuthLoading, isAuthenticated]);

  useEffect(() => {
    if (isAuthLoading || !isAuthenticated || !user) {
      return;
    }

    if (syncedUserIdRef.current === user.id) {
      return;
    }

    const userId = user.id;
    let cancelled = false;

    async function syncCartWithServer() {
      try {
        const localItems = getStoredCartItems();

        for (const item of localItems) {
          await addCartItem({
            productId: item.productId,
            variantId: item.variantId,
            quantity: item.quantity,
          });
        }

        if (localItems.length > 0) {
          clearStoredCart();
        }

        const serverCart = await getCart();

        if (!cancelled) {
          setItems(serverCart.items);
          syncedUserIdRef.current = userId;
        }
      } catch {
        if (!cancelled) {
          setItems(getStoredCartItems());
        }
      } finally {
        if (!cancelled) {
          setIsHydrated(true);
        }
      }
    }

    void syncCartWithServer();

    return () => {
      cancelled = true;
    };
  }, [isAuthLoading, isAuthenticated, user]);

  const addItem = useCallback(
    (payload: AddToCartPayload, quantity = 1) => {
      if (isAuthenticated) {
        void addCartItem({
          productId: payload.productId,
          variantId: payload.variantId,
          quantity,
        })
          .then((cart) => {
            setItems(cart.items);
          })
          .catch(() => undefined);
        return;
      }

      setItems((currentItems) => {
        const nextItems = applyAddItem(currentItems, payload, quantity);
        setStoredCartItems(nextItems);
        return nextItems;
      });
    },
    [isAuthenticated],
  );

  const updateQuantity = useCallback(
    (productId: string, variantId: string | undefined, quantity: number) => {
      if (isAuthenticated) {
        const item = findCartItem(items, productId, variantId);

        if (!item?.id) {
          return;
        }

        void updateCartItem(item.id, quantity)
          .then((cart) => {
            setItems(cart.items);
          })
          .catch(() => undefined);
        return;
      }

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
    [isAuthenticated, items],
  );

  const removeItem = useCallback(
    (productId: string, variantId?: string) => {
      if (isAuthenticated) {
        const item = findCartItem(items, productId, variantId);

        if (!item?.id) {
          return;
        }

        void removeCartItem(item.id)
          .then((cart) => {
            setItems(cart.items);
          })
          .catch(() => undefined);
        return;
      }

      setItems((currentItems) => {
        const lineKey = getCartLineKey(productId, variantId);
        const nextItems = currentItems.filter(
          (item) => getCartLineKey(item.productId, item.variantId) !== lineKey,
        );

        setStoredCartItems(nextItems);
        return nextItems;
      });
    },
    [isAuthenticated, items],
  );

  const clearCart = useCallback(() => {
    if (isAuthenticated) {
      void clearServerCart()
        .then((cart) => {
          setItems(cart.items);
        })
        .catch(() => undefined);
      clearStoredCart();
      return;
    }

    clearStoredCart();
    setItems([]);
  }, [isAuthenticated]);

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
