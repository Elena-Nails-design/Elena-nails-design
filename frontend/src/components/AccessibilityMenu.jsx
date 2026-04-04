import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Accessibility, X, Type, Contrast, MousePointer2, ZapOff, Check } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function AccessibilityMenu() {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState({
    highContrast: false,
    largeText: false,
    underlineLinks: false,
    stopAnimations: false
  });

  const toggleSetting = (key) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  useEffect(() => {
    const html = document.documentElement;
    if (settings.highContrast) html.classList.add('high-contrast');
    else html.classList.remove('high-contrast');

    if (settings.largeText) html.classList.add('large-text');
    else html.classList.remove('large-text');

    if (settings.underlineLinks) html.classList.add('underline-links');
    else html.classList.remove('underline-links');

    if (settings.stopAnimations) html.classList.add('stop-animations');
    else html.classList.remove('stop-animations');
  }, [settings]);

  // Handle Escape key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  const menuOptions = [
    { 
      key: 'highContrast', 
      icon: <Contrast size={20} />, 
      label: t('accessibility.highContrast') 
    },
    { 
      key: 'largeText', 
      icon: <Type size={20} />, 
      label: t('accessibility.largeText') 
    },
    { 
      key: 'underlineLinks', 
      icon: <MousePointer2 size={20} />, 
      label: t('accessibility.underlineLinks') 
    },
    { 
      key: 'stopAnimations', 
      icon: <ZapOff size={20} />, 
      label: t('accessibility.stopAnimations') 
    }
  ];

  return (
    <div className="fixed top-1/2 -translate-y-1/2 right-0 z-[9998] flex items-center">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? t('accessibility.close') : t('accessibility.open')}
        aria-expanded={isOpen}
        initial={false}
        animate={{ 
          x: isOpen ? -10 : 20, // Slide out a bit more when closed
          scale: 1 
        }}
        whileHover={{ x: 0 }}
        className="w-14 h-14 rounded-l-2xl bg-gold text-white shadow-luxury flex items-center justify-center hover:bg-gold/90 transition-colors pr-2"
      >
        {isOpen ? <X size={24} /> : <Accessibility size={24} />}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 20, transformOrigin: 'right center' }}
            animate={{ opacity: 1, scale: 1, x: -64 }} // Move away from the button
            exit={{ opacity: 0, scale: 0.9, x: 20 }}
            className="absolute right-0 w-72 bg-white dark:bg-stone-900 rounded-3xl shadow-2xl border border-black/5 dark:border-white/5 p-6 space-y-4 overflow-hidden"
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-bold text-sm tracking-widest uppercase text-dark dark:text-white">
                {t('accessibility.title')}
              </h3>
              <Accessibility size={16} className="text-gold" />
            </div>

            <div className="space-y-2">
              {menuOptions.map((opt) => (
                <button
                  key={opt.key}
                  onClick={() => toggleSetting(opt.key)}
                  className={`w-full flex items-center justify-between p-3 rounded-xl transition-all ${
                    settings[opt.key] 
                      ? 'bg-gold text-white shadow-md' 
                      : 'bg-gray-50 dark:bg-stone-800 text-dark/70 dark:text-white/70 hover:bg-gray-100 dark:hover:bg-stone-750'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {opt.icon}
                    <span className="text-xs font-bold uppercase tracking-wider">
                      {opt.label}
                    </span>
                  </div>
                  {settings[opt.key] && <Check size={16} />}
                </button>
              ))}
            </div>

            <button
              onClick={() => setSettings({
                highContrast: false,
                largeText: false,
                underlineLinks: false,
                stopAnimations: false
              })}
              className="w-full py-3 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 hover:text-dark dark:hover:text-white transition-colors border-t border-black/5 dark:border-white/5 pt-4"
            >
              {t('accessibility.reset')}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
