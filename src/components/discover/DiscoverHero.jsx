import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../ui/Button';
import { Search, Sparkles } from 'lucide-react';
import { fadeUp, staggerContainer } from '../../lib/animations';

export default function DiscoverHero() {
  return (
    <div className="relative pt-32 pb-20 overflow-hidden flex items-center justify-center min-h-[60vh] bg-white border-b border-[#E9ECEF]">
      
      {/* Background Graphic */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-[100px]" />
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.div variants={fadeUp} className="mb-6">
            <span className="inline-block py-1.5 px-4 rounded-full bg-slate-100 text-slate-600 font-semibold text-sm border border-slate-200">
              The World's Best Student Opportunities
            </span>
          </motion.div>
          
          <motion.h1 
            variants={fadeUp} 
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold font-heading tracking-tight mb-6 text-[#0F172A] leading-[1.05]"
          >
            Opportunities That<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF5722] to-[#FE6D4D]">
              Change Careers
            </span>
          </motion.h1>
          
          <motion.p 
            variants={fadeUp} 
            className="text-lg md:text-xl text-[#64748B] mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            Discover internships, hackathons, research programs, fellowships, scholarships, startup roles and competitions - all curated for ambitious students.
          </motion.p>
          
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              variant="primary" 
              size="lg" 
              className="w-full sm:w-auto px-8 shadow-[0_4px_14px_0_rgba(255,87,34,0.39)] hover:shadow-[0_6px_20px_rgba(255,87,34,0.23)] hover:scale-105 transition-all flex items-center gap-2 h-14"
              onClick={() => document.getElementById('discover-search')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Search className="w-5 h-5" /> Explore Opportunities
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="w-full sm:w-auto px-8 bg-white/50 backdrop-blur-md flex items-center gap-2 h-14 hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-200"
            >
              <Sparkles className="w-5 h-5" /> Get AI Recommendations
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
