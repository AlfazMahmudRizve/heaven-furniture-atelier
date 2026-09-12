import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, ArrowRight, ShieldCheck, MessageCircle } from 'lucide-react';
import { COMPANY } from '../data/company';
import { getWhatsAppInquiryUrl } from '../utils/whatsapp';

export default function Footer() {
  return (
    <footer id="showroom" className="bg-[#241A14] text-[#E8DCC8] pt-24 pb-14 px-6 lg:px-14 border-t border-[#E8DCC8]/15">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Top Grand Architectural Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Brand & Provenance Statement (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-3.5">
              <span className="w-10 h-10 rounded-full border border-[#C6A75E] flex items-center justify-center font-display text-sm font-bold text-[#E8DCC8] bg-[#30231B]">
                H
              </span>
              <div>
                <p className="font-display text-2xl lg:text-3xl tracking-[0.25em] text-[#F5EFEB] font-bold">
                  HAVEN
                </p>
                <span className="text-[9px] tracking-[0.35em] text-[#C6A75E] font-mono uppercase block">
                  ATELIER · ARCHITECTURAL INTERIORS
                </span>
              </div>
            </div>

            <p className="font-body text-xs sm:text-sm text-[#E8DCC8]/80 leading-relaxed font-light max-w-sm">
              Architectural luxury interiors and bespoke hardwood joinery. A turnkey digital flagship and back-office management system engineered for high-end design studios.
            </p>

            <div className="pt-2 flex flex-wrap gap-3">
              <a 
                href={getWhatsAppInquiryUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-[#C6A75E] hover:bg-[#E8DCC8] text-[#241A14] font-mono text-xs uppercase tracking-widest font-bold transition-colors duration-300 shadow-md cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 text-[#241A14]" />
                <span>Concierge Desk</span>
                <span className="text-sm">↗</span>
              </a>
              <a 
                href="/admin/login"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-[#C6A75E]/40 hover:border-[#C6A75E] text-[#E8DCC8] hover:text-[#C6A75E] font-mono text-xs uppercase tracking-widest transition-colors duration-300"
              >
                <span>CMS Demo</span>
              </a>
            </div>
          </div>

          {/* 4 Architectural Columns (7 cols) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-8 text-xs font-mono">
            
            <div className="space-y-2.5 p-5 rounded-lg bg-[#30231B]/40 border border-[#E8DCC8]/15">
              <div className="flex items-center gap-2 text-[#C6A75E] font-semibold uppercase tracking-wider text-[10px]">
                <MapPin className="w-3.5 h-3.5" />
                <span>Atelier Studio & Workshop</span>
              </div>
              <p className="text-[#F5EFEB] leading-relaxed">
                Design District Pavilion,<br />
                Material Lab & Workshop,<br />
                Available Worldwide
              </p>
              <span className="text-[10px] text-[#C6A75E] block pt-1">
                Private Walkthroughs by Appointment
              </span>
            </div>

            <div className="space-y-2.5 p-5 rounded-lg bg-[#30231B]/40 border border-[#E8DCC8]/15">
              <div className="flex items-center gap-2 text-[#C6A75E] font-semibold uppercase tracking-wider text-[10px]">
                <Clock className="w-3.5 h-3.5" />
                <span>Visiting Hours</span>
              </div>
              <p className="text-[#F5EFEB] leading-relaxed">
                Monday – Saturday<br />
                10:00 AM – 8:00 PM<br />
                <span className="text-[#C6A75E] text-[10px]">Sunday: By Special Appointment</span>
              </p>
            </div>

            <div className="space-y-2.5 p-5 rounded-lg bg-[#30231B]/40 border border-[#E8DCC8]/15">
              <div className="flex items-center gap-2 text-[#C6A75E] font-semibold uppercase tracking-wider text-[10px]">
                <Phone className="w-3.5 h-3.5" />
                <span>Direct Studio Concierge</span>
              </div>
              <a href={`tel:${COMPANY.phone}`} className="text-[#F5EFEB] hover:text-[#C6A75E] transition-colors block text-sm font-bold">
                {COMPANY.phoneDisplay}
              </a>
              <span className="text-[10px] text-[#E8DCC8]/60 block">
                Instant WhatsApp Inquiry Available
              </span>
            </div>

            <div className="space-y-2.5 p-5 rounded-lg bg-[#30231B]/40 border border-[#E8DCC8]/15">
              <div className="flex items-center gap-2 text-[#C6A75E] font-semibold uppercase tracking-wider text-[10px]">
                <Mail className="w-3.5 h-3.5" />
                <span>Studio Inquiries</span>
              </div>
              <a href={`mailto:${COMPANY.email}`} className="text-[#F5EFEB] hover:text-[#C6A75E] transition-colors block truncate">
                {COMPANY.email}
              </a>
              <span className="text-[10px] text-[#E8DCC8]/60 block">
                Commissions & Platform Inquiries
              </span>
            </div>

          </div>

        </div>

        {/* Poliform Giant Typographic Signature */}
        <div className="pt-10 border-t border-[#E8DCC8]/15 text-center">
          <span className="font-display text-3xl sm:text-6xl lg:text-7xl tracking-[0.18em] text-[#E8DCC8]/10 font-bold block select-none">
            HAVEN ATELIER
          </span>
        </div>

        {/* Bottom Credits Bar */}
        <div className="pt-6 border-t border-[#E8DCC8]/10 flex flex-col sm:flex-row justify-between items-center text-[10px] font-mono tracking-widest text-[#E8DCC8]/50 uppercase gap-4 text-center sm:text-left">
          <span>© 2026 HAVEN ATELIER · ALL RIGHTS RESERVED</span>
          <div className="flex items-center gap-6">
            <a href="/collections/living-room" className="hover:text-[#C6A75E] transition-colors">Suites</a>
            <a href="#platform-acquisition" className="hover:text-[#C6A75E] transition-colors font-semibold text-[#C6A75E]">Platform</a>
            <a href="/admin/login" className="hover:text-[#C6A75E] transition-colors">CMS</a>
          </div>
          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-2 sm:gap-3">
            <span>TURNKEY INTERIOR COMMERCE PLATFORM</span>
            <span>·</span>
            <span>
              Engineered by{' '}
              <a 
                href="https://whoisalfaz.me" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-[#C6A75E] hover:text-[#E8DCC8] underline underline-offset-2 transition-colors font-semibold lowercase"
              >
                whoisalfaz.me
              </a>
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}
