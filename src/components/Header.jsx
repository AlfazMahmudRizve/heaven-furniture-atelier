import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
    { num: '1', title: 'Home', href: '#' },
    { num: '2', title: 'About Atelier', href: '#' },
    { num: '3', title: 'Curated Collections', href: '#' },
    { num: '4', title: 'Bespoke Studio', href: '#' },
    { num: '5', title: 'Craftsmanship', href: '#' },
    { num: '6', title: 'Flagship Showroom', href: '#' },
    { num: '7', title: 'WhatsApp Concierge', href: getWhatsAppInquiryUrl() }
  ];

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
            <a href="#collections" className="arcca-btn">
              <span className="relative z-10 text-xs font-mono tracking-[0.2em] uppercase">Our Collections</span>
            </a>
          </div>

          {/* Center: Brand Logo */}
          <div className="w-auto lg:w-1/3 flex flex-col items-center justify-center">
            <a href="/" className="flex flex-col items-center text-center">
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
            
            {/* LEFT HALF */}
            <motion.div 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
              className="bg-linen text-espresso-deep relative flex flex-col justify-center h-full"
            >
              <div className="w-full max-w-2xl mx-auto px-8 lg:px-20 py-12 flex flex-col h-full overflow-y-auto">
                <nav className="flex flex-col mt-auto mb-auto gap-0">
                  {navLinks.map((link) => (
                    <a
                      key={link.num}
                      href={link.href}
                      className="group relative flex items-center border-b border-espresso-deep py-6 lg:py-8 overflow-hidden"
                    >
                      {/* Hover Fill Background */}
                      <div className="absolute inset-0 bg-espresso-deep origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-500 ease-[0.76,0,0.24,1] z-0"></div>
                      
                      {/* Content */}
                      <div className="relative z-10 flex items-center w-full transition-colors duration-500 group-hover:text-linen">
                        <span className="font-mono text-sm mr-6 opacity-50">({link.num})</span>
                        <h2 className="font-display uppercase tracking-widest text-xl md:text-2xl transition-transform duration-500 group-hover:translate-x-4">
                          {link.title}
                        </h2>
                      </div>

                      {/* Bronze Accent Line on Hover */}
                      <div className="absolute left-0 bottom-0 w-2 h-[3px] bg-bronze origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 delay-100 z-20"></div>
                    </a>
                  ))}
                </nav>
              </div>
            </motion.div>

            {/* RIGHT HALF */}
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
              className="bg-espresso-deep text-linen relative flex flex-col h-full"
            >
              <div className="w-full max-w-2xl mx-auto px-8 lg:px-20 py-12 flex flex-col h-full justify-between overflow-y-auto">
                
                {/* Logo Placeholder */}
                <div className="mt-8 lg:mt-24">
                  <span className="font-display text-4xl lg:text-6xl tracking-[0.3em] text-linen block">
                    HEAVEN
                  </span>
                  <span className="text-xs lg:text-sm tracking-[0.4em] text-bronze-light font-mono mt-4 block uppercase">
                    FURNITURE MART
                  </span>
                </div>

                {/* Contact Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-16 mb-auto">
                  <div className="flex flex-col gap-8">
                    <div>
                      <span className="block font-mono text-[10px] tracking-widest text-bronze-light uppercase mb-2">Location</span>
                      <p className="font-body text-sm leading-relaxed max-w-xs">
                        Agrabad Access Road,<br/>
                        Opposite RAK Ceramics,<br/>
                        Chattogram
                      </p>
                    </div>
                    <div>
                      <span className="block font-mono text-[10px] tracking-widest text-bronze-light uppercase mb-2">Contact</span>
                      <a href="mailto:heavenfurnituremart@gmail.com" className="font-body text-sm hover:text-bronze transition-colors block mb-1">
                        heavenfurnituremart@gmail.com
                      </a>
                      <a href="tel:+8801960481983" className="font-body text-sm hover:text-bronze transition-colors block">
                        +880 1960-481983
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-8">
                    <div>
                      <span className="block font-mono text-[10px] tracking-widest text-bronze-light uppercase mb-2">Hours</span>
                      <p className="font-body text-sm leading-relaxed">
                        Sat–Thu: 9:00 AM – 9:30 PM<br/>
                        Friday: Closed
                      </p>
                    </div>
                    <div>
                      <span className="block font-mono text-[10px] tracking-widest text-bronze-light uppercase mb-2">Social</span>
                      <div className="flex flex-col gap-2">
                        {COMPANY?.socials && Object.entries(COMPANY.socials).map(([platform, url]) => (
                          <a key={platform} href={url} target="_blank" rel="noopener noreferrer" className="font-body text-sm hover:text-bronze transition-colors w-fit capitalize">
                            {platform}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="flex justify-between items-center border-t border-espresso-deep/30 pt-8 mt-12 pb-4">
                  <a href="#" className="font-mono text-[10px] tracking-widest text-bronze-light hover:text-linen uppercase">
                    Privacy Policy
                  </a>
                  <span className="font-mono text-[10px] tracking-widest text-bronze-light uppercase">
                    © 2025 HEAVEN FURNITURE MART
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Close Button */}
            <button
              onClick={() => setIsMenuOpen(false)}
              className="absolute bottom-4 right-4 lg:top-8 lg:right-12 z-[100] font-mono text-[10px] tracking-widest uppercase rounded-full border border-bronze bg-bronze text-linen hover:bg-espresso-deep hover:text-linen hover:border-espresso-deep transition-all duration-300 px-6 py-3 cursor-pointer"
            >
              Close
            </button>
            
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
