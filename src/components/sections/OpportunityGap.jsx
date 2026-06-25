import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import { fadeUp, staggerContainer, fadeRight, scaleIn } from '../../lib/animations';
import { cn } from '../../lib/utils';
import { 
  Users, UserX, Network, Briefcase, Map, Rocket, 
  ChevronDown, ArrowRight, XCircle, AlertCircle
} from "lucide-react";
import { Badge } from '../ui/Misc';

const problems = [
  { icon: <UserX size={20} />, title: "No Mentorship", desc: "Many students never meet people already working in the careers they dream about." },
  { icon: <Network size={20} />, title: "Limited Network", desc: "Without ambitious peers, growth becomes much harder." },
  { icon: <Briefcase size={20} />, title: "No Practical Projects", desc: "Students graduate with theory but very little real-world experience." },
  { icon: <AlertCircle size={20} />, title: "Missed Opportunities", desc: "Hackathons, internships, fellowships and competitions often go unnoticed." },
  { icon: <Map size={20} />, title: "No Career Roadmap", desc: "Students know where they want to go but not how to get there." },
  { icon: <Rocket size={20} />, title: "Lack of Startup Culture", desc: "Many colleges don't expose students to innovation, entrepreneurship or product building." },
];

function InteractiveComparison() {
  const ref = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const inView = useInView(ref, { once: true, margin: "-100px" });

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
  }, []);

  const springConfig = { damping: 25, stiffness: 150 };
  const mouseX = useSpring(mousePos.x, springConfig);
  const mouseY = useSpring(mousePos.y, springConfig);

  return (
    <div ref={ref} className="relative w-full h-full min-h-[450px] flex items-center justify-center rounded-3xl bg-white border border-[#E9ECEF] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] overflow-hidden">
      
      {/* Background Layer */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-[#FF5722]/5"></div>
      
      {/* Left Panel: Tier 2/3 Orbit */}
      <div className="absolute left-0 top-0 bottom-0 w-1/2 flex flex-col items-center justify-center p-8 border-r border-dashed border-[#E9ECEF] bg-white">
        <h4 className="absolute top-8 text-[#64748B] font-semibold tracking-widest text-xs uppercase bg-white px-2 z-20">Tier 2/3 College</h4>
        
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          className="absolute w-[240px] h-[240px] rounded-full border border-dashed border-[#E9ECEF]" 
        />

        <div className="relative w-full h-full flex items-center justify-center">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 }}
            className="relative w-16 h-16 rounded-full bg-[#E9ECEF] flex items-center justify-center text-[#64748B] z-10 grayscale shadow-sm"
          >
            <Users size={24} />
          </motion.div>

          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
            className="absolute flex items-center justify-center z-20"
          >
            {problems.map((problem, i) => {
              const angle = (i * 360) / problems.length;
              const radius = 120;
              const x = Math.cos(angle * Math.PI / 180) * radius;
              const y = Math.sin(angle * Math.PI / 180) * radius;

              return (
                <div 
                  key={i} 
                  className="absolute" 
                  style={{ transform: `translate(${x}px, ${y}px)` }}
                >
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
                  >
                    <div className="absolute -translate-x-1/2 -translate-y-1/2 bg-white border border-[#E9ECEF] px-2 py-1 rounded-lg shadow-sm flex items-center gap-1.5 whitespace-nowrap grayscale">
                      <div className="text-[#64748B] scale-[0.6]">{problem.icon}</div>
                      <span className="text-[9px] font-bold text-[#64748B]">{problem.title}</span>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>

      {/* Right Panel: Connected Ecosystem */}
      <div className="absolute right-0 top-0 bottom-0 w-1/2 flex flex-col items-center justify-center p-8 bg-gradient-to-r from-transparent to-[#FF5722]/5">
        <h4 className="absolute top-8 text-[#FF5722] font-semibold tracking-widest text-xs uppercase z-20 px-2">Topper Mantra</h4>
        
        <motion.div 
          animate={{ rotate: -360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="absolute w-[240px] h-[240px] rounded-full border border-dashed border-[#FF5722]/30" 
        />

        <div className="relative w-full h-full flex items-center justify-center">
          <motion.div 
            style={{ x: mouseX, y: mouseY }}
            className="w-20 h-20 rounded-full bg-white shadow-2xl border-4 border-[#FF5722]/20 flex items-center justify-center text-[#FF5722] z-20 relative"
          >
            <div className="absolute inset-0 rounded-full bg-[#FF5722]/20 animate-ping"></div>
            <Users size={32} />
          </motion.div>

          {/* Orbiting Connected Nodes */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="absolute flex items-center justify-center z-20"
          >
            {[
              { icon: <Briefcase size={16} />, label: "Projects", color: "text-[#22C55E]" },
              { icon: <Rocket size={16} />, label: "Startups", color: "text-[#3B82F6]" },
              { icon: <Network size={16} />, label: "Mentors", color: "text-[#FACC15]" },
              { icon: <Users size={16} />, label: "Community", color: "text-[#A855F7]" },
              { icon: <Map size={16} />, label: "Roadmaps", color: "text-[#06B6D4]" },
            ].map((node, i, arr) => {
              const angle = (i * 360) / arr.length;
              const radius = 120;
              const x = Math.cos(angle * Math.PI / 180) * radius;
              const y = Math.sin(angle * Math.PI / 180) * radius;

              return (
                <div 
                  key={i} 
                  className="absolute" 
                  style={{ transform: `translate(${x}px, ${y}px)` }}
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                  >
                    <div className="absolute -translate-x-1/2 -translate-y-1/2 bg-white border border-[#FF5722]/10 px-3 py-1.5 rounded-xl shadow-lg flex items-center gap-2 whitespace-nowrap relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-[#FF5722]/5 to-[#FE6D4D]/5 rounded-xl opacity-0 hover:opacity-100 transition-opacity"></div>
                      <span className={node.color}>{node.icon}</span>
                      <span className="text-[11px] font-bold text-[#0F172A]">{node.label}</span>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>

      {/* Center Bridge */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 bg-[#0F172A] text-white px-6 py-3 rounded-2xl shadow-2xl font-heading font-bold tracking-widest text-sm whitespace-nowrap overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#FF5722]/30 to-transparent -translate-x-full animate-[shimmer_2s_infinite]"></div>
        THE BRIDGE
      </motion.div>
    </div>
  );
}

export default function OpportunityGap() {
  const lineVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
  };

  return (
    <section className="relative pt-12 md:pt-20 pb-0 bg-white overflow-hidden">
      <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Split Screen Layout */}
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          
          {/* Left Side: Storytelling (35%) */}
          <div className="w-full lg:w-[35%] flex flex-col justify-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}>
              
              <motion.div variants={fadeUp} className="mb-6">
                <Badge variant="neutral" className="bg-[#E9ECEF]/50 text-[#0F172A] border border-[#E9ECEF]">WHY WE EXIST</Badge>
              </motion.div>
              
              <h2 className="text-[40px] md:text-[48px] font-heading font-bold text-[#0F172A] tracking-tighter leading-[1.1] mb-6">
                <div className="overflow-hidden">
                  <motion.span variants={lineVariants} className="block">Talent Exists Everywhere</motion.span>
                </div>
                <div className="overflow-hidden">
                  <motion.span variants={lineVariants} className="block text-transparent bg-clip-text bg-gradient-to-r from-[#FF5722] to-[#FE6D4D]">Opportunity Doesn't</motion.span>
                </div>
              </h2>

              <motion.div variants={fadeUp} className="text-[18px] text-[#64748B] mb-12 space-y-4 font-sans leading-relaxed">
                <p>Millions of students work incredibly hard every day.</p>
                <p>
                  But where you study often determines the mentors you meet, 
                  the projects you build, the internships you discover, 
                  the founders you connect with, and ultimately the opportunities you receive.
                </p>
                <p className="font-medium text-[#0F172A] border-l-4 border-[#FF5722] pl-4 py-1">
                  We believe talent should never be limited by geography or college reputation.
                </p>
              </motion.div>

              {/* Problem Cards Grid removed as requested. Content moved to orbital visualization. */}
            </motion.div>
          </div>

          {/* Right Side: Interactive Visual (65%) */}
          <div className="w-full lg:w-[65%] h-[450px] lg:h-[500px] flex items-center">
            <InteractiveComparison />
          </div>
        </div>



      </div>
    </section>
  );
}
