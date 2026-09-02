import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, MessageCircle, ShieldCheck, ArrowUpRight, Check, SlidersHorizontal } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { buildProductWhatsAppUrl } from '../utils/whatsapp';

// Explicit mapping of each product slug to its unique, handcrafted photograph
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

// Fallback catalog with 100% unique handcrafted images
const FALLBACK_PRODUCTS = [
  // Living Room
  { id: '1', name: 'Sovereign Corner Sectional', slug: 'sovereign-corner-sectional', category: 'living', category_name: 'Living Room', timber_type: 'Burma Teak', upholstery: 'Belgian Ivory Velvet', price_bdt: 285000, stock_quantity: 3, lead_time: '14-21 Days', image: '/images/products/sovereign-corner-sectional.jpg' },
  { id: '2', name: 'Royal Chesterfield Suite', slug: 'royal-chesterfield-suite', category: 'living', category_name: 'Living Room', timber_type: 'Solid Hardwood', upholstery: 'Italian Tan Leather', price_bdt: 350000, stock_quantity: 2, lead_time: '18-24 Days', image: '/images/products/royal-chesterfield-suite.jpg' },
  { id: '3', name: 'Fluted Teak Coffee Table', slug: 'fluted-teak-coffee-table', category: 'living', category_name: 'Living Room', timber_type: 'Solid Burma Teak', upholstery: 'Fluted Pedestal Base', price_bdt: 45000, stock_quantity: 5, lead_time: '7-10 Days', image: '/images/products/fluted-teak-coffee-table.jpg' },
  { id: '4', name: 'Sintered Stone TV Console', slug: 'sintered-stone-tv-console', category: 'living', category_name: 'Living Room', timber_type: 'Solid Burma Teak', upholstery: 'Calacatta Sintered Stone', price_bdt: 78000, stock_quantity: 4, lead_time: '10-14 Days', image: '/images/products/sintered-stone-tv-console.jpg' },

  // Bedroom
  { id: '5', name: 'Imperial Burma Teak King Bed', slug: 'imperial-burma-teak-king-bed', category: 'bedroom', category_name: 'Master Bedroom', timber_type: 'Solid Burma Teak', upholstery: 'Fluted Headboard & Nightstands', price_bdt: 195000, stock_quantity: 3, lead_time: '18-24 Days', image: '/images/products/imperial-burma-teak-king-bed.jpg' },
  { id: '6', name: 'Floating Platform Bed', slug: 'floating-platform-bed', category: 'bedroom', category_name: 'Master Bedroom', timber_type: 'Seasoned Teak', upholstery: 'Integrated Underbed LED Glow', price_bdt: 165000, stock_quantity: 2, lead_time: '14-18 Days', image: '/images/products/floating-platform-bed.jpg' },
  { id: '7', name: 'Floor-to-Ceiling Wardrobe', slug: 'floor-to-ceiling-wardrobe', category: 'bedroom', category_name: 'Master Bedroom', timber_type: 'Burma Teak', upholstery: 'Fluted Glass & Interior LEDs', price_bdt: 220000, stock_quantity: 1, lead_time: '21-28 Days', image: '/images/products/floor-to-ceiling-wardrobe.jpg' },
  { id: '8', name: 'Vanity Dressing Station', slug: 'vanity-dressing-station', category: 'bedroom', category_name: 'Master Bedroom', timber_type: 'Solid Teak', upholstery: 'Backlit Mirror & Bouclé Ottoman', price_bdt: 55000, stock_quantity: 4, lead_time: '10-14 Days', image: '/images/products/vanity-dressing-station.jpg' },

  // Dining
  { id: '9', name: 'Grand Heritage 8-Seater', slug: 'grand-heritage-8-seater', category: 'dining', category_name: 'Royal Dining', timber_type: 'Solid Mahogany', upholstery: 'Sintered Stone & 8 Bouclé Chairs', price_bdt: 320000, stock_quantity: 2, lead_time: '14-20 Days', image: '/images/products/grand-heritage-8-seater.jpg' },
  { id: '10', name: 'Sculptural Round Pedestal', slug: 'sculptural-round-pedestal', category: 'dining', category_name: 'Royal Dining', timber_type: 'Solid Burma Teak', upholstery: 'Hand-Turned Fluted 6-Seater', price_bdt: 145000, stock_quantity: 3, lead_time: '14-18 Days', image: '/images/products/sculptural-round-pedestal.jpg' },
  { id: '11', name: 'Display Credenza', slug: 'display-credenza', category: 'dining', category_name: 'Royal Dining', timber_type: 'Solid Burma Teak', upholstery: 'Reeded Fluted Glass & LEDs', price_bdt: 95000, stock_quantity: 3, lead_time: '12-16 Days', image: '/images/products/display-credenza.jpg' },
  { id: '12', name: 'Ergonomic Dining Chairs', slug: 'ergonomic-dining-chairs', category: 'dining', category_name: 'Royal Dining', timber_type: 'Solid Mahogany', upholstery: 'Curved Frame & Ivory Bouclé', price_bdt: 18000, stock_quantity: 20, lead_time: '7-10 Days', image: '/images/products/ergonomic-dining-chairs.jpg' },

  // Executive
  { id: '13', name: 'Executive Conference Table', slug: 'executive-conference-table', category: 'executive', category_name: 'Executive & Study', timber_type: 'Solid Red Mahogany', upholstery: 'Monumental 10-Seater Live Edge', price_bdt: 450000, stock_quantity: 1, lead_time: '21-30 Days', image: '/images/products/executive-conference-table.jpg' },
  { id: '14', name: 'Architectural Library Bookshelf', slug: 'architectural-library-bookshelf', category: 'executive', category_name: 'Executive & Study', timber_type: 'Burma Teak', upholstery: 'Rolling Brass Ladder & LED Shelves', price_bdt: 265000, stock_quantity: 1, lead_time: '21-28 Days', image: '/images/products/architectural-library-bookshelf.jpg' },
  { id: '15', name: 'Presidential Executive Desk', slug: 'presidential-executive-desk', category: 'executive', category_name: 'Executive & Study', timber_type: 'Burma Teak', upholstery: 'Tuscan Leather Writing Inlay', price_bdt: 185000, stock_quantity: 2, lead_time: '16-22 Days', image: '/images/products/presidential-executive-desk.jpg' },
  { id: '16', name: 'Modular Workstation', slug: 'modular-workstation', category: 'executive', category_name: 'Executive & Study', timber_type: 'Burma Teak', upholstery: 'L-Shaped Return & Cable Raceways', price_bdt: 95000, stock_quantity: 4, lead_time: '12-16 Days', image: '/images/products/modular-workstation.jpg' },
];

