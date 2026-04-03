import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ArrowLeft, ArrowRight, Sparkles, ShieldCheck, Waves } from 'lucide-react';
import Reveal from '../components/Reveal';

export default function Home() {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() === 'rtl';
  
  // Parallax Effect
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <div className="flex flex-col overflow-hidden">
      {/* Hero Section */}
      <section ref={targetRef} className="relative h-screen flex items-center justify-center bg-dark overflow-hidden">
        {/* Cinematic Video Background with Parallax */}
        <motion.div style={{ y }} className="absolute inset-0 z-0">
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
        </motion.div>
        
        <motion.div style={{ opacity }} className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <Reveal delay={0.2} y={30}>
            <span className="inline-block text-primary dark:text-primary-dark tracking-widest uppercase text-[10px] md:text-sm font-bold mb-6 bg-white/5 backdrop-blur-xl px-6 py-2 rounded-full border border-white/10 shadow-luxury">
              {t('home.welcome_badge') || "Premium Beauty Studio"}
            </span>
          </Reveal>

          <Reveal delay={0.4}>
            <h1 
              className="text-5xl md:text-8xl font-bold text-white mb-8 leading-[1.1] tracking-tight drop-shadow-2xl"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {t('home.hero_title')}
            </h1>
          </Reveal>

          <Reveal delay={0.6}>
            <p className="text-lg md:text-2xl text-white/80 mb-12 font-light max-w-2xl mx-auto leading-relaxed italic drop-shadow-lg">
              {t('home.hero_subtitle')}
            </p>
          </Reveal>
          
          <Reveal delay={0.8} y={20}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link 
                to="/booking" 
                className="btn-premium inline-flex items-center gap-4 group shimmer-gold"
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
          </Reveal>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-white/40 text-[10px] tracking-widest uppercase">Scroll</span>
          <motion.div 
            animate={{ height: [0, 48, 0], y: [0, 0, 48] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="w-[1px] bg-gradient-to-b from-primary to-transparent" 
          />
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-32 bg-white dark:bg-[#050505] transition-colors duration-700 relative overflow-hidden">
        {/* Subtle background texture */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:40px_40px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Reveal delay={0.1} width="100%">
            <div className="text-center mb-24">
              <span className="text-primary uppercase tracking-[.4em] text-xs font-bold mb-4 block">
                Excellence
              </span>
              <h2 className="text-4xl md:text-6xl font-bold text-dark dark:text-white mb-8 tracking-luxury">
                {t('home.features.title') || t('home.why_us')}
              </h2>
              <div className="w-24 h-[2px] bg-primary mx-auto rounded-full"></div>
            </div>
          </Reveal>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20">
            {[
              { title: t('home.quality_title'), desc: t('home.quality_desc'), icon: <Sparkles />, delay: 0.2 },
              { title: t('home.hygiene_title'), desc: t('home.hygiene_desc'), icon: <ShieldCheck />, delay: 0.4 },
              { title: t('home.atmosphere_title'), desc: t('home.atmosphere_desc'), icon: <Waves />, delay: 0.6 }
            ].map((feature, idx) => (
              <Reveal key={idx} delay={feature.delay} width="100%">
                <motion.div 
                  whileHover={{ y: -10 }}
                  className="group relative text-center p-8 rounded-[3rem] transition-all duration-500 hover:bg-dark/[0.02] dark:hover:bg-white/[0.02]"
                >
                  <div className="w-20 h-20 mx-auto mb-8 relative flex items-center justify-center">
                    <div className="absolute inset-0 bg-primary/10 rounded-full scale-0 group-hover:scale-100 transition-transform duration-500" />
                    <div className="relative text-primary transform group-hover:scale-110 transition-transform duration-500">
                      {React.cloneElement(feature.icon, { size: 40, strokeWidth: 1.2 })}
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-dark dark:text-light mb-6 tracking-wide">{feature.title}</h3>
                  <p className="text-text-secondary dark:text-text-secondary-dark leading-relaxed font-light text-lg italic opacity-80">
                    "{feature.desc}"
                  </p>
                  
                  {/* Subtle Border Glow on Hover */}
                  <div className="absolute inset-0 border border-primary/0 group-hover:border-primary/10 rounded-[3rem] transition-all duration-700" />
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
