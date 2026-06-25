import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { fadeUp, staggerContainer, fadeRight, scaleIn } from '../../lib/animations';
import { cn } from '../../lib/utils';
import { Badge, AnimatedCounter, Tag } from '../ui/Misc';
import { Button } from '../ui/Button';
import { 
  Rocket, Code, Users, PlayCircle, Star, GitBranch, ExternalLink,
  ChevronRight, ArrowRight, ShieldCheck, CheckCircle2, 
  Lightbulb, FileEdit, UsersRound, Terminal, Eye, TestTube, 
  Presentation, Briefcase
} from "lucide-react";

// Mock Data
const categories = ["All", "AI", "Web Dev", "Blockchain", "Cybersecurity", "UI/UX", "Data Science"];

const projects = [
  {
    id: 1,
    title: "AI Resume Analyzer",
    category: "AI",
    tech: ["Python", "OpenAI", "React", "FastAPI"],
    difficulty: "Intermediate",
    duration: "4 Weeks",
    openPositions: 2,
    mentor: "Sarah L. (Google)",
    status: "Recruiting",
    desc: "An AI-powered tool that analyzes resumes against job descriptions, providing ATS scoring and actionable feedback.",
    problem: "Students don't know why their resumes are rejected by ATS systems.",
    solution: "A scalable ML model that mimics ATS parsers and suggests improvements.",
    color: "#8B5CF6",
    bgPattern: "radial-gradient(circle at top right, rgba(139, 92, 246, 0.15), transparent)"
  },
  {
    id: 2,
    title: "Smart Clinic Management",
    category: "Web Dev",
    tech: ["Next.js", "Node.js", "PostgreSQL", "Tailwind"],
    difficulty: "Advanced",
    duration: "8 Weeks",
    openPositions: 0,
    mentor: "Raj M. (Practo)",
    status: "In Development",
    desc: "A comprehensive SaaS platform for small clinics to manage appointments, patient records, and billing.",
    problem: "Small clinics rely on paper records which leads to inefficiencies.",
    solution: "A cloud-based intuitive dashboard replacing physical files with secure digital records.",
    color: "#3B82F6",
    bgPattern: "radial-gradient(circle at top right, rgba(59, 130, 246, 0.15), transparent)"
  },
  {
    id: 3,
    title: "DeFi Lending Protocol",
    category: "Blockchain",
    tech: ["Solidity", "Hardhat", "React", "Ethers.js"],
    difficulty: "Expert",
    duration: "6 Weeks",
    openPositions: 1,
    mentor: "Alex K. (Polygon)",
    status: "Recruiting",
    desc: "A decentralized lending and borrowing platform with algorithmically determined interest rates.",
    problem: "Traditional banking lacks transparency and has high borrowing friction.",
    solution: "Smart contracts that automate lending pools securely.",
    color: "#10B981",
    bgPattern: "radial-gradient(circle at top right, rgba(16, 185, 129, 0.15), transparent)"
  },
  {
    id: 4,
    title: "Zero-Trust Network Monitor",
    category: "Cybersecurity",
    tech: ["Go", "React", "Docker", "ELK"],
    difficulty: "Advanced",
    duration: "10 Weeks",
    openPositions: 3,
    mentor: "Priya D. (CrowdStrike)",
    status: "Planning",
    desc: "A real-time network traffic analyzer that detects anomalous behavior using machine learning.",
    problem: "SMEs cannot afford enterprise-grade threat detection.",
    solution: "An open-source, easily deployable zero-trust monitoring tool.",
    color: "#EF4444",
    bgPattern: "radial-gradient(circle at top right, rgba(239, 68, 68, 0.15), transparent)"
  },
  {
    id: 5,
    title: "Fintech Dashboard Redesign",
    category: "UI/UX",
    tech: ["Figma", "Protopie", "UserTesting"],
    difficulty: "Beginner",
    duration: "3 Weeks",
    openPositions: 0,
    mentor: "David W. (Stripe)",
    status: "Completed",
    desc: "A complete UX overhaul of a legacy banking application focusing on accessibility and Gen-Z users.",
    problem: "Legacy banking apps have massive drop-off rates due to poor UX.",
    solution: "A minimal, gamified interface that makes finance approachable.",
    color: "#EC4899",
    bgPattern: "radial-gradient(circle at top right, rgba(236, 72, 153, 0.15), transparent)"
  },
  {
    id: 6,
    title: "Predictive Crop Yields",
    category: "Data Science",
    tech: ["Python", "TensorFlow", "Pandas", "AWS"],
    difficulty: "Intermediate",
    duration: "5 Weeks",
    openPositions: 2,
    mentor: "Neha S. (AgriTech)",
    status: "Recruiting",
    desc: "Using historical weather data and satellite imagery to predict crop yields for local farmers.",
    problem: "Farmers lose crops due to unpredictable weather and lack of data.",
    solution: "An accessible SMS-based prediction alert system powered by ML.",
    color: "#F59E0B",
    bgPattern: "radial-gradient(circle at top right, rgba(245, 158, 11, 0.15), transparent)"
  }
];

