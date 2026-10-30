import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Eye, ShoppingBag, Sparkles, Clock, Check, Star } from 'lucide-react';
import { Product, ProductVariant } from '@/types';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { QuickViewModal } from './QuickViewModal';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [heartPopped, setHeartPopped] = useState(false);

  // Active variant selected directly on card for fast frictionless order
  const [activeVariant, setActiveVariant] = useState<ProductVariant>(
    product.variants.find((v) => v.is_default) || product.variants[0]
  );

  const { addItem } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const isFavorited = isInWishlist(product.id);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
    setHeartPopped(true);
    setTimeout(() => setHeartPopped(false), 500);
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!activeVariant) return;

    setIsAdding(true);
    addItem(product, activeVariant, false);
    setTimeout(() => setIsAdding(false), 800);
  };

  return (
    <>
      <motion.div
        whileHover={{ y: -8 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="group bg-white rounded-3xl overflow-hidden border border-[#D7BFAE]/35 shadow-[0_10px_35px_rgb(75,41,35,0.06)] hover:shadow-[0_20px_45px_rgb(75,41,35,0.14)] flex flex-col justify-between transition-all duration-300 relative"
      >
        {/* Top Badges */}
        <div className="absolute top-3.5 left-3.5 z-10 flex flex-col gap-1.5 pointer-events-none">
          {product.is_bestseller && (
            <span className="bg-[#4B2923] text-white text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full shadow-md flex items-center gap-1">
              <Star className="w-3 h-3 text-[#E9AEBB] fill-[#E9AEBB]" /> Bestseller
            </span>
          )}
          {product.is_new && (
            <span className="bg-[#E9AEBB] text-[#2F1916] text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full shadow-sm">
              New Creation
            </span>
          )}
          {product.dietary_flags.is_eggless_available && (
            <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-medium px-2 py-0.5 rounded-full flex items-center gap-1 shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span> 100% Eggless
            </span>
          )}
        </div>

        {/* Wishlist Button with Heart Pop Animation */}
        <button
          onClick={handleFavoriteClick}
          className={`absolute top-3.5 right-3.5 z-10 p-2.5 rounded-full backdrop-blur-md transition-transform shadow-md ${
            isFavorited
              ? 'bg-[#E9AEBB] text-[#2F1916]'
              : 'bg-white/85 text-[#8A554D] hover:bg-white hover:text-[#4B2923]'
          } ${heartPopped ? 'scale-125' : 'scale-100'}`}
          aria-label="Toggle wishlist"
        >
          <Heart className={`w-4 h-4 transition-colors ${isFavorited ? 'fill-[#2F1916]' : ''}`} />
        </button>

        {/* Product Image Link */}
        <Link to={`/product/${product.slug}`} className="block relative aspect-4/3 overflow-hidden bg-[#FFF7F0]">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            loading="lazy"
          />

          {/* Quick View Button overlay (Desktop) */}
          <div className="absolute inset-0 bg-[#2F1916]/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsQuickViewOpen(true);
              }}
              className="pointer-events-auto transform translate-y-3 group-hover:translate-y-0 transition-all duration-300 bg-white/95 text-[#4B2923] text-xs font-bold uppercase tracking-wider px-4 py-2.5 rounded-full shadow-lg hover:bg-white flex items-center gap-1.5"
            >
              <Eye className="w-3.5 h-3.5" /> Quick View
            </button>
          </div>
        </Link>

        {/* Card Body */}
        <div className="p-5 flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs text-[#8A554D] mb-1.5">
              <span className="font-medium">{product.category_name || 'Artisanal Bake'}</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3 text-[#8A554D]" /> {product.min_order_hours}h advance
              </span>
            </div>

            <Link to={`/product/${product.slug}`}>
              <h3 className="font-serif font-bold text-lg text-[#4B2923] group-hover:text-[#8A554D] transition-colors line-clamp-1 leading-snug">
                {product.name}
              </h3>
            </Link>

            <p className="text-xs text-[#8A554D] mt-1.5 line-clamp-2 leading-relaxed">
              {product.description}
            </p>

            {/* Interactive Portion Size Quick-Picker (if variants > 1) */}
            {product.variants.length > 1 && (
              <div className="mt-3 flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
                {product.variants.map((v) => {
                  const isSelected = activeVariant.id === v.id;
                  return (
                    <button
                      key={v.id}
                      onClick={(e) => {
                        e.preventDefault();
                        setActiveVariant(v);
                      }}
                      className={`text-[10px] px-2.5 py-1 rounded-full font-semibold transition-all shrink-0 ${
                        isSelected
                          ? 'bg-[#4B2923] text-white'
                          : 'bg-[#FFF7F0] text-[#8A554D] border border-[#D7BFAE]/50 hover:border-[#4B2923]'
                      }`}
                    >
                      {v.weight_label}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Pricing & CTA */}
          <div className="pt-4 mt-3 border-t border-[#D7BFAE]/30 flex items-center justify-between gap-3">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-[#8A554D] block font-semibold">
                {activeVariant.weight_label}
              </span>
              <span className="font-serif font-bold text-xl text-[#4B2923]">
                ₹{activeVariant.price}
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setIsQuickViewOpen(true);
                }}
                className="p-2.5 rounded-full border border-[#D7BFAE] text-[#4B2923] hover:bg-[#F7DCE2] transition-colors sm:hidden"
                aria-label="Quick View"
              >
                <Eye className="w-4 h-4" />
              </button>

              <button
                onClick={handleQuickAdd}
                disabled={isAdding}
                className="inline-flex items-center gap-1.5 bg-[#4B2923] text-white text-xs font-bold uppercase tracking-wider px-4 py-2.5 rounded-full shadow-sm hover:bg-[#2F1916] transition-all hover:scale-105 active:scale-95"
              >
                {isAdding ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#E9AEBB]" /> Added
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-3.5 h-3.5 text-[#E9AEBB]" /> Add
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Quick View Modal */}
      <QuickViewModal
        product={product}
        isOpen={isQuickViewOpen}
        onClose={() => setIsQuickViewOpen(false)}
      />
    </>
  );
};
