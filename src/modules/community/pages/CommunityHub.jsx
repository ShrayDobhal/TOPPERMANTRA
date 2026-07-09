import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, Hash, Globe, MessageSquare, TrendingUp, ArrowUp,
  ChevronRight, Clock, Tag, AlertCircle, Users, Plus, Filter, Sparkles, Image as ImageIcon,
  HelpCircle, BookOpen, Rocket, MessageCircle
} from 'lucide-react';
import { cn } from '../../../lib/utils';
import useHubStore from '../../../store/useHubStore';
import useStudentStore from '../../../store/useStudentStore';

const tagConfig = {
  Doubt: { color: 'bg-gradient-to-r from-red-500/10 to-rose-500/10 text-rose-600 border-rose-200', iconColor: 'text-rose-500', icon: HelpCircle },
  Resource: { color: 'bg-gradient-to-r from-blue-500/10 to-cyan-500/10 text-blue-600 border-blue-200', iconColor: 'text-blue-500', icon: BookOpen },
  Showcase: { color: 'bg-gradient-to-r from-purple-500/10 to-fuchsia-500/10 text-purple-600 border-purple-200', iconColor: 'text-purple-500', icon: Rocket },
  Discussion: { color: 'bg-gradient-to-r from-emerald-500/10 to-teal-500/10 text-emerald-600 border-emerald-200', iconColor: 'text-emerald-500', icon: MessageCircle },
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
  const createPost = useHubStore((s) => s.createPost);
  const postsToday = useHubStore((s) => s.postsToday);
  const maxPostsPerDay = useHubStore((s) => s.maxPostsPerDay);
  const getRemainingPosts = useHubStore((s) => s.getRemainingPosts);
  const comments = useHubStore((s) => s.comments);
  const fetchComments = useHubStore((s) => s.fetchComments);
  const createComment = useHubStore((s) => s.createComment);
  const profile = useStudentStore((s) => s.profile);

  const [search, setSearch] = useState('');
  const [tagFilter, setTagFilter] = useState('all');
  const [showComposer, setShowComposer] = useState(false);
  const [newPost, setNewPost] = useState({ tag: '', title: '', content: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [expandedPostId, setExpandedPostId] = useState(null);
  const [newComment, setNewComment] = useState('');
  const [isCommenting, setIsCommenting] = useState(false);

  const handlePostClick = (postId) => {
    if (expandedPostId === postId) {
      setExpandedPostId(null);
    } else {
      setExpandedPostId(postId);
      fetchComments(postId);
    }
  };

  const handleCommentSubmit = async (postId) => {
    if (!newComment.trim()) return;
    setIsCommenting(true);
    const success = await createComment(postId, newComment);
    setIsCommenting(false);
    if (success) {
      setNewComment('');
    }
  };

  const activeChannel = channels.find(c => c.id === activeChannelId);

  const filteredPosts = posts
    .filter(p => activeChannelId === 'default-global' || p.channelId === activeChannelId)
    .filter(p => tagFilter === 'all' || p.tag === tagFilter)
    .filter(p => p.title.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => b.upvotes - a.upvotes);

  const handlePostSubmit = async () => {
    setIsSubmitting(true);
    const success = await createPost(newPost);
    setIsSubmitting(false);
    if (success) {
      setNewPost({ tag: '', title: '', content: '' });
      setShowComposer(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-20 p-4 sm:p-6 lg:p-8 max-w-[1200px] mx-auto">

      {/* Ultra Premium Header */}
      <div className="relative overflow-hidden rounded-[2.5rem] bg-white border border-slate-200/60 shadow-xl shadow-slate-200/20">
        {/* Background Gradients */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[150%] bg-gradient-to-b from-orange-100/50 to-rose-100/20 blur-3xl rounded-full transform rotate-12 opacity-70" />
          <div className="absolute -bottom-[20%] -left-[10%] w-[40%] h-[100%] bg-gradient-to-tr from-blue-100/40 to-indigo-100/20 blur-3xl rounded-full opacity-60" />
        </div>
        
        <div className="relative z-10 pt-12 pb-10 px-8 lg:px-12">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-600 text-xs font-bold mb-6">
                <Sparkles size={14} className="animate-pulse" />
                <span>TopperMantra Hub</span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-4">
                The Community <br className="hidden sm:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-rose-500">For Builders</span>
              </h1>
              <p className="text-slate-500 text-lg font-medium leading-relaxed">
                Join elite discussions, ask complex doubts, and showcase your best projects to the ecosystem.
              </p>
            </div>

            <div className="flex flex-col w-full lg:w-auto gap-4">
              <div className="bg-white/60 backdrop-blur-md border border-slate-200 rounded-2xl p-5 flex items-center justify-between gap-6 shadow-sm">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Daily Limit</span>
                  <span className="text-lg font-black text-slate-900">
                    <span className={getRemainingPosts() === 0 ? "text-rose-500" : "text-emerald-500"}>{getRemainingPosts()}</span> / {maxPostsPerDay} posts
                  </span>
                </div>
                <div className="h-10 w-[1px] bg-slate-200" />
                <div className="relative">
                  <div className={`absolute -inset-1 rounded-full blur opacity-40 ${getRemainingPosts() > 0 ? "bg-emerald-400" : "bg-rose-400"}`} />
                  <div className={`relative w-3 h-3 rounded-full ${getRemainingPosts() > 0 ? "bg-emerald-500" : "bg-rose-500 animate-pulse"}`} />
                </div>
              </div>

              <button
                onClick={() => setShowComposer(true)}
                className="group relative w-full flex items-center justify-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold hover:bg-slate-800 transition-all overflow-hidden"
              >
                <Plus size={18} className="group-hover:rotate-90 transition-transform duration-300" /> 
                <span>Start Discussion</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        
        {/* Tag Filters */}
        <div className="flex flex-wrap items-center gap-2 bg-white p-2 rounded-2xl border border-slate-200/60 shadow-sm w-full sm:w-auto">
          <button
            onClick={() => setTagFilter('all')}
            className={cn("text-xs font-bold px-4 py-2 rounded-xl transition-all shrink-0", tagFilter === 'all' ? "bg-slate-100 text-slate-900" : "text-slate-500 hover:bg-slate-50")}
          >
            All Posts
          </button>
          <div className="w-[1px] h-4 bg-slate-200 mx-1 hidden sm:block" />
          {Object.keys(tagConfig).map(tag => {
            const Icon = tagConfig[tag].icon;
            return (
              <button
                key={tag}
                onClick={() => setTagFilter(tag)}
                className={cn(
                  "text-xs font-bold px-3 py-2 rounded-xl border transition-all shrink-0 flex items-center gap-1.5",
                  tagFilter === tag ? tagConfig[tag].color : "bg-transparent text-slate-600 border-transparent hover:bg-slate-50"
                )}
              >
                <Icon size={14} className={tagFilter === tag ? "" : tagConfig[tag].iconColor} />
                <span>{tag}</span>
              </button>
            );
          })}
        </div>

        {/* Search */}
        <div className="relative group w-full sm:w-64 shrink-0">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-orange-500 transition-colors" />
          <input
            type="text"
            placeholder="Search discussions..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-white border border-slate-200/60 rounded-2xl py-3 pl-11 pr-4 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-orange-500/50 focus:ring-4 focus:ring-orange-500/10 transition-all shadow-sm"
          />
        </div>
      </div>

      {/* Post Composer */}
      <AnimatePresence>
        {showComposer && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="bg-white rounded-[2rem] border border-slate-200/60 shadow-xl shadow-slate-200/40 p-8 overflow-hidden relative z-20"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-400 via-rose-400 to-purple-400" />
            
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-slate-900">Start a Discussion</h3>
              <button onClick={() => setShowComposer(false)} className="text-slate-400 hover:text-slate-600 font-medium text-sm">Cancel</button>
            </div>

            {/* Mandatory Tag Selection */}
            <div className="mb-6">
              <p className="text-sm font-bold text-slate-600 mb-3 flex items-center gap-1.5">
                <Tag size={14} className="text-orange-500" /> 
                Select a category <span className="text-rose-500">*</span>
              </p>
              <div className="flex flex-wrap gap-3">
                {Object.keys(tagConfig).map(tag => {
                  const Icon = tagConfig[tag].icon;
                  return (
                    <button
                      key={tag}
                      onClick={() => setNewPost(p => ({ ...p, tag }))}
                      className={cn(
                        "text-sm font-bold px-5 py-3 rounded-xl border-2 transition-all flex items-center gap-2",
                        newPost.tag === tag
                          ? `${tagConfig[tag].color} border-current shadow-md scale-105`
                          : "border-slate-100 bg-slate-50 text-slate-600 hover:border-slate-300 hover:bg-white shadow-sm"
                      )}
                    >
                      <Icon size={16} className={newPost.tag === tag ? "" : tagConfig[tag].iconColor} />
                      <span>{tag}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Give your post a descriptive title..."
                value={newPost.title}
                onChange={e => setNewPost(p => ({ ...p, title: e.target.value }))}
                className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl py-4 px-5 text-lg font-bold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-orange-500/30 focus:bg-white focus:ring-4 focus:ring-orange-500/10 transition-all"
              />
              <div className="relative">
                <textarea
                  placeholder="Explain your thoughts in detail..."
                  value={newPost.content}
                  onChange={e => setNewPost(p => ({ ...p, content: e.target.value }))}
                  className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl p-5 text-base font-medium text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-orange-500/30 focus:bg-white focus:ring-4 focus:ring-orange-500/10 transition-all resize-none min-h-[160px]"
                />
                <div className="absolute bottom-4 right-4 flex gap-2">
                   <button className="p-2 text-slate-400 hover:text-slate-600 bg-white rounded-lg border border-slate-200 shadow-sm transition-colors"><ImageIcon size={16} /></button>
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-slate-100">
              <div className="flex items-center gap-2">
                {!newPost.tag && (
                  <span className="text-xs font-bold text-rose-500 bg-rose-50 px-3 py-1.5 rounded-lg flex items-center gap-1.5">
                    <AlertCircle size={14} /> Category required
                  </span>
                )}
                {!newPost.title.trim() && newPost.tag && (
                  <span className="text-xs font-bold text-amber-500 bg-amber-50 px-3 py-1.5 rounded-lg flex items-center gap-1.5">
                    <AlertCircle size={14} /> Title required
                  </span>
                )}
              </div>
              <button
                disabled={!newPost.tag || !newPost.title.trim() || isSubmitting}
                onClick={handlePostSubmit}
                className={cn(
                  "w-full sm:w-auto text-sm font-bold px-8 py-3.5 rounded-xl transition-all flex items-center justify-center gap-2",
                  newPost.tag && newPost.title.trim() && !isSubmitting
                    ? "bg-gradient-to-r from-orange-500 to-rose-500 text-white shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 hover:scale-[1.02] active:scale-95"
                    : "bg-slate-100 text-slate-400 cursor-not-allowed"
                )}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Posting...</span>
                  </>
                ) : (
                  <>
                    <span>Publish Post</span>
                    <ChevronRight size={16} />
                  </>
                )}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Posts Feed */}
      <div className="flex flex-col gap-4">
        <AnimatePresence>
          {filteredPosts.map((post, i) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              key={post.id} 
              className="group bg-white rounded-[2rem] border border-slate-200/60 shadow-sm hover:shadow-xl hover:shadow-slate-200/40 hover:border-slate-300/60 transition-all duration-300 overflow-hidden"
            >
              <div className="flex flex-col sm:flex-row">
                {/* Vote Column */}
                <div className="sm:w-24 bg-slate-50/50 border-b sm:border-b-0 sm:border-r border-slate-100 p-4 flex flex-row sm:flex-col items-center justify-center sm:justify-start gap-2 shrink-0">
                  <button
                    onClick={(e) => { e.stopPropagation(); upvotePost(post.id); }}
                    className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center hover:bg-orange-50 hover:border-orange-200 hover:text-orange-500 transition-all text-slate-400 hover:scale-110 active:scale-95 shadow-sm group/vote"
                  >
                    <ArrowUp size={18} className="group-hover/vote:-translate-y-0.5 transition-transform" />
                  </button>
                  <div className="flex flex-col items-center">
                    <span className="text-lg font-black text-slate-900">{post.upvotes}</span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">votes</span>
                  </div>
                </div>

                {/* Content Area */}
                <div className="flex-1 p-5 sm:p-6 cursor-pointer" onClick={() => handlePostClick(post.id)}>
                  {/* Meta Row */}
                  <div className="flex items-center gap-3 mb-3 flex-wrap">
                    <span className={cn("text-[10px] font-bold px-2.5 py-1 rounded-lg border uppercase tracking-wider flex items-center gap-1.5", tagConfig[post.tag]?.color)}>
                      {tagConfig[post.tag]?.icon && (
                        (() => {
                          const Icon = tagConfig[post.tag].icon;
                          return <Icon size={12} />;
                        })()
                      )}
                      <span>{post.tag}</span>
                    </span>
                    
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-slate-200 to-slate-300 flex items-center justify-center text-[10px] font-bold text-slate-600">
                        {post.author.name.charAt(0)}
                      </div>
                      <span className="text-xs font-bold text-slate-700">
                        {post.author.name}
                      </span>
                      <span className="px-1.5 py-0.5 rounded bg-amber-100 text-amber-700 text-[9px] font-bold">
                        LVL {post.author.level}
                      </span>
                    </div>

                    <span className="text-slate-300">•</span>
                    
                    <span className="text-xs text-slate-400 font-semibold flex items-center gap-1">
                      <Clock size={12} /> {new Date(post.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                    </span>

                    {post.isCurrentUser && (
                      <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-lg ml-auto">
                        Your Post
                      </span>
                    )}
                  </div>

                  {/* Title & Body */}
                  <h3 className="text-xl font-black text-slate-900 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-orange-500 group-hover:to-rose-500 transition-all duration-300 mb-2 leading-tight">
                    {post.title}
                  </h3>
                  <p className="text-base text-slate-500 font-medium line-clamp-2 mb-4 leading-relaxed">
                    {post.content}
                  </p>

                  {/* Footer Stats */}
                  <div className="flex items-center gap-6 mt-auto pt-4 border-t border-slate-100/60">
                    <span className="flex items-center gap-1.5 text-sm font-bold text-slate-400 group-hover:text-slate-600 transition-colors">
                      <MessageSquare size={16} /> 
                      <span>{post.comments} <span className="font-medium text-xs">answers</span></span>
                    </span>
                    <span className="flex items-center gap-1.5 text-sm font-bold text-slate-400 group-hover:text-amber-500 transition-colors">
                      <TrendingUp size={16} /> 
                      <span>{post.author.contributionScore} <span className="font-medium text-xs">pts</span></span>
                    </span>
                  </div>

                  {/* Expanded Comments Section */}
                  <AnimatePresence>
                    {expandedPostId === post.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-6 pt-6 border-t border-slate-200"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <h4 className="text-sm font-bold text-slate-900 mb-4">Discussions ({post.comments})</h4>
                        
                        {/* Comments List */}
                        <div className="space-y-4 mb-6">
                          {comments[post.id]?.map(comment => (
                            <div key={comment.id} className="bg-slate-50 p-4 rounded-2xl flex gap-3 border border-slate-100">
                              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-slate-200 to-slate-300 flex items-center justify-center text-xs font-bold text-slate-600 shrink-0">
                                {comment.author.name.charAt(0)}
                              </div>
                              <div>
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="text-sm font-bold text-slate-900">{comment.author.name}</span>
                                  <span className="px-1.5 py-0.5 rounded bg-amber-100 text-amber-700 text-[9px] font-bold">
                                    LVL {comment.author.level}
                                  </span>
                                  <span className="text-[10px] font-bold text-slate-400 ml-1">
                                    {new Date(comment.createdAt).toLocaleDateString()}
                                  </span>
                                </div>
                                <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-wrap">{comment.content}</p>
                              </div>
                            </div>
                          ))}
                          {(!comments[post.id] || comments[post.id].length === 0) && (
                            <p className="text-sm text-slate-400 font-medium text-center py-4 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                              No answers yet. Be the first to reply!
                            </p>
                          )}
                        </div>

                        {/* Comment Input */}
                        <div className="flex gap-3">
                          <input
                            type="text"
                            placeholder="Write an answer..."
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') handleCommentSubmit(post.id);
                            }}
                            className="flex-1 bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/10 transition-all shadow-sm"
                          />
                          <button
                            onClick={() => handleCommentSubmit(post.id)}
                            disabled={!newComment.trim() || isCommenting}
                            className="bg-slate-900 text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
                          >
                            {isCommenting ? 'Posting...' : 'Reply'}
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {filteredPosts.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center p-16 text-center bg-white rounded-[2rem] border border-slate-200/60 shadow-sm border-dashed"
          >
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
              <Search size={24} className="text-slate-300" />
            </div>
            <p className="text-xl font-black text-slate-900 mb-2">No discussions found</p>
            <p className="text-base font-medium text-slate-500 max-w-sm">
              We couldn't find any posts matching your criteria. Try adjusting your filters or be the first to start a new discussion!
            </p>
            <button 
              onClick={() => {
                setSearch('');
                setTagFilter('all');
                setShowComposer(true);
              }}
              className="mt-6 text-sm font-bold text-orange-500 hover:text-orange-600 bg-orange-50 px-6 py-2.5 rounded-xl transition-colors"
            >
              Start a Discussion
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}

