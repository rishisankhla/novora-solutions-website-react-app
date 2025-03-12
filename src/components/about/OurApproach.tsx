import React from 'react';
import { Target, Users, Shield, Zap, CheckCircle } from 'lucide-react';

export function OurApproach() {
  return (
    <div>
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Approach</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
          <Target className="h-10 w-10 text-blue-600 mb-6" />
          <h3 className="text-xl font-bold text-gray-900 mb-4">Client-Centric Development</h3>
          <p className="text-gray-600 mb-4">
            We work closely with clients to understand their unique challenges and create tailored solutions.
          </p>
          <div className="flex items-center text-gray-600">
            <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
            <span>Personalized solutions for your business needs</span>
          </div>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
          <Zap className="h-10 w-10 text-blue-600 mb-6" />
          <h3 className="text-xl font-bold text-gray-900 mb-4">Agile & Scalable</h3>
          <p className="text-gray-600 mb-4">
            We follow agile methodologies, ensuring flexibility and scalability in every project.
          </p>
          <div className="flex items-center text-gray-600">
            <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
            <span>Adaptable solutions that grow with your business</span>
          </div>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
          <Shield className="h-10 w-10 text-blue-600 mb-6" />
          <h3 className="text-xl font-bold text-gray-900 mb-4">Quality & Security First</h3>
          <p className="text-gray-600 mb-4">
            We adhere to the best coding practices, security protocols, and DevOps automation to deliver robust software.
          </p>
          <div className="flex items-center text-gray-600">
            <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
            <span>Secure and reliable solutions you can trust</span>
          </div>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
          <Users className="h-10 w-10 text-blue-600 mb-6" />
          <h3 className="text-xl font-bold text-gray-900 mb-4">Future-Ready Tech Stack</h3>
          <p className="text-gray-600 mb-4">
            We stay ahead of the curve by leveraging the latest in AI, cloud computing, and modern development frameworks.
          </p>
          <div className="flex items-center text-gray-600">
            <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
            <span>Innovation-driven development approach</span>
          </div>
        </div>
      </div>

      <div className="text-center mt-16">
        <p className="text-xl font-semibold text-blue-600 mb-8">
          At Novora Solutions, we don't just develop software—we create digital success stories. Let's build yours.
        </p>
        <a
          href="#contact"
          className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-semibold rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors"
        >
          Ready to start? Get in touch with us today!
        </a>
      </div>
    </div>
  );
}