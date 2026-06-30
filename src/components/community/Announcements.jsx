import React from 'react';
import { motion } from 'framer-motion';
import { Bell, Megaphone, Calendar } from 'lucide-react';
import { mockAnnouncements } from '../../lib/mockCommunity';

export default function Announcements() {
  return (
    <div className="bg-white rounded-3xl border border-[#FF5722]/20 shadow-[0_8px_30px_rgb(255,87,34,0.06)] overflow-hidden h-full flex flex-col">
      <div className="p-6 bg-gradient-to-r from-[#FF5722]/5 to-transparent border-b border-[#FF5722]/10 flex items-center justify-between shrink-0">
        <h3 className="text-xl font-bold font-heading text-[#0F172A] flex items-center gap-2">
          <Megaphone className="w-5 h-5 text-[#FF5722]" /> Official Announcements
        </h3>
        <span className="flex h-3 w-3 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF5722] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-[#FF5722]"></span>
        </span>
      </div>
      
      <div className="p-6 flex-1 min-h-0 flex flex-col gap-4 overflow-y-auto custom-scrollbar">
        {mockAnnouncements.map((announcement, i) => (
          <motion.div 
            key={announcement.id}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="p-4 bg-slate-50 border border-slate-100 rounded-2xl hover:bg-white hover:border-[#FF5722]/30 hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="flex justify-between items-start mb-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#FF5722] bg-[#FF5722]/10 px-2 py-0.5 rounded">
                {announcement.type}
              </span>
              <span className="text-xs font-semibold text-slate-400 flex items-center gap-1">
                <Calendar className="w-3 h-3" /> {announcement.date}
              </span>
            </div>
            <h4 className="font-bold text-[#0F172A] text-sm md:text-base mb-1 leading-snug group-hover:text-[#FF5722] transition-colors">
              {announcement.title}
            </h4>
            <p className="text-sm text-slate-500 line-clamp-2">
              {announcement.content}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
