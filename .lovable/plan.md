
# Roadmap FadzKicks — Portofolio Best Practices

Project sudah punya fondasi solid (landing, detail produk, form order, Supabase orders). Berikut prioritas pengembangan, disusun dari yang paling memberi "value cerita" untuk portofolio dan secara teknis paling natural dilakukan berurutan.

## Ringkasan Fase

```text
Fase 1  →  Katalog + Filter & Search (struktur navigasi proper)
Fase 2  →  Simulasi Payment Flow (status lifecycle: pending → waiting_payment → paid → expired/failed)
Fase 3  →  Admin Dashboard + Auth (lihat & update status pesanan)
Fase 4  →  Integrasi WhatsApp Pintar + Polish (notif, copy order, deep-link)
```

Setiap fase berdiri sendiri — selesai 1 fase, web tetap utuh dan layak demo.

---

## Fase 1 — Halaman Katalog dengan Filter & Search

**Tujuan:** Menyiapkan navigasi multi-page yang proper, plus pengalaman browsing produk yang nyata. Tidak generate gambar — hanya wadah, kamu isi `/src/assets` sendiri.

**Yang dibuat:**
- Route baru `/koleksi` → halaman katalog penuh (grid produk, hasil filter).
- Route baru `/koleksi/:kategori` (opsional) untuk shareable link per kategori.
- Komponen `CatalogFilters` di sidebar (desktop) / drawer (mobile):
  - Filter **Kategori** (Lifestyle, Running, Hi-Top, Trail).
  - Filter **Brand** (siap untuk multi-brand ke depan).
  - Filter **Rentang Harga** (slider dual-handle dari shadcn).
  - Filter **Ukuran** (chip 38–44).
  - Filter **Warna** (chip swatch).
- **Search bar** di header katalog (debounced, match `name` + `tagline` + `category`).
- **Sort**: Terbaru, Harga ↑, Harga ↓, Terpopuler.
- URL state: filter & search disimpan di query string (`?q=...&kategori=...&min=...&max=...`) supaya hasil bisa di-share & back/forward bekerja.
- Empty state ramah ("Tidak ada sepatu yang cocok, reset filter").
- Header global dapat link **Koleksi** baru (mengarah ke `/koleksi`, bukan anchor `#koleksi`).
- Landing page tetap menampilkan 4 produk highlight + tombol "Lihat Semua Koleksi" → `/koleksi`.

**Data:**
- Perluas `src/data/products.ts` dari 4 → 8–12 entry placeholder (image pakai `placeholder.svg` dulu, slot siap kamu ganti).
- Tambah field `createdAt` & `popularity` untuk sort.

**Teknis:**
- Memo filter pakai `useMemo`, parsing query pakai `useSearchParams` dari react-router.
- Komponen reusable: `ProductCard` (sudah ada) tetap dipakai.

---

## Fase 2 — Simulasi Payment Flow (Best Practice tanpa Gateway)

**Tujuan:** Meniru UX Tokopedia/Shopee — submit order tidak langsung "berhasil", tapi masuk halaman instruksi pembayaran dengan status nyata di DB. Tanpa Xendit/Midtrans (gimmick), tetap dapat best-practice-nya.

**Lifecycle status pesanan:**
```text
pending_payment  →  paid  →  shipped  →  completed
                 ↘  expired   (lewat 24 jam)
                 ↘  cancelled (user batalkan)
```

**Migration DB (perlu mode default):**
- Ubah default `status` jadi `'pending_payment'`.
- Tambah kolom: `payment_method` (text), `payment_expired_at` (timestamptz), `paid_at` (timestamptz), `va_number` (text), `payment_proof_url` (text, opsional).
- Tambah CHECK constraint untuk daftar status valid.

**Flow baru:**
1. User submit form di `ProductDetail` → muncul **step "Pilih Metode Pembayaran"** sebelum insert (modal/section baru).
   - Pilihan simulasi: BCA Virtual Account, Mandiri Livin, BNI VA, ShopeePay, GoPay, QRIS.
2. Setelah pilih, insert ke DB dengan `status='pending_payment'`, generate `va_number` random, set `payment_expired_at = now + 24h`.
3. Redirect ke `/pembayaran/:code` (page baru) yang menampilkan:
   - **Countdown** sisa waktu pembayaran (24 jam) — live ticking.
   - Nomor VA / instruksi sesuai metode (copy-to-clipboard).
   - Total bayar besar & jelas.
   - Tombol **"Saya Sudah Bayar"** → simulasi: update `status='paid'`, `paid_at=now()` → redirect ke `/pesanan-sukses/:code`.
   - Tombol **"Batalkan Pesanan"** → `status='cancelled'`.
   - Khusus ShopeePay/GoPay: tombol "Bayar Sekarang" buka **mock popup** (modal dengan input PIN 6-digit fake → loading 2 detik → sukses).
4. `OrderSuccess` page tetap, tapi:
   - Tampilkan badge status berbeda warna (paid hijau, pending kuning, expired merah).
   - Kalau `status !== 'paid'`, redirect balik ke `/pembayaran/:code`.

