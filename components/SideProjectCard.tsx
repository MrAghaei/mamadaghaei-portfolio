import React from 'react';
import { useTranslation } from 'react-i18next';
import { SideProject } from '../types';
import { ArrowTopRightOnSquareIcon } from './icons';
import { ProjectIcon } from './ProjectIcon';
import { PlayStoreMetrics } from './PlayStoreMetrics';
import { useNavigate } from 'react-router-dom';

interface SideProjectCardProps {
  sideProject: SideProject;
  className?: string;
  style?: React.CSSProperties;
}

export const SideProjectCard: React.FC<SideProjectCardProps> = ({ sideProject, className, style }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/product/${sideProject.id}`);
  };

  return (
    <button
      type="button"
      onClick={handleCardClick}
      className={`block text-start w-full p-5 bg-card dark:bg-dark-card hover:bg-card-hover dark:hover:bg-dark-card-hover rounded-xl shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1 border border-border dark:border-dark-border ${className || ''}`}
      style={style}
      aria-label={t('common.viewProductDetails', { name: sideProject.name })}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3 sm:space-x-4">
          <ProjectIcon
            name={sideProject.name}
            imageUrl={sideProject.cardImageUrl}
            iconComponent={sideProject.iconComponent}
            iconBgColor={sideProject.iconBgColor}
            size="sm"
          />
          <h3 className="text-md font-semibold text-text-primary dark:text-dark-text-primary">{sideProject.name}</h3>
        </div>
        {sideProject.link ? (
          <a 
            href={sideProject.link} 
            target="_blank" 
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center text-xs font-medium text-text-secondary dark:text-dark-text-secondary bg-button-secondary-bg dark:bg-dark-button-secondary-bg hover:bg-button-primary-hover dark:hover:bg-dark-button-primary-hover hover:text-button-primary-text dark:hover:text-dark-button-primary-text px-2.5 py-1 rounded-lg transition-colors"
            aria-label={t('common.openProduct', { name: sideProject.name, action: sideProject.linkText || t('common.open') })}
          >
            {sideProject.linkText || t('common.open')}
            <ArrowTopRightOnSquareIcon className="w-3 h-3 ml-1.5" />
          </a>
        ) : (
          <span className="inline-flex items-center text-xs font-medium text-text-secondary dark:text-dark-text-secondary bg-button-secondary-bg dark:bg-dark-button-secondary-bg px-2.5 py-1 rounded-lg">
            {sideProject.tag}
          </span>
        )}
      </div>
       {/* Description can be added here if desired, currently it's not in the design for SideProjectCard but is in the type */}
      {sideProject.playStoreStats && (
        <PlayStoreMetrics
          downloads={sideProject.playStoreStats.downloads}
          rating={sideProject.playStoreStats.rating}
          variant="compact"
          className="mt-3"
        />
      )}
      {sideProject.description && (
        <p className="mt-3 text-sm text-text-secondary dark:text-dark-text-secondary">
          {sideProject.description}
        </p>
      )}
    </button>
  );
};
