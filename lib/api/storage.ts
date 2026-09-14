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

export async function uploadImage(file: File, folder = "claims") {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(
    `${ensureApiBaseUrl()}/storage/upload?folder=${encodeURIComponent(folder)}`,
    {
      method: "POST",
      body: formData,
    },
  );

  if (!res.ok) {
    throw new Error(await parseErrorMessage(res));
  }

  const response = (await res.json()) as { data: { url: string } };
  return response.data.url;
}
