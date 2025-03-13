'use client';

import React, { useState, useEffect } from 'react';

export default function ContactSection() {
  const [mounted, setMounted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  if (!mounted) {
    return null; // or a loading state
  }

  return (
    <section id="contact" className="min-h-screen pt-8 pb-16 bg-black text-white" suppressHydrationWarning>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <h2 className="text-center font-['Megrim'] text-white" style={{ fontSize: "4.3rem" }}>CONTACT US</h2>
        <div className="h-1 w-24 bg-gradient-to-r from-purple-400 to-blue-500 mx-auto mb-8" style={{ marginTop: "-1.5rem" }}></div>
        
        <div className="w-full sm:max-w-2xl mx-auto px-4 sm:px-0">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="timer-container">
              <div className="a l"></div>
              <div className="a r"></div>
              <div className="a t"></div>
              <div className="a b"></div>
              <div className="timer-content p-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-white/20 py-2 px-3 focus:outline-none focus:border-white/40 transition-colors"
                  required
                />
              </div>
            </div>

            <div className="timer-container">
              <div className="a l"></div>
              <div className="a r"></div>
              <div className="a t"></div>
              <div className="a b"></div>
              <div className="timer-content p-4">
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-white/20 py-2 px-3 focus:outline-none focus:border-white/40 transition-colors"
                  required
                />
              </div>
            </div>

            <div className="timer-container">
              <div className="a l"></div>
              <div className="a r"></div>
              <div className="a t"></div>
              <div className="a b"></div>
              <div className="timer-content p-4">
                <input
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-white/20 py-2 px-3 focus:outline-none focus:border-white/40 transition-colors"
                  required
                />
              </div>
            </div>

            <div className="timer-container">
              <div className="a l"></div>
              <div className="a r"></div>
              <div className="a t"></div>
              <div className="a b"></div>
              <div className="timer-content p-4">
                <textarea
                  name="message"
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full bg-transparent border-b border-white/20 py-2 px-3 focus:outline-none focus:border-white/40 transition-colors resize-none"
                  required
                ></textarea>
              </div>
            </div>

            <div className="flex justify-center">
              <button type="submit" className="button">
                <div className="a l"></div>
                <div className="a r"></div>
                <div className="a t"></div>
                <div className="a b"></div>
                <div className="text">Send Message</div>
              </button>
            </div>
          </form>
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
          min-height: 60px;
        }

        .timer-content {
          position: relative;
          z-index: 1;
          color: white;
          width: 100%;
        }

        .button {
          position: relative;
          cursor: pointer;
          border: none;
          padding: 0.75rem 2rem;
          background: #111;
          color: #fff;
          min-width: 160px;
          font-size: 0.875rem;
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

        .timer-container:hover .a::after,
        .button:hover .a::after {
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

        input, textarea {
          background: transparent;
          color: white;
          width: 100%;
        }

        input::placeholder, textarea::placeholder {
          color: rgba(255, 255, 255, 0.5);
        }

        input:focus, textarea:focus {
          outline: none;
        }
      `}</style>
    </section>
  );
} 