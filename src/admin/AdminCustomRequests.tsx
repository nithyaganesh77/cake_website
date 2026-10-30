import React, { useState, useEffect } from 'react';
import { Sparkles, MessageCircle, Phone, CheckCircle2, Clock, X, Image as ImageIcon } from 'lucide-react';
import { dataProvider } from '@/services/dataProvider';
import { CustomCakeRequest } from '@/types';

export const AdminCustomRequests: React.FC = () => {
  const [requests, setRequests] = useState<CustomCakeRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedReq, setSelectedReq] = useState<CustomCakeRequest | null>(null);
  const [quotedPriceInput, setQuotedPriceInput] = useState<number>(0);

  const loadRequests = async () => {
    setIsLoading(true);
    try {
      const data = await dataProvider.getCustomCakeRequests();
      setRequests(data);
    } catch (e) {
      console.error('Failed to load custom requests', e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadRequests();
  }, []);

  const handleUpdateStatus = async (id: string, status: CustomCakeRequest['status']) => {
    try {
      const updated = await dataProvider.updateCustomCakeRequest(id, { status });
      if (selectedReq && selectedReq.id === id) {
        setSelectedReq(updated);
      }
      loadRequests();
    } catch (err: any) {
      alert('Status update failed: ' + err.message);
    }
  };

  const handleSaveQuote = async () => {
    if (!selectedReq) return;
    try {
      const updated = await dataProvider.updateCustomCakeRequest(selectedReq.id, {
        quoted_price: Number(quotedPriceInput),
        status: 'quote_sent',
      });
      setSelectedReq(updated);
      alert('Quoted price saved and status updated to Quote Sent!');
      loadRequests();
    } catch (err: any) {
      alert('Failed to save quote: ' + err.message);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif font-extrabold text-2xl sm:text-3xl text-[#4B2923]">
          Custom Cake Requests
        </h1>
        <p className="text-xs text-[#8A554D] mt-1">
          Review customer bespoke design ideas, reference photographs, and quote bespoke pricing.
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-[#D7BFAE]/40 shadow-sm overflow-hidden">
        {requests.length === 0 ? (
          <div className="p-12 text-center text-xs text-[#8A554D]">
            No custom cake builder submissions yet.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FFF7F0] text-[#4B2923] uppercase font-bold text-[10px] tracking-wider border-b border-[#D7BFAE]/30">
                <tr>
                  <th className="p-4">Reference #</th>
                  <th className="p-4">Customer</th>
                  <th className="p-4">Cake Type &amp; Flavour</th>
                  <th className="p-4">Theme &amp; Colors</th>
                  <th className="p-4">Date Required</th>
                  <th className="p-4">Reference Photo</th>
                  <th className="p-4">Quoted Price</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#D7BFAE]/20 text-[#8A554D]">
                {requests.map((req) => (
                  <tr key={req.id} className="hover:bg-[#FFF7F0]/40 transition-colors">
                    <td className="p-4 font-mono font-bold text-[#4B2923]">{req.reference_number}</td>
                    <td className="p-4">
                      <span className="font-bold text-[#4B2923] block text-sm">{req.customer_name}</span>
                      <span className="text-[11px] text-[#8A554D]">{req.customer_phone}</span>
                    </td>
                    <td className="p-4">
                      <span className="font-semibold text-[#4B2923] block">{req.cake_type}</span>
                      <span className="text-[10px] text-[#8A554D]">{req.flavor} ({req.size_or_servings})</span>
                    </td>
                    <td className="p-4 max-w-xs">
                      <span className="font-medium text-[#4B2923] block truncate">{req.theme_or_occasion}</span>
                      <span className="text-[10px] text-[#8A554D] block truncate">{req.color_palette}</span>
                    </td>
                    <td className="p-4 font-semibold text-[#4B2923]">{req.required_date}</td>
                    <td className="p-4">
                      {req.reference_image_url ? (
                        <img
                          src={req.reference_image_url}
                          alt="Reference preview"
                          className="w-10 h-10 object-cover rounded-lg border shadow-xs"
                        />
                      ) : (
                        <span className="text-[10px] text-gray-400">None attached</span>
                      )}
                    </td>
                    <td className="p-4 font-bold text-[#4B2923]">
                      {req.quoted_price ? `₹${req.quoted_price}` : <span className="text-amber-700 font-normal">Pending</span>}
                    </td>
                    <td className="p-4">
                      <span className="bg-[#FFF7F0] border border-[#D7BFAE] px-2.5 py-0.5 rounded-full text-[10px] font-semibold text-[#4B2923] uppercase">
                        {req.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => {
                          setSelectedReq(req);
                          setQuotedPriceInput(req.quoted_price || 0);
                        }}
                        className="p-2 bg-[#FFF7F0] rounded-xl hover:bg-[#F7DCE2] text-[#4B2923] transition-colors font-semibold text-xs"
                      >
                        Inspect
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Detail Inspection Modal */}
      {selectedReq && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 border border-[#D7BFAE]/50 shadow-2xl my-8 max-h-[90vh] overflow-y-auto space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-[#D7BFAE]/30">
              <div>
                <span className="text-[10px] uppercase tracking-wider font-semibold text-[#8A554D] block">
                  Custom Cake Inquiry
                </span>
                <h3 className="font-serif font-bold text-2xl text-[#4B2923]">
                  {selectedReq.reference_number}
                </h3>
              </div>
              <button onClick={() => setSelectedReq(null)}>
                <X className="w-5 h-5 text-[#8A554D]" />
              </button>
            </div>

            {/* Reference photo */}
            {selectedReq.reference_image_url && (
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#4B2923] block mb-2">
                  Customer Uploaded Reference
                </span>
                <img
                  src={selectedReq.reference_image_url}
                  alt="Customer Cake Reference"
                  className="w-full h-56 object-cover rounded-2xl border border-[#D7BFAE]/40 shadow-sm"
                />
              </div>
            )}

            <div className="bg-[#FFF7F0] p-4 rounded-2xl border border-[#D7BFAE]/40 text-xs space-y-1.5 text-[#8A554D]">
              <p><strong className="text-[#4B2923]">Customer:</strong> {selectedReq.customer_name} ({selectedReq.customer_phone})</p>
              <p><strong className="text-[#4B2923]">Cake:</strong> {selectedReq.cake_type} - {selectedReq.flavor}</p>
              <p><strong className="text-[#4B2923]">Portion / Servings:</strong> {selectedReq.size_or_servings}</p>
              <p><strong className="text-[#4B2923]">Theme &amp; Colors:</strong> {selectedReq.theme_or_occasion} • {selectedReq.color_palette}</p>
              {selectedReq.message_on_cake && (
                <p><strong className="text-[#4B2923]">Cake Message:</strong> "{selectedReq.message_on_cake}"</p>
              )}
              {selectedReq.additional_notes && (
                <p><strong className="text-[#4B2923]">Notes:</strong> {selectedReq.additional_notes}</p>
              )}
            </div>

            {/* Quoting Section */}
            <div className="p-4 border border-[#D7BFAE]/50 rounded-2xl space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-[#4B2923] block">
                Official Chef Quotation (₹):
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={quotedPriceInput}
                  onChange={(e) => setQuotedPriceInput(Number(e.target.value))}
                  placeholder="Enter quoted price"
                  className="flex-1 text-xs p-2.5 rounded-xl border border-[#D7BFAE] bg-[#FFF7F0]"
                />
                <button
                  onClick={handleSaveQuote}
                  className="bg-[#4B2923] text-white text-xs font-semibold px-4 py-2.5 rounded-xl hover:bg-[#2F1916]"
                >
                  Save Quote
                </button>
              </div>
            </div>

            {/* Quick WhatsApp contact with client */}
            <div className="pt-2">
              <a
                href={`https://wa.me/91${selectedReq.customer_phone.replace(/\D/g, '')}?text=Hello%20${selectedReq.customer_name},%20we%20have%20reviewed%20your%20custom%20cake%20request%20(${selectedReq.reference_number})%20for%20${selectedReq.required_date}.${quotedPriceInput ? `%20The%20custom%20quotation%20is%20Rs.%20${quotedPriceInput}.` : ''}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 bg-emerald-600 text-white py-3 px-5 rounded-full font-semibold text-xs uppercase tracking-wider shadow"
              >
                <MessageCircle className="w-4 h-4" />
                Message Customer on WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

