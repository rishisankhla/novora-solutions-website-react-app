import { useMemo, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { ScrollReveal } from '../ui/ScrollReveal';
import { Section } from '../ui/Section';
import { Button } from '../ui/Button';
import { ROUTES } from '../../routes/paths';
import type { PortfolioProject } from '../../data/portfolio';

interface PortfolioWallProps {
  projects: PortfolioProject[];
}

const LAYOUT_SPANS = [
  'lg:col-span-2 lg:row-span-2',
  '',
  '',
  'lg:col-span-2',
  '',
  'lg:col-span-2',
];

export function PortfolioWall({ projects }: PortfolioWallProps) {
  const categories = useMemo(
    () => ['All', ...Array.from(new Set(projects.map((p) => p.category)))],
    [projects]
  );
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered =
    activeCategory === 'All'
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <Section className="bg-surface-soft relative overflow-hidden" containerClassName="relative">
      <div className="absolute inset-0 bg-mesh-hero opacity-40 pointer-events-none" aria-hidden />

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10 relative">
        <p className="text-sm text-ink-muted">
          {filtered.length} project{filtered.length !== 1 ? 's' : ''}
          {activeCategory !== 'All' ? ` in ${activeCategory}` : ''}
        </p>
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter by category">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-ink text-white shadow-soft'
                    : 'bg-white text-ink-muted border border-surface-border hover:border-brand-300 hover:text-brand-600'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5 relative">
        {filtered.map((project, index) => {
          const span = LAYOUT_SPANS[index % LAYOUT_SPANS.length];
          const isFeatured = span.includes('row-span-2');

          return (
            <ScrollReveal key={project.id} delay={index * 50} className={span}>
              <article className="group card-premium h-full overflow-hidden flex flex-col">
                <div
                  className={`relative overflow-hidden ${
                    isFeatured ? 'aspect-[4/3] lg:aspect-auto lg:flex-1 lg:min-h-[280px]' : 'aspect-[16/10]'
                  }`}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
                  <span className="absolute top-4 left-4 text-xs font-semibold px-3 py-1 rounded-full bg-white/95 text-brand-700 backdrop-blur-sm">
                    {project.category}
                  </span>
                  <ArrowUpRight
                    className="absolute top-4 right-4 h-5 w-5 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0"
                    aria-hidden
                  />
                </div>

                <div className={`p-6 flex flex-col flex-1 ${isFeatured ? 'lg:p-8' : ''}`}>
                  <h3
                    className={`font-bold text-ink mb-2 group-hover:text-brand-600 transition-colors ${
                      isFeatured ? 'text-xl lg:text-2xl' : 'text-lg'
                    }`}
                  >
                    {project.title}
                  </h3>
                  <p className="text-sm text-ink-muted leading-relaxed flex-1 mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs font-medium px-2.5 py-1 rounded-full bg-surface-muted text-ink-subtle"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            </ScrollReveal>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-ink-muted py-16">No projects in this category yet.</p>
      )}

      <ScrollReveal className="mt-16 text-center relative">
        <p className="text-lg text-ink-muted mb-6 max-w-xl mx-auto">
          Have a project in mind? We partner from concept through launch and beyond.
        </p>
        <Button to={ROUTES.contact}>
          Start your project
          <ArrowUpRight className="h-4 w-4" />
        </Button>
      </ScrollReveal>
    </Section>
  );
}
