import { NavLink } from 'react-router-dom';
import { 
  Compass, Hash, ShieldAlert, Cpu, Code2, Shield, Cloud, Hexagon, 
  BookOpen, Users, Building, Plus, Search, Mic 
} from 'lucide-react';
import { cn } from '../../../lib/utils';
import { Avatar } from '../../../components/ui/Avatar';

const discoverItems = [
  { label: 'Discover', icon: Compass, to: '/dashboard/community', end: true },
  { label: 'Announcements', icon: ShieldAlert, to: '/dashboard/community/announcements' },
];

const techCommunities = [
  { label: 'AI & ML', icon: Cpu, id: 'ai' },
  { label: 'Web Development', icon: Code2, id: 'web' },
  { label: 'Cyber Security', icon: Shield, id: 'cyber' },
  { label: 'Cloud Computing', icon: Cloud, id: 'cloud' },
  { label: 'Blockchain', icon: Hexagon, id: 'blockchain' },
];

const spaces = [
  { label: 'Google SWE Prep', icon: Hash, id: 'google-swe' },
  { label: 'Hackathon Team', icon: Hash, id: 'hack-team' },
  { label: 'Open Source Club', icon: Hash, id: 'oss-club' },
];

export default function CommunitySidebar() {
  return (
    <div className="w-[280px] shrink-0 bg-white border-r border-[#E9ECEF] flex flex-col h-full sticky top-[73px]" style={{ height: 'calc(100vh - 73px)' }}>
      
      {/* Search Header */}
      <div className="p-4 border-b border-[#E9ECEF]">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" size={16} />
          <input 
            type="text" 
            placeholder="Find communities..." 
            className="w-full bg-[#F8FAFC] border border-[#E9ECEF] rounded-xl py-2 pl-9 pr-3 text-sm font-semibold text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#FF5722] focus:ring-1 focus:ring-[#FF5722] transition-all"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar py-4 space-y-6">
        
        {/* Main Navigation */}
        <div className="px-3">
          <nav className="space-y-0.5">
            {discoverItems.map((item) => (
              <NavLink
                key={item.label}
                to={item.to}
                end={item.end}
                className={({ isActive }) => cn(
                  "flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-semibold transition-colors group",
                  isActive 
                    ? "bg-[#F1F5F9] text-[#0F172A]" 
                    : "text-[#64748B] hover:bg-[#F1F5F9] hover:text-[#0F172A]"
                )}
              >
                <item.icon size={18} className="shrink-0" />
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Tech Communities */}
        <div className="px-3">
          <div className="flex items-center justify-between px-3 mb-2">
            <p className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-wider">Tech Communities</p>
            <button className="text-[#94A3B8] hover:text-[#0F172A] transition-colors"><Plus size={14}/></button>
          </div>
          <nav className="space-y-0.5">
            {techCommunities.map((item) => (
              <NavLink
                key={item.id}
                to={`/dashboard/community/c/${item.id}`}
                className={({ isActive }) => cn(
                  "flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-semibold transition-colors group",
                  isActive 
                    ? "bg-[#F1F5F9] text-[#0F172A]" 
                    : "text-[#64748B] hover:bg-[#F1F5F9] hover:text-[#0F172A]"
                )}
              >
                <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 border border-[#E9ECEF] flex items-center justify-center shrink-0">
                  <item.icon size={12} className={isActive ? "text-[#FF5722]" : "text-[#64748B]"} />
                </div>
                <span className="truncate">{item.label}</span>
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Private Spaces */}
        <div className="px-3">
          <div className="flex items-center justify-between px-3 mb-2">
            <p className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-wider">My Spaces</p>
            <button className="text-[#94A3B8] hover:text-[#0F172A] transition-colors"><Plus size={14}/></button>
          </div>
          <nav className="space-y-0.5">
            {spaces.map((item) => (
              <NavLink
                key={item.id}
                to={`/dashboard/spaces/${item.id}`}
                className={({ isActive }) => cn(
                  "flex items-center justify-between px-3 py-2 rounded-xl text-sm font-semibold transition-colors group",
                  isActive 
                    ? "bg-[#F1F5F9] text-[#0F172A]" 
                    : "text-[#64748B] hover:bg-[#F1F5F9] hover:text-[#0F172A]"
                )}
              >
                <div className="flex items-center gap-3 truncate">
                  <item.icon size={18} className="shrink-0 text-[#94A3B8]" />
                  <span className="truncate">{item.label}</span>
                </div>
                {isActive && <div className="w-2 h-2 rounded-full bg-[#FF5722] shrink-0"></div>}
              </NavLink>
            ))}
          </nav>
        </div>
        
        {/* Voice Rooms */}
        <div className="px-3">
          <p className="px-3 mb-2 text-[10px] font-bold text-[#94A3B8] uppercase tracking-wider">Voice Rooms</p>
          <div className="px-3 py-2 rounded-xl border border-[#E9ECEF] hover:border-[#3B82F6] cursor-pointer transition-colors bg-[#F8FAFC]">
            <div className="flex items-center gap-2 mb-2">
              <Mic size={14} className="text-[#3B82F6]" />
              <span className="text-sm font-bold text-[#0F172A]">Study Lounge</span>
            </div>
            <div className="flex -space-x-2">
              <Avatar size="xs" src="https://api.dicebear.com/7.x/avataaars/svg?seed=J" />
              <Avatar size="xs" src="https://api.dicebear.com/7.x/avataaars/svg?seed=K" />
              <div className="w-6 h-6 rounded-full bg-white border border-[#E9ECEF] flex items-center justify-center text-[8px] font-bold text-[#64748B]">+2</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
