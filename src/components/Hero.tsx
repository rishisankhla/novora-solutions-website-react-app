import React from 'react';
import { 
  Sparkles, 
  Rocket, 
  Brain, 
  Cloud,
  Code2,
  Database,
  Globe,
  Laptop,
  Server,
  Smartphone,
  Cpu,
  Wifi
} from 'lucide-react';

interface HeroProps {
  scrollProgress: number;
}

export function Hero({ scrollProgress }: HeroProps) {
  const scale = 1 + scrollProgress * 0.6;
  const opacity = Math.max(0, 1 - scrollProgress * 1.2);

  return (
    <section 
      className="h-screen pt-14 relative overflow-hidden flex items-center pointer-events-none"
      style={{
        opacity,
        transform: `scale(${scale})`,
        transition: 'transform 0.1s ease-out'
      }}
    >
      {/* Animated background with more dramatic fade and scale */}
      <div 
        className="absolute inset-0 animate-gradient bg-gradient-to-br from-blue-50 via-indigo-50 to-white -z-10"
        style={{
          opacity: Math.max(0, 1 - scrollProgress * 0.9),
          transform: `scale(${1 + scrollProgress * 0.4})`
        }}
      />
      
      {/* Floating icons with enhanced parallax effect */}
      <div className="absolute inset-0 overflow-hidden">
        <Sparkles 
          className="absolute top-[15%] left-[20%] text-blue-400 opacity-20 h-8 w-8 md:h-12 md:w-12 animate-float" 
          style={{ 
            animationDelay: '0s',
            transform: `translate(${scrollProgress * 200}px, ${scrollProgress * 150}px) rotate(${scrollProgress * 45}deg)`,
            opacity: 0.2 - scrollProgress * 0.15
          }} 
        />
        <Brain 
          className="absolute top-[25%] right-[25%] text-indigo-400 opacity-20 h-10 w-10 md:h-16 md:w-16 animate-float" 
          style={{ 
            animationDelay: '1s',
            transform: `translate(${scrollProgress * -160}px, ${scrollProgress * -120}px) rotate(${scrollProgress * -45}deg)`,
            opacity: 0.2 - scrollProgress * 0.15
          }} 
        />
        <Cloud 
          className="absolute top-[45%] left-[30%] text-blue-300 opacity-20 h-10 w-10 md:h-14 md:w-14 animate-float" 
          style={{ 
            animationDelay: '2s',
            transform: `translate(${scrollProgress * 160}px, ${scrollProgress * 160}px) rotate(${scrollProgress * 30}deg)`,
            opacity: 0.2 - scrollProgress * 0.15
          }} 
        />
        <Rocket 
          className="absolute top-[55%] right-[30%] text-indigo-300 opacity-20 h-8 w-8 md:h-12 md:w-12 animate-float" 
          style={{ 
            animationDelay: '3s',
            transform: `translate(${scrollProgress * -240}px, ${scrollProgress * -180}px) rotate(${scrollProgress * -30}deg)`,
            opacity: 0.2 - scrollProgress * 0.15
          }} 
        />
        <Code2 
          className="absolute top-[35%] left-[40%] text-blue-400 opacity-20 h-9 w-9 md:h-14 md:w-14 animate-float" 
          style={{ 
            animationDelay: '4s',
            transform: `translate(${scrollProgress * 180}px, ${scrollProgress * -140}px) rotate(${scrollProgress * 35}deg)`,
            opacity: 0.2 - scrollProgress * 0.15
          }} 
        />
        <Database 
          className="absolute top-[65%] left-[15%] text-indigo-400 opacity-20 h-8 w-8 md:h-12 md:w-12 animate-float" 
          style={{ 
            animationDelay: '5s',
            transform: `translate(${scrollProgress * -200}px, ${scrollProgress * 160}px) rotate(${scrollProgress * -40}deg)`,
            opacity: 0.2 - scrollProgress * 0.15
          }} 
        />
        <Globe 
          className="absolute top-[20%] right-[15%] text-blue-300 opacity-20 h-10 w-10 md:h-16 md:w-16 animate-float" 
          style={{ 
            animationDelay: '6s',
            transform: `translate(${scrollProgress * 220}px, ${scrollProgress * -170}px) rotate(${scrollProgress * 25}deg)`,
            opacity: 0.2 - scrollProgress * 0.15
          }} 
        />
        <Laptop 
          className="absolute top-[75%] right-[20%] text-indigo-300 opacity-20 h-9 w-9 md:h-14 md:w-14 animate-float" 
          style={{ 
            animationDelay: '7s',
            transform: `translate(${scrollProgress * -180}px, ${scrollProgress * 140}px) rotate(${scrollProgress * -35}deg)`,
            opacity: 0.2 - scrollProgress * 0.15
          }} 
        />
        <Server 
          className="absolute top-[40%] right-[40%] text-blue-400 opacity-20 h-8 w-8 md:h-12 md:w-12 animate-float" 
          style={{ 
            animationDelay: '8s',
            transform: `translate(${scrollProgress * 160}px, ${scrollProgress * -130}px) rotate(${scrollProgress * 40}deg)`,
            opacity: 0.2 - scrollProgress * 0.15
          }} 
        />
        <Smartphone 
          className="absolute top-[60%] left-[35%] text-indigo-400 opacity-20 h-9 w-9 md:h-14 md:w-14 animate-float" 
          style={{ 
            animationDelay: '9s',
            transform: `translate(${scrollProgress * -140}px, ${scrollProgress * 150}px) rotate(${scrollProgress * -25}deg)`,
            opacity: 0.2 - scrollProgress * 0.15
          }} 
        />
        <Cpu 
          className="absolute top-[30%] left-[10%] text-blue-300 opacity-20 h-8 w-8 md:h-12 md:w-12 animate-float" 
          style={{ 
            animationDelay: '10s',
            transform: `translate(${scrollProgress * 190}px, ${scrollProgress * -160}px) rotate(${scrollProgress * 35}deg)`,
            opacity: 0.2 - scrollProgress * 0.15
          }} 
        />
        <Wifi 
          className="absolute top-[70%] right-[10%] text-indigo-300 opacity-20 h-10 w-10 md:h-16 md:w-16 animate-float" 
          style={{ 
            animationDelay: '11s',
            transform: `translate(${scrollProgress * -170}px, ${scrollProgress * 130}px) rotate(${scrollProgress * -30}deg)`,
            opacity: 0.2 - scrollProgress * 0.15
          }} 
        />
      </div>

      <div className="w-[95%] mx-auto px-4 md:px-0">
        <div 
          className="text-center relative z-10 flex flex-col items-center gap-8 md:gap-12"
          style={{
            transform: `translateY(${scrollProgress * -100}px) scale(${1 - scrollProgress * 0.15})`,
            opacity: Math.max(0, 1 - scrollProgress * 1.2)
          }}
        >
          {/* Main heading with animated reveal */}
          <div className="animate-fade-in-up opacity-0" style={{ animationDelay: '0.2s' }}>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-gray-900 flex flex-col gap-2 md:gap-4">
              <span className="leading-tight">Turning Innovative Ideas Into</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 animate-gradient leading-tight pb-1">
                Digital Reality
              </span>
            </h1>
          </div>

          {/* Subheading with animated reveal */}
          <div className="animate-fade-in-up opacity-0" style={{ animationDelay: '0.4s' }}>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4 md:px-0">
              From AI-powered solutions to scalable cloud platforms, we empower businesses 
              with cutting-edge technology that drives growth, enhances efficiency, and 
              creates lasting impact. Let's build your digital success story together.
            </p>
          </div>

          {/* CTA buttons with animated reveal and pointer-events-auto */}
          <div className="animate-fade-in-up opacity-0 flex flex-col sm:flex-row gap-4 sm:space-x-4 w-full sm:w-auto pointer-events-auto px-4 sm:px-0" style={{ animationDelay: '0.6s' }}>
            <a 
              href="#contact" 
              className="w-full sm:w-auto inline-block bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg hover:shadow-lg hover:scale-105 transform transition-all duration-300 text-center"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Get Started
            </a>
            <a 
              href="#services" 
              className="w-full sm:w-auto inline-block bg-white text-blue-600 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg border-2 border-blue-600 hover:bg-blue-50 transition-colors duration-300 text-center"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Explore Services
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}