import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, MessageCircle, ShieldCheck, ArrowRight, ArrowUpRight, Check, SlidersHorizontal } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { buildProductWhatsAppUrl } from '../utils/whatsapp';

// Explicit mapping of each product slug to its unique photograph
const PRODUCT_IMAGE_MAP = {
  // Living Room
  'sovereign-corner-sectional': '/images/products/sovereign-corner-sectional.jpg',
  'royal-chesterfield-suite': '/images/products/royal-chesterfield-suite.jpg',
  'fluted-teak-coffee-table': '/images/products/fluted-teak-coffee-table.jpg',
  'sintered-stone-tv-console': '/images/products/sintered-stone-tv-console.jpg',

  // Master Bedroom
  'imperial-burma-teak-king-bed': '/images/products/imperial-burma-teak-king-bed.jpg',
  'floating-platform-bed': '/images/products/floating-platform-bed.jpg',
  'floor-to-ceiling-wardrobe': '/images/products/floor-to-ceiling-wardrobe.jpg',
  'vanity-dressing-station': '/images/products/vanity-dressing-station.jpg',

  // Royal Dining
  'grand-heritage-8-seater': '/images/products/grand-heritage-8-seater.jpg',
  'sculptural-round-pedestal': '/images/products/sculptural-round-pedestal.jpg',
  'display-credenza': '/images/products/display-credenza.jpg',
  'ergonomic-dining-chairs': '/images/products/ergonomic-dining-chairs.jpg',

  // Executive & Study
  'executive-conference-table': '/images/products/executive-conference-table.jpg',
  'architectural-library-bookshelf': '/images/products/architectural-library-bookshelf.jpg',
  'presidential-executive-desk': '/images/products/presidential-executive-desk.jpg',
  'modular-workstation': '/images/products/modular-workstation.jpg',
};

// Curated 8 flagship products (exactly 2 per category) for homepage elegance
const HOMEPAGE_CURATED_PRODUCTS = [
  // 1. Living Room (2 Flagships)
  { id: '1', name: 'Sovereign Corner Sectional', slug: 'sovereign-corner-sectional', category: 'living-room', category_name: 'Living Room', timber_type: 'Burma Teak', upholstery: 'Belgian Ivory Velvet', price_bdt: 285000, stock_quantity: 3, lead_time: '14-21 Days', image: '/images/products/sovereign-corner-sectional.jpg' },
  { id: '2', name: 'Royal Chesterfield Suite', slug: 'royal-chesterfield-suite', category: 'living-room', category_name: 'Living Room', timber_type: 'Solid Hardwood', upholstery: 'Italian Tan Leather', price_bdt: 350000, stock_quantity: 2, lead_time: '18-24 Days', image: '/images/products/royal-chesterfield-suite.jpg' },

  // 2. Master Bedroom (2 Flagships)
  { id: '5', name: 'Imperial Burma Teak King Bed', slug: 'imperial-burma-teak-king-bed', category: 'master-bedroom', category_name: 'Master Bedroom', timber_type: 'Solid Burma Teak', upholstery: 'Fluted Headboard & Nightstands', price_bdt: 195000, stock_quantity: 3, lead_time: '18-24 Days', image: '/images/products/imperial-burma-teak-king-bed.jpg' },
  { id: '6', name: 'Floating Platform Bed', slug: 'floating-platform-bed', category: 'master-bedroom', category_name: 'Master Bedroom', timber_type: 'Seasoned Teak', upholstery: 'Integrated Underbed LED Glow', price_bdt: 165000, stock_quantity: 2, lead_time: '14-18 Days', image: '/images/products/floating-platform-bed.jpg' },

  // 3. Royal Dining (2 Flagships)
  { id: '9', name: 'Grand Heritage 8-Seater', slug: 'grand-heritage-8-seater', category: 'royal-dining', category_name: 'Royal Dining', timber_type: 'Solid Mahogany', upholstery: 'Sintered Stone & 8 Bouclé Chairs', price_bdt: 320000, stock_quantity: 2, lead_time: '14-20 Days', image: '/images/products/grand-heritage-8-seater.jpg' },
  { id: '10', name: 'Sculptural Round Pedestal', slug: 'sculptural-round-pedestal', category: 'royal-dining', category_name: 'Royal Dining', timber_type: 'Solid Burma Teak', upholstery: 'Hand-Turned Fluted 6-Seater', price_bdt: 145000, stock_quantity: 3, lead_time: '14-18 Days', image: '/images/products/sculptural-round-pedestal.jpg' },

  // 4. Executive & Study (2 Flagships)
  { id: '13', name: 'Executive Conference Table', slug: 'executive-conference-table', category: 'executive-study', category_name: 'Executive & Study', timber_type: 'Solid Red Mahogany', upholstery: 'Monumental 10-Seater Live Edge', price_bdt: 450000, stock_quantity: 1, lead_time: '21-30 Days', image: '/images/products/executive-conference-table.jpg' },
  { id: '15', name: 'Presidential Executive Desk', slug: 'presidential-executive-desk', category: 'executive-study', category_name: 'Executive & Study', timber_type: 'Burma Teak', upholstery: 'Tuscan Leather Writing Inlay', price_bdt: 185000, stock_quantity: 2, lead_time: '16-22 Days', image: '/images/products/presidential-executive-desk.jpg' },
];

