"use client"
// components/AboutSection.tsx
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const AboutSection: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const nodesRef = useRef<THREE.Mesh[]>([]);
  const linesRef = useRef<THREE.Line[]>([]);
  const frameIdRef = useRef<number>(0);
  const mousePosition = useRef({ x: 0, y: 0 });
  const raycaster = useRef(new THREE.Raycaster());
  const particlesRef = useRef<THREE.Points | null>(null);

  useEffect(() => {
    // Initialize scene only if it hasn't been initialized yet
    if (!sceneRef.current && mountRef.current) {
      // Scene setup
      const scene = new THREE.Scene();
      sceneRef.current = scene;
      
      // Camera setup
      const camera = new THREE.PerspectiveCamera(
        75,
        mountRef.current.clientWidth / mountRef.current.clientHeight,
        0.1,
        1000
      );
      camera.position.z = 15;
      cameraRef.current = camera;
      
      // Renderer setup
      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
      renderer.setClearColor(0xffffff, 0);
      renderer.setPixelRatio(window.devicePixelRatio);
      mountRef.current.appendChild(renderer.domElement);
      rendererRef.current = renderer;
      
      // Add ambient light
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
      scene.add(ambientLight);
      
      // Add directional light
      const directionalLight = new THREE.DirectionalLight(0x4361ee, 1);
      directionalLight.position.set(5, 5, 5);
      scene.add(directionalLight);
      
      // Create background particles
      const createParticles = () => {
        const particleCount = 500;
        const particles = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        const sizes = new Float32Array(particleCount);
        
        for (let i = 0; i < particleCount; i++) {
          positions[i * 3] = (Math.random() - 0.5) * 50;
          positions[i * 3 + 1] = (Math.random() - 0.5) * 50;
          positions[i * 3 + 2] = (Math.random() - 0.5) * 50;
          
          sizes[i] = Math.random() * 0.5 + 0.1;
        }
        
        particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        particles.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
        
        const particleMaterial = new THREE.PointsMaterial({
          color: 0x4361ee,
          sizeAttenuation: true,
          transparent: true,
          opacity: 0.6,
          blending: THREE.AdditiveBlending,
        });
        
        const particleSystem = new THREE.Points(particles, particleMaterial);
        scene.add(particleSystem);
        particlesRef.current = particleSystem;
      };
      
      createParticles();
      
      // Create neural network nodes
      const createNeuralNetwork = () => {
        const nodes: THREE.Mesh[] = [];
        const lines: THREE.Line[] = [];
        
        // Create layers of nodes to simulate a neural network
        const layers = 4;
        const nodesPerLayer = 8;
        const layerSpacing = 6;
        const nodeSpread = 6;
        
        for (let layer = 0; layer < layers; layer++) {
          for (let i = 0; i < nodesPerLayer; i++) {
            // Create node geometry with glow effect
            const geometry = new THREE.SphereGeometry(0.15, 32, 32);
            
            // Create node material with glow effect
            const material = new THREE.MeshPhongMaterial({
              color: new THREE.Color(0x4361ee).lerp(
                new THREE.Color(0x7209b7),
                Math.random()
              ),
              emissive: new THREE.Color(0x4361ee).lerp(
                new THREE.Color(0x7209b7),
                Math.random()
              ),
              emissiveIntensity: 0.5,
              shininess: 100,
            });
            
            const node = new THREE.Mesh(geometry, material);
            
            // Position nodes in structured layers
            node.position.x = (layer * layerSpacing) - (layers * layerSpacing / 2) + (Math.random() * 0.5);
            node.position.y = (i * (nodeSpread / nodesPerLayer)) - nodeSpread / 2 + (Math.random() * 0.5);
            node.position.z = (Math.random() - 0.5) * 2;
            
            // Store original position for animation
            (node as any).originalPosition = {
              x: node.position.x,
              y: node.position.y,
              z: node.position.z
            };
            
            // Custom properties for animation
            (node as any).velocity = {
              x: (Math.random() - 0.5) * 0.01,
              y: (Math.random() - 0.5) * 0.01,
              z: (Math.random() - 0.5) * 0.01,
            };
            
            // Add attributes for pulsing animation
            (node as any).pulsePhase = Math.random() * Math.PI * 2;
            (node as any).pulseSpeed = 0.05 + Math.random() * 0.05;
            (node as any).originalScale = 1.0;
            
            scene.add(node);
            nodes.push(node);
          }
        }
        
        // Create connections between layers
        for (let layer = 0; layer < layers - 1; layer++) {
          const currentLayerStart = layer * nodesPerLayer;
          const nextLayerStart = (layer + 1) * nodesPerLayer;
          
          for (let i = 0; i < nodesPerLayer; i++) {
            for (let j = 0; j < nodesPerLayer; j++) {
              // Connect nodes between adjacent layers with varying probability
              if (Math.random() > 0.7) {
                const currentNode = nodes[currentLayerStart + i];
                const nextNode = nodes[nextLayerStart + j];
                
                const lineGeometry = new THREE.BufferGeometry().setFromPoints([
                  currentNode.position,
                  nextNode.position,
                ]);
                
                // Gradient color for lines
                const lineMaterial = new THREE.LineBasicMaterial({
                  color: new THREE.Color(0x4361ee).lerp(
                    new THREE.Color(0x7209b7),
                    Math.random()
                  ),
                  transparent: true,
                  opacity: 0.3,
                });
                
                const line = new THREE.Line(lineGeometry, lineMaterial);
                scene.add(line);
                lines.push(line);
                
                // Store indices for updating line positions
                (line as any).startNodeIndex = currentLayerStart + i;
                (line as any).endNodeIndex = nextLayerStart + j;
                
                // Add data pulse animation properties
                (line as any).hasPulse = Math.random() > 0.7;
                (line as any).pulsePosition = 0;
                (line as any).pulseSpeed = 0.01 + Math.random() * 0.02;
                (line as any).pulseColor = new THREE.Color(0xffffff);
              }
            }
          }
        }
        
        nodesRef.current = nodes;
        linesRef.current = lines;
      };
      
      createNeuralNetwork();
      
      // Create data pulse effect for a line
      const createPulseEffect = (line: THREE.Line, position: number) => {
        if (!line.userData.pulseEffect) {
          const pulseGeometry = new THREE.SphereGeometry(0.05, 8, 8);
          const pulseMaterial = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            transparent: true,
            opacity: 0.8,
          });
          
          const pulse = new THREE.Mesh(pulseGeometry, pulseMaterial);
          line.userData.pulseEffect = pulse;
          scene.add(pulse);
        }
        
        // Calculate position along the line
        const startNode = nodesRef.current[(line as any).startNodeIndex];
        const endNode = nodesRef.current[(line as any).endNodeIndex];
        
        const startPos = startNode.position;
        const endPos = endNode.position;
        
        line.userData.pulseEffect.position.x = startPos.x + (endPos.x - startPos.x) * position;
        line.userData.pulseEffect.position.y = startPos.y + (endPos.y - startPos.y) * position;
        line.userData.pulseEffect.position.z = startPos.z + (endPos.z - startPos.z) * position;
      };
      
      // Handle mouse move for interactive effects
      const handleMouseMove = (event: MouseEvent) => {
        // Calculate normalized mouse position
        const bounds = mountRef.current?.getBoundingClientRect();
        if (bounds) {
          mousePosition.current.x = ((event.clientX - bounds.left) / bounds.width) * 2 - 1;
          mousePosition.current.y = -((event.clientY - bounds.top) / bounds.height) * 2 + 1;
        }
      };
      
      window.addEventListener('mousemove', handleMouseMove);
      
      // Animation loop
      const animate = () => {
        frameIdRef.current = requestAnimationFrame(animate);
        
        if (cameraRef.current && sceneRef.current) {
          // Update camera position slightly based on mouse position for parallax effect
          cameraRef.current.position.x += (mousePosition.current.x * 3 - cameraRef.current.position.x) * 0.05;
          cameraRef.current.position.y += (mousePosition.current.y * 3 - cameraRef.current.position.y) * 0.05;
          cameraRef.current.lookAt(scene.position);
          
          // Rotate particle system
          if (particlesRef.current) {
            particlesRef.current.rotation.x += 0.0005;
            particlesRef.current.rotation.y += 0.0003;
          }
          
          // Update raycaster for interactive highlighting
          raycaster.current.setFromCamera(mousePosition.current, cameraRef.current);
          const intersects = raycaster.current.intersectObjects(nodesRef.current);
          
          // Reset all node scales first
          nodesRef.current.forEach((node) => {
            if (!(node as any).isHighlighted) {
              node.scale.set(1, 1, 1);
              (node.material as THREE.MeshPhongMaterial).emissiveIntensity = 0.5;
            }
          });
          
          // Highlight intersected nodes
          if (intersects.length > 0) {
            const node = intersects[0].object as THREE.Mesh;
            node.scale.set(1.5, 1.5, 1.5);
            (node.material as THREE.MeshPhongMaterial).emissiveIntensity = 1.0;
            (node as any).isHighlighted = true;
          }
        }
        
        // Animate nodes with wave-like motion
        const time = Date.now() * 0.001;
        nodesRef.current.forEach((node, index) => {
          const originalPos = (node as any).originalPosition;
          
          // Create a wave effect
          node.position.x = originalPos.x + Math.sin(time * 0.5 + index * 0.1) * 0.1;
          node.position.y = originalPos.y + Math.cos(time * 0.7 + index * 0.1) * 0.1;
          node.position.z = originalPos.z + Math.sin(time * 0.3 + index * 0.1) * 0.1;
          
          // Pulse effect for nodes
          const pulse = Math.sin(time * (node as any).pulseSpeed + (node as any).pulsePhase) * 0.2 + 0.8;
          (node.material as THREE.MeshPhongMaterial).emissiveIntensity = pulse * 0.7;
          
          // Handle out-of-bounds nodes
          if (node.position.x < -20) node.position.x = 20;
          if (node.position.x > 20) node.position.x = -20;
          if (node.position.y < -20) node.position.y = 20;
          if (node.position.y > 20) node.position.y = -20;
          if (node.position.z < -20) node.position.z = 20;
          if (node.position.z > 20) node.position.z = -20;
        });
        
        // Update line positions and add data pulse effects
        linesRef.current.forEach((line) => {
          const startNode = nodesRef.current[(line as any).startNodeIndex];
          const endNode = nodesRef.current[(line as any).endNodeIndex];
          
          const positions = new Float32Array([
            startNode.position.x, startNode.position.y, startNode.position.z,
            endNode.position.x, endNode.position.y, endNode.position.z,
          ]);
          
          line.geometry.setAttribute(
            'position',
            new THREE.BufferAttribute(positions, 3)
          );
          line.geometry.attributes.position.needsUpdate = true;
          
          // Update data pulse effect
          if ((line as any).hasPulse) {
            (line as any).pulsePosition += (line as any).pulseSpeed;
            if ((line as any).pulsePosition > 1) {
              (line as any).pulsePosition = 0;
              
              // Remove previous pulse effect if exists
              if (line.userData.pulseEffect) {
                scene.remove(line.userData.pulseEffect);
                line.userData.pulseEffect = null;
              }
            } else {
              createPulseEffect(line, (line as any).pulsePosition);
            }
          }
          
          // Adjust line opacity based on node activation
          const startNodeActive = (startNode as any).isHighlighted;
          const endNodeActive = (endNode as any).isHighlighted;
          
          if (startNodeActive || endNodeActive) {
            (line.material as THREE.LineBasicMaterial).opacity = 0.8;
            (line.material as THREE.LineBasicMaterial).color.set(0x00ffff);
          } else {
            (line.material as THREE.LineBasicMaterial).opacity = 0.3;
            (line.material as THREE.LineBasicMaterial).color.set(0x4361ee);
          }
        });
        
        // Rotate entire scene slowly with some oscillation
        scene.rotation.y = Math.sin(time * 0.1) * 0.1;
        scene.rotation.x = Math.cos(time * 0.1) * 0.05;
        
        renderer.render(scene, cameraRef.current);
      };
      
      animate();
      
      // Handle window resize
      const handleResize = () => {
        if (mountRef.current && cameraRef.current && rendererRef.current) {
          const width = mountRef.current.clientWidth;
          const height = mountRef.current.clientHeight;
          
          cameraRef.current.aspect = width / height;
          cameraRef.current.updateProjectionMatrix();
          
          rendererRef.current.setSize(width, height);
        }
      };
      
      window.addEventListener('resize', handleResize);
      
      // Cleanup
      return () => {
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('mousemove', handleMouseMove);
        cancelAnimationFrame(frameIdRef.current);
        
        if (mountRef.current && rendererRef.current) {
          mountRef.current.removeChild(rendererRef.current.domElement);
        }
        
        // Dispose all geometries and materials
        nodesRef.current.forEach((node) => {
          node.geometry.dispose();
          (node.material as THREE.Material).dispose();
        });
        
        linesRef.current.forEach((line) => {
          line.geometry.dispose();
          (line.material as THREE.Material).dispose();
          
          // Dispose pulse effects
          if (line.userData.pulseEffect) {
            line.userData.pulseEffect.geometry.dispose();
            (line.userData.pulseEffect.material as THREE.Material).dispose();
            scene.remove(line.userData.pulseEffect);
          }
        });
        
        if (particlesRef.current) {
          particlesRef.current.geometry.dispose();
          (particlesRef.current.material as THREE.Material).dispose();
          scene.remove(particlesRef.current);
        }
        
        // Clear references
        sceneRef.current = null;
        cameraRef.current = null;
        rendererRef.current = null;
        nodesRef.current = [];
        linesRef.current = [];
      };
    }
  }, []);
  return (
    <section className="bg-gradient-to-b from-gray-900 to-black py-24 relative overflow-hidden">
      {/* Neural network animation background */}
      <div 
        ref={mountRef} 
        className="absolute inset-0 w-full h-full opacity-70 pointer-events-none"
      />
      
      {/* Overlay gradient for better text visibility */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent pointer-events-none" />
      
      <div className="relative z-10 container mx-auto px-4 md:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col items-center mb-16">
            <div className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 rounded-full p-1 mb-6">
              <div className="bg-gray-900 rounded-full p-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                </svg>
              </div>
            </div>
            
            <h2 className="text-5xl font-bold mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
              About <span className="font-extrabold">NeuroScan</span>
            </h2>
            
            <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-8"></div>
            
            <p className="text-gray-300 text-xl text-center max-w-3xl mx-auto leading-relaxed">
              Revolutionizing autism screening through AI-driven multimodal analysis and accessible technology.
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 mb-16 border border-gray-700/50">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-white text-2xl font-bold mb-4 flex items-center">
                  <span className="inline-block w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </span>
                  The Innovation
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  NeuroScan integrates computer vision, natural language processing, large language models, and biometric tracking to create an objective and scalable autism detection system, addressing the limitations of traditional subjective assessments.
                </p>
              </div>
              
              <div>
                <h3 className="text-white text-2xl font-bold mb-4 flex items-center">
                  <span className="inline-block w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </span>
                  Our Approach
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  The three-tiered methodology combines facial and eye-tracking analysis, speech pattern recognition, and interactive MCQ-based evaluation to enhance diagnostic accuracy through multimodal data sources.
                </p>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group relative overflow-hidden rounded-2xl backdrop-blur-sm bg-gradient-to-br from-blue-500/10 to-blue-600/10 border border-blue-500/20 p-1 transition-all duration-300 hover:transform hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-300"></div>
              
              <div className="relative bg-gray-900 rounded-xl p-6 h-full flex flex-col">
                <div className="mb-6 bg-blue-500/10 w-16 h-16 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-3">Facial & Eye Tracking</h3>
                
                <p className="text-gray-300 mb-6 flex-grow">
                  Advanced computer vision algorithms analyze micro-expressions and eye movement patterns to identify key neurological indicators associated with autism spectrum disorders.
                </p>
                
                <div className="flex justify-end">
                <a href="http://localhost:8504/" className="text-blue-400 flex items-center text-sm font-medium group-hover:text-blue-300 transition-colors">
                  Start Test
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            
            <div className="group relative overflow-hidden rounded-2xl backdrop-blur-sm bg-gradient-to-br from-purple-500/10 to-purple-600/10 border border-purple-500/20 p-1 transition-all duration-300 hover:transform hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-purple-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-300"></div>
              
              <div className="relative bg-gray-900 rounded-xl p-6 h-full flex flex-col">
                <div className="mb-6 bg-purple-500/10 w-16 h-16 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-3">Speech Analysis</h3>
                
                <p className="text-gray-300 mb-6 flex-grow">
                  Sophisticated NLP techniques and linguistic pattern recognition identify subtle speech characteristics, prosody variations, and communication patterns indicative of autism.
                </p>
                
                <div className="flex justify-end">
                <a href="http://localhost:8503/" className="text-blue-400 flex items-center text-sm font-medium group-hover:text-blue-300 transition-colors">
                  Start Test
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            
            <div className="group relative overflow-hidden rounded-2xl backdrop-blur-sm bg-gradient-to-br from-indigo-500/10 to-indigo-600/10 border border-indigo-500/20 p-1 transition-all duration-300 hover:transform hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-indigo-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-300"></div>
              
              <div className="relative bg-gray-900 rounded-xl p-6 h-full flex flex-col">
                <div className="mb-6 bg-indigo-500/10 w-16 h-16 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-3">Interactive Assessment</h3>
                
                <p className="text-gray-300 mb-6 flex-grow">
                  AI-powered evaluations use engaging activities and questionnaires to assess cognitive patterns, social responsiveness, and behavioral indicators relevant to autism spectrum diagnosis.
                </p>
                
                <div className="flex justify-end">
                <a href="http://localhost:8502/" className="text-blue-400 flex items-center text-sm font-medium group-hover:text-blue-300 transition-colors">
                  Start Test
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          {/* Start Button */}
          
        </div>
      </div>
    </section>
    );
};
export default AboutSection;