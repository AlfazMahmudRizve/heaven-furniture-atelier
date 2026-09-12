import React from 'react';
import { Sparkles, Shield, ArrowUpRight, Mail, X } from 'lucide-react';

export default function TurnkeyPlatformBanner({ onOpenAcquisition, onClose }) {
  return (
    <aside aria-label="Turnkey platform announcement" className="relative z-50 bg-[#160D05] border-b border-[#C6A75E]/20 text-[#FBF0DA] px-3 py-2 sm:px-6 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2.5 sm:gap-4 text-xs">
        
        {/* Left: Productized Tagline */}
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap justify-center md:justify-start">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#C6A75E]/15 border border-[#C6A75E]/40 text-[#E5CA85] font-mono text-[10px] tracking-wider uppercase font-semibold">
            <Sparkles className="w-3 h-3 text-[#E5CA85] animate-pulse" />
            <span>Turnkey Platform Ready</span>
          </span>
          <p className="font-body text-[11px] sm:text-[12px] text-[#E0D3C1] text-center md:text-left">
            Luxury interior architecture website + full production CMS ready for immediate commercial deployment.
          </p>
        </div>

        {/* Right: Quick Demo, Mail & Purchase Actions */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0 flex-wrap justify-center">
          <a
            href="mailto:contact@whoisalfaz.me?subject=Haven%20Atelier%20Turnkey%20Platform%20Acquisition%20Inquiry"
            className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[#C6A75E] hover:text-[#FAF3E8] text-[11px] font-mono uppercase tracking-wider transition-colors"
            title="Email platform architect directly"
          >
            <Mail className="w-3 h-3 text-[#C6A75E]" />
            <span>contact@whoisalfaz.me</span>
          </a>

          <a
            href="/admin/login"
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#25170B] hover:bg-[#382312] text-[#D8C7B0] hover:text-white border border-[#523A22] text-[10px] font-mono uppercase tracking-wider transition-colors"
            title="Experience the Store Manager & Workshop CMS"
          >
            <Shield className="w-3 h-3 text-[#C6A75E]" />
            <span>CMS Demo</span>
          </a>

          <button
            type="button"
            onClick={onOpenAcquisition}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-gradient-to-r from-[#C6A75E] to-[#B08D3E] hover:from-[#D4B66E] hover:to-[#C6A75E] text-[#1A0F06] font-mono uppercase text-[10px] font-bold tracking-wider transition-all shadow-sm hover:shadow cursor-pointer"
          >
            <span>Acquire Platform</span>
            <ArrowUpRight className="w-3 h-3" />
          </button>

          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="p-1 text-[#8A7563] hover:text-[#D8C7B0] transition-colors ml-0.5 cursor-pointer"
              aria-label="Dismiss banner"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </aside>
  );
}
