import { NavLink } from 'react-router-dom';
import { Compass, Folder, FolderOpen, Trophy, Microscope, GitBranch, GitPullRequest, Bookmark, Archive, Plus } from 'lucide-react';
import { cn } from '../../../lib/utils';

const navItems = [
  { label: 'Discover', icon: Compass, to: '/dashboard/projects', end: true },
  { label: 'My Projects', icon: Folder, to: '/dashboard/projects/my-projects' },
  { label: 'Open Projects', icon: FolderOpen, to: '/dashboard/projects/open' },
  { label: 'Hackathon Projects', icon: Trophy, to: '/dashboard/projects/hackathon' },
  { label: 'Research Projects', icon: Microscope, to: '/dashboard/projects/research' },
  { label: 'Open Source', icon: GitBranch, to: '/dashboard/projects/opensource' },
];

const secondaryItems = [
  { label: 'My Contributions', icon: GitPullRequest, to: '/dashboard/projects/contributions' },
  { label: 'Bookmarks', icon: Bookmark, to: '/dashboard/projects/bookmarks' },
  { label: 'Archived', icon: Archive, to: '/dashboard/projects/archived' },
];

export default function ProjectSidebar() {
  return (
    <div className="w-64 shrink-0 bg-white border-r border-[#E9ECEF] flex flex-col h-full sticky top-[73px]" style={{ height: 'calc(100vh - 73px)' }}>
      
      <div className="p-4 border-b border-[#E9ECEF]">
        <button className="w-full flex items-center justify-center gap-2 bg-[#FF5722] text-white py-2.5 rounded-xl font-bold hover:bg-[#E64A19] transition-all shadow-[0_2px_10px_rgba(255,87,34,0.3)] hover:-translate-y-0.5">
          <Plus size={18} /> New Project
        </button>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar py-4">
        
        {/* Main Navigation */}
        <div className="px-3 mb-6">
          <p className="px-3 mb-2 text-[10px] font-bold text-[#94A3B8] uppercase tracking-wider">Explore</p>
          <nav className="space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.label}
                to={item.to}
                end={item.end}
                className={({ isActive }) => cn(
                  "flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-semibold transition-colors group",
                  isActive 
                    ? "bg-[#FF5722]/10 text-[#FF5722]" 
                    : "text-[#64748B] hover:bg-[#F1F5F9] hover:text-[#0F172A]"
                )}
              >
                <item.icon size={18} className="shrink-0" />
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Secondary Navigation */}
        <div className="px-3">
          <p className="px-3 mb-2 text-[10px] font-bold text-[#94A3B8] uppercase tracking-wider">Library</p>
          <nav className="space-y-1">
            {secondaryItems.map((item) => (
              <NavLink
                key={item.label}
                to={item.to}
                className={({ isActive }) => cn(
                  "flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-semibold transition-colors group",
                  isActive 
                    ? "bg-[#FF5722]/10 text-[#FF5722]" 
                    : "text-[#64748B] hover:bg-[#F1F5F9] hover:text-[#0F172A]"
                )}
              >
                <item.icon size={18} className="shrink-0" />
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>

      </div>

      <div className="p-4 border-t border-[#E9ECEF] bg-[#F8FAFC]">
        <div className="bg-white p-3 rounded-xl border border-[#E9ECEF] flex items-center justify-between shadow-sm cursor-pointer hover:border-[#FF5722]/30 transition-colors">
          <div className="flex items-center gap-2">
            <Trophy size={16} className="text-[#F59E0B]" />
            <div>
              <p className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-wider">Builder Score</p>
              <p className="text-sm font-bold text-[#0F172A]">1,240 XP</p>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
}
