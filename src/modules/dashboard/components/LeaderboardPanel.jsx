import { motion } from 'framer-motion';
import { Trophy, ChevronRight, Crown, ArrowRight, TrendingUp } from 'lucide-react';
import { cn } from '../../../lib/utils';

const medalColors = {
  1: { bg: 'bg-gradient-to-br from-[#F59E0B] to-[#D97706]', text: 'text-[#F59E0B]', ring: 'ring-[#F59E0B]/20' },
  2: { bg: 'bg-gradient-to-br from-[#94A3B8] to-[#64748B]', text: 'text-[#94A3B8]', ring: 'ring-[#94A3B8]/20' },
  3: { bg: 'bg-gradient-to-br from-[#B45309] to-[#92400E]', text: 'text-[#B45309]', ring: 'ring-[#B45309]/20' },
};

export default function LeaderboardPanel({ leaderboard, userRank }) {
  const topThree = leaderboard.filter(l => l.rank <= 3);
  const rest = leaderboard.filter(l => l.rank > 3);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="bg-white rounded-[28px] p-6 border border-[#E9ECEF] shadow-sm"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#F59E0B]/10 flex items-center justify-center">
            <Trophy size={18} className="text-[#F59E0B]" />
          </div>
          <h3 className="text-lg font-bold font-heading text-[#0F172A]">Leaderboard</h3>
        </div>
        <span className="text-[10px] font-bold text-[#FF5722] bg-[#FF5722]/10 px-2 py-1 rounded-md uppercase tracking-wider">
          Top {Math.round((userRank / leaderboard.length) * 100)}%
        </span>
      </div>

      {/* Top 3 Podium */}
      <div className="flex items-end justify-center gap-3 mb-6 px-2">
        {[topThree[1], topThree[0], topThree[2]].filter(Boolean).map((user) => {
          const medal = medalColors[user.rank];
          const isFirst = user.rank === 1;
          return (
            <div key={user.rank} className={cn("flex flex-col items-center", isFirst ? "order-2" : user.rank === 2 ? "order-1" : "order-3")}>
              <div className={cn(
                "w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg ring-4",
                medal.bg, medal.ring,
                isFirst && "w-14 h-14"
              )}>
                {user.name.charAt(0)}
              </div>
              {isFirst && <Crown size={14} className="text-[#F59E0B] -mt-1" />}
              <p className="text-xs font-bold text-[#0F172A] mt-1.5 text-center">{user.name.split(' ')[0]}</p>
              <p className="text-[10px] font-bold text-[#64748B]">{user.contributionScore.toLocaleString()}</p>
            </div>
          );
        })}
      </div>

      {/* Rest of leaderboard */}
      <div className="space-y-1.5">
        {rest.map((user) => (
          <div key={user.rank} className={cn(
            "flex items-center justify-between p-3 rounded-xl transition-all cursor-pointer",
            user.isCurrentUser
              ? "bg-[#FF5722]/5 border border-[#FF5722]/20 shadow-sm"
              : "hover:bg-[#F8FAFC] border border-transparent"
          )}>
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-[#94A3B8] w-6 text-right">#{user.rank}</span>
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold",
                user.isCurrentUser ? "bg-gradient-to-br from-[#FF5722] to-[#FF9800]" : "bg-gradient-to-br from-[#3B82F6] to-[#8B5CF6]"
              )}>
                {user.name.charAt(0)}
              </div>
              <div>
                <p className={cn("text-sm font-bold", user.isCurrentUser ? "text-[#FF5722]" : "text-[#0F172A]")}>
                  {user.isCurrentUser ? 'You' : user.name}
                </p>
                <p className="text-[10px] text-[#94A3B8] font-semibold">{user.college}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-bold text-[#0F172A]">{user.contributionScore.toLocaleString()}</p>
              <p className="text-[10px] text-[#64748B] font-semibold flex items-center gap-0.5 justify-end">
                <TrendingUp size={10} /> {user.streak}d streak
              </p>
            </div>
          </div>
        ))}
      </div>

      <button className="w-full mt-4 py-2.5 border border-[#E9ECEF] rounded-xl text-xs font-bold text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#0F172A] transition-colors flex items-center justify-center gap-1">
        View Full Rankings <ArrowRight size={14} />
      </button>
    </motion.div>
  );
}
