import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Phone,
  MessageCircle,
  X,
  ChevronLeft,
  ChevronRight,
  Eye,
  EyeOff,
  Clock,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { buildProductWhatsAppUrl } from '../utils/whatsapp';

// ── 3 IRL STOREFRONT SHOWROOM DEPARTMENTS ────────────────────────────
const SHOWROOM_ZONES = [
  {
    id: 'living',
    name: '01 · Flagship Living Salon',
    bangla: 'প্রধান লিভিং সেলুন',
    tag: 'STAGED ON STOREFRONT FLOOR',
    desc: 'Wide-angle view through the floor-to-ceiling glass storefront on Agrabad Access Road. Real daylight and warm spotlighting illuminate our signature teak sectional and artisanal tables.',
    image: '/images/storefront-living.jpg',
    address: 'Agrabad Access Road, Chattogram',
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
        stagedStatus: '1 Staged on Storefront Floor · Ready for Inspection',
        heroImage: '/images/products/sovereign-corner-sectional.jpg',
        macroImage: '/images/cushion-velvet.jpg',
        explodedImage: '/images/joinery-mortise.jpg',
        desc: 'Quarter-sawn from mature Burma Teak heartwood logs. Anchors the primary storefront salon with clean horizontal lines, tailored double-stitched velvet piping, and deep 45D ergonomic cushioning that never sags.',
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
        stagedStatus: '2 in Atelier Stock',
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
        stagedStatus: '3 in Agrabad Showroom',
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
        stagedStatus: 'Installed on Storefront Wall (Live Demo)',
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
        stagedStatus: '1 Staged on Storefront Floor',
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
    name: '02 · Master Bedroom Suite Chamber',
    bangla: 'মাস্টার বেডরুম সুট',
    tag: 'PRIVATE SUITE STAGING',
    desc: 'Staged luxury bedroom chamber featuring acoustic fluted Burma Teak headboard, floating bedside pedestals, and concealed 800L hydraulic sub-bed storage.',
    image: '/images/hero-bedroom.jpg',
    address: 'Agrabad Flagship Showroom · 2nd Floor Chamber',
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
        stagedStatus: '1 Staged in Chamber',
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
        dimensions: '600mm W × 450mm D × 480mm H',
        moisture: '8.5% Kiln Seasoned',
        loadRating: '80 kg Top Load',
        warranty: 'Lifetime Structural Warranty',
        stagedStatus: '2 in Showroom Chamber',
        heroImage: '/images/products/floating-platform-bed.jpg',
        macroImage: '/images/timber-macro.jpg',
        explodedImage: '/images/joinery-mortise.jpg',
        desc: 'Seamless cantilevered bedside companion with soft-close drawers and concealed wireless Qi smartphone charging surfaces.',
        highlights: [
          'Concealed fast Qi charging pad built under teak top',
          'Silent soft-closing German drawer runners',
          'Felt-lined jewelry and watch organizer tray'
        ]
      },
      {
        id: 'wardrobe',
        num: '03',
        name: 'Floor-to-Ceiling Smoked Glass Wardrobe',
        bangla: 'স্মোকড গ্লাস ও সেগুন আর্কিটেকচারাল ওয়্যারড্রব',
        category: 'Architectural Storage',
        categorySlug: 'master-bedroom',
        coords: { x: 88, y: 48 },
        price: 320000,
        priceFormatted: '৳3,20,000',
        timber: 'Burma Teak Framework & Anodized Aluminum',
        upholstery: 'Tuscan Leather Inset Pulls & LED Rods',
        joinery: 'Floor-to-Ceiling Precision Anchoring',
        dimensions: '2800mm W × 650mm D × 2700mm H',
        moisture: '8.5% Kiln Seasoned',
        loadRating: 'Commercial Architectural Capacity',
        warranty: 'Lifetime Structural Warranty',
        stagedStatus: 'Bespoke Order (18 Days)',
        heroImage: '/images/products/floor-to-ceiling-wardrobe.jpg',
        macroImage: '/images/timber-macro.jpg',
        explodedImage: '/images/joinery-mortise.jpg',
        desc: 'Architectural dressing monolith with interior motion-sensor warm LED illumination and Italian pull-down wardrobe lifters.',
        highlights: [
          'Tempered European smoked bronze anti-dust glass',
          'Automatic interior illumination upon door proximity',
          'Italian hydraulic pull-down garment hanger arms'
        ]
      }
    ]
  },
  {
    id: 'dining',
    name: '03 · Royal Dining Sanctum',
    bangla: 'রয়্যাল ডাইনিং হল',
    tag: 'GRAND BANQUET STAGING',
    desc: 'Monumental 8-seater dining arrangement with hand-carved mahogany trestle bridge and scratch-proof Calacatta sintered stone.',
    image: '/images/hero-dining.jpg',
    address: 'Agrabad Flagship Showroom · Ground Gallery',
    products: [
      {
        id: 'dining-table',
        num: '01',
        name: 'Grand Heritage 8-Seater Trestle Table',
        bangla: 'গ্র্যান্ড হেরিটেজ ৮-সিটার ডাইনিং টেবিল',
        category: 'Royal Dining Suite',
        categorySlug: 'royal-dining',
        coords: { x: 50, y: 65 },
        price: 210000,
        priceFormatted: '৳2,10,000',
        timber: 'Solid Red Mahogany (মেহগনি) Bridge',
        upholstery: '12mm Italian Calacatta Sintered Stone Top',
        joinery: 'Hand-Carved Monolithic Timber Trestle',
        dimensions: '2400mm L × 1100mm W × 760mm H',
        moisture: '8.5% Kiln Seasoned',
        loadRating: '500 kg Top Load',
        warranty: 'Lifetime Structural Warranty',
        stagedStatus: '1 Staged in Gallery',
        heroImage: '/images/products/grand-heritage-8-seater.jpg',
        macroImage: '/images/timber-macro.jpg',
        explodedImage: '/images/products/sculptural-round-pedestal.jpg',
        desc: 'Generational feast table uniting a hand-carved monolithic timber trestle bridge with heat, scratch, and acid-proof sintered stone.',
        highlights: [
          'Zero stain risk from turmeric, citrus, or scorching hot pots',
          'Heavy solid timber arch prevents table wobbling or tipping',
          'Accommodates 8 to 10 guests in full banquet setting'
        ]
      },
      {
        id: 'dining-chairs',
        num: '02',
        name: 'Ergonomic Bouclé Dining Chairs (Set of 8)',
        bangla: 'এরগনোমিক বোঁক্লে ডাইনিং চেয়ার্স (৮টি)',
        category: 'Dining Seating',
        categorySlug: 'royal-dining',
        coords: { x: 32, y: 68 },
        price: 120000,
        priceFormatted: '৳1,20,000 (Set of 8)',
        timber: 'Solid Burma Teak Legs & Internal Shell',
        upholstery: 'High-Martindale French Bouclé Ivory Fabric',
        joinery: 'Mortise & Tenon Leg Anchors',
        dimensions: '560mm W × 580mm D × 840mm H',
        moisture: '8.5% Kiln Seasoned',
        loadRating: '200 kg Per Chair',
        warranty: 'Lifetime Frame Warranty',
        stagedStatus: 'In Stock for Delivery',
        heroImage: '/images/products/ergonomic-dining-chairs.jpg',
        macroImage: '/images/cushion-velvet.jpg',
        explodedImage: '/images/joinery-mortise.jpg',
        desc: 'Contoured lumbar support sculpted from seasoned teak with plush French bouclé upholstery. Designed for 3-hour banquet dinners.',
        highlights: [
          '100,000 Martindale rub count heavy contract grade fabric',
          'Curved back cradles spine naturally without strain',
          'Floor-protecting brass ferrule glides prevent tile scuffing'
        ]
      },
      {
        id: 'buffet',
        num: '03',
        name: 'Architectural Display Credenza & Buffet',
        bangla: 'ডাইনিং বাফেট ও ডিক্যান্টার কনসোল',
        category: 'Buffet & Storage',
        categorySlug: 'royal-dining',
        coords: { x: 85, y: 55 },
        price: 135000,
        priceFormatted: '৳1,35,000',
        timber: 'Solid Burma Teak with Fluted Doors',
        upholstery: 'Velvet-Lined Silverware Organizers',
        joinery: 'Concealed Soft-Close Blum Hinges',
        dimensions: '1800mm W × 450mm D × 850mm H',
        moisture: '8.5% Kiln Seasoned',
        loadRating: '180 kg Top Capacity',
        warranty: 'Lifetime Structural Warranty',
        stagedStatus: '1 Staged on Floor',
        heroImage: '/images/products/display-credenza.jpg',
        macroImage: '/images/timber-macro.jpg',
        explodedImage: '/images/joinery-mortise.jpg',
        desc: 'Dining hall credenza with soft-close flatware drawers, felt-lined cutlery organizers, and wine decanting top surface.',
        highlights: [
          'Integrated wine glass stemware racks beneath top shelf',
          'Fluted teak doors open with silent push-latch touch',
          'Ample storage for 24-person banquet dinnerware sets'
        ]
      }
    ]
  }
];

