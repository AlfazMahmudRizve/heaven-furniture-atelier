import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Sparkles, ArrowRight, ShieldCheck, ChevronLeft, ChevronRight } from 'lucide-react';
import { getWhatsAppInquiryUrl, buildProductWhatsAppUrl } from '../utils/whatsapp';

const HERO_SCENES = [
  {
    id: 'living',
    tag: '01 / 05 · LIVING ATELIER',
    name: 'Living Suite',
    subtitle: 'Burma Teak Sectional',
    headline: 'FURNITURE, CRAFTED AROUND YOU.',
    description: "Chattogram's bespoke furniture atelier. Tailored to your architectural space and taste — never pulled from a shelf.",
    material: 'Burma Teak Frame · Italian Velvet · Modular L-Shape',
    badge: 'Custom Sizing & Laser Fit',
    image: '/images/hero-living.jpg',
    ctaWhatsAppText: 'Sovereign Burma Teak Sectional',
  },
  {
    id: 'bedroom',
    tag: '02 / 05 · MASTER BEDROOM',
    name: 'Master Bedroom',
    subtitle: 'Fluted Teak Platform Bed',
    headline: 'SANCTUARY OF SOLID TIMBER.',
    description: 'Handcrafted solid Burma Teak king beds with acoustic fluted headboards, integrated warm ambient nightstands, and hydraulic storage.',
    material: 'Solid Seasoned Segun · Acoustic Fluting · LED Base',
    badge: 'Hydraulic Storage Fitted',
    image: '/images/hero-bedroom.jpg',
    ctaWhatsAppText: 'Imperial Burma Teak Bed',
  },
  {
    id: 'dining',
    tag: '03 / 05 · ROYAL DINING',
    name: 'Royal Dining',
    subtitle: 'Calacatta Sintered Stone',
    headline: 'GATHER AROUND MASTERPIECES.',
    description: '8-seater solid mahogany sculpted trestle base dining tables topped with Italian Calacatta sintered stone and ergonomic bouclé chairs.',
    material: 'Solid Mahogany · Italian Sintered Stone · 8-Seater',
    badge: 'Heat & Scratch Proof Top',
    image: '/images/hero-dining.jpg',
    ctaWhatsAppText: 'Grand Heritage Sintered Stone Dining Suite',
  },
  {
    id: 'executive',
    tag: '04 / 05 · EXECUTIVE STUDY',
    name: 'Executive Study',
    subtitle: 'Presidential Desk & Library',
    headline: 'COMMAND YOUR WORKSPACE.',
    description: 'Presidential desks with full-grain leather inlays, concealed cable routing, and matching floor-to-ceiling architectural libraries.',
    material: 'Burma Teak Desk · Full-Grain Leather · Concealed Routing',
    badge: 'Architectural Library Match',
    image: '/images/hero-executive.jpg',
    ctaWhatsAppText: 'Presidential Burma Teak Executive Desk',
  },
  {
    id: 'bespoke',
    tag: '05 / 05 · BESPOKE ATELIER',
    name: 'Bespoke Atelier',
    subtitle: '100% Custom Blueprint',
    headline: 'TAILORED TO YOUR BLUEPRINT.',
    description: 'Zero mass production. We measure your residence, create custom 3D renders, and handcraft heirloom pieces with lifetime joinery.',
    material: 'Kiln-Dried 10–12% Moisture · Hand-Planed · White-Glove Fit',
    badge: 'Free In-Home 3D Laser Measurement',
    image: '/images/hero-craftsmanship.jpg',
    ctaWhatsAppText: 'Custom Bespoke Interior Project',
  },
];

const AUTO_ROTATE_INTERVAL = 6000;

