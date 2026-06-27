import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Misc";
import HeroVisualization from "../components/common/HeroVisualization";
import OpportunityGap from "../components/sections/OpportunityGap";
import EcosystemSection from "../components/sections/Ecosystem";
import CareerPaths from "../components/sections/CareerPaths";
import Roadmap from "../components/sections/Roadmap";
import ProjectsSection from "../components/sections/ProjectsSection";
import MentorsSection from "../components/sections/MentorsSection";
import OpportunitiesSection from "../components/sections/OpportunitiesSection";
import FinalCta from "../components/sections/FinalCta";
import { fadeUp, staggerContainer, fadeRight } from "../lib/animations";
import { ChevronDown, Users, CheckCircle, Code, Trophy, Target } from "lucide-react";

const trustBadges = [
  { icon: <Users size={16} />, label: "Mentors" },
  { icon: <Code size={16} />, label: "Live Projects" },
  { icon: <CheckCircle size={16} />, label: "Student Builders" },
  { icon: <Trophy size={16} />, label: "Hackathons" },
  { icon: <Target size={16} />, label: "Career Opportunities" },
];

export default function Home() {
  const lineVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } 
    }
  };

  return (
    <>
      <div id="hero" className="relative min-h-screen flex items-center overflow-hidden pt-20">
      
      <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12 py-12 md:py-20">
        
        {/* Left Content */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center z-20">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-2xl"
          >
            {/* Pill Badge */}
            <motion.div variants={fadeUp} className="mb-8">
              <div className="inline-flex items-center rounded-full border border-[#FF5722]/20 bg-[#FF5722]/5 backdrop-blur-md px-4 py-1.5 text-sm font-semibold text-[#FF5722]">
                <span className="flex h-2 w-2 rounded-full bg-[#FF5722] mr-2 animate-pulse"></span>
                The Operating System for Students
              </div>
            </motion.div>
            
            {/* Headline */}
            <h1 className="text-[56px] sm:text-[64px] md:text-[72px] lg:text-[80px] font-heading font-extrabold text-[#0F172A] tracking-tighter leading-[1.05] mb-6">
              <div className="overflow-hidden">
                <motion.span variants={lineVariants} className="block">Where India's</motion.span>
              </div>
              <div className="overflow-hidden">
                <motion.span variants={lineVariants} className="block text-transparent bg-clip-text bg-gradient-to-r from-[#FF5722] to-[#FE6D4D]">Next Builders</motion.span>
              </div>
              <div className="overflow-hidden">
                <motion.span variants={lineVariants} className="block">Begin</motion.span>
              </div>
            </h1>

            {/* Subtitle */}
            <motion.p variants={fadeUp} className="text-[18px] md:text-[20px] text-[#64748B] mb-10 leading-relaxed max-w-xl text-balance font-sans">
              India's student growth ecosystem that connects ambitious Tier 2 and Tier 3 students with mentors, projects, internships, hackathons, startups, and career opportunities bringing the ecosystem of top institutions to every campus.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 mb-16">
              <Link to="/signup">
                <Button variant="primary" className="h-14 w-full sm:w-auto px-8 text-lg font-bold">
                  Start Your Journey
                </Button>
              </Link>
              <a href="#ecosystem">
                <Button variant="outline" className="h-14 w-full sm:w-auto px-8 text-lg font-bold bg-white/50 backdrop-blur-sm">
                  Explore the Ecosystem
                </Button>
              </a>
            </motion.div>

            {/* Trust Badges */}
            <motion.div variants={staggerContainer} className="flex flex-wrap gap-x-6 gap-y-4">
              {trustBadges.map((badge, i) => (
                <motion.div 
                  key={i} 
                  variants={fadeRight}
                  className="flex items-center text-[#64748B] text-sm font-semibold tracking-wide uppercase"
                >
                  <span className="text-[#FF5722] mr-2 opacity-80">{badge.icon}</span>
                  {badge.label}
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Right Visualization */}
        <div className="w-full lg:w-1/2 relative z-10 flex items-center justify-center">
          <HeroVisualization />
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center text-[#64748B] animate-bounce"
      >
        <span className="text-xs font-semibold uppercase tracking-widest mb-2">Scroll</span>
        <ChevronDown size={20} className="text-[#FF5722]" />
      </motion.div>
    </div>
    <div id="about"><OpportunityGap /></div>
    <div id="ecosystem"><EcosystemSection /></div>
    <div id="career-paths"><CareerPaths /></div>
    <div id="roadmaps"><Roadmap /></div>
    <div id="projects"><ProjectsSection /></div>
    <div id="mentors"><MentorsSection /></div>
    <div id="opportunities"><OpportunitiesSection /></div>
    <FinalCta />
    </>
  );
}
