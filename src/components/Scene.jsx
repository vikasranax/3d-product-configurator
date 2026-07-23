import { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import gsap from 'gsap'

// Material properties
const MATERIALS = {
  standard: { roughness: 0.4, metalness: 0.1 },
  metallic: { roughness: 0.1, metalness: 0.9 },
  matte: { roughness: 0.9, metalness: 0.0 },
  glossy: { roughness: 0.05, metalness: 0.3 }
}

// Simple 3D Product
function Product({ color, scale, material }) {
  const meshRef = useRef()
  const [animScale, setAnimScale] = useState(0)

  // GSAP entrance animation
  useEffect(() => {
    const obj = { value: 0 }
    gsap.to(obj, {
      value: 1,
      duration: 1.5,
      ease: "elastic.out(1, 0.5)",
      onUpdate: () => setAnimScale(obj.value)
    })
  }, [])

  // Gentle rotation
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2
    }
  })

  const finalScale = animScale * scale
  const mat = MATERIALS[material] || MATERIALS.standard

  return (
    <mesh ref={meshRef} scale={finalScale} castShadow receiveShadow>
      <boxGeometry args={[2, 2.5, 3]} />
      <meshStandardMaterial
        color={color}
        roughness={mat.roughness}
        metalness={mat.metalness}
      />
    </mesh>
  )
}

// Main Scene
export default function Scene({ config }) {
  return (
    <div className="w-full h-screen relative bg-[#0f172a]">
      <Canvas
        shadows
        camera={{ position: [5, 3, 5], fov: 45 }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 10, 5]} intensity={1} castShadow />
        
        <Product 
          color={config.color} 
          scale={config.scale} 
          material={config.material} 
        />
        
        <OrbitControls
          enablePan={false}
          minDistance={3}
          maxDistance={12}
          autoRotate={config.autoRotate}
          autoRotateSpeed={2}
        />
      </Canvas>
      
      <div className="absolute top-6 left-6 pointer-events-none">
        <h1 className="text-4xl font-bold tracking-tight text-white">3D Configurator</h1>
        <p className="text-slate-400 mt-1">Drag to rotate • Scroll to zoom</p>
      </div>
    </div>
  )
}