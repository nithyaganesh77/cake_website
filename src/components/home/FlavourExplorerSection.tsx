import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, UtensilsCrossed, Heart, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const FLAVOUR_NOTES = [
  {
    id: 'callebaut',
    name: '70% Dark Callebaut',
    subtitle: 'Belgian Single-Origin Dark Cocoa',
    accentColor: '#4B2923',
    badge: 'Signature Foundation',
    description: 'We import genuine Callebaut Belgian dark chocolate pellets. When gently melted with cultured dairy butter, it creates an intense, glossy ganache with profound cocoa notes and zero artificial bitterness.',
    ingredients: ['70% Belgian Dark Cocoa', 'Cultured Dairy Butter', 'Dutch Process Cocoa Powder', 'Organic Raw Sugar'],
    pairsWith: ['Roasted California Walnuts', 'Homemade Salted Caramel', 'Fresh Strawberry Compote'],
    featuredProduct: {
      name: 'Royal Belgian Dark Truffle Cake',
      price: '₹850',
      link: '/product/royal-belgian-dark-truffle-cake',
      image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80',
    },
  },
  {
    id: 'cream-cheese',
    name: 'Philadelphia Style Cream Cheese',
    subtitle: 'Silky Tang & Sweet Harmony',
    accentColor: '#8A554D',
    badge: 'Velvet Perfection',
    description: 'Slowly whipped at cool temperatures with pure Madagascar vanilla extract, our cream cheese frosting delivers a luscious, velvety tang that contrasts delightfully against our rich crimson sponge.',
    ingredients: ['Slow-churned Cream Cheese', 'Pure Buttermilk', 'Madagascar Vanilla Bean', 'Double Cream'],
    pairsWith: ['Velvet Crimson Sponge', 'Edible Damask Rosebuds', 'Blush Chocolate Curls'],
    featuredProduct: {
      name: 'Velvet Rose & Cream Cheese Cake',
      price: '₹900',
      link: '/product/velvet-rose-cream-cheese-cake',
      image: 'https://images.unsplash.com/photo-1616541823729-00fe0aacd32c?auto=format&fit=crop&w=600&q=80',
    },
  },
  {
    id: 'biscoff',
    name: 'Lotus Biscoff Spiced Crunch',
    subtitle: 'Speculoos Cookie & Brown Butter',
    accentColor: '#8A554D',
    badge: 'Crowd Favourite',
    description: 'Authentic European speculoos biscuits crushed and folded into rich caramelized cream, layered between cinnamon-spiced chiffon cake and topped with a luscious biscoff drip.',
    ingredients: ['Lotus Biscoff Spread', 'Cinnamon Speculoos Cookies', 'Caramelized Brown Sugar', 'Sweet Cream Butter'],
    pairsWith: ['Whipped Caramel Cream', 'Dark Chocolate Drizzle', 'Vanilla Bean Sponge'],
    featuredProduct: {
      name: 'Lotus Biscoff Crunchy Torte',
      price: '₹950',
      link: '/product/lotus-biscoff-crunchy-torte',
      image: 'https://images.unsplash.com/photo-1562440499-64c9a111f713?auto=format&fit=crop&w=600&q=80',
    },
  },
  {
    id: 'pistachio',
    name: 'Kannauj Rose & Persian Pistachio',
    subtitle: 'Fragrant Heritage Florals & Nuts',
    accentColor: '#4B2923',
    badge: 'Artisanal Heritage',
    description: 'Fine Iranian pistachios stone-ground into cake batter, infused with Kannauj traditional hydro-distilled rose water and topped with sun-dried Damask petals and cardamom whipped cream.',
    ingredients: ['Raw Iranian Pistachios', 'Hydro-distilled Rose Water', 'Green Cardamom Infusion', 'Heavy Cream'],
    pairsWith: ['Saffron Cream', 'White Chocolate Ganache', 'Edible Gold Leaf'],
    featuredProduct: {
      name: 'Royal Persian Pistachio & Rose Cake',
      price: '₹1,100',
      link: '/product/royal-persian-pistachio-rose-cake',
      image: 'https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&w=600&q=80',
    },
  },
];

