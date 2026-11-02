import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Sparkles, Award, UtensilsCrossed } from 'lucide-react';

export const BrandStorySection: React.FC = () => {
  return (
    <section className="py-20 bg-white border-b border-[#D7BFAE]/20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: Visual Collage */}
          <motion.div
            initial={{ opacity: 0, x: -35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 relative order-2 lg:order-1"
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <img
                  src="https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=600&q=80"
                  alt="Fudgy brownies fresh from oven"
                  className="rounded-3xl object-cover h-48 sm:h-60 w-full shadow-md hover:scale-103 transition-transform duration-500"
                />
                <div className="bg-[#FFF7F0] p-6 rounded-3xl border border-[#D7BFAE]/40 text-center shadow-xs">
                  <span className="font-serif font-extrabold text-3xl sm:text-4xl text-[#4B2923] block">
                    100%
                  </span>
                  <span className="text-xs text-[#8A554D] uppercase tracking-wider font-semibold mt-1 block">
                    Fresh to Order
                  </span>
                </div>
              </div>

              <div className="space-y-4 pt-6">
                <div className="bg-[#F7DCE2] p-6 rounded-3xl text-center border border-[#E9AEBB]/50 shadow-xs">
                  <Heart className="w-8 h-8 text-[#4B2923] mx-auto mb-2 fill-[#E9AEBB]" />
                  <span className="text-xs font-serif font-bold text-[#4B2923] block">
                    No Artificial Mixes
                  </span>
                </div>
                <img
                  src="https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?auto=format&fit=crop&w=600&q=80"
                  alt="Pastry chef frosting artisanal cakes"
                  className="rounded-3xl object-cover h-48 sm:h-60 w-full shadow-md hover:scale-103 transition-transform duration-500"
                />
              </div>
            </div>
          </motion.div>

          {/* Right: Story Content */}
          <motion.div
            initial={{ opacity: 0, x: 35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 space-y-6 order-1 lg:order-2"
          >
            <span className="text-xs uppercase tracking-widest font-semibold text-[#8A554D] block">
              Our Patisserie Story
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-extrabold text-[#4B2923] tracking-tight leading-tight">
              Pure Chocolate. Real Butter. <br />
              <span className="italic font-normal text-[#8A554D]">Baked with Passion in Coimbatore.</span>
            </h2>

            <p className="text-sm sm:text-base text-[#8A554D] leading-relaxed">
              Welcome to Cakes &amp; Dessert. What began as a heartfelt passion for baking in Coimbatore has grown into an artisanal boutique dessert studio dedicated to elevating celebrations.
            </p>

            <p className="text-sm sm:text-base text-[#8A554D] leading-relaxed">
              We reject industrial commercial premixes and shortcuts. Every cake sponge is whisked from scratch, every brownie is loaded with real Belgian dark chocolate, and each cream cheese swirl is whipped to velvety perfection.
            </p>

            {/* Pillar highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#FFF7F0] border border-[#D7BFAE] flex items-center justify-center text-[#4B2923] shrink-0 mt-0.5">
                  <Award className="w-4 h-4 text-[#8A554D]" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-sm text-[#4B2923]">Belgian Chocolate Only</h4>
                  <p className="text-xs text-[#8A554D] mt-0.5">Rich 70% dark cocoa and real cocoa butter.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#FFF7F0] border border-[#D7BFAE] flex items-center justify-center text-[#4B2923] shrink-0 mt-0.5">
                  <UtensilsCrossed className="w-4 h-4 text-[#8A554D]" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-sm text-[#4B2923]">Small-Batch Baking</h4>
                  <p className="text-xs text-[#8A554D] mt-0.5">Strict capacity limits per slot for guaranteed freshness.</p>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <Link
                to="/about"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#4B2923] border-b-2 border-[#E9AEBB] pb-1 hover:text-[#8A554D] transition-colors"
              >
                Read our complete journey &amp; craftsmanship principles →
              </Link>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

