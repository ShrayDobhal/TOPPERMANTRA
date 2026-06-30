import { NavLink } from 'react-router-dom';
import { 
  Sparkles, Briefcase, Code, GraduationCap, Microscope, Trophy, 
  Megaphone, Calendar, Lightbulb, Globe, Bookmark, Clock, LayoutDashboard 
} from 'lucide-react';
import { cn } from '../../../lib/utils';

const navSections = [
  {
    title: 'Discover',
    items: [
      { id: 'recommended', label: 'For You', icon: Sparkles, path: '/dashboard/opportunities' },
      { id: 'tracker', label: 'Application Tracker', icon: LayoutDashboard, path: '/dashboard/opportunities/tracker' },
    ]
  },
  {
    title: 'Categories',
    items: [
      { id: 'internships', label: 'Internships', icon: Briefcase, path: '/dashboard/opportunities?category=internships' },
      { id: 'jobs', label: 'Full Time Jobs', icon: Briefcase, path: '/dashboard/opportunities?category=jobs' },
      { id: 'hackathons', label: 'Hackathons', icon: Code, path: '/dashboard/opportunities?category=hackathons' },
      { id: 'scholarships', label: 'Scholarships', icon: GraduationCap, path: '/dashboard/opportunities?category=scholarships' },
      { id: 'research', label: 'Research', icon: Microscope, path: '/dashboard/opportunities?category=research' },
      { id: 'competitions', label: 'Competitions', icon: Trophy, path: '/dashboard/opportunities?category=competitions' },
      { id: 'ambassador', label: 'Campus Ambassador', icon: Megaphone, path: '/dashboard/opportunities?category=ambassador' },
      { id: 'bootcamps', label: 'Bootcamps', icon: Lightbulb, path: '/dashboard/opportunities?category=bootcamps' },
      { id: 'international', label: 'International', icon: Globe, path: '/dashboard/opportunities?category=international' },
    ]
  },
  {
    title: 'Library',
    items: [
      { id: 'bookmarks', label: 'Saved', icon: Bookmark, path: '/dashboard/opportunities/saved' },
      { id: 'history', label: 'History', icon: Clock, path: '/dashboard/opportunities/history' },
    ]
  }
];

export default function DiscoverSidebar() {
  return (
    <div className="w-64 shrink-0 bg-[#F8FAFC] border-r border-[#E9ECEF] flex flex-col hidden lg:flex h-[calc(100vh-73px)] sticky top-0">
      
      <div className="p-4 border-b border-[#E9ECEF]">
        <h2 className="text-lg font-extrabold text-[#0F172A] flex items-center gap-2">
          <Sparkles className="text-[#3B82F6]" size={20} /> Discover
        </h2>
        <p className="text-xs font-semibold text-[#64748B] mt-1">
          Your centralized career engine
        </p>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar p-3 space-y-6">
        {navSections.map((section, idx) => (
          <div key={idx}>
            <span className="px-3 text-[10px] font-bold text-[#94A3B8] uppercase tracking-wider mb-2 block">
              {section.title}
            </span>
            <nav className="space-y-0.5">
              {section.items.map((item) => (
                <NavLink
                  key={item.id}
                  to={item.path}
                  end={item.path === '/dashboard/opportunities'}
                  className={({ isActive }) => cn(
                    "w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-semibold transition-colors group",
                    isActive 
                      ? "bg-[#E2E8F0] text-[#0F172A]" 
                      : "text-[#64748B] hover:bg-[#F1F5F9] hover:text-[#0F172A]"
                  )}
                >
                  {({ isActive }) => (
                    <>
                      <item.icon size={18} className={cn("shrink-0", isActive ? "text-[#0F172A]" : "text-[#94A3B8] group-hover:text-[#64748B]")} />
                      {item.label}
                    </>
                  )}
                </NavLink>
              ))}
            </nav>
          </div>
        ))}
      </div>
      
    </div>
  );
}
