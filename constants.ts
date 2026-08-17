import {
  PersonalInfo,
  Project,
  SideProject,
  SocialLink,
  NavItem,
  Skill,
  ExperienceEntry,
} from "./types";
import {
  HomeIcon,
  UserIcon,
  Squares2X2Icon,
  ShoppingBagIcon,
  CpuChipIcon,
  RocketLaunchIcon,
  PuzzlePieceIcon,
  PencilIcon,
  CheckBadgeIcon,
  ServerStackIcon,
  LinkedinIcon,
  GithubIcon,
  FiShield,
  FiWind,
  FiCoffee,
  FiHexagon,
  FiRefreshCw,
  FiFeather,
  DocumentDuplicateIcon,
  CommandLineIcon,
  FiCode,
  FiType,
  FiBarChart2,
  FiLock,
  FiPackage,
  FiGitBranch,
  FiLayout,
  CloudArrowUpIcon,
} from "./components/icons";

export const WEB3FORMS_ACCESS_KEY =
  import.meta.env.VITE_WEB3FORMS_ACCESS_KEY ||
  "a012a738-4102-414c-986b-9d34d720109e";

export const DEVELOPER_CREDIT = {
  name: "Mohammad Aghaei",
  animatedNameEnglish: "Aghaei",
  animatedNameJapanese: "آقایی",
  url: "https://github.com/MrAghaei",
};

export const VISITOR_STATS = {
  staticCount: 10000800,
  enableLiveCount: false,
};

export const PERSONAL_INFO: PersonalInfo = {
  name: "Mohammad Aghaei",
  title: "Full-Stack Engineer",
  bio: "I build production-ready web applications across the frontend, backend, database, and infrastructure layers.",
  imageUrl: "https://avatars.githubusercontent.com/u/65438728?v=4",
  email: "mmdrezaaghaei@gmail.com",
  phone: "09103663507",
  githubUsername: "MrAghaei",
  circularText: "MOHAMMAD AGHAEI • FULL-STACK ENGINEER • ",
  circularTextLetterSpacing: "0.9em",
  animatedNameEnglish: "Aghaei",
  animatedNameJapanese: "آقایی",
  introLetter1: "M",
  introLetter2: "A",
  introTagline: "Full-Stack • Web Engineer",
  aboutMeIntro:
    "I am a Full-Stack Engineer focused on building modern web applications with TypeScript and the JavaScript ecosystem.",
  aboutMeDetailed: [
    "I work across the frontend and backend, with experience building dashboards, SaaS applications, REST APIs, multi-tenant systems, authentication and authorization systems, data-driven interfaces, and production infrastructure.",
    "My main frontend technologies are React, Next.js, TypeScript and Tailwind CSS. On the backend I work with Node.js, NestJS, Prisma, Drizzle and PostgreSQL.",
    "I also work with Docker, Linux and CI/CD, allowing me to work across the complete lifecycle of a web application.",
  ],
  aboutPageImageUrl: "https://avatars.githubusercontent.com/u/65438728?v=4",
  projectsPageIntro:
    "Selected projects across frontend, backend, and full-stack development — from SaaS platforms to developer tools.",
  sideProjectsPageIntro:
    "Additional web applications and tools built alongside client work and personal experiments.",
  productsPageIntro:
    "Side projects and smaller applications that show how I approach product development outside of main client work.",
  hireMePageTitle: "Have a project in mind?",
  hireMePageSubtitle:
    "Let's talk about your idea and build something useful together.",
};

export const NAV_ITEMS_MAIN: NavItem[] = [
  { id: "home", name: "Home", href: "#home", icon: HomeIcon },
  { id: "about", name: "About", href: "#about", icon: UserIcon },
  {
    id: "projects",
    name: "Projects",
    href: "#projects-page",
    icon: Squares2X2Icon,
  },
  {
    id: "products",
    name: "Products",
    href: "#products-page",
    icon: ShoppingBagIcon,
  },
];

