import React from 'react';
import { Linkedin } from 'lucide-react';
import { Values } from './team/Values';
import { JoinTeam } from './team/JoinTeam';
import { ExtendedTeam } from './team/ExtendedTeam';

const teamMembers = [
  {
    name: "Rishi Sankhla",
    role: "Director & CTO",
    image: "/images/rishi.jpeg",
    linkedin: "https://www.linkedin.com/rishisankhla/"
  },
  {
    name: "Shakti Singh",
    role: "Director & CEO",
    image: "/images/shakti_2.png",
    linkedin: "https://www.linkedin.com/in/shakti-singh-1175a210b/"
  },
  {
    name: "Rohan Sankhla",
    role: "Director & COO",
    image: "/images/rohan.jpeg",
    linkedin: "https://www.linkedin.com/rohansankhla/"
  }

];

export function Team() {
  return (
    <section id="team" className="pt-10 pb-4 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Leadership Team</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Meet the visionaries behind Novora Solutions, driving innovation and excellence in everything we do.
          </p>
        </div>

        {/* Team Member Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-16">
          {teamMembers.map((member, index) => (
            <div key={index} className="bg-white rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105">
              <div className="aspect-w-1 aspect-h-1 relative">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-64 object-cover"
                  onError={(e) => {
                    console.error(`Failed to load image for ${member.name}:`, e);
                    e.currentTarget.src = 'https://via.placeholder.com/400x400?text=Image+Not+Found';
                  }}
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-gray-600 mb-4">{member.role}</p>
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-blue-600 hover:text-blue-700"
                >
                  <Linkedin className="h-5 w-5 mr-2" />
                  <span>View Profile</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Extended Team Section */}
        <ExtendedTeam />

        {/* Closing Statement */}
        <div className="text-center mb-8">
          <p className="text-xl font-semibold text-blue-600">
            We don't just build teams—we bring together exceptional talent to transform your business challenges into innovative solutions.
          </p>
        </div>
      </div>
    </section>
  );
}