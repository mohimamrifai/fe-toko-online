import { getAuthHeaders } from "@/lib/api/auth";
import type {
  CreateReviewPayload,
  ProductReview,
  ProductReviewsResponse,
  ReviewEligibility,
} from "@/types/review";

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

export async function getProductReviews(
  slug: string,
  page = 1,
  limit = 10,
) {
  const searchParams = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });

  const res = await fetch(
    `${ensureApiBaseUrl()}/products/${slug}/reviews?${searchParams.toString()}`,
    {
      cache: "no-store",
    },
  );

  if (!res.ok) {
    throw new Error(await parseErrorMessage(res));
  }

  const response = (await res.json()) as { data: ProductReviewsResponse };
  return response.data;
}

export async function getReviewEligibility(productId: string) {
  const res = await fetch(
    `${ensureApiBaseUrl()}/products/${productId}/reviews/eligibility`,
    {
      headers: getAuthHeaders(),
      cache: "no-store",
    },
  );

  if (!res.ok) {
    throw new Error(await parseErrorMessage(res));
  }

  const response = (await res.json()) as { data: ReviewEligibility };
  return response.data;
}

export async function createProductReview(
  productId: string,
  payload: CreateReviewPayload,
) {
  const res = await fetch(
    `${ensureApiBaseUrl()}/products/${productId}/reviews`,
    {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(payload),
    },
  );

  if (!res.ok) {
    throw new Error(await parseErrorMessage(res));
  }

  const response = (await res.json()) as { data: ProductReview };
  return response.data;
}
