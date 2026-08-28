import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Award } from 'lucide-react';
import { COMPANY, CRAFTSMANSHIP_STEPS } from '../data/company';

const CraftCard = ({ step, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="bg-surface border border-gold/10 rounded-xl overflow-hidden flex flex-col md:flex-row gap-6 p-6 mb-8 relative"
    >
      <div className="absolute top-4 right-6 text-6xl font-display text-gold/20 font-bold">
        {String(index + 1).padStart(2, '0')}
      </div>
      <div className="w-full md:w-1/3 aspect-square bg-obsidian rounded-lg overflow-hidden shrink-0">
        <img 
          src={step.image} 
          alt={step.title}
          className="w-full h-full object-cover opacity-80 mix-blend-luminosity hover:mix-blend-normal transition-all duration-500"
        />
      </div>
      <div className="flex-1 flex flex-col justify-center mt-4 md:mt-0 relative z-10">
        <h3 className="text-xl font-display text-ivory mb-3">{step.title}</h3>
        <p className="text-ivory-muted text-sm leading-relaxed">{step.description}</p>
      </div>
    </motion.div>
  );
};

export default function Manifesto() {
  return (
    <section className="bg-obsidian py-24 md:py-32 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16 md:gap-24 relative">
        
        {/* Left Column - Sticky on Desktop */}
        <div className="w-full md:w-[45%] md:sticky md:top-24 h-max">
          <div className="mb-4">
            <span className="text-xs tracking-[0.3em] text-gold uppercase">The Atelier</span>
          </div>
          
          <blockquote className="mt-8 mb-10">
            <p className="font-display text-2xl md:text-3xl italic text-ivory leading-relaxed">
              "{COMPANY.founderQuote}"
            </p>
          </blockquote>
          
          <div className="mb-12">
            <p className="text-lg text-ivory font-semibold">— Abul Kalam Bhuiyan</p>
            <p className="text-ivory-muted text-sm uppercase tracking-wider mt-1">Managing Director</p>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center gap-4 bg-surface p-4 rounded-lg border border-gold/10">
              <Award className="text-gold w-6 h-6 shrink-0" />
              <span className="text-sm text-ivory-muted">Member, Chattogram Chamber of Commerce</span>
            </div>
            <div className="flex items-center gap-4 bg-surface p-4 rounded-lg border border-gold/10">
              <Award className="text-gold w-6 h-6 shrink-0" />
              <span className="text-sm text-ivory-muted">2026 BFIOA Nationwide Recognition</span>
            </div>
          </div>
        </div>

        {/* Right Column - Scrolling */}
        <div className="w-full md:w-[55%]">
          <div className="mb-12">
            <span className="text-xs tracking-[0.3em] text-gold uppercase">Craftsmanship</span>
          </div>
          
          <div className="space-y-8">
            {CRAFTSMANSHIP_STEPS.map((step, index) => (
              <CraftCard key={step.id || index} step={step} index={index} />
            ))}
          </div>
        </div>
        
      </div>
    </section>
  );
}
