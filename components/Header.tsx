import React, { useRef, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { PlusIcon, SunIcon, MoonIcon, MenuIcon, CloseIcon } from './icons';
import { NavItem as NavItemType } from '../types';
import { LanguageSwitcher } from './LanguageSwitcher';
import { usePortfolio } from '../context/PortfolioContext';

interface NavItemProps {
  item: NavItemType;
  isActive: boolean;
  onClick: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

const NavItem = React.forwardRef<HTMLButtonElement, NavItemProps>(({ item, isActive, onClick, onMouseEnter, onMouseLeave }, ref) => (
  <button
    ref={ref}
    onClick={onClick}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
    className={`p-1.5 md:px-2.5 md:py-1.5 rounded-full transition-colors text-sm font-medium relative flex items-center justify-center md:justify-start gap-0 md:gap-1.5
      ${isActive 
        ? 'text-text-primary dark:text-dark-text-primary'
        : 'text-text-secondary dark:text-dark-text-secondary hover:text-text-primary dark:hover:text-dark-text-primary'
      }`}
    aria-label={item.name}
    aria-current={isActive ? 'page' : undefined}
  >
    <span className="hidden md:inline whitespace-nowrap">{item.name}</span>
    <item.icon className="w-5 h-5 shrink-0" />
  </button>
));

export const Header: React.FC<{
  currentPage: string;
  setCurrentPage: (pageId: string) => void;
  theme: string;
  toggleTheme: (event?: React.MouseEvent) => void;
}> = ({ currentPage, setCurrentPage, theme, toggleTheme }) => {
  const { t } = useTranslation();
  const { navItems } = usePortfolio();
  const navContainerRef = useRef<HTMLElement>(null);
  const activePillRef = useRef<HTMLDivElement>(null);
  const navItemRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const [hoveredItemId, setHoveredItemId] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    navItemRefs.current = navItemRefs.current.slice(0, navItems.length);
  }, [navItems.length]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [currentPage]);

  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const handlePointerDown = (event: MouseEvent | TouchEvent) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node)
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('touchstart', handlePointerDown);
    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('touchstart', handlePointerDown);
    };
  }, [isMobileMenuOpen]);

  const updatePillStyles = (
    pillEl: HTMLDivElement | null,
    targetItemId: string | null,
    itemRefs: React.MutableRefObject<(HTMLButtonElement | null)[]>,
    containerEl: HTMLElement | null,
    navItemsConfig: NavItemType[]
  ) => {
    if (!pillEl || !containerEl ) {
      if (pillEl) pillEl.style.opacity = '0';
      return;
    }

    if (!targetItemId) { 
        pillEl.style.opacity = '0';
        return;
    }

    const targetItemIndex = navItemsConfig.findIndex(navItem => navItem.id === targetItemId);
    const targetItemEl = itemRefs.current[targetItemIndex];

    if (targetItemEl) {
      const containerRect = containerEl.getBoundingClientRect();
      const targetItemRect = targetItemEl.getBoundingClientRect();
      
      pillEl.style.left = `${targetItemRect.left - containerRect.left}px`;
      pillEl.style.width = `${targetItemRect.width}px`;
      pillEl.style.height = `${targetItemRect.height}px`;
      pillEl.style.top = `${targetItemRect.top - containerRect.top}px`;
      pillEl.style.opacity = '1';
    } else {
      pillEl.style.opacity = '0';
    }
  };
  

  useEffect(() => {
    const calculatePillPositions = () => {
      const targetItemIdForPill = hoveredItemId || currentPage;
      
      updatePillStyles(
        activePillRef.current, 
        targetItemIdForPill, 
        navItemRefs, 
        navContainerRef.current, 
        navItems
      );
    };

    calculatePillPositions();

    window.addEventListener('resize', calculatePillPositions);
    return () => {
      window.removeEventListener('resize', calculatePillPositions);
    };
  }, [currentPage, hoveredItemId, theme, navItems, isMobileMenuOpen]);


  const handleNavClick = (itemId: string) => {
    setCurrentPage(itemId);
  };

  const themeToggleButton = (
    <button
      type="button"
      onClick={(e) => toggleTheme(e)}
      aria-label={theme === 'light' ? t('common.switchToDark') : t('common.switchToLight')}
      className="group text-text-secondary dark:text-dark-text-secondary hover:text-text-primary dark:hover:text-dark-text-primary p-2 rounded-full transition-colors hover:bg-card-hover dark:hover:bg-dark-card-hover"
    >
      {theme === 'light' ? (
        <MoonIcon className="w-5 h-5" />
      ) : (
        <SunIcon className="w-5 h-5 transition-transform duration-300 ease-in-out group-hover:rotate-180" />
      )}
    </button>
  );
  
  return (
    <header className="sticky top-0 z-50 w-full bg-background/80 dark:bg-dark-background/80 backdrop-blur-md border-b border-border dark:border-dark-border">
      <div className="max-w-5xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-2 h-14 sm:h-16">
          <nav ref={navContainerRef} className="relative flex items-center gap-0.5 min-w-0">
            {navItems.map((item, index) => (
              <NavItem 
                key={item.id}
                ref={el => { navItemRefs.current[index] = el; }}
                item={item} 
                isActive={currentPage === item.id}
                onClick={() => handleNavClick(item.id)}
                onMouseEnter={() => setHoveredItemId(item.id)}
                onMouseLeave={() => setHoveredItemId(null)}
              />
            ))}
            <div ref={activePillRef} className="nav-active-pill"></div>
          </nav>

          <div ref={mobileMenuRef} className="relative flex items-center gap-1.5 sm:gap-3 shrink-0">
            <button
              onClick={() => setCurrentPage('hire')}
              className="inline-flex items-center justify-center bg-button-primary-bg dark:bg-dark-button-primary-bg text-button-primary-text dark:text-dark-button-primary-text hover:bg-button-primary-hover dark:hover:bg-dark-button-primary-hover text-xs sm:text-sm font-medium py-1.5 px-2.5 sm:py-2 sm:px-3 rounded-lg transition-colors whitespace-nowrap"
            >
              <PlusIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
              <span className="mr-1 sm:mr-1.5">{t('common.hireMe')}</span>
            </button>

            <div className="hidden md:flex items-center gap-3">
              <LanguageSwitcher />
              {themeToggleButton}
            </div>

            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((open) => !open)}
              aria-label={isMobileMenuOpen ? t('common.closeMenu') : t('common.openMenu')}
              aria-expanded={isMobileMenuOpen}
              className="md:hidden p-2 rounded-lg text-text-secondary dark:text-dark-text-secondary hover:text-text-primary dark:hover:text-dark-text-primary hover:bg-card-hover dark:hover:bg-dark-card-hover transition-colors"
            >
              {isMobileMenuOpen ? (
                <CloseIcon className="w-5 h-5" />
              ) : (
                <MenuIcon className="w-5 h-5" />
              )}
            </button>

            {isMobileMenuOpen && (
              <div className="absolute top-full end-0 mt-2 w-56 rounded-xl border border-border dark:border-dark-border bg-background dark:bg-dark-background shadow-lg p-3 space-y-3 md:hidden">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm text-text-secondary dark:text-dark-text-secondary">
                    {t('languageSwitcher.label')}
                  </span>
                  <LanguageSwitcher />
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm text-text-secondary dark:text-dark-text-secondary">
                    {theme === 'light' ? t('common.switchToDark') : t('common.switchToLight')}
                  </span>
                  {themeToggleButton}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
