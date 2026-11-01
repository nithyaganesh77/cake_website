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
    <section className="relative overflow-hidden bg-gradient-to-b from-[#241310] via-[#351A15] to-[#200F0D] text-[#FFF7F0] pt-16 pb-20 sm:pt-24 sm:pb-32 border-b border-[#4B2923]">
      
      {/* Subtle Editorial Curved Line & Warm Glow Background */}
      <svg
        className="absolute top-0 right-0 w-[550px] sm:w-[750px] h-full text-[#E9AEBB]/15 pointer-events-none"
        viewBox="0 0 600 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="450" cy="150" r="320" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
        <circle cx="450" cy="150" r="420" stroke="currentColor" strokeWidth="0.75" />
      </svg>
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[480px] bg-[radial-gradient(ellipse_at_center,_rgba(233,174,187,0.14)_0%,_rgba(138,85,77,0.18)_50%,_transparent_75%)] pointer-events-none" />
      <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-[#E9AEBB]/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-[#8A554D]/20 blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Subtle Delicate Pill Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-[#E9AEBB]/30 text-[#F7DCE2] text-xs font-semibold tracking-wider uppercase shadow-2xs mb-6 sm:mb-8"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#E9AEBB]" />
          <span>Handcrafted · Artisanal Patisserie · Coimbatore</span>
        </motion.div>

        {/* Clean, Editorial, Beautiful Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="font-serif text-4xl sm:text-6xl lg:text-7xl font-extrabold text-[#FFF7F0] tracking-tight leading-[1.14] max-w-4xl mx-auto"
        >
          Every Sweet Celebration, <br className="hidden sm:block" />
          <span className="font-display italic font-normal text-[#E9AEBB] block sm:inline mt-1 sm:mt-0">
            Artfully Handcrafted.
          </span>
        </motion.h1>

        {/* Simple, Refined Supporting Description */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-base sm:text-lg text-[#E7D6CB] max-w-2xl mx-auto mt-5 sm:mt-6 font-normal leading-relaxed"
        >
          Bespoke celebration cakes, artisanal fudgy brownies, and Korean bento cakes slow-baked from scratch with pure 70% Callebaut chocolate and fresh dairy butter.
        </motion.p>

        {/* Exactly 2 Clean, Elegant Action Buttons (No clutter) */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <Link
            to="/shop"
            className="inline-flex items-center gap-2.5 bg-[#E9AEBB] text-[#241310] text-xs uppercase tracking-widest font-extrabold px-8 py-4 rounded-xl shadow-lg hover:bg-[#F7DCE2] hover:scale-105 active:scale-95 transition-all"
          >
            <span>Explore Collection</span>
            <ArrowRight className="w-4 h-4 text-[#241310]" />
          </Link>

          <Link
            to="/custom-cakes"
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-xs text-[#FFF7F0] border border-[#D7BFAE]/40 text-xs uppercase tracking-widest font-bold px-8 py-4 rounded-xl hover:bg-white/15 hover:border-[#E9AEBB] shadow-2xs hover:scale-105 active:scale-95 transition-all"
          >
            <Cake className="w-4 h-4 text-[#E9AEBB]" />
            <span>Custom Cake Builder</span>
          </Link>
        </motion.div>

        {/* Minimalist Trust Features Strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-14 pt-8 border-t border-white/10 flex flex-wrap items-center justify-center gap-y-2 gap-x-8 text-xs text-[#D7BFAE]"
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
          <span className="text-white/20 hidden sm:inline">•</span>
          <span className="flex items-center gap-1.5 font-medium">
            <Cake className="w-3.5 h-3.5 text-[#E9AEBB]" />
            <span>Custom Cake Board Inscriptions</span>
          </span>
        </motion.div>

        {/* Delicate Scroll to Explore Prompt */}
        <div className="mt-8 flex justify-center">
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
