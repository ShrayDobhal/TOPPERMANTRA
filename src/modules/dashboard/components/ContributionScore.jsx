import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Zap } from 'lucide-react';

export default function ContributionScore({ score, todayGain = 85 }) {
  const [displayScore, setDisplayScore] = useState(0);

  // Animated counter on mount
  useEffect(() => {
    const duration = 1200;
    const steps = 40;
    const increment = score / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= score) {
        setDisplayScore(score);
        clearInterval(timer);
      } else {
        setDisplayScore(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [score]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="relative bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] rounded-[28px] p-6 sm:p-8 text-white overflow-hidden group"
    >
      {/* Glow effects */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF5722]/20 blur-[80px] rounded-full translate-x-1/3 -translate-y-1/3 group-hover:bg-[#FF5722]/30 transition-colors duration-700" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#A855F7]/15 blur-[60px] rounded-full -translate-x-1/3 translate-y-1/3" />
      
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-lg bg-[#FF5722]/20 flex items-center justify-center">
            <Zap size={18} className="text-[#FF5722]" />
          </div>
          <span className="text-xs font-bold uppercase tracking-widest text-[#94A3B8]">
            Contribution Score
          </span>
        </div>

        <div className="flex items-end gap-4 mb-4">
          <span className="text-5xl sm:text-6xl font-extrabold font-heading tracking-tighter leading-none">
            {displayScore.toLocaleString()}
          </span>
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.3 }}
            className="flex items-center gap-1 bg-[#22C55E]/20 text-[#4ADE80] px-3 py-1.5 rounded-full text-sm font-bold mb-2"
          >
            <TrendingUp size={14} />
            +{todayGain} today
          </motion.div>
        </div>

        {/* Mini progress to next level */}
        <div className="flex items-center gap-3">
          <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(score / 3000) * 100}%` }}
              transition={{ duration: 1.5, delay: 0.3, ease: 'easeOut' }}
              className="h-full bg-gradient-to-r from-[#FF5722] to-[#F59E0B] rounded-full"
            />
          </div>
          <span className="text-xs font-bold text-[#64748B] whitespace-nowrap">
            {score} / 3,000 to Level 9
          </span>
        </div>
      </div>
    </motion.div>
  );
}
