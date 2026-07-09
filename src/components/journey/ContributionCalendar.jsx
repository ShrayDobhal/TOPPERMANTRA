import { motion } from 'framer-motion';
import { Flame, Trophy } from 'lucide-react';
import { cn } from '../../lib/utils';
import useStudentStore from '../../store/useStudentStore';

export default function ContributionCalendar() {
  const profile = useStudentStore(s => s.profile);
  const streak = profile?.streak || 0;

  // Generate data for last 90 days (13 weeks)
  const weeks = 13;
  const daysPerWeek = 7;
  const totalDays = weeks * daysPerWeek;
  
  const calendar = Array.from({ length: weeks }, (_, w) => 
    Array.from({ length: daysPerWeek }, (_, d) => {
      // Calculate how many days ago this block represents (0 = today, from right to left, bottom to top)
      const dayIndex = (weeks - 1 - w) * daysPerWeek + (daysPerWeek - 1 - d);
      
      // If the day index is less than the current streak, it should be lit up!
      const isActive = dayIndex < streak;
      // Active streak days get constant high visibility; others get a rare low-intensity dot for aesthetic variety
      const intensity = isActive ? 3 : (Math.random() > 0.94 ? 1 : 0);
      
      return { intensity };
    })
  );

  const getIntensityColor = (intensity) => {
    switch (intensity) {
      case 4: return 'bg-[#FF5722]'; // High
      case 3: return 'bg-[#FE6D4D]'; // Med-High
      case 2: return 'bg-[#FF9E87]'; // Med
      case 1: return 'bg-[#FFCCBD]'; // Low
      default: return 'bg-[#F1F5F9]'; // None
    }
  };

  return (
    <div className="bg-white rounded-[32px] p-6 border border-[#E9ECEF] shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold font-heading text-[#0F172A]">Activity</h3>
        <div className="flex gap-4">
          <div className="flex items-center gap-1.5">
            <Flame size={16} className={streak > 0 ? "text-[#EF4444] fill-[#EF4444]" : "text-gray-300"} />
            <span className="text-sm font-bold text-[#0F172A]">{streak} Day Streak</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col">
        {/* Calendar Grid */}
        <div className="flex gap-1 overflow-x-auto pb-2 custom-scrollbar">
          {calendar.map((week, w) => (
            <div key={w} className="flex flex-col gap-1">
              {week.map((day, d) => (
                <div 
                  key={`${w}-${d}`} 
                  className={cn("w-3 h-3 rounded-sm transition-colors cursor-pointer hover:ring-2 hover:ring-offset-1 hover:ring-[#FF5722]/50", getIntensityColor(day.intensity))}
                  title={`${day.intensity} contributions`}
                />
              ))}
            </div>
          ))}
        </div>
        
        {/* Legend */}
        <div className="flex items-center justify-between mt-4 text-[10px] font-bold text-[#94A3B8] uppercase tracking-wider">
          <span>Less</span>
          <div className="flex gap-1 mx-2">
            {[0, 1, 2, 3, 4].map(i => (
              <div key={i} className={cn("w-3 h-3 rounded-sm", getIntensityColor(i))} />
            ))}
          </div>
          <span>More</span>
        </div>
      </div>
    </div>
  );
}
