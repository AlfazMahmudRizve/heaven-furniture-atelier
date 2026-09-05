import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, MessageCircle, ShieldCheck, ArrowRight, ShoppingBag } from 'lucide-react';
import { buildProductWhatsAppUrl } from '../utils/whatsapp';
import { useCart } from '../context/CartContext';

const SUITES = [
  {
    id: 'living',
    number: '01',
    label: 'LIVING ROOM SUITE',
    title: 'The Sovereign Living Suite',
    subtitle: 'Where Comfort Meets Handcrafted Teak Architecture',
    description: "Quarter-sawn from solid seasoned Burma Teak heartwood. Belgian ivory velvet upholstery meets 45D ergonomic memory foam — sculpted not for a catalog, but for your family's multi-generational sanctuary.",
    timber: 'Solid Burma Teak (বার্মা সেগুন)',
    upholstery: 'Belgian Velvet & 45D Foam',
    dimensions: '3200mm W × 1950mm D × 780mm H',
    timeline: '14–21 Days',
    heroImage: '/images/hero-living.jpg',
    macroImage: '/images/timber-macro.jpg',
    explodedImage: '/images/hero-living-exploded.jpg',
    macroLabel: '8X Macro Burma Teak Grain',
    macroDesc: 'Dense natural silica & termite-immune oils',
    explodedLabel: 'Zero-Nail Interlocking Frame',
    explodedDesc: 'Male-female mortise & tenon joinery',
    badge: '100% Solid Heartwood Timber',
  },
  {
    id: 'bedroom',
    number: '02',
    label: 'MASTER BEDROOM SUITE',
    title: 'The Imperial Platform Bed',
    subtitle: 'Sanctuary of Solid Timber & Ambient Illumination',
    description: 'Acoustic fluted headboard in solid Burma Teak with integrated warm ambient nightstands. German hydraulic lift-up storage holds 800 litres beneath — effortless elegance, engineered precision.',
    timber: 'Seasoned Teak & Gamari',
    upholstery: 'Italian Wool Blend & LED Glow',
    dimensions: '2100mm W × 2200mm L × 1200mm H',
    timeline: '18–24 Days',
    heroImage: '/images/hero-bedroom.jpg',
    macroImage: '/images/products/imperial-burma-teak-king-bed.jpg',
    explodedImage: '/images/products/floating-platform-bed.jpg',
    macroLabel: 'Fluted Burma Teak Headboard',
    macroDesc: 'Hand-fluted acoustic hardwood battens',
    explodedLabel: '800L Hydraulic Sub-Storage',
    explodedDesc: 'German gas struts with silent dampening',
    badge: '800L Hydraulic Storage System',
  },
  {
    id: 'dining',
    number: '03',
    label: 'ROYAL DINING HALL',
    title: 'Grand Heritage Sintered Suite',
    subtitle: 'Monumental Slab Trestle for Generational Feasts',
    description: 'Sculpted solid mahogany trestle base paired with 12mm Italian Calacatta sintered stone top. Eight ergonomic bouclé chairs complete a table set for generations of ceremony.',
    timber: 'Solid Red Mahogany (মেহগনি)',
    upholstery: 'Calacatta Gold Stone & Bouclé',
    dimensions: '2400mm L × 1100mm W × 760mm H',
    timeline: '14–20 Days',
    heroImage: '/images/hero-dining.jpg',
    macroImage: '/images/products/grand-heritage-8-seater.jpg',
    explodedImage: '/images/products/sculptural-round-pedestal.jpg',
    macroLabel: '12mm Calacatta Sintered Stone',
    macroDesc: 'Heat, scratch, and citrus acid-proof top',
    explodedLabel: 'Mahogany Trestle Bridge',
    explodedDesc: 'Hand-carved monolithic timber beams',
    badge: 'Heat & Scratch Proof Top',
  },
  {
    id: 'executive',
    number: '04',
    label: 'EXECUTIVE STUDY',
    title: 'Presidential Executive Desk',
    subtitle: 'Solid Teak Executive Workspace',
    description: 'Presidential solid Burma Teak desk featuring real leather writing pad, smooth-glide drawers, and neat internal cable channels. Built for focus and authority.',
    timber: 'Solid Burma Teak (বার্মা সেগুন)',
    upholstery: 'Tuscan Full-Grain Leather',
    dimensions: '2200mm W × 1000mm D × 760mm H',
    timeline: '16–22 Days',
    heroImage: '/images/hero-executive.jpg',
    macroImage: '/images/products/presidential-executive-desk.jpg',
    explodedImage: '/images/products/executive-conference-table.jpg',
    macroLabel: 'Tuscan Leather Writing Inlay',
    macroDesc: 'Double-stitched vegetable-tanned hide',
    explodedLabel: 'Concealed Tech Raceways',
    explodedDesc: 'Integrated cable management & Qi charging',
    badge: 'Concealed Cable & Tech Raceways',
  },
];

