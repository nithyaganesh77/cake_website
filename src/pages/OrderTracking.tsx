import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  Search,
  CheckCircle2,
  Clock,
  Truck,
  Cake,
  AlertCircle,
  ShieldCheck,
  PhoneCall,
  Calendar,
  Sparkles,
} from 'lucide-react';
import { dataProvider } from '@/services/dataProvider';
import { Order, OrderStatus } from '@/types';

export const OrderTracking: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const urlOrder = searchParams.get('order') || '';
  const urlToken = searchParams.get('token') || '';

  const [orderNumber, setOrderNumber] = useState(urlOrder);
  const [verificationInput, setVerificationInput] = useState(urlToken);
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const performSearch = async (num: string, verif: string) => {
    if (!num.trim() || !verif.trim()) {
      setErrorMessage('Please provide both Order Number and Verification Phone / Token.');
      return;
    }

    setIsLoading(true);
    setErrorMessage('');
    try {
      const result = await dataProvider.getOrderByTracking(num, verif);
      if (result) {
        setOrder(result);
      } else {
        setOrder(null);
        setErrorMessage('No order matched the provided Order Number and verification phone/token.');
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to retrieve order status.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (urlOrder && urlToken) {
      performSearch(urlOrder, urlToken);
    }
  }, [urlOrder, urlToken]);

  const handleTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchParams({ order: orderNumber.trim(), token: verificationInput.trim() });
    performSearch(orderNumber, verificationInput);
  };

  const statusSteps: { key: OrderStatus; label: string; icon: any }[] = [
    { key: 'pending', label: 'Order Received', icon: Clock },
    { key: 'confirmed', label: 'Order Confirmed', icon: CheckCircle2 },
    { key: 'preparing', label: 'Freshly Baking', icon: Cake },
    { key: 'ready', label: 'Decorated & Packaged', icon: Sparkles },
    { key: 'out_for_delivery', label: 'Out for Delivery / Ready for Pickup', icon: Truck },
    { key: 'completed', label: 'Delivered / Fulfilled', icon: CheckCircle2 },
  ];

  const getStepIndex = (status: OrderStatus) => {
    switch (status) {
      case 'pending': return 0;
      case 'contacted': return 0;
      case 'confirmed': return 1;
      case 'preparing': return 2;
      case 'ready': return 3;
      case 'out_for_delivery': return 4;
      case 'completed': return 5;
      default: return 0;
    }
  };

  return (
    <div className="bg-[#FFF7F0] min-h-screen py-12 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto">
          <span className="text-xs uppercase tracking-widest font-semibold text-[#8A554D] block mb-2">
            Order Status &amp; Timeline
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif font-extrabold text-[#4B2923] tracking-tight">
            Track Your Celebration Cake
          </h1>
          <p className="text-xs sm:text-sm text-[#8A554D] mt-2 leading-relaxed">
            Enter your Order Number and phone number or secure tracking token to view the real-time kitchen progress.
          </p>
        </div>

        {/* Tracking Search Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#D7BFAE]/40 shadow-sm">
          <form onSubmit={handleTrackSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[#4B2923] block mb-1">
                  Order Number
                </label>
                <input
                  type="text"
                  value={orderNumber}
                  onChange={(e) => setOrderNumber(e.target.value)}
                  placeholder="e.g. CND-2026-8921"
                  className="w-full text-xs p-3.5 rounded-xl border border-[#D7BFAE] bg-[#FFF7F0] font-mono text-[#4B2923]"
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[#4B2923] block mb-1">
                  Verification Phone or Token
                </label>
                <input
                  type="text"
                  value={verificationInput}
                  onChange={(e) => setVerificationInput(e.target.value)}
                  placeholder="Phone (e.g. 9842109876) or Token"
                  className="w-full text-xs p-3.5 rounded-xl border border-[#D7BFAE] bg-[#FFF7F0] text-[#4B2923]"
                />
              </div>
            </div>

            {errorMessage && (
              <div className="p-3 bg-red-50 text-red-700 text-xs rounded-xl flex items-center gap-2 border border-red-200">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#4B2923] text-white py-3.5 px-6 rounded-full font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-[#2F1916] transition-all"
            >
              <Search className="w-4 h-4 text-[#E9AEBB]" />
              {isLoading ? 'Searching Kitchen Database...' : 'Track Order Status'}
            </button>
          </form>
        </div>

        {/* Order Result Card */}
        {order && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#D7BFAE]/50 shadow-md space-y-8">
            
            {/* Header info */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#D7BFAE]/30 pb-6">
              <div>
                <span className="text-xs uppercase tracking-wider text-[#8A554D] block font-medium">Order Status</span>
                <h3 className="font-serif font-extrabold text-2xl text-[#4B2923]">{order.order_number}</h3>
                <p className="text-xs text-[#8A554D]">Placed on {new Date(order.created_at).toLocaleDateString()}</p>
              </div>

              <div className="flex flex-wrap gap-2">
                <span className="bg-[#FFF7F0] text-[#4B2923] border border-[#D7BFAE] text-xs font-semibold px-3 py-1 rounded-full uppercase">
                  Status: {order.order_status.replace(/_/g, ' ')}
                </span>
                <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold px-3 py-1 rounded-full uppercase">
                  Payment: {order.payment_status.replace(/_/g, ' ')}
                </span>
              </div>
            </div>

            {/* Timeline Progress */}
            {order.order_status === 'cancelled' ? (
              <div className="bg-red-50 text-red-800 p-4 rounded-2xl border border-red-200 text-xs">
                <strong>Order Cancelled:</strong> This order has been cancelled. If you have questions, please contact our bakery via WhatsApp.
              </div>
            ) : (
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#4B2923] mb-6">
                  Kitchen Progress Timeline
                </h4>

                <div className="space-y-6">
                  {statusSteps.map((step, idx) => {
                    const currentIdx = getStepIndex(order.order_status);
                    const isDone = idx <= currentIdx;
                    const isCurrent = idx === currentIdx;
                    const Icon = step.icon;

                    return (
                      <div key={step.key} className="flex items-start gap-4 relative">
                        {/* Connecting line */}
                        {idx < statusSteps.length - 1 && (
                          <div
                            className={`absolute left-4 top-8 bottom-0 w-0.5 -mb-6 ${
                              idx < currentIdx ? 'bg-emerald-600' : 'bg-gray-200'
                            }`}
                          />
                        )}

                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 z-10 transition-colors ${
                            isDone
                              ? 'bg-emerald-600 text-white'
                              : 'bg-gray-100 text-gray-400 border border-gray-300'
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                        </div>

                        <div>
                          <h5
                            className={`text-sm font-semibold ${
                              isDone ? 'text-[#4B2923]' : 'text-gray-400'
                            }`}
                          >
                            {step.label}
                          </h5>
                          {isCurrent && (
                            <p className="text-xs text-emerald-700 mt-0.5 font-medium">
                              Current stage • Scheduled for {order.scheduled_date} ({order.scheduled_slot_label})
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Schedule & Items Recap */}
            <div className="border-t border-[#D7BFAE]/30 pt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-[#8A554D]">
              <div className="space-y-1">
                <span className="font-semibold text-[#4B2923] block">Fulfillment Scheduled:</span>
                <p>{order.delivery_method === 'delivery' ? 'Local Doorstep Delivery' : 'Studio Kitchen Pickup'}</p>
                <p>Date: {order.scheduled_date}</p>
                <p>Slot: {order.scheduled_slot_label}</p>
              </div>

              <div className="space-y-1">
                <span className="font-semibold text-[#4B2923] block">Total Amount:</span>
                <p className="font-serif font-bold text-lg text-[#4B2923]">₹{order.total_amount}</p>
                <p>Payment: {order.payment_method_preference.toUpperCase()}</p>
              </div>
            </div>

            {/* Need Help WhatsApp Button */}
            <div className="pt-2 text-center">
              <a
                href={`https://wa.me/917841716999?text=Hello%20Cakes%20%26%20Dessert!%20I%20have%20an%20enquiry%20regarding%20my%20Order%20${order.order_number}.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-semibold text-[#4B2923] hover:text-[#8A554D] bg-[#FFF7F0] px-5 py-2.5 rounded-full border border-[#D7BFAE]"
              >
                <PhoneCall className="w-3.5 h-3.5 text-[#E9AEBB]" />
                Enquire via WhatsApp (+91 78417 16999)
              </a>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};

