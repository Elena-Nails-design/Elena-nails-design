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
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: 'spring', stiffness: 200, damping: 20 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className={`fixed bottom-6 ${isRtl ? 'left-6' : 'right-6'} z-50 flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-lg hover:shadow-xl hover:bg-[#20bd5a] transition-colors`}
      aria-label="Contact us on WhatsApp"
    >
      <MessageCircle className="w-7 h-7" />
    </motion.a>
  );
}
