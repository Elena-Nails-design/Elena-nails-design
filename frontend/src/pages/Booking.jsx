import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MapPin, Phone, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const STUDIO_PHONE = '9720534611370';

export default function Booking() {
  const { t, i18n } = useTranslation();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: '',
    date: '',
    time: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Build a clean WhatsApp message, sensitive to current language
    const isHe = i18n.language === 'he';
    const isRu = i18n.language === 'ru';

    let msg;
    if (isHe) {
      msg =
        `שלום אלנה! 💅\n` +
        `רוצה לקבוע תור:\n\n` +
        `👤 שם: ${formData.name}\n` +
        `📞 טלפון: ${formData.phone}\n` +
        `💄 טיפול: ${formData.service}\n` +
        `📅 תאריך: ${formData.date}\n` +
        `⏰ שעה: ${formData.time}\n\n` +
        `מחכה לאישורך 🙏`;
    } else if (isRu) {
      msg =
        `Привет, Елена! 💅\n` +
        `Хочу записаться на приём:\n\n` +
        `👤 Имя: ${formData.name}\n` +
        `📞 Телефон: ${formData.phone}\n` +
        `💄 Услуга: ${formData.service}\n` +
        `📅 Дата: ${formData.date}\n` +
        `⏰ Время: ${formData.time}\n\n` +
        `Жду подтверждения 🙏`;
    } else {
      msg =
        `Hello Elena! 💅\n` +
        `I would like to book an appointment:\n\n` +
        `👤 Name: ${formData.name}\n` +
        `📞 Phone: ${formData.phone}\n` +
        `💄 Service: ${formData.service}\n` +
        `📅 Date: ${formData.date}\n` +
        `⏰ Time: ${formData.time}\n\n` +
        `Awaiting your confirmation 🙏`;
    }

    const url = `https://wa.me/${STUDIO_PHONE}?text=${encodeURIComponent(msg)}`;
    setSubmitted(true);

    // Short delay so user sees success screen, then open WhatsApp
    setTimeout(() => {
      window.open(url, '_blank');
    }, 800);
  };

  // Get today's date for min date restriction
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="pt-24 pb-20 bg-nude dark:bg-gray-900 min-h-screen transition-colors duration-500 overflow-hidden relative flex items-center">
      {/* Abstract Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-[20%] right-[-5%] w-[30%] h-[30%] bg-primary/20 blur-[100px] rounded-full animate-float"></div>
        <div className="absolute bottom-[10%] left-[-5%] w-[30%] h-[30%] bg-gold/10 blur-[100px] rounded-full animate-float" style={{ animationDelay: '3s' }}></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 animate-fade-in">
        <div className="glass-luxury overflow-hidden flex flex-col md:flex-row border border-white/40 dark:border-white/5 shadow-2xl">
          {/* Left Side - Info */}
          <div className="md:w-5/12 bg-primary dark:bg-primary-dark p-12 text-white flex flex-col justify-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <div className="relative z-10">
              <span className="text-white/60 tracking-[0.3em] uppercase text-[10px] font-bold mb-4 block">{t('booking.loc1')}</span>
              <h2 className="text-4xl md:text-5xl font-bold mb-8 tracking-tight lead-tight" style={{ fontFamily: 'var(--font-heading)' }}>
                {t('booking.title')}
              </h2>
              <p className="mb-10 text-white/80 font-light leading-relaxed text-sm">
                {t('booking.subtitle')}
              </p>

              <div className="space-y-4 pt-10 border-t border-white/10">
                <div className="flex items-center gap-3 text-xs tracking-widest opacity-70">
                  <MapPin className="w-4 h-4 shrink-0" />
                  <span>{t('footer.address')}</span>
                </div>
                <div className="flex items-center gap-3 text-xs tracking-widest opacity-70" dir="ltr">
                  <Phone className="w-4 h-4 shrink-0" />
                  <a href="tel:+9720534611370" className="hover:opacity-100 transition-opacity">053-461-1370</a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Form / Success */}
          <div className="md:w-7/12 p-12 bg-white/40 dark:bg-black/20 backdrop-blur-sm flex items-center">
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="w-full flex flex-col items-center justify-center text-center gap-6 py-8"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.1 }}
                  >
                    <CheckCircle2 className="w-16 h-16 text-primary dark:text-primary-dark" strokeWidth={1.5} />
                  </motion.div>
                  <h3 className="text-2xl font-bold" style={{ fontFamily: 'var(--font-heading)' }}>
                    {t('booking.success_title')}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xs">
                    {t('booking.success_subtitle')}
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-2 text-[10px] font-bold tracking-[0.2em] uppercase text-primary dark:text-primary-dark underline underline-offset-4"
                  >
                    {t('booking.book_another')}
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="w-full space-y-8"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="group">
                      <label className="block text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] mb-2 group-focus-within:text-primary transition-colors">{t('booking.form_name')}</label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full bg-transparent border-b border-black/10 dark:border-white/10 py-2 focus:outline-none focus:border-primary dark:focus:border-primary-dark transition-all text-dark dark:text-white placeholder:text-gray-300 dark:placeholder:text-gray-700"
                        placeholder={t('booking.form_name_ph')}
                      />
                    </div>

                    <div className="group">
                      <label className="block text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] mb-2 group-focus-within:text-primary transition-colors">{t('booking.form_phone')}</label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full bg-transparent border-b border-black/10 dark:border-white/10 py-2 focus:outline-none focus:border-primary dark:focus:border-primary-dark transition-all text-dark dark:text-white placeholder:text-gray-300 dark:placeholder:text-gray-700 font-mono tracking-widest"
                        placeholder={t('booking.form_phone_ph')}
                        dir="ltr"
                      />
                    </div>
                  </div>

                  <div className="group">
                    <label className="block text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] mb-2 group-focus-within:text-primary transition-colors">{t('booking.form_service')}</label>
                    <select
                      name="service"
                      required
                      value={formData.service}
                      onChange={handleChange}
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

                  <div className="grid grid-cols-2 gap-8">
                    <div className="group">
                      <label className="block text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] mb-2 group-focus-within:text-primary transition-colors">{t('booking.form_date')}</label>
                      <input
                        type="date"
                        name="date"
                        required
                        min={today}
                        value={formData.date}
                        onChange={handleChange}
                        className="w-full bg-transparent border-b border-black/10 dark:border-white/10 py-2 focus:outline-none focus:border-primary dark:focus:border-primary-dark transition-all text-dark dark:text-white cursor-pointer"
                      />
                    </div>
                    <div className="group">
                      <label className="block text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] mb-2 group-focus-within:text-primary transition-colors">{t('booking.form_time')}</label>
                      <input
                        type="time"
                        name="time"
                        required
                        min="09:00"
                        max="19:00"
                        value={formData.time}
                        onChange={handleChange}
                        className="w-full bg-transparent border-b border-black/10 dark:border-white/10 py-2 focus:outline-none focus:border-primary dark:focus:border-primary-dark transition-all text-dark dark:text-white cursor-pointer"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-[#25D366] hover:bg-[#1ebe5a] text-white rounded-full font-bold uppercase tracking-[0.3em] text-[10px] transition-all duration-500 transform hover:scale-[1.02] active:scale-95 shadow-lg group relative overflow-hidden flex items-center justify-center gap-3"
                  >
                    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white shrink-0" xmlns="http://www.w3.org/2000/svg">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    <span className="relative z-10">{t('booking.form_submit')}</span>
                  </button>

                  <div className="text-center">
                    <p className="text-[9px] text-gray-400 dark:text-gray-500 font-bold uppercase tracking-[0.2em] opacity-80 flex items-center justify-center gap-2">
                      <span className="w-4 h-px bg-gold/30"></span>
                      {t('booking.trust_banner')}
                      <span className="w-4 h-px bg-gold/30"></span>
                    </p>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
