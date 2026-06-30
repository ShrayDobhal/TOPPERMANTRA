import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/Button";
import HeroVisualization from "../components/common/HeroVisualization";
import SocialProof from "../components/sections/SocialProof";
import TrustBar from "../components/sections/TrustBar";
import OpportunityGap from "../components/sections/OpportunityGap";
import StudentJourney from "../components/sections/StudentJourney";
import InteractiveEcosystem from "../components/ui/InteractiveEcosystem";
import SuccessStories from "../components/sections/SuccessStories";
import FinalCta from "../components/sections/FinalCta";
import { fadeUp, staggerContainer } from "../lib/animations";
import { ChevronDown } from "lucide-react";

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
          <div className="w-full lg:w-[55%] flex flex-col justify-center z-20 pt-10">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="max-w-[650px]"
            >
              
              {/* Headline */}
              <h1 className="text-[60px] sm:text-[70px] md:text-[80px] lg:text-[90px] font-heading font-extrabold text-[#0F172A] tracking-tight leading-[1.05] mb-6">
                <div className="overflow-hidden pb-2">
                  <motion.span variants={lineVariants} className="block">Where India's</motion.span>
                </div>
                <div className="overflow-hidden pb-2">
                  <motion.span variants={lineVariants} className="block text-[#FF5722]">Next Builders</motion.span>
                </div>
                <div className="overflow-hidden pb-2">
                  <motion.span variants={lineVariants} className="block">Begin</motion.span>
                </div>
              </h1>

              {/* Subtitle */}
              <motion.div variants={fadeUp} className="text-[18px] md:text-[20px] text-[#64748B] mb-10 leading-relaxed font-sans pr-4 lg:pr-12">
                India's student growth ecosystem that connects ambitious Tier 2 and Tier 3 students with mentors, projects, internships, hackathons, startups, and career opportunities bringing the ecosystem of top institutions to every campus.
              </motion.div>

              {/* CTAs */}
              <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 mb-16">
                <Link to="/signup">
                  <Button variant="primary" className="h-14 w-full sm:w-auto px-10 rounded-full text-lg font-bold shadow-[0_4px_20px_0_rgba(255,87,34,0.4)] hover:shadow-[0_6px_25px_rgba(255,87,34,0.5)] transition-all">
                    Start Your Journey
                  </Button>
                </Link>
                <a href="#ecosystem">
                  <Button variant="outline" className="h-14 w-full sm:w-auto px-10 rounded-full text-lg font-bold bg-white border border-[#E9ECEF] hover:bg-slate-50 transition-all text-[#0F172A]">
                    Explore the Ecosystem
                  </Button>
                </a>
              </motion.div>

              {/* Bottom Metrics/Links */}
              <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-6 sm:gap-10 text-xs sm:text-sm font-bold text-[#64748B] uppercase tracking-widest mt-8">
                <div className="flex items-center gap-2 hover:text-[#FF5722] cursor-pointer transition-colors">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FF5722" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                  MENTORS
                </div>
                <div className="flex items-center gap-2 hover:text-[#FF5722] cursor-pointer transition-colors">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FF5722" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
                  LIVE PROJECTS
                </div>
                <div className="flex items-center gap-2 hover:text-[#FF5722] cursor-pointer transition-colors">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FF5722" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                  STUDENT BUILDERS
                </div>
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

      <SocialProof />
      <TrustBar />

      <div id="problem">
        <OpportunityGap />
      </div>

      <StudentJourney />

      <SuccessStories />

      <FinalCta />
    </>
  );
}
