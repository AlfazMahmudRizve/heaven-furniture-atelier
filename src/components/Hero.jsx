import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Sparkles, ShieldCheck, ChevronLeft, ChevronRight } from 'lucide-react';
import { buildProductWhatsAppUrl } from '../utils/whatsapp';

const HERO_SCENES = [
  {
    id: 'living',
    number: '01',
    category: 'LIVING ATELIER',
    title: 'Living Suite',
    subtitle: 'Burma Teak Sectional',
    headline: 'FURNITURE, CRAFTED AROUND YOU.',
    description: "Chattogram's bespoke furniture atelier. Every sofa and lounge suite is tailored to your architectural space — never pulled from a shelf.",
    material: 'Burma Teak Frame · Italian Velvet · Modular L-Shape',
    timeline: 'Crafted in 14–21 Days',
    image: '/images/hero-living.jpg',
    productName: 'Sovereign Burma Teak Sectional',
    alignment: 'left',
  },
  {
    id: 'bedroom',
    number: '02',
    category: 'MASTER BEDROOM',
    title: 'Master Bedroom',
    subtitle: 'Fluted Teak Platform Bed',
    headline: 'SANCTUARY OF SOLID TIMBER.',
    description: 'Handcrafted solid Burma Teak king beds with acoustic fluted headboards, integrated warm ambient nightstands, and hydraulic storage.',
    material: 'Solid Seasoned Segun · Acoustic Fluting · LED Underglow',
    timeline: 'Crafted in 18–24 Days',
    image: '/images/hero-bedroom.jpg',
    productName: 'Imperial Burma Teak Bed',
    alignment: 'right',
  },
  {
    id: 'dining',
    number: '03',
    category: 'ROYAL DINING',
    title: 'Royal Dining',
    subtitle: 'Calacatta Sintered Stone',
    headline: 'GATHER AROUND MASTERPIECES.',
    description: '8-seater solid mahogany sculpted trestle base dining tables topped with Italian Calacatta sintered stone and ergonomic bouclé chairs.',
    material: 'Solid Mahogany · Calacatta Sintered Stone · 8-Seater',
    timeline: 'Crafted in 14–20 Days',
    image: '/images/hero-dining.jpg',
    productName: 'Grand Heritage Sintered Stone Suite',
    alignment: 'left',
  },
  {
    id: 'executive',
    number: '04',
    category: 'EXECUTIVE STUDY',
    title: 'Executive Study',
    subtitle: 'Presidential Desk & Library',
    headline: 'COMMAND YOUR WORKSPACE.',
    description: 'Presidential executive desks with full-grain leather inlays, concealed cable routing, and matching floor-to-ceiling architectural libraries.',
    material: 'Burma Teak Desk · Full-Grain Leather · Concealed Routing',
    timeline: 'Crafted in 16–22 Days',
    image: '/images/hero-executive.jpg',
    productName: 'Presidential Burma Teak Desk',
    alignment: 'right',
  },
  {
    id: 'bespoke',
    number: '05',
    category: 'BESPOKE ATELIER',
    title: 'Bespoke Atelier',
    subtitle: '100% Custom Blueprint',
    headline: 'TAILORED TO YOUR BLUEPRINT.',
    description: 'Zero mass production. We laser-measure your apartment, create custom 3D renders, and handcraft heirloom timber pieces with lifetime joinery.',
    material: 'Kiln-Dried 10–12% Moisture · Hand-Planed · White-Glove Fit',
    timeline: 'Tailored to Project Blueprint',
    image: '/images/hero-craftsmanship.jpg',
    productName: 'Custom Bespoke Project',
    alignment: 'left',
  },
];

const AUTO_ROTATE_INTERVAL = 6500;

