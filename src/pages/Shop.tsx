import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, X, SlidersHorizontal, ArrowUpDown, Cake, Sparkles } from 'lucide-react';
import { ProductCard } from '@/components/products/ProductCard';
import { dataProvider } from '@/services/dataProvider';
import { Product, Category } from '@/types';
import { useWishlist } from '@/contexts/WishlistContext';

export const Shop: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  const { wishlistIds } = useWishlist();

  // Search & Filter State
  const searchQuery = searchParams.get('search') || '';
  const selectedCategory = searchParams.get('category') || 'all';
  const filterType = searchParams.get('filter') || 'all'; // 'wishlist', 'new', 'bestseller'
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'name'>('featured');
  const [egglessOnly, setEgglessOnly] = useState(false);

  useEffect(() => {
    async function loadData() {
      try {
        const [cats, prods] = await Promise.all([
          dataProvider.getCategories(),
          dataProvider.getProducts(),
        ]);
        setCategories(cats);
        setProducts(prods);
      } catch (err) {
        console.error('Failed to load shop catalog', err);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  const handleCategoryChange = (catId: string) => {
    const next = new URLSearchParams(searchParams);
    if (catId === 'all') {
      next.delete('category');
    } else {
      next.set('category', catId);
    }
    setSearchParams(next);
  };

  const handleSearchChange = (val: string) => {
    const next = new URLSearchParams(searchParams);
    if (!val) {
      next.delete('search');
    } else {
      next.set('search', val);
    }
    setSearchParams(next);
  };

  const filteredProducts = useMemo(() => {
    return products.filter((prod) => {
      // Search
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchTitle = prod.name.toLowerCase().includes(query);
        const matchDesc = prod.description.toLowerCase().includes(query);
        const matchCat = (prod.category_name || '').toLowerCase().includes(query);
        const matchIngredients = (prod.ingredients || []).some((i) => i.toLowerCase().includes(query));
        if (!matchTitle && !matchDesc && !matchCat && !matchIngredients) return false;
      }

      // Category
      if (selectedCategory !== 'all' && prod.category_id !== selectedCategory) {
        return false;
      }

      // Filter tags
      if (filterType === 'wishlist' && !wishlistIds.includes(prod.id)) {
        return false;
      }
      if (filterType === 'new' && !prod.is_new) {
        return false;
      }
      if (filterType === 'bestseller' && !prod.is_bestseller) {
        return false;
      }

      // Dietary
      if (egglessOnly && !prod.dietary_flags.is_eggless_available) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.base_price - b.base_price;
      if (sortBy === 'price-desc') return b.base_price - a.base_price;
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return (b.is_featured ? 1 : 0) - (a.is_featured ? 1 : 0);
    });
  }, [products, searchQuery, selectedCategory, filterType, wishlistIds, egglessOnly, sortBy]);

  return (
    <div className="bg-[#FFF7F0] min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs uppercase tracking-widest font-semibold text-[#8A554D] block mb-2">
            Freshly Baked in Coimbatore
          </span>
          <h1 className="text-4xl sm:text-5xl font-serif font-extrabold text-[#4B2923] tracking-tight">
            Artisanal Dessert Menu
          </h1>
          <div className="w-16 h-0.5 bg-[#E9AEBB] mx-auto mt-3 mb-3" />
          <p className="text-sm text-[#8A554D]">
            Browse our signature bakes, celebration cakes, and fudgy brownies. Pre-order scheduled delivery or studio pickup available.
          </p>
        </div>

        {/* Search & Sort Controls Bar */}
        <div className="bg-white rounded-3xl p-4 sm:p-5 border border-[#D7BFAE]/40 shadow-sm mb-8 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8A554D]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Search cakes, brownies, flavours, ingredients..."
              className="w-full pl-11 pr-8 py-2.5 bg-[#FFF7F0] border border-[#D7BFAE] rounded-full text-xs text-[#4B2923] placeholder-[#8A554D]/60 focus:outline-none focus:ring-1 focus:ring-[#4B2923]"
            />
            {searchQuery && (
              <button
                onClick={() => handleSearchChange('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8A554D] hover:text-[#4B2923]"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Filters & Sorting Right Bar */}
          <div className="flex items-center gap-3">
            {/* Mobile Filter Trigger */}
            <button
              onClick={() => setIsMobileFiltersOpen(true)}
              className="md:hidden flex items-center gap-2 px-4 py-2.5 bg-[#FFF7F0] rounded-full border border-[#D7BFAE] text-xs font-semibold text-[#4B2923]"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
            </button>

            {/* Eggless Toggle (Desktop) */}
            <button
              onClick={() => setEgglessOnly(!egglessOnly)}
              className={`hidden sm:inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-medium border transition-colors ${
                egglessOnly
                  ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                  : 'bg-[#FFF7F0] text-[#4B2923] border-[#D7BFAE] hover:bg-[#F7DCE2]'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${egglessOnly ? 'bg-emerald-600' : 'bg-gray-400'}`} />
              100% Eggless
            </button>

            {/* Sorting Dropdown */}
            <div className="relative flex items-center bg-[#FFF7F0] border border-[#D7BFAE] rounded-full px-3 py-2 text-xs">
              <ArrowUpDown className="w-3.5 h-3.5 text-[#8A554D] mr-2" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent text-xs font-semibold text-[#4B2923] focus:outline-none cursor-pointer pr-2"
              >
                <option value="featured">Featured First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name">Alphabetical</option>
              </select>
            </div>
          </div>
        </div>

        {/* Category Pills (Desktop & Tablet) */}
        <div className="hidden md:flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          <button
            onClick={() => handleCategoryChange('all')}
            className={`px-5 py-2 rounded-full text-xs font-semibold transition-all shrink-0 ${
              selectedCategory === 'all'
                ? 'bg-[#4B2923] text-white shadow-sm'
                : 'bg-white text-[#4B2923] border border-[#D7BFAE]/50 hover:bg-[#F7DCE2]'
            }`}
          >
            All Desserts ({products.length})
          </button>
          {categories.map((cat) => {
            const count = products.filter((p) => p.category_id === cat.id).length;
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                className={`px-5 py-2 rounded-full text-xs font-semibold transition-all shrink-0 ${
                  isSelected
                    ? 'bg-[#4B2923] text-white shadow-sm'
                    : 'bg-white text-[#4B2923] border border-[#D7BFAE]/50 hover:bg-[#F7DCE2]'
                }`}
              >
                {cat.name} ({count})
              </button>
            );
          })}
        </div>

        {/* Results Count & Active Filter indicator */}
        <div className="flex items-center justify-between text-xs text-[#8A554D] mb-6">
          <span>
            Showing <strong className="text-[#4B2923]">{filteredProducts.length}</strong> items
            {filterType === 'wishlist' && ' in your wishlist'}
            {searchQuery && ` for "${searchQuery}"`}
          </span>

          {(selectedCategory !== 'all' || searchQuery || egglessOnly || filterType !== 'all') && (
            <button
              onClick={() => {
                setSearchParams({});
                setEgglessOnly(false);
              }}
              className="text-[#4B2923] hover:underline font-semibold flex items-center gap-1"
            >
              <X className="w-3.5 h-3.5" /> Clear all filters
            </button>
          )}
        </div>

        {/* Product Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="bg-white rounded-3xl h-96 animate-pulse border border-[#D7BFAE]/30" />
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-[#D7BFAE]/40 max-w-lg mx-auto my-8">
            <div className="w-16 h-16 rounded-full bg-[#F7DCE2] flex items-center justify-center text-[#4B2923] mx-auto mb-4">
              <Cake className="w-8 h-8" />
            </div>
            <h3 className="font-serif font-bold text-xl text-[#4B2923] mb-2">
              No sweet treats match your criteria
            </h3>
            <p className="text-xs text-[#8A554D] leading-relaxed mb-6">
              Try adjusting your search terms, changing the category, or browsing our custom cake builder for a personalized order.
            </p>
            <button
              onClick={() => {
                setSearchParams({});
                setEgglessOnly(false);
              }}
              className="bg-[#4B2923] text-white text-xs font-semibold px-6 py-3 rounded-full hover:bg-[#2F1916] transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

      </div>

      {/* Mobile Filter Drawer */}
      <AnimatePresence>
        {isMobileFiltersOpen && (
          <div className="fixed inset-0 z-50 flex justify-end md:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileFiltersOpen(false)}
              className="fixed inset-0 bg-[#2F1916]/60 backdrop-blur-sm"
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              className="relative w-full max-w-xs bg-white h-full shadow-2xl p-6 flex flex-col justify-between overflow-y-auto"
            >
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-[#D7BFAE]/30 mb-6">
                  <h3 className="font-serif font-bold text-lg text-[#4B2923]">Filter Menu</h3>
                  <button
                    onClick={() => setIsMobileFiltersOpen(false)}
                    className="p-1.5 text-[#8A554D] hover:text-[#4B2923]"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Dietary */}
                <div className="mb-6">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#4B2923] block mb-3">
                    Dietary
                  </label>
                  <label className="flex items-center gap-2.5 text-xs text-[#4B2923] cursor-pointer">
                    <input
                      type="checkbox"
                      checked={egglessOnly}
                      onChange={(e) => setEgglessOnly(e.target.checked)}
                      className="w-4 h-4 rounded text-[#4B2923] focus:ring-[#E9AEBB]"
                    />
                    <span>100% Eggless Only</span>
                  </label>
                </div>

                {/* Categories */}
                <div className="mb-6">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#4B2923] block mb-3">
                    Categories
                  </label>
                  <div className="space-y-2">
                    <button
                      onClick={() => {
                        handleCategoryChange('all');
                        setIsMobileFiltersOpen(false);
                      }}
                      className={`block w-full text-left text-xs py-1.5 px-3 rounded-lg ${
                        selectedCategory === 'all' ? 'bg-[#4B2923] text-white font-semibold' : 'text-[#8A554D]'
                      }`}
                    >
                      All Desserts
                    </button>
                    {categories.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => {
                          handleCategoryChange(cat.id);
                          setIsMobileFiltersOpen(false);
                        }}
                        className={`block w-full text-left text-xs py-1.5 px-3 rounded-lg ${
                          selectedCategory === cat.id ? 'bg-[#4B2923] text-white font-semibold' : 'text-[#8A554D]'
                        }`}
                      >
                        {cat.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <button
                onClick={() => setIsMobileFiltersOpen(false)}
                className="w-full bg-[#4B2923] text-white py-3 rounded-full text-xs font-semibold hover:bg-[#2F1916]"
              >
                Show Results ({filteredProducts.length})
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
