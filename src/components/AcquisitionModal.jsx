import React, { useEffect } from 'react';
import { 
  X, 
  Check, 
  Sparkles, 
  ShieldCheck, 
  Layers, 
  Zap, 
  ArrowRight, 
  MessageSquare, 
  Mail, 
  ExternalLink,
  Code2,
  Database,
  Smartphone,
  Sliders,
  Copy
} from 'lucide-react';

export default function AcquisitionModal({ isOpen, onClose }) {
  const [copied, setCopied] = React.useState(false);

  // Close on escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const whatsappInquiryUrl = `https://wa.me/8801991210347?text=${encodeURIComponent(
    "Hello! I am interested in acquiring the Haven Atelier Luxury Interior & CMS Platform for my brand. Let's discuss pricing and turnkey deployment."
  )}`;

  const mailtoInquiryUrl = `mailto:contact@whoisalfaz.me?subject=${encodeURIComponent(
    "Haven Atelier — Turnkey Platform Acquisition Inquiry"
  )}&body=${encodeURIComponent(
    "Hello Alfaz,\n\nI am interested in acquiring the Haven Atelier Luxury Interior & CMS platform for our design studio / brand.\n\nProject / Studio Name:\nDeployment Timeline:\nSpecific Requirements:\n\nLooking forward to hearing from you."
  )}`;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('contact@whoisalfaz.me');
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 bg-[#0E0703]/80 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-[#FAF8F5] border border-[#D9C7AE] rounded-2xl sm:rounded-3xl shadow-2xl text-[#1E1005] p-6 sm:p-10 font-body"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-[#EDE4D6] hover:bg-[#1E1005] hover:text-white text-[#5C4938] flex items-center justify-center transition-colors cursor-pointer z-10"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Badge & Title */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1E1005] text-[#E5CA85] text-xs font-mono tracking-widest uppercase mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#C6A75E]" />
            <span>Turnkey Web Platform & Back-Office CMS</span>
          </div>

          <h2 className="font-display text-2xl sm:text-4xl text-[#1E1005] tracking-tight leading-snug">
            Deploy Haven Atelier For Your Interior & Furniture Studio
          </h2>
          <p className="font-body text-xs sm:text-sm text-[#705C48] mt-2.5 leading-relaxed">
            Acquire a high-converting digital storefront paired with an enterprise workshop operations CMS. Fully customized and deployed under your own brand and domain in 24–48 hours.
          </p>
        </div>

        {/* Core Value Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="p-4 rounded-xl bg-white border border-[#E8DFD3] shadow-xs">
            <div className="w-8 h-8 rounded-lg bg-[#FAF3E8] border border-[#DECDB5] flex items-center justify-center text-[#9C7443] mb-3">
              <Layers className="w-4 h-4" />
            </div>
            <h3 className="font-display text-sm text-[#1E1005] font-bold">Front-of-House Atelier</h3>
            <p className="font-body text-xs text-[#705C48] mt-1 leading-relaxed">
              Interactive timber grain & lighting lens, floating quotation tray, and 1-tap WhatsApp concierge quoting.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white border border-[#E8DFD3] shadow-xs">
            <div className="w-8 h-8 rounded-lg bg-[#FAF3E8] border border-[#DECDB5] flex items-center justify-center text-[#9C7443] mb-3">
              <Sliders className="w-4 h-4" />
            </div>
            <h3 className="font-display text-sm text-[#1E1005] font-bold">Store Manager CMS (/admin)</h3>
            <p className="font-body text-xs text-[#705C48] mt-1 leading-relaxed">
              End-to-end workshop fabrication tracking, deposit balance accounting, invoice generator, and customer CRM.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white border border-[#E8DFD3] shadow-xs">
            <div className="w-8 h-8 rounded-lg bg-[#FAF3E8] border border-[#DECDB5] flex items-center justify-center text-[#9C7443] mb-3">
              <Zap className="w-4 h-4" />
            </div>
            <h3 className="font-display text-sm text-[#1E1005] font-bold">Zero Monthly App Fees</h3>
            <p className="font-body text-xs text-[#705C48] mt-1 leading-relaxed">
              Self-hosted on free-tier Supabase PostgreSQL & Vercel. 100% full source code and database ownership.
            </p>
          </div>
        </div>

        {/* Commercial Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          
          {/* Option 1: Architecture License */}
          <div className="p-6 rounded-2xl bg-white border border-[#E5DACB] flex flex-col justify-between shadow-xs">
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="font-mono text-[11px] uppercase tracking-wider text-[#9C7443] font-bold">
                  Developer / Agency Package
                </span>
                <span className="px-2 py-0.5 rounded bg-[#FAF3E8] border border-[#E8DEC9] text-[10px] font-mono text-[#8C6D42]">
                  Codebase & DB
                </span>
              </div>
              <h4 className="font-display text-xl text-[#1E1005]">Source Code & Architecture</h4>
              <p className="text-xs text-[#705C48] mt-1 mb-4">
                For developers, agencies, or teams who want to self-host and customize independently.
              </p>

              <ul className="space-y-2 text-xs text-[#4A3B2C] mb-6 font-body">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#9C7443] shrink-0 mt-0.5" />
                  <span>Full GitHub repository (React 19 + Tailwind + Vite)</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#9C7443] shrink-0 mt-0.5" />
                  <span>Complete Supabase SQL schemas, RLS policies & RPCs</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#9C7443] shrink-0 mt-0.5" />
                  <span>Interactive Timber Grain Lens & Quotation Tray source</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#9C7443] shrink-0 mt-0.5" />
                  <span>31/31 passing Vitest unit/integration test suites</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#9C7443] shrink-0 mt-0.5" />
                  <span>Vercel + Supabase 1-click deployment documentation</span>
                </li>
              </ul>
            </div>

            <div className="space-y-2">
              <a
                href={whatsappInquiryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 rounded-xl bg-[#2A1C10] hover:bg-[#1E1005] text-[#FAF3E8] font-mono text-xs uppercase tracking-wider font-semibold text-center transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageSquare className="w-3.5 h-3.5 text-[#C6A75E]" />
                <span>Inquire via WhatsApp</span>
              </a>
              <a
                href={mailtoInquiryUrl}
                className="w-full py-2 rounded-xl border border-[#D9C7AE] hover:border-[#1E1005] text-[#1E1005] font-mono text-[11px] uppercase tracking-wider font-medium text-center transition-colors flex items-center justify-center gap-2"
              >
                <Mail className="w-3.5 h-3.5 text-[#8C6D42]" />
                <span>Email Developer Directly</span>
              </a>
            </div>
          </div>

          {/* Option 2: Done-For-You Turnkey Deployment */}
          <div className="p-6 rounded-2xl bg-[#1E1005] border border-[#C6A75E]/40 text-[#FAF8F5] flex flex-col justify-between shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#C6A75E]/10 rounded-full blur-2xl pointer-events-none" />
            
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="font-mono text-[11px] uppercase tracking-wider text-[#E5CA85] font-bold flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  <span>Studio Turnkey Package</span>
                </span>
                <span className="px-2 py-0.5 rounded bg-[#C6A75E]/20 border border-[#C6A75E]/40 text-[10px] font-mono text-[#E5CA85]">
                  White-Glove
                </span>
              </div>
              <h4 className="font-display text-xl text-white">Full Turnkey Custom Deployment</h4>
              <p className="text-xs text-[#D8C7B0] mt-1 mb-4">
                Everything handled for you. Deployed live with your brand, logo, products, and domain in 48 hours.
              </p>

              <ul className="space-y-2 text-xs text-[#E5DCD1] mb-6 font-body">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#C6A75E] shrink-0 mt-0.5" />
                  <span>Custom brand identity: Logo, colors, typography & copywriting</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#C6A75E] shrink-0 mt-0.5" />
                  <span>Upload up to 30 custom furniture / room suite products</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#C6A75E] shrink-0 mt-0.5" />
                  <span>Custom domain configuration (SSL + DNS connection)</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#C6A75E] shrink-0 mt-0.5" />
                  <span>Customized WhatsApp & concierge phone routing</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#C6A75E] shrink-0 mt-0.5" />
                  <span>30-day post-launch white-glove technical support</span>
                </li>
              </ul>
            </div>

            <div className="space-y-2">
              <a
                href={whatsappInquiryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#C6A75E] to-[#B08D3E] hover:from-[#D4B66E] hover:to-[#C6A75E] text-[#1E1005] font-mono text-xs uppercase tracking-wider font-bold text-center transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <MessageSquare className="w-3.5 h-3.5 text-[#1E1005]" />
                <span>Request Turnkey via WhatsApp</span>
              </a>
              <a
                href={mailtoInquiryUrl}
                className="w-full py-2 rounded-xl border border-[#C6A75E]/40 hover:bg-[#C6A75E]/10 text-[#E5CA85] font-mono text-[11px] uppercase tracking-wider font-medium text-center transition-colors flex items-center justify-center gap-2"
              >
                <Mail className="w-3.5 h-3.5 text-[#C6A75E]" />
                <span>Email Developer (contact@whoisalfaz.me)</span>
              </a>
            </div>
          </div>

        </div>

        {/* Direct Architect & Concierge Email Card */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#EDE4D6] border border-[#DECDB5] mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-left">
            <div className="w-10 h-10 rounded-full bg-[#1E1005] text-[#C6A75E] flex items-center justify-center shrink-0">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <p className="font-display text-sm text-[#1E1005] font-bold">
                Direct Inquiries to Platform Engineer
              </p>
              <p className="text-xs text-[#705C48]">
                Alfaz Mahmud · <span className="font-mono text-[#1E1005] font-semibold">contact@whoisalfaz.me</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto">
            <button
              type="button"
              onClick={handleCopyEmail}
              className="flex-1 sm:flex-initial px-3.5 py-2 rounded-xl bg-white hover:bg-[#F5EFEB] border border-[#D9C7AE] text-[#1E1005] font-mono text-xs uppercase tracking-wider font-medium transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-[#8C6D42]" />}
              <span>{copied ? 'Copied!' : 'Copy Email'}</span>
            </button>
            <a
              href={mailtoInquiryUrl}
              className="flex-1 sm:flex-initial px-4 py-2 rounded-xl bg-[#1E1005] hover:bg-[#2A1C10] text-white font-mono text-xs uppercase tracking-wider font-medium transition-colors flex items-center justify-center gap-1.5 shadow-xs"
            >
              <Mail className="w-3.5 h-3.5 text-[#C6A75E]" />
              <span>Send Email</span>
            </a>
          </div>
        </div>

        {/* Quick Back-Office Demo Link */}
        <div className="p-4 rounded-xl bg-white border border-[#E8DFD3] flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-5 h-5 text-[#9C7443] shrink-0" />
            <span className="text-xs text-[#4A3B2C] font-mono">
              Want to test the backend right now? Explore the Store Manager CMS live:
            </span>
          </div>
          <a
            href="/admin/login"
            className="px-3.5 py-1.5 rounded-lg bg-[#1E1005] hover:bg-[#9C7443] text-white font-mono text-xs uppercase tracking-wider transition-colors inline-flex items-center gap-1.5 shrink-0"
          >
            <span>Open /admin Demo</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

      </div>
    </div>
  );
}
