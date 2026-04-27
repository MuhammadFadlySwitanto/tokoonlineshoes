import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Product, formatRupiah } from "@/data/products";

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <Link
      to={`/produk/${product.id}`}
      className="group neu-surface p-5 sm:p-6 flex flex-col transition-transform hover:-translate-y-1"
    >
      <div className="neu-inset aspect-square mb-5 overflow-hidden flex items-center justify-center">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          width={800}
          height={800}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex items-start justify-between gap-3 mb-2">
        <div>
          <p className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">
            {product.category}
          </p>
          <h3 className="font-bold text-lg mt-1">{product.name}</h3>
        </div>
        <div className="px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold whitespace-nowrap">
          Stok {product.stock}
        </div>
      </div>
      <p className="text-sm text-muted-foreground mb-5 line-clamp-2">{product.tagline}</p>
      <div className="mt-auto flex items-center justify-between">
        <span className="font-extrabold text-lg tabular-nums">{formatRupiah(product.price)}</span>
        <span className="neu-btn-primary w-10 h-10 rounded-full flex items-center justify-center">
          <ArrowRight className="w-4 h-4" />
        </span>
      </div>
    </Link>
  );
};

export default ProductCard;
