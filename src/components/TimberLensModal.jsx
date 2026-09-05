import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sun, Moon, ShieldCheck, Sparkles, Plus, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const TIMBER_SPECIES = [
  {
    id: 'teak',
    name: 'Burma Teak',
    bengali: 'বার্মা সেগুন',
    description: 'The pinnacle of South Asian heirloom cabinetry. Sourced from aged heartwood rich in natural silica and protective resins.',
    jankaHardness: '1,155 lbf',
    density: '680 kg/m³',
    moistureContent: '10–12% Kiln Seasoned',
    termiteResistance: 'Immune (High Tectoquione content)',
    patina: 'Deepens into a warm honey-amber luster over decades',
    bestFor: 'Grand dining suites, structural beds, exterior verandas',
    basePriceEst: 185000,
    dayColor: 'from-[#8B5A2B] via-[#A0522D] to-[#6E4720]',
    nightColor: 'from-[#5C3317] via-[#7B3F00] to-[#4A2610]',
    grainType: 'Straight with wavy feathering and distinct golden pore flecks',
  },
  {
    id: 'gamari',
    name: 'Chittagong Gamari',
    bengali: 'চিটাগাং গামারি',
    description: 'A prized indigenous timber of the Chattogram hill tracts. Celebrated for dimensional stability and silky surface texture.',
    jankaHardness: '980 lbf',
    density: '520 kg/m³',
    moistureContent: '11% Kiln Treated',
    termiteResistance: 'Very High (Seasoned and Boron treated)',
    patina: 'Maintains an ethereal creamy beige with golden undertones',
    bestFor: 'Wardrobe interiors, carved console panels, fluted sideboards',
    basePriceEst: 135000,
    dayColor: 'from-[#C4A482] via-[#D2B48C] to-[#A88B68]',
    nightColor: 'from-[#8C6D4C] via-[#9E7D58] to-[#705234]',
    grainType: 'Fine interlocked grain with subtle blonde satin ribbons',
  },
  {
    id: 'mahogany',
    name: 'Royal Mahogany',
    bengali: 'রয়্যাল মেহগনি',
    description: 'A dense, close-grained timber yielding majestic wine-red tonality and flawless mirror-lacquer acceptance.',
    jankaHardness: '1,080 lbf',
    density: '640 kg/m³',
    moistureContent: '10% Seasoned',
    termiteResistance: 'High (Immersion treated)',
    patina: 'Oxidizes into a deep reddish-bronze with cathedral highlights',
    bestFor: 'Executive presidential desks, library bookcases, vitrines',
    basePriceEst: 145000,
    dayColor: 'from-[#800000] via-[#8B2500] to-[#5C1D13]',
    nightColor: 'from-[#4A0E08] via-[#661810] to-[#3B0A06]',
    grainType: 'Distinct cathedral arches with rich ribbon stripe figure',
  },
  {
    id: 'oak',
    name: 'Solid White Oak',
    bengali: 'আমেরিকান ওক',
    description: 'Architectural European hardwood boasting remarkable tensile strength and pronounced medullary ray ray-fleck patterns.',
    jankaHardness: '1,360 lbf',
    density: '750 kg/m³',
    moistureContent: '9–11% Kiln Dried',
    termiteResistance: 'Superior tannin density',
    patina: 'Subtle biscuit warmth with visible open wire-brushed pores',
    bestFor: 'Low-profile platform suites, sculptural minimalist seating',
    basePriceEst: 195000,
    dayColor: 'from-[#B89778] via-[#C8AA8D] to-[#9E7F60]',
    nightColor: 'from-[#7A5E44] via-[#8C6E52] to-[#614730]',
    grainType: 'Pronounced open pore rings with silver medullary flecks',
  },
];

