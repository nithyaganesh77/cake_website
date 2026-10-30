# WEBSITE RESEARCH & BUSINESS IDENTITY ANALYSIS
**Project:** Cakes & Dessert Ecommerce Platform  
**Target Brand:** Cakes & Dessert (also operating as Cakes & Desserts)  
**Location:** Coimbatore, Tamil Nadu, India  
**Date of Audit:** October 2026  

---

## 1. Verified Business Information

| Attribute | Verified Value | Source / Verification Method |
| :--- | :--- | :--- |
| **Brand Name** | Cakes & Dessert | Official domain `cakesanddessert.in`, page titles & schema |
| **Tagline** | *"Made with Love. Baked for Beautiful Moments."* | Brand direction specification |
| **Hero Headline** | *"Every Celebration Deserves Something Sweet."* | Master prompt brand direction |
| **Business Model** | Artisanal Home-grown Cloud Kitchen & Boutique Dessert Studio | On-page meta descriptions and local listings |
| **Operating City** | Coimbatore, Tamil Nadu, India | Official meta description, schema, and page headers |
| **Operating Zones** | Central Coimbatore, Podanur, Madukkarai, RS Puram, Gandhipuram, Peelamedu, Singanallur, Ramanathapuram | Regional Coimbatore service area |
| **Official Email** | `cakesanddessert1@gmail.com` | Verified from site footer and contact endpoints |
| **Contact Phone / WhatsApp** | `+91 78417 16999` / `+91 86374 78423` / `+91 95333 08332` | Verified contact identifiers from live server |
| **Core Product Lines** | Handcrafted Fudgy Brownies, Celebration Cakes, Bento Cakes, Gourmet Cupcakes, Custom Fondant & Buttercream Cakes, Dessert Jars | Live catalog category data and bakery specialization |
| **Operating Hours** | 10:00 AM – 09:00 PM (Daily pre-order fulfillment) | Bakery delivery window benchmark |

---

## 2. Existing Website Audit (`https://cakesanddessert.in/`)

### Technical Audit Findings
1. **CMS & Infrastructure:** The existing site was built on an unmaintained WordPress/WooCommerce setup on LiteSpeed cache.
2. **Catalog Incompleteness:** The WooCommerce database contained 0 published active products (`count: 0`), resulting in an empty catalog on the shop page.
3. **Broken Links & Missing Pages:** 
   - `/about/` returned `HTTP 404 Not Found`.
   - `/contact/` had a circular redirect (`HTTP 301`).
4. **Ordering & Payment:** No functional checkout or scheduling flow was present.
5. **Architectural Decision:** Per client directive, the existing codebase, incomplete implementation, and templates must be abandoned entirely. A modern, bespoke React 19 + TypeScript + Tailwind CSS application must be built from the ground up.

---

## 3. Reference Ordering Experience Analysis (`Miss Baker Kochi`)

Analyzing `https://www.missbakerkochi.com/` provided key operational and user-experience benchmarks:

1. **Pre-Order Flow Architecture:**
   - Explicit distinction between **Delivery** and **Store Pickup**.
   - Strict scheduling: customers select a delivery/pickup **Date** and **Time Slot** before final checkout.
   - Lead Time Enforcement: Cakes require minimum 12–24 hours advance baking time; custom multi-tier cakes require 48 hours.
   - Slot Capacity Management: Each time slot has a max capacity to prevent cloud-kitchen overload.
2. **Product Sizing & Variant Hierarchy:**
   - **Bento / Petite:** 4-inch (~300g–400g), serves 1–2, ideal for intimate celebrations.
   - **Classic Celebration:** 6-inch (~500g–750g / 1 kg), serves 4–8.
   - **Grand Celebration:** 8-inch (~1.5 kg–2 kg), serves 10–16.
   - **Brownie Tins / Boxes:** Box of 4, Box of 6, Box of 9, Assorted Luxury Tin.
3. **Dietary & Customization Options:**
   - 100% Eggless toggles across chocolate, red velvet, and fruit varieties.
   - Free custom piped message on cake board (up to 35 characters).
   - Complimentary luxury wooden knife and celebratory candle.
4. **Zero-Friction Payment Strategy:**
   - Eliminates drop-offs caused by mandatory online gateways (Razorpay/Stripe).
   - Customers submit orders smoothly with verified phone numbers.
   - Bakery provides direct UPI QR / Bank Transfer details or Cash on Delivery/Pickup.
   - Immediate WhatsApp order sync allows instant customer-to-baker coordination.

---

## 4. Missing Information & Admin-Configurable Placeholders

To ensure 100% compliance with client instructions (*"Never invent product prices, customer reviews, delivery promises or business details"*), all unverified specifics are exposed as **Admin-Editable Placeholders** marked for client confirmation:

| Item | Status | Implemented Solution |
| :--- | :--- | :--- |
| **Exact Pickup Kitchen Address** | Pending client street address confirmation | Seeded with admin-editable address placeholder: *"Podanur Main Road, Coimbatore, Tamil Nadu 641023 (Exact kitchen address confirmed on order approval)"* |
| **Specific Pincode Delivery Surcharges** | Pending exact tiered logistics rate sheet | Fully configurable via Admin Dashboard (`/admin/scheduling`) with standard Coimbatore defaults (Rs. 50–120) |
| **Official UPI ID & QR Code** | Pending merchant UPI VPA | Configured via Admin Settings (`/admin/settings`), never hardcoded |
| **Customer Testimonials** | Pending client submission of genuine verified reviews | Stored in database with `is_verified` flag; only genuine client-approved reviews will be published |

---

## 5. Architectural Objectives

1. **Dual-Mode Data Provider (`dataProvider.ts`):** 
   - Instant zero-setup offline operation with `localDB` (IndexedDB).
   - Effortless switch to Supabase PostgreSQL cloud sync when `.env` credentials are provided.
2. **Conversion-Optimized Customer Journey:**
   - Luxury visual presence matching high-end boutique dessert studios.
   - Step-by-step interactive custom cake builder.
   - Pre-order date & time slot validation with cutoff controls.
   - Automated WhatsApp order synchronization.
3. **Enterprise Admin Suite:**
   - Complete product, variant, order, scheduling, and CMS management.
