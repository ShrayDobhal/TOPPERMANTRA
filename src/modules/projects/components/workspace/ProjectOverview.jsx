import { FileText, Target, Users, Zap, CheckCircle2, Clock } from 'lucide-react';
import { Avatar } from '../../../../components/ui/Avatar';

export default function ProjectOverview({ project }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      {/* Main Content */}
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E9ECEF] shadow-sm">
          <h2 className="text-lg font-bold font-heading text-[#0F172A] mb-4 flex items-center gap-2">
            <Target size={20} className="text-[#FF5722]" /> Problem Statement
          </h2>
          <p className="text-[#64748B] leading-relaxed mb-8 text-sm sm:text-base">
            {project.description} Currently, recruiters spend hours manually screening resumes. This project aims to automate the process using Natural Language Processing (NLP) to parse resumes and score them against specific job descriptions.
          </p>
          
          <h2 className="text-lg font-bold font-heading text-[#0F172A] mb-4 flex items-center gap-2">
            <Zap size={20} className="text-[#F59E0B]" /> Proposed Solution
          </h2>
          <p className="text-[#64748B] leading-relaxed text-sm sm:text-base mb-6">
            We will build a React frontend for users to upload their PDFs. The FastAPI backend will extract text using PyPDF2, process it with spaCy for entity recognition, and use OpenAI embeddings to calculate a similarity score against the JD.
          </p>

          <div className="flex flex-wrap gap-2 pt-6 border-t border-[#E9ECEF]">
            <span className="text-xs font-bold text-[#64748B] uppercase tracking-wider bg-[#F1F5F9] px-3 py-1.5 rounded-lg">Python</span>
            <span className="text-xs font-bold text-[#64748B] uppercase tracking-wider bg-[#F1F5F9] px-3 py-1.5 rounded-lg">FastAPI</span>
            <span className="text-xs font-bold text-[#64748B] uppercase tracking-wider bg-[#F1F5F9] px-3 py-1.5 rounded-lg">React</span>
            <span className="text-xs font-bold text-[#64748B] uppercase tracking-wider bg-[#F1F5F9] px-3 py-1.5 rounded-lg">spaCy</span>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E9ECEF] shadow-sm">
          <h2 className="text-lg font-bold font-heading text-[#0F172A] mb-6 flex items-center gap-2">
            <Clock size={20} className="text-[#3B82F6]" /> Project Timeline
          </h2>
          
          <div className="space-y-6 relative before:absolute before:inset-0 before:ml-[1.15rem] before:-translate-x-px before:h-full before:w-0.5 before:bg-[#E9ECEF]">
            {[
              { title: 'Project Scoping & Architecture', status: 'completed', date: 'Week 1' },
              { title: 'Backend API & NLP Pipeline', status: 'in-progress', date: 'Week 2' },
              { title: 'Frontend Dashboard', status: 'pending', date: 'Week 3' },
              { title: 'Integration & Testing', status: 'pending', date: 'Week 4' }
            ].map((milestone, i) => (
              <div key={i} className="relative flex items-start gap-4 group">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center border-4 border-white shadow-sm shrink-0 relative z-10 transition-transform ${
                  milestone.status === 'completed' ? 'bg-[#22C55E] text-white' : 
                  milestone.status === 'in-progress' ? 'bg-[#FF5722] text-white animate-pulse' : 
                  'bg-[#F1F5F9] text-[#94A3B8]'
                }`}>
                  {milestone.status === 'completed' ? <CheckCircle2 size={16} /> : <div className="w-2 h-2 rounded-full bg-current" />}
                </div>
                <div className="flex-1 pt-1.5">
                  <h4 className={`text-sm font-bold ${milestone.status === 'pending' ? 'text-[#94A3B8]' : 'text-[#0F172A]'}`}>{milestone.title}</h4>
                  <p className="text-xs font-semibold text-[#64748B] mt-0.5">{milestone.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div className="space-y-6">
        <div className="bg-white rounded-3xl p-6 border border-[#E9ECEF] shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-base font-bold font-heading text-[#0F172A] flex items-center gap-2">
              <Users size={18} className="text-[#A855F7]" /> Team Members
            </h3>
            <span className="text-xs font-bold text-[#64748B]">4/6</span>
          </div>
          
          <div className="space-y-4">
            {[
              { name: 'Alex Kumar', role: 'Project Owner', type: 'owner' },
              { name: 'Priya Sharma', role: 'Backend Lead', type: 'member' },
              { name: 'Rahul Dev', role: 'Frontend Dev', type: 'member' },
              { name: 'Sarah Chen', role: 'AI Mentor', type: 'mentor' },
            ].map((member, i) => (
              <div key={i} className="flex items-center gap-3 p-2 hover:bg-[#F8FAFC] rounded-xl transition-colors cursor-pointer border border-transparent hover:border-[#E9ECEF]">
                <Avatar size="sm" src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${member.name}`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-[#0F172A] truncate">{member.name}</p>
                  <p className={`text-[10px] font-bold uppercase tracking-wider truncate ${
                    member.type === 'owner' ? 'text-[#FF5722]' : 
                    member.type === 'mentor' ? 'text-[#A855F7]' : 'text-[#64748B]'
                  }`}>{member.role}</p>
                </div>
              </div>
            ))}
            
            <button className="w-full mt-2 py-3 border-2 border-dashed border-[#E9ECEF] rounded-xl text-sm font-bold text-[#FF5722] hover:bg-[#FF5722]/5 transition-colors">
              + Recruit Member
            </button>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-[#E9ECEF] shadow-sm">
          <h3 className="text-base font-bold font-heading text-[#0F172A] mb-4 flex items-center gap-2">
            <FileText size={18} className="text-[#3B82F6]" /> Resources
          </h3>
          <div className="space-y-3">
            {[
              { name: 'Architecture Diagram.pdf', size: '2.4 MB' },
              { name: 'API Specifications.md', size: '15 KB' },
              { name: 'Figma Designs', size: 'External Link' }
            ].map((file, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-[#F8FAFC] rounded-xl border border-[#E9ECEF] hover:border-[#3B82F6]/30 cursor-pointer transition-colors group">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-white border border-[#E9ECEF] flex items-center justify-center shrink-0">
                    <FileText size={14} className="text-[#64748B] group-hover:text-[#3B82F6]" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-[#0F172A] truncate">{file.name}</p>
                    <p className="text-[10px] font-semibold text-[#94A3B8]">{file.size}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
    </div>
  );
}
