"use client"; // This makes the component a Client Component

import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { motion } from 'framer-motion'

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    if (!canvasRef.current) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, alpha: true, antialias: true })
    renderer.setSize(600, 600)
    renderer.setPixelRatio(window.devicePixelRatio)

    const group = new THREE.Group()
    scene.add(group)

    const nucleusGeometry = new THREE.SphereGeometry(0.5, 32, 32)
    const nucleusMaterial = new THREE.MeshPhongMaterial({
      color: 0xff6347,
      shininess: 150,
      emissive: 0xff6347,
      emissiveIntensity: 0.5,
    })
    const nucleus = new THREE.Mesh(nucleusGeometry, nucleusMaterial)
    group.add(nucleus)

    const colors = [0x00bfff, 0x7fff00, 0xffd700, 0xff69b4, 0x9932cc, 0xff4500, 0x00fa9a]
    const electronMaterials = colors.map(color => new THREE.MeshPhongMaterial({
      color: color,
      shininess: 150,
      emissive: color,
      emissiveIntensity: 0.5,
    }))

    for (let i = 0; i < 7; i++) {
      const orbitRadius = 0.8 + i * 0.3
      const electronOrbitGeometry = new THREE.TorusGeometry(orbitRadius, 0.02, 16, 100)
      const electronOrbit = new THREE.Mesh(electronOrbitGeometry, electronMaterials[i])
      electronOrbit.rotation.x = Math.random() * Math.PI
      electronOrbit.rotation.y = Math.random() * Math.PI
      group.add(electronOrbit)

      const electronGeometry = new THREE.SphereGeometry(0.05, 16, 16)
      const electron = new THREE.Mesh(electronGeometry, electronMaterials[i])
      const angle = Math.random() * Math.PI * 2
      electron.position.set(
        Math.cos(angle) * orbitRadius,
        Math.sin(angle) * orbitRadius * Math.cos(electronOrbit.rotation.x),
        Math.sin(angle) * orbitRadius * Math.sin(electronOrbit.rotation.x)
      )
      group.add(electron)
    }

    const ambientLight = new THREE.AmbientLight(0x404040)
    scene.add(ambientLight)

    const pointLight = new THREE.PointLight(0xffffff, 1, 100)
    pointLight.position.set(10, 10, 10)
    scene.add(pointLight)

    camera.position.z = 5

    const animate = () => {
      requestAnimationFrame(animate)

      const speedFactor = isHovered ? 10 : 2 // Increase speed factor

      group.rotation.x += 0.005 * speedFactor // Faster rotation on X axis
      group.rotation.y += 0.01 * speedFactor // Faster rotation on Y axis

      group.children.forEach((child, index) => {
        if (index > 0 && index % 2 === 0) {
          const orbit = group.children[index - 1] as THREE.Mesh;
          
          if (orbit.geometry && orbit.geometry instanceof THREE.TorusGeometry) {
            const orbitRadius = orbit.geometry.parameters.radius;
            const speed = 0.005 / (index / 2); // Increase speed
            const angle = Date.now() * speed;
            
            child.position.set(
              Math.cos(angle) * orbitRadius,
              Math.sin(angle) * orbitRadius * Math.cos(orbit.rotation.x),
              Math.sin(angle) * orbitRadius * Math.sin(orbit.rotation.x)
            );
          }
        }
      })

      renderer.render(scene, camera)
    }

    animate()
    setIsLoaded(true)

    return () => {
      renderer.dispose()
    }
  }, [isHovered])

  return (
    <div 
      className="min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-gray-900 text-white"
    >
      <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
        <motion.main 
          className="flex flex-col gap-8 items-center lg:items-start max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }} // Faster animation duration
        >
          <img src="/brain.svg" alt="Brainstorm Logo" width="180" height="38" className="invert" />
          <motion.h1 
            className="text-5xl font-bold text-center lg:text-left text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-400"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.35 }} // Faster duration
          >
            Unleash Your Creativity with BrainStorm
          </motion.h1>
          <motion.p 
            className="text-xl text-center lg:text-left text-gray-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.35 }} // Faster duration
          >
            BrainStorm is the ultimate brainstorming app that helps you capture, organize, and develop your ideas effortlessly.
          </motion.p>
          <motion.div 
            className="flex gap-4 items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.35 }} // Faster duration
          >
            <a
              className="rounded-full border-2 border-blue-500 flex items-center justify-center bg-blue-600 text-white gap-2 text-lg h-14 px-8 transition-all duration-200 transform shadow-lg"
              href="#"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="/brain.svg" alt="" width="24" height="24" className="invert" aria-hidden="true" />
              Start Brainstorming
            </a>
          </motion.div>
        </motion.main>
        <motion.div 
          className="w-[600px] h-[600px] relative"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.35 }} // Faster duration
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-teal-500/20 rounded-full filter blur-3xl"></div>
          <canvas ref={canvasRef} width="600" height="600" aria-label="Dynamic 3D visualization of an atom with 7 orbits" className={`relative z-10 transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`} />
        </motion.div>
      </div>
      <motion.footer 
        className="mt-16 flex gap-6 flex-wrap items-center justify-center text-gray-400"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.35 }} // Faster duration
      >
        <a
          className="flex items-center gap-2 hover:text-blue-300 transition-colors duration-200"
          href="#"
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-book-open"
            aria-hidden="true"
          >
            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
          </svg>
          Docs
        </a>
      </motion.footer>
    </div>
  )
}
