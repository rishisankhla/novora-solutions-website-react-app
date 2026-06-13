import { ArrowUpRight, Bath, BedDouble, Building2, ExternalLink, MapPin, Sparkles } from 'lucide-react';
import { IRIS_RENTS } from '../../data/irisrents';
import { ScrollReveal } from '../ui/ScrollReveal';
import { Section } from '../ui/Section';

function BrowserFrame({
  label,
  image,
  imageAlt,
  priority = false,
  intrinsicWidth = 1024,
  intrinsicHeight = 462,
  capNativeWidth = true,
}: {
  label: string;
  image: string;
  imageAlt: string;
  priority?: boolean;
  intrinsicWidth?: number;
  intrinsicHeight?: number;
  /** Prevent upscale blur by capping width to the screenshot's native pixels */
  capNativeWidth?: boolean;
}) {
  return (
    <div
      className={`group relative rounded-[1.25rem] sm:rounded-[1.5rem] border border-surface-border/80 bg-white shadow-elevated overflow-hidden ${
        capNativeWidth ? 'mx-auto w-full max-w-[1024px]' : ''
      }`}
    >
      <div className="flex items-center gap-2 px-4 sm:px-5 py-3 border-b border-surface-border/70 bg-surface-soft/90">
        <span className="h-2.5 w-2.5 rounded-full bg-red-400/90" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-400/90" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/90" />
        <span className="ml-2 text-[11px] sm:text-xs font-medium text-ink-subtle truncate">{label}</span>
      </div>
      <div className="relative bg-[#f8fafc] [transform:translateZ(0)]">
        <img
          src={image}
          alt={imageAlt}
          width={intrinsicWidth}
          height={intrinsicHeight}
          className="media-crisp w-full h-auto block"
          loading={priority ? 'eager' : 'lazy'}
          decoding={priority ? 'sync' : 'async'}
          fetchPriority={priority ? 'high' : 'auto'}
        />
      </div>
    </div>
  );
}

