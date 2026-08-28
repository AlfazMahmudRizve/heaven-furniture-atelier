import { useState, useEffect } from 'react';
import { Menu, X, MessageCircle, Phone, MapPin, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { COMPANY } from '../data/company';
import { getWhatsAppInquiryUrl, getPhoneUrl } from '../utils/whatsapp';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Collections', href: '#collections' },
    { label: 'Bespoke Studio', href: '#bespoke' },
    { label: 'Craftsmanship', href: '#craftsmanship' },
    { label: 'Showroom', href: '#showroom' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-obsidian/95 backdrop-blur-md border-b border-gold/15 shadow-xl shadow-obsidian/50 py-3' 
            : 'bg-gradient-to-b from-obsidian/90 via-obsidian/40 to-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            
            {/* Brand Logo */}
            <a href="#" className="flex-shrink-0 flex flex-col group">
              <span className="font-display text-xl sm:text-2xl tracking-[0.15em] text-ivory group-hover:text-gold transition-colors">
                HEAVEN
              </span>
              <span className="text-[9px] sm:text-[10px] tracking-[0.35em] text-gold font-medium -mt-1">
                FURNITURE MART
              </span>
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-xs uppercase tracking-widest text-ivory-muted hover:text-gold transition-colors font-medium"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Center Status Badge */}
            <div className="hidden md:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface/70 border border-gold/20 backdrop-blur-sm shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-[11px] font-medium text-ivory/90 tracking-wide">
                Agrabad Flagship · Open Today
              </span>
            </div>

            {/* Right Action CTAs */}
            <div className="hidden sm:flex items-center gap-3">
              <a
                href="#bespoke"
                className="flex items-center gap-1.5 px-4 py-2 bg-gold/10 border border-gold/40 text-gold hover:bg-gold hover:text-obsidian transition-all duration-300 text-xs font-semibold tracking-wider uppercase rounded-sm"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Book Visit</span>
              </a>

              <a
                href={getWhatsAppInquiryUrl()}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-3.5 py-2 bg-surface border border-white/10 text-ivory hover:border-gold/40 hover:text-gold transition-all duration-300 text-xs font-medium rounded-sm"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4 text-green-400" />
                <span className="hidden xl:inline">01960-481983</span>
              </a>
            </div>

            {/* Mobile Menu Trigger */}
            <div className="lg:hidden flex items-center gap-2">
              <a
                href={getWhatsAppInquiryUrl()}
                target="_blank"
                rel="noreferrer"
                className="sm:hidden p-2 text-green-400 hover:text-green-300"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-5 h-5" />
              </a>

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-ivory hover:text-gold p-2"
                aria-label="Toggle navigation menu"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-x-0 top-16 z-40 bg-obsidian/98 border-b border-gold/20 shadow-2xl p-6 lg:hidden flex flex-col gap-5 backdrop-blur-xl"
          >
            {/* Flagship Badge */}
            <div className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-surface border border-gold/20 w-max">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-medium text-ivory tracking-wide">
                Agrabad Access Road · Flagship Open
              </span>
            </div>

            {/* Nav Links */}
            <div className="flex flex-col gap-3 py-2 border-y border-white/5">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-base text-ivory hover:text-gold py-1 font-medium transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Mobile Actions */}
            <div className="flex flex-col gap-3 pt-2">
              <a
                href="#bespoke"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-3.5 bg-gold text-obsidian font-semibold text-sm tracking-wide"
              >
                <Sparkles className="w-4 h-4" />
                <span>Book Free Design Consultation</span>
              </a>

              <a
                href={getWhatsAppInquiryUrl()}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3 bg-surface border border-gold/30 text-ivory font-medium text-sm hover:border-gold"
              >
                <MessageCircle className="w-4 h-4 text-green-400" />
                <span>WhatsApp: +880 1960-481983</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
