import { getAuthHeaders } from "@/lib/api/auth";
import type {
  AddressListResponse,
  AddressResponse,
  CreateAddressPayload,
  UpdateAddressPayload,
} from "@/types/address";

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

export async function getAddresses() {
  const res = await fetch(`${ensureApiBaseUrl()}/addresses`, {
    headers: getAuthHeaders(),
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(await parseErrorMessage(res));
  }

  const response = (await res.json()) as AddressListResponse;
  return response.data;
}

export async function createAddress(payload: CreateAddressPayload) {
  const res = await fetch(`${ensureApiBaseUrl()}/addresses`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error(await parseErrorMessage(res));
  }

  const response = (await res.json()) as AddressResponse;
  return response.data;
}

export async function updateAddress(id: string, payload: UpdateAddressPayload) {
  const res = await fetch(`${ensureApiBaseUrl()}/addresses/${id}`, {
    method: "PATCH",
    headers: getAuthHeaders(),
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error(await parseErrorMessage(res));
  }

  const response = (await res.json()) as AddressResponse;
  return response.data;
}

export async function deleteAddress(id: string) {
  const res = await fetch(`${ensureApiBaseUrl()}/addresses/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  if (!res.ok) {
    throw new Error(await parseErrorMessage(res));
  }

  const response = (await res.json()) as AddressResponse;
  return response.data;
}
