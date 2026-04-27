const SiteFooter = () => {
  return (
    <footer className="border-t border-border/50 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 grid gap-10 md:grid-cols-4 text-sm">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-primary shadow-neu-sm flex items-center justify-center">
              <span className="text-primary-foreground font-extrabold">S</span>
            </div>
            <span className="font-extrabold">Stride Co.</span>
          </div>
          <p className="text-muted-foreground">
            Sepatu bermerek premium dengan kualitas terbaik di Indonesia.
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Belanja</h4>
          <ul className="space-y-2 text-muted-foreground">
            <li><a href="/#koleksi" className="hover:text-primary">Koleksi</a></li>
            <li><a href="#" className="hover:text-primary">Pria</a></li>
            <li><a href="#" className="hover:text-primary">Wanita</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Bantuan</h4>
          <ul className="space-y-2 text-muted-foreground">
            <li><a href="#" className="hover:text-primary">Pengiriman</a></li>
            <li><a href="#" className="hover:text-primary">Pengembalian</a></li>
            <li><a href="#" className="hover:text-primary">Panduan Ukuran</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Kontak</h4>
          <ul className="space-y-2 text-muted-foreground">
            <li>halo@strideco.id</li>
            <li>+62 812-3456-7890</li>
            <li>Jakarta, Indonesia</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/50 py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Stride Co. Semua hak cipta dilindungi.
      </div>
    </footer>
  );
};

export default SiteFooter;
