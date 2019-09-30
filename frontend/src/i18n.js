import LanguageDetector from 'i18next-browser-languagedetector';
import * as en from "./locales/en/translation.json"
import * as es from "./locales/es/translation.json"

const i18n = require('i18next').default;
i18n
  .use(LanguageDetector) 
  .init({
    resources: { 
        en: {translation: en},
        es: {translation: es}
    },
    fallbackLng: "en",
    keySeparator: false, 

    interpolation: {
      escapeValue: false 
    }
  });

export default i18n;