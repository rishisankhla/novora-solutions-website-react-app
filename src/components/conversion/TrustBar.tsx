import { ScrollReveal } from '../ui/ScrollReveal';
import { TRUST_LOGOS } from '../../data/conversion';

export function TrustBar() {
  return (
    <section className="py-10 sm:py-12 border-y border-surface-border bg-white" aria-label="Industries we serve">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-ink-faint mb-8">
            Trusted across industries
          </p>
          <div className="flex flex-wrap justify-center items-center gap-6 lg:gap-10">
            {TRUST_LOGOS.map((logo) => (
              <div
                key={logo.name}
                className="flex items-center gap-2.5 text-ink-subtle"
                title={logo.name}
              >
                <span className="w-9 h-9 rounded-lg bg-surface-muted border border-surface-border flex items-center justify-center text-[10px] font-bold text-ink-muted">
                  {logo.initials}
                </span>
                <span className="text-sm font-medium hidden sm:inline">{logo.name}</span>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
