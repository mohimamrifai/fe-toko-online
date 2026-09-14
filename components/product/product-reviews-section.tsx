"use client";

import { BadgeCheck, Star } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import { useAuth } from "@/components/providers/auth-provider";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import {
  createProductReview,
  getProductReviews,
  getReviewEligibility,
} from "@/lib/api/review";
import { formatOrderDate } from "@/lib/format-date";
import { cn } from "@/lib/utils";
import type { ProductReview, ReviewEligibility } from "@/types/review";

type ProductReviewsSectionProps = {
  productId: string;
  productSlug: string;
  initialRating: number;
  initialReviewCount: number;
};

function StarRating({
  value,
  onChange,
  readonly = false,
}: {
  value: number;
  onChange?: (rating: number) => void;
  readonly?: boolean;
}) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }, (_, index) => {
        const starValue = index + 1;

        return (
          <button
            key={starValue}
            type="button"
            disabled={readonly}
            onClick={() => onChange?.(starValue)}
            className={cn(
              "transition-colors",
              readonly ? "cursor-default" : "cursor-pointer hover:scale-105",
            )}
            aria-label={`Beri rating ${starValue}`}
          >
            <Star
              className={cn(
                "h-4 w-4",
                starValue <= value
                  ? "fill-amber-400 text-amber-400"
                  : "text-muted-foreground",
              )}
            />
          </button>
        );
      })}
    </div>
  );
}

