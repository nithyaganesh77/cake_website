import { isSupabaseConfigured } from './supabaseClient';
import { SupabaseProvider } from './supabaseProvider';
import { LocalDBProvider } from './localDBProvider';
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

export type ProviderMode = 'supabase' | 'local';

class DataProviderService {
  private mode: ProviderMode;

  constructor() {
    this.mode = isSupabaseConfigured ? 'supabase' : 'local';
    console.info(
      `[DataProvider] Initialized in ${this.mode === 'supabase' ? 'CLOUD (Supabase)' : 'LOCAL (IndexedDB Demo)'} mode.`
    );
  }

  public getProviderMode(): ProviderMode {
    return this.mode;
  }

  public isCloud(): boolean {
    return this.mode === 'supabase';
  }

  // Force local mode for testing/demo if needed
  public setProviderMode(mode: ProviderMode) {
    if (mode === 'supabase' && !isSupabaseConfigured) {
      throw new Error('Cannot switch to Supabase mode: Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY');
    }
    this.mode = mode;
  }

  private get active() {
    return this.mode === 'supabase' ? SupabaseProvider : LocalDBProvider;
  }

  // Categories
  async getCategories(): Promise<Category[]> {
    return this.active.getCategories();
  }

  async saveCategory(category: Category): Promise<Category> {
    return this.active.saveCategory(category);
  }

  async deleteCategory(id: string): Promise<void> {
    return this.active.deleteCategory(id);
  }

  // Products
  async getProducts(): Promise<Product[]> {
    return this.active.getProducts();
  }

  async getProductBySlug(slug: string): Promise<Product | null> {
    return this.active.getProductBySlug(slug);
  }

  async getProductById(id: string): Promise<Product | null> {
    return this.active.getProductById(id);
  }

  async saveProduct(product: Product): Promise<Product> {
    return this.active.saveProduct(product);
  }

  async deleteProduct(id: string): Promise<void> {
    return this.active.deleteProduct(id);
  }

  // Orders
  async getOrders(): Promise<Order[]> {
    return this.active.getOrders();
  }

  async getOrderById(id: string): Promise<Order | null> {
    return this.active.getOrderById(id);
  }

  async getOrderByTracking(orderNumber: string, trackingTokenOrPhone: string): Promise<Order | null> {
    return this.active.getOrderByTracking(orderNumber, trackingTokenOrPhone);
  }

  async createOrder(data: Omit<Order, 'id' | 'created_at' | 'updated_at'>): Promise<Order> {
    if (import.meta.env.VITE_APP_ENV === 'production' && !this.isCloud()) {
      throw new Error(
        'Cloud connection is unavailable. Order could not be securely saved. Please contact the bakery via WhatsApp or Phone to place your order directly.'
      );
    }
    return this.active.createOrder(data);
  }

  async updateOrderStatus(orderId: string, status: OrderStatus, internalNotes?: string): Promise<Order> {
    return this.active.updateOrderStatus(orderId, status, internalNotes);
  }

  async updatePaymentStatus(orderId: string, status: PaymentStatus): Promise<Order> {
    return this.active.updatePaymentStatus(orderId, status);
  }

  // Custom Cakes
  async getCustomCakeRequests(): Promise<CustomCakeRequest[]> {
    return this.active.getCustomCakeRequests();
  }

  async createCustomCakeRequest(
    data: Omit<CustomCakeRequest, 'id' | 'reference_number' | 'created_at' | 'status'>
  ): Promise<CustomCakeRequest> {
    return this.active.createCustomCakeRequest(data);
  }

  async updateCustomCakeRequest(id: string, updates: Partial<CustomCakeRequest>): Promise<CustomCakeRequest> {
    return this.active.updateCustomCakeRequest(id, updates);
  }

  // Bulk Orders
  async getBulkOrderRequests(): Promise<BulkOrderRequest[]> {
    return this.active.getBulkOrderRequests();
  }

  async createBulkOrderRequest(
    data: Omit<BulkOrderRequest, 'id' | 'reference_number' | 'created_at' | 'status'>
  ): Promise<BulkOrderRequest> {
    return this.active.createBulkOrderRequest(data);
  }

  async updateBulkOrderRequest(id: string, updates: Partial<BulkOrderRequest>): Promise<BulkOrderRequest> {
    return this.active.updateBulkOrderRequest(id, updates);
  }

  // Delivery & Scheduling
  async getDeliveryAreas(): Promise<DeliveryArea[]> {
    return this.active.getDeliveryAreas();
  }

  async saveDeliveryArea(area: DeliveryArea): Promise<DeliveryArea> {
    return this.active.saveDeliveryArea(area);
  }

  async deleteDeliveryArea(id: string): Promise<void> {
    return this.active.deleteDeliveryArea(id);
  }

  async getTimeSlots(): Promise<TimeSlot[]> {
    return this.active.getTimeSlots();
  }

  async saveTimeSlot(slot: TimeSlot): Promise<TimeSlot> {
    return this.active.saveTimeSlot(slot);
  }

  // Settings
  async getSiteSettings(): Promise<SiteSettings> {
    return this.active.getSiteSettings();
  }

  async updateSiteSettings(settings: Partial<SiteSettings>): Promise<SiteSettings> {
    return this.active.updateSiteSettings(settings);
  }

  // Image upload
  async uploadImage(file: File, folder: 'products' | 'custom_requests' | 'cms'): Promise<string> {
    return this.active.uploadImage(file, folder);
  }
}

export const dataProvider = new DataProviderService();