export const EXPERIENCE: ExperienceEntry[] = [
  {
    id: "exp-freelance",
    company: "Freelance",
    role: "Full-Stack Engineer",
    period: "May 2026 – Present",
    highlights: [
      "Working independently on full-stack web applications, including frontend development, backend/API development, database design, and deployment.",
    ],
  },
  {
    id: "exp-wellowork-fullstack",
    company: "WelloWork",
    role: "Full-Stack Developer",
    period: "Jul 2025 – Dec 2025",
    highlights: [
      "Architected and developed a management dashboard using NestJS and Prisma with RBAC and tenant data isolation in a multi-tenant architecture.",
      "Optimized client-server synchronization with TanStack Query and Axios, eliminating approximately 40% of redundant network requests and improving perceived loading time by 35%.",
      "Created onboarding documentation, performed code reviews, and mentored junior developers, reducing average onboarding time by approximately 25%.",
    ],
  },
  {
    id: "exp-wellowork-frontend",
    company: "WelloWork",
    role: "Front-end Developer",
    period: "Jan 2024 – Jun 2025",
    highlights: [
      "Developed WelloWize, a cognitive assessment platform and multi-tenant SaaS dashboards using React.",
      "Contributed to and guided development from technical design through implementation and code review.",
      "Designed backend integration strategies for adaptive and AI-generated data flows.",
      "Built data-driven analytical dashboards with ECharts and Tailwind CSS for displaying more than 10,000 daily cognitive data points with latency below 150ms.",
    ],
  },
  {
    id: "exp-avand",
    company: "Avand Lab Rasht",
    role: "Front-end Developer",
    period: "Dec 2021 – Dec 2023",
    highlights: [
      "Developed B2B management dashboards with React, TypeScript and Vite in a Monorepo architecture.",
      "Implemented role-based access control and application state management with Zustand.",
      "Containerized frontend applications with Docker to eliminate configuration differences between environments.",
    ],
  },
];

export const PROJECTS: Project[] = [
  {
    id: "project-endpoint-forge",
    iconComponent: ServerStackIcon,
    iconBgColor: "bg-indigo-600 dark:bg-indigo-700",
    name: "Endpoint Forge",
    description:
      "A UI-managed mock API workbench for building and running realistic backend endpoints before production APIs are ready.",
    technologies: [
      "TypeScript",
      "React",
      "Node.js",
      "Docker",
      "REST APIs",
    ],
    client: "Bytepute",
    company: "Open Source",
    projectType: "Developer Tool, Full-Stack",
    year: "2025",
    tagline:
      "Model API contracts visually and start a mock server your frontend can call immediately.",
    overview:
      "Endpoint Forge helps teams unblock frontend development when backend contracts are incomplete or still changing. It provides a UI for creating projects, organizing routes, defining responses, and running a mock server that frontend applications can integrate with right away.",
    liveLink: "https://www.endpointforge.ir",
    repoLink: "https://github.com/Bytepute/endpointForge",
    problemStatement: {
      title: "Frontend blocked on backend availability",
      description:
        "Teams often depend on unfinished APIs, scattered JSON fixtures, or ad hoc mock servers that are hard to share and maintain across a project.",
    },
  },
  {
    id: "project-kheradkhan",
    iconComponent: PuzzlePieceIcon,
    iconBgColor: "bg-teal-600 dark:bg-teal-700",
    name: "Kheradkhan",
    description:
      "A Persian-language highlights manager for importing, organizing, and reviewing book highlights.",
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
    ],
    company: "Personal Project",
    projectType: "Web Application, SaaS",
    year: "2024",
    tagline:
      "Import, tag, search, and revisit book highlights in Persian.",
    overview:
      "Kheradkhan is a Readwise-inspired application focused on Persian-language reading workflows. It supports highlight import, tagging, search, daily review, and authenticated personal libraries with a responsive Next.js interface.",
    liveLink: "https://kheradkhan.vercel.app",
    repoLink: "https://github.com/MrAghaei/kheradkhan-v2",
    problemStatement: {
      title: "Managing highlights in Persian",
      description:
        "Readers needed a dedicated way to collect, organize, and revisit highlights from books and articles in Persian without relying on generic English-first tools.",
    },
  },
  {
    id: "project-wellowize",
    iconComponent: FiBarChart2,
    iconBgColor: "bg-blue-600 dark:bg-blue-700",
    name: "WelloWize",
    description:
      "A cognitive assessment platform with multi-tenant SaaS dashboards for analyzing large volumes of assessment data.",
    technologies: [
      "React",
      "TypeScript",
      "TanStack Query",
      "ECharts",
      "Tailwind CSS",
    ],
    client: "WelloWork",
    company: "WelloWork",
    projectType: "SaaS Platform, Dashboard",
    year: "2024 – 2025",
    tagline:
      "Data-driven dashboards for cognitive assessment workflows at scale.",
    overview:
      "WelloWize is a cognitive assessment product built with React, combining multi-tenant SaaS dashboards with analytical views powered by ECharts. I contributed across technical design, frontend implementation, backend integration, and code review.",
    problemStatement: {
      title: "Visualizing high-volume cognitive data",
      description:
        "The platform needed responsive dashboards capable of presenting large daily datasets with low latency while supporting adaptive and AI-generated data flows.",
    },
  },
  {
    id: "project-physitoo",
    iconComponent: RocketLaunchIcon,
    iconBgColor: "bg-green-600 dark:bg-green-700",
    name: "Physitoo",
    description:
      "A home healthcare platform focused on connecting patients with physiotherapy and rehabilitation services.",
    technologies: [
      "React",
      "TypeScript",
      "REST APIs",
      "Tailwind CSS",
    ],
    projectType: "Web Application, Healthcare",
    year: "2023",
    tagline:
      "Digital workflows for home healthcare and physiotherapy services.",
    overview:
      "Physitoo is a healthcare platform for home physiotherapy services. The work involved building structured user-facing flows and integrating with backend services to support service management and patient-facing experiences.",
    problemStatement: {
      title: "Digitizing home healthcare coordination",
      description:
        "The product needed reliable web interfaces to support service discovery, coordination, and operational workflows for home healthcare providers.",
    },
  },
];

