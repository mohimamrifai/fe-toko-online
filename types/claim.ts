export type ClaimType = "warranty" | "return";

export type ClaimStatus =
  | "submitted"
  | "reviewing"
  | "approved"
  | "rejected"
  | "completed";

export interface Claim {
  id: string;
  orderItemId: string;
  orderId: string;
  orderNumber: string;
  productId: string;
  productName: string;
  productSlug: string;
  quantity: number;
  type: ClaimType;
  reason: string;
  proofImageUrl: string | null;
  status: ClaimStatus;
  createdAt: string;
}

export interface CreateClaimPayload {
  orderItemId: string;
  type: ClaimType;
  reason: string;
  proofImageUrl?: string;
}
