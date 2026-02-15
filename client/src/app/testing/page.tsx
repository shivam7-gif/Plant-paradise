'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function TreesInWind() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x1a1a2e, 20, 100);
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 8, 25);
    camera.lookAt(0, 5, 0);
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true 
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404a6e, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffd89b, 1.2);
    directionalLight.position.set(10, 20, 10);
    directionalLight.castShadow = true;
    directionalLight.shadow.camera.left = -50;
    directionalLight.shadow.camera.right = 50;
    directionalLight.shadow.camera.top = 50;
    directionalLight.shadow.camera.bottom = -50;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    scene.add(directionalLight);

    const rimLight = new THREE.DirectionalLight(0x9d84b7, 0.4);
    rimLight.position.set(-10, 10, -10);
    scene.add(rimLight);

    // Ground
    const groundGeometry = new THREE.PlaneGeometry(200, 200);
    const groundMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x2d4a3e,
      roughness: 0.9,
      metalness: 0.1
    });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);

    // Create tree function
    const createTree = (x: number, z: number, scale: number = 1, windPhase: number = 0) => {
      const treeGroup = new THREE.Group();
      
      // Trunk
      const trunkGeometry = new THREE.CylinderGeometry(
        0.15 * scale,
        0.25 * scale,
        3 * scale,
        8
      );
      const trunkMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x4a3728,
        roughness: 0.9
      });
      const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
      trunk.position.y = 1.5 * scale;
      trunk.castShadow = true;
      treeGroup.add(trunk);

      // Foliage layers
      const foliageColors = [0x2d5a3d, 0x3a6e4d, 0x4a8a5f];
      
      for (let i = 0; i < 3; i++) {
        const foliageGeometry = new THREE.ConeGeometry(
          (1.2 - i * 0.2) * scale,
          1.8 * scale,
          8
        );
        const foliageMaterial = new THREE.MeshStandardMaterial({ 
          color: foliageColors[i],
          roughness: 0.8,
          flatShading: true
        });
        const foliage = new THREE.Mesh(foliageGeometry, foliageMaterial);
        foliage.position.y = (2.5 + i * 1.2) * scale;
        foliage.castShadow = true;
        foliage.receiveShadow = true;
        
        // Store original position and wind properties
        (foliage as any).originalY = foliage.position.y;
        (foliage as any).windPhase = windPhase + i * 0.5;
        (foliage as any).windSpeed = 0.8 + Math.random() * 0.4;
        (foliage as any).windAmplitude = 0.15 + Math.random() * 0.1;
        
        treeGroup.add(foliage);
      }

      treeGroup.position.set(x, 0, z);
      (treeGroup as any).baseScale = scale;
      return treeGroup;
    };

    // Create forest
    const trees: THREE.Group[] = [];
    
    // Front row
    for (let i = -4; i <= 4; i++) {
      const tree = createTree(
        i * 4 + (Math.random() - 0.5) * 2,
        8 + (Math.random() - 0.5) * 2,
        0.8 + Math.random() * 0.4,
        Math.random() * Math.PI * 2
      );
      trees.push(tree);
      scene.add(tree);
    }

    // Middle row
    for (let i = -5; i <= 5; i++) {
      const tree = createTree(
        i * 4.5 + (Math.random() - 0.5) * 3,
        0 + (Math.random() - 0.5) * 4,
        0.9 + Math.random() * 0.5,
        Math.random() * Math.PI * 2
      );
      trees.push(tree);
      scene.add(tree);
    }

    // Back row
    for (let i = -6; i <= 6; i++) {
      const tree = createTree(
        i * 5 + (Math.random() - 0.5) * 4,
        -10 + (Math.random() - 0.5) * 6,
        1.0 + Math.random() * 0.6,
        Math.random() * Math.PI * 2
      );
      trees.push(tree);
      scene.add(tree);
    }

    // Particles for atmosphere
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1000;
    const positions = new Float32Array(particlesCount * 3);
    
    for (let i = 0; i < particlesCount * 3; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 100;
      positions[i * 3 + 1] = Math.random() * 30;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 100;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.05,
      transparent: true,
      opacity: 0.3,
      blending: THREE.AdditiveBlending
    });
    
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    // Animation
    let time = 0;
    const animate = () => {
      requestAnimationFrame(animate);
      time += 0.01;

      // Animate trees with wind
      trees.forEach((tree) => {
        tree.children.forEach((child) => {
          if (child instanceof THREE.Mesh && child.geometry instanceof THREE.ConeGeometry) {
            const windPhase = (child as any).windPhase || 0;
            const windSpeed = (child as any).windSpeed || 1;
            const windAmplitude = (child as any).windAmplitude || 0.15;
            
            // Sway motion
            child.rotation.z = Math.sin(time * windSpeed + windPhase) * windAmplitude;
            child.rotation.x = Math.cos(time * windSpeed * 0.7 + windPhase) * windAmplitude * 0.5;
            
            // Subtle vertical bob
            const originalY = (child as any).originalY || child.position.y;
            child.position.y = originalY + Math.sin(time * windSpeed * 1.5 + windPhase) * 0.05;
          }
        });
      });

      // Rotate particles slowly
      particles.rotation.y = time * 0.05;

      // Gentle camera sway
      camera.position.x = Math.sin(time * 0.2) * 2;
      camera.position.y = 8 + Math.cos(time * 0.15) * 0.5;
      camera.lookAt(0, 5, 0);

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      if (!camera || !renderer) return;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-b from-[#0f1419] via-[#1a1a2e] to-[#16213e]">
      {/* Three.js Canvas */}
      <div ref={containerRef} className="absolute inset-0" />
      
      {/* Content Overlay */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 p-8 md:p-12">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-4 tracking-tight">
              Whispers
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
                of the Forest
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl leading-relaxed font-light">
              Where ancient trees dance with the wind, telling stories older than time itself
            </p>
          </div>
        </div>

        {/* Bottom Content */}
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-end gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 backdrop-blur-sm border border-emerald-400/30 flex items-center justify-center">
                  <svg className="w-6 h-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </div>
                <div>
                  <p className="text-emerald-400 font-medium text-sm tracking-wide uppercase">Interactive Experience</p>
                  <p className="text-gray-400 text-sm">Real-time 3D forest simulation</p>
                </div>
              </div>
            </div>
            
            <div className="flex gap-4 pointer-events-auto">
              <button className="px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/50">
                Explore
              </button>
              <button className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white rounded-full font-semibold transition-all duration-300 border border-white/20 hover:border-white/40">
                Learn More
              </button>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-1/2 right-8 -translate-y-1/2 text-right space-y-6">
          <div className="text-gray-400/60 space-y-1">
            <p className="text-6xl font-bold">40+</p>
            <p className="text-sm uppercase tracking-wider">Trees Animated</p>
          </div>
          <div className="w-px h-16 bg-gradient-to-b from-transparent via-emerald-400/50 to-transparent mx-auto" />
          <div className="text-gray-400/60 space-y-1">
            <p className="text-6xl font-bold">∞</p>
            <p className="text-sm uppercase tracking-wider">Wind Patterns</p>
          </div>
        </div>
      </div>

      {/* Vignette Effect */}
      <div className="absolute inset-0 pointer-events-none bg-radial-gradient" 
           style={{
             background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.4) 100%)'
           }} 
      />
    </div>
  );
}