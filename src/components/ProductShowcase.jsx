import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Sparkles, MessageCircle, ShieldCheck } from 'lucide-react';
import { buildProductWhatsAppUrl } from '../utils/whatsapp';

const SUITES = [
  {
    id: 'living',
    number: '01',
    label: 'THE LIVING ROOM',
    name: 'Sovereign Burma Teak Sectional',
    headline: 'Where Comfort Meets Craftsmanship',
    description: "Hand-sculpted from solid seasoned Burma Teak heartwood. Belgian ivory velvet upholstery meets 45D ergonomic memory foam — a sectional designed not for a catalogue, but for your family's legacy.",
    timber: 'Solid Burma Teak (বার্মা সেগুন)',
    upholstery: 'Belgian Velvet & 45D Foam',
    dimensions: '3200mm W × 1950mm D × 780mm H',
    timeline: '14–21 Days',
    image: '/images/hero-living.jpg',
    badge: '100% Solid Heartwood Timber',
    tone: 'dark', // dark bg with light text
  },
  {
    id: 'bedroom',
    number: '02',
    label: 'THE MASTER BEDROOM',
    name: 'Imperial Fluted Platform Bed',
    headline: 'Sanctuary of Solid Timber',
    description: 'Acoustic fluted headboard in solid Burma Teak with integrated warm ambient nightstands. German hydraulic lift-up storage holds 800 litres beneath — effortless elegance, engineered precision.',
    timber: 'Seasoned Teak & Gamari',
    upholstery: 'Italian Wool Blend & LED Glow',
    dimensions: '2100mm W × 2200mm L × 1200mm H',
    timeline: '18–24 Days',
    image: '/images/hero-bedroom.jpg',
    badge: '800L Hydraulic Storage System',
    tone: 'light', // linen bg with dark text
  },
  {
    id: 'dining',
    number: '03',
    label: 'THE ROYAL DINING HALL',
    name: 'Grand Heritage Sintered Stone Suite',
    headline: 'Gather Around Masterpieces',
    description: 'Sculpted solid mahogany trestle base paired with 12mm Italian Calacatta sintered stone top. Eight ergonomic bouclé chairs complete a table set for generations of ceremony.',
    timber: 'Solid Red Mahogany (মেহগনি)',
    upholstery: 'Calacatta Gold Stone & Bouclé',
    dimensions: '2400mm L × 1100mm W × 760mm H',
    timeline: '14–20 Days',
    image: '/images/hero-dining.jpg',
    badge: 'Heat & Scratch Proof Top',
    tone: 'dark',
  },
  {
    id: 'executive',
    number: '04',
    label: 'THE EXECUTIVE STUDY',
    name: 'Presidential Sanctum Desk',
    headline: 'Command Your Workspace',
    description: 'Presidential desk featuring Italian full-grain leather writing inlay, concealed biometric drawers, wireless Qi charging surface, and architectural library match. Power meets artistry.',
    timber: 'Solid Burma Teak (বার্মা সেগুন)',
    upholstery: 'Tuscan Full-Grain Leather',
    dimensions: '2200mm W × 1000mm D × 760mm H',
    timeline: '16–22 Days',
    image: '/images/hero-executive.jpg',
    badge: 'Concealed Cable & Tech Raceways',
    tone: 'light',
  },
  {
    id: 'bespoke',
    number: '05',
    label: 'THE BESPOKE ATELIER',
    name: '100% Custom Residence Blueprint',
    headline: 'Tailored to Your Blueprint',
    description: 'Zero mass production. We laser-measure your apartment in Chattogram, create custom 3D photorealistic renders, and handcraft heirloom timber pieces with lifetime structural joinery.',
    timber: 'Teak, Gamari, Mahogany, Oak',
    upholstery: '200+ Imported Fabrics',
    dimensions: 'Custom to Residence Floorplan',
    timeline: 'Tailored to Project',
    image: '/images/hero-craftsmanship.jpg',
    badge: 'Free In-Home 3D Laser Measurement',
    tone: 'dark',
  },
];

