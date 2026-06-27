import { motion } from 'framer-motion';
import { Play, Clock, ArrowRight } from 'lucide-react';

export default function NextActionBanner() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1, duration: 0.5 }}
      className="w-full bg-gradient-to-r from-[#FF5722] to-[#FE6D4D] rounded-3xl p-[2px] shadow-lg shadow-[#FF5722]/20"
    >
      <div className="bg-white rounded-[22px] p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-[#FF5722]/10 rounded-full flex items-center justify-center shrink-0">
            <Play className="text-[#FF5722] fill-[#FF5722] ml-1" size={20} />
          </div>
          <div>
            <p className="text-xs font-bold text-[#FF5722] uppercase tracking-wider mb-1">Your Next Best Action</p>
            <h3 className="text-lg font-bold text-[#0F172A]">Complete JavaScript Fundamentals</h3>
            <div className="flex items-center gap-2 mt-1 text-[#64748B] text-xs font-medium">
              <Clock size={14} />
              <span>Estimated Time: 3 Hours</span>
            </div>
          </div>
        </div>
        
        <button className="py-3 px-6 bg-[#0F172A] hover:bg-[#1E293B] text-white text-sm font-bold rounded-xl shadow-lg shadow-[#0F172A]/20 transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2 shrink-0">
          Start Learning <ArrowRight size={16} />
        </button>
      </div>
    </motion.div>
  );
}
