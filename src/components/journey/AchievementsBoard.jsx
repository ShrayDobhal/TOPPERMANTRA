import { motion } from 'framer-motion';
import { Award, Briefcase, Zap, Medal } from 'lucide-react';

const badges = [
  { title: 'First Project', type: 'project', icon: <Briefcase size={20} />, color: 'from-[#3B82F6] to-[#60A5FA]', border: 'border-[#3B82F6]/30', text: 'text-[#3B82F6]' },
  { title: 'Top Builder', type: 'community', icon: <Medal size={20} />, color: 'from-[#F59E0B] to-[#FCD34D]', border: 'border-[#F59E0B]/30', text: 'text-[#F59E0B]' },
  { title: '1000 XP', type: 'milestone', icon: <Zap size={20} />, color: 'from-[#A855F7] to-[#C084FC]', border: 'border-[#A855F7]/30', text: 'text-[#A855F7]' },
  { title: 'Hackathon', type: 'event', icon: <Award size={20} />, color: 'from-[#EC4899] to-[#F472B6]', border: 'border-[#EC4899]/30', text: 'text-[#EC4899]' }
];

export default function AchievementsBoard() {
  return (
    <div className="bg-white rounded-[32px] p-6 border border-[#E9ECEF] shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold font-heading text-[#0F172A]">Achievements</h3>
        <span className="text-xs font-bold text-[#FF5722] cursor-pointer hover:underline">View All</span>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        {badges.map((badge, i) => (
          <motion.div 
            whileHover={{ y: -2 }}
            key={i} 
            className={`flex flex-col items-center justify-center p-4 rounded-2xl border ${badge.border} bg-white shadow-sm hover:shadow-md transition-all cursor-pointer`}
          >
            <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${badge.color} flex items-center justify-center text-white mb-3 shadow-inner`}>
              {badge.icon}
            </div>
            <span className="text-xs font-bold text-[#0F172A] text-center leading-tight mb-1">{badge.title}</span>
            <span className={`text-[9px] font-bold uppercase tracking-wider ${badge.text}`}>{badge.type}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
