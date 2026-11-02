import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Cake, Sparkles, Palette, Calendar, ArrowRight, Camera } from 'lucide-react';

export const CustomCakeTeaser: React.FC = () => {
  return (
    <section className="py-20 bg-[#FFF7F0] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 35, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="bg-gradient-to-br from-[#4B2923] to-[#2F1916] rounded-[36px] p-8 sm:p-12 lg:p-16 text-white shadow-2xl relative overflow-hidden border border-[#8A554D]/40"
        >
          
          {/* Subtle background flourishes */}
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#E9AEBB]/10 blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-[#E9AEBB] text-xs font-semibold tracking-wider uppercase border border-white/15">
                <Sparkles className="w-4 h-4 text-[#E9AEBB]" />
                <span>Bespoke Confectionery Studio</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-extrabold text-white tracking-tight leading-[1.15]">
                Dreaming of a Unique Cake for Your Big Day?
              </h2>

              <p className="text-sm sm:text-base text-[#D7BFAE] leading-relaxed max-w-xl">
                Whether it's a whimsical pastel 1st birthday, an elegant floral wedding tier, or a bespoke themed cake, our pastry chefs hand-sculpt your vision into edible art.
              </p>

              {/* 3 Step highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                  <Palette className="w-5 h-5 text-[#E9AEBB] mb-2" />
                  <h4 className="font-serif font-bold text-sm text-white">1. Choose Theme</h4>
                  <p className="text-xs text-[#D7BFAE] mt-1">Colors, tier styles, &amp; flavor profile.</p>
                </div>
                <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                  <Camera className="w-5 h-5 text-[#E9AEBB] mb-2" />
                  <h4 className="font-serif font-bold text-sm text-white">2. Upload Reference</h4>
                  <p className="text-xs text-[#D7BFAE] mt-1">Share Pinterest or Instagram images.</p>
                </div>
                <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                  <Calendar className="w-5 h-5 text-[#E9AEBB] mb-2" />
                  <h4 className="font-serif font-bold text-sm text-white">3. Slot Confirmation</h4>
                  <p className="text-xs text-[#D7BFAE] mt-1">Reserve baking date &amp; WhatsApp quote.</p>
                </div>
              </div>

              <div className="pt-4">
                <Link
                  to="/custom-cakes"
                  className="inline-flex items-center gap-3 bg-[#E9AEBB] text-[#2F1916] text-xs uppercase tracking-wider font-bold px-8 py-4 rounded-full shadow-lg hover:bg-white transition-all transform hover:scale-[1.02]"
                >
                  <Cake className="w-4 h-4" />
                  <span>Launch Custom Cake Builder</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Right Visual Collage */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-sm">
                <img
                  src="https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&w=800&q=80"
                  alt="Custom Designer Cake by Cakes & Dessert"
                  className="w-full h-80 sm:h-96 object-cover rounded-3xl shadow-xl border-4 border-white/10"
                />
                
                <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl border border-[#D7BFAE]/50 text-[#4B2923] flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#F7DCE2] flex items-center justify-center font-bold text-sm">
                    48h
                  </div>
                  <div className="text-left">
                    <p className="text-xs font-bold leading-tight">Advance Booking</p>
                    <p className="text-[10px] text-[#8A554D]">For handcrafted 2-tier designs</p>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </motion.div>
      </div>
    </section>
  );
};

