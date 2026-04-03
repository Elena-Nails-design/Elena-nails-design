import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

export default function About() {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() === 'rtl';

  return (
    <div className="py-20 bg-white dark:bg-gray-900 min-h-[80vh] flex items-center transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: isRtl ? 50 : -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2"
          >
            <div className="relative rounded-[2rem] overflow-hidden shadow-2xl dark:shadow-gray-900 border-4 border-white dark:border-gray-800 transition-all">
              <img 
                src={`${import.meta.env.BASE_URL}assets/nails_epshtein/556455388_18061812473616810_1155595810853411427_n.jpg`} 
                alt="Elena in her studio / Work showcase" 
                loading="lazy"
                className="w-full h-[550px] object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: isRtl ? -50 : 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full lg:w-1/2 space-y-6"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-dark dark:text-white capitalize leading-tight" style={{ fontFamily: 'var(--font-heading)' }}>
              {t('about.title')}
            </h1>
            <div className="w-16 h-1 bg-gold rounded-full"></div>
            
            <p className="text-xl text-gray-700 dark:text-gray-300 leading-loose font-light mt-8">
              {t('about.p1')}
            </p>
            <p className="text-xl text-gray-700 dark:text-gray-300 leading-loose font-light">
              {t('about.p2')}
            </p>
            
            <div className="mt-8 grid grid-cols-2 gap-6 pt-6 border-t border-nude-dark dark:border-gray-800">
              <div>
                <h3 className="text-3xl font-bold text-gold mb-2">+500</h3>
                <p className="text-gray-600 dark:text-gray-400 font-medium">{t('about.clients')}</p>
              </div>
              <div>
                <h3 className="text-3xl font-bold text-gold mb-2">15</h3>
                <p className="text-gray-600 dark:text-gray-400 font-medium">{t('about.certs')}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
