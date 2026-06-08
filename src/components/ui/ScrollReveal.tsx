import { ReactNode } from 'react';
import { useScrollReveal } from '../../hooks/useScrollReveal';

type AnimationVariant = 'fade-up' | 'fade-in' | 'slide-left' | 'slide-right' | 'scale';

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  variant?: AnimationVariant;
  delay?: number;
}

const variantClasses: Record<AnimationVariant, string> = {
  'fade-up': 'reveal-fade-up',
  'fade-in': 'reveal-fade-in',
  'slide-left': 'reveal-slide-left',
  'slide-right': 'reveal-slide-right',
  scale: 'reveal-scale',
};

export function ScrollReveal({
  children,
  className = '',
  variant = 'fade-up',
  delay = 0,
}: ScrollRevealProps) {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={`reveal ${variantClasses[variant]} ${isVisible ? 'revealed' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
