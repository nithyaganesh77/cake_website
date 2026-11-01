import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Heart,
  Clock,
  ShieldCheck,
  Sparkles,
  ShoppingBag,
  Check,
  ChevronLeft,
  Truck,
  AlertCircle,
  Share2,
} from 'lucide-react';
import { dataProvider } from '@/services/dataProvider';
import { Product, ProductVariant } from '@/types';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';

export const ProductDetails: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
  const [isEggless, setIsEggless] = useState(false);
  const [customMessage, setCustomMessage] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const { addItem } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  useEffect(() => {
    async function loadProduct() {
      if (!slug) return;
      setIsLoading(true);
      try {
        const item = await dataProvider.getProductBySlug(slug);
        setProduct(item);
        if (item && item.variants.length > 0) {
          const def = item.variants.find((v) => v.is_default) || item.variants[0];
          setSelectedVariant(def);
        }
      } catch (e) {
        console.error('Failed to load product', e);
      } finally {
        setIsLoading(false);
      }
    }
    loadProduct();
  }, [slug]);

  if (isLoading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="w-12 h-12 rounded-full border-4 border-[#E9AEBB] border-t-[#4B2923] animate-spin" />
      </div>
    );
  }

  if (!product || !selectedVariant) {
    return (
      <div className="max-w-xl mx-auto text-center py-24 px-4">
        <h2 className="text-2xl font-serif font-bold text-[#4B2923] mb-3">
          Product Not Found
        </h2>
        <p className="text-sm text-[#8A554D] mb-6">
          The requested dessert could not be found or has been retired from our current menu.
        </p>
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 bg-[#4B2923] text-white px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider"
        >
          Return to Shop Menu
        </Link>
      </div>
    );
  }

  const isFavorited = isInWishlist(product.id);
  const egglessSurcharge = isEggless && product.customization.allow_eggless ? product.customization.eggless_surcharge : 0;
  const unitPrice = selectedVariant.price + egglessSurcharge;
  const totalPrice = unitPrice * quantity;

  const handleAddToCart = () => {
    setIsAdding(true);
    addItem(product, selectedVariant, isEggless, customMessage, quantity);
    setTimeout(() => setIsAdding(false), 800);
  };

  const handleBuyNow = () => {
    addItem(product, selectedVariant, isEggless, customMessage, quantity);
    navigate('/checkout');
  };

  return (
    <div className="bg-[#FFF7F0] py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <div className="mb-8 flex items-center gap-2 text-xs text-[#8A554D]">
          <Link to="/" className="hover:text-[#4B2923]">Home</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-[#4B2923]">Shop</Link>
          <span>/</span>
          <Link to={`/shop?category=${product.category_id}`} className="hover:text-[#4B2923]">
            {product.category_name}
          </Link>
          <span>/</span>
          <span className="text-[#4B2923] font-medium truncate max-w-xs">{product.name}</span>
        </div>

        {/* Main Product Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Image Gallery */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative aspect-4/3 rounded-3xl overflow-hidden bg-white border border-[#D7BFAE]/50 shadow-md">
              <img
                src={product.images[activeImageIndex] || product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              
              <button
                onClick={() => toggleWishlist(product.id)}
                className="absolute top-4 right-4 p-3 rounded-full bg-white/90 text-[#4B2923] shadow-md hover:bg-[#F7DCE2] transition-colors"
                aria-label="Save to wishlist"
              >
                <Heart className={`w-5 h-5 ${isFavorited ? 'fill-[#E9AEBB] text-[#E9AEBB]' : ''}`} />
              </button>
            </div>

            {/* Thumbnail Navigation */}
            {product.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all shrink-0 ${
                      activeImageIndex === idx ? 'border-[#4B2923] scale-102' : 'border-[#D7BFAE]/40 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`${product.name} preview ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Guarantee Strip */}
            <div className="grid grid-cols-3 gap-3 pt-4 text-center">
              <div className="bg-white rounded-2xl p-4 border border-[#D7BFAE]/30">
                <Clock className="w-5 h-5 text-[#8A554D] mx-auto mb-1.5" />
                <span className="text-xs font-bold text-[#4B2923] block">{product.min_order_hours}h Lead Time</span>
                <span className="text-[10px] text-[#8A554D]">Baked fresh to order</span>
              </div>
              <div className="bg-white rounded-2xl p-4 border border-[#D7BFAE]/30">
                <Truck className="w-5 h-5 text-[#8A554D] mx-auto mb-1.5" />
                <span className="text-xs font-bold text-[#4B2923] block">Coimbatore Local</span>
                <span className="text-[10px] text-[#8A554D]">Chilled door delivery</span>
              </div>
              <div className="bg-white rounded-2xl p-4 border border-[#D7BFAE]/30">
                <ShieldCheck className="w-5 h-5 text-[#8A554D] mx-auto mb-1.5" />
                <span className="text-xs font-bold text-[#4B2923] block">Pure Ingredients</span>
                <span className="text-[10px] text-[#8A554D]">70% Belgian chocolate</span>
              </div>
            </div>
          </div>

          {/* Right Column: Customization & Ordering */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-[#D7BFAE]/40 shadow-sm space-y-6">
            <div>
              <div className="flex items-center gap-2 text-xs text-[#8A554D] mb-1">
                <span className="font-semibold uppercase tracking-wider text-[#E9AEBB] bg-[#4B2923] px-2.5 py-0.5 rounded-full text-[10px]">
                  {product.category_name}
                </span>
                {product.dietary_flags.is_eggless_available && (
                  <span className="text-emerald-700 font-medium text-[11px]">
                    • Eggless Option Available
                  </span>
                )}
                <span className="text-amber-800 font-medium text-[11px]">
                  • 100% Gelatine-Free &amp; Halal-Friendly
                </span>
              </div>

              <h1 className="font-serif font-extrabold text-2xl sm:text-3xl text-[#4B2923] mt-2 mb-2 leading-tight">
                {product.name}
              </h1>

              <div className="flex items-baseline gap-3">
                <span className="font-serif font-bold text-3xl text-[#4B2923]">
                  ₹{totalPrice}
                </span>
                {quantity > 1 && (
                  <span className="text-xs text-[#8A554D]">
                    (₹{unitPrice} each)
                  </span>
                )}
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#8A554D] leading-relaxed border-t border-b border-[#D7BFAE]/30 py-3.5">
              {product.description}
            </p>

            {/* 1. Size / Weight Variants */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-[#4B2923] block mb-2.5">
                Choose Portion / Weight:
              </label>
              <div className="space-y-2">
                {product.variants.map((variant) => {
                  const isSelected = selectedVariant.id === variant.id;
                  return (
                    <button
                      key={variant.id}
                      type="button"
                      onClick={() => setSelectedVariant(variant)}
                      className={`w-full flex items-center justify-between p-3.5 rounded-2xl border text-xs transition-all ${
                        isSelected
                          ? 'border-[#4B2923] bg-[#FFF7F0] ring-1 ring-[#4B2923]'
                          : 'border-[#D7BFAE]/50 hover:border-[#8A554D]'
                      }`}
                    >
                      <div className="text-left">
                        <span className="font-bold text-[#4B2923] block text-sm">{variant.name}</span>
                        {variant.serves_label && (
                          <span className="text-[11px] text-[#8A554D]">{variant.serves_label}</span>
                        )}
                      </div>
                      <span className="font-serif font-bold text-sm text-[#4B2923]">
                        ₹{variant.price}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Eggless Toggle */}
            {product.customization.allow_eggless && (
              <div className="p-3.5 bg-[#FFF7F0] rounded-2xl border border-[#D7BFAE]/40 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-[#4B2923] block">
                    Make this Eggless
                  </span>
                  <span className="text-[11px] text-[#8A554D]">
                    Prepared in dedicated vegetarian pans (+₹{product.customization.eggless_surcharge})
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={isEggless}
                  onChange={(e) => setIsEggless(e.target.checked)}
                  className="w-5 h-5 text-[#4B2923] rounded border-gray-300 focus:ring-[#E9AEBB] accent-[#4B2923] cursor-pointer"
                />
              </div>
            )}

            {/* 3. Message on Cake */}
            {product.customization.allow_message && (
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#4B2923]">
                    Message on Cake Board (Complimentary):
                  </label>
                  <span className="text-[10px] text-[#8A554D]">
                    {customMessage.length}/{product.customization.max_message_chars}
                  </span>
                </div>
                <input
                  type="text"
                  value={customMessage}
                  onChange={(e) => setCustomMessage(e.target.value.slice(0, product.customization.max_message_chars))}
                  placeholder="e.g. Happy 25th Anniversary Mom & Dad"
                  className="w-full text-xs p-3 rounded-xl border border-[#D7BFAE] bg-[#FFF7F0] focus:ring-2 focus:ring-[#E9AEBB] focus:outline-none"
                />
              </div>
            )}

            {/* Quantity Selector */}
            <div className="flex items-center justify-between pt-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#4B2923]">
                Quantity
              </span>
              <div className="flex items-center border border-[#D7BFAE] rounded-full bg-[#FFF7F0] p-1">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 flex items-center justify-center text-sm font-bold text-[#4B2923] hover:bg-white rounded-full transition-colors"
                >
                  -
                </button>
                <span className="w-10 text-center text-xs font-bold text-[#4B2923]">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-8 h-8 flex items-center justify-center text-sm font-bold text-[#4B2923] hover:bg-white rounded-full transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-2">
              <button
                onClick={handleAddToCart}
                disabled={isAdding}
                className="w-full bg-[#4B2923] text-white py-4 px-6 rounded-full font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-[#2F1916] transition-all shadow-md active:scale-98"
              >
                {isAdding ? (
                  <>
                    <Check className="w-4 h-4 text-[#E9AEBB]" /> Added to Dessert Bag!
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4 text-[#E9AEBB]" /> Add to Bag (₹{totalPrice})
                  </>
                )}
              </button>

              <button
                onClick={handleBuyNow}
                className="w-full bg-[#F7DCE2] border border-[#E9AEBB] text-[#4B2923] py-3.5 px-6 rounded-full font-semibold text-xs uppercase tracking-wider hover:bg-[#E9AEBB] transition-colors"
              >
                Schedule Pre-Order Directly
              </button>

              {/* Swiggy Direct Instant Order */}
              <a
                href="https://www.swiggy.com/direct/brand/708273?source=swiggy-direct&subSource=whatsapp"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 bg-[#FC8019] text-white py-3.5 px-6 rounded-full font-bold text-xs uppercase tracking-wider hover:bg-[#e26e10] transition-colors shadow-sm"
              >
                <span>⚡ Need it Today? Order on Swiggy Direct</span>
              </a>

              {/* Courier Shipping Badge if Brownie Slab */}
              {product.category_id === 'cat-courier-slabs' && (
                <div className="bg-amber-50 rounded-2xl p-3 border border-amber-200 text-xs text-amber-900 flex items-center gap-2.5">
                  <span className="text-xl">📦</span>
                  <div>
                    <strong className="block font-bold">Courier Shipping Across India Available</strong>
                    <span className="text-[11px] text-amber-800">
                      Vacuum-sealed &amp; ambient temperature stable for 7 days. Delivered safely anywhere in Tamil Nadu &amp; India!
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Ingredients & Storage Instructions */}
            {product.ingredients && product.ingredients.length > 0 && (
              <div className="border-t border-[#D7BFAE]/30 pt-4 text-xs text-[#8A554D] space-y-1.5">
                <p>
                  <strong className="text-[#4B2923]">Ingredients:</strong> {product.ingredients.join(', ')}
                </p>
                {product.storage_instructions && (
                  <p>
                    <strong className="text-[#4B2923]">Storage:</strong> {product.storage_instructions}
                  </p>
                )}
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
};

