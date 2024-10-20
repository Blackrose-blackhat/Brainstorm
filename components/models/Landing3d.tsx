// CanvasComponent.tsx
"use client";
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { motion } from 'framer-motion';

export const Landing3d = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, alpha: true, antialias: true });
    renderer.setSize(600, 600);
    renderer.setPixelRatio(window.devicePixelRatio);

    const group = new THREE.Group();
    scene.add(group);

    const nucleusGeometry = new THREE.SphereGeometry(0.5, 32, 32);
    const nucleusMaterial = new THREE.MeshPhongMaterial({
      color: 0xff6347,
      shininess: 150,
      emissive: 0xff6347,
      emissiveIntensity: 0.5,
    });
    const nucleus = new THREE.Mesh(nucleusGeometry, nucleusMaterial);
    group.add(nucleus);

    const colors = [0x00bfff, 0x7fff00, 0xffd700, 0xff69b4, 0x9932cc, 0xff4500, 0x00fa9a];
    const electronMaterials = colors.map(color => new THREE.MeshPhongMaterial({
      color: color,
      shininess: 150,
      emissive: color,
      emissiveIntensity: 0.5,
    }));

    for (let i = 0; i < 7; i++) {
      const orbitRadius = 0.8 + i * 0.3;
      const electronOrbitGeometry = new THREE.TorusGeometry(orbitRadius, 0.02, 16, 100);
      const electronOrbit = new THREE.Mesh(electronOrbitGeometry, electronMaterials[i]);
      electronOrbit.rotation.x = Math.random() * Math.PI;
      electronOrbit.rotation.y = Math.random() * Math.PI;
      group.add(electronOrbit);

      const electronGeometry = new THREE.SphereGeometry(0.05, 16, 16);
      const electron = new THREE.Mesh(electronGeometry, electronMaterials[i]);
      const angle = Math.random() * Math.PI * 2;
      electron.position.set(
        Math.cos(angle) * orbitRadius,
        Math.sin(angle) * orbitRadius * Math.cos(electronOrbit.rotation.x),
        Math.sin(angle) * orbitRadius * Math.sin(electronOrbit.rotation.x)
      );
      group.add(electron);
    }

    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 1, 100);
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);

    camera.position.z = 5;

    const animate = () => {
      requestAnimationFrame(animate);

      const speedFactor = isHovered ? 10 : 2;
      group.rotation.x += 0.005 * speedFactor;
      group.rotation.y += 0.01 * speedFactor;

      group.children.forEach((child, index) => {
        if (index > 0 && index % 2 === 0) {
          const orbit = group.children[index - 1] as THREE.Mesh;
          if (orbit.geometry && orbit.geometry instanceof THREE.TorusGeometry) {
            const orbitRadius = orbit.geometry.parameters.radius;
            const speed = 0.005 / (index / 2);
            const angle = Date.now() * speed;

            child.position.set(
              Math.cos(angle) * orbitRadius,
              Math.sin(angle) * orbitRadius * Math.cos(orbit.rotation.x),
              Math.sin(angle) * orbitRadius * Math.sin(orbit.rotation.x)
            );
          }
        }
      });

      renderer.render(scene, camera);
    };

    animate();
    setIsLoaded(true);

    return () => {
      renderer.dispose();
    };
  }, [isHovered]);

  return (
    <motion.div 
      className="w-[600px] h-[600px] relative"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.6, duration: 0.35 }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-teal-500/20 rounded-full filter blur-3xl"></div>
      <canvas ref={canvasRef} width="600" height="600" aria-label="Dynamic 3D visualization of an atom with 7 orbits" className={`relative z-10 transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`} />
    </motion.div>
  );
};
