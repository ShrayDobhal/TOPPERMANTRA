import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Users, Rocket, Trophy, Briefcase, Cpu, Laptop, Compass, FileText } from "lucide-react";
import { cn } from '../../lib/utils';

export default function HeroVisualization() {
  const [hoveredNode, setHoveredNode] = useState(null);

  const nodes = [
    { id: 'hackathons', icon: <Trophy size={20} />, label: "Hackathons", color: "text-amber-500", bg: "bg-amber-50", angle: -90, radius: 220 },
    { id: 'ai', icon: <Cpu size={20} />, label: "AI / Tech", color: "text-blue-500", bg: "bg-blue-50", angle: -30, radius: 220 },
    { id: 'startups', icon: <Rocket size={20} />, label: "Startups", color: "text-green-500", bg: "bg-green-50", angle: 30, radius: 220 },
    { id: 'careers', icon: <Briefcase size={20} />, label: "Careers", color: "text-red-500", bg: "bg-red-50", angle: 90, radius: 220 },
    { id: 'internships', icon: <Laptop size={20} />, label: "Internships", color: "text-purple-500", bg: "bg-purple-50", angle: 150, radius: 220 },
    { id: 'mentors', icon: <Users size={20} />, label: "Mentors", color: "text-[#FF5722]", bg: "bg-[#FF5722]/10", angle: 210, radius: 220 },
  ];

  const baseRadius = 200;

  return (
    <div className="relative w-full h-[550px] lg:h-[650px] flex items-center justify-center">
      
      {/* Background Glowing Orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#FF5722]/5 rounded-full blur-[100px] pointer-events-none" />
      
      {/* Concentric Dashed Orbit Circles */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="absolute w-[280px] h-[280px] rounded-full border border-dashed border-[#FF5722]/20" />
        <div className="absolute w-[440px] h-[440px] rounded-full border border-dashed border-[#FF5722]/10" />
      </div>

      <div className="relative z-10 w-full h-full flex items-center justify-center">
        
        {/* Central Node */}
        <motion.div 
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
          className="relative z-30 flex flex-col items-center justify-center w-[120px] h-[120px] bg-white rounded-3xl shadow-xl border border-[#E9ECEF]"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-[#FF5722]/5 to-transparent rounded-3xl animate-pulse"></div>
          <User className="w-10 h-10 text-[#FF5722] relative z-10 stroke-[2.5]" />
          <div className="absolute -bottom-3 bg-[#0F172A] text-white text-[11px] font-bold px-4 py-1.5 rounded-full shadow-lg border border-[#0F172A]">
            You
          </div>
        </motion.div>

        {/* Outer Orbit (Radius 220) */}
        <motion.div 
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 75, repeat: Infinity, ease: "linear" }}
          className="absolute flex items-center justify-center z-20 w-full h-full"
        >
          {nodes.map((node, i) => {
            const radian = (node.angle * Math.PI) / 180;
            const x = Math.cos(radian) * node.radius;
            const y = Math.sin(radian) * node.radius;

            return (
              <div 
                key={node.id} 
                className="absolute w-0 h-0" 
                style={{ transform: `translate(${x}px, ${y}px)` }}
              >
                {/* Counter-rotation so icons stay upright (-360 to counter +360 orbit) */}
                <motion.div
                  initial={{ rotate: 0 }}
                  animate={{ rotate: -360 }}
                  transition={{ duration: 75, repeat: Infinity, ease: "linear" }}
                  className="absolute -left-[30px] -top-[30px] w-[60px] h-[60px] group cursor-pointer"
                >
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8, delay: i * 0.1 + 0.3, type: "spring" }}
                    className={cn(
                      "w-[60px] h-[60px] rounded-2xl flex items-center justify-center shadow-sm border border-white transition-transform duration-300 group-hover:scale-110 relative", 
                      node.bg
                    )}
                  >
                    <div className={node.color}>{node.icon}</div>
                    
                    {/* Label */}
                    <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-white border border-slate-200 text-[#0F172A] text-[10px] font-bold px-3 py-1.5 rounded-full shadow-sm whitespace-nowrap opacity-90 group-hover:opacity-100 transition-opacity">
                      {node.label}
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            );
          })}
        </motion.div>

      </div>

      {/* Connection Lines (Simulated glowing web) */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.02]">
        <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1"/>
        </pattern>
        <rect width="100%" height="100%" fill="url(#grid-pattern)" />
      </svg>
    </div>
  );
}
