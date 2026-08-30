import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll } from 'framer-motion';
import { 
  Sparkles, 
  MessageCircle, 
  ShieldCheck, 
  ChevronDown 
} from 'lucide-react';
import { buildProductWhatsAppUrl } from '../utils/whatsapp';

const FLOATING_PRODUCTS = [
  {
    id: 'living',
    number: '01',
    category: 'LIVING ROOM ATELIER',
    name: 'Sovereign Burma Teak Sectional',
    tagline: 'FURNITURE, CRAFTED AROUND YOU.',
    description: "Chattogram's premier bespoke curved sectional. Hand-sculpted from solid seasoned Burma Teak heartwood with Belgian ivory velvet and 45D ergonomic memory foam.",
    timber: 'Solid Burma Teak (বার্মা সেগুন)',
    upholstery: 'Belgian Velvet & 45D Foam',
    dimensions: '3200mm W × 1950mm D × 780mm H',
    timeline: 'Crafted in 14–21 Days',
    image: '/images/floating-sofa.jpg',
    layout: 'text-left', // Product on RIGHT, Text on LEFT
    badge: '100% Solid Heartwood Timber',
    // Environment Atmosphere Shade
    theme: {
      bgGradient: 'radial-gradient(ellipse at top right, #121F24 0%, #081215 50%, #03080A 100%)',
      spotlightColor: 'rgba(197, 160, 115, 0.22)',
      ambientPill: 'border-amber-500/30 bg-amber-500/10 text-amber-300',
      accentGlow: '#C5A073',
    },
  },
  {
    id: 'bedroom',
    number: '02',
    category: 'MASTER BEDROOM SUITE',
    name: 'Imperial Fluted Platform Bed',
    tagline: 'SANCTUARY OF SOLID TIMBER.',
    description: 'Acoustic fluted headboard in solid Burma Teak with integrated warm ambient nightstands and effortless German hydraulic lift-up under-bed storage.',
    timber: 'Seasoned Teak & Gamari',
    upholstery: 'Italian Wool Blend & LED Glow',
    dimensions: '2100mm W × 2200mm L × 1200mm H',
    timeline: 'Crafted in 18–24 Days',
    image: '/images/floating-bed.jpg',
    layout: 'text-right', // Product on LEFT, Text on RIGHT (REVERSED)
    badge: '800L Hydraulic Storage System',
    // Environment Atmosphere Shade
    theme: {
      bgGradient: 'radial-gradient(ellipse at top left, #1B182B 0%, #0D0E17 50%, #040508 100%)',
      spotlightColor: 'rgba(212, 175, 55, 0.22)',
      ambientPill: 'border-indigo-400/30 bg-indigo-500/10 text-indigo-200',
      accentGlow: '#D4AF37',
    },
  },
  {
    id: 'dining',
    number: '03',
    category: 'ROYAL DINING SUITE',
    name: 'Grand Heritage Sintered Stone Suite',
    tagline: 'GATHER AROUND MASTERPIECES.',
    description: 'Sculpted solid mahogany trestle base paired with 12mm Italian Calacatta sintered stone top and 8 ergonomic bouclé dining chairs.',
    timber: 'Solid Red Mahogany (মেহগনি)',
    upholstery: 'Calacatta Gold Stone & Bouclé',
    dimensions: '2400mm L × 1100mm W × 760mm H',
    timeline: 'Crafted in 14–20 Days',
    image: '/images/floating-dining.jpg',
    layout: 'text-left', // Product on RIGHT, Text on LEFT
    badge: 'Heat & Scratch Proof Top',
    // Environment Atmosphere Shade
    theme: {
      bgGradient: 'radial-gradient(ellipse at top right, #10261E 0%, #091712 50%, #020805 100%)',
      spotlightColor: 'rgba(46, 139, 87, 0.24)',
      ambientPill: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300',
      accentGlow: '#2E8B57',
    },
  },
  {
    id: 'executive',
    number: '04',
    category: 'EXECUTIVE STUDY SUITE',
    name: 'Presidential Sanctum Desk',
    tagline: 'COMMAND YOUR WORKSPACE.',
    description: 'Presidential executive desk featuring Italian full-grain leather writing inlay, concealed biometric drawers, wireless Qi charging, and architectural library match.',
    timber: 'Solid Burma Teak (বার্মা সেগুন)',
    upholstery: 'Tuscan Full-Grain Leather',
    dimensions: '2200mm W × 1000mm D × 760mm H',
    timeline: 'Crafted in 16–22 Days',
    image: '/images/floating-desk.jpg',
    layout: 'text-right', // Product on LEFT, Text on RIGHT (REVERSED)
    badge: 'Concealed Cable & Tech Raceways',
    // Environment Atmosphere Shade
    theme: {
      bgGradient: 'radial-gradient(ellipse at top left, #29170E 0%, #150C07 50%, #070302 100%)',
      spotlightColor: 'rgba(205, 133, 63, 0.22)',
      ambientPill: 'border-orange-500/30 bg-orange-500/10 text-orange-300',
      accentGlow: '#CD853F',
    },
  },
  {
    id: 'bespoke',
    number: '05',
    category: 'BESPOKE ATELIER',
    name: '100% Custom Residence Blueprint',
    tagline: 'TAILORED TO YOUR BLUEPRINT.',
    description: 'Zero mass production. We laser-measure your apartment in Chattogram, create custom 3D photorealistic renders, and handcraft heirloom timber pieces with lifetime joinery.',
    timber: 'Teak, Gamari, Mahogany, Oak',
    upholstery: '200+ Imported Fabrics',
    dimensions: 'Custom to Residence Floorplan',
    timeline: 'Tailored to Project Blueprint',
    image: '/images/floating-craft.jpg',
    layout: 'text-left', // Product on RIGHT, Text on LEFT
    badge: 'Free In-Home 3D Laser Measurement',
    // Environment Atmosphere Shade
    theme: {
      bgGradient: 'radial-gradient(ellipse at top right, #241D12 0%, #130F08 50%, #050402 100%)',
      spotlightColor: 'rgba(218, 165, 32, 0.22)',
      ambientPill: 'border-yellow-500/30 bg-yellow-500/10 text-yellow-300',
      accentGlow: '#DAA520',
    },
  },
];

