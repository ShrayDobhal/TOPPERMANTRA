import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Send, Users, Shield, Clock, Paperclip, MoreVertical, CheckCircle2 } from 'lucide-react';
import { cn } from '../../../lib/utils';
import useCohortStore from '../../../store/useCohortStore';
import useStudentStore from '../../../store/useStudentStore';
import useRoomStore from '../../../store/useRoomStore';

export default function CohortDashboard() {
  const fetchCohort = useCohortStore((s) => s.fetchCohort);
  const cohort = useCohortStore((s) => s.cohort);
  const members = useCohortStore((s) => s.members);
  const profile = useStudentStore((s) => s.profile);
  
  const { messages, fetchMessages, sendMessage, subscribeToMessages } = useRoomStore();
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    fetchCohort();
  }, [fetchCohort]);

  useEffect(() => {
    if (cohort?.id) {
      fetchMessages(cohort.id);
      const channel = subscribeToMessages(cohort.id);
      return () => {
        if (channel) channel.unsubscribe();
      };
    }
  }, [cohort?.id, fetchMessages, subscribeToMessages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !cohort?.id) return;
    sendMessage(cohort.id, newMessage);
    setNewMessage('');
  };

  if (!cohort) {
    return <div className="flex h-full items-center justify-center p-8 text-gray-500">Loading your batch...</div>;
  }

  const mentor = members.find(m => m.user?.role === 'Mentor' || m.status === 'mentor') || { name: cohort.mentor?.name || 'Mentor', role: 'Mentor' };
  const activeMembers = members.filter(m => m.status === 'active' || m.status === 'yellow');

  return (
    <div className="flex h-[calc(100vh-140px)] gap-6 animate-in fade-in duration-500 pb-4">
      
      {/* LEFT: Chat Area */}
      <div className="flex-1 bg-white rounded-3xl border border-[#E9ECEF] shadow-sm flex flex-col overflow-hidden relative">
        {/* Chat Header */}
        <div className="h-16 px-6 border-b border-[#E9ECEF] flex items-center justify-between bg-white z-10">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#3B82F6] to-[#6366F1] flex items-center justify-center shadow-sm">
              <Shield size={20} className="text-white" />
            </div>
            <div>
              <h2 className="text-base font-bold text-[#0F172A]">{cohort.name}</h2>
              <p className="text-xs font-semibold text-[#22C55E] flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E]"></span> Mentor Online
              </p>
            </div>
          </div>
          <button className="text-[#64748B] hover:bg-[#F1F5F9] p-2 rounded-full transition-colors">
            <MoreVertical size={20} />
          </button>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#F8FAFC]">
          {/* Welcome Banner */}
          <div className="bg-[#FFF1F2] border border-[#FECDD3] rounded-xl p-4 text-center max-w-lg mx-auto">
            <p className="text-sm font-bold text-[#9F1239] mb-1">Welcome to your Mentor Room</p>
            <p className="text-xs font-medium text-[#BE123C]">
              All technical discussions and doubts should be posted here. Do not DM the mentor directly. Your participation is tracked.
            </p>
          </div>

          {messages.map((msg, idx) => {
            const isMe = msg.user.id === profile.id;
            const isMentor = msg.user.role === 'Mentor';
            
            return (
              <div key={msg.id || idx} className={cn("flex flex-col", isMe ? "items-end" : "items-start")}>
                {!isMe && (
                  <span className="text-[11px] font-bold text-[#64748B] mb-1 ml-12 flex items-center gap-1">
                    {msg.user.name} 
                    {isMentor && <span className="bg-[#3B82F6] text-white text-[9px] px-1.5 py-0.5 rounded ml-1 uppercase tracking-wider">Mentor</span>}
                  </span>
                )}
                <div className={cn("flex items-end gap-2 max-w-[80%]", isMe ? "flex-row-reverse" : "flex-row")}>
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#CBD5E1] to-[#94A3B8] shrink-0 overflow-hidden flex items-center justify-center text-white text-xs font-bold shadow-sm">
                    {msg.user.avatar ? <img src={msg.user.avatar} alt="avatar" /> : msg.user.name.charAt(0)}
                  </div>
                  <div className={cn(
                    "px-4 py-3 rounded-2xl text-sm shadow-sm",
                    isMe 
                      ? "bg-[#FF5722] text-white rounded-br-sm" 
                      : isMentor
                        ? "bg-[#3B82F6] text-white rounded-bl-sm"
                        : "bg-white border border-[#E9ECEF] text-[#334155] rounded-bl-sm"
                  )}>
                    <p className="whitespace-pre-wrap">{msg.content}</p>
                    <div className={cn("text-[10px] mt-1 text-right font-medium", isMe || isMentor ? "text-white/70" : "text-[#94A3B8]")}>
                      {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white border-t border-[#E9ECEF]">
          <form onSubmit={handleSend} className="flex items-center gap-3 bg-[#F1F5F9] border border-[#E2E8F0] p-2 rounded-2xl focus-within:ring-2 focus-within:ring-[#FF5722]/20 focus-within:border-[#FF5722]/50 transition-all">
            <button type="button" className="p-2 text-[#94A3B8] hover:text-[#64748B] transition-colors rounded-full hover:bg-white shrink-0">
              <Paperclip size={20} />
            </button>
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Ask a doubt or share an update..."
              className="flex-1 bg-transparent text-sm text-[#0F172A] focus:outline-none placeholder:text-[#94A3B8]"
            />
            <button 
              type="submit" 
              disabled={!newMessage.trim()}
              className="w-10 h-10 rounded-xl bg-[#FF5722] flex items-center justify-center text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#E64A19] transition-colors shadow-sm shrink-0"
            >
              <Send size={18} className="ml-1" />
            </button>
          </form>
        </div>
      </div>

      {/* RIGHT: Batch Details (Hidden on small screens) */}
      <div className="hidden lg:flex flex-col w-[320px] gap-4">
        {/* Mentor Info */}
        <div className="bg-white rounded-3xl p-6 border border-[#E9ECEF] shadow-sm flex flex-col items-center text-center">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#3B82F6] to-[#8B5CF6] mb-4 shadow-md flex items-center justify-center text-white text-2xl font-bold border-4 border-white">
            {mentor.name.charAt(0)}
          </div>
          <h3 className="font-bold text-[#0F172A] text-lg">{mentor.name}</h3>
          <p className="text-sm font-semibold text-[#3B82F6] mb-4">Batch Mentor</p>
          <div className="w-full bg-[#F8FAFC] border border-[#E9ECEF] rounded-xl p-3 flex items-center justify-center gap-2 text-xs font-bold text-[#64748B]">
            <Clock size={14} /> Available: 6 PM - 8 PM
          </div>
        </div>

        {/* Batch Members */}
        <div className="bg-white rounded-3xl p-6 border border-[#E9ECEF] shadow-sm flex-1 overflow-hidden flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-heading font-bold text-[#0F172A] text-sm uppercase tracking-wider flex items-center gap-2">
              <Users size={16} /> Batch Members
            </h3>
            <span className="bg-[#F1F5F9] text-[#64748B] text-xs font-bold px-2 py-0.5 rounded-md">
              {activeMembers.length}
            </span>
          </div>
          <div className="flex-1 overflow-y-auto custom-scrollbar space-y-3 pr-2">
            {members.filter(m => m.status !== 'mentor').map(member => (
              <div key={member.id} className="flex items-center justify-between group">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#CBD5E1] to-[#94A3B8] flex items-center justify-center text-white text-xs font-bold">
                      {member.name.charAt(0)}
                    </div>
                    <div className={cn(
                      "absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-white",
                      member.status === 'active' ? "bg-[#22C55E]" : "bg-[#F59E0B]"
                    )}></div>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#0F172A] group-hover:text-[#FF5722] transition-colors line-clamp-1">
                      {member.name} {member.isCurrentUser && '(You)'}
                    </p>
                    <p className="text-[10px] font-semibold text-[#94A3B8]">{member.contributionScore} pts</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
    </div>
  );
}
