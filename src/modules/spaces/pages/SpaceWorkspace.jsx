import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Layout, MessageSquare, KanbanSquare, FileText, Calendar, 
  Users, Trophy, Megaphone, Settings, ChevronLeft, Search, Plus, Target
} from 'lucide-react';
import { cn } from '../../../lib/utils';
import { Avatar } from '../../../components/ui/Avatar';

import SpaceOverview from '../components/SpaceOverview';
import SpaceChat from '../components/SpaceChat';
import SpaceProjects from '../components/SpaceProjects';
import SpaceTasks from '../components/SpaceTasks';
import SpaceResources from '../components/SpaceResources';
import SpaceEvents from '../components/SpaceEvents';
import SpaceMembers from '../components/SpaceMembers';
import SpaceLeaderboard from '../components/SpaceLeaderboard';

const navItems = [
  { id: 'overview', label: 'Overview', icon: Layout },
  { id: 'chat', label: 'Chat', icon: MessageSquare },
  { id: 'projects', label: 'Projects', icon: Target },
  { id: 'tasks', label: 'Tasks', icon: KanbanSquare },
  { id: 'resources', label: 'Resources', icon: FileText },
  { id: 'events', label: 'Events', icon: Calendar },
  { id: 'members', label: 'Members', icon: Users },
  { id: 'leaderboard', label: 'Leaderboard', icon: Trophy },
];

export default function SpaceWorkspace() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('overview');

  const space = {
    id: id || 'google-swe',
    name: id === 'google-swe' ? 'Google SWE Prep' : 'AI Builders',
    mission: 'Preparing together for the upcoming Google SWE University Hiring drive.',
    members: 1240,
    online: 45,
    cover: 'bg-gradient-to-r from-[#3B82F6] to-[#A855F7]',
    logo: 'bg-[#0F172A]'
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'overview': return <SpaceOverview />;
      case 'chat': return <SpaceChat />;
      case 'projects': return <SpaceProjects />;
      case 'tasks': return <SpaceTasks />;
      case 'resources': return <SpaceResources />;
      case 'events': return <SpaceEvents />;
      case 'members': return <SpaceMembers />;
      case 'leaderboard': return <SpaceLeaderboard />;
      default: return null;
    }
  };

  return (
    <div className="flex h-full bg-white animate-in fade-in duration-300">
      
      {/* Secondary Sidebar for Space Navigation */}
      <div className="w-64 shrink-0 bg-[#F8FAFC] border-r border-[#E9ECEF] flex flex-col hidden lg:flex h-full">
        
        {/* Space Header */}
        <div className="p-4 border-b border-[#E9ECEF] shrink-0">
          <Link to="/dashboard/community" className="inline-flex items-center gap-1 text-[10px] font-bold text-[#64748B] hover:text-[#0F172A] uppercase tracking-wider mb-4 transition-colors">
            <ChevronLeft size={12} /> Back to Community
          </Link>
          
          <div className="flex items-center gap-3 mb-3">
            <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center shadow-sm shrink-0", space.logo)}>
              <span className="text-white font-extrabold text-lg">{space.name.charAt(0)}</span>
            </div>
            <div className="min-w-0">
              <h2 className="text-base font-extrabold text-[#0F172A] truncate">{space.name}</h2>
              <p className="text-xs font-semibold text-[#64748B] flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E]"></span>
                {space.online} Online
              </p>
            </div>
          </div>
        </div>
        
        {/* Navigation List */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-3 space-y-6">
          
          <div>
            <span className="px-3 text-[10px] font-bold text-[#94A3B8] uppercase tracking-wider mb-2 block">Workspace</span>
            <nav className="space-y-0.5">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={cn(
                    "w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm font-semibold transition-colors group",
                    activeTab === item.id 
                      ? "bg-[#E2E8F0] text-[#0F172A]" 
                      : "text-[#64748B] hover:bg-[#F1F5F9] hover:text-[#0F172A]"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <item.icon size={18} className={cn("shrink-0", activeTab === item.id ? "text-[#0F172A]" : "text-[#94A3B8] group-hover:text-[#64748B]")} />
                    {item.label}
                  </div>
                  {/* Mock notification badge for chat */}
                  {item.id === 'chat' && <span className="bg-[#EF4444] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-md">3</span>}
                </button>
              ))}
            </nav>
          </div>

          <div>
            <span className="px-3 text-[10px] font-bold text-[#94A3B8] uppercase tracking-wider mb-2 block">Admin</span>
            <nav className="space-y-0.5">
              <button className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-semibold text-[#64748B] hover:bg-[#F1F5F9] hover:text-[#0F172A] transition-colors group">
                <Megaphone size={18} className="shrink-0 text-[#94A3B8] group-hover:text-[#64748B]" /> Announcements
              </button>
              <button className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-semibold text-[#64748B] hover:bg-[#F1F5F9] hover:text-[#0F172A] transition-colors group">
                <Settings size={18} className="shrink-0 text-[#94A3B8] group-hover:text-[#64748B]" /> Settings
              </button>
            </nav>
          </div>

        </div>

        {/* User Mini Profile */}
        <div className="p-4 border-t border-[#E9ECEF] shrink-0 bg-white">
          <div className="flex items-center gap-3">
            <Avatar size="sm" src="https://api.dicebear.com/7.x/avataaars/svg?seed=Shray" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-[#0F172A] truncate">Shray Dobhal</p>
              <p className="text-[10px] font-bold text-[#A855F7] uppercase tracking-wider">Owner</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-white relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="h-full w-full absolute inset-0 flex flex-col"
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </div>

    </div>
  );
}
