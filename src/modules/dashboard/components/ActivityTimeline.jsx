import { motion } from 'framer-motion';
import { Activity, Briefcase, Users, MessageSquare, Award, GitMerge, Send } from 'lucide-react';
import { cn } from '../../../lib/utils';

const activityIcons = {
  submission: <Send size={14} />,
  cohort: <Users size={14} />,
  community: <MessageSquare size={14} />,
  project: <Briefcase size={14} />,
  badge: <Award size={14} />,
  merge: <GitMerge size={14} />,
};

const activityColors = {
  submission: 'bg-[#3B82F6]/10 text-[#3B82F6] group-hover:bg-[#3B82F6]',
  cohort: 'bg-[#A855F7]/10 text-[#A855F7] group-hover:bg-[#A855F7]',
  community: 'bg-[#22C55E]/10 text-[#22C55E] group-hover:bg-[#22C55E]',
  project: 'bg-[#FF5722]/10 text-[#FF5722] group-hover:bg-[#FF5722]',
  badge: 'bg-[#F59E0B]/10 text-[#F59E0B] group-hover:bg-[#F59E0B]',
  merge: 'bg-[#14B8A6]/10 text-[#14B8A6] group-hover:bg-[#14B8A6]',
};

export default function ActivityTimeline({ activities }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.55 }}
      className="bg-white rounded-[28px] p-6 border border-[#E9ECEF] shadow-sm"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#A855F7]/10 flex items-center justify-center">
            <Activity size={18} className="text-[#A855F7]" />
          </div>
          <h3 className="text-lg font-bold font-heading text-[#0F172A]">Recent Activity</h3>
        </div>
      </div>

      <div className="space-y-4 relative before:absolute before:left-[18px] before:top-2 before:bottom-2 before:w-0.5 before:bg-[#F1F5F9]">
        {activities.map((activity, i) => (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 + i * 0.05 }}
            className="flex items-start gap-4 group cursor-pointer relative"
          >
            <div className={cn(
              "w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-colors relative z-10 border-2 border-white shadow-sm",
              activityColors[activity.type]?.split(' group-hover')[0]
            )}>
              {activityIcons[activity.type]}
            </div>
            <div className="flex-1 min-w-0 pt-1">
              <p className="text-sm font-semibold text-[#0F172A] leading-snug group-hover:text-[#FF5722] transition-colors">
                {activity.text}
              </p>
              <p className="text-xs text-[#94A3B8] font-medium mt-0.5">{activity.time}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