const CATEGORIES = [
  { id: 'all', label: 'All Pieces' },
  { id: 'living', label: 'Living Room' },
  { id: 'bedroom', label: 'Master Bedroom' },
  { id: 'dining', label: 'Royal Dining' },
  { id: 'executive', label: 'Executive Study' },
];

export default function ArccaProjectsGrid() {
  const [products, setProducts] = useState(FALLBACK_PRODUCTS);
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    async function loadLiveProducts() {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*, categories(name, slug)')
          .eq('status', 'active')
          .order('price_bdt', { ascending: false });

        if (!error && data && data.length > 0) {
          const mapped = data.map((p) => {
            const fallback = FALLBACK_PRODUCTS.find((f) => f.slug === p.slug || f.name.toLowerCase() === p.name.toLowerCase());
            const productSlug = p.slug || fallback?.slug;
            const uniqueImage = PRODUCT_IMAGE_MAP[productSlug] || fallback?.image || '/images/products/sovereign-corner-sectional.jpg';

            return {
              ...p,
              category: p.categories?.slug || fallback?.category || 'living',
              category_name: p.categories?.name || fallback?.category_name || 'Heirloom Piece',
              image: uniqueImage,
              upholstery: p.upholstery || fallback?.upholstery || 'Handcrafted Joinery',
            };
          });
          setProducts(mapped);
        }
      } catch (err) {
        console.warn('[ArccaProjectsGrid] Using fallback catalog with unique images', err);
      }
    }

    loadLiveProducts();
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
              16 Commissioned Heirloom Pieces.
            </h2>
            <p className="text-espresso-deep/80 text-sm md:text-base font-body mt-4 leading-relaxed">
              Every design is crafted from 100% seasoned timber heartwood. Select any piece below to view exact timber specifications or customize measurements directly with our Agrabad master artisans.
            </p>
          </div>

          {/* Interactive Category Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;
              const count = cat.id === 'all'
                ? products.length
                : products.filter((p) => p.category === cat.id).length;

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
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── PRODUCT CARDS GRID (16 UNIQUE PIECES) ── */}
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
                    <span className="absolute top-3.5 left-3.5 bg-white/95 backdrop-blur-md text-espresso-deep text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-md shadow-xs font-medium">
                      {product.category_name}
                    </span>

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

                      <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3.5 py-2 rounded-xl bg-espresso text-linen hover:bg-bronze transition-colors duration-300 flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider font-semibold shadow-xs"
                        title="Customize & Order on WhatsApp"
                      >
                        <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-[11px]">Inquire</span>
                      </a>
                    </div>

                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Customization Callout Footer */}
        <div className="mt-16 p-8 rounded-2xl bg-white border border-espresso-deep/10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs">
          <div>
            <div className="flex items-center gap-2 text-bronze text-xs font-mono uppercase tracking-wider mb-1 font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>Lifetime Structural Integrity Guarantee</span>
            </div>
            <h4 className="font-display text-xl text-espresso-deep">
              Require Custom Sizing or Different Wood Species?
            </h4>
            <p className="text-xs font-body text-espresso-deep/70 mt-1 max-w-xl">
              Every living room, master bed, or dining table can be modified in length, depth, and timber finish to suit your apartment layout.
            </p>
          </div>

          <a
            href="#bespoke"
            className="arcca-btn bg-espresso text-linen hover:bg-bronze px-6 py-3.5 rounded-xl text-xs font-mono uppercase tracking-widest font-semibold shrink-0 transition-colors shadow-md"
          >
            Launch 3D Configurator
          </a>
        </div>

      </div>
    </section>
  );
}
