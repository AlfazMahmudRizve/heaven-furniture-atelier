import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { COMPANY } from '../data/company';

export default function ArccaManifesto() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10%" });

  return (
    <section 
      id="manifesto" 
      ref={containerRef}
      className="relative bg-linen text-espresso-deep py-24 md:py-32 px-6 md:px-16"
    >
      <motion.div 
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
        className="absolute top-0 left-0 w-full h-px bg-espresso-deep/10 origin-left"
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-7xl mx-auto">
        <div className="flex flex-col items-start">
          <div className="w-6 h-6 border border-espresso-deep rotate-45 mb-6" />
          <motion.h2 
            initial={{ y: 40, opacity: 0, rotateX: 10 }}
            whileInView={{ y: 0, opacity: 1, rotateX: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8 }}
            className="font-display text-3xl md:text-4xl text-espresso-deep leading-tight"
          >
            Design, Craftsmanship, Bespoke Furniture
          </motion.h2>
        </div>

        <div className="flex flex-col items-start">
          <motion.div
             initial="hidden"
             whileInView="visible"
             viewport={{ once: true, margin: "-10%" }}
             variants={{
               hidden: {},
               visible: { transition: { staggerChildren: 0.2 } }
             }}
          >
            <motion.div 
              variants={{
                hidden: { y: 20, opacity: 0 },
                visible: { y: 0, opacity: 1, transition: { duration: 0.6 } }
              }}
              className="font-mono text-[11px] tracking-[0.3em] text-bronze uppercase mb-4"
            >
              PORTFOLIO
            </motion.div>
            
            <motion.p 
              variants={{
                hidden: { y: 20, opacity: 0 },
                visible: { y: 0, opacity: 1, transition: { duration: 0.6 } }
              }}
              className="text-espresso-deep/80 text-base leading-relaxed mb-6"
            >
              We create refined, functional spaces where aesthetics meet purpose. Each piece is a dialogue between form and feeling — crafted with precision, shaped by context, and inspired by timeless design principles.
            </motion.p>
            
            <motion.p 
              variants={{
                hidden: { y: 20, opacity: 0 },
                visible: { y: 0, opacity: 1, transition: { duration: 0.6 } }
              }}
              className="italic text-espresso-deep/60 text-sm leading-relaxed mb-8"
            >
              "{COMPANY.founderQuote}"
            </motion.p>

            <motion.a 
              href="#collections"
              variants={{
                hidden: { y: 20, opacity: 0 },
                visible: { y: 0, opacity: 1, transition: { duration: 0.6 } }
              }}
              className="arcca-btn border-espresso-deep text-espresso-deep hover:bg-espresso-deep hover:text-linen transition-colors duration-300"
            >
              View Collections
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
