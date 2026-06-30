import { useState } from 'react';
import { Send, Paperclip, Image as ImageIcon, Smile, Hash, Reply, MoreHorizontal } from 'lucide-react';
import { Avatar } from '../../../../components/ui/Avatar';
import { cn } from '../../../../lib/utils';

const initialMessages = [
  { id: 1, user: 'Alex Kumar', avatar: 'Alex', time: '10:23 AM', text: 'Hey everyone! Welcome to the new space.', role: 'Admin' },
  { id: 2, user: 'Priya Sharma', avatar: 'Priya', time: '10:45 AM', text: 'Thanks! Really excited to start building.', role: 'Student' },
  { id: 3, user: 'Rahul Dev', avatar: 'Rahul', time: '11:15 AM', text: 'Has anyone checked out the new Next.js documentation yet?', role: 'Student' },
  { id: 4, user: 'Sarah Chen', avatar: 'Sarah', time: '11:17 AM', text: 'Yes! The new app router patterns are much cleaner. I can share some resources in the resources channel.', role: 'Mentor' },
];

export default function ChatInterface({ channel }) {
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
      role: 'Student'
    };
    
    setMessages([...messages, newMsg]);
    setInput('');
  };

  return (
    <div className="flex flex-col h-full bg-white">
      
      {/* Header */}
      <div className="h-16 border-b border-[#E9ECEF] flex items-center justify-between px-6 shrink-0 shadow-sm z-10 bg-white hidden md:flex">
        <div className="flex items-center gap-2">
          <channel.icon size={24} className="text-[#94A3B8]" />
          <h3 className="font-extrabold text-[#0F172A] text-lg">{channel.name}</h3>
        </div>
        <div className="flex items-center gap-3">
          {/* Avatar stack of active members in channel */}
          <div className="flex -space-x-2">
            <Avatar size="sm" src="https://api.dicebear.com/7.x/avataaars/svg?seed=U1" />
            <Avatar size="sm" src="https://api.dicebear.com/7.x/avataaars/svg?seed=U2" />
            <Avatar size="sm" src="https://api.dicebear.com/7.x/avataaars/svg?seed=U3" />
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-6 flex flex-col">
        {/* Intro */}
        <div className="mt-auto pt-20 pb-6">
          <div className="w-16 h-16 bg-[#F1F5F9] rounded-full flex items-center justify-center mb-4">
            <Hash size={32} className="text-[#94A3B8]" />
          </div>
          <h2 className="text-3xl font-extrabold text-[#0F172A] mb-2">Welcome to #{channel.name}!</h2>
          <p className="text-[#64748B]">This is the start of the #{channel.name} channel.</p>
        </div>

        <div className="h-px bg-[#E9ECEF] w-full my-4 relative">
          <span className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-4 text-[10px] font-bold text-[#94A3B8] uppercase tracking-wider">Today</span>
        </div>

        {messages.map((msg) => (
          <div key={msg.id} className="flex gap-4 group hover:bg-[#F8FAFC] -mx-6 px-6 py-2 rounded-xl transition-colors">
            <div className="shrink-0 pt-1">
              <Avatar size="md" src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${msg.avatar}`} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-sm font-bold text-[#0F172A] hover:underline cursor-pointer">{msg.user}</span>
                <span className={cn(
                  "text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded",
                  msg.role === 'Admin' ? "bg-[#EF4444]/10 text-[#EF4444]" :
                  msg.role === 'Mentor' ? "bg-[#A855F7]/10 text-[#A855F7]" :
                  "bg-[#3B82F6]/10 text-[#3B82F6]"
                )}>{msg.role}</span>
                <span className="text-xs font-semibold text-[#94A3B8] ml-1">{msg.time}</span>
              </div>
              <p className="text-[15px] text-[#334155] leading-relaxed break-words">
                {msg.text}
              </p>
            </div>
            
            {/* Hover Actions */}
            <div className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 bg-white border border-[#E9ECEF] rounded-lg shadow-sm p-1 absolute right-6 -mt-3">
              <button className="p-1.5 text-[#64748B] hover:bg-[#F1F5F9] rounded-md transition-colors"><Smile size={16} /></button>
              <button className="p-1.5 text-[#64748B] hover:bg-[#F1F5F9] rounded-md transition-colors"><Reply size={16} /></button>
              <button className="p-1.5 text-[#64748B] hover:bg-[#F1F5F9] rounded-md transition-colors"><MoreHorizontal size={16} /></button>
            </div>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="p-4 sm:p-6 shrink-0 bg-white">
        <form onSubmit={handleSend} className="bg-[#F8FAFC] border border-[#E9ECEF] rounded-2xl p-2 flex items-center gap-2 focus-within:border-[#3B82F6] focus-within:ring-1 focus-within:ring-[#3B82F6] transition-all shadow-sm">
          <button type="button" className="p-2 text-[#94A3B8] hover:text-[#0F172A] transition-colors rounded-xl hover:bg-[#E2E8F0]">
            <Paperclip size={20} />
          </button>
          
          <input 
            type="text" 
            placeholder={`Message #${channel.name}`} 
            className="flex-1 bg-transparent border-none focus:outline-none text-sm font-medium text-[#0F172A] placeholder:text-[#94A3B8] px-2"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          
          <button type="button" className="p-2 text-[#94A3B8] hover:text-[#0F172A] transition-colors rounded-xl hover:bg-[#E2E8F0] hidden sm:block">
            <Smile size={20} />
          </button>
          <button 
            type="submit" 
            disabled={!input.trim()}
            className="bg-[#3B82F6] text-white p-2.5 rounded-xl hover:bg-[#2563EB] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_2px_10px_rgba(59,130,246,0.3)]"
          >
            <Send size={18} />
          </button>
        </form>
      </div>

    </div>
  );
}
