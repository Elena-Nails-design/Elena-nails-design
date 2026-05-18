import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function FloatingWhatsApp() {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() === 'rtl';
  
  // Use the same phone number from Contact.jsx
  const phoneNumber = '9720534611370';
  const whatsappUrl = `https://wa.me/${phoneNumber.replace('+', '')}?text=${encodeURIComponent(t('contact.whatsapp_msg'))}`;

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noreferrer"
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-8 left-8 z-50 flex items-center gap-3 px-6 h-16 bg-[#1a8c4a] text-white rounded-full shadow-luxury hover:bg-[#25D366] transition-all duration-300 group text-decoration-none"
      aria-label={i18n.language === 'he' ? 'קבעי תור בוואטסאפ — צרי קשר עם אלנה' : i18n.language === 'ru' ? 'Записаться в WhatsApp — связаться с Еленой' : 'Book on WhatsApp — Contact Elena'}
    >
      <span className="text-xs font-bold uppercase tracking-widest" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>
        {i18n.language === 'he' ? 'קבעי תור בוואטסאפ' : i18n.language === 'ru' ? 'Записаться в WhatsApp' : 'Book on WhatsApp'}
      </span>
      <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center group-hover:rotate-12 transition-transform">
        <MessageCircle className="w-5 h-5 fill-current" />
      </div>
    </motion.a>
  );
}
