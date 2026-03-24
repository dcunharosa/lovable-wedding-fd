import { useTranslation } from "@/i18n";
import type { Language } from "@/i18n";

const flags: Record<Language, { label: string; flag: JSX.Element }> = {
  en: {
    label: "English",
    flag: (
      <svg viewBox="0 0 60 30" width="22" height="14" aria-hidden="true">
        {/* Union Jack — simplified */}
        <clipPath id="uf"><rect width="60" height="30" /></clipPath>
        <g clipPath="url(#uf)">
          <rect width="60" height="30" fill="#012169" />
          <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
          <path d="M0,0 L60,30 M60,0 L0,30" stroke="#C8102E" strokeWidth="2" />
          <path d="M30,0 V30 M0,15 H60" stroke="#fff" strokeWidth="10" />
          <path d="M30,0 V30 M0,15 H60" stroke="#C8102E" strokeWidth="6" />
        </g>
      </svg>
    ),
  },
  pt: {
    label: "Português",
    flag: (
      <svg viewBox="0 0 60 40" width="22" height="14" aria-hidden="true">
        {/* Portuguese flag — simplified */}
        <rect width="60" height="40" fill="#FF0000" />
        <rect width="24" height="40" fill="#006600" />
        <circle cx="24" cy="20" r="8" fill="#FFD700" />
        <circle cx="24" cy="20" r="6" fill="#FF0000" />
        <rect x="21" y="15" width="6" height="10" rx="1" fill="#fff" />
      </svg>
    ),
  },
};

export default function LanguageSwitcher() {
  const { language, setLanguage } = useTranslation();

  return (
    <div className="flex items-center gap-1" role="radiogroup" aria-label="Language">
      {(["en", "pt"] as const).map((lang) => (
        <button
          key={lang}
          type="button"
          role="radio"
          aria-checked={language === lang}
          aria-label={flags[lang].label}
          onClick={() => setLanguage(lang)}
          className={`p-1 rounded-sm transition-opacity duration-200 ${
            language === lang
              ? "opacity-100 ring-1 ring-foreground/30"
              : "opacity-40 hover:opacity-70"
          }`}
        >
          {flags[lang].flag}
        </button>
      ))}
    </div>
  );
}
