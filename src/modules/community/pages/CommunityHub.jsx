import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Users, MessageSquare, TrendingUp, Search, SlidersHorizontal, Hash, ArrowRight } from 'lucide-react';
import { Avatar } from '../../../components/ui/Avatar';

const trendingSpaces = [
  { id: 'google-swe', name: 'Google SWE Prep', members: 1240, icon: <Hash size={24} className="text-[#3B82F6]" />, bg: 'bg-[#3B82F6]/10' },
  { id: 'ai-builders', name: 'AI Builders', members: 856, icon: <Sparkles size={24} className="text-[#A855F7]" />, bg: 'bg-[#A855F7]/10' },
  { id: 'hack-team', name: 'Hackathon Team', members: 432, icon: <Users size={24} className="text-[#F59E0B]" />, bg: 'bg-[#F59E0B]/10' },
  { id: 'oss-club', name: 'Open Source Club', members: 2100, icon: <TrendingUp size={24} className="text-[#22C55E]" />, bg: 'bg-[#22C55E]/10' },
];

const activeDiscussions = [
  { title: "What's the best way to prepare for DSA interviews in 2024?", author: 'Rahul D.', comments: 45, space: 'Google SWE Prep', time: '2h ago' },
  { title: 'Looking for a UI Designer for an upcoming EdTech Hackathon', author: 'Priya S.', comments: 12, space: 'Hackathon Team', time: '5h ago' },
  { title: 'Just merged my first PR in React! Here is what I learned.', author: 'Alex K.', comments: 89, space: 'Open Source Club', time: '1d ago' },
];

export default function CommunityHub() {
  const [search, setSearch] = useState('');

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20 p-4 sm:p-6 lg:p-8 max-w-[1200px] mx-auto">
      
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-[#0F172A] to-[#1E293B] rounded-[32px] p-8 sm:p-12 border border-[#334155] text-white relative overflow-hidden shadow-lg">
        <div className="absolute right-0 top-0 w-96 h-96 bg-[#3B82F6]/20 blur-[100px] rounded-full translate-x-1/3 -translate-y-1/3"></div>
        <div className="relative z-10 max-w-2xl">
          <h1 className="text-3xl sm:text-5xl font-extrabold font-heading mb-4 leading-tight">
            The Digital Campus for <span className="text-[#3B82F6]">Builders</span>.
          </h1>
          <p className="text-[#94A3B8] text-lg mb-8 font-medium">
            Join spaces, discuss technologies, find teammates, and learn from top mentors in India's largest student network.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94A3B8]" size={20} />
              <input 
                type="text" 
                placeholder="Search spaces, mentors, or topics..." 
                className="w-full bg-white/10 border border-white/20 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-[#94A3B8] focus:outline-none focus:border-[#3B82F6] focus:ring-1 focus:ring-[#3B82F6] transition-all"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <button className="bg-white/10 border border-white/20 px-4 py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-white/20 transition-colors shrink-0">
              <SlidersHorizontal size={20} />
              <span className="font-bold">Filters</span>
            </button>
          </div>
        </div>
      </div>

      {/* Trending Spaces */}
      <div>
        <div className="flex items-center justify-between mb-6 px-2">
          <h2 className="text-2xl font-bold font-heading text-[#0F172A] flex items-center gap-2">
            <TrendingUp className="text-[#FF5722]" size={24} /> Trending Spaces
          </h2>
          <button className="text-sm font-bold text-[#3B82F6] hover:underline">Explore All</button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {trendingSpaces.map(space => (
            <Link key={space.id} to={`/dashboard/spaces/${space.id}`} className="bg-white rounded-3xl p-6 border border-[#E9ECEF] shadow-sm hover:shadow-md hover:border-[#3B82F6]/30 transition-all group flex flex-col items-start cursor-pointer">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110 ${space.bg}`}>
                {space.icon}
              </div>
              <h3 className="text-lg font-bold text-[#0F172A] mb-1 group-hover:text-[#3B82F6] transition-colors">{space.name}</h3>
              <p className="text-sm font-semibold text-[#64748B] flex items-center gap-1.5 mt-auto">
                <Users size={14} /> {space.members.toLocaleString()} members
              </p>
            </Link>
          ))}
        </div>
      </div>

      {/* Active Discussions */}
      <div>
        <h2 className="text-2xl font-bold font-heading text-[#0F172A] mb-6 px-2">Active Discussions</h2>
        <div className="bg-white rounded-3xl border border-[#E9ECEF] shadow-sm overflow-hidden">
          <div className="divide-y divide-[#E9ECEF]">
            {activeDiscussions.map((discussion, i) => (
              <div key={i} className="p-6 hover:bg-[#F8FAFC] transition-colors cursor-pointer group">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[10px] font-bold text-[#3B82F6] uppercase tracking-wider bg-[#3B82F6]/10 px-2 py-0.5 rounded-full">{discussion.space}</span>
                      <span className="text-xs font-semibold text-[#94A3B8]">• Posted by {discussion.author} {discussion.time}</span>
                    </div>
                    <h3 className="text-lg font-bold text-[#0F172A] group-hover:text-[#3B82F6] transition-colors mb-2">
                      {discussion.title}
                    </h3>
                  </div>
                  
                  <div className="flex items-center gap-4 shrink-0">
                    <div className="flex -space-x-2">
                      <Avatar size="sm" src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i}A`} />
                      <Avatar size="sm" src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i}B`} />
                      <Avatar size="sm" src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i}C`} />
                    </div>
                    <div className="flex items-center gap-1.5 text-sm font-bold text-[#64748B] bg-[#F1F5F9] px-3 py-1.5 rounded-xl group-hover:bg-[#3B82F6]/10 group-hover:text-[#3B82F6] transition-colors">
                      <MessageSquare size={16} /> {discussion.comments}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 bg-[#F8FAFC] border-t border-[#E9ECEF] text-center">
            <button className="text-sm font-bold text-[#3B82F6] flex items-center justify-center gap-2 w-full hover:text-[#2563EB] transition-colors">
              Load More Discussions <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
      
    </div>
  );
}
