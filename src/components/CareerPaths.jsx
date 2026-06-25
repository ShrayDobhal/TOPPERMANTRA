import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeUp, staggerContainer, fadeRight } from "../lib/animations";
import { cn } from "../lib/utils";
import { Badge, Tag } from "./ui/Misc";
import { Button } from "./ui/Button";
import { 
  BrainCircuit, Code2, LineChart, Target, Palette, 
  ShieldCheck, Cloud, Link, Rocket, Zap, Check, ArrowRight 
} from "lucide-react";

const careers = [
  {
    id: "ai",
    icon: <BrainCircuit size={24} />,
    title: "AI Engineer",
    desc: "Build intelligent systems using Machine Learning and Generative AI.",
    skills: ["Python", "LLMs", "TensorFlow", "OpenCV"],
    salary: "₹8–35 LPA",
    timeline: "6-8 Months",
    color: "#8B5CF6",
    bgPattern: "radial-gradient(circle at 100% 100%, rgba(139, 92, 246, 0.1) 0%, transparent 50%)",
    details: {
      projects: "12+ AI/ML Projects",
      mentors: "FAANG AI Leads",
      opportunities: "AI Research & Startups"
    }
  },
  {
    id: "sde",
    icon: <Code2 size={24} />,
    title: "Software Engineer",
    desc: "Master full-stack development and build scalable products.",
    skills: ["React", "Node", "Java", "Databases"],
    salary: "₹6–30 LPA",
    timeline: "6-9 Months",
    color: "#3B82F6",
    bgPattern: "radial-gradient(circle at 100% 100%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)",
    details: {
      projects: "15+ Scalable Web Apps",
      mentors: "Senior SDEs",
      opportunities: "Tech Unicorns"
    }
  },
  {
    id: "data",
    icon: <LineChart size={24} />,
    title: "Data Scientist",
    desc: "Extract insights from data and solve real-world problems.",
    skills: ["Python", "SQL", "Power BI", "ML"],
    salary: "₹7–28 LPA",
    timeline: "5-7 Months",
    color: "#10B981",
    bgPattern: "radial-gradient(circle at 100% 100%, rgba(16, 185, 129, 0.1) 0%, transparent 50%)",
    details: {
      projects: "8+ Data Pipelines",
      mentors: "Data Architects",
      opportunities: "Fintech & Analytics"
    }
  },
  {
    id: "pm",
    icon: <Target size={24} />,
    title: "Product Manager",
    desc: "Design products that millions of users love.",
    skills: ["Strategy", "Analytics", "UX", "Leadership"],
    salary: "₹10–45 LPA",
    timeline: "4-6 Months",
    color: "#F59E0B",
    bgPattern: "radial-gradient(circle at 100% 100%, rgba(245, 158, 11, 0.1) 0%, transparent 50%)",
    details: {
      projects: "4+ Product Teardowns",
      mentors: "Director of Product",
      opportunities: "APM Roles"
    }
  },
  {
    id: "design",
    icon: <Palette size={24} />,
    title: "UI/UX Designer",
    desc: "Create intuitive digital experiences.",
    skills: ["Figma", "Research", "Prototyping", "Design Systems"],
    salary: "₹6–22 LPA",
    timeline: "4-6 Months",
    color: "#EC4899",
    bgPattern: "radial-gradient(circle at 100% 100%, rgba(236, 72, 153, 0.1) 0%, transparent 50%)",
    details: {
      projects: "6+ Case Studies",
      mentors: "Lead Designers",
      opportunities: "Design Agencies & Tech"
    }
  },
  {
    id: "cyber",
    icon: <ShieldCheck size={24} />,
    title: "Cybersecurity",
    desc: "Protect organizations from digital threats.",
    skills: ["Networking", "Linux", "Security", "Ethical Hacking"],
    salary: "₹8–30 LPA",
    timeline: "6-8 Months",
    color: "#EF4444",
    bgPattern: "radial-gradient(circle at 100% 100%, rgba(239, 68, 68, 0.1) 0%, transparent 50%)",
    details: {
      projects: "10+ CTF Challenges",
      mentors: "Security Researchers",
      opportunities: "SecOps Roles"
    }
  },
  {
    id: "cloud",
    icon: <Cloud size={24} />,
    title: "Cloud Engineer",
    desc: "Deploy scalable cloud infrastructure.",
    skills: ["AWS", "Azure", "Docker", "Kubernetes"],
    salary: "₹8–35 LPA",
    timeline: "5-7 Months",
    color: "#0EA5E9",
    bgPattern: "radial-gradient(circle at 100% 100%, rgba(14, 165, 233, 0.1) 0%, transparent 50%)",
    details: {
      projects: "8+ Cloud Deployments",
      mentors: "DevOps Leads",
      opportunities: "Cloud Architect Roles"
    }
  },
  {
    id: "web3",
    icon: <Link size={24} />,
    title: "Blockchain Dev",
    desc: "Build decentralized applications and Web3 products.",
    skills: ["Solidity", "Ethereum", "Smart Contracts", "Wallets"],
    salary: "₹10–40 LPA",
    timeline: "4-6 Months",
    color: "#6366F1",
    bgPattern: "radial-gradient(circle at 100% 100%, rgba(99, 102, 241, 0.1) 0%, transparent 50%)",
    details: {
      projects: "5+ dApps & Protocols",
      mentors: "Web3 Founders",
      opportunities: "Global Remote Roles"
    }
  },
  {
    id: "founder",
    icon: <Rocket size={24} />,
    title: "Entrepreneur",
    desc: "Build startups and solve meaningful problems.",
    skills: ["Leadership", "Product", "Sales", "Fundraising"],
    salary: "Unlimited",
    timeline: "Continuous",
    color: "#FF5722",
    bgPattern: "radial-gradient(circle at 100% 100%, rgba(255, 87, 34, 0.1) 0%, transparent 50%)",
    details: {
      projects: "Build Your Startup",
      mentors: "YC Alumni & Founders",
      opportunities: "Incubators & VCs"
    }
  },
  {
    id: "drone",
    icon: <Zap size={24} />,
    title: "Drone Tech",
    desc: "Explore autonomous systems and next-generation innovation.",
    skills: ["Robotics", "Hardware", "IoT", "Automation"],
    salary: "Coming Soon",
    timeline: "Coming Soon",
    color: "#64748B",
    bgPattern: "radial-gradient(circle at 100% 100%, rgba(100, 116, 139, 0.1) 0%, transparent 50%)",
    isComingSoon: true,
    details: {
      projects: "Hardware Assembly",
      mentors: "Aerospace Engineers",
      opportunities: "DeepTech Innovation"
    }
  }
];

