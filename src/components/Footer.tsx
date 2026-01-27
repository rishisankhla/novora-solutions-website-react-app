import React from 'react';
import {
  Linkedin,
  Twitter,
  Instagram,
  Github,
  Mail,
  Clock,
  MessageSquare,
  Globe2,
  ArrowRight
} from 'lucide-react';
import { NewsletterSubscription } from './newsletter/NewsletterSubscription';
import { Toaster } from 'react-hot-toast';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 text-white">
      <Toaster position="bottom-right" />
      {/* Main Footer Content */}
      <div className="w-[95%] mx-auto py-8">
        <div className="flex flex-col lg:flex-row justify-between gap-8">
          {/* Company Info */}
          <div className="flex-shrink-0 w-full lg:w-auto max-w-[280px]">
            <div className="mb-6">
              <img
                src="/images/Novora-Logo.png"
                alt="Novora Solutions"
                className="h-12 brightness-200 hover:brightness-150 transition-all duration-300"
              />
            </div>
            <p className="text-gray-300 text-sm leading-relaxed mb-4">
              Empowering businesses through innovative technology solutions. We transform ideas into
              digital reality with cutting-edge development and AI-powered solutions.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.linkedin.com/company/novora-solutions" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex-shrink-0 w-full lg:w-auto">
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2.5">
              <li>
                <a href="#services" className="text-gray-400 hover:text-white flex items-center group">
                  <ArrowRight className="h-4 w-4 mr-2 transition-transform group-hover:translate-x-1" />
                  Our Services
                </a>
              </li>
              <li>
                <a href="#about" className="text-gray-400 hover:text-white flex items-center group">
                  <ArrowRight className="h-4 w-4 mr-2 transition-transform group-hover:translate-x-1" />
                  About Us
                </a>
              </li>
              <li>
                <a href="#team" className="text-gray-400 hover:text-white flex items-center group">
                  <ArrowRight className="h-4 w-4 mr-2 transition-transform group-hover:translate-x-1" />
                  Our Team
                </a>
              </li>
              <li>
                <a href="#contact" className="text-gray-400 hover:text-white flex items-center group">
                  <ArrowRight className="h-4 w-4 mr-2 transition-transform group-hover:translate-x-1" />
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="flex-shrink-0 w-full lg:w-auto max-w-[240px]">
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <ul className="space-y-2.5">
              <li className="flex items-center">
                <Clock className="h-5 w-5 text-blue-400 mr-3 flex-shrink-0" />
                <span className="text-gray-300">
                  24/7 Support Available
                </span>
              </li>
              <li className="flex items-center">
                <MessageSquare className="h-5 w-5 text-blue-400 mr-3 flex-shrink-0" />
                <span className="text-gray-300">
                  2-4 Hour Response Time
                </span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-blue-400 mr-3 flex-shrink-0" />
                <a href="mailto:inquiry@novorasolutions.com" className="text-gray-300 hover:text-white">
                  inquiry@novorasolutions.com
                </a>
              </li>
              <li className="flex items-center">
                <Globe2 className="h-5 w-5 text-blue-400 mr-3 flex-shrink-0" />
                <span className="text-gray-300">
                  Global Remote Services
                </span>
              </li>
            </ul>
          </div>

          {/* Newsletter Section */}
          <div className="flex-shrink-0 w-full lg:w-auto max-w-[320px]">
            <h4 className="text-lg font-semibold mb-4">Subscribe to Our Newsletter</h4>
            <p className="text-gray-400 text-sm mb-4">Stay updated with our latest news and updates</p>
            <NewsletterSubscription />
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-6 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © {currentYear} Novora Solutions. All rights reserved.
            </div>
            <div className="flex space-x-8 text-sm">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}