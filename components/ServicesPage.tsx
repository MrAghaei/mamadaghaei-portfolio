import React from 'react';
import { useTranslation } from 'react-i18next';
import { ServicesPageProps } from '../types';
import { SectionTitle } from './SectionTitle';
import { ServicesSection } from './ServicesSection';
import { CallToAction } from './CallToAction';

export const ServicesPage: React.FC<ServicesPageProps> = ({
  services,
  personalInfo,
  setCurrentPage,
}) => {
  const { t } = useTranslation();

  return (
    <div className="space-y-16 md:space-y-24">
      <section id="services-page-section">
        <SectionTitle
          title={t('sections.services')}
          subtitle={personalInfo.servicesPageIntro || t('sections.servicesDefaultSubtitle')}
        />
        <ServicesSection
          services={services}
          title=""
          onHireClick={() => setCurrentPage('hire')}
        />
      </section>

      <CallToAction email={personalInfo.email} setCurrentPage={setCurrentPage} />
    </div>
  );
};
