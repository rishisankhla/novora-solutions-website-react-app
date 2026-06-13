import { HeartHandshake, MessageCircle, ShieldCheck, Users } from 'lucide-react';
import { ScrollReveal } from '../ui/ScrollReveal';

const DIFFERENTIATORS = [
  {
    icon: MessageCircle,
    title: 'Plain-language updates',
    description:
      'You always know what shipped, what is next, and what we need from you — without decoding a status report.',
  },
  {
    icon: HeartHandshake,
    title: 'Partnership over tickets',
    description:
      'We embed with your goals, not just your backlog. Success means your product works in the real world.',
  },
  {
    icon: ShieldCheck,
    title: 'Quality you can trust',
    description:
      'Testing, security basics, and maintainable code are part of delivery — not optional add-ons at the end.',
  },
  {
    icon: Users,
    title: 'Small team, senior attention',
    description:
      'Experienced engineers and product thinkers on your project — not a revolving door of juniors.',
  },
];

const WHO_WE_SERVE = [
  {
    title: 'Founders & startups',
    body: 'MVPs, investor demos, and first releases when speed and clarity matter most.',
  },
  {
    title: 'Growing SaaS teams',
    body: 'New modules, integrations, and platform hardening as you scale users and revenue.',
  },
  {
    title: 'Enterprises modernizing',
    body: 'Replacing legacy tools and launching digital products with governance and reliability.',
  },
];

export function AboutStory() {
  return (
    <div className="space-y-20 sm:space-y-28">
      <section>
        <header className="max-w-2xl mb-10">
          <p className="eyebrow mb-3">Who we are</p>
          <h2 className="heading-display text-3xl sm:text-4xl mb-4">
            Builders who care how it feels to work with us
          </h2>
          <p className="text-lg text-ink-muted leading-relaxed">
            Novora Solutions started with a simple belief: great software comes from great collaboration.
            We combine product thinking, design sensibility, and solid engineering so your team never feels
            left in the dark — from kickoff to launch and beyond.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {WHO_WE_SERVE.map((item, index) => (
            <ScrollReveal key={item.title} delay={index * 60}>
              <article className="card-premium p-6 sm:p-8 h-full">
                <h3 className="text-lg font-bold text-ink mb-2">{item.title}</h3>
                <p className="text-sm text-ink-muted leading-relaxed">{item.body}</p>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <section>
        <header className="text-center max-w-2xl mx-auto mb-12">
          <p className="eyebrow mb-3">What makes us different</p>
          <h2 className="heading-display text-3xl sm:text-4xl mb-4">
            Simple process. Honest partnership.
          </h2>
          <p className="text-ink-muted leading-relaxed">
            We keep things human — fewer surprises, more momentum, and a team you would actually want on a Slack channel.
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {DIFFERENTIATORS.map((item, index) => {
            const Icon = item.icon;
            return (
              <ScrollReveal key={item.title} delay={index * 50}>
                <article className="group relative overflow-hidden rounded-2xl border border-surface-border/80 bg-white p-6 sm:p-8 shadow-card hover:shadow-elevated transition-shadow duration-300">
                  <div
                    className="absolute top-0 right-0 w-24 h-24 rounded-full blur-2xl bg-brand-400/15 group-hover:bg-brand-400/25 transition-colors"
                    aria-hidden
                  />
                  <div className="relative flex gap-4">
                    <div className="shrink-0 p-2.5 rounded-xl bg-ink text-white">
                      <Icon className="h-5 w-5" aria-hidden />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-ink mb-1.5">{item.title}</h3>
                      <p className="text-sm text-ink-muted leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </article>
              </ScrollReveal>
            );
          })}
        </div>
      </section>
    </div>
  );
}
