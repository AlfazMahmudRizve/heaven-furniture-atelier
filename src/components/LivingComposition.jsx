import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageCircle,
  X,
  ChevronLeft,
  ChevronRight,
  Eye,
  EyeOff,
  ArrowRight,
  CheckCircle2,
  Maximize2
} from 'lucide-react';
import { buildProductWhatsAppUrl } from '../utils/whatsapp';

// ── COMPOSITIONS DATA (LIVING, BEDROOM, DINING) ──────────────────────
const ROOM_COMPOSITIONS = [
  {
    id: 'living',
    num: '01',
    name: 'The Living Composition',
    bangla: 'প্রধান লিভিং স্পেস',
    desc: 'Wide architectural view through floor-to-ceiling glass. Real daylight and warm perimeter illumination highlight hand-fluted Burma Teak, sintered Italian stone, and tailored velvet.',
    image: '/images/storefront-living.jpg',
    location: 'Agrabad Flagship Atelier · Natural Daylight',
    products: [
      {
        id: 'sofa',
        num: '01',
        name: 'The Sovereign Burma Teak L-Sectional',
        bangla: 'বার্মা সেগুন লাক্সারি এল-সেকশনাল',
        category: 'Living Room Suite',
        categorySlug: 'living-room',
        coords: { x: 67, y: 68 },
        price: 245000,
        priceFormatted: '৳2,45,000',
        timber: '100% Solid Burma Teak (বার্মা সেগুন)',
        upholstery: 'Belgian Alabaster Ivory Velvet & 45D Foam',
        joinery: 'Traditional Mortise & Tenon (Zero Screws)',
        dimensions: '3200mm W × 2100mm D × 780mm H',
        moisture: '8.5% Kiln Seasoned Coastal Stable',
        loadRating: '650 kg Dynamic Load Rating',
        warranty: 'Lifetime Structural Provenance',
        stagedStatus: 'Curated In Situ · Available for Viewing',
        heroImage: '/images/products/sovereign-corner-sectional.jpg',
        macroImage: '/images/cushion-velvet.jpg',
        explodedImage: '/images/joinery-mortise.jpg',
        desc: 'Quarter-sawn from mature Burma Teak heartwood logs. Anchors the primary living room with clean horizontal lines, tailored double-stitched velvet piping, and deep 45D ergonomic cushioning that never sags.',
        highlights: [
          'Solid timber heartwood base immune to Chattogram humidity',
          'Zero loose screws: hand-carved interlocking joints with hardwood dowels',
          'High-density 45D foam core wrapped in sanitized down topper'
        ]
      },
      {
        id: 'table',
        num: '02',
        name: 'Fluted Burma Teak Drum Table',
        bangla: 'হাতে খোদাইকৃত ফ্লুটেড সেগুন কফি টেবিল',
        category: 'Centerpiece Table',
        categorySlug: 'living-room',
        coords: { x: 51, y: 74 },
        price: 68000,
        priceFormatted: '৳68,000',
        timber: 'Quarter-Sawn Burma Teak (বার্মা সেগুন)',
        upholstery: 'Organic Hand-Rubbed Teak Oil Finish',
        joinery: '48 CNC-Fluted Teak Battens Around Hardwood Core',
        dimensions: '950mm Diameter × 440mm H',
        moisture: '8.5% Kiln Seasoned',
        loadRating: '200 kg Static Load',
        warranty: 'Lifetime Structural Provenance',
        stagedStatus: 'In Atelier Stock',
        heroImage: '/images/products/fluted-teak-coffee-table.jpg',
        macroImage: '/images/timber-macro.jpg',
        explodedImage: '/images/joinery-mortise.jpg',
        desc: 'Sculpted cylindrical silhouette with 48 individual hand-fluted teak battens. Functions as the tactile anchor of the living salon, treated with natural beeswax to highlight organic heartwood grain.',
        highlights: [
          'Concealed internal storage space accessible from top rim',
          'Hand-polished with chemical-free natural beeswax',
          'Quarter-sawn grain alignment prevents wood warping'
        ]
      },
      {
        id: 'lounge',
        num: '03',
        name: 'Kanto Ergonomic Accent Lounge Chair',
        bangla: 'এরগনোমিক ক্যান ও সেগুন লাউঞ্জ চেয়ার',
        category: 'Accent Seating',
        categorySlug: 'living-room',
        coords: { x: 26, y: 76 },
        price: 52000,
        priceFormatted: '৳52,000',
        timber: 'Seasoned Burma Teak & Hand-Woven Cane Rattan',
        upholstery: 'Tuscan Tan Leather Seat Cushion',
        joinery: 'Sculpted Teak Trestle Frame',
        dimensions: '720mm W × 780mm D × 750mm H',
        moisture: '8.5% Kiln Seasoned',
        loadRating: '180 kg Load Rating',
        warranty: 'Lifetime Structural Provenance',
        stagedStatus: 'Curated In Situ',
        heroImage: '/images/products/ergonomic-dining-chairs.jpg',
        macroImage: '/images/timber-macro.jpg',
        explodedImage: '/images/joinery-mortise.jpg',
        desc: 'Mid-century architectural stance featuring natural ventilated cane backrest and hand-stitched Tuscan leather seat. Perfectly angled for relaxed contemplation and coastal air circulation.',
        highlights: [
          'Natural cane weave breathes freely in humid weather',
          'Tuscan vegetable-tanned leather patinas naturally with age',
          'Calibrated 108° backrest angle for lumbar spine decompression'
        ]
      },
      {
        id: 'credenza',
        num: '04',
        name: 'Sintered Stone & Teak Media Console',
        bangla: 'সিন্টার্ড স্টোন ও সেগুন টিভি কনসোল',
        category: 'Architectural Cabinetry',
        categorySlug: 'living-room',
        coords: { x: 16, y: 70 },
        price: 115000,
        priceFormatted: '৳1,15,000',
        timber: 'Solid Red Mahogany & Burma Teak Base',
        upholstery: '12mm Italian Calacatta Sintered Stone Face',
        joinery: 'Concealed Tech Raceways & Blum Soft-Close',
        dimensions: '2200mm W × 450mm D × 520mm H',
        moisture: '8.5% Kiln Seasoned',
        loadRating: '150 kg Screen Support',
        warranty: 'Lifetime Structural Provenance',
        stagedStatus: 'Bespoke Order (14 Days)',
        heroImage: '/images/products/sintered-stone-tv-console.jpg',
        macroImage: '/images/timber-macro.jpg',
        explodedImage: '/images/joinery-mortise.jpg',
        desc: 'Architectural media credenza fusing heat/scratch-proof sintered stone cabinet doors with solid timber heartwood framing. Concealed interior channels manage high-fidelity audio and television cables invisibly.',
        highlights: [
          'Heat, scratch, and citrus acid-proof Italian stone slab',
          'German Blum soft-close hydraulic dampers',
          'Concealed brush cable pass-throughs prevent cord clutter'
        ]
      },
      {
        id: 'partition',
        num: '05',
        name: 'Acoustic Teak Slat Wall Partition',
        bangla: 'অ্যাকোস্টিক সলিড সেগুন কাঠের ওয়াল পার্টিশন',
        category: 'Architectural Millwork',
        categorySlug: 'living-room',
        coords: { x: 84, y: 40 },
        price: 1850,
        priceFormatted: '৳1,850 / sq ft',
        timber: '100% Solid Kiln-Dried Burma Teak Battens',
        upholstery: 'Acoustic Black Felt Backing',
        joinery: 'Continuous Tongue-and-Groove Millwork',
        dimensions: 'Custom Built to Ceiling Height',
        moisture: '8.5% Coastal Stabilized',
        loadRating: 'Architectural Structural Wall',
        warranty: 'Lifetime Provenance',
        stagedStatus: 'Curated Wall Installation',
        heroImage: '/images/products/architectural-library-bookshelf.jpg',
        macroImage: '/images/timber-macro.jpg',
        explodedImage: '/images/joinery-mortise.jpg',
        desc: 'Full-height architectural slat wall crafted from quarter-sawn teak battens. Dampens room echo while creating grand architectural separation between private living quarters and public reception areas.',
        highlights: [
          'In-home 3D laser measurement included across Chattogram & Dhaka',
          'Sound absorption acoustic NRC rating 0.75',
          'Pre-finished panels for zero-mess 1-day residential installation'
        ]
      },
      {
        id: 'bookcase',
        num: '06',
        name: 'Open-Frame Architectural Display Credenza',
        bangla: 'ওপেন ফ্রেম আর্কিটেকচারাল বুকশেলফ ও ডিসপ্লে',
        category: 'Storage & Display',
        categorySlug: 'living-room',
        coords: { x: 58, y: 48 },
        price: 140000,
        priceFormatted: '৳1,40,000',
        timber: 'Solid Burma Teak (বার্মা সেগুন)',
        upholstery: 'Brushed Brass Accent Dowels',
        joinery: 'Floating Interlocking Hardwood Shelves',
        dimensions: '1200mm W × 380mm D × 1900mm H',
        moisture: '8.5% Kiln Seasoned',
        loadRating: '300 kg Distributed Load',
        warranty: 'Lifetime Structural Provenance',
        stagedStatus: 'Curated In Situ',
        heroImage: '/images/products/display-credenza.jpg',
        macroImage: '/images/timber-macro.jpg',
        explodedImage: '/images/joinery-mortise.jpg',
        desc: 'Minimalist display architecture with floating teak shelves. Tested to display heavy sculpture collections and art volumes without mid-span deflection.',
        highlights: [
          'Solid 35mm thick timber shelves with zero sag',
          'Hand-mortised brass alignment pins',
          'Open silhouette preserves room daylight from both sides'
        ]
      }
    ]
  },
  {
    id: 'bedroom',
    num: '02',
    name: 'The Chamber Suite',
    bangla: 'মাস্টার বেডরুম সুট',
    desc: 'Staged luxury bedroom chamber featuring acoustic fluted Burma Teak headboard, floating bedside pedestals, and concealed 800L hydraulic sub-bed storage.',
    image: '/images/hero-bedroom.jpg',
    location: 'Agrabad Atelier · Chamber II',
    products: [
      {
        id: 'bed',
        num: '01',
        name: 'Imperial Burma Teak Hydraulic Platform Bed',
        bangla: 'ইম্পেরিয়াল বার্মা সেগুন হাইড্রোলিক প্ল্যাটফর্ম বেড',
        category: 'Master Bedroom Suite',
        categorySlug: 'master-bedroom',
        coords: { x: 50, y: 62 },
        price: 260000,
        priceFormatted: '৳2,60,000',
        timber: 'Seasoned Burma Teak & Gamari Sub-Frame',
        upholstery: 'Italian Fluted Headboard & Ambient LED Glow',
        joinery: 'German Hydraulic Lift & Mortise Frame',
        dimensions: '2100mm W × 2200mm L × 1200mm H (King)',
        moisture: '8.5% Kiln Seasoned',
        loadRating: '800 kg Static Frame Load',
        warranty: 'Lifetime Structural Warranty',
        stagedStatus: 'Curated In Situ',
        heroImage: '/images/products/imperial-burma-teak-king-bed.jpg',
        macroImage: '/images/timber-macro.jpg',
        explodedImage: '/images/products/floating-platform-bed.jpg',
        desc: 'Sculpted acoustic fluted headboard with German hydraulic lift mechanism accessing 800 litres of dust-free sub-storage.',
        highlights: [
          'German pneumatic gas struts lift heavy king mattress effortlessly',
          'Integrated warm 2700K ambient nightstand lighting',
          'Heavy Gamari timber slatted internal mattress foundation'
        ]
      },
      {
        id: 'nightstand',
        num: '02',
        name: 'Integrated Ambient Teak Nightstands',
        bangla: 'ইন্টিগ্রেটেড সেগুন সাইড টেবিল',
        category: 'Bedside Companion',
        categorySlug: 'master-bedroom',
        coords: { x: 23, y: 64 },
        price: 38000,
        priceFormatted: '৳38,000',
        timber: 'Solid Burma Teak (বার্মা সেগুন)',
        upholstery: 'Full-Extension Concealed Slides',
        joinery: 'Dovetail Drawer Construction',
        dimensions: '550mm W × 450mm D × 480mm H',
        moisture: '8.5% Kiln Seasoned',
        loadRating: '80 kg Static Load',
        warranty: 'Lifetime Structural Warranty',
        stagedStatus: 'Pair Staged in Chamber',
        heroImage: '/images/products/integrated-nightstands.jpg',
        macroImage: '/images/timber-macro.jpg',
        explodedImage: '/images/joinery-mortise.jpg',
        desc: 'Floating silhouette nightstand pair featuring integrated wireless charging surface and soft-closing dovetail drawers.',
        highlights: [
          'Solid brass minimalist knurled knobs',
          'Zero-squeak concealed soft-close drawer slides',
          'Matching fluted facade aligned with bed headboard'
        ]
      }
    ]
  },
  {
    id: 'dining',
    num: '03',
    name: 'The Dining Room',
    bangla: 'রয়্যাল ডাইনিং গ্যালারি',
    desc: 'Solid single-slab 10-seater dining table with heavy wood pedestal base and comfortable bouclé chairs.',
    image: '/images/hero-dining.jpg',
    location: 'Agrabad Showroom · Dining Suite',
    products: [
      {
        id: 'dining-table',
        num: '01',
        name: 'Monolith 10-Seater Burma Teak Dining Table',
        bangla: 'মনোলিথ ১০-সিটার ডাইনিং টেবিল',
        category: 'Dining Centerpiece',
        categorySlug: 'dining-room',
        coords: { x: 48, y: 68 },
        price: 320000,
        priceFormatted: '৳3,20,000',
        timber: 'Single-Slab Mature Burma Teak (বার্মা সেগুন)',
        upholstery: 'Food-Safe Organic Wax Oil Finish',
        joinery: 'Heavy-Duty Floating Tenon Trestle',
        dimensions: '3000mm L × 1100mm W × 760mm H',
        moisture: '8.5% Kiln Seasoned',
        loadRating: '500 kg Central Load',
        warranty: 'Lifetime Structural Warranty',
        stagedStatus: 'Curated In Situ',
        heroImage: '/images/products/grand-banquet-table.jpg',
        macroImage: '/images/timber-macro.jpg',
        explodedImage: '/images/joinery-mortise.jpg',
        desc: 'Continuous grain 3-meter table cut from a single 60-year mature Burma Teak log. Edges hand-chamfered with zero sharp pinch points.',
        highlights: [
          'Full 45mm solid timber thickness across entire top',
          'Impervious to hot tea, spilled curry, and wine stains',
          'Recessed central trestle allows unhindered legroom all around'
        ]
      },
      {
        id: 'dining-chair',
        num: '02',
        name: 'Ergonomic Sculpted Bouclé Dining Chairs',
        bangla: 'স্কাল্পটেড বুকলে ডাইনিং চেয়ার',
        category: 'Dining Seating',
        categorySlug: 'dining-room',
        coords: { x: 28, y: 72 },
        price: 28000,
        priceFormatted: '৳28,000 / each',
        timber: 'Solid Burma Teak (বার্মা সেগুন)',
        upholstery: 'Treated Stain-Resistant Cream Bouclé',
        joinery: 'Compound Angle Mortise & Tenon',
        dimensions: '560mm W × 580mm D × 820mm H',
        moisture: '8.5% Kiln Seasoned',
        loadRating: '200 kg Static Load',
        warranty: 'Lifetime Structural Warranty',
        stagedStatus: 'Set of 8 Curated In Situ',
        heroImage: '/images/products/dining-chair-boucle.jpg',
        macroImage: '/images/cushion-velvet.jpg',
        explodedImage: '/images/joinery-mortise.jpg',
        desc: 'Curved lumbar backrest contour cradles the spine through lengthy dinner conversations. High-resilience foam cushion maintains its crisp crown indefinitely.',
        highlights: [
          'Stain-resistant nano-treated bouclé fabric repels liquid spills',
          'Continuous sculpted teak back support',
          'Felt acoustic floor glides preserve marble and parquet flooring'
        ]
      }
    ]
  }
];