export default function Hero() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const currentScene = HERO_SCENES[activeIdx];

  // Auto-rotation timer
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % HERO_SCENES.length);
    }, AUTO_ROTATE_INTERVAL);
    return () => clearInterval(timer);
  }, [isPaused, activeIdx]);

  const handleSelectScene = (index) => {
    setActiveIdx(index);
  };

  const handleNext = () => {
    setActiveIdx((prev) => (prev + 1) % HERO_SCENES.length);
  };

  const handlePrev = () => {
    setActiveIdx((prev) => (prev - 1 + HERO_SCENES.length) % HERO_SCENES.length);
  };

  return (
    <section 
      className="relative min-h-[92vh] md:min-h-screen overflow-hidden flex flex-col justify-between bg-obsidian pt-24 pb-8"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Image Carousel with Cross-Fade & Gentle Ken Burns */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="sync">
          <motion.div
            key={currentScene.id}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1.0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0"
          >
            <img
              src={currentScene.image}
              alt={currentScene.name}
              className="w-full h-full object-cover object-center"
            />
          </motion.div>
        </AnimatePresence>

        {/* High-Fidelity Directional Scrim: Dark Left Side for 100% Typography Contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-obsidian via-obsidian/85 md:via-obsidian/70 to-obsidian/25 z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-obsidian/50 z-10" />
      </div>

      {/* Main Hero Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto py-12 md:py-16">
        <div className="max-w-2xl lg:max-w-3xl">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={currentScene.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
            >
              {/* Scene Tag Pill & Material Chip */}
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <span className="px-3.5 py-1 rounded-full text-xs font-semibold tracking-widest text-gold bg-surface/80 border border-gold/30 backdrop-blur-md">
                  {currentScene.tag}
                </span>
                <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium text-ivory-muted bg-surface/60 border border-white/10 backdrop-blur-md">
                  <ShieldCheck className="w-3.5 h-3.5 text-gold" />
                  {currentScene.badge}
                </span>
              </div>

              {/* Dynamic Headline */}
              <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl text-ivory tracking-tight leading-[1.08] mb-6 drop-shadow-sm">
                {currentScene.headline}
              </h1>

              {/* Description */}
              <p className="font-body text-base sm:text-lg text-ivory-muted max-w-xl leading-relaxed mb-6">
                {currentScene.description}
              </p>

              {/* Material Spec Callout Bar */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-surface/70 border border-gold/15 backdrop-blur-md mb-8 text-xs sm:text-sm text-ivory/90">
                <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
                <span className="text-gold font-medium">Atelier Spec:</span>
                <span>{currentScene.material}</span>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Dual VIP Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <a
              href="#bespoke"
              className="flex items-center justify-center gap-2.5 bg-gold text-obsidian px-8 py-4 font-semibold text-sm sm:text-base tracking-wide hover:bg-gold-hover transition-all duration-300 shadow-lg shadow-gold/10 hover:shadow-gold/25"
            >
              <Sparkles className="w-4 h-4 text-obsidian" />
              <span>Book Free Design Consultation</span>
            </a>
            
            <a
              href={buildProductWhatsAppUrl(currentScene.ctaWhatsAppText, currentScene.material)}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2.5 px-7 py-4 border border-gold/40 text-ivory bg-surface/40 backdrop-blur-sm font-semibold text-sm sm:text-base hover:border-gold hover:text-gold transition-all duration-300"
            >
              <MessageCircle className="w-5 h-5 text-green-400" />
              <span>WhatsApp Stylist</span>
            </a>
          </div>

        </div>
      </div>

      {/* 5-Scene Interactive Switcher Bar (Bottom of Hero) */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-auto">
        <div className="border-t border-gold/15 pt-5 pb-2">
          
          {/* Header row above tabs */}
          <div className="flex items-center justify-between mb-3 text-xs">
            <span className="text-gold font-medium tracking-widest uppercase">
              Explore Bespoke Collections ({activeIdx + 1} / {HERO_SCENES.length})
            </span>
            <div className="flex items-center gap-2">
              <button 
                onClick={handlePrev}
                aria-label="Previous scene"
                className="w-7 h-7 rounded-full border border-gold/30 flex items-center justify-center text-ivory-muted hover:text-gold hover:border-gold transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button 
                onClick={handleNext}
                aria-label="Next scene"
                className="w-7 h-7 rounded-full border border-gold/30 flex items-center justify-center text-ivory-muted hover:text-gold hover:border-gold transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* 5 Architectural Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-3">
            {HERO_SCENES.map((scene, idx) => {
              const isActive = idx === activeIdx;
              return (
                <button
                  key={scene.id}
                  onClick={() => handleSelectScene(idx)}
                  className={`relative text-left p-3 sm:p-3.5 rounded-lg border transition-all duration-300 overflow-hidden ${
                    isActive
                      ? 'bg-surface-elevated/90 border-gold shadow-md shadow-gold/10'
                      : 'bg-surface/40 border-white/10 hover:border-gold/40 hover:bg-surface/70'
                  }`}
                >
                  {/* Top line with category number */}
                  <div className="flex items-center justify-between mb-1">
                    <span className={`text-[10px] font-bold tracking-wider ${isActive ? 'text-gold' : 'text-ivory-muted'}`}>
                      0{idx + 1}
                    </span>
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
                    )}
                  </div>

                  {/* Suite Title */}
                  <div className={`font-semibold text-xs sm:text-sm tracking-tight truncate ${isActive ? 'text-ivory' : 'text-ivory-muted'}`}>
                    {scene.name}
                  </div>

                  {/* Subtitle / Wood Tag */}
                  <div className="text-[10px] text-ivory-muted/70 truncate mt-0.5">
                    {scene.subtitle}
                  </div>

                  {/* Active Progress Bar Underline */}
                  {isActive && !isPaused && (
                    <motion.div
                      key={`progress-${idx}`}
                      initial={{ width: '0%' }}
                      animate={{ width: '100%' }}
                      transition={{ duration: AUTO_ROTATE_INTERVAL / 1000, ease: 'linear' }}
                      className="absolute bottom-0 left-0 h-0.5 bg-gold"
                    />
                  )}
                  {isActive && isPaused && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold" />
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
