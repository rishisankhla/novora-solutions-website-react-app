import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { ROUTES } from '../routes/paths';
import { Button } from './ui/Button';
import { HeroTrustPanel } from './home/HeroTrustPanel';

const PROOF_POINTS = [
  'Production-grade engineering',
  'AI & cloud-native delivery',
  '2–4 hour response time',
];

export function Hero() {
  return (
    <section
      className="relative min-h-[100dvh] flex items-center overflow-hidden pt-20 pb-16 lg:pt-24"
      aria-label="Hero"
    >
      {/* Ambient background */}
      <div className="absolute inset-0 bg-mesh-hero mesh-noise -z-10" />
      <div
        className="absolute top-1/4 -right-32 w-[480px] h-[480px] rounded-full bg-brand-400/10 blur-3xl -z-10"
        aria-hidden
      />
      <div
        className="absolute -bottom-24 -left-24 w-[400px] h-[400px] rounded-full bg-indigo-400/10 blur-3xl -z-10"
        aria-hidden
      />

      {/* Subtle grid */}
      <div
        className="absolute inset-0 -z-10 opacity-[0.35]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(148,163,184,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.12) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(ellipse 70% 60% at 50% 40%, black, transparent)',
        }}
        aria-hidden
      />

      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Editorial copy */}
          <div className="lg:col-span-7">
            <p className="eyebrow mb-5 animate-fade-up" style={{ animationDelay: '0.1s' }}>
              Custom software · AI · Cloud
            </p>

            <h1
              className="heading-display text-[2.5rem] sm:text-5xl lg:text-6xl xl:text-[4.25rem] mb-6 animate-fade-up text-balance"
              style={{ animationDelay: '0.2s' }}
            >
              Engineering digital products{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-indigo-600">
                built to earn trust
              </span>
            </h1>

            <p
              className="text-lg sm:text-xl text-ink-muted max-w-xl leading-relaxed mb-8 animate-fade-up"
              style={{ animationDelay: '0.35s' }}
            >
              We partner with ambitious teams to design, build, and ship web, mobile, and AI
              platforms — with the polish of a product company and the rigor of an enterprise studio.
            </p>

            <ul
              className="flex flex-col sm:flex-row sm:flex-wrap gap-3 mb-10 animate-fade-up"
              style={{ animationDelay: '0.45s' }}
            >
              {PROOF_POINTS.map((point) => (
                <li
                  key={point}
                  className="inline-flex items-center gap-2 text-sm font-medium text-ink-muted bg-white/80 border border-surface-border rounded-full px-4 py-2 shadow-sm"
                >
                  <CheckCircle2 className="h-4 w-4 text-brand-600 shrink-0" aria-hidden />
                  {point}
                </li>
              ))}
            </ul>

            <div
              className="flex flex-col sm:flex-row gap-3 animate-fade-up"
              style={{ animationDelay: '0.55s' }}
            >
              <Button to={ROUTES.contact} size="lg">
                Start your project
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Button>
              <Button to={ROUTES.portfolio} variant="secondary" size="lg">
                View our work
              </Button>
            </div>
          </div>

          {/* Human-centered trust panel — partnership, not dashboards */}
          <div
            className="lg:col-span-5 animate-fade-up"
            style={{ animationDelay: '0.4s' }}
          >
            <HeroTrustPanel />
          </div>
        </div>
      </div>
    </section>
  );
}
