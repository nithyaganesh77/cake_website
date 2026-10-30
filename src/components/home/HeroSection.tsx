import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  Cake,
  CheckCircle2,
  ShieldCheck,
  Heart,
  Star,
  Clock,
  Flame,
} from 'lucide-react';

const HERO_SHOWCASE_ITEMS = [
  {
    id: 'truffle',
    name: 'Royal Belgian Dark Truffle',
    tagline: '70% Callebaut Dark Ganache • Silky Curls',
    price: '₹850',
    serves: 'Serves 4-6 (500g)',
    leadTime: '12h Lead Time',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1200&q=85',
    link: '/product/royal-belgian-dark-truffle-cake',
    pill: "Chef's Signature Drop",
  },
  {
    id: 'velvet',
    name: 'Velvet Rose & Cream Cheese',
    tagline: 'Philadelphia Cream Cheese • Rose Petals',
    price: '₹900',
    serves: 'Serves 4-6 (500g)',
    leadTime: '16h Lead Time',
    image: 'https://images.unsplash.com/photo-1616541823729-00fe0aacd32c?auto=format&fit=crop&w=1200&q=85',
    link: '/product/velvet-rose-cream-cheese-cake',
    pill: 'Trending Celebration Cake',
  },
  {
    id: 'brownie',
    name: 'Fudgy Dark Brownie Box',
    tagline: 'Crackly Shiny Crust • Ultra Decadent',
    price: '₹450',
    serves: 'Luxury Box of 4',
    leadTime: '6h Express Drop',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=1200&q=85',
    link: '/product/signature-fudgy-chocolate-brownie-box',
    pill: 'Bestseller Gifting',
  },
  {
    id: 'bento',
    name: 'Blush & Daisy Korean Bento',
    tagline: 'Pastel Calligraphy • Clamshell Box',
    price: '₹490',
    serves: 'Petite 4" (Serves 1-2)',
    leadTime: '10h Lead Time',
    image: 'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?auto=format&fit=crop&w=1200&q=85',
    link: '/product/blush-daisy-korean-bento-cake',
    pill: 'Intimate Milestone',
  },
];

