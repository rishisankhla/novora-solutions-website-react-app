import { Link } from 'react-router-dom';
import { ROUTES } from '../../routes/paths';

interface LogoProps {
  className?: string;
  linkToHome?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const sizeClasses = {
  sm: 'h-8',
  md: 'h-10',
  lg: 'h-12',
} as const;

export function Logo({ className = '', linkToHome = true, size = 'md' }: LogoProps) {
  const img = (
    <img
      src="/images/Novora-Logo.png"
      alt="Novora Solutions"
      className={`${sizeClasses[size]} w-auto object-contain ${className}`}
    />
  );

  if (!linkToHome) return img;

  return (
    <Link
      to={ROUTES.home}
      className="inline-flex focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded-lg"
      aria-label="Novora Solutions — Home"
    >
      {img}
    </Link>
  );
}