export default function DesignDemoPage() {
  const [activeZoneId, setActiveZoneId] = useState('living');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [showHotspots, setShowHotspots] = useState(true);
  const [productViewMode, setProductViewMode] = useState('hero'); // 'hero' | 'macro' | 'joinery'

  const currentZone = SHOWROOM_ZONES.find((z) => z.id === activeZoneId) || SHOWROOM_ZONES[0];

  // Auto-close modal when switching zones
  useEffect(() => {
    setSelectedProduct(null);
    setProductViewMode('hero');
  }, [activeZoneId]);

  // Keyboard navigation for modal
  useEffect(() => {
    function handleKeyDown(e) {
      if (!selectedProduct) return;
      if (e.key === 'Escape') {
        setSelectedProduct(null);
      } else if (e.key === 'ArrowRight') {
        navigateModal(1);
      } else if (e.key === 'ArrowLeft') {
        navigateModal(-1);
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedProduct, currentZone]);

  const navigateModal = (direction) => {
    if (!selectedProduct) return;
    const currentIndex = currentZone.products.findIndex((p) => p.id === selectedProduct.id);
    let nextIndex = currentIndex + direction;
    if (nextIndex < 0) nextIndex = currentZone.products.length - 1;
    if (nextIndex >= currentZone.products.length) nextIndex = 0;
    setSelectedProduct(currentZone.products[nextIndex]);
    setProductViewMode('hero');
  };

  return (
    <div className="min-h-screen bg-[#241A14] text-[#E8DCC8] font-body selection:bg-[#C6A75E] selection:text-[#241A14]">
      <Header />

      <main className="pt-28 pb-24 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto space-y-12">
        
        {/* ── TOP EDITORIAL HEADER & METRICS BAR ── */}
        <div className="space-y-6">
          
          {/* Breadcrumb & Live System Pill */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-b border-[#E8DCC8]/15 pb-4">
            <div className="flex items-center gap-3">
              <Link
                to="/"
                className="text-xs font-mono text-[#E8DCC8]/60 hover:text-[#C6A75E] transition-colors flex items-center gap-1"
              >
                <span>← Home</span>
              </Link>
              <span className="text-[#E8DCC8]/30">/</span>
              <span className="text-xs font-mono text-[#C6A75E] uppercase tracking-widest font-semibold">
                IRL Storefront Experience
              </span>
            </div>

            <div className="flex items-center gap-3 text-xs font-mono">
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#30231B] border border-[#E8DCC8]/15 text-[#E8DCC8]/80">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Agrabad Flagship Showroom Live</span>
              </div>
              <div className="hidden sm:flex items-center gap-1.5 text-[#E8DCC8]/60">
                <Clock className="w-3.5 h-3.5 text-[#C6A75E]" />
                <span>BST 9:00 AM – 9:30 PM</span>
              </div>
            </div>
          </div>

          {/* Headline & Concept Description */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="max-w-3xl space-y-2">
              <span className="font-mono text-[11px] text-[#C6A75E] uppercase tracking-[0.35em] block font-semibold">
                INTERACTIVE VIRTUAL SHOWROOM · বাস্তব শোরুম অভিজ্ঞতা
              </span>
              <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl text-[#F5EFEB] font-light tracking-tight leading-tight">
                Step Inside Our <br />
                <span className="italic font-normal text-[#E8DCC8]">Physical Storefront.</span>
              </h1>
              <p className="font-body text-sm sm:text-base text-[#E8DCC8]/80 leading-relaxed max-w-2xl font-light pt-1">
                Explore our heirloom furniture staged naturally inside our Agrabad showroom. Tap any floating gold hotspot to bring the piece forward with full timber grain, zero-nail joinery proofs, and direct WhatsApp inquiry.
              </p>
            </div>

            {/* Department Zone Switcher Tabs */}
            <div className="flex flex-wrap gap-2 p-1.5 rounded-2xl bg-[#30231B] border border-[#E8DCC8]/15 font-mono text-xs">
              {SHOWROOM_ZONES.map((zone) => {
                const isActive = activeZoneId === zone.id;
                return (
                  <button
                    key={zone.id}
                    onClick={() => setActiveZoneId(zone.id)}
                    className={`px-4 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
                      isActive
                        ? 'bg-[#C6A75E] text-[#241A14] font-bold shadow-md'
                        : 'text-[#E8DCC8]/70 hover:text-[#F5EFEB] hover:bg-white/5'
                    }`}
                  >
                    <span>{zone.name.split('·')[1].trim()}</span>
                    <span className={`text-[10px] ${isActive ? 'text-[#241A14]' : 'text-[#C6A75E]'}`}>
                      ({zone.products.length})
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── THE INTERACTIVE IRL STOREFRONT CANVAS (HERO SHOWROOM VIEWPORT) ── */}
        <div className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden border border-[#C6A75E]/30 bg-[#19120E] shadow-2xl">
          
          {/* Top Scene HUD Header */}
          <div className="absolute top-0 left-0 right-0 z-20 p-4 sm:p-6 bg-gradient-to-b from-[#241A14]/90 via-[#241A14]/50 to-transparent flex items-center justify-between pointer-events-none">
            <div className="flex items-center gap-2 pointer-events-auto">
              <span className="w-2.5 h-2.5 rounded-full bg-[#C6A75E] animate-ping" />
              <div className="bg-[#241A14]/85 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#E8DCC8]/15 text-xs font-mono text-[#F5EFEB] shadow-md">
                <span className="text-[#C6A75E] font-bold">{currentZone.name}</span>
                <span className="hidden sm:inline text-[#E8DCC8]/60 ml-2">· {currentZone.address}</span>
              </div>
            </div>

            {/* View Control Buttons */}
            <div className="flex items-center gap-2 pointer-events-auto">
              <button
                onClick={() => setShowHotspots(!showHotspots)}
                className="bg-[#241A14]/85 hover:bg-[#30231B] text-[#E8DCC8] backdrop-blur-md px-3 py-1.5 rounded-full border border-[#E8DCC8]/20 hover:border-[#C6A75E] transition-all text-xs font-mono flex items-center gap-1.5 cursor-pointer shadow-md"
                title="Toggle Floating Hotspot Radar Points"
              >
                {showHotspots ? <Eye className="w-3.5 h-3.5 text-[#C6A75E]" /> : <EyeOff className="w-3.5 h-3.5 text-red-400" />}
                <span className="hidden sm:inline">{showHotspots ? 'Hide Points' : 'Show Points'}</span>
              </button>

              <span className="hidden md:inline-block bg-[#241A14]/85 backdrop-blur-md px-3 py-1.5 rounded-full border border-[#E8DCC8]/15 text-[11px] font-mono text-[#C6A75E] font-bold">
                {currentZone.products.length} Staged Heirlooms
              </span>
            </div>
          </div>

          {/* Photographic Showroom Viewport */}
          <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden select-none">
            <img
              src={currentZone.image}
              alt={currentZone.name}
              className="w-full h-full object-cover brightness-[0.92] contrast-[1.04] transition-all duration-700"
            />
            {/* Ambient vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#241A14]/80 via-transparent to-transparent pointer-events-none" />

            {/* ── FLOATING INTERACTIVE HOTSPOT POINTS ── */}
            <AnimatePresence>
              {showHotspots && currentZone.products.map((product) => {
                const isSelected = selectedProduct?.id === product.id;
                const isHovered = hoveredProduct?.id === product.id;

                return (
                  <div
                    key={product.id}
                    style={{ left: `${product.coords.x}%`, top: `${product.coords.y}%` }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 z-20 group"
                  >
                    {/* Pulsing Concentric Radar Rings */}
                    <div className="relative flex items-center justify-center">
                      <span className="absolute w-10 h-10 rounded-full bg-[#C6A75E]/30 animate-ping pointer-events-none" />
                      <span className="absolute w-14 h-14 rounded-full border border-[#C6A75E]/40 pointer-events-none" />

                      {/* Main Interactive Button Pin */}
                      <button
                        type="button"
                        onClick={() => setSelectedProduct(product)}
                        onMouseEnter={() => setHoveredProduct(product)}
                        onMouseLeave={() => setHoveredProduct(null)}
                        className={`relative z-10 w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center font-mono text-xs font-bold transition-all duration-300 shadow-xl cursor-pointer ${
                          isSelected
                            ? 'bg-[#F5EFEB] text-[#241A14] scale-125 ring-4 ring-[#C6A75E]'
                            : 'bg-[#C6A75E] text-[#241A14] hover:scale-115 hover:bg-[#F5EFEB] hover:ring-2 hover:ring-[#C6A75E]'
                        }`}
                        aria-label={`View ${product.name}`}
                      >
                        {product.num}
                      </button>

                      {/* Floating Micro-Preview Card on Hover */}
                      <AnimatePresence>
                        {isHovered && !selectedProduct && (
                          <motion.div
                            initial={{ opacity: 0, y: 8, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                            className="absolute left-1/2 bottom-full mb-3 -translate-x-1/2 z-30 w-56 p-3 rounded-xl bg-[#241A14]/95 backdrop-blur-md border border-[#C6A75E]/40 shadow-2xl pointer-events-none"
                          >
                            <div className="flex gap-2.5 items-center">
                              <img
                                src={product.heroImage}
                                alt={product.name}
                                className="w-12 h-12 rounded-lg object-cover border border-[#E8DCC8]/20 flex-shrink-0"
                              />
                              <div className="min-w-0">
                                <span className="text-[9px] font-mono text-[#C6A75E] uppercase tracking-wider block truncate">
                                  {product.category}
                                </span>
                                <h4 className="font-display text-xs text-[#F5EFEB] font-bold leading-tight truncate">
                                  {product.name}
                                </h4>
                                <span className="text-xs font-mono font-bold text-[#C6A75E] block mt-0.5">
                                  {product.priceFormatted}
                                </span>
                              </div>
                            </div>
                            <div className="mt-2 pt-1.5 border-t border-[#E8DCC8]/15 text-[9px] font-mono text-[#E8DCC8]/60 flex items-center justify-between">
                              <span>Tap to inspect spec</span>
                              <span className="text-[#C6A75E]">↗</span>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                );
              })}
            </AnimatePresence>

            {/* Bottom Floating Staged Item Tray (Horizontal Quick Rail) */}
            <div className="absolute bottom-4 left-4 right-4 z-20 overflow-x-auto pb-1 flex items-center gap-3">
              <div className="flex items-center gap-2.5 p-2 rounded-2xl bg-[#241A14]/90 backdrop-blur-md border border-[#E8DCC8]/20 shadow-xl max-w-full overflow-x-auto">
                <span className="text-[10px] font-mono text-[#C6A75E] uppercase tracking-widest px-2.5 py-1 whitespace-nowrap font-bold hidden sm:inline">
                  STAGED ON FLOOR:
                </span>

                {currentZone.products.map((item) => {
                  const isCurrent = selectedProduct?.id === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setSelectedProduct(item)}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer whitespace-nowrap border ${
                        isCurrent
                          ? 'bg-[#C6A75E] text-[#241A14] border-[#C6A75E] font-bold shadow-md'
                          : 'bg-[#30231B]/80 text-[#E8DCC8] border-[#E8DCC8]/15 hover:border-[#C6A75E]'
                      }`}
                    >
                      <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold ${
                        isCurrent ? 'bg-[#241A14] text-[#C6A75E]' : 'bg-[#C6A75E] text-[#241A14]'
                      }`}>
                        {item.num}
                      </span>
                      <span className="truncate max-w-[120px] sm:max-w-[150px]">{item.name}</span>
                      <span className={`text-[10px] ${isCurrent ? 'text-[#241A14]' : 'text-[#C6A75E]'}`}>
                        {item.priceFormatted}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>
        </div>

        {/* ── PRODUCT SPOTLIGHT MODAL / EXPANDED ARCHITECTURAL DOSSIER ── */}
        <AnimatePresence>
          {selectedProduct && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
              
              {/* Darkened Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedProduct(null)}
                className="fixed inset-0 bg-black/80 backdrop-blur-md"
              />

              {/* Monograph Card Container */}
              <motion.div
                initial={{ opacity: 0, scale: 0.94, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.94, y: 20 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="relative z-10 w-full max-w-5xl bg-[#241A14] border border-[#C6A75E]/40 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden my-auto text-[#E8DCC8]"
              >
                
                {/* Modal Top Bar */}
                <div className="px-6 py-4 border-b border-[#E8DCC8]/15 flex items-center justify-between bg-[#30231B]/70">
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-[#C6A75E] text-[#241A14] font-mono text-xs font-bold flex items-center justify-center">
                      {selectedProduct.num}
                    </span>
                    <span className="font-mono text-xs text-[#C6A75E] uppercase tracking-widest font-semibold">
                      HEIRLOOM SPECIFICATION · {selectedProduct.category}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Previous / Next Piece Arrows */}
                    <button
                      onClick={() => navigateModal(-1)}
                      className="p-2 rounded-full hover:bg-white/10 text-[#E8DCC8] transition-colors cursor-pointer"
                      title="Previous Heirloom (←)"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => navigateModal(1)}
                      className="p-2 rounded-full hover:bg-white/10 text-[#E8DCC8] transition-colors cursor-pointer"
                      title="Next Heirloom (→)"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                    
                    <button
                      onClick={() => setSelectedProduct(null)}
                      className="p-2 rounded-full hover:bg-white/10 text-[#E8DCC8] transition-colors cursor-pointer ml-2"
                      title="Close Dossier (Esc)"
                    >
                      <X className="w-5 h-5 text-[#C6A75E]" />
                    </button>
                  </div>
                </div>

                {/* Modal Body: 2-Column Architectural Dossier */}
                <div className="p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start max-h-[80vh] overflow-y-auto">
                  
                  {/* Left Column: Multi-View Visual Gallery */}
                  <div className="lg:col-span-6 space-y-4">
                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#30231B] border border-[#E8DCC8]/15 group shadow-lg">
                      <img
                        src={
                          productViewMode === 'macro'
                            ? selectedProduct.macroImage
                            : productViewMode === 'joinery'
                            ? selectedProduct.explodedImage
                            : selectedProduct.heroImage
                        }
                        alt={selectedProduct.name}
                        className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                      />
                      <div className="absolute top-3 left-3 bg-[#241A14]/90 backdrop-blur-md px-3 py-1 rounded-full border border-[#E8DCC8]/15 text-[10px] font-mono text-[#C6A75E] uppercase tracking-wider font-semibold">
                        {productViewMode === 'macro'
                          ? '8X Macro Timber Grain'
                          : productViewMode === 'joinery'
                          ? 'Zero-Nail Interlocking Joint'
                          : 'Staged in Storefront'}
                      </div>
                    </div>

                    {/* View Angle Switcher Tabs */}
                    <div className="grid grid-cols-3 gap-2 font-mono text-[11px]">
                      <button
                        onClick={() => setProductViewMode('hero')}
                        className={`p-2 rounded-lg border transition-all cursor-pointer text-center ${
                          productViewMode === 'hero'
                            ? 'bg-[#C6A75E] text-[#241A14] border-[#C6A75E] font-bold'
                            : 'bg-[#30231B] border-[#E8DCC8]/15 text-[#E8DCC8]/70 hover:border-[#C6A75E]'
                        }`}
                      >
                        Storefront Staged
                      </button>
                      <button
                        onClick={() => setProductViewMode('macro')}
                        className={`p-2 rounded-lg border transition-all cursor-pointer text-center ${
                          productViewMode === 'macro'
                            ? 'bg-[#C6A75E] text-[#241A14] border-[#C6A75E] font-bold'
                            : 'bg-[#30231B] border-[#E8DCC8]/15 text-[#E8DCC8]/70 hover:border-[#C6A75E]'
                        }`}
                      >
                        Timber Grain
                      </button>
                      <button
                        onClick={() => setProductViewMode('joinery')}
                        className={`p-2 rounded-lg border transition-all cursor-pointer text-center ${
                          productViewMode === 'joinery'
                            ? 'bg-[#C6A75E] text-[#241A14] border-[#C6A75E] font-bold'
                            : 'bg-[#30231B] border-[#E8DCC8]/15 text-[#E8DCC8]/70 hover:border-[#C6A75E]'
                        }`}
                      >
                        Joint Proof
                      </button>
                    </div>

                    {/* Live Floor Status Pill */}
                    <div className="p-3.5 rounded-xl bg-[#30231B]/70 border border-[#E8DCC8]/15 flex items-center justify-between text-xs font-mono">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="text-[#F5EFEB] font-medium">{selectedProduct.stagedStatus}</span>
                      </div>
                      <span className="text-[#C6A75E]">Agrabad Kiln Verified</span>
                    </div>
                  </div>

                  {/* Right Column: Deep Specifications & WhatsApp Action */}
                  <div className="lg:col-span-6 space-y-6">
                    <div>
                      <span className="text-xs font-mono text-[#C6A75E] uppercase tracking-widest font-semibold block mb-1">
                        {selectedProduct.bangla}
                      </span>
                      <h2 className="font-display text-2xl sm:text-4xl text-[#F5EFEB] font-normal leading-tight">
                        {selectedProduct.name}
                      </h2>
                      <div className="mt-2 flex items-baseline gap-3">
                        <span className="font-display text-2xl sm:text-3xl font-bold text-[#C6A75E]">
                          {selectedProduct.priceFormatted}
                        </span>
                        <span className="text-xs font-mono text-[#E8DCC8]/60">
                          (Bespoke in 14-21 days or immediate floor delivery)
                        </span>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm font-body text-[#E8DCC8]/85 leading-relaxed font-light">
                      {selectedProduct.desc}
                    </p>

                    {/* 3 Hallmark Bullets */}
                    <div className="space-y-2 font-mono text-xs">
                      {selectedProduct.highlights.map((h, i) => (
                        <div key={i} className="flex items-start gap-2.5 text-[#E8DCC8]/90">
                          <CheckCircle2 className="w-4 h-4 text-[#C6A75E] flex-shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>

                    {/* Architectural Specifications Table */}
                    <div className="divide-y divide-[#E8DCC8]/15 border-t border-b border-[#E8DCC8]/15 text-xs font-mono py-2 space-y-0">
                      <div className="py-2 flex justify-between">
                        <span className="text-[#E8DCC8]/50 uppercase text-[10px]">Timber Species</span>
                        <span className="text-[#F5EFEB] font-semibold">{selectedProduct.timber}</span>
                      </div>
                      <div className="py-2 flex justify-between">
                        <span className="text-[#E8DCC8]/50 uppercase text-[10px]">Joinery Standard</span>
                        <span className="text-emerald-400 font-semibold">{selectedProduct.joinery}</span>
                      </div>
                      <div className="py-2 flex justify-between">
                        <span className="text-[#E8DCC8]/50 uppercase text-[10px]">Dimensions</span>
                        <span className="text-[#F5EFEB] font-semibold">{selectedProduct.dimensions}</span>
                      </div>
                      <div className="py-2 flex justify-between">
                        <span className="text-[#E8DCC8]/50 uppercase text-[10px]">Equilibrium Moisture</span>
                        <span className="text-[#C6A75E] font-semibold">{selectedProduct.moisture}</span>
                      </div>
                      <div className="py-2 flex justify-between">
                        <span className="text-[#E8DCC8]/50 uppercase text-[10px]">Structural Warranty</span>
                        <span className="text-[#F5EFEB] font-semibold">{selectedProduct.warranty}</span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-3 pt-2">
                      <a
                        href={buildProductWhatsAppUrl(
                          selectedProduct.name,
                          `Storefront Heirloom: ${selectedProduct.name} | Timber: ${selectedProduct.timber} | Staging: ${selectedProduct.stagedStatus}`
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-4 rounded-full bg-[#C6A75E] hover:bg-[#E8DCC8] text-[#241A14] font-mono text-xs uppercase tracking-widest font-bold transition-all shadow-lg flex items-center justify-center gap-2.5 cursor-pointer"
                      >
                        <MessageCircle className="w-4 h-4 text-current" />
                        <span>Inquire on WhatsApp</span>
                        <span>↗</span>
                      </a>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <a
                          href="tel:+8801991210347"
                          className="py-3 px-4 rounded-full border border-[#E8DCC8]/25 hover:border-[#C6A75E] text-[#E8DCC8] hover:text-[#C6A75E] font-mono text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 text-center"
                        >
                          <Phone className="w-3.5 h-3.5 text-[#C6A75E]" />
                          <span>Call: +880 1991-210347</span>
                        </a>

                        <Link
                          to={`/collections/${selectedProduct.categorySlug}`}
                          className="py-3 px-4 rounded-full border border-[#E8DCC8]/25 hover:border-[#C6A75E] text-[#E8DCC8] hover:text-[#C6A75E] font-mono text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 text-center"
                        >
                          <span>Explore Suite Portal</span>
                          <ArrowRight className="w-3.5 h-3.5 text-[#C6A75E]" />
                        </Link>
                      </div>
                    </div>

                  </div>

                </div>

              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* ── 60-30-10 ARCHITECTURAL HARMONY SUMMARY STRIP ── */}
        <section className="bg-[#30231B]/50 border border-[#E8DCC8]/15 rounded-3xl p-6 sm:p-10 space-y-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E8DCC8]/15 pb-4">
            <div>
              <span className="text-[10px] font-mono text-[#C6A75E] uppercase tracking-widest block font-semibold">
                DESIGN GOVERNANCE · রঙের শতকরা অনুপাত
              </span>
              <h3 className="font-display text-2xl text-[#F5EFEB] font-normal mt-1">
                60-30-10 Royal Wood, Linen & Gold System
              </h3>
            </div>
            <span className="text-xs font-mono text-[#C6A75E] font-bold">
              Mathematical Canvas Balance
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
            <div className="p-4 rounded-2xl bg-[#241A14] border border-[#E8DCC8]/15 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[#F5EFEB]">60% Dominant Canvas</span>
                <span className="px-2 py-0.5 rounded bg-[#241A14] text-[#E8DCC8] border border-[#E8DCC8]/20 font-bold">#241A14</span>
              </div>
              <p className="text-[11px] text-[#E8DCC8]/70 leading-relaxed font-body">
                Burma Teak Heartwood. Applied across Storefront Hero, Architectural Suites, Bespoke Studio, and Showroom Footer.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#F5EFEB] text-[#241A14] border border-[#241A14]/15 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[#241A14]">30% Secondary Canvas</span>
                <span className="px-2 py-0.5 rounded bg-[#E8DCC8] text-[#241A14] font-bold">#F5EFEB</span>
              </div>
              <p className="text-[11px] text-[#241A14]/75 leading-relaxed font-body">
                Warm Alabaster Linen. Applied across Philosophy Manifesto and Curated Flagship Heirlooms Catalog Grid.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#30231B] border border-[#C6A75E]/30 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[#C6A75E]">10% Royal Accent</span>
                <span className="px-2 py-0.5 rounded bg-[#C6A75E] text-[#241A14] font-bold">#C6A75E</span>
              </div>
              <p className="text-[11px] text-[#E8DCC8]/70 leading-relaxed font-body">
                Burnished Gold. Applied to interactive hotspot radar pins, WhatsApp consultation buttons, and precision badges.
              </p>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
