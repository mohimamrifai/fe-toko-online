import type { Metadata } from "next";

import { ForgotPasswordForm } from "@/components/auth/forgot-password-form";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";

export const metadata: Metadata = {
  title: "Lupa Password",
  description: "Minta tautan reset password untuk akun TokoElektronik Anda.",
};

export default function ForgotPasswordPage() {
  return (
    <main>
      <Header />
      <section className="mx-auto max-w-7xl px-4 py-10 md:px-8 md:py-16">
        <ForgotPasswordForm />
      </section>
      <Footer />
    </main>
  );
}
