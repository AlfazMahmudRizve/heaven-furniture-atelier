import React from 'react';
import { MessageCircle, Phone, ShoppingBag, MapPin } from 'lucide-react';
import { getWhatsAppInquiryUrl, getPhoneUrl } from '../utils/whatsapp';
import { useCart } from '../context/CartContext';

export default function MobileActionBar() {
  const { itemCount, openDrawer } = useCart();

  const handleScrollToShowroom = (e) => {
    e.preventDefault();
    const el = document.getElementById('showroom');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav 
      aria-label="Mobile Quick Conversion Bar" 
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-[#18120D]/95 backdrop-blur-md border-t border-[#C6A75E]/25 shadow-[0_-10px_30px_rgba(0,0,0,0.6)]"
    >
      <div className="grid grid-cols-4 divide-x divide-[#C6A75E]/15 py-1 px-1">
        {/* 1. WhatsApp */}
        <a
          href={getWhatsAppInquiryUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center gap-1 py-2 px-1 text-[#25D366] hover:text-[#4AE284] active:scale-95 transition-transform"
          aria-label="Chat on WhatsApp"
        >
          <div className="relative">
            <MessageCircle className="w-5 h-5 fill-current" />
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#25D366] animate-ping" />
          </div>
          <span className="font-mono text-[9px] uppercase tracking-wider font-semibold">
            WhatsApp
          </span>
        </a>

        {/* 2. Direct Call */}
        <a
          href={getPhoneUrl()}
          className="flex flex-col items-center justify-center gap-1 py-2 px-1 text-[#F5EFEB] hover:text-[#C6A75E] active:scale-95 transition-transform"
          aria-label="Call Showroom"
        >
          <Phone className="w-5 h-5 text-[#C6A75E]" />
          <span className="font-mono text-[9px] uppercase tracking-wider font-semibold">
            Call
          </span>
        </a>

        {/* 3. Quotation Tray with Dynamic Count */}
        <button
          type="button"
          onClick={openDrawer}
          className="relative flex flex-col items-center justify-center gap-1 py-2 px-1 text-[#C6A75E] hover:text-[#D4B975] active:scale-95 transition-transform"
          aria-label={`Open Consultation Tray with ${itemCount} items`}
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5" />
            {itemCount > 0 && (
              <span className="absolute -top-1.5 -right-2 min-w-[16px] h-4 px-1 rounded-full bg-[#C6A75E] text-[#241A14] font-mono text-[9px] font-bold flex items-center justify-center shadow-md animate-pulse">
                {itemCount}
              </span>
            )}
          </div>
          <span className="font-mono text-[9px] uppercase tracking-wider font-semibold">
            Tray {itemCount > 0 ? `(${itemCount})` : ''}
          </span>
        </button>

        {/* 4. Flagship Showroom */}
        <button
          type="button"
          onClick={handleScrollToShowroom}
          className="flex flex-col items-center justify-center gap-1 py-2 px-1 text-[#F5EFEB]/80 hover:text-[#C6A75E] active:scale-95 transition-transform"
          aria-label="View Flagship Showroom"
        >
          <MapPin className="w-5 h-5 text-[#C6A75E]" />
          <span className="font-mono text-[9px] uppercase tracking-wider font-semibold">
            Atelier
          </span>
        </button>
      </div>
    </nav>
  );
}
