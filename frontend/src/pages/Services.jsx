import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Clock, Scissors, Star, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Services() {
  const { t } = useTranslation();

  const services = [
    {
      title: t('services.manicure.title'),
      description: t('services.manicure.desc'),
      price: "₪150",
      duration: "60 min",
      image: "https://images.unsplash.com/photo-1604654894611-6973b376cbde?auto=format&fit=crop&q=80"
    },
    {
      title: t('services.pedicure.title'),
      description: t('services.pedicure.desc'),
      price: "₪200",
      duration: "90 min",
      image: "https://images.unsplash.com/photo-1519014816548-bf5fe059798b?auto=format&fit=crop&q=80"
    },
    {
      title: t('services.design.title'),
      description: t('services.design.desc'),
      price: "₪50+",
      duration: "+30 min",
      image: "https://images.unsplash.com/photo-1634712282282-132537046e8c?auto=format&fit=crop&q=80"
    }
  ];

  return (
    <div className="pt-32 pb-20 bg-light dark:bg-[#050505] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-20">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-primary uppercase tracking-[0.4em] text-xs font-bold mb-4 block"
          >
            Curated Menu
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold text-dark dark:text-white mb-6 tracking-tight"
          >
            {t('nav.services')}
          </motion.h1>
          <motion.div 
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="w-24 h-[2px] bg-primary mx-auto rounded-full" 
          />
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-14">
          {services.map((service, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              whileHover={{ y: -10 }}
              className="group bg-white dark:bg-[#0A0A0A] rounded-[2.5rem] overflow-hidden shadow-luxury hover:shadow-luxury-hover transition-all duration-500 border border-dark/5 dark:border-white/5"
            >
              <div className="relative h-72 overflow-hidden">
                <motion.img 
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.8 }}
                  src={service.image} 
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-transparent to-transparent opacity-60" />
                <div className="absolute top-6 right-6 bg-white/10 backdrop-blur-md px-4 py-1 rounded-full border border-white/20">
                  <span className="text-white text-xs font-bold tracking-widest">{service.price}</span>
                </div>
              </div>
              
              <div className="p-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-[1px] bg-primary group-hover:w-16 transition-all duration-500" />
                  <span className="text-primary text-[10px] uppercase tracking-[.3em] font-bold">Premium Service</span>
                </div>
                <h3 className="text-3xl font-bold text-dark dark:text-white mb-4 tracking-tight group-hover:text-primary transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-text-secondary dark:text-text-secondary-dark mb-8 leading-relaxed font-light line-clamp-2 italic">
                  {service.description}
                </p>
                
                <div className="flex items-center justify-between pt-6 border-t border-dark/5 dark:border-white/5">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-primary" />
                    <span className="text-sm text-dark/60 dark:text-white/60">{service.duration}</span>
                  </div>
                  <Link 
                    to="/booking" 
                    className="text-primary font-bold text-sm uppercase tracking-widest group-hover:translate-x-2 transition-transform duration-300 flex items-center gap-2"
                  >
                    {t('home.book_now')}
                    <span>→</span>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
