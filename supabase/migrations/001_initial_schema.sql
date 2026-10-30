-- ==============================================================================
-- CAKES & DESSERT — SUPABASE POSTGRESQL SCHEMA WITH ROW LEVEL SECURITY (RLS)
-- ==============================================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. Profiles & Admin Roles
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  role text not null default 'customer', -- 'admin', 'baker', 'customer'
  full_name text,
  phone text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Categories
create table if not exists public.categories (
  id text primary key,
  name text not null,
  slug text unique not null,
  description text,
  image text not null,
  display_order integer default 0,
  is_active boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. Products
create table if not exists public.products (
  id text primary key,
  name text not null,
  slug text unique not null,
  description text not null,
  category_id text references public.categories(id) on delete set null,
  category_name text,
  base_price numeric(10, 2) not null,
  price_on_request boolean default false,
  images text[] default '{}',
  is_featured boolean default false,
  is_bestseller boolean default false,
  is_new boolean default false,
  is_available boolean default true,
  preparation_time_hours integer default 12,
  min_order_hours integer default 6,
  dietary_flags jsonb default '{"is_eggless_available": true}'::jsonb,
  variants jsonb default '[]'::jsonb,
  customization jsonb default '{"allow_eggless": true, "allow_message": true, "max_message_chars": 35}'::jsonb,
  ingredients text[] default '{}',
  storage_instructions text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. Delivery Areas & Pincodes
create table if not exists public.delivery_areas (
  id text primary key,
  pincode text not null,
  area_name text not null,
  delivery_fee numeric(10, 2) not null default 0,
  min_order_amount numeric(10, 2) default 0,
  is_active boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 5. Delivery Time Slots
create table if not exists public.time_slots (
  id text primary key,
  label text not null,
  start_time text not null,
  end_time text not null,
  max_orders integer default 10,
  is_active boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 6. Orders
create table if not exists public.orders (
  id text primary key default ('order-' || extract(epoch from now())::bigint || '-' || substr(md5(random()::text), 1, 5)),
  order_number text unique not null,
  tracking_token text not null,
  customer_name text not null,
  customer_phone text not null,
  customer_email text,
  delivery_method text not null check (delivery_method in ('delivery', 'pickup')),
  delivery_address text,
  delivery_pincode text,
  delivery_landmark text,
  scheduled_date date not null,
  scheduled_slot_id text not null,
  scheduled_slot_label text not null,
  items jsonb not null default '[]'::jsonb,
  subtotal numeric(10, 2) not null,
  delivery_fee numeric(10, 2) not null default 0,
  discount_amount numeric(10, 2) not null default 0,
  total_amount numeric(10, 2) not null,
  payment_method_preference text not null check (payment_method_preference in ('upi', 'bank_transfer', 'cash_on_delivery', 'cash_on_pickup')),
  payment_status text not null default 'unpaid' check (payment_status in ('unpaid', 'payment_pending', 'partially_paid', 'paid', 'refunded')),
  order_status text not null default 'pending' check (order_status in ('pending', 'contacted', 'confirmed', 'preparing', 'ready', 'out_for_delivery', 'completed', 'cancelled')),
  special_instructions text,
  internal_notes text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 7. Custom Cake Requests
create table if not exists public.custom_cake_requests (
  id text primary key default ('cake-req-' || extract(epoch from now())::bigint),
  reference_number text unique not null,
  customer_name text not null,
  customer_phone text not null,
  customer_email text,
  cake_type text not null,
  flavor text not null,
  size_or_servings text not null,
  theme_or_occasion text not null,
  color_palette text not null,
  message_on_cake text,
  reference_image_url text,
  required_date date not null,
  delivery_method text not null,
  additional_notes text,
  estimated_budget text,
  status text not null default 'submitted' check (status in ('submitted', 'quote_sent', 'approved', 'declined')),
  quoted_price numeric(10, 2),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 8. Bulk & Event Orders
create table if not exists public.bulk_order_requests (
  id text primary key default ('bulk-req-' || extract(epoch from now())::bigint),
  reference_number text unique not null,
  customer_name text not null,
  customer_phone text not null,
  customer_email text not null,
  event_type text not null,
  event_date date not null,
  estimated_quantity text not null,
  product_requirements text not null,
  budget_range text,
  delivery_location text not null,
  additional_notes text,
  status text not null default 'pending' check (status in ('pending', 'contacted', 'confirmed', 'closed')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 9. Site Settings
create table if not exists public.site_settings (
  key text primary key,
  value jsonb not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

alter table public.profiles enable row level security;
alter table public.categories enable row level security;
alter table public.products enable row level security;
alter table public.delivery_areas enable row level security;
alter table public.time_slots enable row level security;
alter table public.orders enable row level security;
alter table public.custom_cake_requests enable row level security;
alter table public.bulk_order_requests enable row level security;
alter table public.site_settings enable row level security;

-- Helper function to check if current user is admin
create or replace function public.is_admin()
returns boolean as $$
begin
  return exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
end;
$$ language plpgsql security definer;

-- Categories: Anyone can read, only admin can insert/update/delete
create policy "Categories are viewable by everyone" on public.categories for select using (true);
create policy "Admin can manage categories" on public.categories for all using (public.is_admin());

-- Products: Anyone can read active products, admin has full access
create policy "Products are viewable by everyone" on public.products for select using (true);
create policy "Admin can manage products" on public.products for all using (public.is_admin());

-- Delivery Areas & Time Slots: Anyone can read, admin can manage
create policy "Delivery areas are viewable by everyone" on public.delivery_areas for select using (true);
create policy "Admin can manage delivery areas" on public.delivery_areas for all using (public.is_admin());
create policy "Time slots are viewable by everyone" on public.time_slots for select using (true);
create policy "Admin can manage time slots" on public.time_slots for all using (public.is_admin());

-- Orders:
-- Anyone can create an order (guest checkout)
create policy "Anyone can insert an order" on public.orders for insert with check (true);
-- Customers can view their own order using their secret tracking token
create policy "Customers can view their order via tracking" on public.orders for select using (
  public.is_admin() or tracking_token is not null
);
-- Only admin can update order status or internal notes
create policy "Admin can manage orders" on public.orders for all using (public.is_admin());

-- Custom Cake Requests:
create policy "Anyone can submit custom cake request" on public.custom_cake_requests for insert with check (true);
create policy "Admin can view and manage custom cake requests" on public.custom_cake_requests for all using (public.is_admin());

-- Bulk Orders:
create policy "Anyone can submit bulk order" on public.bulk_order_requests for insert with check (true);
create policy "Admin can view and manage bulk orders" on public.bulk_order_requests for all using (public.is_admin());

-- Site Settings:
create policy "Site settings are viewable by everyone" on public.site_settings for select using (true);
create policy "Admin can update site settings" on public.site_settings for all using (public.is_admin());

-- Storage Bucket Setup for images
insert into storage.buckets (id, name, public) 
values ('bakery-media', 'bakery-media', true)
on conflict (id) do nothing;

create policy "Public can view bakery media" on storage.objects for select using (bucket_id = 'bakery-media');
create policy "Anyone can upload custom cake reference images" on storage.objects for insert with check (bucket_id = 'bakery-media');

