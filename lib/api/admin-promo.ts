import { getAuthHeaders } from "@/lib/api/auth";
import type {
  CreatePromoPayload,
  PromoListResponse,
  PromoResponse,
  UpdatePromoPayload,
} from "@/types/promo";

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

export async function getAdminPromos() {
  const res = await fetch(`${ensureApiBaseUrl()}/admin/promos`, {
    headers: getAuthHeaders(),
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(await parseErrorMessage(res));
  }

  const response = (await res.json()) as PromoListResponse;
  return response.data;
}

export async function getAdminPromo(id: string) {
  const res = await fetch(`${ensureApiBaseUrl()}/admin/promos/${id}`, {
    headers: getAuthHeaders(),
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(await parseErrorMessage(res));
  }

  const response = (await res.json()) as PromoResponse;
  return response.data;
}

export async function createAdminPromo(payload: CreatePromoPayload) {
  const res = await fetch(`${ensureApiBaseUrl()}/admin/promos`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error(await parseErrorMessage(res));
  }

  const response = (await res.json()) as PromoResponse;
  return response.data;
}

export async function updateAdminPromo(id: string, payload: UpdatePromoPayload) {
  const res = await fetch(`${ensureApiBaseUrl()}/admin/promos/${id}`, {
    method: "PATCH",
    headers: getAuthHeaders(),
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error(await parseErrorMessage(res));
  }

  const response = (await res.json()) as PromoResponse;
  return response.data;
}

export async function deleteAdminPromo(id: string) {
  const res = await fetch(`${ensureApiBaseUrl()}/admin/promos/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  if (!res.ok) {
    throw new Error(await parseErrorMessage(res));
  }
}
