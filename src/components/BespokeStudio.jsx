import React, { useState } from 'react';
import { Sofa, Bed, Utensils, Briefcase, Phone, MessageSquare, Check, Sparkles, ShoppingBag } from 'lucide-react';
import { ROOM_TYPES, TIMBER_OPTIONS, FABRIC_OPTIONS } from '../data/collections';
import { buildBespokeWhatsAppUrl } from '../utils/whatsapp';
import { supabase } from '../lib/supabase';
import { useCart } from '../context/CartContext';
import TimberLensModal from './TimberLensModal';

const ROOM_ICONS = {
  living: Sofa,
  bedroom: Bed,
  dining: Utensils,
  office: Briefcase
};

export default function BespokeStudio() {
  const { addItem } = useCart();
  const [isTimberLensOpen, setIsTimberLensOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState('living');
  const [selectedTimber, setSelectedTimber] = useState('burma-teak');
  const [selectedFabric, setSelectedFabric] = useState('velvet');
  const [width, setWidth] = useState(8);
  const [depth, setDepth] = useState(6);

  const getRoomName = (id) => {
    const r = ROOM_TYPES.find(item => item.id === id);
    return r?.label || r?.name || id;
  };
  const getTimberName = (id) => {
    const t = TIMBER_OPTIONS.find(item => item.id === id);
    return t?.label || t?.name || id;
  };
  const getFabricName = (id) => {
    const f = FABRIC_OPTIONS.find(item => item.id === id);
    return f?.label || f?.name || id;
  };

  const currentConfig = {
    room: getRoomName(selectedRoom),
    timber: getTimberName(selectedTimber),
    fabric: getFabricName(selectedFabric),
    width,
    depth
  };

  return (
    <section id="bespoke" className="relative bg-[#241A14] py-24 lg:py-32 px-6 lg:px-14 border-t border-[#E8DCC8]/15">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Editorial Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-8 border-b border-[#E8DCC8]/15">
          <div className="max-w-2xl space-y-3">
            <div className="flex items-center gap-3">
              <span className="font-mono text-[11px] text-[#C6A75E] uppercase tracking-[0.35em] block font-semibold">
                06 / BESPOKE STUDIO · CUSTOM FURNITURE
              </span>
              <span className="font-mono text-[9px] px-2.5 py-0.5 rounded-full bg-[#C6A75E]/20 text-[#C6A75E] uppercase tracking-wider font-bold">
                Custom Orders
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl text-[#F5EFEB] tracking-tight font-light leading-tight">
              Design Your Own Piece · <br />
              <span className="italic font-normal text-[#E8DCC8]">Custom Made to Your Size.</span>
            </h2>
          </div>

          <p className="font-body text-sm sm:text-base text-[#E8DCC8]/80 max-w-md font-light leading-relaxed">
            Choose your preferred wood, fabric, and room dimensions. We can visit your home in Chattogram or Dhaka with real wood samples and take exact measurements.
          </p>
        </div>

        {/* Poliform Asymmetric Studio Configurator */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left: Interactive Configurator Controls (7 cols) */}
          <div className="lg:col-span-7 space-y-10">
            
            {/* Step 1: Architectural Collection */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-mono text-[#C6A75E] uppercase tracking-[0.25em] font-semibold">
                  01 · Select Space Collection
                </span>
                <div className="h-px flex-1 bg-[#E8DCC8]/10" />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {ROOM_TYPES.map(room => {
                  const Icon = ROOM_ICONS[room.id] || Sofa;
                  const isSelected = selectedRoom === room.id;
                  const displayName = room.label || room.name;

                  return (
                    <button
                      key={room.id}
                      type="button"
                      onClick={() => setSelectedRoom(room.id)}
                      className={`flex flex-col items-center justify-center p-4 rounded-lg border transition-[background-color,border-color,color,box-shadow] duration-300 cursor-pointer ${
                        isSelected 
                          ? 'bg-[#C6A75E] text-[#241A14] border-[#C6A75E] font-bold shadow-md' 
                          : 'bg-[#30231B]/40 border-[#E8DCC8]/15 text-[#E8DCC8] hover:border-[#C6A75E]'
                      }`}
                    >
                      <Icon className="w-5 h-5 mb-2" />
                      <span className="text-xs font-mono">{displayName}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Timber Heartwood */}
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-mono text-[#C6A75E] uppercase tracking-[0.25em] font-semibold">
                    02 · Timber Heartwood Selection
                  </span>
                  <div className="h-px w-12 bg-[#E8DCC8]/10 hidden sm:block" />
                </div>
                <button
                  type="button"
                  onClick={() => setIsTimberLensOpen(true)}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#C6A75E]/30 bg-[#C6A75E]/10 hover:bg-[#C6A75E] text-[#C6A75E] hover:text-[#241A14] font-mono text-[10px] tracking-wider uppercase transition-colors cursor-pointer"
                >
                  <Sparkles className="w-3 h-3" />
                  <span>Inspect Grain &amp; Luster Lens</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {TIMBER_OPTIONS.map(timber => {
                  const isSelected = selectedTimber === timber.id;
                  const displayName = timber.label || timber.name;

                  return (
                    <button
                      key={timber.id}
                      type="button"
                      onClick={() => setSelectedTimber(timber.id)}
                      className={`p-4 rounded-lg text-left border transition-[background-color,border-color,color,box-shadow] duration-300 cursor-pointer ${
                        isSelected
                          ? 'bg-[#30231B] border-2 border-[#C6A75E] text-[#F5EFEB] shadow-md'
                          : 'bg-[#30231B]/30 border border-[#E8DCC8]/15 text-[#E8DCC8]/80 hover:border-[#C6A75E]'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="font-display text-sm font-semibold text-[#F5EFEB]">{displayName}</span>
                        {isSelected ? (
                          <span className="w-2 h-2 rounded-full bg-[#C6A75E]"></span>
                        ) : (
                          <span className="text-[10px] font-mono text-[#E8DCC8]/40">Select</span>
                        )}
                      </div>
                      <span className="text-[10px] font-mono text-[#C6A75E] block">
                        8.5% Kiln Seasoned · Coastal Stable
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Dimensions Slider */}
            <div className="space-y-4 p-6 rounded-lg bg-[#30231B]/30 border border-[#E8DCC8]/15">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-[#C6A75E] uppercase tracking-[0.25em] font-semibold">
                  03 · Room Footprint (Feet)
                </span>
                <span className="text-[10px] font-mono text-[#E8DCC8]/60">Adjustable to 0.5 ft</span>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 font-mono text-xs pt-2">
                <div className="space-y-2">
                  <div className="flex justify-between text-[#E8DCC8]">
                    <span>Width:</span>
                    <strong className="text-[#C6A75E] text-sm">{width} ft</strong>
                  </div>
                  <input 
                    type="range" 
                    min="4" max="16" step="0.5"
                    value={width}
                    onChange={(e) => setWidth(Number(e.target.value))}
                    className="w-full accent-[#C6A75E] h-1 bg-[#241A14] rounded-lg appearance-none cursor-ew-resize"
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-[#E8DCC8]">
                    <span>Depth:</span>
                    <strong className="text-[#C6A75E] text-sm">{depth} ft</strong>
                  </div>
                  <input 
                    type="range" 
                    min="3" max="12" step="0.5"
                    value={depth}
                    onChange={(e) => setDepth(Number(e.target.value))}
                    className="w-full accent-[#C6A75E] h-1 bg-[#241A14] rounded-lg appearance-none cursor-ew-resize"
                  />
                </div>
              </div>
            </div>

          </div>

          {/* Right: Architectural Commission Receipt (5 cols) */}
          <div className="lg:col-span-5">
            <div className="bg-[#30231B]/60 border border-[#C6A75E]/30 rounded-lg p-6 sm:p-8 space-y-6 shadow-xl">
              <div>
                <span className="text-[10px] font-mono text-[#C6A75E] uppercase tracking-widest block font-semibold">
                  ARCHITECTURAL COMMISSION TICKET
                </span>
                <h3 className="text-xl sm:text-2xl font-display text-[#F5EFEB] font-normal mt-1">
                  Bespoke Blueprint Spec
                </h3>
              </div>

              {/* Specification Table */}
              <div className="divide-y divide-[#E8DCC8]/15 border-t border-b border-[#E8DCC8]/15 py-3 text-xs font-mono space-y-0">
                <div className="py-2.5 flex justify-between items-center">
                  <span className="text-[#E8DCC8]/60">Suite Category:</span>
                  <span className="text-[#F5EFEB] font-semibold">{currentConfig.room}</span>
                </div>
                <div className="py-2.5 flex justify-between items-center">
                  <span className="text-[#E8DCC8]/60">Timber Heartwood:</span>
                  <span className="text-[#C6A75E] font-semibold">{currentConfig.timber}</span>
                </div>
                <div className="py-2.5 flex justify-between items-center">
                  <span className="text-[#E8DCC8]/60">Size / Dimensions:</span>
                  <span className="text-[#F5EFEB] font-semibold">{width}' W × {depth}' D</span>
                </div>
                <div className="py-2.5 flex justify-between items-center">
                  <span className="text-[#E8DCC8]/60">Wood Moisture Level:</span>
                  <span className="text-[#F5EFEB] font-semibold">8.5% Seasoned (Weatherproof)</span>
                </div>
                <div className="py-2.5 flex justify-between items-center">
                  <span className="text-[#E8DCC8]/60">Joinery Standard:</span>
                  <span className="text-emerald-400 font-semibold">Real Wood Joints (0% Nails)</span>
                </div>
              </div>

              {/* Complimentary Service Banner */}
              <div className="p-4 bg-[#241A14] rounded border border-[#E8DCC8]/15 text-[11px] font-mono text-[#E8DCC8]/80 space-y-1">
                <div className="flex items-center gap-1.5 text-[#C6A75E] font-bold">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>What's Included Free:</span>
                </div>
                <p className="leading-relaxed text-[#E8DCC8]/70">
                  Free home visit & measurement + 3D room preview + lifetime wood warranty certificate.
                </p>
              </div>

              {/* Actions */}
              <div className="space-y-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    addItem({
                      id: `bespoke-${selectedRoom}-${selectedTimber}-${Date.now()}`,
                      title: `Bespoke ${currentConfig.room} Commission`,
                      category: 'Custom Atelier Blueprint',
                      wood: currentConfig.timber,
                      finish: currentConfig.fabric,
                      dimensions: `${width}' W × ${depth}' D`,
                      priceDisplay: 'Valuation on Blueprint',
                      image: '/images/hero-craftsmanship.jpg',
                    });
                  }}
                  className="flex items-center justify-center gap-2 border border-[#C6A75E] text-[#C6A75E] hover:bg-[#C6A75E] hover:text-[#241A14] w-full py-3.5 rounded-full text-xs font-mono uppercase tracking-widest font-semibold transition-colors duration-300 shadow-sm cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add Spec to Consultation Tray</span>
                </button>

                <a 
                  href={buildBespokeWhatsAppUrl(currentConfig)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    try {
                      supabase.from('bespoke_inquiries').insert([
                        {
                          room_type: currentConfig.room,
                          timber_choice: currentConfig.timber,
                          fabric_choice: currentConfig.fabric,
                          dimensions: `${width}' W × ${depth}' D`,
                          status: 'new',
                          source: 'website_configurator',
                        },
                      ]).then(() => {});
                    } catch (err) {
                      console.warn('[BespokeStudio] Lead log error:', err);
                    }
                  }}
                  className="flex items-center justify-center gap-2 bg-[#C6A75E] hover:bg-[#E8DCC8] text-[#241A14] w-full py-4 rounded-full text-xs font-mono uppercase tracking-widest font-bold transition-colors duration-300 shadow-md cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4 text-[#241A14]" />
                  <span>Send This Spec to WhatsApp</span>
                  <span>↗</span>
                </a>

                <a 
                  href="tel:+8801960481983"
                  className="flex items-center justify-center gap-2 text-xs font-mono text-[#E8DCC8]/70 hover:text-[#C6A75E] transition-colors py-2 text-center"
                >
                  <Phone className="w-3.5 h-3.5 text-[#C6A75E]" />
                  <span>Or Call Direct Atelier: +880 1960-481983</span>
                </a>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Interactive Timber Grain & Luster Lens Modal */}
      <TimberLensModal
        isOpen={isTimberLensOpen}
        onClose={() => setIsTimberLensOpen(false)}
      />
    </section>
  );
}
