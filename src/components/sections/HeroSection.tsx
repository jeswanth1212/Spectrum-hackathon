'use client';

import React, { useRef, useCallback, Suspense } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { Bloom, EffectComposer, LUT } from '@react-three/postprocessing';
import { LUTCubeLoader } from 'postprocessing';
import { Beam } from '../hero3d/Beam';
import { Rainbow, RainbowMesh } from '../hero3d/Rainbow';
import { Prism } from '../hero3d/Prism';
import { Flare } from '../hero3d/Flare';
import { calculateRefractionAngle } from '../hero3d/utils';
import { RayEvent, RayMoveEvent } from '../hero3d/types';
import { ReflectRef } from '../hero3d/Beam';
import Image from 'next/image';

function Effects() {
  const texture = useLoader(LUTCubeLoader, '/lut/F-6800-STD.cube') as THREE.DataTexture;
  return (
    <EffectComposer>
      <Bloom mipmapBlur levels={9} intensity={0.8} luminanceThreshold={0.5} luminanceSmoothing={0.9} />
      <LUT lut={texture} />
    </EffectComposer>
  );
}

function Scene() {
  const flare = useRef<THREE.Group>(null);
  const ambient = useRef<THREE.AmbientLight>(null);
  const spot = useRef<THREE.SpotLight>(null);
  const boxreflect = useRef<ReflectRef>(null);
  const rainbow = useRef<RainbowMesh>(null);

  const rayOut = useCallback(() => {
    if (rainbow.current && rainbow.current.material.uniforms) {
      rainbow.current.material.uniforms.speed.value = 0.5;
      rainbow.current.material.uniforms.emissiveIntensity.value = 4;
    }
  }, []);

  const rayOver = useCallback((e: RayEvent) => {
    e.stopPropagation();
    if (rainbow.current && rainbow.current.material.uniforms) {
      rainbow.current.material.uniforms.speed.value = 0.5;
      rainbow.current.material.uniforms.emissiveIntensity.value = 4;
    }
  }, []);

  const rayMove = useCallback((e: RayMoveEvent) => {
    if (!e.normal || !flare.current || !spot.current || !rainbow.current) return;
    
    const { position, direction, normal } = e;
    
    flare.current.position.set(position.x, position.y, -0.5);
    flare.current.rotation.set(0, 0, -Math.atan2(direction.x, direction.y));
    
    const angleScreenCenter = Math.atan2(-position.y, -position.x);
    const incidentAngle = Math.acos(direction.dot(normal));
    const baseRefractionAngle = calculateRefractionAngle(incidentAngle, 2.4);
    const tiltedAngle = baseRefractionAngle + Math.PI * 0.1;
    
    rainbow.current.rotation.z = angleScreenCenter + tiltedAngle;
    
    if (spot.current.target instanceof THREE.Object3D) {
      spot.current.target.position.set(
        Math.cos(angleScreenCenter + tiltedAngle) * 1.2,
        Math.sin(angleScreenCenter + tiltedAngle) * 1.2,
        0
      );
      spot.current.target.updateMatrixWorld();
    }
  }, []);

  useFrame((state) => {
    if (!boxreflect.current || !rainbow.current || !spot.current || !ambient.current) return;
    
    const x = state.pointer.x * state.viewport.width / 2;
    const y = state.pointer.y * state.viewport.height / 2;
    
    boxreflect.current.setRay([x, y, 0], [0, 0.15, 0]);
    
    if (rainbow.current.material.uniforms) {
      rainbow.current.material.uniforms.emissiveIntensity.value = 4;
      spot.current.intensity = 6;
    }
    ambient.current.intensity = 0.4;
  });

  return (
    <>
      <ambientLight ref={ambient} intensity={0.4} />
      <pointLight position={[10, -10, 0]} intensity={0.4} />
      <pointLight position={[0, 10, 0]} intensity={0.4} />
      <pointLight position={[-10, 0, 0]} intensity={0.4} />
      <spotLight 
        ref={spot} 
        intensity={6} 
        distance={25} 
        angle={0.5} 
        penumbra={0.5} 
        position={[0, 0.15, 1]}
      >
        <object3D position={[0, 0.15, 0]} />
      </spotLight>
      
      <Beam ref={boxreflect} bounce={10} far={20}>
        <Prism position={[0, 0.15, 0]} onRayOver={rayOver} onRayOut={rayOut} onRayMove={rayMove} />
      </Beam>
      
      <Rainbow ref={rainbow} startRadius={0} endRadius={0.5} fade={0} position={[0, 0.15, 0]} />
      <Flare ref={flare} visible={true} scale={1.5} streak={[15, 25, 1]} />
      
      <Suspense fallback={null}>
        <Effects />
      </Suspense>
    </>
  );
}

