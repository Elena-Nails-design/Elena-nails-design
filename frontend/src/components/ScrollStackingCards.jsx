import React, { useRef } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Sparkles, ShieldCheck, Gem, Paintbrush } from 'lucide-react';

const CARDS_CONFIG = [
  {
    numKey: 'card1_num',
    titleKey: 'card1_title',
    descKey: 'card1_desc',
    icon: Sparkles,
    image: 'assets/nails_epshtein/624361448_18075893492616810_7424546104696132483_n.jpg',
    color: 'from-pink-500/10 to-gold/10',
    benefitsHe: ['מניקור מכשירי עמוק ויסודי', 'מריחת צבע צמודה לקוטיקולה', 'עמידות ל-4+ שבועות'],
    benefitsRu: ['Глубокий аппаратный маникюр', 'Покрытие под кутикулу', 'Стойкость более 4 недель'],
    benefitsEn: ['Deep hardware manicure technique', 'Under-cuticle color application', 'Longevity of 4+ weeks']
  },
  {
    numKey: 'card2_num',
    titleKey: 'card2_title',
    descKey: 'card2_desc',
    icon: ShieldCheck,
    image: 'assets/nails_epshtein/626295418_18076514747616810_7167713800782786002_n.jpg',
    color: 'from-blue-500/10 to-teal-500/10',
    benefitsHe: ['עיקור באוטוקלאב רפואי Class B', 'שקית סטרילית אישית שנפתחת מולך', 'ציוד חד-פעמי לחלוטין לכל לקוחה'],
    benefitsRu: ['Автоклав медицинского класса B', 'Крафт-пакет вскрывается при вас', '100% одноразовые расходники'],
    benefitsEn: ['Medical autoclave sterilization', 'Pouch opened strictly in front of you', 'Strictly disposable file/buffer kits']
  },
  {
    numKey: 'card3_num',
    titleKey: 'card3_title',
    descKey: 'card3_desc',
    icon: Gem,
    image: 'assets/nails_epshtein/556455388_18061812473616810_1155595810853411427_n.jpg',
    color: 'from-purple-500/10 to-rose-500/10',
    benefitsHe: ['שימוש במותגי עילית (כמו Luxio)', 'מבנה אנטומי לחיזוק הציפורן', 'חומרים היפואלרגניים ובטוחים'],
    benefitsRu: ['Люксовые бренды (Luxio)', 'Анатомическое укрепление ногтей', 'Гипоаллергенные и безопасные составы'],
    benefitsEn: ['World-class brands (Luxio)', 'Anatomical structures for strength', 'Hypoallergenic formulas']
  },
  {
    numKey: 'card4_num',
    titleKey: 'card4_title',
    descKey: 'card4_desc',
    icon: Paintbrush,
    image: 'assets/nails_epshtein/587303262_18069986417616810_3260988139436728763_n.jpg',
    color: 'from-amber-500/10 to-gold/10',
    benefitsHe: ['ציור ידני מורכב וייחודי', 'עיצוב מינימליסטי יוקרתי', 'שילוב אבני חן ופיגמנטים איכותיים'],
    benefitsRu: ['Художественная роспись вручную', 'Тихий люкс и минимализм', 'Премиальные пигменты и инкрустация'],
    benefitsEn: ['Intricate hand-painted custom art', 'Quiet luxury & clean minimalism', 'Premium crystals and chrome pigments']
  }
];

