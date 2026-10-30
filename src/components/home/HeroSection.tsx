import React, { useState, useEffect } from 'react';
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
  Award,
  MapPin,
  ChevronRight,
  Flame,
} from 'lucide-react';

interface ShowcaseItem {
  id: string;
  name: string;
  category: string;
  tagline: string;
  price: string;
  serves: string;
  leadTime: string;
  cacaoPercent: string;
  sweetness: string;
  image: string;
  link: string;
  badge: string;
  badgeColor: string;
  accentGradient: string;
}

const HERO_SHOWCASE_ITEMS: ShowcaseItem[] = [
  {
    id: 'truffle',
    name: 'Belgian Dark Truffle Cake',
    category: 'Signature Celebration Cake',
    tagline: 'Pure 70% Callebaut dark ganache, moist cocoa sponge & handcrafted curls',
    price: '₹850',
    serves: 'Serves 4-6 (500g)',
    leadTime: '12h Lead Time',
    cacaoPercent: '70% Cocoa',
    sweetness: 'Rich & Balanced',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1200&q=85',
    link: '/product/royal-belgian-dark-truffle-cake',
    badge: "Chef's #1 Masterpiece",
    badgeColor: 'from-[#4B2923] to-[#2F1916]',
    accentGradient: 'from-[#4B2923] via-[#8A554D] to-[#E9AEBB]',
  },
  {
    id: 'velvet',
    name: 'Velvet Rose & Mascarpone',
    category: 'Romantic Anniversary Special',
    tagline: 'Infused with organic rose petals, tart raspberry swirl & Italian cream cheese',
    price: '₹900',
    serves: 'Serves 4-6 (500g)',
    leadTime: '16h Lead Time',
    cacaoPercent: 'Berry Infused',
    sweetness: 'Delicate Floral',
    image: 'https://images.unsplash.com/photo-1616541823729-00fe0aacd32c?auto=format&fit=crop&w=1200&q=85',
    link: '/product/velvet-rose-cream-cheese-cake',
    badge: 'Trending Celebration Cake',
    badgeColor: 'from-[#8A554D] to-[#E9AEBB]',
    accentGradient: 'from-[#8A554D] via-[#C47D8E] to-[#F7DCE2]',
  },
  {
    id: 'brownie',
    name: 'Signature Fudgy Brownie Box',
    category: 'Luxury Dessert Gifting',
    tagline: 'Ultra-decadent crackly shiny crust with gooey melt-in-your-mouth center',
    price: '₹450',
    serves: 'Luxury Box of 4',
    leadTime: '6h Express Drop',
    cacaoPercent: 'Triple Cocoa',
    sweetness: 'Fudgy Decadence',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=1200&q=85',
    link: '/product/signature-fudgy-chocolate-brownie-box',
    badge: 'Bestseller Daily Batch',
    badgeColor: 'from-[#2F1916] to-[#4B2923]',
    accentGradient: 'from-[#2F1916] via-[#4B2923] to-[#8A554D]',
  },
  {
    id: 'bento',
    name: 'Blush Pastel Korean Bento',
    category: 'Petite 4" Celebration',
    tagline: 'Hand-piped daisy floral accents with customizable butter icing message',
    price: '₹490',
    serves: 'Petite 4" (Serves 1-2)',
    leadTime: '10h Lead Time',
    cacaoPercent: 'Vanilla & Butter',
    sweetness: 'Light & Sweet',
    image: 'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?auto=format&fit=crop&w=1200&q=85',
    link: '/product/blush-daisy-korean-bento-cake',
    badge: 'Intimate Milestone Favorite',
    badgeColor: 'from-[#E9AEBB] to-[#8A554D]',
    accentGradient: 'from-[#E9AEBB] via-[#F7DCE2] to-[#4B2923]',
  },
];

