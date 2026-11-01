import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Cake, Gift, Heart, Coffee, Check, ArrowRight, RotateCcw } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';

interface QuizOption {
  id: string;
  label: string;
  desc: string;
  icon?: string;
}

const OCCASIONS: QuizOption[] = [
  { id: 'birthday', label: 'Milestone Birthday', desc: 'Showstopper cake for big joyful gatherings' },
  { id: 'nikah', label: 'Nikah & Wedding Milestones', desc: 'Bespoke multi-tier elegance, gold leaf & floral accents' },
  { id: 'anniversary', label: 'Romantic Anniversary', desc: 'Elegant, refined, floral or chocolate notes' },
  { id: 'tea', label: 'Family Gathering & Gifting', desc: 'Sharing brownie slabs, Korean bento cakes & dessert jars' },
  { id: 'corporate', label: 'Festive Hampers & Corporate', desc: 'Curated assorted dessert boxes & bespoke packaging' },
];

const CRAVINGS: QuizOption[] = [
  { id: 'chocolate', label: 'Intense Dark Cocoa', desc: 'Belgian 70%, dark ganache, fudgy center' },
  { id: 'berry', label: 'Delicate Floral & Berries', desc: 'Velvet rose, fresh strawberries, tart raspberry' },
  { id: 'cheese', label: 'Cream Cheese & Coffee', desc: 'Classic tiramisu, New York baked style' },
  { id: 'cute', label: 'Minimalist Bento', desc: '4-inch pastel buttercream with custom lettering' },
];

interface MatchedProduct {
  name: string;
  category: string;
  price: string;
  image: string;
  dietary: string;
  slug: string;
  reason: string;
}

