import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, Award, UtensilsCrossed, ShieldCheck, Clock, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

export const About: React.FC = () => {
  return (
    <div className="bg-[#FFF7F0] min-h-screen py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* Editorial Story Header */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs uppercase tracking-widest font-semibold text-[#8A554D] block mb-2">
            The Patisserie Story
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-extrabold text-[#4B2923] tracking-tight leading-[1.15]">
            Made with Love. <br />
            <span className="italic font-normal text-[#8A554D]">Baked for Beautiful Moments.</span>
          </h1>
          <div className="w-20 h-0.5 bg-[#E9AEBB] mx-auto mt-6 mb-6" />
          <p className="text-base sm:text-lg text-[#8A554D] leading-relaxed">
            Cakes &amp; Dessert is an artisanal boutique cloud kitchen in Coimbatore, Tamil Nadu, born from an uncompromising devotion to genuine chocolate craftsmanship and handcrafted celebrations.
          </p>
        </div>

        {/* Feature Hero Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <h2 className="font-serif font-bold text-3xl sm:text-4xl text-[#4B2923] leading-tight">
              Dessert Should Always Feel Like a Celebration.
            </h2>
            <p className="text-sm sm:text-base text-[#8A554D] leading-relaxed">
              We started our journey with a simple conviction: celebration desserts in Coimbatore deserved genuine culinary integrity. Too often, commercial bakeries rely on artificial cake gel premixes, synthetic chocolate compounds, and prolonged shelf-life stabilizers.
            </p>
            <p className="text-sm sm:text-base text-[#8A554D] leading-relaxed">
              At Cakes &amp; Dessert, we make everything from scratch to order. Our signature brownies use real 70% dark Belgian chocolate and cultured dairy butter. Our celebration sponges are slow-baked in small batches, ensuring every bite is moist, dense, and deeply memorable.
            </p>

            <div className="pt-2 flex items-center gap-4 text-xs font-semibold text-[#4B2923]">
              <span className="flex items-center gap-1.5 bg-white px-4 py-2 rounded-full border border-[#D7BFAE]/50 shadow-xs">
                <ShieldCheck className="w-4 h-4 text-emerald-600" /> 100% Real Chocolate Butter
              </span>
              <span className="flex items-center gap-1.5 bg-white px-4 py-2 rounded-full border border-[#D7BFAE]/50 shadow-xs">
                <UtensilsCrossed className="w-4 h-4 text-[#8A554D]" /> Scratch Baking Only
              </span>
            </div>
          </div>

          <div className="lg:col-span-6 relative">
            <div className="relative rounded-[32px] overflow-hidden shadow-2xl border-4 border-white">
              <img
                src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1000&q=85"
                alt="Artisanal Belgian chocolate cake frosted to perfection"
                className="w-full h-[420px] object-cover"
              />
            </div>
          </div>
        </div>

        {/* Craftsmanship Pillars */}
        <div className="bg-white rounded-[36px] p-8 sm:p-14 border border-[#D7BFAE]/40 shadow-sm">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase tracking-widest font-semibold text-[#8A554D] block mb-2">
              Our Unwavering Standards
            </span>
            <h3 className="font-serif font-bold text-3xl text-[#4B2923]">
              The Craftsmanship Philosophy
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#FFF7F0] border border-[#D7BFAE] flex items-center justify-center text-[#4B2923]">
                <Sparkles className="w-6 h-6 text-[#E9AEBB]" />
              </div>
              <h4 className="font-serif font-bold text-lg text-[#4B2923]">
                Belgian Callebaut &amp; Pure Cocoa
              </h4>
              <p className="text-xs text-[#8A554D] leading-relaxed">
                We never touch compound coatings or hydrogenated oils. Only genuine cocoa butter and certified single-origin dark chocolate are melted into our signature bakes.
              </p>
            </div>

            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#FFF7F0] border border-[#D7BFAE] flex items-center justify-center text-[#4B2923]">
                <ShieldCheck className="w-6 h-6 text-emerald-600" />
              </div>
              <h4 className="font-serif font-bold text-lg text-[#4B2923]">
                100% Halal &amp; Gelatine-Free
              </h4>
              <p className="text-xs text-[#8A554D] leading-relaxed">
                Every creation in our Podanur studio is strictly crafted without animal gelatine, pork derivatives, or alcohol extracts. We use pure Madagascar vanilla beans and certified plant-based setting agents (agar-agar).
              </p>
            </div>

            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#FFF7F0] border border-[#D7BFAE] flex items-center justify-center text-[#4B2923]">
                <Clock className="w-6 h-6 text-[#E9AEBB]" />
              </div>
              <h4 className="font-serif font-bold text-lg text-[#4B2923]">
                Fresh to Order Scheduling
              </h4>
              <p className="text-xs text-[#8A554D] leading-relaxed">
                Nothing sits on display shelves for days. We operate strictly on pre-order slots, baking 12 to 24 hours prior to delivery to ensure peak aroma and delicate crumb texture.
              </p>
            </div>

            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#FFF7F0] border border-[#D7BFAE] flex items-center justify-center text-[#4B2923]">
                <Heart className="w-6 h-6 text-[#E9AEBB]" />
              </div>
              <h4 className="font-serif font-bold text-lg text-[#4B2923]">
                Vegetarian Eggless Mastery
              </h4>
              <p className="text-xs text-[#8A554D] leading-relaxed">
                Understanding our South Indian guests' preferences, our eggless recipes are developed with gourmet yogurt, buttermilk, and pure purees—yielding identical lightness and rich decadence.
              </p>
            </div>
          </div>
        </div>

        {/* Studio Gallery Grid */}
        <div>
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs uppercase tracking-widest font-semibold text-[#8A554D] block mb-1">
              Visual Impressions
            </span>
            <h3 className="font-serif font-bold text-3xl text-[#4B2923]">
              From Our Coimbatore Kitchen
            </h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <img
              src="https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=600&q=80"
              alt="Fudgy brownie batch"
              className="rounded-3xl h-60 w-full object-cover shadow-sm hover:scale-[1.02] transition-transform duration-300"
            />
            <img
              src="https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?auto=format&fit=crop&w=600&q=80"
              alt="Korean bento pastel cake"
              className="rounded-3xl h-60 w-full object-cover shadow-sm hover:scale-[1.02] transition-transform duration-300"
            />
            <img
              src="https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?auto=format&fit=crop&w=600&q=80"
              alt="Artisanal piped cupcakes"
              className="rounded-3xl h-60 w-full object-cover shadow-sm hover:scale-[1.02] transition-transform duration-300"
            />
            <img
              src="https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=600&q=80"
              alt="Tiramisu dessert tin"
              className="rounded-3xl h-60 w-full object-cover shadow-sm hover:scale-[1.02] transition-transform duration-300"
            />
          </div>
        </div>

        {/* CTA Strip */}
        <div className="text-center pt-8">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 bg-[#4B2923] text-white py-4 px-8 rounded-full font-semibold text-xs uppercase tracking-wider hover:bg-[#2F1916] shadow-lg transition-all"
          >
            Explore Today's Patisserie Menu
          </Link>
        </div>

      </div>
    </div>
  );
};

