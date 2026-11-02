import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import confetti from 'canvas-confetti';
import {
  CheckCircle2,
  Copy,
  Check,
  Calendar,
  Clock,
  Truck,
  Store,
  MessageCircle,
  QrCode,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CreditCard,
  MapPin,
  Navigation,
  Package,
} from 'lucide-react';
import { dataProvider } from '@/services/dataProvider';
import { Order, SiteSettings } from '@/types';

export const OrderConfirmation: React.FC = () => {
  const { orderNumber } = useParams<{ orderNumber: string }>();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') || '';

  const [order, setOrder] = useState<Order | null>(null);
  const [siteSettings, setSiteSettings] = useState<SiteSettings | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    async function loadOrder() {
      if (!orderNumber) return;
      try {
        const [foundOrder, settings] = await Promise.all([
          dataProvider.getOrderByTracking(orderNumber, token),
          dataProvider.getSiteSettings(),
        ]);
        setOrder(foundOrder);
        setSiteSettings(settings);

        if (foundOrder) {
          // Trigger celebration confetti
          try {
            confetti({
              particleCount: 80,
              spread: 60,
              origin: { y: 0.6 },
              colors: ['#4B2923', '#E9AEBB', '#D7BFAE', '#FFF7F0'],
            });
          } catch {
            // ignore
          }
        }
      } catch (err) {
        console.error('Failed to load confirmed order', err);
      } finally {
        setIsLoading(false);
      }
    }
    loadOrder();
  }, [orderNumber, token]);

  const copyOrderNumber = () => {
    if (!order) return;
    navigator.clipboard.writeText(order.order_number);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (isLoading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="w-12 h-12 rounded-full border-4 border-[#E9AEBB] border-t-[#4B2923] animate-spin" />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="max-w-md mx-auto text-center py-24 px-4">
        <h2 className="font-serif font-bold text-2xl text-[#4B2923] mb-2">Order Not Found</h2>
        <p className="text-sm text-[#8A554D] mb-6">
          We could not locate this order with the provided credentials.
        </p>
        <Link
          to="/"
          className="bg-[#4B2923] text-white px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider"
        >
          Return to Bakery
        </Link>
      </div>
    );
  }

  // Generate WhatsApp message with exact delivery requirements
  const itemsSummary = order.items
    .map((i) => `• ${i.product_name} (${i.variant_weight}) x${i.quantity}${i.custom_message ? ` ["${i.custom_message}"]` : ''}`)
    .join('\n');

  let deliveryDetailsText = '';
  if (order.delivery_method === 'courier') {
    deliveryDetailsText =
      `📦 *FULFILLMENT: Pan-India Express Courier*\n` +
      `🏠 *Complete Postal Address:*\n` +
      `${order.delivery_address || 'Address provided'}\n` +
      `City: ${order.delivery_city || 'City'}\n` +
      `State: ${order.delivery_state || 'State'}\n` +
      `📮 Pincode: ${order.delivery_pincode || 'Pincode'}\n` +
      (order.delivery_landmark ? `🚩 Landmark: ${order.delivery_landmark}\n` : '');
  } else if (order.delivery_method === 'local_delivery' || order.delivery_method === 'delivery') {
    deliveryDetailsText =
      `📍 *FULFILLMENT: Doorstep Delivery (Inside Coimbatore)*\n` +
      `🔗 *Google Maps Pin:* ${order.google_maps_link || 'Link provided'}\n` +
      (order.delivery_address ? `🏠 House / Door Details: ${order.delivery_address}\n` : '') +
      (order.delivery_pincode ? `📮 Pincode: ${order.delivery_pincode}\n` : '') +
      (order.delivery_landmark ? `🚩 Landmark: ${order.delivery_landmark}\n` : '');
  } else {
    deliveryDetailsText =
      `🏪 *FULFILLMENT: Studio Pickup (Podanur, Coimbatore)*\n` +
      `📍 *Pickup Address:* ${siteSettings?.address_pickup || 'Podanur Main Road, Coimbatore 641023'}\n`;
  }

  const whatsappMessage = encodeURIComponent(
    `🎂 *Hello Cakes & Dessert! I would like to confirm my pre-order.* 🎂\n\n` +
    `*Order ID:* ${order.order_number}\n` +
    `*Customer:* ${order.customer_name} (${order.customer_phone})\n\n` +
    `${deliveryDetailsText}\n` +
    `*Scheduled Date:* ${order.scheduled_date}\n` +
    `*Time Window:* ${order.scheduled_slot_label}\n\n` +
    `*Items Ordered:*\n${itemsSummary}\n\n` +
    `*Total Amount:* ₹${order.total_amount}\n` +
    `*Payment Preference:* ${order.payment_method_preference.toUpperCase()}\n\n` +
    `Please confirm kitchen preparation schedule and payment details!`
  );

  return (
    <div className="bg-[#FFF7F0] min-h-screen py-12 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        
        {/* Celebration Header Box */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#D7BFAE]/50 shadow-xl text-center relative overflow-hidden">
          <div className="w-20 h-20 bg-[#F7DCE2] rounded-full flex items-center justify-center text-[#4B2923] mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-emerald-600" />
          </div>

          <span className="text-xs uppercase tracking-widest font-semibold text-[#8A554D] block mb-2">
            Order Confirmed &amp; Baking Slot Reserved
          </span>

          <h1 className="text-3xl sm:text-4xl font-serif font-extrabold text-[#4B2923] mb-3">
            Thank You, {order.customer_name}!
          </h1>

          <p className="text-sm text-[#8A554D] max-w-lg mx-auto leading-relaxed mb-6">
            Your celebration order has been successfully recorded in our kitchen. Our pastry chefs are preparing to craft your bakes fresh for your scheduled slot.
          </p>

          {/* Order ID Pill */}
          <div className="inline-flex items-center gap-2 bg-[#FFF7F0] px-4 py-2.5 rounded-2xl border border-[#D7BFAE]/60 shadow-xs mb-8">
            <span className="text-xs text-[#8A554D]">Order ID:</span>
            <span className="font-mono font-bold text-sm text-[#4B2923]">{order.order_number}</span>
            <button
              onClick={copyOrderNumber}
              className="p-1 text-[#8A554D] hover:text-[#4B2923] transition-colors ml-1"
              title="Copy Order ID"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>

          {/* Quick WhatsApp Action Button */}
          <div className="max-w-md mx-auto">
            <a
              href={`https://wa.me/918637478423?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2.5 bg-emerald-600 text-white py-4 px-6 rounded-full font-semibold text-xs uppercase tracking-wider shadow-lg hover:bg-emerald-700 transition-all hover:scale-[1.02]"
            >
              <MessageCircle className="w-4 h-4" />
              Send Order Summary to WhatsApp (+91 863 747 8423)
            </a>
            <p className="text-[11px] text-[#8A554D] mt-2">
              Share your order summary with our baker to receive instant status updates and UPI QR.
            </p>
          </div>
        </div>

        {/* Fulfillment & Payment Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Scheduling Card */}
          <div className="bg-white rounded-3xl p-6 border border-[#D7BFAE]/40 shadow-sm space-y-4">
            <h3 className="font-serif font-bold text-lg text-[#4B2923] flex items-center gap-2">
              <Calendar className="w-5 h-5 text-[#8A554D]" />
              Fulfillment Schedule
            </h3>

            <div className="space-y-2 text-xs text-[#8A554D]">
              <div className="flex justify-between py-1 border-b border-[#D7BFAE]/20">
                <span>Method:</span>
                <span className="font-bold text-[#4B2923]">
                  {order.delivery_method === 'courier'
                    ? 'Pan-India Express Courier'
                    : order.delivery_method === 'local_delivery' || order.delivery_method === 'delivery'
                    ? 'Doorstep Delivery (Coimbatore)'
                    : 'Studio Pickup (Podanur)'}
                </span>
              </div>

              <div className="flex justify-between py-1 border-b border-[#D7BFAE]/20">
                <span>Scheduled Date:</span>
                <span className="font-bold text-[#4B2923]">{order.scheduled_date}</span>
              </div>

              <div className="flex justify-between py-1 border-b border-[#D7BFAE]/20">
                <span>Time Slot:</span>
                <span className="font-bold text-[#4B2923]">{order.scheduled_slot_label}</span>
              </div>

              {/* Inside Coimbatore Delivery: Google Maps Pin */}
              {(order.delivery_method === 'local_delivery' || order.delivery_method === 'delivery') && (
                <div className="pt-2 border-t border-[#D7BFAE]/20 space-y-2">
                  <span className="block font-semibold text-[#4B2923]">Coimbatore Delivery Destination:</span>
                  {order.google_maps_link && (
                    <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-200">
                      <span className="text-[11px] font-bold text-emerald-800 block mb-1">
                        📍 Google Maps Pin:
                      </span>
                      <a
                        href={order.google_maps_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-semibold transition-colors shadow-xs"
                      >
                        <Navigation className="w-3 h-3" />
                        <span>Open Location in Google Maps</span>
                      </a>
                    </div>
                  )}
                  {order.delivery_address && (
                    <p className="leading-relaxed bg-[#FFF7F0] p-2.5 rounded-xl border border-[#D7BFAE]/30 text-[11px]">
                      <strong>Door / Street:</strong> {order.delivery_address}
                      {order.delivery_pincode && `, ${order.delivery_pincode}`}
                      {order.delivery_landmark && ` (Near: ${order.delivery_landmark})`}
                    </p>
                  )}
                </div>
              )}

              {/* Pan-India Courier: Complete Address */}
              {order.delivery_method === 'courier' && (
                <div className="pt-2 border-t border-[#D7BFAE]/20 space-y-2">
                  <span className="block font-semibold text-[#4B2923]">Courier Postal Address:</span>
                  <div className="leading-relaxed bg-[#FFF7F0] p-3 rounded-xl border border-[#D7BFAE]/30 text-xs">
                    <p className="font-semibold text-[#4B2923]">{order.delivery_address}</p>
                    <p className="text-[#8A554D] mt-0.5">
                      {order.delivery_city}, {order.delivery_state} — {order.delivery_pincode}
                    </p>
                    {order.delivery_landmark && (
                      <p className="text-[11px] text-[#8A554D] mt-1">
                        <strong>Landmark:</strong> {order.delivery_landmark}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Studio Pickup */}
              {order.delivery_method === 'pickup' && (
                <div className="pt-2 border-t border-[#D7BFAE]/20">
                  <span className="block font-semibold text-[#4B2923]">Pickup Studio:</span>
                  <p className="leading-relaxed bg-[#FFF7F0] p-2.5 rounded-xl border border-[#D7BFAE]/30 text-[11px]">
                    {siteSettings?.address_pickup || 'Podanur Main Road, Coimbatore 641023'}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Payment Card */}
          <div className="bg-white rounded-3xl p-6 border border-[#D7BFAE]/40 shadow-sm space-y-4">
            <h3 className="font-serif font-bold text-lg text-[#4B2923] flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-[#8A554D]" />
              Payment Instructions
            </h3>

            <div className="space-y-2.5 text-xs text-[#8A554D]">
              <div className="flex justify-between py-1 border-b border-[#D7BFAE]/20">
                <span>Payment Preference:</span>
                <span className="font-bold text-[#4B2923] uppercase">
                  {order.payment_method_preference.replace(/_/g, ' ')}
                </span>
              </div>

              <div className="flex justify-between py-1 border-b border-[#D7BFAE]/20">
                <span>Payment Status:</span>
                <span className="bg-amber-50 text-amber-800 px-2 py-0.5 rounded-full font-semibold border border-amber-200">
                  Payment Pending
                </span>
              </div>

              {order.payment_method_preference === 'upi' && siteSettings?.upi_id && (
                <div className="bg-[#FFF7F0] p-3.5 rounded-xl border border-[#D7BFAE]/40 space-y-1">
                  <span className="font-semibold text-[#4B2923] block">Direct UPI Payment:</span>
                  <p className="font-mono text-xs font-bold text-[#4B2923]">{siteSettings.upi_id}</p>
                  <p className="text-[11px] text-[#8A554D]">Name: {siteSettings.upi_recipient_name}</p>
                </div>
              )}

              {order.payment_method_preference === 'bank_transfer' && siteSettings?.bank_transfer_details && (
                <div className="bg-[#FFF7F0] p-3.5 rounded-xl border border-[#D7BFAE]/40 space-y-1">
                  <span className="font-semibold text-[#4B2923] block">Bank Transfer Details:</span>
                  <p className="text-[11px] leading-relaxed text-[#4B2923]">{siteSettings.bank_transfer_details}</p>
                </div>
              )}
            </div>
          </div>

        </div>

        {/* Ordered Items Breakdown */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#D7BFAE]/40 shadow-sm">
          <h3 className="font-serif font-bold text-lg text-[#4B2923] mb-4">
            Items in This Order
          </h3>

          <div className="divide-y divide-[#D7BFAE]/30 space-y-3">
            {order.items.map((item, idx) => (
              <div key={idx} className="pt-3 first:pt-0 flex items-center justify-between gap-4 text-xs">
                <div className="flex items-center gap-3">
                  <img
                    src={item.image}
                    alt={item.product_name}
                    className="w-12 h-12 rounded-xl object-cover border border-[#D7BFAE]/40"
                  />
                  <div>
                    <h5 className="font-serif font-bold text-sm text-[#4B2923]">{item.product_name}</h5>
                    <p className="text-[#8A554D]">
                      {item.variant_weight} • Qty {item.quantity}
                      {item.is_eggless && ' • Eggless Option Available'}
                    </p>
                    {item.custom_message && (
                      <p className="text-[11px] text-[#4B2923] italic">"{item.custom_message}"</p>
                    )}
                  </div>
                </div>
                <span className="font-serif font-bold text-sm text-[#4B2923]">₹{item.total_price}</span>
              </div>
            ))}
          </div>

          <div className="border-t border-[#D7BFAE]/40 mt-6 pt-4 space-y-1.5 text-xs text-[#8A554D]">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-semibold text-[#4B2923]">₹{order.subtotal}</span>
            </div>
            <div className="flex justify-between">
              <span>Fulfillment Fee</span>
              <span className="font-semibold text-[#4B2923]">
                {order.delivery_fee === 0 ? 'FREE' : `₹${order.delivery_fee}`}
              </span>
            </div>
            <div className="border-t border-[#D7BFAE]/40 pt-2 flex justify-between text-base font-serif font-bold text-[#4B2923]">
              <span>Total Amount</span>
              <span>₹{order.total_amount}</span>
            </div>
          </div>
        </div>

        {/* Secure Tracking Link */}
        <div className="text-center pt-4">
          <Link
            to={`/track-order?order=${order.order_number}&token=${order.tracking_token}`}
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#4B2923] hover:text-[#8A554D] underline"
          >
            Bookmark or View Live Order Status Timeline →
          </Link>
        </div>

      </div>
    </div>
  );
};

