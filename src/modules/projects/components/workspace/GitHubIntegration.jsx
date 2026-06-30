import { GitBranch as Github, GitBranch, GitCommit, GitPullRequest, Star, ExternalLink, Activity } from 'lucide-react';
import { Avatar } from '../../../../components/ui/Avatar';

export default function GitHubIntegration() {
  return (
    <div className="space-y-6">
      
      {/* Repo Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E9ECEF] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-[#1E293B] rounded-2xl flex items-center justify-center text-white shrink-0">
            <Github size={28} />
          </div>
          <div>
            <h2 className="text-xl font-bold font-heading text-[#0F172A] flex items-center gap-2">
              topper-mantra / ai-resume-analyzer
            </h2>
            <p className="text-sm font-semibold text-[#64748B]">Connected 2 days ago by Alex K.</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-[#F8FAFC] border border-[#E9ECEF] px-4 py-2 rounded-xl text-sm font-bold text-[#0F172A]">
            <Star size={16} className="text-[#F59E0B]" /> 12
          </div>
          <button className="flex items-center gap-2 bg-[#0F172A] text-white px-5 py-2.5 rounded-xl font-bold hover:bg-[#1E293B] transition-colors">
            View on GitHub <ExternalLink size={16} />
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-[#E9ECEF] shadow-sm flex flex-col hover:border-[#3B82F6]/30 transition-colors">
          <GitBranch size={20} className="text-[#3B82F6] mb-2" />
          <span className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-wider mb-1">Branches</span>
          <span className="text-2xl font-extrabold text-[#0F172A]">3</span>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-[#E9ECEF] shadow-sm flex flex-col hover:border-[#22C55E]/30 transition-colors">
          <GitCommit size={20} className="text-[#22C55E] mb-2" />
          <span className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-wider mb-1">Commits</span>
          <span className="text-2xl font-extrabold text-[#0F172A]">42</span>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-[#E9ECEF] shadow-sm flex flex-col hover:border-[#A855F7]/30 transition-colors">
          <GitPullRequest size={20} className="text-[#A855F7] mb-2" />
          <span className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-wider mb-1">Pull Requests</span>
          <span className="text-2xl font-extrabold text-[#0F172A]">2 Open</span>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-[#E9ECEF] shadow-sm flex flex-col hover:border-[#F59E0B]/30 transition-colors">
          <Activity size={20} className="text-[#F59E0B] mb-2" />
          <span className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-wider mb-1">Contributors</span>
          <div className="flex -space-x-2 mt-1">
            <Avatar size="sm" src={`https://api.dicebear.com/7.x/avataaars/svg?seed=A`} />
            <Avatar size="sm" src={`https://api.dicebear.com/7.x/avataaars/svg?seed=B`} />
            <Avatar size="sm" src={`https://api.dicebear.com/7.x/avataaars/svg?seed=C`} />
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-3xl border border-[#E9ECEF] shadow-sm overflow-hidden">
        <div className="p-6 border-b border-[#E9ECEF]">
          <h3 className="text-lg font-bold font-heading text-[#0F172A]">Recent Commits</h3>
        </div>
        <div className="divide-y divide-[#E9ECEF]">
          {[
            { msg: 'feat: integrated OpenAI embeddings for grading', author: 'Alex K.', hash: 'a1b2c3d', time: '2 hours ago' },
            { msg: 'fix: padding issue on mobile dashboard', author: 'Priya M.', hash: 'f4e5d6c', time: '5 hours ago' },
            { msg: 'chore: updated dependencies', author: 'Rahul D.', hash: 'b7a8c9d', time: 'Yesterday' },
          ].map((commit, i) => (
            <div key={i} className="p-4 sm:p-6 flex items-start sm:items-center justify-between gap-4 hover:bg-[#F8FAFC] transition-colors">
              <div className="flex items-start sm:items-center gap-4">
                <GitCommit size={20} className="text-[#94A3B8] hidden sm:block shrink-0" />
                <div>
                  <p className="text-sm font-bold text-[#0F172A] mb-1">{commit.msg}</p>
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#64748B]">
                    <Avatar size="xs" src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${commit.author}`} />
                    <span>{commit.author}</span>
                    <span>•</span>
                    <span>{commit.time}</span>
                  </div>
                </div>
              </div>
              <div className="text-xs font-mono font-bold text-[#3B82F6] bg-[#3B82F6]/10 px-2.5 py-1 rounded-lg shrink-0">
                {commit.hash}
              </div>
            </div>
          ))}
        </div>
      </div>
      
    </div>
  );
}
