import { useTranslation } from 'react-i18next';
import { MapPin, Phone, MessageCircle, Send, Clock } from 'lucide-react';

const Instagram = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

export default function Contact() {
  const { t } = useTranslation();
  const phoneNumber = '+972501234567';
  const whatsappUrl = `https://wa.me/${phoneNumber.replace('+', '')}?text=${encodeURIComponent('היי ילנה, אשמח לקבוע תור!')}`;

  return (
    <div className="pt-10 pb-20 bg-nude dark:bg-gray-800 min-h-[80vh] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-5xl font-bold text-dark dark:text-white mb-6 tracking-wide" style={{ fontFamily: 'var(--font-heading)' }}>{t('contact.title')}</h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-xl mx-auto font-light leading-loose">{t('contact.desc')}</p>
          <div className="w-16 h-1 bg-gold mx-auto rounded-full mt-8"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 text-start">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="bg-white dark:bg-gray-900 rounded-[2rem] p-10 shadow-sm hover:shadow-xl border border-white dark:border-gray-800 transition-all duration-300 transform hover:-translate-y-1">
              <h2 className="text-3xl font-bold text-dark dark:text-white mb-8" style={{ fontFamily: 'var(--font-heading)' }}>{t('contact.info_title')}</h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-nude dark:bg-gray-800 rounded-full flex items-center justify-center shrink-0 text-primary-dark">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-dark dark:text-white mb-1">{t('contact.address_title')}</h3>
                    <p className="text-gray-600 dark:text-gray-400">{t('footer.address')}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-nude dark:bg-gray-800 rounded-full flex items-center justify-center shrink-0 text-primary-dark">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-dark dark:text-white mb-1">{t('contact.phone_title')}</h3>
                    <p className="text-gray-600 dark:text-gray-400" dir="ltr">{t('footer.phone')}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-nude dark:bg-gray-800 rounded-full flex items-center justify-center shrink-0 text-primary-dark">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-dark dark:text-white mb-1">{t('contact.hours_title')}</h3>
                    <div className="text-gray-600 dark:text-gray-400 space-y-1">
                      <p>{t('footer.hours_week')}</p>
                      <p>{t('footer.hours_weekend')}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Social */}
            <div className="bg-white dark:bg-gray-900 rounded-[2rem] p-10 shadow-sm hover:shadow-xl border border-white dark:border-gray-800 transition-all duration-300 transform hover:-translate-y-1">
              <h2 className="text-3xl font-bold text-dark dark:text-white mb-8" style={{ fontFamily: 'var(--font-heading)' }}>{t('footer.social_title')}</h2>
              <div className="flex gap-4">
                <a href="https://instagram.com" target="_blank" rel="noreferrer" className="w-12 h-12 bg-nude dark:bg-gray-800 rounded-full flex items-center justify-center text-primary hover:text-white hover:bg-primary-dark transition-all">
                  <Instagram className="w-6 h-6" />
                </a>
                <a href={whatsappUrl} target="_blank" rel="noreferrer" className="w-12 h-12 bg-nude dark:bg-gray-800 rounded-full flex items-center justify-center text-primary hover:text-white hover:bg-primary-dark transition-all">
                  <Send className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-3xl overflow-hidden h-96 shadow-sm border border-white dark:border-gray-700">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13511.458999827038!2d34.8214!3d32.1648!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151d4841a00a4fb1%3A0x600f6c2f56708ab0!2sHerzliya%2C%20Israel!5e0!3m2!1sen!2sus!4v1711200000000!5m2!1sen!2sus" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Studio Location"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}
