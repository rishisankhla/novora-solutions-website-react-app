import React from 'react';
import { Target, Lightbulb, Rocket } from 'lucide-react';

const values = [
  {
    icon: <Target className="h-8 w-8 text-blue-600" />,
    title: "Mission-Driven",
    description: "We're committed to delivering exceptional software solutions that drive real business value and innovation."
  },
  {
    icon: <Lightbulb className="h-8 w-8 text-blue-600" />,
    title: "Innovation First",
    description: "Our team stays at the forefront of technology, constantly exploring new ways to solve complex challenges."
  },
  {
    icon: <Rocket className="h-8 w-8 text-blue-600" />,
    title: "Client Success",
    description: "Your success is our success. We partner closely with clients to ensure exceptional outcomes."
  }
];

export function Values() {
  return (
    <div className="text-center mb-12">
      <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Values</h3>
      <p className="text-gray-600 max-w-3xl mx-auto mb-12">
        At Novora Solutions, our values guide everything we do. They shape our culture, 
        drive our decisions, and ensure we deliver the best possible outcomes for our clients.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {values.map((value, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all">
            <div className="flex justify-center mb-4">
              {value.icon}
            </div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">{value.title}</h4>
            <p className="text-gray-600">{value.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}