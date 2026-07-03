import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Award, Flame, ChevronRight, X, Bot } from 'lucide-react';
import { cn } from '../../../lib/utils';

const alertStyles = {
  nudge: { icon: <AlertTriangle size={18} />, bg: 'bg-[#FEF3C7]', border: 'border-[#F59E0B]/30', iconBg: 'bg-[#F59E0B]/20', iconColor: 'text-[#D97706]' },
  warning: { icon: <AlertTriangle size={18} />, bg: 'bg-[#FEF2F2]', border: 'border-[#EF4444]/30', iconBg: 'bg-[#EF4444]/20', iconColor: 'text-[#EF4444]' },
  badge: { icon: <Award size={18} />, bg: 'bg-[#F0FDF4]', border: 'border-[#22C55E]/30', iconBg: 'bg-[#22C55E]/20', iconColor: 'text-[#22C55E]' },
  streak: { icon: <Flame size={18} />, bg: 'bg-[#FFF7ED]', border: 'border-[#FF5722]/30', iconBg: 'bg-[#FF5722]/20', iconColor: 'text-[#FF5722]' },
  removal: { icon: <AlertTriangle size={18} />, bg: 'bg-[#FEF2F2]', border: 'border-[#EF4444]/40', iconBg: 'bg-[#EF4444]/20', iconColor: 'text-[#EF4444]' },
};

export default function CustodianAlerts({ alerts, onDismiss, onMarkRead }) {
  const unread = alerts.filter(a => !a.isRead);
  if (unread.length === 0 && alerts.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <div className="flex items-center gap-2 mb-4 px-1">
        <div className="w-6 h-6 rounded-md bg-[#0F172A] flex items-center justify-center">
          <Bot size={14} className="text-[#FF5722]" />
        </div>
        <h2 className="text-xs font-bold text-[#94A3B8] uppercase tracking-widest">
          Custodian Bot Alerts
        </h2>
        {unread.length > 0 && (
          <span className="bg-[#EF4444] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
            {unread.length} new
          </span>
        )}
      </div>

      <div className="space-y-3">
        <AnimatePresence>
          {alerts.map((alert) => {
            const style = alertStyles[alert.type] || alertStyles.nudge;
            return (
              <motion.div
                key={alert.id}
                layout
                initial={{ opacity: 0, x: -20, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 20, scale: 0.95 }}
                className={cn(
                  "flex items-start gap-4 p-4 rounded-2xl border transition-all",
                  style.bg, style.border,
                  !alert.isRead && 'ring-1 ring-offset-1 ring-[#FF5722]/20'
                )}
              >
                {/* Icon */}
                <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center shrink-0", style.iconBg, style.iconColor)}>
                  {style.icon}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-[#0F172A] mb-0.5">{alert.title}</p>
                  <p className="text-xs text-[#64748B] font-medium leading-relaxed">{alert.message}</p>
                  {alert.actionLabel && (
                    <button
                      onClick={() => onMarkRead?.(alert.id)}
                      className="mt-2 flex items-center gap-1 text-xs font-bold text-[#FF5722] hover:text-[#E64A19] transition-colors"
                    >
                      {alert.actionLabel} <ChevronRight size={12} />
                    </button>
                  )}
                </div>

                {/* Dismiss */}
                <button
                  onClick={() => onDismiss?.(alert.id)}
                  className="text-[#94A3B8] hover:text-[#0F172A] transition-colors shrink-0 mt-1"
                >
                  <X size={16} />
                </button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
