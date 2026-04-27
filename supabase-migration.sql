-- ============================================================
-- FadzKicks — Orders table migration
-- Jalankan SQL ini di Supabase Dashboard → SQL Editor
-- ============================================================

-- 1. Tabel orders
create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  order_code text not null unique,
  product_id text not null,
  product_name text not null,
  product_image text,
  size integer not null,
  quantity integer not null check (quantity > 0),
  unit_price bigint not null,
  total_price bigint not null,
  full_name text not null,
  phone text not null,
  email text not null,
  address text not null,
  city text not null,
  postal_code text not null,
  notes text,
  status text not null default 'pending',
  created_at timestamptz not null default now()
);

-- 2. Index
create index if not exists orders_order_code_idx on public.orders(order_code);
create index if not exists orders_created_at_idx on public.orders(created_at desc);

-- 3. Enable Row Level Security
alter table public.orders enable row level security;

-- 4. Kebijakan: pengunjung anonim bisa membuat pesanan
create policy "Anyone can create orders"
  on public.orders
  for insert
  to anon, authenticated
  with check (true);

-- 5. Kebijakan: pengunjung bisa membaca pesanan dengan order_code
--    (digunakan untuk halaman "Pesanan Sukses")
create policy "Anyone can read orders by code"
  on public.orders
  for select
  to anon, authenticated
  using (true);

-- Catatan: Untuk membatasi akses (mis. hanya admin yang bisa baca semua),
-- ganti policy di atas dengan policy berbasis auth.uid() / role admin.
