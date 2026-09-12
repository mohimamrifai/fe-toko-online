import { getAccessToken } from "@/lib/auth-storage";
import type {
  AuthResponse,
  LoginPayload,
  MeResponse,
  RegisterPayload,
} from "@/types/auth";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

function getAuthHeaders(): HeadersInit {
  const token = getAccessToken();

  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

async function parseErrorMessage(res: Response) {
  const errorBody = await res.json().catch(() => null);

  if (Array.isArray(errorBody?.message)) {
    return errorBody.message.join(", ");
  }

  return errorBody?.message || `Request gagal dengan status ${res.status}`;
}

export async function registerUser(payload: RegisterPayload) {
  if (!API_BASE_URL) {
    throw new Error("NEXT_PUBLIC_API_BASE_URL belum di-set");
  }

  const res = await fetch(`${API_BASE_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error(await parseErrorMessage(res));
  }

  return (await res.json()) as AuthResponse;
}

export async function loginUser(payload: LoginPayload) {
  if (!API_BASE_URL) {
    throw new Error("NEXT_PUBLIC_API_BASE_URL belum di-set");
  }

  const res = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error(await parseErrorMessage(res));
  }

  return (await res.json()) as AuthResponse;
}

export async function getCurrentUser() {
  if (!API_BASE_URL) {
    return null;
  }

  const token = getAccessToken();

  if (!token) {
    return null;
  }

  const res = await fetch(`${API_BASE_URL}/auth/me`, {
    headers: getAuthHeaders(),
    cache: "no-store",
  });

  if (res.status === 401) {
    return null;
  }

  if (!res.ok) {
    throw new Error(await parseErrorMessage(res));
  }

  const response = (await res.json()) as MeResponse;
  return response.data;
}
