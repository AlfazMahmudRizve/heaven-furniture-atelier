import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, Phone, MessageCircle, ShoppingBag } from 'lucide-react';
import { COMPANY } from '../data/company';
import { getWhatsAppInquiryUrl, getPhoneUrl } from '../utils/whatsapp';
import { useCart } from '../context/CartContext';
import TurnkeyPlatformBanner from './TurnkeyPlatformBanner';

export default function Header({ onOpenAcquisition }) {
  const { itemCount, openDrawer } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showBanner, setShowBanner] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [hoveredNavIndex, setHoveredNavIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Blurred state after 60px
      if (currentScrollY > 60) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Hide on scroll down past 500px, reveal on scroll up
      if (currentScrollY > 500 && currentScrollY > lastScrollY) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  // Close menu on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsMenuOpen(false);
      }
    };
    if (isMenuOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMenuOpen]);

  // Close when tapping anywhere outside interactive buttons/links
  const handleOverlayClick = useCallback((e) => {
    if (e.target.closest('a, button, input, textarea, select, [role="button"], [data-interactive="true"]')) {
      return;
    }
    setIsMenuOpen(false);
  }, []);

  const navLinks = [
    {
      num: '01',
      title: 'Home',
      tagline: 'Flagship Living Composition',
      href: '#home',
      isExternal: false,
      image: '/images/hero-living.jpg',
      caption: 'The Sovereign Living Suite handcrafted from seasoned Burma Teak.',
    },
    {
      num: '02',
      title: 'Real Room Settings',
      tagline: 'In-Situ Living Compositions',
      href: '#composition',
      isExternal: false,
      image: '/images/storefront-living.jpg',
      caption: 'Architectural room arrangements with interactive inspection hotspots.',
    },
    {
      num: '03',
      title: 'Wood & Craftsmanship',
      tagline: 'Kiln-Dried Timber & Joinery',
      href: '#manifesto',
      isExternal: false,
      image: '/images/timber-macro.jpg',
      caption: 'Mortise & tenon structural joints with zero visible fasteners.',
    },
    {
      num: '04',
      title: 'Furniture Collections',
      tagline: 'Heirloom Furniture Suites',
      href: '#collections',
      isExternal: false,
      image: '/images/hero-dining.jpg',
      caption: 'Curated 8-seater dining suites, platform beds & vitrines.',
    },
    {
      num: '05',
      title: 'Custom Furniture',
      tagline: 'Interactive 3D Blueprinting',
      href: '#bespoke',
      isExternal: false,
      image: '/images/hero-craftsmanship.jpg',
      caption: 'Tailored dimensions, wood species, and fabric selection.',
    },
    {
      num: '06',
      title: 'Room Suites',
      tagline: 'Living, Bedroom & Dining Portals',
      href: '#craftsmanship',
      isExternal: false,
      image: '/images/hero-bedroom.jpg',
      caption: 'The Imperial Master Bedroom with 800L silent hydraulic storage.',
    },
    {
      num: '07',
      title: 'Atelier Showroom',
      tagline: 'Flagship Studio & Materials Lab',
      href: '#showroom',
      isExternal: false,
      image: '/images/storefront-living.jpg',
      caption: 'Explore seasoned timber specimens, fabric libraries, and bespoke mockups.',
    },
    {
      num: '08',
      title: 'Acquire Platform',
      tagline: 'Turnkey Interior Website & Full CMS',
      href: '#platform-acquisition',
      isExternal: false,
      image: '/images/hero-craftsmanship.jpg',
      caption: 'Deploy this exact luxury storefront and workshop operations CMS for your studio.',
    },
    {
      num: '09',
      title: 'WhatsApp Concierge',
      tagline: 'Instant Quotes & Consultations',
      href: getWhatsAppInquiryUrl(),
      isExternal: true,
      image: '/images/warranty-handover.jpg',
      caption: 'Direct studio WhatsApp desk for availability and custom commissions.',
    },
  ];

  const handleNavClick = useCallback((e, link) => {
    if (link.isExternal) {
      setIsMenuOpen(false);
      return;
    }

    if (link.href.startsWith('/')) {
      setIsMenuOpen(false);
      window.location.href = link.href;
      return;
    }

    e.preventDefault();
    setIsMenuOpen(false);

    // If on subpage (e.g. /collections/...), navigate to root with hash
    if (window.location.pathname !== '/') {
      window.location.href = `/${link.href}`;
      return;
    }

    // Wait for menu exit animation before smooth scrolling
    setTimeout(() => {
      if (link.href === '#home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const target = document.querySelector(link.href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }, 250);
  }, []);

  return (
    <>
      <div
        className={`fixed top-0 left-0 w-full z-50 transition-transform duration-500 ${
          isHidden ? '-translate-y-full' : 'translate-y-0'
        }`}
      >
        {showBanner && (
          <TurnkeyPlatformBanner
            onOpenAcquisition={onOpenAcquisition}
            onClose={() => setShowBanner(false)}
          />
        )}
        <header
          className={`w-full transition-all duration-300 ${
            isScrolled 
              ? 'backdrop-blur-xl bg-[#1C140F]/90 border-b border-[#C6A75E]/20 py-3 shadow-2xl' 
              : 'bg-gradient-to-b from-[#140B04]/90 via-[#140B04]/50 to-transparent py-3.5 sm:py-4'
          }`}
        >
          <div className="container mx-auto px-6 lg:px-12 flex justify-between items-center">
            
            {/* Left: Brand Monogram & Title */}
            <div className="flex items-center gap-4">
              <a 
                href="#home" 
                onClick={(e) => {
                  e.preventDefault();
                  if (window.location.pathname !== '/') {
                    window.location.href = '/#home';
                  } else {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }
                }}
                className="flex items-center gap-3 cursor-pointer group"
              >
                <span className="w-8 h-8 rounded-full border border-[#C6A75E]/60 flex items-center justify-center font-display text-xs font-bold text-[#E8DCC8] bg-[#241A14]/80 transition-all group-hover:border-[#C6A75E] group-hover:shadow-[0_0_15px_rgba(198,167,94,0.3)]">
                  H
                </span>
                <div className="flex flex-col">
                  <span className="font-display text-lg lg:text-xl tracking-[0.25em] text-[#F5EFEB] font-bold">
                    HAVEN
                  </span>
                  <span className="text-[8px] tracking-[0.35em] text-[#C6A75E] font-mono uppercase">
                    ATELIER · ARCHITECTURAL INTERIORS
                  </span>
                </div>
              </a>
            </div>

            {/* Center: Poliform-Style Editorial Navigation Links (Desktop) */}
            <nav className="hidden lg:flex items-center gap-7 xl:gap-8 font-mono text-[11px] tracking-[0.2em] uppercase text-[#E8DCC8]/75">
              <a 
                href="#collections" 
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('#collections')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="hover:text-[#C6A75E] transition-colors duration-300"
              >
                Collections
              </a>
              <a 
                href="#manifesto" 
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('#manifesto')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="hover:text-[#C6A75E] transition-colors duration-300"
              >
                Craft
              </a>
              <a 
                href="#craftsmanship" 
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('#craftsmanship')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="hover:text-[#C6A75E] transition-colors duration-300"
              >
                Suites
              </a>
              <a 
                href="#bespoke" 
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('#bespoke')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="hover:text-[#C6A75E] transition-colors duration-300"
              >
                Custom 3D
              </a>
              <a 
                href="#showroom" 
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('#showroom')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="hover:text-[#C6A75E] transition-colors duration-300"
              >
                Showroom
              </a>
              <button 
                type="button"
                onClick={onOpenAcquisition}
                className="text-[#E5CA85] hover:text-white font-semibold transition-colors duration-300 flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C6A75E]/10 border border-[#C6A75E]/30 hover:border-[#C6A75E] cursor-pointer"
              >
                <span>Acquire Platform</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#C6A75E] animate-pulse" />
              </button>
            </nav>

            {/* Right: WhatsApp CTA, Consultation Tray & Menu Toggle */}
            <div className="flex items-center gap-4 sm:gap-5">
              <a
                href={getWhatsAppInquiryUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#C6A75E]/40 hover:border-[#C6A75E] text-[#C6A75E] hover:text-[#241A14] hover:bg-[#C6A75E] font-mono text-[10px] tracking-widest uppercase transition-all duration-300"
              >
                <span>WhatsApp</span>
                <span className="text-xs">↗</span>
              </a>

              {/* Consultation & Quotation Tray Button */}
              <button
                type="button"
                onClick={openDrawer}
                className="relative flex items-center justify-center w-9 h-9 rounded-full border border-[#C6A75E]/40 hover:border-[#C6A75E] text-[#C6A75E] hover:bg-[#C6A75E] hover:text-[#241A14] transition-colors"
                aria-label={`Open Consultation Tray with ${itemCount} items`}
              >
                <ShoppingBag className="w-4 h-4" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-[16px] h-4 px-1 rounded-full bg-[#C6A75E] text-[#241A14] font-mono text-[9px] font-bold flex items-center justify-center shadow-md animate-pulse">
                    {itemCount}
                  </span>
                )}
              </button>

              <button 
                onClick={() => setIsMenuOpen(true)}
                className="group flex flex-col justify-center items-end gap-1.5 h-10 w-10 cursor-pointer"
                aria-label="Open Menu"
              >
                <div className="h-[1px] w-7 bg-[#E8DCC8] transition-transform origin-right group-hover:scale-x-75"></div>
                <div className="h-[1px] w-7 bg-[#E8DCC8]"></div>
                <div className="h-[1px] w-5 bg-[#C6A75E] transition-transform origin-right group-hover:w-7"></div>
              </button>
            </div>
            
          </div>
        </header>
      </div>

      {/* FULLSCREEN RESPONSIVE OVERLAY MENU */}
      <AnimatePresence>
        {isMenuOpen && (
          <div 
            className="fixed inset-0 z-[99] w-full h-[100svh] overflow-hidden"
            onClick={handleOverlayClick}
          >
            
            {/* ── MOBILE OVERLAY (< lg screens: unified scrollable drawer, zero overlap) ── */}
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="lg:hidden flex flex-col h-full bg-[#241A14] text-linen overflow-y-auto"
            >
              {/* Sticky Top Bar with Close Button */}
              <div className="sticky top-0 z-30 bg-[#241A14]/95 backdrop-blur-md px-6 py-4 border-b border-linen/10 flex items-center justify-between">
                <div>
                  <span className="font-display text-lg tracking-[0.25em] text-[#F5EFEB] block font-bold">
                    HAVEN
                  </span>
                  <span className="text-[8px] tracking-[0.35em] text-[#C6A75E] font-mono uppercase block">
                    ATELIER · ARCHITECTURAL INTERIORS
                  </span>
                </div>

                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider rounded-full border border-[#C6A75E]/40 bg-[#C6A75E]/10 text-linen hover:bg-[#C6A75E] hover:text-[#241A14] px-4 py-2 transition-colors cursor-pointer shadow-md"
                  aria-label="Close Menu"
                >
                  <span>Close</span>
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Mobile Content Area */}
              <div className="px-6 py-6 space-y-6 flex-1">
                {/* Navigation Links */}
                <nav className="flex flex-col divide-y divide-linen/10">
                  {navLinks.map((link) => (
                    <a
                      key={link.num}
                      href={link.href}
                      target={link.isExternal ? '_blank' : undefined}
                      rel={link.isExternal ? 'noopener noreferrer' : undefined}
                      onClick={(e) => handleNavClick(e, link)}
                      className="py-3.5 flex items-center justify-between group cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs text-bronze">({link.num})</span>
                        <span className="font-display text-lg uppercase tracking-wider text-linen group-hover:text-bronze transition-colors">
                          {link.title}
                        </span>
                      </div>
                      <ArrowRight className="w-4 h-4 text-linen/40 group-hover:text-bronze group-hover:translate-x-1 transition-colors transition-transform" />
                    </a>
                  ))}
                </nav>

                {/* Direct Category Portals Shortcuts */}
                <div className="p-4 rounded-2xl bg-white/5 border border-linen/10 space-y-3">
                  <span className="text-[10px] font-mono text-bronze uppercase tracking-[0.25em] block font-semibold">
                    Explore Dedicated Suites (4 Pieces Each)
                  </span>
                  <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                    <a
                      href="/collections/living-room"
                      onClick={() => setIsMenuOpen(false)}
                      className="p-2.5 rounded-xl bg-white/5 hover:bg-bronze hover:text-black transition-colors block text-center border border-linen/10"
                    >
                      Living Room →
                    </a>
                    <a
                      href="/collections/master-bedroom"
                      onClick={() => setIsMenuOpen(false)}
                      className="p-2.5 rounded-xl bg-white/5 hover:bg-bronze hover:text-black transition-colors block text-center border border-linen/10"
                    >
                      Bedroom →
                    </a>
                    <a
                      href="/collections/royal-dining"
                      onClick={() => setIsMenuOpen(false)}
                      className="p-2.5 rounded-xl bg-white/5 hover:bg-bronze hover:text-black transition-colors block text-center border border-linen/10"
                    >
                      Royal Dining →
                    </a>
                    <a
                      href="/collections/executive-study"
                      onClick={() => setIsMenuOpen(false)}
                      className="p-2.5 rounded-xl bg-white/5 hover:bg-bronze hover:text-black transition-colors block text-center border border-linen/10"
                    >
                      Executive Study →
                    </a>
                  </div>
                </div>

                {/* Showroom & Contact Details */}
                <div className="p-4 rounded-2xl bg-white/5 border border-linen/10 space-y-3 text-xs font-mono text-linen/70">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-[#C6A75E] tracking-widest block mb-1">
                      Flagship Showroom
                    </span>
                    <p className="text-linen leading-relaxed text-xs">
                      {COMPANY.address} · {COMPANY.landmark}
                    </p>
                    <p className="text-[10px] text-linen/50 mt-0.5">
                      {COMPANY.hours}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-linen/10 flex flex-col gap-2">
                    <a
                      href={getPhoneUrl()}
                      className="flex items-center gap-2 text-linen hover:text-[#C6A75E] transition-colors text-xs"
                    >
                      <Phone className="w-3.5 h-3.5 text-[#C6A75E]" />
                      <span>{COMPANY.phoneDisplay}</span>
                    </a>
                    <a
                      href={getWhatsAppInquiryUrl()}
                      target="_blank"
                      rel="noreferrer"
                      className="p-3 bg-emerald-700/80 hover:bg-emerald-600 text-white rounded-xl flex items-center justify-center gap-2 text-xs uppercase tracking-wider font-semibold transition-colors mt-1"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Chat on WhatsApp</span>
                    </a>
                  </div>
                </div>

                {/* Mobile Menu Footer */}
                <div className="pt-4 pb-8 border-t border-linen/10 flex justify-between items-center text-[10px] font-mono text-linen/40 uppercase">
                  <span>Chattogram, Bangladesh</span>
                </div>
              </div>
            </motion.div>

            {/* ── DESKTOP OVERLAY (Dual Split Screen for lg: screens) ── */}
            <div className="hidden lg:grid lg:grid-cols-2 w-full h-full">
              
              {/* LEFT HALF (LINEN BACKGROUND) */}
              <motion.div 
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
                className="bg-linen text-espresso-deep relative flex flex-col justify-center h-full z-10 border-r border-espresso-deep/10"
              >
                <div className="w-full max-w-2xl mx-auto px-8 lg:px-16 py-10 flex flex-col h-full justify-between overflow-y-auto">
                  <div className="pt-2">
                    <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#8F753A] font-semibold block">
                      Atelier Index · 2026
                    </span>
                    <h3 className="font-display text-2xl text-espresso-deep font-light">
                      Navigate Collections &amp; Craft
                    </h3>
                  </div>

                  <nav className="flex flex-col my-auto divide-y divide-espresso-deep/15">
                    {navLinks.map((link, index) => {
                      const isHovered = hoveredNavIndex === index;
                      return (
                        <a
                          key={link.num}
                          href={link.href}
                          target={link.isExternal ? '_blank' : undefined}
                          rel={link.isExternal ? 'noopener noreferrer' : undefined}
                          onClick={(e) => handleNavClick(e, link)}
                          onMouseEnter={() => setHoveredNavIndex(index)}
                          className="group relative flex items-center justify-between py-3.5 lg:py-4.5 overflow-hidden cursor-pointer"
                        >
                          {/* Hover Fill Background */}
                          <div className="absolute inset-0 bg-espresso-deep origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-400 ease-[0.76,0,0.24,1] z-0"></div>
                          
                          {/* Content */}
                          <div className="relative z-10 flex items-center gap-4 transition-colors duration-400 group-hover:text-linen">
                            <span className="font-mono text-xs lg:text-sm text-[#8F753A] group-hover:text-[#C6A75E] font-semibold">
                              ({link.num})
                            </span>
                            <div>
                              <span className="font-display uppercase tracking-widest text-base lg:text-xl block transition-transform duration-400 group-hover:translate-x-2">
                                {link.title}
                              </span>
                              <span className="font-mono text-[10px] text-espresso-deep/60 group-hover:text-linen/60 block transition-colors">
                                {link.tagline}
                              </span>
                            </div>
                          </div>

                          {/* Arrow Indicator */}
                          <ArrowRight className="relative z-10 w-4 h-4 text-espresso-deep/40 group-hover:text-[#C6A75E] group-hover:translate-x-1 transition-all duration-300 mr-2" />

                          {/* Bronze Accent Line on Hover */}
                          <div className="absolute left-0 bottom-0 w-4 h-[2px] bg-[#C6A75E] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-400 delay-75 z-20"></div>
                        </a>
                      );
                    })}
                  </nav>

                  <div className="pt-4 border-t border-espresso-deep/15 flex items-center justify-between text-[10px] font-mono text-espresso-deep/60 uppercase">
                    <span>Chattogram Atelier</span>
                    <span>Scroll or Click to Jump</span>
                  </div>
                </div>
              </motion.div>

              {/* RIGHT HALF (ESPRESSO BACKGROUND WITH DYNAMIC LIVE PREVIEW) */}
              <motion.div 
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
                className="bg-[#1C140F] text-[#F5EFEB] relative flex flex-col h-full z-10 overflow-hidden"
              >
                {(() => {
                  const activeLink = navLinks[hoveredNavIndex] || navLinks[0];
                  return (
                    <div className="w-full max-w-2xl mx-auto px-8 lg:px-14 py-8 flex flex-col h-full justify-between overflow-y-auto space-y-6">
                      
                      {/* Top Bar: Brand, Tray & Close */}
                      <div className="flex items-center justify-between pb-4 border-b border-[#C6A75E]/15">
                        <div className="flex items-center gap-3">
                          <span className="w-2.5 h-2.5 rounded-full bg-[#C6A75E] animate-pulse" />
                          <div>
                            <span className="font-display text-2xl tracking-[0.25em] text-[#F5EFEB] font-bold block">
                              HAVEN
                            </span>
                            <span className="text-[9px] tracking-[0.35em] text-[#C6A75E] font-mono block uppercase">
                              ATELIER · ARCHITECTURAL INTERIORS
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          {/* Tray Button */}
                          <button
                            type="button"
                            onClick={() => {
                              setIsMenuOpen(false);
                              openDrawer();
                            }}
                            className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#C6A75E]/30 bg-[#C6A75E]/10 hover:bg-[#C6A75E] text-[#C6A75E] hover:text-[#241A14] font-mono text-[10px] uppercase tracking-wider transition-colors"
                          >
                            <ShoppingBag className="w-3.5 h-3.5" />
                            <span>Tray {itemCount > 0 ? `(${itemCount})` : ''}</span>
                          </button>

                          {/* Close Button */}
                          <button
                            onClick={() => setIsMenuOpen(false)}
                            className="flex items-center gap-2 font-mono text-[10px] tracking-widest uppercase rounded-full border border-[#C6A75E]/40 bg-[#C6A75E]/10 text-[#F5EFEB] hover:bg-[#C6A75E] hover:text-[#241A14] transition-colors duration-300 px-4 py-2 cursor-pointer shadow-lg"
                            aria-label="Close Menu"
                          >
                            <span>Close</span>
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* 1. Dynamic Live Architectural Preview Card */}
                      <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden border border-[#C6A75E]/25 shadow-2xl bg-[#140D09]">
                        <AnimatePresence mode="wait">
                          <motion.div
                            key={activeLink.image}
                            initial={{ opacity: 0, scale: 1.04 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.98 }}
                            transition={{ duration: 0.4, ease: 'easeOut' }}
                            className="absolute inset-0"
                          >
                            <img
                              src={activeLink.image}
                              alt={activeLink.title}
                              className="w-full h-full object-cover brightness-[0.88] contrast-105"
                              width={1200}
                              height={675}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                          </motion.div>
                        </AnimatePresence>

                        {/* Floating Caption on Card */}
                        <div className="absolute bottom-0 inset-x-0 p-5 space-y-1 z-10">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-[#C6A75E] font-semibold bg-black/60 px-2.5 py-0.5 rounded-full border border-[#C6A75E]/30">
                              Preview · {activeLink.num}
                            </span>
                            <span className="font-mono text-[10px] text-[#F5EFEB]/70">
                              {activeLink.tagline}
                            </span>
                          </div>
                          <h4 className="font-display text-lg text-[#F5EFEB] font-normal">
                            {activeLink.title}
                          </h4>
                          <p className="font-body text-xs text-[#F5EFEB]/80 font-light line-clamp-1">
                            {activeLink.caption}
                          </p>
                        </div>
                      </div>

                      {/* 2. Flagship Suite Portals (Quick Navigation) */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-[10px] uppercase tracking-widest text-[#C6A75E] font-semibold">
                            Explore Dedicated Suites
                          </span>
                          <span className="font-mono text-[9px] text-[#F5EFEB]/40">
                            4 Pieces Each
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-2.5">
                          {[
                            { slug: 'living-room', name: 'Living Room', icon: '01' },
                            { slug: 'master-bedroom', name: 'Master Bedroom', icon: '02' },
                            { slug: 'royal-dining', name: 'Royal Dining', icon: '03' },
                            { slug: 'executive-study', name: 'Executive Study', icon: '04' },
                          ].map((suite) => (
                            <a
                              key={suite.slug}
                              href={`/collections/${suite.slug}`}
                              onClick={() => setIsMenuOpen(false)}
                              className="p-3 rounded-xl bg-[#241A14] hover:bg-[#30231B] border border-[#C6A75E]/20 hover:border-[#C6A75E] transition-all flex items-center justify-between group"
                            >
                              <div>
                                <span className="font-mono text-[8px] text-[#C6A75E] block">SUITE {suite.icon}</span>
                                <span className="font-display text-xs text-[#F5EFEB] group-hover:text-[#C6A75E] transition-colors">{suite.name}</span>
                              </div>
                              <ArrowRight className="w-3.5 h-3.5 text-[#C6A75E]/60 group-hover:text-[#C6A75E] group-hover:translate-x-1 transition-all" />
                            </a>
                          ))}
                        </div>
                      </div>

                      {/* 3. Flagship Atelier & Concierge Block */}
                      <div className="p-4 rounded-xl bg-[#140D09] border border-[#C6A75E]/20 space-y-3">
                        <div className="grid grid-cols-2 gap-4 text-xs">
                          <div>
                            <span className="font-mono text-[9px] uppercase tracking-wider text-[#C6A75E] block mb-1">
                              Atelier Studio
                            </span>
                            <p className="font-display text-xs text-[#F5EFEB]">
                              Design District Flagship
                            </p>
                            <p className="text-[10px] text-[#F5EFEB]/60 font-mono">
                              Material Lab & Joinery Workshop
                            </p>
                          </div>
                          <div>
                            <span className="font-mono text-[9px] uppercase tracking-wider text-[#C6A75E] block mb-1">
                              Studio Hours
                            </span>
                            <p className="font-display text-xs text-[#F5EFEB]">
                              Mon–Sat: 10:00 AM – 8:00 PM
                            </p>
                            <p className="text-[10px] text-[#F5EFEB]/60 font-mono">
                              By Appointment & Walk-In
                            </p>
                          </div>
                        </div>

                        <div className="pt-2 border-t border-[#C6A75E]/15 flex items-center justify-between gap-3">
                          <a
                            href={getWhatsAppInquiryUrl()}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-[#25D366] hover:bg-[#20BE5C] text-[#112316] font-mono text-[10px] uppercase tracking-wider font-bold transition-all shadow-md"
                          >
                            <MessageCircle className="w-3.5 h-3.5 fill-current" />
                            <span>WhatsApp Concierge</span>
                          </a>

                          <a
                            href={`tel:${COMPANY.phone}`}
                            className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg border border-[#C6A75E]/30 text-[#F5EFEB] hover:border-[#C6A75E] hover:text-[#C6A75E] font-mono text-[10px] uppercase tracking-wider transition-colors"
                          >
                            <Phone className="w-3.5 h-3.5 text-[#C6A75E]" />
                            <span>Call Atelier</span>
                          </a>
                        </div>
                      </div>

                      {/* 4. Footer */}
                      <div className="flex justify-between items-center border-t border-[#C6A75E]/15 pt-3 text-[9px] font-mono tracking-widest text-[#F5EFEB]/40 uppercase">
                        <span>Haven Atelier Flagship</span>
                        <span>© 2026 Haven Atelier. All rights reserved.</span>
                      </div>
                    </div>
                  );
                })()}
              </motion.div>

            </div>

          </div>
        )}
      </AnimatePresence>
    </>
  );
}
