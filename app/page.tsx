import { CategoryShortcuts } from "@/components/commons/category-shortcuts";
import { FlashSale } from "@/components/commons/flash-sale";
import { ProductGrid } from "@/components/commons/product-grid";
import { PromoBanner } from "@/components/commons/promo-banner";
import { PromoSlider } from "@/components/commons/promo-slider";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";

export default function Home() {
  return (
    <main>
      <Header />
      <PromoSlider />
      <CategoryShortcuts />
      <FlashSale />
      <ProductGrid title="Terlaris" />
      <PromoBanner />
      <ProductGrid title="Terbaru" />
      <ProductGrid title="Rekomendasi untukmu" />
      <Footer />
    </main>
  );
}
