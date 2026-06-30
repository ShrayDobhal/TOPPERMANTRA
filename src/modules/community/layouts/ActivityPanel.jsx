import { Users, Calendar, Trophy, Zap, Star } from 'lucide-react';
import { Avatar } from '../../../components/ui/Avatar';

const onlineMembers = [
  { name: 'Alex Kumar', role: 'Mentor', avatar: 'Alex', isOnline: true },
  { name: 'Priya Sharma', role: 'Student', avatar: 'Priya', isOnline: true },
  { name: 'Rahul Dev', role: 'Lead', avatar: 'Rahul', isOnline: true },
];

const upcomingEvents = [
  { title: 'Intro to Machine Learning', time: 'Today, 6:00 PM', attendees: 124 },
  { title: 'Resume Review AMA', time: 'Tomorrow, 5:00 PM', attendees: 89 },
];

export default function ActivityPanel() {
  return (
    <div className="w-[280px] shrink-0 bg-white border-l border-[#E9ECEF] flex flex-col h-full sticky top-[73px] overflow-y-auto custom-scrollbar" style={{ height: 'calc(100vh - 73px)' }}>
      
      <div className="p-4 space-y-6">
        
        {/* Events Widget */}
        <div>
          <h3 className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider mb-3 flex items-center gap-2">
            <Calendar size={14} /> Upcoming Events
          </h3>
          <div className="space-y-3">
            {upcomingEvents.map((event, i) => (
              <div key={i} className="bg-[#F8FAFC] p-3 rounded-xl border border-[#E9ECEF] cursor-pointer hover:border-[#3B82F6]/50 transition-colors">
                <h4 className="text-sm font-bold text-[#0F172A] mb-1 line-clamp-1">{event.title}</h4>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-semibold text-[#64748B]">{event.time}</span>
                  <span className="text-[10px] font-bold text-[#3B82F6] bg-[#3B82F6]/10 px-1.5 py-0.5 rounded">{event.attendees} RSVP</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Contributors Widget */}
        <div>
          <h3 className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider mb-3 flex items-center gap-2">
            <Trophy size={14} /> Top Contributors
          </h3>
          <div className="space-y-3">
            {[1, 2, 3].map((_, i) => (
              <div key={i} className="flex items-center gap-3 group cursor-pointer">
                <div className="relative">
                  <Avatar size="sm" src={`https://api.dicebear.com/7.x/avataaars/svg?seed=Contr${i}`} />
                  {i === 0 && <div className="absolute -top-1 -right-1 bg-[#F59E0B] text-white w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-bold border-2 border-white"><Star size={8} className="fill-current" /></div>}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-[#0F172A] truncate group-hover:text-[#FF5722] transition-colors">Student {i+1}</p>
                  <p className="text-[10px] font-bold text-[#F59E0B] flex items-center gap-1">
                    <Zap size={10} className="fill-current" /> {1500 - (i * 200)} XP
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Online Members */}
        <div>
          <h3 className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider mb-3 flex items-center gap-2">
            <Users size={14} /> Online—24
          </h3>
          <div className="space-y-1">
            {onlineMembers.map((member, i) => (
              <div key={i} className="flex items-center gap-3 p-2 hover:bg-[#F8FAFC] rounded-xl cursor-pointer transition-colors">
                <div className="relative">
                  <Avatar size="sm" src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${member.avatar}`} />
                  {member.isOnline && (
                    <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#22C55E] border-2 border-white rounded-full"></div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-[#0F172A] truncate">{member.name}</p>
                  <p className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
