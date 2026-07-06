import { motion } from 'framer-motion';
import { Target, Star, Flame, Zap } from 'lucide-react';
import { ProgressRing } from '../ui/ProgressRing';
import { cn } from '../../lib/utils';

export default function JourneyHero({ profile }) {
  // Use profile data or default to generic values if missing
  const firstName = profile?.fullName ? profile.fullName.split(' ')[0] : 'Student';
  
  // Calculate dynamic stats based on XP or defaults for demonstration
  const baseProgress = Math.min(100, Math.max(0, (profile?.xp || 0) / 100));
  
  const stats = [
    { label: 'Journey Completion', value: Math.min(100, 10 + baseProgress), color: '#FF5722', secondary: '#FE6D4D', text: `${Math.min(100, Math.floor(10 + baseProgress))}%` },
    { label: 'Weekly Progress', value: Math.min(100, 40 + (baseProgress * 0.5)), color: '#3B82F6', secondary: '#60A5FA', text: `${Math.min(100, Math.floor(40 + (baseProgress * 0.5)))}%` },
    { label: 'Monthly Progress', value: Math.min(100, 25 + (baseProgress * 0.8)), color: '#A855F7', secondary: '#C084FC', text: `${Math.min(100, Math.floor(25 + (baseProgress * 0.8)))}%` },
    { label: 'Yearly Growth', value: Math.min(100, 30 + baseProgress), color: '#22C55E', secondary: '#4ADE80', text: `${Math.min(100, Math.floor(30 + baseProgress))}%` }
  ];

  return (
    <div className="bg-white rounded-[32px] p-6 sm:p-10 border border-[#E9ECEF] shadow-sm relative overflow-hidden group">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-[#FF5722]/5 via-[#A855F7]/5 to-[#3B82F6]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 group-hover:scale-105 transition-transform duration-1000"></div>
      
      <div className="relative z-10 flex flex-col xl:flex-row gap-10">
        
        {/* Left: Info */}
        <div className="flex-1">
          <h1 className="text-3xl sm:text-4xl font-extrabold font-heading text-[#0F172A] mb-8 tracking-tight">
            Good Morning, {firstName} 👋
          </h1>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-8">
            <div className="flex flex-col">
              <span className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider mb-2 flex items-center gap-1.5"><Target size={14} className="text-[#FF5722]" /> Current Goal</span>
              <span className="text-base font-bold text-[#0F172A] leading-tight">{profile?.careerGoal || 'Become an AI Engineer'}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider mb-2">Current Stage</span>
              <span className="text-base font-bold text-[#0F172A] leading-tight">Project Building</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider mb-2">Expected Completion</span>
              <span className="text-base font-bold text-[#0F172A] leading-tight">December 2027</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider mb-2">Current Level</span>
              <div className="flex items-center gap-1.5">
                <Star size={16} className="text-[#F59E0B] fill-[#F59E0B]" />
                <span className="text-base font-bold text-[#0F172A] leading-tight">{profile?.rank || 'Builder Level 1'}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <button className="bg-[#FF5722] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#E64A19] transition-all shadow-[0_4px_14px_0_rgba(255,87,34,0.39)] hover:shadow-[0_6px_20px_rgba(255,87,34,0.23)] hover:-translate-y-0.5">
              Continue Journey
            </button>
            <div className="flex items-center gap-4 bg-[#F8FAFC] px-5 py-2.5 rounded-xl border border-[#E9ECEF]">
              <div className="flex items-center gap-2">
                <Flame size={18} className="text-[#EF4444] fill-[#EF4444]" />
                <div>
                  <p className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-wider">Career Health</p>
                  <p className="text-sm font-bold text-[#0F172A]">{Math.min(100, 70 + (baseProgress * 0.5)).toFixed(0)}%</p>
                </div>
              </div>
              <div className="w-px h-8 bg-[#E9ECEF]"></div>
              <div className="flex items-center gap-2">
                <Zap size={18} className="text-[#A855F7] fill-[#A855F7]" />
                <div>
                  <p className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-wider">Total XP</p>
                  <p className="text-sm font-bold text-[#0F172A]">{profile?.xp || 0} XP</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Progress Rings */}
        <div className="shrink-0 flex items-center justify-center gap-6 flex-wrap">
          {stats.map((stat, i) => (
            <div key={i} className="flex flex-col items-center gap-3">
              <ProgressRing progress={stat.value} size={80} strokeWidth={8} primaryColor={stat.color} secondaryColor={stat.secondary}>
                <span className="text-lg font-extrabold text-[#0F172A]">{stat.text}</span>
              </ProgressRing>
              <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider text-center w-20 leading-tight">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
        
      </div>
    </div>
  );
}
