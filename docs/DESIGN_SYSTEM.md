# LUXURY DESIGN SYSTEM — CAKES & DESSERT
**Visual Identity & Design Tokens**  
**Design Direction:** Luxury Bakery × Editorial Food Photography × Boutique Ecommerce

---

## 1. Colour Architecture & Distribution

The colour palette evokes warm chocolate, velvety creams, and delicate blush confectionery.

| Token Name | Hex Code | Role | Intended Distribution |
| :--- | :--- | :--- | :--- |
| **Vanilla Cream** | `#FFF7F0` | Primary app canvas & soft section background | ~35% |
| **Pure White** | `#FFFFFF` | Card surfaces, modals, elevated panels | ~15% |
| **Chocolate Brown** | `#4B2923` | Primary brand headers, hero text, primary buttons | ~20% |
| **Dark Chocolate** | `#2F1916` | Deep footer, high-contrast banner overlays | ~5% |
| **Cocoa Brown** | `#8A554D` | Secondary typography, sub-headings, icons | ~5% |
| **Blush Pink** | `#E9AEBB` | Primary interactive accents, badges, highlights | ~10% |
| **Light Pink** | `#F7DCE2` | Soft tag backgrounds, decorative pill containers | ~5% |
| **Latte Beige** | `#D7BFAE` | Subtle borders, dividers, subtle neutral fills | ~10% |

### Strategic Balance
- **Cream & White (~50%):** Ensures breathable whitespace, pristine editorial feel, and legibility.
- **Chocolate Brown (~25%):** Anchors luxury authority, grounding call-to-actions and typography.
- **Blush & Light Pink (~15%):** Adds sweetness, celebration warmth, and boutique delicacy.
- **Latte Beige (~10%):** Provides natural organic borders without harsh greys.

---

## 2. Typography Hierarchy

### Font Families
1. **Headings & Editorial Display:** `Playfair Display`, serif  
   - Weight: `600 SemiBold` / `700 Bold` / `Italic accents`
   - Expresses artisanal craftsmanship, high-end patisserie elegance.
2. **Body & Controls:** `DM Sans`, sans-serif  
   - Weight: `400 Regular` / `500 Medium` / `600 SemiBold`
   - Highly legible at small mobile sizes for pricing, ingredients, and form controls.

### Scale
- **Display 1 (Hero Title):** `text-4xl md:text-6xl lg:text-7xl font-serif tracking-tight leading-[1.1]`
- **Heading 1 (Section Title):** `text-3xl md:text-5xl font-serif tracking-tight text-[#4B2923]`
- **Heading 2 (Card Title):** `text-xl md:text-2xl font-serif font-semibold text-[#4B2923]`
- **Body Large:** `text-lg text-[#4B2923]/80 leading-relaxed`
- **Body Base:** `text-base text-[#4B2923]/75 leading-normal`
- **Body Small / Microcopy:** `text-sm text-[#8A554D]`
- **Price Tag:** `text-lg md:text-xl font-bold text-[#4B2923]`

---

## 3. Surface & Elevation Tokens

- **Card Elevation:** `shadow-[0_8px_30px_rgb(75,41,35,0.06)]`
- **Hover Elevation:** `shadow-[0_16px_40px_rgb(75,41,35,0.12)]`
- **Border Treatment:** `1px solid #D7BFAE / 30%` (warm subtle stroke, never cold gray)
- **Border Radii:**
  - Buttons & Pills: `rounded-full` (40px)
  - Product Cards: `rounded-3xl` (24px)
  - Form Inputs & Selectors: `rounded-xl` (12px)
  - Modals & Drawers: `rounded-3xl` or top-rounded on mobile

---

## 4. UI Component Library Specifications

### Buttons
1. **Primary Button:**
   - Background: `#4B2923`
   - Text: `#FFFFFF`
   - Hover: `#2F1916` with gentle scale `1.02`
   - Padding: `px-8 py-3.5`
   - Shape: `rounded-full font-medium`
2. **Secondary / Outline Button:**
   - Border: `1.5px solid #4B2923`
   - Background: `transparent`
   - Text: `#4B2923`
   - Hover: Background `#F7DCE2`
3. **Accent Pill CTA:**
   - Background: `#E9AEBB`
   - Text: `#2F1916`
   - Hover: `#E19AA9`

### Product Cards
- Image aspect ratio `4:3` or `1:1` with smooth hover zoom (`scale-105 duration-500`).
- Elegant dietary pills: Eggless (Leaf green accent), Chef Signature (Blush badge).
- Subtle action overlay on hover: Quick View, Add to Pre-Order.
- Dynamic price display (e.g. `₹650` for 500g, dynamic calculation).

### Forms & Input Fields
- Background: `#FFFFFF`
- Border: `1.5px solid #D7BFAE`
- Focus State: `border-[#8A554D] ring-2 ring-[#E9AEBB]/40 outline-none`
- Label: `text-xs font-semibold uppercase tracking-wider text-[#8A554D]`

---

## 5. Animation Guidelines (Motion)

- **Duration:** Micro-interactions (150ms–250ms), page reveals (400ms–600ms).
- **Easing:** `[0.22, 1, 0.36, 1]` (luxurious cubic bezier).
- **Reduced Motion:** Fully honors `prefers-reduced-motion` media queries with simple opacity fallbacks.
- **Key Interactivities:**
  - Hero staggered headline reveal.
  - Cart drawer slide-in from right with backdrop blur.
  - Interactive multi-step cake builder with forward/backward slide transitions.
  - Quick toast notifications on cart updates.

