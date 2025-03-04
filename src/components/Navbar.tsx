'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

const navItems = [
  { name: 'About Us', href: '#about' },
  { name: 'Tracks', href: '#tracks' },
  { name: 'Timeline', href: '#timeline' },
  { name: 'Prizes', href: '#prizes' },
  { name: 'Sponsors', href: '#sponsors' },
  { name: 'Organisers', href: '#organisers' },
  { name: 'FAQs', href: '#faqs' },
  { name: 'Contact Us', href: '#contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  useEffect(() => {
    const handleScrollSpy = () => {
      const sections = navItems.map(item => item.href.replace('#', ''));
      
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScrollSpy);
    return () => window.removeEventListener('scroll', handleScrollSpy);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-sm text-white shadow-md">
      <style jsx>{`
        .nav-link {
          position: relative;
          cursor: pointer;
          background: transparent;
          color: #fff;
        }

        .nav-link-text {
          position: relative;
          z-index: 1;
        }

        .border-glow {
          pointer-events: none;
          position: absolute;
          opacity: 0;
          --w: 2px;
          --t: -40px;
          --s: calc(var(--t) * -1);
          --e: calc(100% + var(--t));
          --g: #fff0, #fff3 var(--s), #fffa var(--s), #fff, #fffa var(--e),
            #fff3 var(--e), #fff0;
          transition: opacity 0.3s ease;
        }

        .nav-link:hover .border-glow {
          opacity: 1;
        }

        .border-glow::before {
          content: "";
          position: absolute;
          inset: 0;
          background: inherit;
          filter: blur(4px);
          z-index: -2;
        }

        .border-glow::after {
          content: "";
          position: absolute;
          inset: 0;
          background: inherit;
          filter: blur(10px);
          z-index: -2;
        }

        .border-left {
          left: -2px;
          background: linear-gradient(var(--g));
          top: var(--t);
          bottom: var(--t);
          width: var(--w);
        }

        .border-right {
          right: -2px;
          background: linear-gradient(var(--g));
          top: var(--t);
          bottom: var(--t);
          width: var(--w);
        }

        .border-top {
          top: -2px;
          background: linear-gradient(90deg, var(--g));
          left: var(--t);
          right: var(--t);
          height: var(--w);
        }

        .border-bottom {
          bottom: -2px;
          background: linear-gradient(90deg, var(--g));
          left: var(--t);
          right: var(--t);
          height: var(--w);
        }
      `}</style>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0 flex items-center space-x-4">
              <Image src="/csed.png" alt="CSED Logo" width={60} height={60} className="h-14 w-auto" />
              <Image src="/ospc.png" alt="OSPC Logo" width={60} height={60} className="h-14 w-auto" />
            </div>
          </div>
          
          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleScroll(e, item.href)}
                className={`nav-link px-3 py-2 rounded-md text-sm font-medium ${
                  activeSection === item.href.replace('#', '') ? 'text-purple-400' : 'text-gray-300'
                }`}
              >
                <span className="nav-link-text">{item.name}</span>
                <div className="border-glow border-left"></div>
                <div className="border-glow border-right"></div>
                <div className="border-glow border-top"></div>
                <div className="border-glow border-bottom"></div>
              </a>
            ))}
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white focus:outline-none"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-black/50 backdrop-blur-sm">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleScroll(e, item.href)}
                className={`nav-link block px-3 py-2 rounded-md text-base font-medium ${
                  activeSection === item.href.replace('#', '') ? 'text-purple-400' : 'text-gray-300'
                }`}
              >
                <span className="nav-link-text">{item.name}</span>
                <div className="border-glow border-left"></div>
                <div className="border-glow border-right"></div>
                <div className="border-glow border-top"></div>
                <div className="border-glow border-bottom"></div>
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
} 