import { Link } from 'react-router-dom';
import { ROUTES } from '../../routes/paths';

interface LogoProps {
  variant?: 'default' | 'light';
  className?: string;
  linkToHome?: boolean;
}

export function Logo({ variant = 'default', className = '', linkToHome = true }: LogoProps) {
  const isLight = variant === 'light';
  const primaryText = isLight ? 'text-white' : 'text-gray-900';
  const secondaryText = isLight ? 'text-blue-200' : 'text-gray-500';
  const markFrom = isLight ? '#93c5fd' : '#2563eb';
  const markTo = isLight ? '#c7d2fe' : '#4f46e5';

  const content = (
    <span className={`inline-flex items-center gap-2.5 sm:gap-3 ${className}`}>
      <svg
        width="36"
        height="36"
        viewBox="0 0 36 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
        className="flex-shrink-0 w-8 h-8 sm:w-9 sm:h-9"
      >
        <rect width="36" height="36" rx="10" fill={`url(#logo-gradient-${variant})`} />
        <path
          d="M10 24V12h3.2l4.8 7.2V12H21v12h-3.1l-4.9-7.3V24H10z"
          fill="white"
        />
        <path
          d="M22.5 12h3.5l2.4 4.8L30.8 12H34l-4.8 8.4L34.2 24h-3.6l-2.5-5.1-2.5 5.1h-3.5l4.9-8.4L22.5 12z"
          fill="white"
          opacity="0.95"
        />
        <defs>
          <linearGradient id={`logo-gradient-${variant}`} x1="0" y1="0" x2="36" y2="36">
            <stop stopColor={markFrom} />
            <stop offset="1" stopColor={markTo} />
          </linearGradient>
        </defs>
      </svg>
      <span className="flex flex-col leading-none">
        <span className={`text-base sm:text-lg font-bold tracking-tight ${primaryText}`}>
          Novora
        </span>
        <span className={`text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.18em] mt-0.5 ${secondaryText}`}>
          Solutions
        </span>
      </span>
    </span>
  );

  if (!linkToHome) return content;

  return (
    <Link
      to={ROUTES.home}
      className="inline-flex focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded-lg"
      aria-label="Novora Solutions — Home"
    >
      {content}
    </Link>
  );
}
