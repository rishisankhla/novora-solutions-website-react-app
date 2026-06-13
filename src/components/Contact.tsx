import { useState, FormEvent, useRef } from 'react';
import { Clock, Mail, Globe2, MessageSquare, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';
import { FormField, FormInput, FormTextarea } from './ui/FormField';
import { Button } from './ui/Button';
import { Section } from './ui/Section';
import { SocialLinks } from './brand/SocialLinks';
import { publicApi } from '../lib/api';

interface FormData {
  name: string;
  email: string;
  message: string;
}

const TRUST_POINTS = [
  {
    icon: MessageSquare,
    title: 'Quick response',
    description: 'We typically reply within 2–4 business hours.',
  },
  {
    icon: Clock,
    title: 'Flexible engagement',
    description: 'Project-based, retainer, or dedicated team models.',
  },
  {
    icon: Mail,
    title: 'Direct line',
    description: 'inquiry@novorasolutions.com',
    href: 'mailto:inquiry@novorasolutions.com',
  },
  {
    icon: Globe2,
    title: 'Global delivery',
    description: 'Remote-first collaboration across time zones.',
  },
];

export function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const honeypotRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await publicApi.submitContact({
        name: formData.name,
        email: formData.email,
        message: formData.message,
        honeypot: honeypotRef.current?.value ?? '',
      });

      toast.success('Message sent successfully!');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Failed to send message. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Section className="bg-surface-soft">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 lg:items-stretch">
        <div className="lg:col-span-2 flex">
          <div className="relative overflow-hidden rounded-4xl bg-ink text-white p-8 sm:p-10 w-full flex flex-col min-h-full">
            <div className="absolute inset-0 bg-mesh-dark opacity-80" aria-hidden />
            <div className="relative flex flex-col flex-1">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-300 mb-4">
                Why reach out
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4 text-balance">
                Let's talk about what you're building
              </h2>
              <p className="text-slate-300 leading-relaxed mb-8">
                Share your goals, timeline, and constraints. We'll respond with honest feedback —
                whether we're the right fit or not.
              </p>

              <ul className="space-y-5">
                {TRUST_POINTS.map((point) => {
                  const Icon = point.icon;
                  return (
                    <li key={point.title} className="flex gap-4">
                      <div className="flex-shrink-0 p-2 rounded-xl bg-white/10">
                        <Icon className="h-5 w-5 text-brand-300" aria-hidden />
                      </div>
                      <div>
                        <p className="font-semibold text-white">{point.title}</p>
                        {point.href ? (
                          <a
                            href={point.href}
                            className="text-sm text-slate-300 hover:text-white transition-colors"
                          >
                            {point.description}
                          </a>
                        ) : (
                          <p className="text-sm text-slate-300">{point.description}</p>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ul>

              <div className="mt-auto pt-8 border-t border-white/10">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-300 mb-4">
                  Follow us
                </p>
                <SocialLinks />
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-3 flex">
          <form
            onSubmit={handleSubmit}
            className="card-premium p-6 sm:p-8 lg:p-10 space-y-6 w-full flex flex-col min-h-full"
            noValidate
          >
            <input
              ref={honeypotRef}
              type="text"
              name="website"
              className="hidden"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden
            />

            <div>
              <h3 className="text-xl font-bold text-ink mb-1">Send a message</h3>
              <p className="text-sm text-ink-muted">All fields are required.</p>
            </div>

            <FormField id="contact-name" label="Your name" required>
              <FormInput
                id="contact-name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                required
                autoComplete="name"
                placeholder="Jane Smith"
              />
            </FormField>

            <FormField id="contact-email" label="Work email" required>
              <FormInput
                id="contact-email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                autoComplete="email"
                placeholder="jane@company.com"
              />
            </FormField>

            <FormField id="contact-message" label="Project details" required>
              <FormTextarea
                id="contact-message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                placeholder="Tell us about your product, timeline, and what success looks like..."
              />
            </FormField>

            <Button type="submit" className="w-full sm:w-auto mt-auto" disabled={isSubmitting}>
              {isSubmitting ? 'Sending…' : 'Send message'}
              {!isSubmitting && <ArrowRight className="h-4 w-4" />}
            </Button>
          </form>
        </div>
      </div>
    </Section>
  );
}
