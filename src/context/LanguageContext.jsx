import { createContext, useState, useContext } from "react";
import translations from "../data/translations";

const LanguageContext = createContext();

const languages = [
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "ar", label: "عربي", flag: "🇦🇪" },
  { code: "hi", label: "हिन्दी", flag: "🇮🇳" },
  { code: "fr", label: "Français", flag: "🇫🇷" },
];

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(
    () => localStorage.getItem("lafiore_lang") || "en"
  );

  const changeLanguage = (code) => {
    setLanguage(code);
    localStorage.setItem("lafiore_lang", code);
    // Set document direction for RTL languages
    document.documentElement.dir = code === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = code;
  };

  const t = (key) => {
    return translations[language]?.[key] || translations.en[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, languages, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}

export default LanguageContext;