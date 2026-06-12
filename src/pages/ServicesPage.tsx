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
        description="FlowBooksPro financial operations plus marketing, IT solutions, quotations, development, startup growth, and maintenance from Novora Solutions."
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
        subtitle="Consulting and engineering — marketing, IT, quotations, development, startup growth, and maintenance. See Products for FlowBooksPro."
        breadcrumb="Services"
      />

      <Services />
    </>
  );
}
