import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Heart, Clock, Sparkles, ArrowRight } from 'lucide-react';
import { Product, ProductVariant } from '@/types';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { Link } from 'react-router-dom';

interface QuickViewModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({ product, isOpen, onClose }) => {
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(
    product.variants.find((v) => v.is_default) || product.variants[0]
  );
  const [isEggless, setIsEggless] = useState(false);
  const [customMessage, setCustomMessage] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const { addItem } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  if (!isOpen) return null;

  const egglessFee = isEggless && product.customization.allow_eggless ? product.customization.eggless_surcharge : 0;
  const unitPrice = selectedVariant.price + egglessFee;
  const totalPrice = unitPrice * quantity;

  const handleAddToCart = () => {
    addItem(product, selectedVariant, isEggless, customMessage, quantity);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 700);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#2F1916]/65 backdrop-blur-sm"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-[#D7BFAE]/50 z-10 my-8 flex flex-col md:flex-row max-h-[90vh]"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/80 text-[#4B2923] hover:bg-[#FFF7F0] transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Left: Product Image */}
          <div className="w-full md:w-1/2 bg-[#FFF7F0] relative overflow-hidden flex items-center justify-center p-6">
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-64 md:h-full object-cover rounded-2xl shadow-sm"
            />
            <button
              onClick={() => toggleWishlist(product.id)}
              className="absolute top-8 left-8 p-2.5 rounded-full bg-white/90 text-[#4B2923] shadow-md hover:bg-[#F7DCE2]"
            >
              <Heart className={`w-4 h-4 ${isInWishlist(product.id) ? 'fill-[#E9AEBB] text-[#E9AEBB]' : ''}`} />
            </button>
          </div>

          {/* Right: Customization & Add to Cart */}
          <div className="w-full md:w-1/2 p-6 md:p-8 overflow-y-auto flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs text-[#8A554D] mb-1">
                <span>{product.category_name}</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" /> Pre-order ({product.min_order_hours}h advance)
                </span>
              </div>

              <h2 className="font-serif font-bold text-2xl text-[#4B2923] mb-2 leading-tight">
                {product.name}
              </h2>

              <p className="text-xs text-[#8A554D] mb-4 leading-relaxed line-clamp-3">
                {product.description}
              </p>

              {/* Variant / Size Selection */}
              <div className="mb-4">
                <label className="text-xs font-semibold uppercase tracking-wider text-[#4B2923] block mb-2">
                  Select Size / Portion:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {product.variants.map((variant) => {
                    const isSelected = selectedVariant.id === variant.id;
                    return (
                      <button
                        key={variant.id}
                        type="button"
                        onClick={() => setSelectedVariant(variant)}
                        className={`text-left p-2.5 rounded-xl border text-xs transition-all ${
                          isSelected
                            ? 'border-[#4B2923] bg-[#FFF7F0] ring-1 ring-[#4B2923]'
                            : 'border-[#D7BFAE]/60 hover:border-[#8A554D]'
                        }`}
                      >
                        <div className="font-medium text-[#4B2923] truncate">{variant.name}</div>
                        <div className="font-bold text-[#8A554D] mt-0.5">₹{variant.price}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Eggless Option */}
              {product.customization.allow_eggless && (
                <div className="mb-4 p-3 bg-[#FFF7F0] rounded-xl border border-[#D7BFAE]/40 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold text-[#4B2923] block">
                      100% Eggless Preparation
                    </span>
                    <span className="text-[11px] text-[#8A554D]">
                      Baked fresh with gourmet egg replacers (+₹{product.customization.eggless_surcharge})
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={isEggless}
                    onChange={(e) => setIsEggless(e.target.checked)}
                    className="w-4 h-4 text-[#4B2923] rounded border-gray-300 focus:ring-[#E9AEBB] accent-[#4B2923]"
                  />
                </div>
              )}

              {/* Custom Message Piping */}
              {product.customization.allow_message && (
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-xs font-semibold uppercase tracking-wider text-[#4B2923]">
                      Message on Cake (Optional):
                    </label>
                    <span className="text-[10px] text-[#8A554D]">
                      {customMessage.length}/{product.customization.max_message_chars}
                    </span>
                  </div>
                  <input
                    type="text"
                    value={customMessage}
                    onChange={(e) => setCustomMessage(e.target.value.slice(0, product.customization.max_message_chars))}
                    placeholder="e.g. Happy Birthday Nina!"
                    className="w-full text-xs p-2.5 rounded-xl border border-[#D7BFAE] bg-[#FFF7F0] focus:ring-1 focus:ring-[#4B2923] focus:outline-none"
                  />
                </div>
              )}
            </div>

            {/* Bottom Controls */}
            <div className="pt-4 border-t border-[#D7BFAE]/30">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center border border-[#D7BFAE] rounded-full bg-[#FFF7F0] p-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-7 h-7 flex items-center justify-center text-sm font-bold text-[#4B2923] hover:bg-white rounded-full"
                  >
                    -
                  </button>
                  <span className="w-8 text-center text-xs font-bold text-[#4B2923]">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-7 h-7 flex items-center justify-center text-sm font-bold text-[#4B2923] hover:bg-white rounded-full"
                  >
                    +
                  </button>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-[#8A554D] block uppercase tracking-wider">Total</span>
                  <span className="font-serif font-bold text-xl text-[#4B2923]">₹{totalPrice}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={handleAddToCart}
                  disabled={added}
                  className="flex-1 bg-[#4B2923] text-white py-3 px-6 rounded-full font-medium text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-[#2F1916] transition-all shadow-md active:scale-95"
                >
                  {added ? (
                    <>
                      <Check className="w-4 h-4 text-[#E9AEBB]" /> Added to Dessert Bag!
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-[#E9AEBB]" /> Add to Bag (₹{totalPrice})
                    </>
                  )}
                </button>
                
                <Link
                  to={`/product/${product.slug}`}
                  onClick={onClose}
                  className="p-3 border border-[#4B2923] rounded-full text-[#4B2923] hover:bg-[#F7DCE2] transition-colors flex items-center justify-center"
                  title="Full details"
                >
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
