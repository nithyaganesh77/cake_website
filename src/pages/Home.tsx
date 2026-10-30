import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, PhoneCall, MessageCircle, Heart, Cake } from 'lucide-react';
import { HeroSection } from '@/components/home/HeroSection';
import { CategorySection } from '@/components/home/CategorySection';
import { ProductCard } from '@/components/products/ProductCard';
import { FlavourExplorerSection } from '@/components/home/FlavourExplorerSection';
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
      {/* 1. Hero Section with Interactive Live Cake Switcher */}
      <HeroSection />

      {/* 2. Shop by Category with Zoom Overlays */}
      <CategorySection categories={categories} />

      {/* 3. Featured Products with Live Portion Selector */}
      <section className="py-20 bg-[#FFF7F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="font-script text-3xl text-[#8A554D] block mb-1">
                Fresh from the Oven
              </span>
              <h2 className="text-3xl sm:text-5xl font-serif font-extrabold text-[#4B2923] tracking-tight">
                Made Fresh. Loved Always.
              </h2>
            </div>
            
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-[#4B2923] hover:text-[#8A554D] transition-colors group bg-white px-5 py-3 rounded-full border border-[#D7BFAE]/60 shadow-xs"
            >
              <span>Explore Complete Menu</span>
              <ArrowRight className="w-4 h-4 text-[#E9AEBB] group-hover:translate-x-1.5 transition-transform" />
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

      {/* 4. Interactive Flavour Notes Explorer */}
      <FlavourExplorerSection />

      {/* 5. Custom Cake Builder Teaser */}
      <CustomCakeTeaser />

      {/* 6. Brand Story & Craftsmanship */}
      <BrandStorySection />

      {/* 7. Pre-Ordering Steps */}
      <PreOrderStepsSection />

      {/* 8. WhatsApp Quick Order Banner */}
      <section className="py-14 bg-gradient-to-r from-[#F7DCE2] via-[#FFF7F0] to-[#F7DCE2] border-t border-[#E9AEBB]/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
            <div>
              <span className="font-script text-2xl text-[#8A554D] block mb-1">
                Direct Baker Consultation
              </span>
              <h3 className="font-serif font-bold text-2xl sm:text-3xl text-[#4B2923]">
                Planning a Milestone Celebration Today?
              </h3>
              <p className="text-xs sm:text-sm text-[#8A554D] mt-1 max-w-xl">
                Have specific design requirements, urgent delivery questions, or dietary requests? Chat directly with our pastry chefs in Coimbatore.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <a
                href="https://wa.me/917841716999?text=Hello%20Cakes%20%26%20Dessert!%20I%20would%20like%20to%20enquire%20about%20ordering%20a%20cake."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 bg-[#4B2923] text-white text-xs uppercase tracking-wider font-bold px-6 py-4 rounded-full shadow-lg hover:bg-[#2F1916] transition-all hover:scale-105"
              >
                <MessageCircle className="w-4 h-4 text-[#E9AEBB]" />
                WhatsApp Baker (+91 78417 16999)
              </a>
              <a
                href="tel:+917841716999"
                className="p-4 rounded-full bg-white text-[#4B2923] hover:bg-[#FFF7F0] border border-[#D7BFAE]/60 transition-colors shadow-sm"
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
