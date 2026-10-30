import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, ShoppingBag, ArrowUp, Phone, X } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

export const FloatingQuickActions: React.FC = () => {
  const { openCart, itemCount } = useCart();
  const [isExpanded, setIsExpanded] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 pointer-events-auto">
      
      {/* Floating Scroll to Top */}
      <button
        onClick={scrollToTop}
        className="w-10 h-10 rounded-full bg-white/90 text-[#4B2923] border border-[#D7BFAE]/60 shadow-md flex items-center justify-center hover:bg-[#FFF7F0] transition-colors"
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-4 h-4" />
      </button>

      {/* Floating Cart Button (if items > 0) */}
      {itemCount > 0 && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          onClick={openCart}
          className="relative flex items-center gap-2 bg-[#4B2923] text-white px-4 py-3 rounded-full shadow-2xl hover:bg-[#2F1916] transition-all hover:scale-105 active:scale-95 border border-[#E9AEBB]/30"
          aria-label="Open Cart"
        >
          <ShoppingBag className="w-4 h-4 text-[#E9AEBB]" />
          <span className="text-xs font-bold uppercase tracking-wider">Bag</span>
          <span className="w-5 h-5 rounded-full bg-[#E9AEBB] text-[#2F1916] text-[10px] font-bold flex items-center justify-center">
            {itemCount}
          </span>
        </motion.button>
      )}

      {/* Floating WhatsApp Quick Action with Pulsing Ring */}
      <div className="relative">
        <span className="absolute -inset-1 rounded-full bg-emerald-500 opacity-40 animate-ping pointer-events-none" />
        <a
          href="https://wa.me/917841716999?text=Hello%20Cakes%20%26%20Dessert!%20I%20would%20like%20to%20enquire%20about%20ordering%20a%20cake."
          target="_blank"
          rel="noopener noreferrer"
          className="relative w-12 h-12 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center shadow-xl transition-transform hover:scale-110 active:scale-95"
          aria-label="Chat on WhatsApp with Baker"
        >
          <MessageCircle className="w-6 h-6" />
        </a>
      </div>

    </div>
  );
};

