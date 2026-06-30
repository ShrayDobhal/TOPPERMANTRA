import { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Home, Compass, Map, Briefcase, Users, Target, Users2, Trophy, 
  Folder, FileText, Award, Calendar, MessageSquare, Bell, Settings,
  LogOut, Search, Plus, Menu, X, ChevronRight
} from 'lucide-react';
import { cn } from '../lib/utils';
import { GlobalSearch } from '../components/shared/GlobalSearch';
import { NotificationCenter } from '../components/shared/NotificationCenter';

const sidebarLinks = [
  { icon: <Compass size={20} />, label: "My Journey", path: "/dashboard/journey" },
  { icon: <Home size={20} />, label: "Dashboard", path: "/dashboard" },
  { icon: <Briefcase size={20} />, label: "Projects", path: "/dashboard/projects" },
  { icon: <Users size={20} />, label: "Mentors", path: "/dashboard/mentors" },
  { icon: <Target size={20} />, label: "Opportunities", path: "/dashboard/opportunities" },
  { icon: <Users2 size={20} />, label: "Community", path: "/dashboard/community" },
  { icon: <Trophy size={20} />, label: "Hackathons", path: "/dashboard/hackathons" },
  { icon: <Folder size={20} />, label: "Portfolio", path: "/dashboard/portfolio" },
  { icon: <FileText size={20} />, label: "Resume Builder", path: "/dashboard/resume" },
  { icon: <Award size={20} />, label: "Certificates", path: "/dashboard/certificates" },
  { icon: <Calendar size={20} />, label: "Events", path: "/dashboard/events" },
  { icon: <MessageSquare size={20} />, label: "Messages", path: "/dashboard/messages" },
  { icon: <Bell size={20} />, label: "Notifications", path: "/dashboard/notifications" },
  { icon: <Settings size={20} />, label: "Settings", path: "/dashboard/settings" },
];

