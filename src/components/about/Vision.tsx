import React from 'react';

export function Vision() {
  return (
    <div className="mb-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="text-center lg:text-left">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Vision</h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            At Novora Solutions, we believe that technology has the power to turn ideas into reality. 
            Our mission is to empower startups, businesses, and enterprises with cutting-edge software 
            solutions that drive growth, efficiency, and innovation.
          </p>
          <p className="text-xl text-gray-600 mt-4 leading-relaxed">
            Whether it's a web app, mobile application, AI-powered platform, or a full-stack product, 
            we help businesses bring their digital vision to life with seamless execution and future-proof technology.
          </p>
          <p className="text-xl font-semibold text-blue-600 mt-6">
            We don't just build software—we build scalable, high-performance products that solve real-world problems and create impact.
          </p>
        </div>
        <div className="relative group">
          {/* Background image with rotation */}
          <div className="absolute inset-0 transform rotate-3 group-hover:rotate-6 transition-transform duration-300">
            <img
              src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80"
              alt="Digital technology background"
              className="rounded-2xl w-full h-full object-cover opacity-80"
            />
          </div>
          
          {/* Foreground image */}
          <img
            src="https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?auto=format&fit=crop&q=80"
            alt="Modern tech workspace"
            className="relative rounded-2xl shadow-xl w-full transform -rotate-3 group-hover:-rotate-6 transition-transform duration-300 object-cover aspect-4/3"
          />
        </div>
      </div>
    </div>
  );
}