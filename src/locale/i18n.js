import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

// All language files json path here
import en from './translations/en.json';

i18n
.use(initReactI18next)
.init({
  compatibilityJSON: 'v3',
  lng: 'en',
  fallbackLng: 'en',
  resources: {
    en: en,
  },
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