export default function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const location = useLocation();

  const currentPathLabel = sidebarLinks.find(link => link.path === location.pathname)?.label || "Dashboard";

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex font-sans">
      
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-[#0F172A]/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Left Sidebar */}
      <aside className={cn(
        "fixed lg:sticky top-0 left-0 h-screen w-[260px] bg-white border-r border-[#E9ECEF] flex flex-col z-50 transition-transform duration-300 ease-in-out",
        isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        {/* Logo Area */}
        <div className="h-16 flex items-center px-6 border-b border-[#E9ECEF]">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-[#FF5722] to-[#FE6D4D] rounded-lg flex items-center justify-center text-white font-bold font-heading text-lg">
              T
            </div>
            <span className="font-heading font-extrabold text-[#0F172A] text-xl tracking-tight">Topper Mantra</span>
          </Link>
          <button 
            className="ml-auto lg:hidden text-[#64748B]"
            onClick={() => setIsSidebarOpen(false)}
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 overflow-y-auto py-4 px-3 custom-scrollbar">
          <div className="space-y-1">
            {sidebarLinks.map((link) => {
              const isActive = link.path === '/dashboard' 
                ? location.pathname === '/dashboard' 
                : location.pathname.startsWith(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 group relative",
                    isActive 
                      ? "text-[#FF5722] bg-[#FF5722]/10" 
                      : "text-[#64748B] hover:bg-[#F1F5F9] hover:text-[#0F172A]"
                  )}
                >
                  {isActive && (
                    <motion.div 
                      layoutId="sidebar-active"
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-[#FF5722] rounded-r-full"
                    />
                  )}
                  <span className={cn("transition-colors", isActive ? "text-[#FF5722]" : "text-[#94A3B8] group-hover:text-[#64748B]")}>
                    {link.icon}
                  </span>
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Bottom Profile Area */}
        <div className="p-4 border-t border-[#E9ECEF]">
          <div className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-[#F1F5F9] transition-colors cursor-pointer mb-2">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#3B82F6] to-[#8B5CF6] flex items-center justify-center text-white font-bold text-sm shrink-0">
              S
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-[#0F172A] truncate">Shray Dobhal</p>
              <p className="text-xs text-[#64748B] truncate">AI Engineer</p>
            </div>
          </div>
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-[#64748B] hover:bg-[#FEE2E2] hover:text-[#EF4444] transition-colors">
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Top Navbar */}
        <header className="h-16 bg-white border-b border-[#E9ECEF] flex items-center justify-between px-4 sm:px-6 sticky top-0 z-30">
          
          {/* Left: Mobile Toggle & Breadcrumb */}
          <div className="flex items-center gap-4">
            <button 
              className="lg:hidden text-[#64748B] hover:text-[#0F172A]"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu size={24} />
            </button>
            
            <div className="hidden sm:flex items-center gap-2 text-sm font-semibold text-[#64748B]">
              <span>Topper Mantra</span>
              <ChevronRight size={14} className="text-[#CBD5E1]" />
              <span className="text-[#0F172A]">{currentPathLabel}</span>
            </div>
          </div>

          {/* Center: Search */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full group" onClick={() => setIsSearchOpen(true)}>
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8] group-hover:text-[#FF5722] transition-colors" />
              <div 
                className="w-full pl-10 pr-4 py-2 bg-[#F1F5F9] hover:bg-[#E2E8F0] rounded-xl text-sm transition-all cursor-pointer flex items-center justify-between text-[#94A3B8]"
              >
                <span>Search mentors, roadmaps, or projects...</span>
                <div className="flex gap-1">
                  <kbd className="px-1.5 py-0.5 text-[10px] font-medium text-[#94A3B8] bg-white border border-[#E9ECEF] rounded shadow-sm">Ctrl</kbd>
                  <kbd className="px-1.5 py-0.5 text-[10px] font-medium text-[#94A3B8] bg-white border border-[#E9ECEF] rounded shadow-sm">K</kbd>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-3">
            <button className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-[#FF5722]/10 text-[#FF5722] rounded-lg text-sm font-bold hover:bg-[#FF5722] hover:text-white transition-colors">
              <Plus size={16} />
              <span>Create</span>
            </button>
            
            <div className="h-6 w-px bg-[#E9ECEF] hidden sm:block mx-1"></div>

            <button className="w-9 h-9 flex items-center justify-center text-[#64748B] hover:bg-[#F1F5F9] rounded-full transition-colors relative">
              <MessageSquare size={18} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-[#EF4444] rounded-full border-2 border-white"></span>
            </button>
            <div className="relative">
              <button 
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className="w-9 h-9 flex items-center justify-center text-[#64748B] hover:bg-[#F1F5F9] rounded-full transition-colors relative"
              >
                <Bell size={18} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-[#EF4444] rounded-full border-2 border-white"></span>
              </button>
              <NotificationCenter isOpen={isNotificationsOpen} onClose={() => setIsNotificationsOpen(false)} />
            </div>
            
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#3B82F6] to-[#8B5CF6] flex items-center justify-center text-white font-bold text-sm shrink-0 ml-2 cursor-pointer ring-2 ring-transparent hover:ring-[#FF5722]/30 transition-all">
              S
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 sm:p-6 lg:p-8 pb-24 lg:pb-8">
          <Outlet />
        </main>
      </div>

      {/* Right Utility Panel (Desktop) */}
      <aside className="hidden xl:flex flex-col w-[300px] bg-white border-l border-[#E9ECEF] h-screen sticky top-0 z-40 p-5 overflow-y-auto custom-scrollbar">
        
        {/* 1. Today's Events */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-heading font-bold text-[#0F172A] text-sm uppercase tracking-wider">Today's Events</h3>
            <button className="text-[#64748B] hover:text-[#FF5722] transition-colors"><Plus size={16} /></button>
          </div>
          <div className="bg-[#F8FAFC] rounded-xl p-3 border border-[#E9ECEF] flex gap-3 hover:border-[#FF5722]/30 transition-colors cursor-pointer group">
            <div className="w-10 h-10 rounded-lg bg-white border border-[#E9ECEF] flex flex-col items-center justify-center shrink-0 shadow-sm">
              <span className="text-[10px] font-bold text-[#EF4444] uppercase">Oct</span>
              <span className="text-sm font-extrabold text-[#0F172A] leading-none mt-0.5">24</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-[#0F172A] truncate group-hover:text-[#FF5722] transition-colors">1:1 with Sarah Chen</p>
              <p className="text-xs font-semibold text-[#64748B]">4:00 PM - 5:00 PM</p>
            </div>
          </div>
        </div>

        {/* 2. Mentor Availability */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-heading font-bold text-[#0F172A] text-sm uppercase tracking-wider">Mentors Online</h3>
          </div>
          <div className="flex -space-x-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="relative w-10 h-10 rounded-full border-2 border-white bg-gradient-to-br from-[#3B82F6] to-[#8B5CF6] flex items-center justify-center text-white text-xs font-bold shadow-sm hover:z-10 hover:-translate-y-1 transition-all cursor-pointer">
                M{i}
                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#22C55E] rounded-full border-2 border-white"></div>
              </div>
            ))}
            <div className="w-10 h-10 rounded-full border-2 border-white bg-[#F1F5F9] flex items-center justify-center text-[#64748B] text-xs font-bold shadow-sm hover:z-10 hover:bg-[#E2E8F0] transition-colors cursor-pointer">
              +5
            </div>
          </div>
        </div>

        {/* 3. Community Trending */}
        <div className="mb-6">
          <h3 className="font-heading font-bold text-[#0F172A] text-sm uppercase tracking-wider mb-3">Trending Discussions</h3>
          <div className="space-y-3">
            {[
              { tag: 'React', title: 'Best state management in 2026?', replies: 42 },
              { tag: 'AI', title: 'Using Gemini API for side projects', replies: 18 },
            ].map((topic, i) => (
              <div key={i} className="group cursor-pointer">
                <p className="text-xs font-bold text-[#3B82F6] mb-0.5">#{topic.tag}</p>
                <p className="text-sm font-semibold text-[#0F172A] leading-snug group-hover:text-[#FF5722] transition-colors line-clamp-2">{topic.title}</p>
                <p className="text-[10px] text-[#64748B] mt-1">{topic.replies} replies</p>
              </div>
            ))}
          </div>
        </div>

        {/* 4. Upcoming Deadlines */}
        <div className="mb-6">
          <h3 className="font-heading font-bold text-[#0F172A] text-sm uppercase tracking-wider mb-3">Deadlines</h3>
          <div className="space-y-2">
            <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#F8FAFC] transition-colors cursor-pointer border border-transparent hover:border-[#E9ECEF]">
              <div className="w-2 h-2 rounded-full bg-[#EF4444]"></div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-[#0F172A] truncate">Stripe Application</p>
                <p className="text-xs text-[#64748B]">Tomorrow</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#F8FAFC] transition-colors cursor-pointer border border-transparent hover:border-[#E9ECEF]">
              <div className="w-2 h-2 rounded-full bg-[#F59E0B]"></div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-[#0F172A] truncate">Project Milestone 2</p>
                <p className="text-xs text-[#64748B]">In 3 days</p>
              </div>
            </div>
          </div>
        </div>

        {/* 5. Quick Notes */}
        <div className="flex-1 flex flex-col min-h-[150px]">
          <h3 className="font-heading font-bold text-[#0F172A] text-sm uppercase tracking-wider mb-3 flex items-center justify-between">
            Quick Notes
            <FileText size={14} className="text-[#64748B]" />
          </h3>
          <textarea 
            placeholder="Jot down ideas, to-dos, or links..."
            className="flex-1 w-full bg-[#FFFBEB] border border-[#FDE68A] rounded-xl p-3 text-sm text-[#0F172A] placeholder:text-[#D97706]/50 focus:outline-none focus:ring-2 focus:ring-[#F59E0B]/30 resize-none custom-scrollbar"
            defaultValue="1. Ask mentor about System Design&#10;2. Update LinkedIn profile&#10;3. Practice Leetcode arrays"
          />
        </div>
      </aside>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-[#E9ECEF] z-40 flex items-center justify-around py-2 px-4 pb-safe">
        {[
          { icon: <Home size={24} />, path: "/dashboard", id: "home" },
          { icon: <Compass size={24} />, path: "/dashboard/journey", id: "journey" },
          { icon: <Briefcase size={24} />, path: "/dashboard/projects", id: "projects" },
          { icon: <Users2 size={24} />, path: "/dashboard/community", id: "community" },
        ].map((item) => (
          <Link
            key={item.id}
            to={item.path}
            className={cn(
              "flex flex-col items-center justify-center p-2 rounded-xl transition-colors",
              location.pathname === item.path || (item.path !== '/dashboard' && location.pathname.startsWith(item.path))
                ? "text-[#FF5722]"
                : "text-[#94A3B8] hover:text-[#64748B]"
            )}
          >
            {item.icon}
          </Link>
        ))}
      </div>

      {/* Mobile FAB */}
      <button className="lg:hidden fixed bottom-20 right-4 w-14 h-14 bg-[#FF5722] rounded-full shadow-[0_4px_14px_0_rgba(255,87,34,0.39)] flex items-center justify-center text-white z-40 active:scale-95 transition-transform">
        <Plus size={24} />
      </button>

      <GlobalSearch isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </div>
  );
}
