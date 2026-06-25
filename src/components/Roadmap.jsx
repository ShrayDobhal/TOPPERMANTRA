import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { fadeUp, staggerContainer, fadeRight } from "../lib/animations";
import { cn } from "../lib/utils";
import { Badge, AnimatedCounter } from "./ui/Misc";
import { Button } from "./ui/Button";
import { 
  Compass, BookOpen, Code2, Users, Trophy, 
  Briefcase, Target, Award, ArrowRight, Zap, FolderDot, Sparkles
} from "lucide-react";

const careers = [
  "AI Engineer", "Software Engineer", "Data Scientist", "Product Manager", 
  "UI/UX Designer", "Cybersecurity", "Cloud", "Blockchain", "Entrepreneur", "Drone Tech"
];

const milestones = [
  {
    step: 1,
    title: "Discover",
    icon: <Compass size={24} />,
    desc: "Career Orientation & Goal Setting",
    duration: "Week 1-2",
    xp: "+500 XP",
    items: ["Career Orientation", "Goal Setting", "Community Onboarding"],
    details: {
      learn: "Understand industry landscapes and map out personal goals.",
      skills: ["Goal Setting", "Time Management", "Networking"],
      resources: "Topper Mantra Discovery Kit, Notion Templates",
      projects: "Personal Growth Plan",
      opportunities: "Access to private Discord communities"
    }
  },
  {
    step: 2,
    title: "Learn Foundations",
    icon: <BookOpen size={24} />,
    desc: "Core Skills & Tools",
    duration: "Month 1-2",
    xp: "+1200 XP",
    items: ["Core Skills", "Tools", "Programming", "Design Thinking"],
    details: {
      learn: "Master the fundamental building blocks of your chosen career.",
      skills: ["Programming Basics", "Design Systems", "Tooling"],
      resources: "Curated Learning Paths, Premium Video Libraries",
      projects: "2 Foundation Projects",
      opportunities: "Peer Programming Groups"
    }
  },
  {
    step: 3,
    title: "Hands-on Projects",
    icon: <Code2 size={24} />,
    desc: "Mini & Team Projects",
    duration: "Month 3-4",
    xp: "+2500 XP",
    items: ["Mini Projects", "Team Projects", "Portfolio Projects"],
    details: {
      learn: "Apply theory to real-world problems by building from scratch.",
      skills: ["System Design", "Git/GitHub", "Deployment"],
      resources: "Project Briefs, Cloud Credits",
      projects: "3 Full-stack Applications",
      opportunities: "Open Source Contributions"
    }
  },
  {
    step: 4,
    title: "Mentorship",
    icon: <Users size={24} />,
    desc: "1-on-1 Guidance",
    duration: "Month 4-5",
    xp: "+1800 XP",
    items: ["Book Mentor Sessions", "Portfolio Reviews", "Career Guidance"],
    details: {
      learn: "Get personalized feedback from industry veterans.",
      skills: ["Code Reviews", "Interview Prep", "Architecture"],
      resources: "1-on-1 Booking System",
      projects: "Portfolio Review",
      opportunities: "Direct Referrals"
    }
  },
  {
    step: 5,
    title: "Hackathons",
    icon: <Trophy size={24} />,
    desc: "National Competitions",
    duration: "Month 5",
    xp: "+3000 XP",
    items: ["National Competitions", "Innovation Challenges", "Team Collaboration"],
    details: {
      learn: "Build products under pressure and innovate rapidly.",
      skills: ["Rapid Prototyping", "Pitching", "Teamwork"],
      resources: "Hackathon Survival Guide",
      projects: "1 Hackathon MVP",
      opportunities: "Cash Prizes & Seed Funding"
    }
  },
  {
    step: 6,
    title: "Portfolio",
    icon: <FolderDot size={24} />,
    desc: "GitHub & Case Studies",
    duration: "Month 6",
    xp: "+1500 XP",
    items: ["GitHub", "Resume", "Case Studies", "LinkedIn"],
    details: {
      learn: "Present your work professionally to attract top recruiters.",
      skills: ["Personal Branding", "Documentation", "Storytelling"],
      resources: "Resume Templates, LinkedIn Guide",
      projects: "Personal Website",
      opportunities: "Inbound Recruiter Messages"
    }
  },
  {
    step: 7,
    title: "Internships",
    icon: <Briefcase size={24} />,
    desc: "Mock Interviews & Tracking",
    duration: "Month 6-7",
    xp: "+4000 XP",
    items: ["Apply", "Track", "Interview Preparation", "Mock Interviews"],
    details: {
      learn: "Navigate the hiring process successfully.",
      skills: ["Technical Interviews", "System Design", "HR Rounds"],
      resources: "Mock Interview Platform",
      projects: "Take-home Assignments",
      opportunities: "Tier-1 Internships"
    }
  },
  {
    step: 8,
    title: "Career Ready",
    icon: <Award size={24} />,
    desc: "Placements & Alumni",
    duration: "Month 8+",
    xp: "+5000 XP",
    items: ["Industry Certification", "Job Referrals", "Placement Support", "Alumni Network"],
    details: {
      learn: "Transition smoothly into your first full-time role.",
      skills: ["Salary Negotiation", "Workplace Dynamics", "Continuous Learning"],
      resources: "Alumni Network Access",
      projects: "Production Deployment",
      opportunities: "Full-Time Job Offers"
    }
  }
];

