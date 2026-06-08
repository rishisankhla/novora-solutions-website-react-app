import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Calendar, Clock, ArrowLeft, User, ArrowRight } from 'lucide-react';
import { SEOHead } from '../seo/SEOHead';
import { SEOSchema } from '../seo/SEOSchema';
import { CanonicalUrl } from '../components/SEO/CanonicalUrl';
import { JsonLdBreadcrumbs } from '../components/SEO/JsonLdBreadcrumbs';
import { ScrollReveal } from '../components/ui/ScrollReveal';
import { Button } from '../components/ui/Button';
import { PageLoader } from '../components/ui/PageLoader';
import { publicApi } from '../lib/api';
import { blogPosts } from '../data/blog';
import { ROUTES, getBlogPostPath, getCanonicalUrl } from '../routes/paths';

interface BlogPostDetail {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  publishDate: string;
  readTime: string;
  image: string;
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function fallbackContent(excerpt: string): string {
  return `${excerpt}\n\nAt Novora Solutions, we help businesses navigate these challenges with practical, production-ready solutions. Our team combines deep technical expertise with a product-first mindset to deliver outcomes that matter.\n\nWhether you're scaling an existing platform or launching something new, the principles outlined here can guide smarter decisions and faster execution. Reach out if you'd like to discuss how these ideas apply to your project.`;
}

export function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPostDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!slug) return;

    publicApi
      .getBlogBySlug(slug)
      .then((data) => {
        const p = data.post as Record<string, unknown>;
        setPost({
          slug: String(p.slug),
          title: String(p.title),
          excerpt: String(p.excerpt),
          content: String(p.content || ''),
          category: String(p.category),
          author: String(p.author),
          publishDate: p.publishedAt ? String(p.publishedAt).slice(0, 10) : '',
          readTime: `${p.readTimeMinutes ?? 5} min read`,
          image: String(p.imageUrl),
        });
      })
      .catch(() => {
        const fallback = blogPosts.find((b) => b.slug === slug);
        if (fallback) {
          setPost({
            ...fallback,
            content: fallbackContent(fallback.excerpt),
          });
        } else {
          setNotFound(true);
        }
      })
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return <PageLoader />;
  }

  if (notFound || !post) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center">
        <h1 className="text-2xl font-bold text-ink mb-4">Article not found</h1>
        <Button to={ROUTES.blog} variant="secondary">
          Back to blog
        </Button>
      </div>
    );
  }

  const canonicalUrl = getCanonicalUrl(getBlogPostPath(post.slug));
  const paragraphs = (post.content || fallbackContent(post.excerpt))
    .split('\n\n')
    .filter(Boolean);

  return (
    <>
      <SEOHead
        title={`${post.title} | Novora Solutions Blog`}
        description={post.excerpt}
        canonicalUrl={canonicalUrl}
        ogImage={post.image}
        ogType="article"
      />
      <CanonicalUrl url={canonicalUrl} />
      <SEOSchema
        pageType="blog"
        articleData={{
          title: post.title,
          description: post.excerpt,
          publishDate: post.publishDate,
          author: post.author,
          category: post.category,
          image: post.image,
        }}
      />
      <JsonLdBreadcrumbs
        items={[
          { name: 'Home', url: getCanonicalUrl('/') },
          { name: 'Blog', url: getCanonicalUrl('/blog') },
          { name: post.title, url: canonicalUrl },
        ]}
        overrideItems
      />

      <article className="py-12 sm:py-16 bg-surface-soft">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <Link
              to={ROUTES.blog}
              className="inline-flex items-center gap-2 text-sm text-ink-subtle hover:text-brand-600 mb-8 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden />
              Back to blog
            </Link>

            <span className="eyebrow mb-4 block">{post.category}</span>
            <h1 className="heading-display text-3xl sm:text-4xl lg:text-5xl mb-6 text-balance">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-sm text-ink-subtle mb-8 pb-8 border-b border-surface-border">
              <span className="flex items-center gap-1.5">
                <User className="h-4 w-4" aria-hidden />
                {post.author}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" aria-hidden />
                {formatDate(post.publishDate)}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" aria-hidden />
                {post.readTime}
              </span>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <div className="relative rounded-2xl overflow-hidden mb-10 aspect-[16/9] shadow-elevated">
              <img
                src={post.image}
                alt=""
                className="w-full h-full object-cover"
                loading="eager"
              />
            </div>
          </ScrollReveal>

          <div className="prose-novora">
            {paragraphs.map((paragraph, index) => (
              <ScrollReveal key={index} delay={index * 30}>
                <p>{paragraph}</p>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal className="mt-12 pt-8 border-t border-surface-border">
            <div className="card-premium p-8 sm:p-10 text-center bg-gradient-to-br from-white to-brand-50/30">
              <h2 className="text-xl font-bold text-ink mb-2">Ready to build something great?</h2>
              <p className="text-ink-muted mb-6">
                Let's discuss how these ideas apply to your next project.
              </p>
              <Button to={ROUTES.contact}>
                Get in touch
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </article>
    </>
  );
}
