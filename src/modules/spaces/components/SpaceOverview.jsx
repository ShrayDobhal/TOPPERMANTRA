import { Target, Flag, Zap, Trophy, TrendingUp, Calendar, MessageSquare, ArrowRight } from 'lucide-react';
import { Avatar } from '../../../components/ui/Avatar';

export default function SpaceOverview() {
  return (
    <div className="flex-1 overflow-y-auto custom-scrollbar p-6 lg:p-10 bg-[#F8FAFC]">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Hero Banner */}
        <div className="bg-white rounded-3xl p-8 border border-[#E9ECEF] shadow-sm relative overflow-hidden">
          <div className="absolute right-0 top-0 w-64 h-64 bg-gradient-to-br from-[#3B82F6]/10 to-[#A855F7]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
          <div className="relative z-10 max-w-2xl">
            <h1 className="text-3xl font-extrabold text-[#0F172A] mb-4">Mission Control</h1>
            <p className="text-[#475569] text-lg leading-relaxed mb-6 font-medium">
              We are a dedicated group of students preparing for the upcoming Google SWE University Hiring drive. 
              Our goal is to master Data Structures, System Design, and crack the interviews together.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <span className="flex items-center gap-2 text-sm font-bold text-[#3B82F6] bg-[#3B82F6]/10 px-3 py-1.5 rounded-xl border border-[#3B82F6]/20">
                <Target size={16} /> 1240 Members
              </span>
              <span className="flex items-center gap-2 text-sm font-bold text-[#A855F7] bg-[#A855F7]/10 px-3 py-1.5 rounded-xl border border-[#A855F7]/20">
                <Trophy size={16} /> Top 10 Space
              </span>
            </div>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Column */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Goals */}
            <div>
              <h2 className="text-lg font-extrabold text-[#0F172A] mb-4 flex items-center gap-2">
                <Flag className="text-[#F59E0B]" size={20} /> Current Goals
              </h2>
              <div className="bg-white border border-[#E9ECEF] rounded-2xl p-6 shadow-sm">
                <div className="space-y-4">
                  {[
                    { title: 'Complete Blind 75 List', progress: 65, color: 'bg-[#3B82F6]' },
                    { title: 'Host 3 Mock Interviews per member', progress: 40, color: 'bg-[#A855F7]' },
                    { title: 'Build one Full-Stack Project', progress: 85, color: 'bg-[#22C55E]' }
                  ].map((goal, i) => (
                    <div key={i}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-bold text-[#0F172A]">{goal.title}</span>
                        <span className="text-sm font-bold text-[#64748B]">{goal.progress}%</span>
                      </div>
                      <div className="h-2 w-full bg-[#F1F5F9] rounded-full overflow-hidden">
                        <div className={`h-full ${goal.color} rounded-full`} style={{ width: `${goal.progress}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent Discussions */}
            <div>
              <h2 className="text-lg font-extrabold text-[#0F172A] mb-4 flex items-center gap-2">
                <MessageSquare className="text-[#3B82F6]" size={20} /> Hot Discussions
              </h2>
              <div className="space-y-3">
                {[
                  { title: 'How to optimize Dynamic Programming solutions?', comments: 45, author: 'Alex' },
                  { title: 'System Design: URL Shortener Architecture', comments: 32, author: 'Sarah' },
                ].map((post, i) => (
                  <div key={i} className="bg-white border border-[#E9ECEF] rounded-2xl p-4 sm:p-5 shadow-sm hover:border-[#3B82F6]/30 transition-colors cursor-pointer group flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-[#0F172A] group-hover:text-[#3B82F6] transition-colors mb-1">{post.title}</h3>
                      <p className="text-xs font-semibold text-[#64748B]">Posted by {post.author}</p>
                    </div>
                    <div className="flex items-center gap-1 text-xs font-bold text-[#64748B] bg-[#F8FAFC] px-2 py-1 rounded-lg">
                      <MessageSquare size={14} /> {post.comments}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Side Column */}
          <div className="space-y-8">
            
            {/* Weekly Progress */}
            <div>
              <h2 className="text-lg font-extrabold text-[#0F172A] mb-4 flex items-center gap-2">
                <TrendingUp className="text-[#22C55E]" size={20} /> Weekly Stats
              </h2>
              <div className="bg-white border border-[#E9ECEF] rounded-2xl p-5 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-[#64748B]">Messages Sent</span>
                  <span className="text-base font-extrabold text-[#0F172A]">2,451</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-[#64748B]">Resources Shared</span>
                  <span className="text-base font-extrabold text-[#0F172A]">45</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-[#64748B]">Tasks Completed</span>
                  <span className="text-base font-extrabold text-[#0F172A]">120</span>
                </div>
              </div>
            </div>

            {/* Upcoming Events */}
            <div>
              <h2 className="text-lg font-extrabold text-[#0F172A] mb-4 flex items-center gap-2">
                <Calendar className="text-[#EF4444]" size={20} /> Up Next
              </h2>
              <div className="space-y-3">
                {[
                  { title: 'Mock Interview: System Design', time: 'Today, 6 PM' },
                  { title: 'Weekly Leetcode Contest', time: 'Tomorrow, 8 PM' }
                ].map((event, i) => (
                  <div key={i} className="bg-white border border-[#E9ECEF] rounded-2xl p-4 shadow-sm hover:border-[#EF4444]/30 transition-colors cursor-pointer group">
                    <h3 className="text-sm font-bold text-[#0F172A] group-hover:text-[#EF4444] transition-colors mb-1">{event.title}</h3>
                    <p className="text-xs font-semibold text-[#64748B] flex items-center gap-1"><Calendar size={12}/> {event.time}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
