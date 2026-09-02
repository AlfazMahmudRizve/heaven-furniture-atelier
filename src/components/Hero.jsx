import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { MessageCircle, ShieldCheck, MapPin, Sparkles } from 'lucide-react';
import { getWhatsAppInquiryUrl } from '../utils/whatsapp';

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
      className="relative min-h-screen overflow-hidden flex flex-col justify-end pb-12 md:pb-20 px-6 md:px-16"
    >
      {/* Background Image with Ken Burns Parallax Zoom */}
      <motion.div 
        style={{ scale }}
        className="absolute inset-0 z-0"
      >
        <img 
          src="/images/hero-living.jpg" 
          alt="Heaven Furniture Mart — Bespoke Handcrafted Burma Teak Furniture in Chattogram"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-espresso via-espresso/50 to-transparent pointer-events-none" />
      </motion.div>

      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-start gap-6 mt-auto">
        
        {/* Editorial Text Reveal */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } }
          }}
          className="max-w-3xl flex flex-col gap-4"
        >
          {/* Tagline & Location Pill */}
          <motion.div 
            variants={{
              hidden: { y: 20, opacity: 0 },
              visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } }
            }}
            className="flex flex-wrap items-center gap-2"
          >
            <span className="font-mono text-[10px] md:text-[11px] text-bronze uppercase tracking-[0.35em] bg-surface/80 px-3 py-1 rounded-full border border-bronze/20 backdrop-blur-md">
              Bespoke Furniture Atelier · Agrabad, Chattogram
            </span>
            <span className="hidden sm:inline-flex items-center gap-1.5 text-[10px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/40 px-3 py-1 rounded-full backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Flagship Open Sat–Thu
            </span>
          </motion.div>
          
          {/* Main H1 Headline: Explicit Craft & Value Proposition */}
          <motion.h1
            variants={{
              hidden: { y: 30, opacity: 0 },
              visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: "easeOut" } }
            }}
            className="font-display text-3xl sm:text-5xl lg:text-6xl text-linen leading-[1.1] tracking-tight"
          >
            Custom Handcrafted Hardwood Furniture & Bespoke Interiors.
          </motion.h1>

          {/* Subheading with Timber Provenance & 30-Second Clarity */}
          <motion.p
            variants={{
              hidden: { y: 20, opacity: 0 },
              visible: { y: 0, opacity: 1, transition: { duration: 0.7, ease: "easeOut" } }
            }}
            className="font-body text-sm sm:text-base lg:text-lg text-linen-muted leading-relaxed max-w-2xl"
          >
            We sculpt heirloom living suites, master beds, and royal dining tables from 100% seasoned Burma Teak (বার্মা সেগুন) and solid Mahogany. Tailored to your home’s exact dimensions — never pulled from a shelf.
          </motion.p>
        </motion.div>

        {/* Primary Conversion CTAs */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto pt-2"
        >
          {/* Primary CTA: WhatsApp Stylist with Pre-populated Spec */}
          <a 
            href={getWhatsAppInquiryUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="arcca-btn bg-bronze text-linen font-mono text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 py-3.5 px-6 shadow-xl hover:bg-bronze-light hover:text-espresso transition-all"
          >
            <MessageCircle className="w-4 h-4 text-emerald-300" />
            <span>Discuss Custom Build on WhatsApp</span>
          </a>

          {/* Secondary CTA: Explore Collections Link */}
          <a 
            href="#collections"
            className="flex items-center justify-center gap-2 text-linen-muted hover:text-linen text-xs font-mono uppercase tracking-widest py-3 px-5 transition-colors"
          >
            <span>Explore Suites</span>
            <svg className="w-4 h-4 text-bronze" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
            </svg>
          </a>
        </motion.div>

        {/* Above-the-Fold Local Trust Triggers Strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-2 pt-4 border-t border-linen/10 w-full text-[10px] sm:text-[11px] font-mono text-linen-muted/80"
        >
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-bronze shrink-0" />
            <span>100% Kiln-Seasoned Teak</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-bronze shrink-0" />
            <span>Agrabad Showroom & Workshop</span>
          </div>
          <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
            <Sparkles className="w-3.5 h-3.5 text-bronze shrink-0" />
            <span>Free 3D Laser Measurement</span>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
