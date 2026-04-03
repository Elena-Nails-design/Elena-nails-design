import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Star, ArrowLeft, ArrowRight } from 'lucide-react';

export default function Home() {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() === 'rtl';

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center bg-nude overflow-hidden">
        <div className="absolute inset-0 z-0 bg-black/10">
          <video 
            src={`${import.meta.env.BASE_URL}assets/nails_epshtein/AQP9V0mme-uDwapBpUMH2MIlzpyh1jxvH8zBBR6UZq38ewW_hxFeDh1Ce_CDyCc5rnMxAhAz3fIDl2RdLuEaMLdmB7u1KqmaTJNWJ1w.mp4`} 
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-40 mix-blend-overlay"
          />
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold text-dark dark:text-light mb-6 leading-tight tracking-wide"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            {t('home.hero_title')}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-2xl text-dark/90 dark:text-light/90 mb-10 font-light"
          >
            {t('home.hero_subtitle')}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Link 
              to="/booking" 
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark dark:bg-primary-dark dark:hover:bg-primary text-dark font-semibold py-4 px-10 rounded-full transition-all shadow-md hover:shadow-xl transform hover:-translate-y-1 hover:scale-105"
            >
              <span>{t('home.book_now')}</span>
              {isRtl ? <ArrowLeft className="w-5 h-5" /> : <ArrowRight className="w-5 h-5" />}
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-nude dark:bg-gray-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl font-bold text-dark dark:text-white mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
              {t('home.features.title') || t('home.why_us')}
            </h2>
            <div className="w-16 h-1 bg-gold mx-auto rounded-full"></div>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { title: t('home.quality_title'), desc: t('home.quality_desc') },
              { title: t('home.hygiene_title'), desc: t('home.hygiene_desc') },
              { title: t('home.atmosphere_title'), desc: t('home.atmosphere_desc') }
            ].map((feature, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                whileHover={{ y: -8 }}
                className="bg-white dark:bg-gray-900 rounded-[2rem] p-10 text-center shadow-sm hover:shadow-xl transition-all border border-nude dark:border-gray-800"
              >
                <div className="w-20 h-20 mx-auto bg-nude dark:bg-gray-800 text-gold rounded-full flex items-center justify-center mb-8 shadow-inner">
                  <Star className="w-8 h-8 fill-current" />
                </div>
                <h3 className="text-2xl font-bold text-dark dark:text-light mb-4" style={{ fontFamily: 'var(--font-heading)' }}>{feature.title}</h3>
                <p className="text-text-secondary dark:text-text-secondary-dark leading-relaxed font-light">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
