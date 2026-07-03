import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Users2, Hammer, MessageCircle, ArrowRight } from 'lucide-react';

const pillars = [
  {
    id: 'cohort',
    title: 'Cohort',
    subtitle: 'Group Mentorship',
    description: 'Discuss with 50 peers, solve weekly challenges, learn from IIT mentors.',
    icon: <Users2 size={28} />,
    path: '/dashboard/cohort',
    gradient: 'from-[#3B82F6] to-[#6366F1]',
    glowColor: 'rgba(59, 130, 246, 0.25)',
    stat: '47/50 active',
    statLabel: 'Cohort Size',
  },
  {
    id: 'project',
    title: 'Project Forge',
    subtitle: 'Build Things',
    description: 'Claim tasks, build real-world projects, get mentor reviews, earn XP.',
    icon: <Hammer size={28} />,
    path: '/dashboard/projects',
    gradient: 'from-[#FF5722] to-[#FF9800]',
    glowColor: 'rgba(255, 87, 34, 0.25)',
    stat: '4 active',
    statLabel: 'Projects',
  },
  {
    id: 'community',
    title: 'Community Hub',
    subtitle: 'Discuss & Grow',
    description: 'Branch-based channels, curated discussions, upvote the best answers.',
    icon: <MessageCircle size={28} />,
    path: '/dashboard/community',
    gradient: 'from-[#22C55E] to-[#14B8A6]',
    glowColor: 'rgba(34, 197, 94, 0.25)',
    stat: '18 posts today',
    statLabel: 'CS/IT Channel',
  },
];

export default function QuickActionPillars() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <h2 className="text-xs font-bold text-[#94A3B8] uppercase tracking-widest mb-4 px-1">
        Your Three Pillars
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {pillars.map((pillar, i) => (
          <Link key={pillar.id} to={pillar.path}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 + i * 0.1 }}
              whileHover={{ y: -6, boxShadow: `0 20px 40px ${pillar.glowColor}` }}
              className="relative bg-white rounded-[28px] p-6 border border-[#E9ECEF] shadow-sm cursor-pointer group overflow-hidden h-full transition-colors"
            >
              {/* Background glow on hover */}
              <div
                className="absolute top-0 right-0 w-32 h-32 rounded-full blur-[50px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-x-1/3 -translate-y-1/3"
                style={{ backgroundColor: pillar.glowColor }}
              />

              <div className="relative z-10">
                {/* Icon */}
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${pillar.gradient} flex items-center justify-center text-white mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  {pillar.icon}
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold font-heading text-[#0F172A] mb-1 group-hover:text-[#FF5722] transition-colors">
                  {pillar.title}
                </h3>
                <p className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider mb-3">
                  {pillar.subtitle}
                </p>

                {/* Description */}
                <p className="text-sm text-[#64748B] font-medium leading-relaxed mb-5">
                  {pillar.description}
                </p>

                {/* Bottom stat + arrow */}
                <div className="flex items-center justify-between">
                  <div className="bg-[#F8FAFC] border border-[#E9ECEF] rounded-xl px-3 py-1.5">
                    <p className="text-[9px] font-bold text-[#94A3B8] uppercase tracking-wider">{pillar.statLabel}</p>
                    <p className="text-sm font-bold text-[#0F172A]">{pillar.stat}</p>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-[#F1F5F9] flex items-center justify-center group-hover:bg-[#FF5722] transition-colors">
                    <ArrowRight size={18} className="text-[#64748B] group-hover:text-white transition-colors" />
                  </div>
                </div>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </motion.div>
  );
}