export const HeroSection: React.FC = () => {
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const activeItem = HERO_SHOWCASE_ITEMS[activeItemIndex];

  return (
    <section className="relative overflow-hidden pt-6 pb-16 lg:py-20 bg-gradient-to-b from-[#FFF7F0] via-[#FAF1E8] to-[#F7DCE2]/40">
      {/* Animated ambient glowing orbs */}
      <div className="absolute top-10 -left-20 w-96 h-96 rounded-full bg-[#E9AEBB]/25 blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute bottom-10 -right-20 w-[480px] h-[480px] rounded-full bg-[#D7BFAE]/30 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Interactive Marquee Ticker */}
        <div className="mb-8 overflow-hidden rounded-full border border-[#D7BFAE]/50 bg-white/70 backdrop-blur-md shadow-xs py-2 px-4">
          <div className="animate-marquee whitespace-nowrap text-xs text-[#8A554D] flex items-center gap-8 font-medium">
            <span className="flex items-center gap-1.5 text-[#4B2923]">
              <Sparkles className="w-3.5 h-3.5 text-[#E9AEBB]" /> Handcrafted Fresh to Order in Coimbatore
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5 text-[#4B2923]">
              <Heart className="w-3.5 h-3.5 text-[#E9AEBB] fill-[#E9AEBB]" /> 70% Belgian Callebaut Chocolate &amp; Dairy Butter
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5 text-[#4B2923]">
              <Cake className="w-3.5 h-3.5 text-[#E9AEBB]" /> 100% Eggless Customization Across All Bakes
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5 text-[#4B2923]">
              <Clock className="w-3.5 h-3.5 text-[#E9AEBB]" /> Slot Scheduling &amp; Free Studio Pickup (Podanur)
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5 text-[#4B2923]">
              <Sparkles className="w-3.5 h-3.5 text-[#E9AEBB]" /> Handcrafted Fresh to Order in Coimbatore
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Script Tagline Callout */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2"
            >
              <span className="font-script text-2xl sm:text-3xl text-[#8A554D] tracking-wide">
                Baked for Beautiful Moments
              </span>
              <span className="w-12 h-0.5 bg-[#E9AEBB] inline-block align-middle"></span>
            </motion.div>

            {/* Headline with font-display & italics */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-serif font-extrabold text-[#4B2923] tracking-tight leading-[1.08]"
            >
              Every Celebration Deserves{' '}
              <span className="font-display italic font-normal text-[#8A554D] underline decoration-[#E9AEBB] decoration-wavy decoration-2 underline-offset-8">
                Something Sweet.
              </span>
            </motion.h1>

            {/* Supporting Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg text-[#8A554D] max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal"
            >
              Discover beautifully crafted artisanal cakes and fudgy brownies, baked from scratch for your most cherished milestones. No commercial premixes—just honest, decadent chocolate indulgence.
            </motion.p>

            {/* Interactive Showcase Selector Tabs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="pt-2"
            >
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#8A554D] block mb-2.5">
                Taste Signature Creations (Click to preview):
              </span>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
                {HERO_SHOWCASE_ITEMS.map((item, idx) => {
                  const isActive = activeItemIndex === idx;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveItemIndex(idx)}
                      className={`relative px-4 py-2 rounded-full text-xs font-semibold transition-all duration-300 ${
                        isActive
                          ? 'bg-[#4B2923] text-white shadow-md scale-105'
                          : 'bg-white/80 text-[#4B2923] border border-[#D7BFAE]/60 hover:bg-[#F7DCE2] hover:border-[#E9AEBB]'
                      }`}
                    >
                      {item.name.split(' ')[0]} {item.name.split(' ')[1] || ''}
                      {isActive && (
                        <motion.span
                          layoutId="heroTabIndicator"
                          className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#E9AEBB] ring-2 ring-white"
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </motion.div>

            {/* CTA Buttons with hover animation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
            >
              <Link
                to={activeItem.link}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-[#4B2923] text-white text-xs uppercase tracking-widest font-bold px-8 py-4 rounded-full shadow-[0_12px_30px_rgba(75,41,35,0.25)] hover:bg-[#2F1916] hover:scale-105 active:scale-95 transition-all group"
              >
                <span>Order {activeItem.name.split(' ')[0]} Now ({activeItem.price})</span>
                <ArrowRight className="w-4 h-4 text-[#E9AEBB] group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                to="/custom-cakes"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border-2 border-[#4B2923] text-[#4B2923] text-xs uppercase tracking-widest font-bold px-8 py-3.5 rounded-full hover:bg-[#F7DCE2] transition-colors"
              >
                <Cake className="w-4 h-4 text-[#4B2923]" />
                <span>Custom Cake Builder</span>
              </Link>
            </motion.div>

            {/* Trust Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="pt-6 border-t border-[#D7BFAE]/40 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs text-[#4B2923]"
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="font-semibold">Freshly Prepared</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="font-semibold">Made to Order</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="font-semibold">Custom Designs</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="font-semibold">Quality Checked</span>
              </div>
            </motion.div>
          </div>

          {/* Right Hero Visual Card with Dynamic Animated Transitions */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Back Card Glow */}
              <div className="absolute -inset-2 rounded-[40px] bg-gradient-to-tr from-[#E9AEBB] via-[#D7BFAE] to-[#4B2923] opacity-35 blur-2xl transform -rotate-2" />

              {/* Main Visual Display */}
              <div className="relative rounded-[36px] overflow-hidden bg-white p-3.5 shadow-2xl border border-[#D7BFAE]/50">
                
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeItem.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    className="relative rounded-[28px] overflow-hidden bg-[#FFF7F0]"
                  >
                    <img
                      src={activeItem.image}
                      alt={activeItem.name}
                      className="w-full h-[420px] sm:h-[480px] object-cover"
                    />

                    {/* Top Pill */}
                    <div className="absolute top-4 left-4 bg-[#2F1916]/85 backdrop-blur-md px-3.5 py-1.5 rounded-full text-white text-[11px] font-semibold flex items-center gap-1.5 border border-[#E9AEBB]/30">
                      <Sparkles className="w-3 h-3 text-[#E9AEBB]" />
                      <span>{activeItem.pill}</span>
                    </div>

                    {/* Bottom Floating Card */}
                    <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-[#D7BFAE]/40 shadow-lg flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-full bg-[#F7DCE2] flex items-center justify-center text-[#4B2923] shrink-0">
                          <Heart className="w-5 h-5 fill-[#4B2923]" />
                        </div>
                        <div>
                          <h4 className="font-serif font-bold text-base text-[#4B2923] leading-tight">
                            {activeItem.name}
                          </h4>
                          <p className="text-[11px] text-[#8A554D] mt-0.5">{activeItem.tagline}</p>
                          <span className="font-bold text-sm text-[#4B2923] mt-1 inline-block">
                            {activeItem.price}{' '}
                            <span className="text-[10px] text-[#8A554D] font-normal">({activeItem.serves})</span>
                          </span>
                        </div>
                      </div>

                      <Link
                        to={activeItem.link}
                        className="p-3 rounded-full bg-[#4B2923] text-white hover:bg-[#2F1916] transition-colors shadow"
                        aria-label="Order now"
                      >
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Floating Interactive Badge 1 (Lead Time) */}
                <div className="absolute -top-4 -right-4 bg-white p-3.5 rounded-2xl shadow-xl border border-[#D7BFAE]/50 text-[#4B2923] flex items-center gap-2.5 animate-float pointer-events-none">
                  <div className="w-8 h-8 rounded-full bg-[#F7DCE2] flex items-center justify-center">
                    <Clock className="w-4 h-4 text-[#4B2923]" />
                  </div>
                  <div>
                    <span className="text-xs font-bold block">{activeItem.leadTime}</span>
                    <span className="text-[10px] text-[#8A554D]">Slow-baked to order</span>
                  </div>
                </div>

                {/* Floating Interactive Badge 2 (Eggless) */}
                <div className="absolute -bottom-4 -left-4 bg-white p-3 rounded-2xl shadow-xl border border-[#D7BFAE]/50 text-[#4B2923] flex items-center gap-2 animate-float-reverse pointer-events-none">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-ping"></span>
                  <span className="text-xs font-bold">100% Eggless Option</span>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
