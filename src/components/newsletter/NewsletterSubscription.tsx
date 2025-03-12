import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import toast from 'react-hot-toast';

export function NewsletterSubscription() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await emailjs.send(
        'service_ysqmorx', // Newsletter service ID
        'template_oeq3v0u', // Newsletter template ID
        {
          to_email: 'contact@novorasolutions.com',
          from_email: email,
          from_name: 'This is from newsletter subscription',
          subject: 'New Newsletter Subscription',
          message: `New subscription request from: ${email}`,
        },
        'VvayPoq7kqtqoC4kl' // Newsletter public key
      );

      toast.success('Successfully subscribed to newsletter!');
      setEmail('');
    } catch (error) {
      console.error('Newsletter subscription failed:', error);
      toast.error('Failed to subscribe. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="relative">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 text-gray-300"
        />
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Subscribing...' : 'Subscribe'}
      </button>
    </form>
  );
}