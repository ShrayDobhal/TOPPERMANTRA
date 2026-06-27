import { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Home, Compass, Map, Briefcase, Users, Target, Users2, Trophy, 
  Folder, FileText, Award, Calendar, MessageSquare, Bell, Settings,
  LogOut, Search, Plus, Menu, X, ChevronRight
} from 'lucide-react';
import { cn } from '../lib/utils';

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
            <div className="relative w-full group">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8] group-focus-within:text-[#FF5722] transition-colors" />
              <input 
                type="text" 
                placeholder="Search mentors, roadmaps, or projects..." 
                className="w-full pl-10 pr-4 py-2 bg-[#F1F5F9] border-transparent focus:bg-white focus:border-[#FF5722]/30 focus:ring-4 focus:ring-[#FF5722]/10 rounded-xl text-sm transition-all outline-none"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-1">
                <kbd className="px-1.5 py-0.5 text-[10px] font-medium text-[#94A3B8] bg-white border border-[#E9ECEF] rounded shadow-sm">Ctrl</kbd>
                <kbd className="px-1.5 py-0.5 text-[10px] font-medium text-[#94A3B8] bg-white border border-[#E9ECEF] rounded shadow-sm">K</kbd>
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
            <button className="w-9 h-9 flex items-center justify-center text-[#64748B] hover:bg-[#F1F5F9] rounded-full transition-colors relative">
              <Bell size={18} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-[#EF4444] rounded-full border-2 border-white"></span>
            </button>
            
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#3B82F6] to-[#8B5CF6] flex items-center justify-center text-white font-bold text-sm shrink-0 ml-2 cursor-pointer ring-2 ring-transparent hover:ring-[#FF5722]/30 transition-all">
              S
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-x-hidden p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
