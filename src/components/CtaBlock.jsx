import React from 'react';
import { getWhatsAppInquiryUrl } from '../utils/whatsapp';
import { COMPANY } from '../data/company';

export default function CtaBlock() {
  return (
    <section className="bg-obsidian border-t border-gold/10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
        <h2 className="font-display text-4xl md:text-6xl text-ivory mb-6">
          Ready to Elevate Your Interior?
        </h2>
        
        <p className="text-ivory-muted text-lg md:text-xl max-w-2xl mx-auto mb-12">
          Book your free 3D design consultation or chat directly with our stylists to bring your vision to life.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <a
            href="#showroom"
            className="w-full sm:w-auto bg-gold text-obsidian px-10 py-5 text-lg font-semibold hover:bg-gold-hover transition-colors duration-300 text-center"
          >
            Schedule Flagship Visit
          </a>
          
          <a
            href={getWhatsAppInquiryUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto border-2 border-gold text-gold px-10 py-5 text-lg font-semibold hover:bg-gold/10 transition-colors duration-300 text-center"
          >
            Chat on WhatsApp Now
          </a>
        </div>
      </div>
    </section>
  );
}
