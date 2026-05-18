import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Eye, HelpCircle } from 'lucide-react';
import Reveal from './Reveal';

export default function BeforeAfter() {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [activeTab, setActiveTab] = useState(0);
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const isRtl = i18n.dir() === 'rtl';

  const treatments = [
    {
      titleHe: 'מניקור פיסולי & מבנה אנטומי',
      titleRu: 'Скульптурный маникюр и укрепление',
      titleEn: 'Sculptural Manicure & Structure',
      descHe: 'שיקום ציפורניים שטוחות או מפוצלות ובניית מבנה אנטומי יציב, ישר וחזק עם מריחה מושלמת מתחת לקוטיקולה.',
      descRu: 'Восстановление плоских или слоящихся ногтей, создание прочной и ровной архитектуры ногтя.',
      descEn: 'Reconstructing flat or splitting nails into a strong, perfectly balanced anatomical structure.',
      // We will use existing high-quality nail assets
      before: `${import.meta.env.BASE_URL}assets/nails_epshtein/587284153_18068201762616810_7162009895631000978_n.jpg`,
      after: `${import.meta.env.BASE_URL}assets/nails_epshtein/558698237_18061812464616810_6222784228286618641_n.jpg`,
      beforeTagHe: 'ציפורן טבעית חלשה',
      afterTagHe: 'מבנה אנטומי מושלם',
      beforeTagRu: 'Слабый натуральный ноготь',
      afterTagRu: 'Идеальная архитектура',
      beforeTagEn: 'Weak Natural Nail',
      afterTagEn: 'Perfect Structure'
    },
    {
      titleHe: 'שיקום ושחזור ציפורן פגומה',
      titleRu: 'Реконструкция поврежденного ногтя',
      titleEn: 'Damaged Nail Reconstruction',
      descHe: 'תיקון ושחזור ציפורניים שבורות או סדוקות באמצעות פוליג’ל מתקדם, ללא כאב ובגימור טבעי לחלוטין.',
      descRu: 'Исправление сломанных ногтей с помощью полигеля без боли с естественным результатом.',
      descEn: 'Repairing broken or cracked nails using advanced pain-free polygel with a fully natural finish.',
      before: `${import.meta.env.BASE_URL}assets/nails_epshtein/587284153_18068201762616810_7162009895631000978_n.jpg`, // elegant fallback
      after: `${import.meta.env.BASE_URL}assets/nails_epshtein/586709405_18068153549616810_774998090838186494_n.jpg`,
      beforeTagHe: 'סדק/שבר בציפורן',
      afterTagHe: 'שחזור פיסולי מושלם',
      beforeTagRu: 'Трещина/слом ногтя',
      afterTagRu: 'Полное восстановление',
      beforeTagEn: 'Cracked/Broken Nail',
      afterTagEn: 'Flawless Restored Finish'
    },
    {
      titleHe: 'פדיקור רפואי משקם',
      titleRu: 'Лечебный восстанавливающий педикюр',
      titleEn: 'Restorative Medical Pedicure',
      descHe: 'טיפול יסודי וקליני בעור קשה, סדקים עמוקים ושיקום כפות רגליים עייפות למראה בריא וקטיפתי.',
      descRu: 'Глубокий уход за сложной кожей стоп, трещинами и восстановление мягкости кожи.',
      descEn: 'Comprehensive clinical treatment of hard skin and deep fissures for soft, healthy feet.',
      before: `${import.meta.env.BASE_URL}assets/nails_epshtein/586709405_18068153549616810_774998090838186494_n.jpg`,
      after: `${import.meta.env.BASE_URL}assets/nails_epshtein/625551669_18076320683616810_2664619712328729322_n.jpg`,
      beforeTagHe: 'לפני טיפול רפואי',
      afterTagHe: 'כפות רגליים בריאות ורכות',
      beforeTagRu: 'До процедуры',
      afterTagRu: 'Здоровые и мягкие стопы',
      beforeTagEn: 'Before Treatment',
      afterTagEn: 'Soft & Healthy Feet'
    }
  ];

  const handleSliderChange = (e) => {
    setSliderPosition(e.target.value);
  };

  const currentTreatment = treatments[activeTab];
  const title = lang === 'ru' ? currentTreatment.titleRu : lang === 'en' ? currentTreatment.titleEn : currentTreatment.titleHe;
  const desc = lang === 'ru' ? currentTreatment.descRu : lang === 'en' ? currentTreatment.descEn : currentTreatment.descHe;
  const beforeTag = lang === 'ru' ? currentTreatment.beforeTagRu : lang === 'en' ? currentTreatment.beforeTagEn : currentTreatment.beforeTagHe;
  const afterTag = lang === 'ru' ? currentTreatment.afterTagRu : lang === 'en' ? currentTreatment.afterTagEn : currentTreatment.afterTagHe;

  return (
    <section className="py-32 bg-nude dark:bg-[#080808] transition-colors duration-700 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <Reveal delay={0.1} width="100%">
          <div className="text-center mb-20">
            <span className="text-primary uppercase tracking-[0.4em] text-xs font-bold mb-4 block">
              {lang === 'he' ? 'תוצאות מדברות בעד עצמן' : lang === 'ru' ? 'Результаты говорят сами за себя' : 'Results Speak For Themselves'}
            </span>
            <h2 className="text-4xl md:text-6xl font-bold text-dark dark:text-white mb-6 tracking-luxury" style={{ fontFamily: 'var(--font-heading)' }}>
              {lang === 'he' ? 'גלריית לפני ואחרי אינטראקטיבית' : lang === 'ru' ? 'Интерактивное До и После' : 'Interactive Before & After'}
            </h2>
            <p className="text-lg text-text-secondary dark:text-text-secondary-dark max-w-2xl mx-auto font-light leading-relaxed">
              {lang === 'he' ? 'גררי את הידית ימינה ושמאלה כדי לראות את הטרנספורמציה המקצועית והדיוק בכל טיפול.' :
               lang === 'ru' ? 'Передвигайте слайдер, чтобы увидеть профессиональное преображение в деталях.' :
               'Drag the slider to see the precision and transformation in every detail.'}
            </p>
            <div className="w-24 h-[2px] bg-primary mx-auto rounded-full mt-8" />
          </div>
        </Reveal>

        {/* Tab Selection */}
        <Reveal delay={0.2} width="100%">
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {treatments.map((t, idx) => {
              const tabTitle = lang === 'ru' ? t.titleRu : lang === 'en' ? t.titleEn : t.titleHe;
              return (
                <button
                  key={idx}
                  onClick={() => setActiveTab(idx)}
                  className={`px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-500 border ${
                    activeTab === idx
                      ? 'bg-primary border-primary text-white shadow-lg shadow-primary/20'
                      : 'bg-white/40 dark:bg-white/5 border-black/5 dark:border-white/10 text-dark dark:text-light hover:bg-white/60 dark:hover:bg-white/10'
                  }`}
                >
                  {tabTitle}
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* Slider & Description Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Treatment Description */}
          <div className="lg:col-span-5 space-y-8 lg:pr-8" dir={isRtl ? 'rtl' : 'ltr'}>
            <Reveal delay={0.3} width="100%">
              <div className="space-y-6">
                <span className="inline-flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest bg-primary/10 px-4 py-1.5 rounded-full">
                  <Eye size={14} />
                  {lang === 'he' ? 'שינוי אמיתי' : 'Real Results'}
                </span>
                <h3 className="text-3xl font-bold text-dark dark:text-white" style={{ fontFamily: 'var(--font-heading)' }}>
                  {title}
                </h3>
                <p className="text-text-secondary dark:text-text-secondary-dark leading-relaxed font-light text-lg">
                  {desc}
                </p>
                <div className="pt-6 border-t border-black/5 dark:border-white/5 flex items-start gap-4">
                  <HelpCircle className="text-primary shrink-0 w-6 h-6 mt-0.5" />
                  <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed font-light">
                    {lang === 'he' ? 'הטיפולים בסטודיו מבוצעים תוך שמירה מלאה על בריאות הציפורן הטבעית, תוך שימוש בחומרי עילית פרימיום ועמידות של עד 4 שבועות!' :
                     lang === 'ru' ? 'Все процедуры выполняются с заботой о здоровье натурального ногтя, используя премиум материалы со стойкостью до 4 недель!' :
                     'All treatments prioritize natural nail health, using top-tier premium materials for up to 4 weeks of durability!'}
                  </p>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Interactive Drag Slider */}
          <div className="lg:col-span-7 flex justify-center">
            <Reveal delay={0.4} width="100%">
              <div className="relative w-full max-w-[550px] aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl border border-white/20 dark:border-white/5 select-none bg-dark group">
                
                {/* Before Image (Background) */}
                <div className="absolute inset-0 w-full h-full">
                  <img 
                    src={currentTreatment.before} 
                    alt="Before Treatment" 
                    width={550}
                    height={687}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover filter grayscale contrast-125"
                    draggable="false"
                  />
                  <div className="absolute top-6 left-6 bg-dark/60 backdrop-blur-md text-white text-[10px] font-bold tracking-widest uppercase px-4 py-1.5 rounded-full border border-white/10">
                    {beforeTag}
                  </div>
                </div>

                {/* After Image (Foreground, clipped based on slider) */}
                <div 
                  className="absolute inset-0 w-full h-full overflow-hidden"
                  style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
                >
                  <img 
                    src={currentTreatment.after} 
                    alt="After Treatment" 
                    width={550}
                    height={687}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{ width: '100%', height: '100%', maxWidth: 'none' }}
                    draggable="false"
                  />
                  <div className="absolute top-6 right-6 bg-primary/80 backdrop-blur-md text-white text-[10px] font-bold tracking-widest uppercase px-4 py-1.5 rounded-full border border-white/10">
                    {afterTag}
                  </div>
                </div>

                {/* Slider Handle Line */}
                <div 
                  className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize z-10"
                  style={{ left: `${sliderPosition}%` }}
                >
                  {/* Slider Control Circle */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white dark:bg-dark border-2 border-primary rounded-full shadow-xl flex items-center justify-center pointer-events-none group-hover:scale-110 transition-transform">
                    <div className="flex gap-0.5">
                      <div className="w-1 h-3 bg-primary rounded-full" />
                      <div className="w-1 h-3 bg-primary rounded-full" />
                    </div>
                  </div>
                </div>

                {/* Invisible HTML range input over the component to capture dragging */}
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  value={sliderPosition} 
                  onChange={handleSliderChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20"
                  aria-label="Before after image comparison slider"
                />
              </div>
            </Reveal>
          </div>

        </div>

      </div>
    </section>
  );
}
