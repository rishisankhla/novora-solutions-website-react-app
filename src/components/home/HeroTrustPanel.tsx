import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Code2,
  Compass,
  PenTool,
  Quote,
  Rocket,
  Star,
  Users,
} from 'lucide-react';
import { TESTIMONIALS } from '../../data/conversion';
import { ROUTES } from '../../routes/paths';

const DELIVERY_STEPS = [
  { label: 'Discovery', icon: Compass },
  { label: 'Design', icon: PenTool },
  { label: 'Build', icon: Code2 },
  { label: 'Launch', icon: Rocket },
] as const;

const TEAM_AVATARS = [
  { initials: 'RS', color: 'from-brand-500 to-brand-700' },
  { initials: 'AK', color: 'from-indigo-500 to-indigo-700' },
  { initials: 'JM', color: 'from-violet-500 to-violet-700' },
  { initials: '+', color: 'from-slate-400 to-slate-600' },
] as const;

function TeamCollaborationVisual() {
  return (
    <div className="relative rounded-xl overflow-hidden bg-gradient-to-br from-surface-soft to-brand-50/60 border border-surface-border p-4">
      <div className="relative flex items-center justify-between gap-3">
        <svg viewBox="0 0 200 120" className="w-28 h-auto text-brand-600/80 shrink-0" aria-hidden>
          <ellipse cx="100" cy="108" rx="72" ry="8" fill="currentColor" opacity="0.08" />
          <circle cx="52" cy="38" r="14" fill="currentColor" opacity="0.2" />
          <circle cx="118" cy="42" r="12" fill="currentColor" opacity="0.18" />
          <circle cx="152" cy="36" r="11" fill="currentColor" opacity="0.15" />
          <rect x="108" y="56" width="64" height="40" rx="8" fill="currentColor" opacity="0.1" />
        </svg>

        <div className="flex flex-col items-end gap-2 min-w-0">
          <div className="flex -space-x-2">
            {TEAM_AVATARS.map((member, i) => (
              <span
                key={member.initials}
                className={`relative flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br ${member.color} text-[9px] font-bold text-white ring-2 ring-white`}
                style={{ zIndex: TEAM_AVATARS.length - i }}
              >
                {member.initials}
              </span>
            ))}
          </div>
          <p className="text-xs font-semibold text-ink text-right leading-snug">
            Real people. Real products. Real businesses.
          </p>
        </div>
      </div>
    </div>
  );
}

function DeliveryJourney() {
  return (
    <div className="rounded-xl border border-surface-border bg-white/80 px-3 py-3">
      <div className="flex items-center gap-1.5 mb-2.5">
        <Users className="h-3.5 w-3.5 text-brand-600" aria-hidden />
        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-subtle">
          How we partner
        </p>
      </div>

      <div className="flex items-center justify-between gap-0.5">
        {DELIVERY_STEPS.map((step, index) => {
          const Icon = step.icon;
          const isLast = index === DELIVERY_STEPS.length - 1;

          return (
            <div key={step.label} className="flex items-center flex-1 min-w-0">
              <div className="flex flex-col items-center gap-1 flex-1 min-w-0">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-50 border border-brand-100 text-brand-600">
                  <Icon className="h-3.5 w-3.5" aria-hidden />
                </span>
                <span className="text-[10px] font-medium text-ink-muted text-center truncate w-full">
                  {step.label}
                </span>
              </div>
              {!isLast && (
                <ArrowRight className="h-2.5 w-2.5 text-ink-faint shrink-0" aria-hidden />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function TestimonialSnippet() {
  const testimonial = TESTIMONIALS[0];

  return (
    <blockquote className="relative rounded-xl border border-surface-border bg-white px-4 py-3">
      <Quote className="h-4 w-4 text-brand-200 mb-1.5" aria-hidden />
      <p className="text-xs text-ink-muted leading-relaxed mb-2">
        &ldquo;{testimonial.quote.slice(0, 100)}…&rdquo;
      </p>
      <footer className="flex items-center justify-between gap-2">
        <div>
          <cite className="not-italic text-[11px] font-semibold text-ink">{testimonial.author}</cite>
          <p className="text-[10px] text-ink-subtle">{testimonial.role}</p>
        </div>
        <div className="flex items-center gap-0.5" aria-label={`${testimonial.rating} out of 5 stars`}>
          {Array.from({ length: testimonial.rating }).map((_, i) => (
            <Star key={i} className="h-3 w-3 fill-amber-400 text-amber-400" aria-hidden />
          ))}
        </div>
      </footer>
    </blockquote>
  );
}

export function HeroTrustPanel() {
  return (
    <div className="relative">
      <div
        className="absolute -inset-3 bg-gradient-to-br from-brand-500/10 to-indigo-500/10 rounded-3xl blur-2xl"
        aria-hidden
      />

      <div className="relative flex flex-col gap-2.5 p-2.5 sm:p-3 rounded-2xl bg-white/70 backdrop-blur-xl border border-white/80 shadow-elevated">
        <TeamCollaborationVisual />
        <DeliveryJourney />
        <TestimonialSnippet />

        <Link
          to={ROUTES.contact}
          className="group flex items-center justify-between gap-2 rounded-xl bg-gradient-to-r from-brand-600 to-indigo-600 px-4 py-3 text-white shadow-glow transition-all hover:-translate-y-0.5"
        >
          <p className="text-xs font-semibold leading-snug">
            Book a discovery call — no commitment.
          </p>
          <ArrowRight className="h-4 w-4 shrink-0 opacity-80 group-hover:translate-x-0.5 transition-transform" aria-hidden />
        </Link>
      </div>
    </div>
  );
}
