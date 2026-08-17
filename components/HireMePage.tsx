import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { HireMePageProps } from "../types";
import {
  CheckBadgeIcon,
  ArrowLeftIcon,
  EnvelopeIcon,
  TelegramIcon,
  ArrowTopRightOnSquareIcon,
} from "./icons";

const TELEGRAM_URL = "https://t.me/Mamad_Aghaei";
import { WEB3FORMS_ACCESS_KEY } from "../constants";

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
  form?: string;
}

export const HireMePage: React.FC<HireMePageProps> = ({
  personalInfo,
  socialLinks,
  setCurrentPage,
}) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = () => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) newErrors.name = t("form.nameRequired");
    if (!formData.email.trim()) {
      newErrors.email = t("form.emailRequired");
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t("form.emailInvalid");
    }
    if (!formData.message.trim()) newErrors.message = t("form.messageRequired");
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name as keyof FormErrors]) {
      setErrors({ ...errors, [e.target.name]: undefined });
    }
    if (status === "error" && errors.form) {
      setErrors((prev) => ({ ...prev, form: undefined }));
    }
    if (status !== "idle") setStatus("idle");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) {
      setStatus("error");
      return;
    }

    const accessKey = WEB3FORMS_ACCESS_KEY.trim();
    if (!accessKey) {
      setStatus("error");
      setErrors({ form: t("form.missingAccessKey") });
      return;
    }

    setStatus("loading");
    setErrors({});

    const formPayload = new FormData();
    formPayload.append("name", formData.name);
    formPayload.append("email", formData.email);
    formPayload.append("message", formData.message);
    formPayload.append("access_key", accessKey);
    formPayload.append("subject", t("form.subject", { name: formData.name }));
    formPayload.append("from_name", personalInfo.name);
    formPayload.append("replyto", formData.email);
    formPayload.append("botcheck", "");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: formPayload,
      });

      const result = await response.json();

      if (result.success) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        console.error("Submission error from API:", result);
        setStatus("error");
        setErrors({ form: result.message || t("form.unexpectedError") });
      }
    } catch (error) {
      console.error("Network or client-side error:", error);
      setStatus("error");
      setErrors({ form: t("form.networkError") });
    }
  };

  const inputBaseClasses =
    "w-full px-4 py-3 rounded-lg border text-text-primary dark:text-dark-text-primary placeholder-text-placeholder dark:placeholder-dark-text-placeholder transition-colors duration-200 ease-in-out";
  const inputNormalStateClasses =
    "bg-input-bg dark:bg-dark-input-bg border-input-border dark:border-dark-input-border";
  const inputFocusStateClasses =
    "focus:outline-none focus:border-accent-green focus:ring-2 focus:ring-accent-green focus:ring-opacity-50 dark:focus:border-accent-green";
  const inputErrorStateClasses =
    "border-accent-red dark:border-dark-accent-red";

  return (
    <div className="space-y-8">
      <button
        onClick={() => setCurrentPage("home")}
        className="animated-item anim-fadeInUp inline-flex items-center text-sm font-medium text-text-secondary dark:text-dark-text-secondary hover:text-text-primary dark:hover:text-dark-text-primary transition-colors group mb-6"
        aria-label={t("common.backToHome")}
      >
        <ArrowLeftIcon className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
        {t("common.backToHome")}
      </button>

      <section
        id="hire-telegram-section"
        className="animated-item anim-fadeInUp bg-card dark:bg-dark-card p-6 sm:p-8 md:p-10 rounded-xl shadow-xl border border-border dark:border-dark-border overflow-hidden relative"
      >
        <div
          className="absolute inset-0 pointer-events-none opacity-60 dark:opacity-40"
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(circle at 85% 20%, rgba(42, 171, 238, 0.18) 0%, transparent 45%), radial-gradient(circle at 10% 90%, rgba(34, 158, 217, 0.12) 0%, transparent 40%)",
          }}
        />
        <div className="relative flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-8">
          <div className="flex-shrink-0 flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#2AABEE]/15 dark:bg-[#2AABEE]/20 border border-[#2AABEE]/25 shadow-lg shadow-[#2AABEE]/10">
            <TelegramIcon className="w-8 h-8 sm:w-10 sm:h-10 text-[#2AABEE]" />
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-sm font-medium text-text-secondary dark:text-dark-text-secondary tracking-wide flex items-center mb-2">
              <span className="inline-block w-1.5 h-1.5 bg-[#2AABEE] rounded-full mr-2 align-middle"></span>
              {t("hirePage.telegramSectionTitle")}
            </h2>
            <p className="text-md text-text-secondary dark:text-dark-text-secondary mb-5 max-w-xl">
              {t("hirePage.telegramSectionSubtitle")}
            </p>
            <a
              href={TELEGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium text-white bg-[#2AABEE] hover:bg-[#229ED9] transition-colors duration-200 ease-in-out shadow-md shadow-[#2AABEE]/25 hover:shadow-lg hover:shadow-[#2AABEE]/30"
            >
              <TelegramIcon className="w-5 h-5" />
              {t("hirePage.telegramButton")}
              <ArrowTopRightOnSquareIcon className="w-4 h-4 opacity-80" />
            </a>
            <p
              dir="ltr"
              className="mt-3 text-sm font-medium text-[#2AABEE] justify-self-start"
            >
              {t("hirePage.telegramUsername")}
            </p>
          </div>
        </div>
      </section>

      <div className="animated-item anim-fadeInUp anim-delay-100 bg-card dark:bg-dark-card p-6 sm:p-8 md:p-10 rounded-xl shadow-xl border border-border dark:border-dark-border space-y-10">
        <section id="hire-me-form-section">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-sm font-medium text-text-secondary dark:text-dark-text-secondary tracking-wide flex items-center">
              <span className="inline-block w-1.5 h-1.5 bg-text-secondary dark:bg-dark-text-secondary rounded-full mr-2 align-middle"></span>
              {t("common.hireMe")}
            </h2>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-accent-green/20 text-accent-green">
              <CheckBadgeIcon className="w-3 h-3 mr-1 text-accent-green" />
              {t("common.availableForWork")}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-text-primary dark:text-dark-text-primary mb-2">
            {personalInfo.hireMePageTitle}
          </h1>
          <p className="text-md text-text-secondary dark:text-dark-text-secondary mb-8">
            {personalInfo.hireMePageSubtitle}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 text-sm">
            <a
              href={`mailto:${personalInfo.email}`}
              className="flex items-center text-text-secondary dark:text-dark-text-secondary hover:text-text-primary dark:hover:text-dark-text-primary transition-colors"
            >
              <EnvelopeIcon className="w-4 h-4 mr-2" />
              {personalInfo.email}
            </a>
            {personalInfo.phone && (
              <a
                href={`tel:${personalInfo.phone}`}
                className="flex items-center text-text-secondary dark:text-dark-text-secondary hover:text-text-primary dark:hover:text-dark-text-primary transition-colors"
              >
                <span className="w-4 h-4 mr-2 text-center">☎</span>
                {personalInfo.phone}
              </a>
            )}
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-text-secondary dark:text-dark-text-secondary hover:text-text-primary dark:hover:text-dark-text-primary transition-colors"
              >
                <link.icon className="w-4 h-4 mr-2" />
                {link.name}
              </a>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="sr-only">
                  {t("common.name")}
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder={t("common.name")}
                  className={`${inputBaseClasses} ${errors.name ? inputErrorStateClasses : inputNormalStateClasses} ${inputFocusStateClasses}`}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "name-error" : undefined}
                />
                {errors.name && (
                  <p id="name-error" className="text-xs text-accent-red mt-1">
                    {errors.name}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="email" className="sr-only">
                  {t("common.emailAddress")}
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={t("common.emailAddress")}
                  className={`${inputBaseClasses} ${errors.email ? inputErrorStateClasses : inputNormalStateClasses} ${inputFocusStateClasses}`}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                />
                {errors.email && (
                  <p id="email-error" className="text-xs text-accent-red mt-1">
                    {errors.email}
                  </p>
                )}
              </div>
            </div>
            <div>
              <label htmlFor="message" className="sr-only">
                {t("common.message")}
              </label>
              <textarea
                name="message"
                id="message"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                placeholder={t("common.message")}
                className={`${inputBaseClasses} ${errors.message ? inputErrorStateClasses : inputNormalStateClasses} ${inputFocusStateClasses}`}
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? "message-error" : undefined}
              ></textarea>
              {errors.message && (
                <p id="message-error" className="text-xs text-accent-red mt-1">
                  {errors.message}
                </p>
              )}
            </div>
            <div>
              <button
                type="submit"
                className="w-full px-6 py-3 rounded-lg font-medium text-button-primary-text dark:text-dark-button-primary-text bg-button-primary-bg dark:bg-dark-button-primary-bg hover:bg-button-primary-hover dark:hover:bg-dark-button-primary-hover transition-colors duration-200 ease-in-out disabled:opacity-70 disabled:cursor-not-allowed"
                disabled={status === "loading"}
              >
                {status === "loading"
                  ? t("common.submitting")
                  : t("common.submit")}
              </button>
            </div>
            {status === "success" && (
              <p className="text-sm text-accent-green mt-4">
                {t("common.formSuccess")}
              </p>
            )}
            {status === "error" && errors.form && (
              <p className="text-sm text-accent-red mt-4">{errors.form}</p>
            )}
            {status === "error" &&
              !errors.form &&
              Object.keys(errors).length > 0 &&
              errors.constructor === Object &&
              Object.values(errors).some(
                (err) => err !== undefined && typeof err === "string",
              ) && (
                <p className="text-sm text-accent-red mt-4">
                  {t("common.formFixErrors")}
                </p>
              )}
          </form>
        </section>
      </div>
    </div>
  );
};
