import React from 'react';
import { MapPin, Clock, Navigation } from 'lucide-react';
import { COMPANY } from '../data/company';

export default function Showroom() {
  return (
    <section className="py-24 bg-obsidian" id="showroom">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Map Side */}
          <div className="relative aspect-square md:aspect-video lg:aspect-square w-full bg-surface-elevated border border-gold/20 flex items-center justify-center overflow-hidden">
             <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3690.6402636277864!2d91.801815!3d22.329437!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30acd967a300a747%3A0xc4eb04cfa1086a98!2sAgrabad%20Access%20Rd%2C%20Chattogram!5e0!3m2!1sen!2sbd!4v1717698059088!5m2!1sen!2sbd" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Heaven Furniture Mart Location"
                className="opacity-80 grayscale contrast-125"
             ></iframe>
          </div>

          {/* Info Side */}
          <div className="flex flex-col justify-center">
            <span className="text-xs tracking-[0.3em] text-gold uppercase mb-3">Flagship Showroom</span>
            <h2 className="font-display text-4xl text-ivory mb-10">Experience True Craftsmanship</h2>

            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <MapPin className="text-gold w-6 h-6 shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-semibold text-ivory mb-1">Address</h3>
                  <p className="text-ivory-muted">{COMPANY?.address}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Navigation className="text-gold w-6 h-6 shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-semibold text-ivory mb-1">Landmark</h3>
                  <p className="text-ivory-muted">{COMPANY?.landmark}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Clock className="text-gold w-6 h-6 shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-semibold text-ivory mb-1">Opening Hours</h3>
                  <p className="text-ivory-muted">{COMPANY?.hours}</p>
                </div>
              </div>
            </div>

            <a
              href="https://maps.google.com/?q=Agrabad+Access+Road,+Chattogram"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-10 inline-flex items-center justify-center px-8 py-4 border-2 border-gold text-gold hover:bg-gold hover:text-obsidian transition-colors duration-300 font-medium text-sm tracking-wide"
            >
              Get Directions
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
