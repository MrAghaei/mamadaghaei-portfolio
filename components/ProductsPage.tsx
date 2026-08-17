import React from 'react';
import { useTranslation } from 'react-i18next';
import { ProductsPageProps } from '../types';
import { SectionTitle } from './SectionTitle';
import { SideProjectsSection } from './SideProjectsSection';
import { CallToAction } from './CallToAction';

export const ProductsPage: React.FC<ProductsPageProps> = ({ sideProjects, personalInfo, setCurrentPage }) => {
  const { t } = useTranslation();

  return (
    <div className="space-y-16 md:space-y-24">
      <section id="my-products-section">
        <SectionTitle 
          title={t('sections.myProducts')} 
          subtitle={personalInfo.productsPageIntro || t('sections.myProductsDefaultSubtitle')}
        />
        <SideProjectsSection 
          sideProjects={sideProjects}
          title="" 
        />
      </section>
      
      <CallToAction email={personalInfo.email} setCurrentPage={setCurrentPage} />
    </div>
  );
};
