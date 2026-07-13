import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Send, Users, Shield, Clock, Paperclip, MoreVertical, CheckCircle2, Play, Lock } from 'lucide-react';
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
  const [activeTab, setActiveTab] = useState('chat'); // 'chat' or 'curriculum'
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
    if (activeTab === 'chat') {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, activeTab]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !cohort?.id) return;
    sendMessage(cohort.id, newMessage);
    setNewMessage('');
  };

  // === DUMMY DATA FALLBACK ===
  const displayCohort = cohort || {
    id: 'dummy-cohort-1',
    name: "Software Engineering Batch '26",
    mentor: { name: 'Priya Sharma' }
  };

  const displayMembers = (members && members.length > 0) ? members : [
    { id: '1', name: profile?.fullName || 'Aman Gupta', status: 'active', contributionScore: 450, isCurrentUser: true },
    { id: '2', name: 'Riya Verma', status: 'yellow', contributionScore: 320 },
    { id: '3', name: 'Karan Singh', status: 'active', contributionScore: 410 },
    { id: '4', name: 'Neha Reddy', status: 'active', contributionScore: 390 },
    { id: '5', name: 'Priya Sharma', status: 'mentor', user: { role: 'Mentor' } }
  ];

  const displayMessages = (messages && messages.length > 0) ? messages : [
    {
      id: 1,
      user: { id: 'mentor-1', name: 'Priya Sharma', role: 'Mentor', avatar: null },
      content: "Welcome everyone! I'll be guiding you through this cohort. Let me know if you have any questions regarding Week 1 syllabus.",
      createdAt: new Date(Date.now() - 3600000).toISOString()
    },
    {
      id: 2,
      user: { id: profile?.id || 'me', name: profile?.fullName || 'Me', role: 'Student', avatar: profile?.avatarUrl },
      content: "Thanks Priya! I'm super excited to start building.",
      createdAt: new Date(Date.now() - 1800000).toISOString()
    }
  ];
  // ============================

  const mentor = displayMembers.find(m => m.user?.role === 'Mentor' || m.status === 'mentor') || { name: displayCohort.mentor?.name || 'Mentor', role: 'Mentor' };
  const activeMembers = displayMembers.filter(m => m.status === 'active' || m.status === 'yellow');

  // Hardcoded cohort curriculum timeline matching the user's attachment style
  const cohortCurriculum = [
    { week: 'Week 1', title: 'Python Basics', type: 'LEARNING', status: 'completed', desc: 'Mastered core syntax and data structures.', xp: 200 },
    { week: 'Week 2', title: 'Git & GitHub', type: 'LEARNING', status: 'completed', desc: 'Version control fundamentals.', xp: 150 },
    { week: 'Week 3', title: 'Build Portfolio Website', type: 'PROJECT', status: 'in-progress', desc: 'Showcase your skills online.', xp: 300 },
    { week: 'Week 4', title: 'Complete AI Project', type: 'PROJECT', status: 'locked', desc: 'Resume Analyzer with NLP.', xp: 500 },
    { week: 'Week 5', title: 'Participate in Hackathon', type: 'COMMUNITY', status: 'locked', desc: 'Test your skills under pressure.', xp: 400 },
    { week: 'Week 6', title: 'Get Mentor Review', type: 'MENTORSHIP', status: 'locked', desc: 'Feedback from a senior engineer.', xp: 150 },
  ];

  return (
    <div className="flex h-[calc(100vh-140px)] gap-6 animate-in fade-in duration-500 pb-4">
      
      {/* LEFT: Tabbed Area */}
      <div className="flex-1 bg-white rounded-3xl border border-[#E9ECEF] shadow-sm flex flex-col overflow-hidden relative">
        {/* Chat Header */}
        <div className="h-16 px-6 border-b border-[#E9ECEF] flex items-center justify-between bg-white z-10 shrink-0">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#3B82F6] to-[#6366F1] flex items-center justify-center shadow-sm">
              <Shield size={20} className="text-white" />
            </div>
            <div>
              <h2 className="text-base font-bold text-[#0F172A]">{displayCohort.name}</h2>
              <p className="text-xs font-semibold text-[#22C55E] flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E]"></span> Mentor Online
              </p>
            </div>
          </div>
          <button className="text-[#64748B] hover:bg-[#F1F5F9] p-2 rounded-full transition-colors">
            <MoreVertical size={20} />
          </button>
        </div>

        {/* Tab Selection */}
        <div className="flex border-b border-[#E9ECEF] bg-white px-6 shrink-0">
          <button 
            onClick={() => setActiveTab('chat')}
            className={cn(
              "px-4 py-3 text-sm font-bold border-b-2 transition-all relative top-[1px]",
              activeTab === 'chat' 
                ? "border-[#FF5722] text-[#FF5722]" 
                : "border-transparent text-[#64748B] hover:text-[#0F172A]"
            )}
          >
            Discussions
          </button>
          <button 
            onClick={() => setActiveTab('curriculum')}
            className={cn(
              "px-4 py-3 text-sm font-bold border-b-2 transition-all relative top-[1px]",
              activeTab === 'curriculum' 
                ? "border-[#FF5722] text-[#FF5722]" 
                : "border-transparent text-[#64748B] hover:text-[#0F172A]"
            )}
          >
            Curriculum Timeline
          </button>
        </div>

        {activeTab === 'chat' ? (
          <>
            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#F8FAFC]" data-lenis-prevent="true">
              {/* Welcome Banner */}
              <div className="bg-gradient-to-r from-[#EFF6FF] to-[#F8FAFC] border border-[#BFDBFE] rounded-2xl p-5 text-center max-w-lg mx-auto shadow-sm">
                <div className="w-10 h-10 mx-auto bg-[#3B82F6]/10 rounded-full flex items-center justify-center mb-3">
                  <Shield size={20} className="text-[#3B82F6]" />
                </div>
                <p className="text-sm font-bold text-[#1E3A8A] mb-1.5">Welcome to your Mentor Room</p>
                <p className="text-xs font-medium text-[#475569] leading-relaxed">
                  All technical discussions and doubts should be posted here. Please avoid DMing the mentor directly. <br className="hidden sm:block" />
                  <span className="text-[#3B82F6] font-semibold">Your participation is tracked for XP.</span>
                </p>
              </div>

              {displayMessages.map((msg, idx) => {
                const isMe = msg.user.id === profile?.id;
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
            <div className="p-4 bg-white border-t border-[#E9ECEF] shrink-0">
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
          </>
        ) : (
          /* Curriculum Timeline Tab */
          <div className="flex-1 overflow-y-auto p-6 sm:p-10 bg-[#F8FAFC] relative" data-lenis-prevent="true">
            <div className="absolute left-[37px] sm:left-[53px] top-10 bottom-10 w-1 bg-[#E2E8F0] rounded-full z-0"></div>
            <motion.div 
              initial={{ height: 0 }}
              animate={{ height: '40%' }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="absolute left-[37px] sm:left-[53px] top-10 w-1 bg-gradient-to-b from-[#22C55E] to-[#FF5722] rounded-full z-0"
            ></motion.div>

            <div className="space-y-8 relative z-10 max-w-3xl">
              {cohortCurriculum.map((step, idx) => (
                <div key={idx} className="flex gap-6 items-start">
                  
                  {/* Status Node */}
                  <div className={cn(
                    "w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center border-4 border-white shadow-sm shrink-0 transition-all duration-300",
                    step.status === 'completed' ? "bg-[#22C55E] text-white" :
                    step.status === 'in-progress' ? "bg-[#FF5722] text-white shadow-[0_0_20px_rgba(255,87,34,0.3)] scale-105" :
                    "bg-[#E2E8F0] text-[#94A3B8]"
                  )}>
                    {step.status === 'completed' ? (
                      <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6" />
                    ) : step.status === 'in-progress' ? (
                      <Play className="w-5 h-5 sm:w-6 sm:h-6 fill-current ml-0.5" />
                    ) : (
                      <Lock className="w-4 h-4 sm:w-5 sm:h-5" />
                    )}
                  </div>

                  {/* Card Content */}
                  <div className={cn(
                    "flex-1 p-5 rounded-2xl border bg-white shadow-sm transition-all duration-300",
                    step.status === 'completed' ? "border-[#E2E8F0] hover:border-[#22C55E]/30" :
                    step.status === 'in-progress' ? "border-[#FF5722]/30 bg-[#FF5722]/5" :
                    "border-transparent opacity-75"
                  )}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className={cn(
                          "text-[9px] sm:text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full",
                          step.status === 'completed' ? "bg-[#22C55E]/10 text-[#22C55E]" :
                          step.status === 'in-progress' ? "bg-[#FF5722]/10 text-[#FF5722]" :
                          "bg-[#E2E8F0] text-[#64748B]"
                        )}>
                          {step.type}
                        </span>
                        <span className="text-[10px] font-bold text-[#64748B]">{step.week}</span>
                      </div>
                      <span className="text-xs font-bold text-[#F59E0B]">+{step.xp} XP</span>
                    </div>

                    <h3 className={cn(
                      "text-base sm:text-lg font-bold mb-1",
                      step.status === 'locked' ? "text-[#94A3B8]" : "text-[#0F172A]"
                    )}>
                      {step.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#64748B]">{step.desc}</p>
                    
                    {step.status === 'in-progress' && (
                      <button className="mt-3 text-xs font-bold text-white bg-[#FF5722] px-4 py-2 rounded-lg hover:bg-[#E64A19] transition-colors shadow-sm">
                        Start Challenge
                      </button>
                    )}
                  </div>

                </div>
              ))}
            </div>
          </div>
        )}
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
          <div className="flex-1 overflow-y-auto custom-scrollbar space-y-3 pr-2" data-lenis-prevent="true">
            {displayMembers.filter(m => m.status !== 'mentor').map(member => (
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
