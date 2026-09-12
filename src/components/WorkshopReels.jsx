import React, { useState } from 'react';
import { Play, Sparkles, X, Eye, Clock, ShieldCheck, ArrowUpRight } from 'lucide-react';
import { getWhatsAppInquiryUrl } from '../utils/whatsapp';

const REELS = [
  {
    id: 'moisture-calibration',
    title: 'Moisture Calibration & Kiln Seasoning',
    category: 'TIMBER INTEGRITY',
    tag: '8.5% Moisture Standard',
    duration: '0:34',
    views: '18.4K',
    image: '/images/timber-macro.jpg',
    specs: 'Calibrated under heat-vacuum chambers to stabilize against tropical humidity and warping.',
    badge: 'Step 01 / Science',
  },
  {
    id: 'hand-plane-shaving',
    title: 'Artisan Hand-Planing of Burma Teak',
    category: 'SURFACE REFINEMENT',
    tag: 'Japanese Kanna Technique',
    duration: '0:42',
    views: '24.1K',
    image: '/images/hero-craftsmanship.jpg',
    specs: 'Hand-pulled shavings reveal natural teak silica oils for an unmatched natural water-repellent sheen.',
    badge: 'Step 02 / Handcraft',
  },
  {
    id: 'mortise-tenon-joinery',
    title: 'Precision Mortise & Tenon Interlock',
    category: 'STRUCTURAL JOINERY',
    tag: 'Zero Visible Fasteners',
    duration: '0:29',
    views: '31.2K',
    image: '/images/hero-dining.jpg',
    specs: 'Engineered interlocking wooden tongues withstand >650 kg tensile load without metal screws.',
    badge: 'Step 03 / Engineering',
  },
  {
    id: 'italian-satin-buffing',
    title: '5-Stage Italian Polyurethane Lacquer',
    category: 'FINISHING LABORATORY',
    tag: 'Hand-Rubbed Satin Luster',
    duration: '0:48',
    views: '15.9K',
    image: '/images/hero-living.jpg',
    specs: 'Multi-layer micro-buffing protects against hot tea spills, alcohol, and scratches while preserving tactile grain.',
    badge: 'Step 04 / Chemistry',
  },
  {
    id: 'white-glove-installation',
    title: 'White-Glove Architectural Placement',
    category: 'PRIVATE RESIDENCE',
    tag: 'In-Room Alignment & Leveling',
    duration: '0:38',
    views: '29.7K',
    image: '/images/storefront-living.jpg',
    specs: 'Master joiners personally position, balance on laser levels, and inspect each bespoke suite.',
    badge: 'Step 05 / Delivery',
  },
];

