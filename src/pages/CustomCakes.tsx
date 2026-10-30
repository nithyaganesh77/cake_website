import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Cake,
  Palette,
  Sparkles,
  Calendar,
  Upload,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  MessageCircle,
  HelpCircle,
  Clock,
  Check,
} from 'lucide-react';
import { dataProvider } from '@/services/dataProvider';
import { CustomCakeRequest, DeliveryMethod } from '@/types';
import { customCakeRequestSchema } from '@/schemas/orderSchema';

export const CustomCakes: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedRequest, setSubmittedRequest] = useState<CustomCakeRequest | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Form State
  const [formData, setFormData] = useState({
    customer_name: '',
    customer_phone: '',
    customer_email: '',
    cake_type: 'Single Tier Designer Cake',
    flavor: 'Belgian Dark Truffle Ganache',
    size_or_servings: '1.0 Kg (Serves 8-12 Guests)',
    theme_or_occasion: 'Birthday Celebration',
    color_palette: 'Blush Pink & Champagne Gold',
    message_on_cake: '',
    required_date: '',
    delivery_method: 'delivery' as DeliveryMethod,
    additional_notes: '',
    estimated_budget: '₹1,500 – ₹2,500',
  });

  const [referenceImageFile, setReferenceImageFile] = useState<File | null>(null);
  const [referenceImagePreview, setReferenceImagePreview] = useState<string | null>(null);

  // Tomorrow + 2 days (48 hours minimum advance)
  const minDate = new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString().split('T')[0];

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setReferenceImageFile(file);
      const reader = new FileReader();
      reader.onload = () => setReferenceImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleNextStep = () => {
    // Validate step 1
    if (currentStep === 1) {
      if (!formData.cake_type || !formData.flavor || !formData.size_or_servings) {
        alert('Please complete the cake type, flavour, and portion options.');
        return;
      }
    }
    // Validate step 2
    if (currentStep === 2) {
      if (!formData.theme_or_occasion.trim() || !formData.color_palette.trim()) {
        alert('Please specify the celebration theme and preferred color palette.');
        return;
      }
    }
    // Validate step 3
    if (currentStep === 3) {
      if (!formData.required_date) {
        alert('Please select your celebration date (minimum 48 hours advance notice).');
        return;
      }
    }

    setCurrentStep((prev) => Math.min(prev + 1, 4));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = customCakeRequestSchema.safeParse(formData);
    if (!result.success) {
      const formatted: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        if (issue.path[0]) formatted[issue.path[0] as string] = issue.message;
      });
      setErrors(formatted);
      return;
    }

    setIsSubmitting(true);
    try {
      let uploadedUrl: string | undefined = undefined;
      if (referenceImageFile) {
        uploadedUrl = await dataProvider.uploadImage(referenceImageFile, 'custom_requests');
      }

      const created = await dataProvider.createCustomCakeRequest({
        ...formData,
        reference_image_url: uploadedUrl || undefined,
      });

      setSubmittedRequest(created);
    } catch (err: any) {
      console.error('Failed to submit custom cake enquiry', err);
      alert('Unable to submit request: ' + (err.message || 'Please try again.'));
    } finally {
      setIsSubmitting(false);
    }
  };

  // If successfully submitted, show luxury confirmation screen
  if (submittedRequest) {
    const whatsappText = encodeURIComponent(
      `Hello Cakes & Dessert! I have submitted a Custom Cake Request.\n\n` +
      `Reference: ${submittedRequest.reference_number}\n` +
      `Name: ${submittedRequest.customer_name}\n` +
      `Type: ${submittedRequest.cake_type}\n` +
      `Flavor: ${submittedRequest.flavor}\n` +
      `Date Required: ${submittedRequest.required_date}\n` +
      `Theme: ${submittedRequest.theme_or_occasion}\n\n` +
      `Please review and share the custom quote.`
    );

    return (
      <div className="bg-[#FFF7F0] min-h-screen py-16 px-4">
        <div className="max-w-2xl mx-auto bg-white rounded-3xl p-8 sm:p-12 border border-[#D7BFAE]/50 shadow-xl text-center">
          <div className="w-20 h-20 bg-[#F7DCE2] rounded-full flex items-center justify-center text-[#4B2923] mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-emerald-600" />
          </div>

          <span className="text-xs uppercase tracking-widest font-semibold text-[#8A554D] block mb-2">
            Request Received
          </span>

          <h1 className="text-3xl font-serif font-bold text-[#4B2923] mb-3">
            Your Custom Cake Request is in Our Studio!
          </h1>

          <p className="text-sm text-[#8A554D] leading-relaxed mb-6">
            Thank you, <strong className="text-[#4B2923]">{submittedRequest.customer_name}</strong>. Our chef is reviewing your theme, flavor profile, and reference photos.
          </p>

          <div className="bg-[#FFF7F0] rounded-2xl p-5 border border-[#D7BFAE]/40 text-left space-y-2 mb-8 text-xs text-[#8A554D]">
            <div className="flex justify-between border-b border-[#D7BFAE]/30 pb-2">
              <span className="font-semibold text-[#4B2923]">Enquiry Reference:</span>
              <span className="font-mono font-bold text-[#4B2923]">{submittedRequest.reference_number}</span>
            </div>
            <div className="flex justify-between">
              <span>Required Date:</span>
              <span className="font-semibold text-[#4B2923]">{submittedRequest.required_date}</span>
            </div>
            <div className="flex justify-between">
              <span>Cake Type:</span>
              <span className="font-semibold text-[#4B2923]">{submittedRequest.cake_type}</span>
            </div>
            <div className="flex justify-between">
              <span>Flavour &amp; Portion:</span>
              <span className="font-semibold text-[#4B2923]">{submittedRequest.flavor} ({submittedRequest.size_or_servings})</span>
            </div>
            <div className="flex justify-between pt-1">
              <span>Status:</span>
              <span className="font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                Under Chef Review
              </span>
            </div>
          </div>

          <div className="space-y-3">
            <a
              href={`https://wa.me/917841716999?text=${whatsappText}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 bg-[#4B2923] text-white py-4 px-6 rounded-full font-semibold text-xs uppercase tracking-wider shadow hover:bg-[#2F1916] transition-all"
            >
              <MessageCircle className="w-4 h-4 text-[#E9AEBB]" />
              Connect on WhatsApp with Chef (+91 78417 16999)
            </a>

            <button
              onClick={() => {
                setSubmittedRequest(null);
                setCurrentStep(1);
              }}
              className="w-full text-xs text-[#8A554D] hover:text-[#4B2923] py-2"
            >
              Submit Another Custom Request
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FFF7F0] min-h-screen py-12 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs uppercase tracking-widest font-semibold text-[#8A554D] block mb-2">
            Bespoke Celebration Studio
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-extrabold text-[#4B2923] tracking-tight">
            Custom Cake Builder
          </h1>
          <div className="w-16 h-0.5 bg-[#E9AEBB] mx-auto mt-3 mb-3" />
          <p className="text-sm text-[#8A554D]">
            Share your dream design, flavours, and reference photos. We'll verify slot availability and provide an exact quotation.
          </p>
        </div>

        {/* Multi-step Progress Bar */}
        <div className="bg-white rounded-3xl p-4 sm:p-6 border border-[#D7BFAE]/40 shadow-sm mb-8">
          <div className="flex items-center justify-between text-xs font-semibold text-[#8A554D]">
            <span className={currentStep >= 1 ? 'text-[#4B2923]' : ''}>1. Base &amp; Flavour</span>
            <span className={currentStep >= 2 ? 'text-[#4B2923]' : ''}>2. Theme &amp; Style</span>
            <span className={currentStep >= 3 ? 'text-[#4B2923]' : ''}>3. Date &amp; Photos</span>
            <span className={currentStep >= 4 ? 'text-[#4B2923]' : ''}>4. Review &amp; Submit</span>
          </div>
          <div className="w-full bg-[#FFF7F0] h-2 rounded-full mt-3 overflow-hidden border border-[#D7BFAE]/30">
            <motion.div
              className="bg-[#4B2923] h-full"
              animate={{ width: `${(currentStep / 4) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Builder Form Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#D7BFAE]/40 shadow-md">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* STEP 1: Base & Flavour */}
            {currentStep === 1 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                <div>
                  <h3 className="font-serif font-bold text-xl text-[#4B2923] mb-1">
                    Select Cake Structure &amp; Portions
                  </h3>
                  <p className="text-xs text-[#8A554D]">
                    How many guests will be celebrating with you?
                  </p>
                </div>

                {/* Cake Type */}
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-[#4B2923] block mb-2">
                    Cake Architecture:
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      { title: 'Single Tier Designer Cake', desc: 'Ideal for 6 to 14 guests' },
                      { title: 'Two-Tier Celebration Cake', desc: 'Perfect for grand birthdays & engagements (16-30 guests)' },
                      { title: 'Semi-Naked Floral Cake', desc: 'Rustic botanical look with fresh seasonal florals' },
                      { title: 'Korean Bento Mini Set', desc: 'Cute mini 4" cake + 4 matching cupcakes' },
                    ].map((type) => (
                      <button
                        key={type.title}
                        type="button"
                        onClick={() => setFormData({ ...formData, cake_type: type.title })}
                        className={`text-left p-4 rounded-2xl border transition-all text-xs ${
                          formData.cake_type === type.title
                            ? 'border-[#4B2923] bg-[#FFF7F0] ring-1 ring-[#4B2923]'
                            : 'border-[#D7BFAE]/40 hover:border-[#8A554D]'
                        }`}
                      >
                        <span className="font-bold text-[#4B2923] block text-sm">{type.title}</span>
                        <span className="text-[#8A554D] text-[11px] mt-0.5 block">{type.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Flavour */}
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-[#4B2923] block mb-2">
                    Gourmet Flavour Profile:
                  </label>
                  <select
                    value={formData.flavor}
                    onChange={(e) => setFormData({ ...formData, flavor: e.target.value })}
                    className="w-full text-xs p-3.5 rounded-xl border border-[#D7BFAE] bg-[#FFF7F0] font-medium text-[#4B2923] focus:ring-1 focus:ring-[#4B2923]"
                  >
                    <option value="Belgian Dark Truffle Ganache">Belgian Dark Truffle Ganache (Chef Signature)</option>
                    <option value="Velvet Rose & Cream Cheese">Velvet Rose & Cream Cheese</option>
                    <option value="Lotus Biscoff Crunch Torte">Lotus Biscoff Crunch Torte</option>
                    <option value="Roasted Nutella Hazelnut Praline">Roasted Nutella Hazelnut Praline</option>
                    <option value="Persian Pistachio & Rose Water">Persian Pistachio & Rose Water</option>
                    <option value="Madagascar Vanilla Bean & Fresh Berry Compote">Madagascar Vanilla Bean & Fresh Berry Compote</option>
                  </select>
                </div>

                {/* Size / Servings */}
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-[#4B2923] block mb-2">
                    Size / Number of Servings:
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {[
                      '0.5 Kg (Serves 4-6)',
                      '1.0 Kg (Serves 8-12)',
                      '1.5 Kg (Serves 14-18)',
                      '2.0 Kg+ (Serves 20+)',
                    ].map((sz) => (
                      <button
                        key={sz}
                        type="button"
                        onClick={() => setFormData({ ...formData, size_or_servings: sz })}
                        className={`p-3 rounded-xl border text-center text-xs font-semibold transition-all ${
                          formData.size_or_servings === sz
                            ? 'border-[#4B2923] bg-[#FFF7F0] ring-1 ring-[#4B2923] text-[#4B2923]'
                            : 'border-[#D7BFAE]/50 text-[#8A554D] hover:border-[#8A554D]'
                        }`}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 2: Theme & Style */}
            {currentStep === 2 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                <div>
                  <h3 className="font-serif font-bold text-xl text-[#4B2923] mb-1">
                    Theme, Occasion &amp; Aesthetics
                  </h3>
                  <p className="text-xs text-[#8A554D]">
                    Help us visualize the look and mood of your celebration.
                  </p>
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-[#4B2923] block mb-1.5">
                    Occasion / Theme:
                  </label>
                  <input
                    type="text"
                    value={formData.theme_or_occasion}
                    onChange={(e) => setFormData({ ...formData, theme_or_occasion: e.target.value })}
                    placeholder="e.g., 1st Birthday Pastel Jungle, Elegant Golden 50th Anniversary, Minimal Floral"
                    className="w-full text-xs p-3.5 rounded-xl border border-[#D7BFAE] bg-[#FFF7F0] focus:ring-1 focus:ring-[#4B2923]"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-[#4B2923] block mb-1.5">
                    Color Palette Preference:
                  </label>
                  <input
                    type="text"
                    value={formData.color_palette}
                    onChange={(e) => setFormData({ ...formData, color_palette: e.target.value })}
                    placeholder="e.g., Blush Pink, Cream & Soft Sage Green; Dark Chocolate with Gold Dust"
                    className="w-full text-xs p-3.5 rounded-xl border border-[#D7BFAE] bg-[#FFF7F0] focus:ring-1 focus:ring-[#4B2923]"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-[#4B2923] block mb-1.5">
                    Piped Calligraphy Message (Board or Cake):
                  </label>
                  <input
                    type="text"
                    value={formData.message_on_cake}
                    onChange={(e) => setFormData({ ...formData, message_on_cake: e.target.value })}
                    placeholder="e.g., Happy 30th Birthday Rahul! • Forever & Always"
                    maxLength={40}
                    className="w-full text-xs p-3.5 rounded-xl border border-[#D7BFAE] bg-[#FFF7F0] focus:ring-1 focus:ring-[#4B2923]"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-[#4B2923] block mb-1.5">
                    Estimated Budget Range (Optional):
                  </label>
                  <select
                    value={formData.estimated_budget}
                    onChange={(e) => setFormData({ ...formData, estimated_budget: e.target.value })}
                    className="w-full text-xs p-3.5 rounded-xl border border-[#D7BFAE] bg-[#FFF7F0] text-[#4B2923]"
                  >
                    <option value="₹1,200 – ₹1,800">₹1,200 – ₹1,800</option>
                    <option value="₹1,800 – ₹2,500">₹1,800 – ₹2,500</option>
                    <option value="₹2,500 – ₹4,000">₹2,500 – ₹4,000</option>
                    <option value="₹4,000+ (Grand Multi-Tier / Fondant Work)">₹4,000+ (Grand Multi-Tier / Fondant Work)</option>
                  </select>
                </div>
              </motion.div>
            )}

            {/* STEP 3: Date, Image & Fulfillment */}
            {currentStep === 3 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                <div>
                  <h3 className="font-serif font-bold text-xl text-[#4B2923] mb-1">
                    Scheduling &amp; Reference Photos
                  </h3>
                  <p className="text-xs text-[#8A554D]">
                    Custom cakes require at least 48 hours notice for handcrafted embellishments.
                  </p>
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-[#4B2923] block mb-1.5">
                    Celebration Date Required:
                  </label>
                  <input
                    type="date"
                    min={minDate}
                    value={formData.required_date}
                    onChange={(e) => setFormData({ ...formData, required_date: e.target.value })}
                    className="w-full text-xs p-3.5 rounded-xl border border-[#D7BFAE] bg-[#FFF7F0] text-[#4B2923] focus:ring-1 focus:ring-[#4B2923]"
                  />
                </div>

                {/* Reference Photo Upload */}
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-[#4B2923] block mb-1.5">
                    Upload Reference Image (Pinterest / Instagram / Sketch):
                  </label>
                  
                  <div className="border-2 border-dashed border-[#D7BFAE] rounded-2xl p-6 text-center bg-[#FFF7F0]/50 hover:bg-[#FFF7F0] transition-colors relative">
                    {referenceImagePreview ? (
                      <div className="space-y-3">
                        <img
                          src={referenceImagePreview}
                          alt="Cake reference preview"
                          className="w-32 h-32 object-cover rounded-xl mx-auto shadow-md border"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setReferenceImageFile(null);
                            setReferenceImagePreview(null);
                          }}
                          className="text-xs text-red-600 hover:underline block mx-auto"
                        >
                          Remove photo
                        </button>
                      </div>
                    ) : (
                      <>
                        <Upload className="w-8 h-8 text-[#8A554D] mx-auto mb-2" />
                        <p className="text-xs font-semibold text-[#4B2923]">
                          Click to upload or drag &amp; drop reference photo
                        </p>
                        <p className="text-[10px] text-[#8A554D] mt-1">PNG, JPG or WEBP up to 5MB</p>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="absolute inset-0 opacity-0 cursor-pointer"
                        />
                      </>
                    )}
                  </div>
                </div>

                {/* Delivery vs Pickup */}
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-[#4B2923] block mb-2">
                    Fulfillment Preference:
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, delivery_method: 'delivery' })}
                      className={`p-3.5 rounded-2xl border text-xs font-semibold text-center transition-all ${
                        formData.delivery_method === 'delivery'
                          ? 'border-[#4B2923] bg-[#FFF7F0] ring-1 ring-[#4B2923] text-[#4B2923]'
                          : 'border-[#D7BFAE]/50 text-[#8A554D]'
                      }`}
                    >
                      Doorstep Delivery (Coimbatore)
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, delivery_method: 'pickup' })}
                      className={`p-3.5 rounded-2xl border text-xs font-semibold text-center transition-all ${
                        formData.delivery_method === 'pickup'
                          ? 'border-[#4B2923] bg-[#FFF7F0] ring-1 ring-[#4B2923] text-[#4B2923]'
                          : 'border-[#D7BFAE]/50 text-[#8A554D]'
                      }`}
                    >
                      Studio Pickup (Podanur)
                    </button>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-[#4B2923] block mb-1.5">
                    Additional Instructions or Allergies:
                  </label>
                  <textarea
                    rows={3}
                    value={formData.additional_notes}
                    onChange={(e) => setFormData({ ...formData, additional_notes: e.target.value })}
                    placeholder="Specific design notes, allergy mentions, eggless instructions, or preferred delivery timing..."
                    className="w-full text-xs p-3.5 rounded-xl border border-[#D7BFAE] bg-[#FFF7F0] focus:ring-1 focus:ring-[#4B2923]"
                  />
                </div>
              </motion.div>
            )}

            {/* STEP 4: Review & Contact Submission */}
            {currentStep === 4 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                <div>
                  <h3 className="font-serif font-bold text-xl text-[#4B2923] mb-1">
                    Contact Details &amp; Final Review
                  </h3>
                  <p className="text-xs text-[#8A554D]">
                    We'll contact you with the design mockup and confirmed quote.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-[#4B2923] block mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={formData.customer_name}
                      onChange={(e) => setFormData({ ...formData, customer_name: e.target.value })}
                      placeholder="e.g. Priya Sundaram"
                      className="w-full text-xs p-3 rounded-xl border border-[#D7BFAE] bg-[#FFF7F0]"
                    />
                    {errors.customer_name && <p className="text-red-600 text-[11px] mt-1">{errors.customer_name}</p>}
                  </div>

                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-[#4B2923] block mb-1">
                      Phone Number (WhatsApp) *
                    </label>
                    <input
                      type="tel"
                      value={formData.customer_phone}
                      onChange={(e) => setFormData({ ...formData, customer_phone: e.target.value })}
                      placeholder="e.g. 9876543210"
                      className="w-full text-xs p-3 rounded-xl border border-[#D7BFAE] bg-[#FFF7F0]"
                    />
                    {errors.customer_phone && <p className="text-red-600 text-[11px] mt-1">{errors.customer_phone}</p>}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-[#4B2923] block mb-1">
                    Email Address (Optional):
                  </label>
                  <input
                    type="email"
                    value={formData.customer_email}
                    onChange={(e) => setFormData({ ...formData, customer_email: e.target.value })}
                    placeholder="name@example.com"
                    className="w-full text-xs p-3 rounded-xl border border-[#D7BFAE] bg-[#FFF7F0]"
                  />
                </div>

                {/* Summary Box */}
                <div className="bg-[#FFF7F0] rounded-2xl p-4 border border-[#D7BFAE]/50 text-xs text-[#8A554D] space-y-1.5">
                  <span className="font-serif font-bold text-sm text-[#4B2923] block mb-2">Order Request Preview</span>
                  <p><strong className="text-[#4B2923]">Type:</strong> {formData.cake_type} ({formData.size_or_servings})</p>
                  <p><strong className="text-[#4B2923]">Flavour:</strong> {formData.flavor}</p>
                  <p><strong className="text-[#4B2923]">Theme:</strong> {formData.theme_or_occasion} • {formData.color_palette}</p>
                  <p><strong className="text-[#4B2923]">Date:</strong> {formData.required_date || 'Not set'}</p>
                  {referenceImagePreview && (
                    <p className="text-emerald-700 font-medium">✓ Reference image attached</p>
                  )}
                </div>
              </motion.div>
            )}

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-[#D7BFAE]/30">
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={() => setCurrentStep((prev) => prev - 1)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#4B2923] hover:text-[#8A554D] py-2 px-4 rounded-full border border-[#D7BFAE]"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Previous Step
                </button>
              ) : <div />}

              {currentStep < 4 ? (
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="inline-flex items-center gap-2 bg-[#4B2923] text-white text-xs font-semibold uppercase tracking-wider px-6 py-3 rounded-full hover:bg-[#2F1916] shadow"
                >
                  Continue <ArrowRight className="w-3.5 h-3.5 text-[#E9AEBB]" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-2 bg-[#4B2923] text-white text-xs font-semibold uppercase tracking-wider px-8 py-3.5 rounded-full hover:bg-[#2F1916] shadow-lg active:scale-95 transition-all"
                >
                  {isSubmitting ? 'Transmitting Request...' : 'Submit Custom Cake Enquiry'}
                  <Sparkles className="w-4 h-4 text-[#E9AEBB]" />
                </button>
              )}
            </div>

          </form>
        </div>

      </div>
    </div>
  );
};
