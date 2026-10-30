# Cakes & Dessert — Luxury Patisserie Ecommerce Platform

> **"Made with Love. Baked for Beautiful Moments."**  
> Luxury Boutique Patisserie & Cloud Bakery Platform based in Coimbatore, Tamil Nadu, India.

---

## 🎂 Project Overview

A luxury, high-converting, fully functional, and production-ready ecommerce website for **Cakes & Dessert** (`https://cakesanddessert.in/`). Built from the ground up to provide a complete customer ordering experience, cake customization, pre-order slot scheduling, delivery management, cloud database integration with Supabase, zero-gateway offline payment workflows (Direct UPI QR, Bank Transfer, Cash on Pickup/Delivery), and a secure admin operations dashboard.

---

## 🛠️ Technology Stack

- **Frontend:** React 19, TypeScript, Vite, Tailwind CSS v4
- **Animation & Micro-interactions:** Motion for React / Framer Motion
- **Icons:** Lucide React
- **Validation:** Zod Schema Validation
- **Cloud Database & Storage:** Supabase (PostgreSQL, Auth, Storage, Row Level Security)
- **Local Fallback Adapter:** `localDB` (IndexedDB via `idb`) with transparent `dataProvider.ts`
- **Hosting:** Cloudflare Pages (Free Tier) with security headers & SPA redirect rules

---

## 🎨 Visual Design System

- **Primary Canvas (Vanilla Cream):** `#FFF7F0` (~50% distribution)
- **Primary Brand (Chocolate Brown):** `#4B2923` (~25% distribution)
- **Dark Accent (Dark Chocolate):** `#2F1916`
- **Primary Accent (Blush Pink):** `#E9AEBB` (~15% distribution)
- **Secondary Accent (Light Pink):** `#F7DCE2`
- **Supporting Neutral (Latte Beige):** `#D7BFAE` (~10% distribution)
- **Typography:** `Playfair Display` for editorial display headings and `DM Sans` for body copy.

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
The application will start at `http://localhost:5173`.

### 3. Local Demo Mode vs Cloud Mode
- **Local Demo Mode (Default):** Runs immediately without requiring external Supabase credentials. All products, orders, customization requests, and settings persist in browser **IndexedDB**.
- **Cloud Mode:** Add your Supabase project credentials in `.env`:
  ```env
  VITE_SUPABASE_URL=https://your-project.supabase.co
  VITE_SUPABASE_ANON_KEY=your-anon-key-here
  ```
  The platform will automatically detect credentials and connect to live PostgreSQL.

### 4. Admin Control Center
Visit `/admin` on your local server.
- **Local Demo Credentials:** `admin@cakesanddessert.in` / `baker123` (or click *"Fill Demo Admin Credentials"*).

---

## 📦 Production Build & Deployment

To build for Cloudflare Pages:
```bash
npm run build
```
Output directory: `dist`  
SPA redirection: `dist/_redirects` (`/* /index.html 200`)  
Security headers: `dist/_headers`

---

## 📚 Complete Documentation Suite

All detailed architectural, design, database, and handover specifications are available in the [`docs/`](./docs) folder:

1. [`docs/WEBSITE_RESEARCH.md`](./docs/WEBSITE_RESEARCH.md) — Verified business research & benchmark audit
2. [`docs/DESIGN_SYSTEM.md`](./docs/DESIGN_SYSTEM.md) — Colour system, typography, and component specs
3. [`docs/ARCHITECTURE.md`](./docs/ARCHITECTURE.md) — System architecture & data provider patterns
4. [`docs/DATABASE.md`](./docs/DATABASE.md) — Relational schema, ERD, and RLS policies
5. [`docs/SECURITY.md`](./docs/SECURITY.md) — RBAC, IDOR protection, and input sanitization
6. [`docs/ADMIN_GUIDE.md`](./docs/ADMIN_GUIDE.md) — Operational instructions for bakery staff
7. [`docs/DEPLOYMENT.md`](./docs/DEPLOYMENT.md) — Cloudflare Pages and Supabase launch instructions
8. [`docs/TEST_RESULTS.md`](./docs/TEST_RESULTS.md) — Customer & admin journey verification report
9. [`docs/PROJECT_HANDOVER.md`](./docs/PROJECT_HANDOVER.md) — Project handover and client summary
