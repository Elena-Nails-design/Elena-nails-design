import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

export default function Booking() {
  const { t } = useTranslation();
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: 'מניקור ג\'ל', 
    date: '',
    time: ''
  });
  
  const [status, setStatus] = useState({ state: 'idle', message: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ state: 'loading', message: t('booking.form_loading') });
    try {
      // Simulate API or call real endpoint
      await axios.post('http://localhost:5000/api/bookings', formData);
      setStatus({ state: 'success', message: t('booking.form_success') });
      setFormData({ name: '', phone: '', service: 'מניקור ג\'ל', date: '', time: '' });
    } catch (error) {
      setStatus({ state: 'error', message: t('booking.form_error') });
    }
  };

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
                   <MapPin className="w-4 h-4" />
                   <span>{t('footer.address')}</span>
                </div>
                <div className="flex items-center gap-3 text-xs tracking-widest opacity-70" dir="ltr">
                   <Phone className="w-4 h-4" />
                   <span>+972 50 123 4567</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="md:w-7/12 p-12 bg-white/40 dark:bg-black/20 backdrop-blur-sm">
            <form onSubmit={handleSubmit} className="space-y-8">
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
                  value={formData.service}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-black/10 dark:border-white/10 py-2 focus:outline-none focus:border-primary dark:focus:border-primary-dark transition-all text-dark dark:text-white appearance-none cursor-pointer"
                >
                  <option value="מניקור ג'ל">{t('booking.opt_gel')}</option>
                  <option value="מניקור קלאסי">{t('booking.opt_classic')}</option>
                  <option value="פדיקור קוסמטי">{t('booking.opt_pedi_cosmetic')}</option>
                  <option value="פדיקור רפואי">{t('booking.opt_pedi_medical')}</option>
                  <option value="הסרת ג'ל בלבד">{t('booking.opt_removal')}</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-8">
                <div className="group">
                  <label className="block text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] mb-2 group-focus-within:text-primary transition-colors">{t('booking.form_date')}</label>
                  <input 
                    type="date" 
                    name="date"
                    required
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-black/10 dark:border-white/10 py-2 focus:outline-none focus:border-primary dark:focus:border-primary-dark transition-all text-dark dark:text-white cursor-pointer invert dark:invert-0"
                  />
                </div>
                <div className="group">
                  <label className="block text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] mb-2 group-focus-within:text-primary transition-colors">{t('booking.form_time')}</label>
                  <input 
                    type="time" 
                    name="time"
                    required
                    value={formData.time}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-black/10 dark:border-white/10 py-2 focus:outline-none focus:border-primary dark:focus:border-primary-dark transition-all text-dark dark:text-white cursor-pointer invert dark:invert-0"
                  />
                </div>
              </div>

              <button 
                type="submit" 
                disabled={status.state === 'loading'}
                className="w-full py-4 bg-primary dark:bg-primary-dark text-white rounded-full font-bold uppercase tracking-[0.3em] text-[10px] hover:bg-dark dark:hover:bg-white dark:hover:text-dark transition-all duration-500 transform hover:scale-[1.02] active:scale-95 shadow-lg group relative overflow-hidden"
              >
                <span className="relative z-10">
                  {status.state === 'loading' ? t('booking.form_loading') : t('booking.form_submit')}
                </span>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
              </button>

              <div className="text-center">
                <p className="text-[9px] text-gray-400 dark:text-gray-500 font-bold uppercase tracking-[0.2em] opacity-80 flex items-center justify-center gap-2">
                  <span className="w-4 h-px bg-gold/30"></span>
                  {t('booking.trust_banner')}
                  <span className="w-4 h-px bg-gold/30"></span>
                </p>
              </div>

              {status.message && (
                <div className={`p-4 rounded-xl text-xs font-bold tracking-wide text-center animate-bounce-in ${status.state === 'success' ? 'bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20'}`}>
                  {status.message}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
