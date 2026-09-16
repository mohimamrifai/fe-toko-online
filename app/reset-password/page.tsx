import type { Metadata } from "next";
import { Suspense } from "react";

import { ResetPasswordForm } from "@/components/auth/reset-password-form";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { Spinner } from "@/components/ui/spinner";

export const metadata: Metadata = {
  title: "Reset Password",
  description: "Atur ulang password akun TokoElektronik Anda.",
};

export default function ResetPasswordPage() {
  return (
    <main>
      <Header />
      <section className="mx-auto max-w-7xl px-4 py-10 md:px-8 md:py-16">
        <Suspense
          fallback={
            <div className="flex justify-center py-16">
              <Spinner className="size-6 text-muted-foreground" />
            </div>
          }
        >
          <ResetPasswordForm />
        </Suspense>
      </section>
      <Footer />
    </main>
  );
}
