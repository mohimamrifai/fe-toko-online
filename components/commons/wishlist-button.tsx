import { Heart } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";

export default function WishlistButton() {
  return (
    <Button
      variant="ghost"
      size="icon"
      className="hidden md:flex"
      nativeButton={false}
      render={<Link href="/wishlist" />}
    >
      <Heart className="h-5 w-5" />
      <span className="sr-only">Wishlist</span>
    </Button>
  );
}
