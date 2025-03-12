import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { About } from './components/About';
import { Team } from './components/Team';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';
import { SEOSchema } from './seo/SEOSchema';
import { SEOHead } from './seo/SEOHead';
import { CanonicalUrl } from './components/SEO/CanonicalUrl';
import { JsonLdBreadcrumbs } from './components/SEO/JsonLdBreadcrumbs';
 
function App() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [currentSection, setCurrentSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const progress = Math.min(scrollPosition / windowHeight, 1);
      setScrollProgress(progress);
      
      // Determine current section for SEO schema
      const sections = ['services', 'about', 'team', 'contact'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= windowHeight / 2 && rect.bottom >= windowHeight / 2) {
            setCurrentSection(section);
            break;
          } else if (scrollPosition < windowHeight) {
            setCurrentSection('home');
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Monitor online/offline status
  useEffect(() => {
    const handleOnlineStatus = () => {
      setIsOnline(navigator.onLine);
    };

    window.addEventListener('online', handleOnlineStatus);
    window.addEventListener('offline', handleOnlineStatus);

    return () => {
      window.removeEventListener('online', handleOnlineStatus);
      window.removeEventListener('offline', handleOnlineStatus);
    };
  }, []);

  // Define breadcrumbs for the site
  const breadcrumbs = [
    { name: 'Home', url: 'https://novorasolutions.com/' },
    { name: 'Services', url: 'https://novorasolutions.com/#services' },
    { name: 'About', url: 'https://novorasolutions.com/#about' },
    { name: 'Team', url: 'https://novorasolutions.com/#team' },
    { name: 'Contact', url: 'https://novorasolutions.com/#contact' }
  ];

  // Get current breadcrumbs based on section
  const getCurrentBreadcrumbs = () => {
    if (currentSection === 'home') {
      return [breadcrumbs[0]];
    }
    const sectionIndex = breadcrumbs.findIndex(item => item.url.includes(currentSection));
    if (sectionIndex > 0) {
      return [breadcrumbs[0], breadcrumbs[sectionIndex]];
    }
    return [breadcrumbs[0]];
  };

  return (
    <div className="relative min-h-screen">
      {/* Basic SEO meta tags */}
      <SEOHead 
        title="Novora Solutions | Custom Software Development & AI Solutions"
        description="Novora Solutions transforms innovative ideas into digital reality with cutting-edge web, mobile, and AI development services. Get custom software solutions that drive growth and efficiency."
        keywords="software development, web app development, mobile app development, AI solutions, custom software, MVP development, startup technology, cloud solutions"
        canonicalUrl="https://novorasolutions.com/"
        ogImage="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80"
      />
      
      {/* Canonical URL */}
      <CanonicalUrl url="https://novorasolutions.com/" />
      
      {/* Structured data */}
      <SEOSchema pageType={currentSection as any} />
      
      {/* Breadcrumbs structured data */}
      <JsonLdBreadcrumbs items={getCurrentBreadcrumbs()} overrideItems={true} />
      
      {/* Additional meta tags */}
      <Helmet>
        <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
        <link rel="prefetch" href="/offline.html" />
        <meta name="theme-color" content="#3b82f6" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Novora Solutions" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </Helmet>
      
      {/* Offline status notification */}
      {!isOnline && (
        <div className="fixed top-0 left-0 right-0 bg-red-600 text-white text-center py-2 z-50">
          You are currently offline. Some features may be limited.
        </div>
      )}
      
      <Navigation />
      
      {/* Fixed Hero section with pointer-events-none */}
      <div className="fixed inset-0 pointer-events-none">
        <Hero scrollProgress={scrollProgress} />
      </div>

      {/* Spacer div to push content below hero */}
      <div className="h-screen" />

      {/* Content container */}
      <div className="relative z-10 bg-white">
        <Services />
        <About />
        <Team />
        <Contact />
        <Footer />
      </div>
      
      <ScrollToTop />
    </div>
  );
}

export default App