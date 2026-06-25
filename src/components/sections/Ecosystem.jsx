import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring, useInView, AnimatePresence } from "framer-motion";
import { fadeUp, staggerContainer, fadeRight, scaleIn } from '../../lib/animations';
import { cn } from '../../lib/utils';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Misc';
import { 
  Network, Code, Map, Users, Trophy, Briefcase, 
  Rocket, Lightbulb, Compass, ArrowRight, ChevronDown, Zap
} from "lucide-react";

// Helper hook for mouse position parallax
function useMousePosition(ref) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      setMousePos({
        x: (e.clientX - rect.left - rect.width / 2) * 0.05,
        y: (e.clientY - rect.top - rect.height / 2) * 0.05
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [ref]);
  
  return mousePos;
}

const nodesData = [
  { id: "mentorship", label: "Mentorship", icon: <Users size={20} />, x: -30, y: -30, color: "#FF5722", desc: "Learn directly from professionals who have already walked the path." },
  { id: "projects", label: "Projects", icon: <Code size={20} />, x: 0, y: -42, color: "#22C55E", desc: "Build real-world applications with teammates and mentors while creating a portfolio employers value." },
  { id: "roadmaps", label: "Roadmaps", icon: <Map size={20} />, x: 30, y: -30, color: "#3B82F6", desc: "Structured learning paths tailored to your career goals." },
  { id: "community", label: "Community", icon: <Network size={20} />, x: 42, y: 0, color: "#FACC15", desc: "Meet ambitious students from across India." },
  { id: "hackathons", label: "Hackathons", icon: <Trophy size={20} />, x: 30, y: 30, color: "#EC4899", desc: "Compete, innovate and solve real-world challenges." },
  { id: "internships", label: "Internships", icon: <Briefcase size={20} />, x: 0, y: 42, color: "#8B5CF6", desc: "Internships, jobs, fellowships and research programs curated for you." },
  { id: "startup", label: "Startup Incubator", icon: <Rocket size={20} />, x: -30, y: 30, color: "#14B8A6", desc: "Turn your ideas into startups with mentorship, validation and resources." },
  { id: "leadership", label: "Leadership", icon: <Lightbulb size={20} />, x: -42, y: 0, color: "#F97316", desc: "Develop communication, teamwork and management skills through active participation." }
];

// Helper to determine interconnected lines
const connections = [
  { from: "mentorship", to: "projects" },
  { from: "projects", to: "roadmaps" },
  { from: "roadmaps", to: "community" },
  { from: "community", to: "hackathons" },
  { from: "hackathons", to: "internships" },
  { from: "internships", to: "startup" },
  { from: "startup", to: "leadership" },
  { from: "leadership", to: "mentorship" },
  { from: "projects", to: "internships" },
  { from: "leadership", to: "community" }
];

