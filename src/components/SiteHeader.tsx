import { Link } from "react-router-dom";
import { ShoppingBag } from "lucide-react";

const SiteHeader = () => {
  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-gradient-primary shadow-neu-sm flex items-center justify-center">
            <span className="text-primary-foreground font-extrabold text-lg">S</span>
          </div>
          <span className="font-extrabold text-lg tracking-tight">Stride Co.</span>
        </Link>

        <nav className="hidden md:flex gap-8 text-sm font-semibold text-muted-foreground">
          <a href="/#koleksi" className="hover:text-primary transition-colors">Koleksi</a>
          <a href="/#fitur" className="hover:text-primary transition-colors">Fitur</a>
          <a href="/#testimoni" className="hover:text-primary transition-colors">Testimoni</a>
        </nav>

        <button
          aria-label="Keranjang"
          className="neu-btn w-11 h-11 rounded-xl flex items-center justify-center text-foreground"
        >
          <ShoppingBag className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
};

export default SiteHeader;
