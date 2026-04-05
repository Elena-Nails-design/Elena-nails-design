import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft, ArrowRight, Sparkles, ShieldCheck, Waves, Star, MessageCircle, Instagram, ChevronDown } from 'lucide-react';
import Reveal from '../components/Reveal';
import ProfessionalEquipment from '../components/ProfessionalEquipment';

const STUDIO_PHONE = '9720534611370';

const TESTIMONIALS = [
  { nameHe: 'יעל כ.', nameRu: 'Яэль К.', nameEn: 'Yael K.', textHe: 'אלנה פשוט מדהימה! כבר שנה שאני מגיעה אליה ותמיד יוצאת עם ציפורניים מושלמות. המקצועיות והיחס האישי לא מצויים בשום מקום אחר.', textRu: 'Елена просто невероятная! Уже год хожу к ней — всегда выхожу с идеальными ногтями. Профессионализм и личный подход несравнимы.', textEn: "Elena is simply amazing! I've been coming to her for a year and always leave with perfect nails. The professionalism and personal touch are unmatched." },
  { nameHe: 'מרינה ל.', nameRu: 'Марина Л.', nameEn: 'Marina L.', textHe: 'בניית ציפורניים שנשמרת חודש שלם! לא האמנתי שזה אפשרי. אלנה עובדת עם חמרים מהטובים בעולם ואת זה מרגישים. ממליצה בחום לכל חברה.', textRu: 'Ногти держатся целый месяц! Не верила, что это возможно. Елена работает с лучшими материалами — это чувствуется. Рекомендую всем подругам.', textEn: 'Nails that last a whole month! I didn\'t believe it was possible. Elena uses the best materials and it shows. I recommend her to all my friends.' },
  { nameHe: 'נטלי ר.', nameRu: 'Наталья Р.', nameEn: 'Natalie R.', textHe: 'הגעתי עם ציפורניים פגועות ויצאתי עם עיצוב יוקרתי מושלם. אלנה יודעת לאבחן ולטפל גם בבעיות רציניות. הסטריליזציה אצלה ברמה של בית חולים.', textRu: 'Пришла с повреждёнными ногтями — вышла с роскошным дизайном. Елена умеет диагностировать и работать даже со сложными случаями. Стерилизация на уровне больницы.', textEn: 'Came in with damaged nails and left with a perfect luxury design. Elena knows how to diagnose and treat even serious nail issues. Her sterilization is hospital-grade.' },
  { nameHe: 'אנה מ.', nameRu: 'Анна М.', nameEn: 'Anna M.', textHe: 'הפדיקור הרפואי שלה שינה לי את החיים. אהבתי שהכל מוסבר, ניתן בצורה מקצועית ובאווירה נינוחה. כבר הבאתי את אמא שלי ואת אחותי — כולן אוהבות.', textRu: 'Её медицинский педикюр изменил мою жизнь. Всё объясняется, делается профессионально и в расслабленной атмосфере. Уже привела маму и сестру — все в восторге.', textEn: 'Her medical pedicure changed my life. Everything is explained, done professionally, and in a relaxed atmosphere. I already brought my mom and sister — everyone loves her.' },
];

