import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOSchemaProps {
  pageType?: 'home' | 'about' | 'services' | 'contact' | 'blog';
  articleData?: {
    title: string;
    description: string;
    publishDate: string;
    modifiedDate?: string;
    author: string;
    category: string;
    tags?: string[];
    image?: string;
  };
}

export function SEOSchema({ pageType = 'home', articleData }: SEOSchemaProps) {
  const currentUrl = typeof window !== 'undefined' 
    ? `https://novorasolutions.com${window.location.pathname}${window.location.hash}`
    : 'https://novorasolutions.com/';
  
  // Base organization schema
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Novora Solutions",
    "url": "https://novorasolutions.com",
    "logo": "https://novorasolutions.com/images/Novora-Logo.png",
    "sameAs": [
      "https://www.linkedin.com/company/novora-solutions",
      "https://twitter.com/novorasolutions",
      "https://github.com/novora-solutions"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "email": "contact@novorasolutions.com",
      "contactType": "customer service",
      "availableLanguage": "English"
    },
    "description": "Novora Solutions is a software development company specializing in web applications, mobile apps, AI solutions, and cloud services for startups and enterprises."
  };

  // Service schema
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Software Development",
    "provider": {
      "@type": "Organization",
      "name": "Novora Solutions"
    },
    "areaServed": {
      "@type": "Country",
      "name": "United States"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Software Development Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Web App Development"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Mobile App Development"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "AI & ML Solutions"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "MVP Development for Startups"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Full-Stack Product Development"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Cloud & DevOps Solutions"
          }
        }
      ]
    }
  };

  // WebSite schema
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Novora Solutions",
    "url": "https://novorasolutions.com",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://novorasolutions.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  // FAQ schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What services does Novora Solutions offer?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Novora Solutions offers a wide range of software development services including web application development, mobile app development, AI & ML solutions, MVP development for startups, full-stack product development, and cloud & DevOps solutions."
        }
      },
      {
        "@type": "Question",
        "name": "How does Novora Solutions approach MVP development?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We specialize in rapid prototyping and building scalable MVPs that are ready for real users and investors. Our end-to-end development process handles everything from ideation to launch, and we provide startup mentoring with guidance on technical decisions and scaling strategies."
        }
      },
      {
        "@type": "Question",
        "name": "What technologies does Novora Solutions work with?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We work with a wide range of modern technologies including React, Next.js, Node.js, Python, FastAPI, MongoDB, PostgreSQL, React Native, Flutter, AWS, Google Cloud, Azure, Docker, Kubernetes, and various AI/ML frameworks like OpenAI, Google Gemini, LangChain, and TensorFlow."
        }
      },
      {
        "@type": "Question",
        "name": "How can I contact Novora Solutions?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "You can contact us through our website contact form, by email at contact@novorasolutions.com, or by scheduling a consultation through our website. We typically respond within 2-4 business hours."
        }
      }
    ]
  };

  // Article schema (for blog posts)
  const articleSchema = articleData ? {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": articleData.title,
    "description": articleData.description,
    "image": articleData.image || "https://novorasolutions.com/images/blog-default.jpg",
    "author": {
      "@type": "Person",
      "name": articleData.author
    },
    "publisher": {
      "@type": "Organization",
      "name": "Novora Solutions",
      "logo": {
        "@type": "ImageObject",
        "url": "https://novorasolutions.com/images/Novora-Logo.png"
      }
    },
    "datePublished": articleData.publishDate,
    "dateModified": articleData.modifiedDate || articleData.publishDate,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": currentUrl
    },
    "keywords": articleData.tags?.join(", ") || articleData.category
  } : null;

  // Local business schema
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Novora Solutions",
    "image": "https://novorasolutions.com/images/Novora-Logo.png",
    "url": "https://novorasolutions.com",
    "telephone": "+1-800-123-4567",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "123 Tech Avenue",
      "addressLocality": "San Francisco",
      "addressRegion": "CA",
      "postalCode": "94107",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 37.7749,
      "longitude": -122.4194
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday"
        ],
        "opens": "09:00",
        "closes": "17:00"
      }
    ],
    "sameAs": [
      "https://www.linkedin.com/company/novora-solutions",
      "https://twitter.com/novorasolutions",
      "https://github.com/novora-solutions"
    ]
  };

  // WebPage schema
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "url": currentUrl,
    "name": getPageTitle(pageType),
    "description": getPageDescription(pageType),
    "isPartOf": {
      "@type": "WebSite",
      "name": "Novora Solutions",
      "url": "https://novorasolutions.com"
    },
    "speakable": {
      "@type": "SpeakableSpecification",
      "cssSelector": ["h1", "h2", ".speakable"]
    },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://novorasolutions.com/"
        },
        ...(pageType !== 'home' ? [{
          "@type": "ListItem",
          "position": 2,
          "name": capitalizeFirstLetter(pageType),
          "item": `https://novorasolutions.com/#${pageType}`
        }] : [])
      ]
    }
  };

  // Determine which schemas to include based on page type
  const schemas = [];
  schemas.push(organizationSchema);
  schemas.push(websiteSchema);
  
  if (pageType === 'home') {
    schemas.push(serviceSchema);
    schemas.push(faqSchema);
    schemas.push(localBusinessSchema);
  } else if (pageType === 'services') {
    schemas.push(serviceSchema);
  } else if (pageType === 'blog' && articleData) {
    schemas.push(articleSchema);
  }
  
  schemas.push(webPageSchema);

  return (
    <Helmet>
      {schemas.map((schema, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
}

// Helper functions
function getPageTitle(pageType: string): string {
  switch (pageType) {
    case 'home':
      return 'Novora Solutions | Custom Software Development & AI Solutions';
    case 'about':
      return 'About Us | Novora Solutions';
    case 'services':
      return 'Our Services | Novora Solutions';
    case 'contact':
      return 'Contact Us | Novora Solutions';
    case 'blog':
      return 'Blog | Novora Solutions';
    default:
      return 'Novora Solutions | Custom Software Development & AI Solutions';
  }
}

function getPageDescription(pageType: string): string {
  switch (pageType) {
    case 'home':
      return 'Novora Solutions transforms innovative ideas into digital reality with cutting-edge web, mobile, and AI development services. Get custom software solutions that drive growth and efficiency.';
    case 'about':
      return 'Learn about Novora Solutions, our team, our mission, and our approach to delivering exceptional software development services.';
    case 'services':
      return 'Explore our comprehensive range of software development services including web apps, mobile apps, AI solutions, and cloud services.';
    case 'contact':
      return "Get in touch with Novora Solutions for your software development needs. We are here to help turn your ideas into reality.";
    case 'blog':
      return 'Read the latest insights, news, and articles from Novora Solutions on software development, AI, and technology trends.';
    default:
      return 'Novora Solutions transforms innovative ideas into digital reality with cutting-edge web, mobile, and AI development services.';
  }
}

function capitalizeFirstLetter(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1);
}