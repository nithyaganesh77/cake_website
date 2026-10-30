import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, PhoneCall, MessageCircle } from 'lucide-react';
import { HeroSection } from '@/components/home/HeroSection';
import { CategorySection } from '@/components/home/CategorySection';
import { ProductCard } from '@/components/products/ProductCard';
import { CustomCakeTeaser } from '@/components/home/CustomCakeTeaser';
import { BrandStorySection } from '@/components/home/BrandStorySection';
import { PreOrderStepsSection } from '@/components/home/PreOrderStepsSection';
import { dataProvider } from '@/services/dataProvider';
import { Category, Product } from '@/types';

export const Home: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [cats, prods] = await Promise.all([
          dataProvider.getCategories(),
          dataProvider.getProducts(),
        ]);
        setCategories(cats);
        setFeaturedProducts(prods.filter((p) => p.is_featured || p.is_bestseller).slice(0, 6));
      } catch (err) {
        console.error('Failed to load homepage data', err);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  return (
    <div className="space-y-0">
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Shop by Category */}
      <CategorySection categories={categories} />

      {/* 3. Featured Products */}
      <section className="py-20 bg-[#FFF7F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs uppercase tracking-widest font-semibold text-[#8A554D] block mb-2">
                Chef's Handpicked Favourites
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-extrabold text-[#4B2923] tracking-tight">
                Made Fresh. Loved Always.
              </h2>
            </div>
            
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#4B2923] hover:text-[#8A554D] transition-colors group"
            >
              <span>View Full Dessert Menu</span>
              <ArrowRight className="w-4 h-4 text-[#E9AEBB] group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((n) => (
                <div key={n} className="bg-white rounded-3xl h-96 animate-pulse border border-[#D7BFAE]/30" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 4. Custom Cake Builder Teaser */}
      <CustomCakeTeaser />

      {/* 5. Brand Story & Craftsmanship */}
      <BrandStorySection />

      {/* 6. Pre-Ordering Steps */}
      <PreOrderStepsSection />

      {/* 7. WhatsApp Quick Order Banner */}
      <section className="py-12 bg-[#F7DCE2] border-t border-[#E9AEBB]/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
            <div>
              <h3 className="font-serif font-bold text-2xl text-[#4B2923]">
                Planning a special celebration today?
              </h3>
              <p className="text-sm text-[#8A554D] mt-1">
                Have specific design requirements or dietary questions? Chat directly with our pastry chefs.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <a
                href="https://wa.me/917841716999?text=Hello%20Cakes%20%26%20Dessert!%20I%20would%20like%20to%20enquire%20about%20ordering%20a%20cake."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#4B2923] text-white text-xs uppercase tracking-wider font-semibold px-6 py-3.5 rounded-full shadow hover:bg-[#2F1916] transition-all hover:scale-105"
              >
                <MessageCircle className="w-4 h-4 text-[#E9AEBB]" />
                WhatsApp Us (+91 78417 16999)
              </a>
              <a
                href="tel:+917841716999"
                className="p-3.5 rounded-full bg-white text-[#4B2923] hover:bg-[#FFF7F0] border border-[#D7BFAE]/60 transition-colors shadow-sm"
                aria-label="Call bakery"
              >
                <PhoneCall className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
