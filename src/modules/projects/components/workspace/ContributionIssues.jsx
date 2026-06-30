import { motion } from 'framer-motion';
import { GitPullRequest, Search, CheckCircle2, Circle, AlertCircle, Tag, MessageSquare, Zap } from 'lucide-react';

const issues = [
  { id: '#12', title: 'Implement JWT Authentication for API', status: 'open', labels: ['backend', 'security'], xp: 200, comments: 4, author: 'Alex K.' },
  { id: '#14', title: 'Design Landing Page Hero Section', status: 'open', labels: ['frontend', 'good first issue'], xp: 100, comments: 2, author: 'Priya M.' },
  { id: '#15', title: 'Fix padding bug on mobile header', status: 'closed', labels: ['bug', 'frontend'], xp: 50, comments: 1, author: 'Rahul D.' },
  { id: '#17', title: 'Write API Documentation for /users endpoint', status: 'open', labels: ['documentation'], xp: 150, comments: 0, author: 'Alex K.' },
  { id: '#18', title: 'Optimize database queries for analytics', status: 'open', labels: ['backend', 'performance'], xp: 300, comments: 5, author: 'Priya M.' },
];

export default function ContributionIssues() {
  return (
    <div className="bg-white rounded-3xl border border-[#E9ECEF] shadow-sm flex flex-col h-full min-h-[600px]">
      
      {/* Header & Controls */}
      <div className="p-6 sm:p-8 border-b border-[#E9ECEF]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <h2 className="text-xl font-bold font-heading text-[#0F172A] flex items-center gap-2">
            <GitPullRequest className="text-[#3B82F6]" size={24} /> Issues & Contributions
          </h2>
          <button className="bg-[#22C55E] text-white px-5 py-2.5 rounded-xl font-bold hover:bg-[#16A34A] transition-all shadow-[0_4px_14px_0_rgba(34,197,94,0.39)] hover:shadow-[0_6px_20px_rgba(34,197,94,0.23)] hover:-translate-y-0.5">
            New Issue
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94A3B8]" size={18} />
            <input 
              type="text" 
              placeholder="Search issues..." 
              className="w-full bg-[#F8FAFC] border border-[#E9ECEF] rounded-xl py-2.5 pl-12 pr-4 text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#3B82F6] focus:ring-1 focus:ring-[#3B82F6] transition-all text-sm font-semibold"
            />
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-[#F8FAFC] border border-[#E9ECEF] rounded-xl text-sm font-bold text-[#64748B] hover:text-[#0F172A] hover:bg-[#F1F5F9] transition-colors flex items-center gap-2">
              <Tag size={16} /> Labels
            </button>
            <button className="px-4 py-2 bg-[#F8FAFC] border border-[#E9ECEF] rounded-xl text-sm font-bold text-[#64748B] hover:text-[#0F172A] hover:bg-[#F1F5F9] transition-colors">
              Sort
            </button>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="bg-[#F8FAFC] px-6 py-3 border-b border-[#E9ECEF] flex gap-6">
        <button className="flex items-center gap-2 text-sm font-bold text-[#0F172A]">
          <AlertCircle size={16} className="text-[#0F172A]" /> 4 Open
        </button>
        <button className="flex items-center gap-2 text-sm font-bold text-[#64748B] hover:text-[#0F172A] transition-colors">
          <CheckCircle2 size={16} className="text-[#64748B]" /> 1 Closed
        </button>
      </div>

      {/* Issues List */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {issues.map((issue, i) => (
          <div key={i} className="flex items-start gap-4 p-4 sm:p-6 border-b border-[#E9ECEF] hover:bg-[#F8FAFC] transition-colors group cursor-pointer">
            <div className="shrink-0 mt-1">
              {issue.status === 'open' ? (
                <AlertCircle size={20} className="text-[#22C55E]" />
              ) : (
                <CheckCircle2 size={20} className="text-[#A855F7]" />
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-1">
                <h3 className="text-base font-bold text-[#0F172A] group-hover:text-[#3B82F6] transition-colors">
                  {issue.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {issue.labels.map(label => (
                    <span key={label} className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                      label === 'good first issue' ? 'bg-purple-50 text-purple-600 border-purple-200' :
                      label === 'bug' ? 'bg-red-50 text-red-600 border-red-200' :
                      'bg-blue-50 text-blue-600 border-blue-200'
                    }`}>
                      {label}
                    </span>
                  ))}
                </div>
              </div>
              <p className="text-xs font-semibold text-[#64748B]">
                {issue.id} opened yesterday by {issue.author}
              </p>
            </div>

            <div className="shrink-0 flex items-center gap-6">
              <div className="hidden sm:flex items-center gap-1.5 text-xs font-bold text-[#F59E0B] bg-[#F59E0B]/10 px-2.5 py-1 rounded-full">
                <Zap size={14} className="fill-current" /> +{issue.xp} XP
              </div>
              {issue.comments > 0 && (
                <div className="flex items-center gap-1.5 text-[#64748B]">
                  <MessageSquare size={16} />
                  <span className="text-xs font-bold">{issue.comments}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