export default function LivingComposition() {
  const [activeZoneId, setActiveZoneId] = useState('living');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [showHotspots, setShowHotspots] = useState(true);
  const [inspectTab, setInspectTab] = useState('staged'); // 'staged' | 'macro' | 'joinery'

  const currentZone = ROOM_COMPOSITIONS.find(z => z.id === activeZoneId) || ROOM_COMPOSITIONS[0];

  // Lock body scroll when modal open
  useEffect(() => {
    if (selectedProduct) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedProduct]);

  // Navigate next/prev product inside modal
  const handleNextProduct = () => {
    if (!selectedProduct) return;
    const currentIndex = currentZone.products.findIndex(p => p.id === selectedProduct.id);
    const nextIndex = (currentIndex + 1) % currentZone.products.length;
    setSelectedProduct(currentZone.products[nextIndex]);
    setInspectTab('staged');
  };

  const handlePrevProduct = () => {
    if (!selectedProduct) return;
    const currentIndex = currentZone.products.findIndex(p => p.id === selectedProduct.id);
    const prevIndex = (currentIndex - 1 + currentZone.products.length) % currentZone.products.length;
    setSelectedProduct(currentZone.products[prevIndex]);
    setInspectTab('staged');
  };

  return (
    <section 
      id="composition"
      className="relative bg-[#241A14] text-[#F5EFEB] py-24 lg:py-32 px-6 lg:px-14 border-t border-[#E8DCC8]/10 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Section Editorial Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-8 border-b border-[#E8DCC8]/10">
          <div className="max-w-2xl space-y-3">
            <div className="flex items-center gap-3">
              <span className="font-mono text-[11px] text-[#C6A75E] uppercase tracking-[0.35em] block font-semibold">
                02 / REAL ROOM SETTINGS · IN SITU
              </span>
              <span className="font-mono text-[9px] px-2.5 py-0.5 rounded-full bg-[#C6A75E]/20 text-[#C6A75E] uppercase tracking-wider font-bold">
                Solid Burma Teak
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-[#F5EFEB] font-light tracking-tight">
              How Our Furniture <span className="font-normal italic text-[#E8DCC8]">Looks in Real Homes.</span>
            </h2>
            <p className="font-body text-sm sm:text-base text-[#E8DCC8]/80 leading-relaxed font-light pt-1">
              See how our solid Burma Teak furniture fits together in a room. Tap any numbered dot on the photo to see how it is made, inspect the wood grain, and check prices.
            </p>
          </div>

          {/* Room Composition Switcher Tabs */}
          <div className="flex items-center gap-2 p-1.5 rounded-full bg-[#18120D] border border-[#E8DCC8]/15 backdrop-blur-md">
            {ROOM_COMPOSITIONS.map((zone) => {
              const isActive = zone.id === activeZoneId;
              return (
                <button
                  key={zone.id}
                  onClick={() => {
                    setActiveZoneId(zone.id);
                    setSelectedProduct(null);
                    setHoveredProduct(null);
                  }}
                  className={`px-4 py-2 rounded-full font-mono text-[10px] sm:text-[11px] uppercase tracking-wider transition-[background-color,color] duration-300 flex items-center gap-2 cursor-pointer ${
                    isActive
                      ? 'bg-[#C6A75E] text-[#241A14] font-bold shadow-md'
                      : 'text-[#E8DCC8]/70 hover:text-[#F5EFEB] hover:bg-white/5'
                  }`}
                >
                  <span className={isActive ? 'text-[#241A14]' : 'text-[#C6A75E]'}>{zone.num}</span>
                  <span>{zone.name.split('·')[1] || zone.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* The Interactive Photographic Staging Canvas */}
        <div className="relative rounded-2xl overflow-hidden border border-[#E8DCC8]/15 bg-[#18120D] shadow-2xl">
          
          {/* Main Visual Staging Image */}
          <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] max-h-[740px] overflow-hidden select-none">
            <img 
              src={currentZone.image} 
              alt={currentZone.name}
              width={1920}
              height={1080}
              className="w-full h-full object-cover object-center brightness-[0.92] contrast-[1.04] transition-transform duration-1000"
            />

            {/* Interactive Tap Discovery Prompt */}
            <div className="absolute bottom-4 left-4 z-20 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#18120D]/90 backdrop-blur-md border border-[#C6A75E]/40 text-[10px] font-mono text-[#E8DCC8] shadow-xl pointer-events-none">
              <span className="w-2 h-2 rounded-full bg-[#C6A75E] animate-ping" />
              <span>Tap any number to view wood joints & prices</span>
            </div>

            {/* Subtle Atmosphere Shading */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#241A14]/75 via-transparent to-black/25 pointer-events-none" />

            {/* Canvas Header Pill & Toggle */}
            <div className="absolute top-4 sm:top-6 left-4 sm:left-6 right-4 sm:right-6 flex justify-between items-center z-20 pointer-events-none">
              <div className="pointer-events-auto flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#18120D]/85 backdrop-blur-md border border-[#E8DCC8]/20 text-[10px] font-mono tracking-widest text-[#E8DCC8]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C6A75E] animate-pulse" />
                <span className="uppercase">{currentZone.location}</span>
              </div>

              <button
                onClick={() => setShowHotspots(!showHotspots)}
                className="pointer-events-auto flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#18120D]/85 backdrop-blur-md border border-[#E8DCC8]/20 hover:border-[#C6A75E] text-[10px] font-mono tracking-widest text-[#E8DCC8] hover:text-[#C6A75E] transition-colors cursor-pointer"
              >
                {showHotspots ? (
                  <>
                    <EyeOff className="w-3.5 h-3.5 text-[#C6A75E]" />
                    <span className="hidden sm:inline">HIDE POINTS</span>
                  </>
                ) : (
                  <>
                    <Eye className="w-3.5 h-3.5 text-[#C6A75E]" />
                    <span className="hidden sm:inline">REVEAL POINTS</span>
                  </>
                )}
              </button>
            </div>

            {/* Floating Interactive Radar Hotspot Pins */}
            <AnimatePresence>
              {showHotspots && currentZone.products.map((prod) => {
                const isHovered = hoveredProduct?.id === prod.id;
                const isSelected = selectedProduct?.id === prod.id;

                return (
                  <div
                    key={prod.id}
                    style={{
                      left: `${prod.coords.x}%`,
                      top: `${prod.coords.y}%`
                    }}
                    className="absolute z-20 -translate-x-1/2 -translate-y-1/2 group"
                  >
                    {/* Radar Pulse Outer Rings */}
                    <span className="absolute -inset-3 rounded-full bg-[#C6A75E]/30 animate-ping opacity-75 pointer-events-none" />
                    <span className="absolute -inset-1.5 rounded-full bg-[#C6A75E]/40 blur-sm pointer-events-none" />

                    {/* Interactive Hotspot Core Button */}
                    <button
                      onClick={() => {
                        setSelectedProduct(prod);
                        setInspectTab('staged');
                      }}
                      onMouseEnter={() => setHoveredProduct(prod)}
                      onMouseLeave={() => setHoveredProduct(null)}
                      className={`relative w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center font-mono text-[11px] font-bold transition-[transform,background-color,color,box-shadow] duration-300 shadow-xl cursor-pointer ${
                        isSelected
                          ? 'bg-[#E8DCC8] text-[#241A14] scale-125 ring-4 ring-[#C6A75E]'
                          : isHovered
                          ? 'bg-[#C6A75E] text-[#241A14] scale-110 ring-2 ring-white'
                          : 'bg-[#241A14]/90 text-[#E8DCC8] border border-[#C6A75E]/80 hover:bg-[#C6A75E] hover:text-[#241A14]'
                      }`}
                      aria-label={`Inspect ${prod.name}`}
                    >
                      {prod.num}
                    </button>

                    {/* Elegant Frosted Hover Preview Tooltip */}
                    <AnimatePresence>
                      {isHovered && !selectedProduct && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 5, scale: 0.95 }}
                          transition={{ duration: 0.2 }}
                          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-64 p-3 rounded-xl bg-[#18120D]/95 backdrop-blur-xl border border-[#C6A75E]/40 shadow-2xl pointer-events-none z-30"
                        >
                          <div className="flex gap-3 items-center">
                            <img 
                              src={prod.heroImage} 
                              alt={prod.name}
                              width={48}
                              height={48}
                              loading="lazy"
                              className="w-12 h-12 object-cover rounded-lg border border-[#E8DCC8]/15 shrink-0"
                            />
                            <div className="min-w-0 flex-1">
                              <span className="block font-mono text-[9px] uppercase tracking-widest text-[#C6A75E] truncate">
                                {prod.category}
                              </span>
                              <h4 className="font-display text-xs text-[#F5EFEB] font-medium leading-snug truncate">
                                {prod.name}
                              </h4>
                              <span className="font-mono text-xs font-bold text-[#E8DCC8] mt-0.5 block">
                                {prod.priceFormatted}
                              </span>
                            </div>
                          </div>
                          <div className="mt-2 pt-2 border-t border-[#E8DCC8]/10 flex items-center justify-between text-[9px] font-mono text-[#E8DCC8]/70">
                            <span>{prod.timber.split('(')[0]}</span>
                            <span className="text-[#C6A75E]">Tap to Inspect →</span>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </AnimatePresence>

            {/* Bottom Quick Help Prompt */}
            <div className="absolute bottom-4 left-6 hidden sm:flex items-center gap-2 text-[11px] font-mono text-[#E8DCC8]/75 pointer-events-none">
              <span className="w-2 h-2 rounded-full bg-[#C6A75E]" />
              <span>Click any coordinate pin to view structural timber macro & joinery proofs</span>
            </div>
          </div>

          {/* Bottom Floor Rail: Quick Horizontal Shelf of Placed Pieces */}
          <div className="p-4 sm:p-6 bg-[#18120D]/95 border-t border-[#E8DCC8]/10">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] text-[#C6A75E] uppercase tracking-widest font-semibold">
                  ELEMENTS IN THIS COMPOSITION ({currentZone.products.length})
                </span>
              </div>
              <span className="text-[10px] font-mono text-[#E8DCC8]/50 hidden sm:inline">
                SCROLL TO NAVIGATE ALL PIECES →
              </span>
            </div>

            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-[#C6A75E]/40">
              {currentZone.products.map((prod) => {
                const isSelected = selectedProduct?.id === prod.id;
                return (
                  <button
                    key={prod.id}
                    onClick={() => {
                      setSelectedProduct(prod);
                      setInspectTab('staged');
                    }}
                    className={`shrink-0 w-64 sm:w-72 p-3 rounded-xl border text-left transition-[background-color,border-color] duration-300 flex items-center gap-3.5 cursor-pointer group ${
                      isSelected
                        ? 'border-[#C6A75E] bg-[#241A14]'
                        : 'border-[#E8DCC8]/10 bg-[#241A14]/50 hover:border-[#C6A75E]/50 hover:bg-[#241A14]'
                    }`}
                  >
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0 border border-[#E8DCC8]/10">
                      <img 
                        src={prod.heroImage} 
                        alt={prod.name}
                        width={64}
                        height={64}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <span className="absolute top-1 left-1 w-4 h-4 rounded-full bg-[#241A14]/90 border border-[#C6A75E] flex items-center justify-center font-mono text-[8px] text-[#C6A75E] font-bold">
                        {prod.num}
                      </span>
                    </div>

                    <div className="min-w-0 flex-1">
                      <span className="block font-mono text-[8px] uppercase tracking-widest text-[#C6A75E] truncate">
                        {prod.category}
                      </span>
                      <h4 className="font-display text-xs text-[#F5EFEB] font-normal truncate mt-0.5 group-hover:text-[#C6A75E] transition-colors">
                        {prod.name}
                      </h4>
                      <div className="flex items-center justify-between mt-1">
                        <span className="font-mono text-xs font-bold text-[#E8DCC8]">
                          {prod.priceFormatted}
                        </span>
                        <span className="text-[10px] font-mono text-[#C6A75E] opacity-0 group-hover:opacity-100 transition-opacity">
                          Inspect ↗
                        </span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

      </div>

      {/* ── ARCHITECTURAL SPOTLIGHT DOSSIER MODAL ───────────────────── */}
      <AnimatePresence>
        {selectedProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
            {/* Backdrop Blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProduct(null)}
              className="absolute inset-0 bg-black/85 backdrop-blur-md cursor-pointer"
            />

            {/* Modal Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto bg-[#18120D] text-[#F5EFEB] rounded-2xl border border-[#C6A75E]/30 shadow-2xl z-10 scrollbar-thin scrollbar-thumb-[#C6A75E]/40"
            >
              {/* Modal Top Bar */}
              <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-[#18120D]/95 backdrop-blur-md border-b border-[#E8DCC8]/10">
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-full bg-[#C6A75E] text-[#241A14] font-mono text-xs font-bold flex items-center justify-center">
                    {selectedProduct.num}
                  </span>
                  <div>
                    <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-[#C6A75E] block">
                      ARCHITECTURAL SPECIFICATION · {selectedProduct.category}
                    </span>
                    <h3 className="font-display text-sm sm:text-base text-[#F5EFEB] font-normal truncate max-w-md">
                      {selectedProduct.name}
                    </h3>
                  </div>
                </div>

                {/* Nav & Close Controls */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrevProduct}
                    className="w-8 h-8 rounded-full border border-[#E8DCC8]/20 hover:border-[#C6A75E] hover:text-[#C6A75E] flex items-center justify-center transition-colors cursor-pointer"
                    aria-label="Previous Piece"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleNextProduct}
                    className="w-8 h-8 rounded-full border border-[#E8DCC8]/20 hover:border-[#C6A75E] hover:text-[#C6A75E] flex items-center justify-center transition-colors cursor-pointer"
                    aria-label="Next Piece"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                  <div className="h-4 w-px bg-[#E8DCC8]/20 mx-1" />
                  <button
                    onClick={() => setSelectedProduct(null)}
                    className="w-8 h-8 rounded-full bg-[#241A14] hover:bg-[#C6A75E] hover:text-[#241A14] text-[#E8DCC8] flex items-center justify-center transition-colors cursor-pointer"
                    aria-label="Close Dossier"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Modal Body: 2-Column Monograph */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-8">
                
                {/* Left Column: 3-Angle Visual Switcher */}
                <div className="lg:col-span-7 space-y-4">
                  {/* View Tabs */}
                  <div className="flex items-center gap-2 p-1 rounded-lg bg-[#241A14] border border-[#E8DCC8]/10 text-xs font-mono">
                    <button
                      onClick={() => setInspectTab('staged')}
                      className={`flex-1 py-1.5 px-2 rounded font-mono text-[10px] tracking-wider uppercase transition-colors cursor-pointer ${
                        inspectTab === 'staged'
                          ? 'bg-[#C6A75E] text-[#241A14] font-bold'
                          : 'text-[#E8DCC8]/70 hover:text-[#F5EFEB]'
                      }`}
                    >
                      In Situ View
                    </button>
                    <button
                      onClick={() => setInspectTab('macro')}
                      className={`flex-1 py-1.5 px-2 rounded font-mono text-[10px] tracking-wider uppercase transition-colors cursor-pointer ${
                        inspectTab === 'macro'
                          ? 'bg-[#C6A75E] text-[#241A14] font-bold'
                          : 'text-[#E8DCC8]/70 hover:text-[#F5EFEB]'
                      }`}
                    >
                      8X Timber Macro
                    </button>
                    <button
                      onClick={() => setInspectTab('joinery')}
                      className={`flex-1 py-1.5 px-2 rounded font-mono text-[10px] tracking-wider uppercase transition-colors cursor-pointer ${
                        inspectTab === 'joinery'
                          ? 'bg-[#C6A75E] text-[#241A14] font-bold'
                          : 'text-[#E8DCC8]/70 hover:text-[#F5EFEB]'
                      }`}
                    >
                      Mortise Joinery
                    </button>
                  </div>

                  {/* Main Display Image */}
                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-[#E8DCC8]/15 bg-[#241A14]">
                    <img
                      src={
                        inspectTab === 'staged'
                          ? selectedProduct.heroImage
                          : inspectTab === 'macro'
                          ? selectedProduct.macroImage
                          : selectedProduct.explodedImage
                      }
                      alt={`${selectedProduct.name} - ${inspectTab} view`}
                      width={800}
                      height={600}
                      className="w-full h-full object-cover transition-opacity duration-500"
                    />
                    
                    {/* View Label Tag */}
                    <div className="absolute bottom-3 left-3 px-3 py-1 rounded-full bg-[#18120D]/90 backdrop-blur-md border border-[#E8DCC8]/20 text-[9px] font-mono tracking-widest text-[#E8DCC8] uppercase">
                      {inspectTab === 'staged' && 'Atelier In Situ Staging'}
                      {inspectTab === 'macro' && '8X Burma Teak Silica & Grain Macro'}
                      {inspectTab === 'joinery' && 'Zero-Nail Interlocking Joint Proof'}
                    </div>
                  </div>

                  {/* Curated In Situ Status Badge */}
                  <div className="flex items-center gap-2.5 p-3 rounded-xl bg-[#241A14]/70 border border-[#C6A75E]/30 text-xs font-mono">
                    <CheckCircle2 className="w-4 h-4 text-[#C6A75E] shrink-0" />
                    <span className="text-[#E8DCC8]">
                      {selectedProduct.stagedStatus} · Agrabad Atelier
                    </span>
                  </div>
                </div>

                {/* Right Column: Specifications & Commission CTA */}
                <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
                  <div className="space-y-5">
                    
                    {/* Title & Bengali Tag */}
                    <div>
                      <span className="font-mono text-[10px] text-[#C6A75E] uppercase tracking-[0.25em] font-bold block">
                        {selectedProduct.category}
                      </span>
                      <h2 className="font-display text-2xl sm:text-3xl text-[#F5EFEB] font-light mt-1">
                        {selectedProduct.name}
                      </h2>
                      <span className="font-bengali text-sm text-[#E8DCC8]/60 mt-0.5 block">
                        {selectedProduct.bangla}
                      </span>
                    </div>

                    {/* Investment Pricing */}
                    <div className="p-4 rounded-xl bg-[#241A14] border border-[#E8DCC8]/15 flex items-baseline justify-between">
                      <div>
                        <span className="font-mono text-[9px] uppercase tracking-widest text-[#E8DCC8]/60 block">
                          Atelier Investment
                        </span>
                        <span className="font-display text-2xl sm:text-3xl font-normal text-[#C6A75E]">
                          {selectedProduct.priceFormatted}
                        </span>
                      </div>
                      <span className="font-mono text-[10px] px-2.5 py-1 rounded-full bg-[#C6A75E]/15 text-[#C6A75E] border border-[#C6A75E]/30 uppercase tracking-wider font-semibold">
                        Bespoke Commission
                      </span>
                    </div>

                    {/* Narrative Description */}
                    <p className="font-body text-xs sm:text-sm text-[#E8DCC8]/85 leading-relaxed font-light">
                      {selectedProduct.desc}
                    </p>

                    {/* Architectural Specifications Table */}
                    <div className="space-y-2 border-t border-b border-[#E8DCC8]/10 py-3 text-xs font-mono">
                      <div className="flex justify-between py-1 border-b border-[#E8DCC8]/5">
                        <span className="text-[#E8DCC8]/60">Timber Species</span>
                        <span className="text-[#F5EFEB] text-right font-medium">{selectedProduct.timber}</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-[#E8DCC8]/5">
                        <span className="text-[#E8DCC8]/60">Finish / Fabric</span>
                        <span className="text-[#F5EFEB] text-right font-medium">{selectedProduct.upholstery}</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-[#E8DCC8]/5">
                        <span className="text-[#E8DCC8]/60">Structural Joinery</span>
                        <span className="text-[#F5EFEB] text-right font-medium">{selectedProduct.joinery}</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-[#E8DCC8]/5">
                        <span className="text-[#E8DCC8]/60">Outer Dimensions</span>
                        <span className="text-[#F5EFEB] text-right font-medium">{selectedProduct.dimensions}</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-[#E8DCC8]/5">
                        <span className="text-[#E8DCC8]/60">Moisture Content</span>
                        <span className="text-[#C6A75E] text-right font-medium">{selectedProduct.moisture}</span>
                      </div>
                      <div className="flex justify-between py-1">
                        <span className="text-[#E8DCC8]/60">Warranty Provenance</span>
                        <span className="text-[#F5EFEB] text-right font-medium">{selectedProduct.warranty}</span>
                      </div>
                    </div>

                    {/* Key Highlights */}
                    <div className="space-y-2">
                      <span className="font-mono text-[9px] uppercase tracking-widest text-[#C6A75E] font-bold block">
                        Architectural Hallmarks
                      </span>
                      <ul className="space-y-1.5 text-xs text-[#E8DCC8]/80 font-light">
                        {selectedProduct.highlights.map((h, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-[#C6A75E] mt-0.5">•</span>
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Primary WhatsApp Commissioning Action */}
                  <div className="pt-4 space-y-3">
                    <a
                      href={buildProductWhatsAppUrl({
                        name: selectedProduct.name,
                        price: selectedProduct.price,
                        category: selectedProduct.category
                      })}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-[#C6A75E] hover:bg-[#E8DCC8] text-[#241A14] font-mono text-xs uppercase tracking-widest font-bold flex items-center justify-center gap-2.5 py-4 px-6 rounded-full shadow-lg transition-[background-color,color,transform] duration-300 hover:scale-[1.01] cursor-pointer"
                    >
                      <MessageCircle className="w-4 h-4 text-[#241A14]" />
                      <span>Inquire on WhatsApp</span>
                      <ArrowRight className="w-4 h-4 text-[#241A14]" />
                    </a>

                    <div className="flex items-center justify-center gap-4 text-[10px] font-mono text-[#E8DCC8]/60">
                      <span>Chattogram & Dhaka Delivery</span>
                      <span>·</span>
                      <span>30-Year Warranty</span>
                    </div>
                  </div>
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
