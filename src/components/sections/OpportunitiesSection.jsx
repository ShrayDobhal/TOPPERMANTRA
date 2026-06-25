import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { fadeUp, staggerContainer, fadeRight } from '../../lib/animations';
import { cn } from '../../lib/utils';
import { Badge, Tag } from '../ui/Misc';
import { Button } from '../ui/Button';
import { 
  Search, Bookmark, BookmarkCheck, MapPin, 
  Calendar, Briefcase, IndianRupee, ArrowRight,
  ExternalLink, Sparkles, Filter
} from "lucide-react";

// Mock Data
const filters = [
  "Internships", "Hackathons", "Scholarships", "Competitions", 
  "Research", "Remote", "AI", "Product", "Web Development"
];

const featuredOpportunity = {
  title: "Google Summer Internship 2026",
  company: "Google",
  location: "Remote / Bangalore",
  stipend: "₹1,20,000/month",
  deadline: "15 July 2026",
  category: "Internship",
  tags: ["Software Engineering", "C++", "Python", "Data Structures"],
  color: "#4285F4",
  logo: "G"
};

const opportunities = [
  {
    id: 1,
    title: "Web3 Global Hackathon",
    company: "Devfolio & Polygon",
    location: "Global / Remote",
    deadline: "20 August 2026",
    difficulty: "Intermediate",
    stipend: "$50,000 Prize Pool",
    isRemote: true,
    tags: ["Blockchain", "Solidity", "React"],
    category: "Hackathon",
    logo: "P"
  },
  {
    id: 2,
    title: "Product Management Intern",
    company: "Atlassian",
    location: "Bangalore",
    deadline: "5 July 2026",
    difficulty: "Advanced",
    stipend: "₹80,000/month",
    isRemote: false,
    tags: ["Product", "Agile", "Jira"],
    category: "Internship",
    logo: "A"
  },
  {
    id: 3,
    title: "Reliance AI Fellowship",
    company: "Jio Institute",
    location: "Mumbai",
    deadline: "30 July 2026",
    difficulty: "Expert",
    stipend: "Full Scholarship + Living",
    isRemote: false,
    tags: ["AI", "Research", "Deep Learning"],
    category: "Fellowship",
    logo: "J"
  },
  {
    id: 4,
    title: "Frontend Developer Intern",
    company: "Razorpay",
    location: "Remote",
    deadline: "10 July 2026",
    difficulty: "Beginner",
    stipend: "₹40,000/month",
    isRemote: true,
    tags: ["React", "TypeScript", "UI/UX"],
    category: "Internship",
    logo: "R"
  },
  {
    id: 5,
    title: "National Coding Challenge",
    company: "HackerRank",
    location: "Online",
    deadline: "12 August 2026",
    difficulty: "All Levels",
    stipend: "Prizes & Referrals",
    isRemote: true,
    tags: ["Algorithms", "Competitive Coding"],
    category: "Competition",
    logo: "H"
  },
  {
    id: 6,
    title: "Cybersecurity Analyst Intern",
    company: "CrowdStrike",
    location: "Pune",
    deadline: "25 July 2026",
    difficulty: "Advanced",
    stipend: "₹65,000/month",
    isRemote: false,
    tags: ["Security", "Network", "Python"],
    category: "Internship",
    logo: "C"
  },
  {
    id: 7,
    title: "Startup Co-Founder Matching",
    company: "YC Startup School",
    location: "Remote",
    deadline: "Rolling",
    difficulty: "Expert",
    stipend: "Equity",
    isRemote: true,
    tags: ["Entrepreneurship", "Leadership"],
    category: "Startup Role",
    logo: "Y"
  },
  {
    id: 8,
    title: "Data Science Winter Program",
    company: "Microsoft Research",
    location: "Hyderabad",
    deadline: "1 September 2026",
    difficulty: "Intermediate",
    stipend: "₹75,000/month",
    isRemote: false,
    tags: ["Machine Learning", "Azure", "R"],
    category: "Research",
    logo: "M"
  }
];

