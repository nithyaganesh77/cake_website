import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  Cake,
  Clock,
  Heart,
  Star,
  CheckCircle2,
  ChevronRight,
  ShoppingBag,
} from 'lucide-react';

interface ShowcaseItem {
  id: string;
  name: string;
  frenchSubtitle: string;
  category: string;
  price: string;
  priceNum: number;
  serves: string;
  leadTime: string;
  description: string;
  image: string;
  link: string;
  tag: string;
  dietary: string;
  cacaoNote: string;
}

const SHOWCASE_ITEMS: ShowcaseItem[] = [
  {
    id: 'truffle',
    name: 'Belgian Dark Truffle Cake',
    frenchSubtitle: 'Pure 70% Callebaut Dark Ganache',
    category: 'Signature Celebration Cake',
    price: '₹850',
    priceNum: 850,
    serves: '500g (Serves 4-6)',
    leadTime: '12h Notice',
    description: 'Slow-simmered 70% Callebaut Belgian dark chocolate ganache draped over moist cocoa sponge with delicate chocolate curls.',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1200&q=85',
    link: '/product/royal-belgian-dark-truffle-cake',
    tag: "Chef's Signature Drop",
    dietary: '100% Eggless Option',
    cacaoNote: '70% Dark Cacao',
  },
  {
    id: 'velvet',
    name: 'Velvet Rose & Mascarpone',
    frenchSubtitle: 'Organic Rose & Italian Mascarpone Cream',
    category: 'Romantic Anniversary Special',
    price: '₹900',
    priceNum: 900,
    serves: '500g (Serves 4-6)',
    leadTime: '16h Notice',
    description: 'Infused with edible rose petals, tart raspberry reduction, and cloud-like Italian mascarpone cream cheese on velvet sponge.',
    image: 'https://images.unsplash.com/photo-1616541823729-00fe0aacd32c?auto=format&fit=crop&w=1200&q=85',
    link: '/product/velvet-rose-cream-cheese-cake',
    tag: 'Anniversary Favorite',
    dietary: '100% Eggless',
    cacaoNote: 'Delicate Berry Tang',
  },
  {
    id: 'brownie',
    name: 'Signature Fudgy Brownie Box',
    frenchSubtitle: 'Triple Cocoa Decadence • Box of 4',
    category: 'Luxury Dessert Gifting',
    price: '₹450',
    priceNum: 450,
    serves: 'Box of 4 Large Squares',
    leadTime: '6h Express',
    description: 'Melt-in-your-mouth gooey centers with a papery, crackly shiny crust, crafted with three varieties of fine cocoa.',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=1200&q=85',
    link: '/product/signature-fudgy-chocolate-brownie-box',
    tag: 'Daily Fresh Batch',
    dietary: 'Eggless Available',
    cacaoNote: 'Triple Cocoa',
  },
  {
    id: 'bento',
    name: 'Pastel Korean Bento Cake',
    frenchSubtitle: '4" Petite Celebration • Clamshell Box',
    category: 'Petite 4" Celebration',
    price: '₹490',
    priceNum: 490,
    serves: 'Petite 4" (Serves 1-2)',
    leadTime: '10h Notice',
    description: 'Adorable Korean minimalist bento cake with silky pastel buttercream, hand-piped daisies, and customizable lettered greeting.',
    image: 'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?auto=format&fit=crop&w=1200&q=85',
    link: '/product/blush-daisy-korean-bento-cake',
    tag: 'Milestone Special',
    dietary: '100% Eggless',
    cacaoNote: 'Madagascar Vanilla',
  },
];

