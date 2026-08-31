import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
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

  // Prevent scrolling when menu is open
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
    { num: '2', title: 'About Atelier', href: '#manifesto', isExternal: false },
    { num: '3', title: 'Curated Collections', href: '#collections', isExternal: false },
    { num: '4', title: 'Bespoke Studio', href: '#bespoke', isExternal: false },
    { num: '5', title: 'Craftsmanship', href: '#craftsmanship', isExternal: false },
    { num: '6', title: 'Flagship Showroom', href: '#showroom', isExternal: false },
    { num: '7', title: 'WhatsApp Concierge', href: getWhatsAppInquiryUrl(), isExternal: true }
  ];

  const handleNavClick = useCallback((e, link) => {
    if (link.isExternal) {
      setIsMenuOpen(false);
      return;
    }

    e.preventDefault();
    setIsMenuOpen(false);

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
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          isHidden ? '-translate-y-full' : 'translate-y-0'
        } ${isScrolled ? 'glass py-3' : 'bg-transparent py-5'}`}
      >
        <div className="container mx-auto px-6 lg:px-12 flex justify-between items-center">
          
          {/* Left: Collections Button (Desktop Only) */}
          <div className="hidden lg:flex w-1/3">
            <a 
              href="#collections" 
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#collections')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="arcca-btn"
            >
              <span className="relative z-10 text-xs font-mono tracking-[0.2em] uppercase">Our Collections</span>
            </a>
          </div>

          {/* Center: Brand Logo */}
          <div className="w-auto lg:w-1/3 flex flex-col items-center justify-center">
            <a 
              href="#home" 
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex flex-col items-center text-center cursor-pointer"
            >
              <span className="font-display text-2xl lg:text-3xl tracking-[0.3em] text-linen">
                HEAVEN
              </span>
              <span className="text-[9px] tracking-[0.4em] text-bronze-light font-mono mt-1 uppercase">
                FURNITURE MART
              </span>
            </a>
          </div>

          {/* Right: EST Text & Hamburger */}
          <div className="w-auto lg:w-1/3 flex justify-end items-center gap-8">
            <span className="hidden lg:block font-mono text-[10px] tracking-widest text-bronze-light">
              EST — 2020
            </span>
            <button 
              onClick={() => setIsMenuOpen(true)}
              className="group flex flex-col justify-center items-end gap-1.5 h-10 w-10 cursor-pointer"
              aria-label="Open Menu"
            >
              <div className="h-[1px] w-8 bg-linen transition-transform origin-right group-hover:scale-x-75"></div>
              <div className="h-[1px] w-8 bg-linen"></div>
              <div className="h-[1px] w-8 bg-linen transition-transform origin-right group-hover:scale-x-75"></div>
            </button>
          </div>
          
        </div>
      </header>

      {/* FULLSCREEN SPLIT OVERLAY MENU */}
      <AnimatePresence>
        {isMenuOpen && (
          <div className="fixed inset-0 z-[99] grid grid-rows-2 lg:grid-cols-2 lg:grid-rows-1 w-full h-[100svh] overflow-hidden">
            
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
                        <h2 className="font-display uppercase tracking-widest text-lg lg:text-2xl transition-transform duration-400 group-hover:translate-x-3">
                          {link.title}
                        </h2>
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
                    <span className="font-display text-3xl lg:text-5xl tracking-[0.3em] text-linen block">
                      HEAVEN
                    </span>
                    <span className="text-[10px] lg:text-xs tracking-[0.4em] text-bronze-light font-mono mt-2 block uppercase">
                      FURNITURE MART
                    </span>
                  </div>

                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-2 font-mono text-[10px] tracking-widest uppercase rounded-full border border-bronze bg-bronze/20 text-linen hover:bg-bronze hover:text-espresso transition-all duration-300 px-5 py-2.5 cursor-pointer shadow-lg backdrop-blur-md"
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
                      <span className="block font-mono text-[10px] tracking-widest text-bronze uppercase mb-2">Location</span>
                      <p className="font-body text-sm leading-relaxed text-linen-muted">
                        Agrabad Access Road,<br/>
                        Opposite RAK Ceramics,<br/>
                        Chattogram, Bangladesh
                      </p>
                    </div>
                    <div>
                      <span className="block font-mono text-[10px] tracking-widest text-bronze uppercase mb-2">Direct Contact</span>
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
                      <span className="block font-mono text-[10px] tracking-widest text-bronze uppercase mb-2">Showroom Hours</span>
                      <p className="font-body text-sm leading-relaxed text-linen-muted">
                        Sat–Thu: 9:00 AM – 9:30 PM<br/>
                        Friday: Closed
                      </p>
                    </div>
                    <div>
                      <span className="block font-mono text-[10px] tracking-widest text-bronze uppercase mb-2">Social Atelier</span>
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
                  <a href="/admin" className="hover:text-bronze transition-colors flex items-center gap-1">
                    <span>Store CMS Portal ↗</span>
                  </a>
                  <span>© 2026 HFM</span>
                </div>
              </div>
            </motion.div>
            
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
