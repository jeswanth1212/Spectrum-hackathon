'use client';

import React, { useState } from 'react';

interface FAQ {
  question: string;
  answer: string;
}

export default function FAQsSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const faqs: FAQ[] = [
    {
      question: "What is a Hackathon?",
      answer: "A hackathon is like a coding marathon—except instead of running, you sit in front of a screen for hours, fueled by caffeine and desperation, trying to build something cool before the deadline."
    
     },
    {question: "When and where is the hackathon taking place?",
      answer: "The ultimate battle of brains will happen at MG Auditorium, VIT Chennai on April 11-12. Mark your calendars and start stocking up on energy drinks!"
    
       },
    {
      question: "What's the team size?",
      answer: "Teams can have 2 to 4 members. Enough to divide work, but not enough to blame too many people when things break!"
    },
    { question: "Is it necessary for participants to be from the same university?",
      answer: "Nope! You can team up with anyone—friends, strangers, or that one coding wizard you met on Discord at 3 AM. As long as you build something cool, we don't care where you came from!"
   },
    {
      question: "What if I don't know how to code?",
      answer: "No worries! Hackathons are 10% coding, 90% Googling. Plus, teamwork makes the dream work!"
    },
    {
      question: "Will there be food?",
      answer: "Absolutely! We believe great code is written on a full stomach (and with plenty of caffeine)."
    },
    {
      question: "Who can participate?",
      answer: "If you can type on a keyboard, you're in! Students, professionals, beginners, experts, and even that one friend who just joined for the free food—everyone's welcome!"
    }
  ];

  return (
    <section id="faqs" className="min-h-screen pt-8 pb-16 bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-center font-['Megrim'] text-white" style={{ fontSize: "4.3rem" }}>FAQs</h2>
        <div className="h-1 w-24 bg-gradient-to-r from-purple-400 to-blue-500 mx-auto mb-8" style={{ marginTop: "-1.5rem" }}></div>
        <div className="flex flex-col gap-4 md:gap-6 max-w-4xl mx-auto">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="timer-container"
              onClick={() => setActiveIndex(activeIndex === index ? null : index)}
            >
              <div className="a l"></div>
              <div className="a r"></div>
              <div className="a t"></div>
              <div className="a b"></div>
              <div className="timer-content">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg md:text-xl font-medium pr-8">{faq.question}</h3>
                  <span className={`transform transition-transform duration-300 ${activeIndex === index ? 'rotate-180' : ''}`}>
                    ▼
                  </span>
                </div>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    activeIndex === index ? 'max-h-96 mt-4 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <p className="text-gray-300">{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
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
          padding: 1.5rem;
          cursor: pointer;
        }

        .timer-content {
          position: relative;
          z-index: 1;
          color: white;
          width: 100%;
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
} 