**Best practice yang dipamerkan:**
- Idempotent state transition (tidak bisa dari `cancelled` ke `paid`).
- Expiry handling client-side (kalau countdown habis & user reload, status auto-update ke `expired` via update call — atau ditangani saat admin lihat).
- URL pembayaran tetap bisa dibuka ulang (user simpan link).

---

## Fase 3 — Admin Dashboard + Authentication

**Tujuan:** Owner bisa login, lihat semua pesanan, update status, lihat statistik dasar. Pakai pola role-aman (table `user_roles` terpisah, bukan kolom di profiles).

**Auth:**
- Pakai **Lovable Cloud auth** (email + password). Default Google sign-in di-skip (admin internal saja).
- Route `/admin/login` → form login.
- Route protected `/admin/*` → cek role `admin` via `has_role()` security definer function.

**DB (migration):**
- Enum `app_role` ('admin', 'user').
- Table `user_roles (id, user_id → auth.users, role, unique(user_id, role))`.
- Function `public.has_role(_user_id uuid, _role app_role)` SECURITY DEFINER (sesuai best practice).
- RLS pada `orders`:
  - Anon: hanya boleh `INSERT` & `SELECT WHERE order_code = ?` (perketat dari kondisi sekarang yang `using (true)`).
  - Admin: boleh `SELECT` semua + `UPDATE` status.
- Cara assign admin pertama: lewat SQL manual di Supabase Dashboard (didokumentasikan di `supabase-migration.sql` sebagai komentar).

**Halaman admin:**
- `/admin` → dashboard ringkas:
  - KPI cards: Total order hari ini, Revenue (paid only), Pending payment, Expired.
  - Mini chart 7 hari terakhir (recharts, sudah tersedia).
- `/admin/pesanan` → tabel semua pesanan (shadcn Table):
  - Kolom: Kode, Tanggal, Customer, Produk, Total, Status, Aksi.
  - Filter status (tabs: Semua / Pending / Paid / Shipped / Cancelled / Expired).
  - Search by `order_code`, nama, atau email.
  - Pagination (limit 20, server-side via Supabase `range`).
- `/admin/pesanan/:code` → detail pesanan + tombol update status (Pending → Paid → Shipped → Completed). Setiap update tercatat `updated_at`.
- Layout `AdminLayout` dengan sidebar (shadcn Sidebar).
- Logout button.

**Keamanan client-side:**
- `RequireAdmin` wrapper component: cek session + `has_role`. Kalau bukan admin → redirect `/admin/login`.
- Subscribe `onAuthStateChange` SEBELUM `getSession()` (best practice).

---

## Fase 4 — WhatsApp Pintar + Polish Akhir

**Tujuan:** Notifikasi & komunikasi customer makin natural, plus bersih-bersih.

**Yang dibuat:**
- Tombol **"Hubungi via WhatsApp"** di `OrderSuccess` & `/pembayaran/:code` dengan template message terstruktur:
  ```text
  Halo FadzKicks, saya konfirmasi pesanan:
  • Kode: FK-XXXX
  • Produk: Velocity Pro (Ukuran 42, Qty 1)
  • Total: Rp 2.499.000
  • Metode: BCA VA 8808-xxxx
  ```
  Pakai `wa.me/<nomor>?text=<encoded>` — semua input di-`encodeURIComponent` (security best practice).
- Nomor admin disimpan sebagai env var `VITE_WA_ADMIN_NUMBER` (kamu bisa ganti tanpa rebuild).
- Tombol "Bagikan struk" di `OrderSuccess` (Web Share API + fallback copy link).
- **Polish:**
  - Skeleton loaders di katalog & admin.
  - Toast yang konsisten (sudah ada Sonner).
  - 404 page dipoles match brand.
  - Meta tag SEO per route (`react-helmet-async` atau native `useEffect` set title/description).
  - README.md ditulis ulang: arsitektur, ER diagram, cara jalanin, cara jadiin admin, screenshot.

---

## Catatan Implementasi Lintas-Fase

- **Tidak generate gambar.** Setiap produk baru pakai `public/placeholder.svg` sebagai default — kamu tinggal drop file ke `src/assets` lalu update `products.ts`.
- **Migration SQL** ditulis ke `supabase-migration.sql` (satu file per fase, di-append). Kamu jalankan manual di Supabase SQL Editor karena project Supabase kamu eksternal.
- **Routing:** semua route baru ditambahkan **di atas** catch-all `*` di `App.tsx` (sudah dicatat di kode).
- **State management:** tetap pakai `@tanstack/react-query` (sudah terpasang) untuk fetch admin & order status — caching otomatis, refetch on focus.
- **Validasi:** semua input form (admin & user) pakai `zod`, sama seperti pola `ProductDetail` sekarang.

---

## Rekomendasi Eksekusi

Saya sarankan kita **kerjakan Fase 1 dulu** sampai selesai (1 deliverable utuh), lalu lanjut Fase 2, 3, 4 di prompt-prompt berikutnya. Alasannya:
- Tiap fase punya scope migration DB & UI yang besar — kalau dijejalkan sekaligus, susah review & rollback.
- Setelah Fase 1 kamu sudah dapat "wow factor" pertama (katalog + filter + search) yang sangat portfolio-friendly.

**Konfirmasi:** Setujui plan ini untuk saya mulai dari Fase 1? Atau kamu mau urutan berbeda (mis. langsung Admin dulu)?
