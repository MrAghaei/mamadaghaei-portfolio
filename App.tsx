import React, { useRef, useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { useSwipeable } from 'react-swipeable';
import { useTranslation } from 'react-i18next';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProjectsSection } from './components/ProjectsSection';
import { SideProjectsSection } from './components/SideProjectsSection';
import { CallToAction } from './components/CallToAction';
import { Footer } from './components/Footer';
import { AboutPage } from './components/AboutPage';
import { ProjectsPage } from './components/ProjectsPage';
import { ProductsPage } from './components/ProductsPage';
import { HireMePage } from './components/HireMePage';
import { ProjectDetailsPage } from './components/ProjectDetailsPage';
import { SideProjectDetailsPage } from './components/SideProjectDetailsPage';
import { SOCIAL_LINKS } from './constants';
import { IntroAnimation } from './components/IntroAnimation';
import { SmoothScrollProvider, SmoothScrollToTop } from './components/SmoothScrollProvider';
import { PortfolioProvider, usePortfolio } from './context/PortfolioContext';
import { useLenis } from 'lenis/react';
import clickSound from './assets/click_sound.wav';

const AppContent: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const lenis = useLenis();
  const { t } = useTranslation();
  const { personalInfo, projects, sideProjects, skills, developerCredit, isRtl } = usePortfolio();
  const [showIntro, setShowIntro] = useState(true);
  
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('theme') as 'light' | 'dark') || 'light';
    }
    return 'light';
  });

  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleAnimationComplete = useCallback(() => {
    setShowIntro(false);
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', theme);
    }
  }, [theme]);

  useEffect(() => {
    const audio = new Audio(clickSound);
    audio.preload = 'auto';
    audio.volume = 0.35;

    const onDocumentClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target) return;

      if (target.closest('input, textarea, select, label')) return;

      const interactive = target.closest('button, a, [role="button"], [data-click-sound="true"]');
      if (!interactive) return;
      if ((interactive as HTMLButtonElement).disabled) return;
      if (interactive.getAttribute('aria-disabled') === 'true') return;

      try {
        audio.currentTime = 0;
        void audio.play();
      } catch {
        // Ignore autoplay / platform restrictions
      }
    };

    document.addEventListener('click', onDocumentClick, true);
    return () => {
      document.removeEventListener('click', onDocumentClick, true);
      audio.pause();
    };
  }, []);

  const toggleTheme = useCallback(
    (_event?: React.MouseEvent) => {
      const nextTheme = theme === 'light' ? 'dark' : 'light';
      const doc = document as unknown as {
        startViewTransition?: (cb: () => void) => {
          ready: Promise<void>;
          finished: Promise<void>;
        };
      };

      document.documentElement.setAttribute('data-theme-transition', nextTheme);

      if (doc.startViewTransition) {
        const transition = doc.startViewTransition(() => {
          setTheme(nextTheme);
        });

        void transition.finished.finally(() => {
          document.documentElement.removeAttribute('data-theme-transition');
        });
        return;
      }

      setTheme(nextTheme);
      window.setTimeout(() => {
        document.documentElement.removeAttribute('data-theme-transition');
      }, 500);
    },
    [theme]
  );

  const handleSetPage = useCallback((page: string, projectId?: string) => {
    setIsTransitioning(true);
    setTimeout(() => {
      if (page === 'home') {
        navigate('/');
      } else if (page === 'project-detail' && projectId) {
        navigate(`/project/${projectId}`);
      } else {
        navigate(`/${page}`);
      }
      setIsTransitioning(false);
      if (lenis) {
        lenis.scrollTo(0, { immediate: true });
      } else {
        window.scrollTo(0, 0);
      }
    }, 150);
  }, [navigate, lenis]);

  const menuTabs = ['home', 'about', 'projects', 'products', 'hire'];

  const getCurrentPage = () => {
    const path = location.pathname;
    if (path === '/') return 'home';
    if (path.startsWith('/project/')) return 'project-detail';
    return path.slice(1);
  };

  const currentPage = getCurrentPage();

  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
  const currentTabIdx = menuTabs.indexOf(currentPage);
  const swipeStartAllowedRef = useRef(true);
  const swipeStartAtRef = useRef<{ x: number; y: number } | null>(null);

  const goToTab = (idx: number) => {
    if (idx >= 0 && idx < menuTabs.length) {
      handleSetPage(menuTabs[idx]);
    }
  };

  const swipeHandlers = useSwipeable({
    onSwipeStart: (e) => {
      const touch = 'touches' in e && e.touches && e.touches[0] ? e.touches[0] : null;
      const x = touch?.clientX ?? 0;
      const y = touch?.clientY ?? 0;
      swipeStartAtRef.current = { x, y };

      const w = window.innerWidth || 1;
      const startRatio = x / w;
      const withinMiddle = startRatio >= 0.22 && startRatio <= 0.78;

      const target = e.target as HTMLElement | null;
      const isTyping = !!target?.closest('input, textarea, select, label');
      const isInteractive = !!target?.closest('button, a, [role="button"]');

      swipeStartAllowedRef.current = withinMiddle && !isTyping && !isInteractive;
    },
    onSwipedLeft: () => {
      if (!swipeStartAllowedRef.current) return;
      if (isMobile && currentTabIdx !== -1 && currentPage !== 'project-detail') {
        goToTab(currentTabIdx + (isRtl ? -1 : 1));
      }
    },
    onSwipedRight: () => {
      if (!swipeStartAllowedRef.current) return;
      if (isMobile && currentTabIdx !== -1 && currentPage !== 'project-detail') {
        goToTab(currentTabIdx + (isRtl ? 1 : -1));
      }
    },
    trackTouch: true,
    trackMouse: false,
    delta: 60,
    preventScrollOnSwipe: false,
  });

  if (showIntro) {
    return <IntroAnimation personalInfo={personalInfo} onAnimationComplete={handleAnimationComplete} />;
  }

  return (
    <div className="min-h-screen flex flex-col" {...swipeHandlers}>
      <SmoothScrollToTop pathname={location.pathname} />
      <Header
        currentPage={currentPage}
        setCurrentPage={handleSetPage}
        theme={theme}
        toggleTheme={toggleTheme}
      />
      <main 
        key={location.pathname}
        className={`w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16 md:space-y-24 flex-grow page-transition ${isTransitioning ? 'page-fade-exit-active' : 'page-fade-enter-active'}`}
      >
        <Routes>
          <Route path="/" element={
            <>
              <Hero
                name={personalInfo.name}
                title={personalInfo.title}
                bio={personalInfo.bio}
                imageUrl={personalInfo.imageUrl}
                email={personalInfo.email}
                circularText={personalInfo.circularText}
                circularTextLetterSpacing={personalInfo.circularTextLetterSpacing}
                animatedNameEnglish={personalInfo.animatedNameEnglish}
                animatedNameJapanese={personalInfo.animatedNameJapanese}
                instagramUrl={SOCIAL_LINKS.find((link) => link.name === 'Instagram')?.url ?? 'https://instagram.com'}
                setCurrentPage={handleSetPage}
              />
              <ProjectsSection 
                projects={projects} 
                onViewAllClick={() => handleSetPage('projects')} 
                setCurrentPage={handleSetPage}
                title={t('sections.featuredProjects')}
                maxItems={3}
              />
              <SideProjectsSection 
                sideProjects={sideProjects} 
                title={t('sections.exploreProducts')} 
                onViewAllClick={() => handleSetPage('products')}
                viewAllText={t('common.viewAllProducts')}
              />
              <CallToAction email={personalInfo.email} setCurrentPage={handleSetPage} />
            </>
          } />
          
          <Route path="/about" element={
            <AboutPage 
              personalInfo={personalInfo} 
              sideProjects={sideProjects} 
              email={personalInfo.email} 
              setCurrentPage={handleSetPage} 
              theme={theme} 
              skills={skills} 
            />
          } />
          
          <Route path="/projects" element={
            <ProjectsPage 
              projects={projects} 
              sideProjects={sideProjects} 
              email={personalInfo.email} 
              setCurrentPage={handleSetPage} 
            />
          } />
          
          <Route path="/products" element={
            <ProductsPage 
              sideProjects={sideProjects} 
              personalInfo={{email: personalInfo.email, productsPageIntro: personalInfo.productsPageIntro }} 
              setCurrentPage={handleSetPage} 
            />
          } />

          <Route path="/product/:sideProjectId" element={
            <SideProjectDetailsPage
              setCurrentPage={handleSetPage}
              email={personalInfo.email}
            />
          } />
          
          <Route path="/hire" element={
            <HireMePage 
              personalInfo={personalInfo} 
              socialLinks={SOCIAL_LINKS} 
              setCurrentPage={handleSetPage} 
            />
          } />
          
          <Route path="/project/:projectId" element={
            <ProjectDetailsPage 
              setCurrentPage={handleSetPage}
              email={personalInfo.email}
            />
          } />
          
          <Route path="*" element={
            <div className="text-center py-10">
              <h1 className="text-2xl font-bold mb-4">{t('common.pageNotFound')}</h1>
              <p className="text-text-secondary dark:text-dark-text-secondary mb-6">{t('common.pageNotFoundDescription')}</p>
              <button
                onClick={() => handleSetPage('home')}
                className="px-4 py-2 bg-button-primary-bg text-button-primary-text rounded-lg hover:bg-button-primary-hover"
              >
                {t('common.goHome')}
              </button>
            </div>
          } />
        </Routes>
      </main>
      <Footer
        socialLinks={SOCIAL_LINKS}
        developerName={developerCredit.name}
        developerUrl={developerCredit.url}
        animatedNameEnglish={developerCredit.animatedNameEnglish}
        animatedNameJapanese={developerCredit.animatedNameJapanese}
      />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <SmoothScrollProvider>
      <Router>
        <PortfolioProvider>
          <AppContent />
        </PortfolioProvider>
      </Router>
    </SmoothScrollProvider>
  );
};

export default App;
