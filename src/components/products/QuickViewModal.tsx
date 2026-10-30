import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, ShoppingBag, Heart, Check, Clock, ShieldCheck } from 'lucide-react';
import { Product, ProductVariant } from '@/types';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';

interface QuickViewModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({ product, isOpen, onClose }) => {
  const { addItem } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  if (!product || !isOpen) return null;

  const variants = product.variants || [];
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(
    variants[0] || {
      id: 'default',
      name: 'Standard Portion',
      price: product.base_price,
      weight_label: '500g',
    }
  );

  const [isEggless, setIsEggless] = useState<boolean>(false);
  const [boardMessage, setBoardMessage] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [isAdded, setIsAdded] = useState<boolean>(false);

  const isFavorited = isInWishlist(product.id);

  // Calculate unit price with eggless surcharge
  const egglessSurcharge = isEggless && product.customization?.allow_eggless ? (product.customization.eggless_surcharge || 0) : 0;
  const unitPrice = selectedVariant.price + egglessSurcharge;
  const totalPrice = unitPrice * quantity;

  const handleAddToCart = () => {
    addItem(product, selectedVariant, isEggless, boardMessage.trim(), quantity);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      onClose();
    }, 1000);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#2F1916]/65 backdrop-blur-sm"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative bg-white rounded-3xl max-w-3xl w-full shadow-2xl border border-[#D7BFAE]/50 overflow-hidden z-10 my-8"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/80 hover:bg-white text-[#4B2923] shadow-md border border-[#D7BFAE]/40 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2">
            
            {/* Left Column: Image */}
            <div className="relative bg-[#FFF7F0] p-6 flex items-center justify-center min-h-[300px]">
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-64 sm:h-80 object-cover rounded-2xl shadow-lg"
              />

              {/* Wishlist Button on Image */}
              <button
                onClick={() => toggleWishlist(product.id)}
                className={`absolute top-8 right-8 p-3 rounded-full shadow-md backdrop-blur-md transition-all ${
                  isFavorited
                    ? 'bg-[#E9AEBB] text-[#4B2923]'
                    : 'bg-white/80 text-[#8A554D] hover:bg-white'
                }`}
                aria-label="Toggle wishlist"
              >
                <Heart className={`w-5 h-5 ${isFavorited ? 'fill-current' : ''}`} />
              </button>

              {/* Eggless badge */}
              {(product.dietary_flags?.is_eggless_available || isEggless) && (
                <div className="absolute bottom-8 left-8 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 border border-emerald-500/30 text-emerald-800 text-[11px] font-bold shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-emerald-600" />
                  <span>100% Pure Eggless</span>
                </div>
              )}
            </div>

            {/* Right Column: Customization Controls */}
            <div className="p-6 sm:p-8 flex flex-col justify-between space-y-4">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#8A554D] block mb-1">
                  {product.category_name || 'Artisanal Patisserie'}
                </span>
                <h3 className="font-serif font-bold text-2xl text-[#4B2923] leading-snug">
                  {product.name}
                </h3>
                <p className="text-xs text-[#8A554D] mt-2 line-clamp-2 leading-relaxed">
                  {product.description}
                </p>

                {/* Price Display */}
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="font-serif text-2xl sm:text-3xl font-extrabold text-[#4B2923]">
                    ₹{totalPrice}
                  </span>
                  {quantity > 1 && (
                    <span className="text-xs text-[#8A554D]">
                      (₹{unitPrice} each)
                    </span>
                  )}
                </div>

                {/* Portion / Variant Selector */}
                {variants.length > 0 && (
                  <div className="mt-3">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#4B2923] block mb-2">
                      Select Portion / Weight:
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {variants.map((variant) => (
                        <button
                          key={variant.id}
                          type="button"
                          onClick={() => setSelectedVariant(variant)}
                          className={`py-2 px-2 text-center rounded-xl text-xs font-bold border transition-all ${
                            selectedVariant.id === variant.id
                              ? 'border-[#4B2923] bg-[#4B2923] text-white shadow-sm'
                              : 'border-[#D7BFAE]/60 text-[#4B2923] bg-[#FFF7F0] hover:border-[#8A554D]'
                          }`}
                        >
                          <span className="block truncate">{variant.weight_label || variant.name}</span>
                          <span className="text-[10px] opacity-80 block">₹{variant.price}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Eggless Option toggle */}
                {product.customization?.allow_eggless && (
                  <div className="mt-3">
                    <label className="flex items-center gap-2 cursor-pointer bg-[#FFF7F0] p-2.5 rounded-xl border border-[#D7BFAE]/50">
                      <input
                        type="checkbox"
                        checked={isEggless}
                        onChange={(e) => setIsEggless(e.target.checked)}
                        className="rounded text-[#4B2923] focus:ring-[#8A554D] w-4 h-4 accent-[#4B2923]"
                      />
                      <span className="text-xs font-bold text-[#4B2923]">
                        Make it 100% Eggless (+₹{product.customization.eggless_surcharge || 50})
                      </span>
                    </label>
                  </div>
                )}

                {/* Custom Cake Board Inscription */}
                {product.customization?.allow_message && (
                  <div className="mt-3">
                    <div className="flex justify-between items-center mb-1">
                      <label className="text-xs font-bold uppercase tracking-wider text-[#4B2923]">
                        Cake Board Piping:
                      </label>
                      <span className="text-[10px] text-[#8A554D]">
                        {boardMessage.length}/{product.customization.max_message_chars || 35} chars
                      </span>
                    </div>
                    <input
                      type="text"
                      maxLength={product.customization.max_message_chars || 35}
                      value={boardMessage}
                      onChange={(e) => setBoardMessage(e.target.value)}
                      placeholder="e.g. Happy 30th Birthday Priya! ✨"
                      className="w-full px-3 py-2 text-xs rounded-xl border border-[#D7BFAE]/60 bg-[#FFF7F0] focus:outline-none focus:border-[#4B2923] text-[#4B2923]"
                    />
                    {boardMessage && (
                      <p className="font-script text-base text-[#8A554D] mt-1 pl-1">
                        Piping Preview: &ldquo;{boardMessage}&rdquo;
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* Quantity Counter & Add Button */}
              <div className="pt-3 border-t border-[#D7BFAE]/30 space-y-2.5">
                <div className="flex items-center gap-3">
                  {/* Quantity selector */}
                  <div className="flex items-center border border-[#D7BFAE]/60 rounded-xl bg-[#FFF7F0] overflow-hidden">
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="px-3 py-2 text-[#4B2923] hover:bg-[#F7DCE2] font-bold text-sm"
                    >
                      -
                    </button>
                    <span className="px-3 py-2 text-xs font-bold text-[#4B2923]">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => Math.min(10, q + 1))}
                      className="px-3 py-2 text-[#4B2923] hover:bg-[#F7DCE2] font-bold text-sm"
                    >
                      +
                    </button>
                  </div>

                  {/* Add to Cart button */}
                  <button
                    type="button"
                    onClick={handleAddToCart}
                    disabled={isAdded}
                    className={`flex-1 shimmer-btn py-3 px-4 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md ${
                      isAdded
                        ? 'bg-emerald-700 text-white'
                        : 'bg-[#4B2923] text-white hover:bg-[#2F1916]'
                    }`}
                  >
                    {isAdded ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Added to Pre-Order!</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4 text-[#E9AEBB]" />
                        <span>Add to Pre-Order (₹{totalPrice})</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="flex items-center justify-between text-[10px] text-[#8A554D] px-1">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#E9AEBB]" />
                    <span>Min {product.min_order_hours || 4}h advance notice</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-[#E9AEBB]" />
                    <span>Freshly Baked in Coimbatore</span>
                  </span>
                </div>
              </div>

            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
