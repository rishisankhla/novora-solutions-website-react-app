import { SEOHead } from '../seo/SEOHead';
import { SEOSchema } from '../seo/SEOSchema';
import { CanonicalUrl } from '../components/SEO/CanonicalUrl';
import { JsonLdBreadcrumbs } from '../components/SEO/JsonLdBreadcrumbs';
import { PageHeader } from '../components/ui/PageHeader';
import { Team } from '../components/Team';
import { Values } from '../components/team/Values';
import { JoinTeam } from '../components/team/JoinTeam';
import { Section } from '../components/ui/Section';
import { getCanonicalUrl } from '../routes/paths';

export function TeamPage() {
  return (
    <>
      <SEOHead
        title="Our Team | Novora Solutions"
        description="Meet the leadership and extended team behind Novora Solutions — driving innovation and excellence in software development."
        canonicalUrl={getCanonicalUrl('/team')}
      />
      <CanonicalUrl url={getCanonicalUrl('/team')} />
      <SEOSchema pageType="about" />
      <JsonLdBreadcrumbs
        items={[
          { name: 'Home', url: getCanonicalUrl('/') },
          { name: 'Team', url: getCanonicalUrl('/team') },
        ]}
        overrideItems
      />

      <PageHeader
        title="The people behind the work"
        subtitle="Leadership and specialists united by craft, clarity, and a commitment to client outcomes."
        breadcrumb="Team"
      />

      <Team />

      <Section className="bg-white">
        <Values />
      </Section>

      <Section className="pb-24">
        <JoinTeam />
      </Section>
    </>
  );
}
