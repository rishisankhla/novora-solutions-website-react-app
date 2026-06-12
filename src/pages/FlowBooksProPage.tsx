import { SEOHead } from '../seo/SEOHead';
import { SEOSchema } from '../seo/SEOSchema';
import { CanonicalUrl } from '../components/SEO/CanonicalUrl';
import { JsonLdBreadcrumbs } from '../components/SEO/JsonLdBreadcrumbs';
import { FlowBooksProShowcase } from '../components/products/FlowBooksProShowcase';
import { FLOWBOOKS_PRO } from '../data/flowbookspro';
import { getCanonicalUrl, ROUTES } from '../routes/paths';

export function FlowBooksProPage() {
  return (
    <>
      <SEOHead
        title="FlowBooksPro | Novora Solutions"
        description={FLOWBOOKS_PRO.summary}
        canonicalUrl={getCanonicalUrl(ROUTES.flowbooksPro)}
      />
      <CanonicalUrl url={getCanonicalUrl(ROUTES.flowbooksPro)} />
      <SEOSchema pageType="services" />
      <JsonLdBreadcrumbs
        items={[
          { name: 'Home', url: getCanonicalUrl('/') },
          { name: 'Products', url: getCanonicalUrl(ROUTES.products) },
          { name: 'FlowBooksPro', url: getCanonicalUrl(ROUTES.flowbooksPro) },
        ]}
        overrideItems
      />

      <FlowBooksProShowcase mode="full" />
    </>
  );
}
