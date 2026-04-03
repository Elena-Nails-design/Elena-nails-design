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
  const phoneNumber = '9720534611370';
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(t('contact.whatsapp_msg'))}`;

  return (
    <div className="pt-24 pb-20 bg-nude dark:bg-gray-900 min-h-screen transition-colors duration-500 overflow-hidden relative">
      {/* Abstract Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 blur-[120px] rounded-full animate-float"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-gold/10 blur-[120px] rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <span className="text-primary dark:text-primary-dark tracking-widest uppercase text-xs font-bold mb-4 block animate-fade-in">
            {t('contact.subtitle')}
          </span>
          <h1 className="text-4xl md:text-6xl font-bold text-dark dark:text-white mb-6 tracking-luxury animate-fade-in-up" 
              style={{ fontFamily: 'var(--font-heading)' }}>
            {t('contact.title')}
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-xl mx-auto font-light leading-relaxed animate-fade-in" 
             style={{ animationDelay: '0.4s' }}>
            {t('contact.desc')}
          </p>
          <div className="w-24 h-px bg-gold/30 mx-auto mt-10"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Contact Info Cards */}
          <div className="space-y-8 animate-fade-in-left">
            <div className="glass-luxury p-10 border border-white/40 dark:border-white/5">
              <h2 className="text-3xl font-bold text-dark dark:text-white mb-10 tracking-tight" 
                  style={{ fontFamily: 'var(--font-heading)' }}>
                {t('contact.info_title')}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-8">
                  <div className="group">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-10 h-10 bg-white/50 dark:bg-white/5 rounded-full flex items-center justify-center text-primary dark:text-primary-dark group-hover:scale-110 transition-transform shadow-sm">
                        <MapPin className="w-5 h-5" />
                      </div>
                      <h3 className="font-bold text-dark dark:text-white uppercase tracking-wider text-xs">{t('contact.address_title')}</h3>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 pl-14 text-sm leading-relaxed">{t('footer.address')}</p>
                  </div>

                  <div className="group">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-10 h-10 bg-white/50 dark:bg-white/5 rounded-full flex items-center justify-center text-primary dark:text-primary-dark group-hover:scale-110 transition-transform shadow-sm">
                        <Phone className="w-5 h-5" />
                      </div>
                      <h3 className="font-bold text-dark dark:text-white uppercase tracking-wider text-xs">{t('contact.phone_title')}</h3>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 pl-14 text-sm tracking-widest" dir="ltr">{phoneNumber}</p>
                  </div>
                </div>

                <div className="space-y-8">
                  <div className="group">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-10 h-10 bg-white/50 dark:bg-white/5 rounded-full flex items-center justify-center text-primary dark:text-primary-dark group-hover:scale-110 transition-transform shadow-sm">
                        <Clock className="w-5 h-5" />
                      </div>
                      <h3 className="font-bold text-dark dark:text-white uppercase tracking-wider text-xs">{t('contact.hours_title')}</h3>
                    </div>
                    <div className="text-gray-600 dark:text-gray-400 pl-14 text-sm space-y-1">
                      <p>{t('footer.hours_week')}</p>
                      <p>{t('footer.hours_weekend')}</p>
                      <p>{t('footer.sat')}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-12 pt-10 border-t border-black/5 dark:border-white/5">
                <h3 className="text-xs font-bold text-dark dark:text-white uppercase tracking-[0.2em] mb-6">{t('footer.social_title')}</h3>
                <div className="flex gap-4">
                  <a href="https://instagram.com" target="_blank" rel="noreferrer" 
                     className="w-12 h-12 glass-luxury flex items-center justify-center text-primary hover:text-white hover:bg-primary transition-all duration-300">
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a href={whatsappUrl} target="_blank" rel="noreferrer" 
                     className="w-12 h-12 glass-luxury flex items-center justify-center text-primary hover:text-white hover:bg-primary transition-all duration-300">
                    <Send className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Map Section */}
          <div className="h-full min-h-[400px] animate-fade-in-right" style={{ animationDelay: '0.2s' }}>
            <div className="glass-luxury p-4 h-full border border-white/40 dark:border-white/5 overflow-hidden group">
              <div className="w-full h-full rounded-2xl overflow-hidden relative grayscale hover:grayscale-0 transition-all duration-1000 shadow-inner">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13511.458999827038!2d34.8214!3d32.1648!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151d4841a00a4fb1%3A0x600f6c2f56708ab0!2sHerzliya%2C%20Israel!5e0!3m2!1sen!2sus!4v1711200000000!5m2!1sen!2sus" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen="" 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Studio Location"
                  className="opacity-80 group-hover:opacity-100 transition-opacity"
                ></iframe>
                <div className="absolute inset-0 pointer-events-none bg-primary/5"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
