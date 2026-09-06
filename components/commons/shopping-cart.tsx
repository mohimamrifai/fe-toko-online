import Link from "next/link";
import { Button } from "../ui/button";
import { ShoppingBag } from "lucide-react";

export default function ShoppingCart() {
  const cartItemCount = 3; // Example dynamic count

  return (
    <Button
      variant="ghost"
      size="icon"
      className="relative"
      nativeButton={false}
      render={<Link href="/cart" />}
    >
      <ShoppingBag className="h-5 w-5" />
      {cartItemCount > 0 && (
        <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-[10px] font-bold text-primary-foreground flex items-center justify-center">
          {cartItemCount}
        </span>
      )}
      <span className="sr-only">Cart</span>
    </Button>
  );
}