export default function Home() {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() === 'rtl';
  const lang = i18n.language;

  // Parallax Effect
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const getTestimonialName = (t) => lang === 'ru' ? t.nameRu : lang === 'en' ? t.nameEn : t.nameHe;
  const getTestimonialText = (t) => lang === 'ru' ? t.textRu : lang === 'en' ? t.textEn : t.textHe;

  const whatsappUrl = `https://wa.me/${STUDIO_PHONE}?text=${encodeURIComponent(
    lang === 'he' ? 'שלום אלנה! 💅 אשמח לשמוע פרטים ולקבוע תור' :
    lang === 'ru' ? 'Привет, Елена! 💅 Хочу узнать подробности и записаться' :
    'Hi Elena! 💅 I\'d love to find out more and book an appointment'
  )}`;

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
          <Reveal delay={0.2} y={30} width="100%">
            <span className="inline-flex text-primary dark:text-primary-dark tracking-widest uppercase text-[10px] md:text-sm font-bold mb-6 bg-white/5 backdrop-blur-xl px-6 py-2 rounded-full border border-white/10 shadow-luxury">
              {t('home.welcome_badge') || "Premium Beauty Studio"}
            </span>
          </Reveal>

          <Reveal delay={0.4} width="100%">
            <h1 
              className="text-5xl md:text-8xl font-bold text-white mb-8 leading-[1.1] tracking-tight drop-shadow-2xl text-center"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {t('home.hero_title')}
            </h1>
          </Reveal>

          <Reveal delay={0.6} width="100%">
            <p className="text-lg md:text-2xl text-white/80 mb-12 font-light max-w-2xl mx-auto leading-relaxed italic drop-shadow-lg text-center">
              {t('home.hero_subtitle')}
            </p>
          </Reveal>
          
          <Reveal delay={0.8} y={20} width="100%">
            <div className="flex flex-col sm:flex-row gap-6 items-center justify-center">
              {/* Primary CTA — Booking page */}
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link 
                  to="/booking" 
                  className="btn-premium inline-flex items-center gap-4 group shimmer-gold whitespace-nowrap"
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

              {/* Secondary CTA — WhatsApp direct */}
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm text-white font-bold text-xs tracking-[0.2em] uppercase hover:bg-[#25D366] hover:border-[#25D366] transition-all duration-500 whitespace-nowrap"
                >
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white shrink-0"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  {lang === 'he' ? 'שאלי אותנו' : lang === 'ru' ? 'Написать нам' : 'Message Us'}
                </a>
              </motion.div>
            </div>
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
                {t('home.features.title')}
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
                  <div className="absolute inset-0 border border-primary/0 group-hover:border-primary/10 rounded-[3rem] transition-all duration-700" />
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Professional Equipment Section */}
      <ProfessionalEquipment />

      {/* ★ INSTAGRAM SECTION (Recent Works) */}
      <section className="py-32 bg-white dark:bg-[#050505] transition-colors duration-700 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal delay={0.1} width="100%">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
              <div>
                <span className="text-primary uppercase tracking-[0.4em] text-xs font-bold mb-4 block">
                  {t('home.instagram_section.title')}
                </span>
                <h2 className="text-4xl md:text-5xl font-bold text-dark dark:text-white tracking-tight">
                  {t('home.instagram_section.subtitle')}
                </h2>
              </div>
              <motion.a 
                whileHover={{ x: 5 }}
                href={t('footer.instagram')}
                target="_blank"
                rel="noreferrer"
                className="text-primary font-bold text-sm uppercase tracking-[0.2em] flex items-center gap-3 group"
              >
                <span>{t('home.instagram_section.follow_btn')}</span>
                <Instagram size={18} className="group-hover:rotate-12 transition-transform" />
              </motion.a>
            </div>
          </Reveal>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              "558698237_18061812464616810_6222784228286618641_n.jpg",
              "586709405_18068153549616810_774998090838186494_n.jpg",
              "587284153_18068201762616810_7162009895631000978_n.jpg",
              "625551669_18076320683616810_2664619712328729322_n.jpg"
            ].map((img, i) => (
              <Reveal key={i} delay={0.1 * i} width="100%">
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="aspect-square rounded-3xl overflow-hidden relative group cursor-pointer"
                >
                  <img 
                    src={`${import.meta.env.BASE_URL}assets/nails_epshtein/${img}`} 
                    alt={t(`gallery.img_insta_${i + 1}`)} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-dark/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Instagram className="text-white w-8 h-8 opacity-0 group-hover:opacity-100 transform group-hover:scale-110 transition-all duration-500" />
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ★ TESTIMONIALS SECTION */}
      <section className="py-32 bg-nude dark:bg-[#080808] transition-colors duration-700 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-30">
          <div className="absolute top-[20%] right-[-5%] w-[25%] h-[25%] bg-primary/10 blur-[80px] rounded-full" />
          <div className="absolute bottom-[10%] left-[-5%] w-[20%] h-[20%] bg-gold/10 blur-[80px] rounded-full" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Reveal delay={0.1} width="100%">
            <div className="text-center mb-20">
              <span className="text-primary uppercase tracking-[0.4em] text-xs font-bold mb-4 block">
                {lang === 'he' ? 'לקוחות ממליצות' : lang === 'ru' ? 'Отзывы клиентов' : 'Client Reviews'}
              </span>
              <h2 className="text-4xl md:text-6xl font-bold text-dark dark:text-white mb-4 tracking-luxury" style={{ fontFamily: 'var(--font-heading)' }}>
                {lang === 'he' ? 'מה אומרות הלקוחות שלנו' : lang === 'ru' ? 'Что говорят наши клиенты' : 'What Our Clients Say'}
              </h2>
              <div className="w-24 h-[2px] bg-primary mx-auto rounded-full mt-8" />
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {TESTIMONIALS.map((review, i) => (
              <Reveal key={i} delay={0.1 * i} width="100%">
                <motion.div
                  whileHover={{ y: -8 }}
                  className="glass-luxury p-10 rounded-[2.5rem] border border-white/40 dark:border-white/5 relative overflow-hidden group"
                >
                  {/* Quote mark */}
                  <span className="absolute top-6 right-8 text-8xl text-primary/10 font-serif leading-none pointer-events-none select-none">"</span>

                  {/* Stars */}
                  <div className="flex gap-1 mb-6">
                    {[...Array(5)].map((_, s) => (
                      <Star key={s} className="w-4 h-4 text-[#D4AF37]" fill="#D4AF37" />
                    ))}
                  </div>

                  <p className="text-dark/80 dark:text-white/80 leading-relaxed font-light text-lg mb-8 italic relative z-10">
                    "{getTestimonialText(review)}"
                  </p>

                  <div className="flex items-center gap-4 pt-6 border-t border-dark/5 dark:border-white/5">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm">
                      {getTestimonialName(review)[0]}
                    </div>
                    <div>
                      <p className="font-bold text-dark dark:text-white tracking-wide text-sm">{getTestimonialName(review)}</p>
                      <p className="text-[10px] text-primary uppercase tracking-widest font-bold opacity-70">
                        {lang === 'he' ? 'לקוחה מאומתת ✓' : lang === 'ru' ? 'Проверенный клиент ✓' : 'Verified Client ✓'}
                      </p>
                    </div>
                  </div>

                  <div className="absolute inset-0 border border-primary/0 group-hover:border-primary/10 rounded-[2.5rem] transition-all duration-700 pointer-events-none" />
                </motion.div>
              </Reveal>
            ))}
          </div>

          {/* CTA below testimonials */}
          <Reveal delay={0.5} width="100%">
            <div className="text-center mt-20">
              <p className="text-dark/50 dark:text-white/50 text-sm mb-6 tracking-wide">
                {lang === 'he' ? 'גם את יכולה לחוות את הטיפול המושלם' : lang === 'ru' ? 'Вы тоже можете испытать идеальный уход' : 'You too can experience the perfect treatment'}
              </p>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block">
                <Link to="/booking" className="btn-premium inline-flex items-center gap-4 shimmer-gold">
                  <span>{t('home.book_now')}</span>
                  {isRtl ? <ArrowLeft className="w-5 h-5" /> : <ArrowRight className="w-5 h-5" />}
                </Link>
              </motion.div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ★ FAQ SECTION */}
      <section className="py-32 bg-white dark:bg-[#050505] transition-colors duration-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal delay={0.1} width="100%">
            <div className="text-center mb-20">
              <span className="text-primary uppercase tracking-[0.4em] text-xs font-bold mb-4 block">
                FAQ
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-dark dark:text-white tracking-tight">
                {t('home.faq.subtitle')}
              </h2>
            </div>
          </Reveal>

          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <Reveal key={i} delay={0.1 * i} width="100%">
                <div className="border-b border-dark/5 dark:border-white/5">
                  <details className="group">
                    <summary className="flex items-center justify-between py-8 cursor-pointer list-none">
                      <h3 className="text-xl md:text-2xl font-bold text-dark dark:text-white group-hover:text-primary transition-colors pr-8">
                        {t(`home.faq.q${i}`)}
                      </h3>
                      <ChevronDown className="w-6 h-6 text-primary transition-transform group-open:rotate-180" />
                    </summary>
                    <div className="pb-8 text-text-secondary dark:text-text-secondary-dark text-lg font-light leading-relaxed">
                      <p>{t(`home.faq.a${i}`)}</p>
                    </div>
                  </details>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
