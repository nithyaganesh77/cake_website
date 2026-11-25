import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Plus,
  Minus,
  Trash2,
  ArrowRight,
  ShoppingBag,
  Sparkles,
  MapPin,
  Navigation,
  Package,
  Store,
  MessageCircle,
  AlertCircle,
  CheckCircle2,
  Phone,
  User,
} from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { Link } from 'react-router-dom';
import { dataProvider } from '@/services/dataProvider';
import { OrderItemSnapshot } from '@/types';

export const CartDrawer: React.FC = () => {
  const { isCartOpen, closeCart, items, updateQuantity, removeItem, subtotal, itemCount, clearCart } = useCart();

  // Fulfillment selector
  const [deliveryMethod, setDeliveryMethod] = useState<'local_delivery' | 'courier' | 'pickup'>('local_delivery');

  // Customer contact & location fields (saved in localStorage for effortless repeat orders)
  const [customerName, setCustomerName] = useState(() => localStorage.getItem('cnd_cust_name') || '');
  const [customerPhone, setCustomerPhone] = useState(() => localStorage.getItem('cnd_cust_phone') || '');
  const [deliveryAddress, setDeliveryAddress] = useState(() => localStorage.getItem('cnd_cust_address') || '');
  const [googleMapsLink, setGoogleMapsLink] = useState('');
  const [courierCity, setCourierCity] = useState(() => localStorage.getItem('cnd_cust_city') || '');
  const [courierPincode, setCourierPincode] = useState(() => localStorage.getItem('cnd_cust_pincode') || '');

  const [isLocating, setIsLocating] = useState(false);
  const [validationError, setValidationError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState<string | null>(null);

  // Sync saved inputs to localStorage
  useEffect(() => {
    if (customerName) localStorage.setItem('cnd_cust_name', customerName);
  }, [customerName]);

  useEffect(() => {
    if (customerPhone) localStorage.setItem('cnd_cust_phone', customerPhone);
  }, [customerPhone]);

  useEffect(() => {
    if (deliveryAddress) localStorage.setItem('cnd_cust_address', deliveryAddress);
  }, [deliveryAddress]);

  useEffect(() => {
    if (courierCity) localStorage.setItem('cnd_cust_city', courierCity);
  }, [courierCity]);

  useEffect(() => {
    if (courierPincode) localStorage.setItem('cnd_cust_pincode', courierPincode);
  }, [courierPincode]);

  // Delivery fee calculation
  const deliveryFee =
    deliveryMethod === 'pickup'
      ? 0
      : deliveryMethod === 'courier'
      ? subtotal >= 1200
        ? 0
        : 120
      : subtotal >= 1200
      ? 0
      : 80;

  const totalPayable = subtotal + deliveryFee;

  // Auto GPS Pin detector (optional helper)
  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      setValidationError('GPS is not supported on this device. You can simply type your area or address!');
      return;
    }
    setIsLocating(true);
    setValidationError('');
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        const link = `https://www.google.com/maps?q=${latitude.toFixed(6)},${longitude.toFixed(6)}`;
        setGoogleMapsLink(link);
        if (!deliveryAddress) {
          setDeliveryAddress(`GPS Location Pin (${latitude.toFixed(4)}, ${longitude.toFixed(4)})`);
        }
        setIsLocating(false);
      },
      () => {
        setIsLocating(false);
        setValidationError('Could not auto-detect GPS. No problem! Just type your delivery area or street name below.');
      },
      { enableHighAccuracy: true, timeout: 8000 }
    );
  };

  // Express 1-Click WhatsApp Order
  const handleWhatsAppOrder = async () => {
    setValidationError('');

    // Validation
    const cleanName = customerName.trim();
    const cleanPhone = customerPhone.replace(/\D/g, '');

    if (!cleanName || cleanName.length < 2) {
      setValidationError('Please enter your name so the baker can confirm your order.');
      return;
    }

    if (!cleanPhone || cleanPhone.length < 10) {
      setValidationError('Please enter a valid 10-digit mobile number for order confirmation.');
      return;
    }

    if (deliveryMethod === 'local_delivery') {
      const hasAddress = deliveryAddress && deliveryAddress.trim().length >= 3;
      const hasMap = googleMapsLink && googleMapsLink.trim().length >= 5;
      if (!hasAddress && !hasMap) {
        setValidationError('Please enter your Coimbatore area / street name (e.g. Peelamedu / RS Puram).');
        return;
      }
    } else if (deliveryMethod === 'courier') {
      if (!deliveryAddress || deliveryAddress.trim().length < 5) {
        setValidationError('Please enter your postal address (street / flat / area) for courier.');
        return;
      }
      if (!courierCity || courierCity.trim().length < 2) {
        setValidationError('Please enter your city/town for courier.');
        return;
      }
      if (!courierPincode || !/^[1-9][0-9]{5}$/.test(courierPincode.trim())) {
        setValidationError('Please enter a valid 6-digit postal pincode.');
        return;
      }
    }

    setIsSubmitting(true);

    try {
      // 1. Generate real Order record in Database
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

      await dataProvider.createOrder({
        order_number: orderNumber,
        tracking_token: trackingToken,
        customer_name: cleanName,
        customer_phone: cleanPhone,
        delivery_method: deliveryMethod,
        google_maps_link: googleMapsLink || undefined,
        delivery_address: deliveryAddress || undefined,
        delivery_city: deliveryMethod === 'courier' ? courierCity : 'Coimbatore',
        delivery_state: 'Tamil Nadu',
        delivery_pincode: deliveryMethod === 'courier' ? courierPincode : '641105',
        scheduled_date: new Date().toISOString().split('T')[0],
        scheduled_slot_id: 'slot-express',
        scheduled_slot_label: 'Standard Fresh Kitchen Dispatch Window',
        items: snapshotItems,
        subtotal,
        delivery_fee: deliveryFee,
        discount_amount: 0,
        total_amount: totalPayable,
        payment_method_preference: 'upi',
        payment_status: 'payment_pending',
        order_status: 'pending',
      });

      // 2. Build human-friendly WhatsApp message
      const itemsList = items
        .map(
          (i) =>
            `• *${i.product.name}* (${i.selected_variant.weight_label})${i.is_eggless ? ' [Eggless]' : ''} x${i.quantity} = ₹${i.total_price}${
              i.custom_message ? `\n   Note: "${i.custom_message}"` : ''
            }`
        )
        .join('\n');

      let fulfillmentInfo = '';
      if (deliveryMethod === 'courier') {
        fulfillmentInfo =
          `📦 *Fulfillment:* Pan-India Express Courier\n` +
          `🏠 *Address:* ${deliveryAddress}\n` +
          `📍 *City / Pin:* ${courierCity} - ${courierPincode}`;
      } else if (deliveryMethod === 'local_delivery') {
        fulfillmentInfo =
          `🛵 *Fulfillment:* Doorstep Delivery (Coimbatore)\n` +
          `🏠 *Address / Area:* ${deliveryAddress}\n` +
          (googleMapsLink ? `📍 *Maps Pin:* ${googleMapsLink}` : '');
      } else {
        fulfillmentInfo =
          `🏪 *Fulfillment:* Studio Pickup (Madukkarai, Coimbatore)\n` +
          `📍 3/245 F, Tamil Annai Street, Gandhinagar, Near Palakkad Main Road, Madukkarai, CBE 641105 (Free Pickup)`;
      }

      const message =
        `🎂 *Hello Cakes & Dessert! I would like to order:* 🎂\n\n` +
        `*Order ID:* ${orderNumber}\n` +
        `*Customer:* ${cleanName} (${cleanPhone})\n\n` +
        `${fulfillmentInfo}\n\n` +
        `*Items Ordered:*\n${itemsList}\n\n` +
        `*Subtotal:* ₹${subtotal}\n` +
        `*Delivery:* ${deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}\n` +
        `*Total Payable:* ₹${totalPayable}\n\n` +
        `Please confirm preparation & share UPI QR! ✨`;

      const whatsappUrl = `https://wa.me/918637478423?text=${encodeURIComponent(message)}`;

      // Clear cart
      clearCart();
      setOrderSuccess(orderNumber);

      // Open WhatsApp
      setTimeout(() => {
        window.open(whatsappUrl, '_blank');
      }, 300);
    } catch (err: any) {
      console.error('Failed to create order', err);
      // Even if offline/localDB fails, don't block WhatsApp order!
      const fallbackUrl = `https://wa.me/918637478423?text=${encodeURIComponent(
        `Hello Cakes & Dessert! I want to order:\n${customerName} (${customerPhone})\nSubtotal: ₹${subtotal}`
      )}`;
      window.open(fallbackUrl, '_blank');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Build target link to full checkout if user wants to schedule specific date/slot
  const checkoutUrl = `/checkout?method=${deliveryMethod}&name=${encodeURIComponent(
    customerName
  )}&phone=${encodeURIComponent(customerPhone)}&address=${encodeURIComponent(
    deliveryAddress
  )}&mapLink=${encodeURIComponent(googleMapsLink)}&city=${encodeURIComponent(
    courierCity
  )}&pincode=${encodeURIComponent(courierPincode)}`;

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeCart}
            className="absolute inset-0 bg-[#2F1916]/60 backdrop-blur-sm"
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              className="w-screen max-w-md bg-[#FFF7F0] shadow-2xl flex flex-col justify-between border-l border-[#D7BFAE]/50 h-full"
            >
              {/* Header */}
              <div className="px-4 py-3 sm:px-5 sm:py-3.5 bg-white border-b border-[#D7BFAE]/30 flex items-center justify-between shrink-0 shadow-xs">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-[#F7DCE2] flex items-center justify-center text-[#4B2923]">
                    <ShoppingBag className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="font-serif font-bold text-base sm:text-lg text-[#4B2923] leading-tight">
                      Your Dessert Bag
                    </h2>
                    <p className="text-[11px] text-[#8A554D]">
                      {itemCount} {itemCount === 1 ? 'item' : 'items'} freshly baked to order
                    </p>
                  </div>
                </div>
                <button
                  onClick={closeCart}
                  className="p-1.5 text-[#8A554D] hover:text-[#4B2923] hover:bg-[#FFF7F0] rounded-full transition-colors cursor-pointer"
                  aria-label="Close cart"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Free Delivery Meter */}
              {items.length > 0 && !orderSuccess && (
                <div className="bg-[#FFF7F0] px-4 py-2 border-b border-[#D7BFAE]/30 shrink-0">
                  {subtotal < 1200 ? (
                    <div>
                      <div className="flex items-center justify-between text-[11px] font-bold text-[#4B2923] mb-1">
                        <span className="flex items-center gap-1 text-[#8A554D]">
                          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                          <span>
                            Add <span className="text-[#4B2923]">₹{1200 - subtotal}</span> for Free Delivery
                          </span>
                        </span>
                        <span className="text-[10px] text-[#8A554D]">{Math.round((subtotal / 1200) * 100)}%</span>
                      </div>
                      <div className="w-full bg-[#D7BFAE]/30 rounded-full h-1.5 overflow-hidden">
                        <motion.div
                          className="bg-emerald-600 h-full rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${Math.min(100, (subtotal / 1200) * 100)}%` }}
                          transition={{ duration: 0.4 }}
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 py-1 px-2.5 rounded-lg border border-emerald-200">
                      <Sparkles className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>🎉 Free Priority Delivery Unlocked!</span>
                    </div>
                  )}
                </div>
              )}

              {/* Drawer Content */}
              <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3">
                {orderSuccess ? (
                  /* Order Placed Celebratory View */
                  <div className="h-full flex flex-col items-center justify-center text-center py-8 px-4">
                    <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <h3 className="font-serif font-bold text-xl text-[#4B2923] mb-1">
                      Order Sent to Baker!
                    </h3>
                    <p className="text-xs text-[#8A554D] mb-2 font-mono font-semibold">
                      Order ID: {orderSuccess}
                    </p>
                    <p className="text-xs text-[#8A554D] max-w-xs leading-relaxed mb-6">
                      WhatsApp has been launched with your order details. Our baker will confirm slot & share payment QR immediately!
                    </p>
                    <button
                      onClick={() => {
                        setOrderSuccess(null);
                        closeCart();
                      }}
                      className="bg-[#4B2923] text-white text-xs font-semibold px-6 py-2.5 rounded-full hover:bg-[#2F1916] transition-colors"
                    >
                      Done & Continue Browsing
                    </button>
                  </div>
                ) : items.length === 0 ? (
                  /* Empty Bag View */
                  <div className="h-full flex flex-col items-center justify-center text-center py-12">
                    <div className="w-16 h-16 rounded-full bg-[#F7DCE2]/60 flex items-center justify-center text-[#4B2923] mb-3">
                      <ShoppingBag className="w-8 h-8 stroke-[1.5]" />
                    </div>
                    <h3 className="font-serif font-semibold text-base text-[#4B2923] mb-1">
                      Your dessert bag is empty
                    </h3>
                    <p className="text-xs text-[#8A554D] max-w-xs mb-5">
                      Explore our fudgy brownies, dessert tubs, and artisanal cakes.
                    </p>
                    <Link
                      to="/shop"
                      onClick={closeCart}
                      className="inline-flex items-center gap-2 bg-[#4B2923] text-white text-xs font-semibold px-5 py-2.5 rounded-full hover:bg-[#2F1916] transition-colors"
                    >
                      Explore Menu
                    </Link>
                  </div>
                ) : (
                  <>
                    {/* Item Cards */}
                    <div className="space-y-2">
                      {items.map((item) => (
                        <div
                          key={item.id}
                          className="bg-white rounded-2xl p-2.5 sm:p-3 border border-[#D7BFAE]/30 shadow-xs flex items-center gap-2.5"
                        >
                          <img
                            src={item.product.images[0]}
                            alt={item.product.name}
                            className="w-14 h-14 rounded-xl object-cover shrink-0 border border-[#D7BFAE]/20"
                          />

                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-1">
                              <h4 className="font-serif font-bold text-xs sm:text-sm text-[#4B2923] truncate">
                                {item.product.name}
                              </h4>
                              <button
                                onClick={() => removeItem(item.id)}
                                className="text-[#8A554D]/50 hover:text-red-600 transition-colors shrink-0 p-1"
                                aria-label="Remove item"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>

                            <div className="flex items-center gap-1.5 text-[10px] text-[#8A554D] mt-0.5">
                              <span className="bg-[#FFF7F0] px-1.5 py-0.5 rounded font-medium border border-[#D7BFAE]/30">
                                {item.selected_variant.weight_label}
                              </span>
                              {item.is_eggless && (
                                <span className="bg-emerald-50 text-emerald-700 px-1.5 py-0.5 rounded font-medium border border-emerald-200">
                                  Eggless
                                </span>
                              )}
                            </div>

                            <div className="mt-2 flex items-center justify-between">
                              <div className="flex items-center border border-[#D7BFAE] rounded-full bg-[#FFF7F0] px-1 py-0.5">
                                <button
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                  className="w-5 h-5 flex items-center justify-center text-[#4B2923] hover:bg-white rounded-full transition-colors cursor-pointer"
                                  aria-label="Decrease quantity"
                                >
                                  <Minus className="w-2.5 h-2.5" />
                                </button>
                                <span className="w-6 text-center text-xs font-bold text-[#4B2923]">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  className="w-5 h-5 flex items-center justify-center text-[#4B2923] hover:bg-white rounded-full transition-colors cursor-pointer"
                                  aria-label="Increase quantity"
                                >
                                  <Plus className="w-2.5 h-2.5" />
                                </button>
                              </div>

                              <span className="font-serif font-bold text-xs sm:text-sm text-[#4B2923]">
                                ₹{item.total_price}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Simple 1-Step Fulfillment & Contact Section */}
                    <div className="bg-white rounded-2xl p-3 border border-[#D7BFAE]/50 shadow-xs space-y-2.5">
                      {/* Segmented Fulfillment Tab */}
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#4B2923]">
                          Choose Fulfillment:
                        </span>
                        <span className="text-[10px] text-emerald-800 font-semibold">
                          {deliveryMethod === 'local_delivery'
                            ? '🛵 Coimbatore Doorstep'
                            : deliveryMethod === 'courier'
                            ? '📦 Pan-India Courier'
                            : '🏪 Free Studio Pickup'}
                        </span>
                      </div>

                      <div className="grid grid-cols-3 gap-1 p-1 bg-[#FFF7F0] rounded-xl border border-[#D7BFAE]/40">
                        <button
                          type="button"
                          onClick={() => setDeliveryMethod('local_delivery')}
                          className={`py-1.5 px-1 rounded-lg text-[10px] font-bold transition-all text-center cursor-pointer ${
                            deliveryMethod === 'local_delivery'
                              ? 'bg-[#4B2923] text-white shadow-xs'
                              : 'text-[#8A554D] hover:text-[#4B2923]'
                          }`}
                        >
                          Coimbatore
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeliveryMethod('courier')}
                          className={`py-1.5 px-1 rounded-lg text-[10px] font-bold transition-all text-center cursor-pointer ${
                            deliveryMethod === 'courier'
                              ? 'bg-[#4B2923] text-white shadow-xs'
                              : 'text-[#8A554D] hover:text-[#4B2923]'
                          }`}
                        >
                          Courier
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeliveryMethod('pickup')}
                          className={`py-1.5 px-1 rounded-lg text-[10px] font-bold transition-all text-center cursor-pointer ${
                            deliveryMethod === 'pickup'
                              ? 'bg-[#4B2923] text-white shadow-xs'
                              : 'text-[#8A554D] hover:text-[#4B2923]'
                          }`}
                        >
                          Pickup
                        </button>
                      </div>

                      {/* Quick Contact Inputs */}
                      <div className="grid grid-cols-2 gap-2 pt-1">
                        <div>
                          <label className="text-[9px] font-bold uppercase tracking-wider text-[#4B2923] block mb-1">
                            Your Name *
                          </label>
                          <input
                            type="text"
                            value={customerName}
                            onChange={(e) => setCustomerName(e.target.value)}
                            placeholder="e.g. Ananya"
                            className="w-full text-xs p-2 rounded-xl border border-[#D7BFAE] bg-[#FFF7F0] text-[#4B2923] focus:outline-none focus:ring-1 focus:ring-[#4B2923]"
                          />
                        </div>

                        <div>
                          <label className="text-[9px] font-bold uppercase tracking-wider text-[#4B2923] block mb-1">
                            WhatsApp Mobile *
                          </label>
                          <input
                            type="tel"
                            maxLength={10}
                            value={customerPhone}
                            onChange={(e) => setCustomerPhone(e.target.value)}
                            placeholder="10-digit number"
                            className="w-full text-xs p-2 rounded-xl border border-[#D7BFAE] bg-[#FFF7F0] text-[#4B2923] focus:outline-none focus:ring-1 focus:ring-[#4B2923]"
                          />
                        </div>
                      </div>

                      {/* Coimbatore Mode Address */}
                      {deliveryMethod === 'local_delivery' && (
                        <div className="space-y-1.5 pt-1">
                          <div className="flex items-center justify-between">
                            <label className="text-[9px] font-bold uppercase tracking-wider text-[#4B2923]">
                              Delivery Area / Address *
                            </label>
                            <button
                              type="button"
                              onClick={handleGetLocation}
                              disabled={isLocating}
                              className="text-[9px] text-emerald-800 hover:text-emerald-950 font-bold flex items-center gap-1 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 cursor-pointer"
                            >
                              <Navigation className="w-2.5 h-2.5" />
                              <span>{isLocating ? 'Detecting...' : '📍 Auto-Pin GPS'}</span>
                            </button>
                          </div>
                          <input
                            type="text"
                            value={deliveryAddress}
                            onChange={(e) => setDeliveryAddress(e.target.value)}
                            placeholder="e.g. Peelamedu, Near PSG Tech / Flat 4B"
                            className="w-full text-xs p-2 rounded-xl border border-[#D7BFAE] bg-[#FFF7F0] text-[#4B2923] focus:outline-none focus:ring-1 focus:ring-[#4B2923]"
                          />
                        </div>
                      )}

                      {/* Courier Mode Address */}
                      {deliveryMethod === 'courier' && (
                        <div className="space-y-1.5 pt-1">
                          <label className="text-[9px] font-bold uppercase tracking-wider text-[#4B2923] block">
                            Postal Address (Street / Flat) *
                          </label>
                          <input
                            type="text"
                            value={deliveryAddress}
                            onChange={(e) => setDeliveryAddress(e.target.value)}
                            placeholder="Flat/House No, Street, Locality"
                            className="w-full text-xs p-2 rounded-xl border border-[#D7BFAE] bg-[#FFF7F0] text-[#4B2923]"
                          />
                          <div className="grid grid-cols-2 gap-2">
                            <input
                              type="text"
                              value={courierCity}
                              onChange={(e) => setCourierCity(e.target.value)}
                              placeholder="City / Town *"
                              className="w-full text-xs p-2 rounded-xl border border-[#D7BFAE] bg-[#FFF7F0] text-[#4B2923]"
                            />
                            <input
                              type="text"
                              maxLength={6}
                              value={courierPincode}
                              onChange={(e) => setCourierPincode(e.target.value)}
                              placeholder="6-digit Pincode *"
                              className="w-full text-xs p-2 rounded-xl border border-[#D7BFAE] bg-[#FFF7F0] text-[#4B2923]"
                            />
                          </div>
                        </div>
                      )}

                      {/* Pickup Mode */}
                      {deliveryMethod === 'pickup' && (
                        <div className="text-[11px] text-[#8A554D] bg-[#FFF7F0] p-2 rounded-xl border border-[#D7BFAE]/40 flex items-center gap-2">
                          <Store className="w-4 h-4 text-[#8A554D] shrink-0" />
                          <span>Studio Pickup: 3/245 F, Tamil Annai St, Gandhinagar, Madukkarai, CBE 641105 (Free)</span>
                        </div>
                      )}

                      {/* Error Banner */}
                      {validationError && (
                        <div className="p-2 bg-red-50 text-red-700 text-[11px] rounded-lg border border-red-200 flex items-center gap-1.5 font-medium">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                          <span>{validationError}</span>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>

              {/* Ultra-Simple, High-Impact Bottom Order Bar */}
              {items.length > 0 && !orderSuccess && (
                <div className="p-3 sm:p-4 bg-white border-t border-[#D7BFAE]/40 shadow-[0_-4px_20px_rgba(75,41,35,0.06)] shrink-0 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-[10px] uppercase font-bold text-[#8A554D]">
                        Total Amount:
                      </span>
                      <span className="font-serif font-extrabold text-xl text-[#4B2923]">
                        ₹{totalPayable}
                      </span>
                    </div>

                    <span className="text-[11px] text-emerald-800 font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      {deliveryMethod === 'pickup'
                        ? '✓ Free Pickup'
                        : deliveryFee === 0
                        ? '✓ Free Delivery'
                        : deliveryMethod === 'courier'
                        ? '+ ₹120 Courier'
                        : '+ ₹80 Delivery'}
                    </span>
                  </div>

                  {/* Primary 1-Click WhatsApp Button */}
                  <button
                    type="button"
                    onClick={handleWhatsAppOrder}
                    disabled={isSubmitting}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 px-4 rounded-full font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>{isSubmitting ? 'Connecting...' : 'Order on WhatsApp · Instant Confirmation'}</span>
                  </button>

                  {/* Optional Schedule / Detailed Checkout Link */}
                  <div className="text-center pt-0.5">
                    <Link
                      to={checkoutUrl}
                      onClick={closeCart}
                      className="text-[10px] text-[#8A554D] hover:text-[#4B2923] hover:underline font-semibold inline-flex items-center gap-1"
                    >
                      <span>Need to schedule a future party date or custom slot?</span>
                      <ArrowRight className="w-3 h-3 text-[#E9AEBB]" />
                    </Link>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
