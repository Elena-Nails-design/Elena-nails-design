import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function Services() {
  const { t } = useTranslation();

  return (
    <div className="pt-10 pb-20 bg-nude dark:bg-gray-800 min-h-[80vh] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-dark dark:text-white mb-6 tracking-wide" style={{ fontFamily: 'var(--font-heading)' }}>{t('services.title')}</h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto font-light leading-loose">{t('services.desc')}</p>
          <div className="w-16 h-1 bg-gold mx-auto rounded-full mt-8"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {[1, 2, 3, 4, 5, 6].map((id, idx) => (
            <motion.div 
              key={id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: idx * 0.15, duration: 0.5 }}
              whileHover={{ y: -5 }}
              className="bg-white dark:bg-gray-900 rounded-[2rem] p-8 shadow-sm border border-nude dark:border-gray-800 hover:shadow-xl hover:border-nude-dark dark:hover:border-gray-700 transition-all flex flex-col h-full relative overflow-hidden group text-start"
            >
              <div className="absolute top-0 end-0 w-2 h-0 bg-gold group-hover:h-full transition-all duration-500 ease-out"></div>
              
              {id === 1 && (
                <div className="absolute top-4 end-6 bg-gold text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm animate-pulse z-10">
                  {t('services.most_popular')}
                </div>
              )}
              
              <div className="flex justify-between items-start mb-6 gap-4 relative z-0">
                <h3 className="text-2xl font-bold text-dark dark:text-gray-100 mt-2" style={{ fontFamily: 'var(--font-heading)' }}>{t(`services.list.${id}.title`)}</h3>
                <span className="bg-nude dark:bg-gray-800 text-primary-dark font-bold px-3 py-1 rounded-full text-sm shrink-0 whitespace-nowrap">
                  {t(`services.list.${id}.price`)}
                </span>
              </div>
              
              <p className="text-gray-600 dark:text-gray-400 mb-6 flex-grow leading-relaxed">{t(`services.list.${id}.desc`)}</p>
              
              <div className="flex items-center justify-between mt-auto pt-6 border-t border-nude dark:border-gray-800">
                <span className="text-sm text-gray-500 bg-gray-100 dark:bg-gray-800/80 px-3 py-1 rounded-md">
                  {t(`services.list.${id}.duration`)}
                </span>
                <Link to={`/booking?serviceId=${id}`} className="text-primary hover:text-primary-dark font-semibold text-sm hover:underline">
                  {t('services.book_btn')} &larr;
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
