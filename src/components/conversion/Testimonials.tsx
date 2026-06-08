import { Star, Quote } from 'lucide-react';
import { ScrollReveal } from '../ui/ScrollReveal';
import { Section } from '../ui/Section';
import { TESTIMONIALS } from '../../data/conversion';

export function Testimonials() {
  return (
    <Section
      id="testimonials"
      label="Client testimonials"
      eyebrow="Social proof"
      title="Teams who ship with confidence"
      description="Anonymized feedback from real engagements — roles and industries only, as our clients prefer."
      align="center"
      className="bg-white"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        {TESTIMONIALS.map((item, index) => (
          <ScrollReveal key={`${item.author}-${index}`} delay={index * 100}>
            <blockquote className="relative card-premium p-6 sm:p-8 h-full flex flex-col">
              <Quote className="h-7 w-7 text-brand-200 mb-4" aria-hidden />
              <p className="text-ink-muted leading-relaxed mb-6 flex-grow text-sm sm:text-base">
                &ldquo;{item.quote}&rdquo;
              </p>
              <div className="flex items-center gap-1 mb-3" aria-label={`${item.rating} out of 5 stars`}>
                {Array.from({ length: item.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" aria-hidden />
                ))}
              </div>
              <footer className="pt-4 border-t border-surface-border">
                <cite className="not-italic font-semibold text-ink">{item.author}</cite>
                <p className="text-sm text-ink-subtle">{item.role}</p>
              </footer>
            </blockquote>
          </ScrollReveal>
        ))}
      </div>
    </Section>
  );
}
