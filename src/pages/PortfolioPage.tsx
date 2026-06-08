import { SEOHead } from '../seo/SEOHead';
import { SEOSchema } from '../seo/SEOSchema';
import { CanonicalUrl } from '../components/SEO/CanonicalUrl';
import { JsonLdBreadcrumbs } from '../components/SEO/JsonLdBreadcrumbs';
import { PageHeader } from '../components/ui/PageHeader';
import { PortfolioWall } from '../components/portfolio/PortfolioWall';
import { portfolioProjects } from '../data/portfolio';
import { useCmsPortfolio } from '../hooks/useCmsData';
import { getCanonicalUrl } from '../routes/paths';

export function PortfolioPage() {
  const { projects: projectsFromApi } = useCmsPortfolio();
  const portfolioProjectsList = projectsFromApi.length ? projectsFromApi : portfolioProjects;

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

      <PortfolioWall projects={portfolioProjectsList} />
    </>
  );
}
