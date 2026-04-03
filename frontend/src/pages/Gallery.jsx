import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Gallery() {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() === 'rtl';

  useEffect(() => {
    // Load Elfsight Platform Script
    const script = document.createElement('script');
    script.src = "https://elfsightcdn.com/platform.js";
    script.async = true;
    document.body.appendChild(script);

    // Hack to hide Elfsight title and branding inside its Shadow DOM
    const hideTitleInterval = setInterval(() => {
      const widget = document.querySelector('.elfsight-app-3dd90e71-9dc2-4a31-b149-946ad464c73f');
      
      // Force stealth hide any elements globally just in case
      document.querySelectorAll('a[href*="elfsight.com"], .eapps-widget-toolbar').forEach(el => {
        el.style.setProperty('opacity', '0', 'important');
        el.style.setProperty('pointer-events', 'none', 'important');
        el.style.setProperty('width', '0', 'important');
        el.style.setProperty('height', '0', 'important');
        el.style.setProperty('position', 'absolute', 'important');
        el.style.setProperty('z-index', '-9999', 'important');
        el.style.setProperty('overflow', 'hidden', 'important');
      });

      if (widget && widget.shadowRoot) {
        // 1. Inject CSS for structural elements
        if (!widget.shadowRoot.querySelector('#hide-elfsight-title')) {
          const style = document.createElement('style');
          style.id = 'hide-elfsight-title';
          style.innerHTML = `
            .eui-widget-title,
            .es-widget-title,
            .eapps-instagram-feed-title,
            .eapps-instagram-feed-header,
            .eapps-widget-toolbar {
              display: none !important;
            }
          `;
          widget.shadowRoot.appendChild(style);
        }

        // 2. Stealth hide badges with inline !important styles (Ninja mode)
        const badElements = widget.shadowRoot.querySelectorAll('a[href*="elfsight.com"], .eapps-widget-toolbar');
        badElements.forEach(el => {
          el.style.setProperty('opacity', '0', 'important');
          el.style.setProperty('pointer-events', 'none', 'important');
          el.style.setProperty('width', '0', 'important');
          el.style.setProperty('height', '0', 'important');
          el.style.setProperty('position', 'absolute', 'important');
          el.style.setProperty('z-index', '-9999', 'important');
          el.style.setProperty('overflow', 'hidden', 'important');
        });
      }
    }, 500);

    return () => {
      clearInterval(hideTitleInterval);
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="py-24 bg-white dark:bg-[#0A0A0A] min-h-screen transition-colors duration-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center mb-16"
        >
          <span className="text-primary dark:text-primary-dark tracking-widest uppercase text-xs font-bold mb-4 block">
            {t('gallery.subtitle') || "Style Showcase"}
          </span>
          <h1 className="text-5xl md:text-7xl font-bold text-dark dark:text-white tracking-luxury">
            {t('gallery.title')}
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg text-dark/70 dark:text-white/70 italic">
            {i18n.language === 'he' ? 'עקבי אחרינו באינסטגרם כדי לראות את העבודות הכי חדשות שלנו' :
              i18n.language === 'ru' ? 'Подписывайтесь на наш Instagram, чтобы видеть наши последние работы' :
                'Follow us on Instagram to see our latest works'}
          </p>
        </motion.div>

        {/* Elfsight Instagram Widget */}
        <div className="w-full relative flex justify-center min-h-[600px] items-start">
          {/* Inject CSS to hide the Elfsight watermark and title */}
          <style>
            {`
              a[href*="elfsight.com"], 
              .eapps-link,
              .eui-widget-title,
              .eapps-instagram-feed-title {
                display: none !important;
              }
            `}
          </style>

          <div className="text-center absolute pointer-events-none opacity-50 text-sm z-0 top-20">
            {/* Fallback text while loading or if ID is missing */}
            {i18n.language === 'he' ? 'טוען גלריית אינסטגרם...' : 'Loading Instagram Gallery...'}
          </div>

          <div className="elfsight-app-3dd90e71-9dc2-4a31-b149-946ad464c73f w-full z-10 relative" data-elfsight-app-lazy></div>
        </div>
      </div>

      {/* ★ CTA Section */}
      <div className="mt-24 py-20 bg-dark text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.08)_0%,transparent_70%)]" />
        <div className="relative z-10 max-w-2xl mx-auto px-4">
          <span className="text-primary uppercase tracking-[0.4em] text-xs font-bold mb-4 block">
            {i18n.language === 'he' ? 'אהבת מה שראית?' : i18n.language === 'ru' ? 'Понравилось?' : 'Love what you see?'}
          </span>
          <p className="text-white/70 text-xl md:text-2xl font-light italic mb-10 leading-relaxed">
            {i18n.language === 'he' ? 'קבעי תור ותקבלי את אותה רמה של דיוק ויופי' : i18n.language === 'ru' ? 'Запишитесь и получите тот же уровень точности и красоты' : 'Book an appointment and get that same level of precision and beauty'}
          </p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block">
            <Link to="/booking" className="btn-premium inline-flex items-center gap-4 shimmer-gold">
              <span>{t('home.book_now')}</span>
              {isRtl ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
