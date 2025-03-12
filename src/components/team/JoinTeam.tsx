import React from 'react';

export function JoinTeam() {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-8 text-center text-white">
      <h3 className="text-2xl font-bold mb-4">Join Our Team</h3>
      <p className="max-w-2xl mx-auto mb-6">
        We're always looking for talented individuals who share our passion for innovation 
        and excellence. Join us in building the future of technology.
      </p>
      <a
        href="#contact"
        className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
        onClick={(e) => {
          e.preventDefault();
          document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
        }}
      >
        Get in Touch
      </a>
    </div>
  );
}