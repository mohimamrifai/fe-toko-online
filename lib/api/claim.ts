import { getAuthHeaders } from "@/lib/api/auth";
import type { Claim, CreateClaimPayload } from "@/types/claim";

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

export async function getClaims(orderId?: string) {
  const searchParams = orderId
    ? `?orderId=${encodeURIComponent(orderId)}`
    : "";

  const res = await fetch(`${ensureApiBaseUrl()}/claims${searchParams}`, {
    headers: getAuthHeaders(),
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(await parseErrorMessage(res));
  }

  const response = (await res.json()) as { data: Claim[] };
  return response.data;
}

export async function getClaim(id: string) {
  const res = await fetch(`${ensureApiBaseUrl()}/claims/${id}`, {
    headers: getAuthHeaders(),
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(await parseErrorMessage(res));
  }

  const response = (await res.json()) as { data: Claim };
  return response.data;
}

export async function createClaim(payload: CreateClaimPayload) {
  const res = await fetch(`${ensureApiBaseUrl()}/claims`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error(await parseErrorMessage(res));
  }

  const response = (await res.json()) as { data: Claim };
  return response.data;
}
