import React from "react";
import { useTranslation } from "react-i18next";
import { useParams, Navigate } from "react-router-dom";
import { ProjectCard } from "./ProjectCard";
import { SectionTitle } from "./SectionTitle";
import { CallToAction } from "./CallToAction";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowTopRightOnSquareIcon,
} from "./icons";
import { usePortfolio } from "../context/PortfolioContext";
import { isRtlLanguage } from "@/i18n/config";

export const ProjectDetailsPage: React.FC<{
  setCurrentPage: (pageId: string, projectId?: string) => void;
  email: string;
}> = ({ setCurrentPage, email }) => {
  const { t, i18n } = useTranslation();
  const isRTL = isRtlLanguage(i18n.language);
  const { projects } = usePortfolio();
  const { projectId } = useParams<{ projectId: string }>();

  if (
    projectId === "project-ooho-website" ||
    projectId === "project-ooho-hrms"
  ) {
    return <Navigate to="/project/project-ooho" replace />;
  }

  const project = projects.find((p) => p.id === projectId);
  const otherProjects = projects.filter((p) => p.id !== projectId);

  if (!project) {
    return (
      <div className="text-center py-10 animated-item anim-fadeInUp">
        <h1 className="text-2xl font-bold mb-4">
          {t("common.projectNotFound")}
        </h1>
        <p className="text-text-secondary dark:text-dark-text-secondary mb-6">
          {t("common.projectNotFoundDescription")}
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
          <ArrowLeftIcon
            className={`w-5 h-5 text-text-secondary dark:text-dark-text-secondary
             group-hover:text-text-primary dark:group-hover:text-dark-text-primary
             transition-colors flex-shrink-0
             ${isRTL ? "rotate-180" : ""}`}
          />
          {t("common.backToProjects")}
        </button>
      </div>

      <div className="text-center animated-item anim-fadeInUp anim-delay-100">
        <div className="flex justify-center mb-6">
          {project.logoImageUrl ? (
            <img
              src={project.logoImageUrl}
              alt={t("common.projectLogo", { name: project.name })}
              className="w-16 h-16 rounded-full object-cover border-4 border-card dark:border-dark-card shadow-lg bg-white"
            />
          ) : (
            <div
              className={`p-3 rounded-full ${project.iconBgColor || "bg-gray-600"}`}
            >
              {project.iconComponent && (
                <project.iconComponent className="w-8 h-8 text-white" />
              )}
            </div>
          )}
        </div>
        <h1 className="text-4xl font-bold mb-4">{project.name}</h1>
        {project.tagline && (
          <p className="text-xl text-text-secondary dark:text-dark-text-secondary mb-8 max-w-3xl mx-auto">
            {project.tagline}
          </p>
        )}

        <div className="flex flex-wrap justify-center gap-6 text-sm text-text-secondary dark:text-dark-text-secondary mb-8">
          {project.client && (
            <div>
              <span className="font-medium">{t("common.client")}:</span>{" "}
              {project.client}
            </div>
          )}
          {project.company && (
            <div>
              <span className="font-medium">{t("common.company")}:</span>{" "}
              {project.company}
            </div>
          )}
          {project.projectType && (
            <div>
              <span className="font-medium">{t("common.type")}:</span>{" "}
              {project.projectType}
            </div>
          )}
          {project.year && (
            <div>
              <span className="font-medium">{t("common.year")}:</span>{" "}
              {project.year}
            </div>
          )}
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {project.technologies.map((tech: string, index: number) => (
            <span
              key={index}
              className="px-3 py-1 bg-card dark:bg-dark-card text-text-secondary dark:text-dark-text-secondary rounded-full text-sm"
            >
              {tech}
            </span>
          ))}
        </div>

        {project.liveLink && (
          <a
            href={project.liveLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 bg-accent-green text-white rounded-lg hover:bg-accent-green/80 transition-colors group"
          >
            {t("common.viewLiveProject")}
            <ArrowTopRightOnSquareIcon className="w-4 h-4 ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </a>
        )}
      </div>

      {project.images && project.images.length > 0 && (
        <div className="space-y-6 animated-item anim-fadeInUp anim-delay-200">
          <h2 className="text-2xl font-bold text-center">
            {t("common.projectScreenshots")}
          </h2>
          <div className="grid gap-6">
            {project.images.map((image: string, index: number) => (
              <div key={index} className="rounded-lg overflow-hidden shadow-lg">
                <img
                  src={image}
                  alt={t("common.projectScreenshot", {
                    name: project.name,
                    index: index + 1,
                  })}
                  className="w-full h-auto"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {project.overview && (
        <div className="space-y-4 animated-item anim-fadeInUp anim-delay-300">
          <h2 className="text-2xl font-bold">{t("common.overview")}</h2>
          <p className="text-text-secondary dark:text-dark-text-secondary leading-relaxed">
            {project.overview}
          </p>
        </div>
      )}

      {project.problemStatement && (
        <div className="space-y-4 animated-item anim-fadeInUp anim-delay-400">
          <h2 className="text-2xl font-bold">
            {project.problemStatement.title || t("common.theChallenge")}
          </h2>
          <p className="text-text-secondary dark:text-dark-text-secondary leading-relaxed">
            {project.problemStatement.description}
          </p>
        </div>
      )}

      {project.solutionStatement && (
        <div className="space-y-4 animated-item anim-fadeInUp anim-delay-500">
          <h2 className="text-2xl font-bold">
            {project.solutionStatement.title || t("common.theSolution")}
          </h2>
          <p className="text-text-secondary dark:text-dark-text-secondary leading-relaxed">
            {project.solutionStatement.description}
          </p>
        </div>
      )}

      {otherProjects.length > 0 && (
        <div className="space-y-8 animated-item anim-fadeInUp anim-delay-600">
          <SectionTitle title={t("common.otherProjects")} />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {otherProjects.slice(0, 3).map((otherProject) => (
              <ProjectCard
                key={otherProject.id}
                project={otherProject}
                onProjectSelect={(id) => setCurrentPage("project-detail", id)}
              />
            ))}
          </div>
          <div className="text-center">
            <button
              onClick={() => setCurrentPage("projects")}
              className="text-sm font-medium text-accent-green hover:text-accent-green/80 transition-colors inline-flex items-center group"
              aria-label={t("common.viewAllProjects")}
            >
              {t("common.viewAllProjects")}
              <ArrowRightIcon className="w-4 h-4 ml-1.5 transform group-hover:translate-x-1 transition-transform duration-200 ease-in-out" />
            </button>
          </div>
        </div>
      )}

      <div className="animated-item anim-fadeInUp anim-delay-700">
        <CallToAction email={email} setCurrentPage={setCurrentPage} />
      </div>
    </div>
  );
};
