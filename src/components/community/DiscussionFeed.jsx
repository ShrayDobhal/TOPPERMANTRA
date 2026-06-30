import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Eye, Clock, Hash } from 'lucide-react';
import { mockThreads } from '../../lib/mockCommunity';
import { Button } from '../ui/Button';

export default function DiscussionFeed() {
  return (
    <section id="discussions" className="py-24 bg-slate-50 border-b border-[#E9ECEF]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div>
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold font-heading text-[#0F172A] mb-3"
            >
              Live Discussions
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-[#64748B] text-lg max-w-2xl"
            >
              See what the community is talking about right now. Ask for resume reviews, find teammates, or prep for interviews.
            </motion.p>
          </div>
          <Button variant="primary" className="shadow-md hover:shadow-lg whitespace-nowrap">
            Start a Discussion
          </Button>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
          {/* Header Row */}
          <div className="hidden md:grid grid-cols-12 gap-4 p-4 bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-400 uppercase tracking-wider">
            <div className="col-span-7 pl-4">Topic</div>
            <div className="col-span-2 text-center">Category</div>
            <div className="col-span-3 text-right pr-4">Engagement</div>
          </div>

          {/* Threads */}
          <div className="divide-y divide-slate-100">
            {mockThreads.map((thread, i) => (
              <motion.div 
                key={thread.id}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group grid grid-cols-1 md:grid-cols-12 gap-4 p-5 md:p-4 hover:bg-slate-50 transition-colors cursor-pointer items-center"
              >
                {/* Mobile Category Tag (hidden on desktop) */}
                <div className="md:hidden flex mb-2">
                   <span className="bg-[#FF5722]/10 text-[#FF5722] px-2.5 py-1 rounded-md text-[10px] font-bold tracking-wider uppercase flex items-center gap-1">
                      <Hash className="w-3 h-3" /> {thread.category}
                   </span>
                </div>

                <div className="md:col-span-7 flex items-start md:items-center gap-4 pl-0 md:pl-4">
                  <img src={thread.avatar} alt={thread.author} className="w-10 h-10 rounded-full bg-slate-200 object-cover shrink-0" />
                  <div>
                    <h3 className="font-bold text-[#0F172A] text-base md:text-lg mb-1 group-hover:text-[#FF5722] transition-colors leading-snug">
                      {thread.title}
                    </h3>
                    <p className="text-xs text-slate-500 font-medium">
                      Posted by <span className="text-slate-700 font-semibold">{thread.author}</span> • {thread.timeAgo}
                    </p>
                  </div>
                </div>
                
                <div className="hidden md:flex md:col-span-2 justify-center">
                   <span className="bg-slate-100 text-slate-600 px-3 py-1.5 rounded-lg text-xs font-bold tracking-wider uppercase flex items-center gap-1">
                      <Hash className="w-3.5 h-3.5" /> {thread.category}
                   </span>
                </div>

                <div className="md:col-span-3 flex items-center justify-start md:justify-end gap-6 pr-0 md:pr-4 mt-2 md:mt-0 text-slate-500">
                  <div className="flex items-center gap-1.5 text-sm font-semibold group-hover:text-[#FF5722] transition-colors">
                    <MessageSquare className="w-4 h-4" /> {thread.replies}
                  </div>
                  <div className="flex items-center gap-1.5 text-sm font-semibold">
                    <Eye className="w-4 h-4" /> {thread.views}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="p-4 bg-slate-50 text-center border-t border-slate-200">
            <button className="text-sm font-bold text-[#FF5722] hover:underline">
              View 140+ More Discussions
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
