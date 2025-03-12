import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: string;
}

export function SEOHead({
  title = "Novora Solutions | Custom Software Development & AI Solutions",
  description = "Novora Solutions transforms innovative ideas into digital reality with cutting-edge web, mobile, and AI development services. Get custom software solutions that drive growth and efficiency.",
  keywords = "software development, web app development, mobile app development, AI solutions, custom software, MVP development, startup technology, cloud solutions",
  canonicalUrl = "https://novorasolutions.com/",
  ogImage = "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80",
  ogType = "website"
}: SEOHeadProps) {
  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={canonicalUrl} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={ogImage} />
    </Helmet>
  );
}