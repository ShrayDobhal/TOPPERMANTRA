const fs = require('fs');

const fileContent = fs.readFileSync('src/components/sections/Ecosystem.jsx', 'utf8');

const regex = /function InteractiveNetwork\(\) \{[\s\S]*?(?=export default function EcosystemSection\(\) \{)/;

const newComponent = `function InteractiveNetwork() {
  const containerRef = useRef(null);
  const mousePos = useMousePosition(containerRef);
  const inView = useInView(containerRef, { once: true, margin: "-100px" });
  const [hoveredNode, setHoveredNode] = useState(null);

  const springConfig = { damping: 25, stiffness: 150 };
  const mouseX = useSpring(mousePos.x, springConfig);
  const mouseY = useSpring(mousePos.y, springConfig);

  // Use mathematically perfect radius of 42% for all nodes
  const R = 42;
  const D = R * Math.cos(Math.PI / 4); // ~ 29.7

  const orbitNodes = [
    { id: "mentorship", label: "Mentorship", icon: <Users size={20} />, x: -D, y: -D, color: "#FF5722", desc: "Learn directly from professionals who have already walked the path." },
    { id: "projects", label: "Projects", icon: <Code size={20} />, x: 0, y: -R, color: "#22C55E", desc: "Build real-world applications with teammates and mentors while creating a portfolio employers value." },
    { id: "roadmaps", label: "Roadmaps", icon: <Map size={20} />, x: D, y: -D, color: "#3B82F6", desc: "Structured learning paths tailored to your career goals." },
    { id: "community", label: "Community", icon: <Network size={20} />, x: R, y: 0, color: "#FACC15", desc: "Meet ambitious students from across India." },
    { id: "hackathons", label: "Hackathons", icon: <Trophy size={20} />, x: D, y: D, color: "#EC4899", desc: "Compete, innovate and solve real-world challenges." },
    { id: "internships", label: "Internships", icon: <Briefcase size={20} />, x: 0, y: R, color: "#8B5CF6", desc: "Internships, jobs, fellowships and research programs curated for you." },
    { id: "startup", label: "Startup Incubator", icon: <Rocket size={20} />, x: -D, y: D, color: "#14B8A6", desc: "Turn your ideas into startups with mentorship, validation and resources." },
    { id: "leadership", label: "Leadership", icon: <Lightbulb size={20} />, x: -R, y: 0, color: "#F97316", desc: "Develop communication, teamwork and management skills through active participation." }
  ];

  return (
    <div ref={containerRef} className="relative w-full h-[600px] lg:h-full flex items-center justify-center">
      {/* Background Glow */}
      <motion.div 
        animate={{ x: mouseX.get() * -2, y: mouseY.get() * -2 }}
        className="absolute w-[500px] h-[500px] bg-[#FF5722]/5 rounded-full blur-[100px]" 
      />

      <div className="relative w-full max-w-[600px] aspect-square flex items-center justify-center">
        
        {/* Orbit Path (The line of orbiting) */}
        <div className="absolute w-[84%] h-[84%] rounded-full border-2 border-dashed border-[#FF5722]/30 pointer-events-none z-0" />

        {/* Rotating Orbit Container */}
        <motion.div 
          className="absolute inset-0 pointer-events-none z-10"
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        >
          {/* Floating Nodes */}
          {orbitNodes.map((node, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0, opacity: 0 }}
              animate={inView ? { scale: 1, opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.8 + i * 0.1, type: "spring" }}
              className="absolute z-30 -translate-x-1/2 -translate-y-1/2 pointer-events-auto"
              style={{ 
                left: \`\${50 + node.x}%\`, 
                top: \`\${50 + node.y}%\`
              }}
              onMouseEnter={() => setHoveredNode(node.id)}
              onMouseLeave={() => setHoveredNode(null)}
            >
              {/* Counter-rotation to keep the cards upright */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              >
                <motion.div 
                  animate={{ y: [-4, 4, -4] }}
                  transition={{ duration: 4 + i % 3, repeat: Infinity, ease: "easeInOut" }}
                  className="relative group cursor-pointer flex flex-col items-center"
                >
                  {/* Node Icon */}
                  <div 
                    className={cn(
                      "w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center shadow-lg backdrop-blur-xl border transition-all duration-300",
                      hoveredNode === node.id ? "scale-125 bg-white border-[#FF5722]/50 shadow-[0_0_30px_rgba(255,87,34,0.3)]" : "bg-white/80 border-[#E9ECEF]"
                    )}
                  >
                    <div style={{ color: hoveredNode === node.id ? "#FF5722" : node.color }}>{node.icon}</div>
                  </div>
                  
                  {/* Node Label */}
                  <div className="mt-2 text-xs font-bold text-[#0F172A] bg-white/90 backdrop-blur-md px-3 py-1 rounded-full border border-[#E9ECEF] shadow-sm whitespace-nowrap">
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
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Central Node */}
        <motion.div 
          initial={{ scale: 0, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 1, type: "spring" }}
          style={{ x: mouseX, y: mouseY }}
          className="absolute z-20 flex flex-col items-center justify-center"
        >
          <div className="relative w-40 h-40 md:w-48 md:h-48 rounded-full bg-white shadow-2xl border border-[#E9ECEF] flex flex-col items-center justify-center p-6 text-center group cursor-pointer overflow-hidden pointer-events-auto">
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

        {/* Particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={\`particle-\${i}\`}
            className="absolute w-1 h-1 bg-[#FF5722] rounded-full opacity-0 z-0"
            initial={{ 
              left: \`\${50 + (Math.random() * 80 - 40)}%\`, 
              top: \`\${50 + (Math.random() * 80 - 40)}%\`
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
`;

const newFileContent = fileContent.replace(regex, newComponent);

fs.writeFileSync('src/components/sections/Ecosystem.jsx', newFileContent);
