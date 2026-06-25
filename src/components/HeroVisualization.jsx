import { useState } from "react";
import { motion } from "framer-motion";
import { User, Users, Rocket, Trophy, Briefcase, Cpu, Laptop } from "lucide-react";
import { cn } from "../lib/utils";

export default function HeroVisualization() {
  const nodes = [
    { icon: <Cpu size={24} />, label: "AI / Tech", color: "text-[#3B82F6]", bg: "bg-[#3B82F6]/10", angle: -90 },
    { icon: <Rocket size={24} />, label: "Startups", color: "text-[#22C55E]", bg: "bg-[#22C55E]/10", angle: -30 },
    { icon: <Briefcase size={24} />, label: "Careers", color: "text-[#EF4444]", bg: "bg-[#EF4444]/10", angle: 30 },
    { icon: <Laptop size={24} />, label: "Internships", color: "text-[#A855F7]", bg: "bg-[#A855F7]/10", angle: 90 },
    { icon: <Trophy size={24} />, label: "Hackathons", color: "text-[#FACC15]", bg: "bg-[#FACC15]/10", angle: 150 },
    { icon: <Users size={24} />, label: "Mentors", color: "text-[#FF5722]", bg: "bg-[#FF5722]/10", angle: 210 },
  ];

  const radius = 220; // Orbit radius

  return (
    <div className="relative w-full h-[500px] lg:h-[600px] flex items-center justify-center">
      
      {/* Background Glowing Orbs */}
      <div className="absolute w-96 h-96 bg-[#FF5722]/5 rounded-full blur-[80px]" />
      
      {/* Concentric Dashed Orbit Circles */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="absolute w-[260px] h-[260px] rounded-full border border-dashed border-[#FF5722]/30" 
        />
        <motion.div 
          animate={{ rotate: -360 }}
          transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
          className="absolute w-[440px] h-[440px] rounded-full border border-dashed border-[#FF5722]/30" 
        />
      </div>

      <div className="relative z-10 w-full h-full flex items-center justify-center">
        
        {/* Central Node */}
        <motion.div 
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="relative z-30 flex flex-col items-center justify-center w-28 h-28 bg-white rounded-3xl shadow-2xl border border-[#FF5722]/20"
        >
          <div className="absolute inset-0 bg-[#FF5722]/5 rounded-3xl animate-pulse"></div>
          <User className="w-12 h-12 text-[#FF5722]" />
          <div className="absolute -bottom-3 bg-[#0F172A] text-white text-[11px] font-bold px-3 py-1 rounded-full whitespace-nowrap shadow-md">
            You
          </div>
        </motion.div>

        {/* Orbiting Satellite Nodes */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="absolute flex items-center justify-center z-20"
        >
          {nodes.map((node, i) => {
            // Position nodes in a circle
            const x = Math.cos(node.angle * Math.PI / 180) * radius;
            const y = Math.sin(node.angle * Math.PI / 180) * radius;

            return (
              <div 
                key={i} 
                className="absolute" 
                style={{ transform: `translate(${x}px, ${y}px)` }}
              >
                {/* Counter-rotation to keep the cards upright */}
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                  className="flex flex-col items-center justify-center -ml-10 -mt-10 w-20 h-20"
                >
                  <motion.div 
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8, delay: i * 0.1, type: "spring" }}
                    className={cn("w-16 h-16 rounded-2xl flex items-center justify-center shadow-md backdrop-blur-md border border-white bg-white/90", node.bg)}
                  >
                    <div className={node.color}>{node.icon}</div>
                  </motion.div>
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: i * 0.1 + 0.3 }}
                    className="mt-2 text-[10px] font-bold text-[#0F172A] bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full shadow-sm whitespace-nowrap border border-black/5"
                  >
                    {node.label}
                  </motion.div>
                </motion.div>
              </div>
            );
          })}
        </motion.div>

      </div>

      {/* Floating Particles */}
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-1.5 h-1.5 bg-[#FF5722] rounded-full opacity-30"
          initial={{ 
            x: Math.random() * 500 - 250, 
            y: Math.random() * 500 - 250 
          }}
          animate={{ 
            y: [null, Math.random() * -100 - 50],
            opacity: [0, 0.4, 0]
          }}
          transition={{ 
            duration: Math.random() * 3 + 3, 
            repeat: Infinity, 
            delay: Math.random() * 2 
          }}
        />
      ))}
    </div>
  );
}
