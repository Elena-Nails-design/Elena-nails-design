import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

export default function About() {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() === 'rtl';

  return (
    <div className="py-24 bg-white dark:bg-[#0A0A0A] min-h-screen flex items-center transition-colors duration-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-20 items-center">
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="w-full lg:w-1/2 relative"
          >
            {/* Luxury Frame */}
            <div className="absolute -top-6 -left-6 w-32 h-32 border-t-2 border-l-2 border-primary/30 rounded-tl-[3rem] pointer-events-none" />
            <div className="absolute -bottom-6 -right-6 w-32 h-32 border-b-2 border-r-2 border-primary/30 rounded-br-[3rem] pointer-events-none" />
            
            <div className="relative rounded-[3rem] overflow-hidden shadow-2xl transition-all duration-1000 group">
              <img 
                src={`${import.meta.env.BASE_URL}assets/nails_epshtein/556455388_18061812473616810_1155595810853411427_n.jpg`} 
                alt="Elena's Craft" 
                loading="lazy"
                className="w-full h-[650px] object-cover transition-transform duration-[2.5s] group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/40 to-transparent opacity-60" />
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: isRtl ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
            className="w-full lg:w-1/2 space-y-10 text-start"
          >
            <div>
              <span className="text-primary dark:text-primary-dark tracking-widest uppercase text-xs font-bold mb-4 block">
                {t('about.subtitle') || "Modern Craftsmanship"}
              </span>
              <h1 className="text-5xl md:text-7xl font-bold text-dark dark:text-white capitalize leading-[1.1] tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>
                {t('about.title')}
              </h1>
              <div className="w-16 h-[2px] bg-gold mt-10"></div>
            </div>
            
            <div className="space-y-8">
              <p className="text-xl md:text-2xl text-dark/70 dark:text-white/70 leading-relaxed font-light italic">
                "{t('about.p1')}"
              </p>
              <p className="text-lg text-dark/60 dark:text-white/60 leading-loose font-light">
                {t('about.p2')}
              </p>
            </div>
            
            <div className="pt-12 grid grid-cols-2 gap-12 border-t border-dark/5 dark:border-white/5">
              <motion.div 
                whileHover={{ y: -5 }}
                className="space-y-2"
              >
                <h3 className="text-5xl font-bold text-primary dark:text-primary-dark tracking-tighter" style={{ fontFamily: 'var(--font-heading)' }}>
                  +500
                </h3>
                <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-dark/40 dark:text-white/40">
                  {t('about.clients')}
                </p>
              </motion.div>
              <motion.div 
                whileHover={{ y: -5 }}
                className="space-y-2"
              >
                <h3 className="text-5xl font-bold text-primary dark:text-primary-dark tracking-tighter" style={{ fontFamily: 'var(--font-heading)' }}>
                  15
                </h3>
                <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-dark/40 dark:text-white/40">
                  {t('about.certs')}
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
