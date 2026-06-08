import type { ReactNode } from 'react';
import { Container } from './Container';

interface SectionProps {
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  id?: string;
  label?: string;
  eyebrow?: string;
  title?: string;
  description?: string;
  align?: 'left' | 'center';
}

export function Section({
  children,
  className = '',
  containerClassName = '',
  id,
  label,
  eyebrow,
  title,
  description,
  align = 'left',
}: SectionProps) {
  const isCenter = align === 'center';

  return (
    <section id={id} className={`py-20 sm:py-28 ${className}`} aria-label={label}>
      <Container className={containerClassName}>
        {(eyebrow || title || description) && (
          <header
            className={`mb-12 sm:mb-16 max-w-3xl ${isCenter ? 'mx-auto text-center' : ''}`}
          >
            {eyebrow && (
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-600 mb-3">
                {eyebrow}
              </p>
            )}
            {title && (
              <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-ink tracking-tight leading-[1.1]">
                {title}
              </h2>
            )}
            {description && (
              <p className={`mt-4 text-lg text-ink-muted leading-relaxed ${isCenter ? '' : 'max-w-2xl'}`}>
                {description}
              </p>
            )}
          </header>
        )}
        {children}
      </Container>
    </section>
  );
}
