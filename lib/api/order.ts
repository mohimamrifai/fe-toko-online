import { getAuthHeaders } from "@/lib/api/auth";
import type {
  CheckoutPayload,
  OrderResponse,
  PayOrderApiResponse,
} from "@/types/order";

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

export async function checkoutOrder(payload: CheckoutPayload) {
  const res = await fetch(`${ensureApiBaseUrl()}/orders/checkout`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error(await parseErrorMessage(res));
  }

  const response = (await res.json()) as OrderResponse;
  return response.data;
}

export async function getOrder(id: string) {
  const res = await fetch(`${ensureApiBaseUrl()}/orders/${id}`, {
    headers: getAuthHeaders(),
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(await parseErrorMessage(res));
  }

  const response = (await res.json()) as OrderResponse;
  return response.data;
}

export async function payOrder(id: string) {
  const res = await fetch(`${ensureApiBaseUrl()}/orders/${id}/pay`, {
    method: "POST",
    headers: getAuthHeaders(),
  });

  if (!res.ok) {
    throw new Error(await parseErrorMessage(res));
  }

  const response = (await res.json()) as PayOrderApiResponse;
  return response.data;
}
