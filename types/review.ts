export interface ProductReview {
  id: string;
  rating: number;
  comment: string | null;
  createdAt: string;
  userName: string;
  isVerifiedBuyer: boolean;
}

export interface ProductReviewSummary {
  avgRating: number;
  reviewCount: number;
}

export interface ProductReviewsMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface ProductReviewsResponse {
  items: ProductReview[];
  meta: ProductReviewsMeta;
  summary: ProductReviewSummary;
}

export interface ReviewEligibilityItem {
  id: string;
  orderNumber: string;
  productName: string;
  createdAt: string;
}

export interface ReviewEligibility {
  canReview: boolean;
  eligibleOrderItems: ReviewEligibilityItem[];
  hasReviewed: boolean;
}

export interface CreateReviewPayload {
  orderItemId: string;
  rating: number;
  comment?: string;
}
