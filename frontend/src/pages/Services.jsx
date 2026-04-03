import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Clock, Star, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import Reveal from '../components/Reveal';

export default function Services() {
  const { t, i18n } = useTranslation();

  // Mapping the new JSON structure (object with numbered keys) to a display array
  const serviceListData = t('services.list', { returnObjects: true }) || {};
  const menuData = t('services.menu', { returnObjects: true }) || {};
  const menuItems = menuData?.items ? Object.keys(menuData.items).map(k => menuData.items[k]) : [];
  
  const serviceImages = {
    "1": `${import.meta.env.BASE_URL}assets/nails_epshtein/626295418_18076514747616810_7167713800782786002_n.jpg`,
    "2": `${import.meta.env.BASE_URL}assets/nails_epshtein/624361448_18075893492616810_7424546104696132483_n.jpg`,
    "3": `${import.meta.env.BASE_URL}assets/nails_epshtein/556455388_18061812473616810_1155595810853411427_n.jpg`,
    "4": `${import.meta.env.BASE_URL}assets/nails_epshtein/560055750_18062046065616810_932821717540010631_n.jpg`,
    "5": `${import.meta.env.BASE_URL}assets/nails_epshtein/587303262_18069986417616810_3260988139436728763_n.jpg`,
    "6": `${import.meta.env.BASE_URL}assets/nails_epshtein/586685411_18070598063616810_1738139733143951263_n.jpg`,
  };

  const services = Object.keys(serviceListData).map(key => ({
    ...serviceListData[key],
    id: key,
    image: serviceImages[key] || serviceImages["1"]
  }));

  return (
    <div className="pt-32 pb-20 bg-light dark:bg-[#050505] min-h-screen transition-colors duration-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-24">
          <Reveal delay={0.1}>
            <span className="text-primary uppercase tracking-[0.4em] text-xs font-bold mb-4 block">
              {t('services.subtitle')}
            </span>
          </Reveal>
          <Reveal delay={0.2}>
            <h1 className="text-5xl md:text-8xl font-bold text-dark dark:text-white mb-8 tracking-tight">
              {t('services.title')}
            </h1>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="max-w-2xl mx-auto text-text-secondary dark:text-text-secondary-dark text-lg md:text-xl font-light italic opacity-80">
              {t('services.desc')}
            </p>
          </Reveal>
          <Reveal delay={0.4} width="100%">
            <div className="mt-8 w-24 h-[2px] bg-primary mx-auto rounded-full" />
          </Reveal>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-14">
          {services.map((service, index) => (
            <Reveal key={service.id} delay={0.1 * index} width="100%">
              <motion.div 
                whileHover={{ y: -15 }}
                className="group bg-white dark:bg-[#0A0A0A] rounded-[3rem] overflow-hidden shadow-luxury hover:shadow-luxury-hover transition-all duration-500 border border-dark/5 dark:border-white/5 relative"
              >
                {/* Popular Badge */}
                {service.id === "1" && (
                  <div className="absolute top-6 left-6 z-20 bg-primary px-4 py-1.5 rounded-full shadow-lg">
                    <span className="text-white text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
                      <Star size={12} fill="white" />
                      {t('services.most_popular')}
                    </span>
                  </div>
                )}

                <div className="relative h-80 overflow-hidden">
                  <motion.img 
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 1.2 }}
                    src={service.image} 
                    alt={service.title}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />
                  <div className="absolute bottom-8 left-8 right-8 text-right">
                    <div className="inline-flex items-center gap-2 text-white/90 text-sm font-medium tracking-widest uppercase bg-black/30 backdrop-blur-md px-4 py-2 rounded-full">
                      <Clock className="w-4 h-4 text-primary" />
                      {service.duration}
                    </div>
                  </div>
                </div>
                
                <div className="p-10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-[1px] bg-primary group-hover:w-16 transition-all duration-500" />
                    <Sparkles className="w-3 h-3 text-primary opacity-50" />
                  </div>
                  
                  <h3 className="text-3xl font-bold text-dark dark:text-white mb-6 tracking-tight group-hover:text-primary transition-colors duration-300">
                    {service.title}
                  </h3>
                  
                  <p className="text-text-secondary dark:text-text-secondary-dark mb-10 leading-relaxed font-light line-clamp-3 italic opacity-90">
                    {service.desc}
                  </p>
                  
                  <Link 
                    to="/booking" 
                    className="inline-flex items-center gap-3 text-dark dark:text-white font-bold text-xs uppercase tracking-[0.2em] group-hover:text-primary transition-all duration-300"
                  >
                    <span className="border-b border-current pb-1">{t('services.book_btn')}</span>
                    <motion.span
                      animate={{ x: [0, 5, 0] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                    >→</motion.span>
                  </Link>
                </div>
                
                {/* Decorative background element */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-3xl group-hover:bg-primary/10 transition-colors duration-500" />
              </motion.div>
            </Reveal>
          ))}
        </div>

        {/* Pricing Menu */}
        {menuItems.length > 0 && (
          <div className="mt-32 max-w-4xl mx-auto">
            <Reveal delay={0.1}>
              <div className="text-center mb-16">
                <span className="text-primary uppercase tracking-[0.4em] text-xs font-bold mb-4 block">
                  {menuData.subtitle}
                </span>
                <h2 className="text-4xl md:text-5xl font-bold text-dark dark:text-white tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>
                  {menuData.title}
                </h2>
              </div>
            </Reveal>
            
            <Reveal delay={0.2} width="100%">
              <div className="bg-white/50 dark:bg-black/30 backdrop-blur-sm rounded-[3rem] p-8 md:p-14 shadow-luxury border border-black/5 dark:border-white/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-32 -mt-32 blur-3xl pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-gold/5 rounded-full -ml-32 -mb-32 blur-3xl pointer-events-none" />
                
                <div className="relative z-10 space-y-8">
                  {menuItems.map((item, idx) => (
                    <div key={idx} className="group">
                      <div className="flex justify-between items-baseline mb-2 gap-4">
                        <h4 className="text-lg md:text-2xl font-bold text-dark dark:text-white tracking-tight group-hover:text-primary transition-colors">
                          {item.name}
                        </h4>
                        <div className="flex-grow border-b border-dotted border-gray-300 dark:border-gray-700 mx-2 md:mx-4 opacity-50 relative top-[-6px]" />
                        <span className="text-lg md:text-2xl font-bold text-primary whitespace-nowrap">
                          {item.price}
                        </span>
                      </div>
                      <p className="text-gray-500 dark:text-gray-400 font-light text-sm md:text-base leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        )}

        {/* ★ CTA Section */}
        <div className="mt-24 py-20 bg-dark rounded-[3rem] text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.08)_0%,transparent_70%)] rounded-[3rem]" />
          <div className="relative z-10 max-w-xl mx-auto px-4">
            <span className="text-primary uppercase tracking-[0.4em] text-xs font-bold mb-4 block">
              {t('services.book_btn')}
            </span>
            <p className="text-white/70 text-xl md:text-2xl font-light italic mb-10 leading-relaxed">
              {i18n.language === 'he' ? 'מצאת את הטיפול המתאים? קבעי תור עכשיו 💅' : i18n.language === 'ru' ? 'Нашли подходящую процедуру? Записывайтесь сейчас 💅' : 'Found the right treatment? Book now 💅'}
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block">
              <Link to="/booking" className="btn-premium inline-flex items-center gap-4 shimmer-gold">
                <span>{t('home.book_now')}</span>
                <span>→</span>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
