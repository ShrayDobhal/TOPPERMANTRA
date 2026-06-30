import React from "react";
import { motion } from "framer-motion";
import { MapPin, Users, Award } from "lucide-react";
import { fadeUp, staggerContainer } from "../../lib/animations";

export default function TopCollegeNetwork() {
  const colleges = [
    { name: "IIT Delhi", count: "120+", domains: "DSA, AI, Systems", achievement: "25+ GSoC Mentors" },
    { name: "IIT Bombay", count: "95+", domains: "Startups, ML, Core", achievement: "10+ YC Founders" },
    { name: "IIT Madras", count: "110+", domains: "Research, AI, Web3", achievement: "40+ Published Papers" },
    { name: "IIT Kanpur", count: "80+", domains: "Cyber, CP, Systems", achievement: "15+ ICPC Finalists" },
    { name: "BITS Pilani", count: "150+", domains: "Startups, PM, SDE", achievement: "50+ FAANG SDEs" },
    { name: "NIT Trichy", count: "70+", domains: "Core, Web, Hardware", achievement: "20+ SIH Winners" },
  ];

  return (
    <section className="py-24 bg-slate-50 border-y border-[#E9ECEF] relative overflow-hidden">
      {/* Background Graphic */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-slate-200/50 rounded-full blur-[100px] -mt-64 -mr-64 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#FF5722]/5 rounded-full blur-[100px] -mb-64 -ml-64 pointer-events-none" />

      <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block py-1.5 px-4 rounded-full bg-slate-200/50 text-slate-600 font-semibold text-sm border border-slate-200 mb-4"
          >
            Elite Network
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold font-heading mb-4 text-[#0F172A]"
          >
            Mentors From India's <br className="hidden md:block" />
            <span className="text-[#FF5722]">Top Institutions</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-[#64748B] max-w-2xl mx-auto"
          >
            Skip the generic advice. Get mentored by the students and alumni who cracked the hardest exams and companies in the country.
          </motion.p>
        </div>

        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {colleges.map((college, i) => (
            <motion.div 
              key={i}
              variants={fadeUp}
              className="bg-white rounded-2xl p-6 border border-[#E9ECEF] hover:border-[#FF5722]/50 hover:shadow-[0_12px_40px_rgba(255,87,34,0.1)] transition-all duration-300 group cursor-pointer"
            >
              <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-4">
                <h3 className="text-xl font-bold text-[#0F172A] group-hover:text-[#FF5722] transition-colors flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-slate-400 group-hover:text-[#FF5722]" />
                  {college.name}
                </h3>
                <span className="bg-[#FF5722]/10 text-[#FF5722] text-xs font-bold px-3 py-1 rounded-full">
                  {college.count} Mentors
                </span>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Users className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                  <div>
                    <span className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-0.5">Popular Domains</span>
                    <span className="text-sm text-slate-700 font-medium">{college.domains}</span>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Award className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                  <div>
                    <span className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-0.5">Network Strength</span>
                    <span className="text-sm text-slate-700 font-medium">{college.achievement}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
