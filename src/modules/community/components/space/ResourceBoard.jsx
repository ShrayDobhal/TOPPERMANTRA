import { FileText, Download, ExternalLink, Search, Plus, Filter, GitBranch as Github, Video as Youtube, PenTool as Figma } from 'lucide-react';
import { Avatar } from '../../../../components/ui/Avatar';

const resources = [
  { title: 'Data Structures Cheatsheet', type: 'PDF', icon: FileText, size: '2.4 MB', author: 'Alex K.', downloads: 124, color: 'text-red-500', bg: 'bg-red-50' },
  { title: 'React Performance Optimization', type: 'Article', icon: ExternalLink, url: '#', author: 'Sarah C.', downloads: 89, color: 'text-blue-500', bg: 'bg-blue-50' },
  { title: 'Authentication Starter Code', type: 'Repo', icon: Github, size: 'GitHub', author: 'Priya S.', downloads: 432, color: 'text-[#0F172A]', bg: 'bg-[#F1F5F9]' },
  { title: 'System Design Interview Prep', type: 'Video', icon: Youtube, url: '#', author: 'Rahul D.', downloads: 312, color: 'text-red-600', bg: 'bg-red-50' },
  { title: 'EdTech App UI Kit', type: 'Design', icon: Figma, size: 'Figma', author: 'Shray D.', downloads: 856, color: 'text-purple-500', bg: 'bg-purple-50' },
];

export default function ResourceBoard() {
  return (
    <div className="flex flex-col h-full bg-white">
      
      {/* Header */}
      <div className="p-6 border-b border-[#E9ECEF] flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0 shadow-sm z-10 bg-white">
        <div>
          <h2 className="text-xl font-extrabold text-[#0F172A] flex items-center gap-2">
            <FileText className="text-[#3B82F6]" size={24} /> Resources
          </h2>
          <p className="text-sm font-semibold text-[#64748B]">Find and share study materials, code, and designs.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" size={16} />
            <input 
              type="text" 
              placeholder="Search resources..." 
              className="w-full sm:w-64 bg-[#F8FAFC] border border-[#E9ECEF] rounded-xl py-2 pl-9 pr-3 text-sm font-semibold text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#3B82F6] focus:ring-1 focus:ring-[#3B82F6] transition-all"
            />
          </div>
          <button className="bg-[#F8FAFC] border border-[#E9ECEF] p-2 rounded-xl text-[#64748B] hover:text-[#0F172A] hover:bg-[#F1F5F9] transition-colors">
            <Filter size={18} />
          </button>
          <button className="bg-[#3B82F6] text-white px-4 py-2 rounded-xl font-bold hover:bg-[#2563EB] transition-colors flex items-center gap-2 shadow-sm">
            <Plus size={18} /> Share
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {resources.map((resource, i) => (
            <div key={i} className="bg-white border border-[#E9ECEF] rounded-2xl p-5 hover:shadow-md hover:border-[#3B82F6]/30 transition-all group flex flex-col cursor-pointer">
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${resource.bg} ${resource.color}`}>
                  <resource.icon size={24} />
                </div>
                <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider bg-[#F8FAFC] px-2 py-1 rounded-lg border border-[#E9ECEF]">
                  {resource.type}
                </span>
              </div>
              
              <h3 className="text-base font-bold text-[#0F172A] mb-1 group-hover:text-[#3B82F6] transition-colors line-clamp-2">
                {resource.title}
              </h3>
              <p className="text-xs font-semibold text-[#64748B] mb-4">
                {resource.size || resource.url}
              </p>
              
              <div className="mt-auto flex items-center justify-between pt-4 border-t border-[#E9ECEF]">
                <div className="flex items-center gap-2">
                  <Avatar size="xs" src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${resource.author}`} />
                  <span className="text-xs font-bold text-[#0F172A]">{resource.author}</span>
                </div>
                <div className="flex items-center gap-1 text-xs font-bold text-[#64748B] group-hover:text-[#3B82F6] transition-colors">
                  <Download size={14} /> {resource.downloads}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
    </div>
  );
}
