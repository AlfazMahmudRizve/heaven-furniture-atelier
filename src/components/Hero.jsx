import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function Hero() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  return (
    <section 
      id="home"
      ref={containerRef}
      className="relative min-h-screen overflow-hidden flex flex-col justify-end pb-16 md:pb-24 px-6 md:px-16"
    >
      <motion.div 
        style={{ scale }}
        className="absolute inset-0 z-0"
      >
        <img 
          src="/images/hero-living.jpg" 
          alt="Bespoke Living"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-espresso/70 via-espresso/40 to-transparent pointer-events-none" />
      </motion.div>

      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-start gap-8 mt-auto">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } }
          }}
          className="max-w-2xl flex flex-col gap-6"
        >
          <motion.span 
            variants={{
              hidden: { y: 30, opacity: 0 },
              visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: "easeOut" } }
            }}
            className="font-mono text-[11px] text-bronze-light uppercase tracking-[0.3em]"
          >
            Bespoke Furniture Atelier · Chattogram
          </motion.span>
          
          <motion.p
            variants={{
              hidden: { y: 30, opacity: 0 },
              visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: "easeOut" } }
            }}
            className="font-body text-lg md:text-xl lg:text-2xl text-linen leading-relaxed"
          >
            At Heaven Furniture Mart, we craft more than furniture — we shape the essence of living. Our vision is to redefine bespoke craftsmanship by creating heirloom timber pieces that intertwine beauty, well-being, and purposeful design.
          </motion.p>
        </motion.div>

        <motion.a 
          href="#manifesto"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
          className="flex items-center gap-2 text-linen arcca-link cursor-pointer"
        >
          <span>Explore</span>
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
          </svg>
        </motion.a>
      </div>
    </section>
  );
}
