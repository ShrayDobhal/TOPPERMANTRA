import { MessageSquare, ArrowUp, MessageCircle, Share2, Plus, Filter } from 'lucide-react';
import { Avatar } from '../../../../components/ui/Avatar';

const discussions = [
  { 
    id: 1, 
    title: 'How do you structure a scalable React application in 2024?', 
    content: 'I have been using the standard create-react-app structure for a while, but as my projects grow, they become hard to manage. What is the current industry standard for structuring a large Next.js or Vite React application? Should I organize by feature or by file type?',
    author: 'Rahul Dev', 
    avatar: 'Rahul',
    role: 'Student',
    time: '2 hours ago',
    upvotes: 142,
    comments: 34,
    tags: ['React', 'Architecture', 'Next.js']
  },
  { 
    id: 2, 
    title: 'Poll: Which state management library do you prefer?', 
    content: 'Just curious what everyone is using in production these days. I have been using Redux Toolkit, but Zustand looks very tempting.',
    author: 'Priya Sharma', 
    avatar: 'Priya',
    role: 'Lead',
    time: '5 hours ago',
    upvotes: 89,
    comments: 56,
    tags: ['Poll', 'State Management']
  }
];

export default function DiscussionsFeed() {
  return (
    <div className="flex flex-col h-full bg-white">
      
      {/* Header */}
      <div className="p-6 border-b border-[#E9ECEF] flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0 shadow-sm z-10 bg-white">
        <div>
          <h2 className="text-xl font-extrabold text-[#0F172A] flex items-center gap-2">
            <MessageSquare className="text-[#3B82F6]" size={24} /> Discussions
          </h2>
          <p className="text-sm font-semibold text-[#64748B]">Ask questions, run polls, and share knowledge.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="bg-[#F8FAFC] border border-[#E9ECEF] px-4 py-2 rounded-xl text-sm font-bold text-[#64748B] hover:text-[#0F172A] hover:bg-[#F1F5F9] transition-colors flex items-center gap-2">
            <Filter size={16} /> Sort by Top
          </button>
          <button className="bg-[#3B82F6] text-white px-4 py-2 rounded-xl font-bold hover:bg-[#2563EB] transition-colors flex items-center gap-2 shadow-sm">
            <Plus size={18} /> New Post
          </button>
        </div>
      </div>

      {/* Feed */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-0 sm:p-6 bg-[#F8FAFC]">
        <div className="max-w-3xl mx-auto space-y-4">
          {discussions.map((post) => (
            <div key={post.id} className="bg-white border border-[#E9ECEF] rounded-2xl p-4 sm:p-6 shadow-sm hover:border-[#3B82F6]/30 transition-colors cursor-pointer group">
              
              <div className="flex items-start gap-4">
                {/* Upvote Column */}
                <div className="flex flex-col items-center gap-1 shrink-0">
                  <button className="p-1 text-[#94A3B8] hover:text-[#FF5722] hover:bg-[#FF5722]/10 rounded transition-colors">
                    <ArrowUp size={20} strokeWidth={3} />
                  </button>
                  <span className="text-sm font-extrabold text-[#0F172A]">{post.upvotes}</span>
                </div>
                
                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <Avatar size="xs" src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${post.avatar}`} />
                    <span className="text-xs font-bold text-[#0F172A]">{post.author}</span>
                    <span className="text-[9px] font-bold uppercase tracking-wider text-[#3B82F6] bg-[#3B82F6]/10 px-1.5 py-0.5 rounded">{post.role}</span>
                    <span className="text-xs font-semibold text-[#94A3B8]">• {post.time}</span>
                  </div>
                  
                  <h3 className="text-lg font-bold text-[#0F172A] mb-2 leading-snug group-hover:text-[#3B82F6] transition-colors">{post.title}</h3>
                  <p className="text-sm text-[#475569] mb-4 line-clamp-3 leading-relaxed">{post.content}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map(tag => (
                      <span key={tag} className="text-[10px] font-bold text-[#64748B] bg-[#F1F5F9] px-2 py-1 rounded-lg">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center gap-6">
                    <button className="flex items-center gap-2 text-sm font-bold text-[#64748B] hover:text-[#3B82F6] transition-colors">
                      <MessageCircle size={18} /> {post.comments} Comments
                    </button>
                    <button className="flex items-center gap-2 text-sm font-bold text-[#64748B] hover:text-[#3B82F6] transition-colors">
                      <Share2 size={18} /> Share
                    </button>
                  </div>
                </div>
              </div>
              
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
