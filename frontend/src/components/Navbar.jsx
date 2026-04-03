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
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out border-b ${
        isScrolled 
          ? 'glass-luxury py-4 shadow-xl border-black/5 dark:border-white/10' 
          : 'bg-transparent py-5 border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20 transition-all duration-500">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center transition-transform duration-500 hover:scale-105 shrink-0" 
          >
            <Logo className="h-14 md:h-16 w-auto" scrolled={isScrolled} />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-10">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`nav-link-fancy text-xs uppercase tracking-widest font-semibold transition-all duration-300 ${
                  location.pathname === link.path 
                    ? 'text-primary-dark dark:text-primary active-link-fancy' 
                    : 'text-dark/70 dark:text-white/70 hover:text-dark dark:hover:text-white'
                }`}
              >
                {link.name}
              </Link>
            ))}

            {/* Language & Theme */}
            <div className="flex items-center gap-4 ms-4 border-s border-dark/10 dark:border-white/10 ps-8">
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
          <div className="flex items-center gap-3 md:hidden">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-dark dark:text-white p-2"
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div key="close" initial={{ rotate: -90 }} animate={{ rotate: 0 }} exit={{ rotate: 90 }}>
                    <X className="w-7 h-7" />
                  </motion.div>
                ) : (
                  <motion.div key="menu" initial={{ rotate: 90 }} animate={{ rotate: 0 }} exit={{ rotate: -90 }}>
                    <Menu className="w-7 h-7" />
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
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 top-[88px] md:hidden bg-white/95 dark:bg-dark/95 backdrop-blur-2xl z-40"
          >
            <div className="flex flex-col items-center justify-center h-full space-y-8 px-6 text-center">
              {links.map((link, i) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`block text-2xl tracking-widest uppercase font-playfair transition-colors ${
                      location.pathname === link.path
                        ? 'text-primary-dark dark:text-primary scale-110'
                        : 'text-dark/40 dark:text-white/40'
                    }`}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              
              <div className="pt-12 flex gap-8">
                {['he', 'ru', 'en'].map((lng) => (
                  <button 
                    key={lng}
                    onClick={() => changeLanguage(lng)} 
                    className={`text-sm font-bold tracking-widest ${
                      i18n.language === lng ? 'text-primary-dark dark:text-primary underline underline-offset-8' : 'text-dark/40 dark:text-white/40'
                    }`}
                  >
                    {lng.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
