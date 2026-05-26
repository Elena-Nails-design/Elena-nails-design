import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ShieldAlert } from 'lucide-react';

export default function CookieConsent() {
  const { t, i18n } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const isRtl = i18n.dir() === 'rtl';

  useEffect(() => {
    // Check if user has already made a choice
    const choice = localStorage.getItem('cookie-consent-choice');
    if (!choice) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1500); // 1.5 seconds delay before appearing
      return () => clearTimeout(timer);
    }
  }, []);

  const handleChoice = (choice) => {
    localStorage.setItem('cookie-consent-choice', choice);
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed bottom-6 left-6 right-6 md:left-auto md:max-w-lg z-[9999]"
          dir={isRtl ? 'rtl' : 'ltr'}
        >
          <div className="glass-luxury rounded-3xl p-6 md:p-8 border border-white/20 dark:border-white/10 shadow-2xl flex flex-col gap-5 relative overflow-hidden">
            {/* Ambient gold glow */}
            <div className="absolute -right-16 -top-16 w-32 h-32 bg-primary/10 rounded-full blur-2xl pointer-events-none" />
            
            {/* Header info */}
            <div className="flex items-start gap-4">
              <div className="p-3 bg-primary/20 dark:bg-primary-dark/20 text-primary dark:text-primary-dark rounded-2xl shrink-0 mt-0.5">
                <ShieldAlert size={20} />
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-dark dark:text-white text-base tracking-wide leading-tight">
                  {t('cookie_consent.title')}
                </h4>
                <p className="text-xs text-text-secondary dark:text-text-secondary-dark leading-relaxed font-light mt-1.5">
                  {t('cookie_consent.desc')}
                </p>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-3 w-full justify-end pt-2">
              <button
                onClick={() => handleChoice('declined')}
                className="px-5 py-2.5 rounded-full border border-black/10 dark:border-white/10 text-xs font-bold uppercase tracking-wider text-dark/60 dark:text-white/60 hover:bg-black/5 dark:hover:bg-white/5 transition-all active:scale-95"
              >
                {t('cookie_consent.decline')}
              </button>
              <button
                onClick={() => handleChoice('accepted')}
                className="px-6 py-2.5 rounded-full bg-dark text-white dark:bg-primary-dark dark:text-dark text-xs font-bold uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-md"
              >
                {t('cookie_consent.accept')}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
