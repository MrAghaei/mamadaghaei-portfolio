import React from "react";
import { useTranslation } from "react-i18next";
import { useParams, Navigate } from "react-router-dom";
import { CallToAction } from "./CallToAction";
import { ArrowLeftIcon, ArrowTopRightOnSquareIcon } from "./icons";
import { ProjectIcon } from "./ProjectIcon";
import { PlayStoreMetrics } from "./PlayStoreMetrics";
import { usePortfolio } from "../context/PortfolioContext";

export const SideProjectDetailsPage: React.FC<{
  setCurrentPage: (pageId: string, projectId?: string) => void;
  email: string;
}> = ({ setCurrentPage, email }) => {
  const { t } = useTranslation();
  const { sideProjects } = usePortfolio();
  const { sideProjectId } = useParams<{ sideProjectId: string }>();

  if (!sideProjectId) {
    return <Navigate to="/projects" replace />;
  }

  const sideProject = sideProjects.find((p) => p.id === sideProjectId);

  if (!sideProject) {
    return (
      <div className="text-center py-10 animated-item anim-fadeInUp">
        <h1 className="text-2xl font-bold mb-4">{t("common.productNotFound")}</h1>
        <p className="text-text-secondary dark:text-dark-text-secondary mb-6">
          {t("common.productNotFoundDescription")}
        </p>
        <button
          onClick={() => setCurrentPage("projects")}
          className="px-4 py-2 bg-button-primary-bg text-button-primary-text rounded-lg hover:bg-button-primary-hover"
        >
          {t("common.viewAllProjects")}
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-16">
      <div className="animated-item anim-fadeInUp">
        <button
          onClick={() => setCurrentPage("projects")}
          className="inline-flex items-center text-sm font-medium text-text-secondary dark:text-dark-text-secondary hover:text-text-primary dark:hover:text-dark-text-primary transition-colors group"
        >
          <ArrowLeftIcon className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          {t("common.backToProjects")}
        </button>
      </div>

      <div className="text-center animated-item anim-fadeInUp anim-delay-100">
        <div className="flex justify-center mb-6">
          <ProjectIcon
            name={sideProject.name}
            imageUrl={sideProject.cardImageUrl}
            iconComponent={sideProject.iconComponent}
            iconBgColor={sideProject.iconBgColor}
            size="lg"
            altType="logo"
            className="shadow-lg"
          />
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-4">
          {sideProject.tag && (
            <span className="px-3 py-1 bg-card dark:bg-dark-card text-text-secondary dark:text-dark-text-secondary rounded-full text-sm">
              {sideProject.tag}
            </span>
          )}
          {sideProject.year && (
            <span className="px-3 py-1 bg-card dark:bg-dark-card text-text-secondary dark:text-dark-text-secondary rounded-full text-sm">
              {sideProject.year}
            </span>
          )}
          {sideProject.projectType && (
            <span className="px-3 py-1 bg-card dark:bg-dark-card text-text-secondary dark:text-dark-text-secondary rounded-full text-sm">
              {sideProject.projectType}
            </span>
          )}
        </div>

        <h1 className="text-4xl font-bold mb-4">{sideProject.name}</h1>
        {sideProject.tagline && (
          <p className="text-xl text-text-secondary dark:text-dark-text-secondary mb-6 max-w-3xl mx-auto">
            {sideProject.tagline}
          </p>
        )}

        {sideProject.playStoreStats && (
          <PlayStoreMetrics
            downloads={sideProject.playStoreStats.downloads}
            rating={sideProject.playStoreStats.rating}
            variant="featured"
            className="mb-8"
          />
        )}

        {(sideProject.link || sideProject.description) && (
          <div className="max-w-3xl mx-auto space-y-6">
            {sideProject.description && (
              <p className="text-text-secondary dark:text-dark-text-secondary leading-relaxed">
                {sideProject.description}
              </p>
            )}

            {sideProject.link && (
              <a
                href={sideProject.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-accent-green text-white rounded-lg hover:bg-accent-green/80 transition-colors group"
              >
                {sideProject.linkText || t("common.open")}
                <ArrowTopRightOnSquareIcon className="w-4 h-4 ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </a>
            )}
          </div>
        )}
      </div>

      {sideProject.technologies && sideProject.technologies.length > 0 && (
        <div className="space-y-4 animated-item anim-fadeInUp anim-delay-200">
          <h2 className="text-2xl font-bold text-center">{t("common.tech")}</h2>
          <div className="flex flex-wrap justify-center gap-2">
            {sideProject.technologies.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 bg-card dark:bg-dark-card text-text-secondary dark:text-dark-text-secondary rounded-full text-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      )}

      {sideProject.overview && (
        <div className="space-y-4 animated-item anim-fadeInUp anim-delay-300">
          <h2 className="text-2xl font-bold">{t("common.overview")}</h2>
          <p className="text-text-secondary dark:text-dark-text-secondary leading-relaxed">
            {sideProject.overview}
          </p>
        </div>
      )}

      {sideProject.keyFeatures && sideProject.keyFeatures.length > 0 && (
        <div className="space-y-4 animated-item anim-fadeInUp anim-delay-350">
          <h2 className="text-2xl font-bold">{t("common.keyFeatures")}</h2>
          <ul className="list-disc pl-5 space-y-2 text-text-secondary dark:text-dark-text-secondary leading-relaxed">
            {sideProject.keyFeatures.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
        </div>
      )}

      {sideProject.images && sideProject.images.length > 0 && (
        <div className="space-y-6 animated-item anim-fadeInUp anim-delay-400">
          <h2 className="text-2xl font-bold text-center">{t("common.screenshots")}</h2>
          <div className="grid gap-6">
            {sideProject.images.map((image, index) => (
              <div key={index} className="rounded-lg overflow-hidden shadow-lg">
                <img
                  src={image}
                  alt={t("common.projectScreenshot", { name: sideProject.name, index: index + 1 })}
                  className="w-full h-auto"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="animated-item anim-fadeInUp anim-delay-500">
        <CallToAction email={email} setCurrentPage={setCurrentPage} />
      </div>
    </div>
  );
};
