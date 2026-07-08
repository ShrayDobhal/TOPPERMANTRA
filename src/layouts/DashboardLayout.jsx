import { useState, useEffect } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Home, Compass, Map, Briefcase, Users, Target, Users2, Trophy, 
  Folder, FileText, Award, Calendar, MessageSquare, Bell, Settings,
  LogOut, Search, Plus, Menu, X, ChevronRight, Hammer, Shield, AlertTriangle, Flame
} from 'lucide-react';
import { cn } from '../lib/utils';
import { GlobalSearch } from '../components/shared/GlobalSearch';
import { NotificationCenter } from '../components/shared/NotificationCenter';
import useStudentStore from '../store/useStudentStore';
import useProjectForgeStore from '../store/useProjectForgeStore';
import useHubStore from '../store/useHubStore';
import useGamificationStore from '../store/useGamificationStore';
import { useAuth } from '../contexts/AuthContext';

const sidebarLinks = [
  { icon: <Home size={20} />, label: "Mission Control", path: "/dashboard" },
  { icon: <Shield size={20} />, label: "My Cohort", path: "/dashboard/cohort" },
  { icon: <Hammer size={20} />, label: "Project Forge", path: "/dashboard/projects" },
  { icon: <Users2 size={20} />, label: "Community Hub", path: "/dashboard/community" },
  { icon: <Compass size={20} />, label: "My Journey", path: "/dashboard/journey" },
  { icon: <Users size={20} />, label: "Mentors", path: "/dashboard/mentors" },
  { icon: <Target size={20} />, label: "Opportunities", path: "/dashboard/opportunities" },
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
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const profile = useStudentStore((s) => s.profile);
  const alerts = useStudentStore((s) => s.alerts);
  const fetchProfile = useStudentStore((s) => s.fetchProfile);
  
  const subparts = useProjectForgeStore((s) => s.subparts);
  const projects = useProjectForgeStore((s) => s.projects);
  const fetchProjects = useProjectForgeStore((s) => s.fetchProjects);
  
  const posts = useHubStore((s) => s.posts);
  const fetchCommunity = useHubStore((s) => s.fetchCommunity);

  const fetchGamification = useGamificationStore((s) => s.fetchGamification);

  useEffect(() => {
    fetchProfile();
    fetchProjects();
    fetchCommunity();
    fetchGamification();
  }, [fetchProfile, fetchProjects, fetchCommunity, fetchGamification]);

  // Check if profile is incomplete and redirect to onboarding
  useEffect(() => {
    // If the profile has loaded and it has the default college or no college, redirect
    if (profile && profile.id && (profile.college === 'Add your college' || !profile.college)) {
      navigate('/welcome');
    }
  }, [profile, navigate]);

  // Derived state for the sidebar
  const activeClaims = subparts.filter(t => 
    (t.status === 'In Progress' || t.status === 'In Review' || t.status === 'claimed') && 
    (t.assignee_id === profile?.id || t.claimedBy?.id === profile?.id)
  );

  const trendingPosts = [...posts].sort((a, b) => b.upvotes - a.upvotes).slice(0, 2);


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
              {profile?.fullName ? profile.fullName.charAt(0).toUpperCase() : 'S'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-[#0F172A] truncate">{profile?.fullName || 'Student'}</p>
              <p className="text-xs text-[#64748B] truncate">{profile?.rank || 'Novice'}</p>
            </div>
          </div>
          <button 
            onClick={() => signOut()}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-[#64748B] hover:bg-[#FEE2E2] hover:text-[#EF4444] transition-colors"
          >
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
              {profile?.fullName ? profile.fullName.charAt(0).toUpperCase() : 'S'}
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
        
        {/* 1. Cohort Activity (Only visible on Cohort page) */}
        {location.pathname === '/dashboard/cohort' && (
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-heading font-bold text-[#0F172A] text-sm uppercase tracking-wider">Batch Pulse</h3>
            </div>
            <div className="bg-[#F8FAFC] rounded-xl p-4 border border-[#E9ECEF] shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-bold text-[#0F172A]">47/50 Active</span>
                <span className="text-xs font-bold text-[#22C55E]">Healthy</span>
              </div>
              <div className="w-full bg-[#E2E8F0] rounded-full h-1.5 mb-3 overflow-hidden">
                <div className="bg-[#22C55E] h-1.5 rounded-full" style={{ width: '94%' }}></div>
              </div>
              <p className="text-xs font-semibold text-[#64748B]">Your rank: <span className="text-[#3B82F6] font-bold">#14</span></p>
            </div>
          </div>
        )}

        {/* 2. Claimed Tasks */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-heading font-bold text-[#0F172A] text-sm uppercase tracking-wider">Active Claims</h3>
          </div>
          <div className="space-y-3">
            {activeClaims.length > 0 ? activeClaims.map(claim => {
              const proj = projects.find(p => p.id === claim.project_id);
              return (
                <Link to="/dashboard/projects" key={claim.id} className="block bg-white rounded-xl p-3 border border-[#E9ECEF] border-l-4 border-l-[#F59E0B] shadow-sm group cursor-pointer hover:border-[#F59E0B] transition-colors">
                  <p className="text-xs font-bold text-[#3B82F6] mb-1">{proj ? proj.title : 'Project'}</p>
                  <p className="text-sm font-bold text-[#0F172A] mb-2">{claim.title}</p>
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="text-[#F59E0B] flex items-center gap-1">In Progress</span>
                    <span className="text-[#64748B]">{claim.estimated_hours || 8} Hrs</span>
                  </div>
                </Link>
              );
            }) : (
              <div className="text-sm text-gray-500 italic p-3 bg-white rounded-xl border border-[#E9ECEF]">No active tasks.</div>
            )}
          </div>
        </div>

        {/* 3. Custodian Alerts */}
        <div className="mb-6">
          <h3 className="font-heading font-bold text-[#0F172A] text-sm uppercase tracking-wider mb-3 flex items-center gap-2">
            Custodian Bot
          </h3>
          {alerts && alerts.length > 0 ? alerts.map(alert => (
            <div key={alert.id} className="bg-[#FFF1F2] border border-[#FECDD3] rounded-xl p-3 shadow-sm mb-2">
              <div className="flex items-start gap-2">
                <div className="mt-0.5 text-[#E11D48]"><AlertTriangle size={16} /></div>
                <div>
                  <p className="text-sm font-bold text-[#9F1239]">{alert.title}</p>
                  <p className="text-xs font-semibold text-[#BE123C] mt-1 leading-snug">
                    {alert.message}
                  </p>
                </div>
              </div>
            </div>
          )) : (
            <div className="text-sm text-gray-500 italic p-3 bg-white rounded-xl border border-[#E9ECEF]">All systems go. No warnings.</div>
          )}
        </div>

        {/* 4. Community Trending */}
        <div className="mb-6">
          <h3 className="font-heading font-bold text-[#0F172A] text-sm uppercase tracking-wider mb-3">Trending Discussions</h3>
          <div className="space-y-3">
            {trendingPosts.length > 0 ? trendingPosts.map((topic, i) => (
              <Link to="/dashboard/community" key={topic.id || i} className="block group cursor-pointer">
                <p className="text-xs font-bold text-[#3B82F6] mb-0.5">#{topic.tag}</p>
                <p className="text-sm font-semibold text-[#0F172A] leading-snug group-hover:text-[#FF5722] transition-colors line-clamp-2">{topic.title}</p>
                <p className="text-[10px] text-[#64748B] mt-1">{topic.upvotes} upvotes</p>
              </Link>
            )) : (
              <div className="text-sm text-gray-500 italic p-3">No active discussions.</div>
            )}
          </div>
        </div>

        {/* 5. Streak Calendar */}
        <div className="flex-1 flex flex-col min-h-[150px]">
          <h3 className="font-heading font-bold text-[#0F172A] text-sm uppercase tracking-wider mb-3 flex items-center justify-between">
            Activity Streak
            <Flame size={16} className={profile?.streak > 0 ? "text-[#F97316]" : "text-gray-300"} />
          </h3>
          <div className="bg-white border border-[#E9ECEF] rounded-xl p-4 shadow-sm">
            <div className="grid grid-cols-7 gap-1">
              {Array.from({ length: 14 }).map((_, i) => {
                // If streak >= 14 - i, they were active
                const isActive = (14 - i) <= (profile?.streak || 0);
                return (
                  <div 
                    key={i} 
                    className={cn(
                      "w-6 h-6 rounded-md m-auto",
                      isActive ? "bg-[#F97316]" : "bg-[#F1F5F9]"
                    )}
                    title={isActive ? "Active day" : "Missed day"}
                  />
                );
              })}
            </div>
            <p className="text-center text-xs font-bold text-[#64748B] mt-3">{profile?.streak || 0} Day Streak 🔥</p>
          </div>
        </div>
      </aside>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-[#E9ECEF] z-40 flex items-center justify-around py-2 px-4 pb-safe">
        {[
          { icon: <Home size={24} />, path: "/dashboard", id: "home" },
          { icon: <Shield size={24} />, path: "/dashboard/cohort", id: "cohort" },
          { icon: <Hammer size={24} />, path: "/dashboard/projects", id: "projects" },
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
