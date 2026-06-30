import React from 'react';
import { motion } from 'framer-motion';
import { Users, Activity, ChevronRight, MessageSquare } from 'lucide-react';
import { mockSpaces } from '../../lib/mockCommunity';
import { Button } from '../ui/Button';

export default function CommunitySpaces() {
  return (
    <section id="community-spaces" className="py-24 bg-slate-50 border-b border-[#E9ECEF]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div>
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold font-heading text-[#0F172A] mb-3"
            >
              Goal-Based Spaces
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-[#64748B] text-lg max-w-2xl"
            >
              Join dedicated channels to collaborate, ask questions, and share resources with peers who share your exact interests.
            </motion.p>
          </div>
          <button className="text-sm font-bold text-[#FF5722] hover:text-[#E64A19] flex items-center gap-1 group whitespace-nowrap">
            View All Spaces <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {mockSpaces.map((space, i) => (
            <motion.div
              key={space.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:border-[#FF5722]/30 transition-all group flex flex-col h-full"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                  {space.icon}
                </div>
                <div className="flex items-center gap-1 bg-green-50 text-green-600 px-2 py-1 rounded-md text-[10px] font-bold tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                  {space.online} ONLINE
                </div>
              </div>

              <h3 className="font-bold text-xl text-[#0F172A] mb-1">{space.name}</h3>
              <p className="text-sm text-slate-500 mb-6 flex-grow">
                Upcoming: <span className="font-semibold text-slate-700">{space.nextEvent}</span>
              </p>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1">
                    <Users className="w-3 h-3" /> Members
                  </span>
                  <span className="font-semibold text-[#0F172A]">{space.members.toLocaleString()}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1">
                    <MessageSquare className="w-3 h-3" /> Activity
                  </span>
                  <span className="font-semibold text-[#0F172A]">{space.postsToday} posts today</span>
                </div>
              </div>

              <Button variant="outline" className="w-full group-hover:bg-[#FF5722] group-hover:text-white group-hover:border-[#FF5722] transition-colors">
                Join Space
              </Button>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
