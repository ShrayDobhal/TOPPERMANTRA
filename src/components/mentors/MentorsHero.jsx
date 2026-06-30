import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../ui/Button';
import { fadeUp, staggerContainer } from '../../lib/animations';

const floatingAvatars = [
  { src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80", top: "15%", left: "10%", size: "w-16 h-16", delay: 0 },
  { src: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80", top: "25%", right: "15%", size: "w-20 h-20", delay: 0.2 },
  { src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80", bottom: "20%", left: "20%", size: "w-14 h-14", delay: 0.4 },
  { src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80", bottom: "30%", right: "10%", size: "w-16 h-16", delay: 0.6 },
  { src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80", top: "10%", left: "50%", size: "w-12 h-12", delay: 0.8 },
];

export default function MentorsHero() {
  return (
    <div className="relative pt-32 pb-20 overflow-hidden flex items-center justify-center min-h-[70vh]">
      
      {/* Background Gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#FF5722]/5 rounded-full blur-[100px]" />
      </div>

      {/* Floating Avatars Background */}
      {floatingAvatars.map((avatar, i) => (
        <motion.div
          key={i}
          className={`absolute ${avatar.size} rounded-full border-4 border-white shadow-xl overflow-hidden hidden md:block z-0`}
          style={{ 
            top: avatar.top, 
            left: avatar.left, 
            right: avatar.right, 
            bottom: avatar.bottom 
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: avatar.delay, type: "spring" }}
        >
          <motion.img
            src={avatar.src}
            alt="Mentor"
            className="w-full h-full object-cover"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: avatar.delay }}
          />
        </motion.div>
      ))}

      {/* Main Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.div variants={fadeUp} className="mb-6">
            <span className="inline-block py-1.5 px-4 rounded-full bg-[#FF5722]/10 text-[#FF5722] font-semibold text-sm border border-[#FF5722]/20">
              India's Top Student Mentor Network
            </span>
          </motion.div>
          
          <motion.h1 
            variants={fadeUp} 
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold font-heading tracking-tight mb-6 text-[#0F172A] leading-[1.05]"
          >
            Learn From People <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF5722] to-[#FE6D4D]">
              Who've Already Done It
            </span>
          </motion.h1>
          
          <motion.p 
            variants={fadeUp} 
            className="text-lg md:text-xl text-[#64748B] mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            Get mentored by IIT students, IIT alumni, top hackathon winners, GSoC contributors, researchers, startup founders, and engineers who have recently achieved what you're working toward.
          </motion.p>
          
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              variant="primary" 
              size="lg" 
              className="w-full sm:w-auto px-8 shadow-[0_4px_14px_0_rgba(255,87,34,0.39)] hover:shadow-[0_6px_20px_rgba(255,87,34,0.23)] hover:scale-105 transition-all"
            >
              Find a Mentor
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="w-full sm:w-auto px-8 bg-white/50 backdrop-blur-md"
            >
              Become a Mentor
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
