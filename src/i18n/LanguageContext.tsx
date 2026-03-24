import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { en } from "./translations/en";
import { pt } from "./translations/pt";
import type { Translations } from "./translations/en";

export type Language = "en" | "pt";

interface LanguageContextValue {
  language: Language;
  setLanguage: (lang: Language) => void;
  translations: Translations;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

const STORAGE_KEY = "wedding-lang";

const translationMap: Record<Language, Translations> = { en, pt };

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "en" || stored === "pt") return stored;
    return "en";
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem(STORAGE_KEY, lang);
    document.documentElement.lang = lang === "pt" ? "pt-PT" : "en";
  };

  // Set document lang + meta tags on mount and language change
  useEffect(() => {
    document.documentElement.lang = language === "pt" ? "pt-PT" : "en";

    const t = translationMap[language];
    document.title = t.meta.title;
    document.querySelector('meta[name="description"]')?.setAttribute("content", t.meta.description);
    document.querySelector('meta[property="og:title"]')?.setAttribute("content", t.meta.title);
    document.querySelector('meta[property="og:description"]')?.setAttribute("content", t.meta.description);
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, translations: translationMap[language] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
