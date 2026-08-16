import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en.json";
import fa from "./locales/fa.json";

export const SUPPORTED_LANGUAGES = ["fa", "en"] as const;
export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];

export const DEFAULT_LANGUAGE: SupportedLanguage = "fa";
export const LANGUAGE_STORAGE_KEY = "portfolio-language";

const RTL_LANGUAGES = new Set<SupportedLanguage>(["fa"]);

export const isRtlLanguage = (lang: string): boolean =>
  RTL_LANGUAGES.has(lang as SupportedLanguage);

export const applyDocumentLanguage = (lang: SupportedLanguage) => {
  const dir = isRtlLanguage(lang) ? "rtl" : "ltr";
  document.documentElement.lang = lang;
  document.documentElement.dir = dir;
};

const getInitialLanguage = (): SupportedLanguage => {
  if (typeof window === "undefined") {
    return DEFAULT_LANGUAGE;
  }

  try {
    const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (stored && SUPPORTED_LANGUAGES.includes(stored as SupportedLanguage)) {
      return stored as SupportedLanguage;
    }
  } catch {
    // Ignore localStorage restrictions
  }

  return DEFAULT_LANGUAGE;
};

const initialLanguage = getInitialLanguage();
applyDocumentLanguage(initialLanguage);

void i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    fa: { translation: fa },
  },
  lng: initialLanguage,
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
  returnNull: false,
});

i18n.on("languageChanged", (lang) => {
  const nextLang = SUPPORTED_LANGUAGES.includes(lang as SupportedLanguage)
    ? (lang as SupportedLanguage)
    : DEFAULT_LANGUAGE;

  applyDocumentLanguage(nextLang);

  try {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, nextLang);
  } catch {
    // Ignore localStorage restrictions
  }
});

export default i18n;
