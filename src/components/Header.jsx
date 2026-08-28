import { useState, useEffect } from 'react';
import { Menu, X, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-obsidian/90 backdrop-blur-md border-b border-surface' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex-shrink-0 flex flex-col">
              <span className="font-display text-xl tracking-widest text-ivory">HEAVEN</span>
              <span className="text-[10px] tracking-[0.3em] text-gold">FURNITURE MART</span>
            </div>

            {/* Center Status */}
            <div className="hidden md:flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface/50 border border-gold/10 backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-medium text-ivory-muted tracking-wide">Agrabad Flagship · Open Now</span>
            </div>

            {/* Right CTAs */}
            <div className="hidden md:flex items-center gap-4">
              <button className="px-5 py-2 border border-gold text-gold hover:bg-gold hover:text-obsidian transition-colors text-sm font-medium tracking-wide">
                Book Consultation
              </button>
              <a
                href="https://wa.me/8801960481983"
                target="_blank"
                rel="noreferrer"
                className="p-2 text-ivory hover:text-gold transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-ivory hover:text-gold p-2"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-y-0 right-0 z-40 w-full sm:w-80 bg-obsidian border-l border-surface shadow-2xl pt-24 px-6 flex flex-col gap-6"
          >
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-surface border border-gold/10 w-max">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-medium text-ivory-muted tracking-wide">Agrabad Flagship · Open Now</span>
            </div>
            
            <button className="w-full px-5 py-3 border border-gold text-gold hover:bg-gold hover:text-obsidian transition-colors text-sm font-medium tracking-wide">
              Book Consultation
            </button>
            
            <a
              href="https://wa.me/8801960481983"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 w-full px-5 py-3 bg-surface text-ivory hover:text-gold transition-colors text-sm font-medium tracking-wide border border-surface hover:border-gold/30"
            >
              <MessageCircle className="w-5 h-5" />
              WhatsApp Us
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
