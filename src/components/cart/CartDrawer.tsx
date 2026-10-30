import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Trash2, ArrowRight, ShoppingBag, Sparkles } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { Link } from 'react-router-dom';

export const CartDrawer: React.FC = () => {
  const { isCartOpen, closeCart, items, updateQuantity, removeItem, subtotal, itemCount } = useCart();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={closeCart}
            className="absolute inset-0 bg-[#2F1916]/60 backdrop-blur-sm"
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              className="w-screen max-w-md bg-[#FFF7F0] shadow-2xl flex flex-col justify-between border-l border-[#D7BFAE]/50"
            >
              {/* Header */}
              <div className="p-6 bg-white border-b border-[#D7BFAE]/30 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-[#F7DCE2] flex items-center justify-center text-[#4B2923]">
                    <ShoppingBag className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="font-serif font-bold text-xl text-[#4B2923]">Your Dessert Bag</h2>
                    <p className="text-xs text-[#8A554D]">{itemCount} {itemCount === 1 ? 'item' : 'items'} selected</p>
                  </div>
                </div>
                <button
                  onClick={closeCart}
                  className="p-2 text-[#8A554D] hover:text-[#4B2923] hover:bg-[#FFF7F0] rounded-full transition-colors"
                  aria-label="Close cart"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {items.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center py-12">
                    <div className="w-20 h-20 rounded-full bg-[#F7DCE2]/60 flex items-center justify-center text-[#4B2923] mb-4">
                      <ShoppingBag className="w-10 h-10 stroke-[1.5]" />
                    </div>
                    <h3 className="font-serif font-semibold text-lg text-[#4B2923] mb-2">
                      Your bag is empty
                    </h3>
                    <p className="text-sm text-[#8A554D] max-w-xs mb-6">
                      Explore our handcrafted celebration cakes, fudgy brownies, and sweet treats.
                    </p>
                    <button
                      onClick={closeCart}
                      className="inline-flex items-center gap-2 bg-[#4B2923] text-white text-sm font-medium px-6 py-3 rounded-full hover:bg-[#2F1916] transition-colors"
                    >
                      Browse Our Menu
                    </button>
                  </div>
                ) : (
                  items.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="bg-white rounded-2xl p-4 border border-[#D7BFAE]/30 shadow-sm flex gap-3.5"
                    >
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-20 h-20 rounded-xl object-cover shrink-0 border border-[#D7BFAE]/20"
                      />

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="font-serif font-bold text-sm text-[#4B2923] truncate">
                            {item.product.name}
                          </h4>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-[#8A554D]/60 hover:text-red-600 transition-colors shrink-0"
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="mt-1 flex flex-wrap gap-1.5 text-[11px] text-[#8A554D]">
                          <span className="bg-[#FFF7F0] px-2 py-0.5 rounded-md border border-[#D7BFAE]/30 font-medium">
                            {item.selected_variant.weight_label}
                          </span>
                          {item.is_eggless && (
                            <span className="bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-md border border-emerald-200">
                              Eggless
                            </span>
                          )}
                        </div>

                        {item.custom_message && (
                          <p className="mt-1.5 text-[11px] text-[#4B2923] bg-[#F7DCE2]/40 px-2 py-1 rounded-md italic">
                            "{item.custom_message}"
                          </p>
                        )}

                        <div className="mt-3 flex items-center justify-between">
                          <div className="flex items-center border border-[#D7BFAE] rounded-full bg-[#FFF7F0] px-1 py-0.5">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-6 h-6 flex items-center justify-center text-[#4B2923] hover:bg-white rounded-full transition-colors"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-8 text-center text-xs font-semibold text-[#4B2923]">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-6 h-6 flex items-center justify-center text-[#4B2923] hover:bg-white rounded-full transition-colors"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <div className="text-right">
                            <span className="text-sm font-bold text-[#4B2923]">
                              ₹{item.total_price}
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>

              {/* Footer Checkout Summary */}
              {items.length > 0 && (
                <div className="p-6 bg-white border-t border-[#D7BFAE]/40 space-y-4">
                  <div className="space-y-1.5 text-xs text-[#8A554D]">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="font-semibold text-[#4B2923]">₹{subtotal}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Delivery Fee</span>
                      <span className="text-emerald-700 font-medium">Calculated at slot checkout</span>
                    </div>
                    <div className="border-t border-[#D7BFAE]/40 pt-2 flex justify-between text-base font-serif font-bold text-[#4B2923]">
                      <span>Estimated Total</span>
                      <span>₹{subtotal}</span>
                    </div>
                  </div>

                  <div className="bg-[#FFF7F0] rounded-xl p-2.5 flex items-center gap-2 text-[11px] text-[#8A554D] border border-[#D7BFAE]/30">
                    <Sparkles className="w-4 h-4 text-[#E9AEBB] shrink-0" />
                    <span>Freshly baked to order. No online gateway required.</span>
                  </div>

                  <div className="space-y-2">
                    <Link
                      to="/checkout"
                      onClick={closeCart}
                      className="w-full flex items-center justify-center gap-2 bg-[#4B2923] text-white py-3.5 px-6 rounded-full font-medium shadow-md hover:bg-[#2F1916] transition-all"
                    >
                      Proceed to Pre-Order Scheduling <ArrowRight className="w-4 h-4" />
                    </Link>
                    <button
                      onClick={closeCart}
                      className="w-full text-center text-xs text-[#8A554D] hover:text-[#4B2923] py-1 transition-colors"
                    >
                      Continue Browsing Menu
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
