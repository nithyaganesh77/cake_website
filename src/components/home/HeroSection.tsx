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
    <section className="relative overflow-hidden bg-gradient-to-b from-[#FFFBF7] via-[#FFF7F0] to-[#FAF1E8] text-[#2A1612] pt-16 pb-20 sm:pt-24 sm:pb-32 border-b border-[#D7BFAE]/30">
      
      {/* Subtle Editorial Curved Line & Glow Background (Matches Reference Image) */}
      <svg
        className="absolute top-0 right-0 w-[550px] sm:w-[750px] h-full text-[#D7BFAE]/20 pointer-events-none"
        viewBox="0 0 600 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="450" cy="150" r="320" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
        <circle cx="450" cy="150" r="420" stroke="currentColor" strokeWidth="0.75" />
      </svg>
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[450px] bg-[radial-gradient(ellipse_at_center,_rgba(233,174,187,0.12)_0%,_rgba(215,191,174,0.08)_50%,_transparent_75%)] pointer-events-none" />
      <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-[#E9AEBB]/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-[#D7BFAE]/15 blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Subtle Delicate Pill Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-[#D7BFAE]/60 text-[#8A554D] text-xs font-semibold tracking-wider uppercase shadow-2xs mb-6 sm:mb-8"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#E9AEBB]" />
          <span>Handcrafted · Artisanal Patisserie · Coimbatore</span>
        </motion.div>

        {/* Clean, Editorial, Beautiful Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="font-serif text-4xl sm:text-6xl lg:text-7xl font-extrabold text-[#2A1612] tracking-tight leading-[1.14] max-w-4xl mx-auto"
        >
          Every Sweet Celebration, <br className="hidden sm:block" />
          <span className="font-display italic font-normal text-[#8A554D] block sm:inline mt-1 sm:mt-0">
            Artfully Handcrafted.
          </span>
        </motion.h1>

        {/* Simple, Refined Supporting Description */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-base sm:text-lg text-[#6B423B] max-w-2xl mx-auto mt-5 sm:mt-6 font-normal leading-relaxed"
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
            className="inline-flex items-center gap-2.5 bg-[#2A1612] text-white text-xs uppercase tracking-widest font-bold px-8 py-4 rounded-xl shadow-md hover:bg-[#3D211B] hover:scale-105 active:scale-95 transition-all"
          >
            <span>Explore Collection</span>
            <ArrowRight className="w-4 h-4 text-[#E9AEBB]" />
          </Link>

          <Link
            to="/custom-cakes"
            className="inline-flex items-center gap-2 bg-white/90 text-[#2A1612] border border-[#D7BFAE] text-xs uppercase tracking-widest font-bold px-8 py-4 rounded-xl hover:bg-white hover:border-[#8A554D] shadow-2xs hover:scale-105 active:scale-95 transition-all"
          >
            <Cake className="w-4 h-4 text-[#8A554D]" />
            <span>Custom Cake Builder</span>
          </Link>
        </motion.div>

        {/* Minimalist Trust Features Strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-14 pt-8 border-t border-[#D7BFAE]/30 flex flex-wrap items-center justify-center gap-y-2 gap-x-8 text-xs text-[#8A554D]"
        >
          <span className="flex items-center gap-1.5 font-medium">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Eggless Option Available</span>
          </span>
          <span className="text-[#D7BFAE] hidden sm:inline">•</span>
          <span className="flex items-center gap-1.5 font-medium">
            <Sparkles className="w-3.5 h-3.5 text-[#E9AEBB]" />
            <span>70% Callebaut Belgian Chocolate</span>
          </span>
          <span className="text-[#D7BFAE] hidden sm:inline">•</span>
          <span className="flex items-center gap-1.5 font-medium">
            <Clock className="w-3.5 h-3.5 text-[#8A554D]" />
            <span>Studio Pickup in Podanur</span>
          </span>
          <span className="text-[#D7BFAE] hidden sm:inline">•</span>
          <span className="flex items-center gap-1.5 font-medium">
            <Cake className="w-3.5 h-3.5 text-[#E9AEBB]" />
            <span>Custom Cake Board Inscriptions</span>
          </span>
        </motion.div>

        {/* Delicate Scroll to Explore Prompt */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={scrollToContent}
            className="text-xs text-[#8A554D]/70 hover:text-[#2A1612] flex items-center gap-1.5 transition-colors cursor-pointer group"
          >
            <span className="tracking-wider uppercase text-[10px]">Scroll to Explore</span>
            <ChevronDown className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
          </button>
        </div>

      </div>
    </section>
  );
};