function InteractiveNetwork() {
  const containerRef = useRef(null);
  const mousePos = useMousePosition(containerRef);
  const inView = useInView(containerRef, { once: true, margin: "-100px" });
  const [hoveredNode, setHoveredNode] = useState(null);

  const springConfig = { damping: 25, stiffness: 150 };
  const mouseX = useSpring(mousePos.x, springConfig);
  const mouseY = useSpring(mousePos.y, springConfig);

  return (
    <div ref={containerRef} className="relative w-full h-[600px] lg:h-full flex items-center justify-center">
      {/* Background Glow */}
      <motion.div 
        animate={{ x: mouseX.get() * -2, y: mouseY.get() * -2 }}
        className="absolute w-[500px] h-[500px] bg-[#FF5722]/5 rounded-full blur-[100px]" 
      />

      <div className="relative w-full max-w-[600px] aspect-square flex items-center justify-center">
        
        {/* SVG Connections */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
          <defs>
            <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FF5722" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#FE6D4D" stopOpacity="0.1" />
            </linearGradient>
            <linearGradient id="activeLineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FF5722" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#FE6D4D" stopOpacity="0.5" />
            </linearGradient>
          </defs>

          {/* Lines to center */}
          {nodesData.map((node, i) => (
            <motion.line
              key={`center-line-${i}`}
              x1="50" y1="50" x2={50 + node.x} y2={50 + node.y}
              stroke={hoveredNode === node.id ? "url(#activeLineGrad)" : "url(#lineGrad)"}
              strokeWidth={hoveredNode === node.id ? "0.6" : "0.2"}
              initial={{ pathLength: 0 }}
              animate={inView ? { pathLength: 1 } : {}}
              transition={{ duration: 1.5, delay: 0.5 + i * 0.1 }}
            />
          ))}

          {/* Interconnections */}
          {connections.map((conn, i) => {
            const fromNode = nodesData.find(n => n.id === conn.from);
            const toNode = nodesData.find(n => n.id === conn.to);
            if (!fromNode || !toNode) return null;
            const isHovered = hoveredNode === fromNode.id || hoveredNode === toNode.id;
            return (
              <motion.line
                key={`conn-${i}`}
                x1={50 + fromNode.x} y1={50 + fromNode.y} x2={50 + toNode.x} y2={50 + toNode.y}
                stroke={isHovered ? "url(#activeLineGrad)" : "url(#lineGrad)"}
                strokeWidth={isHovered ? "0.4" : "0.1"}
                strokeDasharray="1 1"
                initial={{ pathLength: 0 }}
                animate={inView ? { pathLength: 1 } : {}}
                transition={{ duration: 1.5, delay: 1.5 + i * 0.1 }}
              />
            )
          })}
        </svg>

        {/* Central Node */}
        <motion.div 
          initial={{ scale: 0, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 1, type: "spring" }}
          style={{ x: mouseX, y: mouseY }}
          className="absolute z-20 flex flex-col items-center justify-center"
        >
          <div className="relative w-40 h-40 md:w-48 md:h-48 rounded-full bg-white shadow-2xl border border-[#E9ECEF] flex flex-col items-center justify-center p-6 text-center group cursor-pointer overflow-hidden">
            <div className="absolute inset-0 bg-[#FF5722]/5 animate-[spin_10s_linear_infinite]"></div>
            <div className="absolute inset-0 rounded-full border-2 border-dashed border-[#FF5722]/20 animate-[spin_20s_linear_infinite_reverse]"></div>
            
            <div className="relative z-10">
              <h3 className="font-heading font-extrabold text-[#0F172A] tracking-tight text-lg leading-tight mb-1">
                TOPPER<br/>MANTRA
              </h3>
              <p className="text-[10px] text-[#64748B] font-semibold uppercase tracking-wider">Growth Ecosystem</p>
            </div>
          </div>
        </motion.div>

        {/* Floating Nodes */}
        {nodesData.map((node, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0, opacity: 0 }}
            animate={inView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.8 + i * 0.1, type: "spring" }}
            className="absolute z-30"
            style={{ 
              left: `${50 + node.x}%`, 
              top: `${50 + node.y}%`,
              transform: `translate(${node.x < 0 ? '-100%' : node.x > 0 ? '0%' : '-50%'}, ${node.y < 0 && node.x === 0 ? '-100%' : node.y > 0 && node.x === 0 ? '0%' : '-50%'})`
            }}
            onMouseEnter={() => setHoveredNode(node.id)}
            onMouseLeave={() => setHoveredNode(null)}
          >
            <div 
              className={cn(
                "relative group cursor-pointer flex items-center gap-2 px-3 py-2 md:px-4 md:py-2.5 rounded-xl shadow-lg backdrop-blur-xl border transition-all duration-300",
                node.x <= 0 ? "flex-row-reverse" : "",
                hoveredNode === node.id ? "scale-110 bg-white border-[#FF5722]/50 shadow-[0_0_20px_rgba(255,87,34,0.3)]" : "bg-white/90 border-[#E9ECEF]"
              )}
            >
              {/* Node Icon */}
              <div style={{ color: hoveredNode === node.id ? "#FF5722" : node.color }} className="shrink-0 scale-90 md:scale-100">
                {node.icon}
              </div>
              
              {/* Node Label */}
              <div className="text-[10px] md:text-xs font-bold text-[#0F172A] whitespace-nowrap">
                {node.label}
              </div>

              {/* Popup */}
              <AnimatePresence>
                {hoveredNode === node.id && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.9 }}
                    className="absolute top-full mt-4 w-48 bg-[#0F172A] text-white p-4 rounded-2xl shadow-2xl z-50 pointer-events-none"
                  >
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-[#0F172A] rotate-45"></div>
                    <p className="text-xs leading-relaxed relative z-10">{node.desc}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        ))}

        {/* Particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute w-1 h-1 bg-[#FF5722] rounded-full opacity-0 z-0"
            initial={{ 
              left: `${50 + (Math.random() * 80 - 40)}%`, 
              top: `${50 + (Math.random() * 80 - 40)}%`
            }}
            animate={{ 
              y: [0, -30],
              opacity: [0, 0.4, 0]
            }}
            transition={{ 
              duration: 2 + Math.random() * 3, 
              repeat: Infinity, 
              delay: Math.random() * 5 
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default function EcosystemSection() {
  const lineVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
  };

  return (
    <section className="relative pt-8 md:pt-12 pb-12 md:pb-20 bg-white overflow-hidden">
      <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Split Screen Layout */}
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-20 mb-24">
          
          {/* Left Side: Storytelling (45%) */}
          <div className="w-full lg:w-[45%] flex flex-col justify-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}>
              <motion.div variants={fadeUp} className="mb-6">
                <Badge variant="neutral" className="bg-[#FF5722]/5 text-[#FF5722] border border-[#FF5722]/20">OUR ECOSYSTEM</Badge>
              </motion.div>
              
              <h2 className="text-[40px] md:text-[56px] font-heading font-extrabold text-[#0F172A] tracking-tighter leading-[1.1] mb-6">
                <div className="overflow-hidden">
                  <motion.span variants={lineVariants} className="block">One Ecosystem</motion.span>
                </div>
                <div className="overflow-hidden">
                  <motion.span variants={lineVariants} className="block text-transparent bg-clip-text bg-gradient-to-r from-[#FF5722] to-[#FE6D4D]">Infinite Opportunities</motion.span>
                </div>
              </h2>

              <motion.div variants={fadeUp} className="text-[18px] text-[#64748B] space-y-4 font-sans leading-relaxed">
                <p>Growth doesn't happen through one course, one mentor, or one internship.</p>
                <p>It happens when mentorship, projects, communities, roadmaps, startups, hackathons, and opportunities work together to create continuous momentum.</p>
                <p className="font-medium text-[#0F172A] border-l-4 border-[#FF5722] pl-4 py-1">
                  Topper Mantra connects every part of that journey into one ecosystem.
                </p>
              </motion.div>
            </motion.div>
          </div>

          {/* Right Side: Interactive Visual (55%) */}
          <div className="w-full lg:w-[55%] lg:h-[600px] flex items-center justify-center">
            <InteractiveNetwork />
          </div>
        </div>

        {/* Feature Grid Below */}
        <motion.div 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true, margin: "-100px" }} 
          variants={staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4"
        >
          {nodesData.slice(0, 5).map((node, i) => (
            <motion.div 
              key={i}
              variants={fadeUp}
              whileHover={{ y: -5, boxShadow: "0 10px 30px -10px rgba(255,87,34,0.15)", borderColor: "rgba(255,87,34,0.3)" }}
              className="group bg-white/60 backdrop-blur-xl border border-[#E9ECEF] rounded-[20px] p-6 flex flex-col transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-xl bg-[#E9ECEF]/50 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-[#FF5722]/10 transition-all duration-300">
                <div className="text-[#64748B] group-hover:text-[#FF5722] transition-colors">{node.icon}</div>
              </div>
              <h4 className="font-heading font-bold text-[#0F172A] mb-2">{node.label}</h4>
              <p className="text-sm text-[#64748B] leading-relaxed mb-6 flex-1">{node.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Transition removed as requested */}

      </div>
    </section>
  );
}
