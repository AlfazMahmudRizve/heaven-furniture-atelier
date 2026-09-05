import React from "react";

const testimonials = [
  {
    quote:
      "The grain of the dining table changes with the afternoon light \u2014 something we notice daily, three years on. Not a single joint has shifted.",
    name: "Rezaul Karim",
    detail: "Nasirabad Residence, Chattogram",
    piece: "Grand Heritage 8-Seater Dining Suite",
  },
  {
    quote:
      "We furnished the entire master floor in one commission. The hydraulic bed mechanism still operates with the same silent precision as the day it arrived.",
    name: "Dr. Farhana Rahman",
    detail: "Khulshi Hill, Chattogram",
    piece: "Imperial Platform Bed & Wardrobe Suite",
  },
  {
    quote:
      "I had one specification: no visible screws, anywhere. Heaven delivered \u2014 every joint is carved timber locking into timber. The desk is an education in joinery.",
    name: "Engr. Tanvir Ahmed",
    detail: "Agrabad, Chattogram",
    piece: "Presidential Executive Desk",
  },
];

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="bg-[#F5EFEB] py-24 lg:py-32"
      aria-label="Client Testimonials"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        {/* Section Header */}
        <div className="mb-16 lg:mb-20">
          <span className="block font-mono text-[10px] uppercase tracking-[0.35em] text-[#8F753A] font-semibold mb-4">
            07 / CLIENT VOICES
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-[#241A14] font-normal leading-tight max-w-2xl">
            Spoken by Those Who Live With Our Work.
          </h2>
        </div>

        {/* Testimonial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="bg-[#FDFAF6] border border-[#241A14]/10 border-l-2 border-l-[#C6A75E] rounded-xl p-8 flex flex-col gap-6 shadow-[0_2px_24px_rgba(36,26,20,0.07)]"
            >
              {/* Decorative gold opening quote mark */}
              <span
                className="font-display text-6xl text-[#C6A75E]/20 leading-none select-none"
                aria-hidden="true"
              >
                &ldquo;
              </span>

              {/* Quote body */}
              <blockquote className="font-display italic text-lg text-[#241A14] font-light leading-relaxed -mt-4">
                {t.quote}
              </blockquote>

              {/* Attribution */}
              <footer className="flex flex-col gap-1 mt-auto pt-4 border-t border-[#241A14]/10">
                <span className="font-mono text-[11px] uppercase tracking-widest text-[#8F753A] font-semibold">
                  {t.name}
                </span>
                <span className="font-mono text-[10px] text-[#241A14]/60">
                  {t.detail}
                </span>
                <span className="font-mono text-[9px] uppercase tracking-widest text-[#8F753A]/80 mt-1">
                  Piece: {t.piece}
                </span>
              </footer>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
