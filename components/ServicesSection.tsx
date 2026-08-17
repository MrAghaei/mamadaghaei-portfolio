import React from 'react';
import { useTranslation } from 'react-i18next';
import { ServicesSectionProps } from '../types';
import { SectionTitle } from './SectionTitle';
import { ServiceCard } from './ServiceCard';

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  services,
  title,
  subtitle,
  maxItems,
  onViewAllClick,
  viewAllText,
  onHireClick,
}) => {
  const { t } = useTranslation();
  const visibleServices = maxItems ? services.slice(0, maxItems) : services;
  const effectiveTitle = title === undefined ? t('sections.services') : title;
  const resolvedViewAllText = viewAllText ?? t('common.viewAllServices');

  return (
    <section id="services-section">
      {effectiveTitle ? (
        <SectionTitle title={effectiveTitle} subtitle={subtitle} />
      ) : null}

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
        {visibleServices.map((service, index) => (
          <ServiceCard
            key={service.id}
            service={service}
            index={index}
            onHireClick={onHireClick}
            className="animated-item anim-fadeInUp"
            style={{ animationDelay: `${index * 100 + 100}ms` }}
          />
        ))}
      </div>

      {onViewAllClick ? (
        <div
          className="animated-item anim-fadeInUp mt-8 text-center"
          style={{ animationDelay: `${visibleServices.length * 100 + 200}ms` }}
        >
          <button
            type="button"
            onClick={onViewAllClick}
            className="inline-flex items-center rounded-lg border border-border bg-card px-5 py-2.5 text-sm font-medium text-text-primary transition-colors hover:bg-card-hover dark:border-dark-border dark:bg-dark-card dark:text-dark-text-primary dark:hover:bg-dark-card-hover"
          >
            {resolvedViewAllText}
          </button>
        </div>
      ) : null}
    </section>
  );
};