export default function Hero() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const currentScene = HERO_SCENES[activeIdx];
  const isRight = currentScene.alignment === 'right';

  // Auto-rotation timer
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % HERO_SCENES.length);
    }, AUTO_ROTATE_INTERVAL);
    return () => clearInterval(timer);
  }, [isPaused, activeIdx]);

  return (
    <section 
      className="relative min-h-[92vh] md:min-h-screen overflow-hidden flex flex-col justify-between bg-obsidian pt-24 pb-6"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Image Carousel with Cross-Fade & Subtle Ken Burns */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="sync">
          <motion.div
            key={currentScene.id}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1.0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0"
          >
            <img
              src={currentScene.image}
              alt={currentScene.title}
              className="w-full h-full object-cover object-center"
            />
          </motion.div>
        </AnimatePresence>

        {/* Dynamic Directional Scrim: Darkens Left when Left-Aligned, Darkens Right when Right-Aligned */}
        <div 
          className={`absolute inset-0 z-10 transition-all duration-700 ${
            isRight
              ? 'bg-gradient-to-l from-obsidian/95 via-obsidian/85 md:via-obsidian/55 to-transparent'
              : 'bg-gradient-to-r from-obsidian/95 via-obsidian/85 md:via-obsidian/55 to-transparent'
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-obsidian/50 z-10" />
      </div>

      {/* Main Hero Content — Dynamic Alternating Left / Right Position */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto py-10 md:py-14">
        <div className="w-full flex">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={currentScene.id}
              initial={{ opacity: 0, x: isRight ? 40 : -40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: isRight ? -40 : 40 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className={`max-w-2xl lg:max-w-3xl flex flex-col ${
                isRight 
                  ? 'ml-auto text-right items-end' 
                  : 'mr-auto text-left items-start'
              }`}
            >
              {/* Category Indicator with Gold Hairline */}
              <div className={`flex items-center gap-3 mb-5 ${isRight ? 'flex-row-reverse' : 'flex-row'}`}>
                <span className="text-xs uppercase tracking-[0.35em] text-gold font-medium">
                  BESPOKE ATELIER · Nº {currentScene.number}
                </span>
                <span className="h-px w-8 bg-gold/40" />
                <span className="text-xs uppercase tracking-widest text-ivory-muted/80 font-light">
                  {currentScene.category}
                </span>
              </div>

              {/* Dynamic Main Headline */}
              <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl text-ivory tracking-tight leading-[1.08] mb-6 drop-shadow-md">
                {currentScene.headline}
              </h1>

              {/* Description Subtext */}
              <p className="font-body text-base sm:text-lg text-ivory-muted max-w-xl leading-relaxed mb-6">
                {currentScene.description}
              </p>

              {/* Material Detail Line */}
              <div className={`flex flex-wrap items-center gap-2 text-xs sm:text-sm text-ivory-muted/90 mb-8 ${isRight ? 'justify-end' : 'justify-start'}`}>
                <span className="text-gold font-medium tracking-wider uppercase text-[11px]">Material:</span>
                <span className="text-ivory/90 font-light">{currentScene.material}</span>
                <span className="text-gold/40 mx-1">·</span>
                <span className="text-ivory-muted/70 text-[11px]">{currentScene.timeline}</span>
              </div>

              {/* Clean Luxury CTAs */}
              <div className={`flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-6 w-full sm:w-auto ${isRight ? 'sm:justify-end' : 'sm:justify-start'}`}>
                <a
                  href="#bespoke"
                  className="flex items-center justify-center gap-2.5 bg-gold text-obsidian px-8 py-4 font-semibold text-sm sm:text-base tracking-wide hover:bg-gold-hover transition-all duration-300 shadow-lg shadow-gold/15 hover:shadow-gold/25"
                >
                  <Sparkles className="w-4 h-4 text-obsidian" />
                  <span>Book Free Design Consultation</span>
                </a>
                
                <a
                  href={buildProductWhatsAppUrl(currentScene.productName, currentScene.material)}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2.5 px-7 py-4 border border-gold/40 text-ivory bg-surface/50 backdrop-blur-md font-semibold text-sm sm:text-base hover:border-gold hover:text-gold transition-all duration-300"
                >
                  <MessageCircle className="w-5 h-5 text-green-400" />
                  <span>WhatsApp Stylist</span>
                </a>
              </div>

              {/* Quick Trust Guarantees Row */}
              <div className={`flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-ivory-muted/80 pt-1 ${isRight ? 'justify-end' : 'justify-start'}`}>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-gold" />
                  <span>100% Solid Seasoned Timber</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-gold" />
                  <span>Free 3D Laser Measurement</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-gold" />
                  <span>White-Glove Installation</span>
                </div>
              </div>

            </motion.div>
          </AnimatePresence>

        </div>
      </div>

      {/* Sleek Architectural Product Switcher (Bottom Rail) */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-auto">
        <div className="pt-4 border-t border-gold/15">
          
          {/* Top micro navigation row */}
          <div className="flex items-center justify-between mb-2 text-xs">
            <span className="text-[11px] uppercase tracking-[0.2em] text-gold/90 font-medium">
              Bespoke Suites Collection · Select Scene ({activeIdx + 1} / {HERO_SCENES.length})
            </span>
            <div className="flex items-center gap-1.5">
              <button 
                onClick={() => setActiveIdx((prev) => (prev - 1 + HERO_SCENES.length) % HERO_SCENES.length)}
                aria-label="Previous suite"
                className="w-6 h-6 rounded-full border border-gold/30 flex items-center justify-center text-ivory-muted hover:text-gold hover:border-gold transition-colors"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <button 
                onClick={() => setActiveIdx((prev) => (prev + 1) % HERO_SCENES.length)}
                aria-label="Next suite"
                className="w-6 h-6 rounded-full border border-gold/30 flex items-center justify-center text-ivory-muted hover:text-gold hover:border-gold transition-colors"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* 5 Sleek Architectural Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-3">
            {HERO_SCENES.map((scene, idx) => {
              const isActive = idx === activeIdx;
              return (
                <button
                  key={scene.id}
                  onClick={() => setActiveIdx(idx)}
                  className={`relative text-left p-3 sm:p-3.5 rounded-xl transition-all duration-300 overflow-hidden ${
                    isActive
                      ? 'bg-surface-elevated/90 border border-gold/60 shadow-lg shadow-gold/5'
                      : 'bg-surface/40 border border-white/5 hover:border-gold/30 hover:bg-surface/60'
                  }`}
                >
                  {/* Category Header */}
                  <div className="flex items-center justify-between mb-1">
                    <span className={`text-[10px] font-bold tracking-widest ${isActive ? 'text-gold' : 'text-ivory-muted/60'}`}>
                      {scene.number}
                    </span>
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
                    )}
                  </div>

                  {/* Title */}
                  <div className={`text-xs sm:text-sm font-semibold tracking-tight truncate ${isActive ? 'text-ivory' : 'text-ivory-muted'}`}>
                    {scene.title}
                  </div>

                  {/* Subtitle */}
                  <div className="text-[10px] text-ivory-muted/70 truncate mt-0.5 font-light">
                    {scene.subtitle}
                  </div>

                  {/* Smooth Progress Indicator on Active Tab */}
                  {isActive && !isPaused && (
                    <motion.div
                      key={`progress-${idx}`}
                      initial={{ width: '0%' }}
                      animate={{ width: '100%' }}
                      transition={{ duration: AUTO_ROTATE_INTERVAL / 1000, ease: 'linear' }}
                      className="absolute bottom-0 left-0 h-[2px] bg-gold"
                    />
                  )}
                  {isActive && isPaused && (
                    <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gold" />
                  )}
                </button>
              );
            })}
          </div>

        </div>
      </div>

    </section>
  );
}
