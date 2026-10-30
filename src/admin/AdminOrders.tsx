import React, { useState, useEffect } from 'react';
import {
  ShoppingBag,
  Search,
  Filter,
  Download,
  Eye,
  CheckCircle2,
  Clock,
  Truck,
  Phone,
  MessageCircle,
  X,
  CreditCard,
  FileText,
} from 'lucide-react';
import { dataProvider } from '@/services/dataProvider';
import { Order, OrderStatus, PaymentStatus } from '@/types';

export const AdminOrders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [internalNotesInput, setInternalNotesInput] = useState('');

  const loadOrders = async () => {
    setIsLoading(true);
    try {
      const data = await dataProvider.getOrders();
      setOrders(data);
    } catch (e) {
      console.error('Failed to load orders', e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const handleUpdateStatus = async (orderId: string, nextStatus: OrderStatus) => {
    try {
      const updated = await dataProvider.updateOrderStatus(orderId, nextStatus);
      if (selectedOrder && selectedOrder.id === orderId) {
        setSelectedOrder(updated);
      }
      loadOrders();
    } catch (err: any) {
      alert('Status update failed: ' + err.message);
    }
  };

  const handleUpdatePayment = async (orderId: string, nextPayment: PaymentStatus) => {
    try {
      const updated = await dataProvider.updatePaymentStatus(orderId, nextPayment);
      if (selectedOrder && selectedOrder.id === orderId) {
        setSelectedOrder(updated);
      }
      loadOrders();
    } catch (err: any) {
      alert('Payment update failed: ' + err.message);
    }
  };

  const handleSaveNotes = async () => {
    if (!selectedOrder) return;
    try {
      const updated = await dataProvider.updateOrderStatus(selectedOrder.id, selectedOrder.order_status, internalNotesInput);
      setSelectedOrder(updated);
      alert('Internal bakery notes saved!');
      loadOrders();
    } catch (err: any) {
      alert('Failed to save notes: ' + err.message);
    }
  };

  const exportCSV = () => {
    if (orders.length === 0) {
      alert('No orders to export');
      return;
    }

    const headers = ['Order Number', 'Date Placed', 'Customer Name', 'Phone', 'Scheduled Date', 'Slot', 'Total Amount', 'Payment Status', 'Order Status'];
    const rows = orders.map((o) => [
      o.order_number,
      new Date(o.created_at).toLocaleDateString(),
      `"${o.customer_name}"`,
      `"${o.customer_phone}"`,
      o.scheduled_date,
      `"${o.scheduled_slot_label}"`,
      o.total_amount,
      o.payment_status,
      o.order_status,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Cakes_And_Dessert_Orders_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filtered = orders.filter((o) => {
    const matchSearch =
      o.order_number.toLowerCase().includes(search.toLowerCase()) ||
      o.customer_name.toLowerCase().includes(search.toLowerCase()) ||
      o.customer_phone.includes(search);
    const matchStatus = statusFilter === 'all' || o.order_status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="space-y-6">
      {/* Title & Export */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif font-extrabold text-2xl sm:text-3xl text-[#4B2923]">
            Pre-Orders &amp; Deliveries
          </h1>
          <p className="text-xs text-[#8A554D] mt-1">
            Track customer orders, production schedules, and offline payment verifications.
          </p>
        </div>

        <button
          onClick={exportCSV}
          className="inline-flex items-center gap-2 bg-white text-[#4B2923] border border-[#D7BFAE] py-2.5 px-5 rounded-full font-semibold text-xs uppercase tracking-wider hover:bg-[#FFF7F0] shadow-xs"
        >
          <Download className="w-4 h-4" />
          Export Orders (CSV)
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-3xl p-4 border border-[#D7BFAE]/40 shadow-xs flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8A554D]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by order ID, customer name or phone..."
            className="w-full pl-10 pr-4 py-2 bg-[#FFF7F0] border border-[#D7BFAE] rounded-xl text-xs text-[#4B2923] focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-[#8A554D]" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-[#FFF7F0] border border-[#D7BFAE] text-xs font-semibold text-[#4B2923] rounded-xl p-2 cursor-pointer"
          >
            <option value="all">All Order Statuses</option>
            <option value="pending">Pending</option>
            <option value="contacted">Contacted</option>
            <option value="confirmed">Confirmed</option>
            <option value="preparing">Preparing</option>
            <option value="ready">Ready</option>
            <option value="out_for_delivery">Out for Delivery</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-3xl border border-[#D7BFAE]/40 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FFF7F0] text-[#4B2923] uppercase font-bold text-[10px] tracking-wider border-b border-[#D7BFAE]/30">
              <tr>
                <th className="p-4">Order ID</th>
                <th className="p-4">Customer</th>
                <th className="p-4">Delivery / Slot</th>
                <th className="p-4">Items</th>
                <th className="p-4">Amount</th>
                <th className="p-4">Payment Status</th>
                <th className="p-4">Production Status</th>
                <th className="p-4 text-right">View</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#D7BFAE]/20 text-[#8A554D]">
              {filtered.map((order) => (
                <tr key={order.id} className="hover:bg-[#FFF7F0]/40 transition-colors">
                  <td className="p-4 font-mono font-bold text-[#4B2923]">{order.order_number}</td>
                  <td className="p-4">
                    <span className="font-bold text-[#4B2923] block text-sm">{order.customer_name}</span>
                    <a href={`tel:${order.customer_phone}`} className="text-[11px] hover:underline text-[#8A554D]">
                      {order.customer_phone}
                    </a>
                  </td>
                  <td className="p-4">
                    <span className="font-semibold text-[#4B2923] block">{order.scheduled_date}</span>
                    <span className="text-[10px] text-[#8A554D]">{order.scheduled_slot_label}</span>
                    <span className="block text-[10px] text-amber-800 capitalize font-medium mt-0.5">
                      {order.delivery_method}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="font-semibold text-[#4B2923]">{order.items.length} items</span>
                    <span className="block text-[10px] text-[#8A554D] truncate max-w-xs">
                      {order.items.map((i) => i.product_name).join(', ')}
                    </span>
                  </td>
                  <td className="p-4 font-serif font-bold text-sm text-[#4B2923]">₹{order.total_amount}</td>
                  <td className="p-4">
                    <select
                      value={order.payment_status}
                      onChange={(e) => handleUpdatePayment(order.id, e.target.value as PaymentStatus)}
                      className="bg-[#FFF7F0] border border-[#D7BFAE] text-[10px] font-semibold text-[#4B2923] rounded-lg p-1.5 cursor-pointer uppercase"
                    >
                      <option value="unpaid">Unpaid</option>
                      <option value="payment_pending">Payment Pending</option>
                      <option value="partially_paid">Partially Paid</option>
                      <option value="paid">Paid</option>
                      <option value="refunded">Refunded</option>
                    </select>
                  </td>
                  <td className="p-4">
                    <select
                      value={order.order_status}
                      onChange={(e) => handleUpdateStatus(order.id, e.target.value as OrderStatus)}
                      className="bg-[#FFF7F0] border border-[#D7BFAE] text-[10px] font-semibold text-[#4B2923] rounded-lg p-1.5 cursor-pointer uppercase"
                    >
                      <option value="pending">Pending</option>
                      <option value="contacted">Contacted</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="preparing">Preparing</option>
                      <option value="ready">Ready</option>
                      <option value="out_for_delivery">Out for Delivery</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => {
                        setSelectedOrder(order);
                        setInternalNotesInput(order.internal_notes || '');
                      }}
                      className="p-2 rounded-xl bg-[#FFF7F0] hover:bg-[#F7DCE2] text-[#4B2923] transition-colors"
                      title="Inspect Order Details"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 border border-[#D7BFAE]/50 shadow-2xl my-8 max-h-[90vh] overflow-y-auto space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-[#D7BFAE]/30">
              <div>
                <span className="text-[10px] uppercase tracking-wider font-semibold text-[#8A554D] block">
                  Order Details
                </span>
                <h3 className="font-serif font-bold text-2xl text-[#4B2923]">
                  {selectedOrder.order_number}
                </h3>
              </div>
              <button onClick={() => setSelectedOrder(null)}>
                <X className="w-5 h-5 text-[#8A554D]" />
              </button>
            </div>

            {/* Customer Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs bg-[#FFF7F0] p-4 rounded-2xl border border-[#D7BFAE]/40">
              <div>
                <span className="font-bold text-[#4B2923] block text-sm">{selectedOrder.customer_name}</span>
                <p className="mt-1">
                  <strong>Phone:</strong> {selectedOrder.customer_phone}
                </p>
                {selectedOrder.customer_email && (
                  <p><strong>Email:</strong> {selectedOrder.customer_email}</p>
                )}
                <div className="mt-3 flex gap-2">
                  <a
                    href={`https://wa.me/91${selectedOrder.customer_phone.replace(/\D/g, '')}?text=Hello%20${selectedOrder.customer_name},%20contacting%20you%20from%20Cakes%20%26%20Dessert%20regarding%20Order%20${selectedOrder.order_number}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 text-white rounded-full font-semibold text-[11px]"
                  >
                    <MessageCircle className="w-3.5 h-3.5" /> WhatsApp
                  </a>
                  <a
                    href={`tel:${selectedOrder.customer_phone}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#4B2923] text-white rounded-full font-semibold text-[11px]"
                  >
                    <Phone className="w-3.5 h-3.5" /> Call
                  </a>
                </div>
              </div>

              <div>
                <strong className="text-[#4B2923] block">Fulfillment Scheduled:</strong>
                <p className="mt-1">Method: {selectedOrder.delivery_method === 'delivery' ? 'Local Delivery' : 'Studio Pickup'}</p>
                <p>Date: {selectedOrder.scheduled_date}</p>
                <p>Slot: {selectedOrder.scheduled_slot_label}</p>
                {selectedOrder.delivery_address && (
                  <p className="mt-1 pt-1 border-t border-[#D7BFAE]/30">
                    <strong>Address:</strong> {selectedOrder.delivery_address}, {selectedOrder.delivery_pincode}
                  </p>
                )}
              </div>
            </div>

            {/* Items */}
            <div>
              <h4 className="font-serif font-bold text-sm text-[#4B2923] mb-2">Bake Items in Order</h4>
              <div className="divide-y divide-[#D7BFAE]/30 text-xs">
                {selectedOrder.items.map((item, idx) => (
                  <div key={idx} className="py-2.5 flex items-center justify-between">
                    <div>
                      <span className="font-bold text-[#4B2923]">{item.product_name}</span>
                      <span className="text-[#8A554D] text-[11px] block">
                        {item.variant_weight} • Qty {item.quantity} {item.is_eggless && '• Eggless'}
                      </span>
                      {item.custom_message && (
                        <span className="text-[10px] text-amber-900 italic block">
                          Board Message: "{item.custom_message}"
                        </span>
                      )}
                    </div>
                    <span className="font-bold text-[#4B2923]">₹{item.total_price}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-[#D7BFAE]/40 pt-3 text-xs flex justify-between font-bold text-[#4B2923]">
                <span>Total Amount</span>
                <span>₹{selectedOrder.total_amount}</span>
              </div>
            </div>

            {/* Internal Notes */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-[#4B2923] block mb-1">
                Internal Kitchen Notes:
              </label>
              <textarea
                rows={2}
                value={internalNotesInput}
                onChange={(e) => setInternalNotesInput(e.target.value)}
                placeholder="Special frosting notes, confirmed payment via UPI reference, etc..."
                className="w-full text-xs p-3 rounded-xl border border-[#D7BFAE] bg-[#FFF7F0]"
              />
              <button
                type="button"
                onClick={handleSaveNotes}
                className="mt-2 text-xs bg-[#4B2923] text-white py-1.5 px-4 rounded-full font-semibold hover:bg-[#2F1916]"
              >
                Save Notes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
