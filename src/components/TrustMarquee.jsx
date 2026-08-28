import { TRUST_POINTS } from '../data/company';
import * as Icons from 'lucide-react';

export default function TrustMarquee() {
  // Triplicate for seamless infinite scroll
  const marqueeItems = [...TRUST_POINTS, ...TRUST_POINTS, ...TRUST_POINTS];

  return (
    <div className="w-full overflow-hidden bg-surface/80 backdrop-blur border-y border-gold/10 py-4 relative flex">
      {/* Inline styles for the marquee animation */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333333%); }
        }
        .animate-marquee {
          display: flex;
          animation: marquee 30s linear infinite;
        }
      `}</style>
      
      <div className="animate-marquee whitespace-nowrap flex items-center gap-12 px-6">
        {marqueeItems.map((point, index) => {
          const Icon = Icons[point.icon] || Icons.CheckCircle;
          
          return (
            <div key={`${point.id || index}-${index}`} className="flex items-center gap-3">
              <Icon className="text-gold w-4 h-4 shrink-0" />
              <span className="text-sm font-medium text-ivory-muted tracking-wide">{point.title}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
