import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Calendar,
  Clock,
  Truck,
  Store,
  ShieldCheck,
  Sparkles,
  ShoppingBag,
  ArrowRight,
  Info,
  Check,
  AlertCircle,
  QrCode,
  Banknote,
  MapPin,
  Navigation,
  Package,
  MessageCircle,
} from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { dataProvider } from '@/services/dataProvider';
import { DeliveryArea, TimeSlot, SiteSettings, DeliveryMethod, PaymentMethodPreference, OrderItemSnapshot } from '@/types';
import { checkoutFormSchema, CheckoutFormData } from '@/schemas/orderSchema';

export const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { items, subtotal, clearCart } = useCart();

  const [deliveryAreas, setDeliveryAreas] = useState<DeliveryArea[]>([]);
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [siteSettings, setSiteSettings] = useState<SiteSettings | null>(null);
  const [isLoadingSettings, setIsLoadingSettings] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Parse initial delivery method from URL if navigated from Cart
  const initialMethod = searchParams.get('method');
  const resolvedInitialMethod: DeliveryMethod =
    initialMethod === 'courier' ? 'courier' : initialMethod === 'pickup' ? 'pickup' : 'local_delivery';

  // Checkout Form State
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>(resolvedInitialMethod);
  const [googleMapsLink, setGoogleMapsLink] = useState(searchParams.get('mapLink') || '');
  const [deliveryAddress, setDeliveryAddress] = useState(searchParams.get('address') || '');
  const [deliveryCity, setDeliveryCity] = useState(searchParams.get('city') || '');
  const [deliveryState, setDeliveryState] = useState(searchParams.get('state') || 'Tamil Nadu');
  const [deliveryPincode, setDeliveryPincode] = useState(searchParams.get('pincode') || '641023');
  const [deliveryLandmark, setDeliveryLandmark] = useState('');
  const [scheduledDate, setScheduledDate] = useState('');
  const [scheduledSlotId, setScheduledSlotId] = useState('');
  const [paymentPreference, setPaymentPreference] = useState<PaymentMethodPreference>('upi');
  const [specialInstructions, setSpecialInstructions] = useState('');

  // GPS Pin locator state
  const [isLocating, setIsLocating] = useState(false);
  const [locationError, setLocationError] = useState('');

  // Calculate minimum order preparation lead time across all items in cart
  const minLeadHours = useMemo(() => {
    if (items.length === 0) return 12;
    return Math.max(...items.map((i) => i.product.min_order_hours || 12));
  }, [items]);

  // Generate valid booking date string
  const minDateString = useMemo(() => {
    const leadMs = minLeadHours * 60 * 60 * 1000;
    const earliest = new Date(Date.now() + leadMs);
    return earliest.toISOString().split('T')[0];
  }, [minLeadHours]);

  useEffect(() => {
    async function init() {
      try {
        const [areas, slots, settings] = await Promise.all([
          dataProvider.getDeliveryAreas(),
          dataProvider.getTimeSlots(),
          dataProvider.getSiteSettings(),
        ]);
        setDeliveryAreas(areas);
        setTimeSlots(slots.filter((s) => s.is_active));
        setSiteSettings(settings);

        if (slots.length > 0) {
          setScheduledSlotId(slots[0].id);
        }
      } catch (err) {
        console.error('Failed to load checkout settings', err);
      } finally {
        setIsLoadingSettings(false);
      }
    }
    init();
  }, []);

  // Compute matched delivery fee based on fulfillment method & pincode
  const matchedArea = useMemo(() => {
    if (deliveryMethod === 'pickup' || deliveryMethod === 'courier') return null;
    return deliveryAreas.find((a) => a.pincode === deliveryPincode.trim() && a.is_active) || null;
  }, [deliveryAreas, deliveryPincode, deliveryMethod]);

  const deliveryFee = useMemo(() => {
    if (deliveryMethod === 'pickup') return 0;
    if (siteSettings?.free_delivery_threshold && subtotal >= siteSettings.free_delivery_threshold) {
      return 0; // Free delivery threshold met!
    }
    if (deliveryMethod === 'courier') {
      return 120; // Standard express courier packaging & shipping across India
    }
    return matchedArea ? matchedArea.delivery_fee : 80; // Standard Coimbatore zone fee
  }, [deliveryMethod, matchedArea, siteSettings, subtotal]);

  const finalTotal = subtotal + deliveryFee;

  // Selected Slot details
  const selectedSlot = timeSlots.find((s) => s.id === scheduledSlotId);

  // Auto-detect GPS location link for Coimbatore delivery
  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by your browser.');
      return;
    }
    setIsLocating(true);
    setLocationError('');
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const link = `https://www.google.com/maps?q=${latitude.toFixed(6)},${longitude.toFixed(6)}`;
        setGoogleMapsLink(link);
        setIsLocating(false);
      },
      () => {
        setIsLocating(false);
        setLocationError('Could not auto-detect GPS. Please open Google Maps, tap your pin, click Share, and paste the link here.');
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    if (items.length === 0) {
      alert('Your cart is empty. Please add treats before checkout.');
      navigate('/shop');
      return;
    }

    const isLocalDelivery = deliveryMethod === 'local_delivery' || deliveryMethod === 'delivery';
    const isCourier = deliveryMethod === 'courier';

    const payload: CheckoutFormData = {
      customer_name: customerName,
      customer_phone: customerPhone,
      customer_email: customerEmail || undefined,
      delivery_method: deliveryMethod,
      google_maps_link: isLocalDelivery ? googleMapsLink : undefined,
      delivery_address: isCourier ? deliveryAddress : (deliveryAddress || undefined),
      delivery_city: isCourier ? deliveryCity : 'Coimbatore',
      delivery_state: isCourier ? deliveryState : 'Tamil Nadu',
      delivery_pincode: isCourier ? deliveryPincode : (deliveryPincode || undefined),
      delivery_landmark: deliveryLandmark || undefined,
      scheduled_date: scheduledDate,
      scheduled_slot_id: scheduledSlotId,
      payment_method_preference: paymentPreference,
      special_instructions: specialInstructions || undefined,
    };

    const validation = checkoutFormSchema.safeParse(payload);
    if (!validation.success) {
      const fieldErrors: Record<string, string> = {};
      validation.error.issues.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as string] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      const orderNumber = `CND-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
      const trackingToken = `trk_${Math.random().toString(36).substring(2, 10)}_${Date.now()}`;

      const snapshotItems: OrderItemSnapshot[] = items.map((item) => ({
        product_id: item.product.id,
        product_name: item.product.name,
        variant_id: item.selected_variant.id,
        variant_name: item.selected_variant.name,
        variant_weight: item.selected_variant.weight_label,
        is_eggless: item.is_eggless,
        custom_message: item.custom_message,
        unit_price: item.unit_price,
        quantity: item.quantity,
        total_price: item.total_price,
        image: item.product.images[0],
      }));

      const createdOrder = await dataProvider.createOrder({
        order_number: orderNumber,
        tracking_token: trackingToken,
        customer_name: customerName,
        customer_phone: customerPhone,
        customer_email: customerEmail || undefined,
        delivery_method: deliveryMethod,
        google_maps_link: isLocalDelivery ? googleMapsLink : undefined,
        delivery_address: isCourier ? deliveryAddress : (deliveryAddress || undefined),
        delivery_city: isCourier ? deliveryCity : 'Coimbatore',
        delivery_state: isCourier ? deliveryState : 'Tamil Nadu',
        delivery_pincode: isCourier ? deliveryPincode : (deliveryPincode || undefined),
        delivery_landmark: deliveryLandmark || undefined,
        scheduled_date: scheduledDate,
        scheduled_slot_id: scheduledSlotId,
        scheduled_slot_label: selectedSlot ? selectedSlot.label : 'Standard Fulfillment Window',
        items: snapshotItems,
        subtotal,
        delivery_fee: deliveryFee,
        discount_amount: 0,
        total_amount: finalTotal,
        payment_method_preference: paymentPreference,
        payment_status: 'payment_pending',
        order_status: 'pending',
        special_instructions: specialInstructions || undefined,
      });

      // Build detailed WhatsApp message to direct immediately
      const itemsSummary = snapshotItems
        .map(
          (i) =>
            `• ${i.product_name} (${i.variant_weight}) x${i.quantity}${
              i.custom_message ? ` ["${i.custom_message}"]` : ''
            }`
        )
        .join('\n');

      let deliveryDetailsText = '';
      if (deliveryMethod === 'courier') {
        deliveryDetailsText =
          `📦 *FULFILLMENT: Pan-India Express Courier*\n` +
          `🏠 *Complete Postal Address:*\n` +
          `${deliveryAddress || 'Address provided'}\n` +
          `City: ${deliveryCity || 'City'}\n` +
          `State: ${deliveryState || 'State'}\n` +
          `📮 Pincode: ${deliveryPincode || ''}\n` +
          (deliveryLandmark ? `🚩 Landmark: ${deliveryLandmark}\n` : '');
      } else if (deliveryMethod === 'local_delivery' || deliveryMethod === 'delivery') {
        deliveryDetailsText =
          `📍 *FULFILLMENT: Doorstep Delivery (Inside Coimbatore)*\n` +
          `🔗 *Google Maps Pin:* ${googleMapsLink || 'Pin provided'}\n` +
          (deliveryAddress ? `🏠 House / Door Details: ${deliveryAddress}\n` : '') +
          (deliveryPincode ? `📮 Coimbatore Pincode: ${deliveryPincode}\n` : '') +
          (deliveryLandmark ? `🚩 Landmark: ${deliveryLandmark}\n` : '');
      } else {
        deliveryDetailsText =
          `🏪 *FULFILLMENT: Studio Pickup (Podanur Kitchen, Coimbatore)*\n` +
          `📍 *Pickup Address:* ${siteSettings?.address_pickup || 'Podanur Main Road, Coimbatore 641023'}\n`;
      }

      const whatsappText =
        `🎂 *Hello Cakes & Dessert! I would like to place my pre-order.* 🎂\n\n` +
        `*Order ID:* ${createdOrder.order_number}\n` +
        `*Customer:* ${customerName} (${customerPhone})\n\n` +
        `${deliveryDetailsText}\n` +
        `*Scheduled Date:* ${scheduledDate}\n` +
        `*Time Window:* ${selectedSlot ? selectedSlot.label : 'Standard Fulfillment Window'}\n\n` +
        `*Items Ordered:*\n${itemsSummary}\n\n` +
        `*Total Amount:* ₹${finalTotal}\n` +
        `*Payment Preference:* ${paymentPreference.toUpperCase()}\n\n` +
        `Please confirm kitchen preparation schedule and payment details!`;

      const whatsappUrl = `https://wa.me/918637478423?text=${encodeURIComponent(whatsappText)}`;

      // Clear cart upon successful order creation
      clearCart();

      // Navigate to luxury confirmation page with secure tracking token, and direct to WhatsApp
      navigate(`/order-confirmation/${createdOrder.order_number}?token=${createdOrder.tracking_token}`);
      setTimeout(() => {
        window.location.href = whatsappUrl;
      }, 150);
    } catch (err: any) {
      console.error('Failed to submit order', err);
      alert('Order could not be saved: ' + (err.message || 'Please verify details and retry.'));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="max-w-xl mx-auto py-24 px-4 text-center">
        <div className="w-16 h-16 rounded-full bg-[#F7DCE2] flex items-center justify-center text-[#4B2923] mx-auto mb-4">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h2 className="font-serif font-bold text-2xl text-[#4B2923] mb-2">
          Your Dessert Bag is Empty
        </h2>
        <p className="text-sm text-[#8A554D] mb-6">
          Add fresh celebration cakes or brownies to your bag before pre-order checkout.
        </p>
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 bg-[#4B2923] text-white py-3.5 px-8 rounded-full text-xs font-semibold uppercase tracking-wider"
        >
          Explore Dessert Menu
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#FFF7F0] min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-10">
          <span className="text-xs uppercase tracking-widest font-semibold text-[#8A554D] block mb-1">
            Zero Gateway Friction
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif font-extrabold text-[#4B2923] tracking-tight">
            Pre-Order Scheduling &amp; Checkout
          </h1>
          <p className="text-xs sm:text-sm text-[#8A554D] mt-1">
            Select your fulfillment time window, delivery location, and preferred offline payment method.
          </p>
        </div>

        <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Scheduling & Customer Info */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Urgent / Same-Day Delivery Callout via Swiggy Direct */}
            <div className="bg-gradient-to-r from-[#200F0D] via-[#351915] to-[#200F0D] text-white p-5 rounded-3xl border border-[#FC8019]/40 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3.5 text-center sm:text-left">
                <div className="w-11 h-11 rounded-2xl bg-[#FC8019] flex items-center justify-center shrink-0 text-white font-black text-xl shadow">
                  ⚡
                </div>
                <div>
                  <span className="text-xs font-extrabold text-[#FC8019] uppercase tracking-wider block">
                    Need Urgent Same-Day Delivery Right Now?
                  </span>
                  <p className="text-xs text-[#D7BFAE] mt-0.5">
                    Order directly via our official Swiggy Direct kitchen menu for express 30–45 min doorstep delivery.
                  </p>
                </div>
              </div>
              <a
                href="https://www.swiggy.com/direct/brand/708273?source=swiggy-direct&subSource=whatsapp"
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 bg-[#FC8019] hover:bg-[#e26e10] text-white text-xs font-extrabold uppercase tracking-wider px-5 py-3 rounded-full transition-all shadow-md hover:scale-105 active:scale-95"
              >
                Open Swiggy Direct →
              </a>
            </div>

            {/* 1. Fulfillment Method */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#D7BFAE]/40 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-6 h-6 rounded-full bg-[#4B2923] text-white text-xs font-bold flex items-center justify-center">
                  1
                </span>
                <h2 className="font-serif font-bold text-lg text-[#4B2923]">
                  Fulfillment Method
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setDeliveryMethod('local_delivery')}
                  className={`p-4 rounded-2xl border text-left transition-all ${
                    deliveryMethod === 'local_delivery' || deliveryMethod === 'delivery'
                      ? 'border-[#4B2923] bg-[#FFF7F0] ring-2 ring-[#4B2923]'
                      : 'border-[#D7BFAE]/50 hover:border-[#8A554D]'
                  }`}
                >
                  <MapPin className="w-5 h-5 text-[#8A554D] mb-1.5" />
                  <span className="font-bold text-sm text-[#4B2923] block">Inside Coimbatore</span>
                  <span className="text-[11px] text-[#8A554D] block mt-0.5">Local Doorstep (Google Maps Pin)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setDeliveryMethod('courier')}
                  className={`p-4 rounded-2xl border text-left transition-all ${
                    deliveryMethod === 'courier'
                      ? 'border-[#4B2923] bg-[#FFF7F0] ring-2 ring-[#4B2923]'
                      : 'border-[#D7BFAE]/50 hover:border-[#8A554D]'
                  }`}
                >
                  <Package className="w-5 h-5 text-[#8A554D] mb-1.5" />
                  <span className="font-bold text-sm text-[#4B2923] block">Pan-India Courier</span>
                  <span className="text-[11px] text-[#8A554D] block mt-0.5">Outside CBE (Full Address)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setDeliveryMethod('pickup')}
                  className={`p-4 rounded-2xl border text-left transition-all ${
                    deliveryMethod === 'pickup'
                      ? 'border-[#4B2923] bg-[#FFF7F0] ring-2 ring-[#4B2923]'
                      : 'border-[#D7BFAE]/50 hover:border-[#8A554D]'
                  }`}
                >
                  <Store className="w-5 h-5 text-[#8A554D] mb-1.5" />
                  <span className="font-bold text-sm text-[#4B2923] block">Studio Pickup</span>
                  <span className="text-[11px] text-[#8A554D] block mt-0.5">Podanur Kitchen (Free)</span>
                </button>
              </div>

              {deliveryMethod === 'pickup' && (
                <div className="mt-4 p-3.5 bg-[#FFF7F0] rounded-xl border border-[#D7BFAE]/40 text-xs text-[#8A554D]">
                  <strong className="text-[#4B2923] block mb-0.5">Pickup Location:</strong>
                  {siteSettings?.address_pickup || 'Podanur Main Road, Coimbatore 641023 (Directions provided upon order confirmation)'}
                </div>
              )}
            </div>

            {/* 2. Pre-Order Date & Time Slot */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#D7BFAE]/40 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-6 h-6 rounded-full bg-[#4B2923] text-white text-xs font-bold flex items-center justify-center">
                  2
                </span>
                <h2 className="font-serif font-bold text-lg text-[#4B2923]">
                  Select Celebration Date &amp; Time Slot
                </h2>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#4B2923]">
                      Delivery / Pickup Date *
                    </label>
                    <span className="text-[11px] text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      Min {minLeadHours}h lead time required
                    </span>
                  </div>
                  <input
                    type="date"
                    min={minDateString}
                    value={scheduledDate}
                    onChange={(e) => setScheduledDate(e.target.value)}
                    className="w-full text-xs p-3.5 rounded-xl border border-[#D7BFAE] bg-[#FFF7F0] text-[#4B2923] focus:ring-1 focus:ring-[#4B2923]"
                  />
                  {errors.scheduled_date && (
                    <p className="text-red-600 text-xs mt-1">{errors.scheduled_date}</p>
                  )}
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-[#4B2923] block mb-2">
                    Fulfillment Time Window *
                  </label>
                  <div className="space-y-2">
                    {timeSlots.map((slot) => {
                      const isSelected = scheduledSlotId === slot.id;
                      return (
                        <button
                          key={slot.id}
                          type="button"
                          onClick={() => setScheduledSlotId(slot.id)}
                          className={`w-full flex items-center justify-between p-3.5 rounded-2xl border text-xs text-left transition-all ${
                            isSelected
                              ? 'border-[#4B2923] bg-[#FFF7F0] ring-1 ring-[#4B2923]'
                              : 'border-[#D7BFAE]/50 hover:border-[#8A554D]'
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <Clock className="w-4 h-4 text-[#8A554D]" />
                            <span className="font-bold text-[#4B2923]">{slot.label}</span>
                          </div>
                          <span className="text-[11px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                            Available
                          </span>
                        </button>
                      );
                    })}
                  </div>
                  {errors.scheduled_slot_id && (
                    <p className="text-red-600 text-xs mt-1">{errors.scheduled_slot_id}</p>
                  )}
                </div>
              </div>
            </div>

            {/* 3. Customer & Address Details */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#D7BFAE]/40 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-6 h-6 rounded-full bg-[#4B2923] text-white text-xs font-bold flex items-center justify-center">
                  3
                </span>
                <h2 className="font-serif font-bold text-lg text-[#4B2923]">
                  Customer &amp; Location Details
                </h2>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-[#4B2923] block mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="e.g. Ananya Raman"
                      className="w-full text-xs p-3.5 rounded-xl border border-[#D7BFAE] bg-[#FFF7F0] text-[#4B2923]"
                    />
                    {errors.customer_name && (
                      <p className="text-red-600 text-xs mt-1">{errors.customer_name}</p>
                    )}
                  </div>

                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-[#4B2923] block mb-1">
                      Mobile Number (For WhatsApp Updates) *
                    </label>
                    <input
                      type="tel"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="e.g. 9842109876"
                      className="w-full text-xs p-3.5 rounded-xl border border-[#D7BFAE] bg-[#FFF7F0] text-[#4B2923]"
                    />
                    {errors.customer_phone && (
                      <p className="text-red-600 text-xs mt-1">{errors.customer_phone}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-[#4B2923] block mb-1">
                    Email Address (Optional):
                  </label>
                  <input
                    type="email"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    placeholder="ananya@example.com"
                    className="w-full text-xs p-3.5 rounded-xl border border-[#D7BFAE] bg-[#FFF7F0] text-[#4B2923]"
                  />
                  {errors.customer_email && (
                    <p className="text-red-600 text-xs mt-1">{errors.customer_email}</p>
                  )}
                </div>

                {/* 1. Inside Coimbatore: Google Maps Pin is required */}
                {(deliveryMethod === 'local_delivery' || deliveryMethod === 'delivery') && (
                  <div className="space-y-4 pt-2 border-t border-[#D7BFAE]/30">
                    <div className="bg-emerald-50/70 p-4 rounded-2xl border border-emerald-200">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-[#4B2923] flex items-center gap-1.5">
                          <MapPin className="w-4 h-4 text-emerald-700" />
                          <span>Google Maps Location Link *</span>
                        </label>
                        <button
                          type="button"
                          onClick={handleGetLocation}
                          disabled={isLocating}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-semibold transition-colors cursor-pointer shadow-xs"
                        >
                          <Navigation className="w-3.5 h-3.5" />
                          <span>{isLocating ? 'Detecting GPS...' : '📍 Pin Current GPS Location'}</span>
                        </button>
                      </div>

                      <input
                        type="url"
                        value={googleMapsLink}
                        onChange={(e) => setGoogleMapsLink(e.target.value)}
                        placeholder="e.g. https://maps.app.goo.gl/... or https://goo.gl/maps/..."
                        className="w-full text-xs p-3.5 rounded-xl border border-emerald-300 bg-white text-[#4B2923] focus:ring-1 focus:ring-emerald-600"
                      />
                      {errors.google_maps_link && (
                        <p className="text-red-600 text-xs mt-1.5 font-medium">{errors.google_maps_link}</p>
                      )}
                      {locationError && (
                        <p className="text-amber-700 text-[11px] mt-1.5">{locationError}</p>
                      )}
                      <p className="text-[11px] text-[#8A554D] mt-2">
                        💡 <strong>How to copy link:</strong> Open Google Maps &rarr; tap your home pin &rarr; tap <strong>Share</strong> &rarr; tap <strong>Copy Link</strong> and paste it here. Or tap the button above to auto-pin your GPS location.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="sm:col-span-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-[#4B2923] block mb-1">
                          House / Flat / Door No. & Street Details:
                        </label>
                        <input
                          type="text"
                          value={deliveryAddress}
                          onChange={(e) => setDeliveryAddress(e.target.value)}
                          placeholder="e.g. Flat 3B, Glen Palms, DB Road, RS Puram"
                          className="w-full text-xs p-3.5 rounded-xl border border-[#D7BFAE] bg-[#FFF7F0] text-[#4B2923]"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold uppercase tracking-wider text-[#4B2923] block mb-1">
                          Coimbatore Pincode:
                        </label>
                        <input
                          type="text"
                          maxLength={6}
                          value={deliveryPincode}
                          onChange={(e) => setDeliveryPincode(e.target.value)}
                          placeholder="641002"
                          className="w-full text-xs p-3.5 rounded-xl border border-[#D7BFAE] bg-[#FFF7F0] text-[#4B2923]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-[#4B2923] block mb-1">
                        Nearby Landmark in Coimbatore (Optional):
                      </label>
                      <input
                        type="text"
                        value={deliveryLandmark}
                        onChange={(e) => setDeliveryLandmark(e.target.value)}
                        placeholder="e.g. Opp. Flower Market, Near Brookefields"
                        className="w-full text-xs p-3.5 rounded-xl border border-[#D7BFAE] bg-[#FFF7F0] text-[#4B2923]"
                      />
                    </div>
                  </div>
                )}

                {/* 2. Pan-India Courier: Complete Postal Address is required */}
                {deliveryMethod === 'courier' && (
                  <div className="space-y-4 pt-2 border-t border-[#D7BFAE]/30">
                    <div className="bg-amber-50/70 p-4 rounded-2xl border border-amber-200 text-xs text-[#4B2923]">
                      <div className="flex items-center gap-2 font-bold mb-1">
                        <Package className="w-4 h-4 text-amber-800" />
                        <span>Pan-India Courier Shipping Address</span>
                      </div>
                      <p className="text-[11px] text-[#8A554D]">
                        Please provide your full postal address so our courier partner (DTDC / BlueDart / India Post) can deliver safely without return.
                      </p>
                    </div>

                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-[#4B2923] block mb-1">
                        Complete Postal Address (House/Apt No, Building, Street, Area) *
                      </label>
                      <textarea
                        rows={2}
                        value={deliveryAddress}
                        onChange={(e) => setDeliveryAddress(e.target.value)}
                        placeholder="e.g. Door No. 42, 3rd Floor, Shanti Apartments, 4th Main Road, Indiranagar"
                        className="w-full text-xs p-3.5 rounded-xl border border-[#D7BFAE] bg-[#FFF7F0] text-[#4B2923]"
                      />
                      {errors.delivery_address && (
                        <p className="text-red-600 text-xs mt-1 font-medium">{errors.delivery_address}</p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="text-xs font-bold uppercase tracking-wider text-[#4B2923] block mb-1">
                          City / Town *
                        </label>
                        <input
                          type="text"
                          value={deliveryCity}
                          onChange={(e) => setDeliveryCity(e.target.value)}
                          placeholder="e.g. Bengaluru, Chennai, Kochi"
                          className="w-full text-xs p-3.5 rounded-xl border border-[#D7BFAE] bg-[#FFF7F0] text-[#4B2923]"
                        />
                        {errors.delivery_city && (
                          <p className="text-red-600 text-xs mt-1 font-medium">{errors.delivery_city}</p>
                        )}
                      </div>

                      <div>
                        <label className="text-xs font-bold uppercase tracking-wider text-[#4B2923] block mb-1">
                          State *
                        </label>
                        <input
                          type="text"
                          value={deliveryState}
                          onChange={(e) => setDeliveryState(e.target.value)}
                          placeholder="e.g. Karnataka, Kerala, Tamil Nadu"
                          className="w-full text-xs p-3.5 rounded-xl border border-[#D7BFAE] bg-[#FFF7F0] text-[#4B2923]"
                        />
                        {errors.delivery_state && (
                          <p className="text-red-600 text-xs mt-1 font-medium">{errors.delivery_state}</p>
                        )}
                      </div>

                      <div>
                        <label className="text-xs font-bold uppercase tracking-wider text-[#4B2923] block mb-1">
                          Postal Pincode *
                        </label>
                        <input
                          type="text"
                          maxLength={6}
                          value={deliveryPincode}
                          onChange={(e) => setDeliveryPincode(e.target.value)}
                          placeholder="e.g. 560038"
                          className="w-full text-xs p-3.5 rounded-xl border border-[#D7BFAE] bg-[#FFF7F0] text-[#4B2923]"
                        />
                        {errors.delivery_pincode && (
                          <p className="text-red-600 text-xs mt-1 font-medium">{errors.delivery_pincode}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-[#4B2923] block mb-1">
                        Nearby Landmark (Optional):
                      </label>
                      <input
                        type="text"
                        value={deliveryLandmark}
                        onChange={(e) => setDeliveryLandmark(e.target.value)}
                        placeholder="e.g. Opposite BDA Complex, Near Metro Station"
                        className="w-full text-xs p-3.5 rounded-xl border border-[#D7BFAE] bg-[#FFF7F0] text-[#4B2923]"
                      />
                    </div>
                  </div>
                )}

                {/* 3. Studio Pickup notice */}
                {deliveryMethod === 'pickup' && (
                  <div className="p-4 bg-[#FFF7F0] rounded-2xl border border-[#D7BFAE]/50 text-xs text-[#8A554D] space-y-1">
                    <strong className="text-[#4B2923] flex items-center gap-1.5">
                      <Store className="w-4 h-4 text-[#8A554D]" /> Studio Kitchen Pickup Location:
                    </strong>
                    <p>{siteSettings?.address_pickup || 'Podanur Main Road, Coimbatore 641023'}</p>
                    <p className="text-[11px] text-emerald-800 font-medium">
                      ✓ No delivery fee. Exact pickup directions and kitchen contact shared upon confirmation.
                    </p>
                  </div>
                )}

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-[#4B2923] block mb-1">
                    Special Delivery Instructions or Allergy Alerts:
                  </label>
                  <textarea
                    rows={2}
                    value={specialInstructions}
                    onChange={(e) => setSpecialInstructions(e.target.value)}
                    placeholder="e.g. Call before arrival, leave with security, please pack extra napkins..."
                    className="w-full text-xs p-3.5 rounded-xl border border-[#D7BFAE] bg-[#FFF7F0] text-[#4B2923]"
                  />
                </div>
              </div>
            </div>

            {/* 4. Payment Preference (No Online Payment Gateway) */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#D7BFAE]/40 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-6 h-6 rounded-full bg-[#4B2923] text-white text-xs font-bold flex items-center justify-center">
                  4
                </span>
                <h2 className="font-serif font-bold text-lg text-[#4B2923]">
                  Payment Arrangement
                </h2>
              </div>
              
              <p className="text-xs text-[#8A554D] mb-4">
                No online payment gateway needed. Choose your preferred offline settlement method:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentPreference('upi')}
                  className={`p-4 rounded-2xl border text-left transition-all ${
                    paymentPreference === 'upi'
                      ? 'border-[#4B2923] bg-[#FFF7F0] ring-1 ring-[#4B2923]'
                      : 'border-[#D7BFAE]/50 hover:border-[#8A554D]'
                  }`}
                >
                  <QrCode className="w-5 h-5 text-[#8A554D] mb-1.5" />
                  <span className="font-bold text-sm text-[#4B2923] block">Direct UPI QR / GPay</span>
                  <span className="text-[11px] text-[#8A554D] block mt-0.5">Pay via PhonePe, GPay or Paytm</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentPreference('bank_transfer')}
                  className={`p-4 rounded-2xl border text-left transition-all ${
                    paymentPreference === 'bank_transfer'
                      ? 'border-[#4B2923] bg-[#FFF7F0] ring-1 ring-[#4B2923]'
                      : 'border-[#D7BFAE]/50 hover:border-[#8A554D]'
                  }`}
                >
                  <Banknote className="w-5 h-5 text-[#8A554D] mb-1.5" />
                  <span className="font-bold text-sm text-[#4B2923] block">Direct Bank Transfer / NEFT</span>
                  <span className="text-[11px] text-[#8A554D] block mt-0.5">Studio HDFC Bank Account</span>
                </button>

                {deliveryMethod === 'pickup' && (
                  <button
                    type="button"
                    onClick={() => setPaymentPreference('cash_on_pickup')}
                    className={`p-4 rounded-2xl border text-left transition-all ${
                      paymentPreference === 'cash_on_pickup'
                        ? 'border-[#4B2923] bg-[#FFF7F0] ring-1 ring-[#4B2923]'
                        : 'border-[#D7BFAE]/50 hover:border-[#8A554D]'
                    }`}
                  >
                    <Store className="w-5 h-5 text-[#8A554D] mb-1.5" />
                    <span className="font-bold text-sm text-[#4B2923] block">Cash on Pickup</span>
                    <span className="text-[11px] text-[#8A554D] block mt-0.5">Pay cash at Podanur kitchen</span>
                  </button>
                )}

                {deliveryMethod === 'delivery' && (
                  <button
                    type="button"
                    onClick={() => setPaymentPreference('cash_on_delivery')}
                    className={`p-4 rounded-2xl border text-left transition-all ${
                      paymentPreference === 'cash_on_delivery'
                        ? 'border-[#4B2923] bg-[#FFF7F0] ring-1 ring-[#4B2923]'
                        : 'border-[#D7BFAE]/50 hover:border-[#8A554D]'
                    }`}
                  >
                    <Truck className="w-5 h-5 text-[#8A554D] mb-1.5" />
                    <span className="font-bold text-sm text-[#4B2923] block">Cash on Delivery</span>
                    <span className="text-[11px] text-[#8A554D] block mt-0.5">Pay delivery rider upon arrival</span>
                  </button>
                )}
              </div>
            </div>

          </div>

          {/* Right Column: Order Summary & Placement */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-[#D7BFAE]/40 shadow-sm space-y-6 sticky top-24">
            <h3 className="font-serif font-bold text-xl text-[#4B2923] border-b border-[#D7BFAE]/30 pb-3">
              Order Breakdown
            </h3>

            {/* Items summary */}
            <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-3 text-xs">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-12 h-12 rounded-xl object-cover shrink-0 border border-[#D7BFAE]/30"
                  />
                  <div className="flex-1 min-w-0">
                    <h5 className="font-serif font-bold text-[#4B2923] truncate">
                      {item.product.name}
                    </h5>
                    <p className="text-[11px] text-[#8A554D]">
                      {item.selected_variant.weight_label} • Qty {item.quantity}
                      {item.is_eggless && ' • Eggless'}
                    </p>
                    {item.custom_message && (
                      <p className="text-[10px] text-[#4B2923] italic">"{item.custom_message}"</p>
                    )}
                  </div>
                  <span className="font-bold text-[#4B2923] shrink-0">₹{item.total_price}</span>
                </div>
              ))}
            </div>

            {/* Financials */}
            <div className="border-t border-[#D7BFAE]/40 pt-4 space-y-2 text-xs text-[#8A554D]">
              <div className="flex justify-between">
                <span>Subtotal ({items.length} items)</span>
                <span className="font-semibold text-[#4B2923]">₹{subtotal}</span>
              </div>

              <div className="flex justify-between">
                <span>
                  Fulfillment Fee (
                  {deliveryMethod === 'courier'
                    ? 'Courier Pan-India'
                    : deliveryMethod === 'local_delivery' || deliveryMethod === 'delivery'
                    ? 'Local Delivery'
                    : 'Studio Pickup'}
                  )
                </span>
                <span className="font-semibold text-[#4B2923]">
                  {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
                </span>
              </div>

              <div className="border-t border-[#D7BFAE]/40 pt-3 flex justify-between text-base font-serif font-bold text-[#4B2923]">
                <span>Total Payable</span>
                <span>₹{finalTotal}</span>
              </div>
            </div>

            {/* Assurance message */}
            <div className="bg-[#FFF7F0] rounded-2xl p-4 border border-[#D7BFAE]/40 text-xs text-[#8A554D] space-y-1.5">
              <div className="flex items-center gap-2 text-[#4B2923] font-semibold">
                <Sparkles className="w-4 h-4 text-[#E9AEBB]" />
                <span>Instant Confirmation &amp; WhatsApp Direct Order</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                Your order is saved directly in our kitchen database. You will immediately be connected to our WhatsApp baker with your full order summary and receipt.
              </p>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-emerald-700 hover:bg-emerald-800 text-white py-4 px-6 rounded-full font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2.5 transition-all shadow-md active:scale-98 cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                  <span>Connecting to WhatsApp...</span>
                </>
              ) : (
                <>
                  <MessageCircle className="w-4 h-4 text-white" />
                  <span>Place Pre-Order via WhatsApp (₹{finalTotal})</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <p className="text-[10px] text-center text-[#8A554D]">
              By placing this order, you agree to our pre-order lead times and Coimbatore fulfillment guidelines.
            </p>
          </div>

        </form>

      </div>
    </div>
  );
};

