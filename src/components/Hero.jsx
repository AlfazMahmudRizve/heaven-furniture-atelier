import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Sparkles, ShieldCheck, ChevronLeft, ChevronRight, ArrowUpRight, Phone } from 'lucide-react';
import { getWhatsAppInquiryUrl, buildProductWhatsAppUrl, getPhoneUrl } from '../utils/whatsapp';

const HERO_SCENES = [
  {
    id: 'living',
    number: '01',
    category: 'LIVING SUITE',
    title: 'Living Suite',
    subtitle: 'Burma Teak Sectional',
    headline: 'FURNITURE, CRAFTED AROUND YOU.',
    description: "Chattogram's bespoke furniture atelier. Every sofa and lounge suite is tailored to your architectural space — never pulled from a shelf.",
    material: 'Burma Teak Frame · Italian Velvet · Modular L-Shape',
    timeline: 'Crafted in 14–21 Days',
    image: '/images/hero-living.jpg',
    productName: 'Sovereign Burma Teak Sectional',
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
  },
];

const AUTO_ROTATE_INTERVAL = 6500;

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

        {/* Sophisticated Editorial Vignette Scrim */}
        <div className="absolute inset-0 bg-gradient-to-r from-obsidian/95 via-obsidian/75 md:via-obsidian/50 to-obsidian/40 z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-obsidian/60 z-10" />
      </div>

      {/* Main Hero Content — Asymmetric Split Layout */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto py-10 md:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Pure Editorial Typography */}
          <div className="lg:col-span-7 xl:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentScene.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
              >
                {/* Refined Minimal Category Indicator */}
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-xs uppercase tracking-[0.35em] text-gold font-medium">
                    BESPOKE ATELIER · Nº {currentScene.number}
                  </span>
                  <span className="h-px w-8 bg-gold/40" />
                  <span className="text-xs uppercase tracking-widest text-ivory-muted/80 font-light hidden sm:inline">
                    {currentScene.category}
                  </span>
                </div>

                {/* Main Headline */}
                <h1 className="font-display text-4xl sm:text-6xl xl:text-7xl text-ivory tracking-tight leading-[1.06] mb-6 drop-shadow-md">
                  {currentScene.headline}
                </h1>

                {/* Subtitle Description */}
                <p className="font-body text-base sm:text-lg text-ivory-muted max-w-xl leading-relaxed mb-6">
                  {currentScene.description}
                </p>

                {/* Understated Material Detail Line */}
                <div className="flex items-center gap-2 text-xs sm:text-sm text-ivory-muted/90 pt-1">
                  <span className="text-gold font-medium tracking-wider uppercase text-[11px]">Material:</span>
                  <span className="text-ivory/90 font-light">{currentScene.material}</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Column: Repositioned Floating VIP Conversion Card */}
          <div className="lg:col-span-5 xl:col-span-4">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="p-6 sm:p-7 rounded-2xl bg-surface/75 backdrop-blur-xl border border-gold/20 shadow-2xl shadow-obsidian/80 relative overflow-hidden group"
            >
              {/* Subtle gold ambient glow */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gold/10 rounded-full blur-2xl pointer-events-none" />

              {/* Card Header */}
              <div className="flex items-center justify-between pb-4 mb-5 border-b border-gold/15">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.25em] text-gold font-semibold block">
                    VIP CONCIERGE
                  </span>
                  <span className="font-display text-lg text-ivory">
                    {currentScene.title}
                  </span>
                </div>
                <span className="text-[11px] text-ivory-muted/80 bg-obsidian/60 px-2.5 py-1 rounded border border-white/5">
                  {currentScene.timeline}
                </span>
              </div>

              {/* Primary Consultation CTA */}
              <a
                href="#bespoke"
                className="flex items-center justify-center gap-2 w-full py-3.5 px-5 bg-gold text-obsidian font-semibold text-sm tracking-wide rounded hover:bg-gold-hover transition-all duration-300 shadow-md shadow-gold/10 hover:shadow-gold/20 mb-3"
              >
                <Sparkles className="w-4 h-4 text-obsidian" />
                <span>Book Free Consultation</span>
              </a>

              {/* WhatsApp Direct CTA */}
              <a
                href={buildProductWhatsAppUrl(currentScene.productName, currentScene.material)}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3 px-5 bg-surface-elevated/90 border border-gold/30 text-ivory hover:text-gold hover:border-gold font-medium text-sm rounded transition-all duration-300 mb-5"
              >
                <MessageCircle className="w-4 h-4 text-green-400" />
                <span>WhatsApp an Interior Stylist</span>
              </a>

              {/* Trust Reassurance Bullet Points */}
              <div className="space-y-2 pt-2 border-t border-white/5 text-[11px] text-ivory-muted/90">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-gold shrink-0" />
                  <span>100% Seasoned Solid Timber (Burma Teak, Gamari, Mahogany)</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-gold shrink-0" />
                  <span>Free In-Home 3D Laser Measurement in Chattogram</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-gold shrink-0" />
                  <span>White-Glove Delivery & Installation Included</span>
                </div>
              </div>

              {/* Quick Call Row */}
              <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px]">
                <span className="text-ivory-muted">Agrabad Access Road Showroom</span>
                <a href={getPhoneUrl()} className="text-gold hover:underline font-medium flex items-center gap-1">
                  <Phone className="w-3 h-3" />
                  <span>01960-481983</span>
                </a>
              </div>

            </motion.div>
          </div>

        </div>
      </div>

      {/* Redesigned Sleek Architectural Product Switcher (Bottom Rail) */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-auto">
        <div className="pt-4 border-t border-gold/15">
          
          {/* Top micro row */}
          <div className="flex items-center justify-between mb-2 text-xs">
            <span className="text-[11px] uppercase tracking-[0.2em] text-gold/90 font-medium">
              Bespoke Suites Collection · Select Scene
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
                  className={`relative text-left p-3 rounded-xl transition-all duration-300 overflow-hidden ${
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
