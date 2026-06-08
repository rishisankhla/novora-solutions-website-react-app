import { Calendar, Clock, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEOHead } from '../seo/SEOHead';
import { SEOSchema } from '../seo/SEOSchema';
import { CanonicalUrl } from '../components/SEO/CanonicalUrl';
import { JsonLdBreadcrumbs } from '../components/SEO/JsonLdBreadcrumbs';
import { PageHeader } from '../components/ui/PageHeader';
import { ScrollReveal } from '../components/ui/ScrollReveal';
import { Section } from '../components/ui/Section';
import { NewsletterSubscription } from '../components/newsletter/NewsletterSubscription';
import { blogPosts } from '../data/blog';
import { useCmsBlog } from '../hooks/useCmsData';
import { ROUTES, getBlogPostPath, getCanonicalUrl } from '../routes/paths';

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function BlogPage() {
  const { posts: blogPostsFromApi } = useCmsBlog();
  const posts = blogPostsFromApi.length ? blogPostsFromApi : blogPosts;

  if (posts.length === 0) {
    return (
      <>
        <PageHeader title="Insights & articles" subtitle="Expert perspectives on building digital products." breadcrumb="Blog" />
        <Section className="text-center">
          <p className="text-ink-muted">Articles will appear here once published.</p>
        </Section>
      </>
    );
  }

  const featured = posts[0];
  const rest = posts.slice(1);

  return (
    <>
      <SEOHead
        title="Blog | Novora Solutions"
        description="Insights, news, and articles from Novora Solutions on software development, AI, cloud technology, and startup growth."
        canonicalUrl={getCanonicalUrl('/blog')}
      />
      <CanonicalUrl url={getCanonicalUrl('/blog')} />
      <SEOSchema pageType="blog" />
      <JsonLdBreadcrumbs
        items={[
          { name: 'Home', url: getCanonicalUrl('/') },
          { name: 'Blog', url: getCanonicalUrl('/blog') },
        ]}
        overrideItems
      />

      <PageHeader
        title="Insights & articles"
        subtitle="Expert perspectives on software development, AI, cloud technology, and building products that last."
        breadcrumb="Blog"
      />

      <Section className="bg-surface-soft">
        <ScrollReveal>
          <Link
            to={getBlogPostPath(featured.slug)}
            className="group grid grid-cols-1 lg:grid-cols-2 gap-0 card-premium overflow-hidden mb-12 lg:mb-16"
          >
            <div className="relative overflow-hidden aspect-[16/10] lg:aspect-auto lg:min-h-[360px]">
              <img
                src={featured.image}
                alt=""
                className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700"
                loading="eager"
              />
              <span className="absolute top-4 left-4 bg-ink text-white text-xs font-semibold px-3 py-1 rounded-full">
                Featured
              </span>
            </div>
            <div className="p-8 lg:p-12 flex flex-col justify-center">
              <span className="eyebrow mb-3">{featured.category}</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-ink mb-4 group-hover:text-brand-600 transition-colors text-balance">
                {featured.title}
              </h2>
              <p className="text-ink-muted leading-relaxed mb-6">{featured.excerpt}</p>
              <div className="flex items-center gap-4 text-sm text-ink-subtle mb-6">
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" aria-hidden />
                  {formatDate(featured.publishDate)}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4" aria-hidden />
                  {featured.readTime}
                </span>
              </div>
              <span className="inline-flex items-center gap-2 text-brand-600 font-semibold">
                Read article
                <ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </span>
            </div>
          </Link>
        </ScrollReveal>

        {rest.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map((post, index) => (
              <ScrollReveal key={post.id} delay={index * 60}>
                <Link
                  to={getBlogPostPath(post.slug)}
                  className="group card-premium overflow-hidden h-full flex flex-col"
                >
                  <div className="relative overflow-hidden aspect-[16/10]">
                    <img
                      src={post.image}
                      alt=""
                      className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <span className="text-xs font-semibold uppercase tracking-wider text-brand-600 mb-2">
                      {post.category}
                    </span>
                    <h3 className="text-lg font-bold text-ink mb-2 group-hover:text-brand-600 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-sm text-ink-muted leading-relaxed mb-4 flex-1 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-xs text-ink-subtle pt-4 border-t border-surface-border">
                      <span>{formatDate(post.publishDate)}</span>
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        )}

        <ScrollReveal className="mt-16 max-w-lg mx-auto text-center">
          <p className="eyebrow mb-2">Newsletter</p>
          <h3 className="text-xl font-bold text-ink mb-2">Stay in the loop</h3>
          <p className="text-sm text-ink-muted mb-6">
            Practical insights on building and shipping software — no spam.
          </p>
          <NewsletterSubscription />
        </ScrollReveal>

        <ScrollReveal className="mt-12 text-center">
          <Link
            to={ROUTES.contact}
            className="text-brand-600 font-semibold hover:text-brand-700 transition-colors inline-flex items-center gap-1"
          >
            Have a topic you'd like us to cover? Get in touch
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </ScrollReveal>
      </Section>
    </>
  );
}
