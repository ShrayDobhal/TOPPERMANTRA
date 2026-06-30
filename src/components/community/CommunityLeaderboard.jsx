import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Medal, Star } from 'lucide-react';
import { mockLeaderboard } from '../../lib/mockCommunity';

export default function CommunityLeaderboard() {
  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden h-full flex flex-col relative">
      
      {/* Premium Gradient Background */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/10 rounded-full blur-[60px] pointer-events-none -translate-y-1/2 translate-x-1/4"></div>

      <div className="p-6 border-b border-slate-100 flex items-center justify-between shrink-0 relative z-10">
        <div>
          <h3 className="text-xl font-bold font-heading text-[#0F172A] flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-500" /> Top Contributors
          </h3>
          <p className="text-xs text-slate-500 mt-1">Weekly XP Leaderboard</p>
        </div>
      </div>
      
      <div className="p-4 flex-1 min-h-0 flex flex-col gap-2 overflow-y-auto custom-scrollbar relative z-10">
        {mockLeaderboard.map((user, i) => (
          <motion.div 
            key={user.rank}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className={`flex items-center gap-4 p-3 rounded-2xl transition-colors ${
              i === 0 ? 'bg-amber-50 border border-amber-200/50' : 'hover:bg-slate-50 border border-transparent'
            }`}
          >
            {/* Rank Number */}
            <div className={`w-6 flex justify-center font-black ${
              i === 0 ? 'text-amber-500 text-lg' : 
              i === 1 ? 'text-slate-400 text-base' : 
              i === 2 ? 'text-amber-700/50 text-base' : 'text-slate-300 text-sm'
            }`}>
              #{user.rank}
            </div>

            {/* Avatar */}
            <div className="relative">
              <img src={user.avatar} alt={user.name} className={`w-10 h-10 rounded-full object-cover ${i === 0 ? 'border-2 border-amber-400 p-0.5' : ''}`} />
              {i === 0 && (
                <div className="absolute -top-2 -right-2 bg-amber-500 text-white rounded-full p-1 shadow-sm">
                  <Star className="w-2.5 h-2.5 fill-white" />
                </div>
              )}
            </div>
            
            {/* Info */}
            <div className="flex-1 min-w-0">
              <h4 className={`font-bold truncate ${i === 0 ? 'text-amber-900' : 'text-[#0F172A]'}`}>
                {user.name}
              </h4>
              <div className="flex flex-wrap gap-1 mt-1">
                {user.badges.map((badge, idx) => (
                  <span key={idx} className="bg-slate-100 text-slate-600 text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded">
                    {badge}
                  </span>
                ))}
              </div>
            </div>

            {/* XP */}
            <div className="text-right shrink-0">
              <span className={`font-black tracking-tight ${i === 0 ? 'text-amber-600' : 'text-slate-700'}`}>
                {user.xp.toLocaleString()}
              </span>
              <span className="text-[10px] font-bold text-slate-400 block -mt-1 uppercase">XP</span>
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="p-4 bg-slate-50 border-t border-slate-100 text-center relative z-10 shrink-0">
        <button className="text-xs font-bold text-slate-500 hover:text-[#0F172A] transition-colors">
          View Full Leaderboard
        </button>
      </div>
    </div>
  );
}
