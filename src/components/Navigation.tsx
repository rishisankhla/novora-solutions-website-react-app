import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Layers, Info, Users, Mail } from 'lucide-react';

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Handle clicks outside the menu to close it
    const handleClickOutside = (event: MouseEvent) => {
      if (isOpen && 
          menuRef.current && 
          buttonRef.current && 
          !menuRef.current.contains(event.target as Node) && 
          !buttonRef.current.contains(event.target as Node)) {
        console.log(menuRef.current.contains(event.target),event.target);
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const navLinks = [
    { href: '#services', label: 'Services', icon: <Layers className="h-6 w-6" /> },
    { href: '#about', label: 'About', icon: <Info className="h-6 w-6" /> },
    { href: '#team', label: 'Team', icon: <Users className="h-6 w-6" /> },
    { href: '#contact', label: 'Contact', icon: <Mail className="h-6 w-6" /> }
  ];

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    setIsOpen(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled || isOpen
          ? 'bg-white/90 backdrop-blur-md shadow-lg' 
          : 'bg-transparent'
      }`}
    >
      <div className="w-[95%] mx-auto">
        <div className="flex items-center h-14">
          {/* Empty div for mobile layout balance on left side */}
          <div className="w-10 md:hidden"></div>

          {/* Mobile Logo - Center (size unchanged) */}
          <div className="flex-1 flex justify-center items-center md:hidden">
            <button 
              onClick={scrollToTop}
              className={`transition-all duration-300 hover:scale-105 focus:outline-none ${
                isOpen ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
              }`}
            >
              <img 
                src="/images/Novora-Logo.png" 
                alt="Novora Solutions" 
                className="h-8"
              />
            </button>
          </div>

          {/* Mobile Menu Button - Moved to right side */}
          <div className="md:hidden flex-shrink-0">
            <button
              ref={buttonRef}
              onClick={() => setIsOpen(!isOpen)}
              className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-100/50 transition-colors"
              aria-label="Toggle menu"
            >
              <div className="relative w-6 h-6">
                <span
                  className={`absolute block h-0.5 bg-gray-600 transform transition-all duration-300 ease-out ${
                    isOpen
                      ? "rotate-45 w-6 top-3"
                      : "w-6 top-2"
                  }`}
                />
                <span
                  className={`absolute block h-0.5 bg-gray-600 w-6 top-3 transition-all duration-200 ${
                    isOpen ? "opacity-0" : "opacity-100"
                  }`}
                />
                <span
                  className={`absolute block h-0.5 bg-gray-600 transform transition-all duration-300 ease-out ${
                    isOpen
                      ? "-rotate-45 w-6 top-3"
                      : "w-6 top-4"
                  }`}
                />
              </div>
            </button>
          </div>

          {/* Desktop Navigation - Centered */}
          <div className="hidden md:flex items-center justify-center flex-1">
            <div className="flex items-center space-x-8">
              {navLinks.slice(0, 2).map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleClick(e, link.href)}
                  className="relative px-4 py-2 text-gray-700 hover:text-blue-600 transition-colors group"
                >
                  <span>{link.label}</span>
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 transform scale-x-0 transition-transform group-hover:scale-x-100" />
                </a>
              ))}
              
              {/* Logo - Increased size and adjusted position for desktop */}
              <div className="mx-8 -mb-4">
                <button 
                  onClick={scrollToTop}
                  className="transition-transform hover:scale-105 focus:outline-none"
                >
                  <img 
                    src="/images/Novora-Logo.png" 
                    alt="Novora Solutions" 
                    className="h-10"
                  />
                </button>
              </div>

              {navLinks.slice(2).map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleClick(e, link.href)}
                  className="relative px-4 py-2 text-gray-700 hover:text-blue-600 transition-colors group"
                >
                  <span>{link.label}</span>
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 transform scale-x-0 transition-transform group-hover:scale-x-100" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Navigation Panel */}
        <div
          ref={menuRef}
          className={`fixed inset-x-0 top-14 md:hidden transition-all duration-300 ease-in-out ${
            isOpen
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-4 pointer-events-none"
          }`}
        >
          <div className="bg-white/95 backdrop-blur-md shadow-lg border-t border-gray-100">
            <div className="py-8">
              <div className="flex flex-col space-y-6">
                {navLinks.map((link) => (
                  <div key={link.href} className="relative">
                    <a
                      href={link.href}
                      onClick={(e) => handleClick(e, link.href)}
                      className="group flex items-center justify-center space-x-4 py-2"
                    >
                      <div className="text-gray-600 group-hover:text-blue-600 transform transition-all duration-300 group-hover:scale-110">
                        {link.icon}
                      </div>
                      <span className="text-lg font-medium text-gray-700 group-hover:text-blue-600 transition-colors">
                        {link.label}
                      </span>
                    </a>
                    {/* Full-width line that expands from center */}
                    <div className="absolute bottom-0 inset-x-0 h-0.5">
                      <div className="absolute inset-x-0 bottom-0 h-full bg-blue-600 transform origin-center scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}