import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Shield, Users, Crown, Flame, AlertTriangle, UserMinus,
  MessageSquare, ChevronRight, Clock, CheckCircle2, Circle,
  TrendingUp, Award, Search, ArrowRight
} from 'lucide-react';
import { cn } from '../../../lib/utils';
import useCohortStore from '../../../store/useCohortStore';
import useStudentStore from '../../../store/useStudentStore';

export default function CohortDashboard() {
  const fetchCohort = useCohortStore((s) => s.fetchCohort);
  useEffect(() => {
    fetchCohort();
  }, [fetchCohort]);

  const cohort = useCohortStore((s) => s.cohort);
  const members = useCohortStore((s) => s.members);
  const currentChallenge = useCohortStore((s) => s.currentChallenge);
  const previousChallenges = useCohortStore((s) => s.previousChallenges);
  const challengeResponses = useCohortStore((s) => s.challengeResponses);
  const profile = useStudentStore((s) => s.profile);

  const [memberFilter, setMemberFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const activeMembers = members.filter(m => m.status === 'active');
  const yellowFlagged = members.filter(m => m.status === 'yellow');
  const redFlagged = members.filter(m => m.status === 'red');
  const removedMembers = members.filter(m => m.status === 'removed');

  const filteredMembers = members
    .filter(m => memberFilter === 'all' || m.status === memberFilter)
    .filter(m => m.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => b.contributionScore - a.contributionScore);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'active': return { label: 'Active', color: 'bg-[#22C55E]/10 text-[#22C55E]', dot: 'bg-[#22C55E]' };
      case 'yellow': return { label: 'Yellow Flag', color: 'bg-[#F59E0B]/10 text-[#D97706]', dot: 'bg-[#F59E0B]' };
      case 'red': return { label: 'Red Flag', color: 'bg-[#EF4444]/10 text-[#EF4444]', dot: 'bg-[#EF4444]' };
      case 'removed': return { label: 'Removed', color: 'bg-[#94A3B8]/10 text-[#64748B]', dot: 'bg-[#94A3B8]' };
      default: return { label: status, color: 'bg-[#F1F5F9] text-[#64748B]', dot: 'bg-[#94A3B8]' };
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-[#0F172A] to-[#1E293B] rounded-[32px] p-8 sm:p-12 border border-[#334155] text-white relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-[#3B82F6]/20 blur-[100px] rounded-full translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#A855F7]/10 blur-[80px] rounded-full -translate-x-1/3 translate-y-1/3" />
        
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#3B82F6] to-[#6366F1] flex items-center justify-center">
                  <Shield size={24} />
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold font-heading">{cohort.name}</h1>
                  <p className="text-[#94A3B8] text-sm font-medium">Mentored by {cohort.mentor.name} · {cohort.mentor.institution}</p>
                </div>
              </div>
              <p className="text-[#94A3B8] text-sm max-w-xl mt-2">
                All learning happens in the group. No DMs to mentor. Discuss, debate, and solve real-world problems together.
              </p>
            </div>

            {/* Cohort Stats */}
            <div className="flex items-center gap-4 shrink-0">
              {[
                { label: 'Active', value: activeMembers.length, max: cohort.maxSize, color: 'text-[#22C55E]' },
                { label: 'Week', value: cohort.currentWeek, color: 'text-[#3B82F6]' },
                { label: 'Challenges', value: previousChallenges.length + 1, color: 'text-[#F59E0B]' },
              ].map((stat, i) => (
                <div key={i} className="text-center bg-white/5 border border-white/10 rounded-2xl px-5 py-3">
                  <p className={cn("text-2xl font-extrabold font-heading", stat.color)}>
                    {stat.value}{stat.max ? `/${stat.max}` : ''}
                  </p>
                  <p className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-wider">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* No-DM Rule Banner */}
          <div className="mt-6 bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#EF4444]/20 flex items-center justify-center shrink-0">
              <MessageSquare size={16} className="text-[#EF4444]" />
            </div>
            <p className="text-xs font-semibold text-[#CBD5E1]">
              <span className="text-[#EF4444] font-bold">No-DM Rule:</span> Private messages to the mentor are disabled. All questions must be posted in the group for everyone to learn.
            </p>
          </div>
        </div>
      </div>

      {/* Current Weekly Challenge */}
      <div>
        <h2 className="text-xs font-bold text-[#94A3B8] uppercase tracking-widest mb-4 px-1 flex items-center gap-2">
          <Flame size={14} className="text-[#FF5722]" />
          This Week's Challenge · Week {currentChallenge.week}
        </h2>
        <div className="bg-white rounded-[28px] p-6 sm:p-8 border border-[#E9ECEF] shadow-sm">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <h3 className="text-xl font-bold font-heading text-[#0F172A] mb-2">{currentChallenge.title}</h3>
              <div className="flex items-center gap-3 text-xs text-[#64748B] font-semibold">
                <span className="flex items-center gap-1"><Users size={12} /> {currentChallenge.responsesCount} responses</span>
                <span className="w-1 h-1 rounded-full bg-[#CBD5E1]" />
                <span className="flex items-center gap-1"><Clock size={12} /> Deadline: Sunday</span>
              </div>
            </div>
            <span className="bg-[#22C55E]/10 text-[#22C55E] text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shrink-0">
              Active
            </span>
          </div>
          <div className="bg-[#F8FAFC] rounded-2xl p-5 border border-[#E9ECEF] text-sm text-[#334155] leading-relaxed whitespace-pre-line mb-6">
            {currentChallenge.description}
          </div>

          {/* Top Responses */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-[#0F172A]">Top Responses</h4>
            {challengeResponses
              .sort((a, b) => b.upvotes - a.upvotes)
              .slice(0, 3)
              .map((resp, i) => (
                <div
                  key={resp.id}
                  className={cn(
                    "p-4 rounded-2xl border transition-all",
                    resp.isCurrentUser
                      ? "bg-[#FF5722]/5 border-[#FF5722]/20"
                      : "bg-white border-[#E9ECEF] hover:border-[#3B82F6]/30"
                  )}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className={cn(
                        "w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold",
                        i === 0 ? "bg-gradient-to-br from-[#F59E0B] to-[#D97706]" :
                        "bg-gradient-to-br from-[#3B82F6] to-[#8B5CF6]"
                      )}>
                        {resp.userName.charAt(0)}
                      </div>
                      <span className="text-sm font-bold text-[#0F172A]">{resp.userName}</span>
                      {resp.isCurrentUser && <span className="text-[9px] font-bold text-[#FF5722] bg-[#FF5722]/10 px-1.5 py-0.5 rounded">You</span>}
                    </div>
                    <div className="flex items-center gap-1.5 text-xs font-bold text-[#64748B]">
                      <TrendingUp size={12} className="text-[#22C55E]" />
                      {resp.upvotes} upvotes
                    </div>
                  </div>
                  <p className="text-sm text-[#334155] leading-relaxed line-clamp-4 whitespace-pre-line">
                    {resp.content.substring(0, 200)}...
                  </p>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Member Grid */}
      <div>
        <div className="flex items-center justify-between mb-4 px-1">
          <h2 className="text-xs font-bold text-[#94A3B8] uppercase tracking-widest flex items-center gap-2">
            <Users size={14} /> Cohort Members
          </h2>
          <div className="flex items-center gap-2">
            {[
              { key: 'all', label: `All (${members.length})` },
              { key: 'active', label: `Active (${activeMembers.length})` },
              { key: 'yellow', label: `Warned (${yellowFlagged.length})` },
            ].map(f => (
              <button
                key={f.key}
                onClick={() => setMemberFilter(f.key)}
                className={cn(
                  "text-[10px] font-bold px-3 py-1.5 rounded-lg transition-colors",
                  memberFilter === f.key
                    ? "bg-[#0F172A] text-white"
                    : "bg-[#F1F5F9] text-[#64748B] hover:bg-[#E2E8F0]"
                )}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
          <input
            type="text"
            placeholder="Search members..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-[#E9ECEF] rounded-xl py-2.5 pl-11 pr-4 text-sm focus:outline-none focus:border-[#3B82F6] focus:ring-1 focus:ring-[#3B82F6] transition-all"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {filteredMembers.slice(0, 20).map((member) => {
            const badge = getStatusBadge(member.status);
            return (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className={cn(
                  "bg-white rounded-2xl p-4 border shadow-sm transition-all hover:shadow-md cursor-pointer",
                  member.isCurrentUser ? "border-[#FF5722]/30 ring-1 ring-[#FF5722]/10" : "border-[#E9ECEF]"
                )}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold",
                    member.isCurrentUser ? "bg-gradient-to-br from-[#FF5722] to-[#FF9800]" : "bg-gradient-to-br from-[#3B82F6] to-[#8B5CF6]"
                  )}>
                    {member.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-[#0F172A] truncate">
                      {member.name} {member.isCurrentUser && '(You)'}
                    </p>
                    <p className="text-[10px] text-[#94A3B8] font-medium truncate">{member.college}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className={cn("text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1", badge.color)}>
                    <span className={cn("w-1.5 h-1.5 rounded-full", badge.dot)} />
                    {badge.label}
                  </span>
                  <span className="text-xs font-bold text-[#64748B]">{member.contributionScore.toLocaleString()} pts</span>
                </div>
              </motion.div>
            );
          })}
        </div>
        {filteredMembers.length > 20 && (
          <p className="text-center text-xs text-[#94A3B8] font-semibold mt-4">
            Showing 20 of {filteredMembers.length} members
          </p>
        )}
      </div>

      {/* Previous Challenges */}
      <div>
        <h2 className="text-xs font-bold text-[#94A3B8] uppercase tracking-widest mb-4 px-1">Previous Challenges</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {previousChallenges.map((ch) => (
            <div key={ch.id} className="bg-white rounded-2xl p-5 border border-[#E9ECEF] shadow-sm hover:shadow-md transition-all cursor-pointer group">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] font-bold text-[#3B82F6] bg-[#3B82F6]/10 px-2 py-0.5 rounded-full">Week {ch.week}</span>
                <span className="text-[10px] font-bold text-[#22C55E] bg-[#22C55E]/10 px-2 py-0.5 rounded-full">Closed</span>
              </div>
              <h3 className="text-sm font-bold text-[#0F172A] mb-2 group-hover:text-[#3B82F6] transition-colors">{ch.title}</h3>
              <div className="flex items-center justify-between text-xs text-[#64748B] font-semibold">
                <span>{ch.responsesCount} responses</span>
                <span className="flex items-center gap-1"><Crown size={12} className="text-[#F59E0B]" /> {ch.topResponder}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
