import { useState } from 'react';
import { Send, Paperclip, Image as ImageIcon, Smile, MoreVertical, Hash } from 'lucide-react';
import { Avatar } from '../../../../components/ui/Avatar';
import { cn } from '../../../../lib/utils';

const initialMessages = [
  { id: 1, user: 'Alex Kumar', avatar: 'Alex', time: '10:23 AM', text: 'Hey team! I just pushed the initial setup to the main branch.', role: 'owner' },
  { id: 2, user: 'Priya Sharma', avatar: 'Priya', time: '10:45 AM', text: 'Awesome, I will pull it down and start working on the database schema as discussed.', role: 'member' },
  { id: 3, user: 'Sarah Chen', avatar: 'Sarah', time: '11:15 AM', text: 'Good progress. Make sure you use Prisma for the ORM, it will save you a lot of time.', role: 'mentor' },
];

export default function ProjectChat() {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState('');

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    const newMsg = {
      id: Date.now(),
      user: 'Shray Dobhal',
      avatar: 'Shray',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: input,
      role: 'member'
    };
    
    setMessages([...messages, newMsg]);
    setInput('');
  };

  return (
    <div className="bg-white rounded-3xl border border-[#E9ECEF] shadow-sm flex flex-col h-[600px]">
      
      {/* Chat Header */}
      <div className="p-4 sm:p-6 border-b border-[#E9ECEF] flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#F8FAFC] border border-[#E9ECEF] flex items-center justify-center">
            <Hash size={20} className="text-[#64748B]" />
          </div>
          <div>
            <h3 className="text-base font-bold text-[#0F172A]">general</h3>
            <p className="text-xs font-semibold text-[#64748B]">Project wide discussion</p>
          </div>
        </div>
        <button className="text-[#94A3B8] hover:text-[#0F172A] p-2">
          <MoreVertical size={20} />
        </button>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-6">
        {messages.map((msg) => (
          <div key={msg.id} className="flex gap-4">
            <div className="shrink-0">
              <Avatar size="sm" src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${msg.avatar}`} />
            </div>
            <div className="flex-1">
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-sm font-bold text-[#0F172A]">{msg.user}</span>
                <span className={cn(
                  "text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded",
                  msg.role === 'owner' ? "bg-[#FF5722]/10 text-[#FF5722]" :
                  msg.role === 'mentor' ? "bg-[#A855F7]/10 text-[#A855F7]" :
                  "bg-[#F1F5F9] text-[#64748B]"
                )}>{msg.role}</span>
                <span className="text-xs font-semibold text-[#94A3B8] ml-1">{msg.time}</span>
              </div>
              <p className="text-sm font-medium text-[#475569] bg-[#F8FAFC] p-3 rounded-2xl rounded-tl-none border border-[#E9ECEF] inline-block max-w-[80%]">
                {msg.text}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="p-4 sm:p-6 border-t border-[#E9ECEF] shrink-0">
        <form onSubmit={handleSend} className="bg-[#F8FAFC] border border-[#E9ECEF] rounded-2xl p-2 flex items-center gap-2 focus-within:border-[#FF5722] focus-within:ring-1 focus-within:ring-[#FF5722] transition-all shadow-inner">
          <button type="button" className="p-2 text-[#94A3B8] hover:text-[#0F172A] transition-colors rounded-xl hover:bg-[#E2E8F0]">
            <Paperclip size={18} />
          </button>
          <button type="button" className="p-2 text-[#94A3B8] hover:text-[#0F172A] transition-colors rounded-xl hover:bg-[#E2E8F0]">
            <ImageIcon size={18} />
          </button>
          
          <input 
            type="text" 
            placeholder="Message #general..." 
            className="flex-1 bg-transparent border-none focus:outline-none text-sm font-semibold text-[#0F172A] placeholder:text-[#94A3B8] px-2"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          
          <button type="button" className="p-2 text-[#94A3B8] hover:text-[#0F172A] transition-colors rounded-xl hover:bg-[#E2E8F0] hidden sm:block">
            <Smile size={18} />
          </button>
          <button 
            type="submit" 
            disabled={!input.trim()}
            className="bg-[#FF5722] text-white p-2 rounded-xl hover:bg-[#E64A19] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_2px_10px_rgba(255,87,34,0.3)]"
          >
            <Send size={18} />
          </button>
        </form>
      </div>

    </div>
  );
}
