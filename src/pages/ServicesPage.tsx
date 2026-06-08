import { SEOHead } from '../seo/SEOHead';
import { SEOSchema } from '../seo/SEOSchema';
import { CanonicalUrl } from '../components/SEO/CanonicalUrl';
import { JsonLdBreadcrumbs } from '../components/SEO/JsonLdBreadcrumbs';
import { PageHeader } from '../components/ui/PageHeader';
import { Services } from '../components/Services';
import { getCanonicalUrl, ROUTES } from '../routes/paths';

export function ServicesPage() {
  return (
    <>
      <SEOHead
        title="Our Services | Novora Solutions"
        description="Web development, mobile apps, AI solutions, MVP builds, full-stack products, and cloud DevOps — end-to-end software services from Novora Solutions."
        canonicalUrl={getCanonicalUrl(ROUTES.services)}
      />
      <CanonicalUrl url={getCanonicalUrl(ROUTES.services)} />
      <SEOSchema pageType="services" />
      <JsonLdBreadcrumbs
        items={[
          { name: 'Home', url: getCanonicalUrl('/') },
          { name: 'Services', url: getCanonicalUrl(ROUTES.services) },
        ]}
        overrideItems
      />

      <PageHeader
        title="Our Services"
        subtitle="End-to-end software development — from strategy and design through launch, scale, and ongoing support."
        breadcrumb="Services"
      />

      <Services />
    </>
  );
}
