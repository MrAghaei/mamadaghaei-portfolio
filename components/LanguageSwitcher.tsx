import React from "react";
import { useTranslation } from "react-i18next";
import {
  DEFAULT_LANGUAGE,
  type SupportedLanguage,
} from "../i18n/config";

const LANGUAGES: { code: SupportedLanguage; label: string }[] = [
  { code: "fa", label: "فا" },
  { code: "en", label: "EN" },
];

export const LanguageSwitcher: React.FC = () => {
  const { i18n, t } = useTranslation();
  const currentLanguage = (i18n.language?.split("-")[0] ??
    DEFAULT_LANGUAGE) as SupportedLanguage;

  const switchLanguage = (lang: SupportedLanguage) => {
    if (lang !== currentLanguage) {
      void i18n.changeLanguage(lang);
    }
  };

  return (
    <div
      className="flex items-center rounded-lg border border-border dark:border-dark-border p-0.5 bg-input-bg dark:bg-dark-input-bg"
      role="group"
      aria-label={t("languageSwitcher.label")}
    >
      {LANGUAGES.map(({ code, label }) => {
        const isActive = currentLanguage === code;
        return (
          <button
            key={code}
            type="button"
            onClick={() => switchLanguage(code)}
            className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors ${
              isActive
                ? "bg-button-primary-bg dark:bg-dark-button-primary-bg text-button-primary-text dark:text-dark-button-primary-text"
                : "text-text-secondary dark:text-dark-text-secondary hover:text-text-primary dark:hover:text-dark-text-primary"
            }`}
            aria-pressed={isActive}
            aria-label={t(`languageSwitcher.${code}`)}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
};
