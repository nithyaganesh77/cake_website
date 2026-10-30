import { supabase } from './supabaseClient';
import {
  Category,
  Product,
  Order,
  CustomCakeRequest,
  BulkOrderRequest,
  DeliveryArea,
  TimeSlot,
  SiteSettings,
  OrderStatus,
  PaymentStatus,
} from '@/types';
import { INITIAL_SETTINGS } from '@/data/initialData';

function getClient() {
  if (!supabase) {
    throw new Error('Supabase client is not configured.');
  }
  return supabase;
}

export const SupabaseProvider = {
  async getCategories(): Promise<Category[]> {
    const client = getClient();
    const { data, error } = await client
      .from('categories')
      .select('*')
      .order('display_order', { ascending: true });
    if (error) throw error;
    return data || [];
  },

  async saveCategory(category: Category): Promise<Category> {
    const client = getClient();
    const { data, error } = await client
      .from('categories')
      .upsert(category)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async deleteCategory(id: string): Promise<void> {
    const client = getClient();
    const { error } = await client.from('categories').delete().eq('id', id);
    if (error) throw error;
  },

  async getProducts(): Promise<Product[]> {
    const client = getClient();
    const { data, error } = await client.from('products').select('*');
    if (error) throw error;
    return data || [];
  },

  async getProductBySlug(slug: string): Promise<Product | null> {
    const client = getClient();
    const { data, error } = await client
      .from('products')
      .select('*')
      .eq('slug', slug)
      .maybeSingle();
    if (error) throw error;
    return data;
  },

  async getProductById(id: string): Promise<Product | null> {
    const client = getClient();
    const { data, error } = await client
      .from('products')
      .select('*')
      .eq('id', id)
      .maybeSingle();
    if (error) throw error;
    return data;
  },

  async saveProduct(product: Product): Promise<Product> {
    const client = getClient();
    const { data, error } = await client
      .from('products')
      .upsert(product)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async deleteProduct(id: string): Promise<void> {
    const client = getClient();
    const { error } = await client.from('products').delete().eq('id', id);
    if (error) throw error;
  },

  async getOrders(): Promise<Order[]> {
    const client = getClient();
    const { data, error } = await client
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  },

  async getOrderById(id: string): Promise<Order | null> {
    const client = getClient();
    const { data, error } = await client
      .from('orders')
      .select('*')
      .eq('id', id)
      .maybeSingle();
    if (error) throw error;
    return data;
  },

  async getOrderByTracking(orderNumber: string, trackingTokenOrPhone: string): Promise<Order | null> {
    const client = getClient();
    const normalizedInput = trackingTokenOrPhone.trim();
    const normalizedOrderNo = orderNumber.trim().toUpperCase();

    // Query by order_number and tracking_token or customer_phone
    const { data, error } = await client
      .from('orders')
      .select('*')
      .eq('order_number', normalizedOrderNo)
      .or(`tracking_token.eq.${normalizedInput},customer_phone.ilike.%${normalizedInput}%`)
      .maybeSingle();

    if (error) throw error;
    return data;
  },

  async createOrder(data: Omit<Order, 'id' | 'created_at' | 'updated_at'>): Promise<Order> {
    const client = getClient();
    const { data: created, error } = await client
      .from('orders')
      .insert([data])
      .select()
      .single();
    if (error) throw error;
    return created;
  },

  async updateOrderStatus(orderId: string, status: OrderStatus, internalNotes?: string): Promise<Order> {
    const client = getClient();
    const updates: Record<string, unknown> = {
      order_status: status,
      updated_at: new Date().toISOString(),
    };
    if (internalNotes !== undefined) {
      updates.internal_notes = internalNotes;
    }
    const { data, error } = await client
      .from('orders')
      .update(updates)
      .eq('id', orderId)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async updatePaymentStatus(orderId: string, status: PaymentStatus): Promise<Order> {
    const client = getClient();
    const { data, error } = await client
      .from('orders')
      .update({ payment_status: status, updated_at: new Date().toISOString() })
      .eq('id', orderId)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async getCustomCakeRequests(): Promise<CustomCakeRequest[]> {
    const client = getClient();
    const { data, error } = await client
      .from('custom_cake_requests')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  },

  async createCustomCakeRequest(
    data: Omit<CustomCakeRequest, 'id' | 'reference_number' | 'created_at' | 'status'>
  ): Promise<CustomCakeRequest> {
    const client = getClient();
    const refNum = `CND-CAKE-${Math.floor(1000 + Math.random() * 9000)}`;
    const { data: created, error } = await client
      .from('custom_cake_requests')
      .insert([{ ...data, reference_number: refNum, status: 'submitted' }])
      .select()
      .single();
    if (error) throw error;
    return created;
  },

  async updateCustomCakeRequest(id: string, updates: Partial<CustomCakeRequest>): Promise<CustomCakeRequest> {
    const client = getClient();
    const { data, error } = await client
      .from('custom_cake_requests')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async getBulkOrderRequests(): Promise<BulkOrderRequest[]> {
    const client = getClient();
    const { data, error } = await client
      .from('bulk_order_requests')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  },

  async createBulkOrderRequest(
    data: Omit<BulkOrderRequest, 'id' | 'reference_number' | 'created_at' | 'status'>
  ): Promise<BulkOrderRequest> {
    const client = getClient();
    const refNum = `CND-BULK-${Math.floor(1000 + Math.random() * 9000)}`;
    const { data: created, error } = await client
      .from('bulk_order_requests')
      .insert([{ ...data, reference_number: refNum, status: 'pending' }])
      .select()
      .single();
    if (error) throw error;
    return created;
  },

  async updateBulkOrderRequest(id: string, updates: Partial<BulkOrderRequest>): Promise<BulkOrderRequest> {
    const client = getClient();
    const { data, error } = await client
      .from('bulk_order_requests')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async getDeliveryAreas(): Promise<DeliveryArea[]> {
    const client = getClient();
    const { data, error } = await client.from('delivery_areas').select('*');
    if (error) throw error;
    return data || [];
  },

  async saveDeliveryArea(area: DeliveryArea): Promise<DeliveryArea> {
    const client = getClient();
    const { data, error } = await client
      .from('delivery_areas')
      .upsert(area)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async deleteDeliveryArea(id: string): Promise<void> {
    const client = getClient();
    const { error } = await client.from('delivery_areas').delete().eq('id', id);
    if (error) throw error;
  },

  async getTimeSlots(): Promise<TimeSlot[]> {
    const client = getClient();
    const { data, error } = await client.from('time_slots').select('*');
    if (error) throw error;
    return data || [];
  },

  async saveTimeSlot(slot: TimeSlot): Promise<TimeSlot> {
    const client = getClient();
    const { data, error } = await client
      .from('time_slots')
      .upsert(slot)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async getSiteSettings(): Promise<SiteSettings> {
    const client = getClient();
    const { data, error } = await client
      .from('site_settings')
      .select('*')
      .eq('key', 'main_settings')
      .maybeSingle();
    if (error) throw error;
    if (data && data.value) {
      return data.value as SiteSettings;
    }
    return INITIAL_SETTINGS;
  },

  async updateSiteSettings(settings: Partial<SiteSettings>): Promise<SiteSettings> {
    const client = getClient();
    const current = await this.getSiteSettings();
    const updated = { ...current, ...settings };
    const { error } = await client
      .from('site_settings')
      .upsert({ key: 'main_settings', value: updated });
    if (error) throw error;
    return updated;
  },

  async uploadImage(file: File, folder: string): Promise<string> {
    const client = getClient();
    const ext = file.name.split('.').pop();
    const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${ext}`;
    const { error: uploadError } = await client.storage
      .from('bakery-media')
      .upload(fileName, file, { cacheControl: '3600', upsert: false });
    if (uploadError) throw uploadError;

    const { data } = client.storage.from('bakery-media').getPublicUrl(fileName);
    return data.publicUrl;
  },
};

