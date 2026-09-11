import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProductDetailContent } from "@/components/commons/product-detail-content";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { getProductBySlug } from "@/lib/api/product";

type ProductPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      title: "Produk tidak ditemukan",
    };
  }

  return {
    title: product.name,
    description: product.description ?? `Detail produk ${product.name}`,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <main>
      <Header />
      <ProductDetailContent product={product} />
      <Footer />
    </main>
  );
}
