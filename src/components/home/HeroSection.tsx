import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  Cake,
  CheckCircle2,
  Clock,
  ChevronDown,
} from 'lucide-react';

export const HeroSection: React.FC = () => {
  const scrollToContent = () => {
    window.scrollTo({ top: window.innerHeight * 0.85, behavior: 'smooth' });
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#22110E] via-[#321712] to-[#1C0D0B] text-[#FFF7F0] pt-14 pb-18 sm:pt-20 sm:pb-28 border-b border-[#4B2923]">
      
      {/* Subtle Editorial Curved Line & Warm Glow Background */}
      <svg
        className="absolute top-0 right-0 w-[550px] sm:w-[750px] h-full text-[#E9AEBB]/12 pointer-events-none"
        viewBox="0 0 600 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="450" cy="150" r="320" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
        <circle cx="450" cy="150" r="420" stroke="currentColor" strokeWidth="0.75" />
      </svg>
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[500px] bg-[radial-gradient(ellipse_at_center,_rgba(233,174,187,0.16)_0%,_rgba(138,85,77,0.20)_45%,_transparent_75%)] pointer-events-none" />
      <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-[#E9AEBB]/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-[#8A554D]/25 blur-3xl pointer-events-none" />

      {/* Ambient Floating Confection Sparkles */}
      <motion.div
        animate={{ y: [0, -14, 0], opacity: [0.3, 0.75, 0.3] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/3 left-8 sm:left-24 w-1.5 h-1.5 rounded-full bg-[#E9AEBB] pointer-events-none shadow-sm"
      />
      <motion.div
        animate={{ y: [0, 12, 0], opacity: [0.2, 0.65, 0.2] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute top-1/2 right-10 sm:right-28 w-2 h-2 rounded-full bg-[#D7BFAE] pointer-events-none"
      />
      <motion.div
        animate={{ y: [0, -9, 0], opacity: [0.3, 0.8, 0.3] }}
        transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
        className="absolute bottom-1/4 left-1/4 w-1 h-1 rounded-full bg-white pointer-events-none"
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Sleek, Compact Pill Badge (Sized smaller & refined) */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 backdrop-blur-md border border-[#E9AEBB]/25 text-[#E9AEBB] text-[10px] sm:text-[11px] font-medium tracking-widest uppercase shadow-xs mb-5 sm:mb-6"
        >
          <Sparkles className="w-3 h-3 text-[#E9AEBB]" />
          <span>Handcrafted · Artisanal Patisserie · Coimbatore</span>
        </motion.div>

        {/* High-Fashion Editorial Headline (Italiana + Graceful Serif Italic) */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl mx-auto drop-shadow-sm"
        >
          <span className="font-display text-4xl sm:text-6xl lg:text-7xl font-normal text-[#FFF7F0] tracking-normal leading-[1.12] block">
            Every Sweet Celebration,
          </span>
          <span className="font-serif italic font-light text-[#E9AEBB] text-3xl sm:text-5xl lg:text-6xl tracking-wide block mt-1.5 sm:mt-2">
            Artfully Handcrafted.
          </span>
        </motion.h1>

        {/* Refined, Airy Supporting Description */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
          className="text-sm sm:text-base lg:text-lg text-[#E5D2C5] max-w-2xl mx-auto mt-5 sm:mt-6 font-normal leading-relaxed"
        >
          Bespoke celebration cakes, artisanal fudgy brownies, and Korean bento cakes slow-baked from scratch with pure 70% Callebaut chocolate and fresh dairy butter.
        </motion.p>

        {/* Exactly 2 Clean, Rounded Pill Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
          className="mt-7 sm:mt-9 flex flex-wrap items-center justify-center gap-3.5 sm:gap-4"
        >
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 bg-[#E9AEBB] text-[#241310] text-[11px] sm:text-xs uppercase tracking-widest font-extrabold px-6 py-3.5 sm:px-7 sm:py-3.5 rounded-full shadow-lg hover:bg-[#F7DCE2] hover:scale-105 active:scale-95 transition-all duration-300"
          >
            <span>Explore Collection</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#241310]" />
          </Link>

          <Link
            to="/custom-cakes"
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-xs text-[#FFF7F0] border border-[#D7BFAE]/35 text-[11px] sm:text-xs uppercase tracking-widest font-bold px-6 py-3.5 sm:px-7 sm:py-3.5 rounded-full hover:bg-white/15 hover:border-[#E9AEBB] shadow-2xs hover:scale-105 active:scale-95 transition-all duration-300"
          >
            <Cake className="w-3.5 h-3.5 text-[#E9AEBB]" />
            <span>Custom Cake Builder</span>
          </Link>
        </motion.div>

        {/* Minimalist Trust Features Strip (Sleek & balanced) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.42, duration: 0.5 }}
          className="mt-12 pt-6 border-t border-white/10 flex flex-wrap items-center justify-center gap-y-2 gap-x-6 sm:gap-x-8 text-[11px] sm:text-xs text-[#D7BFAE]"
        >
          <span className="flex items-center gap-1.5 font-medium">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Eggless Option Available</span>
          </span>
          <span className="text-white/20 hidden sm:inline">•</span>
          <span className="flex items-center gap-1.5 font-medium text-amber-200">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>100% Halal-Friendly &amp; Gelatine-Free</span>
          </span>
          <span className="text-white/20 hidden sm:inline">•</span>
          <span className="flex items-center gap-1.5 font-medium">
            <Sparkles className="w-3.5 h-3.5 text-[#E9AEBB]" />
            <span>70% Callebaut Belgian Chocolate</span>
          </span>
          <span className="text-white/20 hidden sm:inline">•</span>
          <span className="flex items-center gap-1.5 font-medium">
            <Clock className="w-3.5 h-3.5 text-[#E9AEBB]" />
            <span>Studio Pickup in Podanur</span>
          </span>
        </motion.div>

        {/* Delicate Scroll to Explore Prompt */}
        <div className="mt-7 flex justify-center">
          <button
            onClick={scrollToContent}
            className="text-xs text-[#D7BFAE]/70 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer group"
          >
            <span className="tracking-wider uppercase text-[10px]">Scroll to Explore</span>
            <ChevronDown className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
          </button>
        </div>

      </div>
    </section>
  );
};