export default function TimberLensModal({ isOpen, onClose }) {
  const [selectedId, setSelectedId] = useState('teak');
  const [lighting, setLighting] = useState('day'); // 'day' | 'night'
  const [addedNotice, setAddedNotice] = useState(false);
  const { addItem } = useCart();

  const currentTimber = TIMBER_SPECIES.find((t) => t.id === selectedId) || TIMBER_SPECIES[0];

  const handleAddToTray = () => {
    addItem({
      id: `timber-suite-${currentTimber.id}`,
      title: `Custom ${currentTimber.name} Commission`,
      category: 'Bespoke Atelier Commission',
      wood: currentTimber.name,
      finish: lighting === 'day' ? 'Natural Satin Lacquer' : 'Deep Amber Oil Finish',
      dimensions: 'Tailored to Space (Blueprint Included)',
      price: currentTimber.basePriceEst,
      priceDisplay: `From ৳${currentTimber.basePriceEst.toLocaleString('en-IN')}`,
      image: '/images/hero-craftsmanship.jpg',
    });
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-[9990]"
            aria-hidden="true"
          />

          {/* Modal Dialog */}
          <div className="fixed inset-0 z-[9992] flex items-center justify-center p-4 sm:p-6 overflow-y-auto pointer-events-none">
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="w-full max-w-4xl bg-[#241A14] border border-[#C6A75E]/30 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.9)] overflow-hidden pointer-events-auto flex flex-col"
              role="dialog"
              aria-modal="true"
              aria-label="Interactive Timber Grain Inspector"
            >
              {/* Header */}
              <div className="p-6 border-b border-[#C6A75E]/15 bg-[#1B140F] flex items-center justify-between">
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#C6A75E] font-semibold block">
                    Material Authenticity &amp; Provenance
                  </span>
                  <h2 className="font-display text-2xl text-[#F5EFEB] font-normal">
                    Macro Timber Lens &amp; Grain Inspector
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="w-10 h-10 rounded-full border border-[#C6A75E]/30 flex items-center justify-center text-[#F5EFEB] hover:text-[#C6A75E] hover:border-[#C6A75E] transition-colors"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Timber Selector Tabs */}
              <div className="grid grid-cols-2 sm:grid-cols-4 border-b border-[#C6A75E]/15 bg-[#1E1611]">
                {TIMBER_SPECIES.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setSelectedId(t.id)}
                    className={`py-3 px-4 text-left font-mono transition-colors border-r border-[#C6A75E]/10 last:border-r-0 ${
                      selectedId === t.id
                        ? 'bg-[#30231B] text-[#C6A75E] border-b-2 border-b-[#C6A75E]'
                        : 'text-[#F5EFEB]/60 hover:text-[#F5EFEB] hover:bg-[#281D16]'
                    }`}
                  >
                    <div className="text-[10px] uppercase tracking-wider font-semibold">{t.name}</div>
                    <div className="text-[11px] font-display text-[#F5EFEB]/40">{t.bengali}</div>
                  </button>
                ))}
              </div>

              {/* Main Content Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6 sm:p-8">
                {/* Left: Interactive Simulated Grain Surface */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs uppercase tracking-widest text-[#F5EFEB]/60 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#C6A75E]" />
                      Simulated Surface Luster
                    </span>

                    {/* Lighting Switcher */}
                    <div className="inline-flex rounded-lg bg-[#18120D] p-1 border border-[#C6A75E]/20">
                      <button
                        type="button"
                        onClick={() => setLighting('day')}
                        className={`flex items-center gap-1.5 px-3 py-1 rounded text-xs font-mono transition-colors ${
                          lighting === 'day'
                            ? 'bg-[#C6A75E] text-[#241A14] font-semibold'
                            : 'text-[#F5EFEB]/60 hover:text-[#F5EFEB]'
                        }`}
                      >
                        <Sun className="w-3 h-3" />
                        <span>Daylight</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setLighting('night')}
                        className={`flex items-center gap-1.5 px-3 py-1 rounded text-xs font-mono transition-colors ${
                          lighting === 'night'
                            ? 'bg-[#C6A75E] text-[#241A14] font-semibold'
                            : 'text-[#F5EFEB]/60 hover:text-[#F5EFEB]'
                        }`}
                      >
                        <Moon className="w-3 h-3" />
                        <span>Evening</span>
                      </button>
                    </div>
                  </div>

                  {/* Grain Canvas Box */}
                  <div
                    className={`relative w-full aspect-[4/3] rounded-xl overflow-hidden shadow-inner border border-[#C6A75E]/25 bg-gradient-to-br ${
                      lighting === 'day' ? currentTimber.dayColor : currentTimber.nightColor
                    } transition-all duration-700 p-6 flex flex-col justify-between`}
                  >
                    {/* Organic Grain Lines Simulation */}
                    <div
                      className="absolute inset-0 opacity-25 mix-blend-overlay pointer-events-none"
                      style={{
                        backgroundImage: `repeating-linear-gradient(45deg, rgba(255,255,255,0.08) 0px, rgba(255,255,255,0.08) 2px, transparent 2px, transparent 8px), repeating-radial-gradient(circle at 30% 40%, rgba(0,0,0,0.2) 0px, transparent 60px)`,
                      }}
                    />

                    {/* Lighting overlay effect */}
                    <div
                      className={`absolute inset-0 pointer-events-none transition-opacity duration-700 ${
                        lighting === 'day'
                          ? 'bg-gradient-to-tr from-transparent via-white/10 to-amber-100/20'
                          : 'bg-gradient-to-t from-black/50 via-amber-950/30 to-amber-500/10'
                      }`}
                    />

                    <div className="relative z-10">
                      <span className="font-mono text-[9px] uppercase tracking-widest bg-black/50 text-[#C6A75E] px-2.5 py-1 rounded-full backdrop-blur-sm border border-[#C6A75E]/30">
                        {lighting === 'day' ? '5000K Natural North Light' : '2700K Chandelier Glow'}
                      </span>
                    </div>

                    <div className="relative z-10 bg-black/60 backdrop-blur-md rounded-lg p-3 border border-white/10 space-y-1">
                      <p className="font-mono text-[10px] text-[#C6A75E] uppercase tracking-wider">
                        Grain Figure:
                      </p>
                      <p className="text-xs text-[#F5EFEB] font-light leading-relaxed">
                        {currentTimber.grainType}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right: Technical Provenance Specs */}
                <div className="space-y-6 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-display text-2xl text-[#F5EFEB]">{currentTimber.name}</h3>
                      <p className="text-[#F5EFEB]/70 text-sm leading-relaxed mt-1 font-light">
                        {currentTimber.description}
                      </p>
                    </div>

                    {/* Technical Specs Table */}
                    <div className="rounded-xl bg-[#1C140F] border border-[#C6A75E]/15 divide-y divide-[#C6A75E]/10">
                      <div className="flex items-center justify-between p-3 text-xs">
                        <span className="font-mono text-[#F5EFEB]/50 uppercase tracking-wider text-[10px]">
                          Janka Hardness
                        </span>
                        <span className="font-mono text-[#C6A75E] font-semibold">{currentTimber.jankaHardness}</span>
                      </div>
                      <div className="flex items-center justify-between p-3 text-xs">
                        <span className="font-mono text-[#F5EFEB]/50 uppercase tracking-wider text-[10px]">
                          Air-Dry Density
                        </span>
                        <span className="font-mono text-[#F5EFEB]">{currentTimber.density}</span>
                      </div>
                      <div className="flex items-center justify-between p-3 text-xs">
                        <span className="font-mono text-[#F5EFEB]/50 uppercase tracking-wider text-[10px]">
                          Kiln Seasoning
                        </span>
                        <span className="font-mono text-[#F5EFEB]">{currentTimber.moistureContent}</span>
                      </div>
                      <div className="flex items-center justify-between p-3 text-xs">
                        <span className="font-mono text-[#F5EFEB]/50 uppercase tracking-wider text-[10px]">
                          Termite Defense
                        </span>
                        <span className="font-mono text-emerald-400 font-medium">{currentTimber.termiteResistance}</span>
                      </div>
                      <div className="flex items-center justify-between p-3 text-xs">
                        <span className="font-mono text-[#F5EFEB]/50 uppercase tracking-wider text-[10px]">
                          Aging Trajectory
                        </span>
                        <span className="font-body text-[#F5EFEB]/80 text-[11px] text-right max-w-[200px]">
                          {currentTimber.patina}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Add to Tray Action */}
                  <div className="pt-4 border-t border-[#C6A75E]/15 space-y-3">
                    <div className="flex items-baseline justify-between">
                      <span className="font-mono text-[10px] uppercase tracking-widest text-[#F5EFEB]/60">
                        Indicative Commission
                      </span>
                      <span className="font-mono text-lg font-bold text-[#C6A75E]">
                        From ৳{currentTimber.basePriceEst.toLocaleString('en-IN')}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={handleAddToTray}
                      className={`w-full py-3.5 px-6 rounded-lg font-mono text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 transition-all ${
                        addedNotice
                          ? 'bg-emerald-600 text-white'
                          : 'bg-[#C6A75E] hover:bg-[#D4B975] text-[#241A14]'
                      }`}
                    >
                      {addedNotice ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span>Added to Consultation Tray</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-4 h-4" />
                          <span>Commission Bespoke in {currentTimber.name}</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