export default function HeroSection() {
  // Static initial values - these will be updated directly in the DOM
  const [timeLeft, setTimeLeft] = React.useState({
    days: 26,
    hours: 8,
    minutes: 0,
    seconds: 0
  });
  
  // Use refs to directly access DOM elements
  const daysRef = React.useRef<HTMLDivElement>(null);
  const hoursRef = React.useRef<HTMLDivElement>(null);
  const minutesRef = React.useRef<HTMLDivElement>(null);
  const secondsRef = React.useRef<HTMLDivElement>(null);
  
  // Client-side countdown logic with direct DOM updates
  React.useEffect(() => {
    // Skip this in SSR
    if (typeof window === 'undefined') return;
    
    console.log("Imperative countdown initialized");
    
    // Target date - April 11, 2025 at 10:00 AM IST
    // Calculating in IST (UTC+5:30)
    const istOffsetHours = 5;
    const istOffsetMinutes = 30;
    
    // Set date using UTC methods to handle timezone accurately
    const targetTime = new Date();
    targetTime.setUTCFullYear(2025);
    targetTime.setUTCMonth(3); // April (0-indexed)
    targetTime.setUTCDate(11);
    targetTime.setUTCHours(10 - istOffsetHours); // 10 AM IST = 4:30 AM UTC
    targetTime.setUTCMinutes(0 - istOffsetMinutes);
    targetTime.setUTCSeconds(0);
    targetTime.setUTCMilliseconds(0);
    
    console.log("Target date (UTC):", targetTime.toUTCString());
    console.log("Target date (local):", targetTime.toString());
    
    // Current date for debugging
    const now = new Date();
    console.log("Current date (UTC):", now.toUTCString());
    console.log("Current date (local):", now.toString());
    console.log("Time difference (days):", Math.floor((targetTime.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)));
    
    function updateCountdown() {
      const now = new Date();
      const diff = targetTime.getTime() - now.getTime();
      
      // Log values every 10 seconds for debugging
      if (Math.floor(now.getSeconds() / 10) === 0) {
        console.log("Time diff (ms):", diff);
      }
      
      if (diff <= 0) {
        // If past the target date, set all to 0
        if (daysRef.current) daysRef.current.textContent = "0";
        if (hoursRef.current) hoursRef.current.textContent = "0";
        if (minutesRef.current) minutesRef.current.textContent = "0";
        if (secondsRef.current) secondsRef.current.textContent = "0";
        return;
      }
      
      // Calculate time units
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      
      // Update DOM elements directly if they exist
      if (daysRef.current) {
        daysRef.current.textContent = days.toString();
        console.log("Updated days:", days);
      }
      if (hoursRef.current) {
        hoursRef.current.textContent = hours.toString();
      }
      if (minutesRef.current) {
        minutesRef.current.textContent = minutes.toString();
      }
      if (secondsRef.current) {
        secondsRef.current.textContent = seconds.toString();
      }
      
      // Also update React state as a backup
      setTimeLeft({ days, hours, minutes, seconds });
    }
    
    // Update immediately
    updateCountdown();
    
    // Set interval for updates
    const interval = setInterval(updateCountdown, 1000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full h-screen bg-black overflow-hidden">
      <div className="absolute top-8 sm:top-6 md:top-2 left-1/2 transform -translate-x-1/2 z-10">
        <Image 
          src="/logo.png" 
          alt="Spectrum Hackathon Logo"
          width={512}
          height={512}
          className="h-auto w-auto max-h-[220px] sm:max-h-[280px] md:max-h-[320px] max-w-[90vw] object-contain"
        />
      </div>
      <Canvas
        orthographic
        gl={{ 
          antialias: false,
          alpha: false,
          stencil: false,
          depth: true,
          powerPreference: "high-performance"
        }}
        camera={{ position: [0, 0, 100], zoom: 70 }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          touchAction: 'none'
        }}
      >
        <color attach="background" args={['black']} />
        <Scene />
      </Canvas>

      <div className="absolute bottom-24 sm:bottom-16 md:bottom-20 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-4 sm:gap-6 md:gap-3 w-full px-4">
        <div className="flex justify-center gap-2 xs:gap-3 sm:gap-4 md:gap-6 w-full" style={{ maxWidth: 'min(85vw, 800px)' }}>
          <div className="timer-container flex-1">
            <div className="a l"></div>
            <div className="a r"></div>
            <div className="a t"></div>
            <div className="a b"></div>
            <div className="timer-content">
              <div ref={daysRef} className="text-5xl font-bold">{timeLeft.days}</div>
              <div className="text-sm mt-2">DAYS</div>
            </div>
          </div>
          <div className="timer-container flex-1">
            <div className="a l"></div>
            <div className="a r"></div>
            <div className="a t"></div>
            <div className="a b"></div>
            <div className="timer-content">
              <div ref={hoursRef} className="text-5xl font-bold">{timeLeft.hours}</div>
              <div className="text-sm mt-2">HOURS</div>
            </div>
          </div>
          <div className="timer-container flex-1">
            <div className="a l"></div>
            <div className="a r"></div>
            <div className="a t"></div>
            <div className="a b"></div>
            <div className="timer-content">
              <div ref={minutesRef} className="text-5xl font-bold">{timeLeft.minutes}</div>
              <div className="text-sm mt-2">MINUTES</div>
            </div>
          </div>
          <div className="timer-container flex-1">
            <div className="a l"></div>
            <div className="a r"></div>
            <div className="a t"></div>
            <div className="a b"></div>
            <div className="timer-content">
              <div ref={secondsRef} className="text-5xl font-bold">{timeLeft.seconds}</div>
              <div className="text-sm mt-2">SECONDS</div>
            </div>
          </div>
        </div>
        
        <button className="button">
          <div className="a l"></div>
          <div className="a r"></div>
          <div className="a t"></div>
          <div className="a b"></div>
          <div className="text">Register Now</div>
        </button>

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
          .button {
            position: relative;
            cursor: pointer;
            border: none;
            padding: 0.5rem 1.25rem;
            background: #111;
            color: #fff;
            min-width: 140px;
            font-size: 0.875rem;
            @media (min-width: 640px) {
              padding: 0.625rem 1.75rem;
              min-width: 160px;
              font-size: 0.875rem;
            }
            @media (min-width: 768px) {
              padding: 0.75rem 2rem;
              min-width: 180px;
              font-size: 0.9rem;
            }
          }

          .timer-container {
            position: relative;
            background: #111;
            aspect-ratio: 1.2;
            width: calc(20vw - 0.5rem);
            max-width: 85px;
            min-width: 50px;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
          }

          .timer-content {
            position: relative;
            z-index: 1;
            color: white;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 100%;
          }

          .timer-content .text-5xl {
            font-size: clamp(1rem, 3vw, 2rem);
            line-height: 1;
            font-weight: 500;
          }

          .timer-content .text-sm {
            font-size: clamp(0.5rem, 1vw, 0.7rem);
            margin-top: 0.25rem;
          }

          .text {
            position: relative;
            z-index: 1;
          }

          .button::before {
            content: "";
            position: absolute;
            inset: 0;
            opacity: 0;
            background: radial-gradient(
                circle at 50% 50%,
                #0000 0,
                #0000 20%,
                #111111aa 50%
              ),
              radial-gradient(ellipse 100% 100%, #fff, #fff0);
            background-size:
              3px 3px,
              auto auto;
            transition: 0.3s;
          }

          .button:hover::before {
            opacity: 0.3;
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

          .button:hover .a::after {
            opacity: 1;
          }

          .l {
            left: -2px;
          }

          .r {
            right: -2px;
          }

          .l,
          .r {
            background: linear-gradient(var(--g));
            top: var(--t);
            bottom: var(--t);
            width: var(--w);
          }

          .t {
            top: -2px;
          }

          .b {
            bottom: -2px;
          }

          .t,
          .b {
            background: linear-gradient(90deg, var(--g));
            left: var(--t);
            right: var(--t);
            height: var(--w);
          }

          @media (min-width: 1024px) {
            .timer-container {
              aspect-ratio: 2;
              max-width: 150px;
            }
            .absolute.bottom-24 {
              bottom: 6rem;
            }
          }
        `}</style>
      </div>
    </section>
  );
}