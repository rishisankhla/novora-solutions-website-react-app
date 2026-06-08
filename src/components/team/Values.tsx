import { Target, Lightbulb, Rocket } from 'lucide-react';
import { ScrollReveal } from '../ui/ScrollReveal';

const values = [
  {
    icon: Target,
    title: 'Mission-driven',
    description:
      'We deliver software that creates measurable business value — not vanity features.',
  },
  {
    icon: Lightbulb,
    title: 'Innovation first',
    description:
      'We stay current with technology while choosing tools that fit the problem, not trends.',
  },
  {
    icon: Rocket,
    title: 'Client success',
    description:
      'Your outcomes define ours. We partner closely from discovery through launch and beyond.',
  },
];

export function Values() {
  return (
    <div>
      <header className="text-center mb-12 max-w-2xl mx-auto">
        <p className="eyebrow mb-3">Our values</p>
        <h3 className="text-3xl font-bold text-ink tracking-tight mb-4">What guides our work</h3>
        <p className="text-ink-muted leading-relaxed">
          Principles that shape our culture, decisions, and the experience clients receive.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {values.map((value, index) => {
          const Icon = value.icon;
          return (
            <ScrollReveal key={value.title} delay={index * 80}>
              <article className="card-premium p-8 text-center h-full">
                <div className="inline-flex p-3 rounded-xl bg-brand-50 text-brand-600 mb-5">
                  <Icon className="h-6 w-6" aria-hidden />
                </div>
                <h4 className="text-lg font-bold text-ink mb-2">{value.title}</h4>
                <p className="text-sm text-ink-muted leading-relaxed">{value.description}</p>
              </article>
            </ScrollReveal>
          );
        })}
      </div>
    </div>
  );
}
