import React, { useState, useEffect } from 'react';
import { Settings, Save, CheckCircle2, QrCode, Phone, MapPin, Clock } from 'lucide-react';
import { dataProvider } from '@/services/dataProvider';
import { SiteSettings } from '@/types';

export const AdminSettings: React.FC = () => {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    async function loadSettings() {
      try {
        const data = await dataProvider.getSiteSettings();
        setSettings(data);
      } catch (e) {
        console.error('Failed to load settings', e);
      } finally {
        setIsLoading(false);
      }
    }
    loadSettings();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;

    try {
      const updated = await dataProvider.updateSiteSettings(settings);
      setSettings(updated);
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 2500);
    } catch (err: any) {
      alert('Failed to save settings: ' + err.message);
    }
  };

  if (isLoading || !settings) {
    return (
      <div className="p-8 text-center text-xs text-[#8A554D]">
        Loading settings...
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="font-serif font-extrabold text-2xl sm:text-3xl text-[#4B2923]">
          Bakery Studio Settings
        </h1>
        <p className="text-xs text-[#8A554D] mt-1">
          Configure verified contact information, offline UPI payment instructions, and lead times.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        
        {/* 1. Brand & Contact Information */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#D7BFAE]/40 shadow-sm space-y-4">
          <h2 className="font-serif font-bold text-lg text-[#4B2923] flex items-center gap-2">
            <Phone className="w-5 h-5 text-[#8A554D]" />
            Business &amp; Contact Info
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-[#4B2923] block mb-1">
                Store Brand Name
              </label>
              <input
                type="text"
                value={settings.store_name}
                onChange={(e) => setSettings({ ...settings, store_name: e.target.value })}
                className="w-full text-xs p-3 rounded-xl border border-[#D7BFAE] bg-[#FFF7F0]"
              />
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-[#4B2923] block mb-1">
                Official Email
              </label>
              <input
                type="email"
                value={settings.email}
                onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                className="w-full text-xs p-3 rounded-xl border border-[#D7BFAE] bg-[#FFF7F0]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-[#4B2923] block mb-1">
                Primary WhatsApp Number (without + or space)
              </label>
              <input
                type="text"
                value={settings.whatsapp_number}
                onChange={(e) => setSettings({ ...settings, whatsapp_number: e.target.value })}
                className="w-full text-xs p-3 rounded-xl border border-[#D7BFAE] bg-[#FFF7F0]"
              />
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-[#4B2923] block mb-1">
                Operating Hours
              </label>
              <input
                type="text"
                value={settings.operating_hours}
                onChange={(e) => setSettings({ ...settings, operating_hours: e.target.value })}
                className="w-full text-xs p-3 rounded-xl border border-[#D7BFAE] bg-[#FFF7F0]"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-[#4B2923] block mb-1">
              Studio Pickup Address &amp; Instructions
            </label>
            <textarea
              rows={2}
              value={settings.address_pickup}
              onChange={(e) => setSettings({ ...settings, address_pickup: e.target.value })}
              className="w-full text-xs p-3 rounded-xl border border-[#D7BFAE] bg-[#FFF7F0]"
            />
          </div>
        </div>

        {/* 2. Offline Payment Instructions */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#D7BFAE]/40 shadow-sm space-y-4">
          <h2 className="font-serif font-bold text-lg text-[#4B2923] flex items-center gap-2">
            <QrCode className="w-5 h-5 text-[#8A554D]" />
            Offline Payment Instructions (No Online Gateway)
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-[#4B2923] block mb-1">
                Direct Merchant UPI ID
              </label>
              <input
                type="text"
                value={settings.upi_id}
                onChange={(e) => setSettings({ ...settings, upi_id: e.target.value })}
                className="w-full text-xs p-3 rounded-xl border border-[#D7BFAE] bg-[#FFF7F0] font-mono"
              />
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-[#4B2923] block mb-1">
                UPI Recipient Name
              </label>
              <input
                type="text"
                value={settings.upi_recipient_name}
                onChange={(e) => setSettings({ ...settings, upi_recipient_name: e.target.value })}
                className="w-full text-xs p-3 rounded-xl border border-[#D7BFAE] bg-[#FFF7F0]"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-[#4B2923] block mb-1">
              Studio Bank Transfer Details
            </label>
            <textarea
              rows={2}
              value={settings.bank_transfer_details}
              onChange={(e) => setSettings({ ...settings, bank_transfer_details: e.target.value })}
              className="w-full text-xs p-3 rounded-xl border border-[#D7BFAE] bg-[#FFF7F0]"
            />
          </div>
        </div>

        {/* 3. Operational Rules */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#D7BFAE]/40 shadow-sm space-y-4">
          <h2 className="font-serif font-bold text-lg text-[#4B2923] flex items-center gap-2">
            <Clock className="w-5 h-5 text-[#8A554D]" />
            Order Lead Times &amp; Delivery Thresholds
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-[#4B2923] block mb-1">
                Minimum Advance Pre-Order Notice (Hours)
              </label>
              <input
                type="number"
                value={settings.min_advance_order_hours}
                onChange={(e) => setSettings({ ...settings, min_advance_order_hours: Number(e.target.value) })}
                className="w-full text-xs p-3 rounded-xl border border-[#D7BFAE] bg-[#FFF7F0]"
              />
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-[#4B2923] block mb-1">
                Free Delivery Order Threshold (₹)
              </label>
              <input
                type="number"
                value={settings.free_delivery_threshold}
                onChange={(e) => setSettings({ ...settings, free_delivery_threshold: Number(e.target.value) })}
                className="w-full text-xs p-3 rounded-xl border border-[#D7BFAE] bg-[#FFF7F0]"
              />
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex items-center gap-4">
          <button
            type="submit"
            className="inline-flex items-center gap-2 bg-[#4B2923] text-white py-3.5 px-8 rounded-full font-semibold text-xs uppercase tracking-wider hover:bg-[#2F1916] shadow-md"
          >
            <Save className="w-4 h-4 text-[#E9AEBB]" />
            Save Studio Settings
          </button>

          {isSaved && (
            <span className="inline-flex items-center gap-1.5 text-xs text-emerald-700 font-semibold">
              <CheckCircle2 className="w-4 h-4" /> Settings successfully updated!
            </span>
          )}
        </div>

      </form>
    </div>
  );
};
