import Image from "next/image";
import Link from "next/link";

export default function BrandLogo() {
  return (
    <Link href="/" className="font-bold text-xl tracking-tight shrink-0">
      <Image
        src="/logo.png"
        width={200}
        height={200}
        alt="Brand Logo elektronik"
        className="w-32.5 h-10 md:w-40 object-cover"
      />
    </Link>
  );
}
