import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationHE from './locales/he.json';
import translationEN from './locales/en.json';
import translationRU from './locales/ru.json';

const resources = {
  he: {
    translation: translationHE
  },
  en: {
    translation: translationEN
  },
  ru: {
    translation: translationRU
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "he",
    fallbackLng: "he",
    interpolation: {
      escapeValue: false 
    }
  });

export default i18n;
