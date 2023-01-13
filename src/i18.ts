import i18n from "i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    lng: "en",
    fallbackLng: "en",
    resources: {
      en: {
        translation: require("../../client/src/assets/translations/en.json"),
      },
      fr: {
        translation: require("../../client/src/assets/translations/fr.json"),
      },
      de: {
        translation: require("../../client/src/assets/translations/de.json"),
      },
    },
    detection: {
      order: ["querystring", "cookie"],
      caches: ["cookie"],
    },
    interpolation: {
      escapeValue: false,
    },
  });

let currentLanguage = localStorage.getItem("i18nextLng") || "en";

if (currentLanguage) {
  i18n.changeLanguage(currentLanguage);
} else {
  currentLanguage = i18n.language;
  localStorage.setItem("i18nextLng", currentLanguage);
}

export default i18n;
