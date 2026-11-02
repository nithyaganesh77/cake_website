import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, Wand2, RefreshCw, CheckCircle2, Heart, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface LayerOption {
  id: string;
  name: string;
  color: string;
  note: string;
  flavorImpact: { cocoa: number; sweetness: number; cream: number; crunch: number };
}

const SPONGES: LayerOption[] = [
  {
    id: 'truffle',
    name: 'Belgian 70% Dark Truffle Sponge',
    color: '#341B17',
    note: 'Deep roasted cocoa with delicate crumb',
    flavorImpact: { cocoa: 95, sweetness: 45, cream: 60, crunch: 20 },
  },
  {
    id: 'vanilla',
    name: 'Madagascar Bourbon Vanilla Bean',
    color: '#F4E8D7',
    note: 'Infused with whole hand-split vanilla pods',
    flavorImpact: { cocoa: 0, sweetness: 75, cream: 80, crunch: 15 },
  },
  {
    id: 'redvelvet',
    name: 'Classic Southern Red Velvet',
    color: '#7D2224',
    note: 'Velvety cocoa sponge with buttermilk tang',
    flavorImpact: { cocoa: 45, sweetness: 65, cream: 70, crunch: 10 },
  },
  {
    id: 'hazelnut',
    name: 'Roasted Hazelnut & Praline',
    color: '#9C6F44',
    note: 'Toasted Piedmont hazelnuts with nutty aroma',
    flavorImpact: { cocoa: 30, sweetness: 60, cream: 75, crunch: 85 },
  },
];

const FILLINGS: LayerOption[] = [
  {
    id: 'ganache',
    name: 'Callebaut Dark Chocolate Ganache',
    color: '#2B1410',
    note: 'Silky 54.5% dark chocolate emulsion',
    flavorImpact: { cocoa: 90, sweetness: 50, cream: 85, crunch: 10 },
  },
  {
    id: 'mascarpone',
    name: 'Whipped Italian Mascarpone Cream',
    color: '#FFF9F0',
    note: 'Light, cloud-like delicate cream cheese',
    flavorImpact: { cocoa: 0, sweetness: 55, cream: 98, crunch: 5 },
  },
  {
    id: 'raspberry',
    name: 'Wild Raspberry & Hibiscus Coulis',
    color: '#991B33',
    note: 'Vibrant tart berry reduction',
    flavorImpact: { cocoa: 0, sweetness: 70, cream: 40, crunch: 15 },
  },
  {
    id: 'caramel',
    name: 'Sea Salt & Amber Butterscotch Crunch',
    color: '#C6823E',
    note: 'Slow-caramelized French butter with Maldon salt',
    flavorImpact: { cocoa: 10, sweetness: 85, cream: 70, crunch: 70 },
  },
];

const FROSTINGS: LayerOption[] = [
  {
    id: 'mirror',
    name: 'Glossy Dark Mirror Glaze',
    color: '#1E0E0B',
    note: 'Reflective, razor-clean patisserie finish',
    flavorImpact: { cocoa: 85, sweetness: 60, cream: 50, crunch: 5 },
  },
  {
    id: 'rosebuttercream',
    name: 'Blush Rose Swiss Meringue',
    color: '#E9AEBB',
    note: 'Ultra-light, lightly perfumed with organic rose',
    flavorImpact: { cocoa: 0, sweetness: 65, cream: 90, crunch: 5 },
  },
  {
    id: 'nakedvanilla',
    name: 'Rustic Chantilly Semi-Naked Coat',
    color: '#FBF5EE',
    note: 'Minimalist crumb coat letting layers peek through',
    flavorImpact: { cocoa: 0, sweetness: 45, cream: 75, crunch: 0 },
  },
];

const GARNISHES: LayerOption[] = [
  {
    id: 'gold',
    name: '24k Edible Gold Leaf & Cocoa Shards',
    color: '#D4AF37',
    note: 'Celebratory regal finish with dark cocoa crisps',
    flavorImpact: { cocoa: 10, sweetness: 0, cream: 0, crunch: 60 },
  },
  {
    id: 'pistachio',
    name: 'Crushed Sicilian Pistachios & Rose Petals',
    color: '#839958',
    note: 'Vibrant green nut crumble with botanical aroma',
    flavorImpact: { cocoa: 0, sweetness: 10, cream: 0, crunch: 95 },
  },
  {
    id: 'berries',
    name: 'Fresh Dark Cherries & Freeze-Dried Berries',
    color: '#701026',
    note: 'Fresh juicy burst balancing rich ganache',
    flavorImpact: { cocoa: 0, sweetness: 40, cream: 0, crunch: 40 },
  },
];

