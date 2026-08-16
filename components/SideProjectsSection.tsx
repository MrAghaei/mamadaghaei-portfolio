import React from 'react';
import { useTranslation } from 'react-i18next';
import { SideProjectsSectionProps } from '../types';
import { SideProjectCard } from './SideProjectCard';
import { SectionTitle } from './SectionTitle';
import { ArrowRightIcon } from './icons'; // Import ArrowRightIcon

export const SideProjectsSection: React.FC<SideProjectsSectionProps> = ({ 
  sideProjects, 
  title, 
  subtitle,
  onViewAllClick,
  viewAllText
}) => {
  const { t } = useTranslation();
  const effectiveTitle = title === undefined ? t('sections.sideProjects') : title;
  const resolvedViewAllText = viewAllText ?? t('common.viewAllProducts');

  return (
    <section>
      {/* Conditionally render SectionTitle only if effectiveTitle is a non-empty string */}
      {effectiveTitle && (
        <SectionTitle title={effectiveTitle} subtitle={subtitle} className="anim-delay-100" />
      )}
      <div className={`space-y-4 ${!effectiveTitle ? 'mt-0' : ''}`}> {/* Remove top margin if title is hidden */}
        {sideProjects.map((project, index) => (
          <SideProjectCard 
            key={project.id} 
            sideProject={project} 
            className="animated-item anim-fadeInUp"
            // Adjust animation delay: start sooner if there's no title
            style={{ animationDelay: `${index * 100 + (effectiveTitle ? 300 : 0)}ms` }} 
          />
        ))}
      </div>

      {/* View All Button */}
      {onViewAllClick && (
        <div 
          className="animated-item anim-fadeInUp mt-8 md:mt-12 text-center" 
          style={{ animationDelay: `${sideProjects.length * 100 + (effectiveTitle ? 300 : 100)}ms` }}
        >
          <button
            onClick={onViewAllClick}
            className="text-sm font-medium text-accent-green hover:text-accent-green/80 transition-colors inline-flex items-center group"
            aria-label={resolvedViewAllText}
          >
            {resolvedViewAllText}
            <ArrowRightIcon className="w-4 h-4 ml-1.5 transform group-hover:translate-x-1 transition-transform duration-200 ease-in-out" />
          </button>
        </div>
      )}
    </section>
  );
};