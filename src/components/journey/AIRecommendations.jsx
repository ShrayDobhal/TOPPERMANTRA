import { motion } from 'framer-motion';
import { Sparkles, Users, Briefcase, ChevronRight, Zap } from 'lucide-react';

const recommendations = [
  { type: 'Mentor', title: 'Sarah Chen', subtitle: 'Senior AI Engineer at Google', why: 'Matches your goal to learn Machine Learning.', icon: <Users size={16}/>, color: 'text-blue-500', bg: 'bg-blue-50' },
  { type: 'Project', title: 'AI Resume Analyzer', subtitle: 'Full Stack App', why: 'You completed the React module requirement.', icon: <Briefcase size={16}/>, color: 'text-green-500', bg: 'bg-green-50' },
];

export default function AIRecommendations() {
  return (
    <div className="bg-white rounded-[32px] p-6 border border-[#E9ECEF] shadow-sm flex flex-col">
      <h3 className="text-lg font-bold font-heading text-[#0F172A] mb-6 flex items-center gap-2">
        <Sparkles size={20} className="text-[#A855F7]" /> Next Best Actions
      </h3>
      <div className="space-y-4 flex-1">
        {recommendations.map((rec, i) => (
          <div key={i} className="flex flex-col p-4 rounded-2xl border border-[#E9ECEF] hover:shadow-md hover:border-[#FF5722]/30 transition-all group cursor-pointer bg-white">
            <div className="flex items-start gap-4 mb-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${rec.bg} ${rec.color}`}>
                {rec.icon}
              </div>
              <div className="flex-1 min-w-0 pt-0.5">
                <p className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider mb-0.5">{rec.type}</p>
                <h4 className="text-sm font-bold text-[#0F172A] truncate group-hover:text-[#FF5722] transition-colors">{rec.title}</h4>
                <p className="text-xs text-[#64748B] truncate">{rec.subtitle}</p>
              </div>
              <ChevronRight size={18} className="text-[#CBD5E1] group-hover:text-[#FF5722] group-hover:translate-x-1 transition-all mt-2" />
            </div>
            <div className="bg-[#F8FAFC] rounded-xl p-3 border border-[#E9ECEF]/50">
              <p className="text-xs font-semibold text-[#0F172A] flex items-start gap-2">
                <Zap size={14} className="text-[#F59E0B] shrink-0 mt-0.5" />
                <span className="leading-snug">{rec.why}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
