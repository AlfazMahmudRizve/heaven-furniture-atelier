import React from 'react';
import { MessageCircle } from 'lucide-react';
import { getWhatsAppInquiryUrl } from '../utils/whatsapp';

export default function FloatingWhatsApp() {
  return (
    <a
      href={getWhatsAppInquiryUrl()}
      target="_blank"
      rel="noopener noreferrer"
      className="hidden md:flex fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-green-500 hover:bg-green-600 shadow-[0_4px_14px_rgba(34,197,94,0.39)] items-center justify-center transition-[transform,background-color] duration-300 hover:scale-110"
      aria-label="Chat on WhatsApp"
    >
      <div className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-75"></div>
      <MessageCircle className="w-7 h-7 text-white relative z-10" />
    </a>
  );
}
