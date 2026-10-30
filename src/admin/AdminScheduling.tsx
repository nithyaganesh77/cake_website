import React, { useState, useEffect } from 'react';
import { Clock, MapPin, Plus, Trash2, Check, AlertCircle } from 'lucide-react';
import { dataProvider } from '@/services/dataProvider';
import { TimeSlot, DeliveryArea } from '@/types';

export const AdminScheduling: React.FC = () => {
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [deliveryAreas, setDeliveryAreas] = useState<DeliveryArea[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // New slot form
  const [slotLabel, setSlotLabel] = useState('');
  const [slotStart, setSlotStart] = useState('10:00');
  const [slotEnd, setSlotEnd] = useState('13:00');
  const [maxOrders, setMaxOrders] = useState(10);

  // New Area form
  const [areaPincode, setAreaPincode] = useState('');
  const [areaName, setAreaName] = useState('');
  const [areaFee, setAreaFee] = useState(80);
  const [minOrder, setMinOrder] = useState(400);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [slots, areas] = await Promise.all([
        dataProvider.getTimeSlots(),
        dataProvider.getDeliveryAreas(),
      ]);
      setTimeSlots(slots);
      setDeliveryAreas(areas);
    } catch (e) {
      console.error('Failed to load scheduling data', e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleAddSlot = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!slotLabel.trim()) return;

    const newSlot: TimeSlot = {
      id: `slot-${Date.now()}`,
      label: slotLabel,
      start_time: slotStart,
      end_time: slotEnd,
      max_orders: Number(maxOrders),
      is_active: true,
    };

    await dataProvider.saveTimeSlot(newSlot);
    setSlotLabel('');
    loadData();
  };

  const handleToggleSlot = async (slot: TimeSlot) => {
    await dataProvider.saveTimeSlot({ ...slot, is_active: !slot.is_active });
    loadData();
  };

  const handleAddArea = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!areaPincode.trim() || !areaName.trim()) return;

    const newArea: DeliveryArea = {
      id: `area-${Date.now()}`,
      pincode: areaPincode.trim(),
      area_name: areaName.trim(),
      delivery_fee: Number(areaFee),
      min_order_amount: Number(minOrder),
      is_active: true,
    };

    await dataProvider.saveDeliveryArea(newArea);
    setAreaPincode('');
    setAreaName('');
    loadData();
  };

  const handleDeleteArea = async (id: string) => {
    if (confirm('Delete this delivery area tier?')) {
      await dataProvider.deleteDeliveryArea(id);
      loadData();
    }
  };

  return (
    <div className="space-y-10">
      <div>
        <h1 className="font-serif font-extrabold text-2xl sm:text-3xl text-[#4B2923]">
          Fulfillment Slots &amp; Delivery Zones
        </h1>
        <p className="text-xs text-[#8A554D] mt-1">
          Configure daily preparation capacity limits, time slot windows, and Coimbatore pincode rates.
        </p>
      </div>

      {/* 1. Time Slots Section */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#D7BFAE]/40 shadow-sm space-y-6">
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-[#8A554D]" />
          <h2 className="font-serif font-bold text-xl text-[#4B2923]">
            Production &amp; Delivery Time Slots
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {timeSlots.map((slot) => (
            <div
              key={slot.id}
              className={`p-4 rounded-2xl border transition-all ${
                slot.is_active
                  ? 'border-[#4B2923] bg-[#FFF7F0]'
                  : 'border-gray-200 bg-gray-50 opacity-60'
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <span className="font-bold text-sm text-[#4B2923]">{slot.label}</span>
                <button
                  onClick={() => handleToggleSlot(slot)}
                  className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                    slot.is_active ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  {slot.is_active ? 'Active' : 'Disabled'}
                </button>
              </div>

              <p className="text-xs text-[#8A554D]">
                Window: {slot.start_time} to {slot.end_time}
              </p>
              <p className="text-[11px] text-[#4B2923] font-medium mt-1">
                Max Daily Capacity: {slot.max_orders} orders
              </p>
            </div>
          ))}
        </div>

        {/* Add Slot form */}
        <form onSubmit={handleAddSlot} className="pt-4 border-t border-[#D7BFAE]/30 flex flex-wrap gap-3 items-end">
          <div className="flex-1 min-w-[200px]">
            <label className="text-xs font-bold uppercase tracking-wider text-[#4B2923] block mb-1">
              New Slot Label
            </label>
            <input
              type="text"
              required
              value={slotLabel}
              onChange={(e) => setSlotLabel(e.target.value)}
              placeholder="e.g. Late Night Celebration Drop (08:30 PM - 10:30 PM)"
              className="w-full text-xs p-2.5 rounded-xl border border-[#D7BFAE] bg-[#FFF7F0]"
            />
          </div>

          <div className="w-24">
            <label className="text-xs font-bold uppercase tracking-wider text-[#4B2923] block mb-1">
              Start
            </label>
            <input
              type="time"
              value={slotStart}
              onChange={(e) => setSlotStart(e.target.value)}
              className="w-full text-xs p-2.5 rounded-xl border border-[#D7BFAE] bg-[#FFF7F0]"
            />
          </div>

          <div className="w-24">
            <label className="text-xs font-bold uppercase tracking-wider text-[#4B2923] block mb-1">
              End
            </label>
            <input
              type="time"
              value={slotEnd}
              onChange={(e) => setSlotEnd(e.target.value)}
              className="w-full text-xs p-2.5 rounded-xl border border-[#D7BFAE] bg-[#FFF7F0]"
            />
          </div>

          <div className="w-24">
            <label className="text-xs font-bold uppercase tracking-wider text-[#4B2923] block mb-1">
              Max Qty
            </label>
            <input
              type="number"
              value={maxOrders}
              onChange={(e) => setMaxOrders(Number(e.target.value))}
              className="w-full text-xs p-2.5 rounded-xl border border-[#D7BFAE] bg-[#FFF7F0]"
            />
          </div>

          <button
            type="submit"
            className="px-5 py-2.5 bg-[#4B2923] text-white rounded-xl text-xs font-semibold uppercase tracking-wider hover:bg-[#2F1916]"
          >
            Add Slot
          </button>
        </form>
      </div>

      {/* 2. Delivery Pincodes & Rates Section */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#D7BFAE]/40 shadow-sm space-y-6">
        <div className="flex items-center gap-2">
          <MapPin className="w-5 h-5 text-[#8A554D]" />
          <h2 className="font-serif font-bold text-xl text-[#4B2923]">
            Serviceable Delivery Pincodes (Coimbatore)
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FFF7F0] text-[#4B2923] uppercase font-bold text-[10px] tracking-wider border-b border-[#D7BFAE]/30">
              <tr>
                <th className="p-3">Pincode</th>
                <th className="p-3">Zone / Neighborhood</th>
                <th className="p-3">Delivery Charge (₹)</th>
                <th className="p-3">Min Order Amount (₹)</th>
                <th className="p-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#D7BFAE]/20 text-[#8A554D]">
              {deliveryAreas.map((area) => (
                <tr key={area.id} className="hover:bg-[#FFF7F0]/40">
                  <td className="p-3 font-mono font-bold text-[#4B2923]">{area.pincode}</td>
                  <td className="p-3 font-medium text-[#4B2923]">{area.area_name}</td>
                  <td className="p-3 font-semibold text-[#4B2923]">₹{area.delivery_fee}</td>
                  <td className="p-3">₹{area.min_order_amount}</td>
                  <td className="p-3 text-right">
                    <button
                      onClick={() => handleDeleteArea(area.id)}
                      className="text-red-600 hover:bg-red-50 p-1.5 rounded-lg"
                      title="Remove pincode"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Add Area Form */}
        <form onSubmit={handleAddArea} className="pt-4 border-t border-[#D7BFAE]/30 flex flex-wrap gap-3 items-end">
          <div className="w-28">
            <label className="text-xs font-bold uppercase tracking-wider text-[#4B2923] block mb-1">
              Pincode *
            </label>
            <input
              type="text"
              maxLength={6}
              required
              value={areaPincode}
              onChange={(e) => setAreaPincode(e.target.value)}
              placeholder="641045"
              className="w-full text-xs p-2.5 rounded-xl border border-[#D7BFAE] bg-[#FFF7F0]"
            />
          </div>

          <div className="flex-1 min-w-[200px]">
            <label className="text-xs font-bold uppercase tracking-wider text-[#4B2923] block mb-1">
              Area / Landmark *
            </label>
            <input
              type="text"
              required
              value={areaName}
              onChange={(e) => setAreaName(e.target.value)}
              placeholder="e.g. Ramanathapuram / Sungam"
              className="w-full text-xs p-2.5 rounded-xl border border-[#D7BFAE] bg-[#FFF7F0]"
            />
          </div>

          <div className="w-28">
            <label className="text-xs font-bold uppercase tracking-wider text-[#4B2923] block mb-1">
              Delivery Fee (₹)
            </label>
            <input
              type="number"
              value={areaFee}
              onChange={(e) => setAreaFee(Number(e.target.value))}
              className="w-full text-xs p-2.5 rounded-xl border border-[#D7BFAE] bg-[#FFF7F0]"
            />
          </div>

          <div className="w-28">
            <label className="text-xs font-bold uppercase tracking-wider text-[#4B2923] block mb-1">
              Min Order (₹)
            </label>
            <input
              type="number"
              value={minOrder}
              onChange={(e) => setMinOrder(Number(e.target.value))}
              className="w-full text-xs p-2.5 rounded-xl border border-[#D7BFAE] bg-[#FFF7F0]"
            />
          </div>

          <button
            type="submit"
            className="px-5 py-2.5 bg-[#4B2923] text-white rounded-xl text-xs font-semibold uppercase tracking-wider hover:bg-[#2F1916]"
          >
            Add Pincode
          </button>
        </form>
      </div>
    </div>
  );
};

