import { ArrowRight } from 'lucide-react';
import { ScrollReveal } from '../ui/ScrollReveal';
import { Button } from '../ui/Button';
import { ROUTES } from '../../routes/paths';

export function JoinTeam() {
  return (
    <ScrollReveal>
      <div className="relative overflow-hidden rounded-4xl bg-ink text-white px-8 py-12 sm:px-12 sm:py-14 text-center">
        <div className="absolute inset-0 bg-mesh-dark opacity-80" aria-hidden />
        <div className="relative max-w-xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-300 mb-4">
            We're hiring
          </p>
          <h3 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4">
            Join our team
          </h3>
          <p className="text-slate-300 leading-relaxed mb-8">
            We're always looking for talented people who care about craft, collaboration, and
            building products that matter.
          </p>
          <Button
            to={ROUTES.careers}
            className="!bg-white !text-ink hover:!bg-brand-50"
          >
            View open positions
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </ScrollReveal>
  );
}
