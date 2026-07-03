import { motion } from 'framer-motion';
import { Clock, AlertTriangle, CheckCircle2, ArrowRight } from 'lucide-react';
import { cn } from '../../../lib/utils';

export default function UpcomingDeadlines({ deadlines }) {
  const getUrgencyStyles = (urgency) => {
    switch (urgency) {
      case 'high': return { border: 'border-[#EF4444]/30', bg: 'bg-[#FEF2F2]', dot: 'bg-[#EF4444]', text: 'text-[#EF4444]', icon: <AlertTriangle size={14} className="text-[#EF4444]" /> };
      case 'medium': return { border: 'border-[#F59E0B]/30', bg: 'bg-[#FFFBEB]', dot: 'bg-[#F59E0B]', text: 'text-[#F59E0B]', icon: <Clock size={14} className="text-[#F59E0B]" /> };
      default: return { border: 'border-[#22C55E]/30', bg: 'bg-[#F0FDF4]', dot: 'bg-[#22C55E]', text: 'text-[#22C55E]', icon: <CheckCircle2 size={14} className="text-[#22C55E]" /> };
    }
  };

  if (!deadlines?.length) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.25 }}
      className="bg-white rounded-[28px] p-6 sm:p-8 border border-[#E9ECEF] shadow-sm"
    >
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#EF4444]/10 flex items-center justify-center">
            <Clock size={18} className="text-[#EF4444]" />
          </div>
          <h2 className="text-lg font-bold font-heading text-[#0F172A]">Upcoming Deadlines</h2>
        </div>
        <span className="text-xs font-bold text-[#64748B] bg-[#F1F5F9] px-3 py-1.5 rounded-lg">
          {deadlines.length} active
        </span>
      </div>

      <div className="space-y-3">
        {deadlines.map((dl, i) => {
          const styles = getUrgencyStyles(dl.urgency);
          return (
            <motion.div
              key={dl.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              className={cn(
                "flex items-center gap-4 p-4 rounded-2xl border cursor-pointer group transition-all hover:shadow-sm",
                styles.border, styles.bg
              )}
            >
              {/* Urgency dot */}
              <div className="relative shrink-0">
                <div className={cn("w-3 h-3 rounded-full", styles.dot)} />
                {dl.urgency === 'high' && (
                  <div className={cn("absolute inset-0 w-3 h-3 rounded-full animate-ping", styles.dot)} style={{ animationDuration: '1.5s' }} />
                )}
              </div>

              {/* Details */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-[#0F172A] truncate">
                  {dl.subpartTitle}
                </p>
                <p className="text-xs text-[#64748B] font-medium truncate">
                  {dl.projectTitle}
                </p>
              </div>

              {/* Days left */}
              <div className="flex items-center gap-2 shrink-0">
                <div className={cn("flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold", styles.bg, styles.text)}>
                  {styles.icon}
                  <span>{dl.daysLeft === 0 ? 'Due today' : `${dl.daysLeft}d left`}</span>
                </div>
                <ArrowRight size={16} className="text-[#CBD5E1] group-hover:text-[#FF5722] group-hover:translate-x-1 transition-all" />
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