export default function Hero() {
  const containerRef = useRef(null);
  const [activeIdx, setActiveIdx] = useState(0);

  // Discrete scroll tracking across the 500vh container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Calculate active scene with clean thresholds
  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      let index = 0;
      if (latest < 0.20) index = 0;
      else if (latest < 0.40) index = 1;
      else if (latest < 0.60) index = 2;
      else if (latest < 0.80) index = 3;
      else index = 4;

      setActiveIdx(index);
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  const currentProduct = FLOATING_PRODUCTS[activeIdx];
  const isTextRight = currentProduct.layout === 'text-right';

  return (
    <section 
      ref={containerRef}
      className="relative text-ivory min-h-[500vh] transition-colors duration-1000"
    >
      {/* ── STICKY 100vw × 100vh BLENDED ATMOSPHERE CANVAS ── */}
      <div 
        className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between px-4 sm:px-6 lg:px-12 py-6 transition-all duration-1000 ease-out"
        style={{ background: currentProduct.theme.bgGradient }}
      >
        
        {/* ── Ambient Radial Atmosphere Spotlight (Shifts position & color with each product) ── */}
        <motion.div 
          animate={{
            left: isTextRight ? '20%' : '65%',
            backgroundColor: currentProduct.theme.spotlightColor,
          }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="absolute top-1/4 w-[750px] h-[750px] rounded-full blur-[180px] pointer-events-none z-0"
        />

        {/* ── Top Atelier Brand & Chapter Status HUD ── */}
        <div className="relative z-30 max-w-7xl mx-auto w-full pt-16 sm:pt-20 flex items-center justify-between pointer-events-none">
          <div className="flex items-center gap-3">
            <span 
              className="w-2 h-2 rounded-full animate-pulse" 
              style={{ backgroundColor: currentProduct.theme.accentGlow }}
            />
            <span className="text-[11px] uppercase tracking-[0.35em] text-gold font-medium">
              BESPOKE ATELIER · Nº {currentProduct.number} / 05
            </span>
          </div>

          {/* Minimalist 5-Step Progress Indicators */}
          <div className="flex items-center gap-2">
            {FLOATING_PRODUCTS.map((p, idx) => (
              <div 
                key={p.id}
                className={`h-1 transition-all duration-500 rounded-full ${
                  idx === activeIdx 
                    ? 'w-8 bg-gold' 
                    : 'w-2 bg-white/20'
                }`}
              />
            ))}
          </div>
        </div>

        {/* ── MAIN FLOATING STAGE (SEAMLESSLY BLENDED PRODUCTS & TEXT) ── */}
        <div className="relative z-20 max-w-7xl mx-auto w-full my-auto flex-1 flex items-center justify-center">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={currentProduct.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className={`w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center ${
                isTextRight ? 'lg:flex-row-reverse' : ''
              }`}
            >
              
              {/* ── 1. FLOATING TEXT BLOCK (CONVERSION PSYCHOLOGY) ── */}
              <motion.div
                initial={{ opacity: 0, x: isTextRight ? 40 : -40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: isTextRight ? 40 : -40 }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className={`lg:col-span-6 flex flex-col ${
                  isTextRight ? 'lg:order-2 text-left' : 'lg:order-1 text-left'
                }`}
              >
                
                {/* Category Pill with Theme Color */}
                <div className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full border text-[10px] uppercase tracking-widest mb-4 backdrop-blur-md w-fit ${currentProduct.theme.ambientPill}`}>
                  <Sparkles className="w-3 h-3" />
                  <span>{currentProduct.category}</span>
                </div>

                {/* Main Headline */}
                <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-ivory tracking-tight leading-[1.08] mb-4 drop-shadow-md">
                  {currentProduct.tagline}
                </h1>

                {/* Subtitle / Description */}
                <p className="font-body text-base sm:text-lg text-ivory-muted leading-relaxed mb-6 max-w-lg">
                  {currentProduct.description}
                </p>

                {/* Architectural Specs Strip */}
                <div className="grid grid-cols-2 gap-2.5 p-3.5 rounded-xl bg-surface/40 border border-white/10 backdrop-blur-xl mb-6 max-w-lg shadow-lg">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-gold/80 block">Timber & Frame</span>
                    <span className="text-xs font-medium text-ivory truncate block">{currentProduct.timber}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-gold/80 block">Dimensions</span>
                    <span className="text-xs font-medium text-ivory truncate block">{currentProduct.dimensions}</span>
                  </div>
                </div>

                {/* Conversion Psychology CTAs */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mb-6">
                  <a
                    href="#bespoke"
                    className="flex items-center justify-center gap-2.5 bg-gold text-obsidian px-7 py-4 font-semibold text-sm tracking-wide rounded-lg hover:bg-gold-hover transition-all duration-300 shadow-lg shadow-gold/20 hover:shadow-gold/30 hover:scale-[1.02]"
                  >
                    <Sparkles className="w-4 h-4 text-obsidian" />
                    <span>Book Free Consultation</span>
                  </a>

                  <a
                    href={buildProductWhatsAppUrl(currentProduct.name, currentProduct.timber)}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-2.5 px-6 py-4 border border-gold/40 text-ivory bg-surface/50 backdrop-blur-md font-semibold text-sm rounded-lg hover:border-gold hover:text-gold transition-all duration-300"
                  >
                    <MessageCircle className="w-5 h-5 text-green-400" />
                    <span>WhatsApp Stylist</span>
                  </a>
                </div>

                {/* Trust & Guarantee Badges */}
                <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-ivory-muted/80">
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-gold" />
                    <span>{currentProduct.badge}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-gold" />
                    <span>Lifetime Joinery Warranty</span>
                  </div>
                </div>

              </motion.div>


              {/* ── 2. SEAMLESSLY BLENDED FLOATING PRODUCT (FEATHERED MASK & SHADOW) ── */}
              <motion.div
                initial={{ opacity: 0, scale: 0.92, x: isTextRight ? -50 : 50 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.92, x: isTextRight ? -50 : 50 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className={`lg:col-span-6 relative flex items-center justify-center ${
                  isTextRight ? 'lg:order-1' : 'lg:order-2'
                }`}
              >
                
                {/* Floating Levitation Container with Soft Animation */}
                <motion.div
                  animate={{ y: [0, -12, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                  className="relative w-full max-w-xl aspect-[4/3] flex items-center justify-center"
                >
                  
                  {/* Subtle Behind-Product Radial Lighting Halo */}
                  <div 
                    className="absolute inset-4 rounded-full blur-3xl opacity-60 pointer-events-none -z-10"
                    style={{ backgroundColor: currentProduct.theme.spotlightColor }}
                  />

                  {/* Seamless Feathered Mask Image (Zero Square Box / 100% Blended Edges) */}
                  <div 
                    className="relative w-full h-full flex items-center justify-center overflow-hidden"
                    style={{
                      maskImage: 'radial-gradient(ellipse 90% 85% at center, black 65%, transparent 100%)',
                      WebkitMaskImage: 'radial-gradient(ellipse 90% 85% at center, black 65%, transparent 100%)',
                    }}
                  >
                    <img
                      src={currentProduct.image}
                      alt={currentProduct.name}
                      className="w-full h-full object-contain select-none pointer-events-none drop-shadow-[0_20px_40px_rgba(0,0,0,0.9)] scale-[1.04]"
                    />
                  </div>

                  {/* Soft 3D Floor Shadow */}
                  <div className="absolute -bottom-4 inset-x-12 h-12 bg-black/85 blur-2xl rounded-full -z-10 pointer-events-none" />

                  {/* Floating Product Name Capsule */}
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-surface-elevated/90 border border-gold/30 backdrop-blur-xl px-4 py-2 rounded-full shadow-2xl flex items-center gap-2.5 whitespace-nowrap text-xs">
                    <span 
                      className="w-2 h-2 rounded-full animate-pulse" 
                      style={{ backgroundColor: currentProduct.theme.accentGlow }}
                    />
                    <span className="text-ivory font-medium">{currentProduct.name}</span>
                    <span className="text-gold/50">·</span>
                    <span className="text-gold font-light">{currentProduct.timeline}</span>
                  </div>

                </motion.div>

              </motion.div>

            </motion.div>
          </AnimatePresence>

        </div>

        {/* ── Bottom Scroll Prompt ── */}
        <div className="relative z-30 max-w-7xl mx-auto w-full pb-2 flex items-center justify-between text-xs text-ivory-muted/70 pointer-events-none">
          <div className="flex items-center gap-2">
            <span className="text-gold font-medium uppercase tracking-widest text-[10px]">Scroll Down</span>
            <ChevronDown className="w-3.5 h-3.5 text-gold animate-bounce" />
            <span className="hidden sm:inline">to experience all 5 luxury suites</span>
          </div>

          <div className="hidden md:flex items-center gap-4 text-[11px] uppercase tracking-wider text-ivory-muted/60">
            <span>Agrabad Access Road</span>
            <span>·</span>
            <span>Opposite RAK Ceramics, Chattogram</span>
          </div>
        </div>

      </div>
    </section>
  );
}
