import { ScrollReveal } from '../ui/ScrollReveal';
import { Section } from '../ui/Section';

const STEPS = [
  {
    step: '01',
    title: 'Discover',
    description:
      'We align on goals, users, constraints, and success metrics. You leave with clarity — not a sales pitch.',
  },
  {
    step: '02',
    title: 'Design & architect',
    description:
      'UX flows, technical architecture, and a realistic roadmap. No surprises before a single line of code.',
  },
  {
    step: '03',
    title: 'Build & iterate',
    description:
      'Weekly demos, transparent progress, and production-quality engineering from day one.',
  },
  {
    step: '04',
    title: 'Launch & scale',
    description:
      'Deployment, monitoring, handoff documentation, and ongoing support when you need it.',
  },
];

export function ProcessSection() {
  return (
    <Section
      eyebrow="How we work"
      title="A process designed to reduce risk"
      description="Structured enough for enterprise stakeholders. Fast enough for founders who need to move."
      className="bg-white"
    >
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {STEPS.map((item, index) => (
          <ScrollReveal key={item.step} delay={index * 80}>
            <div className="relative h-full p-6 rounded-2xl border border-surface-border bg-surface-soft/50 hover:bg-white hover:shadow-card transition-all duration-300">
              <span className="text-4xl font-bold text-brand-100 absolute top-4 right-5 select-none" aria-hidden>
                {item.step}
              </span>
              <p className="text-xs font-semibold uppercase tracking-widest text-brand-600 mb-3">
                Step {item.step}
              </p>
              <h3 className="text-xl font-bold text-ink mb-2">{item.title}</h3>
              <p className="text-sm text-ink-muted leading-relaxed">{item.description}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </Section>
  );
}
