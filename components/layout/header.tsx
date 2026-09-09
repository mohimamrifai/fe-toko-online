import TopBanner from "./top-banner";
import { HeaderContent } from "./header-content";

export async function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <TopBanner />
      <HeaderContent />
    </header>
  );
}
