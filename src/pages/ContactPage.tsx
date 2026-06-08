import { SEOHead } from '../seo/SEOHead';
import { SEOSchema } from '../seo/SEOSchema';
import { CanonicalUrl } from '../components/SEO/CanonicalUrl';
import { JsonLdBreadcrumbs } from '../components/SEO/JsonLdBreadcrumbs';
import { PageHeader } from '../components/ui/PageHeader';
import { Contact } from '../components/Contact';
import { getCanonicalUrl } from '../routes/paths';

export function ContactPage() {
  return (
    <>
      <SEOHead
        title="Contact Us | Novora Solutions"
        description="Get in touch with Novora Solutions to discuss your software development needs. We typically respond within 2-4 business hours."
        canonicalUrl={getCanonicalUrl('/contact')}
      />
      <CanonicalUrl url={getCanonicalUrl('/contact')} />
      <SEOSchema pageType="contact" />
      <JsonLdBreadcrumbs
        items={[
          { name: 'Home', url: getCanonicalUrl('/') },
          { name: 'Contact', url: getCanonicalUrl('/contact') },
        ]}
        overrideItems
      />

      <PageHeader
        title="Contact Us"
        subtitle="Ready to start your next project? We'd love to hear from you."
        breadcrumb="Contact"
      />

      <Contact />
    </>
  );
}
