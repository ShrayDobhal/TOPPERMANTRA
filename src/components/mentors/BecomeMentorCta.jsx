import React from "react";
import { motion } from "framer-motion";
import { Button } from "../ui/Button";

export default function BecomeMentorCta() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background Graphic */}
      <div className="absolute top-0 right-0 -mr-32 -mt-32 w-96 h-96 bg-[#FF5722]/5 rounded-full blur-[80px]" />
      
      <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-3xl p-8 md:p-16 border border-slate-200 shadow-xl flex flex-col md:flex-row items-center justify-between gap-12"
        >
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-3xl md:text-5xl font-bold font-heading text-[#0F172A] mb-4">
              Give Back To The <span className="text-[#FF5722]">Next Generation</span>
            </h2>
            <p className="text-lg text-slate-600 mb-8 max-w-xl">
              Are you an IIT student, alumni, researcher, startup founder, or engineer? Join our mission to democratize access to world-class guidance.
            </p>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 text-sm font-semibold text-slate-500 mb-8">
              <span className="bg-white px-3 py-1 rounded-full shadow-sm border border-slate-100">IIT Alumni</span>
              <span className="bg-white px-3 py-1 rounded-full shadow-sm border border-slate-100">Hackathon Winners</span>
              <span className="bg-white px-3 py-1 rounded-full shadow-sm border border-slate-100">Founders</span>
              <span className="bg-white px-3 py-1 rounded-full shadow-sm border border-slate-100">Engineers</span>
            </div>
          </div>
          
          <div className="shrink-0 w-full md:w-auto">
            <Button 
              variant="primary" 
              className="w-full md:w-auto h-16 px-10 text-lg font-bold shadow-[0_8px_25px_rgba(255,87,34,0.3)] hover:shadow-[0_12px_35px_rgba(255,87,34,0.4)]"
            >
              Apply as Mentor
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
