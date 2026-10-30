import React from 'react';
import { motion, Variants } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Cake, CheckCircle2, ShieldCheck, Heart } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:py-20 bg-radial from-[#FFF7F0] via-[#FFF7F0] to-[#F7DCE2]/30">
      {/* Decorative background glows */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 rounded-full bg-[#E9AEBB]/20 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 rounded-full bg-[#D7BFAE]/20 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Hero Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 space-y-6 text-center lg:text-left"
          >
            {/* Sweet Badge */}
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F7DCE2] border border-[#E9AEBB]/60 shadow-xs">
              <Sparkles className="w-4 h-4 text-[#4B2923]" />
              <span className="text-xs font-semibold uppercase tracking-wider text-[#4B2923]">
                Coimbatore's Artisanal Cloud Bakery
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-serif font-extrabold text-[#4B2923] tracking-tight leading-[1.12]"
            >
              Every Celebration Deserves{' '}
              <span className="italic font-normal text-[#8A554D] underline decoration-[#E9AEBB] decoration-wavy decoration-2 underline-offset-8">
                Something Sweet.
              </span>
            </motion.h1>

            {/* Supporting Description */}
            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg text-[#8A554D] max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal"
            >
              Discover beautifully crafted cakes and decadent desserts, made with care for your most special moments. Handcrafted with Belgian chocolate and pure cream butter in Coimbatore.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
            >
              <Link
                to="/shop"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#4B2923] text-white text-sm uppercase tracking-wider font-semibold px-8 py-4 rounded-full shadow-[0_10px_25px_rgba(75,41,35,0.18)] hover:bg-[#2F1916] hover:scale-[1.02] transition-all"
              >
                <span>Explore Our Collection</span>
                <ArrowRight className="w-4 h-4 text-[#E9AEBB]" />
              </Link>

              <Link
                to="/custom-cakes"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border-1.5 border-[#4B2923] text-[#4B2923] text-sm uppercase tracking-wider font-semibold px-8 py-3.5 rounded-full hover:bg-[#F7DCE2] transition-colors"
              >
                <Cake className="w-4 h-4 text-[#4B2923]" />
                <span>Create Custom Cake</span>
              </Link>
            </motion.div>

            {/* Trust Badges */}
            <motion.div
              variants={itemVariants}
              className="pt-6 border-t border-[#D7BFAE]/40 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs text-[#4B2923]"
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="font-medium">Freshly Prepared</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="font-medium">Made to Order</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="font-medium">Custom Designs</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="font-medium">Quality Checked</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Hero Visual Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Back Card Glow */}
              <div className="absolute -inset-2 rounded-[36px] bg-gradient-to-tr from-[#E9AEBB] via-[#D7BFAE] to-[#4B2923] opacity-30 blur-xl transform -rotate-1" />

              {/* Main Image Container */}
              <div className="relative rounded-[32px] overflow-hidden bg-white p-3 shadow-2xl border border-[#D7BFAE]/50">
                <img
                  src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1200&q=85"
                  alt="Royal Belgian Dark Truffle Cake - Handcrafted by Cakes & Dessert"
                  className="w-full h-[400px] sm:h-[480px] object-cover rounded-[24px]"
                />

                {/* Floating Information Pill */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-[#D7BFAE]/40 shadow-lg flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#F7DCE2] flex items-center justify-center text-[#4B2923]">
                      <Heart className="w-5 h-5 fill-[#4B2923]" />
                    </div>
                    <div>
                      <h4 className="font-serif font-bold text-sm text-[#4B2923]">
                        Belgian Dark Truffle
                      </h4>
                      <p className="text-[11px] text-[#8A554D]">Signature Bestseller • From ₹850</p>
                    </div>
                  </div>

                  <Link
                    to="/product/royal-belgian-dark-truffle-cake"
                    className="p-2 rounded-full bg-[#4B2923] text-white hover:bg-[#2F1916] transition-colors"
                    aria-label="Order Belgian Dark Truffle"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
