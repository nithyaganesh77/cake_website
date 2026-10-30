import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Category } from '@/types';

interface CategorySectionProps {
  categories: Category[];
}

export const CategorySection: React.FC<CategorySectionProps> = ({ categories }) => {
  return (
    <section className="py-16 sm:py-24 bg-white border-y border-[#D7BFAE]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs uppercase tracking-widest font-semibold text-[#8A554D] block mb-2">
            Artisanal Collections
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-extrabold text-[#4B2923] tracking-tight">
            Find Your Perfect Sweet Treat
          </h2>
          <div className="w-16 h-0.5 bg-[#E9AEBB] mx-auto mt-4 mb-4" />
          <p className="text-sm sm:text-base text-[#8A554D] leading-relaxed">
            From deeply fudgy brownies baked with 70% dark Belgian chocolate to customized milestone cakes and Korean bento boxes.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {categories.map((cat, idx) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <Link
                to={`/shop?category=${cat.id}`}
                className="group relative block rounded-3xl overflow-hidden bg-[#FFF7F0] border border-[#D7BFAE]/40 shadow-sm hover:shadow-xl transition-all duration-500"
              >
                {/* Image Container with Hover Zoom */}
                <div className="aspect-4/3 overflow-hidden relative">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2F1916]/80 via-[#2F1916]/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                  
                  {/* Floating Action Pill */}
                  <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 text-[#4B2923] flex items-center justify-center transform group-hover:rotate-45 group-hover:bg-[#E9AEBB] transition-all duration-300 shadow-md">
                    <ArrowUpRight className="w-5 h-5" />
                  </div>
                </div>

                {/* Content Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="font-serif font-bold text-xl sm:text-2xl text-white group-hover:text-[#F7DCE2] transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-[#FFF7F0]/85 mt-1.5 line-clamp-2 leading-relaxed">
                    {cat.description}
                  </p>
                  <span className="inline-block mt-3 text-xs font-semibold uppercase tracking-wider text-[#E9AEBB] group-hover:underline">
                    Explore Collection →
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

