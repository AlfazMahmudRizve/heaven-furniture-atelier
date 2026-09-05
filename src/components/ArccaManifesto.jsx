import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Award } from 'lucide-react';
import { COMPANY } from '../data/company';

export default function ArccaManifesto() {
  const [activeSpec, setActiveSpec] = useState('teak');

  const specs = [
    {
      id: 'teak',
      num: '01',
      title: '100% Solid Burma Teak Wood',
      subtitle: 'বার্মা সেগুন কাঠের বিশুদ্ধতা',
      desc: 'Cut from mature Burma Teak logs. The wood naturally contains rich essential oils that protect it permanently from Chattogram\'s humid coastal air, rot, and termites.',
      metric: '8.5% Seasoned',
      image: '/images/timber-macro.jpg',
    },
    {
      id: 'joinery',
      num: '02',
      title: 'Zero-Nail Wood Locking Joints',
      subtitle: 'প্রথাগত ইন্টারলকিং কাঠের কারুকার্য',
      desc: 'Carved wood that locks directly into wood, held tight with solid wood pegs. Zero metal screws to rust or loosen over time, and zero squeaking.',
      metric: '650 kg Load Test',
      image: '/images/joinery-mortise.jpg',
    },
    {
      id: 'cushion',
      num: '03',
      title: 'Comfort Foam & Belgian Velvet',
      subtitle: 'বেলজিয়ান ভেলভেট ও এরগনোমিক ফোম',
      desc: 'High-density memory foam that keeps its shape for decades, wrapped in soft Belgian velvet with heavy-duty steel spring support.',
      metric: '100,000 Rub Tested',
      image: '/images/cushion-velvet.jpg',
    },
    {
      id: 'warranty',
      num: '04',
      title: 'Lifetime Guarantee & Servicing',
      subtitle: 'আজীবন সত্যতা ও সার্ভিসিং সনদ',
      desc: 'Every piece comes with an official guarantee card from our Agrabad workshop. We provide free periodic wood care and polishing for homes in Chattogram.',
      metric: '80+ Year Lifespan',
      image: '/images/warranty-handover.jpg',
    },
  ];

  const activeItem = specs.find(s => s.id === activeSpec) || specs[0];

  return (
    <section id="manifesto" className="relative bg-[#F5EFEB] text-[#241A14] py-24 lg:py-32 px-6 lg:px-14 border-t border-[#241A14]/10 overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-8 border-b border-[#241A14]/10">
          <div className="max-w-2xl space-y-3">
            <div className="flex items-center gap-3">
              <span className="font-mono text-[11px] text-[#8F753A] uppercase tracking-[0.35em] block font-semibold">
                03 / HOW WE BUILD · OUR STANDARDS
              </span>
              <span className="font-mono text-[9px] px-2.5 py-0.5 rounded-full bg-[#C6A75E]/20 text-[#8F753A] uppercase tracking-wider font-bold">
                100% Solid Wood
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl text-[#241A14] tracking-tight font-light leading-tight">
              Real Wood Furniture. <br />
              <span className="italic font-normal text-[#6B5344]">Made to Last</span> Generations.
            </h2>
          </div>

          <p className="font-body text-sm sm:text-base text-[#241A14]/80 max-w-md font-light leading-relaxed">
            While most modern furniture is made from cheap particle boards that bend and rot after a few rainy seasons, Heaven Furniture Mart builds with seasoned Burma Teak that you can pass down to your children.
          </p>
        </div>

        {/* Asymmetric Monograph Spread */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Photo with Dynamic Focus */}
          <div className="lg:col-span-5 space-y-6">
            <div className="relative aspect-[4/5] rounded-lg overflow-hidden bg-[#E8DCC8] border border-[#241A14]/15 shadow-md">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeItem.id}
                  src={activeItem.image}
                  alt={activeItem.title}
                  width={800}
                  height={1000}
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                  className="w-full h-full object-cover brightness-[0.98] contrast-[1.03]"
                />
              </AnimatePresence>

              {/* Floating Photo Pill */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded border border-[#241A14]/10 shadow-lg flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#8F753A] block font-semibold">
                    {activeItem.num} · Wood Specification
                  </span>
                  <span className="font-display text-sm text-[#241A14] font-medium">
                    {activeItem.title}
                  </span>
                </div>
                <span className="text-[10px] font-mono px-2.5 py-1 rounded bg-[#C6A75E]/20 text-[#8F753A] font-bold">
                  {activeItem.metric}
                </span>
              </div>
            </div>

            {/* Quote */}
            <div className="p-6 rounded-lg bg-[#E8DCC8]/60 border-l-2 border-[#C6A75E] space-y-2">
              <p className="font-display text-base text-[#241A14] italic leading-relaxed">
                “When seasoned properly down to 8.5% moisture, Burma Teak will never bend, crack, or rot in Chattogram's weather. It stays solid for generations.”
              </p>
              <span className="text-[10px] font-mono text-[#241A14]/60 uppercase tracking-widest block font-medium">
                — Master Woodworker, Heaven Furniture Mart Agrabad Workshop
              </span>
            </div>
          </div>

          {/* Right Column: 4 Minimalist Editorial Architectural Rows */}
          <div className="lg:col-span-7 flex flex-col divide-y divide-[#241A14]/10">
            {specs.map((item) => {
              const isActive = activeSpec === item.id;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveSpec(item.id)}
                  className={`py-6 sm:py-8 w-full text-left cursor-pointer transition-opacity duration-300 group ${
                    isActive ? 'opacity-100' : 'opacity-70 hover:opacity-100'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4 sm:gap-6">
                      <span className={`font-mono text-sm sm:text-base transition-colors ${
                        isActive ? 'text-[#8F753A] font-bold' : 'text-[#241A14]/40'
                      }`}>
                        {item.num}
                      </span>
                      
                      <div className="space-y-1">
                        <h3 className={`font-display text-xl sm:text-2xl transition-colors ${
                          isActive ? 'text-[#241A14] font-semibold' : 'text-[#241A14]/80 font-normal'
                        }`}>
                          {item.title}
                        </h3>
                        <span className="text-[11px] font-mono text-[#8F753A] block font-medium">
                          {item.subtitle}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="hidden sm:inline-block text-[10px] font-mono px-3 py-1 rounded-full border border-[#241A14]/15 bg-white/60 text-[#241A14]/80">
                        {item.metric}
                      </span>
                      <ChevronRight className={`w-4 h-4 text-[#8F753A] transition-transform duration-300 ${
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
                        <p className="font-body text-xs sm:text-sm text-[#241A14]/85 leading-relaxed max-w-xl font-normal">
                          {item.desc}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              );
            })}
          </div>

        </div>

        {/* Founder & Leadership Monograph */}
        <div className="pt-16 border-t border-[#241A14]/10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-4 space-y-2">
            <span className="text-[10px] font-mono text-[#8F753A] uppercase tracking-[0.3em] block font-bold">
              FOUNDER'S STATEMENT · প্রতিষ্ঠাতা বার্তা
            </span>
            <h3 className="font-display text-2xl lg:text-3xl text-[#241A14] font-normal">
              {COMPANY.founder}
            </h3>
            <p className="text-xs font-mono text-[#8F753A] font-semibold">
              {COMPANY.founderTitle} · Heaven Furniture Mart
            </p>
          </div>

          <div className="lg:col-span-8 space-y-6">
            <blockquote className="font-display text-lg sm:text-xl lg:text-2xl text-[#241A14] italic font-light leading-relaxed border-l-2 border-[#C6A75E] pl-6">
              &ldquo;{COMPANY.founderQuote}&rdquo;
            </blockquote>

            <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-[#241A14]/85 pt-2">
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/85 border border-[#241A14]/10 shadow-sm">
                <Award className="w-3.5 h-3.5 text-[#8F753A]" />
                <span>Member, Chattogram Chamber of Commerce</span>
              </div>
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/85 border border-[#241A14]/10 shadow-sm">
                <Award className="w-3.5 h-3.5 text-[#8F753A]" />
                <span>BFIOA Nationwide Recognition</span>
              </div>
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/85 border border-[#241A14]/10 shadow-sm">
                <span className="text-[#8F753A] font-bold">EST. 2020</span>
                <span>Agrabad Access Road Showroom</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
