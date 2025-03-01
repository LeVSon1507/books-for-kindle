import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enCommon from "../en/common.json";
import enHome from "../en/home.json";
import viCommon from "../vi/common.json";
import viHome from "../vi/home.json";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";

let defaultLanguage = "vi";

if (typeof window !== "undefined") {
  const savedLanguage = localStorage.getItem("language");
  defaultLanguage = savedLanguage || defaultLanguage;
}

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        common: enCommon,
        home: enHome,
      },
      vi: {
        common: viCommon,
        home: viHome,
      },
    },
    lng: defaultLanguage,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
    ns: ["common", "home"],
    defaultNS: "common",
  });

export default i18n;
