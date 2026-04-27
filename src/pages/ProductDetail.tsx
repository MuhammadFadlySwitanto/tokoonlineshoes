import { useState } from "react";
import { Link, useParams, Navigate, useNavigate } from "react-router-dom";
import { ArrowLeft, Check, ShieldCheck, Truck, RefreshCw, Star } from "lucide-react";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { getProduct, formatRupiah } from "@/data/products";
import { supabase } from "@/lib/supabaseClient";

const orderSchema = z.object({
  fullName: z.string().trim().min(2, "Nama minimal 2 karakter").max(100),
  phone: z
    .string()
    .trim()
    .min(8, "Nomor telepon tidak valid")
    .max(20)
    .regex(/^[0-9+\-\s]+$/, "Hanya angka, +, -, dan spasi"),
  email: z.string().trim().email("Email tidak valid").max(255),
  address: z.string().trim().min(10, "Alamat minimal 10 karakter").max(500),
  city: z.string().trim().min(2, "Kota wajib diisi").max(100),
  postalCode: z.string().trim().min(5, "Kode pos 5 digit").max(10),
  notes: z.string().trim().max(500).optional(),
});

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const product = id ? getProduct(id) : undefined;
  const { toast } = useToast();
  const navigate = useNavigate();

  const [size, setSize] = useState<number | null>(null);
  const [qty, setQty] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!product) return <Navigate to="/" replace />;

  const total = product.price * qty;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});

    if (!size) {
      toast({
        title: "Pilih ukuran terlebih dahulu",
        description: "Silakan pilih ukuran sepatu sebelum melanjutkan.",
        variant: "destructive",
      });
      return;
    }

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    const parsed = orderSchema.safeParse(data);

    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      parsed.error.issues.forEach((issue) => {
        const key = issue.path[0] as string;
        if (!fieldErrors[key]) fieldErrors[key] = issue.message;
      });
      setErrors(fieldErrors);
      toast({
        title: "Form belum lengkap",
        description: "Mohon periksa kembali data yang Anda isi.",
        variant: "destructive",
      });
      return;
    }

    setSubmitting(true);
    const orderCode = "FK-" + Date.now().toString(36).toUpperCase();
    const validated = parsed.data;

    const { error } = await supabase.from("orders").insert({
      order_code: orderCode,
      product_id: product.id,
      product_name: product.name,
      product_image: product.image,
      size,
      quantity: qty,
      unit_price: product.price,
      total_price: total,
      full_name: validated.fullName,
      phone: validated.phone,
      email: validated.email,
      address: validated.address,
      city: validated.city,
      postal_code: validated.postalCode,
      notes: validated.notes ?? null,
    });

    if (error) {
      setSubmitting(false);
      toast({
        title: "Gagal menyimpan pesanan",
        description: error.message,
        variant: "destructive",
      });
      return;
    }

    navigate(`/pesanan-sukses/${orderCode}`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      <main className="flex-1 px-4 sm:px-6 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-8"
          >
            <ArrowLeft className="w-4 h-4" /> Kembali ke koleksi
          </Link>

          {/* Detail produk */}
          <div className="grid lg:grid-cols-2 gap-10 mb-16">
            <div className="neu-surface p-6 sm:p-10 aspect-square flex items-center justify-center">
              <img
                src={product.image}
                alt={product.name}
                width={800}
                height={800}
                className="w-full h-full object-contain drop-shadow-xl"
              />
            </div>

            <div>
              <p className="text-xs uppercase tracking-widest text-primary font-bold mb-2">
                {product.category}
              </p>
              <h1 className="text-4xl sm:text-5xl font-extrabold mb-3">{product.name}</h1>
              <div className="flex items-center gap-3 mb-4">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">(248 ulasan)</span>
              </div>
              <p className="text-lg text-muted-foreground mb-6">{product.tagline}</p>

              <div className="text-4xl font-extrabold text-primary mb-8 tabular-nums">
                {formatRupiah(product.price)}
              </div>

              <div className="mb-6">
                <h3 className="font-bold mb-3">Pilih Ukuran (EU)</h3>
                <div className="flex flex-wrap gap-3">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setSize(s)}
                      className={`w-14 h-14 rounded-xl font-bold transition-all ${
                        size === s
                          ? "neu-btn-primary"
                          : "neu-btn text-foreground"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-8">
                <h3 className="font-bold mb-3">Deskripsi</h3>
                <p className="text-muted-foreground leading-relaxed">{product.description}</p>
              </div>

              <div className="mb-8">
                <h3 className="font-bold mb-3">Fitur Unggulan</h3>
                <ul className="grid sm:grid-cols-2 gap-2">
                  {product.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="neu-surface-sm p-3 text-center">
                  <Truck className="w-5 h-5 text-primary mx-auto mb-1" />
                  <p className="text-xs font-semibold">Gratis Ongkir</p>
                </div>
                <div className="neu-surface-sm p-3 text-center">
                  <ShieldCheck className="w-5 h-5 text-primary mx-auto mb-1" />
                  <p className="text-xs font-semibold">100% Original</p>
                </div>
                <div className="neu-surface-sm p-3 text-center">
                  <RefreshCw className="w-5 h-5 text-primary mx-auto mb-1" />
                  <p className="text-xs font-semibold">Tukar 14 Hari</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form pemesanan */}
          <div id="order" className="neu-surface p-6 sm:p-10">
            <div className="grid lg:grid-cols-3 gap-10">
              <div className="lg:col-span-2">
                <h2 className="text-2xl sm:text-3xl font-extrabold mb-2">Formulir Pemesanan</h2>
                <p className="text-muted-foreground mb-8">
                  Isi data berikut untuk memesan {product.name}. Tim kami akan menghubungi Anda
                  untuk konfirmasi pembayaran.
                </p>

                <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-5">
                  <Field label="Nama Lengkap" name="fullName" placeholder="Budi Santoso" error={errors.fullName} />
                  <Field label="Nomor WhatsApp" name="phone" placeholder="+62 812..." error={errors.phone} />
                  <Field label="Email" name="email" type="email" placeholder="budi@email.com" error={errors.email} className="sm:col-span-2" />
                  <Field label="Alamat Lengkap" name="address" placeholder="Jl. Merdeka No. 10, RT 01/02" error={errors.address} className="sm:col-span-2" textarea />
                  <Field label="Kota" name="city" placeholder="Jakarta" error={errors.city} />
                  <Field label="Kode Pos" name="postalCode" placeholder="12345" error={errors.postalCode} />
                  <Field label="Catatan (opsional)" name="notes" placeholder="Patokan rumah, instruksi kurir..." error={errors.notes} className="sm:col-span-2" textarea />

                  <div className="sm:col-span-2 flex items-center gap-4">
                    <span className="text-sm font-semibold">Jumlah:</span>
                    <div className="neu-inset flex items-center">
                      <button
                        type="button"
                        onClick={() => setQty((q) => Math.max(1, q - 1))}
                        className="w-10 h-10 font-bold text-lg"
                        aria-label="Kurangi"
                      >
                        −
                      </button>
                      <span className="w-10 text-center font-bold tabular-nums">{qty}</span>
                      <button
                        type="button"
                        onClick={() => setQty((q) => Math.min(product.stock, q + 1))}
                        className="w-10 h-10 font-bold text-lg"
                        aria-label="Tambah"
                      >
                        +
                      </button>
                    </div>
                    <span className="text-xs text-muted-foreground">Stok: {product.stock}</span>
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="sm:col-span-2 neu-btn-primary px-8 py-4 rounded-2xl font-bold disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {submitting ? "Memproses..." : `Pesan Sekarang — ${formatRupiah(total)}`}
                  </button>
                </form>
              </div>

              {/* Ringkasan */}
              <aside className="lg:sticky lg:top-24 self-start">
                <div className="neu-inset p-6">
                  <h3 className="font-bold mb-4">Ringkasan Pesanan</h3>
                  <div className="flex gap-3 mb-4 pb-4 border-b border-border">
                    <div className="w-16 h-16 rounded-lg overflow-hidden bg-background shrink-0">
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="text-sm">
                      <div className="font-bold">{product.name}</div>
                      <div className="text-muted-foreground text-xs">
                        Ukuran: {size ?? "—"} • Qty: {qty}
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm mb-4">
                    <Row label="Subtotal" value={formatRupiah(product.price * qty)} />
                    <Row label="Ongkir" value="Gratis" highlight />
                  </div>
                  <div className="flex justify-between font-extrabold text-lg pt-3 border-t border-border">
                    <span>Total</span>
                    <span className="text-primary tabular-nums">{formatRupiah(total)}</span>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </main>

      <Dialog open={!!success} onOpenChange={(open) => !open && setSuccess(null)}>
        <DialogContent className="rounded-2xl">
          <DialogHeader>
            <div className="w-14 h-14 rounded-full bg-gradient-primary flex items-center justify-center mb-2">
              <Check className="w-7 h-7 text-primary-foreground" />
            </div>
            <DialogTitle className="text-2xl">Pesanan Berhasil Dibuat!</DialogTitle>
            <DialogDescription className="text-base">
              Terima kasih telah berbelanja di FadzKicks Tim kami akan segera menghubungi Anda
              via WhatsApp untuk konfirmasi pembayaran.
            </DialogDescription>
          </DialogHeader>
          {success && (
            <div className="neu-inset p-4 my-2">
              <div className="text-xs uppercase tracking-widest text-muted-foreground font-semibold mb-1">
                Nomor Pesanan
              </div>
              <div className="font-extrabold text-lg tabular-nums">{success.orderId}</div>
            </div>
          )}
          <DialogFooter>
            <Link
              to="/"
              className="neu-btn-primary px-6 py-3 rounded-xl font-bold inline-flex items-center justify-center w-full"
            >
              Kembali ke Beranda
            </Link>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <SiteFooter />
    </div>
  );
};

const Row = ({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) => (
  <div className="flex justify-between">
    <span className="text-muted-foreground">{label}</span>
    <span className={`tabular-nums font-semibold ${highlight ? "text-primary" : ""}`}>{value}</span>
  </div>
);

const Field = ({
  label,
  name,
  placeholder,
  type = "text",
  error,
  className = "",
  textarea = false,
}: {
  label: string;
  name: string;
  placeholder?: string;
  type?: string;
  error?: string;
  className?: string;
  textarea?: boolean;
}) => (
  <div className={className}>
    <label className="block text-sm font-semibold mb-2">{label}</label>
    {textarea ? (
      <textarea
        name={name}
        placeholder={placeholder}
        rows={3}
        className="neu-input w-full px-4 py-3 text-sm resize-none"
      />
    ) : (
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        className="neu-input w-full px-4 py-3 text-sm"
      />
    )}
    {error && <p className="mt-1.5 text-xs text-destructive font-semibold">{error}</p>}
  </div>
);

export default ProductDetail;
