import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function Services() {
  const { t } = useTranslation();

  return (
    <div className="py-24 bg-[#FAF7F2] dark:bg-[#0A0A0A] min-h-screen transition-colors duration-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center mb-28"
        >
          <span className="text-primary dark:text-primary-dark tracking-widest uppercase text-xs font-bold mb-4 block">
            {t('services.subtitle') || "Treat Yourself"}
          </span>
          <h1 className="text-5xl md:text-7xl font-bold text-dark dark:text-white mb-8 tracking-luxury">
            {t('services.title')}
          </h1>
          <p className="text-xl text-dark/60 dark:text-white/60 max-w-2xl mx-auto font-light leading-relaxed italic">
            {t('services.desc')}
          </p>
          <div className="w-12 h-[1px] bg-gold mx-auto mt-12"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {[1, 2, 3, 4, 5, 6].map((id, idx) => (
            <motion.div 
              key={id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.8 }}
              className="glass-luxury rounded-[2.5rem] p-10 flex flex-col h-full relative group transition-all duration-700 hover:-translate-y-4"
            >
              {/* Luxury Detail: Animated Border Corner */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
              
              {id === 1 && (
                <div className="absolute top-6 right-6 bg-dark text-white text-[10px] font-bold tracking-widest px-4 py-1.5 rounded-full z-10 uppercase">
                  {t('services.most_popular')}
                </div>
              )}
              
              <div className="mb-8">
                <h3 className="text-3xl font-bold text-dark dark:text-white mb-4 leading-tight">
                  {t(`services.list.${id}.title`)}
                </h3>
                <div className="flex items-center gap-4">
                  <span className="text-primary-dark dark:text-gold text-2xl font-medium">
                    {t(`services.list.${id}.price`)}
                  </span>
                  <div className="h-[1px] flex-grow bg-dark/10 dark:bg-white/10" />
                </div>
              </div>
              
              <p className="text-dark/70 dark:text-white/70 mb-10 text-lg leading-relaxed font-light italic">
                {t(`services.list.${id}.desc`)}
              </p>
              
              <div className="mt-auto flex items-center justify-between pt-8 border-t border-dark/5 dark:border-white/5">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                  <span className="text-xs uppercase tracking-widest text-dark/40 dark:text-white/40 font-bold">
                    {t(`services.list.${id}.duration`)}
                  </span>
                </div>
                <Link 
                  to={`/booking?serviceId=${id}`} 
                  className="group/btn flex items-center gap-2 text-dark dark:text-white text-xs tracking-widest uppercase font-bold hover:text-primary transition-colors"
                >
                  <span className="relative">
                    {t('services.book_btn')}
                    <div className="absolute -bottom-1 left-0 w-0 h-[1px] bg-primary group-hover/btn:w-full transition-all duration-300" />
                  </span>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
