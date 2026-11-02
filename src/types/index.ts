// Core Domain Types for Cakes & Dessert Luxury Platform

export type DeliveryMethod = 'delivery' | 'pickup' | 'local_delivery' | 'courier';

export type OrderStatus =
  | 'pending'
  | 'contacted'
  | 'confirmed'
  | 'preparing'
  | 'ready'
  | 'out_for_delivery'
  | 'completed'
  | 'cancelled';

export type PaymentStatus =
  | 'unpaid'
  | 'payment_pending'
  | 'partially_paid'
  | 'paid'
  | 'refunded';

export type PaymentMethodPreference =
  | 'upi'
  | 'bank_transfer'
  | 'cash_on_delivery'
  | 'cash_on_pickup';

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  display_order: number;
  is_active: boolean;
}

export interface ProductVariant {
  id: string;
  name: string;
  weight_grams?: number;
  weight_label: string; // e.g., "500g / 6 inch", "1 Kg / 8 inch", "Box of 6"
  price: number;
  serves_label?: string; // e.g., "Serves 4-6", "Serves 10-12"
  is_default?: boolean;
}

export interface ProductCustomizationOption {
  allow_eggless: boolean;
  eggless_surcharge: number;
  allow_message: boolean;
  max_message_chars: number;
  available_flavors?: string[];
  allow_topper?: boolean;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  category_id: string;
  category_name?: string;
  base_price: number;
  price_on_request?: boolean;
  images: string[];
  is_featured: boolean;
  is_bestseller: boolean;
  is_new: boolean;
  is_available: boolean;
  preparation_time_hours: number;
  min_order_hours: number;
  dietary_flags: {
    is_eggless_available: boolean;
    is_vegan_available?: boolean;
    contains_nuts?: boolean;
  };
  variants: ProductVariant[];
  customization: ProductCustomizationOption;
  ingredients?: string[];
  storage_instructions?: string;
}

export interface CartItem {
  id: string;
  product: Product;
  selected_variant: ProductVariant;
  is_eggless: boolean;
  custom_message?: string;
  quantity: number;
  unit_price: number;
  total_price: number;
}

export interface TimeSlot {
  id: string;
  label: string;
  start_time: string;
  end_time: string;
  max_orders: number;
  is_active: boolean;
}

export interface DeliveryArea {
  id: string;
  pincode: string;
  area_name: string;
  delivery_fee: number;
  min_order_amount: number;
  is_active: boolean;
}

export interface OrderItemSnapshot {
  product_id: string;
  product_name: string;
  variant_id: string;
  variant_name: string;
  variant_weight: string;
  is_eggless: boolean;
  custom_message?: string;
  unit_price: number;
  quantity: number;
  total_price: number;
  image: string;
}

export interface Order {
  id: string;
  order_number: string;
  tracking_token: string;
  customer_name: string;
  customer_phone: string;
  customer_email?: string;
  delivery_method: DeliveryMethod;
  delivery_address?: string;
  delivery_pincode?: string;
  delivery_landmark?: string;
  delivery_city?: string;
  delivery_state?: string;
  google_maps_link?: string;
  scheduled_date: string; // YYYY-MM-DD
  scheduled_slot_id: string;
  scheduled_slot_label: string;
  items: OrderItemSnapshot[];
  subtotal: number;
  delivery_fee: number;
  discount_amount: number;
  total_amount: number;
  payment_method_preference: PaymentMethodPreference;
  payment_status: PaymentStatus;
  order_status: OrderStatus;
  special_instructions?: string;
  internal_notes?: string;
  created_at: string;
  updated_at: string;
}

export interface CustomCakeRequest {
  id: string;
  reference_number: string;
  customer_name: string;
  customer_phone: string;
  customer_email?: string;
  cake_type: string;
  flavor: string;
  size_or_servings: string;
  theme_or_occasion: string;
  color_palette: string;
  message_on_cake?: string;
  reference_image_url?: string;
  required_date: string;
  delivery_method: DeliveryMethod;
  additional_notes?: string;
  estimated_budget?: string;
  status: 'submitted' | 'quote_sent' | 'approved' | 'declined';
  quoted_price?: number;
  created_at: string;
}

export interface BulkOrderRequest {
  id: string;
  reference_number: string;
  customer_name: string;
  customer_phone: string;
  customer_email: string;
  event_type: 'wedding' | 'corporate' | 'birthday' | 'return_gifts' | 'celebration' | 'other';
  event_date: string;
  estimated_quantity: number | string;
  product_requirements: string;
  budget_range?: string;
  delivery_location: string;
  additional_notes?: string;
  status: 'pending' | 'contacted' | 'confirmed' | 'closed';
  created_at: string;
}

export interface HolidayClosure {
  id: string;
  date: string; // YYYY-MM-DD
  reason: string;
}

export interface SiteSettings {
  store_name: string;
  tagline: string;
  hero_headline: string;
  hero_description: string;
  phone_numbers: string[];
  whatsapp_number: string;
  email: string;
  address_pickup: string;
  operating_hours: string;
  instagram_url: string;
  min_advance_order_hours: number;
  same_day_cutoff_hour: number;
  upi_id: string;
  upi_recipient_name: string;
  bank_transfer_details: string;
  cash_on_pickup_enabled: boolean;
  cash_on_delivery_enabled: boolean;
  free_delivery_threshold: number;
  swiggy_direct_url?: string;
  courier_delivery_enabled?: boolean;
}

