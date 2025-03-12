import React from 'react';
import { Rocket, Workflow, Layers } from 'lucide-react';
import { ServiceCard, mainServices } from './services/ServiceCard';

export function Services() {
  return (
    <section id="services" className="py-16 sm:py-24 relative">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 via-indigo-50/30 to-white pointer-events-none"></div>
      
      {/* Mesh gradient overlay */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_50%_50%,rgba(63,94,251,0.2),rgba(252,70,107,0.1))]"></div>

      <div className="w-[95%] mx-auto relative">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">Our Services</h2>
          <p className="text-base sm:text-xl text-gray-600 max-w-3xl mx-auto">
            At Novora Solutions, we bring innovative ideas to life through cutting-edge technology. 
            Whether you're a startup or an established business, we build scalable and high-performing 
            software tailored to your needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
          {mainServices.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>

        {/* Why Choose Us section with max-w-7xl */}
        <div className="mt-16 sm:mt-20 max-w-7xl mx-auto">
          <div className="text-center">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 sm:mb-8">Why Choose Novora Solutions?</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-8">
              <div className="bg-white/80 backdrop-blur-sm p-4 sm:p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
                <Rocket className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600 mx-auto mb-3 sm:mb-4" />
                <h4 className="text-base sm:text-lg font-semibold mb-2">Startup-Friendly Approach</h4>
                <p className="text-sm sm:text-base text-gray-600">We help founders turn ideas into reality</p>
              </div>
              <div className="bg-white/80 backdrop-blur-sm p-4 sm:p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
                <Workflow className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600 mx-auto mb-3 sm:mb-4" />
                <h4 className="text-base sm:text-lg font-semibold mb-2">End-to-End Development</h4>
                <p className="text-sm sm:text-base text-gray-600">From concept to launch, we handle everything</p>
              </div>
              <div className="bg-white/80 backdrop-blur-sm p-4 sm:p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
                <Layers className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600 mx-auto mb-3 sm:mb-4" />
                <h4 className="text-base sm:text-lg font-semibold mb-2">Future-Proof Tech</h4>
                <p className="text-sm sm:text-base text-gray-600">We use the latest frameworks and cloud technologies</p>
              </div>
            </div>
          </div>

          <div className="mt-12 sm:mt-16 text-center">
            <a
              href="#contact"
              className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 border border-transparent text-base sm:text-lg font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              Let's Build Something Amazing Together
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}