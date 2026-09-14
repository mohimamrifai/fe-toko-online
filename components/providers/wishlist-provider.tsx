"use client";

import { useRouter } from "next/navigation";
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
  addWishlistItem,
  getWishlist,
  removeWishlistItem,
} from "@/lib/api/wishlist";
import type { WishlistItem } from "@/types/wishlist";

interface WishlistContextValue {
  items: WishlistItem[];
  itemCount: number;
  isHydrated: boolean;
  isInWishlist: (productId: string) => boolean;
  toggleWishlist: (productId: string) => Promise<void>;
}

const WishlistContext = createContext<WishlistContextValue | null>(null);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { user, isAuthenticated, isLoading: isAuthLoading } = useAuth();
  const [items, setItems] = useState<WishlistItem[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);
  const syncedUserIdRef = useRef<string | null>(null);

  useEffect(() => {
    if (isAuthLoading) {
      return;
    }

    if (!isAuthenticated) {
      syncedUserIdRef.current = null;
      // eslint-disable-next-line react-hooks/set-state-in-effect -- reset guest wishlist
      setItems([]);
      setIsHydrated(true);
      return;
    }

    if (!user || syncedUserIdRef.current === user.id) {
      return;
    }

    const userId = user.id;
    let cancelled = false;

    async function loadWishlist() {
      try {
        const wishlistItems = await getWishlist();

        if (!cancelled) {
          setItems(wishlistItems);
          syncedUserIdRef.current = userId;
        }
      } catch {
        if (!cancelled) {
          setItems([]);
        }
      } finally {
        if (!cancelled) {
          setIsHydrated(true);
        }
      }
    }

    void loadWishlist();

    return () => {
      cancelled = true;
    };
  }, [isAuthLoading, isAuthenticated, user]);

  const isInWishlist = useCallback(
    (productId: string) => items.some((item) => item.id === productId),
    [items],
  );

  const toggleWishlist = useCallback(
    async (productId: string) => {
      if (!isAuthenticated) {
        router.replace("/login");
        return;
      }

      if (isInWishlist(productId)) {
        try {
          await removeWishlistItem(productId);
          setItems((currentItems) =>
            currentItems.filter((item) => item.id !== productId),
          );
        } catch {
          return;
        }

        return;
      }

      try {
        const addedItem = await addWishlistItem(productId);
        setItems((currentItems) => {
          if (currentItems.some((item) => item.id === productId)) {
            return currentItems;
          }

          return [addedItem, ...currentItems];
        });
      } catch {
        return;
      }
    },
    [isAuthenticated, isInWishlist, router],
  );

  const value = useMemo(
    () => ({
      items,
      itemCount: items.length,
      isHydrated,
      isInWishlist,
      toggleWishlist,
    }),
    [items, isHydrated, isInWishlist, toggleWishlist],
  );

  return (
    <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);

  if (!context) {
    throw new Error("useWishlist must be used within WishlistProvider");
  }

  return context;
}
