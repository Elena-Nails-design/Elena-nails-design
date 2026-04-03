import { Scissors, MessageCircle, Share2, MapPin, Phone, Clock } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-white dark:bg-black border-t border-black/5 dark:border-white/5 pt-20 pb-10 relative overflow-hidden transition-colors duration-500">
      {/* Background Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-[100px] bg-primary/5 blur-[80px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          
          {/* Logo & About */}
          <div className="lg:col-span-1 space-y-6">
            <div className="flex items-center gap-3 text-dark dark:text-white font-bold text-2xl tracking-luxury" style={{ fontFamily: 'var(--font-heading)' }}>
              <div className="w-8 h-8 bg-primary dark:bg-primary-dark rounded-full flex items-center justify-center text-white scale-90">
                <Scissors className="w-4 h-4" />
              </div>
              <span className="uppercase">{t('nav.logo_text')}</span>
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed max-w-xs font-light">
              {t('footer.subtitle')}
            </p>
          </div>

          {/* Contact */}
          <div className="space-y-6">
            <h3 className="text-[10px] font-bold text-primary dark:text-primary-dark uppercase tracking-[0.3em]">{t('footer.contact_title')}</h3>
            <ul className="space-y-4 text-xs text-gray-600 dark:text-gray-400 font-light tracking-wider">
              <li className="flex items-start gap-3 group">
                <MapPin className="w-4 h-4 text-primary/40 group-hover:text-primary transition-colors shrink-0" />
                <span>{t('footer.address')}</span>
              </li>
              <li className="flex items-center gap-3 group">
                <Phone className="w-4 h-4 text-primary/40 group-hover:text-primary transition-colors shrink-0" />
                <span dir="ltr" className="tracking-widest">+972 50 123 4567</span>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div className="space-y-6">
            <h3 className="text-[10px] font-bold text-primary dark:text-primary-dark uppercase tracking-[0.3em]">{t('footer.hours_title')}</h3>
            <ul className="space-y-3 text-xs text-gray-600 dark:text-gray-400 font-light tracking-wider">
              <li className="flex items-start gap-3 group">
                <Clock className="w-4 h-4 text-primary/40 group-hover:text-primary transition-colors shrink-0" />
                <div className="flex flex-col gap-2">
                  <span className="text-dark dark:text-white font-medium">{t('footer.sun_thu')}</span>
                  <span>{t('footer.fri')}</span>
                  <span className="text-primary/60 italic">{t('footer.sat')}</span>
                </div>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div className="space-y-6">
            <h3 className="text-[10px] font-bold text-primary dark:text-primary-dark uppercase tracking-[0.3em]">{t('footer.social_title')}</h3>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 glass-luxury flex items-center justify-center text-primary hover:text-white hover:bg-primary transition-all duration-300">
                <MessageCircle className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 glass-luxury flex items-center justify-center text-primary hover:text-white hover:bg-primary transition-all duration-300">
                <Share2 className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>
        
        {/* Copyright */}
        <div className="pt-10 border-t border-black/5 dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] uppercase tracking-[0.2em] text-gray-400 dark:text-gray-600 font-bold">
          <p>© {new Date().getFullYear()} {t('nav.logo_text')}</p>
          <p className="hover:text-primary transition-colors cursor-default">{t('footer.rights')}</p>
        </div>
      </div>
    </footer>
  );
}
