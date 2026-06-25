import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView, useSpring, useTransform } from "framer-motion";
import { fadeUp, staggerContainer, fadeRight } from '../../lib/animations';
import { cn } from '../../lib/utils';
import { Badge, AnimatedCounter, Tag } from '../ui/Misc';
import { Button } from '../ui/Button';
import { 
  Star, Calendar, Users, Briefcase, GraduationCap,
  MessageCircle, Target, ArrowRight, CheckCircle2, ChevronRight
} from "lucide-react";

// Mock Data
const filters = ["All", "Software", "AI", "Product", "Data Science", "Design", "Cybersecurity", "Cloud", "Entrepreneurship", "Leadership"];

const mentors = [
  {
    id: 1,
    name: "Rahul Sharma",
    role: "Senior Software Engineer",
    company: "Google",
    category: "Software",
    exp: "8 Years",
    rating: "4.9",
    sessions: "1.2k",
    students: "350",
    tags: ["React", "System Design", "Backend"],
    ribbon: "GOOGLE",
    ribbonColor: "from-[#4285F4] to-[#34A853]",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80"
  },
  {
    id: 2,
    name: "Ananya Gupta",
    role: "Product Manager",
    company: "Microsoft",
    category: "Product",
    exp: "7 Years",
    rating: "5.0",
    sessions: "850",
    students: "210",
    tags: ["Product", "Strategy", "Analytics"],
    ribbon: "MICROSOFT",
    ribbonColor: "from-[#00A4EF] to-[#7FBA00]",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80"
  },
  {
    id: 3,
    name: "Rohan Mehta",
    role: "Founder",
    company: "YC Startup",
    category: "Entrepreneurship",
    exp: "10 Years",
    rating: "4.8",
    sessions: "540",
    students: "150",
    tags: ["Startup", "Leadership", "Fundraising"],
    ribbon: "YC FOUNDER",
    ribbonColor: "from-[#F26522] to-[#FF8C00]",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80"
  },
  {
    id: 4,
    name: "Sneha Kapoor",
    role: "AI Engineer",
    company: "OpenAI",
    category: "AI",
    exp: "6 Years",
    rating: "4.9",
    sessions: "920",
    students: "400",
    tags: ["LLMs", "GenAI", "Python"],
    ribbon: "OPENAI",
    ribbonColor: "from-[#10A37F] to-[#0D8A6A]",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80"
  },
  {
    id: 5,
    name: "Vikram Singh",
    role: "Lead Designer",
    company: "Apple",
    category: "Design",
    exp: "9 Years",
    rating: "5.0",
    sessions: "600",
    students: "280",
    tags: ["UI/UX", "Figma", "Design Systems"],
    ribbon: "APPLE",
    ribbonColor: "from-[#555555] to-[#000000]",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&q=80"
  },
  {
    id: 6,
    name: "Priya Das",
    role: "Data Scientist",
    company: "Amazon",
    category: "Data Science",
    exp: "5 Years",
    rating: "4.8",
    sessions: "730",
    students: "310",
    tags: ["ML", "Data Science", "AWS"],
    ribbon: "AMAZON",
    ribbonColor: "from-[#FF9900] to-[#E47911]",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
  }
];

const features = [
  { icon: <Target />, title: "Personalized Guidance", desc: "1-on-1 strategy sessions tailored to your goals." },
  { icon: <Briefcase />, title: "Portfolio Reviews", desc: "Get actionable feedback on your projects." },
  { icon: <MessageCircle />, title: "Interview Preparation", desc: "Mock interviews with FAANG engineers." },
  { icon: <Star />, title: "Career Strategy", desc: "Navigate promotions and career transitions." }
];

const journeySteps = [
  "Find Mentor",
  "Book Session",
  "Receive Guidance",
  "Build Projects",
  "Land Internship",
  "Become Mentor"
];

const metrics = [
  { label: "Industry Mentors", value: 500, suffix: "+" },
  { label: "Sessions Conducted", value: 20000, suffix: "+" },
  { label: "Students Guided", value: 10000, suffix: "+" },
  { label: "Average Rating", value: 4, suffix: ".9★" }
];

