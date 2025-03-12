import React, { useEffect, useRef, useState } from 'react';
import { 
  Code2, 
  Brain, 
  Cloud, 
  Palette, 
  Shield, 
  LayoutTemplate 
} from 'lucide-react';

export function ExtendedTeam() {
  const extendedTeamRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cards = entry.target.querySelectorAll('.team-card');
            cards.forEach((card, index) => {
              card.classList.add('card-animate', `delay-${index}`);
            });
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: '0px'
      }
    );

    if (extendedTeamRef.current) {
      observer.observe(extendedTeamRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    
    // Get container dimensions and position
    const rect = containerRef.current.getBoundingClientRect();
    
    // Calculate mouse position relative to container (0-100%)
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    setMousePosition({ x, y });
  };

  // Calculate gradient angle based on mouse position
  const calculateGradientAngle = () => {
    // Default angle is 140deg when not hovering
    if (!isHovering) return 140;
    
    // Map x position (0-100) to angle (45-280)
    const angle = 45 + (mousePosition.x / 100) * 235;
    console.log(angle);
    return angle;
  };

  // Calculate RGB values based on mouse Y position
  const calculateRGBValues = () => {
    // Default values when not hovering
    if (!isHovering) {
      return {
        mid1: 'rgb(219, 234, 254)', // blue-100 - better matches the theme
        mid2: 'rgb(224, 231, 255)'  // indigo-100 - better matches the theme
      };
    }

    // Interpolate between RGB values based on mousePosition.y
    // For mid1: from lighter blue to darker blue (blue-100 to blue-200)
    const mid1R = Math.round(219 - (mousePosition.y / 100) * (219 - 191));
    const mid1G = Math.round(234 - (mousePosition.y / 100) * (234 - 219));
    const mid1B = Math.round(254 - (mousePosition.y / 100) * (254 - 254));
    
    // For mid2: from lighter indigo to darker indigo (indigo-100 to indigo-200)
    const mid2R = Math.round(224 - (mousePosition.y / 100) * (224 - 199));
    const mid2G = Math.round(231 - (mousePosition.y / 100) * (231 - 210));
    const mid2B = Math.round(255 - (mousePosition.y / 100) * (255 - 245));
    
    return {
      mid1: `rgb(${mid1R}, ${mid1G}, ${mid1B})`,
      mid2: `rgb(${mid2R}, ${mid2G}, ${mid2B})`
    };
  };

  // Calculate gradient colors based on mouse position
  const calculateGradient = () => {
    const angle = calculateGradientAngle();
    const rgbValues = calculateRGBValues();
    
    // Base colors
    const baseColors = {
      start: '#f9fafb',
      mid1: rgbValues.mid1,
      mid2: rgbValues.mid2,
      end: '#eef2ff'  // Updated to indigo-50 to better match theme
    };
    
    // Fixed positions for color stops
    const mid1Pos = 35;
    const mid2Pos = 65;
    
    return `linear-gradient(${angle}deg, ${baseColors.start} 0%, ${baseColors.mid1} ${mid1Pos}%, ${baseColors.mid2} ${mid2Pos}%, ${baseColors.end} 100%)`;
  };

  return (
    <div 
      ref={containerRef}
      className="rounded-xl shadow-lg p-8 mb-12 relative overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Custom gradient background with interactive effect */}
      <div 
        className="absolute inset-0 transition-all duration-300" 
        style={{
          backgroundColor: '#f8fafc', /* For browsers that do not support gradients - slate-50 */
          backgroundImage: calculateGradient(),
          transition: 'background-image 0.5s ease'
        }}
      ></div>
      
      <div className="relative z-10">
        <div className="text-center mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Extended Team</h3>
          <p className="text-gray-700 max-w-3xl mx-auto">
            Beyond our leadership, Novora Solutions is powered by a diverse team of talented developers, 
            designers, and technology experts. Our collaborative approach brings together specialists in:
          </p>
        </div>
        
        <div ref={extendedTeamRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="team-card p-6 rounded-lg border border-gray-400 bg-transparent">
            <div className="flex items-center mb-4">
              <div className="p-2 bg-blue-50 rounded-lg mr-4">
                <Code2 className="h-6 w-6 text-blue-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900">Full-Stack Development</h4>
            </div>
            <p className="text-gray-700">Expert developers crafting robust and scalable solutions using cutting-edge technologies.</p>
          </div>
          
          <div className="team-card p-6 rounded-lg border border-gray-400 bg-transparent">
            <div className="flex items-center mb-4">
              <div className="p-2 bg-blue-50 rounded-lg mr-4">
                <Brain className="h-6 w-6 text-blue-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900">AI & Machine Learning</h4>
            </div>
            <p className="text-gray-700">Specialists in AI integration, LLMs, and intelligent automation solutions.</p>
          </div>
          
          <div className="team-card p-6 rounded-lg border border-gray-400 bg-transparent">
            <div className="flex items-center mb-4">
              <div className="p-2 bg-blue-50 rounded-lg mr-4">
                <Cloud className="h-6 w-6 text-blue-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900">Cloud Architecture</h4>
            </div>
            <p className="text-gray-700">Cloud experts ensuring optimal performance, security, and scalability.</p>
          </div>
          
          <div className="team-card p-6 rounded-lg border border-gray-400 bg-transparent">
            <div className="flex items-center mb-4">
              <div className="p-2 bg-blue-50 rounded-lg mr-4">
                <Palette className="h-6 w-6 text-blue-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900">UI/UX Design</h4>
            </div>
            <p className="text-gray-700">Creative designers focused on crafting user-friendly, visually stunning, and intuitive digital experiences.</p>
          </div>
          
          <div className="team-card p-6 rounded-lg border border-gray-400 bg-transparent">
            <div className="flex items-center mb-4">
              <div className="p-2 bg-blue-50 rounded-lg mr-4">
                <Shield className="h-6 w-6 text-blue-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900">DevOps & Security</h4>
            </div>
            <p className="text-gray-700">Experts in CI/CD, cloud automation, and cybersecurity, ensuring smooth deployments and robust system security.</p>
          </div>
          
          <div className="team-card p-6 rounded-lg border border-gray-400 bg-transparent">
            <div className="flex items-center mb-4">
              <div className="p-2 bg-blue-50 rounded-lg mr-4">
                <LayoutTemplate className="h-6 w-6 text-blue-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900">Software Architecture</h4>
            </div>
            <p className="text-gray-700">Engineers defining the technical structure, MVP blueprints, and scalable system roadmaps tailored to business needs.</p>
          </div>
        </div>
      </div>
    </div>
  );
}