const CATEGORIES = [
  { id: 'all', label: 'All Curated Pieces', count: 8 },
  { id: 'living-room', label: 'Living Room', count: 2, slug: 'living-room' },
  { id: 'master-bedroom', label: 'Master Bedroom', count: 2, slug: 'master-bedroom' },
  { id: 'royal-dining', label: 'Royal Dining', count: 2, slug: 'royal-dining' },
  { id: 'executive-study', label: 'Executive Study', count: 2, slug: 'executive-study' },
];

export default function ArccaProjectsGrid() {
  const [products, setProducts] = useState(HOMEPAGE_CURATED_PRODUCTS);
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    async function syncCuratedProducts() {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*, categories(name, slug)')
          .eq('status', 'active');

        if (!error && data && data.length > 0) {
          // Keep only the 2 flagship pieces for each category
          const curatedSlugs = HOMEPAGE_CURATED_PRODUCTS.map((p) => p.slug);
          const matched = data.filter((p) => curatedSlugs.includes(p.slug));

          if (matched.length > 0) {
            const mapped = matched.map((p) => {
              const fallback = HOMEPAGE_CURATED_PRODUCTS.find((f) => f.slug === p.slug);
              return {
                ...p,
                category: fallback?.category || 'living-room',
                category_name: p.categories?.name || fallback?.category_name || 'Heirloom Piece',
                image: PRODUCT_IMAGE_MAP[p.slug] || fallback?.image,
                upholstery: p.upholstery || fallback?.upholstery || 'Handcrafted Joinery',
              };
            });
            setProducts(mapped);
          }
        }
      } catch (err) {
        console.warn('[ArccaProjectsGrid] Fallback to local curated flagships', err);
      }
    }

    syncCuratedProducts();
  }, []);

  const filteredProducts = activeCategory === 'all'
    ? products
    : products.filter((p) => p.category === activeCategory);

  return (
    <section id="collections" className="bg-linen text-espresso-deep py-24 md:py-32 px-6 md:px-16 relative">
      {/* Animated Top Border */}
      <motion.div
        className="absolute top-0 left-0 w-full h-px bg-espresso-deep/20 origin-left"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: 'easeInOut' }}
      />
      
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3.5 h-3.5 border border-bronze rotate-45 inline-block" />
              <span className="font-mono text-[11px] tracking-[0.35em] text-bronze uppercase">
                THE ATELIER CATALOG
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl text-espresso-deep leading-tight">
              Curated Flagship Pieces.
            </h2>
            <p className="text-espresso-deep/80 text-sm md:text-base font-body mt-4 leading-relaxed">
              Featuring 2 hallmark heirlooms from each architectural suite. Explore dedicated suite pages for deep timber briefs, dimensional blueprints, and our 6-phase white-glove commissioning protocol.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2 rounded-full text-xs font-mono tracking-wider transition-all duration-300 cursor-pointer flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-espresso text-linen shadow-md font-semibold'
                      : 'bg-white/80 border border-espresso-deep/15 text-espresso-deep hover:bg-espresso-deep hover:text-linen'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isActive ? 'bg-bronze text-linen' : 'bg-espresso-deep/10 text-espresso-deep'
                  }`}>
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Category Suite Deep-Dive Banner */}
        {activeCategory !== 'all' && (
          <div className="mb-8 p-4 rounded-2xl bg-white/70 border border-espresso-deep/10 flex items-center justify-between">
            <span className="text-xs font-mono text-espresso-deep/80">
              Viewing 2 featured heirlooms from <strong className="text-espresso-deep">{CATEGORIES.find((c) => c.id === activeCategory)?.label}</strong>.
            </span>
            <Link
              to={`/collections/${activeCategory}`}
              className="text-xs font-mono uppercase tracking-wider text-bronze hover:text-espresso-deep flex items-center gap-1 font-semibold group"
            >
              <span>Explore Full 4-Piece Suite & Technical Briefs</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        )}

        {/* ── 8 CURATED PRODUCT CARDS (2 PER CATEGORY) ── */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
        >
          <AnimatePresence>
            {filteredProducts.map((product) => {
              const whatsappUrl = buildProductWhatsAppUrl(
                product.name,
                `Timber: ${product.timber_type} | Category: ${product.category_name} | Price: ৳${Number(product.price_bdt).toLocaleString('en-IN')}`
              );

              return (
                <motion.div
                  key={product.id || product.slug}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.4 }}
                  className="bg-white rounded-2xl border border-espresso-deep/10 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-500 group flex flex-col justify-between"
                >
                  {/* Product Image Box with 4:3 Aspect Ratio */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-[#F5EFEB]">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-espresso/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Category Tag */}
                    <Link
                      to={`/collections/${product.category}`}
                      className="absolute top-3.5 left-3.5 bg-white/95 backdrop-blur-md text-espresso-deep text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-md shadow-xs font-medium hover:bg-espresso hover:text-linen transition-colors"
                    >
                      {product.category_name}
                    </Link>

                    {/* Stock status pill */}
                    <span className="absolute top-3.5 right-3.5 bg-espresso/85 backdrop-blur-md text-linen text-[9px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-md">
                      {product.stock_quantity > 0 ? `${product.stock_quantity} in Atelier` : 'Bespoke Order'}
                    </span>
                  </div>

                  {/* Product Details Box */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-display text-lg text-espresso-deep group-hover:text-bronze transition-colors font-semibold leading-snug">
                        {product.name}
                      </h3>

                      <div className="mt-2.5 space-y-1.5 text-xs font-mono text-espresso-deep/70">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] text-bronze uppercase">Timber:</span>
                          <span className="font-medium text-espresso-deep">{product.timber_type}</span>
                        </div>
                        {product.upholstery && (
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] text-bronze uppercase">Spec:</span>
                            <span className="truncate max-w-[150px] text-right font-medium text-espresso-deep/90">{product.upholstery}</span>
                          </div>
                        )}
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] text-bronze uppercase">Lead Time:</span>
                          <span>{product.lead_time || '14–21 Days'}</span>
                        </div>
                      </div>
                    </div>

                    {/* Pricing & Inquire Footer */}
                    <div className="mt-5 pt-4 border-t border-espresso-deep/10 flex items-center justify-between">
                      <div>
                        <span className="text-[9px] font-mono text-espresso-deep/60 uppercase block">
                          Investment
                        </span>
                        <span className="font-display text-base text-espresso-deep font-bold">
                          ৳{Number(product.price_bdt).toLocaleString('en-IN')}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <Link
                          to={`/collections/${product.category}`}
                          className="p-2 rounded-xl border border-espresso-deep/15 hover:border-espresso text-espresso-deep text-xs font-mono uppercase"
                          title="View Full Category Specs"
                        >
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </Link>

                        <a
                          href={whatsappUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-2 rounded-xl bg-espresso text-linen hover:bg-bronze transition-colors duration-300 flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider font-semibold shadow-xs"
                          title="Customize & Order on WhatsApp"
                        >
                          <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-[10px]">Inquire</span>
                        </a>
                      </div>
                    </div>

                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* ── 4 DEDICATED SUITE PORTALS BANNER ── */}
        <div className="mt-16 p-8 md:p-12 rounded-3xl bg-[#1E1005] text-linen border border-bronze/20 shadow-xl">
          <div className="max-w-2xl mb-8">
            <span className="text-xs font-mono text-bronze uppercase tracking-[0.3em] block mb-2 font-semibold">
              COMPLETE RESIDENCE BLUEPRINTS
            </span>
            <h3 className="font-display text-2xl sm:text-4xl text-linen leading-tight">
              Explore Dedicated Category Suites.
            </h3>
            <p className="text-xs sm:text-sm font-mono text-linen/70 mt-3 leading-relaxed">
              Every room has its own dimensional logic. Visit our dedicated suite portals for complete 4-piece catalog briefs, vacuum kiln-seasoning reports, and the 6-phase white-glove delivery system.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              to="/collections/living-room"
              className="p-5 rounded-2xl bg-surface/80 border border-bronze/20 hover:border-bronze transition-all group flex flex-col justify-between"
            >
              <div>
                <span className="text-[9px] font-mono uppercase text-bronze tracking-widest block mb-1">Suite 01</span>
                <h4 className="font-display text-lg text-linen group-hover:text-bronze transition-colors">Living Room</h4>
                <p className="text-[11px] text-linen/60 font-mono mt-1">Sectionals, Chesterfield, Coffee Tables, TV Consoles</p>
              </div>
              <div className="mt-4 flex items-center gap-1 text-[11px] font-mono text-bronze uppercase tracking-wider">
                <span>View 4 Pieces</span>
                <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>

            <Link
              to="/collections/master-bedroom"
              className="p-5 rounded-2xl bg-surface/80 border border-bronze/20 hover:border-bronze transition-all group flex flex-col justify-between"
            >
              <div>
                <span className="text-[9px] font-mono uppercase text-bronze tracking-widest block mb-1">Suite 02</span>
                <h4 className="font-display text-lg text-linen group-hover:text-bronze transition-colors">Master Bedroom</h4>
                <p className="text-[11px] text-linen/60 font-mono mt-1">Hydraulic Beds, Wardrobes, Floating Frames, Vanities</p>
              </div>
              <div className="mt-4 flex items-center gap-1 text-[11px] font-mono text-bronze uppercase tracking-wider">
                <span>View 4 Pieces</span>
                <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>

            <Link
              to="/collections/royal-dining"
              className="p-5 rounded-2xl bg-surface/80 border border-bronze/20 hover:border-bronze transition-all group flex flex-col justify-between"
            >
              <div>
                <span className="text-[9px] font-mono uppercase text-bronze tracking-widest block mb-1">Suite 03</span>
                <h4 className="font-display text-lg text-linen group-hover:text-bronze transition-colors">Royal Dining</h4>
                <p className="text-[11px] text-linen/60 font-mono mt-1">8-Seater Trestles, Pedestals, Credenzas, Bouclé Chairs</p>
              </div>
              <div className="mt-4 flex items-center gap-1 text-[11px] font-mono text-bronze uppercase tracking-wider">
                <span>View 4 Pieces</span>
                <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>

            <Link
              to="/collections/executive-study"
              className="p-5 rounded-2xl bg-surface/80 border border-bronze/20 hover:border-bronze transition-all group flex flex-col justify-between"
            >
              <div>
                <span className="text-[9px] font-mono uppercase text-bronze tracking-widest block mb-1">Suite 04</span>
                <h4 className="font-display text-lg text-linen group-hover:text-bronze transition-colors">Executive Study</h4>
                <p className="text-[11px] text-linen/60 font-mono mt-1">Conference Slabs, Library Walls, Biometric Desks</p>
              </div>
              <div className="mt-4 flex items-center gap-1 text-[11px] font-mono text-bronze uppercase tracking-wider">
                <span>View 4 Pieces</span>
                <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
