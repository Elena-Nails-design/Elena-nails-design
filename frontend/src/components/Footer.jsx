import { Scissors, MessageCircle, Share2, MapPin, Phone, Clock } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-nude dark:bg-gray-900 border-t border-white dark:border-gray-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 text-primary dark:text-primary-dark font-bold text-2xl tracking-wide" style={{ fontFamily: 'var(--font-heading)' }}>
              <Scissors className="w-7 h-7" />
              <span>{t('nav.logo_text')}</span>
            </div>
            <p className="text-dark dark:text-gray-300 text-sm">
              {t('footer.subtitle')}
            </p>
            <div className="flex gap-4 mt-2">
              <a href="#" className="bg-white dark:bg-gray-800 p-3 rounded-full text-primary hover:text-primary-dark hover:scale-110 transition-all shadow-sm dark:shadow-gray-900">
                <MessageCircle className="w-5 h-5" />
              </a>
              <a href="#" className="bg-white dark:bg-gray-800 p-3 rounded-full text-primary hover:text-primary-dark hover:scale-110 transition-all shadow-sm dark:shadow-gray-900">
                <Share2 className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-bold text-primary dark:text-primary-dark uppercase tracking-wider" style={{ fontFamily: 'var(--font-heading)' }}>{t('footer.contact_title')}</h3>
            <ul className="space-y-3 text-sm text-dark dark:text-gray-300">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 text-primary shrink-0" />
                <span>{t('footer.address')}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary shrink-0" />
                <span dir="ltr">+972-50-123-4567</span>
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-bold text-primary dark:text-primary-dark uppercase tracking-wider" style={{ fontFamily: 'var(--font-heading)' }}>{t('footer.hours_title')}</h3>
            <ul className="space-y-2 text-sm text-dark dark:text-gray-300">
              <li className="flex items-start gap-2">
                <Clock className="w-4 h-4 mt-0.5 text-primary shrink-0" />
                <div className="flex flex-col">
                  <span>{t('footer.sun_thu')}</span>
                  <span>{t('footer.fri')}</span>
                  <span>{t('footer.sat')}</span>
                </div>
              </li>
            </ul>
          </div>

        </div>
        
        <div className="border-t border-primary/20 dark:border-gray-800 mt-8 pt-8 text-center text-dark dark:text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} {t('nav.logo_text')}. {t('footer.rights')}</p>
        </div>
      </div>
    </footer>
  );
}