const metrics = [
  { label: "Projects Built", value: 1240 },
  { label: "Hackathons", value: 85 },
  { label: "Mentor Sessions", value: 5600 },
  { label: "Careers Unlocked", value: 890 }
];

export default function Roadmap() {
  const [activeCareer, setActiveCareer] = useState(careers[0]);
  const [activeMilestone, setActiveMilestone] = useState(milestones[0]);
  const [hoveredMilestone, setHoveredMilestone] = useState(null);
  
  const containerRef = useRef(null);
  const inView = useInView(containerRef, { once: true, margin: "-100px" });

  const lineVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
  };

  return (
    <section className="relative py-12 md:py-20 bg-white overflow-hidden" ref={containerRef}>
      
      {/* Background Layers */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[20%] left-[10%] w-[500px] h-[500px] bg-[#FF5722]/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[20%] right-[10%] w-[600px] h-[600px] bg-[#FE6D4D]/5 rounded-full blur-[150px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#E9ECEF_1px,transparent_1px),linear-gradient(to_bottom,#E9ECEF_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_20%,transparent_100%)] opacity-30" />
      </div>

      <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div initial="hidden" animate={inView ? "visible" : "hidden"} variants={staggerContainer}>
            <motion.div variants={fadeUp} className="mb-6 flex justify-center">
              <Badge variant="neutral" className="bg-[#FF5722]/5 text-[#FF5722] border border-[#FF5722]/20">ROADMAPS</Badge>
            </motion.div>
            
            <h2 className="text-[40px] md:text-[56px] font-heading font-extrabold text-[#0F172A] tracking-tighter leading-[1.1] mb-6">
              <div className="overflow-hidden">
                <motion.span variants={lineVariants} className="block">A Clear Path</motion.span>
              </div>
              <div className="overflow-hidden">
                <motion.span variants={lineVariants} className="block text-transparent bg-clip-text bg-gradient-to-r from-[#FF5722] to-[#FE6D4D]">From Beginner to Career Ready</motion.span>
              </div>
            </h2>

            <motion.p variants={fadeUp} className="text-[18px] text-[#64748B] font-sans leading-relaxed text-balance mx-auto">
              Choose your destination, follow guided milestones, build real projects, learn from mentors, participate in hackathons, and unlock opportunities along the way. No more guessing. Just continuous progress.
            </motion.p>
          </motion.div>
        </div>

        {/* Roadmap Selector (Career Pills) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-3 mb-20 max-w-5xl mx-auto"
        >
          {careers.map((career) => (
            <button
              key={career}
              onClick={() => setActiveCareer(career)}
              className={cn(
                "px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 relative overflow-hidden",
                activeCareer === career 
                  ? "text-white shadow-lg shadow-[#FF5722]/20" 
                  : "bg-white text-[#64748B] border border-[#E9ECEF] hover:border-[#FF5722]/30 hover:text-[#0F172A]"
              )}
            >
              {activeCareer === career && (
                <motion.div 
                  layoutId="activeCareerBg" 
                  className="absolute inset-0 bg-gradient-to-r from-[#FF5722] to-[#FE6D4D] z-0"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10">{career}</span>
            </button>
          ))}
        </motion.div>

        {/* Layout for Roadmap & Side Panel */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 mb-20 relative">
          
          {/* Main Roadmap Timeline (Left side on desktop, 65%) */}
          <div className="w-full lg:w-[65%] relative">
            
            {/* Desktop Horizontal/Curved Path Approximation using Flex */}
            {/* We'll use a responsive vertical stack with left/right alternating on tablet, and a simple vertical on mobile */}
            
            {/* Connecting Line (Vertical for simplicity and responsiveness) */}
            <div className="absolute left-[28px] md:left-1/2 top-8 bottom-8 w-1 bg-[#E9ECEF] -translate-x-1/2 rounded-full overflow-hidden">
              <motion.div 
                className="w-full bg-gradient-to-b from-[#FF5722] to-[#FE6D4D]"
                initial={{ height: "0%" }}
                animate={inView ? { height: "100%" } : {}}
                transition={{ duration: 2, ease: "easeInOut", delay: 0.8 }}
              />
            </div>

            <div className="space-y-8 relative z-10">
              {milestones.map((milestone, i) => {
                const isHovered = hoveredMilestone === milestone.step;
                const isActive = activeMilestone.step === milestone.step;
                const isEven = i % 2 === 0;

                return (
                  <motion.div 
                    key={milestone.step}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.8 + i * 0.1 }}
                    onClick={() => setActiveMilestone(milestone)}
                    onMouseEnter={() => setHoveredMilestone(milestone.step)}
                    onMouseLeave={() => setHoveredMilestone(null)}
                    className={cn(
                      "relative flex items-center md:justify-between cursor-pointer group",
                      isEven ? "md:flex-row-reverse" : "md:flex-row"
                    )}
                  >
                    
                    {/* Spacer for alternating layout on Desktop */}
                    <div className="hidden md:block w-[45%]" />

                    {/* Timeline Node */}
                    <div className="absolute left-[28px] md:left-1/2 -translate-x-1/2 w-10 h-10 bg-white rounded-full border-4 border-[#FF5722]/20 flex items-center justify-center z-20 transition-all duration-300">
                      <div className={cn(
                        "w-4 h-4 rounded-full transition-all duration-300",
                        isActive || isHovered ? "bg-[#FF5722] scale-125" : "bg-[#E9ECEF]"
                      )} />
                      {/* Pulse effect if active */}
                      {(isActive || isHovered) && (
                        <div className="absolute inset-0 rounded-full border border-[#FF5722] animate-ping opacity-50" />
                      )}
                    </div>

                    {/* Milestone Card */}
                    <div className={cn(
                      "ml-16 md:ml-0 w-full md:w-[45%] transition-all duration-500",
                      isHovered ? "md:scale-[1.02]" : ""
                    )}>
                      <div className={cn(
                        "p-6 rounded-[20px] bg-white/60 backdrop-blur-xl border transition-all duration-300 relative overflow-hidden",
                        isActive || isHovered 
                          ? "border-[#FF5722]/40 shadow-[0_15px_35px_-10px_rgba(255,87,34,0.2)]" 
                          : "border-[#E9ECEF] shadow-sm hover:border-[#FF5722]/20"
                      )}>
                        
                        {/* Hover Gradient Border Effect */}
                        <div className={cn(
                          "absolute inset-0 bg-gradient-to-r from-[#FF5722]/0 via-[#FF5722]/5 to-[#FF5722]/0 opacity-0 transition-opacity duration-500 pointer-events-none",
                          isHovered ? "opacity-100" : ""
                        )} />

                        <div className="flex justify-between items-start mb-4 relative z-10">
                          <div className={cn(
                            "w-12 h-12 rounded-xl flex items-center justify-center transition-colors duration-300",
                            isActive || isHovered ? "bg-[#FF5722]/10 text-[#FF5722]" : "bg-[#E9ECEF]/50 text-[#64748B]"
                          )}>
                            {/* Animated Progress Ring */}
                            <svg className="absolute w-12 h-12 -rotate-90 pointer-events-none">
                              <circle cx="24" cy="24" r="22" stroke="currentColor" strokeWidth="1" fill="none" className="opacity-20" />
                              <motion.circle cx="24" cy="24" r="22" stroke="currentColor" strokeWidth="2" fill="none" strokeDasharray="140" initial={{ strokeDashoffset: 140 }} animate={{ strokeDashoffset: isActive || isHovered ? 0 : 140 }} transition={{ duration: 0.8 }} />
                            </svg>
                            <motion.div animate={{ y: isHovered ? [-2, 2, -2] : 0 }} transition={{ repeat: Infinity, duration: 2 }}>
                              {milestone.icon}
                            </motion.div>
                          </div>
                          <div className="flex flex-col items-end">
                            <span className="text-xs font-bold text-[#FF5722] bg-[#FF5722]/10 px-2 py-1 rounded-md mb-1">STEP {milestone.step}</span>
                            <span className="text-xs font-semibold text-[#64748B]">{milestone.duration}</span>
                          </div>
                        </div>

                        <div className="relative z-10">
                          <h3 className="font-heading font-bold text-lg text-[#0F172A] mb-1">{milestone.title}</h3>
                          <p className="text-sm text-[#64748B] font-medium mb-3">{milestone.desc}</p>
                          
                          <AnimatePresence>
                            {(isActive || isHovered) && (
                              <motion.div 
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden"
                              >
                                <div className="pt-3 border-t border-[#E9ECEF]/50 space-y-2">
                                  {milestone.items.slice(0, 3).map((item, idx) => (
                                    <div key={idx} className="flex items-center text-xs text-[#64748B]">
                                      <Zap size={12} className="text-[#FF5722] mr-2" /> {item}
                                    </div>
                                  ))}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>

                      </div>
                    </div>

                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Side Information Panel (Right side on desktop, 35%) */}
          <div className="w-full lg:w-[35%]">
            <div className="sticky top-32">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeMilestone.step}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                  className="bg-[#0F172A] rounded-[24px] p-8 text-white shadow-2xl relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF5722]/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                  
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-[#FF5722]">
                          {activeMilestone.icon}
                        </div>
                        <h3 className="font-heading font-bold text-xl">{activeMilestone.title}</h3>
                      </div>
                      <Badge variant="neutral" className="bg-[#FF5722]/20 text-[#FF5722] border-none">{activeMilestone.xp}</Badge>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <h4 className="text-[10px] uppercase tracking-widest text-[#64748B] font-bold mb-2">What you'll learn</h4>
                        <p className="text-sm text-[#E9ECEF] leading-relaxed">{activeMilestone.details.learn}</p>
                      </div>

                      <div>
                        <h4 className="text-[10px] uppercase tracking-widest text-[#64748B] font-bold mb-2">Skills you'll gain</h4>
                        <div className="flex flex-wrap gap-2">
                          {activeMilestone.details.skills.map((skill, i) => (
                            <span key={i} className="text-xs px-2 py-1 bg-white/5 border border-white/10 rounded-md text-[#E9ECEF]">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 gap-4 pt-4 border-t border-white/10">
                        <div className="flex items-start">
                          <Target size={16} className="text-[#FF5722] mr-3 mt-0.5 shrink-0" />
                          <div>
                            <div className="text-[10px] uppercase tracking-widest text-[#64748B] font-bold">Projects</div>
                            <div className="text-sm text-[#E9ECEF]">{activeMilestone.details.projects}</div>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <Sparkles size={16} className="text-[#FF5722] mr-3 mt-0.5 shrink-0" />
                          <div>
                            <div className="text-[10px] uppercase tracking-widest text-[#64748B] font-bold">Opportunities</div>
                            <div className="text-sm text-[#E9ECEF]">{activeMilestone.details.opportunities}</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <Button variant="primary" className="w-full mt-8 group">
                      Explore Milestone <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Roadmap Progress Tracker */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1 }}
          className="max-w-4xl mx-auto mb-32"
        >
          <div className="flex justify-between text-xs font-bold text-[#64748B] mb-3 px-1">
            <span>0%</span>
            <span>25%</span>
            <span>50%</span>
            <span>75%</span>
            <span className="text-[#FF5722]">Career Ready</span>
          </div>
          <div className="h-3 w-full bg-[#E9ECEF] rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-gradient-to-r from-[#FF5722] to-[#FE6D4D] rounded-full"
              initial={{ width: "0%" }}
              animate={inView ? { width: "100%" } : {}}
              transition={{ duration: 3, ease: "easeOut", delay: 1.5 }}
            />
          </div>
        </motion.div>

        {/* Success Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-32 border-y border-[#E9ECEF] py-12">
          {metrics.map((metric, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 1.2 + i * 0.1 }}
              className="flex flex-col items-center text-center"
            >
              <div className="text-3xl md:text-4xl font-heading font-extrabold text-[#0F172A] mb-2">
                <AnimatedCounter end={metric.value} suffix="+" duration={2.5} />
              </div>
              <div className="text-sm font-semibold text-[#64748B] uppercase tracking-wider">{metric.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="text-center max-w-3xl mx-auto"
        >
          <motion.h3 variants={fadeUp} className="text-[32px] md:text-[48px] font-heading font-bold text-[#0F172A] tracking-tight mb-6 text-balance">
            Every Great Career Starts With One Step.
          </motion.h3>
          <motion.p variants={fadeUp} className="text-[18px] md:text-[20px] text-[#64748B] mb-12 font-sans leading-relaxed text-balance">
            Stop wondering what to do next. Follow a proven roadmap, build your portfolio, connect with mentors and move confidently toward your dream career.
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row justify-center gap-4">
            <Button variant="primary" className="h-14 px-10 text-lg font-bold">
              Start My Roadmap
            </Button>
            <Button variant="outline" className="h-14 px-10 text-lg font-bold">
              Explore Career Paths
            </Button>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
