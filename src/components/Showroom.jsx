import React from 'react';
import { MapPin, Clock, Navigation, Phone, CalendarCheck, ShieldCheck } from 'lucide-react';
import { COMPANY } from '../data/company';
import { getPhoneUrl, buildWhatsAppUrl } from '../utils/whatsapp';

export default function Showroom() {
  const appointmentWhatsAppUrl = buildWhatsAppUrl(
    `Hello Heaven Furniture Mart! I would like to schedule a private showroom walkthrough and consultation at your Agrabad Access Road atelier.`
  );

  return (
    <section className="py-24 sm:py-32 bg-[#1C140F] text-[#F5EFEB] relative overflow-hidden border-t border-[#C6A75E]/15" id="showroom">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-[#C6A75E]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="mb-16 space-y-3">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#C6A75E] font-semibold">
              08 / THE ATELIER
            </span>
            <span className="w-12 h-px bg-[#C6A75E]/40" />
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-[#F5EFEB] font-normal tracking-tight">
            Experience True Timber in Chattogram.
          </h2>
          <p className="text-[#F5EFEB]/70 text-base sm:text-lg max-w-2xl font-light leading-relaxed">
            Walk our Agrabad Access Road studio to inspect kiln-dried Burma Teak in natural light, test silent German soft-close mechanisms, and consult directly with master joiners.
          </p>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Interactive Map Column (7 cols) */}
          <div className="lg:col-span-7 relative min-h-[380px] lg:min-h-[480px] rounded-2xl overflow-hidden border border-[#C6A75E]/20 bg-[#241A14] shadow-2xl group">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3690.6402636277864!2d91.801815!3d22.329437!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30acd967a300a747%3A0xc4eb04cfa1086a98!2sAgrabad%20Access%20Rd%2C%20Chattogram!5e0!3m2!1sen!2sbd!4v1717698059088!5m2!1sen!2sbd"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Heaven Furniture Mart Flagship Atelier Location"
              className="w-full h-full min-h-[380px] lg:min-h-[480px] opacity-85 contrast-125 saturate-75 hover:opacity-100 transition-opacity duration-500"
            />

            {/* Floating Atelier Badge on Map */}
            <div className="absolute top-4 left-4 z-10 bg-[#241A14]/90 backdrop-blur-md px-4 py-2.5 rounded-xl border border-[#C6A75E]/30 shadow-lg flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#C6A75E] animate-ping" />
              <div>
                <p className="font-mono text-[9px] uppercase tracking-widest text-[#C6A75E] font-semibold">Flagship Showroom</p>
                <p className="font-display text-xs text-[#F5EFEB]">Agrabad Access Road</p>
              </div>
            </div>

            {/* Google Maps External Directions link */}
            <a
              href="https://maps.google.com/?q=Agrabad+Access+Road,+Chattogram"
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-4 right-4 z-10 inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#241A14]/90 hover:bg-[#C6A75E] hover:text-[#241A14] text-[#C6A75E] border border-[#C6A75E]/40 backdrop-blur-md font-mono text-xs uppercase tracking-wider font-semibold transition-all duration-300 shadow-xl"
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>Open in Google Maps</span>
            </a>
          </div>

          {/* Showroom Specs Column (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div className="space-y-6">
              {/* Address Card */}
              <div className="p-6 rounded-xl bg-[#241A14] border border-[#C6A75E]/15 hover:border-[#C6A75E]/35 transition-colors space-y-2">
                <div className="flex items-center gap-3 text-[#C6A75E]">
                  <MapPin className="w-5 h-5 shrink-0" />
                  <span className="font-mono text-xs uppercase tracking-widest font-semibold">
                    Address &amp; Landmark
                  </span>
                </div>
                <p className="font-display text-lg text-[#F5EFEB]">
                  {COMPANY.address}
                </p>
                <p className="text-xs text-[#F5EFEB]/60 font-mono">
                  Landmark: {COMPANY.landmark}
                </p>
              </div>

              {/* Hours Card */}
              <div className="p-6 rounded-xl bg-[#241A14] border border-[#C6A75E]/15 hover:border-[#C6A75E]/35 transition-colors space-y-2">
                <div className="flex items-center gap-3 text-[#C6A75E]">
                  <Clock className="w-5 h-5 shrink-0" />
                  <span className="font-mono text-xs uppercase tracking-widest font-semibold">
                    Opening Hours
                  </span>
                </div>
                <p className="font-display text-lg text-[#F5EFEB]">
                  {COMPANY.hours}
                </p>
                <p className="text-xs text-[#F5EFEB]/60 font-mono">
                  Friday: 3:00 PM – 9:30 PM (Private appointments welcomed)
                </p>
              </div>

              {/* VIP Guarantees */}
              <div className="p-4 rounded-xl bg-[#281D16] border border-[#C6A75E]/15 space-y-2">
                <div className="flex items-center gap-2 text-[#C6A75E]">
                  <ShieldCheck className="w-4 h-4" />
                  <span className="font-mono text-[11px] uppercase tracking-wider font-semibold">
                    White-Glove Showroom Experience
                  </span>
                </div>
                <p className="text-xs text-[#F5EFEB]/70 font-light leading-relaxed">
                  Dedicated interior consultant, live timber moisture meter demonstration, and 3D architectural layout preview.
                </p>
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-2 space-y-3">
              <a
                href={appointmentWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-3 py-4 px-6 rounded-lg bg-[#C6A75E] hover:bg-[#D4B975] text-[#241A14] font-mono text-xs uppercase tracking-widest font-bold shadow-[0_4px_25px_rgba(198,167,94,0.3)] transition-all"
              >
                <CalendarCheck className="w-4 h-4" />
                <span>Book VIP Private Walkthrough</span>
              </a>

              <a
                href={getPhoneUrl()}
                className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-lg border border-[#C6A75E]/30 text-[#F5EFEB] hover:border-[#C6A75E] hover:text-[#C6A75E] font-mono text-xs uppercase tracking-widest transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#C6A75E]" />
                <span>Direct Showroom Desk ({COMPANY.phoneDisplay})</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
