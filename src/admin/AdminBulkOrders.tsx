import React, { useState, useEffect } from 'react';
import { Users, Phone, MessageCircle, Calendar, Building2, Gift, Check } from 'lucide-react';
import { dataProvider } from '@/services/dataProvider';
import { BulkOrderRequest } from '@/types';

export const AdminBulkOrders: React.FC = () => {
  const [requests, setRequests] = useState<BulkOrderRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const data = await dataProvider.getBulkOrderRequests();
      setRequests(data);
    } catch (e) {
      console.error('Failed to load bulk requests', e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleUpdateStatus = async (id: string, status: BulkOrderRequest['status']) => {
    try {
      await dataProvider.updateBulkOrderRequest(id, { status });
      loadData();
    } catch (err: any) {
      alert('Status update failed: ' + err.message);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif font-extrabold text-2xl sm:text-3xl text-[#4B2923]">
          Bulk Gifting &amp; Event Orders
        </h1>
        <p className="text-xs text-[#8A554D] mt-1">
          Inquiries for corporate hampers, wedding favors, celebrations, and bulk dessert tables.
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-[#D7BFAE]/40 shadow-sm overflow-hidden">
        {requests.length === 0 ? (
          <div className="p-12 text-center text-xs text-[#8A554D]">
            No bulk orders or corporate enquiries submitted yet.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FFF7F0] text-[#4B2923] uppercase font-bold text-[10px] tracking-wider border-b border-[#D7BFAE]/30">
                <tr>
                  <th className="p-4">Reference</th>
                  <th className="p-4">Client</th>
                  <th className="p-4">Event &amp; Date</th>
                  <th className="p-4">Quantity / Boxes</th>
                  <th className="p-4">Requirements</th>
                  <th className="p-4">Location</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Connect</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#D7BFAE]/20 text-[#8A554D]">
                {requests.map((b) => (
                  <tr key={b.id} className="hover:bg-[#FFF7F0]/40 transition-colors">
                    <td className="p-4 font-mono font-bold text-[#4B2923]">{b.reference_number}</td>
                    <td className="p-4">
                      <span className="font-bold text-[#4B2923] block text-sm">{b.customer_name}</span>
                      <span className="text-[11px] text-[#8A554D]">{b.customer_phone}</span>
                    </td>
                    <td className="p-4">
                      <span className="font-semibold text-[#4B2923] block uppercase text-[11px]">
                        {b.event_type}
                      </span>
                      <span className="text-[11px] text-[#8A554D]">{b.event_date}</span>
                    </td>
                    <td className="p-4 font-semibold text-[#4B2923]">{b.estimated_quantity}</td>
                    <td className="p-4 max-w-xs">
                      <p className="text-[11px] line-clamp-2">{b.product_requirements}</p>
                    </td>
                    <td className="p-4">{b.delivery_location}</td>
                    <td className="p-4">
                      <select
                        value={b.status}
                        onChange={(e) => handleUpdateStatus(b.id, e.target.value as any)}
                        className="bg-[#FFF7F0] border border-[#D7BFAE] text-[10px] font-semibold text-[#4B2923] rounded-lg p-1.5 cursor-pointer uppercase"
                      >
                        <option value="pending">Pending</option>
                        <option value="contacted">Contacted</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="closed">Closed</option>
                      </select>
                    </td>
                    <td className="p-4 text-right">
                      <a
                        href={`https://wa.me/91${b.customer_phone.replace(/\D/g, '')}?text=Hello%20${b.customer_name},%20contacting%20you%20from%20Cakes%20%26%20Dessert%20regarding%20your%20Bulk%20Order%20Enquiry%20(${b.reference_number}).`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 text-white rounded-full font-semibold text-[11px] hover:bg-emerald-700 shadow-xs"
                      >
                        <MessageCircle className="w-3.5 h-3.5" /> WhatsApp
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

