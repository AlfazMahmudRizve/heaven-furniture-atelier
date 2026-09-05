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
    <section id="collections" className="bg-[#F5EFEB] text-[#241A14] py-24 lg:py-32 px-6 lg:px-14 relative border-t border-[#241A14]/10">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Editorial Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-8 border-b border-[#241A14]/10">
          <div className="max-w-2xl space-y-3">
            <div className="flex items-center gap-3">
              <span className="font-mono text-[11px] text-[#8F753A] uppercase tracking-[0.35em] block font-semibold">
                05 / FURNITURE COLLECTION
              </span>
              <span className="font-mono text-[9px] px-2.5 py-0.5 rounded-full bg-[#C6A75E]/20 text-[#8F753A] uppercase tracking-wider font-bold">
                Handmade in Chattogram
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl text-[#241A14] tracking-tight font-light leading-tight">
              Signature <br />
              <span className="italic font-normal text-[#6B5344]">Wood Pieces.</span>
            </h2>
            <p className="text-[#241A14]/75 text-sm md:text-base font-body pt-1 leading-relaxed font-light">
              Browse our popular living, bedroom, dining, and office pieces. Tap any item to inspect wood details and inquire directly on WhatsApp.
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
                  className={`py-2 px-3.5 rounded-full transition-colors duration-300 cursor-pointer flex items-center gap-2 ${
                    isActive
                      ? 'bg-[#C6A75E] text-[#241A14] font-bold shadow-md'
                      : 'border border-[#241A14]/15 text-[#241A14]/70 hover:border-[#8F753A] hover:text-[#241A14]'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span className={`text-[10px] ${isActive ? 'text-[#241A14]' : 'text-[#8F753A]'}`}>
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
                  className="group flex flex-col justify-between space-y-4 bg-[#FDFAF6] p-4 rounded-xl border border-[#241A14]/10 shadow-sm shadow-[0_2px_20px_rgba(36,26,20,0.06)] hover:shadow-xl transition-shadow duration-300"
                >
                  {/* Clean Framed Photography Viewport */}
                  <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-[#E8DCC8] border border-[#241A14]/10">
                    <img
                      src={product.image}
                      alt={product.name}
                      width={800}
                      height={600}
                      className="w-full h-full object-cover brightness-[0.96] transition-transform duration-700 ease-out group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Minimal Category Eyebrow in Corner */}
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-[#8F753A] text-[9px] font-mono uppercase tracking-widest px-2.5 py-1 rounded border border-[#241A14]/10 font-semibold shadow-sm">
                      {product.category_name}
                    </div>

                    {/* Stock pill */}
                    <span className="absolute bottom-3 right-3 bg-white/85 backdrop-blur-md text-[#241A14] border border-[#241A14]/10 text-[9px] font-mono uppercase tracking-wider px-2 py-0.5 rounded font-medium shadow-sm">
                      {product.stock_quantity > 0 ? `${product.stock_quantity} in Atelier` : 'Bespoke Order'}
                    </span>
                  </div>

                  {/* Clean Editorial Meta Below Image */}
                  <div className="space-y-2 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-display text-lg text-[#241A14] group-hover:text-[#8F753A] transition-colors leading-snug font-medium">
                        {product.name}
                      </h3>

                      <p className="text-xs font-mono text-[#241A14]/65 mt-1 truncate">
                        {product.timber_type} {product.upholstery ? `· ${product.upholstery}` : ''}
                      </p>
                    </div>

                    {/* Pricing & Inquiry Row with Hairline */}
                    <div className="pt-3 border-t border-[#241A14]/10 flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-[9px] font-mono uppercase tracking-wider text-[#241A14]/50">
                          Investment
                        </span>
                        <span className="font-display text-sm font-semibold text-[#8F753A]">
                          ৳{Number(product.price_bdt).toLocaleString('en-IN')}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <Link
                          to={`/collections/${product.category}`}
                          className="p-1.5 rounded-full border border-[#241A14]/20 hover:border-[#8F753A] text-[#241A14] hover:text-[#8F753A] transition-colors"
                          title="View Category Suite"
                        >
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </Link>

                        <a
                          href={whatsappUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1.5 rounded-full bg-[#C6A75E] hover:bg-[#241A14] hover:text-[#F5EFEB] text-[#241A14] transition-colors duration-300 flex items-center gap-1 text-[11px] font-mono uppercase tracking-wider font-bold cursor-pointer shadow-sm"
                        >
                          <MessageCircle className="w-3 h-3 text-current" />
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
        <div className="pt-16 border-t border-[#241A14]/10 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-[11px] font-mono text-[#8F753A] uppercase tracking-[0.3em] block mb-1 font-semibold">
                EXPLORE BY ROOM
              </span>
              <h3 className="font-display text-2xl sm:text-3xl text-[#241A14] font-light">
                Browse Full Room Sets.
              </h3>
            </div>
            <p className="text-xs font-mono text-[#241A14]/70 max-w-md">
              Explore 4-piece matching sets for your entire home. Delivered and assembled carefully by our Chattogram workshop team.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link
              to="/collections/living-room"
              className="p-6 rounded-xl bg-[#FDFAF6] border border-[#241A14]/10 hover:border-[#8F753A] hover:shadow-md transition-colors transition-shadow group flex flex-col justify-between space-y-4 shadow-sm"
            >
              <div>
                <span className="text-[10px] font-mono uppercase text-[#8F753A] tracking-widest block mb-1 font-semibold">01 / SUITE</span>
                <h4 className="font-display text-lg text-[#241A14] group-hover:text-[#8F753A] transition-colors font-medium">Living Room</h4>
                <p className="text-[11px] text-[#241A14]/65 font-mono mt-1">Sectionals, Chesterfields, Coffee Tables, TV Consoles</p>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#8F753A] uppercase tracking-wider font-semibold">
                <span>View 4 Pieces</span>
                <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>

            <Link
              to="/collections/master-bedroom"
              className="p-6 rounded-xl bg-[#FDFAF6] border border-[#241A14]/10 hover:border-[#8F753A] hover:shadow-md transition-colors transition-shadow group flex flex-col justify-between space-y-4 shadow-sm"
            >
              <div>
                <span className="text-[10px] font-mono uppercase text-[#8F753A] tracking-widest block mb-1 font-semibold">02 / SUITE</span>
                <h4 className="font-display text-lg text-[#241A14] group-hover:text-[#8F753A] transition-colors font-medium">Master Bedroom</h4>
                <p className="text-[11px] text-[#241A14]/65 font-mono mt-1">Hydraulic Beds, Wardrobes, Floating Frames, Vanities</p>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#8F753A] uppercase tracking-wider font-semibold">
                <span>View 4 Pieces</span>
                <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>

            <Link
              to="/collections/royal-dining"
              className="p-6 rounded-xl bg-[#FDFAF6] border border-[#241A14]/10 hover:border-[#8F753A] hover:shadow-md transition-colors transition-shadow group flex flex-col justify-between space-y-4 shadow-sm"
            >
              <div>
                <span className="text-[10px] font-mono uppercase text-[#8F753A] tracking-widest block mb-1 font-semibold">03 / SUITE</span>
                <h4 className="font-display text-lg text-[#241A14] group-hover:text-[#8F753A] transition-colors font-medium">Royal Dining</h4>
                <p className="text-[11px] text-[#241A14]/65 font-mono mt-1">8-Seater Trestles, Pedestals, Credenzas, Bouclé Chairs</p>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#8F753A] uppercase tracking-wider font-semibold">
                <span>View 4 Pieces</span>
                <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>

            <Link
              to="/collections/executive-study"
              className="p-6 rounded-xl bg-[#FDFAF6] border border-[#241A14]/10 hover:border-[#8F753A] hover:shadow-md transition-colors transition-shadow group flex flex-col justify-between space-y-4 shadow-sm"
            >
              <div>
                <span className="text-[10px] font-mono uppercase text-[#8F753A] tracking-widest block mb-1 font-semibold">04 / SUITE</span>
                <h4 className="font-display text-lg text-[#241A14] group-hover:text-[#8F753A] transition-colors font-medium">Executive Study</h4>
                <p className="text-[11px] text-[#241A14]/65 font-mono mt-1">Conference Slabs, Library Walls, Biometric Desks</p>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#8F753A] uppercase tracking-wider font-semibold">
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
