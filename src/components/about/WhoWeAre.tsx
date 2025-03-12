import React from 'react';
import { Rocket, Brain, Code2 } from 'lucide-react';
 
export function WhoWeAre() {
  return (
    <div className="relative">
      {/* Tech background with increased opacity and overlay */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-white/95" /> {/* Increased white overlay from 90% to 95% */}
        <img 
          src="/images/bg1.jpeg"
          alt="Technology Background"
          className="w-full h-full object-cover opacity-75 blur-[1px]" /* Added blur and reduced opacity */
        />
      </div> 

      {/* Content container with glass effect */}
      <div className="relative py-16 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Who We Are</h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Based in the United States, Novora Solutions is a team of experienced developers, AI engineers, cloud specialists, and product strategists committed to delivering world-class digital solutions. We combine technical expertise with a deep understanding of business needs to create tailored software that drives success, serving clients across America and globally.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="bg-white/50 backdrop-blur-sm p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group border border-blue-100/30 hover:bg-white/60">
              <Rocket className="h-12 w-12 text-blue-600 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold text-gray-900 mb-4">Startup-Enablers</h3>
              <p className="text-gray-700">
                We specialize in MVP development, helping founders transform their ideas into market-ready products.
              </p>
            </div>
            <div className="bg-white/50 backdrop-blur-sm p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group border border-blue-100/30 hover:bg-white/60">
              <Brain className="h-12 w-12 text-blue-600 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold text-gray-900 mb-4">AI & Innovation-Driven</h3>
              <p className="text-gray-700">
                We build AI agents, LLM-powered solutions, and intelligent automation systems to keep businesses ahead of the curve.
              </p>
            </div>
            <div className="bg-white/50 backdrop-blur-sm p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group border border-blue-100/30 hover:bg-white/60">
              <Code2 className="h-12 w-12 text-blue-600 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold text-gray-900 mb-4">Full-Stack Experts</h3>
              <p className="text-gray-700">
                Our team covers everything from frontend and backend development to cloud, DevOps, and security.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}