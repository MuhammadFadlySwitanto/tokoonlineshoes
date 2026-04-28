import { useEffect, useState } from "react";
import { X, SlidersHorizontal } from "lucide-react";
import {
  allBrands,
  allCategories,
  allColors,
  allSizes,
  formatRupiah,
  priceRange,
} from "@/data/products";

export type CatalogFilterState = {
  categories: string[];
  brands: string[];
  sizes: number[];
  colors: string[];
  minPrice: number;
  maxPrice: number;
};

export const emptyFilters = (): CatalogFilterState => ({
  categories: [],
  brands: [],
  sizes: [],
  colors: [],
  minPrice: priceRange.min,
  maxPrice: priceRange.max,
});

const toggle = <T,>(arr: T[], v: T): T[] =>
  arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v];

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="border-b border-border pb-5 mb-5 last:border-0 last:mb-0 last:pb-0">
    <h3 className="text-sm font-extrabold uppercase tracking-widest text-muted-foreground mb-3">
      {title}
    </h3>
    {children}
  </div>
);

const Chip = ({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) => (
  <button
    type="button"
    onClick={onClick}
    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
      active ? "neu-btn-primary" : "neu-btn text-foreground"
    }`}
  >
    {children}
  </button>
);

type Props = {
  value: CatalogFilterState;
  onChange: (next: CatalogFilterState) => void;
  onReset: () => void;
  resultCount: number;
};

const FilterBody = ({ value, onChange, onReset, resultCount }: Props) => {
  // Local price draft supaya input number nyaman diketik
  const [minDraft, setMinDraft] = useState(String(value.minPrice));
  const [maxDraft, setMaxDraft] = useState(String(value.maxPrice));

  useEffect(() => {
    setMinDraft(String(value.minPrice));
    setMaxDraft(String(value.maxPrice));
  }, [value.minPrice, value.maxPrice]);

  const commitPrice = () => {
    let min = Number(minDraft) || priceRange.min;
    let max = Number(maxDraft) || priceRange.max;
    if (min < priceRange.min) min = priceRange.min;
    if (max > priceRange.max) max = priceRange.max;
    if (min > max) [min, max] = [max, min];
    onChange({ ...value, minPrice: min, maxPrice: max });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <div>
          <div className="font-extrabold text-lg">Filter</div>
          <div className="text-xs text-muted-foreground">{resultCount} produk ditemukan</div>
        </div>
        <button
          type="button"
          onClick={onReset}
          className="text-xs font-bold text-primary hover:underline"
        >
          Reset
        </button>
      </div>

      <Section title="Kategori">
        <div className="flex flex-wrap gap-2">
          {allCategories.map((c) => (
            <Chip
              key={c}
              active={value.categories.includes(c)}
              onClick={() => onChange({ ...value, categories: toggle(value.categories, c) })}
            >
              {c}
            </Chip>
          ))}
        </div>
      </Section>

      <Section title="Brand">
        <div className="flex flex-wrap gap-2">
          {allBrands.map((b) => (
            <Chip
              key={b}
              active={value.brands.includes(b)}
              onClick={() => onChange({ ...value, brands: toggle(value.brands, b) })}
            >
              {b}
            </Chip>
          ))}
        </div>
      </Section>

      <Section title="Rentang Harga">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-[10px] uppercase tracking-wider text-muted-foreground font-bold mb-1.5">
              Min
            </label>
            <input
              type="number"
              inputMode="numeric"
              value={minDraft}
              onChange={(e) => setMinDraft(e.target.value)}
              onBlur={commitPrice}
              className="neu-input w-full px-3 py-2 text-sm tabular-nums"
            />
          </div>
          <div>
            <label className="block text-[10px] uppercase tracking-wider text-muted-foreground font-bold mb-1.5">
              Max
            </label>
            <input
              type="number"
              inputMode="numeric"
              value={maxDraft}
              onChange={(e) => setMaxDraft(e.target.value)}
              onBlur={commitPrice}
              className="neu-input w-full px-3 py-2 text-sm tabular-nums"
            />
          </div>
        </div>
        <div className="mt-2 text-xs text-muted-foreground tabular-nums">
          {formatRupiah(value.minPrice)} – {formatRupiah(value.maxPrice)}
        </div>
      </Section>

      <Section title="Ukuran (EU)">
        <div className="flex flex-wrap gap-2">
          {allSizes.map((s) => (
            <Chip
              key={s}
              active={value.sizes.includes(s)}
              onClick={() => onChange({ ...value, sizes: toggle(value.sizes, s) })}
            >
              {s}
            </Chip>
          ))}
        </div>
      </Section>

      <Section title="Warna">
        <div className="flex flex-wrap gap-2">
          {allColors.map((c) => (
            <Chip
              key={c}
              active={value.colors.includes(c)}
              onClick={() => onChange({ ...value, colors: toggle(value.colors, c) })}
            >
              {c}
            </Chip>
          ))}
        </div>
      </Section>
    </div>
  );
};

/** Sidebar desktop + drawer mobile */
const CatalogFilters = (props: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:block neu-surface p-6 self-start sticky top-24">
        <FilterBody {...props} />
      </aside>

      {/* Mobile trigger */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="lg:hidden neu-btn inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-foreground"
      >
        <SlidersHorizontal className="w-4 h-4" /> Filter
      </button>

      {/* Mobile drawer */}
      {open && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="absolute inset-0 bg-foreground/40 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <div className="relative ml-auto w-[88%] max-w-sm h-full bg-background overflow-y-auto p-6 shadow-2xl animate-in slide-in-from-right">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 neu-btn w-9 h-9 rounded-full flex items-center justify-center"
              aria-label="Tutup"
            >
              <X className="w-4 h-4" />
            </button>
            <FilterBody {...props} />
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="neu-btn-primary w-full mt-6 py-3 rounded-2xl font-bold"
            >
              Tampilkan {props.resultCount} produk
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default CatalogFilters;
