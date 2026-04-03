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
      <section className="relative h-screen flex items-center justify-center bg-dark overflow-hidden">
        {/* Cinematic Video Background */}
        <div className="absolute inset-0 z-0">
          <video 
            src={`${import.meta.env.BASE_URL}assets/nails_epshtein/AQP9V0mme-uDwapBpUMH2MIlzpyh1jxvH8zBBR6UZq38ewW_hxFeDh1Ce_CDyCc5rnMxAhAz3fIDl2RdLuEaMLdmB7u1KqmaTJNWJ1w.mp4`} 
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-60 scale-110"
          />
          {/* Custom Luxury Overlay */}
          <div className="absolute inset-0 hero-overlay" />
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <span className="inline-block text-primary dark:text-primary-dark tracking-widest uppercase text-sm font-bold mb-6 bg-white/10 backdrop-blur-md px-6 py-2 rounded-full border border-white/10">
              {t('home.welcome_badge') || "Premium Beauty Studio"}
            </span>
            <h1 
              className="text-5xl md:text-8xl font-bold text-white mb-8 leading-[1.1] tracking-tight"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {t('home.hero_title')}
            </h1>
            <p className="text-lg md:text-2xl text-white/80 mb-12 font-light max-w-2xl mx-auto leading-relaxed italic">
              {t('home.hero_subtitle')}
            </p>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link 
                to="/booking" 
                className="btn-premium inline-flex items-center gap-4 group"
              >
                <span>{t('home.book_now')}</span>
                <motion.div
                  animate={{ x: isRtl ? [-5, 0, -5] : [5, 0, 5] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  {isRtl ? <ArrowLeft className="w-5 h-5" /> : <ArrowRight className="w-5 h-5" />}
                </motion.div>
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-white/40 text-[10px] tracking-widest uppercase">Scroll</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-white/40 to-transparent" />
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-32 bg-white dark:bg-[#0A0A0A] transition-colors duration-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-center mb-24"
          >
            <h2 className="text-4xl md:text-6xl font-bold text-dark dark:text-white mb-8 tracking-luxury">
              {t('home.features.title') || t('home.why_us')}
            </h2>
            <div className="w-24 h-[2px] bg-primary mx-auto rounded-full"></div>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {[
              { title: t('home.quality_title'), desc: t('home.quality_desc'), icon: "✨" },
              { title: t('home.hygiene_title'), desc: t('home.hygiene_desc'), icon: "🛡️" },
              { title: t('home.atmosphere_title'), desc: t('home.atmosphere_desc'), icon: "🕯️" }
            ].map((feature, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.7, delay: idx * 0.2 }}
                className="group relative text-center"
              >
                <div className="text-4xl mb-8 transform group-hover:scale-125 transition-transform duration-500">{feature.icon}</div>
                <h3 className="text-2xl font-bold text-dark dark:text-light mb-6 tracking-wide">{feature.title}</h3>
                <p className="text-text-secondary dark:text-text-secondary-dark leading-relaxed font-light text-lg italic">
                  "{feature.desc}"
                </p>
                <div className="absolute -inset-4 border border-primary/0 group-hover:border-primary/20 rounded-[2rem] transition-all duration-500" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
