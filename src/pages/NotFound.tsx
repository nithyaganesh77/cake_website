import React from 'react';
import { Link } from 'react-router-dom';
import { Cake, Home, ShoppingBag, ArrowLeft } from 'lucide-react';

export const NotFound: React.FC = () => {
  return (
    <div className="bg-[#FFF7F0] min-h-[75vh] flex items-center justify-center px-4 py-20">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 sm:p-12 border border-[#D7BFAE]/50 shadow-xl text-center">
        <div className="w-20 h-20 bg-[#F7DCE2] rounded-full flex items-center justify-center text-[#4B2923] mx-auto mb-6">
          <Cake className="w-10 h-10 stroke-[1.5]" />
        </div>

        <span className="text-xs uppercase tracking-widest font-semibold text-[#8A554D] block mb-1">
          404 — Sweet Page Not Found
        </span>

        <h1 className="text-3xl font-serif font-extrabold text-[#4B2923] mb-3">
          This Treat Melted Away
        </h1>

        <p className="text-xs sm:text-sm text-[#8A554D] leading-relaxed mb-8">
          The page you are looking for may have been moved, renamed, or is currently being freshly baked in our kitchen.
        </p>

        <div className="space-y-3">
          <Link
            to="/"
            className="w-full inline-flex items-center justify-center gap-2 bg-[#4B2923] text-white py-3.5 px-6 rounded-full font-semibold text-xs uppercase tracking-wider hover:bg-[#2F1916] transition-colors shadow"
          >
            <Home className="w-4 h-4 text-[#E9AEBB]" />
            Return to Homepage
          </Link>

          <Link
            to="/shop"
            className="w-full inline-flex items-center justify-center gap-2 border border-[#4B2923] text-[#4B2923] py-3 px-6 rounded-full font-semibold text-xs uppercase tracking-wider hover:bg-[#F7DCE2] transition-colors"
          >
            <ShoppingBag className="w-4 h-4" />
            Explore Dessert Menu
          </Link>
        </div>
      </div>
    </div>
  );
};

