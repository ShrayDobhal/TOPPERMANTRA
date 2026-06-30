import { Calendar, MapPin, Clock, Users, ArrowRight, Video } from 'lucide-react';

const events = [
  { title: 'Intro to Machine Learning', type: 'Webinar', date: 'Oct 24', time: '6:00 PM IST', location: 'Zoom', attendees: 124, host: 'Sarah Chen' },
  { title: 'Resume Review AMA', type: 'AMA', date: 'Oct 25', time: '5:00 PM IST', location: 'Voice Room', attendees: 89, host: 'Alex Kumar' },
  { title: 'React Performance Workshop', type: 'Workshop', date: 'Oct 28', time: '4:00 PM IST', location: 'Google Meet', attendees: 56, host: 'Rahul Dev' },
  { title: 'Winter Hackathon Kickoff', type: 'Hackathon', date: 'Nov 1', time: '10:00 AM IST', location: 'Discord Stage', attendees: 450, host: 'Topper Mantra' },
];

export default function EventCalendar() {
  return (
    <div className="flex flex-col h-full bg-white">
      
      {/* Header */}
      <div className="p-6 border-b border-[#E9ECEF] flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0 shadow-sm z-10 bg-white">
        <div>
          <h2 className="text-xl font-extrabold text-[#0F172A] flex items-center gap-2">
            <Calendar className="text-[#3B82F6]" size={24} /> Upcoming Events
          </h2>
          <p className="text-sm font-semibold text-[#64748B]">RSVP to webinars, AMAs, and hackathons.</p>
        </div>
      </div>

      {/* Grid */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-6 bg-[#F8FAFC]">
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
                  <span className="flex items-center gap-1.5"><Users size={14} /> {event.attendees} Attending</span>
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
