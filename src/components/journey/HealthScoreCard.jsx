import { motion } from 'framer-motion';
import { ShieldCheck, Code, Briefcase, FileText, Globe, MessageCircle, Users } from 'lucide-react';
import { ProgressRing } from '../ui/ProgressRing';
import { cn } from '../../lib/utils';

const categories = [
  { name: 'Technical Skills', score: 92, icon: <Code size={16} />, color: 'text-blue-500', bar: 'bg-blue-500', suggestion: 'Learn Next.js next.' },
  { name: 'Projects', score: 85, icon: <Briefcase size={16} />, color: 'text-green-500', bar: 'bg-green-500', suggestion: 'Build a full-stack app.' },
  { name: 'Resume', score: 60, icon: <FileText size={16} />, color: 'text-orange-500', bar: 'bg-orange-500', suggestion: 'Add your latest project.' },
  { name: 'Portfolio', score: 45, icon: <Globe size={16} />, color: 'text-red-500', bar: 'bg-red-500', suggestion: 'Deploy your portfolio site.' },
  { name: 'Networking', score: 70, icon: <Users size={16} />, color: 'text-purple-500', bar: 'bg-purple-500', suggestion: 'Attend a community event.' },
  { name: 'Interview Readiness', score: 50, icon: <MessageCircle size={16} />, color: 'text-yellow-500', bar: 'bg-yellow-500', suggestion: 'Do a mock interview.' },
];

export default function HealthScoreCard() {
  return (
    <div className="bg-white rounded-[32px] p-6 sm:p-8 border border-[#E9ECEF] shadow-sm flex flex-col">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-xl font-bold font-heading text-[#0F172A] mb-1">Career Health</h2>
          <p className="text-xs font-semibold text-[#64748B]">Your overall readiness score.</p>
        </div>
        <div className="relative">
          <ProgressRing progress={84} size={70} strokeWidth={8} primaryColor="#22C55E" secondaryColor="#16A34A">
            <span className="text-lg font-bold text-[#0F172A]">84%</span>
          </ProgressRing>
        </div>
      </div>
      
      <div className="space-y-5">
        {categories.map((cat, i) => (
          <div key={i} className="group">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-2">
                <span className={cat.color}>{cat.icon}</span>
                <span className="text-sm font-bold text-[#0F172A]">{cat.name}</span>
              </div>
              <span className="text-sm font-extrabold text-[#0F172A]">{cat.score}%</span>
            </div>
            
            <div className="h-2 w-full bg-[#F1F5F9] rounded-full overflow-hidden mb-2">
              <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: `${cat.score}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: "easeOut", delay: i * 0.1 }}
                className={cn("h-full rounded-full", cat.bar)}
              />
            </div>
            
            <div className="bg-[#F8FAFC] p-2 rounded-lg border border-[#E9ECEF] opacity-0 group-hover:opacity-100 transition-opacity h-0 overflow-hidden group-hover:h-auto group-hover:mt-2">
              <p className="text-xs font-bold text-[#64748B] flex items-center gap-1.5">
                <ShieldCheck size={12} className="text-[#22C55E]" /> {cat.suggestion}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
