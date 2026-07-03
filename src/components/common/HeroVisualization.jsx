import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Users, Rocket, Trophy, Briefcase, Cpu, Laptop, Compass, FileText } from "lucide-react";
import { cn } from '../../lib/utils';

export default function HeroVisualization() {
  const [hoveredNode, setHoveredNode] = useState(null);

  const nodes = [
    { id: 'hackathons', icon: <Trophy size={20} />, label: "Hackathons", color: "text-amber-500", bg: "bg-amber-50", angle: -90, radius: 240 },
    { id: 'ai', icon: <Cpu size={20} />, label: "AI / Tech", color: "text-blue-500", bg: "bg-blue-50", angle: -30, radius: 240 },
    { id: 'startups', icon: <Rocket size={20} />, label: "Startups", color: "text-green-500", bg: "bg-green-50", angle: 30, radius: 240 },
    { id: 'careers', icon: <Briefcase size={20} />, label: "Careers", color: "text-rose-500", bg: "bg-rose-50", angle: 90, radius: 240 },
    { id: 'internships', icon: <Laptop size={20} />, label: "Internships", color: "text-purple-500", bg: "bg-purple-50", angle: 150, radius: 240 },
    { id: 'mentors', icon: <Users size={20} />, label: "Mentors", color: "text-[#FF5722]", bg: "bg-[#FF5722]/10", angle: 210, radius: 240 },
  ];

  return (
    <div className="relative w-full h-[550px] lg:h-[650px] flex items-center justify-center">
      
      {/* Background Glowing Orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-br from-[#FF5722]/10 to-orange-400/10 rounded-full blur-[100px] pointer-events-none animate-pulse" />
      
      {/* Concentric Dashed Orbit Circles */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="absolute w-[300px] h-[300px] rounded-full border border-dashed border-[#FF5722]/20 shadow-[0_0_50px_rgba(255,87,34,0.05)] animate-[spin_60s_linear_infinite]" />
        <div className="absolute w-[480px] h-[480px] rounded-full border border-dashed border-[#FF5722]/15 shadow-[0_0_80px_rgba(255,87,34,0.02)] animate-[spin_90s_linear_infinite_reverse]" />
      </div>

      <div className="relative z-10 w-full h-full flex items-center justify-center">
        
        {/* Central Node */}
        <motion.div 
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
          className="relative z-30 flex flex-col items-center justify-center w-[130px] h-[130px] bg-white rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] border border-[#E9ECEF]"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-[#FF5722]/10 to-transparent rounded-3xl animate-pulse"></div>
          <div className="absolute inset-0 border-2 border-[#FF5722]/20 rounded-3xl animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite]"></div>
          <User className="w-12 h-12 text-[#FF5722] relative z-10 stroke-[2.5]" />
          <div className="absolute -bottom-3 bg-gradient-to-r from-[#FF5722] to-[#FF9800] text-white text-[11px] font-bold px-5 py-1.5 rounded-full shadow-lg border border-[#FF5722]/20">
            You
          </div>
        </motion.div>

        {/* Outer Orbit */}
        <motion.div 
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
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
                onMouseEnter={() => setHoveredNode(node.id)}
                onMouseLeave={() => setHoveredNode(null)}
              >
                {/* Counter-rotation so icons stay upright */}
                <motion.div
                  initial={{ rotate: 0 }}
                  animate={{ rotate: -360 }}
                  transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                  className="absolute -left-[35px] -top-[35px] w-[70px] h-[70px] group cursor-pointer"
                >
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8, delay: i * 0.1 + 0.3, type: "spring" }}
                    className={cn(
                      "w-[70px] h-[70px] rounded-2xl flex items-center justify-center shadow-md border-2 transition-all duration-300 relative", 
                      node.bg,
                      hoveredNode === node.id ? "scale-125 border-transparent z-50 shadow-2xl" : "border-white hover:scale-110"
                    )}
                  >
                    <div className={cn("transition-transform duration-300", hoveredNode === node.id ? "scale-110" : "", node.color)}>
                      {node.icon}
                    </div>
                    
                    {/* Hover Glow */}
                    {hoveredNode === node.id && (
                      <div className="absolute inset-0 bg-white/20 blur-md rounded-2xl -z-10" />
                    )}
                    
                    {/* Label */}
                    <div className={cn(
                      "absolute -bottom-10 left-1/2 -translate-x-1/2 bg-white border border-slate-200 text-[#0F172A] text-[11px] font-bold px-4 py-2 rounded-full shadow-lg whitespace-nowrap transition-all duration-300",
                      hoveredNode === node.id ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"
                    )}>
                      {node.label}
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            );
          })}
        </motion.div>

      </div>

      {/* Connection Lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.03]">
        <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="2"/>
        </pattern>
        <rect width="100%" height="100%" fill="url(#grid-pattern)" />
      </svg>
    </div>
  );
}
