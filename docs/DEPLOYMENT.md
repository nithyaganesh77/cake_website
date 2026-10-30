# DEPLOYMENT GUIDE — CLOUDFLARE PAGES & SUPABASE
**Project:** Cakes & Dessert Luxury Boutique Platform  
**Target Hosting:** Cloudflare Pages (Free Tier)  
**Database:** Supabase PostgreSQL

---

## 1. Supabase Cloud Setup

1. Create a free account at [https://supabase.com](https://supabase.com).
2. Click **New Project** and name it `cakes-and-dessert`.
3. In the left navigation, open the **SQL Editor**.
4. Open the project file:
   `supabase/migrations/001_initial_schema.sql`
5. Copy and paste the entire script into the SQL Editor and click **Run**.
6. This sets up:
   - Relational tables (`products`, `categories`, `orders`, `custom_cake_requests`, `delivery_areas`, `time_slots`, `site_settings`, `profiles`).
   - Row Level Security (RLS) policies.
   - Storage bucket `bakery-media` for images.
7. Go to **Project Settings** -> **API** and copy:
   - **Project URL**
   - **anon public key**

---

## 2. Cloudflare Pages Deployment

### Step A: Push Code to GitHub
```bash
git init
git add .
git commit -m "Initial commit of complete Cakes & Dessert platform"
git branch -M main
git remote add origin https://github.com/your-username/cakes-and-dessert.git
git push -u origin main
```

### Step B: Connect to Cloudflare Pages
1. Log into your [Cloudflare Dashboard](https://dash.cloudflare.com) -> **Workers & Pages**.
2. Click **Create Application** -> **Pages** -> **Connect to Git**.
3. Select your repository `cakes-and-dessert`.
4. Configure Build Settings:
   - **Framework preset:** `Vite`
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - **Root directory:** `/`
5. Configure Environment Variables:
   - `VITE_SUPABASE_URL`: `<your-supabase-project-url>`
   - `VITE_SUPABASE_ANON_KEY`: `<your-supabase-anon-key>`
   - `VITE_APP_ENV`: `production`
6. Click **Save and Deploy**.

---

## 3. SPA Routing & Security Header Verification

- **SPA Routing (`public/_redirects`):**
  Cloudflare automatically copies `_redirects` to `dist/_redirects`, ensuring routes like `/shop`, `/checkout`, `/admin`, and `/product/:slug` resolve with HTTP 200 instead of 404 on page reload.
- **Security Headers (`public/_headers`):**
  Ensures HSTS, `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, and asset caching.

---

## 4. Production Launch Checklist

- [x] TypeScript build compiles with 0 errors (`npm run build`).
- [x] React ErrorBoundary catches unexpected client exceptions.
- [x] Zero online payment gateways configured (no Razorpay/Stripe dependency).
- [x] Offline payments (UPI, Bank Transfer, Cash on Pickup) verified.
- [x] Pre-order lead time minimums (12-24 hours) enforced.
- [x] Pincode verification tested for Coimbatore delivery zones.
- [x] 1-click WhatsApp order synchronization tested with preformatted text.
- [x] Admin dashboard verified for product updates, slot limits, and order tracking.
- [x] Public SEO tags, Open Graph preview, sitemap.xml, robots.txt, and webmanifest present.

