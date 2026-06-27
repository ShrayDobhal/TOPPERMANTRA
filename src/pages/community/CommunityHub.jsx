import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Users2, Search, Plus, TrendingUp, Calendar, Trophy, MessageSquare, ChevronRight, Flame } from 'lucide-react';
import { cn } from '../../lib/utils';
import { mockChapters, mockPosts, mockEvents } from '../../lib/mockCommunity';

export default function CommunityHub() {
  const [activeTab, setActiveTab] = useState('trending');

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500 pb-20">
      
      {/* Header & Hero */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-[#0F172A] mb-2 flex items-center gap-2">
            <Users2 className="text-[#FF5722]" size={28} />
            Community Ecosystem
          </h1>
          <p className="text-[#64748B] text-sm">Join chapters, discuss ideas, and learn together.</p>
        </div>
        <button className="py-2.5 px-6 bg-[#FF5722] hover:bg-[#E64A19] text-white text-sm font-bold rounded-xl shadow-lg shadow-[#FF5722]/20 transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2 shrink-0">
          <Plus size={18} /> New Post
        </button>
      </div>

      {/* Welcome Back Widget */}
      <div className="bg-gradient-to-r from-[#0F172A] to-[#1E293B] rounded-3xl p-6 sm:p-8 border border-[#334155] shadow-lg flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF5722]/20 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2"></div>
        
        <div className="flex items-center gap-4 relative z-10 w-full sm:w-auto">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#FF5722] to-[#FE6D4D] p-1 flex items-center justify-center shrink-0 shadow-lg">
            <div className="w-full h-full rounded-full border-2 border-[#1E293B] flex items-center justify-center bg-[#0F172A] text-white font-bold text-xl">
              S
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white font-heading">Welcome back, Shray!</h3>
            <p className="text-sm text-white/70 flex items-center gap-2 mt-1">
              <Trophy size={14} className="text-yellow-400" /> Top 5% Contributor this week
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-4 relative z-10">
          <div className="text-center px-4 border-r border-white/10">
            <div className="text-2xl font-bold text-white">4,250</div>
            <div className="text-[10px] font-bold text-white/60 uppercase tracking-wider">Total XP</div>
          </div>
          <div className="text-center px-4">
            <div className="text-2xl font-bold text-white">12</div>
            <div className="text-[10px] font-bold text-white/60 uppercase tracking-wider">Badges</div>
          </div>
        </div>
      </div>

      {/* Joined Communities Carousel */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold font-heading text-[#0F172A]">Your Communities</h2>
          <Link to="/dashboard/community/explore" className="text-sm font-bold text-[#FF5722] hover:text-[#E64A19] flex items-center gap-1">
            Explore All <ChevronRight size={16} />
          </Link>
        </div>
        
        <div className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar">
          {mockChapters.map(chapter => (
            <Link key={chapter.id} to={`/dashboard/community/c/${chapter.id}`} className="shrink-0 w-72">
              <div className="bg-white rounded-2xl border border-[#E9ECEF] shadow-sm hover:shadow-md transition-all group overflow-hidden relative">
                <div className="h-20 w-full relative">
                  <img src={chapter.coverImage} alt={chapter.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                </div>
                <div className="p-4 pt-0 relative">
                  <div className="w-12 h-12 rounded-xl bg-white shadow-sm border border-[#E9ECEF] flex items-center justify-center text-xl absolute -top-6 left-4 z-10 group-hover:-translate-y-1 transition-transform">
                    {chapter.avatar}
                  </div>
                  <div className="mt-8">
                    <h3 className="font-bold text-[#0F172A] group-hover:text-[#FF5722] transition-colors">{chapter.name}</h3>
                    <p className="text-xs text-[#64748B] mt-1 line-clamp-2">{chapter.description}</p>
                    <div className="flex items-center gap-2 mt-3 text-[10px] font-bold text-[#64748B] uppercase tracking-wider">
                      <Users2 size={12} /> {chapter.memberCount.toLocaleString()} Members
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        
        {/* Main Feed */}
        <div className="xl:col-span-8 space-y-6">
          
          <div className="flex items-center gap-2 border-b border-[#E9ECEF]">
            <button 
              onClick={() => setActiveTab('trending')}
              className={cn("px-4 py-3 text-sm font-bold border-b-2 transition-colors", activeTab === 'trending' ? "border-[#FF5722] text-[#FF5722]" : "border-transparent text-[#64748B] hover:text-[#0F172A]")}
            >
              <div className="flex items-center gap-2"><Flame size={16} /> Trending</div>
            </button>
            <button 
              onClick={() => setActiveTab('recent')}
              className={cn("px-4 py-3 text-sm font-bold border-b-2 transition-colors", activeTab === 'recent' ? "border-[#FF5722] text-[#FF5722]" : "border-transparent text-[#64748B] hover:text-[#0F172A]")}
            >
              Recent
            </button>
          </div>

          <div className="space-y-4">
            {mockPosts.map((post, idx) => (
              <motion.div 
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <Link to={`/dashboard/community/post/${post.id}`} className="block">
                  <div className="bg-white rounded-3xl p-5 border border-[#E9ECEF] shadow-sm hover:shadow-md transition-all group">
                    <div className="flex items-start gap-4">
                      
                      {/* Voting Column */}
                      <div className="flex flex-col items-center gap-1 bg-[#F8FAFC] px-2 py-3 rounded-xl border border-[#E9ECEF]">
                        <button className="text-[#94A3B8] hover:text-[#FF5722]"><TrendingUp size={16} /></button>
                        <span className="text-xs font-bold text-[#0F172A]">{post.upvotes}</span>
                      </div>
                      
                      {/* Post Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-5 h-5 rounded-full bg-[#0F172A] text-white flex items-center justify-center text-[10px] font-bold">
                            {post.author.avatar}
                          </div>
                          <span className="text-xs font-bold text-[#0F172A]">{post.author.name}</span>
                          <span className="text-xs text-[#94A3B8]">•</span>
                          <span className="text-xs font-bold text-[#64748B] hover:text-[#FF5722]">{post.communityName}</span>
                          <span className="text-xs text-[#94A3B8]">• {post.timestamp}</span>
                        </div>
                        
                        <h3 className="text-lg font-bold font-heading text-[#0F172A] mb-2 group-hover:text-[#FF5722] transition-colors line-clamp-1">{post.title}</h3>
                        <p className="text-sm text-[#64748B] line-clamp-2 mb-3">{post.content.replace(/[#*`]/g, '')}</p>
                        
                        <div className="flex items-center gap-4 text-[#64748B]">
                          <div className="flex items-center gap-1.5 text-xs font-bold hover:bg-[#F1F5F9] px-2 py-1 rounded-lg transition-colors">
                            <MessageSquare size={14} /> {post.commentCount} Comments
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {post.tags.map(tag => (
                              <span key={tag} className="px-2 py-0.5 bg-[#F1F5F9] text-[#64748B] text-[10px] font-bold uppercase tracking-wider rounded">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="xl:col-span-4 space-y-6">
          
          {/* Upcoming Events */}
          <div className="bg-white rounded-3xl p-6 border border-[#E9ECEF] shadow-sm">
            <h3 className="font-bold font-heading text-[#0F172A] mb-4 flex items-center gap-2">
              <Calendar size={18} className="text-[#FF5722]" /> Upcoming Events
            </h3>
            <div className="space-y-4">
              {mockEvents.map(event => (
                <div key={event.id} className="flex gap-4 group cursor-pointer">
                  <div className="w-12 h-12 rounded-xl bg-[#F8FAFC] border border-[#E9ECEF] flex flex-col items-center justify-center shrink-0 group-hover:border-[#FF5722] transition-colors">
                    <span className="text-[10px] font-bold text-[#64748B] uppercase">{event.date.split(',')[0].slice(0,3)}</span>
                    <span className="text-sm font-bold text-[#0F172A]">{event.date.match(/\d+/)?.[0] || '15'}</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#0F172A] group-hover:text-[#FF5722] transition-colors line-clamp-1">{event.title}</h4>
                    <p className="text-[10px] text-[#64748B] mt-1">{event.community} • {event.type}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 py-2 text-xs font-bold text-[#FF5722] bg-[#FF5722]/10 hover:bg-[#FF5722]/20 rounded-xl transition-colors">
              View All Events
            </button>
          </div>

          {/* Top Contributors Leaderboard */}
          <div className="bg-white rounded-3xl p-6 border border-[#E9ECEF] shadow-sm">
            <h3 className="font-bold font-heading text-[#0F172A] mb-4 flex items-center gap-2">
              <Trophy size={18} className="text-[#FF5722]" /> Top Contributors
            </h3>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="font-bold text-[#94A3B8] w-4 text-center">{i}</div>
                    <div className="w-8 h-8 rounded-full bg-[#0F172A] text-white flex items-center justify-center text-xs font-bold">U{i}</div>
                    <div>
                      <div className="text-sm font-bold text-[#0F172A]">User {i}</div>
                      <div className="text-[10px] text-[#64748B]">NSUT Chapter</div>
                    </div>
                  </div>
                  <div className="text-xs font-bold text-[#FF5722] bg-[#FF5722]/10 px-2 py-1 rounded-md">
                    +{Math.floor(Math.random() * 500) + 100} XP
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
      
    </div>
  );
}
