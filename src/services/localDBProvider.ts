import { openDB, IDBPDatabase } from 'idb';
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
import {
  INITIAL_CATEGORIES,
  INITIAL_PRODUCTS,
  INITIAL_DELIVERY_AREAS,
  INITIAL_TIME_SLOTS,
  INITIAL_SETTINGS,
} from '@/data/initialData';

const DB_NAME = 'cakes_and_dessert_local_db';
const DB_VERSION = 1;

let dbPromise: Promise<IDBPDatabase> | null = null;

function getDB(): Promise<IDBPDatabase> {
  if (!dbPromise) {
    dbPromise = openDB(DB_NAME, DB_VERSION, {
      upgrade(db) {
        if (!db.objectStoreNames.contains('categories')) {
          db.createObjectStore('categories', { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains('products')) {
          db.createObjectStore('products', { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains('orders')) {
          const orderStore = db.createObjectStore('orders', { keyPath: 'id' });
          orderStore.createIndex('by_order_number', 'order_number', { unique: true });
          orderStore.createIndex('by_tracking_token', 'tracking_token', { unique: false });
        }
        if (!db.objectStoreNames.contains('custom_requests')) {
          db.createObjectStore('custom_requests', { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains('bulk_requests')) {
          db.createObjectStore('bulk_requests', { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains('delivery_areas')) {
          db.createObjectStore('delivery_areas', { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains('time_slots')) {
          db.createObjectStore('time_slots', { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains('site_settings')) {
          db.createObjectStore('site_settings', { keyPath: 'key' });
        }
        if (!db.objectStoreNames.contains('uploaded_images')) {
          db.createObjectStore('uploaded_images', { keyPath: 'id' });
        }
      },
    });
  }
  return dbPromise;
}

// Seed initial data if store is empty
async function ensureInitialized() {
  const db = await getDB();
  const catCount = await db.count('categories');
  if (catCount === 0) {
    const tx = db.transaction(['categories', 'products', 'delivery_areas', 'time_slots', 'site_settings'], 'readwrite');
    for (const cat of INITIAL_CATEGORIES) {
      await tx.objectStore('categories').put(cat);
    }
    for (const prod of INITIAL_PRODUCTS) {
      await tx.objectStore('products').put(prod);
    }
    for (const area of INITIAL_DELIVERY_AREAS) {
      await tx.objectStore('delivery_areas').put(area);
    }
    for (const slot of INITIAL_TIME_SLOTS) {
      await tx.objectStore('time_slots').put(slot);
    }
    await tx.objectStore('site_settings').put({ key: 'main_settings', ...INITIAL_SETTINGS });
    await tx.done;
  } else {
    // Seamlessly sync new initial categories, courier products and updated phone/swiggy settings
    const courierCat = await db.get('categories', 'cat-courier-slabs');
    if (!courierCat) {
      const tx = db.transaction(['categories', 'products', 'site_settings'], 'readwrite');
      for (const cat of INITIAL_CATEGORIES) {
        await tx.objectStore('categories').put(cat);
      }
      for (const prod of INITIAL_PRODUCTS) {
        await tx.objectStore('products').put(prod);
      }
      await tx.objectStore('site_settings').put({ key: 'main_settings', ...INITIAL_SETTINGS });
      await tx.done;
    }
  }
}

export const LocalDBProvider = {
  async getCategories(): Promise<Category[]> {
    await ensureInitialized();
    const db = await getDB();
    const categories = await db.getAll('categories');
    return categories.sort((a, b) => a.display_order - b.display_order);
  },

  async saveCategory(category: Category): Promise<Category> {
    await ensureInitialized();
    const db = await getDB();
    const item = { ...category, id: category.id || `cat-${Date.now()}` };
    await db.put('categories', item);
    return item;
  },

  async deleteCategory(id: string): Promise<void> {
    const db = await getDB();
    await db.delete('categories', id);
  },

  async getProducts(): Promise<Product[]> {
    await ensureInitialized();
    const db = await getDB();
    return db.getAll('products');
  },

  async getProductBySlug(slug: string): Promise<Product | null> {
    await ensureInitialized();
    const db = await getDB();
    const products: Product[] = await db.getAll('products');
    return products.find((p) => p.slug === slug) || null;
  },

  async getProductById(id: string): Promise<Product | null> {
    await ensureInitialized();
    const db = await getDB();
    const product = await db.get('products', id);
    return product || null;
  },

  async saveProduct(product: Product): Promise<Product> {
    await ensureInitialized();
    const db = await getDB();
    const item = {
      ...product,
      id: product.id || `prod-${Date.now()}`,
      slug: product.slug || product.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
    };
    await db.put('products', item);
    return item;
  },

  async deleteProduct(id: string): Promise<void> {
    const db = await getDB();
    await db.delete('products', id);
  },

  async getOrders(): Promise<Order[]> {
    await ensureInitialized();
    const db = await getDB();
    const orders: Order[] = await db.getAll('orders');
    return orders.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  },

  async getOrderById(id: string): Promise<Order | null> {
    await ensureInitialized();
    const db = await getDB();
    const order = await db.get('orders', id);
    return order || null;
  },

  async getOrderByTracking(orderNumber: string, trackingTokenOrPhone: string): Promise<Order | null> {
    await ensureInitialized();
    const db = await getDB();
    const orders: Order[] = await db.getAll('orders');
    const normalizedInput = trackingTokenOrPhone.trim().toLowerCase();
    const normalizedOrderNo = orderNumber.trim().toUpperCase();

    const match = orders.find((o) => {
      const matchOrderNo = o.order_number.toUpperCase() === normalizedOrderNo;
      const matchToken = o.tracking_token.toLowerCase() === normalizedInput;
      const matchPhone = o.customer_phone.replace(/\D/g, '').endsWith(normalizedInput.replace(/\D/g, ''));
      return matchOrderNo && (matchToken || matchPhone);
    });

    return match || null;
  },

  async createOrder(data: Omit<Order, 'id' | 'created_at' | 'updated_at'>): Promise<Order> {
    await ensureInitialized();
    const db = await getDB();
    const now = new Date().toISOString();
    const newOrder: Order = {
      ...data,
      id: `order-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      created_at: now,
      updated_at: now,
    };
    await db.put('orders', newOrder);
    return newOrder;
  },

  async updateOrderStatus(orderId: string, status: OrderStatus, internalNotes?: string): Promise<Order> {
    const db = await getDB();
    const order: Order | undefined = await db.get('orders', orderId);
    if (!order) throw new Error('Order not found');
    const updated: Order = {
      ...order,
      order_status: status,
      internal_notes: internalNotes !== undefined ? internalNotes : order.internal_notes,
      updated_at: new Date().toISOString(),
    };
    await db.put('orders', updated);
    return updated;
  },

  async updatePaymentStatus(orderId: string, status: PaymentStatus): Promise<Order> {
    const db = await getDB();
    const order: Order | undefined = await db.get('orders', orderId);
    if (!order) throw new Error('Order not found');
    const updated: Order = {
      ...order,
      payment_status: status,
      updated_at: new Date().toISOString(),
    };
    await db.put('orders', updated);
    return updated;
  },

  async getCustomCakeRequests(): Promise<CustomCakeRequest[]> {
    await ensureInitialized();
    const db = await getDB();
    const requests: CustomCakeRequest[] = await db.getAll('custom_requests');
    return requests.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  },

  async createCustomCakeRequest(
    data: Omit<CustomCakeRequest, 'id' | 'reference_number' | 'created_at' | 'status'>
  ): Promise<CustomCakeRequest> {
    await ensureInitialized();
    const db = await getDB();
    const now = new Date().toISOString();
    const refNum = `CND-CAKE-${Math.floor(1000 + Math.random() * 9000)}`;
    const newReq: CustomCakeRequest = {
      ...data,
      id: `cake-req-${Date.now()}`,
      reference_number: refNum,
      status: 'submitted',
      created_at: now,
    };
    await db.put('custom_requests', newReq);
    return newReq;
  },

  async updateCustomCakeRequest(id: string, updates: Partial<CustomCakeRequest>): Promise<CustomCakeRequest> {
    const db = await getDB();
    const req: CustomCakeRequest | undefined = await db.get('custom_requests', id);
    if (!req) throw new Error('Custom request not found');
    const updated = { ...req, ...updates };
    await db.put('custom_requests', updated);
    return updated;
  },

  async getBulkOrderRequests(): Promise<BulkOrderRequest[]> {
    await ensureInitialized();
    const db = await getDB();
    const list: BulkOrderRequest[] = await db.getAll('bulk_requests');
    return list.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  },

  async createBulkOrderRequest(
    data: Omit<BulkOrderRequest, 'id' | 'reference_number' | 'created_at' | 'status'>
  ): Promise<BulkOrderRequest> {
    await ensureInitialized();
    const db = await getDB();
    const now = new Date().toISOString();
    const refNum = `CND-BULK-${Math.floor(1000 + Math.random() * 9000)}`;
    const newReq: BulkOrderRequest = {
      ...data,
      id: `bulk-req-${Date.now()}`,
      reference_number: refNum,
      status: 'pending',
      created_at: now,
    };
    await db.put('bulk_requests', newReq);
    return newReq;
  },

  async updateBulkOrderRequest(id: string, updates: Partial<BulkOrderRequest>): Promise<BulkOrderRequest> {
    const db = await getDB();
    const req: BulkOrderRequest | undefined = await db.get('bulk_requests', id);
    if (!req) throw new Error('Bulk request not found');
    const updated = { ...req, ...updates };
    await db.put('bulk_requests', updated);
    return updated;
  },

  async getDeliveryAreas(): Promise<DeliveryArea[]> {
    await ensureInitialized();
    const db = await getDB();
    return db.getAll('delivery_areas');
  },

  async saveDeliveryArea(area: DeliveryArea): Promise<DeliveryArea> {
    await ensureInitialized();
    const db = await getDB();
    const item = { ...area, id: area.id || `area-${Date.now()}` };
    await db.put('delivery_areas', item);
    return item;
  },

  async deleteDeliveryArea(id: string): Promise<void> {
    const db = await getDB();
    await db.delete('delivery_areas', id);
  },

  async getTimeSlots(): Promise<TimeSlot[]> {
    await ensureInitialized();
    const db = await getDB();
    return db.getAll('time_slots');
  },

  async saveTimeSlot(slot: TimeSlot): Promise<TimeSlot> {
    await ensureInitialized();
    const db = await getDB();
    const item = { ...slot, id: slot.id || `slot-${Date.now()}` };
    await db.put('time_slots', item);
    return item;
  },

  async getSiteSettings(): Promise<SiteSettings> {
    await ensureInitialized();
    const db = await getDB();
    const record = await db.get('site_settings', 'main_settings');
    if (record) {
      const { key, ...settings } = record;
      return settings as SiteSettings;
    }
    return INITIAL_SETTINGS;
  },

  async updateSiteSettings(settings: Partial<SiteSettings>): Promise<SiteSettings> {
    await ensureInitialized();
    const db = await getDB();
    const current = await this.getSiteSettings();
    const updated = { ...current, ...settings };
    await db.put('site_settings', { key: 'main_settings', ...updated });
    return updated;
  },

  async uploadImage(file: File, folder: string): Promise<string> {
    await ensureInitialized();
    const db = await getDB();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = async () => {
        const base64 = reader.result as string;
        const id = `img-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
        await db.put('uploaded_images', {
          id,
          name: file.name,
          folder,
          data: base64,
          created_at: new Date().toISOString(),
        });
        resolve(base64);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  },
};

