import { motion } from 'framer-motion';
import { Target, Star, Flame, Trophy } from 'lucide-react';
import { cn } from '../../lib/utils';

export default function JourneyHero({ profile }) {
  const stats = [
    { label: "Current Goal", value: profile?.careerGoal || "AI Engineer", icon: <Target size={18} className="text-[#3B82F6]" />, bg: "bg-blue-50" },
    { label: "Stage", value: "Foundation", icon: <Compass size={18} className="text-[#8B5CF6]" />, bg: "bg-purple-50" },
    { label: "Level", value: `Builder Lvl ${profile?.level || 8}`, icon: <Star size={18} className="text-[#F59E0B]" />, bg: "bg-amber-50" },
    { label: "XP", value: `${profile?.xp || 2450} XP`, icon: <Trophy size={18} className="text-[#10B981]" />, bg: "bg-emerald-50" },
    { label: "Streak", value: `${profile?.streak || 21} Days`, icon: <Flame size={18} className="text-[#EF4444]" />, bg: "bg-red-50" },
  ];

  return (
    <div className="w-full bg-white border border-[#E9ECEF] rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-sm">
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF5722]/5 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2" />
      
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-[#0F172A] mb-2">
            Good Morning, {profile?.fullName?.split(' ')[0] || 'Shray'} 👋
          </h1>
          <p className="text-[#64748B] text-sm">Here's your personalized path to becoming an {profile?.careerGoal || 'AI Engineer'}.</p>
        </div>
        
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-3 bg-[#F8FAFC] px-4 py-2.5 rounded-xl border border-[#E9ECEF]">
            <div className="w-8 h-8 rounded-full bg-[#FF5722]/10 flex items-center justify-center">
              <Target size={16} className="text-[#FF5722]" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Completion</p>
              <p className="text-sm font-bold text-[#0F172A]">22%</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 bg-[#F8FAFC] px-4 py-2.5 rounded-xl border border-[#E9ECEF]">
            <div className="w-8 h-8 rounded-full bg-[#3B82F6]/10 flex items-center justify-center">
              <Clock size={16} className="text-[#3B82F6]" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Estimated Time</p>
              <p className="text-sm font-bold text-[#0F172A]">8 Months</p>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mt-8 pt-8 border-t border-[#E9ECEF]">
        {stats.map((stat, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1, duration: 0.4 }}
            className="flex flex-col gap-2"
          >
            <div className="flex items-center gap-2">
              <div className={cn("w-6 h-6 rounded flex items-center justify-center", stat.bg)}>
                {stat.icon}
              </div>
              <span className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-wider">{stat.label}</span>
            </div>
            <span className="text-base sm:text-lg font-bold text-[#0F172A]">{stat.value}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// Need to import Compass and Clock since they are used in the component
import { Compass, Clock } from 'lucide-react';
