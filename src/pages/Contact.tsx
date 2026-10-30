import React, { useState } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
  Send,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';

export const Contact: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('General Enquiry');
  const [message, setMessage] = useState('');
  const [honeypot, setHoneypot] = useState(''); // Anti-spam honeypot
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (honeypot) return; // Silent discard bot

    if (!name.trim() || !phone.trim() || !message.trim()) {
      alert('Please fill in your name, contact phone number, and message.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 800);
  };

  return (
    <div className="bg-[#FFF7F0] min-h-screen py-12 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs uppercase tracking-widest font-semibold text-[#8A554D] block mb-2">
            Get in Touch
          </span>
          <h1 className="text-4xl sm:text-5xl font-serif font-extrabold text-[#4B2923] tracking-tight">
            Contact Our Studio
          </h1>
          <div className="w-16 h-0.5 bg-[#E9AEBB] mx-auto mt-4 mb-4" />
          <p className="text-sm text-[#8A554D] leading-relaxed">
            Have questions about flavours, pre-order delivery slots, or custom celebration orders? We're always delighted to help.
          </p>
        </div>

        {/* Contact Information & Form Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left: Verified Contact Information */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-8 border border-[#D7BFAE]/40 shadow-sm space-y-6">
            <h2 className="font-serif font-bold text-2xl text-[#4B2923]">
              Studio Information
            </h2>
            <p className="text-xs text-[#8A554D] leading-relaxed">
              We operate as a home-grown artisanal cloud kitchen serving fresh celebration bakes across Coimbatore.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3.5 text-xs text-[#8A554D]">
                <div className="w-9 h-9 rounded-full bg-[#FFF7F0] border border-[#D7BFAE] flex items-center justify-center text-[#4B2923] shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4 text-[#8A554D]" />
                </div>
                <div>
                  <strong className="text-[#4B2923] block text-sm">Operating Kitchen &amp; Studio</strong>
                  <p className="mt-0.5">Podanur Main Road, Coimbatore, Tamil Nadu 641023 (Pickup by prior appointment)</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 text-xs text-[#8A554D]">
                <div className="w-9 h-9 rounded-full bg-[#FFF7F0] border border-[#D7BFAE] flex items-center justify-center text-[#4B2923] shrink-0 mt-0.5">
                  <Phone className="w-4 h-4 text-[#8A554D]" />
                </div>
                <div>
                  <strong className="text-[#4B2923] block text-sm">Direct Phone &amp; WhatsApp</strong>
                  <div className="mt-1 space-y-0.5">
                    <a href="tel:+918637478423" className="hover:text-[#4B2923] font-bold block text-emerald-800">+91 863 747 8423 (Primary Order WhatsApp)</a>
                    <a href="tel:+917841716999" className="hover:text-[#4B2923] font-medium block">+91 78417 16999</a>
                    <a href="tel:+919533308332" className="hover:text-[#4B2923] font-medium block">+91 95333 08332</a>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3.5 text-xs text-[#8A554D]">
                <div className="w-9 h-9 rounded-full bg-[#FFF7F0] border border-[#D7BFAE] flex items-center justify-center text-[#4B2923] shrink-0 mt-0.5">
                  <Mail className="w-4 h-4 text-[#8A554D]" />
                </div>
                <div>
                  <strong className="text-[#4B2923] block text-sm">Official Email</strong>
                  <a href="mailto:cakesanddessert1@gmail.com" className="hover:text-[#4B2923] font-medium mt-0.5 block">
                    cakesanddessert1@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5 text-xs text-[#8A554D]">
                <div className="w-9 h-9 rounded-full bg-[#FFF7F0] border border-[#D7BFAE] flex items-center justify-center text-[#4B2923] shrink-0 mt-0.5">
                  <Clock className="w-4 h-4 text-[#8A554D]" />
                </div>
                <div>
                  <strong className="text-[#4B2923] block text-sm">Pre-Order &amp; Kitchen Hours</strong>
                  <p className="mt-0.5">Daily: 10:00 AM – 09:00 PM</p>
                </div>
              </div>
            </div>

            {/* Direct WhatsApp Callout & Swiggy Direct */}
            <div className="pt-4 border-t border-[#D7BFAE]/30 space-y-2.5">
              <a
                href="https://wa.me/918637478423"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 bg-[#4B2923] text-white py-3.5 px-6 rounded-full font-semibold text-xs uppercase tracking-wider hover:bg-[#2F1916] transition-colors shadow"
              >
                <MessageCircle className="w-4 h-4 text-[#E9AEBB]" />
                Connect on WhatsApp (+91 863 747 8423)
              </a>
              <a
                href="https://www.swiggy.com/direct/brand/708273?source=swiggy-direct&subSource=whatsapp"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 bg-[#FC8019] text-white py-3.5 px-6 rounded-full font-bold text-xs uppercase tracking-wider hover:bg-[#e26e10] transition-colors shadow"
              >
                <span>⚡ Order Same-Day on Swiggy Direct</span>
              </a>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 border border-[#D7BFAE]/40 shadow-sm">
            <h2 className="font-serif font-bold text-2xl text-[#4B2923] mb-2">
              Send an Enquiry
            </h2>
            <p className="text-xs text-[#8A554D] mb-6">
              Leave your inquiry below. Our team typically responds within 1 to 2 hours during kitchen hours.
            </p>

            {isSuccess ? (
              <div className="bg-[#FFF7F0] rounded-2xl p-8 text-center border border-[#D7BFAE]/50 space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h3 className="font-serif font-bold text-xl text-[#4B2923]">
                  Thank You for Reaching Out!
                </h3>
                <p className="text-xs text-[#8A554D] max-w-sm mx-auto leading-relaxed">
                  We have received your message. A baker from our Coimbatore studio will contact you shortly via phone or WhatsApp.
                </p>
                <button
                  onClick={() => setIsSuccess(false)}
                  className="mt-4 text-xs font-semibold text-[#4B2923] hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Honeypot for spam protection */}
                <input
                  type="text"
                  name="website_url"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-[#4B2923] block mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Meera"
                      className="w-full text-xs p-3.5 rounded-xl border border-[#D7BFAE] bg-[#FFF7F0]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-[#4B2923] block mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. 9842109876"
                      className="w-full text-xs p-3.5 rounded-xl border border-[#D7BFAE] bg-[#FFF7F0]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-[#4B2923] block mb-1">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="meera@example.com"
                      className="w-full text-xs p-3.5 rounded-xl border border-[#D7BFAE] bg-[#FFF7F0]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-[#4B2923] block mb-1">
                      Enquiry Subject
                    </label>
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full text-xs p-3.5 rounded-xl border border-[#D7BFAE] bg-[#FFF7F0] text-[#4B2923]"
                    >
                      <option value="General Enquiry">General Menu Enquiry</option>
                      <option value="Delivery Question">Delivery & Pincode Questions</option>
                      <option value="Custom Cake Question">Custom Cake Design Consultation</option>
                      <option value="Bulk Order">Bulk Corporate Gifting</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-[#4B2923] block mb-1">
                    Your Message *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us about your celebration date, flavour preference, or question..."
                    className="w-full text-xs p-3.5 rounded-xl border border-[#D7BFAE] bg-[#FFF7F0]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#4B2923] text-white py-3.5 px-6 rounded-full font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-[#2F1916] transition-all shadow-md"
                >
                  <Send className="w-4 h-4 text-[#E9AEBB]" />
                  {isSubmitting ? 'Transmitting Message...' : 'Send Message to Baker'}
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
