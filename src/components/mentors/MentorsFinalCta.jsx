import React from "react";
import { motion } from "framer-motion";
import { Button } from "../ui/Button";

export default function MentorsFinalCta() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#FF5722]/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, type: "spring" }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black font-heading text-[#0F172A] tracking-tight mb-6 leading-[1.1]">
            Your Next Breakthrough <br className="hidden md:block" />
            Starts With <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF5722] to-[#FE6D4D]">One Conversation</span>
          </h2>
          
          <p className="text-lg md:text-xl text-[#64748B] mb-12 max-w-2xl mx-auto leading-relaxed">
            Thousands of ambitious students are already learning from mentors who have successfully walked the same path. Don't build your career alone.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              variant="primary" 
              size="lg" 
              className="w-full sm:w-auto h-16 px-10 text-lg font-bold shadow-[0_8px_30px_rgba(255,87,34,0.3)] hover:shadow-[0_12px_40px_rgba(255,87,34,0.4)] hover:scale-105 transition-all"
            >
              Find Your Mentor
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="w-full sm:w-auto h-16 px-10 text-lg font-bold bg-white/80 backdrop-blur-md hover:bg-slate-50"
            >
              Become a Mentor
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
