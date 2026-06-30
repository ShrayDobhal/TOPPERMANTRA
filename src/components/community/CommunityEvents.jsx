import React from 'react';
import { motion } from 'framer-motion';
import { CalendarDays, Clock, MapPin, Users } from 'lucide-react';
import { mockEvents } from '../../lib/mockCommunity';
import { Button } from '../ui/Button';

export default function CommunityEvents() {
  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden h-full flex flex-col">
      <div className="p-6 border-b border-slate-100 flex items-center justify-between shrink-0">
        <h3 className="text-xl font-bold font-heading text-[#0F172A] flex items-center gap-2">
          <CalendarDays className="w-5 h-5 text-indigo-500" /> Upcoming Events
        </h3>
        <button className="text-xs font-bold text-[#FF5722] hover:underline">View Calendar</button>
      </div>
      
      <div className="p-6 flex-1 min-h-0 flex flex-col gap-4 overflow-y-auto custom-scrollbar">
        {mockEvents.map((event, i) => (
          <motion.div 
            key={event.id}
            initial={{ opacity: 0, x: 10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="flex flex-col sm:flex-row gap-4 p-4 bg-slate-50 border border-slate-100 rounded-2xl hover:bg-white hover:border-indigo-500/30 hover:shadow-md transition-all group"
          >
            {/* Date Block */}
            <div className="w-16 h-16 rounded-xl bg-indigo-500 text-white flex flex-col items-center justify-center shrink-0 shadow-inner group-hover:scale-105 transition-transform">
              <span className="text-[10px] font-bold uppercase tracking-widest opacity-80">{event.date.split(', ')[0]}</span>
              <span className="text-xl font-black">{event.date.split(' ')[1]}</span>
            </div>
            
            {/* Info */}
            <div className="flex-1 min-w-0">
              <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-500 mb-1 block">
                {event.type}
              </span>
              <h4 className="font-bold text-[#0F172A] text-sm md:text-base mb-1 truncate">
                {event.title}
              </h4>
              <div className="flex flex-wrap gap-3 mt-2 text-xs font-semibold text-slate-500">
                <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-slate-400" /> {event.time}</span>
                <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5 text-slate-400" /> {event.seats}</span>
              </div>
            </div>

            {/* CTA */}
            <div className="flex items-center justify-start sm:justify-end shrink-0">
              <Button variant="outline" className="w-full sm:w-auto px-4 h-9 text-xs group-hover:bg-indigo-50 group-hover:text-indigo-600 group-hover:border-indigo-200">
                Register
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
