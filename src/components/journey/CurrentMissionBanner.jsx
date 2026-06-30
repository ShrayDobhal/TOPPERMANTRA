import { motion } from 'framer-motion';
import { Target, Clock, Zap, ArrowRight } from 'lucide-react';

export default function CurrentMissionBanner() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-[#0F172A] to-[#1E293B] rounded-3xl p-6 sm:p-8 border border-[#334155] shadow-lg text-white relative overflow-hidden group"
    >
      <div className="absolute right-0 top-0 w-64 h-64 bg-[#FF5722]/20 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2"></div>
      
      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-3">
            <span className="bg-[#FF5722] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full flex items-center gap-1.5">
              <Target size={12} /> Current Mission
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-heading mb-2">Build your AI Resume Analyzer Project</h2>
          <p className="text-[#94A3B8] text-sm md:text-base font-medium max-w-xl">
            You have completed the required backend modules. It is time to apply your skills and build a full-stack project for your portfolio.
          </p>
        </div>

        <div className="shrink-0 flex flex-col items-start md:items-end gap-4 w-full md:w-auto bg-white/5 backdrop-blur-sm p-5 rounded-2xl border border-white/10">
          <div className="flex items-center gap-6">
            <div className="flex flex-col text-left md:text-right">
              <span className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-wider flex items-center justify-start md:justify-end gap-1 mb-1">
                <Clock size={12} /> Estimated Time
              </span>
              <span className="text-base font-bold text-white">8 Hours</span>
            </div>
            <div className="w-px h-8 bg-white/10"></div>
            <div className="flex flex-col text-left md:text-right">
              <span className="text-[10px] font-bold text-[#F59E0B] uppercase tracking-wider flex items-center justify-start md:justify-end gap-1 mb-1">
                <Zap size={12} /> Reward
              </span>
              <span className="text-base font-bold text-[#F59E0B]">+500 XP</span>
            </div>
          </div>
          <button className="w-full md:w-auto flex items-center justify-center gap-2 bg-white text-[#0F172A] px-6 py-2.5 rounded-xl font-bold hover:bg-[#F1F5F9] transition-all group-hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]">
            Start Mission <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