function FeaturedListingPanel() {
  const listing = IRIS_RENTS.featuredListing;

  return (
    <div className="rounded-3xl border border-surface-border/80 bg-white shadow-card overflow-hidden">
      <div className="grid lg:grid-cols-5 gap-0">
        <div className="lg:col-span-2 p-8 sm:p-10 bg-gradient-to-br from-sky-50/80 via-white to-brand-50/40 border-b lg:border-b-0 lg:border-r border-surface-border/70">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-faint mb-3">
            Featured listing
          </p>
          <h4 className="text-2xl sm:text-3xl font-bold text-ink tracking-tight mb-2">{listing.title}</h4>
          <p className="text-sm text-ink-muted mb-6">{listing.neighborhood}</p>

          <div className="flex items-end gap-1 mb-6">
            <span className="text-4xl sm:text-5xl font-bold text-ink tracking-tight">{listing.price}</span>
            <span className="text-base text-ink-muted pb-1">{listing.period}</span>
          </div>

          <div className="flex flex-wrap gap-3 mb-6">
            <span className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-muted">
              <BedDouble className="h-4 w-4 text-brand-600" aria-hidden />
              {listing.beds}
            </span>
            <span className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-muted">
              <Bath className="h-4 w-4 text-brand-600" aria-hidden />
              {listing.baths}
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {listing.amenities.map((amenity) => (
              <span
                key={amenity}
                className="text-xs font-semibold px-3 py-1 rounded-full bg-white border border-surface-border text-ink-subtle"
              >
                {amenity}
              </span>
            ))}
          </div>
        </div>

        <div className="lg:col-span-3 p-8 sm:p-10 flex flex-col justify-between">
          <div>
            <div className="inline-flex items-center gap-2 text-sm font-medium text-brand-600 mb-4">
              <MapPin className="h-4 w-4" aria-hidden />
              {listing.address}
            </div>
            <p className="text-sm text-ink-muted mb-2">{listing.city}</p>
            <p className="text-ink-muted leading-relaxed mb-6">{listing.description}</p>
            <p className="text-xs text-ink-faint">Listed by {listing.listedBy}</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mt-8">
            <a
              href={listing.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-white bg-brand-600 hover:bg-brand-700 transition-colors"
            >
              View listing
              <ExternalLink className="h-4 w-4" aria-hidden />
            </a>
            <a
              href={IRIS_RENTS.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-ink border border-surface-border hover:border-brand-200 hover:bg-brand-50/40 transition-colors"
            >
              Browse all listings
              <ArrowUpRight className="h-4 w-4" aria-hidden />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

interface IrisRentsShowcaseProps {
  mode?: 'top' | 'embedded';
}

export function IrisRentsShowcase({ mode = 'embedded' }: IrisRentsShowcaseProps) {
  const content = (
    <div className="space-y-16 sm:space-y-20 lg:space-y-24">
      <ScrollReveal>
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 mb-5">
            <span className="eyebrow">Featured delivery</span>
            <Building2 className="h-4 w-4 text-brand-600" aria-hidden />
          </div>
          <h2 className="heading-display text-4xl sm:text-5xl lg:text-6xl text-balance mb-4">
            {IRIS_RENTS.name}
          </h2>
          <p className="text-xl sm:text-2xl font-semibold text-ink mb-3">{IRIS_RENTS.tagline}</p>
          <p className="text-lg text-brand-600 font-medium mb-6">{IRIS_RENTS.headline}</p>
          <p className="text-lg text-ink-muted leading-relaxed max-w-3xl">{IRIS_RENTS.summary}</p>

          <div className="flex flex-wrap gap-3 mt-8">
            <a
              href={IRIS_RENTS.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-white bg-ink hover:bg-brand-700 shadow-soft transition-colors"
            >
              Visit irisrents.com
              <ArrowUpRight className="h-4 w-4" aria-hidden />
            </a>
            <a
              href={IRIS_RENTS.featuredListing.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-ink border border-surface-border hover:border-brand-200 hover:bg-white transition-colors"
            >
              See sample listing
              <ExternalLink className="h-4 w-4" aria-hidden />
            </a>
          </div>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={60} variant="fade-in">
        <div>
          <p className="text-sm font-semibold text-ink-subtle uppercase tracking-wider mb-4">
            Homepage experience
          </p>
          <BrowserFrame
            label="irisrents.com — hero search"
            image={IRIS_RENTS.heroImage}
            imageAlt="IRIS homepage with San Francisco skyline and apartment search"
            priority
            intrinsicWidth={IRIS_RENTS.screenshots.hero.width}
            intrinsicHeight={IRIS_RENTS.screenshots.hero.height}
            capNativeWidth
          />
        </div>
      </ScrollReveal>

      <ScrollReveal delay={80} variant="fade-in">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          <div className="lg:col-span-7 space-y-6">
            <p className="text-sm font-semibold text-ink-subtle uppercase tracking-wider">
              Neighborhood discovery
            </p>
            <BrowserFrame
              label="irisrents.com — explore neighborhoods"
              image={IRIS_RENTS.neighborhoodsImage}
              imageAlt="IRIS neighborhood explorer with rental listing cards"
              intrinsicWidth={IRIS_RENTS.screenshots.neighborhoods.width}
              intrinsicHeight={IRIS_RENTS.screenshots.neighborhoods.height}
              capNativeWidth={false}
            />
          </div>

          <div className="lg:col-span-5 space-y-6">
            <p className="text-sm font-semibold text-ink-subtle uppercase tracking-wider">Platform highlights</p>
            <div className="grid grid-cols-3 gap-3">
              {IRIS_RENTS.metrics.map((metric) => (
                <div
                  key={metric.label}
                  className="rounded-2xl border border-surface-border/80 bg-white p-4 text-center shadow-sm"
                >
                  <p className="text-2xl font-bold text-ink">{metric.value}</p>
                  <p className="text-[11px] font-medium text-ink-faint mt-1">{metric.label}</p>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              {IRIS_RENTS.features.map((feature) => (
                <div
                  key={feature.title}
                  className="rounded-2xl border border-surface-border/70 bg-white/90 p-5 shadow-sm"
                >
                  <div className="flex items-start gap-3">
                    <Sparkles className="h-4 w-4 text-brand-600 mt-0.5 shrink-0" aria-hidden />
                    <div>
                      <h4 className="font-bold text-ink mb-1">{feature.title}</h4>
                      <p className="text-sm text-ink-muted leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-2">
              {IRIS_RENTS.neighborhoods.map((n) => (
                <span
                  key={n}
                  className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-surface-soft border border-surface-border text-ink-subtle"
                >
                  {n}
                </span>
              ))}
            </div>
          </div>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={100}>
        <FeaturedListingPanel />
      </ScrollReveal>

      <ScrollReveal delay={120}>
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-surface-border/70">
          <div className="flex flex-wrap gap-2">
            {IRIS_RENTS.capabilities.map((cap) => (
              <span
                key={cap}
                className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-white border border-surface-border text-ink-subtle"
              >
                {cap}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {IRIS_RENTS.techStack.map((tech) => (
              <span
                key={tech}
                className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-brand-50 text-brand-700 border border-brand-100"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </ScrollReveal>
    </div>
  );

  if (mode === 'top') {
    return (
      <Section className="pt-8 sm:pt-10 pb-4 sm:pb-6 bg-surface-soft" align="left">
        {content}
      </Section>
    );
  }

  return <div className="mt-16 sm:mt-20 max-w-7xl mx-auto">{content}</div>;
}
