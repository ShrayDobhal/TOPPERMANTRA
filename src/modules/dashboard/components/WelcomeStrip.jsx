import { MapPin, GraduationCap, Trophy, Target, ChevronRight } from 'lucide-react';

export default function WelcomeStrip({ profile }) {
  const getGreeting = () => {
    const h = new Date().getHours();
    if (h < 12) return 'Good Morning';
    if (h < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <div className="w-full bg-[#FFFFFF] border-b border-[#E9ECEF] pb-8 pt-4">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 flex flex-col md:flex-row md:items-end justify-between gap-8">
        
        {/* User Info */}
        <div className="flex items-center gap-6">
          <div className="relative group">
            <div className="absolute inset-0 bg-[#FF5722] rounded-full blur opacity-20 group-hover:opacity-40 transition-opacity"></div>
            <div className="relative w-20 h-20 rounded-full bg-[#FFFFFF] border border-[#E9ECEF] flex items-center justify-center overflow-hidden shadow-sm">
              <span className="text-3xl font-bold text-[#FF5722]">{profile.fullName.charAt(0)}</span>
            </div>
          </div>
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#000000] tracking-tight mb-2">
              {getGreeting()}, {profile.fullName.split(' ')[0]}
            </h1>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[#B0B0B0] font-medium text-sm">
              <span className="flex items-center gap-2">
                <GraduationCap size={16} className="text-[#FE6D4D]" />
                {profile.college}
              </span>
              <span className="flex items-center gap-2">
                <MapPin size={16} className="text-[#FE6D4D]" />
                {profile.branch} · {profile.year}
              </span>
            </div>
          </div>
        </div>

        {/* Dashboard Stats */}
        <div className="flex items-center gap-4">
          <div className="bg-[#FFFFFF] border border-[#E9ECEF] rounded-2xl p-4 pr-10 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#FFFFFF] border border-[#E9ECEF] flex items-center justify-center">
              <Trophy size={20} className="text-[#FF5722]" />
            </div>
            <div>
              <p className="text-xs font-bold text-[#B0B0B0] uppercase tracking-wider mb-1">Cohort Rank</p>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-[#000000]">#{profile.cohortRank}</span>
                <span className="text-xs font-bold text-[#FFFFFF] bg-[#FF5722] px-2 py-0.5 rounded-md">Top 5%</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
