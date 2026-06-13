import { SEOHead } from '../seo/SEOHead';
import { SEOSchema } from '../seo/SEOSchema';
import { CanonicalUrl } from '../components/SEO/CanonicalUrl';
import { JsonLdBreadcrumbs } from '../components/SEO/JsonLdBreadcrumbs';
import { PageHeader } from '../components/ui/PageHeader';
import { IrisRentsShowcase } from '../components/services/IrisRentsShowcase';
import { Services } from '../components/Services';
import { getCanonicalUrl, ROUTES } from '../routes/paths';

export function ServicesPage() {
  return (
    <>
      <SEOHead
        title="Our Services | Novora Solutions"
        description="Marketing, IT solutions, custom development, AI, cloud, startup growth, and maintenance from Novora Solutions."
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
        subtitle="Consulting and engineering — marketing, IT, development, AI, cloud, startup growth, and maintenance."
        breadcrumb="Services"
      />

      <IrisRentsShowcase mode="top" />

      <Services />
    </>
  );
}
