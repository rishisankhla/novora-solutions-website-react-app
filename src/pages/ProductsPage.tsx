import { SEOHead } from '../seo/SEOHead';
import { SEOSchema } from '../seo/SEOSchema';
import { CanonicalUrl } from '../components/SEO/CanonicalUrl';
import { JsonLdBreadcrumbs } from '../components/SEO/JsonLdBreadcrumbs';
import { PageHeader } from '../components/ui/PageHeader';
import { FlowBooksProShowcase } from '../components/products/FlowBooksProShowcase';
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

      <FlowBooksProShowcase mode="full" />
    </>
  );
}
