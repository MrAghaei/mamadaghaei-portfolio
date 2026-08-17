import React from 'react';
import { useTranslation } from 'react-i18next';
import { Service } from '../types';

interface ServiceCardProps {
  service: Service;
  index: number;
  className?: string;
  style?: React.CSSProperties;
  onHireClick?: () => void;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  service,
  index,
  className,
  style,
  onHireClick,
}) => {
  const { t } = useTranslation();
  const baseKey = `services.${service.id}`;
  const Icon = service.iconComponent;

  const highlights = t(`${baseKey}.highlights`, {
    returnObjects: true,
    defaultValue: [],
  }) as string[];

  const idealFor = t(`${baseKey}.idealFor`, {
    returnObjects: true,
    defaultValue: [],
  }) as string[];

  const technologies = t(`${baseKey}.technologies`, {
    returnObjects: true,
    defaultValue: [],
  }) as string[];

  const resolvedHighlights = Array.isArray(highlights) ? highlights : [];
  const resolvedIdealFor = Array.isArray(idealFor) ? idealFor : [];
  const resolvedTechnologies = Array.isArray(technologies) ? technologies : [];

  return (
    <article
      className={`group relative h-full ${className || ''}`}
      style={style}
    >
      <div
        className={`relative h-full overflow-hidden rounded-2xl border border-border dark:border-dark-border bg-card dark:bg-dark-card p-6 sm:p-7 shadow-lg transition-all duration-300 ease-out group-hover:-translate-y-1 group-hover:shadow-xl group-hover:border-accent-green/40 dark:group-hover:border-dark-accent-green/40`}
      >
        <div
          className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${service.accentClass} opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
          aria-hidden="true"
        />

        <div className="relative z-10 flex h-full flex-col">
          <div className="mb-5 flex items-start justify-between gap-4">
            <div className="flex items-start gap-4">
              <div
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${service.iconBgColor} ring-1 ring-border/70 dark:ring-dark-border/70`}
              >
                <Icon className="h-6 w-6 text-text-primary dark:text-dark-text-primary" />
              </div>
              <div>
                <p className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-text-secondary dark:text-dark-text-secondary">
                  {String(index + 1).padStart(2, '0')}
                </p>
                <h3 className="text-lg font-bold leading-snug text-text-primary dark:text-dark-text-primary sm:text-xl">
                  {t(`${baseKey}.title`)}
                </h3>
              </div>
            </div>
          </div>

          <p className="mb-5 text-sm leading-relaxed text-text-secondary dark:text-dark-text-secondary sm:text-[0.95rem]">
            {t(`${baseKey}.description`)}
          </p>

          {resolvedHighlights.length > 0 ? (
            <ul className="mb-5 space-y-2.5">
              {resolvedHighlights.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 text-sm leading-relaxed text-text-secondary dark:text-dark-text-secondary"
                >
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-green dark:bg-dark-accent-green" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          ) : null}

          {resolvedIdealFor.length > 0 ? (
            <div className="mb-5">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-text-primary dark:text-dark-text-primary">
                {t('services.idealForLabel')}
              </p>
              <div className="flex flex-wrap gap-2">
                {resolvedIdealFor.map((item) => (
                  <span
                    key={item}
                    className="rounded-full bg-button-secondary-bg px-2.5 py-1 text-xs font-medium text-text-secondary dark:bg-dark-button-secondary-bg dark:text-dark-text-secondary"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ) : null}

          {resolvedTechnologies.length > 0 ? (
            <div className="mb-5">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-text-primary dark:text-dark-text-primary">
                {t('services.technologiesLabel')}
              </p>
              <div className="flex flex-wrap gap-2">
                {resolvedTechnologies.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-border px-2.5 py-1 text-xs font-medium text-text-secondary dark:border-dark-border dark:text-dark-text-secondary"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ) : null}

          {onHireClick ? (
            <div className="mt-auto pt-2">
              <button
                type="button"
                onClick={onHireClick}
                className="inline-flex items-center text-sm font-medium text-accent-green transition-colors hover:text-accent-green/80 dark:text-dark-accent-green dark:hover:text-dark-accent-green/80"
              >
                {t('services.discussProject')}
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </article>
  );
};
