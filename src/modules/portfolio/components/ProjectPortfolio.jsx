import React from 'react';
import { Terminal, GitBranch, ExternalLink, ArrowRight } from 'lucide-react';
import useGamificationStore from '../../../store/useGamificationStore';
import { Link } from 'react-router-dom';

export default function ProjectPortfolio() {
  const portfolio = useGamificationStore((s) => s.portfolio);

  return (
    <div className="bg-white rounded-3xl border border-[#E9ECEF] p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-extrabold text-[#0F172A] flex items-center gap-2">
          <Terminal size={20} className="text-[#10B981]" /> Verified Project Contributions
        </h3>
        <Link to="/dashboard/projects" className="text-sm font-bold text-[#3B82F6] hover:text-[#2563EB] flex items-center gap-1">
          Build More <ArrowRight size={16} />
        </Link>
      </div>

      <div className="space-y-4">
        {portfolio.map((item) => (
          <div key={item.id} className="border border-[#E9ECEF] rounded-2xl p-4 hover:shadow-md transition-all group">
            <div className="flex flex-col md:flex-row justify-between md:items-start gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="text-base font-bold text-[#0F172A] group-hover:text-[#3B82F6] transition-colors">{item.projectTitle}</h4>
                  <span className="bg-[#22C55E]/10 text-[#22C55E] text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full">Merged</span>
                </div>
                <p className="text-sm font-semibold text-[#475569] mb-3">{item.subpartTitle}</p>
                
                <div className="flex flex-wrap gap-2 mb-3">
                  {item.techStack.map(tech => (
                    <span key={tech} className="bg-[#F8FAFC] border border-[#E9ECEF] text-[#64748B] text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-start gap-3">
                <span className="text-xs font-bold text-[#F59E0B] bg-[#F59E0B]/10 px-2 py-1 rounded-lg">
                  +{item.xpEarned} XP
                </span>
                <div className="flex gap-2">
                  <button className="p-2 text-[#94A3B8] hover:text-[#0F172A] hover:bg-[#F1F5F9] rounded-lg transition-colors" title="View Source">
                    <GitBranch size={16} />
                  </button>
                  <button className="p-2 text-[#94A3B8] hover:text-[#3B82F6] hover:bg-[#EFF6FF] rounded-lg transition-colors" title="Live Link">
                    <ExternalLink size={16} />
                  </button>
                </div>
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-[#E9ECEF] flex items-center justify-between text-[10px] font-bold text-[#94A3B8]">
              <span>Verified by Topper Mantra Mentor</span>
              <span>{new Date(item.mergedAt).toLocaleDateString()}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
