import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, X, Scissors } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

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
    <nav className="sticky top-0 z-50 glass dark:bg-gray-900/80 border-b border-nude dark:border-gray-800 shadow-sm transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 text-primary dark:text-primary-dark font-bold text-2xl tracking-wide shrink-0" style={{ fontFamily: 'var(--font-heading)' }}>
            <Scissors className="w-7 h-7" />
            <span>{t('nav.logo_text')}</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`transition-colors font-medium ${
                  location.pathname === link.path 
                    ? 'text-primary-dark dark:text-primary drop-shadow-sm' 
                    : 'text-dark dark:text-white hover:text-primary-dark dark:hover:text-primary'
                }`}
              >
                {link.name}
              </Link>
            ))}

            {/* Language Switcher & Theme */}
            <div className="flex items-center gap-2 ms-4 border-s border-gray-300 dark:border-gray-700 ps-4">
              <button onClick={() => changeLanguage('he')} className={i18n.language === 'he' ? 'font-bold text-primary-dark dark:text-primary' : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors'}>HE</button>
              <button onClick={() => changeLanguage('ru')} className={i18n.language === 'ru' ? 'font-bold text-primary-dark dark:text-primary' : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors'}>RU</button>
              <button onClick={() => changeLanguage('en')} className={i18n.language === 'en' ? 'font-bold text-primary-dark dark:text-primary' : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors'}>EN</button>
              <div className="ms-2 border-s border-gray-300 dark:border-gray-700 ps-2">
                <ThemeToggle />
              </div>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-dark dark:text-gray-200 hover:text-primary-dark transition-colors p-2"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white dark:bg-gray-900 border-b border-nude dark:border-gray-800 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {links.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-2 rounded-md text-base font-medium text-start ${
                    location.pathname === link.path
                      ? 'bg-nude dark:bg-gray-800 text-primary-dark'
                      : 'text-dark dark:text-gray-200 hover:bg-nude-dark dark:hover:bg-gray-800 hover:text-primary-dark transition-colors'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4 flex gap-4 px-3 justify-start">
                <button onClick={() => changeLanguage('he')} className={i18n.language === 'he' ? 'font-bold text-primary-dark dark:text-primary' : 'text-gray-500 dark:text-gray-400'}>HE</button>
                <button onClick={() => changeLanguage('ru')} className={i18n.language === 'ru' ? 'font-bold text-primary-dark dark:text-primary' : 'text-gray-500 dark:text-gray-400'}>RU</button>
                <button onClick={() => changeLanguage('en')} className={i18n.language === 'en' ? 'font-bold text-primary-dark dark:text-primary' : 'text-gray-500 dark:text-gray-400'}>EN</button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
