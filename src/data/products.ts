import shoe1 from "@/assets/shoe-1.jpg";
import shoe2 from "@/assets/shoe-2.jpg";
import shoe3 from "@/assets/shoe-3.jpg";
import shoe4 from "@/assets/shoe-4.jpg";

// Placeholder untuk produk yang gambarnya belum disiapkan.
// Ganti dengan import dari "@/assets/..." setelah file gambar dimasukkan.
const placeholder = "/placeholder.svg";

export type ProductCategory =
  | "Lifestyle"
  | "Running"
  | "Hi-Top"
  | "Trail"
  | "Basketball"
  | "Skate";

export type Product = {
  id: string;
  name: string;
  brand: string;
  category: ProductCategory;
  price: number;
  image: string;
  tagline: string;
  description: string;
  features: string[];
  sizes: number[];
  colors: string[];
  stock: number;
  /** ISO date — untuk sort "Terbaru" */
  createdAt: string;
  /** 0–100 — untuk sort "Terpopuler" */
  popularity: number;
};

const sizes = [38, 39, 40, 41, 42, 43, 44];

export const products: Product[] = [
  {
    id: "stride-aero-white",
    name: "Aero Glide",
    brand: "FadzKicks",
    category: "Lifestyle",
    price: 1899000,
    image: shoe1,
    tagline: "Sneaker putih klasik dengan aksen oranye yang membara.",
    description:
      "Aero Glide menggabungkan estetika minimalis dengan kenyamanan harian. Dibuat dari kulit premium, sneaker ini cocok untuk Anda yang ingin tampil bersih, ringan, dan tetap stylish di segala suasana.",
    features: [
      "Upper kulit premium tahan lama",
      "Insole memory foam empuk",
      "Outsole karet anti-slip",
      "Bobot ringan hanya 280 gram",
    ],
    sizes,
    colors: ["Putih", "Oranye"],
    stock: 24,
    createdAt: "2026-03-12",
    popularity: 88,
  },
  {
    id: "stride-velocity-black",
    name: "Velocity Pro",
    brand: "FadzKicks",
    category: "Running",
    price: 2499000,
    image: shoe2,
    tagline: "Performa sprint dengan sol responsif kelas atletik.",
    description:
      "Velocity Pro dirancang untuk pelari serius. Midsole responsif dan rangka karbon membuat setiap langkah terasa lebih cepat. Hitam elegan dengan aksen oranye menyala.",
    features: [
      "Plate karbon untuk dorongan maksimal",
      "Mesh berventilasi tinggi",
      "Bantalan EVA reaktif",
      "Lacing system anti-kendor",
    ],
    sizes,
    colors: ["Hitam", "Oranye"],
    stock: 17,
    createdAt: "2026-04-02",
    popularity: 96,
  },
  {
    id: "stride-canvas-cream",
    name: "Canvas High",
    brand: "FadzKicks",
    category: "Hi-Top",
    price: 1499000,
    image: shoe3,
    tagline: "Hi-top krem yang tenang untuk gaya kasual setiap hari.",
    description:
      "Canvas High mengangkat estetika minimalis ke level baru. Warna krem netral dipadukan dengan siluet hi-top klasik — sempurna untuk dipadukan dengan jeans hingga celana chino.",
    features: [
      "Material kanvas tebal premium",
      "Padding ankle empuk",
      "Sol vulkanisir tahan lama",
      "Ujung tali anti pudar",
    ],
    sizes,
    colors: ["Krem"],
    stock: 31,
    createdAt: "2026-02-20",
    popularity: 74,
  },
  {
    id: "stride-trail-grey",
    name: "Trail Beast",
    brand: "FadzKicks",
    category: "Trail",
    price: 2199000,
    image: shoe4,
    tagline: "Sepatu trail tangguh untuk medan apa pun.",
    description:
      "Trail Beast menaklukkan jalur off-road dengan grip agresif dan upper tahan air. Cocok untuk hiking, lari trail, atau sekadar petualangan akhir pekan.",
    features: [
      "Outsole agresif anti-licin",
      "Upper ripstop tahan air",
      "Toe cap pelindung",
      "Bantalan gel di tumit",
    ],
    sizes,
    colors: ["Abu-abu", "Oranye"],
    stock: 12,
    createdAt: "2026-01-15",
    popularity: 81,
  },
  // ===== Slot kosong (gambar diisi nanti via /src/assets) =====
  {
    id: "stride-court-white",
    name: "Court Classic",
    brand: "FadzKicks",
    category: "Lifestyle",
    price: 1299000,
    image: placeholder,
    tagline: "Sneaker court low-top yang serba cocok.",
    description:
      "Siluet court klasik dengan finishing modern. Cocok untuk smart-casual maupun jalan-jalan akhir pekan.",
    features: ["Upper sintetis premium", "Insole empuk", "Sol karet awet", "Desain timeless"],
    sizes,
    colors: ["Putih", "Hitam"],
    stock: 40,
    createdAt: "2026-04-10",
    popularity: 70,
  },
  {
    id: "stride-runner-blue",
    name: "Aero Runner",
    brand: "FadzKicks",
    category: "Running",
    price: 1799000,
    image: placeholder,
    tagline: "Lari harian terasa ringan seperti berjalan di awan.",
    description:
      "Dirancang untuk lari harian 5–10K. Bantalan empuk dan upper jaring mampu menjaga kaki tetap sejuk.",
    features: ["Mesh ringan berventilasi", "Midsole EVA", "Heel pull tab", "Reflective strip"],
    sizes,
    colors: ["Biru", "Putih"],
    stock: 22,
    createdAt: "2026-03-25",
    popularity: 78,
  },
  {
    id: "stride-skate-black",
    name: "Deck Pro",
    brand: "FadzKicks",
    category: "Skate",
    price: 1399000,
    image: placeholder,
    tagline: "Sepatu skate low-profile dengan grip maksimal.",
    description:
      "Sol vulkanisir tipis untuk board feel optimal, plus reinforced toe cap supaya awet meski sering ollie.",
    features: ["Suede tahan abrasi", "Toe cap diperkuat", "Insole double padding", "Grip waffle"],
    sizes,
    colors: ["Hitam", "Putih"],
    stock: 18,
    createdAt: "2026-02-05",
    popularity: 65,
  },
  {
    id: "stride-hoops-red",
    name: "Hoops Elite",
    brand: "FadzKicks",
    category: "Basketball",
    price: 2899000,
    image: placeholder,
    tagline: "Mid-top basket dengan kunci ankle yang mantap.",
    description:
      "Stabilitas lateral untuk crossover dan cushion responsif untuk lompatan. Siap dipakai di indoor court.",
    features: ["Ankle strap penguat", "Bantalan zoom-air", "Outsole herringbone", "TPU midfoot shank"],
    sizes,
    colors: ["Merah", "Hitam"],
    stock: 9,
    createdAt: "2026-04-18",
    popularity: 84,
  },
  {
    id: "stride-trail-olive",
    name: "Ridge Trekker",
    brand: "FadzKicks",
    category: "Trail",
    price: 2349000,
    image: placeholder,
    tagline: "Trekker ringan untuk pendakian akhir pekan.",
    description:
      "Lebih ringan dari boots gunung tradisional, tapi tetap kokoh menapaki batu dan akar. Warna olive natural.",
    features: ["Membran tahan air", "Sol multi-arah", "Lug 5mm", "Quick-lace"],
    sizes,
    colors: ["Olive", "Hitam"],
    stock: 14,
    createdAt: "2026-03-01",
    popularity: 72,
  },
  {
    id: "stride-canvas-navy",
    name: "Canvas Low",
    brand: "FadzKicks",
    category: "Hi-Top",
    price: 1199000,
    image: placeholder,
    tagline: "Versi low-cut dari favorit klasik kami.",
    description:
      "Lebih ringan dan ringkas. Tetap dengan material kanvas tebal dan sol vulkanisir yang awet.",
    features: ["Kanvas premium", "Sol vulkanisir", "Insole empuk", "Tali kapas"],
    sizes,
    colors: ["Navy", "Putih"],
    stock: 26,
    createdAt: "2026-01-28",
    popularity: 60,
  },
  {
    id: "stride-aero-pink",
    name: "Aero Glide Coral",
    brand: "FadzKicks",
    category: "Lifestyle",
    price: 1949000,
    image: placeholder,
    tagline: "Edisi warna coral yang cerah dan playful.",
    description:
      "Varian warna baru dari Aero Glide. Cocok bagi yang ingin tampil mencolok namun tetap clean.",
    features: ["Upper kulit premium", "Memory foam insole", "Outsole anti-slip", "Edisi terbatas"],
    sizes,
    colors: ["Coral", "Putih"],
    stock: 11,
    createdAt: "2026-04-22",
    popularity: 76,
  },
  {
    id: "stride-runner-mono",
    name: "Velocity Lite",
    brand: "FadzKicks",
    category: "Running",
    price: 1599000,
    image: placeholder,
    tagline: "Versi entry-level dari Velocity Pro.",
    description:
      "Tanpa plate karbon, tapi tetap responsif dan ringan. Cocok untuk pelari pemula hingga menengah.",
    features: ["Mesh berventilasi", "Midsole EVA", "Bobot 240 gram", "Tumit empuk"],
    sizes,
    colors: ["Abu-abu", "Hitam"],
    stock: 28,
    createdAt: "2026-03-18",
    popularity: 68,
  },
];

export const getProduct = (id: string) => products.find((p) => p.id === id);

/** Daftar kategori unik dari katalog */
export const allCategories: ProductCategory[] = Array.from(
  new Set(products.map((p) => p.category)),
) as ProductCategory[];

/** Daftar warna unik dari katalog */
export const allColors: string[] = Array.from(
  new Set(products.flatMap((p) => p.colors)),
).sort();

/** Daftar ukuran unik dari katalog */
export const allSizes: number[] = Array.from(
  new Set(products.flatMap((p) => p.sizes)),
).sort((a, b) => a - b);

/** Daftar brand unik dari katalog */
export const allBrands: string[] = Array.from(
  new Set(products.map((p) => p.brand)),
).sort();

export const priceRange = {
  min: Math.min(...products.map((p) => p.price)),
  max: Math.max(...products.map((p) => p.price)),
};

export const formatRupiah = (n: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(n);
