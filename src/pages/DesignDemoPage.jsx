import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, ShieldCheck, Sparkles, MapPin, Phone, MessageCircle } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function DesignDemoPage() {
  const [activeSpec, setActiveSpec] = useState('teak');

  const specs = {
    teak: {
      tag: '[ 100% Solid Burma Teak ]',
      title: 'Direct Border Heartwood Logs',
      desc: 'Sourced from the southern hilltracts and Myanmar frontier. Rich in natural silica and essential oils, offering complete immunity against termites and coastal humidity.',
      metric: '8.5% Kiln-Dried Moisture'
    },
    joinery: {
      tag: '[ Mortise & Tenon Joinery ]',
      title: 'Zero-Nail Interlocking Woodcraft',
      desc: 'Precision carved male-and-female joints secured with seasoned hardwood dowels. Absorbs seismic and seasonal structural expansion without splitting.',
      metric: '650 kg Dynamic Load'
    },
    cushion: {
      tag: '[ 45D High-Resilience Core ]',
      title: 'Belgian Velvet & Pocketed Coils',
      desc: '45-density memory foam core wrapped in sanitized down feather topper and hand-tufted Belgian velvet with heavy-gauge pocketed coil suspension.',
      metric: '100,000 Rub Martindale'
    },
    warranty: {
      tag: '[ Lifetime Structural Warranty ]',
      title: 'Generational Handover Protocol',
      desc: 'Every piece is accompanied by a stamped authenticity certificate from our Agrabad atelier with complimentary bi-annual teak conditioning.',
      metric: '80+ Year Expected Life'
    }
  };

  return (
    <div className="min-h-screen bg-[#141C2E] text-[#E8DCC8] font-body selection:bg-[#C6A75E] selection:text-[#141C2E]">
      <Header />

      <main className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto space-y-12">
        
        {/* ── 60-30-10 PALETTE METRIC BANNER (IMAGE 1 PALETTE) ── */}
        <div className="bg-[#1F2A44] border border-[#C6A75E]/30 rounded-3xl p-6 md:p-8 shadow-2xl space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#C6A75E] animate-pulse"></span>
                <span className="font-mono text-xs text-[#C6A75E] uppercase tracking-[0.25em] font-semibold">
                  60-30-10 Royal Color System · Exact Image 1 Extraction
                </span>
              </div>
              <h1 className="font-display text-2xl md:text-4xl text-[#E8DCC8] tracking-wide mt-1">
                Royal Navy · Warm Beige · Soft Gold
              </h1>
            </div>

            <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
              <span className="px-3.5 py-1.5 rounded-xl bg-[#141C2E] border border-[#C6A75E]/30 text-[#E8DCC8]">
                Navy: <strong className="text-white">#1F2A44</strong> (60%)
              </span>
              <span className="px-3.5 py-1.5 rounded-xl bg-[#E8DCC8] text-[#1F2A44] font-bold">
                Beige: <strong className="text-black">#E8DCC8</strong> (30%)
              </span>
              <span className="px-3.5 py-1.5 rounded-xl bg-[#C6A75E] text-[#141C2E] font-bold">
                Gold: <strong className="text-black">#C6A75E</strong> (10%)
              </span>
            </div>
          </div>

          {/* Color Distribution Bar */}
          <div className="h-6 w-full rounded-xl overflow-hidden flex border border-[#C6A75E]/30 shadow-inner font-mono text-[10px] font-bold">
            <div className="w-[60%] bg-[#1F2A44] flex items-center justify-center text-white border-r border-[#C6A75E]/30">
              60% Dominant Canvas (#1F2A44)
            </div>
            <div className="w-[30%] bg-[#E8DCC8] flex items-center justify-center text-[#1F2A44] border-r border-[#C6A75E]/30">
              30% Warm Beige (#E8DCC8)
            </div>
            <div className="w-[10%] bg-[#C6A75E] flex items-center justify-center text-[#141C2E]">
              10% Soft Gold (#C6A75E)
            </div>
          </div>
        </div>

        {/* ── CARD 1: THE MONOLITHIC ARCHITECTURAL HERO (KANTO CARD 1) ── */}
        <section className="relative w-full rounded-3xl overflow-hidden border border-[#C6A75E]/30 bg-[#1F2A44] shadow-2xl">
          <div className="relative aspect-[16/10] md:aspect-[21/9] w-full overflow-hidden">
            <img 
              src="/images/hero-living.jpg" 
              alt="Heaven Atelier Hero" 
              className="w-full h-full object-cover brightness-[0.85] contrast-[1.05]"
            />
            {/* Ambient cove gradient overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#141C2E] via-[#141C2E]/40 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-[#141C2E]/90 via-[#141C2E]/30 to-transparent"></div>

            {/* Overlaid KANTO-Style Monolithic Typography */}
            <div className="absolute inset-0 p-6 md:p-14 flex flex-col justify-between z-10">
              
              {/* Top Meta Bar */}
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] tracking-[0.35em] text-[#C6A75E] uppercase bg-[#141C2E]/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#C6A75E]/30">
                  ATELIER · ARCHITECTURAL WOODWORK
                </span>
                <span className="hidden sm:inline font-mono text-xs text-[#E8DCC8]/70">
                  Agrabad Access Road, Chattogram
                </span>
              </div>

              {/* Central Logo & Tagline */}
              <div className="max-w-2xl space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 md:w-14 md:h-14 border-2 border-[#C6A75E] rounded-2xl flex items-center justify-center font-display text-2xl md:text-3xl font-bold text-[#E8DCC8] bg-[#1F2A44]/80 backdrop-blur-md shadow-lg">
                    H
                  </div>
                  <h2 className="font-display text-3xl md:text-6xl tracking-[0.2em] text-[#E8DCC8] font-bold">
                    HEAVEN
                  </h2>
                </div>

                <p className="font-body text-sm md:text-base text-[#E8DCC8]/90 font-light tracking-wide max-w-xl leading-relaxed">
                  Bespoke Burma Teak & Red Mahogany heirlooms. Handcrafted with generational joinery for residences you yearn to return to.
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-4">
                  <a
                    href="#explore"
                    className="px-6 py-3.5 rounded-full bg-[#C6A75E] hover:bg-[#E8DCC8] text-[#141C2E] font-mono text-xs uppercase tracking-widest font-bold transition-all shadow-lg cursor-pointer"
                  >
                    Explore Atelier Suites ↗
                  </a>
                  <span className="text-xs font-mono text-[#E8DCC8]/70">
                    100% Kiln-Seasoned Teak · 0% Nails
                  </span>
                </div>
              </div>

              {/* Bottom Architectural Specs */}
              <div className="flex items-center justify-between pt-4 border-t border-[#E8DCC8]/15 text-[11px] font-mono text-[#E8DCC8]/60">
                <span>SUITE 01 — SOVEREIGN RESIDENCE</span>
                <span>BURMA TEAK HEARTWOOD (বার্মা সেগুন)</span>
                <span className="hidden md:inline text-[#C6A75E]">LIFETIME STRUCTURAL WARRANTY</span>
              </div>
            </div>
          </div>
        </section>

        {/* ── CARD 2: THE ARCHITECTURAL SPECIFICATION GRID (KANTO CARD 2) ── */}
        <section id="explore" className="relative w-full rounded-3xl overflow-hidden border border-[#C6A75E]/30 bg-[#1F2A44] shadow-2xl p-6 md:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Left Margin: Vertical Rotated Branding (KANTO Style) */}
            <div className="hidden lg:flex lg:col-span-1 items-center justify-center border-r border-[#E8DCC8]/15 pr-4">
              <div className="flex items-center gap-3">
                <span 
                  className="font-display text-xl tracking-[0.3em] text-[#E8DCC8] font-bold uppercase"
                  style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
                >
                  HEAVEN ATELIER
                </span>
                <div className="w-6 h-6 border border-[#C6A75E] rounded flex items-center justify-center text-[10px] font-bold text-[#C6A75E]">
                  H
                </div>
              </div>
            </div>

            {/* Center: Hairline Modular Grid with Interactive Feature Tags */}
            <div className="lg:col-span-7 relative rounded-2xl overflow-hidden border border-[#E8DCC8]/20 bg-[#141C2E] min-h-[400px] flex flex-col justify-between p-6">
              
              {/* Background with Grid Lines */}
              <div 
                className="absolute inset-0 opacity-30 z-0 bg-cover bg-center"
                style={{ backgroundImage: "url('/images/hero-living.jpg')" }}
              />
              <div 
                className="absolute inset-0 z-0 pointer-events-none"
                style={{
                  backgroundImage: 'linear-gradient(to right, rgba(232, 220, 200, 0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(232, 220, 200, 0.08) 1px, transparent 1px)',
                  backgroundSize: '36px 36px'
                }}
              />

              {/* Top Annotated Pills */}
              <div className="relative z-10 flex flex-wrap gap-2 justify-between items-start">
                <button
                  onClick={() => setActiveSpec('teak')}
                  className={`px-3.5 py-1.5 rounded-full text-[10px] font-mono uppercase tracking-wider transition-all cursor-pointer ${
                    activeSpec === 'teak'
                      ? 'bg-[#C6A75E] text-[#141C2E] font-bold shadow-lg'
                      : 'bg-[#1F2A44]/90 text-[#C6A75E] border border-[#C6A75E]/40'
                  }`}
                >
                  [ 100% Solid Burma Teak ]
                </button>
                <button
                  onClick={() => setActiveSpec('joinery')}
                  className={`px-3.5 py-1.5 rounded-full text-[10px] font-mono uppercase tracking-wider transition-all cursor-pointer ${
                    activeSpec === 'joinery'
                      ? 'bg-[#C6A75E] text-[#141C2E] font-bold shadow-lg'
                      : 'bg-[#1F2A44]/90 text-[#C6A75E] border border-[#C6A75E]/40'
                  }`}
                >
                  [ Mortise & Tenon Joinery ]
                </button>
              </div>

              {/* Center Active Detail Callout */}
              <div className="relative z-10 my-auto py-6">
                <div className="p-5 rounded-2xl bg-[#1F2A44]/95 backdrop-blur-md border border-[#C6A75E]/30 space-y-2 max-w-lg shadow-xl">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#C6A75E] font-semibold">
                      {specs[activeSpec].tag}
                    </span>
                    <span className="text-[10px] font-mono px-2.5 py-1 rounded bg-[#C6A75E]/20 text-[#C6A75E] border border-[#C6A75E]/40">
                      {specs[activeSpec].metric}
                    </span>
                  </div>
                  <h4 className="font-display text-lg text-[#E8DCC8] font-bold">
                    {specs[activeSpec].title}
                  </h4>
                  <p className="text-xs font-body text-[#E8DCC8]/80 leading-relaxed">
                    {specs[activeSpec].desc}
                  </p>
                </div>
              </div>

              {/* Bottom Annotated Pills */}
              <div className="relative z-10 flex flex-wrap gap-2 justify-between items-center text-[10px] font-mono">
                <button
                  onClick={() => setActiveSpec('cushion')}
                  className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
                    activeSpec === 'cushion'
                      ? 'bg-[#C6A75E] text-[#141C2E] font-bold shadow-lg'
                      : 'bg-[#1F2A44]/90 text-[#E8DCC8] border border-[#E8DCC8]/20'
                  }`}
                >
                  [ 45D Memory Foam Core ]
                </button>
                <button
                  onClick={() => setActiveSpec('warranty')}
                  className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
                    activeSpec === 'warranty'
                      ? 'bg-[#C6A75E] text-[#141C2E] font-bold shadow-lg'
                      : 'bg-[#1F2A44]/90 text-[#E8DCC8] border border-[#E8DCC8]/20'
                  }`}
                >
                  [ Lifetime Warranty Protocol ]
                </button>
              </div>

            </div>

            {/* Right Column: Editorial "Why Patrons Trust Us" (KANTO Right Column) */}
            <div className="lg:col-span-4 flex flex-col justify-between space-y-6">
              <div>
                <span className="text-xs font-mono text-[#C6A75E] uppercase tracking-[0.25em] block mb-1">
                  WHO WE ARE · আমাদের পরিচয়
                </span>
                <h3 className="font-display text-2xl md:text-3xl text-[#E8DCC8] font-bold tracking-tight">
                  Why Discerning Families Choose Us?
                </h3>
                <p className="text-xs font-body text-[#E8DCC8]/80 leading-relaxed mt-3">
                  We are master woodcrafters and interior architects sculpting generational furniture across Chattogram and Dhaka. From raw timber log selection to white-glove installation.
                </p>
              </div>

              {/* Bulleted Capabilities */}
              <div className="space-y-3 font-mono text-xs text-[#E8DCC8]">
                <div className="flex items-start gap-2.5">
                  <span className="text-[#C6A75E] font-bold mt-0.5">✦</span>
                  <span>Direct heartwood logs sourced from Burma border</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="text-[#C6A75E] font-bold mt-0.5">✦</span>
                  <span>Traditional Bengali interlocking joints without screws</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="text-[#C6A75E] font-bold mt-0.5">✦</span>
                  <span>Weekly WhatsApp milestone proof videos for patrons</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="text-[#C6A75E] font-bold mt-0.5">✦</span>
                  <span>60% balance payable only after in-home inspection</span>
                </div>
              </div>

              {/* Bottom Action */}
              <div className="pt-4 border-t border-[#E8DCC8]/15 flex items-center justify-between">
                <span className="text-xs font-mono text-[#C6A75E]">Agrabad Flagship Showroom</span>
                <a href="#bespoke" className="text-xs font-mono text-[#E8DCC8] underline hover:text-[#C6A75E] transition-colors">
                  Schedule Visit →
                </a>
              </div>
            </div>

          </div>
        </section>

        {/* ── CARD 3: ASYMMETRIC ATELIER GALLERY (KANTO CARD 3) ── */}
        <section className="relative w-full rounded-3xl overflow-hidden border border-[#C6A75E]/30 bg-[#1F2A44] shadow-2xl p-6 md:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            
            {/* Left Vertical Label */}
            <div className="hidden lg:flex lg:col-span-1 items-center justify-center border-r border-[#E8DCC8]/15 pr-4">
              <span 
                className="font-display text-xl tracking-[0.3em] text-[#E8DCC8] font-bold uppercase"
                style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
              >
                MASTER JOINERY
              </span>
            </div>

            {/* Center Large Living Hero Image */}
            <div className="lg:col-span-7 relative aspect-[4/3] rounded-2xl overflow-hidden border border-[#E8DCC8]/20 shadow-xl group">
              <img 
                src="/images/hero-living.jpg" 
                alt="Atelier Living Space" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute bottom-4 left-4 bg-[#141C2E]/85 backdrop-blur-md px-4 py-2.5 rounded-xl border border-[#C6A75E]/30">
                <span className="font-display text-sm font-bold text-[#E8DCC8] block">Imperial Sovereign Suite</span>
                <span className="font-mono text-[10px] text-[#C6A75E] block">Installed at Nasirabad Villa, Chattogram</span>
              </div>
            </div>

            {/* Right Stacked Asymmetric Tiles */}
            <div className="lg:col-span-4 flex flex-col justify-between gap-6">
              
              {/* Tile 1: Macro Wood Grain */}
              <div className="relative aspect-[16/9] lg:aspect-auto lg:h-1/2 rounded-2xl overflow-hidden border border-[#E8DCC8]/20 shadow-lg group">
                <img 
                  src="/images/timber-macro.jpg" 
                  alt="Teak Macro Grain" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-3 right-3 bg-[#141C2E]/90 backdrop-blur-md px-2.5 py-1 rounded text-[9px] font-mono text-[#C6A75E] uppercase">
                  Burma Teak Grain (8X)
                </div>
                <div className="absolute bottom-3 left-3 text-[11px] font-mono text-[#E8DCC8] bg-[#1F2A44]/85 px-3 py-1 rounded-md border border-[#C6A75E]/20">
                  Natural Silica & Teak Oils
                </div>
              </div>

              {/* Tile 2: Exploded CAD Joinery */}
              <div className="relative aspect-[16/9] lg:aspect-auto lg:h-1/2 rounded-2xl overflow-hidden border border-[#E8DCC8]/20 shadow-lg group">
                <img 
                  src="/images/hero-living-exploded.jpg" 
                  alt="Exploded Joinery" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-3 right-3 bg-[#141C2E]/90 backdrop-blur-md px-2.5 py-1 rounded text-[9px] font-mono text-[#C6A75E] uppercase">
                  Zero-Nail Framework
                </div>
                <div className="absolute bottom-3 left-3 text-[11px] font-mono text-[#E8DCC8] bg-[#1F2A44]/85 px-3 py-1 rounded-md border border-[#C6A75E]/20">
                  Blind Mortise & Tenon Joint
                </div>
              </div>

            </div>

          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
