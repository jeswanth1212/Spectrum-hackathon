"use client"
// components/AboutSection.tsx
import React from 'react';
import { motion } from 'framer-motion';

const AboutSection: React.FC = () => {
  return (
    <section id="about" className="bg-black text-white py-24">
      <div className="relative z-10 container mx-auto px-4 md:px-8">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-7xl mb-4 text-center font-['Megrim'] text-white">
              ABOUT SPECTRUM
            </h2>
            
            <div className="h-1 w-24 bg-gradient-to-r from-purple-400 to-blue-500 mx-auto mb-8"></div>
            
            <p className="text-gray-300 text-xl text-center max-w-3xl mx-auto leading-relaxed">
              SPECTRUM isn&apos;t just a hackathon—it&apos;s a 24-hour innovation battlefield where technology meets entrepreneurship, and bold ideas become game-changing solutions.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-3 md:px-0 mx-auto max-w-lg md:max-w-none">
            <div className="timer-container relative mx-auto w-full">
              <div className="a l"></div>
              <div className="a r"></div>
              <div className="a t"></div>
              <div className="a b"></div>
              <div className="timer-content p-4 md:p-8">
                <div className="flex items-center mb-4">
                  <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/20">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </span>
                  <h3 className="text-2xl font-['Megrim'] ml-4">The Event</h3>
                </div>
                <p className="text-sm md:text-base text-gray-300 leading-relaxed">
                  Powered by OSPC x CSED, with Vertex Innovate as our community partner and backing from Blackbox AI, Unstop, and IBM Z, this electrifying event on April 11-12 is built to ignite disruptors.
                </p>
              </div>
              </div>
              
            <div className="timer-container relative mx-auto w-full">
              <div className="a l"></div>
              <div className="a r"></div>
              <div className="a t"></div>
              <div className="a b"></div>
              <div className="timer-content p-8">
                <div className="flex items-center mb-4">
                  <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/20">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </span>
                  <h3 className="text-2xl font-['Megrim'] ml-4">Our Approach</h3>
                </div>
                <p className="text-gray-300 leading-relaxed">
                  With high-impact tracks, SPECTRUM pushes participants to think like founders, build scalable solutions, and create real-world impact. But it&apos;s more than problem-solving—we&apos;re redefining hackathons with music, flash mobs, and immersive experiences.
                </p>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 px-3 md:px-0 mx-auto max-w-lg md:max-w-none">
            <div className="timer-container relative mx-auto w-full">
              <div className="a l"></div>
              <div className="a r"></div>
              <div className="a t"></div>
              <div className="a b"></div>
              <div className="timer-content p-8">
                <div className="flex items-center mb-4">
                  <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/20">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  </span>
                  <h3 className="text-2xl font-['Megrim'] ml-4">Innovation Battlefield</h3>
                </div>
                <p className="text-gray-300 leading-relaxed">
                  SPECTRUM brings together technology and entrepreneurship in a 24-hour innovation battlefield where bold ideas transform into game-changing solutions.
                </p>
                <div className="flex justify-end mt-4">
                  <a href="#" className="text-white flex items-center text-sm font-medium hover:text-gray-200 transition-colors">
                  Learn More
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            
            <div className="timer-container relative mx-auto w-full">
              <div className="a l"></div>
              <div className="a r"></div>
              <div className="a t"></div>
              <div className="a b"></div>
              <div className="timer-content p-8">
                <div className="flex items-center mb-4">
                  <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/20">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                  </span>
                  <h3 className="text-2xl font-['Megrim'] ml-4">Powerful Partnerships</h3>
                </div>
                <p className="text-gray-300 leading-relaxed">
                  Backed by OSPC x CSED, Vertex Innovate, Blackbox AI, Unstop, and IBM Z, SPECTRUM brings together industry leaders to support the next generation of innovators.
                </p>
                <div className="flex justify-end mt-4">
                  <a href="#" className="text-white flex items-center text-sm font-medium hover:text-gray-200 transition-colors">
                  Our Partners
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            
            <div className="timer-container relative mx-auto w-full">
              <div className="a l"></div>
              <div className="a r"></div>
              <div className="a t"></div>
              <div className="a b"></div>
              <div className="timer-content p-8">
                <div className="flex items-center mb-4">
                  <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/20">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  </span>
                  <h3 className="text-2xl font-['Megrim'] ml-4">IBM Z Speaker Session</h3>
                </div>
                <p className="text-gray-300 leading-relaxed">
                  IBM Z adds to the thrill with an exclusive speaker session, delivering expert insights, cutting-edge trends, and guidance to fuel your entrepreneurial journey.
                </p>
                <div className="flex justify-end mt-4">
                  <a href="#" className="text-white flex items-center text-sm font-medium hover:text-gray-200 transition-colors">
                  Session Details
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          {/* Call to Action Button */}
          <div className="flex justify-center mt-16">
            <a href="#" className="group relative inline-flex items-center justify-center px-8 py-4 overflow-hidden font-bold rounded-full bg-gradient-to-r from-white/80 to-white/60 text-gray-900 shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105">
              <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-white to-white/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="relative flex items-center">
                Get Ready to Build, Disrupt, and Celebrate Innovation
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </a>
          </div>
          
        </div>
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
export default AboutSection;