export default function WorkshopReels() {
  const [activeReel, setActiveReel] = useState(null);

  return (
    <section 
      id="workshop-reels"
      aria-label="Craftsmanship in Motion"
      className="py-24 lg:py-32 bg-[#1A1009] text-[#F5EFEB] relative overflow-hidden border-t border-[#C6A75E]/20 font-body"
    >
      {/* Ambient Backlight Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#C6A75E]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* Editorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#C6A75E]/15">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#C6A75E] font-semibold">
                04 / CRAFT IN MOTION · REELS
              </span>
              <span className="w-12 h-px bg-[#C6A75E]/40" />
            </div>
            <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl text-[#F5EFEB] font-normal tracking-tight">
              Watch The Woodcraft <br />
              <span className="italic text-[#E8DCC8] font-light">From Timber Log To Heirloom.</span>
            </h2>
          </div>

          <div className="max-w-md space-y-2 text-xs sm:text-sm font-light text-[#E8DCC8]/70 leading-relaxed">
            <p>
              True luxury furniture cannot hide behind renderings. Inspect the authentic physical craft: raw sawmill seasoning, chisel joinery, and hand-rubbed Italian finishes.
            </p>
            <div className="flex items-center gap-2 pt-1 font-mono text-[11px] text-[#C6A75E]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Tap any reel to inspect technical joinery notes</span>
            </div>
          </div>
        </div>

        {/* 9:16 Vertical Reels Feed (Scrollable Horizontal Carousel) */}
        <div className="flex items-stretch gap-5 sm:gap-6 overflow-x-auto pb-6 pt-2 scrollbar-none snap-x snap-mandatory">
          {REELS.map((reel) => (
            <div
              key={reel.id}
              onClick={() => setActiveReel(reel)}
              className="relative w-[260px] sm:w-[290px] aspect-[9/16] shrink-0 rounded-2xl overflow-hidden border border-[#C6A75E]/20 bg-[#241A14] group cursor-pointer hover:border-[#C6A75E]/60 transition-all duration-500 shadow-2xl hover:shadow-[0_10px_35px_rgba(198,167,94,0.2)] snap-start flex flex-col justify-between p-5 select-none"
            >
              {/* Background Media Poster */}
              <img
                src={reel.image}
                alt={reel.title}
                className="absolute inset-0 w-full h-full object-cover brightness-[0.72] group-hover:scale-105 group-hover:brightness-[0.82] transition-all duration-700 pointer-events-none"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#140B04] via-[#140B04]/30 to-black/60 pointer-events-none" />

              {/* Top Row: Micro Badges */}
              <div className="relative z-10 flex items-center justify-between gap-2">
                <span className="font-mono text-[9px] uppercase tracking-wider text-[#C6A75E] bg-[#140B04]/80 px-2.5 py-1 rounded-full border border-[#C6A75E]/30 font-semibold backdrop-blur-sm">
                  {reel.badge}
                </span>

                <div className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-full border border-white/10 text-[10px] font-mono text-white/80">
                  <Eye className="w-3 h-3 text-[#C6A75E]" />
                  <span>{reel.views}</span>
                </div>
              </div>

              {/* Center Play Button Overlay */}
              <div className="relative z-10 flex items-center justify-center my-auto">
                <div className="w-14 h-14 rounded-full bg-[#C6A75E]/90 group-hover:bg-[#E5CA85] group-hover:scale-110 text-[#140B04] flex items-center justify-center shadow-xl transition-all duration-300 border border-[#FAF3E8]/40">
                  <Play className="w-5 h-5 ml-1 fill-current" />
                </div>
              </div>

              {/* Bottom Card Copy */}
              <div className="relative z-10 space-y-2">
                <div className="flex items-center gap-2 text-[10px] font-mono text-[#E5CA85]">
                  <Clock className="w-3 h-3" />
                  <span>{reel.duration}</span>
                  <span>·</span>
                  <span className="truncate">{reel.tag}</span>
                </div>

                <h3 className="font-display text-base text-[#FAF3E8] group-hover:text-[#C6A75E] transition-colors leading-snug line-clamp-2">
                  {reel.title}
                </h3>

                <p className="text-[11px] text-[#E8DCC8]/70 line-clamp-2 font-light leading-relaxed">
                  {reel.specs}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* 3D Blueprint & WhatsApp Objections Hook Banner */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[#24170E] border border-[#C6A75E]/25 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="flex items-center gap-4 text-left">
            <div className="w-12 h-12 rounded-xl bg-[#C6A75E]/15 border border-[#C6A75E]/30 flex items-center justify-center text-[#C6A75E] shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h4 className="font-display text-lg text-white">
                Have a Custom Architectural Floorplan or Room Sketch?
              </h4>
              <p className="text-xs sm:text-sm text-[#D8C7B0] font-light">
                Send your room measurements or CAD drawings to our master joiners on WhatsApp. We generate photorealistic 3D spatial renders in 24–48 hours free of charge.
              </p>
            </div>
          </div>

          <a
            href={getWhatsAppInquiryUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 px-5 py-3 rounded-full bg-[#C6A75E] hover:bg-[#D4B66E] text-[#140B04] font-mono text-xs uppercase tracking-wider font-bold transition-all shadow-md flex items-center gap-2 cursor-pointer hover:scale-[1.02]"
          >
            <span>Request Free 3D Blueprint</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

      </div>

      {/* Interactive Reel Detail Modal */}
      {activeReel && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in"
          onClick={() => setActiveReel(null)}
        >
          <div
            className="relative w-full max-w-lg bg-[#241A14] border border-[#C6A75E]/40 rounded-3xl overflow-hidden shadow-2xl text-[#F5EFEB] p-6 sm:p-8 space-y-6"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveReel(null)}
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/10 hover:bg-[#C6A75E] hover:text-black flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Visual Reel Card Preview */}
            <div className="relative aspect-[16/10] rounded-2xl overflow-hidden border border-[#C6A75E]/20">
              <img
                src={activeReel.image}
                alt={activeReel.title}
                className="w-full h-full object-cover brightness-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4">
                <span className="font-mono text-xs text-[#C6A75E] bg-black/60 px-3 py-1 rounded-full border border-[#C6A75E]/30">
                  {activeReel.tag} · {activeReel.duration}
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <span className="font-mono text-[10px] text-[#C6A75E] uppercase tracking-widest block font-bold">
                {activeReel.category} · {activeReel.badge}
              </span>
              <h3 className="font-display text-2xl text-[#FAF3E8]">
                {activeReel.title}
              </h3>
              <p className="text-sm text-[#E8DCC8]/80 leading-relaxed font-light">
                {activeReel.specs}
              </p>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3">
              <a
                href={getWhatsAppInquiryUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3.5 rounded-full bg-[#C6A75E] hover:bg-[#E5CA85] text-[#140B04] font-mono text-xs uppercase tracking-wider font-bold transition-all text-center"
              >
                Inquire With Atelier Joiners ↗
              </a>
              <button
                onClick={() => setActiveReel(null)}
                className="px-5 py-3.5 rounded-full border border-white/20 text-white/80 hover:text-white font-mono text-xs uppercase tracking-wider transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
