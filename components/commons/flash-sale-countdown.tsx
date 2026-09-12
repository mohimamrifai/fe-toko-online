"use client";

import { Timer } from "lucide-react";
import { useEffect, useState } from "react";

type CountdownState = {
  hours: number;
  minutes: number;
  seconds: number;
};

function calculateCountdown(endsAt: string): CountdownState {
  const diff = new Date(endsAt).getTime() - Date.now();

  if (diff <= 0) {
    return { hours: 0, minutes: 0, seconds: 0 };
  }

  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return { hours, minutes, seconds };
}

function padTime(value: number) {
  return String(value).padStart(2, "0");
}

function useCountdown(endsAt: string) {
  const [countdown, setCountdown] = useState<CountdownState | null>(null);

  useEffect(() => {
    const update = () => setCountdown(calculateCountdown(endsAt));

    update();
    const timer = window.setInterval(update, 1000);

    return () => {
      window.clearInterval(timer);
    };
  }, [endsAt]);

  return countdown;
}

function formatCountdownPart(value: number | null) {
  if (value === null) {
    return "--";
  }

  return padTime(value);
}

type FlashSaleCountdownProps = {
  name: string;
  endsAt: string;
  showTitle?: boolean;
};

export function FlashSaleCountdown({
  name,
  endsAt,
  showTitle = true,
}: FlashSaleCountdownProps) {
  const countdown = useCountdown(endsAt);

  return (
    <div className="flex flex-wrap items-center gap-2 sm:gap-4">
      {showTitle ? (
        <h2 className="flex items-center gap-1.5 text-base font-bold text-foreground sm:text-lg md:text-xl">
          <Timer className="h-4 w-4 text-red-600 sm:h-5 sm:w-5" />
          {name}
        </h2>
      ) : (
        <h1 className="flex items-center gap-1.5 text-xl font-bold text-foreground md:text-2xl">
          <Timer className="h-5 w-5 text-red-600 md:h-6 md:w-6" />
          {name}
        </h1>
      )}

      <div className="flex items-center gap-1 text-xs font-semibold text-white sm:text-sm">
        <span className="flex h-6 w-6 items-center justify-center rounded bg-red-600 sm:h-7 sm:w-7">
          {formatCountdownPart(countdown?.hours ?? null)}
        </span>
        <span className="font-bold text-red-600">:</span>
        <span className="flex h-6 w-6 items-center justify-center rounded bg-red-600 sm:h-7 sm:w-7">
          {formatCountdownPart(countdown?.minutes ?? null)}
        </span>
        <span className="font-bold text-red-600">:</span>
        <span className="flex h-6 w-6 items-center justify-center rounded bg-red-600 sm:h-7 sm:w-7">
          {formatCountdownPart(countdown?.seconds ?? null)}
        </span>
      </div>
    </div>
  );
}
