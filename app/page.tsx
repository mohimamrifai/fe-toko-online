import { CategoryShortcuts } from "@/components/commons/category-shortcuts";
import { FlashSale } from "@/components/commons/flash-sale";
import { PromoSlider } from "@/components/commons/promo-slider";
import { Header } from "@/components/layout/header";

export default function Home() {
  return (
    <main>
      <Header />
      <PromoSlider />
      <CategoryShortcuts />
      <FlashSale />
      {/* <ProductGrid title="Terlaris" /> */}
      {/* <PromoBanner /> */}
      {/* <ProductGrid title="Baru Masuk" /> */}
      {/* <ProductGrid title="Rekomendasi untukmu" /> */}
      {/* <Footer /> */}
    </main>
  );
}