export function ProductReviewsSection({
  productId,
  productSlug,
  initialRating,
  initialReviewCount,
}: ProductReviewsSectionProps) {
  const router = useRouter();
  const { isAuthenticated, isLoading: isAuthLoading } = useAuth();
  const [reviews, setReviews] = useState<ProductReview[]>([]);
  const [summary, setSummary] = useState({
    avgRating: initialRating,
    reviewCount: initialReviewCount,
  });
  const [eligibility, setEligibility] = useState<ReviewEligibility | null>(null);
  const [selectedOrderItemId, setSelectedOrderItemId] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [formMessage, setFormMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const loadReviews = useCallback(async () => {
    setError(null);

    try {
      const data = await getProductReviews(productSlug);
      setReviews(data.items);
      setSummary(data.summary);
    } catch (loadError) {
      setError(
        loadError instanceof Error
          ? loadError.message
          : "Gagal memuat ulasan produk.",
      );
    } finally {
      setIsLoading(false);
    }
  }, [productSlug]);

  const loadEligibility = useCallback(async () => {
    if (!isAuthenticated) {
      setEligibility(null);
      setSelectedOrderItemId("");
      return;
    }

    try {
      const data = await getReviewEligibility(productId);
      setEligibility(data);
      setSelectedOrderItemId(data.eligibleOrderItems[0]?.id ?? "");
    } catch {
      setEligibility(null);
      setSelectedOrderItemId("");
    }
  }, [isAuthenticated, productId]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- initial reviews fetch
    void loadReviews();
  }, [loadReviews]);

  useEffect(() => {
    if (isAuthLoading) {
      return;
    }

    // eslint-disable-next-line react-hooks/set-state-in-effect -- eligibility fetch on auth
    void loadEligibility();
  }, [isAuthLoading, loadEligibility]);

  async function handleSubmitReview() {
    if (!isAuthenticated) {
      router.replace("/login");
      return;
    }

    if (!selectedOrderItemId) {
      setFormMessage("Pilih pesanan yang ingin Anda ulas.");
      return;
    }

    setIsSubmitting(true);
    setFormMessage(null);

    try {
      const createdReview = await createProductReview(productId, {
        orderItemId: selectedOrderItemId,
        rating,
        comment: comment.trim() || undefined,
      });

      setReviews((currentReviews) => [createdReview, ...currentReviews]);
      setSummary((currentSummary) => {
        const nextCount = currentSummary.reviewCount + 1;
        const nextAvg =
          (currentSummary.avgRating * currentSummary.reviewCount + rating) /
          nextCount;

        return {
          reviewCount: nextCount,
          avgRating: Math.round(nextAvg * 10) / 10,
        };
      });
      setEligibility({
        canReview: false,
        eligibleOrderItems: [],
        hasReviewed: true,
      });
      setComment("");
      setFormMessage("Terima kasih! Ulasan Anda berhasil dikirim.");
    } catch (submitError) {
      setFormMessage(
        submitError instanceof Error
          ? submitError.message
          : "Gagal mengirim ulasan.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="mt-10 border-t pt-10">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-foreground md:text-xl">
            Ulasan Pembeli
          </h2>
          <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
            <StarRating value={Math.round(summary.avgRating)} readonly />
            <span className="font-medium text-foreground">
              {summary.avgRating.toFixed(1)}
            </span>
            <span>({summary.reviewCount} ulasan)</span>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-8">
          <Spinner className="size-6 text-muted-foreground" />
        </div>
      ) : error ? (
        <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">
          <p role="alert">{error}</p>
          <Button
            variant="outline"
            size="sm"
            className="mt-3"
            onClick={() => void loadReviews()}
          >
            Coba Lagi
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          {eligibility?.canReview ? (
            <div className="rounded-xl border bg-card p-4 md:p-5">
              <h3 className="text-sm font-semibold text-foreground">
                Tulis Ulasan Anda
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Bagikan pengalaman Anda sebagai pembeli terverifikasi.
              </p>

              {eligibility.eligibleOrderItems.length > 1 ? (
                <div className="mt-4 space-y-2">
                  <label
                    htmlFor="review-order-item"
                    className="text-sm font-medium text-foreground"
                  >
                    Pilih Pesanan
                  </label>
                  <select
                    id="review-order-item"
                    value={selectedOrderItemId}
                    onChange={(event) =>
                      setSelectedOrderItemId(event.target.value)
                    }
                    className="w-full rounded-md border bg-background px-3 py-2 text-sm"
                  >
                    {eligibility.eligibleOrderItems.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.orderNumber} — {formatOrderDate(item.createdAt)}
                      </option>
                    ))}
                  </select>
                </div>
              ) : null}

              <div className="mt-4 space-y-2">
                <p className="text-sm font-medium text-foreground">Rating</p>
                <StarRating value={rating} onChange={setRating} />
              </div>

              <div className="mt-4 space-y-2">
                <label
                  htmlFor="review-comment"
                  className="text-sm font-medium text-foreground"
                >
                  Komentar
                </label>
                <Textarea
                  id="review-comment"
                  value={comment}
                  onChange={(event) => setComment(event.target.value)}
                  placeholder="Ceritakan pengalaman Anda menggunakan produk ini..."
                  rows={4}
                />
              </div>

              <Button
                className="mt-4"
                disabled={isSubmitting}
                onClick={() => void handleSubmitReview()}
              >
                Kirim Ulasan
              </Button>

              {formMessage ? (
                <p className="mt-3 text-sm text-primary" role="status">
                  {formMessage}
                </p>
              ) : null}
            </div>
          ) : eligibility?.hasReviewed ? (
            <p className="rounded-xl border bg-muted/30 px-4 py-3 text-sm text-muted-foreground">
              Anda sudah memberikan ulasan untuk produk ini.
            </p>
          ) : !isAuthLoading && !isAuthenticated ? (
            <div className="rounded-xl border bg-muted/30 px-4 py-3 text-sm text-muted-foreground">
              <p>Login dan selesaikan pembelian untuk memberikan ulasan.</p>
              <Button
                variant="link"
                className="mt-1 h-auto p-0"
                onClick={() => router.replace("/login")}
              >
                Login sekarang
              </Button>
            </div>
          ) : null}

          {reviews.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              Belum ada ulasan untuk produk ini.
            </p>
          ) : (
            <div className="space-y-4">
              {reviews.map((review) => (
                <article
                  key={review.id}
                  className="rounded-xl border bg-card p-4 md:p-5"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="font-medium text-foreground">
                        {review.userName}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {formatOrderDate(review.createdAt)}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <StarRating value={review.rating} readonly />
                      {review.isVerifiedBuyer ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-1 text-[10px] font-medium text-primary">
                          <BadgeCheck className="h-3 w-3" />
                          Pembeli Terverifikasi
                        </span>
                      ) : null}
                    </div>
                  </div>
                  {review.comment ? (
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {review.comment}
                    </p>
                  ) : null}
                </article>
              ))}
            </div>
          )}
        </div>
      )}
    </section>
  );
}
