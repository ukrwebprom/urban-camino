import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import enTranslation from './locales/en.json';
import uaTranslation from './locales/ua.json';

i18n
  .use(LanguageDetector) // определение языка по локали или localStorage
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    debug: false,
    interpolation: {
      escapeValue: false,
    },
    resources: {
    en: { translation: enTranslation },
    ua: { translation: uaTranslation },
    },
  });

export default i18n;
