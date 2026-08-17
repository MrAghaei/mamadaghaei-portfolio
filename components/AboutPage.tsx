import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AboutPageProps } from '../types'; 
import { SectionTitle } from './SectionTitle';
import { ProjectsSection } from './ProjectsSection';
import { CallToAction } from './CallToAction';
import { GitHubContributionsGraph } from './GitHubContributionsGraph';
import { SkillBadge } from './SkillBadge';
import { LaptopIcon, BriefcaseIcon } from './icons';
import { AnimatedName } from './AnimatedName';

export const AboutPage: React.FC<AboutPageProps> = ({ personalInfo, projects, experience, email, setCurrentPage, theme, skills }) => {
  const { t } = useTranslation();
  const [isGlitchBurstActive, setIsGlitchBurstActive] = useState(false);

  const triggerGlitchBurst = useCallback(() => {
    setIsGlitchBurstActive(true);
    window.setTimeout(() => setIsGlitchBurstActive(false), 420);
  }, []);

  const updateGlitchSpot = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      e.currentTarget.style.setProperty("--mx", `${x}px`);
      e.currentTarget.style.setProperty("--my", `${y}px`);
    },
    []
  );

  const resetGlitchSpot = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.removeProperty("--mx");
    e.currentTarget.style.removeProperty("--my");
  }, []);

  const animatedEnglish =
    personalInfo.animatedNameEnglish || personalInfo.name.split(' ').slice(-1)[0];
  const animatedJapanese = personalInfo.animatedNameJapanese || animatedEnglish;

  return (
    <div className="space-y-16 md:space-y-24">
      <section id="about-intro">
        <SectionTitle title={t('sections.about')} />
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
          <div className="lg:w-2/3 space-y-4 animated-item anim-fadeInUp anim-delay-100">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary dark:text-dark-text-primary tracking-tight">
              {t('common.im')}{" "}
              <AnimatedName
                english={animatedEnglish}
                japanese={animatedJapanese}
                className="ml-1"
              />
              {t('common.imSuffix')}
            </h1>
            <p className="text-lg text-text-secondary dark:text-dark-text-secondary">
              {personalInfo.aboutMeIntro}
            </p>
          </div>
          <div className="lg:w-1/3 w-full mt-6 lg:mt-0 animated-item anim-fadeInUp anim-delay-200">
            <button
              type="button"
              onClick={triggerGlitchBurst}
              onMouseMove={updateGlitchSpot}
              onMouseLeave={resetGlitchSpot}
              className={[
                "about-profile-glitch-wrap w-full max-w-sm mx-auto lg:mx-0 rounded-lg shadow-xl border-4 border-card dark:border-dark-card",
                "focus:outline-none focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-700",
                isGlitchBurstActive ? "is-glitching" : "",
              ].join(" ")}
              aria-label={t('common.triggerProfileEffect')}
            >
              <img
                src={personalInfo.aboutPageImageUrl}
                alt={t('common.portraitOf', { name: personalInfo.name })}
                className="about-profile-glitch-base w-full h-auto rounded-lg object-cover"
              />
              <img
                src={personalInfo.aboutPageImageUrl}
                alt=""
                aria-hidden="true"
                className="about-profile-glitch-bw w-full h-auto rounded-lg object-cover"
              />
              <img
                src={personalInfo.aboutPageImageUrl}
                alt=""
                aria-hidden="true"
                className="about-profile-glitch-layer about-profile-glitch-layer--a w-full h-auto rounded-lg object-cover"
              />
              <img
                src={personalInfo.aboutPageImageUrl}
                alt=""
                aria-hidden="true"
                className="about-profile-glitch-layer about-profile-glitch-layer--b w-full h-auto rounded-lg object-cover"
              />
            </button>
          </div>
        </div>
      </section>

      <section id="more-about-me" className="animated-item anim-fadeInUp anim-delay-300">
        <h2 className="text-2xl sm:text-3xl font-bold text-text-primary dark:text-dark-text-primary mb-6">{t('common.moreAboutMe')}</h2>
        <div className="space-y-4 text-text-secondary dark:text-dark-text-secondary text-base md:text-lg leading-relaxed">
          {personalInfo.aboutMeDetailed.map((paragraph, index) => (
            <p
              key={index}
              className="animated-item anim-fadeInUp"
              style={{ animationDelay: `${index * 100 + 400}ms` }}
            >
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      <section id="experience" className="animated-item anim-fadeInUp anim-delay-400">
        <h2 className="text-2xl sm:text-3xl font-bold text-text-primary dark:text-dark-text-primary mb-6 flex items-center">
          <BriefcaseIcon className="w-7 h-7 mr-3 text-text-secondary dark:text-dark-text-secondary" />
          {t('sections.experience')}
        </h2>
        <div className="space-y-8">
          {experience.map((entry, index) => (
            <div
              key={entry.id}
              className="animated-item anim-fadeInUp border border-border dark:border-dark-border rounded-xl p-5 md:p-6 bg-card dark:bg-dark-card"
              style={{ animationDelay: `${index * 100 + 450}ms` }}
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-text-primary dark:text-dark-text-primary">
                    {entry.role}
                  </h3>
                  <p className="text-text-secondary dark:text-dark-text-secondary">{entry.company}</p>
                </div>
                <p className="text-sm text-text-secondary dark:text-dark-text-secondary whitespace-nowrap">
                  {entry.period}
                </p>
              </div>
              <ul className="space-y-2 text-text-secondary dark:text-dark-text-secondary text-base leading-relaxed list-disc pl-5">
                {entry.highlights.map((highlight, highlightIndex) => (
                  <li key={highlightIndex}>{highlight}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section id="tech-stack" className="animated-item anim-fadeInUp anim-delay-500">
        <h2 className="text-2xl sm:text-3xl font-bold text-text-primary dark:text-dark-text-primary mb-6 flex items-center">
          <LaptopIcon className="w-7 h-7 mr-3 text-text-secondary dark:text-dark-text-secondary" />
          {t('common.techStack')}
        </h2>
        <div className="flex flex-wrap gap-2 md:gap-3">
          {skills.map((skill, index) => (
            <SkillBadge 
              key={skill.name} 
              skill={skill} 
              className="animated-item anim-fadeInUp"
              style={{ animationDelay: `${index * 50 + 600}ms` }}
            />
          ))}
        </div>
      </section>

      {personalInfo.githubUsername && (
        <GitHubContributionsGraph username={personalInfo.githubUsername} theme={theme} />
      )}
      
      <ProjectsSection
        projects={projects}
        setCurrentPage={setCurrentPage}
        title={t('sections.myProjects')}
      />
      
      <CallToAction 
        email={email} 
        setCurrentPage={setCurrentPage} 
      />
    </div>
  );
};
