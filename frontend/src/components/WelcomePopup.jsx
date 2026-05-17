import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, MessageCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const STUDIO_PHONE = '9720534611370';

export default function WelcomePopup() {
  const [isOpen, setIsOpen] = useState(false);
  const { i18n } = useTranslation();
  const currentLang = (i18n.language || 'he').split('-')[0].split('_')[0].toLowerCase();
  const isRtl = i18n.dir() === 'rtl';

  useEffect(() => {
    // Check if user already dismissed or interacted with the popup in this session
    const isDismissed = sessionStorage.getItem('welcome_popup_dismissed');
    if (!isDismissed) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 5000); // 5 seconds delay
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem('welcome_popup_dismissed', 'true');
  };

  const getWhatsAppUrl = () => {
    const text = 
      currentLang === 'he' ? 'היי אלנה! 💅 ראיתי את ההטבה באתר ואשמח לקבל 10% הנחה לטיפול ראשון ולקבוע תור!' :
      currentLang === 'ru' ? 'Привет, Елена! 💅 Увидела скидку 10% на первый визит и хочу записаться!' :
      'Hi Elena! 💅 I saw the 10% first-time discount on your website and would love to book my appointment!';
    return `https://wa.me/${STUDIO_PHONE}?text=${encodeURIComponent(text)}`;
  };

  const content = {
    he: {
      title: 'פינוק במיוחד בשבילך! ✨',
      subtitle: 'לקוחה חדשה בסטודיו?',
      desc: 'קבלי 10% הנחה על טיפול מניקור או פדיקור פרימיום בביקורך הראשון בסטודיו של אלנה.',
      cta: 'מימוש ההטבה ושיריון תור בוואטסאפ',
      dismiss: 'לא תודה, אולי בפעם אחרת',
      code: 'קוד הטבה: WELCOME10'
    },
    ru: {
      title: 'Подарок специально для вас! ✨',
      subtitle: 'Впервые в нашей студии?',
      desc: 'Получите скидку 10% на премиум маникюр или педикюр при вашем первом визите к Елене.',
      cta: 'Получить скидку и записаться в WhatsApp',
      dismiss: 'Нет, спасибо, в другой раз',
      code: 'Промокод: WELCOME10'
    },
    en: {
      title: 'A Special Treat for You! ✨',
      subtitle: 'First-time client?',
      desc: 'Enjoy 10% OFF your first premium manicure or pedicure treatment at Elena\'s studio.',
      cta: 'Claim 10% Off & Book on WhatsApp',
      dismiss: 'No thanks, maybe next time',
      code: 'Promo Code: WELCOME10'
    }
  };

  const activeContent = content[currentLang] || content.he;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
          {/* Overlay click to close */}
          <div className="absolute inset-0" onClick={handleClose} />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="relative w-full max-w-lg overflow-hidden rounded-[2.5rem] p-8 md:p-12 border border-white/10 text-center shadow-2xl bg-[#0d0d0d] text-white"
            dir={isRtl ? 'rtl' : 'ltr'}
          >
            {/* Background elements */}
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-[#D4AF37]/5 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#D4AF37]/5 rounded-full blur-2xl pointer-events-none" />

            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-6 right-6 p-2 rounded-full text-white/50 hover:text-white hover:bg-white/5 transition-all z-10"
              aria-label="Close popup"
            >
              <X size={20} />
            </button>

            {/* Floating Sparkles Icon */}
            <div className="w-16 h-16 bg-[#D4AF37]/10 rounded-full flex items-center justify-center text-[#D4AF37] mx-auto mb-6 relative">
              <Sparkles className="w-8 h-8 animate-pulse" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#D4AF37] rounded-full animate-ping" />
            </div>

            {/* Content */}
            <h3 className="text-3xl font-bold text-white mb-2 leading-tight" style={{ fontFamily: 'var(--font-heading)' }}>
              {activeContent.title}
            </h3>
            
            <p className="text-[#D4AF37] text-xs uppercase tracking-widest font-bold mb-4">
              {activeContent.subtitle}
            </p>

            <p className="text-white/80 text-sm leading-relaxed mb-6 font-light">
              {activeContent.desc}
            </p>

            <div className="inline-block bg-white/5 border border-white/10 rounded-full px-5 py-2 mb-8 text-xs font-bold text-[#D4AF37] tracking-widest uppercase">
              {activeContent.code}
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noreferrer"
                onClick={handleClose}
                className="btn-premium w-full inline-flex items-center justify-center gap-3 py-4 shimmer-gold font-bold text-sm tracking-wide bg-[#D4AF37] text-dark hover:bg-white transition-all"
              >
                <span>{activeContent.cta}</span>
                <MessageCircle size={18} />
              </a>

              <button
                onClick={handleClose}
                className="text-xs text-white/40 hover:text-white transition-colors py-2 block mx-auto underline underline-offset-4"
              >
                {activeContent.dismiss}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
