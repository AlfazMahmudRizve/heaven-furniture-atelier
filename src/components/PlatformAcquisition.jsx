import React from 'react';
import { 
  Sparkles, 
  Shield, 
  ArrowUpRight, 
  Layers, 
  CheckCircle2, 
  Sliders, 
  Zap, 
  ExternalLink,
  MessageSquare
} from 'lucide-react';

export default function PlatformAcquisition({ onOpenAcquisition }) {
  const whatsappUrl = `https://wa.me/8801800000000?text=${encodeURIComponent(
    "Hello! I am interested in acquiring the Haven Atelier Luxury Interior & CMS Platform for my brand. Let's discuss pricing and deployment details."
  )}`;

  return (
    <section 
      id="platform-acquisition"
      aria-label="Platform Acquisition and Turnkey Deployment"
      className="relative bg-[#140B04] text-[#FAF8F5] py-20 sm:py-28 px-4 sm:px-6 lg:px-8 border-t border-[#C6A75E]/20 overflow-hidden font-body"
    >
      {/* Background Architectural Ambience */}
      <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-[#C6A75E]/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 rounded-full bg-[#3D2512]/30 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2A1709] border border-[#C6A75E]/30 text-[#E5CA85] font-mono text-[11px] tracking-widest uppercase mb-4">
              <Sparkles className="w-3.5 h-3.5 text-[#C6A75E]" />
              <span>Turnkey Commercial Solution</span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-tight">
              Deploy This Luxury Commerce Engine <br className="hidden sm:inline" />
              <span className="text-[#C6A75E] italic">For Your Own Brand.</span>
            </h2>
          </div>
          <p className="max-w-md text-[#D8C7B0] text-sm sm:text-base leading-relaxed font-light">
            Engineered specifically for high-end interior design firms, bespoke woodcraft studios, and luxury showrooms. Live in 24–48 hours with full CMS operations.
          </p>
        </div>

        {/* 4 Feature Architecture Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          
          <div className="p-6 rounded-2xl bg-[#1D1107] border border-[#3D2512] hover:border-[#C6A75E]/40 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-[#2A1709] border border-[#52351A] flex items-center justify-center text-[#C6A75E] mb-4">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="font-display text-lg text-white mb-2">Tactile Material Lens</h3>
            <p className="text-xs text-[#BFAEA0] leading-relaxed">
              Interactive high-resolution timber and marble grain inspector with real-time room lighting simulation (Direct Sun vs Ambient Warmth).
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#1D1107] border border-[#3D2512] hover:border-[#C6A75E]/40 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-[#2A1709] border border-[#52351A] flex items-center justify-center text-[#C6A75E] mb-4">
              <MessageSquare className="w-5 h-5" />
            </div>
            <h3 className="font-display text-lg text-white mb-2">Consultation Quotation Tray</h3>
            <p className="text-xs text-[#BFAEA0] leading-relaxed">
              Floating drawer calculating custom room dimensions, live itemized pricing, and direct 1-tap WhatsApp concierge deep link dispatch.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#1D1107] border border-[#3D2512] hover:border-[#C6A75E]/40 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-[#2A1709] border border-[#52351A] flex items-center justify-center text-[#C6A75E] mb-4">
              <Sliders className="w-5 h-5" />
            </div>
            <h3 className="font-display text-lg text-white mb-2">Workshop Production CMS</h3>
            <p className="text-xs text-[#BFAEA0] leading-relaxed">
              Complete `/admin` operations portal tracking joinery stages, milestone advance deposits, customer CRM, and invoice printing.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#1D1107] border border-[#3D2512] hover:border-[#C6A75E]/40 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-[#2A1709] border border-[#52351A] flex items-center justify-center text-[#C6A75E] mb-4">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="font-display text-lg text-white mb-2">Zero Recurring SaaS Fees</h3>
            <p className="text-xs text-[#BFAEA0] leading-relaxed">
              100% source code ownership. Runs on free-tier Supabase PostgreSQL and Vercel hosting. No monthly Shopify app subscriptions.
            </p>
          </div>

        </div>

        {/* Commercial Callout Card */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#211409] via-[#2A190B] to-[#1E1106] border border-[#C6A75E]/30 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-2xl">
          <div className="max-w-2xl text-center lg:text-left">
            <span className="text-xs font-mono uppercase tracking-widest text-[#C6A75E] font-semibold block mb-2">
              Ready-To-Deploy Turnkey Solution
            </span>
            <h3 className="font-display text-2xl sm:text-3xl text-white">
              Launch Your Luxury Digital Flagship in 48 Hours
            </h3>
            <p className="text-xs sm:text-sm text-[#D8C7B0] mt-2 leading-relaxed">
              Available as a complete source code license or a done-for-you white-glove deployment with custom branding, logo, product catalog upload, and custom domain setup.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3.5 shrink-0 w-full lg:w-auto">
            <a
              href="mailto:contact@whoisalfaz.me?subject=Haven%20Atelier%20Turnkey%20Platform%20Acquisition%20Inquiry"
              className="w-full sm:w-auto px-4 py-3 rounded-xl bg-[#2A1709] hover:bg-[#3D2312] text-[#E5CA85] hover:text-white border border-[#C6A75E]/30 font-mono text-xs uppercase tracking-wider font-medium transition-colors flex items-center justify-center gap-2"
              title="Email platform engineer directly"
            >
              <Mail className="w-3.5 h-3.5 text-[#C6A75E]" />
              <span>Email: contact@whoisalfaz.me</span>
            </a>

            <a
              href="/admin/login"
              className="w-full sm:w-auto px-4 py-3 rounded-xl bg-[#2C190D] hover:bg-[#3D2312] text-[#FAF8F5] border border-[#614022] font-mono text-xs uppercase tracking-wider font-semibold transition-colors flex items-center justify-center gap-2"
            >
              <Shield className="w-3.5 h-3.5 text-[#C6A75E]" />
              <span>Test CMS Demo</span>
            </a>

            <button
              type="button"
              onClick={onOpenAcquisition}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#C6A75E] to-[#B08D3E] hover:from-[#D4B66E] hover:to-[#C6A75E] text-[#1E1005] font-mono text-xs uppercase tracking-wider font-bold transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Acquisition Options & Pricing</span>
              <ArrowUpRight className="w-4 h-4 text-[#1E1005]" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
