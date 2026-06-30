import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Users, MessageCircle } from 'lucide-react';
import { mockChapters } from '../../lib/mockCommunity';
import { Button } from '../ui/Button';

export default function CollegeChapters() {
  return (
    <section className="py-24 bg-white border-b border-[#E9ECEF] overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div>
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold font-heading text-[#0F172A] mb-3"
            >
              College Chapters
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-[#64748B] text-lg max-w-2xl"
            >
              Connect with alumni, seniors, and peers from your own university. Discuss campus events, exams, and local opportunities.
            </motion.p>
          </div>
          <button className="text-sm font-bold text-[#FF5722] hover:text-[#E64A19] flex items-center gap-1 group whitespace-nowrap">
            Find Your College <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Horizontal Scroll Container */}
        <div className="flex gap-6 overflow-x-auto pb-8 snap-x custom-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
          {mockChapters.map((chapter, i) => (
            <motion.div
              key={chapter.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="min-w-[320px] w-[320px] shrink-0 snap-start bg-white rounded-3xl border border-slate-200 p-6 hover:border-[#FF5722]/30 hover:shadow-xl transition-all group flex flex-col relative overflow-hidden"
            >
              {/* Background Accent */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-bl-full -z-10 group-hover:bg-[#FF5722]/5 transition-colors"></div>

              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-white border border-slate-100 shadow-sm p-2 flex items-center justify-center shrink-0">
                  <img src={chapter.logoUrl} alt={chapter.name} className="max-w-full max-h-full object-contain" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-[#0F172A] leading-tight">{chapter.name}</h3>
                  <div className="flex items-center gap-1 mt-1 text-xs font-semibold text-slate-500">
                    <Users className="w-3.5 h-3.5" /> {chapter.members.toLocaleString()} Members
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 rounded-xl p-4 mb-6 flex-grow">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Top Event</span>
                  <span className="text-xs font-semibold text-[#0F172A]">{chapter.topEvent}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Active Threads</span>
                  <span className="text-xs font-semibold text-[#FF5722] flex items-center gap-1">
                    <MessageCircle className="w-3.5 h-3.5" /> {chapter.activeDiscussions} Live
                  </span>
                </div>
              </div>

              <Button variant="outline" className="w-full">
                Join Chapter
              </Button>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
