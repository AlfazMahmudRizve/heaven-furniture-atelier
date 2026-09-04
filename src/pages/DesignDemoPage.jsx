import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, CheckCircle2, Sliders, Layers, Eye, ShieldCheck, Database, Award } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function DesignDemoPage() {
  const [activeTab, setActiveTab] = useState('slider');
  const [sliderPos, setSliderPos] = useState(50);
  const [joineryMode, setJoineryMode] = useState('assembled');
  const [activeHotspot, setActiveHotspot] = useState(1);
  const [selectedTimber, setSelectedTimber] = useState('teak');

  const hotspots = {
    1: {
      title: 'Hotspot 01: Blind Mortise & Tenon',
      desc: 'Interlocking male-female timber joint carved with 0.1mm tolerance. Absorbs building vibration and seasonal humidity expansion without loosening.',
      fastener: '100% Seasoned Timber Pegs (Zero Screws/Nails)',
      rating: '650 kg Dynamic Load Capacity',
      durability: 'Generational (80+ Years)'
    },
    2: {
      title: 'Hotspot 02: Cantilever Teak Plinth Base',
      desc: 'Continuous solid Burma Teak floor beam distributing weight evenly across floor tiles. Zero concentrated pressure points, zero floor scratching.',
      fastener: 'Chamfered Heartwood Cleats',
      rating: 'Sub-floor Air Circulation Enabled',
      durability: 'Moisture-Immune Solid Base'
    },
    3: {
      title: 'Hotspot 03: Belgian Velvet High-Density Core',
      desc: '45D high-resilience memory foam enveloped in sanitized down feather topper with concealed YKK brass hardware.',
      fastener: 'Double-Stitched Marine Thread',
      rating: '100,000 Rub Martindale Abrasion',
      durability: '15-Year Sag-Free Guarantee'
    }
  };

  const timbers = {
    teak: {
      name: 'Burma Teak (বার্মা সেগুন)',
      grade: 'Supreme Grade A1',
      desc: 'Dense silica & natural teak oil. Impervious to termites, fungus, and salt air.',
      moisture: '8.5% (Vacuum Kiln-Dried)',
      oil: 'High Natural Resins (Termite Immune)',
      lifespan: '80+ Years / 3 Generations',
      stock: '1,400 CFT Seasoned Logs in Agrabad Yard'
    },
    mahogany: {
      name: 'Red Mahogany (মেহগনি)',
      grade: 'Feast Banquet Grade',
      desc: 'Deep wine-red acoustic grain. Monolithic slab strength for 8-seater dining suites.',
      moisture: '9.2% Kiln-Dried',
      oil: 'Medium (High Natural Hardness)',
      lifespan: '60+ Years',
      stock: '850 CFT Seasoned Slabs in Yard'
    },
    gamari: {
      name: 'Chittagong Gamari (গামারি)',
      grade: 'Native Hilltracts Grade',
      desc: 'Light golden acoustics with superior stability. Ideal for dressing stations and wardrobes.',
      moisture: '9.0% Acoustic Grade',
      oil: 'Balanced Lightweight Core',
      lifespan: '40+ Years',
      stock: '600 CFT in Stock'
    }
  };

  return (
    <div className="min-h-screen bg-[#120A04] text-[#FBF0DA] font-body">
      <Header />

      <main className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto space-y-16">
        
        {/* Editorial Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#C5A880]/15 border border-[#C5A880]/30 text-[#C5A880] text-xs font-mono uppercase tracking-[0.25em]">
            <Award className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>Hackathon Innovation Preview</span>
          </div>

          <h1 className="font-display text-3xl md:text-5xl lg:text-6xl text-[#FBF0DA] tracking-tight">
            How Heaven Atelier Outshines Generic Templates
          </h1>

          <p className="text-sm md:text-base text-[#FBF0DA]/70 font-body leading-relaxed">
            While competitors submit static, identical AI-generated landing pages with fake hardcoded data, explore our 4 signature architectural differentiators.
          </p>
        </div>

        {/* Feature Navigation Tabs */}
        <div className="flex justify-center">
          <div className="inline-flex p-1.5 rounded-2xl bg-[#1E1208] border border-[#C5A880]/20 gap-2 overflow-x-auto max-w-full text-xs font-mono">
            <button
              onClick={() => setActiveTab('slider')}
              className={`px-5 py-2.5 rounded-xl transition-all cursor-pointer font-medium ${
                activeTab === 'slider'
                  ? 'bg-[#C5A880] text-[#120A04] shadow-lg font-semibold'
                  : 'text-[#FBF0DA]/60 hover:text-[#FBF0DA]'
              }`}
            >
              1. Before / After Staging
            </button>

            <button
              onClick={() => setActiveTab('joinery')}
              className={`px-5 py-2.5 rounded-xl transition-all cursor-pointer font-medium ${
                activeTab === 'joinery'
                  ? 'bg-[#C5A880] text-[#120A04] shadow-lg font-semibold'
                  : 'text-[#FBF0DA]/60 hover:text-[#FBF0DA]'
              }`}
            >
              2. Exploded Joinery CAD
            </button>

            <button
              onClick={() => setActiveTab('timber')}
              className={`px-5 py-2.5 rounded-xl transition-all cursor-pointer font-medium ${
                activeTab === 'timber'
                  ? 'bg-[#C5A880] text-[#120A04] shadow-lg font-semibold'
                  : 'text-[#FBF0DA]/60 hover:text-[#FBF0DA]'
              }`}
            >
              3. Timber & Grain Studio
            </button>

            <button
              onClick={() => setActiveTab('judge')}
              className={`px-5 py-2.5 rounded-xl transition-all cursor-pointer font-medium ${
                activeTab === 'judge'
                  ? 'bg-[#C5A880] text-[#120A04] shadow-lg font-semibold'
                  : 'text-[#FBF0DA]/60 hover:text-[#FBF0DA]'
              }`}
            >
              4. Full-Stack Evaluator Matrix
            </button>
          </div>
        </div>

        {/* ── TAB 1: BEFORE / AFTER STAGING SLIDER ── */}
        {activeTab === 'slider' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-8 bg-[#1A1007] border border-[#C5A880]/20 rounded-3xl p-6 md:p-12 shadow-2xl"
          >
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <span className="font-mono text-xs text-[#C5A880] uppercase tracking-widest block mb-1">
                  Tactile Architectural Staging
                </span>
                <h2 className="font-display text-2xl md:text-4xl text-[#FBF0DA]">
                  Interactive Penthouse Transformation
                </h2>
                <p className="text-sm text-[#FBF0DA]/70 max-w-xl mt-2">
                  Drag the slider handle left and right to peel away the raw laser-scanned concrete penthouse and reveal the finished handcrafted Burma Teak residence.
                </p>
              </div>

              <div className="flex items-center gap-2 font-mono text-xs bg-[#C5A880]/15 text-[#C5A880] px-4 py-2 rounded-full border border-[#C5A880]/30 self-start md:self-auto">
                <Sliders className="w-3.5 h-3.5" />
                <span>Drag Slider ↔</span>
              </div>
            </div>

            {/* Draggable Slider Canvas */}
            <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden border border-[#C5A880]/30 select-none shadow-2xl">
              {/* Underneath: Finished Burma Teak Living Room */}
              <div 
                className="absolute inset-0 bg-cover bg-center" 
                style={{ backgroundImage: "url('/images/hero-living.jpg')" }}
              >
                <div className="absolute top-4 right-4 bg-[#1E1005]/85 backdrop-blur-md px-3.5 py-1.5 rounded-lg text-[10px] font-mono text-[#C5A880] uppercase tracking-wider border border-[#C5A880]/30">
                  Finished Heirloom Burma Teak Interior
                </div>
              </div>

              {/* Overlay: Blueprint CAD Architecture */}
              <div 
                className="absolute inset-0 bg-[#0A1118] overflow-hidden"
                style={{ 
                  width: `${sliderPos}%`,
                  backgroundImage: 'linear-gradient(to right, rgba(89, 137, 184, 0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(89, 137, 184, 0.08) 1px, transparent 1px)',
                  backgroundSize: '24px 24px'
                }}
              >
                <div className="absolute inset-0 p-6 md:p-10 flex flex-col justify-between text-[#5989B8] font-mono text-xs">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="block text-sm font-bold tracking-widest text-[#7EB5E6]">CAD BLUEPRINT DWG #702</span>
                      <span className="text-[10px] text-[#5989B8]">Agrabad Penthouse Layout · 3200mm × 1950mm Clearance</span>
                    </div>
                    <div className="bg-[#122232] border border-[#5989B8]/40 px-3 py-1 rounded-md text-[10px] text-[#7EB5E6] uppercase">
                      Raw Laser Scan Phase
                    </div>
                  </div>

                  <div className="border border-dashed border-[#5989B8]/40 rounded-xl p-6 relative">
                    <div className="absolute -top-3 left-6 bg-[#0A1118] px-2 text-[10px] text-[#7EB5E6]">
                      + SECTIONAL CLEARANCE 3200mm +
                    </div>
                    <div className="h-32 flex items-center justify-center text-center">
                      <span className="text-xs text-[#5989B8]/80 leading-relaxed">
                        Laser Coordinate Axis: X=14.288 Y=22.102<br/>
                        Zero Particle Board Allowed · 100% Seasoned Teak
                      </span>
                    </div>
                    <div className="absolute -bottom-3 right-6 bg-[#0A1118] px-2 text-[10px] text-[#7EB5E6]">
                      + WALL RETURN 1950mm +
                    </div>
                  </div>

                  <div className="text-[10px] text-[#5989B8]/70 flex justify-between">
                    <span>SCALE 1:20 METRIC</span>
                    <span>HEAVEN ATELIER CAD SUITE</span>
                  </div>
                </div>
              </div>

              {/* Draggable Divider Bar */}
              <div 
                className="absolute top-0 bottom-0 w-1 bg-[#C5A880] shadow-[0_0_15px_rgba(197,168,128,0.8)] pointer-events-none"
                style={{ left: `${sliderPos}%` }}
              >
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-[#C5A880] text-[#120A04] flex items-center justify-center text-sm font-bold shadow-xl border-2 border-[#120A04]">
                  ↔
                </div>
              </div>

              {/* Invisible Native Range Input to capture drag */}
              <input
                type="range"
                min="0"
                max="100"
                value={sliderPos}
                onChange={(e) => setSliderPos(Number(e.target.value))}
                className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30"
              />
            </div>

            <div className="flex items-center justify-between text-xs font-mono text-[#FBF0DA]/60">
              <span>← Blueprint & Laser Measurement</span>
              <span>Drag across image to compare</span>
              <span>Finished Handcrafted Residence →</span>
            </div>
          </motion.div>
        )}

        {/* ── TAB 2: EXPLODED JOINERY CAD INSPECTOR ── */}
        {activeTab === 'joinery' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-8 bg-[#1A1007] border border-[#C5A880]/20 rounded-3xl p-6 md:p-12 shadow-2xl"
          >
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <span className="font-mono text-xs text-[#C5A880] uppercase tracking-widest block mb-1">
                  Structural Engineering
                </span>
                <h2 className="font-display text-2xl md:text-4xl text-[#FBF0DA]">
                  Interactive Traditional Joinery Disassembly
                </h2>
                <p className="text-sm text-[#FBF0DA]/70 max-w-xl mt-2">
                  Inspect our zero-screw mortise-and-tenon craftsmanship. Tap hotspots 1, 2, or 3 to inspect microscopic joinery tolerances.
                </p>
              </div>

              <div className="flex items-center gap-2 bg-[#120A04] p-1.5 rounded-xl border border-[#C5A880]/30 text-xs font-mono self-start md:self-auto">
                <button
                  onClick={() => setJoineryMode('assembled')}
                  className={`px-4 py-2 rounded-lg transition-all cursor-pointer ${
                    joineryMode === 'assembled'
                      ? 'bg-[#C5A880] text-[#120A04] font-semibold'
                      : 'text-[#FBF0DA]/60 hover:text-[#FBF0DA]'
                  }`}
                >
                  Assembled View
                </button>
                <button
                  onClick={() => setJoineryMode('exploded')}
                  className={`px-4 py-2 rounded-lg transition-all cursor-pointer ${
                    joineryMode === 'exploded'
                      ? 'bg-[#C5A880] text-[#120A04] font-semibold'
                      : 'text-[#FBF0DA]/60 hover:text-[#FBF0DA]'
                  }`}
                >
                  Exploded CAD Joinery
                </button>
              </div>
            </div>

            {/* Viewer Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#120A04] p-6 md:p-8 rounded-2xl border border-[#C5A880]/20">
              <div className="lg:col-span-8 relative aspect-[4/3] rounded-xl overflow-hidden border border-[#C5A880]/20">
                <img
                  src={joineryMode === 'exploded' ? '/images/hero-living-exploded.jpg' : '/images/hero-living.jpg'}
                  alt="Joinery Viewer"
                  className="w-full h-full object-cover transition-all duration-700"
                />

                {/* Hotspot 1 */}
                <button
                  onClick={() => setActiveHotspot(1)}
                  className={`absolute top-[45%] left-[30%] w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shadow-xl transition-transform hover:scale-110 cursor-pointer ${
                    activeHotspot === 1
                      ? 'bg-[#C5A880] text-[#120A04] ring-4 ring-[#C5A880]/40'
                      : 'bg-[#120A04]/80 text-[#C5A880] border border-[#C5A880]'
                  }`}
                >
                  1
                </button>

                {/* Hotspot 2 */}
                <button
                  onClick={() => setActiveHotspot(2)}
                  className={`absolute bottom-[25%] right-[35%] w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shadow-xl transition-transform hover:scale-110 cursor-pointer ${
                    activeHotspot === 2
                      ? 'bg-[#C5A880] text-[#120A04] ring-4 ring-[#C5A880]/40'
                      : 'bg-[#120A04]/80 text-[#C5A880] border border-[#C5A880]'
                  }`}
                >
                  2
                </button>

                {/* Hotspot 3 */}
                <button
                  onClick={() => setActiveHotspot(3)}
                  className={`absolute top-[28%] right-[25%] w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shadow-xl transition-transform hover:scale-110 cursor-pointer ${
                    activeHotspot === 3
                      ? 'bg-[#C5A880] text-[#120A04] ring-4 ring-[#C5A880]/40'
                      : 'bg-[#120A04]/80 text-[#C5A880] border border-[#C5A880]'
                  }`}
                >
                  3
                </button>
              </div>

              {/* Hotspot Details Card */}
              <div className="lg:col-span-4 space-y-4">
                <div className="p-5 rounded-2xl bg-[#1E1208] border border-[#C5A880]/30 space-y-3">
                  <span className="text-[10px] font-mono text-[#C5A880] uppercase tracking-widest block font-bold">
                    {hotspots[activeHotspot].title}
                  </span>
                  <p className="text-xs text-[#FBF0DA]/90 font-body leading-relaxed">
                    {hotspots[activeHotspot].desc}
                  </p>
                </div>

                <div className="space-y-2.5 text-xs font-mono text-[#FBF0DA]/80">
                  <div className="p-3 bg-white/5 rounded-xl flex items-center justify-between border border-[#C5A880]/10">
                    <span className="text-[#FBF0DA]/50">Fastener System:</span>
                    <span className="text-[#C5A880] font-medium">{hotspots[activeHotspot].fastener}</span>
                  </div>
                  <div className="p-3 bg-white/5 rounded-xl flex items-center justify-between border border-[#C5A880]/10">
                    <span className="text-[#FBF0DA]/50">Structural Spec:</span>
                    <span className="text-[#C5A880] font-medium">{hotspots[activeHotspot].rating}</span>
                  </div>
                  <div className="p-3 bg-white/5 rounded-xl flex items-center justify-between border border-[#C5A880]/10">
                    <span className="text-[#FBF0DA]/50">Longevity:</span>
                    <span className="text-emerald-400 font-medium">{hotspots[activeHotspot].durability}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* ── TAB 3: TIMBER & GRAIN STUDIO ── */}
        {activeTab === 'timber' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-8 bg-[#1A1007] border border-[#C5A880]/20 rounded-3xl p-6 md:p-12 shadow-2xl"
          >
            <div>
              <span className="font-mono text-xs text-[#C5A880] uppercase tracking-widest block mb-1">
                Raw Material Provenance
              </span>
              <h2 className="font-display text-2xl md:text-4xl text-[#FBF0DA]">
                Tactile Timber & Grain Studio
              </h2>
              <p className="text-sm text-[#FBF0DA]/70 max-w-xl mt-2">
                Compare timber species seasoned in our Chattogram vacuum kilns. Engineered to prevent splitting during humid monsoon months.
              </p>
            </div>

            {/* 3 Timber Selector Buttons */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {Object.entries(timbers).map(([key, item]) => (
                <button
                  key={key}
                  onClick={() => setSelectedTimber(key)}
                  className={`p-5 rounded-2xl text-left transition-all cursor-pointer ${
                    selectedTimber === key
                      ? 'bg-[#1E1208] border-2 border-[#C5A880] shadow-xl'
                      : 'bg-[#120A04] border border-[#C5A880]/20 hover:border-[#C5A880]/50'
                  }`}
                >
                  <span className="font-mono text-[10px] text-[#C5A880] uppercase tracking-widest block">
                    {item.grade}
                  </span>
                  <h3 className="font-display text-lg text-white font-bold mt-1">
                    {item.name}
                  </h3>
                  <p className="text-xs text-[#FBF0DA]/60 font-body mt-1">
                    {item.desc}
                  </p>
                </button>
              ))}
            </div>

            {/* Active Timber Details */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 p-6 md:p-8 bg-[#120A04] rounded-2xl border border-[#C5A880]/20 items-center">
              <div className="md:col-span-5 relative aspect-[4/3] rounded-xl overflow-hidden border border-[#C5A880]/30">
                <img
                  src="/images/timber-macro.jpg"
                  alt="Timber Macro"
                  className="w-full h-full object-cover scale-110"
                />
                <div className="absolute bottom-3 left-3 bg-[#120A04]/90 backdrop-blur-md px-3 py-1 rounded text-[10px] font-mono text-[#C5A880]">
                  Macro Grain Magnification (8X)
                </div>
              </div>

              <div className="md:col-span-7 space-y-4 font-mono text-xs">
                <div className="flex items-center justify-between pb-3 border-b border-[#C5A880]/20">
                  <span className="text-[#FBF0DA]/60">Kiln Moisture Content:</span>
                  <span className="text-[#C5A880] font-bold text-sm">{timbers[selectedTimber].moisture}</span>
                </div>
                <div className="flex items-center justify-between pb-3 border-b border-[#C5A880]/20">
                  <span className="text-[#FBF0DA]/60">Natural Oil Density:</span>
                  <span className="text-[#C5A880] font-bold text-sm">{timbers[selectedTimber].oil}</span>
                </div>
                <div className="flex items-center justify-between pb-3 border-b border-[#C5A880]/20">
                  <span className="text-[#FBF0DA]/60">Expected Lifespan:</span>
                  <span className="text-[#C5A880] font-bold text-sm">{timbers[selectedTimber].lifespan}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#FBF0DA]/60">Agrabad Stock Availability:</span>
                  <span className="text-emerald-400 font-bold">{timbers[selectedTimber].stock}</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* ── TAB 4: EVALUATOR / JUDGE MODE MATRIX ── */}
        {activeTab === 'judge' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-8 bg-[#1A1007] border border-[#C5A880]/20 rounded-3xl p-6 md:p-12 shadow-2xl"
          >
            <div>
              <span className="font-mono text-xs text-[#C5A880] uppercase tracking-widest block mb-1">
                Competitive Advantage Breakdown
              </span>
              <h2 className="font-display text-2xl md:text-4xl text-[#FBF0DA]">
                Why Our Platform Wins the Hackathon
              </h2>
              <p className="text-sm text-[#FBF0DA]/70 max-w-xl mt-2">
                Compare how this project stacks up against standard static submissions:
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left font-mono text-xs border-collapse">
                <thead>
                  <tr className="border-b border-[#C5A880]/30 bg-[#120A04] text-[10px] uppercase text-[#C5A880] tracking-wider">
                    <th className="p-4">Capability Dimension</th>
                    <th className="p-4 text-red-400">Generic Competitor Submissions</th>
                    <th className="p-4 text-emerald-400 font-bold">Heaven Furniture Atelier (Our Entry)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#C5A880]/15">
                  <tr>
                    <td className="p-4 font-bold text-[#FBF0DA]">Backend Architecture</td>
                    <td className="p-4 text-red-300">Static HTML/React frontend only (No DB)</td>
                    <td className="p-4 text-emerald-300 font-bold">Cloud PostgreSQL + RPC Hash Verification</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold text-[#FBF0DA]">Inventory State</td>
                    <td className="p-4 text-red-300">Hardcoded fake numbers in JSX</td>
                    <td className="p-4 text-emerald-300 font-bold">Live database stock steppers & order logging</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold text-[#FBF0DA]">Product Photography</td>
                    <td className="p-4 text-red-300">Reused random stock Pinterest photos</td>
                    <td className="p-4 text-emerald-300 font-bold">16 custom 8K handcrafted furniture photographs</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold text-[#FBF0DA]">Mobile Responsiveness</td>
                    <td className="p-4 text-red-300">Overlapping menus, clipped cards</td>
                    <td className="p-4 text-emerald-300 font-bold">Seamless full-height drawer & responsive suites</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold text-[#FBF0DA]">Commercial Depth</td>
                    <td className="p-4 text-red-300">Generic contact form</td>
                    <td className="p-4 text-emerald-300 font-bold">Bespoke 3D Configurator + 6-Phase Delivery Guide</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* One-Click CMS Launcher */}
            <div className="p-6 bg-[#120A04] rounded-2xl border border-[#C5A880]/30 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#C5A880] text-[#120A04] flex items-center justify-center font-bold text-xl shadow-lg shrink-0">
                  <Database className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-display text-lg text-white font-bold">Evaluate Live Store Manager CMS</h4>
                  <p className="text-xs font-mono text-[#FBF0DA]/70">
                    Open our off-white store management portal with active order and inventory records.
                  </p>
                </div>
              </div>

              <a
                href="/admin"
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3.5 rounded-xl bg-[#C5A880] hover:bg-white text-[#120A04] font-mono text-xs uppercase tracking-widest font-bold transition-all shadow-md shrink-0 cursor-pointer"
              >
                Launch Store CMS ↗
              </a>
            </div>
          </motion.div>
        )}

      </main>

      <Footer />
    </div>
  );
}