export const FlavourExplorerSection: React.FC = () => {
  const [selectedId, setSelectedId] = useState(FLAVOUR_NOTES[0].id);
  const activeFlavour = FLAVOUR_NOTES.find((f) => f.id === selectedId) || FLAVOUR_NOTES[0];

  return (
    <section className="py-20 bg-gradient-to-b from-white via-[#FFF7F0] to-white border-y border-[#D7BFAE]/30 relative overflow-hidden">
      
      {/* Decorative background flourishes */}
      <div className="absolute top-1/3 -right-24 w-80 h-80 rounded-full bg-[#E9AEBB]/20 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="font-script text-3xl text-[#8A554D] block mb-1">
            Sensorial Patisserie Craft
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-extrabold text-[#4B2923] tracking-tight">
            Interactive Flavour Notes
          </h2>
          <div className="w-16 h-0.5 bg-[#E9AEBB] mx-auto mt-4 mb-4" />
          <p className="text-xs sm:text-sm text-[#8A554D] leading-relaxed">
            Click each flavour to explore its origins, pairing notes, and taste composition.
          </p>
        </div>

        {/* Flavour Selector Pills */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {FLAVOUR_NOTES.map((flavour) => {
            const isSelected = flavour.id === selectedId;
            return (
              <button
                key={flavour.id}
                onClick={() => setSelectedId(flavour.id)}
                className={`relative px-5 py-3 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                  isSelected
                    ? 'bg-[#4B2923] text-white shadow-md scale-105'
                    : 'bg-white text-[#4B2923] border border-[#D7BFAE]/60 hover:border-[#8A554D] hover:bg-[#F7DCE2]'
                }`}
              >
                {flavour.name}
                {isSelected && (
                  <motion.div
                    layoutId="flavourPillActive"
                    className="absolute inset-0 rounded-full border-2 border-[#E9AEBB]"
                    transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Animated Flavour Detail Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFlavour.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            className="bg-white rounded-[36px] p-6 sm:p-10 lg:p-12 border border-[#D7BFAE]/50 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
          >
            {/* Left Description Column */}
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 bg-[#F7DCE2] px-3.5 py-1.5 rounded-full text-[#4B2923] text-[11px] font-bold uppercase tracking-wider border border-[#E9AEBB]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{activeFlavour.badge}</span>
              </div>

              <h3 className="font-serif font-bold text-2xl sm:text-3xl text-[#4B2923] leading-tight">
                {activeFlavour.name}
              </h3>

              <p className="font-medium text-xs text-[#8A554D] uppercase tracking-wider">
                {activeFlavour.subtitle}
              </p>

              <p className="text-xs sm:text-sm text-[#8A554D] leading-relaxed">
                {activeFlavour.description}
              </p>

              {/* Ingredient Badges */}
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#4B2923] block mb-2">
                  Key Natural Elements:
                </span>
                <div className="flex flex-wrap gap-2">
                  {activeFlavour.ingredients.map((ing, i) => (
                    <span
                      key={i}
                      className="bg-[#FFF7F0] border border-[#D7BFAE]/50 px-3 py-1 rounded-full text-[11px] font-medium text-[#4B2923]"
                    >
                      ✓ {ing}
                    </span>
                  ))}
                </div>
              </div>

              {/* Recommended Pairings */}
              <div className="pt-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#4B2923] block mb-1.5">
                  Artisanal Pairings:
                </span>
                <p className="text-xs text-[#8A554D]">
                  {activeFlavour.pairsWith.join(' • ')}
                </p>
              </div>
            </div>

            {/* Right Product Highlight Column */}
            <div className="lg:col-span-5 bg-[#FFF7F0] rounded-3xl p-5 border border-[#D7BFAE]/40 flex flex-col items-center text-center">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#8A554D] mb-2">
                Experience this in our menu:
              </span>

              <img
                src={activeFlavour.featuredProduct.image}
                alt={activeFlavour.featuredProduct.name}
                className="w-48 h-48 object-cover rounded-2xl shadow-md border-2 border-white mb-3 hover:scale-105 transition-transform"
              />

              <h4 className="font-serif font-bold text-base text-[#4B2923]">
                {activeFlavour.featuredProduct.name}
              </h4>

              <span className="font-bold text-sm text-[#4B2923] mt-1 mb-3">
                Starting from {activeFlavour.featuredProduct.price}
              </span>

              <Link
                to={activeFlavour.featuredProduct.link}
                className="inline-flex items-center gap-1.5 bg-[#4B2923] text-white text-xs font-semibold px-5 py-2.5 rounded-full hover:bg-[#2F1916] transition-colors shadow"
              >
                <span>View Dessert Details</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#E9AEBB]" />
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
};

