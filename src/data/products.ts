import shoe1 from "@/assets/shoe-1.jpg";
import shoe2 from "@/assets/shoe-2.jpg";
import shoe3 from "@/assets/shoe-3.jpg";
import shoe4 from "@/assets/shoe-4.jpg";

export type Product = {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  image: string;
  tagline: string;
  description: string;
  features: string[];
  sizes: number[];
  colors: string[];
  stock: number;
};

const sizes = [38, 39, 40, 41, 42, 43, 44];

export const products: Product[] = [
  {
    id: "stride-aero-white",
    name: "Aero Glide",
    brand: "Stride Co.",
    category: "Lifestyle / Casual",
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
  },
  {
    id: "stride-velocity-black",
    name: "Velocity Pro",
    brand: "Stride Co.",
    category: "Performance / Running",
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
  },
  {
    id: "stride-canvas-cream",
    name: "Canvas High",
    brand: "Stride Co.",
    category: "Lifestyle / Hi-Top",
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
  },
  {
    id: "stride-trail-grey",
    name: "Trail Beast",
    brand: "Stride Co.",
    category: "Outdoor / Trail",
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
  },
];

export const getProduct = (id: string) => products.find((p) => p.id === id);

export const formatRupiah = (n: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(n);
