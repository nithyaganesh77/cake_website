import React, { useState } from 'react';
import {
  Gift,
  Building2,
  Heart,
  Sparkles,
  CheckCircle2,
  Calendar,
  Send,
  MessageCircle,
  Package,
} from 'lucide-react';
import { dataProvider } from '@/services/dataProvider';
import { BulkOrderRequest } from '@/types';
import { bulkOrderRequestSchema } from '@/schemas/orderSchema';

export const BulkOrders: React.FC = () => {
  const [formData, setFormData] = useState({
    customer_name: '',
    customer_phone: '',
    customer_email: '',
    event_type: 'corporate' as const,
    event_date: '',
    estimated_quantity: '',
    product_requirements: '',
    budget_range: '₹5,000 – ₹10,000',
    delivery_location: 'Coimbatore',
    additional_notes: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedEnquiry, setSubmittedEnquiry] = useState<BulkOrderRequest | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = bulkOrderRequestSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        if (issue.path[0]) fieldErrors[issue.path[0] as string] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      const created = await dataProvider.createBulkOrderRequest(formData);
      setSubmittedEnquiry(created);
    } catch (err: any) {
      console.error('Failed to submit bulk order enquiry', err);
      alert('Failed to submit enquiry: ' + (err.message || 'Please retry'));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submittedEnquiry) {
    const waText = encodeURIComponent(
      `Hello Cakes & Dessert! I have submitted a Bulk & Event Order Enquiry.\n\n` +
      `Reference: ${submittedEnquiry.reference_number}\n` +
      `Name: ${submittedEnquiry.customer_name}\n` +
      `Event: ${submittedEnquiry.event_type.toUpperCase()} on ${submittedEnquiry.event_date}\n` +
      `Estimated Quantity: ${submittedEnquiry.estimated_quantity}\n` +
      `Requirements: ${submittedEnquiry.product_requirements}\n\n` +
      `Please let me know the bulk pricing and tasting options!`
    );

    return (
      <div className="bg-[#FFF7F0] min-h-screen py-16 px-4">
        <div className="max-w-2xl mx-auto bg-white rounded-3xl p-8 sm:p-12 border border-[#D7BFAE]/50 shadow-xl text-center space-y-6">
          <div className="w-20 h-20 bg-[#F7DCE2] rounded-full flex items-center justify-center text-[#4B2923] mx-auto">
            <CheckCircle2 className="w-10 h-10 text-emerald-600" />
          </div>

          <span className="text-xs uppercase tracking-widest font-semibold text-[#8A554D] block">
            Bulk Enquiry Lodged
          </span>

          <h1 className="text-3xl font-serif font-bold text-[#4B2923]">
            Thank You, {submittedEnquiry.customer_name}!
          </h1>

          <p className="text-sm text-[#8A554D] leading-relaxed">
            Your bulk order inquiry (<strong className="text-[#4B2923]">{submittedEnquiry.reference_number}</strong>) has been received. Our event coordinator will prepare a tailored proposal with sample options.
          </p>

          <div className="bg-[#FFF7F0] rounded-2xl p-4 border border-[#D7BFAE]/40 text-left text-xs space-y-1.5 text-[#8A554D]">
            <p><strong className="text-[#4B2923]">Event Type:</strong> {submittedEnquiry.event_type.toUpperCase()}</p>
            <p><strong className="text-[#4B2923]">Date:</strong> {submittedEnquiry.event_date}</p>
            <p><strong className="text-[#4B2923]">Est. Volume:</strong> {submittedEnquiry.estimated_quantity}</p>
            <p><strong className="text-[#4B2923]">Status:</strong> Under Review</p>
          </div>

          <a
            href={`https://wa.me/917841716999?text=${waText}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center gap-2 bg-[#4B2923] text-white py-4 px-6 rounded-full font-semibold text-xs uppercase tracking-wider shadow hover:bg-[#2F1916] transition-all"
          >
            <MessageCircle className="w-4 h-4 text-[#E9AEBB]" />
            Connect Immediately on WhatsApp (+91 78417 16999)
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FFF7F0] min-h-screen py-12 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs uppercase tracking-widest font-semibold text-[#8A554D] block mb-2">
            Weddings • Corporate • Return Gifting
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif font-extrabold text-[#4B2923] tracking-tight">
            Bulk &amp; Event Orders
          </h1>
          <div className="w-16 h-0.5 bg-[#E9AEBB] mx-auto mt-4 mb-4" />
          <p className="text-sm text-[#8A554D] leading-relaxed">
            Elevate your corporate events, wedding hampers, festive gifting, and milestone gatherings with handcrafted brownies and luxury patisserie gift boxes.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-3xl p-6 border border-[#D7BFAE]/30 shadow-sm text-center">
            <Gift className="w-8 h-8 text-[#E9AEBB] mx-auto mb-3" />
            <h3 className="font-serif font-bold text-base text-[#4B2923] mb-1">Curated Gift Boxes</h3>
            <p className="text-xs text-[#8A554D]">Signature brownie tins &amp; dessert jars with customized corporate branding.</p>
          </div>
          <div className="bg-white rounded-3xl p-6 border border-[#D7BFAE]/30 shadow-sm text-center">
            <Heart className="w-8 h-8 text-[#E9AEBB] mx-auto mb-3" />
            <h3 className="font-serif font-bold text-base text-[#4B2923] mb-1">Wedding Favours</h3>
            <p className="text-xs text-[#8A554D]">Mini bento boxes, artisan cookies, and return hampers for guests.</p>
          </div>
          <div className="bg-white rounded-3xl p-6 border border-[#D7BFAE]/30 shadow-sm text-center">
            <Building2 className="w-8 h-8 text-[#E9AEBB] mx-auto mb-3" />
            <h3 className="font-serif font-bold text-base text-[#4B2923] mb-1">Corporate Catering</h3>
            <p className="text-xs text-[#8A554D]">Dessert tables, festive celebration drops, and employee appreciation bakes.</p>
          </div>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#D7BFAE]/40 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            <h3 className="font-serif font-bold text-2xl text-[#4B2923] border-b border-[#D7BFAE]/30 pb-3">
              Event Details &amp; Volume
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[#4B2923] block mb-1">
                  Full Name / Company Representative *
                </label>
                <input
                  type="text"
                  value={formData.customer_name}
                  onChange={(e) => setFormData({ ...formData, customer_name: e.target.value })}
                  placeholder="e.g. Ramesh Iyer (Infosys HR)"
                  className="w-full text-xs p-3.5 rounded-xl border border-[#D7BFAE] bg-[#FFF7F0]"
                />
                {errors.customer_name && <p className="text-red-600 text-xs mt-1">{errors.customer_name}</p>}
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[#4B2923] block mb-1">
                  Mobile Phone Number *
                </label>
                <input
                  type="tel"
                  value={formData.customer_phone}
                  onChange={(e) => setFormData({ ...formData, customer_phone: e.target.value })}
                  placeholder="e.g. 9842109876"
                  className="w-full text-xs p-3.5 rounded-xl border border-[#D7BFAE] bg-[#FFF7F0]"
                />
                {errors.customer_phone && <p className="text-red-600 text-xs mt-1">{errors.customer_phone}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[#4B2923] block mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={formData.customer_email}
                  onChange={(e) => setFormData({ ...formData, customer_email: e.target.value })}
                  placeholder="ramesh@company.com"
                  className="w-full text-xs p-3.5 rounded-xl border border-[#D7BFAE] bg-[#FFF7F0]"
                />
                {errors.customer_email && <p className="text-red-600 text-xs mt-1">{errors.customer_email}</p>}
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[#4B2923] block mb-1">
                  Event Type *
                </label>
                <select
                  value={formData.event_type}
                  onChange={(e) => setFormData({ ...formData, event_type: e.target.value as any })}
                  className="w-full text-xs p-3.5 rounded-xl border border-[#D7BFAE] bg-[#FFF7F0] text-[#4B2923]"
                >
                  <option value="corporate">Corporate Gifting / Celebration</option>
                  <option value="wedding">Wedding / Sangeet Favours</option>
                  <option value="birthday">Birthday Party Catering</option>
                  <option value="return_gifts">Celebratory Return Gifts</option>
                  <option value="other">Other Milestone Occasion</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[#4B2923] block mb-1">
                  Event Date *
                </label>
                <input
                  type="date"
                  value={formData.event_date}
                  onChange={(e) => setFormData({ ...formData, event_date: e.target.value })}
                  className="w-full text-xs p-3.5 rounded-xl border border-[#D7BFAE] bg-[#FFF7F0]"
                />
                {errors.event_date && <p className="text-red-600 text-xs mt-1">{errors.event_date}</p>}
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[#4B2923] block mb-1">
                  Estimated Quantity / Boxes *
                </label>
                <input
                  type="text"
                  value={formData.estimated_quantity}
                  onChange={(e) => setFormData({ ...formData, estimated_quantity: e.target.value })}
                  placeholder="e.g. 50 boxes of 4 brownies"
                  className="w-full text-xs p-3.5 rounded-xl border border-[#D7BFAE] bg-[#FFF7F0]"
                />
                {errors.estimated_quantity && <p className="text-red-600 text-xs mt-1">{errors.estimated_quantity}</p>}
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[#4B2923] block mb-1">
                  Delivery Venue / Area *
                </label>
                <input
                  type="text"
                  value={formData.delivery_location}
                  onChange={(e) => setFormData({ ...formData, delivery_location: e.target.value })}
                  placeholder="e.g. Tidel Park, Coimbatore"
                  className="w-full text-xs p-3.5 rounded-xl border border-[#D7BFAE] bg-[#FFF7F0]"
                />
                {errors.delivery_location && <p className="text-red-600 text-xs mt-1">{errors.delivery_location}</p>}
              </div>
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-[#4B2923] block mb-1">
                Product Requirements &amp; Dietary Preferences *
              </label>
              <textarea
                rows={3}
                value={formData.product_requirements}
                onChange={(e) => setFormData({ ...formData, product_requirements: e.target.value })}
                placeholder="Describe your desired items (e.g. 50% Belgian truffle, 50% assorted nut brownies; custom branded ribbons required)..."
                className="w-full text-xs p-3.5 rounded-xl border border-[#D7BFAE] bg-[#FFF7F0]"
              />
              {errors.product_requirements && <p className="text-red-600 text-xs mt-1">{errors.product_requirements}</p>}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#4B2923] text-white py-4 px-6 rounded-full font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-[#2F1916] transition-all shadow-md"
            >
              <Send className="w-4 h-4 text-[#E9AEBB]" />
              {isSubmitting ? 'Submitting Enquiry...' : 'Request Bulk Quote & Consultation'}
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};

