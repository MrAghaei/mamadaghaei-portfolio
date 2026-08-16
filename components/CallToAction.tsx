import React from 'react';
import { useTranslation } from 'react-i18next';
import { PlusIcon } from './icons';
import { CallToActionProps } from '../types';

export const CallToAction: React.FC<CallToActionProps> = ({ setCurrentPage }) => {
  const { t } = useTranslation();

  return (
    <section className="animated-item anim-fadeInUp anim-delay-400 py-12 md:py-16 text-center bg-card dark:bg-dark-card rounded-xl shadow-xl border border-border dark:border-dark-border">
      <div className="max-w-2xl mx-auto px-4">
        <h2 className="text-3xl sm:text-4xl font-bold text-text-primary dark:text-dark-text-primary mb-4">
          {t('cta.title')}
        </h2>
        <p className="text-lg text-text-secondary dark:text-dark-text-secondary mb-8">
          {t('cta.subtitle')}
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={() => setCurrentPage('hire')}
            className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-button-primary-text dark:text-dark-button-primary-text bg-button-primary-bg dark:bg-dark-button-primary-bg hover:bg-button-primary-hover dark:hover:bg-dark-button-primary-hover rounded-lg transition-colors focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-700"
          >
            <PlusIcon className="w-5 h-5 mr-2" />
            {t('common.hireMe')}
          </button>
        </div>
      </div>
    </section>
  );
};
