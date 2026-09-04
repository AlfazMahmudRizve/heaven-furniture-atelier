import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, ArrowRight, ShieldCheck } from 'lucide-react';
import { COMPANY } from '../data/company';
import { getWhatsAppInquiryUrl } from '../utils/whatsapp';

export default function Footer() {
  return (
    <footer id="showroom" className="bg-[#160F0A] text-[#E8DCC8] pt-24 pb-14 px-6 lg:px-14 border-t border-[#E8DCC8]/15">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Top Grand Architectural Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Brand & Provenance Statement (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-3.5">
              <span className="w-10 h-10 rounded-full border border-[#C6A75E] flex items-center justify-center font-display text-sm font-bold text-[#E8DCC8] bg-[#23180F]">
                H
              </span>
              <div>
                <h2 className="font-display text-2xl lg:text-3xl tracking-[0.25em] text-[#F5EFEB] font-bold">
                  HEAVEN
                </h2>
                <span className="text-[9px] tracking-[0.35em] text-[#C6A75E] font-mono uppercase block">
                  ATELIER · CHATTOGRAM · EST. 2020
                </span>
              </div>
            </div>

            <p className="font-body text-xs sm:text-sm text-[#E8DCC8]/80 leading-relaxed font-light max-w-sm">
              Interior architecture and generational Burma Teak furniture handcrafted in Chattogram. Zero screws, 8.5% vacuum-seasoned timber, and lifetime heirloom provenance.
            </p>

            <div className="pt-2">
              <a 
                href={getWhatsAppInquiryUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-[#C6A75E] hover:bg-[#E8DCC8] text-[#160F0A] font-mono text-xs uppercase tracking-widest font-bold transition-all shadow-md cursor-pointer"
              >
                <span>Book Atelier Consultation</span>
                <span className="text-sm">↗</span>
              </a>
            </div>
          </div>

          {/* 4 Architectural Columns (7 cols) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-8 text-xs font-mono">
            
            <div className="space-y-2.5 p-5 rounded-lg bg-[#23180F]/40 border border-[#E8DCC8]/15">
              <div className="flex items-center gap-2 text-[#C6A75E] font-semibold uppercase tracking-wider text-[10px]">
                <MapPin className="w-3.5 h-3.5" />
                <span>Flagship Showroom & Kiln</span>
              </div>
              <p className="text-[#F5EFEB] leading-relaxed">
                Agrabad Access Road,<br />
                Opposite RAK Ceramics,<br />
                Chattogram, Bangladesh
              </p>
              <span className="text-[10px] text-[#C6A75E] block pt-1">
                Complimentary Parking on Site
              </span>
            </div>

            <div className="space-y-2.5 p-5 rounded-lg bg-[#23180F]/40 border border-[#E8DCC8]/15">
              <div className="flex items-center gap-2 text-[#C6A75E] font-semibold uppercase tracking-wider text-[10px]">
                <Clock className="w-3.5 h-3.5" />
                <span>Visiting Hours</span>
              </div>
              <p className="text-[#F5EFEB] leading-relaxed">
                Saturday – Thursday<br />
                9:00 AM – 9:30 PM<br />
                <span className="text-[#C6A75E] text-[10px]">Friday: Closed for Master Joinery</span>
              </p>
            </div>

            <div className="space-y-2.5 p-5 rounded-lg bg-[#23180F]/40 border border-[#E8DCC8]/15">
              <div className="flex items-center gap-2 text-[#C6A75E] font-semibold uppercase tracking-wider text-[10px]">
                <Phone className="w-3.5 h-3.5" />
                <span>Direct Concierge Line</span>
              </div>
              <a href="tel:+8801960481983" className="text-[#F5EFEB] hover:text-[#C6A75E] transition-colors block text-sm font-bold">
                +880 1960-481983
              </a>
              <span className="text-[10px] text-[#E8DCC8]/60 block">
                Direct WhatsApp Available 24/7
              </span>
            </div>

            <div className="space-y-2.5 p-5 rounded-lg bg-[#23180F]/40 border border-[#E8DCC8]/15">
              <div className="flex items-center gap-2 text-[#C6A75E] font-semibold uppercase tracking-wider text-[10px]">
                <Mail className="w-3.5 h-3.5" />
                <span>Executive Correspondence</span>
              </div>
              <a href="mailto:heavenfurnituremart@gmail.com" className="text-[#F5EFEB] hover:text-[#C6A75E] transition-colors block truncate">
                heavenfurnituremart@gmail.com
              </a>
              <span className="text-[10px] text-[#E8DCC8]/60 block">
                3D CAD Blueprints & Invoicing
              </span>
            </div>

          </div>

        </div>

        {/* Poliform Giant Typographic Signature */}
        <div className="pt-10 border-t border-[#E8DCC8]/15 text-center">
          <span className="font-display text-4xl sm:text-7xl lg:text-8xl tracking-[0.25em] text-[#E8DCC8]/10 font-bold block select-none">
            HEAVEN ATELIER
          </span>
        </div>

        {/* Bottom Credits Bar */}
        <div className="pt-6 border-t border-[#E8DCC8]/10 flex flex-col sm:flex-row justify-between items-center text-[10px] font-mono tracking-widest text-[#E8DCC8]/50 uppercase gap-4">
          <span>© 2026 HEAVEN FURNITURE MART</span>
          <div className="flex items-center gap-6">
            <a href="/collections/living-room" className="hover:text-[#C6A75E] transition-colors">Suites</a>
            <a href="#manifesto" className="hover:text-[#C6A75E] transition-colors">Craftsmanship</a>
            <a href="#bespoke" className="hover:text-[#C6A75E] transition-colors">Bespoke</a>
            <a href="/admin" className="text-[#C6A75E] hover:underline">Store Manager CMS ↗</a>
          </div>
          <span>CHATTOGRAM, BANGLADESH</span>
        </div>

      </div>
    </footer>
  );
}
