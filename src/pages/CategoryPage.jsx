import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  MessageCircle,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Ruler,
  Layers,
  CreditCard,
  Hammer,
  Video,
  Truck,
  ChevronDown,
  ChevronUp,
  MapPin,
  Phone,
  HelpCircle,
} from 'lucide-react';
import { CATEGORY_DETAILS, HEIRLOOM_DELIVERY_WORKFLOW } from '../data/categoryDetails';
import { buildProductWhatsAppUrl, buildWhatsAppUrl } from '../utils/whatsapp';
import FloatingWhatsApp from '../components/FloatingWhatsApp';
import Footer from '../components/Footer';

const SUITE_TABS = [
  { slug: 'living-room', name: 'Living Room' },
  { slug: 'master-bedroom', name: 'Master Bedroom' },
  { slug: 'royal-dining', name: 'Royal Dining' },
  { slug: 'executive-study', name: 'Executive & Study' },
];

export default function CategoryPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(slug || 'living-room');
  const [expandedProduct, setExpandedProduct] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (slug && CATEGORY_DETAILS[slug]) {
      setActiveTab(slug);
    }
  }, [slug]);

  const category = CATEGORY_DETAILS[activeTab] || CATEGORY_DETAILS['living-room'];

  const getWorkflowIcon = (name) => {
    switch (name) {
      case 'Ruler': return <Ruler className="w-5 h-5 text-bronze" />;
      case 'Layers': return <Layers className="w-5 h-5 text-bronze" />;
      case 'CreditCard': return <CreditCard className="w-5 h-5 text-bronze" />;
      case 'Hammer': return <Hammer className="w-5 h-5 text-bronze" />;
      case 'Video': return <Video className="w-5 h-5 text-bronze" />;
      case 'Truck': return <Truck className="w-5 h-5 text-bronze" />;
      default: return <Sparkles className="w-5 h-5 text-bronze" />;
    }
  };

  return (
    <div className="min-h-screen bg-[#FBF9F5] text-espresso-deep font-body">
      
      {/* ── TOP LUXURY NAVIGATION ── */}
      <header className="sticky top-0 z-40 bg-[#FBF9F5]/90 backdrop-blur-md border-b border-[#E8DFD3]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#7A6A5A] hover:text-[#1E1005] transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Atelier Main</span>
          </Link>

          <Link to="/" className="text-center">
            <span className="font-display text-lg tracking-[0.2em] text-[#1E1005] font-semibold block">
              HEAVEN FURNITURE
            </span>
            <span className="font-mono text-[9px] tracking-[0.35em] text-bronze uppercase">
              AGRABAD · CHATTOGRAM
            </span>
          </Link>

          <a
            href={buildWhatsAppUrl(`Hi Heaven Furniture Mart! I am exploring the ${category.name} collection and would like to discuss bespoke measurements.`)}
            target="_blank"
            rel="noreferrer"
            className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 bg-[#1E1005] hover:bg-bronze text-[#FBF0DA] hover:text-white rounded-lg text-xs font-mono uppercase tracking-wider transition-colors shadow-2xs"
          >
            <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
            <span>WhatsApp Support</span>
          </a>
        </div>

        {/* Suite Switcher Bar */}
        <div className="border-t border-[#E8DFD3]/60 bg-[#FAF8F5]">
          <div className="max-w-7xl mx-auto px-6 md:px-12 flex overflow-x-auto no-scrollbar gap-2 py-2.5">
            {SUITE_TABS.map((tab) => {
              const isActive = activeTab === tab.slug;
              return (
                <button
                  key={tab.slug}
                  onClick={() => {
                    setActiveTab(tab.slug);
                    navigate(`/collections/${tab.slug}`);
                  }}
                  className={`px-4 py-1.5 rounded-full text-xs font-mono tracking-wider whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#1E1005] text-[#FBF0DA] shadow-xs font-medium'
                      : 'text-[#7A6A5A] hover:text-[#1E1005] hover:bg-[#EDE4D8]/50'
                  }`}
                >
                  {tab.name}
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* ── SUITE HERO BANNER ── */}
      <section className="relative bg-[#1E1005] text-linen py-20 md:py-28 px-6 md:px-12 overflow-hidden">
        {/* Subtle Background Glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-[#1E1005]/80 to-transparent z-10 pointer-events-none" />
        <img
          src={category.hero_image}
          alt={category.name}
          className="absolute inset-0 w-full h-full object-cover opacity-25 scale-105"
        />

        <div className="max-w-7xl mx-auto relative z-20">
          <div className="max-w-3xl">
            
            {/* Breadcrumb & Bengali Subhead */}
            <div className="flex items-center gap-3 mb-4">
              <span className="font-mono text-xs text-bronze uppercase tracking-[0.3em]">
                ARCHITECTURAL SUITE
              </span>
              <span className="text-linen/30">/</span>
              <span className="font-serif text-xs text-linen/70">{category.bengali_name}</span>
            </div>

            <h1 className="font-display text-4xl sm:text-6xl text-linen leading-[1.1] mb-6">
              {category.name}
            </h1>

            <p className="text-linen/90 font-serif text-lg sm:text-xl italic mb-4 leading-relaxed">
              "{category.headline}"
            </p>

            <p className="text-linen/70 text-sm sm:text-base font-body max-w-2xl leading-relaxed mb-8">
              {category.description}
            </p>

            {/* Quality Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-linen/15 font-mono text-xs">
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-bronze shrink-0" />
                <span>{category.timber_focus}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-bronze shrink-0" />
                <span>{category.moisture_content}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-bronze shrink-0" />
                <span>{category.warranty}</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── 4 DETAILED PRODUCTS SHOWCASE ── */}
      <section className="py-20 md:py-28 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="mb-14">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-3 h-3 border border-bronze rotate-45" />
            <span className="font-mono text-[11px] tracking-[0.3em] text-bronze uppercase">
              FULL SUITE PIECES ({category.products.length})
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl text-[#1E1005]">
            Handcrafted Heirloom Specifications
          </h2>
          <p className="text-[#7A6A5A] text-sm mt-2 max-w-xl">
            Every piece is built to order. Select any design to inspect dimensional blueprints, kiln-seasoning grades, and joinery methods.
          </p>
        </div>

        {/* Product Cards Grid */}
        <div className="space-y-16">
          {category.products.map((product, idx) => {
            const isExpanded = expandedProduct === product.id;
            const isEven = idx % 2 === 0;
            const whatsappUrl = buildProductWhatsAppUrl(
              product.name,
              `Suite: ${category.name} | Timber: ${product.specs.timber} | Investment: ৳${product.price_bdt.toLocaleString('en-IN')}`
            );

            return (
              <div
                key={product.id}
                className="bg-white rounded-3xl border border-[#E8DFD3] overflow-hidden shadow-xs hover:shadow-xl transition-all duration-500"
              >
                <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 md:p-10 ${
                  isEven ? '' : 'lg:[direction:rtl]'
                }`}>
                  
                  {/* Photo Column */}
                  <div className="lg:col-span-6 lg:[direction:ltr]">
                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#FAF8F5] border border-[#EDE4D8]">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                      />
                      <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1 rounded-md text-[10px] font-mono uppercase tracking-wider text-[#1E1005] font-semibold shadow-xs">
                        {product.stock_quantity > 0 ? `${product.stock_quantity} Ready in Atelier` : 'Bespoke Commission'}
                      </div>
                      <div className="absolute bottom-4 left-4 bg-[#1E1005]/90 backdrop-blur-md text-[#FBF0DA] px-3 py-1 rounded-md text-[10px] font-mono uppercase tracking-wider">
                        Crafted in {product.lead_time}
                      </div>
                    </div>
                  </div>

                  {/* Information Column */}
                  <div className="lg:col-span-6 flex flex-col justify-between lg:[direction:ltr]">
                    <div>
                      <span className="text-[10px] font-mono text-bronze uppercase tracking-[0.25em] font-medium block mb-2">
                        PIECE {String(idx + 1).padStart(2, '0')} · {category.name}
                      </span>
                      
                      <h3 className="font-display text-2xl sm:text-3xl text-[#1E1005] font-semibold leading-tight">
                        {product.name}
                      </h3>
                      
                      <p className="text-[#6B5C4E] text-sm font-serif italic mt-2">
                        {product.tagline}
                      </p>

                      {/* Highlights */}
                      <ul className="mt-5 space-y-2 text-xs font-mono text-[#4A3E33]">
                        {product.highlights.map((h, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-bronze shrink-0 mt-0.5" />
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Key Metric Strip */}
                      <div className="grid grid-cols-2 gap-3 mt-6 p-4 rounded-xl bg-[#FAF8F5] border border-[#EDE4D8] text-xs font-mono">
                        <div>
                          <span className="text-[9px] text-[#8A7056] uppercase block">Timber Species</span>
                          <span className="text-[#1E1005] font-semibold truncate block">
                            {product.specs.timber.split('(')[0]}
                          </span>
                        </div>
                        <div>
                          <span className="text-[9px] text-[#8A7056] uppercase block">Dimensions</span>
                          <span className="text-[#1E1005] font-semibold truncate block">
                            {product.specs.dimensions.split('×')[0]}...
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Pricing & CTAs */}
                    <div className="mt-8 pt-6 border-t border-[#E8DFD3] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <span className="text-[10px] font-mono text-[#8A7056] uppercase block">
                          Handcrafted Investment
                        </span>
                        <span className="font-display text-2xl text-[#1E1005] font-bold">
                          ৳{product.price_bdt.toLocaleString('en-IN')}
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => setExpandedProduct(isExpanded ? null : product.id)}
                          className="px-4 py-2.5 rounded-xl border border-[#DED4C5] hover:border-[#1E1005] text-[#1E1005] text-xs font-mono uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer"
                        >
                          <span>{isExpanded ? 'Hide Specs' : 'Full Specs'}</span>
                          {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                        </button>

                        <a
                          href={whatsappUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="px-5 py-2.5 rounded-xl bg-[#1E1005] hover:bg-bronze text-[#FBF0DA] hover:text-white text-xs font-mono uppercase tracking-wider font-semibold flex items-center gap-2 transition-colors shadow-sm"
                        >
                          <MessageCircle className="w-4 h-4 text-emerald-400" />
                          <span>Inquire / Order</span>
                        </a>
                      </div>
                    </div>

                  </div>

                </div>

                {/* Expanded Technical Specifications Sheet */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="border-t border-[#E8DFD3] bg-[#FAF8F5] p-6 md:p-10"
                    >
                      <h4 className="font-display text-lg text-[#1E1005] mb-4">
                        Architectural Technical Specification Sheet
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
                        <div className="p-3.5 bg-white rounded-xl border border-[#E8DFD3]">
                          <span className="text-[10px] text-bronze uppercase font-bold block mb-1">Exact Blueprint Dimensions</span>
                          <p className="text-[#1E1005]">{product.specs.dimensions}</p>
                        </div>
                        <div className="p-3.5 bg-white rounded-xl border border-[#E8DFD3]">
                          <span className="text-[10px] text-bronze uppercase font-bold block mb-1">Timber & Kiln Seasoning</span>
                          <p className="text-[#1E1005]">{product.specs.timber}</p>
                        </div>
                        <div className="p-3.5 bg-white rounded-xl border border-[#E8DFD3]">
                          <span className="text-[10px] text-bronze uppercase font-bold block mb-1">Joinery & Structural Core</span>
                          <p className="text-[#1E1005]">{product.specs.joinery}</p>
                        </div>
                        <div className="p-3.5 bg-white rounded-xl border border-[#E8DFD3]">
                          <span className="text-[10px] text-bronze uppercase font-bold block mb-1">Upholstery / Surface Material</span>
                          <p className="text-[#1E1005]">{product.specs.upholstery}</p>
                        </div>
                        <div className="p-3.5 bg-white rounded-xl border border-[#E8DFD3]">
                          <span className="text-[10px] text-bronze uppercase font-bold block mb-1">Cushioning & Core Density</span>
                          <p className="text-[#1E1005]">{product.specs.cushioning}</p>
                        </div>
                        <div className="p-3.5 bg-white rounded-xl border border-[#E8DFD3]">
                          <span className="text-[10px] text-bronze uppercase font-bold block mb-1">Surface Finish & Protection</span>
                          <p className="text-[#1E1005]">{product.specs.finish}</p>
                        </div>
                      </div>

                      <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-white border border-[#E8DFD3]">
                        <p className="text-xs font-mono text-[#6B5C4E]">
                          Need custom length, fabric color, or teak stain to match your apartment floor?
                        </p>
                        <Link
                          to="/#bespoke"
                          className="px-4 py-2 bg-[#1E1005] text-[#FBF0DA] hover:bg-bronze text-xs font-mono uppercase tracking-wider rounded-lg transition-colors whitespace-nowrap"
                        >
                          Launch 3D Configurator →
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>
            );
          })}
        </div>
      </section>

      {/* ── THE 6-STEP ORDER & DELIVERY SYSTEM ("THE HEIRLOOM JOURNEY") ── */}
      <section className="py-20 md:py-28 px-6 md:px-12 bg-white border-t border-[#E8DFD3]">
        <div className="max-w-7xl mx-auto">
          
          <div className="max-w-3xl mb-16">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-3 h-3 border border-bronze rotate-45" />
              <span className="font-mono text-[11px] tracking-[0.35em] text-bronze uppercase">
                THE COMMISSIONING PROTOCOL
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl text-[#1E1005] leading-tight">
              How Order, Kiln-Seasoning & White-Glove Delivery Work.
            </h2>
            <p className="text-[#6B5C4E] text-sm sm:text-base font-body mt-4 leading-relaxed">
              We operate as a bespoke atelier, not a mass flat-pack warehouse. Here is our exact 6-phase journey from in-home laser measurement in Chattogram or Dhaka to lifetime white-glove installation.
            </p>
          </div>

          {/* 6-Step Visual Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {HEIRLOOM_DELIVERY_WORKFLOW.map((step) => (
              <div
                key={step.step}
                className="p-8 rounded-2xl bg-[#FAF8F5] border border-[#EDE4D8] hover:border-bronze hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-display text-3xl text-bronze font-bold">
                      {step.step}
                    </span>
                    <div className="p-3 bg-white rounded-xl border border-[#E8DFD3] shadow-2xs">
                      {getWorkflowIcon(step.icon)}
                    </div>
                  </div>

                  <span className="text-[10px] font-mono uppercase text-[#8A7056] tracking-wider block mb-1">
                    {step.duration} · {step.bengali}
                  </span>

                  <h3 className="font-display text-xl text-[#1E1005] font-semibold mb-3">
                    {step.title}
                  </h3>

                  <p className="text-xs font-mono text-[#6B5C4E] leading-relaxed mb-6">
                    {step.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#E8DFD3]/80 space-y-2 text-[11px] font-mono text-[#3D332A]">
                  {step.points.map((pt, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <span className="text-bronze font-bold">•</span>
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Delivery & Payment Guarantee Strip */}
          <div className="mt-16 p-8 rounded-3xl bg-[#1E1005] text-linen flex flex-col lg:flex-row items-center justify-between gap-8 shadow-xl">
            <div className="max-w-2xl">
              <span className="text-xs font-mono text-bronze uppercase tracking-[0.25em] block mb-2 font-semibold">
                WHITE-GLOVE COVERAGE
              </span>
              <h3 className="font-display text-2xl sm:text-3xl text-linen font-medium">
                Complimentary In-Home Installation Across Chattogram & Dhaka
              </h3>
              <p className="text-xs font-mono text-linen/70 mt-2 leading-relaxed">
                Dedicated moving blankets, hydraulic lift vans, and uniformed carpenters ensure zero doorway dings. 60% balance payable only after physical room setup and inspection.
              </p>
            </div>

            <a
              href={buildWhatsAppUrl(`Hello Heaven Furniture Mart! I would like to schedule an in-home laser measurement consultation for the ${category.name}.`)}
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3.5 bg-bronze hover:bg-[#C5A880] text-[#1E1005] hover:text-black rounded-xl font-mono text-xs uppercase tracking-widest font-bold whitespace-nowrap transition-colors shadow-md flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Book Measurement</span>
            </a>
          </div>

        </div>
      </section>

      {/* ── SHOWROOM SUPPORT FOOTER ── */}
      <section className="py-16 px-6 md:px-12 bg-[#FAF8F5] border-t border-[#E8DFD3]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white border border-[#E8DFD3] flex items-center justify-center text-bronze shadow-2xs">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase text-[#8A7056] tracking-wider block">
                Flagship Atelier & Workshop
              </span>
              <p className="font-display text-lg text-[#1E1005] font-semibold">
                Agrabad Access Road, Opposite RAK Ceramics, Chattogram
              </p>
              <p className="text-xs font-mono text-[#7A6A5A]">
                Daily 10:00 AM – 9:00 PM · WhatsApp: +880 1960-481983
              </p>
            </div>
          </div>

          <Link
            to="/#collections"
            className="px-5 py-3 rounded-xl border border-[#DED4C5] text-[#1E1005] hover:bg-[#1E1005] hover:text-[#FBF0DA] text-xs font-mono uppercase tracking-wider transition-colors flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to All Collections</span>
          </Link>
        </div>
      </section>

      <Footer />
      <FloatingWhatsApp />

    </div>
  );
}
