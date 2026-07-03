import { motion } from 'framer-motion';
import { cn } from '../../../lib/utils';
import {
  CheckCircle2, Clock, AlertTriangle, User, ArrowRight,
  GitMerge, Hourglass, Users, Shield
} from 'lucide-react';

const statusConfig = {
  available: { label: 'Available', color: 'border-[#22C55E]/30 bg-[#F0FDF4]', headerBg: 'bg-[#22C55E]', icon: <CheckCircle2 size={14} /> },
  claimed: { label: 'In Progress', color: 'border-[#F59E0B]/30 bg-[#FFFBEB]', headerBg: 'bg-[#F59E0B]', icon: <Clock size={14} /> },
  completed: { label: 'Merged', color: 'border-[#3B82F6]/30 bg-[#EFF6FF]', headerBg: 'bg-[#3B82F6]', icon: <GitMerge size={14} /> },
};

const difficultyColors = {
  Beginner: 'bg-[#22C55E]/10 text-[#22C55E]',
  Intermediate: 'bg-[#F59E0B]/10 text-[#D97706]',
  Advanced: 'bg-[#EF4444]/10 text-[#EF4444]',
};

export default function SubpartBoard({ subparts, onClaimTask, onRequestAid, onSubmitReview, canClaim }) {
  const available = subparts.filter(s => s.status === 'available');
  const claimed = subparts.filter(s => s.status === 'claimed');
  const completed = subparts.filter(s => s.status === 'completed');

  const columns = [
    { key: 'available', items: available, config: statusConfig.available },
    { key: 'claimed', items: claimed, config: statusConfig.claimed },
    { key: 'completed', items: completed, config: statusConfig.completed },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
      {columns.map(({ key, items, config }) => (
        <div key={key} className="flex flex-col">
          {/* Column Header */}
          <div className={cn("flex items-center gap-2 px-4 py-3 rounded-t-2xl text-white text-sm font-bold", config.headerBg)}>
            {config.icon}
            <span>{config.label}</span>
            <span className="ml-auto bg-white/20 px-2 py-0.5 rounded-full text-xs">{items.length}</span>
          </div>

          {/* Column Body */}
          <div className={cn("flex-1 rounded-b-2xl border-2 border-t-0 p-3 space-y-3 min-h-[200px]", config.color)}>
            {items.length === 0 && (
              <div className="flex items-center justify-center h-32 text-sm text-[#94A3B8] font-medium">
                No tasks here
              </div>
            )}
            {items.map((subpart, i) => (
              <motion.div
                key={subpart.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className={cn(
                  "bg-white rounded-2xl p-4 border border-[#E9ECEF] shadow-sm hover:shadow-md transition-all cursor-pointer group",
                  subpart.flagged && "ring-2 ring-[#EF4444]/30"
                )}
              >
                {/* Title + Difficulty */}
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h4 className="text-sm font-bold text-[#0F172A] leading-snug group-hover:text-[#FF5722] transition-colors">
                    {subpart.title}
                  </h4>
                  <span className={cn("text-[9px] font-bold px-2 py-0.5 rounded-full shrink-0 uppercase tracking-wider", difficultyColors[subpart.difficulty])}>
                    {subpart.difficulty}
                  </span>
                </div>

                {/* Description */}
                <p className="text-xs text-[#64748B] font-medium leading-relaxed mb-3 line-clamp-2">
                  {subpart.description}
                </p>

                {/* XP Reward */}
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[10px] font-bold text-[#A855F7] bg-[#A855F7]/10 px-2 py-0.5 rounded-full">
                    +{subpart.xpReward} XP
                  </span>
                  {subpart.estimatedHours && (
                    <span className="text-[10px] font-bold text-[#64748B] bg-[#F1F5F9] px-2 py-0.5 rounded-full">
                      ~{subpart.estimatedHours}h
                    </span>
                  )}
                </div>

                {/* Status-specific content */}
                {key === 'available' && (
                  <div className="flex items-center justify-between">
                    <div>
                      {subpart.waitlistCount > 0 && (
                        <span className="text-[10px] text-[#64748B] font-semibold flex items-center gap-1">
                          <Users size={10} /> {subpart.waitlistCount} on waitlist
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => onClaimTask?.(subpart.id)}
                      disabled={!canClaim}
                      className={cn(
                        "text-xs font-bold px-4 py-2 rounded-xl transition-all flex items-center gap-1.5",
                        canClaim
                          ? "bg-[#0F172A] text-white hover:bg-[#FF5722] shadow-sm hover:shadow-md"
                          : "bg-[#F1F5F9] text-[#94A3B8] cursor-not-allowed"
                      )}
                    >
                      {canClaim ? 'Claim Task' : 'Max Claims (2)'}
                    </button>
                  </div>
                )}

                {key === 'claimed' && (
                  <div>
                    {/* Claimed by */}
                    <div className="flex items-center gap-2 mb-3 p-2 bg-[#F8FAFC] rounded-xl">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#3B82F6] to-[#8B5CF6] flex items-center justify-center text-white text-[10px] font-bold">
                        {subpart.claimedBy?.name?.charAt(0)}
                      </div>
                      <span className="text-xs font-bold text-[#0F172A]">@{subpart.claimedBy?.name}</span>
                    </div>

                    {/* Days left */}
                    <div className="flex items-center justify-between mb-3">
                      <div className={cn(
                        "flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-lg",
                        subpart.daysLeft <= 1 ? "bg-[#FEF2F2] text-[#EF4444]" :
                        subpart.daysLeft <= 3 ? "bg-[#FEF3C7] text-[#D97706]" :
                        "bg-[#F0FDF4] text-[#22C55E]"
                      )}>
                        <Clock size={10} />
                        {subpart.daysLeft === 0 ? 'Due today!' : `${subpart.daysLeft}d left`}
                      </div>
                      {subpart.flagged && (
                        <span className="flex items-center gap-1 text-[10px] font-bold text-[#EF4444] bg-[#FEF2F2] px-2 py-1 rounded-lg animate-pulse">
                          <AlertTriangle size={10} /> At risk
                        </span>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      {subpart.hasAidRequest ? (
                        <span className="text-[10px] font-bold text-[#3B82F6] bg-[#3B82F6]/10 px-3 py-1.5 rounded-lg flex items-center gap-1">
                          <Shield size={10} /> Aid Requested
                        </span>
                      ) : (
                        <button
                          onClick={() => onRequestAid?.(subpart.id)}
                          className="text-[10px] font-bold text-[#F59E0B] bg-[#F59E0B]/10 px-3 py-1.5 rounded-lg hover:bg-[#F59E0B]/20 transition-colors"
                        >
                          Request Aid
                        </button>
                      )}
                      <button
                        onClick={() => onSubmitReview?.(subpart.id)}
                        className="text-[10px] font-bold text-[#22C55E] bg-[#22C55E]/10 px-3 py-1.5 rounded-lg hover:bg-[#22C55E]/20 transition-colors flex items-center gap-1"
                      >
                        Submit <ArrowRight size={10} />
                      </button>
                    </div>
                  </div>
                )}

                {key === 'completed' && (
                  <div className="flex items-center justify-between p-2 bg-[#F8FAFC] rounded-xl">
                    <div className="flex items-center gap-2">
                      <GitMerge size={12} className="text-[#3B82F6]" />
                      <span className="text-[10px] font-bold text-[#64748B]">Merged by {subpart.mergedBy}</span>
                    </div>
                    <CheckCircle2 size={14} className="text-[#22C55E]" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
