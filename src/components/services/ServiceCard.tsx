import React from 'react';
import {
  Globe,
  Smartphone,
  Brain,
  Rocket,
  Code2,
  Cloud,
} from 'lucide-react';

export interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  techStack?: string[];
  features?: string[];
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, icon, techStack, features }) => (
  <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 sm:p-8 transition-all duration-300 hover:shadow-xl border border-gray-100 hover:bg-white h-full flex flex-col">
    <div className="text-blue-600 mb-4 sm:mb-6">{icon}</div>
    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">{title}</h3>
    <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">{description}</p>
    {features && (
      <ul className="space-y-2 sm:space-y-3 mb-4 sm:mb-6 flex-grow">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start text-sm sm:text-base">
            <div className="flex-shrink-0 h-5 w-5 text-blue-600 mr-2">•</div>
            <span className="text-gray-600">{feature}</span>
          </li>
        ))}
      </ul>
    )}
    {techStack && (
      <div className="mt-auto pt-4 border-t border-gray-100">
        <h4 className="text-xs sm:text-sm font-semibold text-gray-700 mb-2">Tech Stack</h4>
        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {techStack.map((tech, index) => (
            <span
              key={index}
              className="px-2 sm:px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs sm:text-sm font-medium"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    )}
  </div>
);

export const mainServices = [
  {
    icon: <Globe className="h-8 w-8 sm:h-10 sm:w-10" />,
    title: "Web App Development",
    description: "Powerful, scalable, and secure web applications tailored for your business needs. We create solutions that drive growth and enhance user experience.",
    features: [
      "Custom Web Applications – High-performance, user-friendly web apps that enhance customer experience",
      "SaaS Development – Launch your software-as-a-service platform with our expertise in cloud-based solutions",
      "Progressive Web Apps (PWAs) – Get fast, offline-capable, and mobile-friendly web applications",
      "Enterprise Solutions – Automate workflows and optimize operations with our custom enterprise software"
    ],
    techStack: ["React", "Next.js", "Node.js", "Python", "FastAPI", "MongoDB", "PostgreSQL"]
  },
  {
    icon: <Smartphone className="h-8 w-8 sm:h-10 sm:w-10" />,
    title: "Mobile App Development",
    description: "Seamless mobile experiences for iOS and Android platforms. We build engaging mobile applications that connect with your users.",
    features: [
      "Native & Cross-Platform Apps – We build mobile apps using React Native, Flutter, and native technologies",
      "MVP to Scalable Apps – Whether you need an MVP or a full-scale mobile app, we handle everything",
      "App Store & Play Store Optimization – Ensure smooth deployment and visibility in app stores",
      "Mobile-First Design – Create intuitive and responsive mobile experiences"
    ],
    techStack: ["React Native", "Flutter", "Swift", "Kotlin", "Firebase"]
  },
  {
    icon: <Brain className="h-8 w-8 sm:h-10 sm:w-10" />,
    title: "AI & ML Solutions",
    description: "Harness the power of AI Agents, LLMs, and intelligent automation to transform your business operations and decision-making processes.",
    features: [
      "AI Agents & Custom AI Platforms – Build autonomous systems that automate tasks and enhance decision-making",
      "LLM-Powered Solutions – Integrate OpenAI, Google Gemini, or open-source LLMs for chatbots, automation, and content generation",
      "RAG & AI-Powered Search – Enable real-time, context-aware AI responses and smart search capabilities",
      "Computer Vision & Speech AI – Implement image recognition, voice assistants, and AI-driven analytics"
    ],
    techStack: ["OpenAI", "Google Gemini", "LangChain", "FastAPI", "Pinecone", "TensorFlow"]
  },
  {
    icon: <Rocket className="h-8 w-8 sm:h-10 sm:w-10" />,
    title: "MVP Development for Startups",
    description: "Turn your startup idea into a working product – fast and efficiently. We help founders validate their ideas and get to market quickly.",
    features: [
      "Rapid Prototyping – Get a functional prototype to test and validate your idea",
      "Scalable MVPs – We build MVPs that are ready for real users and investors",
      "End-to-End Development – From ideation to launch, we handle everything",
      "Startup Mentoring – Get guidance on technical decisions and scaling strategies"
    ],
    techStack: ["MERN Stack", "Python", "Firebase", "AWS", "Stripe", "WebSockets"]
  },
  {
    icon: <Code2 className="h-8 w-8 sm:h-10 sm:w-10" />,
    title: "Full-Stack Product Development",
    description: "Complete software solutions from frontend to backend. We create comprehensive digital products that solve real business challenges.",
    features: [
      "Frontend & Backend Development – We create smooth UI/UX and robust backend systems",
      "API Development & Integration – Secure, scalable APIs for seamless connectivity",
      "Database Design & Optimization – Efficient data structures and query optimization",
      "Testing & Quality Assurance – Comprehensive testing for reliable software"
    ],
    techStack: ["React", "Next.js", "Node.js", "Express", "MongoDB", "PostgreSQL", "Docker", "Kubernetes"]
  },
  {
    icon: <Cloud className="h-8 w-8 sm:h-10 sm:w-10" />,
    title: "Cloud & DevOps Solutions",
    description: "Optimize performance, security, and scalability with cutting-edge cloud and DevOps solutions. We help businesses modernize their infrastructure.",
    features: [
      "Cloud Infrastructure – Deploy, manage, and scale applications on AWS, Google Cloud, or Azure",
      "CI/CD Automation – Implement continuous integration and deployment pipelines for seamless updates",
      "Containerization & Microservices – Use Docker and Kubernetes for efficient and scalable application architecture",
      "Serverless Computing – Reduce costs and improve efficiency with serverless functions and cloud-native solutions"
    ],
    techStack: ["AWS", "Google Cloud", "Azure", "Docker", "Kubernetes", "Terraform", "CI/CD"]
  }
];