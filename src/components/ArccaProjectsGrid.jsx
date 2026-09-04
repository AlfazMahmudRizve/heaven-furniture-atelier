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
    <section id="collections" className="bg-[#160F0A] text-[#E8DCC8] py-24 lg:py-32 px-6 lg:px-14 relative border-t border-[#E8DCC8]/15">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Editorial Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-8 border-b border-[#E8DCC8]/15">
          <div className="max-w-2xl space-y-3">
            <span className="font-mono text-[11px] text-[#C6A75E] uppercase tracking-[0.35em] block">
              04 / ATELIER CATALOG
            </span>
            <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl text-[#F5EFEB] tracking-tight font-light leading-tight">
              Curated <br />
              <span className="italic font-normal text-[#E8DCC8]">Flagship Pieces.</span>
            </h2>
            <p className="text-[#E8DCC8]/80 text-sm md:text-base font-body pt-1 leading-relaxed font-light">
              Featuring 2 hallmark heirlooms from each architectural suite. Visit dedicated suite portals for complete product specifications, dimensional blueprints, and our white-glove commissioning protocol.
            </p>
          </div>

          {/* Poliform Minimalist Category Filters */}
          <div className="flex flex-wrap gap-3 font-mono text-xs">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`py-2 px-3.5 rounded-full transition-all duration-300 cursor-pointer flex items-center gap-2 ${
                    isActive
                      ? 'bg-[#C6A75E] text-[#160F0A] font-bold shadow-md'
                      : 'border border-[#E8DCC8]/20 text-[#E8DCC8]/70 hover:border-[#C6A75E] hover:text-[#F5EFEB]'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span className={`text-[10px] ${isActive ? 'text-[#160F0A]' : 'text-[#C6A75E]'}`}>
                    ({cat.count})
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── 8 CURATED PRODUCT CARDS (POLIFORM MINIMALIST GALLERY) ── */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10"
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
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.35 }}
                  className="group flex flex-col justify-between space-y-4"
                >
                  {/* Clean Framed Photography Viewport */}
                  <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-[#23180F] border border-[#E8DCC8]/15">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover brightness-[0.92] transition-transform duration-700 ease-out group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#160F0A]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Minimal Category Eyebrow in Corner */}
                    <div className="absolute top-3 left-3 bg-[#160F0A]/90 backdrop-blur-md text-[#C6A75E] text-[9px] font-mono uppercase tracking-widest px-2.5 py-1 rounded border border-[#E8DCC8]/15">
                      {product.category_name}
                    </div>

                    {/* Stock pill */}
                    <span className="absolute bottom-3 right-3 bg-[#160F0A]/85 backdrop-blur-md text-[#E8DCC8] border border-[#E8DCC8]/15 text-[9px] font-mono uppercase tracking-wider px-2 py-0.5 rounded">
                      {product.stock_quantity > 0 ? `${product.stock_quantity} in Atelier` : 'Bespoke Order'}
                    </span>
                  </div>

                  {/* Clean Editorial Meta Below Image */}
                  <div className="space-y-2 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-display text-lg text-[#F5EFEB] group-hover:text-[#C6A75E] transition-colors leading-snug">
                        {product.name}
                      </h3>

                      <p className="text-xs font-mono text-[#E8DCC8]/70 mt-1 truncate">
                        {product.timber_type} {product.upholstery ? `· ${product.upholstery}` : ''}
                      </p>
                    </div>

                    {/* Pricing & Inquiry Row with Hairline */}
                    <div className="pt-3 border-t border-[#E8DCC8]/15 flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-[9px] font-mono uppercase tracking-wider text-[#E8DCC8]/50">
                          Investment
                        </span>
                        <span className="font-display text-sm font-semibold text-[#C6A75E]">
                          ৳{Number(product.price_bdt).toLocaleString('en-IN')}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <Link
                          to={`/collections/${product.category}`}
                          className="p-1.5 rounded-full border border-[#E8DCC8]/20 hover:border-[#C6A75E] text-[#E8DCC8] hover:text-[#C6A75E] transition-colors"
                          title="View Category Suite"
                        >
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </Link>

                        <a
                          href={whatsappUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1.5 rounded-full bg-[#C6A75E] hover:bg-[#E8DCC8] text-[#160F0A] transition-colors duration-300 flex items-center gap-1 text-[11px] font-mono uppercase tracking-wider font-bold cursor-pointer"
                        >
                          <MessageCircle className="w-3 h-3 text-[#160F0A]" />
                          <span>Inquire</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* ── POLIFORM DEDICATED SUITE PORTALS STRIP ── */}
        <div className="pt-16 border-t border-[#E8DCC8]/15 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-[11px] font-mono text-[#C6A75E] uppercase tracking-[0.3em] block mb-1 font-semibold">
                COMPLETE RESIDENCE BLUEPRINTS
              </span>
              <h3 className="font-display text-2xl sm:text-3xl text-[#F5EFEB] font-light">
                Explore Dedicated Suite Portals.
              </h3>
            </div>
            <p className="text-xs font-mono text-[#E8DCC8]/70 max-w-md">
              Complete 4-piece catalog briefs, vacuum kiln-seasoning reports, and the 6-phase white-glove delivery system for each room.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link
              to="/collections/living-room"
              className="p-6 rounded-lg bg-[#23180F]/40 border border-[#E8DCC8]/15 hover:border-[#C6A75E] transition-all group flex flex-col justify-between space-y-4"
            >
              <div>
                <span className="text-[10px] font-mono uppercase text-[#C6A75E] tracking-widest block mb-1">01 / SUITE</span>
                <h4 className="font-display text-lg text-[#F5EFEB] group-hover:text-[#C6A75E] transition-colors font-medium">Living Room</h4>
                <p className="text-[11px] text-[#E8DCC8]/70 font-mono mt-1">Sectionals, Chesterfields, Coffee Tables, TV Consoles</p>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#C6A75E] uppercase tracking-wider">
                <span>View 4 Pieces</span>
                <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>

            <Link
              to="/collections/master-bedroom"
              className="p-6 rounded-lg bg-[#23180F]/40 border border-[#E8DCC8]/15 hover:border-[#C6A75E] transition-all group flex flex-col justify-between space-y-4"
            >
              <div>
                <span className="text-[10px] font-mono uppercase text-[#C6A75E] tracking-widest block mb-1">02 / SUITE</span>
                <h4 className="font-display text-lg text-[#F5EFEB] group-hover:text-[#C6A75E] transition-colors font-medium">Master Bedroom</h4>
                <p className="text-[11px] text-[#E8DCC8]/70 font-mono mt-1">Hydraulic Beds, Wardrobes, Floating Frames, Vanities</p>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#C6A75E] uppercase tracking-wider">
                <span>View 4 Pieces</span>
                <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>

            <Link
              to="/collections/royal-dining"
              className="p-6 rounded-lg bg-[#23180F]/40 border border-[#E8DCC8]/15 hover:border-[#C6A75E] transition-all group flex flex-col justify-between space-y-4"
            >
              <div>
                <span className="text-[10px] font-mono uppercase text-[#C6A75E] tracking-widest block mb-1">03 / SUITE</span>
                <h4 className="font-display text-lg text-[#F5EFEB] group-hover:text-[#C6A75E] transition-colors font-medium">Royal Dining</h4>
                <p className="text-[11px] text-[#E8DCC8]/70 font-mono mt-1">8-Seater Trestles, Pedestals, Credenzas, Bouclé Chairs</p>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#C6A75E] uppercase tracking-wider">
                <span>View 4 Pieces</span>
                <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>

            <Link
              to="/collections/executive-study"
              className="p-6 rounded-lg bg-[#23180F]/40 border border-[#E8DCC8]/15 hover:border-[#C6A75E] transition-all group flex flex-col justify-between space-y-4"
            >
              <div>
                <span className="text-[10px] font-mono uppercase text-[#C6A75E] tracking-widest block mb-1">04 / SUITE</span>
                <h4 className="font-display text-lg text-[#F5EFEB] group-hover:text-[#C6A75E] transition-colors font-medium">Executive Study</h4>
                <p className="text-[11px] text-[#E8DCC8]/70 font-mono mt-1">Conference Slabs, Library Walls, Biometric Desks</p>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#C6A75E] uppercase tracking-wider">
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
