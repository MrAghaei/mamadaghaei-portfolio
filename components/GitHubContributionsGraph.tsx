
import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { GithubIcon } from './icons'; 

interface GitHubContributionsGraphProps {
  username: string;
  theme: 'light' | 'dark';
}

export const GitHubContributionsGraph: React.FC<GitHubContributionsGraphProps> = ({ username }) => {
  const { t } = useTranslation();
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [imageError, setImageError] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const timeoutIdRef = useRef<number | null>(null);
  const imageSettledRef = useRef(false);

  useEffect(() => {
    if (timeoutIdRef.current !== null) {
      clearTimeout(timeoutIdRef.current);
    }
    imageSettledRef.current = false;

    if (!username) {
      setImageError(t('common.githubUsernameMissing'));
      setIsImageLoading(false);
      setImageUrl(null);
      imageSettledRef.current = true;
      return;
    }

    setIsImageLoading(true);
    setImageError(null);
    setImageUrl(`https://ghchart.rshah.org/${username}`);

    timeoutIdRef.current = window.setTimeout(() => {
      if (!imageSettledRef.current) {
        setImageError(t('common.githubLoadTimeout'));
        setIsImageLoading(false);
        imageSettledRef.current = true;
      }
    }, 7000);

    return () => {
      if (timeoutIdRef.current !== null) {
        clearTimeout(timeoutIdRef.current);
      }
    };
  }, [username, t]);

  const handleImageLoadSuccess = () => {
    if (!imageSettledRef.current) {
      setIsImageLoading(false);
      setImageError(null);
      imageSettledRef.current = true;
      if (timeoutIdRef.current !== null) clearTimeout(timeoutIdRef.current);
    }
  };

  const handleImageLoadError = () => {
    if (!imageSettledRef.current) {
      setImageError(t('common.githubLoadError'));
      setIsImageLoading(false);
      imageSettledRef.current = true;
      if (timeoutIdRef.current !== null) clearTimeout(timeoutIdRef.current);
    }
  };

  const githubProfileUrl = `https://github.com/${username}`;

  return (
    <section id="github-contributions" className="animated-item anim-fadeInUp">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-text-primary dark:text-dark-text-primary flex items-center">
          <span className="inline-block w-1.5 h-1.5 bg-text-secondary dark:bg-dark-text-secondary rounded-full mr-2.5 align-middle"></span>
          {t('common.githubContributions')}
        </h2>
        {username && (
           <a 
            href={githubProfileUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-sm font-medium text-accent-green hover:text-accent-green/80 transition-colors inline-flex items-center group"
            aria-label={t('common.githubProfile', { username })}
          >
            <GithubIcon className="w-4 h-4 mr-1.5" />
            {t('common.viewProfile')}
          </a>
        )}
      </div>

      {imageUrl && (
        <img
          key={imageUrl}
          src={imageUrl}
          alt=""
          style={{ display: 'none' }}
          onLoad={handleImageLoadSuccess}
          onError={handleImageLoadError}
        />
      )}

      {isImageLoading && username && (
        <div className="text-center py-10 text-text-secondary dark:text-dark-text-secondary">
          {t('common.loadingContributions')}
        </div>
      )}

      {imageError && !isImageLoading && (
        <div className="text-center py-10 text-accent-red dark:text-dark-accent-red">
          {t('common.errorPrefix')} {imageError}
        </div>
      )}

      {!isImageLoading && !imageError && imageUrl && username && (
        <div className="p-4 bg-card dark:bg-dark-card rounded-lg shadow-md border border-border dark:border-dark-border overflow-hidden">
          <a href={githubProfileUrl} target="_blank" rel="noopener noreferrer" aria-label={t('common.contributionGraphLink', { username })}>
            <img
              src={imageUrl}
              alt={t('common.contributionGraphAlt', { username })}
              className="w-full h-auto"
            />
          </a>
        </div>
      )}
    </section>
  );
};
