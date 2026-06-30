import { Users, Search, Plus, Filter, ArrowRight, Zap, Target } from 'lucide-react';
import { Avatar } from '../../../../components/ui/Avatar';

const posts = [
  { 
    role: 'Frontend Developer', 
    project: 'EdTech Hackathon', 
    skills: ['React', 'Tailwind'], 
    urgency: 'High', 
    author: 'Alex K.', 
    time: '2h ago',
    desc: 'Looking for a UI expert to build the landing page for our hackathon project this weekend.' 
  },
  { 
    role: 'ML Engineer', 
    project: 'Research Paper: AI in Healthcare', 
    skills: ['Python', 'TensorFlow', 'NLP'], 
    urgency: 'Medium', 
    author: 'Sarah C.', 
    time: '5h ago',
    desc: 'Need a co-author to help train models on a new dataset. Will be submitting to IEEE.' 
  },
  { 
    role: 'Product Manager', 
    project: 'Campus Startup', 
    skills: ['Figma', 'Agile', 'Strategy'], 
    urgency: 'Low', 
    author: 'Rahul D.', 
    time: '1d ago',
    desc: 'Building a marketplace for college students. Need someone to handle user research and PRDs.' 
  },
];

export default function TeamFinder() {
  return (
    <div className="flex flex-col h-full bg-white">
      
      {/* Header */}
      <div className="p-6 border-b border-[#E9ECEF] flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0 shadow-sm z-10 bg-white">
        <div>
          <h2 className="text-xl font-extrabold text-[#0F172A] flex items-center gap-2">
            <Users className="text-[#3B82F6]" size={24} /> Team Finder
          </h2>
          <p className="text-sm font-semibold text-[#64748B]">Find teammates for hackathons, startups, and research.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" size={16} />
            <input 
              type="text" 
              placeholder="Search roles..." 
              className="w-full sm:w-48 bg-[#F8FAFC] border border-[#E9ECEF] rounded-xl py-2 pl-9 pr-3 text-sm font-semibold text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#3B82F6] focus:ring-1 focus:ring-[#3B82F6] transition-all"
            />
          </div>
          <button className="bg-[#3B82F6] text-white px-4 py-2 rounded-xl font-bold hover:bg-[#2563EB] transition-colors flex items-center gap-2 shadow-sm shrink-0">
            <Plus size={18} /> Post Role
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-6 bg-[#F8FAFC]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            <div key={i} className="bg-white border border-[#E9ECEF] rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-[#3B82F6]/30 transition-all group flex flex-col">
              
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#F8FAFC] to-[#F1F5F9] border border-[#E9ECEF] rounded-xl flex items-center justify-center shrink-0">
                  <Target className="text-[#3B82F6]" size={24} />
                </div>
                {post.urgency === 'High' && (
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#EF4444] bg-[#EF4444]/10 px-2 py-1 rounded-md flex items-center gap-1 border border-[#EF4444]/20">
                    <Zap size={12} className="fill-current" /> Urgent
                  </span>
                )}
              </div>
              
              <h3 className="text-lg font-bold text-[#0F172A] mb-1 leading-snug group-hover:text-[#3B82F6] transition-colors">Looking for {post.role}</h3>
              <p className="text-xs font-bold text-[#3B82F6] mb-3 uppercase tracking-wider">{post.project}</p>
              
              <p className="text-sm text-[#475569] mb-6 line-clamp-3 leading-relaxed">
                {post.desc}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {post.skills.map(skill => (
                  <span key={skill} className="text-[10px] font-bold text-[#64748B] bg-[#F1F5F9] px-2 py-1 rounded-lg">
                    {skill}
                  </span>
                ))}
              </div>
              
              <div className="mt-auto pt-4 border-t border-[#E9ECEF] flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Avatar size="xs" src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${post.author}`} />
                    <div>
                      <p className="text-xs font-bold text-[#0F172A]">{post.author}</p>
                      <p className="text-[10px] font-semibold text-[#94A3B8]">{post.time}</p>
                    </div>
                  </div>
                </div>
                <button className="w-full bg-[#0F172A] text-white py-2.5 rounded-xl text-sm font-bold hover:bg-[#1E293B] transition-colors flex items-center justify-center gap-2">
                  Apply Now <ArrowRight size={16} />
                </button>
              </div>
              
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
