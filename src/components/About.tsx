import React from 'react';
import { Vision } from './about/Vision';
import { WhoWeAre } from './about/WhoWeAre';
import { OurApproach } from './about/OurApproach';

export function About() {
  return (
    <section id="about" className="py-24 bg-gradient-to-b from-gray-50 to-white">
      {/* Vision Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Vision />
      </div>

      {/* Who We Are Section - Full width */}
      <div className="mb-20">
        <WhoWeAre />
      </div>

      {/* Our Approach Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <OurApproach />
      </div>
    </section>
  );
}