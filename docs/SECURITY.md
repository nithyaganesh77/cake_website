# SECURITY & DATA PROTECTION SPECIFICATION
**Project:** Cakes & Dessert Luxury Boutique Platform

---

## 1. Authentication & Role-Based Access Control (RBAC)

1. **Supabase Auth Integration:**
   - Admin authentication utilizes trusted Supabase email/password sessions.
   - Authorization is verified server-side against the `public.profiles` role column (`role = 'admin'`).
   - The helper function `public.is_admin()` enforces security definer access on all PostgreSQL tables.
2. **Local Development Safety:**
   - In Local Demo Mode (when Supabase credentials are not present in `.env`), administration access uses an explicit session token rather than client-exposed hardcoded credentials.
   - Unauthorized users attempting to navigate to `/admin` are immediately intercepted by `AdminAuthContext` and presented with the authenticated gateway.
3. **No Hidden Link Security Assumption:**
   - Navigation links are not treated as a security boundary; all backend mutations verify RLS or provider authorization.

---

## 2. IDOR Protection (Insecure Direct Object References)

- **Sequential ID Mitigation:**
  - Order numbers are generated using timestamped random hashes (e.g. `CND-2026-8921`) rather than predictable auto-incrementing integers (`1, 2, 3...`).
- **Cryptographic Tracking Tokens:**
  - Every order generates an unguessable `tracking_token` (e.g. `trk_a8f9x2_1698293123`).
  - The customer order tracking endpoint (`/track-order`) strictly requires both the Order Number and either the matching tracking token or the customer's verified phone number.
  - Customers cannot inspect other users' orders or customer data.

---

## 3. Input Validation & Spam Mitigation

- **Zod Schema Validation:**
  - All form inputs (Checkout, Custom Cake Builder, Bulk Orders, Contact) undergo strict runtime validation via Zod schemas (`src/schemas/orderSchema.ts`).
  - Phone validation strictly enforces Indian 10-digit mobile phone numbers starting with 6, 7, 8, or 9 (`/^(?:(?:\+|0{0,2})91(\s*[-]\s*)?|[0]?)?[6789]\d{9}$/`).
  - Pincode validation enforces valid 6-digit Indian Postal Codes (`/^[1-9][0-9]{5}$/`).
- **Honeypot Anti-Spam:**
  - Contact and enquiry forms feature invisible honeypot fields (`website_url`). Automated spambots that populate hidden fields are rejected silently without processing.

---

## 4. File Upload & Storage Security

- Reference images uploaded via the Custom Cake Builder are restricted:
  - Allowed MIME types: `image/jpeg`, `image/png`, `image/webp`.
  - Client-side and server-side size limitation: Maximum 5MB per upload.
  - Safe sanitized file names generated with unique timestamps.

---

## 5. HTTP Security Headers (Cloudflare Pages)

Configured under `public/_headers`:
```http
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=()
  Strict-Transport-Security: max-age=31536000; includeSubDomains; preload

/assets/*
  Cache-Control: public, max-age=31536000, immutable
```

