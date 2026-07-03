import React from 'react';
import { Activity } from 'lucide-react';
import useGamificationStore from '../../../store/useGamificationStore';
import { cn } from '../../../lib/utils';

export default function ContributionGraph() {
  const history = useGamificationStore((s) => s.contributionHistory);
  
  // Fake graph for demo (365 days / 52 weeks)
  const weeks = 52;
  const daysPerWeek = 7;
  
  const getColor = (score) => {
    if (score === 0) return 'bg-[#F1F5F9]'; // Light slate
    if (score < 30) return 'bg-[#DBEAFE]'; // Light blue
    if (score < 60) return 'bg-[#93C5FD]'; // Med blue
    if (score < 90) return 'bg-[#3B82F6]'; // Dark blue
    return 'bg-[#1E40AF]'; // Very dark blue
  };

  return (
    <div className="bg-white rounded-3xl border border-[#E9ECEF] p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-extrabold text-[#0F172A] flex items-center gap-2">
          <Activity size={20} className="text-[#F43F5E]" /> Activity Heatmap
        </h3>
        <span className="text-sm font-bold text-[#64748B]">Last 365 Days</span>
      </div>

      <div className="overflow-x-auto custom-scrollbar pb-4">
        <div className="inline-flex gap-1">
          {Array.from({ length: weeks }).map((_, weekIndex) => (
            <div key={weekIndex} className="flex flex-col gap-1">
              {Array.from({ length: daysPerWeek }).map((_, dayIndex) => {
                // Determine if this cell is filled using our mock history or randomly
                const isRecent = weekIndex >= 48; // Last 4 weeks
                let score = 0;
                
                if (isRecent) {
                   // Mock real data for the end
                   const index = (weekIndex - 48) * 7 + dayIndex;
                   if (index < history.length) {
                     score = history[index].score;
                   }
                } else {
                   // Sprinkle some random activity
                   if (Math.random() > 0.7) {
                     score = Math.floor(Math.random() * 100);
                   }
                }

                return (
                  <div 
                    key={dayIndex} 
                    className={cn("w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-[3px] transition-colors hover:ring-2 hover:ring-[#FF5722]", getColor(score))}
                    title={score > 0 ? `${score} XP` : 'No activity'}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex items-center justify-end gap-2 mt-2 text-[10px] font-bold text-[#64748B] uppercase tracking-wider">
        <span>Less</span>
        <div className="flex gap-1">
          <div className="w-3 h-3 rounded-[2px] bg-[#F1F5F9]"></div>
          <div className="w-3 h-3 rounded-[2px] bg-[#DBEAFE]"></div>
          <div className="w-3 h-3 rounded-[2px] bg-[#93C5FD]"></div>
          <div className="w-3 h-3 rounded-[2px] bg-[#3B82F6]"></div>
          <div className="w-3 h-3 rounded-[2px] bg-[#1E40AF]"></div>
        </div>
        <span>More</span>
      </div>
    </div>
  );
}
