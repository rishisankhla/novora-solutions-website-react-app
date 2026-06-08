import { useState, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { Users, Rocket, Globe2, Heart } from 'lucide-react';
import { SEOHead } from '../seo/SEOHead';
import { SEOSchema } from '../seo/SEOSchema';
import { CanonicalUrl } from '../components/SEO/CanonicalUrl';
import { JsonLdBreadcrumbs } from '../components/SEO/JsonLdBreadcrumbs';
import { PageHeader } from '../components/ui/PageHeader';
import { ScrollReveal } from '../components/ui/ScrollReveal';
import { Section } from '../components/ui/Section';
import { OpenPositions } from '../components/careers/OpenPositions';
import { CareerApplicationForm } from '../components/careers/CareerApplicationForm';
import { useCmsJobs } from '../hooks/useCmsData';
import { getCanonicalUrl } from '../routes/paths';

const perks = [
  {
    icon: Globe2,
    title: 'Remote-first',
    description: 'Work from anywhere with flexible hours and async-friendly collaboration.',
  },
  {
    icon: Rocket,
    title: 'Growth & impact',
    description: 'Build real products for global clients on meaningful projects.',
  },
  {
    icon: Users,
    title: 'Collaborative culture',
    description: 'Mentorship, knowledge sharing, and continuous learning built in.',
  },
  {
    icon: Heart,
    title: 'People-first',
    description: 'Competitive compensation and a supportive, respectful environment.',
  },
];

export function CareersPage() {
  const [selectedPosition, setSelectedPosition] = useState('');
  const { jobs, positionOptions } = useCmsJobs();

  const handleSelectPosition = useCallback((title: string) => {
    setSelectedPosition(title);
    const applySection = document.getElementById('apply');
    if (applySection) {
      applySection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  return (
    <>
      <SEOHead
        title="Careers | Novora Solutions"
        description="Join Novora Solutions. Explore open positions in engineering, design, AI/ML, and more. Apply today and help us build the future of technology."
        canonicalUrl={getCanonicalUrl('/careers')}
      />
      <CanonicalUrl url={getCanonicalUrl('/careers')} />
      <SEOSchema pageType="about" />
      <JsonLdBreadcrumbs
        items={[
          { name: 'Home', url: getCanonicalUrl('/') },
          { name: 'Careers', url: getCanonicalUrl('/careers') },
        ]}
        overrideItems
      />

      {jobs.length > 0 && (
        <Helmet>
          <script type="application/ld+json">
            {JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'ItemList',
              itemListElement: jobs.map((job, index) => ({
                '@type': 'ListItem',
                position: index + 1,
                item: {
                  '@type': 'JobPosting',
                  title: job.title,
                  description: job.description,
                  hiringOrganization: {
                    '@type': 'Organization',
                    name: 'Novora Solutions',
                    sameAs: 'https://novorasolutions.com',
                  },
                  jobLocation: {
                    '@type': 'Place',
                    address: {
                      '@type': 'PostalAddress',
                      addressCountry: 'US',
                    },
                  },
                  employmentType: job.type,
                  datePosted: new Date().toISOString().slice(0, 10),
                },
              })),
            })}
          </script>
        </Helmet>
      )}

      <PageHeader
        title="Build your career with us"
        subtitle="Join engineers, designers, and innovators shaping products for clients worldwide."
        breadcrumb="Careers"
      />

      <Section className="bg-surface-soft py-16 sm:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {perks.map((perk, index) => {
            const Icon = perk.icon;
            return (
              <ScrollReveal key={perk.title} delay={index * 60}>
                <article className="card-premium p-6 h-full text-center">
                  <div className="inline-flex p-3 rounded-xl bg-brand-50 text-brand-600 mb-4">
                    <Icon className="h-6 w-6" aria-hidden />
                  </div>
                  <h3 className="text-base font-bold text-ink mb-2">{perk.title}</h3>
                  <p className="text-sm text-ink-muted leading-relaxed">{perk.description}</p>
                </article>
              </ScrollReveal>
            );
          })}
        </div>
      </Section>

      <OpenPositions
        selectedPosition={selectedPosition}
        onSelectPosition={handleSelectPosition}
      />

      <CareerApplicationForm selectedPosition={selectedPosition} positionOptions={positionOptions} />
    </>
  );
}