export default function ProductShowcase() {
  const { addItem } = useCart();
  const [activeIdx, setActiveIdx] = useState(0);
  const suite = SUITES[activeIdx];

  const whatsappUrl = buildProductWhatsAppUrl(
    suite.name,
    `Suite: ${suite.label} | Timber: ${suite.timber} | Dimensions: ${suite.dimensions}`
  );

  const suiteCategoryMap = {
    living: 'living-room',
    bedroom: 'master-bedroom',
    dining: 'royal-dining',
    executive: 'executive-study',
  };

  return (
    <section id="craftsmanship" className="relative bg-[#241A14] py-24 lg:py-32 px-6 lg:px-14 border-t border-[#E8DCC8]/15">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Editorial Header & Minimalist Suite Switcher */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-6 border-b border-[#E8DCC8]/15">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="font-mono text-[11px] text-[#C6A75E] uppercase tracking-[0.35em] block font-semibold">
                04 / COMPLETE ROOM SETS
              </span>
              <span className="font-mono text-[9px] px-2.5 py-0.5 rounded-full bg-[#C6A75E]/20 text-[#C6A75E] uppercase tracking-wider font-bold">
                Solid Timber
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl text-[#F5EFEB] tracking-tight font-light leading-tight">
              Suites Made for <br />
              <span className="italic font-normal text-[#E8DCC8]">Every Room.</span>
            </h2>
          </div>

          {/* Poliform Minimalist Horizontal Suite Selector */}
          <div className="flex items-center gap-6 overflow-x-auto pb-2 lg:pb-0 font-mono text-xs">
            {SUITES.map((s, idx) => (
              <button
                key={s.id}
                onClick={() => setActiveIdx(idx)}
                className={`py-2 text-left transition-[color,border-color] duration-300 cursor-pointer whitespace-nowrap flex items-center gap-2 border-b-2 ${
                  activeIdx === idx
                    ? 'border-[#C6A75E] text-[#F5EFEB] font-bold'
                    : 'border-transparent text-[#E8DCC8]/50 hover:text-[#E8DCC8]'
                }`}
              >
                <span className="text-[#C6A75E]">{s.number}</span>
                <span className="tracking-wider uppercase">{s.label.replace(' SUITE', '').replace('THE ', '')}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Poliform Unboxed Asymmetric Suite Presentation */}
        <AnimatePresence mode="wait">
          <motion.div
            key={suite.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.45 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center"
          >
            {/* Left: Expansive Architectural Suite Photograph */}
            <div className="lg:col-span-7 relative aspect-[16/10] sm:aspect-[16/10] rounded-lg overflow-hidden bg-[#30231B] border border-[#E8DCC8]/15 group">
              <img 
                src={suite.heroImage} 
                alt={suite.title} 
                width={1200}
                height={750}
                loading="lazy"
                className="w-full h-full object-cover brightness-[0.9] transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#241A14]/70 via-transparent to-transparent pointer-events-none" />

              {/* Minimalist Floating Corner Spec */}
              <div className="absolute bottom-4 left-4 bg-[#241A14]/90 backdrop-blur-md px-3.5 py-1.5 rounded border border-[#E8DCC8]/15">
                <span className="text-[10px] font-mono text-[#C6A75E] uppercase tracking-widest block">
                  {suite.badge}
                </span>
              </div>
            </div>

            {/* Right: Architectural Monograph Editorial Column */}
            <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-[#C6A75E] uppercase tracking-widest font-semibold">
                    SUITE {suite.number} · {suite.label}
                  </span>
                </div>

                <h3 className="font-display text-2xl sm:text-4xl text-[#F5EFEB] font-normal tracking-tight">
                  {suite.title}
                </h3>

                <p className="font-display text-base text-[#C6A75E] italic">
                  {suite.subtitle}
                </p>

                <p className="font-body text-xs sm:text-sm text-[#E8DCC8]/80 leading-relaxed font-light">
                  {suite.description}
                </p>
              </div>

              {/* Poliform Minimalist Specification Table */}
              <div className="divide-y divide-[#E8DCC8]/15 border-t border-b border-[#E8DCC8]/15 text-xs font-mono py-2">
                <div className="py-2.5 flex items-center justify-between">
                  <span className="text-[#E8DCC8]/50 uppercase text-[10px] tracking-wider">Timber Heartwood</span>
                  <span className="text-[#F5EFEB] font-medium text-right">{suite.timber}</span>
                </div>
                <div className="py-2.5 flex items-center justify-between">
                  <span className="text-[#E8DCC8]/50 uppercase text-[10px] tracking-wider">Dimensions</span>
                  <span className="text-[#F5EFEB] font-medium text-right">{suite.dimensions}</span>
                </div>
                <div className="py-2.5 flex items-center justify-between">
                  <span className="text-[#E8DCC8]/50 uppercase text-[10px] tracking-wider">Upholstery & Finish</span>
                  <span className="text-[#F5EFEB] font-medium text-right truncate max-w-[200px]">{suite.upholstery}</span>
                </div>
                <div className="py-2.5 flex items-center justify-between">
                  <span className="text-[#E8DCC8]/50 uppercase text-[10px] tracking-wider">Atelier Lead Time</span>
                  <span className="text-[#C6A75E] font-medium text-right">{suite.timeline}</span>
                </div>
              </div>

              {/* Minimalist Actions */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    addItem({
                      id: `suite-${suite.id}`,
                      title: suite.title,
                      category: suite.label,
                      wood: suite.timber,
                      finish: suite.upholstery,
                      dimensions: suite.dimensions,
                      priceDisplay: 'Valuation on Consultation',
                      image: suite.heroImage,
                    });
                  }}
                  className="px-6 py-3.5 rounded-full bg-[#C6A75E] hover:bg-[#D4B975] text-[#241A14] font-mono text-xs uppercase tracking-wider font-bold transition-colors duration-300 shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Add Suite to Tray</span>
                </button>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-6 py-3.5 rounded-full border border-[#C6A75E]/40 hover:border-[#C6A75E] text-[#C6A75E] hover:bg-[#C6A75E]/10 font-mono text-xs uppercase tracking-wider font-semibold transition-colors duration-300 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Inquire WhatsApp</span>
                  <span>↗</span>
                </a>

                <a
                  href={`/collections/${suiteCategoryMap[suite.id] || 'living-room'}`}
                  className="px-6 py-3.5 rounded-full border border-[#E8DCC8]/25 hover:border-[#C6A75E] text-[#E8DCC8] hover:text-[#C6A75E] font-mono text-xs uppercase tracking-wider transition-[color,border-color] duration-300 flex items-center justify-center gap-2 text-center"
                >
                  <span>Explore 4-Piece Suite</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}
