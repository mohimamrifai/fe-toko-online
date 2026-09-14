import { getAuthHeaders } from "@/lib/api/auth";
import type { WishlistItem } from "@/types/wishlist";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

async function parseErrorMessage(res: Response) {
  const errorBody = await res.json().catch(() => null);

  if (Array.isArray(errorBody?.message)) {
    return errorBody.message.join(", ");
  }

  return errorBody?.message || `Request gagal dengan status ${res.status}`;
}

function ensureApiBaseUrl() {
  if (!API_BASE_URL) {
    throw new Error("NEXT_PUBLIC_API_BASE_URL belum di-set");
  }

  return API_BASE_URL;
}

function mapWishlistItem(item: WishlistItem) {
  return {
    ...item,
    image:
      item.image ||
      "https://placehold.co/600x600/png?text=Produk+Elektronik",
  };
}

export async function getWishlist() {
  const res = await fetch(`${ensureApiBaseUrl()}/wishlist`, {
    headers: getAuthHeaders(),
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(await parseErrorMessage(res));
  }

  const response = (await res.json()) as { data: WishlistItem[] };
  return response.data.map(mapWishlistItem);
}

export async function addWishlistItem(productId: string) {
  const res = await fetch(`${ensureApiBaseUrl()}/wishlist/${productId}`, {
    method: "POST",
    headers: getAuthHeaders(),
  });

  if (!res.ok) {
    throw new Error(await parseErrorMessage(res));
  }

  const response = (await res.json()) as { data: WishlistItem };
  return mapWishlistItem(response.data);
}

export async function removeWishlistItem(productId: string) {
  const res = await fetch(`${ensureApiBaseUrl()}/wishlist/${productId}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  if (!res.ok) {
    throw new Error(await parseErrorMessage(res));
  }
}
