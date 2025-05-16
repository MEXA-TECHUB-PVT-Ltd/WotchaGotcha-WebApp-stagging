import i18n from "i18next"; // Core i18n library
import { initReactI18next } from "react-i18next"; // React integration
import HttpBackend from "i18next-http-backend"; // To load translations via HTTP
import LanguageDetector from "i18next-browser-languagedetector"; // To detect user language

i18n
  .use(HttpBackend) // Load translation files from server
  .use(LanguageDetector) // Detect user language from localStorage, browser, etc.
  .use(initReactI18next) // Integrate i18n with React
  .init({
    fallbackLng: "en", // Default language if none detected
    debug: false, // Set to true to enable debug logs

    interpolation: {
      escapeValue: false, // React already protects from XSS
    },

    backend: {
      loadPath: "/locales/{{lng}}/{{ns}}.json", // Path to translation files
    },

    detection: {
      order: ["localStorage", "navigator"], // Language detection order
      caches: ["localStorage"], // Where to store detected language
    },
  });

export default i18n; // Export i18n instance for use in the app
