import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { MessageCircle, ArrowRight, ArrowDown } from 'lucide-react';
import { getWhatsAppInquiryUrl } from '../utils/whatsapp';

export default function Hero() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);

  const suites = [
    { num: '01', title: 'LIVING ROOM', href: '#craftsmanship' },
    { num: '02', title: 'BEDROOM SUITE', href: '#craftsmanship' },
    { num: '03', title: 'ROYAL DINING', href: '#craftsmanship' },
    { num: '04', title: 'OFFICE DESKS', href: '#craftsmanship' },
  ];

  return (
    <section 
      id="home"
      ref={containerRef}
      className="relative min-h-[100svh] flex flex-col justify-between pt-28 pb-8 px-6 lg:px-14 bg-[#241A14] overflow-hidden"
    >
      {/* Cinematic Full-Bleed Architectural Photography with Smooth Ken Burns */}
      <motion.div 
        style={{ scale }}
        className="absolute inset-0 z-0"
      >
        <img 
          src="/images/hero-living.jpg" 
          alt="Heaven Furniture Mart — Living Room in Chattogram"
          width={1920}
          height={1080}
          className="w-full h-full object-cover brightness-[0.78] contrast-[1.05]"
        />
        {/* Subtle Architectural Wood Cove Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#241A14] via-[#241A14]/40 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#241A14]/75 via-transparent to-transparent pointer-events-none" />
      </motion.div>

      {/* Top Spacer for Nav Alignment */}
      <div className="relative z-10 w-full" />

      {/* Center/Bottom: Poliform Editorial Hero Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto my-auto py-12 lg:py-16">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.12 } }
          }}
          className="max-w-3xl space-y-6"
        >
          {/* Provenance Micro-Pill & Eyebrow */}
          <motion.div 
            variants={{
              hidden: { y: 20, opacity: 0 },
              visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } }
            }}
            className="flex flex-wrap items-center gap-2.5 sm:gap-3"
          >
            <span className="font-mono text-[10px] sm:text-[11px] px-3 py-1 rounded-full bg-[#C6A75E]/20 text-[#C6A75E] border border-[#C6A75E]/30 uppercase tracking-widest font-semibold">
              KILN-DRIED IN AGRABAD, CHATTOGRAM · EST. 2020
            </span>
            <span className="font-mono text-[10px] text-[#E8DCC8]/70 uppercase tracking-widest">
              01 — SOLID BURMA TEAK
            </span>
          </motion.div>
          
          {/* Main Headline — Easy to Read, Powerful */}
          <motion.h1
            variants={{
              hidden: { y: 30, opacity: 0 },
              visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: "easeOut" } }
            }}
            className="font-display text-4xl sm:text-6xl lg:text-7xl xl:text-8xl text-[#F5EFEB] tracking-tight font-light leading-[1.05]"
          >
            Solid Burma Teak. <br />
            <span className="font-normal italic text-[#E8DCC8]">Handcrafted</span> to Last Generations.
          </motion.h1>

          {/* Conversational Subheading — Plain Words */}
          <motion.p
            variants={{
              hidden: { y: 20, opacity: 0 },
              visible: { y: 0, opacity: 1, transition: { duration: 0.7, ease: "easeOut" } }
            }}
            className="font-body text-sm sm:text-base lg:text-lg text-[#E8DCC8]/85 leading-relaxed max-w-xl font-light pt-1"
          >
            Handcrafted from 100% seasoned Burma Teak and Mahogany. Built with traditional wood joints and zero nails — dried to 8.5% moisture so wood never bends or cracks in Chattogram's coastal weather.
          </motion.p>

          {/* Primary Action Buttons */}
          <motion.div
            variants={{
              hidden: { y: 20, opacity: 0 },
              visible: { y: 0, opacity: 1, transition: { duration: 0.7, ease: "easeOut" } }
            }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4"
          >
            {/* Primary Action Button */}
            <a 
              href={getWhatsAppInquiryUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#C6A75E] hover:bg-[#E8DCC8] text-[#241A14] font-mono text-xs uppercase tracking-widest font-bold inline-flex items-center justify-center gap-2.5 py-4 px-8 rounded-full shadow-lg transition-[background-color,color,transform,box-shadow] duration-300 hover:scale-[1.02] cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 text-[#241A14]" />
              <span>Chat on WhatsApp</span>
              <span className="text-sm">↗</span>
            </a>

            {/* In Situ Room Link */}
            <a 
              href="#composition"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#composition')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center justify-center gap-2 text-[#E8DCC8] hover:text-[#C6A75E] text-xs font-mono uppercase tracking-widest py-4 px-6 rounded-full border border-[#E8DCC8]/20 hover:border-[#C6A75E] transition-[color,border-color] duration-300 backdrop-blur-sm cursor-pointer"
            >
              <span>Explore Rooms & Prices</span>
              <ArrowDown className="w-3.5 h-3.5 text-[#C6A75E]" />
            </a>
          </motion.div>

          {/* Showroom Physical Trust Cue */}
          <motion.div
            variants={{
              hidden: { y: 10, opacity: 0 },
              visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } }
            }}
            className="pt-2 text-xs font-mono text-[#E8DCC8]/60 flex items-center gap-2"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#C6A75E]" />
            <span>Visit Showroom: Agrabad Access Road (Opposite RAK Ceramics), Chattogram</span>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Poliform Architectural Suite Ticker */}
      <div className="relative z-10 w-full max-w-7xl mx-auto border-t border-[#E8DCC8]/15 pt-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-mono">
          {suites.map((suite, idx) => (
            <a
              key={suite.num}
              href={suite.href}
              className="group flex flex-col gap-1 py-2 px-1 border-l border-[#E8DCC8]/10 hover:border-[#C6A75E] transition-colors"
            >
              <span className="text-[10px] text-[#C6A75E] tracking-widest">{suite.num}</span>
              <div className="flex items-center justify-between text-[#E8DCC8]/80 group-hover:text-[#F5EFEB] transition-colors">
                <span className="tracking-wider uppercase text-[11px] font-medium">{suite.title}</span>
                <span className="text-[#C6A75E] opacity-0 group-hover:opacity-100 transition-opacity">↗</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
