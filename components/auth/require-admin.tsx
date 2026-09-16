"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { useAuth } from "@/components/providers/auth-provider";
import { Spinner } from "@/components/ui/spinner";

export function RequireAdmin({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isAdmin, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) {
      return;
    }

    if (!isAuthenticated) {
      router.replace("/login");
      return;
    }

    if (!isAdmin) {
      router.replace("/");
    }
  }, [isAuthenticated, isAdmin, isLoading, router]);

  if (isLoading) {
    return (
      <section className="mx-auto flex max-w-7xl items-center justify-center px-4 py-16 md:px-8">
        <Spinner className="size-6 text-muted-foreground" />
      </section>
    );
  }

  if (!isAuthenticated || !isAdmin) {
    return null;
  }

  return <>{children}</>;
}
