import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { ScrollReveal } from '../ui/ScrollReveal';
import { Section } from '../ui/Section';
import { FAQ_ITEMS } from '../../data/conversion';
import { ROUTES } from '../../routes/paths';
import { Button } from '../ui/Button';

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <Section
      eyebrow="FAQ"
      title="Answers before you commit"
      description="Clear expectations reduce friction — here's how we typically work with new partners."
      align="center"
      className="bg-surface-soft"
    >
      <div className="max-w-3xl mx-auto space-y-3">
        {FAQ_ITEMS.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <ScrollReveal key={item.question} delay={index * 50}>
              <div className="card-premium overflow-hidden hover:translate-y-0">
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left font-semibold text-ink hover:bg-surface-soft/80 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-500"
                  aria-expanded={isOpen}
                >
                  {item.question}
                  <ChevronDown
                    className={`h-5 w-5 text-ink-faint flex-shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                    aria-hidden
                  />
                </button>
                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-4 text-ink-muted leading-relaxed text-sm sm:text-base">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          );
        })}
      </div>

      <ScrollReveal className="text-center mt-12">
        <p className="text-ink-muted mb-4">Still have questions?</p>
        <Button to={ROUTES.contact} variant="secondary" size="md">
          Contact our team
        </Button>
      </ScrollReveal>
    </Section>
  );
}