const teamFeatures = [
  { icon: <UsersRound />, title: "Find Teammates", desc: "Match with peers who share your goals." },
  { icon: <CheckCircle2 />, title: "Join Existing Teams", desc: "Jump into active projects looking for your skills." },
  { icon: <Rocket />, title: "Create Your Project", desc: "Pitch an idea and recruit your dream team." },
  { icon: <Star />, title: "Get Mentor Support", desc: "Receive code reviews from industry experts." },
  { icon: <Eye />, title: "Portfolio Reviews", desc: "Polish your work for recruiters." }
];

const journeySteps = [
  { icon: <Lightbulb />, label: "Idea" },
  { icon: <FileEdit />, label: "Planning" },
  { icon: <UsersRound />, label: "Formation" },
  { icon: <Terminal />, label: "Dev" },
  { icon: <Eye />, label: "Review" },
  { icon: <TestTube />, label: "Testing" },
  { icon: <Presentation />, label: "Demo Day" },
  { icon: <Briefcase />, label: "Career" }
];

const metrics = [
  { label: "Projects Built", value: 450 },
  { label: "Students Collaborated", value: 1200 },
  { label: "Mentor Reviews", value: 850 },
  { label: "Startups Created", value: 24 }
];

// Project Modal Component
function ProjectModal({ project, onClose }) {
  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-[#0F172A]/40 backdrop-blur-sm"
        />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white rounded-3xl shadow-2xl border border-[#E9ECEF] flex flex-col z-10"
        >
          {/* Header Graphic */}
          <div className="h-32 md:h-48 w-full relative" style={{ backgroundImage: project.bgPattern }}>
            <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent" />
            <div className="absolute bottom-6 left-6 md:left-8 flex items-end gap-4">
              <div className="w-16 h-16 rounded-2xl bg-white shadow-lg border border-[#E9ECEF] flex items-center justify-center text-3xl">
                🚀
              </div>
              <div>
                <Badge variant="neutral" className="mb-2" style={{ backgroundColor: `${project.color}20`, color: project.color, borderColor: 'transparent' }}>{project.category}</Badge>
                <h2 className="text-2xl md:text-3xl font-heading font-bold text-[#0F172A]">{project.title}</h2>
              </div>
            </div>
            <button onClick={onClose} className="absolute top-6 right-6 w-8 h-8 bg-white/50 hover:bg-white rounded-full flex items-center justify-center text-[#0F172A] transition-colors">
              ✕
            </button>
          </div>

          <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Left Col: Main Details */}
            <div className="md:col-span-2 space-y-8">
              <div>
                <h3 className="text-sm font-bold text-[#64748B] uppercase tracking-wider mb-2">Overview</h3>
                <p className="text-[#0F172A] leading-relaxed">{project.desc}</p>
              </div>
              
              <div className="bg-[#E9ECEF]/30 rounded-2xl p-5 border border-[#E9ECEF]">
                <h3 className="text-sm font-bold text-[#64748B] uppercase tracking-wider mb-2">The Problem</h3>
                <p className="text-[#0F172A] leading-relaxed mb-4">{project.problem}</p>
                <h3 className="text-sm font-bold text-[#64748B] uppercase tracking-wider mb-2">The Solution</h3>
                <p className="text-[#0F172A] leading-relaxed">{project.solution}</p>
              </div>

              <div>
                <h3 className="text-sm font-bold text-[#64748B] uppercase tracking-wider mb-3">Tech Stack</h3>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map(t => (
                    <Tag key={t}>{t}</Tag>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Col: Meta & Actions */}
            <div className="space-y-6">
              <div className="bg-white border border-[#E9ECEF] rounded-2xl p-5 shadow-sm space-y-4">
                <div className="flex justify-between items-center border-b border-[#E9ECEF]/50 pb-3">
                  <span className="text-[#64748B] text-sm font-medium">Status</span>
                  <span className="text-[#0F172A] text-sm font-bold flex items-center">
                    <span className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse" />
                    {project.status}
                  </span>
                </div>
                <div className="flex justify-between items-center border-b border-[#E9ECEF]/50 pb-3">
                  <span className="text-[#64748B] text-sm font-medium">Mentor</span>
                  <span className="text-[#0F172A] text-sm font-bold">{project.mentor}</span>
                </div>
                <div className="flex justify-between items-center border-b border-[#E9ECEF]/50 pb-3">
                  <span className="text-[#64748B] text-sm font-medium">Duration</span>
                  <span className="text-[#0F172A] text-sm font-bold">{project.duration}</span>
                </div>
                <div className="flex justify-between items-center pb-1">
                  <span className="text-[#64748B] text-sm font-medium">Open Roles</span>
                  <span className="text-[#FF5722] text-sm font-bold">{project.openPositions}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" className="flex-1 flex items-center justify-center gap-2">
                  <GitBranch size={16} /> Repo
                </Button>
                <Button variant="outline" className="flex-1 flex items-center justify-center gap-2">
                  <ExternalLink size={16} /> Demo
                </Button>
              </div>

              <Button variant="primary" className="w-full" disabled={project.openPositions === 0}>
                {project.openPositions > 0 ? "Apply to Join Team" : "Team Full"}
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

export default function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState(null);
  
  const containerRef = useRef(null);
  const inView = useInView(containerRef, { once: true, margin: "-100px" });

  const filteredProjects = activeCategory === "All" 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  const lineVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
  };

  return (
    <section className="relative py-12 md:py-20 bg-white overflow-hidden" ref={containerRef}>
      
      {/* Background Layers */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[10%] right-[5%] w-[600px] h-[600px] bg-[#FF5722]/5 rounded-full blur-[120px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#E9ECEF_1px,transparent_1px),linear-gradient(to_bottom,#E9ECEF_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,#000_20%,transparent_100%)] opacity-30" />
      </div>

      <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Split Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 mb-20">
          <motion.div initial="hidden" animate={inView ? "visible" : "hidden"} variants={staggerContainer} className="max-w-2xl">
            <motion.div variants={fadeUp} className="mb-6">
              <Badge variant="neutral" className="bg-[#FF5722]/5 text-[#FF5722] border border-[#FF5722]/20">PROJECT ECOSYSTEM</Badge>
            </motion.div>
            
            <h2 className="text-[40px] md:text-[56px] font-heading font-extrabold text-[#0F172A] tracking-tighter leading-[1.1] mb-6">
              <div className="overflow-hidden">
                <motion.span variants={lineVariants} className="block">Ideas Become</motion.span>
              </div>
              <div className="overflow-hidden">
                <motion.span variants={lineVariants} className="block text-transparent bg-clip-text bg-gradient-to-r from-[#FF5722] to-[#FE6D4D]">Products</motion.span>
              </div>
            </h2>

            <motion.p variants={fadeUp} className="text-[18px] text-[#64748B] font-sans leading-relaxed text-balance">
              Learning is only the beginning. The real growth happens when you build with teammates, receive mentor feedback, showcase your work, and solve meaningful problems together.
            </motion.p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex-shrink-0"
          >
            <Button variant="outline" className="border-[#E9ECEF] hover:border-[#FF5722]/30 text-[#0F172A] bg-white">
              View All Projects <ArrowRight size={16} className="ml-2" />
            </Button>
          </motion.div>
        </div>

        {/* Project Filters */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-wrap gap-3 mb-10"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "px-4 py-2 rounded-full text-xs font-bold transition-all duration-300",
                activeCategory === cat 
                  ? "bg-[#0F172A] text-white shadow-md" 
                  : "bg-white text-[#64748B] border border-[#E9ECEF] hover:border-[#0F172A]/30"
              )}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Featured Project Showcase Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                layout
                key={project.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                onClick={() => setSelectedProject(project)}
                className="group cursor-pointer bg-white rounded-[24px] border border-[#E9ECEF] overflow-hidden hover:shadow-[0_20px_40px_-15px_rgba(255,87,34,0.15)] hover:border-[#FF5722]/30 transition-all duration-500 hover:-translate-y-2 flex flex-col"
              >
                {/* Project Card Header Graphic */}
                <div className="h-32 w-full relative overflow-hidden" style={{ backgroundImage: project.bgPattern }}>
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md text-[10px] font-bold text-[#0F172A] shadow-sm">
                    {project.difficulty}
                  </div>
                </div>

                {/* Project Details */}
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-4 -mt-10 relative z-10">
                    <div className="w-12 h-12 rounded-xl bg-white shadow-md border border-[#E9ECEF] flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                      📦
                    </div>
                  </div>
                  
                  <Badge variant="neutral" className="w-fit mb-2 text-[10px]" style={{ backgroundColor: `${project.color}15`, color: project.color, borderColor: 'transparent' }}>{project.category}</Badge>
                  
                  <h3 className="font-heading font-bold text-lg text-[#0F172A] mb-2 group-hover:text-[#FF5722] transition-colors">{project.title}</h3>
                  <p className="text-sm text-[#64748B] line-clamp-2 mb-6 flex-1">{project.desc}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.slice(0, 3).map(t => (
                      <span key={t} className="text-[10px] font-semibold px-2 py-1 rounded-md bg-[#E9ECEF]/50 text-[#64748B]">{t}</span>
                    ))}
                    {project.tech.length > 3 && <span className="text-[10px] font-semibold px-2 py-1 rounded-md bg-[#E9ECEF]/50 text-[#64748B]">+{project.tech.length - 3}</span>}
                  </div>

                  <div className="flex items-center justify-between border-t border-[#E9ECEF] pt-4 mt-auto">
                    <div className="flex -space-x-2">
                      {[...Array(project.openPositions ? 3 : 4)].map((_, i) => (
                        <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-[#E9ECEF] flex items-center justify-center text-[8px]">👤</div>
                      ))}
                      {project.openPositions > 0 && (
                        <div className="w-6 h-6 rounded-full border-2 border-white bg-[#FF5722]/10 text-[#FF5722] flex items-center justify-center text-[10px] font-bold z-10">
                          +{project.openPositions}
                        </div>
                      )}
                    </div>
                    <span className="text-sm font-bold text-[#FF5722] flex items-center group-hover:translate-x-1 transition-transform">
                      View Details <ChevronRight size={16} />
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Project Journey Timeline */}
        <div className="mb-32">
          <h3 className="text-2xl font-heading font-bold text-[#0F172A] mb-12 text-center">How We Build</h3>
          <div className="relative">
            {/* Connecting Line */}
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-[#E9ECEF] -translate-y-1/2 hidden md:block">
              <motion.div 
                className="h-full bg-gradient-to-r from-[#FF5722] to-[#FE6D4D]" 
                initial={{ width: "0%" }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 2, ease: "easeOut" }}
              />
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 relative z-10">
              {journeySteps.map((step, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex flex-col items-center group"
                >
                  <div className="w-12 h-12 rounded-full bg-white border border-[#E9ECEF] flex items-center justify-center mb-3 group-hover:border-[#FF5722] group-hover:text-[#FF5722] group-hover:shadow-[0_0_15px_rgba(255,87,34,0.2)] transition-all duration-300 text-[#64748B]">
                    {step.icon}
                  </div>
                  <span className="text-xs font-bold text-[#0F172A]">{step.label}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Team Building Section */}
        <div className="mb-32">
          <h3 className="text-[32px] md:text-[40px] font-heading font-bold text-[#0F172A] mb-10">Build Together.</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {teamFeatures.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 bg-[#E9ECEF]/30 backdrop-blur-md rounded-3xl border border-[#E9ECEF] hover:bg-white hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-white border border-[#E9ECEF] flex items-center justify-center mb-4 text-[#FF5722] group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h4 className="font-heading font-bold text-[#0F172A] mb-2">{feature.title}</h4>
                <p className="text-xs text-[#64748B] leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Success Numbers */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-32 border-y border-[#E9ECEF] py-12">
          {metrics.map((metric, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="flex flex-col items-center text-center"
            >
              <div className="text-4xl md:text-5xl font-heading font-extrabold text-[#0F172A] mb-2">
                <AnimatedCounter end={metric.value} suffix="+" duration={2} />
              </div>
              <div className="text-xs font-bold text-[#64748B] uppercase tracking-widest">{metric.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="text-center max-w-4xl mx-auto flex flex-col items-center bg-[#FF5722]/5 border border-[#FF5722]/20 rounded-[40px] p-12 md:p-20 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#FF5722]/10 rounded-full blur-[80px] pointer-events-none" />
          
          <motion.h3 variants={fadeUp} className="text-[32px] md:text-[48px] font-heading font-bold text-[#0F172A] tracking-tight mb-6 text-balance relative z-10">
            Your Portfolio Speaks Louder Than Your Resume.
          </motion.h3>
          <motion.p variants={fadeUp} className="text-[18px] md:text-[20px] text-[#64748B] mb-10 relative z-10 font-sans max-w-2xl text-balance">
            Join projects, collaborate with talented students, receive mentor guidance and build products that demonstrate your abilities.
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 relative z-10 w-full sm:w-auto">
            <Button variant="primary" className="h-14 px-8 text-lg font-bold w-full sm:w-auto">
              Explore Projects
            </Button>
            <Button variant="outline" className="h-14 px-8 text-lg font-bold w-full sm:w-auto bg-white hover:bg-[#E9ECEF]/50">
              Start Your Own Project
            </Button>
          </motion.div>
        </motion.div>

      </div>

      {/* Render Modal */}
      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
    </section>
  );
}