export const HeroSection: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const activeItem = SHOWCASE_ITEMS[selectedIndex];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#200F0D] via-[#2F1612] via-[#43211B] to-[#2B1411] text-white pt-10 pb-20 lg:pt-14 lg:pb-24 border-b border-[#E9AEBB]/20">
      
      {/* Ambient Confectionary Glow Background */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[550px] bg-[radial-gradient(ellipse_at_center,_rgba(233,174,187,0.18)_0%,_rgba(215,191,174,0.06)_50%,_transparent_75%)] pointer-events-none" />
      <div className="absolute top-10 -left-32 w-80 h-80 rounded-full bg-[#E9AEBB]/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -right-32 w-96 h-96 rounded-full bg-[#8A554D]/15 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Minimalist Editorial Header: Centered, Simple, Neat */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-10 sm:mb-12">
          
          {/* Subtle Studio Crest Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[#E9AEBB] text-[11px] font-bold uppercase tracking-[0.2em]"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#E9AEBB]" />
            <span>Artisanal Patisserie • Coimbatore</span>
          </motion.div>

          {/* Clean, Simple Editorial Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-serif text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#FFF7F0] tracking-tight leading-[1.12]"
          >
            Baked for Beautiful Moments.{' '}
            <span className="font-display italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#E9AEBB] via-[#F7DCE2] to-[#D7BFAE] block sm:inline mt-1 sm:mt-0">
              Truly Decadent.
            </span>
          </motion.h1>

          {/* Simple Supporting Description */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-sm sm:text-base text-[#D7BFAE] max-w-xl mx-auto font-normal leading-relaxed"
          >
            Bespoke celebration cakes, artisanal fudgy brownies, and Korean bento cakes handcrafted fresh to order with pure 70% Callebaut chocolate and dairy butter.
          </motion.p>

          {/* Clean Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="pt-2 flex flex-wrap items-center justify-center gap-3.5"
          >
            <Link
              to="/shop"
              className="shimmer-btn inline-flex items-center gap-2.5 bg-gradient-to-r from-[#E9AEBB] via-[#F7DCE2] to-[#E9AEBB] text-[#2F1916] text-xs uppercase tracking-widest font-extrabold px-7 py-3.5 rounded-full shadow-[0_10px_25px_-5px_rgba(233,174,187,0.35)] hover:scale-105 active:scale-95 transition-all"
            >
              <span>Explore Menu</span>
              <ArrowRight className="w-4 h-4 text-[#2F1916]" />
            </Link>

            <Link
              to="/custom-cakes"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/15 text-white text-xs uppercase tracking-widest font-bold px-7 py-3.5 rounded-full border border-white/20 backdrop-blur-md transition-all hover:scale-105"
            >
              <Cake className="w-4 h-4 text-[#E9AEBB]" />
              <span>Custom Cake Builder</span>
            </Link>
          </motion.div>

        </div>

        {/* Centerpiece Spotlight Showcase: Simple, Neat & Amazing */}
        <div className="max-w-5xl mx-auto">
          
          {/* Main Active Spotlight Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeItem.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="relative rounded-3xl overflow-hidden bg-white/10 backdrop-blur-xl border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.4)] p-4 sm:p-7"
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-center">
                
                {/* Left: Cake Photograph */}
                <div className="md:col-span-6 relative rounded-2xl overflow-hidden aspect-4/3 sm:aspect-square bg-black/20 group">
                  <img
                    src={activeItem.image}
                    alt={activeItem.name}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                  
                  {/* Tag on photo */}
                  <div className="absolute top-3.5 left-3.5 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-bold text-[#E9AEBB] border border-white/15">
                    {activeItem.tag}
                  </div>

                  {/* Dietary badge on photo */}
                  <div className="absolute bottom-3.5 left-3.5 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-emerald-800 flex items-center gap-1.5 shadow-sm">
                    <span className="w-2 h-2 rounded-full bg-emerald-600" />
                    <span>{activeItem.dietary}</span>
                  </div>
                </div>

                {/* Right: Cake Flavor & Order Information */}
                <div className="md:col-span-6 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center gap-2 text-xs text-[#E9AEBB] mb-1 font-semibold">
                      <span>{activeItem.category}</span>
                      <span>•</span>
                      <span>{activeItem.cacaoNote}</span>
                    </div>

                    <h3 className="font-serif font-extrabold text-2xl sm:text-3xl text-[#FFF7F0] leading-snug">
                      {activeItem.name}
                    </h3>
                    <p className="text-xs text-[#D7BFAE] italic mt-0.5">
                      {activeItem.frenchSubtitle}
                    </p>

                    <p className="text-xs sm:text-sm text-white/80 mt-3 leading-relaxed">
                      {activeItem.description}
                    </p>

                    {/* Meta Specifications */}
                    <div className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-white/10 text-xs">
                      <div className="bg-white/5 rounded-xl p-2.5 border border-white/10">
                        <span className="text-[10px] uppercase tracking-wider text-[#D7BFAE] block font-medium">
                          Portion / Serving
                        </span>
                        <span className="font-bold text-white text-xs mt-0.5 block">
                          {activeItem.serves}
                        </span>
                      </div>
                      <div className="bg-white/5 rounded-xl p-2.5 border border-white/10">
                        <span className="text-[10px] uppercase tracking-wider text-[#D7BFAE] block font-medium">
                          Baking Notice
                        </span>
                        <span className="font-bold text-[#E9AEBB] text-xs mt-0.5 block flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {activeItem.leadTime}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Price & Direct Pre-Order CTA */}
                  <div className="pt-2 flex items-center justify-between gap-4">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-[#D7BFAE] block">
                        Base Price
                      </span>
                      <span className="font-serif font-bold text-2xl sm:text-3xl text-[#FFF7F0]">
                        {activeItem.price}
                      </span>
                    </div>

                    <Link
                      to={activeItem.link}
                      className="shimmer-btn inline-flex items-center gap-2 bg-[#E9AEBB] text-[#2F1916] hover:bg-white text-xs uppercase tracking-wider font-extrabold px-6 py-3.5 rounded-full transition-all shadow-md hover:scale-105 active:scale-95"
                    >
                      <ShoppingBag className="w-4 h-4 text-[#2F1916]" />
                      <span>Pre-Order Cake</span>
                    </Link>
                  </div>

                </div>

              </div>
            </motion.div>
          </AnimatePresence>

          {/* Interactive Switcher Tray (Click any creation to spotlight) */}
          <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
            {SHOWCASE_ITEMS.map((item, idx) => {
              const isSelected = selectedIndex === idx;
              return (
                <button
                  key={item.id}
                  onClick={() => setSelectedIndex(idx)}
                  className={`p-2.5 sm:p-3 rounded-2xl text-left transition-all duration-300 border flex items-center gap-2.5 ${
                    isSelected
                      ? 'bg-white/20 border-[#E9AEBB] shadow-lg scale-[1.02]'
                      : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20 opacity-80 hover:opacity-100'
                  }`}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-10 h-10 rounded-xl object-cover shrink-0 border border-white/20"
                  />
                  <div className="min-w-0">
                    <span className="block text-xs font-bold text-white truncate">
                      {item.name.split(' ')[0]} {item.name.split(' ')[1] || ''}
                    </span>
                    <span className="block text-[10px] text-[#E9AEBB] font-medium">
                      {item.price}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

        </div>

        {/* Minimalist Trust Bar */}
        <div className="max-w-4xl mx-auto mt-12 pt-6 border-t border-white/10 flex flex-wrap items-center justify-center gap-y-2 gap-x-8 text-xs text-[#D7BFAE]">
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#E9AEBB]" />
            <span>100% Callebaut Belgian Chocolate</span>
          </span>
          <span className="text-white/30 hidden sm:inline">•</span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>100% Pure Eggless Options</span>
          </span>
          <span className="text-white/30 hidden sm:inline">•</span>
          <span className="flex items-center gap-1.5">
            <Cake className="w-3.5 h-3.5 text-[#E9AEBB]" />
            <span>Custom Cake Board Inscriptions</span>
          </span>
          <span className="text-white/30 hidden sm:inline">•</span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-[#E9AEBB]" />
            <span>Studio Pickup in Podanur</span>
          </span>
        </div>

      </div>
    </section>
  );
};
