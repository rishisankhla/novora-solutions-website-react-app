import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../routes/paths';
import { ScrollReveal } from '../ui/ScrollReveal';

export function AboutTeaser() {
  return (
    <ScrollReveal>
      <div className="relative overflow-hidden rounded-4xl border border-surface-border/80 bg-white shadow-card">
        <div className="absolute inset-0 bg-mesh-hero opacity-40 pointer-events-none" aria-hidden />
        <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 p-8 sm:p-10 lg:p-12 items-center">
          <div>
            <p className="eyebrow mb-3">About Novora</p>
            <h2 className="heading-display text-2xl sm:text-3xl mb-4 text-balance">
              A partner that speaks product, not just code
            </h2>
            <p className="text-ink-muted leading-relaxed mb-6">
              We help startups and enterprises turn ambitious ideas into software people actually use —
              with clear communication, thoughtful design, and engineering you can scale on.
            </p>
            <Link
              to={ROUTES.about}
              className="inline-flex items-center gap-2 text-brand-600 font-semibold hover:text-brand-700 group"
            >
              Learn more about us
              <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {[
              { label: 'Founded on clarity', detail: 'No jargon-heavy handoffs' },
              { label: 'Human-first delivery', detail: 'Weekly demos & honest updates' },
              { label: 'Full-stack depth', detail: 'Web, mobile, AI & cloud' },
              { label: 'Built to last', detail: 'Architecture for growth' },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-surface-border/60 bg-surface-soft/80 p-4 sm:p-5"
              >
                <p className="text-sm font-bold text-ink mb-1">{item.label}</p>
                <p className="text-xs text-ink-muted leading-relaxed">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ScrollReveal>
  );
}