export const HeroSection: React.FC = () => {
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [progress, setProgress] = useState(0);

  const activeItem = HERO_SHOWCASE_ITEMS[activeItemIndex];

  // Auto-play timer for smooth cake preview progression
  useEffect(() => {
    if (!isAutoPlaying) return;

    const DURATION = 6000;
    const INTERVAL = 50;
    let elapsed = 0;

    const timer = setInterval(() => {
      elapsed += INTERVAL;
      setProgress((elapsed / DURATION) * 100);

      if (elapsed >= DURATION) {
        elapsed = 0;
        setProgress(0);
        setActiveItemIndex((prev) => (prev + 1) % HERO_SHOWCASE_ITEMS.length);
      }
    }, INTERVAL);

    return () => clearInterval(timer);
  }, [isAutoPlaying, activeItemIndex]);

  const handleSelectTab = (idx: number) => {
    setActiveItemIndex(idx);
    setProgress(0);
  };

  return (
    <section
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
      className="relative overflow-hidden pt-4 pb-16 lg:py-16 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#FFF7F0] via-[#FBF0EA] to-[#F7DCE2]/50 border-b border-[#D7BFAE]/30"
    >
      {/* Ambient glowing confectionery gradients */}
      <div className="absolute top-0 left-1/4 w-[550px] h-[550px] rounded-full bg-gradient-to-br from-[#E9AEBB]/25 via-[#F7DCE2]/20 to-transparent blur-3xl pointer-events-none -z-10 animate-pulse" />
      <div className="absolute bottom-0 right-10 w-[500px] h-[500px] rounded-full bg-gradient-to-tl from-[#D7BFAE]/30 via-[#E9AEBB]/15 to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Continuous Artisanal Marquee Ribbon */}
        <div className="mb-8 overflow-hidden rounded-full border border-[#D7BFAE]/50 bg-white/80 backdrop-blur-md shadow-xs py-2 px-4">
          <div className="animate-marquee whitespace-nowrap text-xs text-[#8A554D] flex items-center gap-8 font-medium">
            <span className="flex items-center gap-1.5 text-[#4B2923] font-semibold">
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
              <Clock className="w-3.5 h-3.5 text-[#E9AEBB]" /> Slot Scheduling &amp; Free Studio Pickup in Podanur
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5 text-[#4B2923] font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-[#E9AEBB]" /> Handcrafted Fresh to Order in Coimbatore
            </span>
          </div>
        </div>

        {/* Hero Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column: Balanced Typography & Interactivity (7 Cols) */}
          <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
            
            {/* Studio Badge Callout */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border border-[#D7BFAE]/60 shadow-xs backdrop-blur-sm"
            >
              <span className="w-2 h-2 rounded-full bg-[#E9AEBB] animate-ping" />
              <span className="font-script text-xl text-[#8A554D] leading-none">
                Baked for Beautiful Moments
              </span>
              <span className="text-[#D7BFAE]">|</span>
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#4B2923]">
                Coimbatore Boutique Studio
              </span>
            </motion.div>

            {/* Elevated, Balanced Headline with Color Gradients */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="space-y-1"
            >
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-[3.35rem] font-serif font-extrabold tracking-tight leading-[1.12]">
                {/* Line 1: Dark Chocolate */}
                <span className="block text-[#2F1916]">
                  Every Celebration Deserves
                </span>
                
                {/* Line 2: Luxury Gradient Accent */}
                <span className="block bg-gradient-to-r from-[#4B2923] via-[#8A554D] to-[#B86B79] bg-clip-text text-transparent">
                  Something Handcrafted &amp;
                </span>

                {/* Line 3: Italic Patisserie Flourish */}
                <span className="font-display italic font-normal text-[#8A554D] relative inline-block mt-0.5">
                  <span className="bg-gradient-to-r from-[#8A554D] via-[#C47D8E] to-[#E9AEBB] bg-clip-text text-transparent">
                    Truly Decadent.
                  </span>
                  <span className="absolute bottom-1 left-0 right-0 h-1 bg-[#E9AEBB]/50 rounded-full -z-10" />
                </span>
              </h1>
            </motion.div>

            {/* Refined Supporting Description */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-sm sm:text-base text-[#6B423B] max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal"
            >
              Discover bespoke celebration cakes, artisanal fudgy brownies, and Korean bento boxes freshly baked from scratch in Coimbatore. Made with pure 70% Callebaut chocolate, farm dairy butter, and zero commercial premixes.
            </motion.p>

            {/* Interactive Cake Switcher with Live Progress Fill */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="pt-2"
            >
              <div className="flex items-center justify-between max-w-md mx-auto lg:mx-0 mb-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#8A554D]">
                  Signature Creations (Auto-cycles or click):
                </span>
                <span className="text-[10px] text-[#8A554D]/80 font-medium">
                  {isAutoPlaying ? 'Hover to pause' : 'Paused'}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 max-w-lg mx-auto lg:mx-0">
                {HERO_SHOWCASE_ITEMS.map((item, idx) => {
                  const isActive = activeItemIndex === idx;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleSelectTab(idx)}
                      className={`relative overflow-hidden py-2.5 px-3 rounded-2xl text-left transition-all duration-300 border ${
                        isActive
                          ? 'bg-[#4B2923] text-white border-[#4B2923] shadow-md scale-[1.02]'
                          : 'bg-white/90 text-[#4B2923] border-[#D7BFAE]/60 hover:bg-[#F7DCE2]/60 hover:border-[#E9AEBB]'
                      }`}
                    >
                      <span className="block text-xs font-bold truncate">
                        {item.name.split(' ')[0]} {item.name.split(' ')[1] || ''}
                      </span>
                      <span
                        className={`block text-[10px] font-medium mt-0.5 ${
                          isActive ? 'text-[#E9AEBB]' : 'text-[#8A554D]'
                        }`}
                      >
                        {item.price}
                      </span>

                      {/* Active Progress Bar */}
                      {isActive && (
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
                          <div
                            className="h-full bg-[#E9AEBB] transition-all duration-75"
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </motion.div>

            {/* CTA Buttons with Foil Sheen & Contrast */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="pt-3 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5"
            >
              <Link
                to={activeItem.link}
                className="w-full sm:w-auto shimmer-btn inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-[#4B2923] via-[#3B1E19] to-[#2F1916] text-white text-xs uppercase tracking-widest font-bold px-7 py-3.5 rounded-full shadow-[0_10px_25px_-5px_rgba(75,41,35,0.35)] hover:scale-105 active:scale-95 transition-all group border border-[#8A554D]/30"
              >
                <span>Order {activeItem.name.split(' ')[0]} ({activeItem.price})</span>
                <ArrowRight className="w-4 h-4 text-[#E9AEBB] group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                to="/custom-cakes"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/90 border-2 border-[#4B2923] text-[#4B2923] text-xs uppercase tracking-widest font-bold px-6 py-3 rounded-full hover:bg-[#F7DCE2] transition-colors shadow-xs"
              >
                <Cake className="w-4 h-4 text-[#8A554D]" />
                <span>Custom Cake Builder</span>
              </Link>

              <Link
                to="/shop"
                className="inline-flex items-center gap-1 text-xs font-bold text-[#8A554D] hover:text-[#4B2923] py-2 px-1 transition-colors group"
              >
                <span>Explore Full Menu</span>
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </motion.div>

            {/* Reassuring Trust Pill Row with Diverse Accents */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="pt-4 border-t border-[#D7BFAE]/40 grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs"
            >
              <div className="flex items-center gap-2 bg-white/70 px-3 py-2 rounded-xl border border-[#D7BFAE]/30">
                <span className="w-2 h-2 rounded-full bg-emerald-600 shrink-0" />
                <span className="font-bold text-[#4B2923] text-[11px]">100% Eggless Option</span>
              </div>
              <div className="flex items-center gap-2 bg-white/70 px-3 py-2 rounded-xl border border-[#D7BFAE]/30">
                <span className="w-2 h-2 rounded-full bg-[#E9AEBB] shrink-0" />
                <span className="font-bold text-[#4B2923] text-[11px]">Pure Belgian Callebaut</span>
              </div>
              <div className="flex items-center gap-2 bg-white/70 px-3 py-2 rounded-xl border border-[#D7BFAE]/30">
                <span className="w-2 h-2 rounded-full bg-[#8A554D] shrink-0" />
                <span className="font-bold text-[#4B2923] text-[11px]">Slot Scheduled</span>
              </div>
              <div className="flex items-center gap-2 bg-white/70 px-3 py-2 rounded-xl border border-[#D7BFAE]/30">
                <span className="w-2 h-2 rounded-full bg-[#D7BFAE] shrink-0" />
                <span className="font-bold text-[#4B2923] text-[11px]">Coimbatore Studio</span>
              </div>
            </motion.div>

          </div>

          {/* Right Column: Visual Showcase Display with Gradient Border & Floats (5 Cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Luxury Multi-layer Gradient Outer Ring */}
              <div className="absolute -inset-2.5 rounded-[42px] bg-gradient-to-tr from-[#E9AEBB] via-[#D7BFAE] to-[#4B2923] opacity-40 blur-xl transform -rotate-1" />

              {/* Showcase Card Shell */}
              <div className="relative rounded-[36px] overflow-hidden bg-white p-3 shadow-2xl border border-[#D7BFAE]/60">
                
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeItem.id}
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.04 }}
                    transition={{ duration: 0.45, ease: 'easeOut' }}
                    className="relative rounded-[28px] overflow-hidden bg-[#FFF7F0]"
                  >
                    {/* Featured Cake Image */}
                    <img
                      src={activeItem.image}
                      alt={activeItem.name}
                      className="w-full h-[380px] sm:h-[440px] object-cover"
                    />

                    {/* Top Gradient Badge */}
                    <div className="absolute top-3.5 left-3.5 bg-gradient-to-r from-[#2F1916]/90 to-[#4B2923]/90 backdrop-blur-md px-3.5 py-1.5 rounded-full text-white text-[11px] font-bold flex items-center gap-1.5 border border-[#E9AEBB]/30 shadow-md">
                      <Sparkles className="w-3 h-3 text-[#E9AEBB]" />
                      <span>{activeItem.badge}</span>
                    </div>

                    {/* Flavor & Cacao Pill */}
                    <div className="absolute top-3.5 right-3.5 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full text-[#4B2923] text-[10px] font-bold border border-[#D7BFAE]/50 shadow-sm flex items-center gap-1">
                      <Award className="w-3 h-3 text-[#8A554D]" />
                      <span>{activeItem.cacaoPercent}</span>
                    </div>

                    {/* Bottom Dynamic Floating Detail Pill */}
                    <div className="absolute bottom-3.5 left-3.5 right-3.5 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl border border-[#D7BFAE]/50 shadow-lg flex items-center justify-between">
                      <div className="min-w-0 pr-2">
                        <span className="text-[9px] uppercase font-bold tracking-widest text-[#8A554D] block truncate">
                          {activeItem.category}
                        </span>
                        <h4 className="font-serif font-bold text-base text-[#4B2923] leading-snug truncate">
                          {activeItem.name}
                        </h4>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="font-extrabold text-sm text-[#4B2923]">
                            {activeItem.price}
                          </span>
                          <span className="text-[10px] text-[#8A554D] bg-[#FFF7F0] px-2 py-0.5 rounded-md border border-[#D7BFAE]/40">
                            {activeItem.serves}
                          </span>
                        </div>
                      </div>

                      <Link
                        to={activeItem.link}
                        className="p-3 rounded-full bg-[#4B2923] text-white hover:bg-[#2F1916] transition-transform hover:scale-105 active:scale-95 shadow-md shrink-0"
                        aria-label="Order this cake"
                      >
                        <ArrowRight className="w-4 h-4 text-[#E9AEBB]" />
                      </Link>
                    </div>

                  </motion.div>
                </AnimatePresence>

                {/* Floating Micro-Badge 1: Notice Time */}
                <div className="absolute -top-3.5 -right-3.5 bg-white py-2 px-3.5 rounded-2xl shadow-xl border border-[#D7BFAE]/60 text-[#4B2923] flex items-center gap-2 animate-float pointer-events-none">
                  <div className="w-7 h-7 rounded-full bg-[#F7DCE2] flex items-center justify-center shrink-0">
                    <Clock className="w-3.5 h-3.5 text-[#4B2923]" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold block leading-none">{activeItem.leadTime}</span>
                    <span className="text-[9px] text-[#8A554D]">Baked Fresh to Order</span>
                  </div>
                </div>

                {/* Floating Micro-Badge 2: Social Proof in Coimbatore */}
                <div className="absolute -bottom-3.5 -left-3.5 bg-white py-2 px-3 rounded-2xl shadow-xl border border-[#D7BFAE]/60 text-[#4B2923] flex items-center gap-2 animate-float-reverse pointer-events-none">
                  <div className="flex text-amber-500">
                    <Star className="w-3 h-3 fill-current" />
                  </div>
                  <span className="text-[11px] font-bold">4.9/5 Rating (450+ Orders)</span>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
