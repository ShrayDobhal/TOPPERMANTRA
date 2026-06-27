import { motion } from 'framer-motion';
import { Award, Zap, Code, Users, Calendar, Trophy, Medal, Star } from 'lucide-react';
import { cn } from '../../lib/utils';

export default function GamificationBoard() {
  const achievements = [
    { title: "First Steps", desc: "Profile Completed", icon: <Award size={20} />, bg: "bg-blue-500", achieved: true },
    { title: "On Fire", desc: "7 Day Streak", icon: <Zap size={20} />, bg: "bg-orange-500", achieved: true },
    { title: "Builder", desc: "First Project", icon: <Code size={20} />, bg: "bg-purple-500", achieved: false },
    { title: "Networker", desc: "10 Connections", icon: <Users size={20} />, bg: "bg-pink-500", achieved: false },
    { title: "Consistent", desc: "30 Day Streak", icon: <Calendar size={20} />, bg: "bg-emerald-500", achieved: false },
    { title: "Champion", desc: "Hackathon Win", icon: <Trophy size={20} />, bg: "bg-amber-500", achieved: false },
  ];

  const activities = [
    { text: "Completed AI Module 1", time: "2 hours ago", type: "learning" },
    { text: "Earned 'On Fire' Badge", time: "5 hours ago", type: "achievement" },
    { text: "Booked Mentor Session", time: "1 day ago", type: "networking" },
    { text: "Updated Profile", time: "2 days ago", type: "system" },
  ];

  return (
    <div className="space-y-6 h-full">
      
      {/* Achievements Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E9ECEF] shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold font-heading text-[#0F172A] flex items-center gap-2">
            <Medal size={24} className="text-[#FF5722]" />
            Achievements
          </h2>
          <span className="text-xs font-bold text-[#64748B] uppercase tracking-wider">2 / 12 Unlocked</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {achievements.map((achieve, idx) => (
            <motion.div 
              key={idx}
              whileHover={achieve.achieved ? { y: -2, scale: 1.02 } : {}}
              className={cn(
                "p-3 rounded-2xl border flex flex-col items-center text-center gap-2 transition-all",
                achieve.achieved 
                  ? "bg-white border-[#E9ECEF] shadow-sm cursor-pointer" 
                  : "bg-[#F8FAFC] border-transparent opacity-60 grayscale"
              )}
            >
              <div className={cn("w-10 h-10 rounded-full flex items-center justify-center text-white shadow-inner", achieve.bg)}>
                {achieve.icon}
              </div>
              <div>
                <p className="text-xs font-bold text-[#0F172A] leading-tight">{achieve.title}</p>
                <p className="text-[9px] font-semibold text-[#64748B] mt-0.5">{achieve.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
        <button className="w-full mt-4 py-2 text-xs font-bold text-[#FF5722] hover:bg-[#FF5722]/10 rounded-lg transition-colors">
          View All Badges
        </button>
      </div>

      {/* Activity Timeline Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E9ECEF] shadow-sm flex-1">
        <h2 className="text-xl font-bold font-heading text-[#0F172A] mb-6">Recent Activity</h2>
        <div className="space-y-5">
          {activities.map((act, idx) => (
            <div key={idx} className="flex gap-3 relative">
              {idx !== activities.length - 1 && (
                <div className="absolute left-2 top-6 bottom-[-20px] w-px bg-[#E9ECEF]"></div>
              )}
              <div className="w-4 h-4 rounded-full bg-[#F1F5F9] border-2 border-white ring-1 ring-[#E9ECEF] flex-shrink-0 mt-1 z-10" />
              <div>
                <p className="text-sm font-semibold text-[#0F172A]">{act.text}</p>
                <p className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-wider mt-0.5">{act.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
    </div>
  );
}
