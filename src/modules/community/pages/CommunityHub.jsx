import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, Hash, Globe, MessageSquare, TrendingUp, ArrowUp,
  ChevronRight, Clock, Tag, AlertCircle, Users, Plus, Filter
} from 'lucide-react';
import { cn } from '../../../lib/utils';
import useHubStore from '../../../store/useHubStore';
import useStudentStore from '../../../store/useStudentStore';

const tagConfig = {
  Doubt: { color: 'bg-[#EF4444]/10 text-[#EF4444] border-[#EF4444]/20', icon: '?' },
  Resource: { color: 'bg-[#3B82F6]/10 text-[#3B82F6] border-[#3B82F6]/20', icon: '📚' },
  Showcase: { color: 'bg-[#A855F7]/10 text-[#A855F7] border-[#A855F7]/20', icon: '🚀' },
  Discussion: { color: 'bg-[#22C55E]/10 text-[#22C55E] border-[#22C55E]/20', icon: '💬' },
};

export default function CommunityHub() {
  const fetchCommunity = useHubStore((s) => s.fetchCommunity);
  useEffect(() => {
    fetchCommunity();
  }, [fetchCommunity]);
  
  const channels = useHubStore((s) => s.channels);
  const posts = useHubStore((s) => s.posts);
  const activeChannelId = useHubStore((s) => s.activeChannelId);
  const setActiveChannel = useHubStore((s) => s.setActiveChannel);
  const upvotePost = useHubStore((s) => s.upvotePost);
  const postsToday = useHubStore((s) => s.postsToday);
  const maxPostsPerDay = useHubStore((s) => s.maxPostsPerDay);
  const getRemainingPosts = useHubStore((s) => s.getRemainingPosts);
  const profile = useStudentStore((s) => s.profile);

  const [search, setSearch] = useState('');
  const [tagFilter, setTagFilter] = useState('all');
  const [showComposer, setShowComposer] = useState(false);
  const [newPost, setNewPost] = useState({ tag: '', title: '', content: '' });

  const activeChannel = channels.find(c => c.id === activeChannelId);

  const filteredPosts = posts
    .filter(p => activeChannelId === 'ch-global' || p.channelId === activeChannelId)
    .filter(p => tagFilter === 'all' || p.tag === tagFilter)
    .filter(p => p.title.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => b.upvotes - a.upvotes);

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-20 p-4 sm:p-6 lg:p-8 max-w-[1200px] mx-auto">

      {/* Ultra Premium Header */}
      <div className="bg-[#FFFFFF] border-b border-[#E9ECEF] pt-8 pb-6 px-6 lg:px-10 mb-8">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-xl bg-[#FFFFFF] border border-[#E9ECEF] flex items-center justify-center shadow-sm">
                <MessageSquare size={20} className="text-[#FE6D4D]" />
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-[#000000] tracking-tight">
                Community Hub
              </h1>
            </div>
            <p className="text-[#B0B0B0] text-base max-w-2xl mt-2 font-medium">
              Join elite discussions, ask doubts, and showcase your builds to the ecosystem.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
            <div className="bg-[#FFFFFF] border border-[#E9ECEF] rounded-xl px-4 py-3 flex items-center gap-4 w-full sm:w-auto shadow-sm">
              <div className={`w-2 h-2 rounded-full ${getRemainingPosts() === 0 ? "bg-[#FF5722] animate-pulse" : "bg-[#FE6D4D]"}`} />
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-[#B0B0B0] uppercase tracking-wider">Daily Limit</span>
                <span className="text-sm font-bold text-[#000000]">
                  <span className={getRemainingPosts() === 0 ? "text-[#FF5722]" : ""}>{getRemainingPosts()} posts</span> remaining
                </span>
              </div>
            </div>
            <button
              onClick={() => setShowComposer(true)}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#FF5722] text-[#FFFFFF] px-8 py-3.5 rounded-xl font-bold hover:bg-[#FE6D4D] transition-all shadow-[0_4px_15px_rgba(255,87,34,0.15)] hover:-translate-y-0.5 active:translate-y-0"
            >
              <Plus size={18} /> New Discussion
            </button>
          </div>
        </div>
      </div>

      {/* Channel Tabs + Search Row */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        {/* Channel Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 w-full sm:w-auto">
          {channels.map(ch => (
            <button
              key={ch.id}
              onClick={() => setActiveChannel(ch.id)}
              className={cn(
                "flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap shrink-0",
                activeChannelId === ch.id
                  ? "bg-[#0F172A] text-white shadow-sm"
                  : "bg-[#F1F5F9] text-[#64748B] hover:bg-[#E2E8F0]"
              )}
            >
              {ch.type === 'global' ? <Globe size={12} /> : <Hash size={12} />}
              {ch.name}
              <span className={cn(
                "px-1.5 py-0.5 rounded-full text-[9px]",
                activeChannelId === ch.id ? "bg-white/20" : "bg-[#E2E8F0]"
              )}>
                {ch.postsToday}
              </span>
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
          <input
            type="text"
            placeholder="Search posts..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-white border border-[#E9ECEF] rounded-xl py-2 pl-9 pr-4 text-xs focus:outline-none focus:border-[#22C55E] focus:ring-1 focus:ring-[#22C55E] transition-all"
          />
        </div>
      </div>

      {/* Tag Filters (Mandatory Post Tags) */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-wider mr-1">Filter:</span>
        <button
          onClick={() => setTagFilter('all')}
          className={cn("text-[10px] font-bold px-3 py-1.5 rounded-lg transition-colors", tagFilter === 'all' ? "bg-[#0F172A] text-white" : "bg-[#F1F5F9] text-[#64748B]")}
        >
          All
        </button>
        {Object.keys(tagConfig).map(tag => (
          <button
            key={tag}
            onClick={() => setTagFilter(tag)}
            className={cn(
              "text-[10px] font-bold px-3 py-1.5 rounded-lg border transition-colors",
              tagFilter === tag ? tagConfig[tag].color : "bg-[#F1F5F9] text-[#64748B] border-transparent"
            )}
          >
            {tagConfig[tag].icon} {tag}
          </button>
        ))}

        {/* New Post Button */}
        <button
          onClick={() => setShowComposer(!showComposer)}
          className="ml-auto flex items-center gap-1.5 bg-[#22C55E] text-white text-xs font-bold px-4 py-2 rounded-xl hover:bg-[#16A34A] transition-colors shadow-sm"
        >
          <Plus size={14} /> New Post
        </button>
      </div>

      {/* Post Composer (with mandatory tag) */}
      <AnimatePresence>
        {showComposer && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-white rounded-[28px] border border-[#E9ECEF] shadow-sm p-6 overflow-hidden"
          >
            <h3 className="text-sm font-bold text-[#0F172A] mb-4">Create a Post</h3>

            {/* Mandatory Tag Selection */}
            <div className="mb-4">
              <p className="text-xs font-bold text-[#64748B] mb-2 flex items-center gap-1">
                <Tag size={12} /> Select a tag <span className="text-[#EF4444]">*</span> (required)
              </p>
              <div className="flex gap-2">
                {Object.keys(tagConfig).map(tag => (
                  <button
                    key={tag}
                    onClick={() => setNewPost(p => ({ ...p, tag }))}
                    className={cn(
                      "text-xs font-bold px-4 py-2 rounded-xl border-2 transition-all",
                      newPost.tag === tag
                        ? `${tagConfig[tag].color} border-current shadow-sm`
                        : "border-[#E9ECEF] text-[#64748B] hover:border-[#CBD5E1]"
                    )}
                  >
                    {tagConfig[tag].icon} {tag}
                  </button>
                ))}
              </div>
            </div>

            <input
              type="text"
              placeholder="Post title..."
              value={newPost.title}
              onChange={e => setNewPost(p => ({ ...p, title: e.target.value }))}
              className="w-full bg-[#F8FAFC] border border-[#E9ECEF] rounded-xl py-2.5 px-4 text-sm font-bold mb-3 focus:outline-none focus:border-[#22C55E] focus:ring-1 focus:ring-[#22C55E]"
            />
            <textarea
              placeholder="Write your post..."
              value={newPost.content}
              onChange={e => setNewPost(p => ({ ...p, content: e.target.value }))}
              className="w-full bg-[#F8FAFC] border border-[#E9ECEF] rounded-xl p-4 text-sm mb-3 focus:outline-none focus:border-[#22C55E] focus:ring-1 focus:ring-[#22C55E] resize-none h-20"
            />
            <div className="flex items-center justify-between">
              <p className="text-[10px] text-[#94A3B8] font-semibold">
                {!newPost.tag && '⚠ You must select a tag before posting'}
              </p>
              <button
                disabled={!newPost.tag || !newPost.title.trim()}
                className={cn(
                  "text-xs font-bold px-5 py-2 rounded-xl transition-all",
                  newPost.tag && newPost.title.trim()
                    ? "bg-[#22C55E] text-white hover:bg-[#16A34A]"
                    : "bg-[#F1F5F9] text-[#94A3B8] cursor-not-allowed"
                )}
              >
                Post
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Posts List (StackOverflow style) */}
      <div className="bg-white rounded-[28px] border border-[#E9ECEF] shadow-sm overflow-hidden">
        <div className="divide-y divide-[#E9ECEF]">
          {filteredPosts.map((post) => (
            <div key={post.id} className="flex gap-4 p-5 hover:bg-[#F8FAFC] transition-colors cursor-pointer group">
              {/* Upvote Column */}
              <div className="flex flex-col items-center gap-1 shrink-0 pt-1">
                <button
                  onClick={(e) => { e.stopPropagation(); upvotePost(post.id); }}
                  className="w-10 h-10 rounded-xl bg-[#F1F5F9] flex items-center justify-center hover:bg-[#22C55E]/10 hover:text-[#22C55E] transition-colors text-[#94A3B8] group/vote"
                >
                  <ArrowUp size={18} />
                </button>
                <span className="text-sm font-extrabold text-[#0F172A]">{post.upvotes}</span>
                <span className="text-[8px] font-bold text-[#94A3B8] uppercase">votes</span>
              </div>

              {/* Post Content */}
              <div className="flex-1 min-w-0">
                {/* Tag + Meta */}
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <span className={cn("text-[9px] font-bold px-2 py-0.5 rounded-full border uppercase tracking-wider", tagConfig[post.tag]?.color)}>
                    {tagConfig[post.tag]?.icon} {post.tag}
                  </span>
                  <span className="text-[10px] text-[#94A3B8] font-semibold">
                    {post.author.name} · Level {post.author.level}
                  </span>
                  <span className="text-[10px] text-[#CBD5E1]">•</span>
                  <span className="text-[10px] text-[#94A3B8] font-semibold flex items-center gap-0.5">
                    <Clock size={9} /> {new Date(post.createdAt).toLocaleDateString()}
                  </span>
                  {post.isCurrentUser && (
                    <span className="text-[9px] font-bold text-[#FF5722] bg-[#FF5722]/10 px-1.5 py-0.5 rounded">You</span>
                  )}
                </div>

                {/* Title */}
                <h3 className="text-base font-bold text-[#0F172A] group-hover:text-[#22C55E] transition-colors mb-1.5 leading-snug">
                  {post.title}
                </h3>

                {/* Content preview */}
                <p className="text-sm text-[#64748B] font-medium line-clamp-2 mb-3">{post.content}</p>

                {/* Footer */}
                <div className="flex items-center gap-4 text-xs text-[#94A3B8] font-semibold">
                  <span className="flex items-center gap-1"><MessageSquare size={12} /> {post.comments} answers</span>
                  <span className="flex items-center gap-1"><TrendingUp size={12} /> {post.author.contributionScore} pts</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="p-12 text-center">
            <p className="text-lg font-bold text-[#0F172A] mb-2">No posts found</p>
            <p className="text-sm text-[#64748B]">Be the first to start a discussion.</p>
          </div>
        )}
      </div>
    </div>
  );
}
