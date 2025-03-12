import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const handleScroll = () => {
    const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    
    setScrollProgress(scrolled);
    setIsVisible(winScroll > 300);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 z-50 group"
      aria-label="Scroll to top"
    >
      <div className="relative p-2 bg-blue-600/40 hover:bg-blue-600/60 backdrop-blur-[2px] rounded-full shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105">
        {/* Progress circle */}
        <svg className="w-8 h-8 transform -rotate-90">
          <circle
            className="text-white/5"
            strokeWidth="1"
            stroke="currentColor"
            fill="transparent"
            r="15"
            cx="16"
            cy="16"
          />
          <circle
            className="text-white/70 transition-all duration-300"
            strokeWidth="1"
            strokeDasharray={94.2}
            strokeDashoffset={94.2 * (1 - scrollProgress / 100)}
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
            r="15"
            cx="16"
            cy="16"
          />
        </svg>
        
        {/* Arrow icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <ArrowUp className="w-4 h-4 text-white/90 transform transition-transform group-hover:translate-y-[-1px]" />
        </div>
        
        {/* Tooltip */}
        <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="bg-gray-900/70 backdrop-blur-sm text-white/90 text-xs py-1 px-1.5 rounded">
            {Math.round(scrollProgress)}%
          </div>
        </div>
      </div>
    </button>
  );
}