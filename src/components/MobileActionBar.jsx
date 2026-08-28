import { MessageCircle, Phone, CalendarCheck } from 'lucide-react'
import { getWhatsAppInquiryUrl, getPhoneUrl } from '../utils/whatsapp'

export default function MobileActionBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
      <div className="glass border-t border-gold/20">
        <div className="grid grid-cols-3 divide-x divide-gold/10">
          <a
            href={getWhatsAppInquiryUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-1 py-3 text-green-400 hover:text-green-300 transition-colors"
          >
            <MessageCircle className="w-5 h-5" />
            <span className="text-[10px] font-medium tracking-wide">WhatsApp</span>
          </a>
          <a
            href={getPhoneUrl()}
            className="flex flex-col items-center gap-1 py-3 text-ivory hover:text-gold transition-colors"
          >
            <Phone className="w-5 h-5" />
            <span className="text-[10px] font-medium tracking-wide">Call Now</span>
          </a>
          <a
            href="#bespoke"
            className="flex flex-col items-center gap-1 py-3 text-gold hover:text-gold-hover transition-colors"
          >
            <CalendarCheck className="w-5 h-5" />
            <span className="text-[10px] font-medium tracking-wide">Book Visit</span>
          </a>
        </div>
      </div>
    </div>
  )
}
