import { SEOHead } from '../seo/SEOHead';
import { SEOSchema } from '../seo/SEOSchema';
import { CanonicalUrl } from '../components/SEO/CanonicalUrl';
import { JsonLdBreadcrumbs } from '../components/SEO/JsonLdBreadcrumbs';
import { Hero } from '../components/Hero';
import { TrustBar } from '../components/conversion/TrustBar';
import { StatsSection } from '../components/conversion/StatsSection';
import { Testimonials } from '../components/conversion/Testimonials';
import { FAQSection } from '../components/conversion/FAQSection';
import { BentoServices } from '../components/home/BentoServices';
import { ProcessSection } from '../components/home/ProcessSection';
import { CtaBanner } from '../components/home/CtaBanner';
import { Vision } from '../components/about/Vision';
import { getCanonicalUrl } from '../routes/paths';

export function HomePage() {
  return (
    <>
      <SEOHead
        title="Novora Solutions | Custom Software Development & AI Solutions"
        description="Novora Solutions transforms innovative ideas into digital reality with cutting-edge web, mobile, and AI development services."
        canonicalUrl={getCanonicalUrl('/')}
      />
      <CanonicalUrl url={getCanonicalUrl('/')} />
      <SEOSchema pageType="home" />
      <JsonLdBreadcrumbs items={[{ name: 'Home', url: getCanonicalUrl('/') }]} />

      <Hero />

      <TrustBar />

      <BentoServices />

      <ProcessSection />

      <StatsSection />

      <section className="py-20 sm:py-28 bg-surface-soft">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <Vision />
        </div>
      </section>

      <Testimonials />

      <FAQSection />

      <CtaBanner />
    </>
  );
}
