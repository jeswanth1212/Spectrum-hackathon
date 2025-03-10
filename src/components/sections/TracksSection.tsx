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
      image: "/agrhlt.jpg"
    },
    {
      title: "AgriTech & MedTech",
      description: "Encourage entrepreneurial innovation in agriculture and healthcare using AI and IoT.",
      outcome: "Enhanced food security, precision farming, and accessible healthcare.",
      image: "/agrhlt.jpg"
    },
    {
      title: "EdTech & Smart Learning",
      description: "Promote entrepreneurship in education through AI-driven and adaptive learning technologies.",
      outcome: "Improved learning accessibility, engagement, and skill development.",
      image: "/agrhlt.jpg"
    },
    {
      title: "Sustainability & Social Well-Being",
      description: "Inspire entrepreneurship for sustainability-focused and socially impactful tech solutions.",
      outcome: "Advancements in environmental conservation, clean energy, and social well-being.",
      image: "/agrhlt.jpg"
    },
    {
      title: "IoT & Smart Technologies",
      description: "Enable entrepreneurship in smart tech through AI-powered, connected, and intelligent devices.",
      outcome: "Smarter automation, predictive analytics, and efficient infrastructure.",
      image: "/agrhlt.jpg"
    },
    {
      title: "Open Innovation",
      description: "Cultivate an entrepreneurial mindset for groundbreaking, cross-domain tech innovations.",
      outcome: "Disruptive solutions addressing real-world challenges creatively.",
      image: "/agrhlt.jpg"
    },
  ];

  const [activeIndex, setActiveIndex] = React.useState(0);

  return (
    <section id="tracks" className="tracks-section bg-black text-white">
      <div className="w-full">
        <h2>TRACKS</h2>
        <div className="tracks-container mx-auto px-4" style={{ height: 'var(--card-height)' }}>
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
                onMouseEnter={() => setActiveIndex(index)}
                onClick={() => setActiveIndex(index)}
              >
                <article className="w-full h-full absolute top-0 left-0 flex flex-col justify-end gap-3 md:gap-4 p-3 md:p-4 overflow-hidden">
                  {/* Dark overlay for text visibility */}
                  <div 
                    className="absolute inset-0 z-5 pointer-events-none"
                    style={{
                      background: index === activeIndex 
                        ? 'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.4) 30%, rgba(0,0,0,0.4) 70%, rgba(0,0,0,0.7) 100%)'
                        : 'linear-gradient(to right, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.2) 100%)'
                    }}
                  ></div>
                  <h3 className="track-title megrim-regular text-sm md:text-base uppercase font-mono whitespace-nowrap opacity-60 relative z-10">
                    {track.title}
                  </h3>
                  <div className="description-container relative z-10">
                    <p className="text-xs md:text-sm leading-tight opacity-0 mb-2">{track.description}</p>
                    <p className="text-xs md:text-sm leading-tight opacity-0">{track.outcome}</p>
                  </div>
                  {'images' in track ? (
                    <div className="absolute inset-0 w-full h-full">
                      <Image
                        src={track.images.left}
                        alt={`${track.title} - Social Well-Being`}
                        width={800}
                        height={600}
                        className="absolute inset-0 w-1/2 h-full object-cover pointer-events-none opacity-70"
                        priority={index === 0}
                      />
                      <Image
                        src={track.images.right}
                        alt={`${track.title} - Sustainability`}
                        width={800}
                        height={600}
                        className="absolute right-0 top-0 w-1/2 h-full object-cover pointer-events-none opacity-70"
                        priority={index === 0}
                      />
                    </div>
                  ) : (
                    <Image
                      src={track.image}
                      alt={track.title}
                      width={800}
                      height={600}
                      className="absolute inset-0 object-cover w-full h-full opacity-70"
                      priority={index === 0}
                    />
                  )}
                </article>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
} 

