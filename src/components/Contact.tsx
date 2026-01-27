import React, { useState, FormEvent } from 'react';
import { Clock, Mail, Globe2, MessageSquare } from 'lucide-react';
import emailjs from '@emailjs/browser';
import toast, { Toaster } from 'react-hot-toast';

interface FormData {
  name: string;
  email: string;
  message: string;
}

export function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await emailjs.send(
        'service_c48vc59', // Contact form service ID
        'template_oeq3v0u', // Contact form template ID
        {
          to_email: 'inquiry@novorasolutions.com',
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        },
        'VvayPoq7kqtqoC4kl' // Contact form public key
      );

      toast.success('Message sent successfully!');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
      console.error('Email sending failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <Toaster position="top-right" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Contact Us</h2>
          <p className="text-gray-600">Get in touch to discuss how we can help your business</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div className="flex items-center">
              <Clock className="h-6 w-6 text-blue-600 mr-4" />
              <div>
                <h4 className="font-semibold text-gray-900">24/7 Availability</h4>
                <p className="text-gray-600">Our team is available round the clock to assist you</p>
              </div>
            </div>
            <div className="flex items-center">
              <MessageSquare className="h-6 w-6 text-blue-600 mr-4" />
              <div>
                <h4 className="font-semibold text-gray-900">Quick Response</h4>
                <p className="text-gray-600">We typically respond within 2-4 business hours</p>
              </div>
            </div>
            <div className="flex items-center">
              <Mail className="h-6 w-6 text-blue-600 mr-4" />
              <div>
                <h4 className="font-semibold text-gray-900">Email</h4>
                <a href="mailto:inquiry@novorasolutions.com" className="text-gray-600 hover:text-blue-600 transition-colors">
                  inquiry@novorasolutions.com
                </a>
              </div>
            </div>
            <div className="flex items-center">
              <Globe2 className="h-6 w-6 text-blue-600 mr-4" />
              <div>
                <h4 className="font-semibold text-gray-900">Global Service</h4>
                <p className="text-gray-600">Supporting clients worldwide with remote collaboration</p>
              </div>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              />
            </div>
            <div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              />
            </div>
            <div>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your Message"
                required
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              ></textarea>
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}