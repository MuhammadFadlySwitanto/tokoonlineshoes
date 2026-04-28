import { useEffect, useMemo, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { Search, X, ArrowRight } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import ProductCard from "@/components/ProductCard";
import CatalogFilters, {
  CatalogFilterState,
  emptyFilters,
} from "@/components/CatalogFilters";
import {
  products,
  allCategories,
  priceRange,
  ProductCategory,
} from "@/data/products";

type SortKey = "newest" | "price-asc" | "price-desc" | "popular";

const SORT_LABELS: Record<SortKey, string> = {
  newest: "Terbaru",
  popular: "Terpopuler",
  "price-asc": "Harga Terendah",
  "price-desc": "Harga Tertinggi",
};

/** Debounce hook ringan untuk search input */
const useDebounced = <T,>(value: T, delay = 300): T => {
  const [v, setV] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setV(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return v;
};

const parseList = (raw: string | null): string[] =>
  raw ? raw.split(",").filter(Boolean) : [];
const parseNumList = (raw: string | null): number[] =>
  raw ? raw.split(",").map(Number).filter((n) => !Number.isNaN(n)) : [];

const Catalog = () => {
  const { kategori } = useParams<{ kategori?: string }>();
  const [searchParams, setSearchParams] = useSearchParams();

  // Search input: state lokal + debounced agar URL tidak update tiap keystroke
  const [searchInput, setSearchInput] = useState(searchParams.get("q") ?? "");
  const debouncedSearch = useDebounced(searchInput, 300);

  // Sync debounced search ke URL
  useEffect(() => {
    const next = new URLSearchParams(searchParams);
    if (debouncedSearch.trim()) next.set("q", debouncedSearch.trim());
    else next.delete("q");
    setSearchParams(next, { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch]);

  // Sync input kalau user navigasi back/forward
  useEffect(() => {
    const q = searchParams.get("q") ?? "";
    if (q !== searchInput) setSearchInput(q);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams.get("q")]);

  // Filter state diturunkan dari URL (single source of truth)
  const filters: CatalogFilterState = useMemo(() => {
    const fromCategorySlug = (() => {
      if (!kategori) return [];
      const found = allCategories.find(
        (c) => c.toLowerCase() === decodeURIComponent(kategori).toLowerCase(),
      );
      return found ? [found] : [];
    })();

    return {
      categories: fromCategorySlug.length
        ? fromCategorySlug
        : parseList(searchParams.get("kategori")),
      brands: parseList(searchParams.get("brand")),
      sizes: parseNumList(searchParams.get("size")),
      colors: parseList(searchParams.get("warna")),
      minPrice: Number(searchParams.get("min")) || priceRange.min,
      maxPrice: Number(searchParams.get("max")) || priceRange.max,
    };
  }, [searchParams, kategori]);

  const sort = (searchParams.get("sort") as SortKey) || "newest";

  const updateFilters = (next: CatalogFilterState) => {
    const sp = new URLSearchParams(searchParams);
    const setOrDel = (key: string, val: string) =>
      val ? sp.set(key, val) : sp.delete(key);

    setOrDel("kategori", next.categories.join(","));
    setOrDel("brand", next.brands.join(","));
    setOrDel("size", next.sizes.join(","));
    setOrDel("warna", next.colors.join(","));
    setOrDel(
      "min",
      next.minPrice !== priceRange.min ? String(next.minPrice) : "",
    );
    setOrDel(
      "max",
      next.maxPrice !== priceRange.max ? String(next.maxPrice) : "",
    );
    setSearchParams(sp, { replace: true });
  };

  const resetFilters = () => {
    const sp = new URLSearchParams();
    const q = searchParams.get("q");
    if (q) sp.set("q", q);
    const s = searchParams.get("sort");
    if (s) sp.set("sort", s);
    setSearchParams(sp, { replace: true });
  };

  const setSort = (s: SortKey) => {
    const sp = new URLSearchParams(searchParams);
    if (s === "newest") sp.delete("sort");
    else sp.set("sort", s);
    setSearchParams(sp, { replace: true });
  };

  // Filter + sort
  const filtered = useMemo(() => {
    const q = debouncedSearch.trim().toLowerCase();
    const list = products.filter((p) => {
      if (q) {
        const hay = `${p.name} ${p.tagline} ${p.category} ${p.brand}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      if (filters.categories.length && !filters.categories.includes(p.category)) return false;
      if (filters.brands.length && !filters.brands.includes(p.brand)) return false;
      if (filters.sizes.length && !p.sizes.some((s) => filters.sizes.includes(s))) return false;
      if (filters.colors.length && !p.colors.some((c) => filters.colors.includes(c))) return false;
      if (p.price < filters.minPrice || p.price > filters.maxPrice) return false;
      return true;
    });

    const sorted = [...list];
    switch (sort) {
      case "price-asc":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "popular":
        sorted.sort((a, b) => b.popularity - a.popularity);
        break;
      case "newest":
      default:
        sorted.sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));
    }
    return sorted;
  }, [debouncedSearch, filters, sort]);

  const headerLabel = filters.categories.length === 1
    ? `Kategori: ${filters.categories[0]}`
    : "Semua Koleksi";

  // SEO title
  useEffect(() => {
    document.title = `${headerLabel} — FadzKicks`;
  }, [headerLabel]);

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      <main className="flex-1 px-4 sm:px-6 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto">
          {/* Header katalog */}
          <div className="mb-8">
            <p className="text-xs uppercase tracking-widest text-primary font-bold mb-2">
              Katalog
            </p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-2">
              {headerLabel}
            </h1>
            <p className="text-muted-foreground">
              Telusuri seluruh koleksi sneaker premium FadzKicks. Gunakan filter untuk menemukan
              pasangan yang pas.
            </p>
          </div>

          {/* Toolbar: search + sort + mobile filter */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="search"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Cari sneaker, kategori, atau brand..."
                className="neu-input w-full pl-11 pr-10 py-3 text-sm"
              />
              {searchInput && (
                <button
                  type="button"
                  onClick={() => setSearchInput("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full hover:bg-muted flex items-center justify-center"
                  aria-label="Bersihkan pencarian"
                >
                  <X className="w-3.5 h-3.5 text-muted-foreground" />
                </button>
              )}
            </div>

            <div className="flex gap-3">
              <CatalogFilters
                value={filters}
                onChange={updateFilters}
                onReset={resetFilters}
                resultCount={filtered.length}
              />
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortKey)}
                className="neu-input px-4 py-2.5 text-sm font-bold cursor-pointer"
                aria-label="Urutkan"
              >
                {(Object.keys(SORT_LABELS) as SortKey[]).map((k) => (
                  <option key={k} value={k}>
                    {SORT_LABELS[k]}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Layout: sidebar + grid */}
          <div className="grid lg:grid-cols-[260px_1fr] gap-8">
            <CatalogFilters
              value={filters}
              onChange={updateFilters}
              onReset={resetFilters}
              resultCount={filtered.length}
            />

            <div>
              {filtered.length === 0 ? (
                <div className="neu-surface p-12 text-center">
                  <div className="text-5xl mb-4">🔍</div>
                  <h2 className="font-extrabold text-xl mb-2">
                    Tidak ada sepatu yang cocok
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    Coba ubah kata kunci pencarian atau reset filter.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSearchInput("");
                      resetFilters();
                    }}
                    className="neu-btn-primary px-6 py-3 rounded-2xl font-bold"
                  >
                    Reset Pencarian & Filter
                  </button>
                </div>
              ) : (
                <>
                  <div className="text-sm text-muted-foreground mb-4 hidden lg:block">
                    Menampilkan <span className="font-bold text-foreground">{filtered.length}</span>{" "}
                    produk
                  </div>
                  <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filtered.map((p) => (
                      <ProductCard key={p.id} product={p} />
                    ))}
                  </div>
                </>
              )}

              {/* CTA balik beranda */}
              <div className="mt-12">
                <Link
                  to="/"
                  className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:underline"
                >
                  Kembali ke Beranda <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
};

export default Catalog;
