import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Instagram, ExternalLink } from 'lucide-react';
import instagramData from '../data/instagram.json';

export default function Gallery() {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() === 'rtl';
  const [hoveredId, setHoveredId] = useState(null);

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    show: { 
      opacity: 1, 
      scale: 1, 
      y: 0, 
      transition: { 
        duration: 0.8, 
        ease: [0.22, 1, 0.36, 1] 
      } 
    }
  };

  return (
    <div className="py-24 bg-white dark:bg-[#0A0A0A] min-h-screen transition-colors duration-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="text-center mb-24"
        >
          <span className="text-primary dark:text-primary-dark tracking-[0.5em] uppercase text-[10px] font-bold mb-6 block">
            {t('gallery.subtitle') || "Style Showcase"}
          </span>
          <h1 className="text-6xl md:text-8xl font-bold text-dark dark:text-white tracking-tighter mb-10 font-playfair">
            {t('gallery.title')}
          </h1>
          <div className="w-32 h-[1px] bg-primary/30 mx-auto mb-10" />
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-dark/70 dark:text-white/60 font-light leading-relaxed italic font-serif">
            {i18n.language === 'he' ? 'עקבי אחרינו באינסטגרם כדי לראות את העבודות הכי חדשות שלנו' :
              i18n.language === 'ru' ? 'Подписывайтесь на наш Instagram, чтобы видеть наши последние работы' :
                'Follow us on Instagram to see our latest works'}
          </p>
        </motion.div>

        {/* Custom Instagram Grid */}
        {instagramData && instagramData.length > 0 ? (
          <motion.div 
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10"
          >
            {instagramData.map((post) => (
              <motion.div
                key={post.id}
                variants={item}
                className="group relative aspect-[4/5] overflow-hidden bg-gray-50 dark:bg-dark/40 shadow-2xl"
                onMouseEnter={() => setHoveredId(post.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <a 
                  href={post.permalink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block w-full h-full"
                >
                  <img 
                    src={post.media_url} 
                    alt={post.caption || 'Instagram post'}
                    className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110"
                    loading="lazy"
                  />
                  
                  {/* Premium Hover Overlay */}
                  <div className={`absolute inset-0 bg-dark/70 backdrop-blur-[2px] flex flex-col items-center justify-center transition-all duration-700 ease-in-out ${hoveredId === post.id ? 'opacity-100' : 'opacity-0'}`}>
                    <div className="p-8 text-center transform transition-transform duration-700 translate-y-8 group-hover:translate-y-0">
                      <Instagram className="w-12 h-12 text-primary-dark mx-auto mb-6 opacity-80" />
                      <p className="text-white/90 text-sm font-light mb-8 line-clamp-3 leading-relaxed">
                        {post.caption}
                      </p>
                      <div className="inline-block py-3 px-6 border border-primary/40 text-primary-dark text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-primary hover:text-dark transition-all duration-500">
                        {i18n.language === 'he' ? 'צפי באינסטגרם' : i18n.language === 'ru' ? 'Смотреть в Instagram' : 'View on Instagram'}
                      </div>
                    </div>
                  </div>
                </a>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          /* Elegant Empty State / Initial Loading */
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-32 text-center rounded-3xl bg-secondary/5 dark:bg-white/5 border border-dark/5 dark:border-white/5 backdrop-blur-sm"
          >
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-8 animate-pulse text-primary">
              <Instagram className="w-10 h-10" />
            </div>
            <p className="text-dark/50 dark:text-white/40 mb-10 italic text-xl font-light">
              {i18n.language === 'he' ? 'הגלריה בטעינה ראשונית...' : 'Gallery is arriving shortly...'}
            </p>
            <a 
              href="https://instagram.com/elena_epshtein_nail_studio" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-premium flex items-center gap-4 px-10 py-4 shadow-luxury"
            >
              <ExternalLink className="w-4 h-4" />
              <span className="text-sm tracking-widest">{i18n.language === 'he' ? 'בקרי אותנו באינסטגרם' : 'Visit our Instagram'}</span>
            </a>
          </motion.div>
        )}
      </div>

      {/* ★ Luxury CTA Section */}
      <div className="mt-40 py-32 bg-dark dark:bg-[#030303] text-center relative overflow-hidden border-t border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,rgba(212,175,55,0.1)_0%,transparent_60%)]" />
        <div className="relative z-10 max-w-3xl mx-auto px-4">
          <span className="text-primary uppercase tracking-[0.5em] text-[11px] font-bold mb-8 block opacity-80">
            {i18n.language === 'he' ? 'אהבת מה שראית?' : i18n.language === 'ru' ? 'Понравилось?' : 'Love what you see?'}
          </span>
          <h2 className="text-white/90 text-3xl md:text-5xl font-light italic mb-16 leading-tight font-serif">
            {i18n.language === 'he' ? 'קבעי תור ותקבלי את אותה רמה של דיוק ויופי' : i18n.language === 'ru' ? 'Запишитесь и получите тот же уровень точности и красоты' : 'Book an appointment and get that same level of precision and beauty'}
          </h2>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block">
            <Link to="/booking" className="btn-premium inline-flex items-center gap-8 px-12 py-6 shimmer-gold group shadow-2xl">
              <span className="text-sm tracking-[0.3em] font-bold">{t('home.book_now')}</span>
              <div className="w-10 h-10 flex items-center justify-center bg-white/5 rounded-full group-hover:bg-primary transition-all duration-500">
                {isRtl ? <ChevronLeft className="w-5 h-5 text-primary group-hover:text-dark" /> : <ChevronRight className="w-5 h-5 text-primary group-hover:text-dark" />}
              </div>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