export const CelebrationQuiz: React.FC = () => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [selectedOccasion, setSelectedOccasion] = useState<string>('birthday');
  const [selectedCraving, setSelectedCraving] = useState<string>('chocolate');
  const [isEgglessOnly, setIsEgglessOnly] = useState<boolean>(true);

  // Derive smart recommendation based on selections
  const getRecommendation = (): MatchedProduct => {
    if (selectedCraving === 'chocolate') {
      return {
        name: 'Signature Belgian Dark Truffle Cake',
        category: 'Celebration Cakes',
        price: 'From ₹850',
        image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=800&auto=format&fit=crop',
        dietary: isEgglessOnly ? 'Eggless Option Available' : 'Classic & Eggless',
        slug: '/product/belgian-dark-truffle-cake',
        reason: 'Layered with pure Callebaut 70% dark ganache; the crowd-favorite centerpiece in Coimbatore.',
      };
    }
    if (selectedCraving === 'berry') {
      return {
        name: 'Velvet Rose & Berry Cake',
        category: 'Celebration Cakes',
        price: 'From ₹900',
        image: 'https://images.unsplash.com/photo-1586788680434-30d324b2d46f?q=80&w=800&auto=format&fit=crop',
        dietary: 'Eggless Option Available',
        slug: '/product/velvet-rose-berry-cake',
        reason: 'Delicate crumb lightly scented with organic rosewater, balanced with tart berry compote.',
      };
    }
    if (selectedCraving === 'cheese') {
      return {
        name: 'Artisanal Tiramisu Tub',
        category: 'Dessert Tubs',
        price: 'From ₹450',
        image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?q=80&w=800&auto=format&fit=crop',
        dietary: 'Vegetarian Friendly',
        slug: '/shop?category=desserts',
        reason: 'Espresso-soaked savoiardi layered with whipped Italian mascarpone cream and dusted cocoa.',
      };
    }
    return {
      name: 'Pastel Korean Bento Cake (4")',
      category: 'Bento Cakes',
      price: 'From ₹450',
      image: 'https://images.unsplash.com/photo-1535141192574-5d4897c13136?q=80&w=800&auto=format&fit=crop',
      dietary: 'Eggless Option Available',
      slug: '/product/pastel-korean-bento-cake',
      reason: 'Compact 4-inch adorable cake with customizable hand-piped greeting and butter sponge.',
    };
  };

  const recommendation = getRecommendation();

  return (
    <section className="py-20 bg-[#FFF7F0] border-t border-[#D7BFAE]/30 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Interactive Matchmaker Box */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#D7BFAE]/50 shadow-xl relative overflow-hidden">
          {/* Subtle Corner Ornament */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#F7DCE2] to-transparent rounded-bl-full pointer-events-none" />

          {/* Header */}
          <div className="text-center max-w-xl mx-auto mb-8">
            <span className="font-script text-3xl text-[#8A554D] block mb-1">
              Curated for your Moment
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#4B2923]">
              The Celebration Cake Matchmaker
            </h2>
            <p className="text-xs sm:text-sm text-[#8A554D] mt-2">
              Answer 3 brief questions and discover the perfect handcrafted patisserie center-piece for your upcoming celebration.
            </p>
          </div>

          {/* Stepper Dots */}
          <div className="flex items-center justify-center gap-3 mb-8">
            {[1, 2, 3, 4].map((s) => (
              <button
                key={s}
                onClick={() => setStep(s as any)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  step === s
                    ? 'w-8 bg-[#4B2923]'
                    : step > s
                    ? 'w-2 bg-[#E9AEBB]'
                    : 'w-2 bg-[#D7BFAE]/50'
                }`}
                aria-label={`Step ${s}`}
              />
            ))}
          </div>

          {/* Step 1: Occasion */}
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <h3 className="text-center text-sm font-bold uppercase tracking-widest text-[#8A554D]">
                Step 1: What is the Occasion?
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {OCCASIONS.map((occ) => (
                  <div
                    key={occ.id}
                    onClick={() => {
                      setSelectedOccasion(occ.id);
                      setStep(2);
                    }}
                    className={`cursor-pointer p-5 rounded-2xl border-2 transition-all duration-200 hover:scale-[1.01] ${
                      selectedOccasion === occ.id
                        ? 'border-[#4B2923] bg-[#FFF7F0] shadow-sm'
                        : 'border-[#D7BFAE]/40 hover:border-[#8A554D] bg-white'
                    }`}
                  >
                    <h4 className="font-serif font-bold text-lg text-[#4B2923]">{occ.label}</h4>
                    <p className="text-xs text-[#8A554D] mt-1">{occ.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 2: Craving */}
          {step === 2 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <h3 className="text-center text-sm font-bold uppercase tracking-widest text-[#8A554D]">
                Step 2: What Flavor Craving Dominates?
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {CRAVINGS.map((craving) => (
                  <div
                    key={craving.id}
                    onClick={() => {
                      setSelectedCraving(craving.id);
                      setStep(3);
                    }}
                    className={`cursor-pointer p-5 rounded-2xl border-2 transition-all duration-200 hover:scale-[1.01] ${
                      selectedCraving === craving.id
                        ? 'border-[#4B2923] bg-[#FFF7F0] shadow-sm'
                        : 'border-[#D7BFAE]/40 hover:border-[#8A554D] bg-white'
                    }`}
                  >
                    <h4 className="font-serif font-bold text-lg text-[#4B2923]">{craving.label}</h4>
                    <p className="text-xs text-[#8A554D] mt-1">{craving.desc}</p>
                  </div>
                ))}
              </div>
              <div className="text-center">
                <button
                  onClick={() => setStep(1)}
                  className="text-xs text-[#8A554D] hover:text-[#4B2923] font-medium underline"
                >
                  ← Back to Occasions
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 3: Dietary Preference */}
          {step === 3 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <h3 className="text-center text-sm font-bold uppercase tracking-widest text-[#8A554D]">
                Step 3: Dietary Consideration
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto">
                <div
                  onClick={() => {
                    setIsEgglessOnly(true);
                    setStep(4);
                  }}
                  className={`cursor-pointer p-6 rounded-2xl border-2 text-center transition-all ${
                    isEgglessOnly
                      ? 'border-[#4B2923] bg-[#FFF7F0] shadow-sm'
                      : 'border-[#D7BFAE]/40 hover:border-[#8A554D] bg-white'
                  }`}
                >
                  <span className="inline-block px-3 py-1 bg-green-100 text-green-800 text-[10px] font-bold uppercase rounded-full mb-2">
                    Eggless Option Available
                  </span>
                  <h4 className="font-serif font-bold text-lg text-[#4B2923]">Eggless Option</h4>
                  <p className="text-xs text-[#8A554D] mt-1">Baked with vegetarian pride</p>
                </div>

                <div
                  onClick={() => {
                    setIsEgglessOnly(false);
                    setStep(4);
                  }}
                  className={`cursor-pointer p-6 rounded-2xl border-2 text-center transition-all ${
                    !isEgglessOnly
                      ? 'border-[#4B2923] bg-[#FFF7F0] shadow-sm'
                      : 'border-[#D7BFAE]/40 hover:border-[#8A554D] bg-white'
                  }`}
                >
                  <span className="inline-block px-3 py-1 bg-amber-100 text-amber-800 text-[10px] font-bold uppercase rounded-full mb-2">
                    Standard &amp; Eggless
                  </span>
                  <h4 className="font-serif font-bold text-lg text-[#4B2923]">Any Recipe</h4>
                  <p className="text-xs text-[#8A554D] mt-1">Both traditional and eggless</p>
                </div>
              </div>
              <div className="text-center">
                <button
                  onClick={() => setStep(2)}
                  className="text-xs text-[#8A554D] hover:text-[#4B2923] font-medium underline"
                >
                  ← Back to Flavors
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 4: Matched Result */}
          {step === 4 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-6"
            >
              <div className="text-center">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E9AEBB]/30 text-[#4B2923] text-xs font-bold uppercase tracking-wider mb-2">
                  <Sparkles className="w-3.5 h-3.5 text-[#8A554D]" />
                  98% Compatibility Match Found
                </span>
                <h3 className="font-serif font-bold text-2xl text-[#4B2923]">
                  Your Tailored Patisserie Match
                </h3>
              </div>

              {/* Product Match Card */}
              <div className="bg-[#FFF7F0] rounded-2xl p-6 border border-[#D7BFAE]/60 flex flex-col sm:flex-row items-center gap-6">
                <img
                  src={recommendation.image}
                  alt={recommendation.name}
                  className="w-40 h-40 sm:w-48 sm:h-48 object-cover rounded-2xl shadow-md shrink-0"
                />
                <div className="flex-1 text-center sm:text-left space-y-2">
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-[#8A554D] bg-white px-2.5 py-1 rounded-md border border-[#D7BFAE]/40">
                      {recommendation.category}
                    </span>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-green-700 bg-green-50 px-2.5 py-1 rounded-md border border-green-200">
                      {recommendation.dietary}
                    </span>
                  </div>

                  <h4 className="font-serif font-bold text-xl sm:text-2xl text-[#4B2923]">
                    {recommendation.name}
                  </h4>
                  <p className="text-xs sm:text-sm text-[#8A554D] leading-relaxed">
                    {recommendation.reason}
                  </p>
                  <p className="font-serif font-bold text-lg text-[#4B2923]">
                    {recommendation.price}
                  </p>

                  <div className="pt-2 flex flex-wrap items-center justify-center sm:justify-start gap-3">
                    <Link
                      to={recommendation.slug}
                      className="shimmer-btn inline-flex items-center gap-2 bg-[#4B2923] text-white px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-[#2F1916] transition-all shadow-md"
                    >
                      <span>Customize &amp; Pre-Order</span>
                      <ArrowRight className="w-4 h-4 text-[#E9AEBB]" />
                    </Link>

                    <button
                      onClick={() => setStep(1)}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#8A554D] hover:text-[#4B2923] px-4 py-3 rounded-xl border border-[#D7BFAE]/60 bg-white"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Retake Quiz</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

        </div>
      </div>
    </section>
  );
};

