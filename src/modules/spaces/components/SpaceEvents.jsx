import { Calendar as CalendarIcon, Clock, Users, ArrowRight, Video, Plus } from 'lucide-react';

const events = [
  { title: 'Google SWE Mock Interview #1', type: 'Mock', date: 'Oct 24', time: '6:00 PM IST', location: 'Voice Channel', attendees: 12, host: 'Shray D.' },
  { title: 'System Design: Scalability', type: 'Study Session', date: 'Oct 26', time: '8:00 PM IST', location: 'Google Meet', attendees: 24, host: 'Alex K.' },
];

export default function SpaceEvents() {
  return (
    <div className="flex flex-col h-full bg-[#F8FAFC]">
      
      {/* Header */}
      <div className="p-6 border-b border-[#E9ECEF] flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0 bg-white shadow-sm z-10">
        <div>
          <h2 className="text-xl font-extrabold text-[#0F172A] flex items-center gap-2 mb-1">
            <CalendarIcon className="text-[#3B82F6]" size={24} /> Space Events
          </h2>
          <p className="text-sm font-semibold text-[#64748B]">Internal meetings, mock interviews, and study sessions.</p>
        </div>
        <button className="bg-[#3B82F6] text-white px-4 py-2 rounded-xl font-bold hover:bg-[#2563EB] transition-colors flex items-center gap-2 shadow-sm shrink-0">
          <Plus size={18} /> Create Event
        </button>
      </div>

      {/* Grid */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
        <div className="max-w-4xl mx-auto space-y-4">
          {events.map((event, i) => (
            <div key={i} className="bg-white border border-[#E9ECEF] rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-md hover:border-[#3B82F6]/30 transition-all group flex flex-col sm:flex-row sm:items-center justify-between gap-6 cursor-pointer">
              
              {/* Date Box */}
              <div className="flex flex-col items-center justify-center bg-[#F1F5F9] w-20 h-20 rounded-2xl shrink-0 group-hover:bg-[#3B82F6] group-hover:text-white transition-colors">
                <span className="text-xs font-bold uppercase tracking-wider">{event.date.split(' ')[0]}</span>
                <span className="text-2xl font-extrabold leading-none">{event.date.split(' ')[1]}</span>
              </div>
              
              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-bold text-[#3B82F6] uppercase tracking-wider bg-[#3B82F6]/10 px-2 py-0.5 rounded-md border border-[#3B82F6]/20">
                    {event.type}
                  </span>
                  <span className="text-xs font-semibold text-[#64748B]">Hosted by {event.host}</span>
                </div>
                <h3 className="text-lg font-bold text-[#0F172A] mb-3 group-hover:text-[#3B82F6] transition-colors truncate">
                  {event.title}
                </h3>
                
                <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-[#64748B]">
                  <span className="flex items-center gap-1.5"><Clock size={14} /> {event.time}</span>
                  <span className="flex items-center gap-1.5"><Video size={14} /> {event.location}</span>
                  <span className="flex items-center gap-1.5"><Users size={14} /> {event.attendees} RSVP</span>
                </div>
              </div>
              
              {/* Action */}
              <div className="shrink-0 w-full sm:w-auto">
                <button className="w-full sm:w-auto bg-[#F8FAFC] text-[#0F172A] border border-[#E9ECEF] px-6 py-3 rounded-xl font-bold hover:bg-[#3B82F6] hover:text-white hover:border-[#3B82F6] transition-all flex items-center justify-center gap-2 shadow-sm">
                  RSVP <ArrowRight size={16} />
                </button>
              </div>
              
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
