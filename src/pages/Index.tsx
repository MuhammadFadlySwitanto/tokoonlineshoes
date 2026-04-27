import { Link } from "react-router-dom";
import { ArrowRight, Truck, ShieldCheck, RefreshCw, Star } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import ProductCard from "@/components/ProductCard";
import { products, formatRupiah } from "@/data/products";
import heroShoe from "@/assets/hero-shoe.jpg";

const features = [
  { icon: Truck, title: "Pengiriman Gratis", desc: "Untuk pembelian di atas Rp 1 juta ke seluruh Indonesia." },
  { icon: ShieldCheck, title: "100% Original", desc: "Semua sepatu dijamin asli langsung dari brand resmi." },
  { icon: RefreshCw, title: "Tukar 14 Hari", desc: "Tidak cocok? Tukar ukuran tanpa ribet dalam 14 hari." },
];

const testimonials = [
  { name: "Rizky Pratama", role: "Pelanggan sejak 2023", text: "Kualitas sepatunya juara, packaging-nya rapi banget. Pengiriman cepat ke Surabaya!" },
  { name: "Sarah Amelia", role: "Runner amatir", text: "Velocity Pro ringan banget di kaki. Catatan lari saya membaik 30 detik!" },
  { name: "Bagas Wirawan", role: "Sneakerhead", text: "Akhirnya nemu toko lokal yang stoknya lengkap dan asli. Highly recommended." },
];

const Index = () => {
  const featured = products[1];

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      <main className="flex-1">
        {/* HERO */}
        <section className="relative px-4 sm:px-6 pt-12 pb-20 md:pt-20 md:pb-32 overflow-hidden">
          <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-primary/10 blur-3xl pointer-events-none" />
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 lg:gap-16 items-center relative">
            <div>
              <div className="inline-flex items-center gap-2 neu-surface-sm px-4 py-2 mb-6">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  Koleksi Edisi Terbatas
                </span>
              </div>
              <h1 className="font-extrabold text-5xl sm:text-6xl lg:text-7xl leading-[1.05] mb-6">
                Langkahi Hari Anda dengan{" "}
                <span className="bg-gradient-primary bg-clip-text text-transparent">Stride Co.</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-xl mb-8">
                Sepatu sneaker bermerek premium yang menggabungkan kenyamanan, performa, dan
                gaya. Dibuat untuk Anda yang tidak pernah berhenti bergerak.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to={`/produk/${featured.id}`}
                  className="neu-btn-primary inline-flex items-center gap-2 px-7 py-4 rounded-2xl font-bold"
                >
                  Beli Sekarang <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href="#koleksi"
                  className="neu-btn inline-flex items-center gap-2 px-7 py-4 rounded-2xl font-bold text-foreground"
                >
                  Lihat Koleksi
                </a>
              </div>

              <div className="grid grid-cols-3 gap-4 mt-12 max-w-md">
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-primary tabular-nums">10K+</div>
                  <div className="text-xs text-muted-foreground font-medium">Pelanggan Puas</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-primary tabular-nums">4.9★</div>
                  <div className="text-xs text-muted-foreground font-medium">Rating Toko</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-primary tabular-nums">100%</div>
                  <div className="text-xs text-muted-foreground font-medium">Original</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="neu-surface p-8 sm:p-12 aspect-square flex items-center justify-center">
                <img
                  src={heroShoe}
                  alt="Sneaker premium Stride Co."
                  width={1200}
                  height={1200}
                  className="w-full h-full object-contain drop-shadow-2xl"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 neu-surface px-5 py-4 hidden sm:block">
                <div className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">Mulai dari</div>
                <div className="text-2xl font-extrabold text-primary tabular-nums">{formatRupiah(1499000)}</div>
              </div>
              <div className="absolute -top-4 -right-4 neu-surface-sm px-4 py-3 hidden sm:flex items-center gap-2">
                <Star className="w-4 h-4 fill-primary text-primary" />
                <span className="font-bold text-sm">Best Seller</span>
              </div>
            </div>
          </div>
        </section>

        {/* FITUR */}
        <section id="fitur" className="px-4 sm:px-6 py-16">
          <div className="max-w-7xl mx-auto grid sm:grid-cols-3 gap-6">
            {features.map((f) => (
              <div key={f.title} className="neu-surface p-6 flex gap-4 items-start">
                <div className="neu-btn-primary w-12 h-12 rounded-xl flex items-center justify-center shrink-0">
                  <f.icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold mb-1">{f.title}</h3>
                  <p className="text-sm text-muted-foreground">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* KOLEKSI */}
        <section id="koleksi" className="px-4 sm:px-6 py-16">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
              <div>
                <p className="text-xs uppercase tracking-widest text-primary font-bold mb-2">
                  Koleksi Pilihan
                </p>
                <h2 className="text-3xl sm:text-4xl font-extrabold">Sneaker Terbaik Minggu Ini</h2>
              </div>
              <p className="text-muted-foreground max-w-md">
                Kurasi sepatu paling diminati pelanggan kami — siap kirim hari ini.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>

        {/* TESTIMONI */}
        <section id="testimoni" className="px-4 sm:px-6 py-20">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-xs uppercase tracking-widest text-primary font-bold mb-2">
                Testimoni
              </p>
              <h2 className="text-3xl sm:text-4xl font-extrabold">Apa Kata Pelanggan Kami</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {testimonials.map((t) => (
                <div key={t.name} className="neu-surface p-6">
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-foreground mb-6">"{t.text}"</p>
                  <div>
                    <div className="font-bold">{t.name}</div>
                    <div className="text-xs text-muted-foreground">{t.role}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-4 sm:px-6 py-16">
          <div className="max-w-5xl mx-auto neu-surface p-10 sm:p-16 text-center bg-gradient-primary">
            <h2 className="text-3xl sm:text-5xl font-extrabold text-primary-foreground mb-4">
              Siap Melangkah Lebih Jauh?
            </h2>
            <p className="text-primary-foreground/90 text-lg max-w-xl mx-auto mb-8">
              Pesan sekarang dan rasakan perbedaan sepatu yang dibuat dengan standar premium.
            </p>
            <Link
              to={`/produk/${featured.id}`}
              className="inline-flex items-center gap-2 bg-background text-foreground px-8 py-4 rounded-2xl font-bold shadow-neu hover:-translate-y-1 transition-transform"
            >
              Mulai Belanja <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
};

export default Index;
