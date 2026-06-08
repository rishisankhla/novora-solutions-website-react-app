import { SEOHead } from '../seo/SEOHead';
import { SEOSchema } from '../seo/SEOSchema';
import { CanonicalUrl } from '../components/SEO/CanonicalUrl';
import { JsonLdBreadcrumbs } from '../components/SEO/JsonLdBreadcrumbs';
import { PageHeader } from '../components/ui/PageHeader';
import { Services } from '../components/Services';
import { getCanonicalUrl } from '../routes/paths';

export function ProductsPage() {
  return (
    <>
      <SEOHead
        title="Our Products & Services | Novora Solutions"
        description="Explore Novora Solutions' comprehensive range of software development services — web apps, mobile apps, AI solutions, MVP development, and cloud services."
        canonicalUrl={getCanonicalUrl('/products')}
      />
      <CanonicalUrl url={getCanonicalUrl('/products')} />
      <SEOSchema pageType="services" />
      <JsonLdBreadcrumbs
        items={[
          { name: 'Home', url: getCanonicalUrl('/') },
          { name: 'Products', url: getCanonicalUrl('/products') },
        ]}
        overrideItems
      />

      <PageHeader
        title="Our Products & Services"
        subtitle="Innovative software solutions tailored to your business needs — from concept to launch and beyond."
        breadcrumb="Products"
      />

      <Services />
    </>
  );
}