export const TasteStudio: React.FC = () => {
  const navigate = useNavigate();
  const [selectedSponge, setSelectedSponge] = useState<LayerOption>(SPONGES[0]);
  const [selectedFilling, setSelectedFilling] = useState<LayerOption>(FILLINGS[0]);
  const [selectedFrosting, setSelectedFrosting] = useState<LayerOption>(FROSTINGS[0]);
  const [selectedGarnish, setSelectedGarnish] = useState<LayerOption>(GARNISHES[0]);
  const [activeTab, setActiveTab] = useState<'sponge' | 'filling' | 'frosting' | 'garnish'>('sponge');

  // Calculate composite flavor metrics
  const avgMetric = (key: 'cocoa' | 'sweetness' | 'cream' | 'crunch') => {
    return Math.round(
      (selectedSponge.flavorImpact[key] * 0.35) +
      (selectedFilling.flavorImpact[key] * 0.35) +
      (selectedFrosting.flavorImpact[key] * 0.20) +
      (selectedGarnish.flavorImpact[key] * 0.10)
    );
  };

  const cocoaScore = avgMetric('cocoa');
  const sweetnessScore = avgMetric('sweetness');
  const creamScore = avgMetric('cream');
  const crunchScore = avgMetric('crunch');

  const handleOrderCustomCombination = () => {
    const details = `Bespoke Taste Studio Creation:\n- Sponge: ${selectedSponge.name}\n- Core: ${selectedFilling.name}\n- Frosting: ${selectedFrosting.name}\n- Garnish: ${selectedGarnish.name}`;
    sessionStorage.setItem('customCake_prefill', details);
    navigate('/custom-cakes');
  };

  const resetToChefSignature = () => {
    setSelectedSponge(SPONGES[0]);
    setSelectedFilling(FILLINGS[0]);
    setSelectedFrosting(FROSTINGS[1]);
    setSelectedGarnish(GARNISHES[0]);
    setActiveTab('sponge');
  };

  return (
    <section className="py-24 bg-gradient-to-b from-[#FFF7F0] via-white to-[#FFF7F0] relative overflow-hidden border-t border-[#D7BFAE]/30">
      {/* Decorative ambient background glows */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-[#E9AEBB]/15 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full bg-[#D7BFAE]/20 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F7DCE2] border border-[#E9AEBB]/60 text-[#4B2923] text-xs font-bold uppercase tracking-widest mb-3">
            <Wand2 className="w-3.5 h-3.5 text-[#8A554D]" />
            Interactive Patisserie Laboratory
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-extrabold text-[#4B2923] tracking-tight">
            The Bespoke Taste Studio
          </h2>
          <p className="text-sm sm:text-base text-[#8A554D] mt-3 font-normal max-w-2xl mx-auto">
            Design your ideal celebratory slice layer-by-layer. Watch the harmonic flavor profile calculate in real-time as you compose your dream cake.
          </p>
        </motion.div>

        {/* Interactive Studio Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Visual Slice Cross-Section & Flavor Metrics (5 cols) */}
          <div className="lg:col-span-5 bg-[#2F1916] rounded-3xl p-6 sm:p-8 text-white shadow-2xl border border-[#8A554D]/40 relative overflow-hidden">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#E9AEBB] block">
                  Slice Cross-Section Simulation
                </span>
                <h3 className="font-serif text-lg font-bold text-[#FFF7F0]">
                  Architectural Preview
                </h3>
              </div>
              <button
                onClick={resetToChefSignature}
                className="flex items-center gap-1.5 text-xs text-[#D7BFAE] hover:text-[#FFF7F0] transition-colors bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-full border border-white/10"
                title="Reset to Chef's Signature"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            </div>

            {/* Visual Animated Cake Slice */}
            <div className="py-6 flex flex-col items-center justify-center relative">
              <div className="w-64 sm:w-72 relative space-y-1.5">
                {/* Garnish Topping Layer */}
                <motion.div
                  key={`garnish-${selectedGarnish.id}`}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="h-8 rounded-t-2xl flex items-center justify-center text-xs font-bold tracking-wider px-3 shadow-sm border border-white/20"
                  style={{ backgroundColor: selectedGarnish.color, color: '#FFFFFF' }}
                >
                  <span className="truncate drop-shadow-sm text-[11px]">
                    ✨ {selectedGarnish.name}
                  </span>
                </motion.div>

                {/* Frosting Coat Layer */}
                <motion.div
                  key={`frosting-${selectedFrosting.id}`}
                  initial={{ opacity: 0, scaleY: 0.8 }}
                  animate={{ opacity: 1, scaleY: 1 }}
                  transition={{ duration: 0.35 }}
                  className="h-10 flex items-center justify-between text-xs px-4 shadow-sm border-x border-white/20 font-medium"
                  style={{
                    backgroundColor: selectedFrosting.color,
                    color: selectedFrosting.id === 'rosebuttercream' || selectedFrosting.id === 'nakedvanilla' ? '#4B2923' : '#FFF7F0',
                  }}
                >
                  <span className="text-[10px] uppercase tracking-wider opacity-80">Glaze</span>
                  <span className="text-[11px] font-bold truncate">{selectedFrosting.name}</span>
                </motion.div>

                {/* Core Filling Layer */}
                <motion.div
                  key={`filling-${selectedFilling.id}`}
                  initial={{ opacity: 0, scaleY: 0.7 }}
                  animate={{ opacity: 1, scaleY: 1 }}
                  transition={{ duration: 0.3 }}
                  className="h-9 flex items-center justify-between text-xs px-4 shadow-sm border-x border-white/20 font-medium"
                  style={{
                    backgroundColor: selectedFilling.color,
                    color: selectedFilling.id === 'mascarpone' ? '#4B2923' : '#FFF7F0',
                  }}
                >
                  <span className="text-[10px] uppercase tracking-wider opacity-80">Filling</span>
                  <span className="text-[11px] font-bold truncate">{selectedFilling.name}</span>
                </motion.div>

                {/* Base Sponge Layer */}
                <motion.div
                  key={`sponge-${selectedSponge.id}`}
                  initial={{ opacity: 0, scaleY: 0.85 }}
                  animate={{ opacity: 1, scaleY: 1 }}
                  transition={{ duration: 0.35 }}
                  className="h-14 rounded-b-2xl flex items-center justify-between text-xs px-4 shadow-inner border border-white/20 font-medium"
                  style={{
                    backgroundColor: selectedSponge.color,
                    color: selectedSponge.id === 'vanilla' ? '#4B2923' : '#FFF7F0',
                  }}
                >
                  <span className="text-[10px] uppercase tracking-wider opacity-80">Sponge</span>
                  <span className="text-[11px] font-bold truncate">{selectedSponge.name}</span>
                </motion.div>
              </div>
            </div>

            {/* Real-time Flavor Harmony Metrics */}
            <div className="mt-6 pt-5 border-t border-white/10 space-y-3">
              <span className="text-[10px] uppercase tracking-widest text-[#E9AEBB] font-bold block">
                Harmonic Flavor Profile
              </span>

              <div className="grid grid-cols-2 gap-3 text-xs">
                {/* Cocoa Intensity */}
                <div className="bg-white/5 rounded-xl p-2.5 border border-white/10">
                  <div className="flex justify-between mb-1">
                    <span className="text-[#D7BFAE]">Cocoa Depth</span>
                    <span className="font-bold text-[#E9AEBB]">{cocoaScore}%</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
                    <motion.div
                      className="bg-[#E9AEBB] h-full rounded-full"
                      animate={{ width: `${cocoaScore}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>

                {/* Sweetness */}
                <div className="bg-white/5 rounded-xl p-2.5 border border-white/10">
                  <div className="flex justify-between mb-1">
                    <span className="text-[#D7BFAE]">Sweetness</span>
                    <span className="font-bold text-[#F7DCE2]">{sweetnessScore}%</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
                    <motion.div
                      className="bg-[#F7DCE2] h-full rounded-full"
                      animate={{ width: `${sweetnessScore}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>

                {/* Creaminess */}
                <div className="bg-white/5 rounded-xl p-2.5 border border-white/10">
                  <div className="flex justify-between mb-1">
                    <span className="text-[#D7BFAE]">Silkiness</span>
                    <span className="font-bold text-[#FFF7F0]">{creamScore}%</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
                    <motion.div
                      className="bg-[#FFF7F0] h-full rounded-full"
                      animate={{ width: `${creamScore}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>

                {/* Crunch Factor */}
                <div className="bg-white/5 rounded-xl p-2.5 border border-white/10">
                  <div className="flex justify-between mb-1">
                    <span className="text-[#D7BFAE]">Texture / Crunch</span>
                    <span className="font-bold text-[#D7BFAE]">{crunchScore}%</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
                    <motion.div
                      className="bg-[#D7BFAE] h-full rounded-full"
                      animate={{ width: `${crunchScore}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Order Button */}
            <button
              onClick={handleOrderCustomCombination}
              className="mt-6 w-full shimmer-btn py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#E9AEBB] to-[#F7DCE2] text-[#2F1916] font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:opacity-95 transition-all shadow-lg active:scale-98"
            >
              <span>Bring This Creation to Life</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Right Column: Layer Selection Controls (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Step Tabs */}
            <div className="flex rounded-2xl bg-[#FFF7F0] p-1.5 border border-[#D7BFAE]/50 shadow-xs overflow-x-auto">
              {[
                { id: 'sponge', label: '1. Sponge Base' },
                { id: 'filling', label: '2. Core Filling' },
                { id: 'frosting', label: '3. Glaze / Frosting' },
                { id: 'garnish', label: '4. Signature Garnish' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex-1 py-3 px-3 text-xs font-bold rounded-xl whitespace-nowrap transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-[#4B2923] text-white shadow-md'
                      : 'text-[#4B2923] hover:bg-[#F7DCE2]/60'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Contents */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#D7BFAE]/40 shadow-sm min-h-[360px] flex flex-col justify-between">
              <div>
                <div className="mb-5">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#8A554D] block">
                    Step Selection
                  </span>
                  <h4 className="font-serif text-2xl font-bold text-[#4B2923]">
                    {activeTab === 'sponge' && 'Choose Your Foundation Sponge'}
                    {activeTab === 'filling' && 'Choose Your Decadent Core Filling'}
                    {activeTab === 'frosting' && 'Choose Your Exterior Patisserie Glaze'}
                    {activeTab === 'garnish' && 'Choose Your Crown Artisan Garnish'}
                  </h4>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {activeTab === 'sponge' &&
                    SPONGES.map((option) => {
                      const isSelected = selectedSponge.id === option.id;
                      return (
                        <div
                          key={option.id}
                          onClick={() => setSelectedSponge(option)}
                          className={`cursor-pointer p-4 rounded-2xl border-2 transition-all duration-200 relative ${
                            isSelected
                              ? 'border-[#4B2923] bg-[#FFF7F0] shadow-md scale-[1.02]'
                              : 'border-[#D7BFAE]/40 hover:border-[#8A554D] bg-white'
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <span
                              className="w-5 h-5 rounded-full mt-0.5 shrink-0 border border-black/10 shadow-inner"
                              style={{ backgroundColor: option.color }}
                            />
                            <div>
                              <h5 className="font-bold text-sm text-[#4B2923]">{option.name}</h5>
                              <p className="text-xs text-[#8A554D] mt-1">{option.note}</p>
                            </div>
                          </div>
                          {isSelected && (
                            <CheckCircle2 className="w-4 h-4 text-[#4B2923] absolute top-3 right-3" />
                          )}
                        </div>
                      );
                    })}

                  {activeTab === 'filling' &&
                    FILLINGS.map((option) => {
                      const isSelected = selectedFilling.id === option.id;
                      return (
                        <div
                          key={option.id}
                          onClick={() => setSelectedFilling(option)}
                          className={`cursor-pointer p-4 rounded-2xl border-2 transition-all duration-200 relative ${
                            isSelected
                              ? 'border-[#4B2923] bg-[#FFF7F0] shadow-md scale-[1.02]'
                              : 'border-[#D7BFAE]/40 hover:border-[#8A554D] bg-white'
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <span
                              className="w-5 h-5 rounded-full mt-0.5 shrink-0 border border-black/10 shadow-inner"
                              style={{ backgroundColor: option.color }}
                            />
                            <div>
                              <h5 className="font-bold text-sm text-[#4B2923]">{option.name}</h5>
                              <p className="text-xs text-[#8A554D] mt-1">{option.note}</p>
                            </div>
                          </div>
                          {isSelected && (
                            <CheckCircle2 className="w-4 h-4 text-[#4B2923] absolute top-3 right-3" />
                          )}
                        </div>
                      );
                    })}

                  {activeTab === 'frosting' &&
                    FROSTINGS.map((option) => {
                      const isSelected = selectedFrosting.id === option.id;
                      return (
                        <div
                          key={option.id}
                          onClick={() => setSelectedFrosting(option)}
                          className={`cursor-pointer p-4 rounded-2xl border-2 transition-all duration-200 relative ${
                            isSelected
                              ? 'border-[#4B2923] bg-[#FFF7F0] shadow-md scale-[1.02]'
                              : 'border-[#D7BFAE]/40 hover:border-[#8A554D] bg-white'
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <span
                              className="w-5 h-5 rounded-full mt-0.5 shrink-0 border border-black/10 shadow-inner"
                              style={{ backgroundColor: option.color }}
                            />
                            <div>
                              <h5 className="font-bold text-sm text-[#4B2923]">{option.name}</h5>
                              <p className="text-xs text-[#8A554D] mt-1">{option.note}</p>
                            </div>
                          </div>
                          {isSelected && (
                            <CheckCircle2 className="w-4 h-4 text-[#4B2923] absolute top-3 right-3" />
                          )}
                        </div>
                      );
                    })}

                  {activeTab === 'garnish' &&
                    GARNISHES.map((option) => {
                      const isSelected = selectedGarnish.id === option.id;
                      return (
                        <div
                          key={option.id}
                          onClick={() => setSelectedGarnish(option)}
                          className={`cursor-pointer p-4 rounded-2xl border-2 transition-all duration-200 relative ${
                            isSelected
                              ? 'border-[#4B2923] bg-[#FFF7F0] shadow-md scale-[1.02]'
                              : 'border-[#D7BFAE]/40 hover:border-[#8A554D] bg-white'
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <span
                              className="w-5 h-5 rounded-full mt-0.5 shrink-0 border border-black/10 shadow-inner"
                              style={{ backgroundColor: option.color }}
                            />
                            <div>
                              <h5 className="font-bold text-sm text-[#4B2923]">{option.name}</h5>
                              <p className="text-xs text-[#8A554D] mt-1">{option.note}</p>
                            </div>
                          </div>
                          {isSelected && (
                            <CheckCircle2 className="w-4 h-4 text-[#4B2923] absolute top-3 right-3" />
                          )}
                        </div>
                      );
                    })}
                </div>
              </div>

              {/* Progress & Next Step Button */}
              <div className="mt-8 pt-4 border-t border-[#D7BFAE]/30 flex items-center justify-between">
                <span className="text-xs text-[#8A554D]">
                  {activeTab === 'sponge' && 'Next: Select Core Filling'}
                  {activeTab === 'filling' && 'Next: Select Exterior Frosting'}
                  {activeTab === 'frosting' && 'Next: Select Signature Garnish'}
                  {activeTab === 'garnish' && 'All layers curated! Ready to order.'}
                </span>

                {activeTab !== 'garnish' ? (
                  <button
                    onClick={() => {
                      if (activeTab === 'sponge') setActiveTab('filling');
                      else if (activeTab === 'filling') setActiveTab('frosting');
                      else if (activeTab === 'frosting') setActiveTab('garnish');
                    }}
                    className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#4B2923] hover:text-[#8A554D] transition-colors"
                  >
                    <span>Proceed to Next Layer</span>
                    <ArrowRight className="w-4 h-4 text-[#E9AEBB]" />
                  </button>
                ) : (
                  <button
                    onClick={handleOrderCustomCombination}
                    className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#4B2923] hover:text-[#8A554D] transition-colors"
                  >
                    <span>Send to Baker Studio</span>
                    <ArrowRight className="w-4 h-4 text-[#E9AEBB]" />
                  </button>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

