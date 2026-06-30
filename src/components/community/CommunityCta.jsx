import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../ui/Button';

export default function CommunityCta() {
  return (
    <section className="py-24 bg-white relative overflow-hidden border-t border-[#E9ECEF]">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#FF5722]/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, type: "spring" }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black font-heading text-[#0F172A] tracking-tight mb-6 leading-[1.1]">
            Find Your Tribe. <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF5722] to-[#FE6D4D]">Build Together.</span>
          </h2>
          
          <p className="text-lg md:text-xl text-[#64748B] mb-12 max-w-2xl mx-auto leading-relaxed">
            Thousands of ambitious students are already collaborating inside Topper Mantra. Don't build your career in isolation.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              variant="primary" 
              size="lg" 
              className="w-full sm:w-auto h-14 px-10 text-lg font-bold shadow-[0_4px_14px_0_rgba(255,87,34,0.39)] hover:shadow-[0_6px_20px_rgba(255,87,34,0.23)] hover:scale-105 transition-all"
            >
              Join Community
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="w-full sm:w-auto h-14 px-10 text-lg font-bold bg-white/80 backdrop-blur-md hover:bg-slate-50"
              onClick={() => document.getElementById('community-spaces')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Explore Spaces
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
