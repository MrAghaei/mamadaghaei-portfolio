import React from 'react';
import { useTranslation } from 'react-i18next';
import { SocialLink } from '../types';
import { usePortfolio } from '../context/PortfolioContext';

interface FooterProps {
  socialLinks: SocialLink[];
}

export const Footer: React.FC<FooterProps> = ({ socialLinks }) => {
  const { t } = useTranslation();
  const { personalInfo } = usePortfolio();

  return (
    <footer className="w-full bg-card dark:bg-dark-card border-t border-border dark:border-dark-border mt-auto">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <span className="inline-block w-1.5 h-1.5 bg-text-secondary dark:bg-dark-text-secondary rounded-full mr-2"></span>
            <h3 className="text-sm font-semibold text-text-primary dark:text-dark-text-primary">
              {t('common.followMe')}
            </h3>
          </div>
          <div className="flex items-center space-x-3">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-9 h-9 rounded-full bg-button-primary-bg text-button-primary-text dark:bg-dark-button-primary-bg dark:text-dark-button-primary-text hover:opacity-80 transition-opacity"
                aria-label={t('common.followOn', { name: link.name })}
              >
                <link.icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        <div className="text-center">
          <p className="text-sm font-semibold text-text-primary dark:text-dark-text-primary">
            {personalInfo.name}
          </p>
          <p className="text-xs text-text-secondary dark:text-dark-text-secondary mt-1">
            {personalInfo.title}
          </p>
          <p className="text-xs text-text-secondary dark:text-dark-text-secondary mt-4">
            &copy; {new Date().getFullYear()} {t('common.allRightsReserved')}
          </p>
        </div>
      </div>
    </footer>
  );
};
