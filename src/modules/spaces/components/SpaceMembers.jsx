import { Users, Search, Mail, Shield } from 'lucide-react';
import { Avatar } from '../../../components/ui/Avatar';
import { cn } from '../../../lib/utils';

const members = [
  { name: 'Shray Dobhal', role: 'Owner', avatar: 'Shray', skills: ['React', 'System Design'], online: true },
  { name: 'Alex Kumar', role: 'Admin', avatar: 'Alex', skills: ['Python', 'DSA'], online: true },
  { name: 'Priya Sharma', role: 'Member', avatar: 'Priya', skills: ['UI/UX', 'Figma'], online: false },
  { name: 'Rahul Dev', role: 'Member', avatar: 'Rahul', skills: ['Node.js', 'AWS'], online: true },
];

export default function SpaceMembers() {
  return (
    <div className="flex flex-col h-full bg-[#F8FAFC]">
      
      {/* Header */}
      <div className="p-6 border-b border-[#E9ECEF] flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0 bg-white shadow-sm z-10">
        <div>
          <h2 className="text-xl font-extrabold text-[#0F172A] flex items-center gap-2 mb-1">
            <Users className="text-[#3B82F6]" size={24} /> Space Members
          </h2>
          <p className="text-sm font-semibold text-[#64748B]">Directory of all 1,240 members in this space.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" size={16} />
            <input 
              type="text" 
              placeholder="Search members..." 
              className="w-full sm:w-64 bg-[#F8FAFC] border border-[#E9ECEF] rounded-xl py-2 pl-9 pr-3 text-sm font-semibold text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#3B82F6] focus:ring-1 focus:ring-[#3B82F6] transition-all"
            />
          </div>
        </div>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
        <div className="max-w-4xl mx-auto bg-white border border-[#E9ECEF] rounded-2xl overflow-hidden shadow-sm">
          <div className="divide-y divide-[#E9ECEF]">
            {members.map((member, i) => (
              <div key={i} className="p-4 sm:p-6 flex items-center justify-between gap-4 hover:bg-[#F8FAFC] transition-colors group">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Avatar size="md" src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${member.avatar}`} />
                    {member.online && <div className="absolute bottom-0 right-0 w-3 h-3 bg-[#22C55E] border-2 border-white rounded-full"></div>}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-sm font-bold text-[#0F172A]">{member.name}</h3>
                      <span className={cn(
                        "text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded flex items-center gap-1",
                        member.role === 'Owner' ? "bg-[#A855F7]/10 text-[#A855F7]" :
                        member.role === 'Admin' ? "bg-[#3B82F6]/10 text-[#3B82F6]" :
                        "bg-[#F1F5F9] text-[#64748B]"
                      )}>
                        {member.role !== 'Member' && <Shield size={10} />}
                        {member.role}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      {member.skills.map(skill => (
                        <span key={skill} className="text-xs font-semibold text-[#64748B] bg-[#F1F5F9] px-2 py-0.5 rounded-md">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2">
                  <button className="bg-white border border-[#E9ECEF] text-[#64748B] p-2 rounded-lg hover:bg-[#F1F5F9] hover:text-[#0F172A] transition-colors shadow-sm">
                    <Mail size={16} />
                  </button>
                  <button className="bg-[#F8FAFC] border border-[#E9ECEF] text-[#0F172A] px-4 py-2 rounded-lg text-sm font-bold hover:bg-[#F1F5F9] transition-colors shadow-sm">
                    Profile
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
