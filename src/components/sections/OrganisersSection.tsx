'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface Organizer {
  id: number;
  name: string;
  role: string;
  bio: string;
  imageUrl: string;
  socialLinks: {
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
}

const organizers: Organizer[] = [
  {
    id: 1,
    name: "OSPC",
    role: "Lead Organizer",
    bio: "The Open Source Programming Club at VIT Chennai is dedicated to fostering innovation through open source collaboration and building a vibrant tech community on campus.",
    imageUrl: "/ospc.png",
    socialLinks: {
      twitter: "https://twitter.com/ospcvitc",
      linkedin: "https://linkedin.com/company/ospcvitc",
      github: "https://github.com/ospcvitc"
    }
  },
  {
    id: 2,
    name: "CSED",
    role: "Co-Organizer",
    bio: "The Computer Science & Engineering Department at VIT Chennai provides cutting-edge education and research opportunities, supporting students in their technological and entrepreneurial endeavors.",
    imageUrl: "/csed.png",
    socialLinks: {
      twitter: "https://twitter.com/vitchennai",
      linkedin: "https://linkedin.com/school/vit-chennai"
    }
  },
  {
    id: 3,
    name: "Vertex Innovate",
    role: "Community Partner",
    bio: "Vertex Innovate serves as a catalyst for entrepreneurial excellence, connecting innovators with resources and mentorship to transform ideas into impactful ventures.",
    imageUrl: "/vertex.png",
    socialLinks: {
      twitter: "https://twitter.com/vertexinnovate",
      linkedin: "https://linkedin.com/company/vertexinnovate"
    }
  }
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3
    }
  }
};

const cardVariants = {
  hidden: { y: 50, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12
    }
  },
  hover: {
    y: -10,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10
    }
  }
};

const iconVariants = {
  hidden: { scale: 0 },
  visible: { 
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 500,
      damping: 15
    }
  },
  hover: { 
    scale: 1.2,
    transition: { duration: 0.2 }
  }
};

const OrganisersSection: React.FC = () => {
  return (
    <section id="organisers" className="bg-black text-white py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-7xl mb-4 text-center font-['Megrim'] text-white">
            MEET OUR ORGANISERS
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-purple-400 to-blue-500 mx-auto"></div>
          <p className="mt-6 text-gray-300 max-w-2xl mx-auto text-lg">
            SPECTRUM is powered by OSPC x CSED, with Vertex Innovate as our community partner, bringing together the best minds to create an electrifying innovation battlefield.
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto px-4 md:px-0"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {organizers.map((organizer) => (
            <motion.div
              key={organizer.id}
              className="timer-container relative mx-auto w-full max-w-lg md:max-w-none"
              variants={cardVariants}
              whileHover="hover"
            >
              <div className="a l"></div>
              <div className="a r"></div>
              <div className="a t"></div>
              <div className="a b"></div>
              <div className="timer-content p-6 md:p-6 p-4 bg-black">
                <div className="relative h-40 md:h-56 overflow-hidden bg-black">
                  <Image
                    src={organizer.imageUrl}
                    alt={organizer.name}
                    fill
                    style={{ 
                      objectFit: 'contain',
                      transform: organizer.name === "Vertex Innovate" ? 'scale(2.2)' : 'none',
                      objectPosition: 'center'
                    }}
                    className="transition-transform duration-500 hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    priority
                  />
                </div>
                
                <div className="mt-2 md:mt-4">
                  <h3 className="text-lg md:text-xl font-bold mb-1 md:mb-2">{organizer.name}</h3>
                  <p className="text-purple-400 font-medium mb-2 md:mb-3 text-xs md:text-sm">{organizer.role}</p>
                  <p className="text-gray-300 mb-3 md:mb-4 text-xs md:text-sm">{organizer.bio}</p>
                  
                  <div className="flex space-x-4">
                    {organizer.socialLinks.twitter && (
                      <motion.a
                        href={organizer.socialLinks.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-blue-400"
                        variants={iconVariants}
                        whileHover="hover"
                      >
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                        </svg>
                      </motion.a>
                    )}
                    
                    {organizer.socialLinks.linkedin && (
                      <motion.a
                        href={organizer.socialLinks.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-blue-600"
                        variants={iconVariants}
                        whileHover="hover"
                      >
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                      </motion.a>
                    )}
                    
                    {organizer.socialLinks.github && (
                      <motion.a
                        href={organizer.socialLinks.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-white"
                        variants={iconVariants}
                        whileHover="hover"
                      >
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                        </svg>
                      </motion.a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <filter id="unopaq">
          <feColorMatrix
            values="1 0 0 0 0 
                    0 1 0 0 0 
                    0 0 1 0 0 
                    0 0 0 3 0"
          ></feColorMatrix>
        </filter>
      </svg>

      <style jsx>{`
        .timer-container {
          position: relative;
          background: #111;
          width: 100%;
        }

        .timer-content {
          position: relative;
          z-index: 1;
          color: white;
        }

        .a {
          pointer-events: none;
          position: absolute;
          --w: 2px;
          --t: -40px;
          --s: calc(var(--t) * -1);
          --e: calc(100% + var(--t));
          --g: #fff0, #fff3 var(--s), #fffa var(--s), #fff, #fffa var(--e),
            #fff3 var(--e), #fff0;
        }

        .a::before {
          content: "";
          position: absolute;
          inset: 0;
          background: inherit;
          filter: blur(4px) url(#unopaq);
          z-index: -2;
        }

        .a::after {
          content: "";
          position: absolute;
          inset: 0;
          background: inherit;
          filter: blur(10px) url(#unopaq);
          opacity: 0;
          z-index: -2;
          transition: 0.3s;
        }

        .timer-container:hover .a::after {
          opacity: 1;
        }

        .l {
          left: -2px;
          background: linear-gradient(var(--g));
          top: var(--t);
          bottom: var(--t);
          width: var(--w);
        }

        .r {
          right: -2px;
          background: linear-gradient(var(--g));
          top: var(--t);
          bottom: var(--t);
          width: var(--w);
        }

        .t {
          top: -2px;
          background: linear-gradient(90deg, var(--g));
          left: var(--t);
          right: var(--t);
          height: var(--w);
        }

        .b {
          bottom: -2px;
          background: linear-gradient(90deg, var(--g));
          left: var(--t);
          right: var(--t);
          height: var(--w);
        }
      `}</style>
    </section>
  );
};

export default OrganisersSection;