function OpportunityCard({ opp }) {
  const [isBookmarked, setIsBookmarked] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-[24px] p-6 border border-[#E9ECEF] hover:border-[#FF5722]/40 hover:shadow-[0_20px_40px_-15px_rgba(255,87,34,0.15)] flex flex-col group relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#FF5722]/0 via-[#FF5722]/0 to-[#FF5722]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* Top row: Logo & Bookmark */}
      <div className="flex justify-between items-start mb-6 relative z-10">
        <div className="w-14 h-14 rounded-2xl bg-[#E9ECEF]/50 border border-[#E9ECEF] flex items-center justify-center text-xl font-heading font-bold text-[#0F172A] group-hover:scale-110 transition-transform duration-300 shadow-sm">
          {opp.logo}
        </div>
        <button 
          onClick={() => setIsBookmarked(!isBookmarked)}
          className={cn(
            "p-2 rounded-full transition-all duration-300",
            isBookmarked ? "bg-[#FF5722]/10 text-[#FF5722]" : "bg-[#E9ECEF]/50 text-[#64748B] hover:bg-[#FF5722]/10 hover:text-[#FF5722]"
          )}
        >
          {isBookmarked ? <BookmarkCheck size={18} /> : <Bookmark size={18} />}
        </button>
      </div>

      <div className="relative z-10 flex-1 flex flex-col">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#FF5722]">{opp.category}</span>
          {opp.isRemote && (
            <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-green-500/10 text-green-600">Remote</span>
          )}
        </div>
        
        <h3 className="text-lg font-heading font-bold text-[#0F172A] mb-1 line-clamp-1 group-hover:text-[#FF5722] transition-colors">{opp.title}</h3>
        <p className="text-sm font-semibold text-[#64748B] mb-5">{opp.company}</p>

        <div className="grid grid-cols-2 gap-y-3 mb-6">
          <div className="flex items-center text-xs text-[#64748B] font-medium">
            <MapPin size={14} className="mr-1.5 opacity-70" /> {opp.location}
          </div>
          <div className="flex items-center text-xs text-[#64748B] font-medium">
            <IndianRupee size={14} className="mr-1.5 opacity-70" /> {opp.stipend}
          </div>
          <div className="flex items-center text-xs text-[#64748B] font-medium">
            <Calendar size={14} className="mr-1.5 opacity-70" /> {opp.deadline}
          </div>
          <div className="flex items-center text-xs text-[#64748B] font-medium">
            <Briefcase size={14} className="mr-1.5 opacity-70" /> {opp.difficulty}
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-6">
          {opp.tags.map((tag, i) => (
            <span key={i} className="text-[10px] font-semibold px-2 py-1 rounded bg-[#E9ECEF]/60 text-[#64748B]">{tag}</span>
          ))}
        </div>

        <div className="flex items-center gap-2 mt-auto border-t border-[#E9ECEF] pt-4">
          <Button variant="outline" className="flex-1 text-xs h-10 border-[#E9ECEF] text-[#0F172A] hover:border-[#0F172A]">
            View Details
          </Button>
          <Button variant="primary" className="flex-1 text-xs h-10 shadow-md">
            Apply
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

export default function OpportunitiesSection() {
  const containerRef = useRef(null);
  const inView = useInView(containerRef, { once: true, margin: "-100px" });
  const [searchFocused, setSearchFocused] = useState(false);

  const lineVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
  };

  return (
    <section className="relative py-12 md:py-20 bg-[#FAFAFA] overflow-hidden" ref={containerRef}>
      
      {/* Background Layer */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[0%] left-[20%] w-[800px] h-[800px] bg-[#FF5722]/5 rounded-full blur-[150px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#E9ECEF_1px,transparent_1px),linear-gradient(to_bottom,#E9ECEF_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_0%,#000_20%,transparent_100%)] opacity-40" />
      </div>

      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div initial="hidden" animate={inView ? "visible" : "hidden"} variants={staggerContainer}>
            <motion.div variants={fadeUp} className="mb-6 flex justify-center">
              <Badge variant="neutral" className="bg-[#FF5722]/10 text-[#FF5722] border border-[#FF5722]/20">OPPORTUNITIES</Badge>
            </motion.div>
            
            <h2 className="text-[40px] md:text-[56px] font-heading font-extrabold text-[#0F172A] tracking-tighter leading-[1.1] mb-6">
              <div className="overflow-hidden">
                <motion.span variants={lineVariants} className="block">Discover Opportunities</motion.span>
              </div>
              <div className="overflow-hidden">
                <motion.span variants={lineVariants} className="block text-transparent bg-clip-text bg-gradient-to-r from-[#FF5722] to-[#FE6D4D]">That Shape Careers</motion.span>
              </div>
            </h2>

            <motion.p variants={fadeUp} className="text-[18px] text-[#64748B] font-sans leading-relaxed text-balance mx-auto">
              Internships. Hackathons. Scholarships. Competitions. Research Programs. Fellowships. Startup Roles. <strong className="text-[#0F172A]">Everything curated in one ecosystem.</strong>
            </motion.p>
          </motion.div>
        </div>

        {/* Premium Search Bar & Filters */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="max-w-4xl mx-auto mb-20"
        >
          <div className={cn(
            "relative bg-white rounded-full p-2 flex items-center shadow-lg transition-all duration-300 border mb-6 z-20",
            searchFocused ? "border-[#FF5722]/50 shadow-[0_0_25px_rgba(255,87,34,0.15)] ring-4 ring-[#FF5722]/10" : "border-[#E9ECEF]"
          )}>
            <div className="pl-6 pr-4 text-[#64748B]">
              <Search size={24} className={searchFocused ? "text-[#FF5722]" : ""} />
            </div>
            <input 
              type="text" 
              placeholder="Search internships, hackathons, scholarships..." 
              className="flex-1 bg-transparent border-none outline-none text-[#0F172A] text-lg font-medium placeholder:text-[#64748B]/50"
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
            />
            <div className="hidden md:flex items-center gap-2 pr-2 border-r border-[#E9ECEF] mr-2">
              <Filter size={18} className="text-[#64748B]" />
              <span className="text-sm font-semibold text-[#64748B] mr-4">Filters</span>
            </div>
            <Button variant="primary" className="rounded-full px-8 h-12 text-base font-bold shadow-md shrink-0">
              Search
            </Button>
          </div>

          <div className="flex flex-wrap justify-center gap-2 px-4">
            {filters.map((filter, i) => (
              <span 
                key={i} 
                className="px-3 py-1.5 rounded-full text-xs font-semibold bg-white border border-[#E9ECEF] text-[#64748B] hover:border-[#0F172A] hover:text-[#0F172A] cursor-pointer transition-colors shadow-sm"
              >
                {filter}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Featured Opportunity (Hero Card) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98, y: 20 }}
          animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-12 relative group"
        >
          <div className="absolute -inset-0.5 bg-gradient-to-r from-[#FF5722] to-[#FE6D4D] rounded-[32px] opacity-20 group-hover:opacity-100 blur-sm transition-opacity duration-1000 animate-pulse" />
          <div className="relative bg-[#0F172A] rounded-[32px] overflow-hidden border border-[#1E293B] flex flex-col md:flex-row shadow-2xl">
            
            {/* Ambient Background inside card */}
            <div className="absolute top-0 right-0 w-full h-full md:w-1/2 bg-gradient-to-l from-[#4285F4]/20 to-transparent pointer-events-none" />
            
            <div className="p-8 md:p-12 md:w-2/3 flex flex-col justify-center relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <span className="flex h-3 w-3 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF5722] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-[#FF5722]"></span>
                </span>
                <span className="text-[11px] font-bold uppercase tracking-widest text-white/70">Featured Opportunity</span>
              </div>
              
              <h3 className="text-3xl md:text-5xl font-heading font-extrabold text-white mb-4 leading-tight">
                {featuredOpportunity.title}
              </h3>
              
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mb-8">
                <div className="flex items-center text-white/80 font-medium">
                  <Briefcase size={18} className="mr-2 text-[#4285F4]" /> {featuredOpportunity.company}
                </div>
                <div className="flex items-center text-white/80 font-medium">
                  <MapPin size={18} className="mr-2 text-[#4285F4]" /> {featuredOpportunity.location}
                </div>
                <div className="flex items-center text-white/80 font-medium">
                  <IndianRupee size={18} className="mr-2 text-[#4285F4]" /> {featuredOpportunity.stipend}
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-10">
                {featuredOpportunity.tags.map((tag, i) => (
                  <span key={i} className="text-xs font-semibold px-3 py-1.5 rounded-md bg-white/10 text-white backdrop-blur-md border border-white/10">{tag}</span>
                ))}
              </div>

              <div className="flex items-center gap-4">
                <Button variant="primary" className="h-14 px-10 text-base font-bold bg-[#FF5722] hover:bg-[#E64A19] border-none">
                  Apply Now <ArrowRight size={18} className="ml-2" />
                </Button>
                <button className="h-14 w-14 rounded-full border border-white/20 bg-white/5 flex items-center justify-center text-white hover:bg-white/10 transition-colors">
                  <Bookmark size={20} />
                </button>
                <span className="text-sm font-semibold text-white/60 ml-4 hidden sm:block">
                  Apply before <span className="text-white">{featuredOpportunity.deadline}</span>
                </span>
              </div>
            </div>

            <div className="hidden md:flex md:w-1/3 items-center justify-center p-12 relative z-10 border-l border-white/10">
              <div className="w-48 h-48 rounded-[40px] bg-white flex items-center justify-center text-7xl font-heading font-extrabold text-[#0F172A] shadow-[0_0_50px_rgba(66,133,244,0.3)] rotate-3 group-hover:rotate-6 group-hover:scale-105 transition-all duration-500">
                {featuredOpportunity.logo}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <AnimatePresence>
            {opportunities.map((opp, i) => (
              <OpportunityCard key={opp.id} opp={opp} />
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}
