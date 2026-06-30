import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Hash, MessageSquare, FileText, Calendar, Users, Megaphone, Plus, Settings } from 'lucide-react';
import { cn } from '../../../lib/utils';

import ChatInterface from '../components/space/ChatInterface';
import ResourceBoard from '../components/space/ResourceBoard';
import DiscussionsFeed from '../components/space/DiscussionsFeed';
import EventCalendar from '../components/space/EventCalendar';
import TeamFinder from '../components/space/TeamFinder';

const channels = [
  { id: 'announcements', name: 'Announcements', icon: Megaphone, type: 'chat' },
  { id: 'general', name: 'general', icon: Hash, type: 'chat' },
  { id: 'help', name: 'help', icon: Hash, type: 'chat' },
  { id: 'resources', name: 'Resources', icon: FileText, type: 'board' },
  { id: 'discussions', name: 'Discussions', icon: MessageSquare, type: 'feed' },
  { id: 'events', name: 'Events', icon: Calendar, type: 'calendar' },
  { id: 'team-finder', name: 'Team Finder', icon: Users, type: 'finder' },
];

export default function CommunitySpace() {
  const { id } = useParams();
  const [activeChannel, setActiveChannel] = useState(channels[1]); // Default to general

  // Mock Space Data
  const spaceName = id === 'google-swe' ? 'Google SWE Prep' : 
                    id === 'ai' ? 'AI & Machine Learning' : 
                    'Community Space';

  const renderContent = () => {
    switch (activeChannel.type) {
      case 'chat': return <ChatInterface channel={activeChannel} />;
      case 'board': return <ResourceBoard />;
      case 'feed': return <DiscussionsFeed />;
      case 'calendar': return <EventCalendar />;
      case 'finder': return <TeamFinder />;
      default: return null;
    }
  };

  return (
    <div className="flex h-full bg-white animate-in fade-in duration-300">
      
      {/* Space Internal Sidebar (Channels List) */}
      <div className="w-60 shrink-0 bg-[#F8FAFC] border-r border-[#E9ECEF] flex flex-col hidden md:flex h-full">
        <div className="h-16 border-b border-[#E9ECEF] flex items-center justify-between px-4 shrink-0 shadow-sm z-10 bg-white">
          <h2 className="font-extrabold text-[#0F172A] truncate">{spaceName}</h2>
          <button className="text-[#94A3B8] hover:text-[#0F172A] transition-colors"><Settings size={18} /></button>
        </div>
        
        <div className="flex-1 overflow-y-auto custom-scrollbar p-3 space-y-6">
          
          <div>
            <div className="flex items-center justify-between px-2 mb-2">
              <span className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-wider">Information</span>
            </div>
            <div className="space-y-0.5">
              {(() => {
                const FirstIcon = channels[0].icon;
                return (
                  <button 
                    onClick={() => setActiveChannel(channels[0])}
                    className={cn(
                      "w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-sm font-semibold transition-colors",
                      activeChannel.id === channels[0].id ? "bg-[#E2E8F0] text-[#0F172A]" : "text-[#64748B] hover:bg-[#F1F5F9] hover:text-[#0F172A]"
                    )}
                  >
                    <FirstIcon size={16} /> {channels[0].name}
                  </button>
                );
              })()}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between px-2 mb-2">
              <span className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-wider">Text Channels</span>
              <button className="text-[#94A3B8] hover:text-[#0F172A] transition-colors"><Plus size={14} /></button>
            </div>
            <div className="space-y-0.5">
              {channels.slice(1, 3).map(channel => {
                const ChannelIcon = channel.icon;
                return (
                  <button 
                    key={channel.id}
                    onClick={() => setActiveChannel(channel)}
                    className={cn(
                      "w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-sm font-semibold transition-colors",
                      activeChannel.id === channel.id ? "bg-[#E2E8F0] text-[#0F172A]" : "text-[#64748B] hover:bg-[#F1F5F9] hover:text-[#0F172A]"
                    )}
                  >
                    <ChannelIcon size={16} /> {channel.name}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between px-2 mb-2">
              <span className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-wider">Features</span>
            </div>
            <div className="space-y-0.5">
              {channels.slice(3).map(channel => {
                const ChannelIcon = channel.icon;
                return (
                  <button 
                    key={channel.id}
                    onClick={() => setActiveChannel(channel)}
                    className={cn(
                      "w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-sm font-semibold transition-colors",
                      activeChannel.id === channel.id ? "bg-[#E2E8F0] text-[#0F172A]" : "text-[#64748B] hover:bg-[#F1F5F9] hover:text-[#0F172A]"
                    )}
                  >
                    <ChannelIcon size={16} /> {channel.name}
                  </button>
                );
              })}
            </div>
          </div>

        </div>
      </div>

      {/* Main Content Area (Dynamic based on channel) */}
      <div className="flex-1 flex flex-col min-w-0 bg-white relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeChannel.id}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className="h-full w-full absolute inset-0 flex flex-col"
          >
            {/* Mobile Channel Header (Visible only on mobile) */}
            <div className="md:hidden h-14 border-b border-[#E9ECEF] flex items-center px-4 shrink-0 bg-white">
              <span className="font-bold text-[#0F172A] flex items-center gap-2">
                {(() => {
                  const ActiveIcon = activeChannel.icon;
                  return <ActiveIcon size={18} className="text-[#94A3B8]" />;
                })()}
                {activeChannel.name}
              </span>
            </div>

            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </div>

    </div>
  );
}
