import { ArrowUpRight, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEOHead } from '../seo/SEOHead';
import { SEOSchema } from '../seo/SEOSchema';
import { CanonicalUrl } from '../components/SEO/CanonicalUrl';
import { JsonLdBreadcrumbs } from '../components/SEO/JsonLdBreadcrumbs';
import { PageHeader } from '../components/ui/PageHeader';
import { Section } from '../components/ui/Section';
import { ScrollReveal } from '../components/ui/ScrollReveal';
import { FLOWBOOKS_PRO } from '../data/flowbookspro';
import { getCanonicalUrl, ROUTES } from '../routes/paths';

export function ProductsPage() {
  return (
    <>
      <SEOHead
        title="Products | Novora Solutions"
        description="Software products built by Novora Solutions — including FlowBooksPro for CPA firms and financial operations."
        canonicalUrl={getCanonicalUrl(ROUTES.products)}
      />
      <CanonicalUrl url={getCanonicalUrl(ROUTES.products)} />
      <SEOSchema pageType="services" />
      <JsonLdBreadcrumbs
        items={[
          { name: 'Home', url: getCanonicalUrl('/') },
          { name: 'Products', url: getCanonicalUrl(ROUTES.products) },
        ]}
        overrideItems
      />

      <PageHeader
        title="Our products"
        subtitle="Purpose-built platforms from our engineering team — starting with financial operations for CPA firms and growing businesses."
        breadcrumb="Products"
      />

      <Section className="pt-0">
        <ScrollReveal>
          <article className="card-premium overflow-hidden max-w-3xl mx-auto group">
            <div className="p-8 sm:p-10">
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 rounded-xl bg-brand-50 text-brand-600">
                  <BookOpen className="h-8 w-8" aria-hidden />
                </div>
                <div>
                  <p className="eyebrow mb-1">Flagship product</p>
                  <h2 className="text-2xl sm:text-3xl font-bold text-ink">{FLOWBOOKS_PRO.name}</h2>
                  <p className="text-brand-600 font-medium mt-1">{FLOWBOOKS_PRO.tagline}</p>
                </div>
              </div>
              <p className="text-ink-muted leading-relaxed mb-8">{FLOWBOOKS_PRO.summary}</p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  to={ROUTES.flowbooksPro}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-white bg-brand-600 hover:bg-brand-700 transition-colors"
                >
                  Product overview
                  <ArrowUpRight className="h-4 w-4" aria-hidden />
                </Link>
                <a
                  href={FLOWBOOKS_PRO.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-ink border border-surface-border hover:border-brand-200 hover:bg-brand-50/50 transition-colors"
                >
                  Visit live site
                  <ArrowUpRight className="h-4 w-4" aria-hidden />
                </a>
              </div>
            </div>
          </article>
        </ScrollReveal>
      </Section>
    </>
  );
}
