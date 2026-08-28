import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { getWhatsAppInquiryUrl } from '../utils/whatsapp';

export default function Hero() {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const scale = useTransform(scrollYProgress, [0, 1], [1.0, 1.06]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.3]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <div ref={containerRef} className="relative min-h-screen overflow-hidden flex items-center bg-obsidian">
      {/* Background Image */}
      <motion.div 
        style={{ scale, opacity }}
        className="absolute inset-0 z-0"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian/80 via-obsidian/40 to-transparent z-10"></div>
        <img 
          src="/images/hero-living.jpg" 
          alt="Luxury living room furniture" 
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-20">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-3xl"
        >
          <motion.h1 
            variants={itemVariants}
            className="font-display text-5xl md:text-7xl lg:text-8xl text-ivory tracking-tight mb-6 leading-tight"
          >
            FURNITURE, <br/> CRAFTED <br/> AROUND YOU.
          </motion.h1>
          
          <motion.p 
            variants={itemVariants}
            className="font-body text-lg md:text-xl text-ivory-muted max-w-xl mb-10 leading-relaxed"
          >
            Chattogram's bespoke furniture atelier. Tailored to your space and taste — never pulled from a shelf.
          </motion.p>
          
          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center gap-4"
          >
            <button className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gold text-obsidian px-8 py-4 font-semibold hover:bg-gold-hover transition-colors">
              ✦ Book Free Design Consultation
            </button>
            <a 
              href={getWhatsAppInquiryUrl()}
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto flex items-center justify-center gap-2 border border-gold/40 text-ivory px-8 py-4 font-semibold hover:border-gold hover:text-gold transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              WhatsApp Stylist
            </a>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
