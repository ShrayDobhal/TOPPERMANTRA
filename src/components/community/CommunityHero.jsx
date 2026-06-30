import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../../components/ui/Button';
import { Users, Activity } from 'lucide-react';
import { fadeUp, staggerContainer } from '../../lib/animations';

export default function CommunityHero() {
  return (
    <div className="relative pt-32 pb-20 overflow-hidden flex items-center justify-center min-h-[65vh] bg-white border-b border-[#E9ECEF]">
      
      {/* Background Ornaments */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#FF5722]/5 rounded-full blur-[100px]" />
        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
      </div>

      {/* Floating Avatars (Absolute positioning around the main content) */}
      <div className="hidden lg:block absolute inset-0 pointer-events-none z-10">
        {[
          { top: '20%', left: '15%', delay: 0, img: 'https://i.pravatar.cc/150?img=1' },
          { top: '60%', left: '10%', delay: 0.2, img: 'https://i.pravatar.cc/150?img=2' },
          { top: '30%', right: '15%', delay: 0.4, img: 'https://i.pravatar.cc/150?img=3' },
          { top: '70%', right: '12%', delay: 0.6, img: 'https://i.pravatar.cc/150?img=4' },
          { top: '15%', right: '35%', delay: 0.8, img: 'https://i.pravatar.cc/150?img=5' },
          { top: '80%', left: '30%', delay: 1.0, img: 'https://i.pravatar.cc/150?img=6' },
        ].map((avatar, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: avatar.delay, duration: 0.8, type: "spring" }}
            style={{ top: avatar.top, left: avatar.left, right: avatar.right }}
            className="absolute"
          >
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ repeat: Infinity, duration: 4 + i, ease: "easeInOut" }}
              className="w-12 h-12 rounded-full border-2 border-white shadow-lg overflow-hidden bg-white"
            >
              <img src={avatar.img} alt="Member" className="w-full h-full object-cover" />
            </motion.div>
          </motion.div>
        ))}
      </div>

      <div className="relative z-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          {/* Live Indicator */}
          <motion.div variants={fadeUp} className="mb-6 flex justify-center">
            <div className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-green-500/10 text-green-600 font-bold text-sm border border-green-500/20 shadow-sm">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
              </span>
              8,423 Members Online Now
            </div>
          </motion.div>
          
          <motion.h1 
            variants={fadeUp} 
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold font-heading tracking-tight mb-6 text-[#0F172A] leading-[1.05]"
          >
            Your tribe is <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF5722] to-[#FE6D4D]">
              waiting.
            </span>
          </motion.h1>
          
          <motion.p 
            variants={fadeUp} 
            className="text-lg md:text-xl text-[#64748B] mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            Join goal-based spaces, connect with your college chapter, and grow alongside India's most ambitious student developers.
          </motion.p>
          
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              variant="primary" 
              size="lg" 
              className="w-full sm:w-auto px-8 h-14 text-lg shadow-[0_4px_14px_0_rgba(255,87,34,0.39)] hover:shadow-[0_6px_20px_rgba(255,87,34,0.23)] hover:scale-105 transition-all flex items-center gap-2"
              onClick={() => document.getElementById('community-spaces')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Users className="w-5 h-5" /> Join the Community
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="w-full sm:w-auto px-8 h-14 text-lg bg-white/50 backdrop-blur-md flex items-center gap-2"
              onClick={() => document.getElementById('discussions')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Activity className="w-5 h-5" /> View Live Discussions
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
