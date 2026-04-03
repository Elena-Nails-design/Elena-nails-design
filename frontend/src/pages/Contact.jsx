import { useTranslation } from 'react-i18next';
import { MapPin, Phone, MessageCircle, Send, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const Instagram = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

export default function Contact() {
  const { t, i18n } = useTranslation();
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
                    <div className="ps-14">
                      <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-3">{t('footer.address')}</p>
                      <div className="flex flex-wrap gap-2">
                        <a 
                          href="https://waze.com/ul?q=העצמאות+93,+אשדוד&navigate=yes" 
                          target="_blank" 
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 text-[10px] font-bold text-dark dark:text-white bg-white/60 dark:bg-white/10 px-3 py-1.5 rounded-full hover:bg-primary hover:text-white transition-colors border border-black/5 dark:border-white/10 uppercase tracking-wider"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
                          Waze
                        </a>
                        <a 
                          href="https://www.google.com/maps/search/?api=1&query=העצמאות+93,+אשדוד" 
                          target="_blank" 
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 text-[10px] font-bold text-dark dark:text-white bg-white/60 dark:bg-white/10 px-3 py-1.5 rounded-full hover:bg-primary hover:text-white transition-colors border border-black/5 dark:border-white/10 uppercase tracking-wider"
                        >
                          <MapPin className="w-3 h-3" />
                          Google Maps
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="group">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-10 h-10 bg-white/50 dark:bg-white/5 rounded-full flex items-center justify-center text-primary dark:text-primary-dark group-hover:scale-110 transition-transform shadow-sm">
                        <Phone className="w-5 h-5" />
                      </div>
                      <h3 className="font-bold text-dark dark:text-white uppercase tracking-wider text-xs">{t('contact.phone_title')}</h3>
                    </div>
                     <p className="text-gray-600 dark:text-gray-400 ps-14 text-sm tracking-widest">
                       <a href="tel:+9720534611370" className="hover:text-primary transition-colors inline-block" dir="ltr">053-461-1370</a>
                     </p>
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
                    <div className="text-gray-600 dark:text-gray-400 ps-14 text-sm space-y-1">
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
                    <a href={whatsappUrl} target="_blank" rel="noreferrer" aria-label="WhatsApp"
                       className="w-12 h-12 glass-luxury flex items-center justify-center text-primary hover:text-white hover:bg-[#25D366] transition-all duration-300">
                      <MessageCircle className="w-5 h-5" />
                    </a>
                    <a href="https://www.instagram.com/nails_epshtein?igsh=cDR6aTF5OG1qbm1p" target="_blank" rel="noreferrer" aria-label="Instagram"
                       className="w-12 h-12 glass-luxury flex items-center justify-center text-primary hover:text-white hover:bg-[#E1306C] transition-all duration-300">
                      <Instagram className="w-5 h-5" />
                    </a>
                    <a href="https://www.facebook.com/share/18afmCSD26/?mibextid=wwXIfr" target="_blank" rel="noreferrer" aria-label="Facebook"
                       className="w-12 h-12 glass-luxury flex items-center justify-center text-primary hover:text-white hover:bg-[#1877F2] transition-all duration-300">
                      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                    </a>
                  </div>
              </div>
            </div>
          </div>

          {/* Action Card */}
          <div className="h-full animate-fade-in-right" style={{ animationDelay: '0.2s' }}>
            <div className="glass-luxury p-10 h-full border border-white/40 dark:border-white/5 flex flex-col justify-center text-center">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center text-primary mx-auto mb-8">
                <Send className="w-10 h-10" />
              </div>
              <h2 className="text-3xl font-bold text-dark dark:text-white mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
                {i18n.language === 'he' ? 'מוכנה לציפורניים מושלמות?' : i18n.language === 'ru' ? 'Готовы к идеальным ногтям?' : 'Ready for Perfect Nails?'}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-10 font-light leading-relaxed">
                {i18n.language === 'he' ? 'צרי קשר עכשיו ונתאים לך את התור המושלם.' : i18n.language === 'ru' ? 'Свяжитесь с нами сейчас, и мы подберем для вас идеальное время.' : 'Contact us now and we will find the perfect time for you.'}
              </p>
              <motion.a 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="btn-premium inline-flex items-center justify-center gap-4 group shimmer-gold w-full"
              >
                <span>{t('home.book_now')}</span>
                <MessageCircle className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              </motion.a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
