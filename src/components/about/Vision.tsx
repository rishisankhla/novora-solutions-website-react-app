import { ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../routes/paths';

const PILLARS = [
  { label: 'Strategy', value: 'Discovery & roadmaps' },
  { label: 'Engineering', value: 'Production-grade builds' },
  { label: 'Delivery', value: 'Launch & iteration' },
];

export function Vision() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
      <div>
        <p className="eyebrow mb-4">Our vision</p>
        <h2 className="heading-display text-3xl sm:text-4xl mb-6 text-balance">
          Technology that turns ambitious ideas into durable products
        </h2>
        <div className="space-y-4 text-lg text-ink-muted leading-relaxed">
          <p>
            At Novora Solutions, we partner with startups and enterprises to design, build, and
            ship software that creates measurable business impact — not just demos.
          </p>
          <p>
            From web platforms and mobile apps to AI-powered workflows, we bring product thinking,
            engineering rigor, and launch discipline to every engagement.
          </p>
        </div>
        <p className="mt-6 text-base font-semibold text-brand-600">
          We build scalable, high-performance products that solve real problems.
        </p>
        <Link
          to={ROUTES.team}
          className="inline-flex items-center gap-2 mt-8 text-brand-600 font-semibold hover:text-brand-700 group"
        >
          Meet the team behind the work
          <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>

      <div className="relative">
        <div className="absolute -inset-4 bg-mesh-hero rounded-4xl opacity-60" aria-hidden />
        <div className="relative card-premium p-8 sm:p-10">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2.5 rounded-xl bg-brand-50 text-brand-600">
              <Sparkles className="h-5 w-5" aria-hidden />
            </div>
            <div>
              <p className="text-sm font-semibold text-ink">How we work</p>
              <p className="text-xs text-ink-subtle">End-to-end, no handoff gaps</p>
            </div>
          </div>

          <ul className="space-y-5">
            {PILLARS.map((item, i) => (
              <li
                key={item.label}
                className="flex items-center gap-4 pb-5 border-b border-surface-border last:border-0 last:pb-0"
              >
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-ink text-white text-sm font-bold flex items-center justify-center">
                  {i + 1}
                </span>
                <div>
                  <p className="font-semibold text-ink">{item.label}</p>
                  <p className="text-sm text-ink-muted">{item.value}</p>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-8 pt-6 border-t border-surface-border grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-ink">50+</p>
              <p className="text-xs text-ink-subtle mt-0.5">Projects</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-ink">98%</p>
              <p className="text-xs text-ink-subtle mt-0.5">Satisfaction</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-ink">24/7</p>
              <p className="text-xs text-ink-subtle mt-0.5">Support</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