const checklist = [
  "Personalized Roadmap",
  "Expert Mentors",
  "Hands-on Projects",
  "Community",
  "Opportunities",
  "Portfolio Building",
  "Career Guidance"
];

function CareerCard({ career }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      variants={fadeUp}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative w-full rounded-[24px] bg-white border border-[#E9ECEF] p-6 cursor-pointer overflow-hidden transition-all duration-500 hover:shadow-[0_20px_40px_-15px_rgba(255,87,34,0.15)] hover:border-[#FF5722]/30 hover:-translate-y-2"
      style={{ backgroundImage: career.bgPattern }}
    >
      <div className="relative z-10 h-full flex flex-col">
        {/* Header: Icon & Salary */}
        <div className="flex justify-between items-start mb-6">
          <div className="relative w-12 h-12 rounded-2xl flex items-center justify-center transition-transform duration-500 group-hover:scale-110" style={{ backgroundColor: `${career.color}15`, color: career.color }}>
            {/* Progress Ring animation on hover */}
            <svg className="absolute inset-0 w-full h-full -rotate-90 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <circle cx="24" cy="24" r="22" stroke="currentColor" strokeWidth="2" fill="none" strokeDasharray="140" strokeDashoffset="140" className="opacity-30" />
              <motion.circle cx="24" cy="24" r="22" stroke="currentColor" strokeWidth="2" fill="none" strokeDasharray="140" initial={{ strokeDashoffset: 140 }} animate={{ strokeDashoffset: isHovered ? 0 : 140 }} transition={{ duration: 1, ease: "easeOut" }} />
            </svg>
            <motion.div animate={{ rotate: isHovered ? [0, -10, 10, 0] : 0 }} transition={{ duration: 0.5 }}>
              {career.icon}
            </motion.div>
          </div>
          
          <div className="flex flex-col items-end">
            <span className="text-xs font-bold text-[#64748B] uppercase tracking-wider mb-1">Avg Salary</span>
            <span className="text-sm font-heading font-extrabold" style={{ color: career.color }}>{career.salary}</span>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1">
          <h3 className="text-xl font-heading font-bold text-[#0F172A] mb-2">{career.title}</h3>
          {career.isComingSoon ? (
            <Badge variant="neutral" className="mb-3">Coming Soon</Badge>
          ) : (
            <p className="text-sm text-[#64748B] leading-relaxed mb-6">{career.desc}</p>
          )}

          {/* Skills Map */}
          <div className="flex flex-wrap gap-2 mb-6">
            {career.skills.map((skill, i) => (
              <span key={i} className="text-xs font-semibold px-2 py-1 rounded-md bg-[#E9ECEF]/50 text-[#64748B] border border-[#E9ECEF] transition-colors group-hover:bg-white group-hover:border-transparent group-hover:shadow-sm">
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Expandable Details on Hover */}
        <AnimatePresence>
          {isHovered && !career.isComingSoon && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden border-t border-[#E9ECEF] pt-4 mt-2"
            >
              <ul className="space-y-3 mb-6">
                <li className="flex items-center text-xs font-medium text-[#0F172A]">
                  <div className="w-1.5 h-1.5 rounded-full mr-2" style={{ backgroundColor: career.color }}></div>
                  <span className="text-[#64748B] w-20">Timeline:</span> {career.timeline}
                </li>
                <li className="flex items-center text-xs font-medium text-[#0F172A]">
                  <div className="w-1.5 h-1.5 rounded-full mr-2" style={{ backgroundColor: career.color }}></div>
                  <span className="text-[#64748B] w-20">Projects:</span> {career.details.projects}
                </li>
                <li className="flex items-center text-xs font-medium text-[#0F172A]">
                  <div className="w-1.5 h-1.5 rounded-full mr-2" style={{ backgroundColor: career.color }}></div>
                  <span className="text-[#64748B] w-20">Mentors:</span> {career.details.mentors}
                </li>
              </ul>
              <div className="flex items-center justify-between font-semibold text-sm transition-transform duration-300 group-hover:translate-x-1" style={{ color: career.color }}>
                Explore Journey <ArrowRight size={16} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default function CareerPaths() {
  const lineVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
  };

  return (
    <section className="relative py-12 md:py-20 bg-white overflow-hidden">
      <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}>
            <motion.div variants={fadeUp} className="mb-6 flex justify-center">
              <Badge variant="neutral" className="bg-[#FF5722]/5 text-[#FF5722] border border-[#FF5722]/20">CAREER PATHS</Badge>
            </motion.div>
            
            <h2 className="text-[40px] md:text-[56px] font-heading font-extrabold text-[#0F172A] tracking-tighter leading-[1.1] mb-6">
              <div className="overflow-hidden">
                <motion.span variants={lineVariants} className="block">Your Future Starts With</motion.span>
              </div>
              <div className="overflow-hidden">
                <motion.span variants={lineVariants} className="block text-transparent bg-clip-text bg-gradient-to-r from-[#FF5722] to-[#FE6D4D]">One Decision</motion.span>
              </div>
            </h2>

            <motion.p variants={fadeUp} className="text-[18px] text-[#64748B] font-sans leading-relaxed text-balance mx-auto">
              Whether you dream of becoming an AI Engineer, Product Manager, Entrepreneur, Designer or Software Developer, Topper Mantra provides the roadmap, mentors, projects and opportunities to help you get there.
            </motion.p>
          </motion.div>
        </div>

        {/* 5-Column Premium Card Grid */}
        <motion.div 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true, margin: "-100px" }} 
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-24"
        >
          {careers.map((career, i) => (
            <CareerCard key={i} career={career} />
          ))}
        </motion.div>

        {/* Feature Comparison Strip */}
        <motion.div 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true, margin: "-100px" }} 
          variants={staggerContainer}
          className="w-full flex flex-wrap justify-center items-center gap-4 md:gap-8 bg-[#E9ECEF]/30 backdrop-blur-md border border-[#E9ECEF] rounded-full py-4 px-6 mb-32"
        >
          {checklist.map((item, i) => (
            <motion.div 
              key={i} 
              variants={fadeRight}
              className="flex items-center text-sm font-semibold text-[#0F172A]"
            >
              <div className="w-5 h-5 rounded-full bg-[#FF5722]/10 flex items-center justify-center mr-2">
                <Check size={12} className="text-[#FF5722]" />
              </div>
              {item}
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="text-center max-w-3xl mx-auto flex flex-col items-center bg-[#0F172A] rounded-[40px] p-12 md:p-20 relative overflow-hidden shadow-2xl"
        >
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#FF5722]/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#FE6D4D]/20 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

          <motion.h3 variants={fadeUp} className="text-[32px] md:text-[48px] font-heading font-bold text-white tracking-tight mb-6 text-balance relative z-10">
            No Matter Where You Start,<br/>
            <span className="text-[#E9ECEF]/80">You Can Build Something Extraordinary.</span>
          </motion.h3>
          <motion.p variants={fadeUp} className="text-[18px] md:text-[20px] text-[#64748B] mb-12 relative z-10 font-sans">
            Topper Mantra provides the ecosystem. <span className="text-white font-medium">You build the future.</span>
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 relative z-10 w-full sm:w-auto">
            <Button variant="primary" className="h-14 px-8 text-lg font-bold w-full sm:w-auto">
              Find My Career Path
            </Button>
            <Button variant="outline" className="h-14 px-8 text-lg font-bold w-full sm:w-auto bg-white/5 border-white/10 text-white hover:bg-white/10 hover:border-white/20">
              Talk to a Mentor
            </Button>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
