import { useState, useEffect, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { NAV_ITEMS } from '../data/nav';
import { ROUTES } from '../routes/paths';
import { Logo } from './brand/Logo';
import { Button } from './ui/Button';

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
    };
    document.addEventListener('keydown', handleKeyDown);
    menuRef.current?.querySelector('a')?.focus();
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen &&
        menuRef.current &&
        buttonRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    [
      'relative px-1 py-2 text-sm font-medium transition-colors duration-200',
      isActive ? 'text-brand-600' : 'text-ink-muted hover:text-ink',
    ].join(' ');

  const isHome = location.pathname === ROUTES.home;
  const showSolidNav = scrolled || isOpen || !isHome;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        showSolidNav
          ? 'bg-white/85 backdrop-blur-xl shadow-sm border-b border-surface-border/80'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Main navigation">
        <div className="flex items-center justify-between h-16 lg:h-[4.5rem]">
          <Logo className="transition-opacity duration-200 hover:opacity-90" />

          <div className="hidden lg:flex items-center gap-1 xl:gap-2">
            {NAV_ITEMS.map((item) => (
              <NavLink key={item.to} to={item.to} className={navLinkClass} end={item.to === ROUTES.home}>
                {({ isActive }) => (
                  <span className="relative">
                    {item.label}
                    <span
                      className={`absolute -bottom-1 left-0 right-0 h-px bg-brand-600 transition-transform duration-300 origin-left ${
                        isActive ? 'scale-x-100' : 'scale-x-0'
                      }`}
                      aria-hidden
                    />
                  </span>
                )}
              </NavLink>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <Button to={ROUTES.contact} size="md" className="!rounded-full !px-5">
              Get in touch
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </div>

          <button
            ref={buttonRef}
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden w-10 h-10 flex items-center justify-center rounded-xl hover:bg-surface-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
          >
            <div className="relative w-5 h-4">
              <span
                className={`absolute left-0 block h-0.5 w-5 bg-ink transform transition-all duration-300 ${
                  isOpen ? 'top-[7px] rotate-45' : 'top-0'
                }`}
              />
              <span
                className={`absolute left-0 top-[7px] block h-0.5 w-5 bg-ink transition-all duration-200 ${
                  isOpen ? 'opacity-0 scale-x-0' : 'opacity-100'
                }`}
              />
              <span
                className={`absolute left-0 block h-0.5 w-5 bg-ink transform transition-all duration-300 ${
                  isOpen ? 'top-[7px] -rotate-45' : 'top-[14px]'
                }`}
              />
            </div>
          </button>
        </div>
      </nav>

      <div
        ref={menuRef}
        className={`lg:hidden fixed inset-0 top-16 transition-all duration-300 ${
          isOpen ? 'visible' : 'invisible'
        }`}
        aria-hidden={!isOpen}
      >
        <div
          className={`absolute inset-0 bg-ink/20 backdrop-blur-sm transition-opacity duration-300 ${
            isOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setIsOpen(false)}
        />
        <div
          className={`relative bg-white border-t border-surface-border shadow-elevated transition-all duration-300 ${
            isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
          }`}
        >
          <div className="px-4 py-6 space-y-1">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === ROUTES.home}
                className={({ isActive }) =>
                  [
                    'block px-4 py-3 rounded-xl text-base font-medium transition-colors',
                    isActive ? 'bg-brand-50 text-brand-700' : 'text-ink-muted hover:bg-surface-muted',
                  ].join(' ')
                }
              >
                {item.label}
              </NavLink>
            ))}
            <div className="pt-4 px-2">
              <Button to={ROUTES.contact} size="md" className="w-full">
                Get in touch
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
