import { ArrowUpRight, BookOpen, Calculator, Receipt, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { FLOWBOOKS_PRO } from '../../data/flowbookspro';
import { ROUTES } from '../../routes/paths';
import { ScrollReveal } from '../ui/ScrollReveal';
import { Section } from '../ui/Section';
import { Button } from '../ui/Button';

function FlowBooksProMockup() {
  return (
    <div className="relative rounded-2xl border border-surface-border bg-white shadow-elevated overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-3 border-b border-surface-border bg-surface-soft/80">
        <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
        <span className="ml-3 text-[11px] font-medium text-ink-subtle">flowbookspro.com — firm dashboard</span>
      </div>

      <div className="grid sm:grid-cols-3 gap-0 divide-y sm:divide-y-0 sm:divide-x divide-surface-border">
        {[
          { icon: BookOpen, label: 'Smart books', stat: '98% reconciled', tone: 'text-brand-600 bg-brand-50' },
          { icon: Users, label: 'Payroll', stat: '12 clients · on schedule', tone: 'text-indigo-600 bg-indigo-50' },
          { icon: Receipt, label: 'Tax & compliance', stat: 'Q filings ready', tone: 'text-emerald-600 bg-emerald-50' },
        ].map((item) => (
          <div key={item.label} className="p-4 sm:p-5">
            <div className={`inline-flex p-2 rounded-lg ${item.tone} mb-3`}>
              <item.icon className="h-4 w-4" aria-hidden />
            </div>
            <p className="text-xs font-semibold text-ink-muted uppercase tracking-wide">{item.label}</p>
            <p className="text-sm font-bold text-ink mt-1">{item.stat}</p>
          </div>
        ))}
      </div>

      <div className="p-4 sm:p-5 bg-gradient-to-br from-brand-50/50 to-indigo-50/40 border-t border-surface-border">
        <div className="flex items-center justify-between gap-3 mb-3">
          <p className="text-xs font-semibold text-ink-subtle uppercase tracking-wider">Bundle builder</p>
          <Calculator className="h-4 w-4 text-brand-600" aria-hidden />
        </div>
        <div className="flex flex-wrap gap-2">
          {['Books', 'Payroll', 'Sales tax', 'Tax prep'].map((chip, i) => (
            <span
              key={chip}
              className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border ${
                i < 3
                  ? 'bg-brand-600 text-white border-brand-600'
                  : 'bg-white text-ink-muted border-surface-border'
              }`}
            >
              {chip}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

interface FlowBooksProShowcaseProps {
  /** @deprecated use mode="teaser" */
  compact?: boolean;
  mode?: 'full' | 'teaser';
}

export function FlowBooksProShowcase({ compact = false, mode }: FlowBooksProShowcaseProps) {
  const displayMode = mode ?? (compact ? 'teaser' : 'full');
  const isTeaser = displayMode === 'teaser';

  return (
    <Section
      eyebrow="Product"
      title="FlowBooksPro"
      description={FLOWBOOKS_PRO.tagline}
      className={isTeaser ? 'py-16 sm:py-20 bg-white' : 'bg-white'}
      align="left"
    >
      <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
        <ScrollReveal>
          <p className="text-lg text-ink-muted leading-relaxed mb-6">{FLOWBOOKS_PRO.summary}</p>

          {!isTeaser &&
            FLOWBOOKS_PRO.description.map((paragraph) => (
              <p key={paragraph.slice(0, 24)} className="text-ink-muted leading-relaxed mb-4">
                {paragraph}
              </p>
            ))}

          {!isTeaser && (
            <>
              <div className="grid sm:grid-cols-3 gap-4 my-8">
                {FLOWBOOKS_PRO.pillars.map((pillar) => (
                  <div key={pillar.title} className="card-premium p-4">
                    <h3 className="text-sm font-bold text-ink mb-2">{pillar.title}</h3>
                    <p className="text-xs text-ink-muted leading-relaxed">{pillar.description}</p>
                  </div>
                ))}
              </div>

              <div className="mb-8">
                <h3 className="text-sm font-bold text-ink mb-3">Flexible bundles</h3>
                <ul className="space-y-2">
                  {FLOWBOOKS_PRO.bundles.map((bundle) => (
                    <li key={bundle} className="flex items-start gap-2 text-sm text-ink-muted">
                      <span className="text-brand-600 mt-0.5">•</span>
                      {bundle}
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}

          {isTeaser && (
            <ul className="space-y-2 mb-8">
              {FLOWBOOKS_PRO.pillars.map((pillar) => (
                <li key={pillar.title} className="flex items-start gap-2 text-sm text-ink-muted">
                  <span className="font-semibold text-ink shrink-0">{pillar.title}</span>
                  <span>— {pillar.description}</span>
                </li>
              ))}
            </ul>
          )}

          <div className="flex flex-col sm:flex-row flex-wrap gap-3">
            {isTeaser && (
              <Button to={ROUTES.flowbooksPro} size="lg">
                View product details
                <ArrowUpRight className="h-4 w-4" aria-hidden />
              </Button>
            )}
            <a
              href={FLOWBOOKS_PRO.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold transition-colors ${
                isTeaser
                  ? 'text-ink border border-surface-border hover:border-brand-200 hover:bg-brand-50/50'
                  : 'text-white bg-brand-600 hover:bg-brand-700 shadow-soft'
              }`}
            >
              Visit FlowBooksPro
              <ArrowUpRight className="h-4 w-4" aria-hidden />
            </a>
            {!isTeaser && (
              <Button to={ROUTES.contact} variant="secondary">
                Talk to our team
              </Button>
            )}
            {isTeaser && (
              <Link
                to={ROUTES.products}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-brand-600 hover:text-brand-700"
              >
                All products
              </Link>
            )}
          </div>
        </ScrollReveal>

        <ScrollReveal delay={80}>
          <FlowBooksProMockup />
          <p className="text-xs text-ink-faint text-center mt-3">
            Product UI preview — live at{' '}
            <a
              href={FLOWBOOKS_PRO.url}
              className="text-brand-600 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              flowbookspro.com
            </a>
          </p>
        </ScrollReveal>
      </div>
    </Section>
  );
}
