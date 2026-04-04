import React from 'react';
import { useTranslation } from 'react-i18next';
import { ShieldCheck, Phone, Mail, MapPin, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Accessibility() {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() === 'rtl';

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-900 pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-stone-800 rounded-[3rem] p-8 md:p-12 shadow-luxury border border-black/5 dark:border-white/5"
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
              <ShieldCheck className="text-primary-dark w-6 h-6" />
            </div>
            <h1 className="text-3xl md:text-4xl font-heading font-bold text-dark dark:text-white">
              הצהרת נגישות
            </h1>
          </div>

          <div className="prose prose-stone dark:prose-invert max-w-none space-y-8 text-stone-600 dark:text-stone-300 leading-relaxed text-right" dir="rtl">
            <section>
              <h2 className="text-xl font-bold text-dark dark:text-white mb-4 border-r-4 border-primary pr-4">מבוא</h2>
              <p>
                בסטודיו "אלנה ניילס דיזיין" אנו רואים חשיבות רבה במתן שירות שוויוני, מכובד ונגיש לכלל הלקוחות, לרבות אנשים עם מוגבלות. 
                אנו פועלים רבות להנגשת האתר והסטודיו הפיזי על מנת לאפשר חוויית שירות נוחה ובטוחה לכולם, תוך עמידה בהוראות חוק שוויון זכויות לאנשים עם מוגבלות, תשנ"ח-1998 ותקנותיו.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-dark dark:text-white mb-4 border-r-4 border-primary pr-4">נגישות האתר</h2>
              <p>
                אתר זה עומד בדרישות תקנות שוויון זכויות לאנשים עם מוגבלות (התאמות נגישות לשירות), התשע"ג-2013.
                התאמות הנגישות בוצעו על פי המלצות התקן הישראלי (ת"י 5568) לנגישות תכנים באינטרנט ברמת AA ומסמך WCAG2.1 הבינלאומי.
              </p>
              <ul className="list-disc pr-6 space-y-2 mt-4">
                <li>האתר מותאם לתצוגה בדפדפנים נפוצים ולשימוש בטלפון סלולרי.</li>
                <li>הניווט באתר מותאם לשימוש במקלדת בלבד.</li>
                <li>התכנים באתר כתובים בשפה פשוטה וברורה.</li>
                <li>מבנה האתר הינו סמנטי וכולל היררכיית כותרות תקינה.</li>
                <li>כל התמונות החשובות כוללות טקסט חלופי (Alt text).</li>
                <li>האתר מותאם לשימוש באמצעות קוראי מסך (כדוגמת NVDA ו-VoiceOver).</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-dark dark:text-white mb-4 border-r-4 border-primary pr-4">הסדרי נגישות פיזיים (אשדוד)</h2>
              <p>הסטודיו שלנו ממוקם ברחוב העצמאות 93, אשדוד. להלן הסדרי הנגישות במקום:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="flex items-start gap-3 p-4 bg-stone-50 dark:bg-stone-900/50 rounded-2xl">
                  <MapPin className="text-primary-dark w-5 h-5 mt-1" />
                  <span>קיימת חניית נכים בקרבת הסטודיו ובחניונים הסמוכים.</span>
                </div>
                <div className="flex items-start gap-3 p-4 bg-stone-50 dark:bg-stone-900/50 rounded-2xl">
                  <CheckCircle2 className="text-primary-dark w-5 h-5 mt-1" />
                  <span>קיימת גישה רציפה וחופשית ממפלס הרחוב ועד לפתח הסטודיו.</span>
                </div>
                <div className="flex items-start gap-3 p-4 bg-stone-50 dark:bg-stone-900/50 rounded-2xl">
                  <Phone className="text-primary-dark w-5 h-5 mt-1" />
                  <span>ניתן לקבל שיוע אישי ממזכירות הסטודיו במידת הצורך.</span>
                </div>
              </div>
            </section>

            <section className="bg-primary/5 p-8 rounded-[2rem] border border-primary/10">
              <h2 className="text-xl font-bold text-dark dark:text-white mb-4">רכז נגישות ודיווח על תקלות</h2>
              <p className="mb-6">
                אם נתקלתם בקושי בגלישה באתר או בבעיית נגישות כלשהי, נשמח לקבל פנייה ולתקן את הליקוי בהקדם האפשרי.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-white dark:bg-stone-800 flex items-center justify-center shadow-sm">
                    <User size={18} className="text-primary-dark" />
                  </div>
                  <div>
                    <span className="block text-xs text-stone-400 font-bold uppercase tracking-widest">רכזת נגישות</span>
                    <span className="font-bold text-dark dark:text-white">אלנה אפשטיין</span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-white dark:bg-stone-800 flex items-center justify-center shadow-sm">
                    <Phone size={18} className="text-primary-dark" />
                  </div>
                  <div>
                    <span className="block text-xs text-stone-400 font-bold uppercase tracking-widest">טלפון</span>
                    <a href="tel:053-461-1370" className="font-bold text-dark dark:text-white hover:text-primary transition-colors line-numbers">053-461-1370</a>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-white dark:bg-stone-800 flex items-center justify-center shadow-sm">
                    <Mail size={18} className="text-primary-dark" />
                  </div>
                  <div>
                    <span className="block text-xs text-stone-400 font-bold uppercase tracking-widest">דוא"ל</span>
                    <span className="font-bold text-dark dark:text-white">studio@elena-nails.co.il</span>
                  </div>
                </div>
              </div>
            </section>

            <div className="pt-8 border-t border-black/5 dark:border-white/5 text-center">
              <p className="text-xs text-stone-400 font-medium tracking-wide italic">
                הצהרת הנגישות עודכנה לאחרונה בתאריך: 05.04.2026
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

const User = ({ size, className }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);