export const SIDE_PROJECTS: SideProject[] = [
  {
    id: "side-schematic-form-builder",
    iconComponent: PencilIcon,
    iconBgColor: "bg-purple-500 dark:bg-purple-600",
    name: "Schematic Form Builder",
    tag: "LIVE DEMO",
    link: "https://schematic-form-builder.vercel.app",
    linkText: "View Demo",
    description:
      "A schematic form builder for defining and previewing dynamic form layouts in the browser.",
    year: "2024",
    projectType: "Web App",
    tagline: "Design form structures visually before wiring them into an app.",
    overview:
      "An interactive form builder that lets developers define fields, layout, and structure for dynamic forms with a live preview.",
    technologies: ["React", "TypeScript", "Vite", "Tailwind CSS"],
    keyFeatures: [
      "Visual form layout editing",
      "Live preview of form structure",
      "Reusable field configuration",
    ],
  },
  {
    id: "side-jobgraph",
    iconComponent: CpuChipIcon,
    iconBgColor: "bg-slate-600 dark:bg-slate-700",
    name: "JobGraph",
    tag: "FULL-STACK",
    link: "https://github.com/MrAghaei/jobgraph-frontend",
    linkText: "View on GitHub",
    description:
      "A full-stack job tracking application with separate frontend and backend repositories.",
    year: "2025",
    projectType: "Web App",
    tagline: "Track job applications with a dedicated frontend and API backend.",
    overview:
      "JobGraph includes a React frontend and a dedicated backend service for managing job search data, application status, and related workflows.",
    technologies: ["React", "TypeScript", "Node.js", "REST APIs"],
    keyFeatures: [
      "Application tracking interface",
      "Dedicated API backend",
      "Structured job search workflow",
    ],
  },
  {
    id: "side-germany-train-stations",
    iconComponent: CloudArrowUpIcon,
    iconBgColor: "bg-orange-500 dark:bg-orange-600",
    name: "Germany Train Stations",
    tag: "LIVE DEMO",
    link: "https://germany-train-stations-alpha.vercel.app",
    linkText: "View Demo",
    description:
      "An interactive map application for exploring Germany train station data.",
    year: "2024",
    projectType: "Web App",
    tagline: "Map-based exploration of train station datasets.",
    overview:
      "A frontend application built to visualize and explore Germany train station data with map-based interaction and filtering.",
    technologies: ["React", "TypeScript", "Vite", "Tailwind CSS"],
  },
];

export const SOCIAL_LINKS: SocialLink[] = [
  {
    name: "GitHub",
    url: "https://github.com/MrAghaei",
    icon: GithubIcon,
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/mohamad-aghaei/",
    icon: LinkedinIcon,
  },
];

