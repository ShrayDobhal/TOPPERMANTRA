import { NavLink } from 'react-router-dom';
import { 
  Users, Sparkles, Star, CalendarDays, Clock, Video, BookOpen, Bookmark
} from 'lucide-react';
import { cn } from '../../../lib/utils';

const navSections = [
  {
    title: 'Discover',
    items: [
      { id: 'recommended', label: 'For You', icon: Sparkles, path: '/dashboard/mentors' },
      { id: 'all', label: 'All Mentors', icon: Users, path: '/dashboard/mentors?tab=all' },
      { id: 'top-rated', label: 'Top Rated', icon: Star, path: '/dashboard/mentors?tab=top' },
    ]
  },
  {
    title: 'My Mentorship',
    items: [
      { id: 'sessions', label: 'My Sessions', icon: CalendarDays, path: '/dashboard/mentors/sessions' },
      { id: 'saved', label: 'Saved Mentors', icon: Bookmark, path: '/dashboard/mentors/saved' },
    ]
  },
  {
    title: 'Events & Resources',
    items: [
      { id: 'office-hours', label: 'Office Hours', icon: Clock, path: '/dashboard/mentors/office-hours' },
      { id: 'ama', label: 'AMA Sessions', icon: Video, path: '/dashboard/mentors/ama' },
      { id: 'resources', label: 'Mentor Resources', icon: BookOpen, path: '/dashboard/mentors/resources' },
    ]
  }
];

export default function MentorSidebar() {
  return (
    <div className="w-64 shrink-0 bg-[#F8FAFC] border-r border-[#E9ECEF] flex flex-col hidden lg:flex h-[calc(100vh-73px)] sticky top-0">
      
      <div className="p-4 border-b border-[#E9ECEF]">
        <h2 className="text-lg font-extrabold text-[#0F172A] flex items-center gap-2">
          <Users className="text-[#A855F7]" size={20} /> Mentors
        </h2>
        <p className="text-xs font-semibold text-[#64748B] mt-1">
          Your guidance ecosystem
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
                  end={item.path === '/dashboard/mentors'}
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
