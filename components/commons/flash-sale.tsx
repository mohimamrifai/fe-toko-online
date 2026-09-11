import {
  getActiveFlashSale,
  mapActiveFlashSale,
} from "@/lib/api/flash-sale";

import { FlashSaleContent } from "./flash-sale-content";

export async function FlashSale() {
  const flashSale = await getActiveFlashSale();

  if (!flashSale || flashSale.products.length === 0) {
    return null;
  }

  return <FlashSaleContent flashSale={mapActiveFlashSale(flashSale)} />;
}
