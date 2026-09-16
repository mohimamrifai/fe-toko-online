import { getAuthHeaders } from "@/lib/api/auth";
import type {
  AdminOrderDetail,
  AdminOrderListItem,
  AdminOrderListResponse,
  AdminOrderResponse,
  UpdateAdminOrderShippingPayload,
  UpdateAdminOrderStatusPayload,
} from "@/types/admin-order";
import type { OrderStatus } from "@/types/order";

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

export async function getAdminOrders(params?: {
  status?: OrderStatus;
  search?: string;
}) {
  const query = new URLSearchParams();

  if (params?.status) {
    query.set("status", params.status);
  }

  if (params?.search?.trim()) {
    query.set("search", params.search.trim());
  }

  const queryString = query.toString();
  const url = `${ensureApiBaseUrl()}/admin/orders${queryString ? `?${queryString}` : ""}`;

  const res = await fetch(url, {
    headers: getAuthHeaders(),
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(await parseErrorMessage(res));
  }

  const response = (await res.json()) as AdminOrderListResponse;
  return response.data;
}

export async function getAdminOrder(id: string) {
  const res = await fetch(`${ensureApiBaseUrl()}/admin/orders/${id}`, {
    headers: getAuthHeaders(),
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(await parseErrorMessage(res));
  }

  const response = (await res.json()) as AdminOrderResponse;
  return response.data;
}

export async function updateAdminOrderStatus(
  id: string,
  payload: UpdateAdminOrderStatusPayload,
) {
  const res = await fetch(`${ensureApiBaseUrl()}/admin/orders/${id}/status`, {
    method: "PATCH",
    headers: getAuthHeaders(),
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error(await parseErrorMessage(res));
  }

  const response = (await res.json()) as AdminOrderResponse;
  return response.data;
}

export async function updateAdminOrderShipping(
  id: string,
  payload: UpdateAdminOrderShippingPayload,
) {
  const res = await fetch(`${ensureApiBaseUrl()}/admin/orders/${id}/shipping`, {
    method: "PATCH",
    headers: getAuthHeaders(),
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error(await parseErrorMessage(res));
  }

  const response = (await res.json()) as AdminOrderResponse;
  return response.data;
}

export type { AdminOrderDetail, AdminOrderListItem };
