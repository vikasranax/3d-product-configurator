import { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Environment, ContactShadows, Float } from '@react-three/drei'
import gsap from 'gsap'
import * as THREE from 'three'

// The 3D Product Component
function Product({ color, scale, material }) {
  const meshRef = useRef()
  const [animScale, setAnimScale] = useState(0)

  // Material properties based on selection
  const materialProps = {
    standard: { roughness: 0.4, metalness: 0.1 },
    metallic: { roughness: 0.1, metalness: 0.9 },
    matte: { roughness: 0.9, metalness: 0.0 },
    glossy: { roughness: 0.05, metalness: 0.3 }
  }

  // GSAP entrance animation
  useEffect(() => {
    gsap.to({ value: 0 }, {
      value: 1,
      duration: 1.5,
      ease: "elastic.out(1, 0.5)",
      onUpdate: function() {
        setAnimScale(this.targets()[0].value)
      }
    })
  }, [])

  // Gentle floating animation
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.05
    }
  })

  const finalScale = animScale * scale

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef} scale={finalScale} castShadow receiveShadow>
        <boxGeometry args={[2, 2.5, 3]} />
        <meshStandardMaterial
          color={color}
          {...materialProps[material]}
          envMapIntensity={1}
        />
      </mesh>
    </Float>
  )
}

// Main Scene
export default function Scene({ config }) {
  return (
    <div className="w-full h-screen relative">
      <Canvas
        shadows
        camera={{ position: [5, 3, 5], fov: 45 }}
        gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping }}
      >
        {/* Lighting */}
        <ambientLight intensity={0.3} />
        <directionalLight
          position={[5, 10, 5]}
          intensity={1.5}
          castShadow
          shadow-mapSize={[2048, 2048]}
        />
        <pointLight position={[-5, 5, -5]} intensity={0.5} color="#3b82f6" />
        
        {/* Environment for realistic reflections */}
        <Environment preset="city" />
        
        {/* The Product */}
        <Product 
          color={config.color} 
          scale={config.scale} 
          material={config.material} 
        />
        
        {/* Ground shadows */}
        <ContactShadows
          position={[0, -2, 0]}
          opacity={0.6}
          scale={10}
          blur={2}
          far={4}
        />
        
        {/* Mouse Controls */}
        <OrbitControls
          enablePan={false}
          minDistance={3}
          maxDistance={12}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 2}
          autoRotate={config.autoRotate}
          autoRotateSpeed={2}
        />
      </Canvas>
      
      {/* Overlay UI */}
      <div className="absolute top-6 left-6 pointer-events-none">
        <h1 className="text-4xl font-bold tracking-tight text-white">3D Configurator</h1>
        <p className="text-slate-400 mt-1">Drag to rotate • Scroll to zoom</p>
      </div>
    </div>
  )
}