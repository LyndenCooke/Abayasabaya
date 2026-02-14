'use client';

import { useRef, useState, useCallback, useMemo, Suspense } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, Environment, Float, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

interface DressFormProps {
  textureUrl: string;
}

function DressForm({ textureUrl }: DressFormProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const texture = useLoader(THREE.TextureLoader, textureUrl);

  // Configure texture
  useMemo(() => {
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;
    texture.repeat.set(1, 1);
    texture.colorSpace = THREE.SRGBColorSpace;
  }, [texture]);

  // Create a dress form / mannequin silhouette using LatheGeometry
  const geometry = useMemo(() => {
    const points: THREE.Vector2[] = [];

    // Bottom hem (wide, flowing)
    points.push(new THREE.Vector2(0.95, -2.2));
    points.push(new THREE.Vector2(0.92, -2.1));
    points.push(new THREE.Vector2(0.88, -2.0));
    points.push(new THREE.Vector2(0.82, -1.8));
    points.push(new THREE.Vector2(0.75, -1.6));

    // Lower body - slight taper
    points.push(new THREE.Vector2(0.65, -1.2));
    points.push(new THREE.Vector2(0.56, -0.8));

    // Waist - narrower
    points.push(new THREE.Vector2(0.45, -0.3));
    points.push(new THREE.Vector2(0.42, 0.0));

    // Bust area - wider
    points.push(new THREE.Vector2(0.48, 0.4));
    points.push(new THREE.Vector2(0.50, 0.7));

    // Upper chest - taper
    points.push(new THREE.Vector2(0.46, 1.0));
    points.push(new THREE.Vector2(0.40, 1.2));

    // Shoulders
    points.push(new THREE.Vector2(0.44, 1.35));
    points.push(new THREE.Vector2(0.42, 1.45));

    // Neck
    points.push(new THREE.Vector2(0.22, 1.55));
    points.push(new THREE.Vector2(0.18, 1.7));
    points.push(new THREE.Vector2(0.17, 1.85));

    // Head (simplified)
    points.push(new THREE.Vector2(0.24, 1.95));
    points.push(new THREE.Vector2(0.27, 2.1));
    points.push(new THREE.Vector2(0.27, 2.3));
    points.push(new THREE.Vector2(0.24, 2.45));
    points.push(new THREE.Vector2(0.18, 2.55));
    points.push(new THREE.Vector2(0.0, 2.6));

    return new THREE.LatheGeometry(points, 64);
  }, []);

  return (
    <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.3}>
      <mesh ref={meshRef} geometry={geometry} castShadow>
        <meshPhysicalMaterial
          map={texture}
          roughness={0.55}
          metalness={0.05}
          clearcoat={0.15}
          clearcoatRoughness={0.4}
          envMapIntensity={0.8}
          side={THREE.DoubleSide}
        />
      </mesh>
    </Float>
  );
}

function GoldRing({ radius, y, thickness = 0.015 }: { radius: number; y: number; thickness?: number }) {
  return (
    <mesh position={[0, y, 0]} rotation={[0, 0, 0]}>
      <torusGeometry args={[radius, thickness, 16, 64]} />
      <meshStandardMaterial color="#C5A467" metalness={0.9} roughness={0.2} />
    </mesh>
  );
}

function GoldBase() {
  return (
    <group>
      {/* Base platform */}
      <mesh position={[0, -2.3, 0]} receiveShadow>
        <cylinderGeometry args={[1.1, 1.2, 0.08, 64]} />
        <meshStandardMaterial color="#C5A467" metalness={0.85} roughness={0.15} />
      </mesh>
      {/* Base accent ring */}
      <GoldRing radius={1.15} y={-2.26} thickness={0.012} />
      {/* Waist accent */}
      <GoldRing radius={0.46} y={0.0} thickness={0.01} />
    </group>
  );
}

function SpinningParticles() {
  const particlesRef = useRef<THREE.Points>(null);
  const count = 40;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const radius = 1.8 + Math.random() * 0.5;
      pos[i * 3] = Math.cos(angle) * radius;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 4;
      pos[i * 3 + 2] = Math.sin(angle) * radius;
    }
    return pos;
  }, []);

  useFrame(({ clock }) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = clock.getElapsedTime() * 0.1;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        color="#C5A467"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

function Scene({ textureUrl }: { textureUrl: string }) {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} castShadow />
      <directionalLight position={[-3, 3, -3]} intensity={0.3} color="#FFF8F0" />
      <spotLight
        position={[0, 6, 0]}
        intensity={0.5}
        angle={0.6}
        penumbra={0.5}
        color="#C5A467"
      />
      <DressForm textureUrl={textureUrl} />
      <GoldBase />
      <SpinningParticles />
      <ContactShadows
        position={[0, -2.35, 0]}
        opacity={0.4}
        scale={5}
        blur={2}
        far={4}
      />
      <Environment preset="studio" />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={2}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 1.8}
      />
    </>
  );
}

function LoadingFallback() {
  return (
    <mesh>
      <cylinderGeometry args={[0.5, 0.9, 3, 32]} />
      <meshStandardMaterial color="#1a1a1a" wireframe />
    </mesh>
  );
}

interface MockupViewer3DProps {
  defaultImage?: string;
  showUpload?: boolean;
  className?: string;
}

export function MockupViewer3D({
  defaultImage = 'https://images.unsplash.com/photo-1590073242678-70ee3fc28e8e?w=800&q=80',
  showUpload = true,
  className = '',
}: MockupViewer3DProps) {
  const [textureUrl, setTextureUrl] = useState(defaultImage);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const url = URL.createObjectURL(file);
      setTextureUrl(url);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const url = URL.createObjectURL(file);
      setTextureUrl(url);
    }
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  return (
    <div className={`relative ${className}`}>
      <div
        className={`relative w-full h-full rounded-lg overflow-hidden transition-all duration-300 ${
          isDragging ? 'ring-2 ring-gold ring-offset-2 ring-offset-deep-black' : ''
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <Canvas
          camera={{ position: [0, 0.5, 5], fov: 40 }}
          shadows
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: true }}
          style={{ background: 'transparent' }}
        >
          <Suspense fallback={<LoadingFallback />}>
            <Scene textureUrl={textureUrl} />
          </Suspense>
        </Canvas>

        {/* Drag overlay */}
        {isDragging && (
          <div className="absolute inset-0 bg-deep-black/60 flex items-center justify-center pointer-events-none z-10">
            <div className="text-center">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-gold mx-auto mb-3">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="text-gold text-sm tracking-wider">Drop your design here</p>
            </div>
          </div>
        )}
      </div>

      {/* Upload button & interaction hint */}
      {showUpload && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3 z-10">
          <button
            onClick={() => fileInputRef.current?.click()}
            className="bg-gold/90 backdrop-blur-sm text-white px-5 py-2.5 text-xs tracking-widest uppercase hover:bg-gold transition-colors duration-300 flex items-center gap-2"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Upload Design
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
      )}

      {/* Interaction hint */}
      <div className="absolute top-4 right-4 z-10">
        <p className="text-white/40 text-xs tracking-wider flex items-center gap-1.5">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zM12 2.25V4.5m5.834.166l-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243l-1.59-1.59" />
          </svg>
          Drag to spin
        </p>
      </div>
    </div>
  );
}
