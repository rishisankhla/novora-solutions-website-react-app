import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { ROUTES } from '../../routes/paths';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  breadcrumb?: string;
  children?: ReactNode;
}

export function PageHeader({ title, subtitle, breadcrumb, children }: PageHeaderProps) {
  return (
    <section className="relative pt-28 pb-16 md:pt-32 md:pb-20 overflow-hidden border-b border-surface-border">
      <div className="absolute inset-0 bg-mesh-hero mesh-noise -z-10" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-200 to-transparent" aria-hidden />

      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-ink-subtle mb-6">
          <Link to={ROUTES.home} className="hover:text-brand-600 transition-colors">
            Home
          </Link>
          {breadcrumb && (
            <>
              <ChevronRight className="h-3.5 w-3.5 text-ink-faint" aria-hidden />
              <span className="text-ink font-medium">{breadcrumb}</span>
            </>
          )}
        </nav>

        <div className="max-w-3xl">
          <h1 className="heading-display text-3xl sm:text-4xl md:text-5xl mb-4 text-balance">{title}</h1>
          {subtitle && (
            <p className="text-lg sm:text-xl text-ink-muted leading-relaxed">{subtitle}</p>
          )}
          {children}
        </div>
      </div>
    </section>
  );
}
