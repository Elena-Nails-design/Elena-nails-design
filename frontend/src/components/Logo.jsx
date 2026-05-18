import React from 'react';
import { Sparkles } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function Logo({ className = "h-12 w-auto", scrolled = false }) {
  const { i18n } = useTranslation();
  const isRtl = i18n.dir() === 'rtl';

  return (
    <div className={`flex items-center gap-3 transition-all duration-700 ${className} ${isRtl ? 'flex-row-reverse text-right' : 'flex-row'}`}>
      {/* Premium Minimalist Brand Icon */}
      <div className="flex items-center justify-center relative">
        <Sparkles 
          className="w-6 h-6 text-gold drop-shadow-sm animate-pulse transition-transform duration-[2s] hover:scale-125" 
          strokeWidth={1.5}
        />
        <div className="absolute inset-0 bg-gold/10 blur-xl rounded-full scale-150 animate-pulse" />
      </div>

      {/* Brand Typography */}
      <div className={`flex flex-col ${isRtl ? 'items-end pr-1' : 'items-start pl-1'}`}>
        <span 
          className="text-2xl md:text-3xl font-bold leading-tight tracking-[0.02em] text-dark dark:text-white transition-colors duration-500"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          ELENA
        </span>
        <span 
          className="text-[9px] md:text-[10px] uppercase font-medium tracking-[0.5em] text-gold -mt-1"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          EPSHTEIN
        </span>
      </div>
    </div>
  );
}
