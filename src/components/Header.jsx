import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, Phone, MessageCircle } from 'lucide-react';
import { COMPANY } from '../data/company';
import { getWhatsAppInquiryUrl } from '../utils/whatsapp';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

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

  const navLinks = [
    { num: '1', title: 'Home', href: '#home', isExternal: false },
    { num: '2', title: 'Real Room Settings', href: '#composition', isExternal: false },
    { num: '3', title: 'Wood & Craftsmanship', href: '#manifesto', isExternal: false },
    { num: '4', title: 'Furniture Collections', href: '#collections', isExternal: false },
    { num: '5', title: 'Custom Furniture', href: '#bespoke', isExternal: false },
    { num: '6', title: 'Room Suites', href: '#craftsmanship', isExternal: false },
    { num: '7', title: 'Agrabad Showroom', href: '#showroom', isExternal: false },
    { num: '8', title: 'WhatsApp Us', href: getWhatsAppInquiryUrl(), isExternal: true }
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
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-transform transition-colors duration-500 ${
          isHidden ? '-translate-y-full' : 'translate-y-0'
        } ${isScrolled ? 'glass py-3' : 'bg-transparent py-5'}`}
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
              <span className="w-8 h-8 rounded-full border border-[#C6A75E]/60 flex items-center justify-center font-display text-xs font-bold text-[#E8DCC8] bg-[#241A14]/80 transition-colors group-hover:border-[#C6A75E]">
                H
              </span>
              <div className="flex flex-col">
                <span className="font-display text-lg lg:text-xl tracking-[0.25em] text-[#F5EFEB] font-bold">
                  HEAVEN
                </span>
                <span className="text-[8px] tracking-[0.35em] text-[#C6A75E] font-mono uppercase">
                  FURNITURE MART · CHATTOGRAM
                </span>
              </div>
            </a>
          </div>

          {/* Center: Poliform-Style Editorial Navigation Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-8 font-mono text-[11px] tracking-[0.2em] uppercase text-[#E8DCC8]/70">
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
              Custom
            </a>
            <a 
              href="#composition" 
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#composition')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="hover:text-[#C6A75E] transition-colors duration-300"
            >
              Rooms
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
          </nav>

          {/* Right: WhatsApp CTA & Menu Toggle */}
          <div className="flex items-center gap-5">
            <a
              href={getWhatsAppInquiryUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#C6A75E]/40 hover:border-[#C6A75E] text-[#C6A75E] hover:text-[#241A14] hover:bg-[#C6A75E] font-mono text-[10px] tracking-widest uppercase transition-colors duration-300"
            >
              <span>WhatsApp</span>
              <span className="text-xs">↗</span>
            </a>

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

      {/* FULLSCREEN RESPONSIVE OVERLAY MENU */}
      <AnimatePresence>
        {isMenuOpen && (
          <div className="fixed inset-0 z-[99] w-full h-[100svh] overflow-hidden">
            
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
                  <span className="font-display text-lg tracking-[0.2em] text-linen block font-bold">
                    HEAVEN
                  </span>
                  <span className="text-[8px] tracking-[0.3em] text-bronze font-mono uppercase block">
                    FURNITURE MART
                  </span>
                </div>

                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider rounded-full border border-bronze/40 bg-bronze/10 text-linen hover:bg-bronze hover:text-black px-4 py-2 transition-colors cursor-pointer shadow-md"
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
                    <span className="text-[10px] font-mono uppercase text-bronze tracking-widest block mb-1">
                      Flagship Showroom
                    </span>
                    <p className="text-linen leading-relaxed text-xs">
                      Agrabad Access Road, Opposite RAK Ceramics, Chattogram
                    </p>
                    <p className="text-[10px] text-linen/50 mt-0.5">
                      Sat–Thu: 9:00 AM – 9:30 PM (Friday Closed)
                    </p>
                  </div>

                  <div className="pt-3 border-t border-linen/10 flex flex-col gap-2">
                    <a
                      href="tel:+8801960481983"
                      className="flex items-center gap-2 text-linen hover:text-bronze transition-colors text-xs"
                    >
                      <Phone className="w-3.5 h-3.5 text-bronze" />
                      <span>+880 1960-481983</span>
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
                className="bg-linen text-espresso-deep relative flex flex-col justify-center h-full z-10"
              >
                <div className="w-full max-w-2xl mx-auto px-8 lg:px-20 py-12 flex flex-col h-full overflow-y-auto">
                  <nav className="flex flex-col mt-auto mb-auto gap-0">
                    {navLinks.map((link) => (
                      <a
                        key={link.num}
                        href={link.href}
                        target={link.isExternal ? '_blank' : undefined}
                        rel={link.isExternal ? 'noopener noreferrer' : undefined}
                        onClick={(e) => handleNavClick(e, link)}
                        className="group relative flex items-center border-b border-espresso-deep/30 py-5 lg:py-7 overflow-hidden cursor-pointer"
                      >
                        {/* Hover Fill Background */}
                        <div className="absolute inset-0 bg-espresso-deep origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-400 ease-[0.76,0,0.24,1] z-0"></div>
                        
                        {/* Content */}
                        <div className="relative z-10 flex items-center w-full transition-colors duration-400 group-hover:text-linen">
                          <span className="font-mono text-xs lg:text-sm mr-5 lg:mr-6 opacity-60">({link.num})</span>
                          <span className="font-display uppercase tracking-widest text-lg lg:text-2xl transition-transform duration-400 group-hover:translate-x-3">
                            {link.title}
                          </span>
                        </div>

                        {/* Bronze Accent Line on Hover */}
                        <div className="absolute left-0 bottom-0 w-3 h-[3px] bg-bronze origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-400 delay-75 z-20"></div>
                      </a>
                    ))}
                  </nav>
                </div>
              </motion.div>

              {/* RIGHT HALF (ESPRESSO BACKGROUND) */}
              <motion.div 
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
                className="bg-espresso-deep text-linen relative flex flex-col h-full z-10"
              >
                <div className="w-full max-w-2xl mx-auto px-8 lg:px-20 py-12 flex flex-col h-full justify-between overflow-y-auto">
                  
                  {/* Close Button at Top Right */}
                  <div className="flex justify-between items-center mt-4">
                    <div>
                      <span className="font-display text-3xl lg:text-5xl tracking-[0.3em] text-linen block font-bold">
                        HEAVEN
                      </span>
                      <span className="text-[10px] lg:text-xs tracking-[0.4em] text-bronze-light font-mono mt-2 block uppercase">
                        FURNITURE MART
                      </span>
                    </div>

                    <button
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center gap-2 font-mono text-[10px] tracking-widest uppercase rounded-full border border-bronze bg-bronze/20 text-linen hover:bg-bronze hover:text-espresso transition-colors duration-300 px-5 py-2.5 cursor-pointer shadow-lg backdrop-blur-md"
                      aria-label="Close Menu"
                    >
                      <span>Close</span>
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Contact Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10 my-8">
                    <div className="flex flex-col gap-6">
                      <div>
                        <span className="block font-mono text-[10px] tracking-widest text-bronze uppercase mb-2 font-semibold">Location</span>
                        <p className="font-body text-sm leading-relaxed text-linen-muted">
                          Agrabad Access Road,<br/>
                          Opposite RAK Ceramics,<br/>
                          Chattogram, Bangladesh
                        </p>
                      </div>
                      <div>
                        <span className="block font-mono text-[10px] tracking-widest text-bronze uppercase mb-2 font-semibold">Direct Contact</span>
                        <a href="mailto:heavenfurnituremart@gmail.com" className="font-body text-sm text-linen-muted hover:text-linen transition-colors block mb-1">
                          heavenfurnituremart@gmail.com
                        </a>
                        <a href="tel:+8801960481983" className="font-body text-sm text-linen-muted hover:text-linen transition-colors block">
                          +880 1960-481983
                        </a>
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-6">
                      <div>
                        <span className="block font-mono text-[10px] tracking-widest text-bronze uppercase mb-2 font-semibold">Showroom Hours</span>
                        <p className="font-body text-sm leading-relaxed text-linen-muted">
                          Sat–Thu: 9:00 AM – 9:30 PM<br/>
                          Friday: Closed
                        </p>
                      </div>
                      <div>
                        <span className="block font-mono text-[10px] tracking-widest text-bronze uppercase mb-2 font-semibold">Social Atelier</span>
                        <div className="flex flex-wrap gap-4">
                          {COMPANY?.socials && Object.entries(COMPANY.socials).map(([platform, url]) => (
                            <a key={platform} href={url} target="_blank" rel="noopener noreferrer" className="font-body text-sm text-linen-muted hover:text-linen transition-colors capitalize">
                              {platform}
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="flex justify-between items-center border-t border-linen/10 pt-6 text-[10px] font-mono tracking-widest text-linen-muted/60 uppercase">
                    <span>Agrabad Flagship</span>
                    <span>© 2026 HFM</span>
                  </div>
                </div>
              </motion.div>

            </div>

          </div>
        )}
      </AnimatePresence>
    </>
  );
}
