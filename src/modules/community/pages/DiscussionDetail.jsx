import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, TrendingUp, TrendingDown, MessageSquare, Share2, Bookmark, MoreHorizontal, CheckCircle2 } from 'lucide-react';
import { cn } from '../../../lib/utils';
import { mockPosts, mockComments } from '../../../lib/mockCommunity';

export default function DiscussionDetail() {
  const { id } = useParams();
  const post = mockPosts.find(p => p.id === id) || mockPosts[0];
  
  const [commentText, setCommentText] = useState('');

  return (
    <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8 animate-in fade-in duration-500 pb-20">
      
      {/* Navigation */}
      <Link to={`/dashboard/community/c/${post.communityId}`} className="inline-flex items-center gap-2 text-sm font-bold text-[#64748B] hover:text-[#0F172A] transition-colors">
        <ArrowLeft size={16} /> Back to {post.communityName}
      </Link>

      {/* Main Post */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E9ECEF] shadow-sm flex gap-4 sm:gap-6">
        
        {/* Voting Column (Desktop) */}
        <div className="hidden sm:flex flex-col items-center gap-2 shrink-0">
          <button className="p-2 text-[#94A3B8] hover:text-[#FF5722] hover:bg-[#F1F5F9] rounded-xl transition-all"><TrendingUp size={24} /></button>
          <span className="text-lg font-extrabold text-[#0F172A]">{post.upvotes}</span>
          <button className="p-2 text-[#94A3B8] hover:text-red-500 hover:bg-[#F1F5F9] rounded-xl transition-all"><TrendingDown size={24} /></button>
        </div>

        {/* Post Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-[#0F172A] text-white flex items-center justify-center text-lg font-bold shadow-sm shrink-0">
                {post.author.avatar}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-base font-bold text-[#0F172A]">{post.author.name}</span>
                  <span className="px-2 py-0.5 bg-[#FF5722]/10 text-[#FF5722] text-[10px] font-bold uppercase tracking-wider rounded-lg">
                    {post.author.role}
                  </span>
                </div>
                <div className="text-xs text-[#64748B] mt-0.5">{post.author.college} • {post.timestamp}</div>
              </div>
            </div>
            <button className="text-[#94A3B8] hover:text-[#0F172A] transition-colors">
              <MoreHorizontal size={20} />
            </button>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold font-heading text-[#0F172A] mb-4 leading-tight">{post.title}</h1>
          
          <div className="prose prose-sm sm:prose-base prose-slate max-w-none mb-6">
            {post.content.split('\n').map((line, i) => {
              if (line.startsWith('###')) return <h3 key={i} className="text-lg font-bold font-heading text-[#0F172A] mt-4 mb-2">{line.replace('### ', '')}</h3>;
              if (line.match(/^\d+\./)) return <li key={i} className="ml-4">{line.replace(/^\d+\.\s/, '')}</li>;
              if (line === '') return <br key={i} />;
              return <p key={i} className="text-[#334155] leading-relaxed">{line}</p>;
            })}
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            {post.tags.map(tag => (
              <span key={tag} className="px-3 py-1 bg-[#F1F5F9] text-[#64748B] text-xs font-bold uppercase tracking-wider rounded-lg">
                {tag}
              </span>
            ))}
          </div>

          {/* Action Bar */}
          <div className="flex items-center gap-2 pt-4 border-t border-[#F1F5F9]">
            {/* Voting (Mobile) */}
            <div className="sm:hidden flex items-center gap-2 bg-[#F8FAFC] px-3 py-1.5 rounded-xl border border-[#E9ECEF] mr-2">
              <button className="text-[#94A3B8] hover:text-[#FF5722]"><TrendingUp size={16} /></button>
              <span className="text-sm font-bold text-[#0F172A]">{post.upvotes}</span>
              <button className="text-[#94A3B8] hover:text-red-500"><TrendingDown size={16} /></button>
            </div>
            
            <button className="flex items-center gap-2 px-4 py-2 hover:bg-[#F1F5F9] rounded-xl text-sm font-bold text-[#64748B] transition-colors">
              <MessageSquare size={16} /> <span className="hidden sm:inline">Reply</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 hover:bg-[#F1F5F9] rounded-xl text-sm font-bold text-[#64748B] transition-colors">
              <Share2 size={16} /> <span className="hidden sm:inline">Share</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 hover:bg-[#F1F5F9] rounded-xl text-sm font-bold text-[#64748B] transition-colors ml-auto">
              <Bookmark size={16} /> <span className="hidden sm:inline">Save</span>
            </button>
          </div>
        </div>
      </div>

      {/* Comments Section */}
      <div className="space-y-6">
        <h3 className="text-xl font-bold font-heading text-[#0F172A] flex items-center gap-2">
          Discussion <span className="text-[#94A3B8] text-sm">({post.commentCount})</span>
        </h3>

        {/* Comment Input */}
        <div className="flex gap-4">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#3B82F6] to-[#8B5CF6] text-white flex items-center justify-center text-sm font-bold shrink-0 shadow-sm mt-1">
            S
          </div>
          <div className="flex-1 bg-white border border-[#E9ECEF] rounded-2xl p-2 shadow-sm focus-within:border-[#FF5722] focus-within:ring-4 focus-within:ring-[#FF5722]/10 transition-all">
            <textarea 
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="What are your thoughts?"
              className="w-full bg-transparent border-none text-sm p-2 resize-none focus:outline-none min-h-[80px]"
            />
            <div className="flex justify-end pt-2">
              <button 
                disabled={!commentText.trim()}
                className="px-6 py-2 bg-[#0F172A] text-white text-sm font-bold rounded-xl shadow-lg disabled:opacity-50 hover:bg-[#1E293B] transition-colors"
              >
                Comment
              </button>
            </div>
          </div>
        </div>

        {/* Comment Thread */}
        <div className="space-y-6 pt-4">
          {mockComments.map(comment => (
            <div key={comment.id} className="flex gap-4">
              
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-[#F8FAFC] border border-[#E9ECEF] text-[#0F172A] flex items-center justify-center text-sm font-bold shrink-0">
                  {comment.author.avatar}
                </div>
                {comment.replies.length > 0 && (
                  <div className="w-0.5 h-full bg-[#E9ECEF] mt-2 rounded-full"></div>
                )}
              </div>

              <div className="flex-1 space-y-4">
                <div className={cn("bg-white border p-4 sm:p-5 rounded-2xl shadow-sm", comment.isAccepted ? "border-emerald-500 shadow-emerald-500/10" : "border-[#E9ECEF]")}>
                  
                  {comment.isAccepted && (
                    <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-500 uppercase tracking-wider mb-3">
                      <CheckCircle2 size={14} /> Accepted Answer
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-[#0F172A]">{comment.author.name}</span>
                      <span className="text-xs text-[#94A3B8]">• {comment.timestamp}</span>
                    </div>
                  </div>
                  
                  <p className="text-sm text-[#334155] leading-relaxed mb-4">{comment.content}</p>
                  
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <button className="text-[#94A3B8] hover:text-[#FF5722] p-1"><TrendingUp size={14} /></button>
                      <span className="text-xs font-bold text-[#64748B]">{comment.upvotes}</span>
                      <button className="text-[#94A3B8] hover:text-red-500 p-1"><TrendingDown size={14} /></button>
                    </div>
                    <button className="text-xs font-bold text-[#64748B] hover:text-[#0F172A] flex items-center gap-1.5 transition-colors">
                      <MessageSquare size={14} /> Reply
                    </button>
                  </div>
                </div>

                {/* Nested Replies */}
                {comment.replies.map(reply => (
                  <div key={reply.id} className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-[#0F172A] text-white flex items-center justify-center text-xs font-bold shrink-0 mt-1">
                      {reply.author.avatar}
                    </div>
                    <div className="flex-1 bg-[#F8FAFC] border border-[#E9ECEF] p-4 rounded-2xl">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm font-bold text-[#0F172A]">{reply.author.name}</span>
                        <span className="px-2 py-0.5 bg-[#0F172A]/10 text-[#0F172A] text-[9px] font-bold uppercase tracking-wider rounded-md">
                          {reply.author.role}
                        </span>
                        <span className="text-xs text-[#94A3B8]">• {reply.timestamp}</span>
                      </div>
                      <p className="text-sm text-[#334155] leading-relaxed">{reply.content}</p>
                    </div>
                  </div>
                ))}

              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
