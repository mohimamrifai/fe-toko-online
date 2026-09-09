"use client";

import { useState } from "react";
import { X } from "lucide-react";
import Link from "next/link";

import type { TopBanner } from "@/types/top-banner";

export function TopBannerContent({ banner }: { banner: TopBanner }) {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="bg-primary text-primary-foreground text-center py-1.5 text-xs font-medium tracking-wide relative">
      {banner.href ? (
        <Link href={banner.href}>{banner.message}</Link>
      ) : (
        <p>{banner.message}</p>
      )}
      <button
        type="button"
        onClick={() => setIsVisible(false)}
        className="cursor-pointer absolute right-2 top-1/2 -translate-y-1/2"
        aria-label="Tutup banner"
      >
        <X size={15} />
      </button>
    </div>
  );
}
