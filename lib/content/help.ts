export type ContentSection = {
  title: string;
  paragraphs: string[];
};

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

export const HELP_LINKS = [
  { href: "/help/faq", label: "FAQ (Tanya Jawab)" },
  { href: "/help/shipping", label: "Kebijakan Pengiriman" },
  { href: "/help/returns", label: "Pusat Pengembalian" },
  { href: "/help/warranty", label: "Klaim Garansi" },
  { href: "/contact", label: "Hubungi Kami" },
] as const;

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: "payment-methods",
    question: "Metode pembayaran apa yang tersedia?",
    answer:
      "Kami mendukung pembayaran melalui Midtrans Snap, termasuk transfer bank, e-wallet, dan kartu kredit/debit (sesuai ketersediaan di sandbox/production).",
  },
  {
    id: "order-tracking",
    question: "Bagaimana cara melacak pesanan saya?",
    answer:
      "Setelah login, buka menu Pesanan Saya untuk melihat status pesanan dan riwayat perubahan status. Nomor resi akan muncul setelah pesanan dikirim.",
  },
  {
    id: "cancel-order",
    question: "Bisakah saya membatalkan pesanan?",
    answer:
      "Pesanan dengan status menunggu pembayaran dapat dibatalkan dengan tidak menyelesaikan pembayaran. Untuk pesanan yang sudah dibayar, hubungi customer service melalui halaman Kontak.",
  },
  {
    id: "warranty",
    question: "Apakah produk bergaransi resmi?",
    answer:
      "Ya, seluruh produk kami adalah barang resmi dengan garansi distributor/pabrik. Durasi garansi tercantum di halaman detail produk.",
  },
  {
    id: "return-policy",
    question: "Berapa lama batas waktu retur produk?",
    answer:
      "Retur dapat diajukan maksimal 7 hari kalender setelah barang diterima, dengan syarat produk belum digunakan dan kemasan lengkap.",
  },
  {
    id: "account-required",
    question: "Apakah wajib membuat akun untuk berbelanja?",
    answer:
      "Anda dapat menambahkan produk ke keranjang sebagai tamu. Namun, checkout, pembayaran, dan pelacakan pesanan memerlukan akun terdaftar.",
  },
];

export const SHIPPING_SECTIONS: ContentSection[] = [
  {
    title: "Cakupan Pengiriman",
    paragraphs: [
      "Kami mengirimkan pesanan ke seluruh wilayah Indonesia melalui mitra kurir nasional seperti JNE dan J&T.",
      "Estimasi waktu pengiriman bervariasi tergantung kota tujuan, biasanya 2–7 hari kerja setelah pesanan diproses.",
    ],
  },
  {
    title: "Biaya Ongkos Kirim",
    paragraphs: [
      "Biaya pengiriman dihitung saat checkout berdasarkan kurir yang Anda pilih. Saat ini tersedia opsi JNE Reguler dan J&T Reguler dengan tarif tetap untuk simulasi.",
      "Promo gratis ongkir (jika ada) akan otomatis diterapkan pada ringkasan checkout.",
    ],
  },
  {
    title: "Proses Pengiriman",
    paragraphs: [
      "Pesanan diproses setelah pembayaran berhasil diverifikasi. Anda akan menerima pembaruan status di halaman detail pesanan.",
      "Nomor resi pengiriman akan ditampilkan ketika status pesanan berubah menjadi dikirim.",
    ],
  },
  {
    title: "Keterlambatan & Force Majeure",
    paragraphs: [
      "Keterlambatan dapat terjadi akibat kondisi cuaca, hari libur nasional, atau lonjakan volume pengiriman.",
      "Jika paket belum diterima melebihi estimasi, silakan hubungi kami melalui halaman Kontak dengan menyertakan nomor pesanan.",
    ],
  },
];

export const RETURNS_SECTIONS: ContentSection[] = [
  {
    title: "Ketentuan Umum",
    paragraphs: [
      "Pengembalian barang diajukan melalui fitur klaim retur pada detail pesanan, setelah pesanan berstatus dibayar atau selesai.",
      "Produk harus dalam kondisi lengkap, belum digunakan, dan disertai bukti foto jika ada kerusakan atau ketidaksesuaian.",
    ],
  },
  {
    title: "Alasan Retur yang Diterima",
    paragraphs: [
      "Barang rusak saat diterima (DOA).",
      "Barang tidak sesuai pesanan (salah varian/model).",
      "Kemasan penyok parah yang mempengaruhi fungsi produk.",
    ],
  },
  {
    title: "Alasan Retur yang Tidak Diterima",
    paragraphs: [
      "Perubahan pikiran setelah produk digunakan.",
      "Kerusakan akibat kelalaian pengguna.",
      "Produk tanpa kelengkapan atau garansi yang sudah diisi.",
    ],
  },
  {
    title: "Proses Pengembalian Dana",
    paragraphs: [
      "Setelah klaim retur disetujui, tim kami akan memberikan instruksi pengembalian barang.",
      "Pengembalian dana diproses ke metode pembayaran awal dalam 3–14 hari kerja setelah barang kami terima dan diverifikasi.",
    ],
  },
];

export const WARRANTY_SECTIONS: ContentSection[] = [
  {
    title: "Jenis Garansi",
    paragraphs: [
      "Garansi resmi mencakup kerusakan manufaktur sesuai ketentuan distributor.",
      "Garansi tidak mencakup kerusakan akibat cairan, jatuh, modifikasi tidak resmi, atau penggunaan di luar spesifikasi.",
    ],
  },
  {
    title: "Cara Mengajukan Klaim Garansi",
    paragraphs: [
      "Login ke akun Anda, buka Pesanan Saya, pilih pesanan terkait, lalu klik Ajukan Klaim pada item produk.",
      "Pilih tipe Garansi, isi alasan, dan unggah foto bukti jika diperlukan.",
      "Anda juga dapat memantau status klaim di halaman Klaim Garansi & Retur.",
    ],
  },
  {
    title: "Dokumen yang Diperlukan",
    paragraphs: [
      "Nomor pesanan dan foto kondisi produk.",
      "Kartu garansi (jika ada) dan bukti pembelian dari toko kami.",
      "Tim kami dapat meminta informasi tambahan selama proses peninjauan.",
    ],
  },
];
