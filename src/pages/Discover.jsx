import React, { useState, useMemo, useEffect } from 'react';
import { motion, useScroll, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import DiscoverSearch from '../components/discover/DiscoverSearch';
import OpportunityCategories from '../components/discover/OpportunityCategories';
import CompanyShowcase from '../components/discover/CompanyShowcase';
import DiscoverCta from '../components/discover/DiscoverCta';
import { mockOpportunities } from '../lib/mockDiscover';

export default function Discover() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    types: [],
    workplace: [],
    paid: [],
    experience: []
  });

  const { scrollY } = useScroll();
  const [scrollInVh, setScrollInVh] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    return scrollY.on("change", (latest) => {
      setScrollInVh(latest / window.innerHeight);
    });
  }, [scrollY]);

  // Derived states based on exact viewport heights scrolled
  const showHero = scrollInVh < 0.8;
  const showText1 = scrollInVh >= 0.8 && scrollInVh < 1.6;
  const showText2 = scrollInVh >= 1.6 && scrollInVh < 2.2;

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 20 - 10,
        y: (e.clientY / window.innerHeight) * 20 - 10,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleFilterChange = (filterType, newValues) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: newValues
    }));
  };

  // Apply filters to opportunities
  const filteredOpportunities = useMemo(() => {
    return mockOpportunities.filter(opp => {
      // Search matching (title, company, skills)
      const matchesSearch = searchQuery === "" || 
        opp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        opp.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        opp.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));

      // Filter matching
      const matchesType = filters.types.length === 0 || filters.types.includes(opp.type);
      const matchesWorkplace = filters.workplace.length === 0 || filters.workplace.includes(opp.workplaceType);
      const matchesPaid = filters.paid.length === 0 || filters.paid.includes(opp.paidStatus);
      
      // Currently, experience filter isn't mapped to mock data directly, but we include it for UI completeness
      const matchesExperience = true;

      return matchesSearch && matchesType && matchesWorkplace && matchesPaid && matchesExperience;
    });
  }, [searchQuery, filters]);

  return (
    <div style={{ minHeight: "400vh" }} className="bg-[#FFFFFF] text-[#0F172A] relative selection:bg-[#FF5722] selection:text-white font-sans overflow-x-hidden">
      
      {/* Ambient Orbs */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <motion.div 
          animate={{ x: mousePosition.x * 2, y: mousePosition.y * 2 }}
          transition={{ type: "spring", damping: 50, stiffness: 100 }}
          className="absolute top-[20%] left-[15%] w-[400px] h-[400px] bg-[#FE6D4D]/10 blur-[120px] rounded-full" 
        />
        <motion.div 
          animate={{ x: mousePosition.x * -2, y: mousePosition.y * -2 }}
          transition={{ type: "spring", damping: 50, stiffness: 100 }}
          className="absolute bottom-[20%] right-[15%] w-[500px] h-[500px] bg-[#FF5722]/5 blur-[120px] rounded-full" 
        />
      </div>

      <AnimatePresence>
        {/* STAGE 1: Hero */}
        {showHero && (
          <motion.div 
            key="hero"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50, transition: { duration: 0.2 } }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="fixed inset-0 flex flex-col items-center justify-center z-10 px-4 pt-20"
          >
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#FFFFFF] border border-[#E9ECEF] text-[#FF5722] shadow-sm text-xs font-bold uppercase tracking-[0.2em] mb-12">
              <span className="w-2 h-2 rounded-full bg-[#FF5722] animate-pulse" />
              Exclusive Opportunities
            </div>

            <h1 className="text-[5vw] sm:text-[6vw] lg:text-[7vw] font-extrabold tracking-tighter leading-[0.9] text-center max-w-7xl text-[#0F172A]">
              Don't wait to be <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#B0B0B0] to-[#0F172A]">chosen.</span>
            </h1>

            <motion.div 
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="absolute bottom-12 flex flex-col items-center text-[#B0B0B0]"
            >
              <span className="text-[10px] uppercase tracking-[0.3em] font-bold mb-4 text-[#0F172A]">Scroll to uncover</span>
              <ChevronDown className="w-6 h-6 text-[#FF5722]" />
            </motion.div>
          </motion.div>
        )}

        {/* STAGE 2: Reality */}
        {showText1 && (
          <motion.div 
            key="text1"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50, transition: { duration: 0.2 } }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="fixed inset-0 flex items-center justify-center z-10 pointer-events-none px-4"
          >
            <div className="max-w-4xl text-center">
              <p className="text-3xl md:text-5xl lg:text-7xl font-bold tracking-tight text-[#0F172A] leading-tight">
                Thousands of applications thrown into the ATS black hole.
              </p>
              <p className="text-xl md:text-3xl text-[#FE6D4D] mt-6 font-bold">
                The top 1% bypass the queue entirely.
              </p>
            </div>
          </motion.div>
        )}

        {/* STAGE 3: Secret */}
        {showText2 && (
          <motion.div 
            key="text2"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50, transition: { duration: 0.2 } }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="fixed inset-0 flex items-center justify-center z-10 pointer-events-none px-4"
          >
            <div className="max-w-4xl text-center">
              <p className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#0F172A] leading-tight">
                Stop applying. <br/>
                Start getting <span className="text-[#FF5722]">recruited directly by founders.</span>
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* STAGE 4: Final View - The actual functionality of the page */}
      <div 
        style={{ paddingTop: "300vh" }} 
        className="relative z-30 w-full pointer-events-none"
      >
        <div className="bg-[#FFFFFF] pb-32 shadow-[0_-40px_40px_rgba(255,255,255,1)] pointer-events-auto">
          <div className="pt-20 px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 max-w-4xl mx-auto">
              <h2 className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-6 text-[#0F172A]">
                The <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF5722] to-[#FE6D4D]">Inside Track.</span>
              </h2>
              <p className="text-xl text-[#64748B] font-semibold leading-relaxed">
                Exclusive access to high-growth startups, elite hackathons, and unadvertised roles that you won't find on LinkedIn.
              </p>
            </div>
          </div>
          
          <DiscoverSearch 
            onSearch={setSearchQuery}
            onFilterChange={handleFilterChange}
            currentFilters={filters}
          />
          
          <OpportunityCategories 
            opportunities={filteredOpportunities}
            filters={filters}
            searchQuery={searchQuery}
          />

          <CompanyShowcase />

          <DiscoverCta />
        </div>
      </div>
    </div>
  );
}
