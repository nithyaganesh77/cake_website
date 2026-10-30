# BAKERY OPERATIONS & ADMIN USER GUIDE
**Project:** Cakes & Dessert Management Portal  
**Portal URL:** `/admin`

---

## 1. Accessing the Portal

Navigate to `/admin` in any desktop or mobile browser.

### Authentication
1. **Cloud Mode (Production):**
   - Enter your registered bakery administrative email and password.
   - The system verifies your administrative privileges in Supabase.
2. **Local Demo Mode:**
   - Use `admin@cakesanddessert.in` (or click *"Fill Demo Admin Credentials"*).
   - Enter any password (e.g., `baker123`).

---

## 2. Managing Pre-Orders & Production (`/admin/orders`)

The Orders panel provides a real-time view of all customer orders.

### Production Workflow
1. **Pending Review:** A new customer has scheduled an order. Review items, customized messages, and requested date/time slot.
2. **Contacted / Confirmed:** Click the **WhatsApp** or **Phone** button to connect with the customer, confirm their order details, and request UPI payment confirmation. Update status to `Confirmed`.
3. **Preparing:** Move the order to `Preparing` when your bakers begin baking and decorating the cake.
4. **Ready:** Marked when the cake is boxed, chilled, and ready with knife and celebratory candles.
5. **Out for Delivery / Completed:** Selected when handed to the delivery driver or collected in-studio by the customer.

### Payment Status Tracking
Separate from production, update the payment status:
- `Payment Pending`: Awaiting customer UPI screenshot or transfer.
- `Paid`: Customer payment verified via UPI reference or cash.
- `Partially Paid` / `Refunded`: For customized changes.

### CSV Export
Click **"Export Orders (CSV)"** to download full production records for accounting or delivery driver manifests.

---

## 3. Product Catalog Management (`/admin/products`)

### Adding a New Cake or Dessert
1. Click **"Add New Dessert"**.
2. Enter the Product Name, Category, and Base Price.
3. Upload a photo or provide a high-resolution image URL.
4. Set the **Portion Variants** (e.g. 500g, 1 Kg, Box of 6).
5. Toggle **100% Eggless Option** and set minimum advance baking notice (e.g. 12 hours).
6. Click **Save Dessert**.

---

## 4. Custom Cake Builder Requests (`/admin/custom-requests`)

When customers design bespoke cakes via the website's Custom Cake Builder:
1. Review the theme, colors, flavor profile, and customer reference photo.
2. Enter your quoted price in **Official Chef Quotation (₹)** and click **Save Quote**.
3. Click **"Message Customer on WhatsApp"** to send the quotation directly to the customer's phone.

---

## 5. Fulfillment Slots & Delivery Zones (`/admin/scheduling`)

- **Time Slots:** Adjust morning, afternoon, and evening delivery windows, or set daily capacity limits (e.g., maximum 10 cakes per slot to prevent kitchen overload).
- **Delivery Pincodes:** Add or modify Coimbatore serviceable pincodes (e.g., RS Puram 641002, Podanur 641023, Peelamedu 641004) and their delivery charges.

---

## 6. Studio Settings & Offline Payment Info (`/admin/settings`)

- **UPI Details:** Update your bakery UPI VPA (`cakesanddessert@upi`) and recipient name.
- **Bank Transfer:** Update account number and IFSC for large corporate orders.
- **Contact Numbers:** Manage verified phone numbers displayed across the website and header.
