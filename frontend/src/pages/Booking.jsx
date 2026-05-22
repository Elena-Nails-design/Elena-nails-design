import { useState, useMemo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { MapPin, Phone, MessageCircle, Instagram, Facebook } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { he, ru, enUS } from 'date-fns/locale';

registerLocale('he', he);
registerLocale('ru', ru);
registerLocale('en', enUS);
import SEO from '../components/SEO';

const STUDIO_PHONE = '9720534611370';
const INSTAGRAM_URL = 'https://www.instagram.com/nails_epshtein';
const FACEBOOK_URL = 'https://www.facebook.com/share/18afmCSD26/';

// Working hours per day (0=Sun ... 6=Sat)
const WORKING_HOURS = {
  0: { start: '09:00', end: '19:00' }, // Sunday
  1: { start: '09:00', end: '19:00' }, // Monday
  2: { start: '09:00', end: '19:00' }, // Tuesday
  3: { start: '09:00', end: '19:00' }, // Wednesday
  4: { start: '09:00', end: '19:00' }, // Thursday
  5: { start: '09:00', end: '14:00' }, // Friday
  // 6 = Saturday — closed
};

function generateTimeSlots(startTime, endTime) {
  const slots = [];
  const [startH, startM] = startTime.split(':').map(Number);
  const [endH, endM] = endTime.split(':').map(Number);
  let h = startH, m = startM;
  while (h < endH || (h === endH && m < endM)) {
    slots.push(`${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`);
    m += 30;
    if (m >= 60) { h += 1; m -= 60; }
  }
  return slots;
}

export default function Booking() {
  const { t, i18n } = useTranslation();

  const today = new Date().toISOString().split('T')[0];

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: '',
    date: '',
    time: ''
  });

  // Compute available time slots based on selected date
  const timeSlots = useMemo(() => {
    if (!formData.date) return [];
    const dayOfWeek = new Date(formData.date + 'T12:00:00').getDay();
    const hours = WORKING_HOURS[dayOfWeek];
    if (!hours) return []; // Saturday or unknown
    return generateTimeSlots(hours.start, hours.end);
  }, [formData.date]);

  const handleDateChange = useCallback((date) => {
    if (!date) {
      setFormData(prev => ({ ...prev, date: '', time: '' }));
      return;
    }
    // Format to YYYY-MM-DD
    const val = date.toISOString().split('T')[0];
    setFormData(prev => ({ ...prev, date: val, time: '' }));
  }, []);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }, []);

  const buildMessage = useCallback(() => {
    const isHe = i18n.language === 'he';
    const isRu = i18n.language === 'ru';
    if (isHe) return (
      `שלום אלנה! 💅\nרוצה לקבוע תור:\n\n` +
      `👤 שם: ${formData.name}\n📞 טלפון: ${formData.phone}\n💄 טיפול: ${formData.service}\n📅 תאריך: ${formData.date}\n⏰ שעה: ${formData.time}\n\n` +
      `🎁 מגיע לי 10% הנחה על הטיפול הראשון (מהאתר)!\n\nמחכה לאישורך 🙏`
    );
    if (isRu) return (
      `Привет, Елена! 💅\nХочу записаться на приём:\n\n` +
      `👤 Имя: ${formData.name}\n📞 Телефон: ${formData.phone}\n💄 Услуга: ${formData.service}\n📅 Дата: ${formData.date}\n⏰ Время: ${formData.time}\n\n` +
      `🎁 Мне полагается скидка 10% на первую процедуру (с сайта)!\n\nЖду подтверждения 🙏`
    );
    return (
      `Hello Elena! 💅\nI'd like to book an appointment:\n\n` +
      `👤 Name: ${formData.name}\n📞 Phone: ${formData.phone}\n💄 Service: ${formData.service}\n📅 Date: ${formData.date}\n⏰ Time: ${formData.time}\n\n` +
      `🎁 I'm eligible for a 10% discount on my first treatment (from the website)!\n\nAwaiting your confirmation 🙏`
    );
  }, [i18n.language, formData]);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    const message = buildMessage();
    const whatsappUrl = `https://wa.me/${STUDIO_PHONE}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    setFormData({ name: '', phone: '', service: '', date: '', time: '' });
  }, [buildMessage]);

  return (
    <div className="pt-24 pb-20 bg-nude dark:bg-gray-900 min-h-screen transition-colors duration-500 overflow-hidden relative flex items-center">
      <SEO 
        title={t('nav.booking')} 
        description={t('booking.subtitle')} 
        keywords={
          i18n.language === 'he' ? 'קביעת תור לק ג\'ל אשדוד, תיאום תור מניקור אשדוד, הזמנת תור פדיקור אשדוד, לק ג\'ל אשדוד מומלצת, תיאום תור אלנה אפשטיין, קביעת תור לק ג\'ל אשקלון, מניקור גן יבנה קביעת תור' :
          i18n.language === 'ru' ? 'записаться на маникюр Ашдод, онлайн запись педикюр Ашдод, бронирование ногти Ашдод, Елена Эпштейн запись' :
          'book manicure Ashdod, online booking gel polish Ashdod, schedule pedicure Ashdod, Elena Epshtein scheduling'
        }
      />
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-[20%] right-[-5%] w-[30%] h-[30%] bg-primary/20 blur-[100px] rounded-full animate-float"></div>
        <div className="absolute bottom-[10%] left-[-5%] w-[30%] h-[30%] bg-gold/10 blur-[100px] rounded-full animate-float" style={{ animationDelay: '3s' }}></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="glass-luxury overflow-hidden flex flex-col md:flex-row border border-white/40 dark:border-white/5 shadow-2xl">

          {/* Left Side - Info */}
          <div className="md:w-5/12 bg-primary dark:bg-primary-dark p-12 text-white flex flex-col justify-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <div className="relative z-10">
              <span className="text-white/60 tracking-[0.3em] uppercase text-[10px] font-bold mb-4 block">{t('booking.loc1')}</span>
              <h2 className="text-4xl md:text-5xl font-bold mb-8 tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>
                {t('booking.title')}
              </h2>
              <p className="mb-10 text-white/80 font-light leading-relaxed text-sm">{t('booking.subtitle')}</p>
              <div className="space-y-4 pt-10 border-t border-white/10">
                <div className="flex items-center gap-3 text-xs tracking-widest opacity-70">
                  <MapPin className="w-4 h-4 shrink-0" />
                  <a 
                    href="https://www.google.com/maps/search/?api=1&query=העצמאות+93,+אשדוד" 
                    target="_blank" 
                    rel="noreferrer" 
                    className="hover:underline hover:opacity-100 transition-opacity"
                  >
                    {t('footer.address')}
                  </a>
                </div>
                <div className="flex items-center gap-3 text-xs tracking-widest opacity-70" dir="ltr">
                  <Phone className="w-4 h-4 shrink-0" />
                  <a href="tel:+9720534611370" className="hover:opacity-100 transition-opacity">053-461-1370</a>
                </div>
              </div>
            </div>
          </div>

          <div className="md:w-7/12 p-12 bg-white/40 dark:bg-black/20 backdrop-blur-sm flex items-center">
            <h1 className="sr-only">{t('booking.seo_h1')}</h1>
            <AnimatePresence mode="wait">
                {/* FORM */}
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="w-full space-y-8"
                >
                  {/* Name + Phone */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="group">
                      <label htmlFor="name" className="block text-[10px] font-bold text-gray-600 dark:text-gray-400 uppercase tracking-[0.2em] mb-2 group-focus-within:text-primary transition-colors">{t('booking.form_name')}</label>
                      <input
                        id="name"
                        type="text" name="name" required
                        aria-required="true"
                        value={formData.name} onChange={handleChange}
                        className="w-full bg-transparent border-b border-black/10 dark:border-white/10 py-2 focus:outline-none focus:border-primary dark:focus:border-primary-dark transition-all text-dark dark:text-white placeholder:text-gray-300 dark:placeholder:text-gray-700"
                        placeholder={t('booking.form_name_ph')}
                      />
                    </div>
                    <div className="group">
                      <label htmlFor="phone" className="block text-[10px] font-bold text-gray-600 dark:text-gray-400 uppercase tracking-[0.2em] mb-2 group-focus-within:text-primary transition-colors">{t('booking.form_phone')}</label>
                      <input
                        id="phone"
                        type="tel" name="phone" required
                        aria-required="true"
                        value={formData.phone} onChange={handleChange}
                        className="w-full bg-transparent border-b border-black/10 dark:border-white/10 py-2 focus:outline-none focus:border-primary dark:focus:border-primary-dark transition-all text-dark dark:text-white font-mono tracking-widest"
                        placeholder={t('booking.form_phone_ph')} dir="ltr"
                      />
                    </div>
                  </div>

                  {/* Service */}
                  <div className="group">
                    <label htmlFor="service" className="block text-[10px] font-bold text-gray-600 dark:text-gray-400 uppercase tracking-[0.2em] mb-2 group-focus-within:text-primary transition-colors">{t('booking.form_service')}</label>
                    <select
                      id="service"
                      name="service" required
                      aria-required="true"
                      value={formData.service} onChange={handleChange}
                      className="w-full bg-transparent border-b border-black/10 dark:border-white/10 py-2 focus:outline-none focus:border-primary dark:focus:border-primary-dark transition-all text-dark dark:text-white appearance-none cursor-pointer"
                    >
                      <option value="" disabled>{t('booking.form_service_ph')}</option>
                      <option value={t('booking.opt_gel')}>{t('booking.opt_gel')}</option>
                      <option value={t('booking.opt_classic')}>{t('booking.opt_classic')}</option>
                      <option value={t('booking.opt_pedi_cosmetic')}>{t('booking.opt_pedi_cosmetic')}</option>
                      <option value={t('booking.opt_pedi_medical')}>{t('booking.opt_pedi_medical')}</option>
                      <option value={t('booking.opt_removal')}>{t('booking.opt_removal')}</option>
                    </select>
                  </div>

                  {/* Date + Time */}
                  <div className="grid grid-cols-2 gap-8">
                    <div className="group">
                      <label htmlFor="date" className="block text-[10px] font-bold text-gray-600 dark:text-gray-400 uppercase tracking-[0.2em] mb-2 group-focus-within:text-primary transition-colors">{t('booking.form_date')}</label>
                      <DatePicker
                        id="date"
                        selected={formData.date ? new Date(formData.date + 'T12:00:00') : null}
                        onChange={handleDateChange}
                        minDate={new Date()}
                        filterDate={(date) => date.getDay() !== 6}
                        dateFormat="dd/MM/yyyy"
                        locale={i18n.language === 'en' ? 'en' : i18n.language}
                        withPortal
                        onKeyDown={(e) => e.preventDefault()}
                        className="w-full bg-transparent border-b border-black/10 dark:border-white/10 py-2 focus:outline-none focus:border-primary dark:focus:border-primary-dark transition-all text-dark dark:text-white cursor-pointer"
                        placeholderText={t('booking.form_date')}
                        required
                      />
                    </div>

                    <div className="group">
                      <label htmlFor="time" className="block text-[10px] font-bold text-gray-600 dark:text-gray-400 uppercase tracking-[0.2em] mb-2 group-focus-within:text-primary transition-colors">{t('booking.form_time')}</label>
                      <select
                        id="time"
                        name="time" required
                        aria-required="true"
                        value={formData.time} onChange={handleChange}
                        disabled={timeSlots.length === 0}
                        className="w-full bg-transparent border-b border-black/10 dark:border-white/10 py-2 focus:outline-none focus:border-primary dark:focus:border-primary-dark transition-all text-dark dark:text-white appearance-none cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        <option value="" disabled>
                          {formData.date
                            ? (i18n.language === 'he' ? 'בחרי שעה' : i18n.language === 'ru' ? 'Выберите время' : 'Select time')
                            : (i18n.language === 'he' ? 'בחרי תאריך קודם' : i18n.language === 'ru' ? 'Сначала выберите дату' : 'Choose date first')}
                        </option>
                        {timeSlots.map(slot => (
                          <option key={slot} value={slot}>{slot}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    className="w-full py-4 bg-dark hover:bg-primary-dark text-white rounded-full font-bold uppercase tracking-[0.3em] text-[10px] transition-all duration-500 transform hover:scale-[1.02] active:scale-95 shadow-lg"
                  >
                    {t('booking.form_submit')}
                  </button>

                  <div className="text-center">
                    <p className="text-[9px] text-gray-400 dark:text-gray-500 font-bold uppercase tracking-[0.2em] opacity-80 flex items-center justify-center gap-2">
                      <span className="w-4 h-px bg-gold/30"></span>
                      {t('booking.trust_banner')}
                      <span className="w-4 h-px bg-gold/30"></span>
                    </p>
                  </div>
                </motion.form>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
