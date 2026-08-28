import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { MILESTONES } from '../data/company';

export default function Timeline() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 bg-surface" id="timeline">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-xs tracking-[0.3em] text-gold uppercase">Our Journey</span>
          <h2 className="mt-3 font-display text-4xl text-ivory">A Legacy of Craftsmanship</h2>
        </div>

        <div className="relative" ref={ref}>
          {/* Connecting line */}
          <div className="hidden md:block absolute top-[45px] left-0 right-0 h-px bg-gold/30" />
          
          <div className="flex overflow-x-auto md:grid md:grid-cols-5 gap-8 pb-8 md:pb-0 hide-scrollbar">
            {MILESTONES?.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex-shrink-0 w-64 md:w-auto flex flex-col items-center text-center relative"
              >
                {/* Milestone Node */}
                <div className="w-3 h-3 rounded-full bg-gold mb-6 relative z-10 shadow-[0_0_10px_rgba(197,168,128,0.5)]" />
                
                <h3 className="text-3xl font-display text-gold mb-2">{milestone.year}</h3>
                <h4 className="font-semibold text-ivory mb-2">{milestone.title}</h4>
                <p className="text-sm text-ivory-muted leading-relaxed">
                  {milestone.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
