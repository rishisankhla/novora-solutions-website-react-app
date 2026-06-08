import { Link } from 'react-router-dom';
import { SEOHead } from '../seo/SEOHead';
import { CanonicalUrl } from '../components/SEO/CanonicalUrl';
import { PageHeader } from '../components/ui/PageHeader';
import { getCanonicalUrl, ROUTES } from '../routes/paths';

const LEGAL_CONTENT: Record<
  string,
  { title: string; description: string; sections: { heading: string; body: string }[] }
> = {
  privacy: {
    title: 'Privacy Policy',
    description: 'How Novora Solutions collects, uses, and protects your personal information.',
    sections: [
      {
        heading: 'Information We Collect',
        body: 'We collect information you provide directly, such as name, email, and message content when you contact us or apply for a position. We also collect usage data through standard analytics to improve our website.',
      },
      {
        heading: 'How We Use Your Information',
        body: 'We use your information to respond to inquiries, process job applications, send newsletters (with your consent), and improve our services. We do not sell your personal data to third parties.',
      },
      {
        heading: 'Data Security',
        body: 'We implement industry-standard security measures including encryption, access controls, and secure storage to protect your information.',
      },
      {
        heading: 'Contact Us',
        body: 'For privacy-related questions, contact us at inquiry@novorasolutions.com.',
      },
    ],
  },
  terms: {
    title: 'Terms of Service',
    description: 'Terms and conditions for using Novora Solutions website and services.',
    sections: [
      {
        heading: 'Acceptance of Terms',
        body: 'By accessing our website or using our services, you agree to these terms. If you do not agree, please do not use our services.',
      },
      {
        heading: 'Services',
        body: 'Novora Solutions provides custom software development and consulting services. Specific project terms are defined in separate agreements.',
      },
      {
        heading: 'Intellectual Property',
        body: 'Website content is owned by Novora Solutions unless otherwise stated. Client project deliverables are governed by individual project agreements.',
      },
      {
        heading: 'Limitation of Liability',
        body: 'Novora Solutions is not liable for indirect or consequential damages arising from use of this website. Our liability is limited to the extent permitted by law.',
      },
    ],
  },
  cookies: {
    title: 'Cookie Policy',
    description: 'How Novora Solutions uses cookies and similar technologies.',
    sections: [
      {
        heading: 'What Are Cookies',
        body: 'Cookies are small text files stored on your device when you visit our website. They help us provide a better experience and understand how our site is used.',
      },
      {
        heading: 'Cookies We Use',
        body: 'We use essential cookies for site functionality, analytics cookies to understand traffic patterns, and preference cookies to remember your settings.',
      },
      {
        heading: 'Managing Cookies',
        body: 'You can control cookies through your browser settings. Disabling certain cookies may affect website functionality.',
      },
    ],
  },
};

interface LegalPageProps {
  type: 'privacy' | 'terms' | 'cookies';
}

export function LegalPage({ type }: LegalPageProps) {
  const content = LEGAL_CONTENT[type];
  const path = `/${type === 'cookies' ? 'cookies' : type}`;

  return (
    <>
      <SEOHead
        title={`${content.title} | Novora Solutions`}
        description={content.description}
        canonicalUrl={getCanonicalUrl(path)}
      />
      <CanonicalUrl url={getCanonicalUrl(path)} />

      <PageHeader title={content.title} subtitle={content.description} breadcrumb={content.title} />

      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            {content.sections.map((section) => (
              <div key={section.heading}>
                <h2 className="text-xl font-bold text-gray-900 mb-3">{section.heading}</h2>
                <p className="text-gray-600 leading-relaxed">{section.body}</p>
              </div>
            ))}
          </div>
          <p className="mt-12 text-sm text-gray-500">
            Last updated: June 2026.{' '}
            <Link to={ROUTES.contact} className="text-blue-600 hover:text-blue-700">
              Contact us
            </Link>{' '}
            with any questions.
          </p>
        </div>
      </section>
    </>
  );
}
