import { Trophy, Star, Zap, Activity } from 'lucide-react';
import { Avatar } from '../../../components/ui/Avatar';

const leaderboard = [
  { name: 'Alex Kumar', avatar: 'Alex', xp: 4520, role: 'Top Contributor', rank: 1 },
  { name: 'Sarah Chen', avatar: 'Sarah', xp: 3890, role: 'Top Builder', rank: 2 },
  { name: 'Rahul Dev', avatar: 'Rahul', xp: 3100, role: 'Top Helper', rank: 3 },
  { name: 'Priya Sharma', avatar: 'Priya', xp: 2840, role: 'Active', rank: 4 },
  { name: 'Shray Dobhal', avatar: 'Shray', xp: 2100, role: 'Active', rank: 5 },
];

export default function SpaceLeaderboard() {
  return (
    <div className="flex flex-col h-full bg-[#F8FAFC]">
      
      {/* Header */}
      <div className="p-6 border-b border-[#E9ECEF] flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0 bg-white shadow-sm z-10">
        <div>
          <h2 className="text-xl font-extrabold text-[#0F172A] flex items-center gap-2 mb-1">
            <Trophy className="text-[#F59E0B]" size={24} /> Space Leaderboard
          </h2>
          <p className="text-sm font-semibold text-[#64748B]">Top contributors this month.</p>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
        <div className="max-w-4xl mx-auto space-y-8">
          
          {/* Top 3 Podium */}
          <div className="flex items-end justify-center gap-4 sm:gap-8 pt-8 pb-4">
            {/* Rank 2 */}
            <div className="flex flex-col items-center">
              <div className="relative mb-3">
                <Avatar size="lg" src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${leaderboard[1].avatar}`} />
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-6 h-6 bg-[#94A3B8] text-white rounded-full flex items-center justify-center text-xs font-bold border-2 border-white shadow-sm">2</div>
              </div>
              <h3 className="text-sm font-bold text-[#0F172A]">{leaderboard[1].name}</h3>
              <p className="text-xs font-bold text-[#F59E0B] flex items-center gap-1"><Zap size={10} className="fill-current" /> {leaderboard[1].xp}</p>
              <div className="w-24 sm:w-32 h-24 bg-gradient-to-t from-[#E2E8F0] to-transparent mt-4 rounded-t-xl opacity-50"></div>
            </div>
            
            {/* Rank 1 */}
            <div className="flex flex-col items-center">
              <div className="relative mb-3">
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[#F59E0B]">
                  <Star size={24} className="fill-current" />
                </div>
                <div className="w-20 h-20 rounded-full border-4 border-[#F59E0B] p-1">
                  <Avatar size="full" src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${leaderboard[0].avatar}`} />
                </div>
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-6 h-6 bg-[#F59E0B] text-white rounded-full flex items-center justify-center text-xs font-bold border-2 border-white shadow-sm">1</div>
              </div>
              <h3 className="text-base font-extrabold text-[#0F172A]">{leaderboard[0].name}</h3>
              <p className="text-sm font-bold text-[#F59E0B] flex items-center gap-1"><Zap size={12} className="fill-current" /> {leaderboard[0].xp}</p>
              <div className="w-24 sm:w-32 h-32 bg-gradient-to-t from-[#F59E0B]/20 to-transparent mt-4 rounded-t-xl"></div>
            </div>

            {/* Rank 3 */}
            <div className="flex flex-col items-center">
              <div className="relative mb-3">
                <Avatar size="lg" src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${leaderboard[2].avatar}`} />
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-6 h-6 bg-[#B45309] text-white rounded-full flex items-center justify-center text-xs font-bold border-2 border-white shadow-sm">3</div>
              </div>
              <h3 className="text-sm font-bold text-[#0F172A]">{leaderboard[2].name}</h3>
              <p className="text-xs font-bold text-[#F59E0B] flex items-center gap-1"><Zap size={10} className="fill-current" /> {leaderboard[2].xp}</p>
              <div className="w-24 sm:w-32 h-16 bg-gradient-to-t from-[#E2E8F0] to-transparent mt-4 rounded-t-xl opacity-50"></div>
            </div>
          </div>

          {/* List */}
          <div className="bg-white border border-[#E9ECEF] rounded-2xl overflow-hidden shadow-sm">
            <div className="divide-y divide-[#E9ECEF]">
              {leaderboard.slice(3).map((user) => (
                <div key={user.rank} className="p-4 sm:p-5 flex items-center justify-between gap-4 hover:bg-[#F8FAFC] transition-colors">
                  <div className="flex items-center gap-4">
                    <span className="w-6 text-center text-sm font-bold text-[#94A3B8]">{user.rank}</span>
                    <Avatar size="sm" src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.avatar}`} />
                    <div>
                      <h3 className="text-sm font-bold text-[#0F172A]">{user.name}</h3>
                      <p className="text-[10px] font-semibold text-[#64748B] uppercase tracking-wider">{user.role}</p>
                    </div>
                  </div>
                  <div className="text-sm font-extrabold text-[#0F172A] flex items-center gap-1.5 bg-[#F8FAFC] px-3 py-1.5 rounded-xl border border-[#E9ECEF]">
                    <Zap size={14} className="text-[#F59E0B] fill-[#F59E0B]" /> {user.xp}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
        </div>
      </div>

    </div>
  );
}
