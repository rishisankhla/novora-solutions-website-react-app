import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ArrowUp } from 'lucide-react';

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      setScrollProgress(height > 0 ? (winScroll / height) * 100 : 0);
      setIsVisible(winScroll > 300);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

  if (!isVisible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-6 right-6 z-50 group"
      aria-label="Scroll to top"
    >
      <div className="relative p-2 bg-blue-600/40 hover:bg-blue-600/60 backdrop-blur-[2px] rounded-full shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105">
        <svg className="w-8 h-8 transform -rotate-90" aria-hidden>
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
        <div className="absolute inset-0 flex items-center justify-center">
          <ArrowUp className="w-4 h-4 text-white/90 transform transition-transform group-hover:-translate-y-0.5" />
        </div>
      </div>
    </button>
  );
}
