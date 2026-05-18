import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Sparkles, Wind, Zap, Droplets } from 'lucide-react';

const equipmentData = [
  {
    id: 'vacuum',
    icon: Wind,
    image: '/assets/equipment/4blanc.jpeg',
    color: 'bg-blue-50/50'
  },
  {
    id: 'lamp',
    icon: Zap,
    image: '/assets/equipment/onail Ai.jpg',
    color: 'bg-purple-50/50'
  },
  {
    id: 'luxio',
    icon: Droplets,
    image: '/assets/equipment/luxio.jpeg',
    color: 'bg-rose-50/50'
  }
];

export default function ProfessionalEquipment() {
  const { t } = useTranslation();

  return (
    <section className="py-24 bg-white dark:bg-surface-dark overflow-hidden transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-2 mb-4"
          >
            <Sparkles className="w-5 h-5 text-gold" />
            <span className="text-gold font-medium tracking-[0.3em] uppercase text-xs">
              Quality & Safety
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-playfair font-bold text-dark dark:text-white mb-6"
          >
            {t('equipment.title')}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-dark/60 dark:text-white max-w-2xl mx-auto text-lg leading-relaxed"
          >
            {t('equipment.subtitle')}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {equipmentData.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative"
            >
              <div className="relative h-full bg-stone-50/50 dark:bg-dark rounded-3xl p-8 transition-all duration-500 hover:shadow-2xl hover:shadow-gold/10 border border-stone-100 dark:border-white/5 group-hover:-translate-y-2">
                {/* Background Decoration */}
                <div className={`absolute top-0 right-0 w-32 h-32 ${item.color} blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-full`} />

                {/* Image Container */}
                <div className="relative aspect-square mb-8 overflow-hidden rounded-2xl bg-white dark:bg-dark p-4 group-hover:shadow-lg transition-all duration-500">
                  <img
                    src={item.image}
                    alt={t(`equipment.items.${item.id}.name`)}
                    className="w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-700"
                  />
                </div>

                {/* Content */}
                <div className="relative">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2.5 bg-gold/10 rounded-xl">
                      <item.icon className="w-5 h-5 text-gold" />
                    </div>
                    <h3 className="text-xl font-bold text-dark dark:text-white leading-tight">
                      {t(`equipment.items.${item.id}.name`)}
                    </h3>
                  </div>

                  <p className="text-dark/70 dark:text-white text-sm leading-relaxed mb-6 min-h-[3rem]">
                    {t(`equipment.items.${item.id}.description`)}
                  </p>

                  <ul className="space-y-3">
                    {t(`equipment.items.${item.id}.benefits`, { returnObjects: true }).map((benefit, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-dark/60 dark:text-white">
                        <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gold/40 flex-shrink-0" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
