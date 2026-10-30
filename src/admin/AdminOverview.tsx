import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ShoppingBag,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle,
  Calendar,
  Sparkles,
  Users,
  ArrowRight,
  Eye,
} from 'lucide-react';
import { dataProvider } from '@/services/dataProvider';
import { Order, CustomCakeRequest, BulkOrderRequest } from '@/types';

export const AdminOverview: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [customRequests, setCustomRequests] = useState<CustomCakeRequest[]>([]);
  const [bulkRequests, setBulkRequests] = useState<BulkOrderRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const [ord, custom, bulk] = await Promise.all([
          dataProvider.getOrders(),
          dataProvider.getCustomCakeRequests(),
          dataProvider.getBulkOrderRequests(),
        ]);
        setOrders(ord);
        setCustomRequests(custom);
        setBulkRequests(bulk);
      } catch (e) {
        console.error('Failed to load dashboard metrics', e);
      } finally {
        setIsLoading(false);
      }
    }
    loadStats();
  }, []);

  const totalOrdersCount = orders.length;
  const pendingOrders = orders.filter((o) => o.order_status === 'pending');
  const confirmedOrders = orders.filter((o) => o.order_status === 'confirmed' || o.order_status === 'preparing');
  const completedOrders = orders.filter((o) => o.order_status === 'completed');

  // Revenue metrics: clearly distinguish total order pipeline value from collected cash/paid revenue
  const totalBookedValue = orders.reduce((sum, o) => sum + o.total_amount, 0);
  const collectedPaidRevenue = orders
    .filter((o) => o.payment_status === 'paid')
    .reduce((sum, o) => sum + o.total_amount, 0);

  // Today's scheduled deliveries
  const todayStr = new Date().toISOString().split('T')[0];
  const todayOrders = orders.filter((o) => o.scheduled_date === todayStr);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-serif font-extrabold text-2xl sm:text-3xl text-[#4B2923]">
          Bakery Performance Overview
        </h1>
        <p className="text-xs text-[#8A554D] mt-1">
          Real-time metrics for pre-orders, custom inquiries, and production pipeline.
        </p>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Total Orders */}
        <div className="bg-white rounded-3xl p-6 border border-[#D7BFAE]/40 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#8A554D]">
              Total Orders
            </span>
            <div className="w-9 h-9 rounded-full bg-[#FFF7F0] flex items-center justify-center text-[#4B2923]">
              <ShoppingBag className="w-4 h-4" />
            </div>
          </div>
          <p className="font-serif font-bold text-3xl text-[#4B2923]">{totalOrdersCount}</p>
          <p className="text-[11px] text-[#8A554D] mt-1">
            <span className="text-emerald-700 font-semibold">{pendingOrders.length} pending</span> review
          </p>
        </div>

        {/* Collected Revenue */}
        <div className="bg-white rounded-3xl p-6 border border-[#D7BFAE]/40 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#8A554D]">
              Collected Revenue
            </span>
            <div className="w-9 h-9 rounded-full bg-emerald-50 text-emerald-800 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <p className="font-serif font-bold text-3xl text-[#4B2923]">₹{collectedPaidRevenue}</p>
          <p className="text-[11px] text-[#8A554D] mt-1">
            Booked Pipeline: <strong>₹{totalBookedValue}</strong>
          </p>
        </div>

        {/* Custom Cake Requests */}
        <div className="bg-white rounded-3xl p-6 border border-[#D7BFAE]/40 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#8A554D]">
              Custom Cake Enquiries
            </span>
            <div className="w-9 h-9 rounded-full bg-[#F7DCE2] text-[#4B2923] flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
          <p className="font-serif font-bold text-3xl text-[#4B2923]">{customRequests.length}</p>
          <p className="text-[11px] text-[#8A554D] mt-1">
            Bespoke designer requests
          </p>
        </div>

        {/* Today's Deliveries */}
        <div className="bg-white rounded-3xl p-6 border border-[#D7BFAE]/40 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#8A554D]">
              Today's Schedule
            </span>
            <div className="w-9 h-9 rounded-full bg-amber-50 text-amber-800 flex items-center justify-center">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <p className="font-serif font-bold text-3xl text-[#4B2923]">{todayOrders.length}</p>
          <p className="text-[11px] text-[#8A554D] mt-1">
            Deliveries &amp; studio pickups for today
          </p>
        </div>

      </div>

      {/* Recent Orders Section */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#D7BFAE]/40 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-serif font-bold text-xl text-[#4B2923]">
              Recent Pre-Orders
            </h2>
            <p className="text-xs text-[#8A554D]">Latest orders received across web storefront</p>
          </div>

          <Link
            to="/admin/orders"
            className="text-xs font-semibold text-[#4B2923] hover:text-[#8A554D] flex items-center gap-1"
          >
            Manage All Orders <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {orders.length === 0 ? (
          <div className="py-12 text-center text-xs text-[#8A554D]">
            No orders have been submitted yet. Place a test order from the website to see it appear here!
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FFF7F0] text-[#4B2923] uppercase font-bold text-[10px] tracking-wider">
                <tr>
                  <th className="p-3 rounded-l-xl">Order #</th>
                  <th className="p-3">Customer</th>
                  <th className="p-3">Scheduled Date</th>
                  <th className="p-3">Items</th>
                  <th className="p-3">Amount</th>
                  <th className="p-3">Payment</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 rounded-r-xl text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#D7BFAE]/20 text-[#8A554D]">
                {orders.slice(0, 5).map((o) => (
                  <tr key={o.id} className="hover:bg-[#FFF7F0]/40 transition-colors">
                    <td className="p-3 font-mono font-bold text-[#4B2923]">{o.order_number}</td>
                    <td className="p-3 font-medium text-[#4B2923]">
                      {o.customer_name}
                      <span className="block text-[10px] text-[#8A554D]">{o.customer_phone}</span>
                    </td>
                    <td className="p-3">
                      {o.scheduled_date}
                      <span className="block text-[10px] text-[#8A554D]">{o.scheduled_slot_label}</span>
                    </td>
                    <td className="p-3">{o.items.length} items</td>
                    <td className="p-3 font-bold text-[#4B2923]">₹{o.total_amount}</td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase ${
                        o.payment_status === 'paid' ? 'bg-emerald-50 text-emerald-800' : 'bg-amber-50 text-amber-800'
                      }`}>
                        {o.payment_status}
                      </span>
                    </td>
                    <td className="p-3">
                      <span className="bg-[#FFF7F0] border border-[#D7BFAE] px-2.5 py-0.5 rounded-full text-[10px] font-semibold text-[#4B2923] uppercase">
                        {o.order_status.replace(/_/g, ' ')}
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      <Link
                        to="/admin/orders"
                        className="p-1.5 rounded-lg hover:bg-[#FFF7F0] text-[#4B2923] inline-block"
                        title="View details"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Bottom Grid: Custom Cake Enquiries & Bulk Orders preview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Custom Cake Enquiries */}
        <div className="bg-white rounded-3xl p-6 border border-[#D7BFAE]/40 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-serif font-bold text-lg text-[#4B2923] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#E9AEBB]" />
              Latest Custom Cake Requests
            </h3>
            <Link to="/admin/custom-requests" className="text-xs text-[#8A554D] hover:text-[#4B2923]">
              View all →
            </Link>
          </div>

          {customRequests.length === 0 ? (
            <p className="text-xs text-[#8A554D] py-4">No custom requests yet.</p>
          ) : (
            <div className="space-y-3">
              {customRequests.slice(0, 3).map((req) => (
                <div key={req.id} className="p-3.5 rounded-2xl bg-[#FFF7F0] border border-[#D7BFAE]/30 text-xs flex justify-between items-center">
                  <div>
                    <span className="font-bold text-[#4B2923] block">{req.customer_name}</span>
                    <span className="text-[#8A554D] text-[11px]">
                      {req.cake_type} • Date: {req.required_date}
                    </span>
                  </div>
                  <span className="bg-white px-2.5 py-1 rounded-full text-[10px] font-semibold text-[#4B2923] border border-[#D7BFAE]/40 uppercase">
                    {req.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Bulk Requests */}
        <div className="bg-white rounded-3xl p-6 border border-[#D7BFAE]/40 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-serif font-bold text-lg text-[#4B2923] flex items-center gap-2">
              <Users className="w-4 h-4 text-[#8A554D]" />
              Bulk &amp; Event Orders
            </h3>
            <Link to="/admin/bulk-orders" className="text-xs text-[#8A554D] hover:text-[#4B2923]">
              View all →
            </Link>
          </div>

          {bulkRequests.length === 0 ? (
            <p className="text-xs text-[#8A554D] py-4">No bulk event enquiries yet.</p>
          ) : (
            <div className="space-y-3">
              {bulkRequests.slice(0, 3).map((b) => (
                <div key={b.id} className="p-3.5 rounded-2xl bg-[#FFF7F0] border border-[#D7BFAE]/30 text-xs flex justify-between items-center">
                  <div>
                    <span className="font-bold text-[#4B2923] block">{b.customer_name}</span>
                    <span className="text-[#8A554D] text-[11px]">
                      {b.event_type.toUpperCase()} • Qty: {b.estimated_quantity}
                    </span>
                  </div>
                  <span className="bg-white px-2.5 py-1 rounded-full text-[10px] font-semibold text-[#4B2923] border border-[#D7BFAE]/40 uppercase">
                    {b.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

