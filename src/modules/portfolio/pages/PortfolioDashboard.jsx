import { Link } from 'react-router-dom';
import { 
  Eye, Download, Users, ExternalLink, Sparkles, AlertCircle, 
  CheckCircle2, FileText, ChevronRight, BarChart3, Medal 
} from 'lucide-react';
import { Avatar } from '../../../components/ui/Avatar';
import { cn } from '../../../lib/utils';

export default function PortfolioDashboard() {
  return (
    <div className="flex-1 overflow-y-auto custom-scrollbar h-full bg-[#F8FAFC]">
      
      {/* Header */}
      <div className="bg-white border-b border-[#E9ECEF] p-6 lg:p-10">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-[#0F172A] mb-2">Portfolio Dashboard</h1>
            <p className="text-sm font-semibold text-[#64748B]">Manage your professional identity and track recruiter engagement.</p>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/@shraydobhal" target="_blank" className="bg-white border border-[#E9ECEF] text-[#0F172A] px-5 py-2.5 rounded-xl font-bold hover:bg-[#F8FAFC] transition-colors shadow-sm flex items-center gap-2">
              <ExternalLink size={18} /> View Public Profile
            </Link>
            <Link to="/dashboard/resume" className="bg-[#0F172A] text-white px-5 py-2.5 rounded-xl font-bold hover:bg-[#1E293B] transition-colors shadow-sm flex items-center gap-2">
              <FileText size={18} /> Resume Builder
            </Link>
          </div>
        </div>
      </div>

      <div className="p-6 lg:p-10 max-w-5xl mx-auto space-y-8 pb-24">
        
        {/* Analytics Section */}
        <section>
          <h2 className="text-lg font-extrabold text-[#0F172A] mb-4 flex items-center gap-2">
            <BarChart3 className="text-[#3B82F6]" size={20} /> Last 30 Days Engagement
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-[#E9ECEF] shadow-sm">
              <div className="flex items-center gap-3 text-[#64748B] mb-3">
                <Eye size={18} className="text-[#3B82F6]" />
                <span className="text-xs font-bold uppercase tracking-wider">Profile Views</span>
              </div>
              <p className="text-2xl font-black text-[#0F172A]">1,248</p>
              <p className="text-xs font-bold text-[#22C55E] mt-2 flex items-center gap-1">+12% vs last month</p>
            </div>
            
            <div className="bg-white p-5 rounded-2xl border border-[#E9ECEF] shadow-sm">
              <div className="flex items-center gap-3 text-[#64748B] mb-3">
                <Users size={18} className="text-[#A855F7]" />
                <span className="text-xs font-bold uppercase tracking-wider">Recruiter Visits</span>
              </div>
              <p className="text-2xl font-black text-[#0F172A]">45</p>
              <p className="text-xs font-bold text-[#22C55E] mt-2 flex items-center gap-1">+5 this week</p>
            </div>
            
            <div className="bg-white p-5 rounded-2xl border border-[#E9ECEF] shadow-sm">
              <div className="flex items-center gap-3 text-[#64748B] mb-3">
                <Download size={18} className="text-[#F59E0B]" />
                <span className="text-xs font-bold uppercase tracking-wider">Resume Downloads</span>
              </div>
              <p className="text-2xl font-black text-[#0F172A]">82</p>
              <p className="text-xs font-bold text-[#64748B] mt-2">Consistent with last month</p>
            </div>
            
            <div className="bg-white p-5 rounded-2xl border border-[#E9ECEF] shadow-sm">
              <div className="flex items-center gap-3 text-[#64748B] mb-3">
                <ExternalLink size={18} className="text-[#10B981]" />
                <span className="text-xs font-bold uppercase tracking-wider">GitHub Clicks</span>
              </div>
              <p className="text-2xl font-black text-[#0F172A]">310</p>
              <p className="text-xs font-bold text-[#22C55E] mt-2 flex items-center gap-1">+24% vs last month</p>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* AI Portfolio Review */}
          <section className="space-y-4">
            <h2 className="text-lg font-extrabold text-[#0F172A] flex items-center gap-2">
              <Sparkles className="text-[#A855F7]" size={20} /> AI Career Readiness Review
            </h2>
            
            <div className="bg-[#0F172A] rounded-3xl p-1 relative overflow-hidden shadow-lg group">
              <div className="absolute inset-0 bg-gradient-to-br from-[#3B82F6]/20 to-[#A855F7]/20 blur-xl"></div>
              <div className="relative bg-[#0F172A] rounded-[22px] p-6 h-full flex flex-col border border-white/10">
                
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <Sparkles className="text-[#A855F7]" size={20} />
                    <h3 className="text-sm font-extrabold text-white tracking-wider uppercase">Auto-Analysis</h3>
                  </div>
                  <span className="bg-[#22C55E]/20 text-[#4ADE80] text-[10px] font-extrabold uppercase tracking-wider px-2 py-1 rounded-md border border-[#22C55E]/30">
                    Strong Candidate
                  </span>
                </div>
                
                <div className="flex items-end gap-2 mb-8">
                  <span className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#3B82F6] to-[#A855F7]">88/100</span>
                  <span className="text-sm font-bold text-[#94A3B8] mb-1.5">Readiness Score</span>
                </div>
                
                <div className="space-y-4 flex-1">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 size={18} className="text-[#22C55E] shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-bold text-white">Excellent Tech Stack Alignment</p>
                      <p className="text-xs font-semibold text-[#94A3B8]">Your projects strongly align with MERN stack roles.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <AlertCircle size={18} className="text-[#F59E0B] shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-bold text-white">Missing Open Source Activity</p>
                      <p className="text-xs font-semibold text-[#94A3B8]">Adding 2-3 PRs to OSS repos will boost your score by +5 points.</p>
                    </div>
                  </div>
                </div>
                
                <button className="w-full mt-6 bg-white/10 text-white hover:bg-white/20 px-4 py-2.5 rounded-xl text-sm font-bold transition-colors border border-white/10">
                  View Detailed Report
                </button>
              </div>
            </div>
          </section>

          {/* Endorsements Inbox */}
          <section className="space-y-4">
            <h2 className="text-lg font-extrabold text-[#0F172A] flex items-center gap-2">
              <Medal className="text-[#F59E0B]" size={20} /> Recent Endorsements
            </h2>
            
            <div className="bg-white border border-[#E9ECEF] rounded-3xl p-2 shadow-sm space-y-1">
              {[1, 2].map(i => (
                <div key={i} className="p-4 rounded-2xl hover:bg-[#F8FAFC] transition-colors group">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <Avatar size="md" src={`https://api.dicebear.com/7.x/avataaars/svg?seed=Mentor${i}`} />
                      <div>
                        <h4 className="text-sm font-bold text-[#0F172A]">Alex Kumar</h4>
                        <p className="text-xs font-semibold text-[#64748B] mb-2">Senior SWE at Google</p>
                        <p className="text-[13px] text-[#475569] font-medium italic">
                          "Exceptional problem-solving skills. Quickly grasped complex system design concepts during our session."
                        </p>
                        <div className="flex gap-2 mt-3">
                          <span className="bg-[#F1F5F9] text-[#64748B] text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider">System Design</span>
                          <span className="bg-[#F1F5F9] text-[#64748B] text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider">React</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              <button className="w-full p-4 text-sm font-bold text-[#3B82F6] hover:text-[#2563EB] flex items-center justify-center gap-1 transition-colors">
                View All Endorsements <ChevronRight size={16} />
              </button>
            </div>
          </section>

        </div>

      </div>
    </div>
  );
}
