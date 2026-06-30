import { useState } from 'react';
import { CalendarDays, Clock, Video, FileText, CheckCircle2, ChevronRight, MessageSquare } from 'lucide-react';
import { Avatar } from '../../../components/ui/Avatar';
import { cn } from '../../../lib/utils';

const upcomingSessions = [
  {
    id: 1, mentor: 'Alex Kumar', avatar: 'Alex', role: 'Senior SWE at Google',
    topic: 'System Design Mock Interview', date: 'Oct 28, 2026', time: '10:00 AM IST', duration: '60 Min',
    status: 'Upcoming', meetLink: 'meet.google.com/abc-xyz-123'
  }
];

const pastSessions = [
  {
    id: 2, mentor: 'Sarah Chen', avatar: 'Sarah', role: 'PM at Atlassian',
    topic: 'Resume Review & Feedback', date: 'Oct 15, 2026', duration: '30 Min',
    status: 'Completed', notes: 'Focus more on quantifiable impact in bullet points. Removed irrelevant high school projects.',
    rating: 5
  }
];

export default function SessionDashboard() {
  const [activeTab, setActiveTab] = useState('upcoming');

  return (
    <div className="flex-1 overflow-y-auto custom-scrollbar h-full bg-[#F8FAFC]">
      
      {/* Header */}
      <div className="p-6 lg:p-10 border-b border-[#E9ECEF] bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-extrabold text-[#0F172A] flex items-center gap-2 mb-2">
            <CalendarDays className="text-[#3B82F6]" size={28} /> My Sessions
          </h2>
          <p className="text-sm font-semibold text-[#64748B]">Manage your upcoming 1:1s, review past feedback, and access session notes.</p>
        </div>
      </div>

      <div className="p-6 lg:p-10 max-w-4xl mx-auto space-y-8 pb-24">
        
        {/* Tabs */}
        <div className="flex items-center gap-6 border-b border-[#E9ECEF]">
          {['upcoming', 'past'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "pb-3 text-sm font-bold capitalize transition-all border-b-2",
                activeTab === tab ? "border-[#3B82F6] text-[#3B82F6]" : "border-transparent text-[#64748B] hover:text-[#0F172A]"
              )}
            >
              {tab} Sessions
            </button>
          ))}
        </div>

        {/* Content */}
        {activeTab === 'upcoming' && (
          <div className="space-y-4">
            {upcomingSessions.length === 0 ? (
              <div className="bg-white border border-[#E9ECEF] rounded-3xl p-10 text-center shadow-sm">
                <CalendarDays size={48} className="mx-auto text-[#CBD5E1] mb-4" />
                <h3 className="text-lg font-bold text-[#0F172A] mb-2">No upcoming sessions</h3>
                <p className="text-sm text-[#64748B] mb-6">Book a 1:1 session with an expert mentor to accelerate your growth.</p>
                <button className="bg-[#3B82F6] text-white px-6 py-2.5 rounded-xl font-bold hover:bg-[#2563EB] transition-colors shadow-sm">
                  Find a Mentor
                </button>
              </div>
            ) : (
              upcomingSessions.map(session => (
                <div key={session.id} className="bg-white border border-[#E9ECEF] rounded-3xl p-6 md:p-8 shadow-sm flex flex-col md:flex-row gap-6 items-start md:items-center">
                  
                  <div className="flex items-center gap-4 flex-1">
                    <Avatar size="lg" src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${session.avatar}`} />
                    <div>
                      <span className="text-[10px] font-bold text-[#3B82F6] uppercase tracking-wider bg-[#3B82F6]/10 px-2 py-0.5 rounded-md border border-[#3B82F6]/20 mb-2 inline-block">
                        {session.topic}
                      </span>
                      <h3 className="text-lg font-extrabold text-[#0F172A] leading-tight mb-1">With {session.mentor}</h3>
                      <p className="text-sm font-semibold text-[#64748B]">{session.role}</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-2 w-full md:w-auto shrink-0 bg-[#F8FAFC] p-4 rounded-2xl border border-[#E9ECEF]">
                    <div className="flex items-center gap-4 text-sm font-bold text-[#0F172A]">
                      <span className="flex items-center gap-1.5"><CalendarDays size={16} className="text-[#64748B]"/> {session.date}</span>
                      <span className="flex items-center gap-1.5"><Clock size={16} className="text-[#64748B]"/> {session.time}</span>
                    </div>
                    <a href={`https://${session.meetLink}`} target="_blank" rel="noopener noreferrer" className="w-full bg-[#3B82F6] text-white px-4 py-2.5 rounded-xl font-bold hover:bg-[#2563EB] transition-colors flex items-center justify-center gap-2 shadow-sm mt-2">
                      <Video size={18} /> Join Meeting
                    </a>
                  </div>
                  
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === 'past' && (
          <div className="space-y-4">
            {pastSessions.map(session => (
              <div key={session.id} className="bg-white border border-[#E9ECEF] rounded-3xl p-6 shadow-sm group">
                <div className="flex flex-col md:flex-row gap-6 items-start justify-between mb-6 pb-6 border-b border-[#E9ECEF]">
                  <div className="flex items-center gap-4">
                    <Avatar size="md" src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${session.avatar}`} />
                    <div>
                      <h3 className="text-base font-extrabold text-[#0F172A] mb-1">{session.topic} with {session.mentor}</h3>
                      <p className="text-xs font-semibold text-[#64748B] flex items-center gap-1.5">
                        <CalendarDays size={14}/> {session.date} • {session.duration}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="flex items-center gap-1 text-sm font-bold text-[#22C55E] bg-[#22C55E]/10 px-3 py-1.5 rounded-lg border border-[#22C55E]/20">
                      <CheckCircle2 size={16} /> Completed
                    </span>
                    <button className="p-2 text-[#94A3B8] hover:text-[#0F172A] bg-[#F8FAFC] border border-[#E9ECEF] rounded-lg transition-colors"><MessageSquare size={16} /></button>
                  </div>
                </div>
                
                <div className="bg-[#F8FAFC] rounded-2xl p-4 border border-[#E9ECEF]">
                  <h4 className="text-sm font-bold text-[#0F172A] flex items-center gap-1.5 mb-2">
                    <FileText size={16} className="text-[#A855F7]" /> Session Notes & Feedback
                  </h4>
                  <p className="text-sm text-[#475569] leading-relaxed font-medium">
                    {session.notes}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
