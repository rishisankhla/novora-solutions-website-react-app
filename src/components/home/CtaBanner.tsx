import { ArrowRight } from 'lucide-react';
import { ScrollReveal } from '../ui/ScrollReveal';
import { Button } from '../ui/Button';
import { ROUTES } from '../../routes/paths';

export function CtaBanner() {
  return (
    <section className="py-20 sm:py-28">
      <ScrollReveal>
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-4xl bg-ink text-white px-8 py-14 sm:px-14 sm:py-16">
            <div className="absolute inset-0 bg-mesh-dark opacity-80" aria-hidden />
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/20 rounded-full blur-3xl" aria-hidden />

            <div className="relative max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-300 mb-4">
                Let's build together
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4 text-balance">
                Your next product deserves a team that sweats the details.
              </h2>
              <p className="text-lg text-slate-300 mb-8 leading-relaxed">
                Tell us what you're building. We'll respond within 2–4 business hours with honest
                feedback and a clear path forward.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  to={ROUTES.contact}
                  size="lg"
                  className="!bg-white !text-ink hover:!bg-brand-50"
                >
                  Book a discovery call
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <Button
                  to={ROUTES.portfolio}
                  variant="ghost"
                  size="lg"
                  className="!text-white hover:!bg-white/10 border border-white/20"
                >
                  See case studies
                </Button>
              </div>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
