import React, { useState } from 'react';
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
} from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { Link } from 'react-router-dom';

export const CartDrawer: React.FC = () => {
  const { isCartOpen, closeCart, items, updateQuantity, removeItem, subtotal, itemCount } = useCart();

  // Fulfillment selector inside cart
  const [deliveryMethod, setDeliveryMethod] = useState<'local_delivery' | 'courier' | 'pickup'>('local_delivery');
  const [googleMapsLink, setGoogleMapsLink] = useState('');
  const [localDoorDetails, setLocalDoorDetails] = useState('');
  const [courierAddress, setCourierAddress] = useState('');
  const [courierCity, setCourierCity] = useState('');
  const [courierState, setCourierState] = useState('Tamil Nadu');
  const [courierPincode, setCourierPincode] = useState('');
  const [isLocating, setIsLocating] = useState(false);
  const [validationError, setValidationError] = useState('');

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      setValidationError('Geolocation is not supported by your device.');
      return;
    }
    setIsLocating(true);
    setValidationError('');
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        const link = `https://www.google.com/maps?q=${latitude.toFixed(6)},${longitude.toFixed(6)}`;
        setGoogleMapsLink(link);
        setIsLocating(false);
      },
      () => {
        setIsLocating(false);
        setValidationError('Could not auto-detect GPS. Please open Google Maps, tap Share on your pin, and paste the link.');
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  const handleWhatsAppOrder = () => {
    setValidationError('');

    if (deliveryMethod === 'local_delivery') {
      if (!googleMapsLink || googleMapsLink.trim().length < 5) {
        setValidationError('Please paste your Google Maps link or tap "Pin GPS" for Coimbatore delivery.');
        return;
      }
    } else if (deliveryMethod === 'courier') {
      if (!courierAddress || courierAddress.trim().length < 8) {
        setValidationError('Please enter your complete postal address (house/flat, street, area) for courier.');
        return;
      }
      if (!courierCity || courierCity.trim().length < 2) {
        setValidationError('Please enter your city / town.');
        return;
      }
      if (!courierPincode || !/^[1-9][0-9]{5}$/.test(courierPincode.trim())) {
        setValidationError('Please enter a valid 6-digit postal pincode.');
        return;
      }
    }

    const itemsSummary = items
      .map(
        (i) =>
          `• ${i.product.name} (${i.selected_variant.weight_label}) x${i.quantity}${
            i.custom_message ? ` ["${i.custom_message}"]` : ''
          }`
      )
      .join('\n');

    let deliveryText = '';
    if (deliveryMethod === 'courier') {
      deliveryText =
        `📦 *FULFILLMENT: Pan-India Express Courier*\n` +
        `🏠 *Complete Postal Address:*\n${courierAddress}\n` +
        `City: ${courierCity}\n` +
        `State: ${courierState}\n` +
        `📮 Pincode: ${courierPincode}`;
    } else if (deliveryMethod === 'local_delivery') {
      deliveryText =
        `📍 *FULFILLMENT: Inside Coimbatore (Doorstep)*\n` +
        `🔗 *Google Maps Pin:* ${googleMapsLink}\n` +
        (localDoorDetails ? `🏠 Door / Flat Details: ${localDoorDetails}\n` : '');
    } else {
      deliveryText =
        `🏪 *FULFILLMENT: Studio Pickup (Podanur, Coimbatore)*\n` +
        `📍 Podanur Main Road, Coimbatore 641023`;
    }

    const text = encodeURIComponent(
      `🎂 *Hello Cakes & Dessert! I would like to order directly from my bag:* 🎂\n\n` +
      `${deliveryText}\n\n` +
      `*Items in Bag:*\n${itemsSummary}\n\n` +
      `*Estimated Subtotal:* ₹${subtotal}\n\n` +
      `Please confirm slot availability and payment instructions!`
    );

    window.open(`https://wa.me/918637478423?text=${text}`, '_blank');
  };

  // Build target link to checkout with state preserved
  const checkoutUrl = `/checkout?method=${deliveryMethod}&mapLink=${encodeURIComponent(
    googleMapsLink
  )}&address=${encodeURIComponent(courierAddress || localDoorDetails)}&city=${encodeURIComponent(
    courierCity
  )}&state=${encodeURIComponent(courierState)}&pincode=${encodeURIComponent(courierPincode)}`;

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
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
              <div className="px-4 py-3.5 sm:px-6 sm:py-4 bg-white border-b border-[#D7BFAE]/30 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#F7DCE2] flex items-center justify-center text-[#4B2923]">
                    <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <h2 className="font-serif font-bold text-lg sm:text-xl text-[#4B2923] leading-tight">Your Dessert Bag</h2>
                    <p className="text-[11px] sm:text-xs text-[#8A554D]">{itemCount} {itemCount === 1 ? 'item' : 'items'} selected</p>
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

              {/* Free Delivery / Reward Progress Meter */}
              {items.length > 0 && (
                <div className="bg-[#FFF7F0] px-4 py-2 sm:px-6 sm:py-2.5 border-b border-[#D7BFAE]/30 shrink-0">
                  {subtotal < 1200 ? (
                    <div>
                      <div className="flex items-center justify-between text-[11px] font-bold text-[#4B2923] mb-1.5">
                        <span className="flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-[#8A554D]" />
                          <span>Add <span className="text-[#8A554D]">₹{1200 - subtotal}</span> for Free Priority Delivery</span>
                        </span>
                        <span>{Math.round((subtotal / 1200) * 100)}%</span>
                      </div>
                      <div className="w-full bg-[#D7BFAE]/40 rounded-full h-1.5 overflow-hidden">
                        <motion.div
                          className="bg-gradient-to-r from-[#8A554D] to-[#4B2923] h-full rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${Math.min(100, (subtotal / 1200) * 100)}%` }}
                          transition={{ duration: 0.5 }}
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 bg-emerald-50 py-1 px-3 rounded-lg border border-emerald-200">
                      <Sparkles className="w-4 h-4 text-emerald-600" />
                      <span>🎉 Congratulations! Free Priority Delivery Unlocked!</span>
                    </div>
                  )}
                </div>
              )}

              {/* Items List */}
              <div className="flex-1 overflow-y-auto p-3 sm:p-5 space-y-2.5 sm:space-y-3">
                {items.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center py-12">
                    <div className="w-20 h-20 rounded-full bg-[#F7DCE2]/60 flex items-center justify-center text-[#4B2923] mb-4">
                      <ShoppingBag className="w-10 h-10 stroke-[1.5]" />
                    </div>
                    <h3 className="font-serif font-semibold text-lg text-[#4B2923] mb-2">
                      Your bag is empty
                    </h3>
                    <p className="text-sm text-[#8A554D] max-w-xs mb-6">
                      Explore our handcrafted celebration cakes, fudgy brownies, and sweet treats.
                    </p>
                    <button
                      onClick={closeCart}
                      className="inline-flex items-center gap-2 bg-[#4B2923] text-white text-sm font-medium px-6 py-3 rounded-full hover:bg-[#2F1916] transition-colors"
                    >
                      Browse Our Menu
                    </button>
                  </div>
                ) : (
                  items.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="bg-white rounded-2xl p-3 sm:p-3.5 border border-[#D7BFAE]/30 shadow-xs flex gap-3"
                    >
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-16 h-16 sm:w-18 sm:h-18 rounded-xl object-cover shrink-0 border border-[#D7BFAE]/20"
                      />

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="font-serif font-bold text-sm text-[#4B2923] truncate">
                            {item.product.name}
                          </h4>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-[#8A554D]/60 hover:text-red-600 transition-colors shrink-0"
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="mt-1 flex flex-wrap gap-1.5 text-[11px] text-[#8A554D]">
                          <span className="bg-[#FFF7F0] px-2 py-0.5 rounded-md border border-[#D7BFAE]/30 font-medium">
                            {item.selected_variant.weight_label}
                          </span>
                          {item.is_eggless && (
                            <span className="bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-md border border-emerald-200">
                              Eggless
                            </span>
                          )}
                        </div>

                        {item.custom_message && (
                          <p className="mt-1.5 text-[11px] text-[#4B2923] bg-[#F7DCE2]/40 px-2 py-1 rounded-md italic">
                            "{item.custom_message}"
                          </p>
                        )}

                        <div className="mt-3 flex items-center justify-between">
                          <div className="flex items-center border border-[#D7BFAE] rounded-full bg-[#FFF7F0] px-1 py-0.5">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-6 h-6 flex items-center justify-center text-[#4B2923] hover:bg-white rounded-full transition-colors"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-8 text-center text-xs font-semibold text-[#4B2923]">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-6 h-6 flex items-center justify-center text-[#4B2923] hover:bg-white rounded-full transition-colors"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <div className="text-right">
                            <span className="text-sm font-bold text-[#4B2923]">
                              ₹{item.total_price}
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}

                {/* Delivery & Address Configuration in Bag */}
                {items.length > 0 && (
                  <div className="bg-white rounded-2xl p-3 sm:p-3.5 border border-[#D7BFAE]/50 shadow-xs space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#4B2923]">
                        Fulfillment:
                      </span>
                      <span className="text-[10px] text-[#8A554D] font-medium">
                        {deliveryMethod === 'local_delivery'
                          ? '📍 Inside Coimbatore'
                          : deliveryMethod === 'courier'
                          ? '📦 Pan-India Courier'
                          : '🏪 Studio Pickup'}
                      </span>
                    </div>

                    {/* 3-way toggle */}
                    <div className="grid grid-cols-3 gap-1 p-1 bg-[#FFF7F0] rounded-xl border border-[#D7BFAE]/40">
                      <button
                        type="button"
                        onClick={() => setDeliveryMethod('local_delivery')}
                        className={`py-1.5 px-1 rounded-lg text-[10px] font-bold transition-all text-center ${
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
                        className={`py-1.5 px-1 rounded-lg text-[10px] font-bold transition-all text-center ${
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
                        className={`py-1.5 px-1 rounded-lg text-[10px] font-bold transition-all text-center ${
                          deliveryMethod === 'pickup'
                            ? 'bg-[#4B2923] text-white shadow-xs'
                            : 'text-[#8A554D] hover:text-[#4B2923]'
                        }`}
                      >
                        Pickup
                      </button>
                    </div>

                    {/* Coimbatore Mode: Google Maps link */}
                    {deliveryMethod === 'local_delivery' && (
                      <div className="space-y-1.5 pt-0.5 text-xs">
                        <div className="flex items-center justify-between gap-2">
                          <label className="text-[10px] font-bold text-[#4B2923] flex items-center gap-1 uppercase tracking-wider">
                            <MapPin className="w-3.5 h-3.5 text-emerald-700" />
                            <span>Google Maps Pin *</span>
                          </label>
                          <button
                            type="button"
                            onClick={handleGetLocation}
                            disabled={isLocating}
                            className="text-[10px] text-emerald-800 hover:text-emerald-950 font-semibold flex items-center gap-1 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 cursor-pointer"
                          >
                            <Navigation className="w-3 h-3" />
                            <span>{isLocating ? 'Locating...' : '📍 Auto-Pin GPS'}</span>
                          </button>
                        </div>
                        <input
                          type="url"
                          value={googleMapsLink}
                          onChange={(e) => setGoogleMapsLink(e.target.value)}
                          placeholder="Paste https://maps.app.goo.gl/... link"
                          className="w-full text-xs p-2 rounded-xl border border-emerald-300 bg-[#FFF7F0] text-[#4B2923]"
                        />
                        <input
                          type="text"
                          value={localDoorDetails}
                          onChange={(e) => setLocalDoorDetails(e.target.value)}
                          placeholder="Door / Flat No. & Landmark (optional)"
                          className="w-full text-xs p-2 rounded-xl border border-[#D7BFAE]/50 bg-[#FFF7F0] text-[#4B2923]"
                        />
                      </div>
                    )}

                    {/* Courier Mode: Complete Address */}
                    {deliveryMethod === 'courier' && (
                      <div className="space-y-1.5 pt-0.5 text-xs">
                        <div className="flex items-center gap-1 text-[10px] font-bold text-[#4B2923] uppercase tracking-wider">
                          <Package className="w-3.5 h-3.5 text-amber-700" />
                          <span>Complete Courier Postal Address *</span>
                        </div>
                        <textarea
                          rows={2}
                          value={courierAddress}
                          onChange={(e) => setCourierAddress(e.target.value)}
                          placeholder="Door/Flat No, Building, Street, Locality *"
                          className="w-full text-xs p-2 rounded-xl border border-amber-300 bg-[#FFF7F0] text-[#4B2923]"
                        />
                        <div className="grid grid-cols-2 gap-2">
                          <input
                            type="text"
                            value={courierCity}
                            onChange={(e) => setCourierCity(e.target.value)}
                            placeholder="City / Town *"
                            className="w-full text-xs p-2 rounded-xl border border-[#D7BFAE]/60 bg-[#FFF7F0] text-[#4B2923]"
                          />
                          <input
                            type="text"
                            maxLength={6}
                            value={courierPincode}
                            onChange={(e) => setCourierPincode(e.target.value)}
                            placeholder="6-digit Pincode *"
                            className="w-full text-xs p-2 rounded-xl border border-[#D7BFAE]/60 bg-[#FFF7F0] text-[#4B2923]"
                          />
                        </div>
                      </div>
                    )}

                    {/* Pickup Mode */}
                    {deliveryMethod === 'pickup' && (
                      <div className="text-[11px] text-[#8A554D] bg-[#FFF7F0] p-2 rounded-xl border border-[#D7BFAE]/40 flex items-center gap-2">
                        <Store className="w-4 h-4 text-[#8A554D] shrink-0" />
                        <span>Podanur Kitchen Studio, Coimbatore (Free Pickup)</span>
                      </div>
                    )}

                    {validationError && (
                      <div className="p-2 bg-red-50 text-red-700 text-[11px] rounded-lg border border-red-200 flex items-center gap-1.5 font-medium">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{validationError}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Compact, Ultra-Slim Mobile-First Footer */}
              {items.length > 0 && (
                <div className="px-4 py-3 sm:px-5 sm:py-3.5 bg-white border-t border-[#D7BFAE]/40 shadow-[0_-4px_20px_rgba(75,41,35,0.06)] shrink-0">
                  <div className="flex items-center justify-between gap-3">
                    {/* Price Breakdown */}
                    <div className="min-w-0">
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-[10px] uppercase font-bold tracking-wider text-[#8A554D]">
                          Total:
                        </span>
                        <span className="font-serif font-bold text-lg sm:text-xl text-[#4B2923] leading-none">
                          ₹
                          {subtotal +
                            (deliveryMethod === 'pickup'
                              ? 0
                              : deliveryMethod === 'courier'
                              ? subtotal >= 1200
                                ? 0
                                : 120
                              : subtotal >= 1200
                              ? 0
                              : 80)}
                        </span>
                      </div>
                      <span className="text-[10px] text-emerald-800 font-semibold block truncate mt-0.5">
                        {deliveryMethod === 'pickup'
                          ? '✓ Free Studio Pickup'
                          : subtotal >= 1200
                          ? '🎉 Free Delivery'
                          : deliveryMethod === 'courier'
                          ? '+ ₹120 Courier'
                          : '+ ₹80 Delivery'}
                      </span>
                    </div>

                    {/* Compact Side-by-Side Action Buttons */}
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={handleWhatsAppOrder}
                        className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white px-3.5 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider shadow-sm transition-all active:scale-95 cursor-pointer"
                        title="Order via WhatsApp"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span>WhatsApp</span>
                      </button>

                      <Link
                        to={checkoutUrl}
                        onClick={closeCart}
                        className="inline-flex items-center gap-1.5 bg-[#4B2923] hover:bg-[#2F1916] text-white px-4 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider shadow-sm transition-all active:scale-95"
                      >
                        <span>Checkout</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
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