function StackingCard({ card, index, totalCards, lang, isRtl, t }) {
  const cardRef = useRef(null);
  
  // Track scroll position of the wrapper container
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start start", "end start"]
  });

  const isLast = index === totalCards - 1;
  
  // Apple scroll effect: preceding cards scale down and fade slightly as they stack
  const scale = useTransform(scrollYProgress, [0, 1], [1, isLast ? 1 : 0.94]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, isLast ? 1 : 0.45]);
  const y = useTransform(scrollYProgress, [0, 1], [0, isLast ? 0 : -25]);

  const benefits = lang === 'he' ? card.benefitsHe : lang === 'ru' ? card.benefitsRu : card.benefitsEn;
  const IconComponent = card.icon;

  return (
    <div 
      ref={cardRef} 
      className="relative min-h-[50vh] md:min-h-[60vh] flex items-start justify-center pb-8"
      style={{ zIndex: index + 1 }}
    >
      <motion.div 
        style={{ 
          scale, 
          opacity,
          y,
          position: "sticky",
          top: `calc(140px + ${index * 24}px)`,
        }}
        className="w-full max-w-5xl bg-white dark:bg-[#0c090a] rounded-[2.5rem] md:rounded-[3.5rem] border border-black/5 dark:border-white/5 shadow-2xl p-6 md:p-12 flex flex-col md:flex-row gap-8 md:gap-12 items-center transition-colors duration-700 overflow-hidden relative"
      >
        {/* Glow decoration */}
        <div className={`absolute -right-32 -top-32 w-64 h-64 bg-gradient-to-br ${card.color} rounded-full blur-3xl pointer-events-none opacity-40`} />
        
        {/* Visual / Image Side */}
        <div className="w-full md:w-[45%] shrink-0 aspect-[4/3] md:aspect-square rounded-3xl overflow-hidden relative group border border-black/5 dark:border-white/5">
          <img 
            src={`${import.meta.env.BASE_URL}${card.image}`}
            alt={t(`home.scroll_cards.${card.titleKey}`)}
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark/60 via-dark/10 to-transparent" />
          
          {/* Card Number Badge */}
          <div className={`absolute bottom-6 ${isRtl ? 'right-6' : 'left-6'} bg-white/10 backdrop-blur-md px-5 py-2 rounded-full border border-white/20`}>
            <span className="text-white text-xs font-bold tracking-widest uppercase">
              {t(`home.scroll_cards.${card.numKey}`)}
            </span>
          </div>
        </div>

        {/* Content Side */}
        <div className="flex-grow flex flex-col justify-center w-full">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 bg-primary/10 dark:bg-primary-dark/10 text-primary dark:text-primary-dark rounded-2xl">
              <IconComponent size={20} strokeWidth={1.5} />
            </div>
            <span className="text-primary dark:text-primary-dark font-medium tracking-[0.2em] uppercase text-xs">
              {t(`home.scroll_cards.${card.numKey}`)} / 04
            </span>
          </div>

          <h3 className="text-2xl md:text-4xl font-bold text-dark dark:text-white mb-4 tracking-tight font-playfair leading-[1.25]">
            {t(`home.scroll_cards.${card.titleKey}`)}
          </h3>

          <p className="text-text-secondary dark:text-text-secondary-dark text-base md:text-lg font-light leading-relaxed mb-6 italic">
            "{t(`home.scroll_cards.${card.descKey}`)}"
          </p>

          <div className="w-full h-[1px] bg-black/5 dark:bg-white/5 mb-6" />

          {/* Key Checklist */}
          <ul className="space-y-3.5">
            {benefits.map((benefit, i) => (
              <li key={i} className="flex items-start gap-3 text-sm md:text-base text-dark/70 dark:text-white/80">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </div>
  );
}

export default function ScrollStackingCards() {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() === 'rtl';
  const lang = i18n.language;

  return (
    <section className="relative py-24 bg-white dark:bg-[#050505] transition-colors duration-700 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-gold/3 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-24 max-w-3xl mx-auto">
          <span className="text-primary uppercase tracking-[0.4em] text-xs font-bold mb-4 block">
            {t('home.scroll_cards.section_badge')}
          </span>
          <h2 className="text-4xl md:text-6xl font-bold text-dark dark:text-white mb-6 tracking-tight leading-[1.15]">
            {t('home.scroll_cards.section_title')}
          </h2>
          <p className="text-text-secondary dark:text-text-secondary-dark text-lg font-light leading-relaxed italic opacity-85">
            {t('home.scroll_cards.section_subtitle')}
          </p>
          <div className="w-24 h-[2px] bg-primary mx-auto rounded-full mt-8" />
        </div>

        {/* Stacking Deck container */}
        <div className="relative">
          {CARDS_CONFIG.map((card, idx) => (
            <StackingCard
              key={idx}
              card={card}
              index={idx}
              totalCards={CARDS_CONFIG.length}
              lang={lang}
              isRtl={isRtl}
              t={t}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
