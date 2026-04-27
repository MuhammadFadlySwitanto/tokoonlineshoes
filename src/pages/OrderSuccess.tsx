import { useEffect, useState } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { Check, Package, Truck, Phone, Mail, MapPin, ArrowLeft } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { supabase } from "@/lib/supabaseClient";
import { formatRupiah } from "@/data/products";

type Order = {
  id: string;
  order_code: string;
  product_id: string;
  product_name: string;
  product_image: string | null;
  size: number;
  quantity: number;
  unit_price: number;
  total_price: number;
  full_name: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  postal_code: string;
  notes: string | null;
  status: string;
  created_at: string;
};

const OrderSuccess = () => {
  const { code } = useParams<{ code: string }>();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchOrder = async () => {
      if (!code) return;
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .eq("order_code", code)
        .maybeSingle();

      if (error || !data) {
        setNotFound(true);
      } else {
        setOrder(data as Order);
      }
      setLoading(false);
    };
    fetchOrder();
  }, [code]);

  if (notFound) return <Navigate to="/" replace />;

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      <main className="flex-1 px-4 sm:px-6 py-10 sm:py-16">
        <div className="max-w-3xl mx-auto">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6"
          >
            <ArrowLeft className="w-4 h-4" /> Kembali ke beranda
          </Link>

          {loading ? (
            <div className="neu-surface p-10 text-center">
              <div className="animate-pulse text-muted-foreground">Memuat pesanan...</div>
            </div>
          ) : order ? (
            <>
              {/* Banner sukses */}
              <div className="neu-surface p-8 sm:p-10 text-center mb-6">
                <div className="w-20 h-20 rounded-full bg-gradient-primary flex items-center justify-center mx-auto mb-5 shadow-neu-sm">
                  <Check className="w-10 h-10 text-primary-foreground" strokeWidth={3} />
                </div>
                <h1 className="text-3xl sm:text-4xl font-extrabold mb-3">
                  Pesanan Berhasil Dibuat!
                </h1>
                <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
                  Terima kasih telah berbelanja di <span className="font-bold text-foreground">FadzKicks</span>.
                  Tim kami akan menghubungi Anda via WhatsApp untuk konfirmasi pembayaran.
                </p>
                <div className="neu-inset inline-block px-6 py-3">
                  <div className="text-xs uppercase tracking-widest text-muted-foreground font-semibold mb-1">
                    Nomor Pesanan
                  </div>
                  <div className="font-extrabold text-xl text-primary tabular-nums">
                    {order.order_code}
                  </div>
                </div>
              </div>

              {/* Detail produk */}
              <div className="neu-surface p-6 sm:p-8 mb-6">
                <h2 className="font-extrabold text-lg mb-4 flex items-center gap-2">
                  <Package className="w-5 h-5 text-primary" /> Detail Produk
                </h2>
                <div className="flex gap-4 items-center pb-5 border-b border-border">
                  {order.product_image && (
                    <div className="w-20 h-20 rounded-xl overflow-hidden neu-inset shrink-0 flex items-center justify-center p-2">
                      <img
                        src={order.product_image}
                        alt={order.product_name}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="font-bold truncate">{order.product_name}</div>
                    <div className="text-sm text-muted-foreground">
                      Ukuran EU {order.size} • Qty: {order.quantity}
                    </div>
                  </div>
                </div>
                <div className="space-y-2 text-sm pt-4">
                  <Row label="Harga satuan" value={formatRupiah(order.unit_price)} />
                  <Row label="Subtotal" value={formatRupiah(order.unit_price * order.quantity)} />
                  <Row label="Ongkir" value="Gratis" highlight />
                </div>
                <div className="flex justify-between font-extrabold text-lg pt-3 mt-3 border-t border-border">
                  <span>Total Pembayaran</span>
                  <span className="text-primary tabular-nums">{formatRupiah(order.total_price)}</span>
                </div>
              </div>

              {/* Detail pengiriman */}
              <div className="neu-surface p-6 sm:p-8 mb-6">
                <h2 className="font-extrabold text-lg mb-4 flex items-center gap-2">
                  <Truck className="w-5 h-5 text-primary" /> Pengiriman
                </h2>
                <div className="grid sm:grid-cols-2 gap-4 text-sm">
                  <InfoRow icon={<Package className="w-4 h-4" />} label="Penerima" value={order.full_name} />
                  <InfoRow icon={<Phone className="w-4 h-4" />} label="WhatsApp" value={order.phone} />
                  <InfoRow icon={<Mail className="w-4 h-4" />} label="Email" value={order.email} />
                  <InfoRow
                    icon={<MapPin className="w-4 h-4" />}
                    label="Alamat"
                    value={`${order.address}, ${order.city} ${order.postal_code}`}
                  />
                </div>
                {order.notes && (
                  <div className="mt-4 pt-4 border-t border-border text-sm">
                    <span className="font-semibold">Catatan: </span>
                    <span className="text-muted-foreground">{order.notes}</span>
                  </div>
                )}
              </div>

              {/* Status */}
              <div className="neu-inset p-5 text-center text-sm text-muted-foreground">
                Status pesanan:{" "}
                <span className="font-bold text-primary uppercase">{order.status}</span> • Dibuat pada{" "}
                {new Date(order.created_at).toLocaleString("id-ID", {
                  dateStyle: "long",
                  timeStyle: "short",
                })}
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  to="/"
                  className="neu-btn-primary px-8 py-4 rounded-2xl font-bold text-center"
                >
                  Belanja Lagi
                </Link>
                <button
                  onClick={() => window.print()}
                  className="neu-btn px-8 py-4 rounded-2xl font-bold"
                >
                  Cetak Bukti Pesanan
                </button>
              </div>
            </>
          ) : null}
        </div>
      </main>

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

const InfoRow = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) => (
  <div>
    <div className="flex items-center gap-1.5 text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-1">
      {icon} {label}
    </div>
    <div className="font-medium break-words">{value}</div>
  </div>
);

export default OrderSuccess;
