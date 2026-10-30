import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShoppingBag,
  Heart,
  Search,
  Menu,
  X,
  Cake,
  Phone,
  Sparkles,
  ChevronDown,
} from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();

  const { openCart, itemCount } = useCart();
  const { wishlistCount } = useWishlist();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Shop Menu', path: '/shop' },
    { label: 'Custom Cakes', path: '/custom-cakes' },
    { label: 'Bulk Orders', path: '/bulk-orders' },
    { label: 'About Us', path: '/about' },
    { label: 'Contact', path: '/contact' },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/shop?search=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  return (
    <>
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-[0_4px_20px_rgba(75,41,35,0.06)] border-b border-[#D7BFAE]/30 py-3'
            : 'bg-[#FFF7F0] border-b border-[#D7BFAE]/20 py-4.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            
            {/* Mobile Menu Button */}
            <div className="flex items-center lg:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-[#4B2923] hover:bg-[#F7DCE2] rounded-full transition-colors"
                aria-label="Toggle Navigation Menu"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

            {/* Brand Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-[#4B2923] flex items-center justify-center text-[#FFF7F0] shadow-sm group-hover:scale-105 transition-transform duration-300">
                <Cake className="w-6 h-6 text-[#E9AEBB]" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif font-extrabold text-xl sm:text-2xl tracking-tight text-[#4B2923] leading-none">
                  Cakes &amp; Dessert
                </span>
                <span className="text-[10px] tracking-widest uppercase font-medium text-[#8A554D] mt-0.5">
                  Boutique Studio • Coimbatore
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-7">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className="relative py-1 text-sm font-medium transition-colors text-[#4B2923] hover:text-[#8A554D]"
                  >
                    {link.label}
                    {isActive && (
                      <motion.div
                        layoutId="activeNavIndicator"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#E9AEBB] rounded-full"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right Action Icons & CTA */}
            <div className="flex items-center gap-2 sm:gap-3.5">
              {/* Search Toggle */}
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2.5 text-[#4B2923] hover:bg-[#F7DCE2] rounded-full transition-colors"
                aria-label="Search cakes and brownies"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Wishlist Icon */}
              <Link
                to="/shop?filter=wishlist"
                className="relative p-2.5 text-[#4B2923] hover:bg-[#F7DCE2] rounded-full transition-colors hidden sm:flex"
                aria-label="View Wishlist"
              >
                <Heart className="w-5 h-5" />
                {wishlistCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#E9AEBB] text-[#2F1916] text-[10px] font-bold flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Shopping Bag / Cart */}
              <button
                onClick={openCart}
                className="relative p-2.5 text-[#4B2923] hover:bg-[#F7DCE2] rounded-full transition-colors"
                aria-label={`Open shopping cart with ${itemCount} items`}
              >
                <ShoppingBag className="w-5 h-5" />
                {itemCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#4B2923] text-white text-[10px] font-bold flex items-center justify-center shadow"
                  >
                    {itemCount}
                  </motion.span>
                )}
              </button>

              {/* Order Now CTA */}
              <Link
                to="/shop"
                className="hidden md:inline-flex items-center gap-2 bg-[#4B2923] text-white text-xs uppercase tracking-wider font-semibold px-5 py-2.5 rounded-full hover:bg-[#2F1916] shadow-sm transition-all hover:shadow hover:scale-[1.02]"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#E9AEBB]" />
                Order Now
              </Link>
            </div>
          </div>
        </div>

        {/* Search Bar Dropdown */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden border-t border-[#D7BFAE]/30 bg-white shadow-md"
            >
              <div className="max-w-4xl mx-auto px-4 py-4">
                <form onSubmit={handleSearchSubmit} className="relative flex items-center">
                  <Search className="absolute left-4 w-5 h-5 text-[#8A554D]" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search chocolate truffle, fudgy brownies, bento cakes, eggless options..."
                    className="w-full pl-12 pr-24 py-3 bg-[#FFF7F0] rounded-full border border-[#D7BFAE] text-sm text-[#4B2923] placeholder-[#8A554D]/60 focus:outline-none focus:ring-2 focus:ring-[#E9AEBB]"
                    autoFocus
                  />
                  <button
                    type="submit"
                    className="absolute right-2 px-5 py-1.5 bg-[#4B2923] text-white text-xs font-semibold rounded-full hover:bg-[#2F1916]"
                  >
                    Search
                  </button>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden border-t border-[#D7BFAE]/30 bg-white shadow-xl overflow-hidden"
            >
              <div className="px-6 py-6 space-y-4">
                <nav className="flex flex-col space-y-3">
                  {navLinks.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      className="text-base font-serif font-semibold text-[#4B2923] hover:text-[#8A554D] py-1 border-b border-[#D7BFAE]/20"
                    >
                      {link.label}
                    </Link>
                  ))}
                  <Link
                    to="/track-order"
                    className="text-base font-serif font-semibold text-[#4B2923] hover:text-[#8A554D] py-1 border-b border-[#D7BFAE]/20"
                  >
                    Track Your Order
                  </Link>
                </nav>

                <div className="pt-2 space-y-3">
                  <Link
                    to="/custom-cakes"
                    className="w-full flex items-center justify-center gap-2 bg-[#F7DCE2] text-[#4B2923] py-3 rounded-full font-medium text-sm border border-[#E9AEBB]"
                  >
                    <Cake className="w-4 h-4 text-[#4B2923]" />
                    Design Custom Cake
                  </Link>
                  <Link
                    to="/shop"
                    className="w-full flex items-center justify-center gap-2 bg-[#4B2923] text-white py-3 rounded-full font-medium text-sm shadow hover:bg-[#2F1916]"
                  >
                    <Sparkles className="w-4 h-4 text-[#E9AEBB]" />
                    Browse All Treats
                  </Link>
                </div>

                <div className="pt-3 border-t border-[#D7BFAE]/30 flex items-center justify-between text-xs text-[#8A554D]">
                  <a
                    href="tel:+917841716999"
                    className="inline-flex items-center gap-1.5 text-[#4B2923] font-medium"
                  >
                    <Phone className="w-3.5 h-3.5" /> +91 78417 16999
                  </a>
                  <span className="text-[11px] text-[#8A554D]">Coimbatore Cloud Studio</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};
