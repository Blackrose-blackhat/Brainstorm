"use client"
import { motion } from 'framer-motion'
import { Landing3d } from '@/components/models/Landing3d';
import Image from 'next/image';
import AuthButton from '../Buttons/AuthButton';
const Hero = () => {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
        <motion.main 
          className="flex flex-col gap-8 items-center lg:items-start max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }} // Faster animation duration
        >
          <Image src="/brain.svg" alt="Brainstorm Logo" width="180" height="38" className="invert" />
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
          <AuthButton />
        </motion.main>
        <motion.div 
          className="w-[600px] h-[600px] relative"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.35 }} // Faster duration
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-teal-500/20 rounded-full filter blur-3xl"></div>
          <Landing3d />
        </motion.div>
      </div>
  )
}

export default Hero