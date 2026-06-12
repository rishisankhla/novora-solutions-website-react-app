import { Briefcase, MapPin, CheckCircle2 } from 'lucide-react';
import { useCmsJobs } from '../../hooks/useCmsData';
import { CmsErrorState } from '../ui/CmsErrorState';
import { ScrollReveal } from '../ui/ScrollReveal';
import { Section } from '../ui/Section';

interface OpenPositionsProps {
  selectedPosition: string;
  onSelectPosition: (title: string) => void;
}

export function OpenPositions({ selectedPosition, onSelectPosition }: OpenPositionsProps) {
  const { jobs, loading, error } = useCmsJobs();

  return (
    <Section
      id="positions"
      eyebrow="Open roles"
      title="Current openings"
      description="Select a role to pre-fill your application. Remote-first team, global clients."
      align="center"
      className="bg-white"
    >
      {error ? (
        <CmsErrorState title="Could not load open roles" message={error} />
      ) : loading ? (
        <p className="text-center text-ink-subtle py-12">Loading positions…</p>
      ) : jobs.length === 0 ? (
        <p className="text-center text-ink-subtle py-12">
          No open positions at the moment. Check back soon or send a general application below.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {jobs.map((job, index) => {
            const isSelected = selectedPosition === job.title;

            return (
              <ScrollReveal key={job.id} delay={index * 60}>
                <button
                  type="button"
                  onClick={() => onSelectPosition(job.title)}
                  aria-pressed={isSelected}
                  className={`group w-full text-left card-premium p-6 h-full flex flex-col transition-all duration-300 ${
                    isSelected
                      ? 'ring-2 ring-brand-600 border-brand-300 bg-brand-50/40 shadow-glow'
                      : ''
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="p-2.5 rounded-xl bg-brand-50 text-brand-600 group-hover:bg-brand-600 group-hover:text-white transition-colors">
                      <Briefcase className="h-5 w-5" aria-hidden />
                    </div>
                    {isSelected && (
                      <CheckCircle2 className="h-5 w-5 text-brand-600 flex-shrink-0" aria-hidden />
                    )}
                  </div>

                  <h3 className="text-lg font-bold text-ink mb-1 group-hover:text-brand-600 transition-colors">
                    {job.title}
                  </h3>

                  <div className="flex flex-wrap items-center gap-2 text-xs text-ink-subtle mb-3">
                    <span className="font-semibold text-brand-600">{job.department}</span>
                    <span aria-hidden>·</span>
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="h-3 w-3" aria-hidden />
                      {job.type}
                    </span>
                  </div>

                  <p className="text-sm text-ink-muted leading-relaxed mb-4 flex-1">
                    {job.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5">
                    {job.highlights.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 bg-surface-muted text-ink-subtle rounded-full text-xs font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </button>
              </ScrollReveal>
            );
          })}
        </div>
      )}
    </Section>
  );
}
