import { Link } from 'react-router-dom';
import {
  Linkedin,
  Mail,
  Clock,
  MessageSquare,
  Globe2,
  ArrowRight,
} from 'lucide-react';
import { NewsletterSubscription } from './newsletter/NewsletterSubscription';
import { FOOTER_NAV_ITEMS } from '../data/nav';
import { ROUTES } from '../routes/paths';
import { Logo } from './brand/Logo';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-ink text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-mesh-dark opacity-60 pointer-events-none" aria-hidden />
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 relative">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Company Info */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="mb-6">
              <Logo variant="light" />
            </div>
            <p className="text-gray-300 text-sm leading-relaxed mb-6 max-w-xs">
              Empowering businesses through innovative technology solutions. We transform ideas into
              digital reality with cutting-edge development and AI-powered solutions.
            </p>
            <div className="flex gap-4">
              <a
                href="https://www.linkedin.com/company/novora-solutions"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="mailto:inquiry@novorasolutions.com"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-300 mb-5">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {FOOTER_NAV_ITEMS.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="text-gray-400 hover:text-white flex items-center group text-sm transition-colors"
                  >
                    <ArrowRight className="h-3.5 w-3.5 mr-2 transition-transform group-hover:translate-x-1" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-300 mb-5">
              Contact Info
            </h4>
            <ul className="space-y-3.5">
              <li className="flex items-start gap-3">
                <Clock className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300 text-sm">24/7 Support Available</span>
              </li>
              <li className="flex items-start gap-3">
                <MessageSquare className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300 text-sm">2-4 Hour Response Time</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
                <a
                  href="mailto:inquiry@novorasolutions.com"
                  className="text-gray-300 hover:text-white text-sm transition-colors"
                >
                  inquiry@novorasolutions.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Globe2 className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300 text-sm">Global Remote Services</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-300 mb-5">
              Newsletter
            </h4>
            <p className="text-gray-400 text-sm mb-4">
              Stay updated with our latest news and insights.
            </p>
            <NewsletterSubscription />
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © {currentYear} Novora Solutions. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <Link to={ROUTES.privacy} className="text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link to={ROUTES.terms} className="text-gray-400 hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link to={ROUTES.cookies} className="text-gray-400 hover:text-white transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
