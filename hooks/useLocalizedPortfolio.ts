import { useMemo } from "react";
import { useTranslation, type TFunction } from "react-i18next";
import {
  NAV_ITEMS_MAIN,
  PROJECTS,
  SIDE_PROJECTS,
  SKILLS,
  PERSONAL_INFO,
  DEVELOPER_CREDIT,
  EXPERIENCE,
  SERVICES,
} from "../constants";
import type {
  NavItem,
  PersonalInfo,
  Project,
  SideProject,
  Skill,
  ExperienceEntry,
} from "../types";

const mapProject = (
  project: Project,
  t: TFunction,
  prefix: string
): Project => {
  const base = `${prefix}.${project.id}`;
  const technologies = t(`${base}.technologies`, {
    returnObjects: true,
    defaultValue: project.technologies,
  }) as string[];

  return {
    ...project,
    name: t(`${base}.name`, { defaultValue: project.name }),
    description: t(`${base}.description`, { defaultValue: project.description }),
    technologies: Array.isArray(technologies) ? technologies : project.technologies,
    client: t(`${base}.client`, { defaultValue: project.client ?? "" }) || project.client,
    company: t(`${base}.company`, { defaultValue: project.company ?? "" }) || project.company,
    projectType: t(`${base}.projectType`, { defaultValue: project.projectType ?? "" }) || project.projectType,
    year: t(`${base}.year`, { defaultValue: project.year ?? "" }) || project.year,
    tagline: t(`${base}.tagline`, { defaultValue: project.tagline ?? "" }) || project.tagline,
    overview: t(`${base}.overview`, { defaultValue: project.overview ?? "" }) || project.overview,
    problemStatement: project.problemStatement
      ? {
          title: t(`${base}.problemStatement.title`, {
            defaultValue: project.problemStatement.title ?? "",
          }),
          description: t(`${base}.problemStatement.description`, {
            defaultValue: project.problemStatement.description,
          }),
        }
      : undefined,
    solutionStatement: project.solutionStatement
      ? {
          title: t(`${base}.solutionStatement.title`, {
            defaultValue: project.solutionStatement.title ?? "",
          }),
          description: t(`${base}.solutionStatement.description`, {
            defaultValue: project.solutionStatement.description,
          }),
        }
      : undefined,
  };
};

const mapSideProject = (
  project: SideProject,
  t: TFunction
): SideProject => {
  const base = `sideProjects.${project.id}`;
  const technologies = t(`${base}.technologies`, {
    returnObjects: true,
    defaultValue: project.technologies,
  }) as string[] | undefined;
  const keyFeatures = t(`${base}.keyFeatures`, {
    returnObjects: true,
    defaultValue: project.keyFeatures,
  }) as string[] | undefined;

  return {
    ...project,
    name: t(`${base}.name`, { defaultValue: project.name }),
    tag: t(`${base}.tag`, { defaultValue: project.tag }),
    linkText: t(`${base}.linkText`, { defaultValue: project.linkText ?? "" }) || project.linkText,
    description: t(`${base}.description`, { defaultValue: project.description ?? "" }) || project.description,
    year: t(`${base}.year`, { defaultValue: project.year ?? "" }) || project.year,
    projectType: t(`${base}.projectType`, { defaultValue: project.projectType ?? "" }) || project.projectType,
    tagline: t(`${base}.tagline`, { defaultValue: project.tagline ?? "" }) || project.tagline,
    overview: t(`${base}.overview`, { defaultValue: project.overview ?? "" }) || project.overview,
    technologies: Array.isArray(technologies) ? technologies : project.technologies,
    keyFeatures: Array.isArray(keyFeatures) ? keyFeatures : project.keyFeatures,
  };
};

const mapExperience = (
  entry: ExperienceEntry,
  t: TFunction
): ExperienceEntry => {
  const base = `experience.${entry.id}`;
  const highlights = t(`${base}.highlights`, {
    returnObjects: true,
    defaultValue: entry.highlights,
  }) as string[];

  return {
    ...entry,
    company: t(`${base}.company`, { defaultValue: entry.company }),
    role: t(`${base}.role`, { defaultValue: entry.role }),
    period: t(`${base}.period`, { defaultValue: entry.period }),
    highlights: Array.isArray(highlights) ? highlights : entry.highlights,
  };
};

export const useLocalizedPortfolio = () => {
  const { t, i18n } = useTranslation();

  return useMemo(() => {
    const aboutMeDetailed = t("personalInfo.aboutMeDetailed", {
      returnObjects: true,
      defaultValue: PERSONAL_INFO.aboutMeDetailed,
    }) as string[];

    const personalInfo: PersonalInfo = {
      ...PERSONAL_INFO,
      name: t("personalInfo.name", { defaultValue: PERSONAL_INFO.name }),
      title: t("personalInfo.title", { defaultValue: PERSONAL_INFO.title }),
      bio: t("personalInfo.bio", { defaultValue: PERSONAL_INFO.bio }),
      circularText: t("personalInfo.circularText", {
        defaultValue: PERSONAL_INFO.circularText,
      }),
      introLetter1: t("personalInfo.introLetter1", {
        defaultValue: PERSONAL_INFO.introLetter1,
      }),
      introLetter2: t("personalInfo.introLetter2", {
        defaultValue: PERSONAL_INFO.introLetter2,
      }),
      introTagline: t("personalInfo.introTagline", {
        defaultValue: PERSONAL_INFO.introTagline,
      }),
      aboutMeIntro: t("personalInfo.aboutMeIntro", {
        defaultValue: PERSONAL_INFO.aboutMeIntro,
      }),
      aboutMeDetailed: Array.isArray(aboutMeDetailed)
        ? aboutMeDetailed
        : PERSONAL_INFO.aboutMeDetailed,
      projectsPageIntro: t("personalInfo.projectsPageIntro", {
        defaultValue: PERSONAL_INFO.projectsPageIntro,
      }),
      sideProjectsPageIntro: t("personalInfo.sideProjectsPageIntro", {
        defaultValue: PERSONAL_INFO.sideProjectsPageIntro,
      }),
      servicesPageIntro: t("personalInfo.servicesPageIntro", {
        defaultValue: PERSONAL_INFO.servicesPageIntro,
      }),
      hireMePageTitle: t("personalInfo.hireMePageTitle", {
        defaultValue: PERSONAL_INFO.hireMePageTitle,
      }),
      hireMePageSubtitle: t("personalInfo.hireMePageSubtitle", {
        defaultValue: PERSONAL_INFO.hireMePageSubtitle,
      }),
    };

    const navItems: NavItem[] = NAV_ITEMS_MAIN.map((item) => ({
      ...item,
      name: t(`nav.${item.id}`, { defaultValue: item.name }),
    }));

    const projects = PROJECTS.map((project) => mapProject(project, t, "projects"));
    const sideProjects = SIDE_PROJECTS.map((project) => mapSideProject(project, t));
    const services = SERVICES;
    const experience = EXPERIENCE.map((entry) => mapExperience(entry, t));

    const skills: Skill[] = SKILLS.map((skill, index) => ({
      ...skill,
      name: t(`skills.${index}`, { defaultValue: skill.name }),
    }));

    const developerCredit = {
      ...DEVELOPER_CREDIT,
      name: t("developerCredit.name", { defaultValue: DEVELOPER_CREDIT.name }),
    };

    return {
      personalInfo,
      navItems,
      projects,
      sideProjects,
      services,
      experience,
      skills,
      developerCredit,
      isRtl: i18n.dir() === "rtl",
      language: i18n.language,
    };
  }, [t, i18n.language]);
};
