import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { SEOHead } from '../seo/SEOHead';
import { SEOSchema } from '../seo/SEOSchema';
import { CanonicalUrl } from '../components/SEO/CanonicalUrl';
import { JsonLdBreadcrumbs } from '../components/SEO/JsonLdBreadcrumbs';
import { PageHeader } from '../components/ui/PageHeader';
import { Section } from '../components/ui/Section';
import { Vision } from '../components/about/Vision';
import { AboutStory } from '../components/about/AboutStory';
import { Values } from '../components/team/Values';
import { CtaBanner } from '../components/home/CtaBanner';
import { getCanonicalUrl, ROUTES } from '../routes/paths';

export function AboutPage() {
  return (
    <>
      <SEOHead
        title="About Us | Novora Solutions"
        description="Learn about Novora Solutions — our vision, values, and human-friendly approach to building web, mobile, AI, and marketing solutions."
        canonicalUrl={getCanonicalUrl('/about')}
      />
      <CanonicalUrl url={getCanonicalUrl('/about')} />
      <SEOSchema pageType="about" />
      <JsonLdBreadcrumbs
        items={[
          { name: 'Home', url: getCanonicalUrl('/') },
          { name: 'About Us', url: getCanonicalUrl('/about') },
        ]}
        overrideItems
      />

      <PageHeader
        title="About Novora Solutions"
        subtitle="We are a product-minded technology partner — helping teams ship software that lasts and feels good to build together."
        breadcrumb="About Us"
      />

      <Section className="bg-surface-soft">
        <Vision />
      </Section>

      <Section>
        <AboutStory />
      </Section>

      <Section className="bg-white">
        <Values />
      </Section>

      <Section className="bg-surface-soft">
        <div className="text-center max-w-xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-ink mb-4">Want to meet the people behind the work?</h2>
          <p className="text-ink-muted mb-8 leading-relaxed">
            Our leadership and specialists bring decades of combined experience across startups, SaaS, and enterprise delivery.
          </p>
          <Link
            to={ROUTES.team}
            className="inline-flex items-center gap-2 text-brand-600 font-semibold hover:text-brand-700 group"
          >
            Meet the team
            <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </Section>

      <CtaBanner />
    </>
  );
}
