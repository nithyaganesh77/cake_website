import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, ArrowRight, MessageCircle } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useLocation } from 'react-router-dom';

export const MobileStickyCartBar: React.FC = () => {
  const { itemCount, subtotal, openCart, isCartOpen } = useCart();
  const location = useLocation();

  // Hide bar on checkout or if cart is already open or empty
  if (itemCount === 0 || isCartOpen || location.pathname.startsWith('/checkout') || location.pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 80, opacity: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 350 }}
        className="fixed bottom-4 left-3 right-3 sm:hidden z-40"
      >
        <button
          onClick={openCart}
          className="w-full bg-[#2F1916] text-white p-3 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.35)] border border-[#E9AEBB]/30 flex items-center justify-between cursor-pointer active:scale-98 transition-transform"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shadow-xs">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div className="text-left">
              <span className="text-xs font-bold text-white block leading-tight">
                {itemCount} {itemCount === 1 ? 'item' : 'items'} in Bag · ₹{subtotal}
              </span>
              <span className="text-[10px] text-emerald-400 font-medium">
                Tap to Order on WhatsApp
              </span>
            </div>
          </div>

          <div className="inline-flex items-center gap-1.5 bg-emerald-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-xs">
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Order</span>
            <ArrowRight className="w-3 h-3" />
          </div>
        </button>
      </motion.div>
    </AnimatePresence>
  );
};
