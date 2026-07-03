import React from 'react';
import { Award, Lock } from 'lucide-react';
import useGamificationStore from '../../../store/useGamificationStore';
import { cn } from '../../../lib/utils';

export default function BadgeShowcase() {
  const getEarnedBadgeDetails = useGamificationStore((s) => s.getEarnedBadgeDetails);
  const getUnearnedBadges = useGamificationStore((s) => s.getUnearnedBadges);

  const earnedBadges = getEarnedBadgeDetails();
  const unearnedBadges = getUnearnedBadges();

  return (
    <div className="bg-white rounded-3xl border border-[#E9ECEF] p-6 shadow-sm">
      <h3 className="text-lg font-extrabold text-[#0F172A] mb-6 flex items-center gap-2">
        <Award size={20} className="text-[#3B82F6]" /> Badge Showcase
      </h3>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {/* Earned Badges */}
        {earnedBadges.map((badge) => (
          <div key={badge.id} className="relative group cursor-pointer">
            <div className={cn(
              "absolute inset-0 bg-gradient-to-br opacity-20 blur-xl group-hover:opacity-40 transition-opacity rounded-full",
              badge.color
            )}></div>
            <div className={cn(
              "relative bg-white border border-[#E9ECEF] rounded-2xl p-4 flex flex-col items-center justify-center text-center shadow-sm group-hover:border-[#3B82F6]/30 group-hover:shadow-md transition-all h-full"
            )}>
              <span className="text-4xl mb-3 block transform group-hover:scale-110 transition-transform">{badge.icon}</span>
              <h4 className="text-xs font-bold text-[#0F172A] mb-1">{badge.name}</h4>
              <p className="text-[9px] font-semibold text-[#64748B] mb-2">{badge.description}</p>
              <div className="mt-auto pt-2 border-t border-[#E9ECEF] w-full">
                <p className="text-[8px] font-bold text-[#3B82F6] uppercase tracking-widest">
                  Earned {new Date(badge.earnedAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        ))}

        {/* Unearned Badges (Locked) */}
        {unearnedBadges.map((badge) => (
          <div key={badge.id} className="relative group cursor-not-allowed opacity-60 hover:opacity-100 transition-opacity">
            <div className="bg-[#F8FAFC] border border-[#E9ECEF] border-dashed rounded-2xl p-4 flex flex-col items-center justify-center text-center h-full">
              <div className="relative mb-3">
                <span className="text-4xl block grayscale opacity-50">{badge.icon}</span>
                <div className="absolute -bottom-1 -right-1 bg-[#64748B] text-white p-1 rounded-full border-2 border-[#F8FAFC]">
                  <Lock size={10} />
                </div>
              </div>
              <h4 className="text-xs font-bold text-[#64748B] mb-1">{badge.name}</h4>
              <p className="text-[9px] font-medium text-[#94A3B8]">{badge.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
