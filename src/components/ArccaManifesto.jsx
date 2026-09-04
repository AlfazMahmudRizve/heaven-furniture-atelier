import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

export default function ArccaManifesto() {
  const [activeSpec, setActiveSpec] = useState('teak');

  const specs = [
    {
      id: 'teak',
      num: '01',
      title: '100% Solid Burma Teak Heartwood',
      subtitle: 'বার্মা সেগুন কাঠের বিশুদ্ধতা',
      desc: 'Quarter-sawn from mature, seasoned border timber logs. Dense natural silica and essential oils provide lifelong immunity against Chattogram coastal humidity, dry rot, and wood-boring insects.',
      metric: '8.5% Kiln Seasoned',
      image: '/images/timber-macro.jpg',
    },
    {
      id: 'joinery',
      num: '02',
      title: 'Zero-Nail Mortise & Tenon Joinery',
      subtitle: 'প্রথাগত ইন্টারলকিং কাঠের কারুকার্য',
      desc: 'Male-and-female wood joints carved with 0.1mm tolerance, locked with seasoned hardwood dowels. Absorbs seismic and seasonal structural expansion without splitting or squeaking.',
      metric: '650 kg Dynamic Load',
      image: '/images/hero-living-exploded.jpg',
    },
    {
      id: 'cushion',
      num: '03',
      title: '45D High-Resilience Core & Velvet',
      subtitle: 'বেলজিয়ান ভেলভেট ও এরগনোমিক ফোম',
      desc: '45-density memory foam core wrapped in sanitized down feather topper and hand-tufted Belgian ivory velvet with heavy-gauge pocketed coil suspension.',
      metric: '100,000 Rub Martindale',
      image: '/images/hero-living.jpg',
    },
    {
      id: 'warranty',
      num: '04',
      title: 'Generational Handover Protocol',
      subtitle: 'আজীবন সত্যতা ও সংস্কার সনদ',
      desc: 'Accompanied by an embossed authenticity certificate from our Agrabad kiln and atelier with complimentary bi-annual structural conditioning for coastal residences.',
      metric: '80+ Year Life Expectancy',
      image: '/images/hero-bedroom.jpg',
    },
  ];

  const activeItem = specs.find(s => s.id === activeSpec) || specs[0];

  return (
    <section id="manifesto" className="relative bg-[#160F0A] py-24 lg:py-32 px-6 lg:px-14 border-t border-[#E8DCC8]/15 overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Editorial Section Header (Poliform Architectural Monograph) */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-8 border-b border-[#E8DCC8]/15">
          <div className="max-w-2xl space-y-3">
            <span className="font-mono text-[11px] text-[#C6A75E] uppercase tracking-[0.35em] block">
              02 / PHILOSOPHY & PROVENANCE
            </span>
            <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl text-[#F5EFEB] tracking-tight font-light leading-tight">
              The Architecture of <br />
              <span className="italic font-normal text-[#E8DCC8]">Permanence</span> & Pure Wood.
            </h2>
          </div>

          <p className="font-body text-sm sm:text-base text-[#E8DCC8]/80 max-w-md font-light leading-relaxed">
            In an era of disposable flat-pack furniture, Heaven Atelier crafts interior architecture built from century-old Burma Teak heartwood designed to outlast human generations.
          </p>
        </div>

        {/* Poliform Asymmetric Editorial Monograph Spread */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Architectural Photo with Dynamic Focus */}
          <div className="lg:col-span-5 space-y-6">
            <div className="relative aspect-[4/5] rounded-lg overflow-hidden bg-[#23180F] border border-[#E8DCC8]/15">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeItem.id}
                  src={activeItem.image}
                  alt={activeItem.title}
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                  className="w-full h-full object-cover brightness-[0.9] contrast-[1.05]"
                />
              </AnimatePresence>

              {/* Minimalist Floating Photo Pill */}
              <div className="absolute bottom-4 left-4 right-4 bg-[#160F0A]/90 backdrop-blur-md p-4 rounded border border-[#E8DCC8]/15 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#C6A75E] block">
                    {activeItem.num} · Architectural Spec
                  </span>
                  <span className="font-display text-sm text-[#F5EFEB] font-medium">
                    {activeItem.title}
                  </span>
                </div>
                <span className="text-[10px] font-mono px-2.5 py-1 rounded bg-[#C6A75E]/20 text-[#C6A75E] font-bold">
                  {activeItem.metric}
                </span>
              </div>
            </div>

            {/* Editorial Thesis Quote */}
            <div className="p-6 rounded-lg bg-[#23180F]/40 border-l-2 border-[#C6A75E] space-y-2">
              <p className="font-display text-base text-[#E8DCC8] italic leading-relaxed">
                “Wood is living architecture. When dried to 8.5% equilibrium moisture, seasoned Burma Teak stops breathing coastal salt and becomes immortal.”
              </p>
              <span className="text-[10px] font-mono text-[#E8DCC8]/50 uppercase tracking-widest block">
                — Chattogram Atelier Master Joiner Protocol
              </span>
            </div>
          </div>

          {/* Right Column: 4 Minimalist Editorial Architectural Rows */}
          <div className="lg:col-span-7 flex flex-col divide-y divide-[#E8DCC8]/15">
            {specs.map((item) => {
              const isActive = activeSpec === item.id;

              return (
                <div
                  key={item.id}
                  onClick={() => setActiveSpec(item.id)}
                  className={`py-6 sm:py-8 cursor-pointer transition-all duration-300 group ${
                    isActive ? 'opacity-100' : 'opacity-65 hover:opacity-100'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4 sm:gap-6">
                      <span className={`font-mono text-sm sm:text-base transition-colors ${
                        isActive ? 'text-[#C6A75E] font-bold' : 'text-[#E8DCC8]/40'
                      }`}>
                        {item.num}
                      </span>
                      
                      <div className="space-y-1">
                        <h3 className={`font-display text-xl sm:text-2xl transition-colors ${
                          isActive ? 'text-[#F5EFEB] font-normal' : 'text-[#E8DCC8] font-light'
                        }`}>
                          {item.title}
                        </h3>
                        <span className="text-[11px] font-mono text-[#C6A75E] block">
                          {item.subtitle}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="hidden sm:inline-block text-[10px] font-mono px-3 py-1 rounded-full border border-[#E8DCC8]/20 text-[#E8DCC8]/80">
                        {item.metric}
                      </span>
                      <ChevronRight className={`w-4 h-4 text-[#C6A75E] transition-transform duration-300 ${
                        isActive ? 'rotate-90' : 'group-hover:translate-x-1'
                      }`} />
                    </div>
                  </div>

                  {/* Expandable Technical Detail */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.35, ease: 'easeInOut' }}
                        className="overflow-hidden pl-8 sm:pl-12 pt-4"
                      >
                        <p className="font-body text-xs sm:text-sm text-[#E8DCC8]/85 leading-relaxed max-w-xl font-light">
                          {item.desc}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