function ProductSection({ suite, index }) {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-15%' });
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.05, 1, 1.02]);

  const isDark = suite.tone === 'dark';
  const isEven = index % 2 === 0;

  return (
    <section
      id={index === 0 ? 'craftsmanship' : suite.id}
      ref={sectionRef}
      className={`relative min-h-screen overflow-hidden ${
        isDark ? 'bg-espresso text-linen' : 'bg-linen text-espresso-deep'
      }`}
    >
      {/* Animated line divider at top */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 1.2, ease: [0.33, 1, 0.68, 1] }}
        className={`absolute top-0 left-0 w-full h-px origin-left ${
          isDark ? 'bg-bronze/30' : 'bg-espresso-deep/10'
        }`}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-16 py-20 md:py-32">
        <div className={`grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20 items-center ${
          isEven ? '' : 'lg:[direction:rtl]'
        }`}>
          
          {/* ── IMAGE COLUMN ── */}
          <div className="lg:col-span-7 relative lg:[direction:ltr]">
            <div className="relative aspect-[4/3] overflow-hidden rounded-sm">
              <motion.div
                style={{ y: imageY, scale: imageScale }}
                className="absolute inset-0"
              >
                <img
                  src={suite.image}
                  alt={suite.name}
                  className="w-full h-full object-cover"
                />
              </motion.div>

              {/* Overlay gradient */}
              <div className={`absolute inset-0 pointer-events-none ${
                isDark
                  ? 'bg-gradient-to-t from-espresso/40 via-transparent to-transparent'
                  : 'bg-gradient-to-t from-linen/30 via-transparent to-transparent'
              }`} />

              {/* Suite number watermark */}
              <motion.span
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className={`absolute top-6 left-6 font-display text-7xl md:text-8xl leading-none ${
                  isDark ? 'text-linen/10' : 'text-espresso-deep/8'
                }`}
              >
                {suite.number}
              </motion.span>

              {/* Status badge */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="absolute bottom-6 left-6 flex items-center gap-2"
              >
                <span className={`text-[10px] uppercase tracking-[0.2em] font-mono px-3 py-1.5 rounded-full backdrop-blur-md ${
                  isDark
                    ? 'bg-linen/10 text-linen/80 border border-linen/15'
                    : 'bg-espresso-deep/10 text-espresso-deep/80 border border-espresso-deep/15'
                }`}>
                  Crafted in {suite.timeline}
                </span>
              </motion.div>
            </div>
          </div>

          {/* ── TEXT COLUMN ── */}
          <div className="lg:col-span-5 flex flex-col items-start lg:[direction:ltr]">
            <motion.div
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.12 } },
              }}
              className="w-full"
            >
              {/* Category label */}
              <motion.span
                variants={{
                  hidden: { y: 20, opacity: 0 },
                  visible: { y: 0, opacity: 1, transition: { duration: 0.6 } },
                }}
                className={`font-mono text-[10px] tracking-[0.35em] uppercase block mb-4 ${
                  isDark ? 'text-bronze' : 'text-bronze'
                }`}
              >
                Suite {suite.number} · {suite.label}
              </motion.span>

              {/* Main headline */}
              <motion.h2
                variants={{
                  hidden: { y: 30, opacity: 0 },
                  visible: { y: 0, opacity: 1, transition: { duration: 0.7 } },
                }}
                className="font-display text-3xl md:text-4xl lg:text-5xl leading-[1.1] tracking-tight mb-6"
              >
                {suite.headline}
              </motion.h2>

              {/* Product name */}
              <motion.h3
                variants={{
                  hidden: { y: 20, opacity: 0 },
                  visible: { y: 0, opacity: 1, transition: { duration: 0.6 } },
                }}
                className={`font-body text-sm uppercase tracking-[0.2em] font-medium mb-5 ${
                  isDark ? 'text-bronze-light' : 'text-bronze'
                }`}
              >
                {suite.name}
              </motion.h3>

              {/* Description */}
              <motion.p
                variants={{
                  hidden: { y: 20, opacity: 0 },
                  visible: { y: 0, opacity: 1, transition: { duration: 0.6 } },
                }}
                className={`text-base leading-relaxed mb-8 max-w-lg ${
                  isDark ? 'text-linen-muted' : 'text-espresso-deep/75'
                }`}
              >
                {suite.description}
              </motion.p>

              {/* Material specs strip */}
              <motion.div
                variants={{
                  hidden: { y: 20, opacity: 0 },
                  visible: { y: 0, opacity: 1, transition: { duration: 0.6 } },
                }}
                className={`grid grid-cols-2 gap-x-6 gap-y-3 py-5 px-5 rounded-sm mb-8 ${
                  isDark
                    ? 'bg-surface/60 border border-bronze/10'
                    : 'bg-espresso-deep/5 border border-espresso-deep/8'
                }`}
              >
                <div>
                  <span className={`font-mono text-[9px] uppercase tracking-[0.2em] block mb-1 ${
                    isDark ? 'text-bronze/70' : 'text-bronze'
                  }`}>Timber</span>
                  <span className={`text-xs font-medium ${isDark ? 'text-linen' : 'text-espresso-deep'}`}>
                    {suite.timber}
                  </span>
                </div>
                <div>
                  <span className={`font-mono text-[9px] uppercase tracking-[0.2em] block mb-1 ${
                    isDark ? 'text-bronze/70' : 'text-bronze'
                  }`}>Upholstery</span>
                  <span className={`text-xs font-medium ${isDark ? 'text-linen' : 'text-espresso-deep'}`}>
                    {suite.upholstery}
                  </span>
                </div>
                <div>
                  <span className={`font-mono text-[9px] uppercase tracking-[0.2em] block mb-1 ${
                    isDark ? 'text-bronze/70' : 'text-bronze'
                  }`}>Dimensions</span>
                  <span className={`text-xs font-medium ${isDark ? 'text-linen' : 'text-espresso-deep'}`}>
                    {suite.dimensions}
                  </span>
                </div>
                <div>
                  <span className={`font-mono text-[9px] uppercase tracking-[0.2em] block mb-1 ${
                    isDark ? 'text-bronze/70' : 'text-bronze'
                  }`}>Lead Time</span>
                  <span className={`text-xs font-medium ${isDark ? 'text-linen' : 'text-espresso-deep'}`}>
                    {suite.timeline}
                  </span>
                </div>
              </motion.div>

              {/* CTAs */}
              <motion.div
                variants={{
                  hidden: { y: 20, opacity: 0 },
                  visible: { y: 0, opacity: 1, transition: { duration: 0.6 } },
                }}
                className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto mb-6"
              >
                <a
                  href="#bespoke"
                  className={`arcca-btn inline-flex items-center justify-center gap-2 ${
                    isDark
                      ? ''
                      : 'border-espresso-deep text-espresso-deep [--color-bronze:var(--color-espresso-deep)]'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5" />
                    Book Consultation
                  </span>
                </a>

                <a
                  href={buildProductWhatsAppUrl(suite.name, suite.timber)}
                  target="_blank"
                  rel="noreferrer"
                  className={`inline-flex items-center justify-center gap-2 px-5 py-3 text-[11px] uppercase tracking-[0.15em] font-medium transition-colors ${
                    isDark
                      ? 'text-linen-muted hover:text-linen'
                      : 'text-espresso-deep/70 hover:text-espresso-deep'
                  }`}
                >
                  <MessageCircle className="w-4 h-4 text-green-500" />
                  WhatsApp Stylist
                </a>
              </motion.div>

              {/* Trust badge */}
              <motion.div
                variants={{
                  hidden: { y: 15, opacity: 0 },
                  visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
                }}
                className={`flex items-center gap-2 text-xs ${
                  isDark ? 'text-linen-muted/70' : 'text-espresso-deep/50'
                }`}
              >
                <ShieldCheck className={`w-3.5 h-3.5 ${isDark ? 'text-bronze' : 'text-bronze'}`} />
                <span>{suite.badge}</span>
                <span className="mx-1 opacity-30">·</span>
                <ShieldCheck className={`w-3.5 h-3.5 ${isDark ? 'text-bronze' : 'text-bronze'}`} />
                <span>Lifetime Joinery Warranty</span>
              </motion.div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default function ProductShowcase() {
  return (
    <>
      {SUITES.map((suite, i) => (
        <ProductSection key={suite.id} suite={suite} index={i} />
      ))}
    </>
  );
}
