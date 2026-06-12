import { Globe, Smartphone, Brain, Rocket, Code2, Cloud } from 'lucide-react';
import { ScrollReveal } from '../ui/ScrollReveal';
import { Section } from '../ui/Section';
import { CapabilityCard, CapabilitiesCta, type CapabilityItem } from './CapabilityCard';

const BENTO: CapabilityItem[] = [
  {
    icon: Globe,
    title: 'Web Applications',
    description: 'SaaS platforms, dashboards, and customer portals engineered for scale.',
    span: 'lg:col-span-2 lg:row-span-2',
    featured: true,
    preview: 'web',
    accent: 'from-brand-400/30 to-indigo-500/20',
    tags: ['React', 'Next.js', 'Node'],
  },
  {
    icon: Brain,
    title: 'AI & Automation',
    description: 'LLM products, agents, and intelligent workflows.',
    span: '',
    preview: 'ai',
    accent: 'from-violet-400/30 to-fuchsia-500/20',
    tags: ['OpenAI', 'RAG'],
  },
  {
    icon: Smartphone,
    title: 'Mobile',
    description: 'Cross-platform apps with native-grade UX.',
    span: '',
    preview: 'mobile',
    accent: 'from-sky-400/30 to-brand-500/20',
    tags: ['React Native'],
  },
  {
    icon: Rocket,
    title: 'MVP Launch',
    description: 'Validate fast. Ship investor-ready products in weeks.',
    span: 'lg:col-span-2',
    preview: 'mvp',
    accent: 'from-amber-400/25 to-orange-500/15',
    tags: ['Startups', '6–12 wks'],
  },
  {
    icon: Code2,
    title: 'Full-Stack',
    description: 'End-to-end ownership from API to interface.',
    span: '',
    preview: 'fullstack',
    accent: 'from-emerald-400/25 to-brand-500/15',
    tags: ['TypeScript'],
  },
  {
    icon: Cloud,
    title: 'Cloud & DevOps',
    description: 'Infrastructure that stays reliable under growth.',
    span: '',
    preview: 'cloud',
    accent: 'from-cyan-400/30 to-indigo-500/20',
    tags: ['AWS', 'CI/CD'],
  },
];

export function BentoServices() {
  return (
    <Section
      eyebrow="Capabilities"
      title="Everything you need to ship — in one partner"
      description="Engineering depth behind our consulting services — web, mobile, AI, and cloud delivery from one partner."
      align="center"
      className="bg-surface-soft relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-mesh-hero opacity-50 pointer-events-none" aria-hidden />
      <div
        className="absolute inset-0 opacity-[0.2] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, #cbd5e1 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
        aria-hidden
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 relative auto-rows-fr">
        {BENTO.map((item, index) => (
          <ScrollReveal key={item.title} delay={index * 60} className={item.span}>
            <CapabilityCard item={item} />
          </ScrollReveal>
        ))}
      </div>

      <ScrollReveal className="text-center mt-12 sm:mt-14">
        <CapabilitiesCta />
      </ScrollReveal>
    </Section>
  );
}
