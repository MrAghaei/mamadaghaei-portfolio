import React from 'react';
import { useTranslation } from 'react-i18next';
import { ProjectsPageProps } from '../types';
import { SectionTitle } from './SectionTitle';
import { ProjectCard } from './ProjectCard';
import { CallToAction } from './CallToAction';

export const ProjectsPage: React.FC<ProjectsPageProps> = ({ projects, email, setCurrentPage }) => {
  const { t } = useTranslation();

  return (
    <div className="space-y-16 md:space-y-24">
      <section id="my-works-section">
        <SectionTitle 
          title={t('sections.myProjects')} 
          subtitle={t('sections.myProjectsSubtitle')}
        />
        <div className="space-y-6">
          {projects.map((project, index) => (
            <ProjectCard 
              key={project.id} 
              project={project}
              onProjectSelect={(projectId) => setCurrentPage('project-detail', projectId)}
              className="animated-item anim-fadeInUp"
              style={{ animationDelay: `${index * 100 + 100}ms` }}
            />
          ))}
        </div>
      </section>

      <CallToAction email={email} setCurrentPage={setCurrentPage} />
    </div>
  );
};
