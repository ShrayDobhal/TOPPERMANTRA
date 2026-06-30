import { motion } from 'framer-motion';
import { Flame, Trophy } from 'lucide-react';
import { cn } from '../../lib/utils';

export default function ContributionCalendar() {
  // Generate random data for last 90 days (13 weeks)
  const weeks = 13;
  const daysPerWeek = 7;
  const calendar = Array.from({ length: weeks }, (_, w) => 
    Array.from({ length: daysPerWeek }, (_, d) => {
      // Create some realistic looking gaps and active periods
      const isActive = Math.random() > 0.4; 
      const intensity = isActive ? Math.floor(Math.random() * 4) + 1 : 0;
      // Force the last few days to be active for streak
      if (w === weeks - 1 && d > 3) return { intensity: 3 };
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
            <Flame size={16} className="text-[#EF4444] fill-[#EF4444]" />
            <span className="text-sm font-bold text-[#0F172A]">21 Day Streak</span>
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
