import { getAuthHeaders } from "@/lib/api/auth";
import type {
  AdminProductDetail,
  AdminProductListItem,
  AdminProductListResponse,
  AdminProductResponse,
  CreateAdminProductPayload,
  UpdateAdminProductPayload,
} from "@/types/admin-product";

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

export async function getAdminProducts(params?: {
  search?: string;
  categoryId?: string;
  brandId?: string;
  isActive?: boolean;
  page?: number;
  limit?: number;
}) {
  const query = new URLSearchParams();

  if (params?.search?.trim()) {
    query.set("search", params.search.trim());
  }

  if (params?.categoryId) {
    query.set("categoryId", params.categoryId);
  }

  if (params?.brandId) {
    query.set("brandId", params.brandId);
  }

  if (params?.isActive !== undefined) {
    query.set("isActive", String(params.isActive));
  }

  if (params?.page) {
    query.set("page", String(params.page));
  }

  if (params?.limit) {
    query.set("limit", String(params.limit));
  }

  const queryString = query.toString();
  const url = `${ensureApiBaseUrl()}/admin/products${queryString ? `?${queryString}` : ""}`;

  const res = await fetch(url, {
    headers: getAuthHeaders(),
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(await parseErrorMessage(res));
  }

  const response = (await res.json()) as AdminProductListResponse;
  return response.data;
}

export async function getAdminProduct(id: string) {
  const res = await fetch(`${ensureApiBaseUrl()}/admin/products/${id}`, {
    headers: getAuthHeaders(),
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(await parseErrorMessage(res));
  }

  const response = (await res.json()) as AdminProductResponse;
  return response.data;
}

export async function createAdminProduct(payload: CreateAdminProductPayload) {
  const res = await fetch(`${ensureApiBaseUrl()}/admin/products`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error(await parseErrorMessage(res));
  }

  const response = (await res.json()) as AdminProductResponse;
  return response.data;
}

export async function updateAdminProduct(
  id: string,
  payload: UpdateAdminProductPayload,
) {
  const res = await fetch(`${ensureApiBaseUrl()}/admin/products/${id}`, {
    method: "PATCH",
    headers: getAuthHeaders(),
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error(await parseErrorMessage(res));
  }

  const response = (await res.json()) as AdminProductResponse;
  return response.data;
}

export async function deleteAdminProduct(id: string) {
  const res = await fetch(`${ensureApiBaseUrl()}/admin/products/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  if (!res.ok) {
    throw new Error(await parseErrorMessage(res));
  }

  const response = (await res.json()) as { data: { message: string } };
  return response.data;
}

export type { AdminProductDetail, AdminProductListItem };
