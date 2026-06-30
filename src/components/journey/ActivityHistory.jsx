import { motion } from 'framer-motion';
import { History, CheckCircle2, Users, Briefcase, Award } from 'lucide-react';
import { cn } from '../../lib/utils';

const history = [
  { text: 'Completed Python Basics', time: '2 hours ago', icon: <CheckCircle2 size={16} />, color: 'text-green-500', bg: 'bg-green-50', border: 'border-green-200' },
  { text: 'Joined AI Builders Community', time: 'Yesterday', icon: <Users size={16} />, color: 'text-blue-500', bg: 'bg-blue-50', border: 'border-blue-200' },
  { text: 'Booked Mentor Session', time: '2 days ago', icon: <Briefcase size={16} />, color: 'text-orange-500', bg: 'bg-orange-50', border: 'border-orange-200' },
  { text: 'Earned Frontend Certificate', time: 'Last Week', icon: <Award size={16} />, color: 'text-purple-500', bg: 'bg-purple-50', border: 'border-purple-200' },
];

export default function ActivityHistory() {
  return (
    <div className="bg-white rounded-[32px] p-6 sm:p-10 border border-[#E9ECEF] shadow-sm relative overflow-hidden">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold font-heading text-[#0F172A] mb-1">Activity History</h2>
          <p className="text-sm font-semibold text-[#64748B]">Your recent steps on the platform.</p>
        </div>
        <History size={24} className="text-[#CBD5E1]" />
      </div>

      <div className="space-y-6 relative before:absolute before:inset-0 before:ml-[1.4rem] before:-translate-x-px before:h-full before:w-0.5 before:bg-[#E9ECEF]">
        {history.map((item, i) => (
          <div key={i} className="relative flex items-start gap-4 group">
            <div className={cn(
              "w-11 h-11 rounded-full flex items-center justify-center border-4 border-white shadow-sm shrink-0 relative z-10 transition-transform group-hover:scale-110",
              item.bg, item.color
            )}>
              {item.icon}
            </div>
            <div className="flex-1 bg-white p-4 rounded-2xl border border-[#E9ECEF] shadow-sm group-hover:shadow-md transition-shadow -mt-1">
              <p className="text-sm font-bold text-[#0F172A] mb-1">{item.text}</p>
              <p className="text-xs font-semibold text-[#64748B]">{item.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
