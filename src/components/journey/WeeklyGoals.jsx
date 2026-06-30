import { motion } from 'framer-motion';
import { Target, CheckCircle2 } from 'lucide-react';
import { cn } from '../../lib/utils';

const goals = [
  { text: 'Complete 3 Project Tasks', current: 2, target: 3 },
  { text: 'Apply to 2 Opportunities', current: 1, target: 2 },
  { text: 'Attend 1 Mentor Session', current: 1, target: 1 },
  { text: 'Join 2 Community Discussions', current: 0, target: 2 },
];

export default function WeeklyGoals() {
  return (
    <div className="bg-white rounded-[32px] p-6 border border-[#E9ECEF] shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold font-heading text-[#0F172A] flex items-center gap-2">
          <Target size={20} className="text-[#FF5722]" /> Weekly Goals
        </h3>
        <span className="text-xs font-bold text-[#FF5722] bg-[#FF5722]/10 px-2 py-1 rounded-md">2 Days Left</span>
      </div>
      
      <div className="space-y-4">
        {goals.map((goal, i) => {
          const progress = (goal.current / goal.target) * 100;
          const isComplete = goal.current >= goal.target;
          
          return (
            <div key={i} className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <span className={cn(
                  "text-sm font-bold",
                  isComplete ? "text-[#94A3B8] line-through" : "text-[#0F172A]"
                )}>{goal.text}</span>
                <span className="text-xs font-bold text-[#64748B]">{goal.current}/{goal.target}</span>
              </div>
              <div className="h-1.5 w-full bg-[#F1F5F9] rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: `${progress}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: "easeOut", delay: i * 0.1 }}
                  className={cn(
                    "h-full rounded-full transition-colors",
                    isComplete ? "bg-[#22C55E]" : "bg-[#FF5722]"
                  )}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
