import { getAuthHeaders } from "@/lib/api/auth";
import type {
  CartResponse,
  CreateCartItemPayload,
} from "@/types/cart";

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

function mapCartItem(item: CartResponse["items"][number]) {
  return {
    ...item,
    variantId: item.variantId ?? undefined,
    image: item.image || "https://placehold.co/600x600/png?text=Produk+Elektronik",
    variantName: item.variantName ?? undefined,
  };
}

function mapCartResponse(response: CartResponse) {
  return {
    ...response,
    items: response.items.map(mapCartItem),
  };
}

export async function getCart() {
  const res = await fetch(`${ensureApiBaseUrl()}/cart`, {
    headers: getAuthHeaders(),
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(await parseErrorMessage(res));
  }

  const response = (await res.json()) as { data: CartResponse };
  return mapCartResponse(response.data);
}

export async function addCartItem(payload: CreateCartItemPayload) {
  const res = await fetch(`${ensureApiBaseUrl()}/cart/items`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error(await parseErrorMessage(res));
  }

  const response = (await res.json()) as { data: CartResponse };
  return mapCartResponse(response.data);
}

export async function updateCartItem(id: string, quantity: number) {
  const res = await fetch(`${ensureApiBaseUrl()}/cart/items/${id}`, {
    method: "PATCH",
    headers: getAuthHeaders(),
    body: JSON.stringify({ quantity }),
  });

  if (!res.ok) {
    throw new Error(await parseErrorMessage(res));
  }

  const response = (await res.json()) as { data: CartResponse };
  return mapCartResponse(response.data);
}

export async function removeCartItem(id: string) {
  const res = await fetch(`${ensureApiBaseUrl()}/cart/items/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  if (!res.ok) {
    throw new Error(await parseErrorMessage(res));
  }

  const response = (await res.json()) as { data: CartResponse };
  return mapCartResponse(response.data);
}

export async function clearServerCart() {
  const res = await fetch(`${ensureApiBaseUrl()}/cart`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  if (!res.ok) {
    throw new Error(await parseErrorMessage(res));
  }

  const response = (await res.json()) as { data: CartResponse };
  return mapCartResponse(response.data);
}
