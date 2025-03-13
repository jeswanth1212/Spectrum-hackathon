'use client';

import React from 'react';
import './TracksSection.css';
import Image from 'next/image';

type Track = {
  title: string;
  description: string;
  outcome: string;
} & (
  | { image: string }
  | { images: { left: string; right: string } }
);

export default function TracksSection() {
  const tracks: Track[] = [
    {
      title: "Blockchain & Decentralized Solutions",
      description: "Foster entrepreneurship through blockchain-driven, secure, and transparent business solutions.",
      outcome: "Innovative solutions in finance, governance, and digital security.",
      image: "/tracks/block.jpg"
    },
    {
      title: "AgriTech & MedTech",
      description: "Encourage entrepreneurial innovation in agriculture and healthcare using AI and IoT.",
      outcome: "Enhanced food security, precision farming, and accessible healthcare.",
      images: {
        left: "/tracks/agri.jpg",
        right: "/tracks/med.png"
      }
    },
    {
      title: "EdTech & Smart Learning",
      description: "Promote entrepreneurship in education through AI-driven and adaptive learning technologies.",
      outcome: "Improved learning accessibility, engagement, and skill development.",
      image: "/tracks/ed.avif"
    },
    {
      title: "Sustainability & Social Well-Being",
      description: "Inspire entrepreneurship for sustainability-focused and socially impactful tech solutions.",
      outcome: "Advancements in environmental conservation, clean energy, and social well-being.",
      images: {
        left: "/tracks/sust.webp",
        right: "/tracks/soc.jpg"
      }
    },
    {
      title: "IoT & Smart Technologies",
      description: "Enable entrepreneurship in smart tech through AI-powered, connected, and intelligent devices.",
      outcome: "Smarter automation, predictive analytics, and efficient infrastructure.",
      image: "/tracks/iot.jpg"
    },
    {
      title: "Open Innovation",
      description: "Cultivate an entrepreneurial mindset for groundbreaking, cross-domain tech innovations.",
      outcome: "Disruptive solutions addressing real-world challenges creatively.",
      image: "/tracks/open.jpg"
    },
  ];

  const [activeIndex, setActiveIndex] = React.useState(0);

  return (
    <section id="tracks" className="tracks-section bg-black text-white py-16">
      <div className="w-full">
        <h2 className="text-center font-['Megrim'] text-white" style={{ fontSize: "4.5rem" }}>TRACKS</h2>
        <div className="h-1 w-24 bg-gradient-to-r from-purple-400 to-blue-500 mx-auto mb-16" style={{ marginTop: "-1.5rem" }}></div>
        <div className="tracks-container mx-auto px-4">
          <ul
            id="tracks-list"
            className="tracks-container grid gap-2 list-none p-0 m-0 w-[90vw] sm:w-[95vw] md:w-[820px] mx-auto"
            style={{
              gridTemplateColumns: tracks.map((_, i) => i === activeIndex ? '10fr' : '1fr').join(' '),
            }}
          >
            {tracks.map((track, index) => (
              <li
                key={track.title}
                data-active={index === activeIndex ? 'true' : 'false'}
                className="relative overflow-hidden min-w-[2rem] rounded-lg border border-white/50 bg-black"
                onMouseEnter={() => window.innerWidth > 640 && setActiveIndex(index)}
                onClick={() => setActiveIndex(index)}
              >
                <article className="absolute inset-0 flex flex-col h-full">
                  {/* Dark overlay for text visibility */}
                  <div 
                    className="absolute inset-0 z-5 pointer-events-none"
                    style={{
                      background: index === activeIndex 
                        ? 'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.4) 30%, rgba(0,0,0,0.4) 70%, rgba(0,0,0,0.7) 100%)'
                        : 'linear-gradient(to right, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.2) 100%)'
                    }}
                  ></div>
                  
                  {'images' in track ? (
                    <div className="absolute inset-0 w-full h-full">
                      <Image
                        src={track.images.left}
                        alt={`${track.title} - Left`}
                        width={800}
                        height={600}
                        className={`absolute inset-0 w-1/2 h-full object-cover pointer-events-none opacity-80 ${
                          track.title === "AgriTech & MedTech" ? "object-right" : ""
                        }`}
                        style={{
                          filter: 'brightness(1.1)',
                          ...(track.title === "AgriTech & MedTech" ? { objectPosition: '75% center' } : {})
                        }}
                        priority={index === 0}
                      />
                      <Image
                        src={track.images.right}
                        alt={`${track.title} - Right`}
                        width={800}
                        height={600}
                        className={`absolute right-0 top-0 w-1/2 h-full object-cover pointer-events-none opacity-80 ${
                          track.title === "AgriTech & MedTech" ? "object-right" : ""
                        }`}
                        style={{ filter: 'brightness(1.1)' }}
                        priority={index === 0}
                      />
                    </div>
                  ) : (
                    <Image
                      src={track.image}
                      alt={track.title}
                      width={800}
                      height={600}
                      className="absolute inset-0 object-cover w-full h-full opacity-100"
                      style={{ filter: 'brightness(1.1)' }}
                      priority={index === 0}
                    />
                  )}
                  
                  <div className="relative z-10 flex flex-col h-full p-4">
                    <h3 className="track-title megrim-regular text-sm md:text-base uppercase font-mono whitespace-nowrap opacity-100">
                      {track.title}
                    </h3>
                    <div className="description-container mt-auto">
                      <p className="text-xs md:text-sm leading-tight opacity-80 text-gray-300 mb-2">{track.description}</p>
                      <p className="text-xs md:text-sm leading-tight opacity-80 text-gray-300">{track.outcome}</p>
                    </div>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
} 

