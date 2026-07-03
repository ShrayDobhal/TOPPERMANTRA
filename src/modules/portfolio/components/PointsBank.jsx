import React from 'react';
import { Trophy, Flame, Target } from 'lucide-react';
import useStudentStore from '../../../store/useStudentStore';

export default function PointsBank() {
  const profile = useStudentStore((s) => s.profile);

  return (
    <div className="bg-gradient-to-br from-[#0F172A] to-[#1E293B] rounded-3xl p-6 md:p-8 text-white relative overflow-hidden shadow-lg border border-[#334155]">
      {/* Decorative background elements */}
      <div className="absolute right-0 top-0 w-64 h-64 bg-[#3B82F6]/20 blur-[80px] rounded-full translate-x-1/3 -translate-y-1/3" />
      <div className="absolute left-0 bottom-0 w-48 h-48 bg-[#FF5722]/10 blur-[60px] rounded-full -translate-x-1/2 translate-y-1/2" />
      
      <div className="relative z-10">
        <h3 className="text-sm font-bold text-[#94A3B8] uppercase tracking-wider mb-6 flex items-center gap-2">
          <Trophy size={16} className="text-[#F59E0B]" /> Points Bank
        </h3>
        
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
          <div className="text-center md:text-left w-full md:w-auto">
            <p className="text-6xl md:text-7xl font-extrabold font-heading text-transparent bg-clip-text bg-gradient-to-r from-[#FF5722] to-[#F59E0B] mb-2">
              {profile?.contributionScore?.toLocaleString() || "2,480"}
            </p>
            <p className="text-sm font-bold text-[#94A3B8]">Total Contribution Score</p>
          </div>
          
          <div className="flex-1 w-full flex items-center justify-between md:justify-end gap-6 md:gap-10">
            <div className="text-center">
              <div className="w-12 h-12 bg-white/5 rounded-xl border border-white/10 flex items-center justify-center mb-2 mx-auto">
                <Flame size={24} className="text-[#F59E0B]" />
              </div>
              <p className="text-xl font-bold">{profile?.streak || 21}</p>
              <p className="text-xs text-[#64748B] font-semibold">Day Streak</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-white/5 rounded-xl border border-white/10 flex items-center justify-center mb-2 mx-auto">
                <Target size={24} className="text-[#3B82F6]" />
              </div>
              <p className="text-xl font-bold">#{profile?.rank || 14}</p>
              <p className="text-xs text-[#64748B] font-semibold">Global Rank</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
