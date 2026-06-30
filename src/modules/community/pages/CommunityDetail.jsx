import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Users2, Shield, Calendar, Image as ImageIcon, Link as LinkIcon, Send, Trophy, MoreHorizontal, TrendingUp, MessageSquare } from 'lucide-react';
import { cn } from '../../../lib/utils';
import { mockChapters, mockPosts } from '../../../lib/mockCommunity';

export default function CommunityDetail() {
  const { id } = useParams();
  const community = mockChapters.find(c => c.id === id) || mockChapters[0];
  const posts = mockPosts.filter(p => p.communityId === community.id);
  
  const [activeTab, setActiveTab] = useState('feed');
  const [isJoined, setIsJoined] = useState(community.isJoined);

  return (
    <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8 animate-in fade-in duration-500 pb-20">
      
      {/* Navigation */}
      <Link to="/dashboard/community" className="inline-flex items-center gap-2 text-sm font-bold text-[#64748B] hover:text-[#0F172A] transition-colors">
        <ArrowLeft size={16} /> Back to Hub
      </Link>

      {/* Header Profile */}
      <div className="bg-white rounded-3xl border border-[#E9ECEF] shadow-sm overflow-hidden">
        <div className="h-48 sm:h-64 relative">
          <img src={community.coverImage} alt={community.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
        </div>
        
        <div className="px-6 sm:px-8 pb-8 relative">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 -mt-12 sm:-mt-16 mb-4">
            
            <div className="flex items-end gap-6 relative z-10">
              <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl bg-white p-1.5 shadow-lg shrink-0">
                <div className="w-full h-full rounded-xl bg-gradient-to-br from-[#0F172A] to-[#1E293B] text-4xl sm:text-5xl flex items-center justify-center text-white">
                  {community.avatar}
                </div>
              </div>
              <div className="mb-2">
                <h1 className="text-2xl sm:text-4xl font-heading font-extrabold text-[#0F172A]">{community.name}</h1>
                <div className="flex items-center gap-3 text-sm font-bold text-[#64748B] mt-1.5">
                  <span className="flex items-center gap-1.5"><Users2 size={16} /> {community.memberCount.toLocaleString()} Members</span>
                  <span>•</span>
                  <span className="flex items-center gap-1.5 text-emerald-500"><Shield size={16} /> Official Chapter</span>
                </div>
              </div>
            </div>

            <button 
              onClick={() => setIsJoined(!isJoined)}
              className={cn(
                "py-3 px-8 text-sm font-bold rounded-xl shadow-lg transition-all hover:-translate-y-0.5 shrink-0 relative z-10",
                isJoined 
                  ? "bg-[#F1F5F9] text-[#0F172A] shadow-none hover:bg-[#E2E8F0]" 
                  : "bg-[#FF5722] text-white shadow-[#FF5722]/20 hover:bg-[#E64A19]"
              )}
            >
              {isJoined ? 'Joined' : 'Join Chapter'}
            </button>
          </div>
          
          <p className="text-[#64748B] max-w-3xl leading-relaxed">{community.description}</p>
          
          <div className="flex flex-wrap gap-2 mt-6">
            {community.tags.map(tag => (
              <span key={tag} className="px-3 py-1 bg-[#F1F5F9] text-[#64748B] text-[10px] font-bold uppercase tracking-wider rounded-lg">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto custom-scrollbar border-b border-[#E9ECEF] pb-px">
        {['Feed', 'Announcements', 'Events', 'Projects', 'Leaderboard', 'Members'].map(tab => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab.toLowerCase())}
            className={cn(
              "px-5 py-3 text-sm font-bold whitespace-nowrap transition-colors border-b-2",
              activeTab === tab.toLowerCase() 
                ? "border-[#FF5722] text-[#FF5722]" 
                : "border-transparent text-[#64748B] hover:text-[#0F172A]"
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        
        {/* Main Content (Left) */}
        <div className="xl:col-span-8 space-y-6">
          
          {/* Post Composer */}
          {activeTab === 'feed' && isJoined && (
            <div className="bg-white rounded-3xl p-5 border border-[#E9ECEF] shadow-sm flex gap-4">
              <div className="w-10 h-10 rounded-full bg-[#0F172A] text-white flex items-center justify-center text-sm font-bold shrink-0">
                S
              </div>
              <div className="flex-1 space-y-3">
                <input 
                  type="text" 
                  placeholder={`Start a discussion in ${community.name}...`} 
                  className="w-full bg-transparent border-none text-sm placeholder:text-[#94A3B8] focus:outline-none font-medium"
                />
                <div className="flex items-center justify-between pt-2 border-t border-[#F1F5F9]">
                  <div className="flex gap-2">
                    <button className="p-2 text-[#94A3B8] hover:bg-[#F1F5F9] hover:text-[#0F172A] rounded-lg transition-colors" title="Add Image">
                      <ImageIcon size={18} />
                    </button>
                    <button className="p-2 text-[#94A3B8] hover:bg-[#F1F5F9] hover:text-[#0F172A] rounded-lg transition-colors" title="Add Link">
                      <LinkIcon size={18} />
                    </button>
                  </div>
                  <button className="px-4 py-2 bg-[#FF5722] text-white text-xs font-bold rounded-lg flex items-center gap-2 hover:bg-[#E64A19] transition-colors">
                    Post <Send size={14} />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Feed/Posts */}
          {activeTab === 'feed' && (
            <div className="space-y-4">
              {posts.length > 0 ? posts.map((post, idx) => (
                <motion.div 
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Link to={`/dashboard/community/post/${post.id}`} className="block">
                    <div className="bg-white rounded-3xl p-5 border border-[#E9ECEF] shadow-sm hover:shadow-md transition-all group">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#3B82F6] to-[#8B5CF6] text-white flex items-center justify-center text-sm font-bold shadow-sm">
                            {post.author.avatar}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-bold text-[#0F172A]">{post.author.name}</span>
                              {post.author.role === 'Top Contributor' && (
                                <Trophy size={14} className="text-yellow-500" />
                              )}
                            </div>
                            <div className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">{post.timestamp}</div>
                          </div>
                        </div>
                        <button className="text-[#94A3B8] hover:text-[#0F172A] transition-colors">
                          <MoreHorizontal size={20} />
                        </button>
                      </div>

                      <h3 className="text-xl font-bold font-heading text-[#0F172A] mb-3 group-hover:text-[#FF5722] transition-colors">{post.title}</h3>
                      <p className="text-sm text-[#64748B] line-clamp-3 mb-4 leading-relaxed">{post.content.replace(/[#*`]/g, '')}</p>

                      <div className="flex items-center justify-between pt-4 border-t border-[#F1F5F9]">
                        <div className="flex items-center gap-4 text-[#64748B]">
                          <div className="flex items-center gap-2 px-3 py-1.5 bg-[#F8FAFC] rounded-xl hover:bg-[#F1F5F9] transition-colors border border-[#E9ECEF]">
                            <TrendingUp size={16} className="text-[#FF5722]" /> 
                            <span className="text-xs font-bold text-[#0F172A]">{post.upvotes}</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-xs font-bold hover:bg-[#F1F5F9] px-2 py-1.5 rounded-xl transition-colors">
                            <MessageSquare size={16} /> {post.commentCount} Comments
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              )) : (
                <div className="text-center py-12 bg-white rounded-3xl border border-[#E9ECEF] border-dashed">
                  <div className="w-16 h-16 bg-[#F8FAFC] rounded-full flex items-center justify-center mx-auto mb-4 text-[#94A3B8]">
                    <MessageSquare size={24} />
                  </div>
                  <h3 className="font-bold text-[#0F172A] mb-1">No posts yet</h3>
                  <p className="text-sm text-[#64748B]">Be the first to start a discussion in this chapter!</p>
                </div>
              )}
            </div>
          )}

          {activeTab !== 'feed' && (
            <div className="bg-white rounded-3xl p-12 border border-[#E9ECEF] text-center">
              <div className="w-16 h-16 bg-[#F8FAFC] rounded-full flex items-center justify-center mx-auto mb-4 text-[#94A3B8]">
                <Calendar size={24} />
              </div>
              <h3 className="text-lg font-bold text-[#0F172A] mb-2 capitalize">{activeTab} section</h3>
              <p className="text-[#64748B] text-sm">This section is currently being populated.</p>
            </div>
          )}
        </div>

        {/* Sidebar (Right) */}
        <div className="xl:col-span-4 space-y-6">
          <div className="bg-[#0F172A] rounded-3xl p-6 border border-[#334155] shadow-lg text-white">
            <h3 className="text-lg font-bold font-heading mb-4">About Chapter</h3>
            <p className="text-sm text-white/70 leading-relaxed mb-6">
              Connect with alumni, join exclusive hackathons, and form teams for your final year projects through this official college chapter.
            </p>
            <div className="space-y-3 pt-6 border-t border-white/10">
              <div className="flex justify-between items-center text-sm">
                <span className="text-white/60">Created</span>
                <span className="font-bold">Aug 2025</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-white/60">Status</span>
                <span className="text-emerald-400 font-bold">Active</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
