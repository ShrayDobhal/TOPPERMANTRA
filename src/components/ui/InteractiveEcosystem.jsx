import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const nodes = [
  { name: 'Mentors', path: '/mentors', angle: -90, color: 'text-blue-500', bg: 'bg-blue-50' },
  { name: 'Projects', path: '/projects', angle: -45, color: 'text-green-500', bg: 'bg-green-50' },
  { name: 'Community', path: '/community', angle: 0, color: 'text-purple-500', bg: 'bg-purple-50' },
  { name: 'Internships', path: '/discover', angle: 45, color: 'text-orange-500', bg: 'bg-orange-50' },
  { name: 'Startups', path: '/discover', angle: 90, color: 'text-pink-500', bg: 'bg-pink-50' },
  { name: 'Hackathons', path: '/discover', angle: 135, color: 'text-indigo-500', bg: 'bg-indigo-50' },
  { name: 'Research', path: '/discover', angle: 180, color: 'text-teal-500', bg: 'bg-teal-50' },
  { name: 'Roadmaps', path: '/about', angle: 225, color: 'text-yellow-600', bg: 'bg-yellow-50' },
];

export default function InteractiveEcosystem() {
  return (
    <div className="py-20 w-full overflow-hidden flex flex-col items-center">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold font-heading text-[#0F172A] mb-4">
          The Complete Student <span className="text-[#FF5722]">Ecosystem</span>
        </h2>
        <p className="text-[#64748B] max-w-xl mx-auto">
          Everything you need to accelerate your career, housed under one operating system.
        </p>
      </div>

      <div className="relative w-[320px] h-[320px] md:w-[500px] md:h-[500px] flex items-center justify-center">
        {/* Background dashed circle */}
        <div className="absolute inset-4 border border-dashed border-slate-200 rounded-full animate-[spin_60s_linear_infinite]" />
        <div className="absolute inset-16 border border-dashed border-slate-200 rounded-full animate-[spin_40s_linear_infinite_reverse]" />

        {/* Central Node */}
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', duration: 1 }}
          className="z-20 bg-[#0F172A] text-white rounded-2xl p-6 md:p-8 shadow-2xl text-center relative"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-2xl" />
          <h2 className="font-heading font-bold text-xl md:text-3xl tracking-tighter relative z-10">
            Topper<span className="text-[#FF5722]">Mantra</span>
          </h2>
          <p className="text-slate-400 text-xs md:text-sm mt-1 font-semibold relative z-10">Growth OS</p>
        </motion.div>

        {/* Orbiting Nodes Wrapper */}
        <motion.div 
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="absolute flex items-center justify-center z-10 w-full h-full"
        >
          {nodes.map((node, i) => {
            const radian = (node.angle * Math.PI) / 180;
            const radius = 42; // 42% from center, matching the dashed circle
            const x = Math.cos(radian) * radius;
            const y = Math.sin(radian) * radius;

            return (
              <div
                key={node.name}
                className="absolute w-0 h-0"
                style={{ left: `calc(50% + ${x}%)`, top: `calc(50% + ${y}%)` }}
              >
                {/* Counter-rotation to keep nodes upright */}
                <motion.div
                  initial={{ rotate: 0 }}
                  animate={{ rotate: -360 }}
                  transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                  className="absolute flex items-center justify-center"
                  style={{ left: '-50%', top: '-50%' }}
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: 'spring', delay: i * 0.1, duration: 0.8 }}
                    className="flex justify-center items-center"
                    style={{ transform: 'translate(-50%, -50%)' }} // Center the pill precisely on the mathematical point
                  >
                    <Link to={node.path}>
                      <div className={`px-4 py-2 md:px-6 md:py-3 rounded-full ${node.bg} border border-white shadow-lg shadow-slate-200/50 hover:scale-110 hover:-translate-y-1 transition-all duration-300 cursor-pointer backdrop-blur-sm whitespace-nowrap`}>
                        <span className={`font-bold text-sm md:text-base ${node.color}`}>
                          {node.name}
                        </span>
                      </div>
                    </Link>
                  </motion.div>
                </motion.div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}
