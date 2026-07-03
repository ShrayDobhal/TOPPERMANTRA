import { motion } from 'framer-motion';
import { Flame } from 'lucide-react';

export default function StreakCounter({ streak, longestStreak = 34 }) {
  const milestones = [7, 14, 21, 30, 60, 100];
  const nextMilestone = milestones.find(m => m > streak) || 100;
  const prevMilestone = milestones.filter(m => m <= streak).pop() || 0;
  const progress = ((streak - prevMilestone) / (nextMilestone - prevMilestone)) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.15 }}
      className="bg-white rounded-[28px] p-6 sm:p-8 border border-[#E9ECEF] shadow-sm relative overflow-hidden group"
    >
      {/* Subtle warm glow */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-[#FF5722]/5 blur-[50px] rounded-full translate-x-1/4 -translate-y-1/4 group-hover:bg-[#FF5722]/10 transition-colors duration-500" />
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#94A3B8]">
              Daily Streak
            </span>
          </div>
          <span className="text-[10px] font-bold text-[#64748B] bg-[#F1F5F9] px-2 py-1 rounded-md">
            Best: {longestStreak} days
          </span>
        </div>

        <div className="flex items-center gap-4 mb-5">
          {/* Flame with pulse */}
          <motion.div
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="relative"
          >
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#FF5722] to-[#FF9800] flex items-center justify-center shadow-[0_4px_20px_rgba(255,87,34,0.35)]">
              <Flame size={28} className="text-white fill-white" />
            </div>
            {/* Fire glow ring */}
            <div className="absolute inset-0 rounded-2xl border-2 border-[#FF5722]/30 animate-ping" style={{ animationDuration: '2s' }} />
          </motion.div>

          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-4xl font-extrabold font-heading text-[#0F172A] tracking-tight">
                {streak}
              </span>
              <span className="text-lg font-bold text-[#64748B]">days</span>
            </div>
            <p className="text-xs font-semibold text-[#22C55E] mt-0.5">
              {streak >= 21 ? 'Unstoppable! Keep the fire burning.' : 'Log in and perform an action daily.'}
            </p>
          </div>
        </div>

        {/* Progress to next milestone */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-wider">
              Next milestone: {nextMilestone} days
            </span>
            <span className="text-[10px] font-bold text-[#FF5722]">
              {nextMilestone - streak} days to go
            </span>
          </div>
          <div className="h-2.5 bg-[#F1F5F9] rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(progress, 100)}%` }}
              transition={{ duration: 1, delay: 0.4, ease: 'easeOut' }}
              className="h-full bg-gradient-to-r from-[#FF5722] to-[#F59E0B] rounded-full"
            />
          </div>
        </div>

        {/* Mini milestone dots */}
        <div className="flex items-center justify-between mt-3 px-1">
          {milestones.slice(0, 5).map(m => (
            <div key={m} className="flex flex-col items-center gap-1">
              <div className={`w-2.5 h-2.5 rounded-full ${streak >= m ? 'bg-[#FF5722]' : 'bg-[#E2E8F0]'} transition-colors`} />
              <span className={`text-[9px] font-bold ${streak >= m ? 'text-[#FF5722]' : 'text-[#CBD5E1]'}`}>{m}d</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
