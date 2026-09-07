import Link from "next/link";
import {
  MapPin,
  Phone,
  Mail,
  ShieldCheck,
  Truck,
  Headphones,
  CreditCard,
} from "lucide-react";
import BrandLogo from "../commons/brand-logo";

export function Footer() {
  return (
    <footer className="border-t bg-card text-card-foreground">
      {/* Keunggulan / Value Propositions */}
      <div className="border-b bg-muted/30 py-6">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex items-center gap-3 p-2">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Truck className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold sm:text-sm">
                  Pengiriman Cepat
                </h4>
                <p className="text-[10px] text-muted-foreground sm:text-xs">
                  Tersedia pengiriman instan
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-2">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold sm:text-sm">100% Original</h4>
                <p className="text-[10px] text-muted-foreground sm:text-xs">
                  Garansi resmi pabrik
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-2">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <CreditCard className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold sm:text-sm">
                  Pembayaran Aman
                </h4>
                <p className="text-[10px] text-muted-foreground sm:text-xs">
                  Berbagai metode transaksi
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-2">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Headphones className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold sm:text-sm">Layanan 24/7</h4>
                <p className="text-[10px] text-muted-foreground sm:text-xs">
                  Dukungan pelanggan responsif
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="mx-auto max-w-7xl px-4 py-10 md:px-8 md:py-12">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
          {/* Kolom 1: Tentang Toko */}
          <div className="space-y-4 lg:col-span-2">
            <div className="-ms-4">
              <BrandLogo />
            </div>
            <p className="text-xs leading-relaxed text-muted-foreground sm:text-sm">
              Destinasi terpercaya untuk semua kebutuhan perangkat elektronik,
              gawai, dan perlengkapan rumah tangga modern dengan jaminan garansi
              resmi dan harga terbaik.
            </p>
            <div className="space-y-2 text-xs text-muted-foreground sm:text-sm">
              <div className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span>
                  Jl. Teknologi Raya No. 45, Jakarta Selatan, Indonesia
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0 text-primary" />
                <span>+62 812-3456-7890</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0 text-primary" />
                <span>support@tokoelektronik.com</span>
              </div>
            </div>
          </div>

          {/* Kolom 2: Kategori */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-foreground sm:text-base">
              Kategori Pilihan
            </h3>
            <ul className="space-y-2 text-xs text-muted-foreground sm:text-sm">
              <li>
                <Link
                  href="/categories/handphone"
                  className="hover:text-primary transition-colors"
                >
                  Handphone & Tablet
                </Link>
              </li>
              <li>
                <Link
                  href="/categories/laptop"
                  className="hover:text-primary transition-colors"
                >
                  Laptop & Komputer
                </Link>
              </li>
              <li>
                <Link
                  href="/categories/audio"
                  className="hover:text-primary transition-colors"
                >
                  Audio & Speaker
                </Link>
              </li>
              <li>
                <Link
                  href="/categories/tv"
                  className="hover:text-primary transition-colors"
                >
                  Televisi & Aksesoris
                </Link>
              </li>
              <li>
                <Link
                  href="/categories/gaming"
                  className="hover:text-primary transition-colors"
                >
                  Gaming & Console
                </Link>
              </li>
            </ul>
          </div>

          {/* Kolom 3: Layanan Pelanggan */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-foreground sm:text-base">
              Bantuan
            </h3>
            <ul className="space-y-2 text-xs text-muted-foreground sm:text-sm">
              <li>
                <Link
                  href="/help/faq"
                  className="hover:text-primary transition-colors"
                >
                  FAQ (Tanya Jawab)
                </Link>
              </li>
              <li>
                <Link
                  href="/help/shipping"
                  className="hover:text-primary transition-colors"
                >
                  Kebijakan Pengiriman
                </Link>
              </li>
              <li>
                <Link
                  href="/help/returns"
                  className="hover:text-primary transition-colors"
                >
                  Pusat Pengembalian
                </Link>
              </li>
              <li>
                <Link
                  href="/help/warranty"
                  className="hover:text-primary transition-colors"
                >
                  Klaim Garansi
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-primary transition-colors"
                >
                  Hubungi Kami
                </Link>
              </li>
            </ul>
          </div>

          {/* Kolom 4: Ikuti Kami (Menggunakan SVG langsung) */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-foreground sm:text-base">
              Ikuti Kami
            </h3>
            <p className="text-xs text-muted-foreground sm:text-sm">
              Dapatkan update promo menarik dan produk terbaru langsung dari
              media sosial kami.
            </p>
            <div className="flex items-center gap-3 pt-1">
              {/* Facebook */}
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-muted transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.378 14.5 5 15.5 5H18V0h-3.808C10.5 0 9 1.583 9 4.615V8z" />
                </svg>
              </a>
              {/* Instagram */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-muted transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              {/* Twitter / X */}
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-muted transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              {/* YouTube */}
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-muted transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="border-t py-4 text-center text-xs text-muted-foreground sm:text-sm">
        <div className="mx-auto max-w-7xl px-4 flex flex-col items-center justify-between gap-2 sm:flex-row md:px-8">
          <p>
            &copy; {new Date().getFullYear()} TokoElektronik. Hak Cipta
            Dilindungi Undang-Undang.
          </p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:underline">
              Kebijakan Privasi
            </Link>
            <Link href="/terms" className="hover:underline">
              Syarat & Ketentuan
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
