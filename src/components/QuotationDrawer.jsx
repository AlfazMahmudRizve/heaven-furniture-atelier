import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, Plus, Minus, MessageCircle, Phone, ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { COMPANY } from '../data/company';

export default function QuotationDrawer() {
  const {
    items,
    isDrawerOpen,
    closeDrawer,
    removeItem,
    updateQuantity,
    clearCart,
    itemCount,
    totalEstimatedPrice,
    getWhatsAppOrderUrl,
  } = useCart();

  return (
    <AnimatePresence>
      {isDrawerOpen && (
        <>
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeDrawer}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[9990]"
            aria-hidden="true"
          />

          {/* Slide-over Drawer */}
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            className="fixed inset-y-0 right-0 z-[9995] w-full max-w-lg bg-[#241A14] border-l border-[#C6A75E]/20 shadow-[0_0_50px_rgba(0,0,0,0.8)] flex flex-col justify-between overflow-hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Consultation and Quotation Tray"
          >
            {/* Header */}
            <div className="p-6 border-b border-[#C6A75E]/15 bg-[#1B140F] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-[#C6A75E] animate-pulse" />
                <div>
                  <p className="font-mono text-[10px] tracking-[0.25em] text-[#C6A75E] uppercase font-semibold">
                    Consultation Tray
                  </p>
                  <h2 className="font-display text-xl text-[#F5EFEB] font-normal tracking-wide">
                    Your Selected Pieces ({itemCount})
                  </h2>
                </div>
              </div>
              <button
                type="button"
                onClick={closeDrawer}
                className="w-10 h-10 rounded-full border border-[#C6A75E]/30 flex items-center justify-center text-[#F5EFEB] hover:text-[#C6A75E] hover:border-[#C6A75E] transition-colors"
                aria-label="Close tray"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Item List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center px-4 py-16 space-y-5">
                  <div className="w-20 h-20 rounded-full bg-[#30231B] border border-[#C6A75E]/20 flex items-center justify-center text-[#C6A75E]">
                    <Sparkles className="w-8 h-8 opacity-60" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-display text-2xl text-[#F5EFEB]">Your Tray is Empty</h3>
                    <p className="text-[#F5EFEB]/60 text-sm max-w-xs leading-relaxed">
                      Select furniture pieces from our catalog or configure a bespoke commission to receive an itemized WhatsApp quotation.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      closeDrawer();
                      const target = document.getElementById('collections') || document.getElementById('projects');
                      target?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#C6A75E] text-[#241A14] font-mono text-xs uppercase tracking-widest font-semibold hover:bg-[#D4B975] transition-colors rounded-sm"
                  >
                    <span>Browse Collections</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                items.map((item, idx) => (
                  <div
                    key={`${item.id}-${item.wood}-${item.finish}-${idx}`}
                    className="p-4 rounded-xl bg-[#2D211A] border border-[#C6A75E]/15 hover:border-[#C6A75E]/40 transition-colors space-y-3"
                  >
                    <div className="flex items-start justify-between gap-3">
                      {item.image && (
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-16 h-16 object-cover rounded-lg border border-[#C6A75E]/20 shrink-0 bg-[#18120D]"
                          width={64}
                          height={64}
                          loading="lazy"
                        />
                      )}
                      <div className="flex-1 min-w-0">
                        <span className="font-mono text-[9px] uppercase tracking-widest text-[#C6A75E] block truncate">
                          {item.category || 'Atelier Selection'}
                        </span>
                        <h4 className="font-display text-base text-[#F5EFEB] font-normal truncate">
                          {item.title}
                        </h4>
                        <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-[#F5EFEB]/70 mt-1">
                          {item.wood && (
                            <span className="inline-flex items-center gap-1 font-mono text-[10px]">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#C6A75E]" />
                              {item.wood}
                            </span>
                          )}
                          {item.finish && (
                            <span className="font-mono text-[10px] text-[#F5EFEB]/50">
                              • {item.finish}
                            </span>
                          )}
                          {item.dimensions && (
                            <span className="font-mono text-[10px] text-[#F5EFEB]/50">
                              • {item.dimensions}
                            </span>
                          )}
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeItem(item.id, item.wood, item.finish)}
                        className="text-[#F5EFEB]/40 hover:text-red-400 transition-colors p-1"
                        aria-label={`Remove ${item.title}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Price & Quantity Controls */}
                    <div className="pt-2 border-t border-[#C6A75E]/10 flex items-center justify-between">
                      <div className="flex items-center gap-2 bg-[#1F1611] rounded-lg p-1 border border-[#C6A75E]/10">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.wood, item.finish, -1)}
                          className="w-6 h-6 rounded flex items-center justify-center text-[#F5EFEB]/60 hover:text-[#C6A75E] hover:bg-[#30231B] transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="font-mono text-xs text-[#F5EFEB] px-2 font-semibold min-w-[20px] text-center">
                          {item.quantity || 1}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.wood, item.finish, 1)}
                          className="w-6 h-6 rounded flex items-center justify-center text-[#F5EFEB]/60 hover:text-[#C6A75E] hover:bg-[#30231B] transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="font-mono text-sm font-bold text-[#C6A75E]">
                        {item.priceDisplay || (item.price ? `৳${((item.price) * (item.quantity || 1)).toLocaleString('en-IN')}` : 'Price on request')}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Sticky Bottom Actions */}
            {items.length > 0 && (
              <div className="p-6 border-t border-[#C6A75E]/20 bg-[#1B140F] space-y-4">
                {/* Price Breakdown */}
                <div className="space-y-1">
                  <div className="flex items-baseline justify-between">
                    <span className="font-mono text-xs uppercase tracking-widest text-[#F5EFEB]/60">
                      Estimated Valuation
                    </span>
                    <span className="font-display text-2xl font-bold text-[#C6A75E]">
                      ৳{totalEstimatedPrice.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <p className="font-mono text-[10px] text-[#F5EFEB]/40 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#C6A75E]" />
                    Includes White-Glove Chattogram Delivery & 10-Year Warranty
                  </p>
                </div>

                {/* Primary High-Conversion Button */}
                <a
                  href={getWhatsAppOrderUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-3 py-4 px-6 rounded-lg bg-[#25D366] hover:bg-[#20BE5C] text-[#112316] font-mono text-xs uppercase tracking-widest font-bold shadow-[0_4px_25px_rgba(37,211,102,0.35)] hover:shadow-[0_6px_30px_rgba(37,211,102,0.5)] transition-all"
                >
                  <MessageCircle className="w-5 h-5 fill-current" />
                  <span>Send to WhatsApp Concierge</span>
                </a>

                {/* Secondary Call Action & Clear */}
                <div className="flex items-center justify-between pt-1 text-xs">
                  <a
                    href={`tel:${COMPANY.phone}`}
                    className="inline-flex items-center gap-1.5 text-[#F5EFEB]/70 hover:text-[#C6A75E] transition-colors font-mono text-[11px]"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#C6A75E]" />
                    <span>Call Showroom ({COMPANY.phoneDisplay})</span>
                  </a>
                  <button
                    type="button"
                    onClick={clearCart}
                    className="text-[#F5EFEB]/40 hover:text-red-400 transition-colors font-mono text-[10px] underline underline-offset-2"
                  >
                    Clear Tray
                  </button>
                </div>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
