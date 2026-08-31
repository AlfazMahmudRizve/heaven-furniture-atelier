import React, { useState } from 'react';
import { Sofa, Bed, Utensils, Briefcase, Phone, MessageSquare } from 'lucide-react';
import { ROOM_TYPES, TIMBER_OPTIONS, FABRIC_OPTIONS } from '../data/collections';
import { buildBespokeWhatsAppUrl } from '../utils/whatsapp';
import { supabase } from '../lib/supabase';

const ROOM_ICONS = {
  living: Sofa,
  bedroom: Bed,
  dining: Utensils,
  office: Briefcase
};

export default function BespokeStudio() {
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
    <section id="bespoke" className="bg-obsidian py-24 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 text-center md:text-left">
          <span className="text-xs tracking-[0.3em] text-gold uppercase">Bespoke Studio</span>
          <h2 className="mt-4 font-display text-4xl text-ivory">Design Your Own Piece</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
          
          {/* Left Side - Configurator */}
          <div className="space-y-12">
            
            {/* Step 1: Room */}
            <div>
              <h3 className="text-sm font-semibold text-ivory-muted uppercase tracking-wider mb-4">1. Select Room</h3>
              <div className="grid grid-cols-2 gap-4">
                {ROOM_TYPES.map(room => {
                  const Icon = ROOM_ICONS[room.id] || Sofa;
                  const isSelected = selectedRoom === room.id;
                  const displayName = room.label || room.name;
                  return (
                    <button
                      key={room.id}
                      onClick={() => setSelectedRoom(room.id)}
                      className={`flex flex-col items-center justify-center p-6 rounded-xl border transition-all duration-300 ${
                        isSelected 
                          ? 'bg-gold text-obsidian border-gold' 
                          : 'bg-surface border-gold/20 text-ivory hover:border-gold/50'
                      }`}
                    >
                      <Icon className="w-8 h-8 mb-3" />
                      <span className="font-semibold">{displayName}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Timber */}
            <div>
              <h3 className="text-sm font-semibold text-ivory-muted uppercase tracking-wider mb-4">2. Select Timber</h3>
              <div className="grid grid-cols-2 gap-4">
                {TIMBER_OPTIONS.map(timber => {
                  const isSelected = selectedTimber === timber.id;
                  const displayName = timber.label || timber.name;
                  return (
                    <label 
                      key={timber.id}
                      className={`flex items-center gap-4 p-4 rounded-xl cursor-pointer border transition-all duration-300 bg-surface ${
                        isSelected ? 'border-gold ring-2 ring-gold' : 'border-gold/20 hover:border-gold/50'
                      }`}
                    >
                      <input 
                        type="radio" 
                        name="timber" 
                        value={timber.id}
                        checked={isSelected}
                        onChange={(e) => setSelectedTimber(e.target.value)}
                        className="hidden"
                      />
                      <div 
                        className="w-8 h-8 rounded-full border-2 border-surface shrink-0 shadow-sm"
                        style={{ backgroundColor: timber.color || '#8B5A2B' }}
                      />
                      <div className="flex flex-col">
                        <span className="text-ivory font-semibold text-sm">{displayName}</span>
                        <span className="text-xs text-gold">{timber.grade}</span>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Fabric */}
            <div>
              <h3 className="text-sm font-semibold text-ivory-muted uppercase tracking-wider mb-4">3. Select Fabric</h3>
              <select
                value={selectedFabric}
                onChange={(e) => setSelectedFabric(e.target.value)}
                className="w-full bg-surface border border-gold/20 text-ivory rounded-xl p-4 appearance-none focus:outline-none focus:border-gold transition-colors duration-300"
              >
                {FABRIC_OPTIONS.map(fabric => (
                  <option key={fabric.id} value={fabric.id}>{fabric.label || fabric.name}</option>
                ))}
              </select>
            </div>

            {/* Step 4: Dimensions */}
            <div>
              <h3 className="text-sm font-semibold text-ivory-muted uppercase tracking-wider mb-6">4. Dimensions (ft)</h3>
              
              <div className="space-y-8">
                <div>
                  <div className="flex justify-between text-ivory mb-2">
                    <label>Width</label>
                    <span>{width} ft</span>
                  </div>
                  <input 
                    type="range" 
                    min="4" max="16" step="0.5"
                    value={width}
                    onChange={(e) => setWidth(Number(e.target.value))}
                    className="w-full accent-gold h-1 bg-surface rounded-lg appearance-none cursor-pointer"
                  />
                </div>
                
                <div>
                  <div className="flex justify-between text-ivory mb-2">
                    <label>Depth</label>
                    <span>{depth} ft</span>
                  </div>
                  <input 
                    type="range" 
                    min="3" max="12" step="0.5"
                    value={depth}
                    onChange={(e) => setDepth(Number(e.target.value))}
                    className="w-full accent-gold h-1 bg-surface rounded-lg appearance-none cursor-pointer"
                  />
                </div>
              </div>
            </div>

          </div>

          {/* Right Side - Summary Card */}
          <div className="lg:mt-8">
            <div className="bg-[#121E21] border border-gold/20 rounded-2xl p-8 sticky top-24">
              <h3 className="text-xl font-display text-gold mb-6 border-b border-gold/10 pb-4">Your Bespoke Specification</h3>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between">
                  <span className="text-ivory-muted">Collection</span>
                  <span className="text-ivory font-semibold">{currentConfig.room}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-ivory-muted">Primary Material</span>
                  <span className="text-ivory font-semibold">{currentConfig.timber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-ivory-muted">Upholstery</span>
                  <span className="text-ivory font-semibold">{currentConfig.fabric}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-ivory-muted">Dimensions</span>
                  <span className="text-ivory font-semibold">{width}' W × {depth}' D</span>
                </div>
              </div>

              <div className="bg-obsidian rounded-lg p-4 mb-8 border border-gold/10">
                <p className="text-sm text-ivory-muted text-center leading-relaxed">
                  Includes: Free In-Home Measurement + 3D Render + Lifetime Structural Warranty
                </p>
              </div>

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
                className="flex items-center justify-center gap-2 bg-gold text-obsidian w-full py-4 rounded-xl text-lg font-semibold hover:bg-[#D4BA96] transition-colors duration-300 mb-4"
              >
                <MessageSquare className="w-5 h-5" />
                Send This Spec to WhatsApp
              </a>

              <a 
                href="tel:+8801960481983"
                className="flex items-center justify-center gap-2 text-ivory-muted hover:text-gold transition-colors duration-300"
              >
                <Phone className="w-4 h-4" />
                Or Call: +880 1960-481983
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