export const SKILLS: Skill[] = [
  { name: "HTML", backgroundColor: "bg-orange-500", textColor: "text-white", icon: FiCode },
  { name: "CSS", backgroundColor: "bg-blue-500", textColor: "text-white", icon: FiType },
  { name: "SCSS", backgroundColor: "bg-pink-500", textColor: "text-white", icon: FiFeather },
  { name: "JavaScript", backgroundColor: "bg-yellow-500", textColor: "text-black", icon: CommandLineIcon },
  { name: "TypeScript", backgroundColor: "bg-blue-600", textColor: "text-white", icon: FiType },
  { name: "React", backgroundColor: "bg-cyan-500", textColor: "text-white", icon: FiRefreshCw },
  { name: "Next.js", backgroundColor: "bg-gray-800", textColor: "text-white", icon: RocketLaunchIcon },
  { name: "Tailwind CSS", backgroundColor: "bg-teal-500", textColor: "text-white", icon: FiWind },
  { name: "Shadcn UI", backgroundColor: "bg-slate-700", textColor: "text-white", icon: FiLayout },
  { name: "ECharts", backgroundColor: "bg-red-500", textColor: "text-white", icon: FiBarChart2 },
  { name: "Zod", backgroundColor: "bg-indigo-500", textColor: "text-white", icon: CheckBadgeIcon },
  { name: "TanStack Query", backgroundColor: "bg-rose-500", textColor: "text-white", icon: FiRefreshCw },
  { name: "Redux Toolkit", backgroundColor: "bg-purple-600", textColor: "text-white", icon: FiPackage },
  { name: "Zustand", backgroundColor: "bg-amber-600", textColor: "text-white", icon: FiHexagon },
  { name: "React Hook Form", backgroundColor: "bg-sky-600", textColor: "text-white", icon: PencilIcon },
  { name: "Vite", backgroundColor: "bg-violet-500", textColor: "text-white", icon: RocketLaunchIcon },
  { name: "Node.js", backgroundColor: "bg-green-600", textColor: "text-white", icon: FiHexagon },
  { name: "NestJS", backgroundColor: "bg-red-600", textColor: "text-white", icon: ServerStackIcon },
  { name: "Prisma", backgroundColor: "bg-slate-800", textColor: "text-white", icon: FiLock },
  { name: "Drizzle", backgroundColor: "bg-orange-600", textColor: "text-white", icon: FiCoffee },
  { name: "REST APIs", backgroundColor: "bg-blue-700", textColor: "text-white", icon: ServerStackIcon },
  { name: "PostgreSQL", backgroundColor: "bg-indigo-700", textColor: "text-white", icon: ServerStackIcon },
  { name: "SOLID", backgroundColor: "bg-gray-600", textColor: "text-white", icon: FiShield },
  { name: "Design Patterns", backgroundColor: "bg-fuchsia-600", textColor: "text-white", icon: PuzzlePieceIcon },
  { name: "Monorepo", backgroundColor: "bg-emerald-600", textColor: "text-white", icon: FiPackage },
  { name: "Multi-Tenant", backgroundColor: "bg-cyan-700", textColor: "text-white", icon: DocumentDuplicateIcon },
  { name: "RBAC", backgroundColor: "bg-lime-700", textColor: "text-white", icon: FiShield },
  { name: "Linux", backgroundColor: "bg-yellow-600", textColor: "text-black", icon: CommandLineIcon },
  { name: "Bash", backgroundColor: "bg-stone-700", textColor: "text-white", icon: CommandLineIcon },
  { name: "Docker", backgroundColor: "bg-sky-700", textColor: "text-white", icon: CloudArrowUpIcon },
  { name: "CI/CD", backgroundColor: "bg-green-700", textColor: "text-white", icon: FiGitBranch },
  { name: "Git", backgroundColor: "bg-orange-700", textColor: "text-white", icon: FiGitBranch },
  { name: "GitHub", backgroundColor: "bg-gray-900", textColor: "text-white", icon: GithubIcon },
  { name: "Turborepo", backgroundColor: "bg-blue-800", textColor: "text-white", icon: RocketLaunchIcon },
];
