import React from 'react';
import { Calendar, ShoppingBag, Clock, HeartHandshake } from 'lucide-react';

export const PreOrderStepsSection: React.FC = () => {
  const steps = [
    {
      step: '01',
      title: 'Pick Your Bake & Flavours',
      desc: 'Choose your cake, brownies, or dessert jars with custom weight and eggless toggles.',
      icon: ShoppingBag,
    },
    {
      step: '02',
      title: 'Select Date & Delivery Slot',
      desc: 'Pick your celebration date and convenient time window (Morning, Afternoon, or Evening).',
      icon: Calendar,
    },
    {
      step: '03',
      title: 'Submit With Zero Hassle',
      desc: 'No mandatory payment gateway. We verify your order and contact you directly via WhatsApp.',
      icon: Clock,
    },
    {
      step: '04',
      title: 'Delivered Fresh To Doorstep',
      desc: 'Our bakery partner safely delivers your celebration bake chilled and celebratory.',
      icon: HeartHandshake,
    },
  ];

  return (
    <section className="py-20 bg-[#FFF7F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest font-semibold text-[#8A554D] block mb-2">
            Seamless Ordering
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-extrabold text-[#4B2923] tracking-tight">
            How Pre-Ordering Works
          </h2>
          <div className="w-16 h-0.5 bg-[#E9AEBB] mx-auto mt-4 mb-4" />
          <p className="text-sm sm:text-base text-[#8A554D]">
            Because all our bakes are handcrafted from scratch, we operate with transparent slot scheduling.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="bg-white rounded-3xl p-6 border border-[#D7BFAE]/30 shadow-sm relative group hover:shadow-md transition-shadow"
              >
                <span className="font-serif font-extrabold text-4xl text-[#F7DCE2] group-hover:text-[#E9AEBB] transition-colors absolute top-4 right-4">
                  {item.step}
                </span>

                <div className="w-12 h-12 rounded-2xl bg-[#FFF7F0] border border-[#D7BFAE]/50 flex items-center justify-center text-[#4B2923] mb-5">
                  <Icon className="w-6 h-6 text-[#8A554D]" />
                </div>

                <h3 className="font-serif font-bold text-lg text-[#4B2923] mb-2">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#8A554D] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
