import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const { t } = useTranslation();

  return (
    <button
      onClick={toggleTheme}
      className="relative flex items-center justify-center p-2 text-gray-500 hover:text-primary-dark transition-colors rounded-full focus:outline-none focus:ring-2 focus:ring-primary/50"
      aria-label={theme === 'dark' ? t('theme.light_mode') : t('theme.dark_mode')}
      title={theme === 'dark' ? t('theme.light_mode') : t('theme.dark_mode')}
    >
      <motion.div
        initial={false}
        animate={{ rotate: theme === 'dark' ? 180 : 0, scale: theme === 'dark' ? 0 : 1 }}
        transition={{ duration: 0.3 }}
        className="absolute"
      >
        <Sun className="w-5 h-5" />
      </motion.div>
      <motion.div
        initial={false}
        animate={{ rotate: theme === 'dark' ? 0 : -180, scale: theme === 'dark' ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <Moon className="w-5 h-5 text-gray-200" />
      </motion.div>
    </button>
  );
}
