import { motion } from 'framer-motion';
import { Briefcase, Trophy, Send, Award, Users, MessageSquare, Sparkles } from 'lucide-react';
import { cn } from '../../lib/utils';

export default function StatsAndRecs() {
  const stats = [
    { label: "Projects", value: 2, icon: <Briefcase size={16} className="text-blue-500" /> },
    { label: "Hackathons", value: 1, icon: <Trophy size={16} className="text-orange-500" /> },
    { label: "Applications", value: 5, icon: <Send size={16} className="text-emerald-500" /> },
    { label: "Certificates", value: 3, icon: <Award size={16} className="text-purple-500" /> },
    { label: "Sessions", value: 4, icon: <MessageSquare size={16} className="text-pink-500" /> },
    { label: "Comm. Pts", value: 120, icon: <Users size={16} className="text-amber-500" /> },
  ];

  const recommendations = [
    { type: "Mentor", title: "Sarah Chen", subtitle: "Senior AI Engineer", tag: "Match: 95%" },
    { type: "Project", title: "NLP Chatbot", subtitle: "Python • PyTorch", tag: "Intermediate" },
    { type: "Internship", title: "Data Intern", subtitle: "Stripe • Remote", tag: "Hiring" },
  ];

  return (
    <div className="space-y-6 h-full">
      
      {/* My Stats Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E9ECEF] shadow-sm">
        <h2 className="text-xl font-bold font-heading text-[#0F172A] mb-6">My Stats</h2>
        <div className="grid grid-cols-2 gap-3">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-[#F8FAFC] rounded-xl p-3 border border-[#E9ECEF] flex flex-col gap-2">
              <div className="flex items-center justify-between">
                {stat.icon}
                <span className="text-lg font-bold text-[#0F172A]">{stat.value}</span>
              </div>
              <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* AI Recommendations Card */}
      <div className="bg-gradient-to-br from-[#0F172A] to-[#1E293B] rounded-3xl p-6 sm:p-8 border border-[#334155] shadow-sm flex-1 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF5722]/20 blur-2xl rounded-full translate-x-1/2 -translate-y-1/2" />
        
        <h2 className="text-xl font-bold font-heading text-white mb-6 flex items-center gap-2 relative z-10">
          <Sparkles size={20} className="text-[#FF5722]" />
          Suggested For You
        </h2>
        
        <div className="space-y-3 relative z-10">
          {recommendations.map((rec, idx) => (
            <div key={idx} className="bg-white/10 hover:bg-white/15 border border-white/5 rounded-xl p-3 transition-colors cursor-pointer group">
              <div className="flex justify-between items-start mb-1">
                <span className="text-[9px] font-bold text-[#FF5722] uppercase tracking-wider bg-[#FF5722]/10 px-2 py-0.5 rounded-full">
                  {rec.type}
                </span>
                <span className="text-[9px] font-semibold text-white/50">{rec.tag}</span>
              </div>
              <h4 className="text-sm font-bold text-white group-hover:text-[#FF5722] transition-colors">{rec.title}</h4>
              <p className="text-xs font-medium text-white/60 mt-0.5">{rec.subtitle}</p>
            </div>
          ))}
        </div>
      </div>
      
    </div>
  );
}