// Interactive 3D Tilt Card
function MentorCard({ mentor }) {
  const ref = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const x = useSpring(0, { stiffness: 150, damping: 20 });
  const y = useSpring(0, { stiffness: 150, damping: 20 });

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    // Limit rotation angle to 5 degrees max
    x.set(((e.clientY - cy) / rect.height) * -10);
    y.set(((e.clientX - cx) / rect.width) * 10);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX: x, rotateY: y, transformPerspective: 1000 }}
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4 }}
      className="relative group bg-white/70 backdrop-blur-2xl rounded-[20px] p-6 border border-[#E9ECEF] hover:border-[#FF5722]/30 shadow-sm hover:shadow-[0_20px_40px_-15px_rgba(255,87,34,0.15)] transition-colors duration-500 overflow-hidden flex flex-col"
    >
      {/* Subtle background glow on hover */}
      <div className={cn(
        "absolute inset-0 bg-gradient-to-br from-[#FF5722]/0 via-[#FF5722]/5 to-transparent opacity-0 transition-opacity duration-500 pointer-events-none",
        isHovered ? "opacity-100" : ""
      )} />

      {/* Ribbon */}
      <div className="absolute top-0 right-0 w-32 h-32 overflow-hidden rounded-tr-[20px] pointer-events-none z-10">
        <div className={cn(
          "absolute top-[28px] -right-[32px] w-[150px] rotate-45 text-center text-[9px] font-bold py-1.5 shadow-md text-white tracking-widest transition-transform duration-500 bg-gradient-to-r",
          mentor.ribbonColor
        )}>
          {mentor.ribbon}
        </div>
      </div>

      {/* Top Section: Profile Image & Basic Info */}
      <div className="flex gap-4 mb-6 relative z-10">
        <div className="w-20 h-20 md:w-24 md:h-24 shrink-0 rounded-2xl overflow-hidden border-2 border-[#E9ECEF] shadow-sm relative group-hover:border-[#FF5722]/30 transition-colors duration-500">
          <motion.img 
            src={mentor.image} 
            alt={mentor.name} 
            className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-500"
            animate={{ scale: isHovered ? 1.05 : 1 }}
          />
        </div>
        <div className="flex flex-col justify-center pr-8">
          <h3 className="font-heading font-bold text-xl text-[#0F172A] leading-tight mb-1">{mentor.name}</h3>
          <p className="text-sm font-semibold text-[#FF5722] mb-1 line-clamp-1">{mentor.role}</p>
          <div className="flex items-center text-xs font-medium text-[#64748B]">
            <Briefcase size={12} className="mr-1" /> {mentor.company}
          </div>
        </div>
      </div>

      {/* Stats Strip */}
      <div className="grid grid-cols-4 gap-2 mb-6 border-y border-[#E9ECEF]/50 py-3 relative z-10">
        <div className="flex flex-col items-center justify-center">
          <div className="flex items-center text-xs font-bold text-[#0F172A]"><Star size={12} className="text-[#FACC15] mr-1" />{mentor.rating}</div>
          <span className="text-[10px] text-[#64748B] uppercase">Rating</span>
        </div>
        <div className="flex flex-col items-center justify-center border-l border-[#E9ECEF]/50">
          <div className="flex items-center text-xs font-bold text-[#0F172A]">{mentor.sessions}</div>
          <span className="text-[10px] text-[#64748B] uppercase">Sessions</span>
        </div>
        <div className="flex flex-col items-center justify-center border-l border-[#E9ECEF]/50">
          <div className="flex items-center text-xs font-bold text-[#0F172A]"><Users size={12} className="mr-1 text-[#64748B]" />{mentor.students}</div>
          <span className="text-[10px] text-[#64748B] uppercase">Mentees</span>
        </div>
        <div className="flex flex-col items-center justify-center border-l border-[#E9ECEF]/50">
          <div className="flex items-center text-xs font-bold text-[#0F172A]">{mentor.exp}</div>
          <span className="text-[10px] text-[#64748B] uppercase">Exp</span>
        </div>
      </div>

      {/* Expertise Tags */}
      <div className="mb-6 flex-1 relative z-10">
        <div className="flex flex-wrap gap-2">
          {mentor.tags.map((tag, i) => (
            <motion.span 
              key={i}
              animate={{ y: isHovered ? -2 : 0 }}
              transition={{ delay: i * 0.05 }}
              className="text-[11px] font-bold px-2 py-1 rounded-md bg-[#E9ECEF]/50 text-[#64748B] group-hover:bg-white group-hover:text-[#0F172A] group-hover:shadow-sm border border-transparent group-hover:border-[#E9ECEF] transition-all duration-300"
            >
              {tag}
            </motion.span>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2 mt-auto relative z-10">
        <Button variant="outline" className="flex-1 text-xs py-2 h-10 border-[#E9ECEF] bg-white text-[#0F172A] hover:border-[#FF5722]/30">
          View Profile
        </Button>
        <Button variant="primary" className="flex-1 text-xs py-2 h-10 shadow-md">
          Book Session
        </Button>
      </div>
    </motion.div>
  );
}

export default function MentorsSection() {
  const [activeFilter, setActiveFilter] = useState("All");
  const containerRef = useRef(null);
  const inView = useInView(containerRef, { once: true, margin: "-100px" });

  const filteredMentors = activeFilter === "All" 
    ? mentors 
    : mentors.filter(m => m.category === activeFilter);

  const lineVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
  };

  return (
    <section className="relative py-12 md:py-20 bg-white overflow-hidden" ref={containerRef}>
      
      {/* Background Layers */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[10%] left-[-10%] w-[600px] h-[600px] bg-[#FF5722]/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-[#FE6D4D]/5 rounded-full blur-[150px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#E9ECEF_1px,transparent_1px),linear-gradient(to_bottom,#E9ECEF_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_20%,transparent_100%)] opacity-30" />
      </div>

      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div initial="hidden" animate={inView ? "visible" : "hidden"} variants={staggerContainer}>
            <motion.div variants={fadeUp} className="mb-6 flex justify-center">
              <Badge variant="neutral" className="bg-[#FF5722]/5 text-[#FF5722] border border-[#FF5722]/20">INDUSTRY MENTORS</Badge>
            </motion.div>
            
            <h2 className="text-[40px] md:text-[56px] font-heading font-extrabold text-[#0F172A] tracking-tighter leading-[1.1] mb-6">
              <div className="overflow-hidden">
                <motion.span variants={lineVariants} className="block">Meet The People Who've</motion.span>
              </div>
              <div className="overflow-hidden">
                <motion.span variants={lineVariants} className="block text-transparent bg-clip-text bg-gradient-to-r from-[#FF5722] to-[#FE6D4D]">Already Walked The Path</motion.span>
              </div>
            </h2>

            <motion.p variants={fadeUp} className="text-[18px] text-[#64748B] font-sans leading-relaxed text-balance mx-auto">
              Learn directly from experienced professionals working at the world's leading companies and startups. Receive mentorship, career guidance, portfolio reviews and industry insights from people who have already achieved what you're aiming for.
            </motion.p>
          </motion.div>
        </div>

        {/* Filters */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-2 md:gap-3 mb-16 max-w-5xl mx-auto"
        >
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={cn(
                "px-4 py-2 rounded-full text-[13px] font-bold transition-all duration-300 relative overflow-hidden",
                activeFilter === filter 
                  ? "text-white shadow-md shadow-[#0F172A]/10" 
                  : "bg-white text-[#64748B] border border-[#E9ECEF] hover:border-[#0F172A]/30 hover:text-[#0F172A]"
              )}
            >
              {activeFilter === filter && (
                <motion.div 
                  layoutId="activeMentorFilter" 
                  className="absolute inset-0 bg-[#0F172A] z-0"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10">{filter}</span>
            </button>
          ))}
        </motion.div>

        {/* Mentor Cards Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8 mb-32">
          <AnimatePresence mode="popLayout">
            {filteredMentors.map((mentor) => (
              <MentorCard key={mentor.id} mentor={mentor} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Why Learn From Mentors */}
        <div className="mb-32">
          <h3 className="text-2xl font-heading font-bold text-[#0F172A] mb-10 text-center">Why Learn From Mentors</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 bg-white/50 backdrop-blur-sm rounded-[24px] border border-[#E9ECEF] hover:bg-white hover:border-[#FF5722]/30 hover:shadow-xl transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-[#E9ECEF]/50 flex items-center justify-center mb-4 text-[#64748B] group-hover:text-[#FF5722] group-hover:bg-[#FF5722]/10 transition-colors duration-300">
                  {feature.icon}
                </div>
                <h4 className="font-heading font-bold text-[#0F172A] mb-2">{feature.title}</h4>
                <p className="text-sm text-[#64748B] leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mentorship Journey Timeline removed as requested */}

        {/* Animated Statistics */}
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
              <div className="text-4xl md:text-5xl font-heading font-extrabold text-[#0F172A] mb-2 flex items-center">
                <AnimatedCounter end={metric.value} duration={2.5} />
                <span className="text-[#FF5722]">{metric.suffix}</span>
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
          className="text-center max-w-4xl mx-auto flex flex-col items-center bg-white border border-[#E9ECEF] shadow-2xl rounded-[40px] p-12 md:p-20 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#FF5722]/5 to-transparent pointer-events-none" />
          
          <motion.h3 variants={fadeUp} className="text-[32px] md:text-[48px] font-heading font-bold text-[#0F172A] tracking-tight mb-6 text-balance relative z-10">
            The Right Mentor Can Change Everything.
          </motion.h3>
          <motion.p variants={fadeUp} className="text-[18px] md:text-[20px] text-[#64748B] mb-12 relative z-10 font-sans max-w-2xl text-balance">
            One conversation can save months of confusion. Connect with experienced professionals who can guide you through every stage of your journey.
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 relative z-10 w-full sm:w-auto">
            <Button variant="primary" className="h-14 px-8 text-lg font-bold w-full sm:w-auto">
              Find Your Mentor
            </Button>
            <Button variant="outline" className="h-14 px-8 text-lg font-bold w-full sm:w-auto bg-transparent border-[#E9ECEF] text-[#0F172A] hover:border-[#0F172A]">
              Become A Mentor
            </Button>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
