import { useLanguage } from "./LanguageContext";

export function useTranslation() {
  const { translations, language, setLanguage } = useLanguage();
  return { t: translations, language, setLanguage };
}
