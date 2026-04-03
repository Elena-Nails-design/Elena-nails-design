import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

export default function Booking() {
  const { t, i18n } = useTranslation();
  
  // Make sure to translate the initial service option too, or set a key and translate it in the view.
  // Best practice is to use keys in state, and translate in the render, 
  // but to match the backend expectation, we send the Hebrew value or universal key.
  // We'll send the localized string or just rely on the first option value always being "gel".
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
      const response = await axios.post('http://localhost:5000/api/bookings', formData);
      setStatus({ state: 'success', message: t('booking.form_success') });
      setFormData({ name: '', phone: '', service: 'מניקור ג\'ל', date: '', time: '' });
    } catch (error) {
      setStatus({ state: 'error', message: t('booking.form_error') });
    }
  };

  return (
    <div className="pt-10 pb-20 bg-nude/20 dark:bg-gray-800 min-h-screen flex items-center transition-colors duration-300">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-10">
        
        <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row text-start border border-white dark:border-gray-700 transition-colors duration-300">
          <div className="md:w-5/12 bg-primary dark:bg-primary-dark p-10 text-white flex flex-col justify-center transition-colors duration-300">
            <h2 className="text-4xl font-bold mb-6" style={{ fontFamily: 'var(--font-heading)' }}>{t('booking.title')}</h2>
            <p className="mb-6 opacity-90">{t('booking.subtitle')}</p>
            <div className="mt-auto opacity-70 text-sm">
              <p>{t('booking.loc1')}</p>
              <p dir="ltr">{t('booking.loc2')} +972-50-123-4567</p>
            </div>
          </div>

          <div className="md:w-7/12 p-10">
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('booking.form_name')}</label>
                <input 
                  type="text" 
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border-b-2 border-gray-200 dark:border-gray-700 focus:outline-none focus:border-primary dark:focus:border-primary-dark transition-all bg-nude/10 dark:bg-gray-800 text-dark dark:text-white"
                  placeholder={t('booking.form_name_ph')}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('booking.form_phone')}</label>
                <input 
                  type="tel" 
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border-b-2 border-gray-200 dark:border-gray-700 focus:outline-none focus:border-primary dark:focus:border-primary-dark transition-all bg-nude/10 dark:bg-gray-800 text-dark dark:text-white"
                  placeholder={t('booking.form_phone_ph')}
                  dir="ltr"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('booking.form_service')}</label>
                <select 
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border-b-2 border-gray-200 dark:border-gray-700 focus:outline-none focus:border-primary dark:focus:border-primary-dark transition-all bg-nude/10 dark:bg-gray-800 text-dark dark:text-white"
                >
                  <option value="מניקור ג'ל">{t('booking.opt_gel')}</option>
                  <option value="מניקור קלאסי">{t('booking.opt_classic')}</option>
                  <option value="פדיקור קוסמטי">{t('booking.opt_pedi_cosmetic')}</option>
                  <option value="פדיקור רפואי">{t('booking.opt_pedi_medical')}</option>
                  <option value="הסרת ג'ל בלבד">{t('booking.opt_removal')}</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('booking.form_date')}</label>
                    <input 
                      type="date" 
                      name="date"
                      required
                      value={formData.date}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border-b-2 border-gray-200 dark:border-gray-700 focus:outline-none focus:border-primary dark:focus:border-primary-dark transition-all bg-nude/10 dark:bg-gray-800 text-dark dark:text-white"
                    />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('booking.form_time')}</label>
                    <input 
                      type="time" 
                      name="time"
                      required
                      value={formData.time}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border-b-2 border-gray-200 dark:border-gray-700 focus:outline-none focus:border-primary dark:focus:border-primary-dark transition-all bg-nude/10 dark:bg-gray-800 text-dark dark:text-white"
                    />
                </div>
              </div>

              <button 
                type="submit" 
                disabled={status.state === 'loading'}
                className="w-full btn-primary disabled:opacity-50 disabled:hover:scale-100 disabled:hover:-translate-y-0"
              >
                {status.state === 'loading' ? t('booking.form_loading') : t('booking.form_submit')}
              </button>

              <div className="mt-4 text-center">
                <p className="text-xs text-text-secondary dark:text-text-secondary-dark font-medium antialiased tracking-wide opacity-80 flex items-center justify-center">
                  {t('booking.trust_banner')}
                </p>
              </div>

              {status.message && (
                <div className={`p-4 rounded-lg text-sm font-medium ${status.state === 'success' ? 'bg-green-50 dark:bg-green-900/30 text-green-800 dark:text-green-200' : 'bg-red-50 dark:bg-red-900/30 text-red-800 dark:text-red-200'}`}>
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
