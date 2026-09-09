const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!API_BASE_URL) {
  throw new Error("NEXT_PUBLIC_API_BASE_URL belum di-set di .env");
}

interface FetchOptions extends RequestInit {
  revalidate?: number; // detik, untuk ISR caching
}

export async function httpClient<T>(
  path: string,
  options: FetchOptions = {},
): Promise<T> {
  const { revalidate, ...fetchOptions } = options;

  const res = await fetch(`${API_BASE_URL}${path}`, {
    ...fetchOptions,
    headers: {
      "Content-Type": "application/json",
      ...fetchOptions.headers,
    },
    next: revalidate !== undefined ? { revalidate } : undefined,
  });

  if (!res.ok) {
    const errorBody = await res.json().catch(() => null);
    throw new Error(
      errorBody?.message || `Request gagal dengan status ${res.status}`,
    );
  }

  return res.json();
}
