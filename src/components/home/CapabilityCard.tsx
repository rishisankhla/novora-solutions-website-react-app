import { Link } from 'react-router-dom';
import type { LucideIcon } from 'lucide-react';
import { ArrowUpRight } from 'lucide-react';
import { ROUTES } from '../../routes/paths';
import { CapabilityPreview, type CapabilityPreviewKey } from './capabilityPreviews';

export interface CapabilityItem {
  icon: LucideIcon;
  title: string;
  description: string;
  span: string;
  featured?: boolean;
  previewLarge?: boolean;
  preview: CapabilityPreviewKey;
  tags: string[];
  accent: string;
}

interface CapabilityCardProps {
  item: CapabilityItem;
}

export function CapabilityCard({ item }: CapabilityCardProps) {
  const Icon = item.icon;
  const isFeatured = item.featured;

  return (
    <article
      className={`group relative h-full flex flex-col overflow-hidden rounded-2xl border border-surface-border/80 bg-white shadow-card transition-all duration-500 hover:shadow-elevated hover:-translate-y-1 hover:border-brand-200/70 ${item.span}`}
    >
      {/* Dribbble-style canvas area */}
      <div
        className={`relative overflow-hidden ${
          isFeatured ? 'flex-1 min-h-0 p-4 sm:p-5 pb-0' : 'p-3 sm:p-4 pb-0'
        }`}
      >
        <div
          className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-60 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${item.accent}`}
          aria-hidden
        />
        <CapabilityPreview
          type={item.preview}
          large={item.featured || item.previewLarge}
          fill={isFeatured}
        />
      </div>

      {/* Content footer — Figma panel style */}
      <div
        className={`relative flex flex-col p-5 sm:p-6 pt-4 border-t border-surface-border/50 bg-gradient-to-b from-white to-surface-soft/30 ${
          isFeatured ? 'shrink-0' : 'flex-1'
        }`}
      >
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="shrink-0 p-2 rounded-xl bg-ink text-white shadow-soft group-hover:scale-105 transition-transform duration-300">
              <Icon className="h-4 w-4" aria-hidden />
            </div>
            <h3 className="text-base sm:text-lg font-bold text-ink tracking-tight leading-snug">
              {item.title}
            </h3>
          </div>
          <span className="shrink-0 p-1.5 rounded-lg border border-surface-border bg-white text-ink-faint group-hover:text-brand-600 group-hover:border-brand-200 transition-colors">
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
          </span>
        </div>

        <p
          className={`text-sm text-ink-muted leading-relaxed ${
            isFeatured ? 'mb-3' : 'flex-grow mb-4'
          }`}
        >
          {item.description}
        </p>

        <div className={`flex flex-wrap gap-1.5 ${isFeatured ? '' : 'mt-auto'}`}>
          {item.tags.map((tag) => (
            <span
              key={tag}
              className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-surface-muted/80 text-ink-subtle border border-surface-border/60"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Hover shine */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
        style={{
          background:
            'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.12) 50%, transparent 60%)',
        }}
        aria-hidden
      />
    </article>
  );
}

export function CapabilitiesCta() {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
      <Link
        to={ROUTES.services}
        className="inline-flex items-center gap-2 text-brand-600 font-semibold hover:text-brand-700 group"
      >
        Explore all services
        <ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
      </Link>
      <Link
        to={ROUTES.products}
        className="inline-flex items-center gap-2 text-ink-muted font-semibold hover:text-brand-600 group"
      >
        View our products
        <ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
      </Link>
    </div>
  );
}
