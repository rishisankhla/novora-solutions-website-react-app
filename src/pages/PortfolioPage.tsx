import { SEOHead } from '../seo/SEOHead';
import { SEOSchema } from '../seo/SEOSchema';
import { CanonicalUrl } from '../components/SEO/CanonicalUrl';
import { JsonLdBreadcrumbs } from '../components/SEO/JsonLdBreadcrumbs';
import { PageHeader } from '../components/ui/PageHeader';
import { PortfolioWall } from '../components/portfolio/PortfolioWall';
import { PageLoader } from '../components/ui/PageLoader';
import { Section } from '../components/ui/Section';
import { useCmsPortfolio } from '../hooks/useCmsData';
import { getCanonicalUrl } from '../routes/paths';

export function PortfolioPage() {
  const { projects, loading } = useCmsPortfolio();

  if (loading) {
    return <PageLoader />;
  }

  return (
    <>
      <SEOHead
        title="Portfolio | Novora Solutions"
        description="Explore Novora Solutions' portfolio of successful software projects — web apps, mobile apps, AI solutions, and cloud infrastructure."
        canonicalUrl={getCanonicalUrl('/portfolio')}
      />
      <CanonicalUrl url={getCanonicalUrl('/portfolio')} />
      <SEOSchema pageType="services" />
      <JsonLdBreadcrumbs
        items={[
          { name: 'Home', url: getCanonicalUrl('/') },
          { name: 'Portfolio', url: getCanonicalUrl('/portfolio') },
        ]}
        overrideItems
      />

      <PageHeader
        title="Work we're proud of"
        subtitle="Real projects across web, mobile, AI, and cloud — built with the same rigor we'd apply to yours."
        breadcrumb="Portfolio"
      />

      {projects.length > 0 ? (
        <PortfolioWall projects={projects} />
      ) : (
        <Section className="text-center">
          <p className="text-ink-muted">Portfolio projects will appear here once published in the admin panel.</p>
        </Section>
      )}
    </>
  );
}
