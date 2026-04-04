import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, X, Scissors } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from './ThemeToggle';

import Logo from './Logo';

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const links = [
    { name: t('nav.home'), path: '/' },
    { name: t('nav.about'), path: '/about' },
    { name: t('nav.services'), path: '/services' },
    { name: t('nav.gallery'), path: '/gallery' },
    { name: t('nav.booking'), path: '/booking' },
    { name: t('nav.contact'), path: '/contact' },
  ];

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setIsOpen(false);
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex flex-col">
      {/* Announcement Bar */}
      <div className="bg-dark dark:bg-primary-dark text-white dark:text-dark text-center text-[10px] md:text-xs py-2 font-bold tracking-widest border-b border-white/10 dark:border-dark/10">
        <span className="flex items-center justify-center gap-1 md:gap-2">
          <span className="text-[14px]">🎁</span> {i18n.language === 'he' ? '10% הנחה לטיפול ראשון במיוחד בשבילך! לקביעת תור' : i18n.language === 'ru' ? 'Скидка 10% на первую процедуру!' : '10% off your first treatment!'} 
          <Link to="/booking" className="underline underline-offset-4 ms-1 hover:text-primary transition-colors">{i18n.language === 'he' ? 'לחצי כאן' : i18n.language === 'ru' ? 'Нажми сюда' : 'Click Here'}</Link>
        </span>
      </div>

      <nav 
        className={`transition-all duration-500 ease-in-out border-b ${
          isOpen 
            ? 'bg-dark dark:bg-[#0A0A0A] py-4 border-white/10'
            : isScrolled
              ? 'glass-luxury py-4 shadow-xl border-black/5 dark:border-white/10' 
              : 'bg-transparent py-5 border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20 transition-all duration-500">
          {/* Logo - Force white when menu is open */}
          <Link 
            to="/" 
            className="flex items-center transition-transform duration-500 hover:scale-105 shrink-0" 
            onClick={() => setIsOpen(false)}
          >
            <div className={isOpen ? 'dark' : ''}>
              <Logo className="h-12 md:h-16 w-auto" scrolled={isScrolled} />
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className={`hidden md:flex items-center ${i18n.language === 'ru' ? 'gap-4 lg:gap-8' : 'gap-6 lg:gap-10'}`}>
            <div className="flex items-center gap-4 lg:gap-8">
              {links.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`nav-link-fancy uppercase font-semibold transition-all duration-300 ${
                    i18n.language === 'ru' ? 'text-[10px] tracking-tight' : 'text-[11px] lg:text-xs tracking-widest'
                  } ${
                    location.pathname === link.path 
                      ? 'text-primary-dark dark:text-primary active-link-fancy' 
                      : 'text-dark/70 dark:text-white/70 hover:text-dark dark:hover:text-white'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Language & Theme */}
            <div className={`flex items-center gap-4 border-s border-dark/10 dark:border-white/10 ${i18n.language === 'ru' ? 'ps-4' : 'ps-8'}`}>
              <div className="flex gap-3">
                {['he', 'ru', 'en'].map((lng) => (
                  <button 
                    key={lng}
                    onClick={() => changeLanguage(lng)} 
                    className={`text-[10px] font-bold tracking-widest transition-all duration-300 px-3 py-1.5 rounded-full border ${
                      i18n.language === lng 
                        ? 'bg-dark text-white border-dark dark:bg-primary-dark dark:text-dark dark:border-primary-dark shadow-md scale-110' 
                        : 'text-dark/40 border-dark/10 dark:text-white/40 dark:border-white/10 hover:border-dark/30 dark:hover:border-white/30'
                    }`}
                  >
                    {lng.toUpperCase()}
                  </button>
                ))}
              </div>
              <div className="ms-2 scale-90">
                <ThemeToggle />
              </div>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center gap-2 md:hidden">
            {/* Compact language switcher visible on mobile */}
            <div className="flex gap-1">
              {['he', 'ru', 'en'].map((lng) => (
                <button
                  key={lng}
                  onClick={() => changeLanguage(lng)}
                  className={`text-[9px] font-bold tracking-widest px-2 py-1 rounded-full border transition-all duration-300 ${
                    i18n.language === lng
                      ? 'bg-primary-dark text-dark border-primary-dark'
                      : isOpen 
                        ? 'text-white/40 border-white/10' 
                        : 'text-dark/40 border-dark/10 dark:text-white/40 dark:border-white/10'
                  }`}
                >
                  {lng.toUpperCase()}
                </button>
              ))}
            </div>
            <div className={isOpen ? 'text-white' : ''}>
              <ThemeToggle />
            </div>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 transition-colors ${isOpen ? 'text-white' : 'text-dark dark:text-white'}`}
              aria-label={isOpen ? "סגור תפריט" : "פתח תפריט"}
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                    <X className="w-8 h-8" />
                  </motion.div>
                ) : (
                  <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
                    <Menu className="w-8 h-8" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 top-[112px] md:hidden bg-dark dark:bg-[#0A0A0A] z-[40] overflow-y-auto"
          >
            <div className="flex flex-col items-center pt-20 pb-32 space-y-10 px-6 text-center h-full">
              {links.map((link, i) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="w-full"
                >
                  <Link
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`block text-3xl tracking-widest uppercase font-playfair transition-all duration-300 ${
                      location.pathname === link.path
                        ? 'text-primary-dark scale-110 font-bold'
                        : 'text-white/60 hover:text-white'
                    }`}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
    </div>
  );
}
