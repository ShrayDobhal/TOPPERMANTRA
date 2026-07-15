import React, { useState, useMemo, useEffect } from 'react';
import { motion, useScroll, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import ProjectSearch from '../components/projects/ProjectSearch';
import ProjectCategories from '../components/projects/ProjectCategories';
import ProjectsCta from '../components/projects/ProjectsCta';
import useProjectForgeStore from '../store/useProjectForgeStore';

export default function Projects() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    domains: [],
    difficulties: [],
    statuses: []
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

  const { projects, fetchProjects, loading } = useProjectForgeStore();

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  // Apply filters to projects
  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      // Search matching
      const searchStr = (project.title + ' ' + (project.shortDescription || project.description || '')).toLowerCase();
      const techStr = (project.techStack || []).join(' ').toLowerCase();
      const matchesSearch = searchQuery === "" || 
        searchStr.includes(searchQuery.toLowerCase()) ||
        techStr.includes(searchQuery.toLowerCase());

      // Filter matching
      const matchesDomain = filters.domains.length === 0 || filters.domains.includes(project.domain);
      const matchesDifficulty = filters.difficulties.length === 0 || filters.difficulties.includes(project.difficulty);
      const matchesStatus = filters.statuses.length === 0 || filters.statuses.includes(project.status);

      return matchesSearch && matchesDomain && matchesDifficulty && matchesStatus;
    });
  }, [searchQuery, filters, projects]);

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
              Build. Ship. Repeat.
            </div>

            <h1 className="text-[5vw] sm:text-[6vw] lg:text-[7vw] font-extrabold tracking-tighter leading-[0.9] text-center max-w-7xl text-[#0F172A]">
              The real world doesn't care <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#B0B0B0] to-[#0F172A]">about your GPA</span>
            </h1>

            <motion.div 
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="absolute bottom-12 flex flex-col items-center text-[#B0B0B0]"
            >
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
                You build clones that no one uses
              </p>
              <p className="text-xl md:text-3xl text-[#FE6D4D] mt-6 font-bold">
                The top 1% build products that solve real problems
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
                Stop playing in the sandbox <br/>
                It's time to <span className="text-[#FF5722]">deploy to production</span>
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
                The <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF5722] to-[#FE6D4D]">Battlefield</span>
              </h2>
              <p className="text-xl text-[#64748B] font-semibold leading-relaxed">
                Join live open-source repositories, collaborate with top engineers, and build a portfolio that guarantees interviews.
              </p>
            </div>
          </div>
          
          <ProjectSearch 
            onSearch={setSearchQuery}
            onFilterChange={handleFilterChange}
            currentFilters={filters}
          />
          
          <ProjectCategories 
            projects={filteredProjects}
            filters={filters}
            searchQuery={searchQuery}
          />

          <ProjectsCta />
        </div>
      </div>
    </div>
  );
}
