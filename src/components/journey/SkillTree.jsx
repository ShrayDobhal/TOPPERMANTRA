import { motion } from 'framer-motion';
import { Code2, LayoutTemplate, Database, Cpu, Cloud, Server, Lock } from 'lucide-react';
import { cn } from '../../lib/utils';

const skills = [
  { id: 'prog', label: 'Programming', icon: <Code2 size={24} />, status: 'unlocked', level: 1 },
  { id: 'front', label: 'Frontend', icon: <LayoutTemplate size={24} />, status: 'unlocked', level: 2 },
  { id: 'back', label: 'Backend', icon: <Database size={24} />, status: 'unlocked', level: 2 },
  { id: 'ai', label: 'AI & ML', icon: <Cpu size={24} />, status: 'in-progress', level: 3 },
  { id: 'cloud', label: 'Cloud', icon: <Cloud size={24} />, status: 'locked', level: 4 },
  { id: 'sys', label: 'System Design', icon: <Server size={24} />, status: 'locked', level: 5 },
];

export default function SkillTree() {
  return (
    <div className="bg-[#0F172A] rounded-[32px] p-6 sm:p-10 border border-[#334155] shadow-lg relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#3B82F6]/10 to-[#A855F7]/10 rounded-full blur-3xl"></div>
      
      <div className="flex items-center justify-between mb-10 relative z-10">
        <div>
          <h2 className="text-2xl font-bold font-heading text-white mb-1">Skill Tree</h2>
          <p className="text-sm font-semibold text-[#94A3B8]">Unlock branches by completing missions.</p>
        </div>
      </div>

      <div className="relative py-4 flex flex-col items-center justify-center min-h-[400px] z-10">
        {/* Connection Lines (SVG) */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: -1 }}>
          <path d="M 50% 10% L 50% 30%" stroke="#334155" strokeWidth="4" strokeDasharray="8 8" />
          <path d="M 50% 10% L 50% 30%" stroke="#3B82F6" strokeWidth="4" />
          
          <path d="M 50% 30% L 35% 50%" stroke="#334155" strokeWidth="4" strokeDasharray="8 8" />
          <path d="M 50% 30% L 35% 50%" stroke="#3B82F6" strokeWidth="4" />
          
          <path d="M 50% 30% L 65% 50%" stroke="#334155" strokeWidth="4" strokeDasharray="8 8" />
          <path d="M 50% 30% L 65% 50%" stroke="#3B82F6" strokeWidth="4" />
          
          <path d="M 35% 50% L 50% 70%" stroke="#334155" strokeWidth="4" strokeDasharray="8 8" />
          <path d="M 35% 50% L 50% 70%" stroke="#FF5722" strokeWidth="4" className="animate-pulse" />
          
          <path d="M 65% 50% L 50% 70%" stroke="#334155" strokeWidth="4" strokeDasharray="8 8" />
          <path d="M 65% 50% L 50% 70%" stroke="#3B82F6" strokeWidth="4" />
          
          <path d="M 50% 70% L 35% 90%" stroke="#334155" strokeWidth="4" strokeDasharray="8 8" />
          <path d="M 50% 70% L 65% 90%" stroke="#334155" strokeWidth="4" strokeDasharray="8 8" />
        </svg>

        {/* Level 1 */}
        <div className="absolute top-[10%] left-1/2 -translate-x-1/2 -translate-y-1/2">
          <SkillNode skill={skills[0]} />
        </div>
        
        {/* Level 2 */}
        <div className="absolute top-[30%] left-1/2 -translate-x-1/2 -translate-y-1/2">
          <SkillNode skill={{...skills[0], label: "Core"}} hidden /> {/* Spacer */}
        </div>
        <div className="absolute top-[50%] left-[35%] -translate-x-1/2 -translate-y-1/2">
          <SkillNode skill={skills[1]} />
        </div>
        <div className="absolute top-[50%] left-[65%] -translate-x-1/2 -translate-y-1/2">
          <SkillNode skill={skills[2]} />
        </div>

        {/* Level 3 */}
        <div className="absolute top-[70%] left-1/2 -translate-x-1/2 -translate-y-1/2">
          <SkillNode skill={skills[3]} />
        </div>

        {/* Level 4/5 */}
        <div className="absolute top-[90%] left-[35%] -translate-x-1/2 -translate-y-1/2">
          <SkillNode skill={skills[4]} />
        </div>
        <div className="absolute top-[90%] left-[65%] -translate-x-1/2 -translate-y-1/2">
          <SkillNode skill={skills[5]} />
        </div>

      </div>
    </div>
  );
}

function SkillNode({ skill, hidden }) {
  if (hidden) return <div className="w-16 h-16 opacity-0" />;

  return (
    <motion.div 
      whileHover={{ scale: skill.status !== 'locked' ? 1.1 : 1 }}
      className={cn(
        "flex flex-col items-center gap-2 group cursor-pointer",
        skill.status === 'locked' ? "opacity-50 cursor-not-allowed" : ""
      )}
    >
      <div className={cn(
        "w-16 h-16 rounded-2xl flex items-center justify-center border-4 shadow-lg transition-all relative z-10",
        skill.status === 'unlocked' ? "bg-gradient-to-br from-[#3B82F6] to-[#8B5CF6] border-[#1E293B] text-white shadow-[0_0_20px_rgba(59,130,246,0.3)]" :
        skill.status === 'in-progress' ? "bg-[#FF5722] border-[#1E293B] text-white shadow-[0_0_25px_rgba(255,87,34,0.5)]" :
        "bg-[#1E293B] border-[#0F172A] text-[#64748B]"
      )}>
        {skill.status === 'locked' ? <Lock size={24} /> : skill.icon}
        {skill.status === 'in-progress' && (
          <span className="absolute -top-2 -right-2 w-4 h-4 bg-[#22C55E] rounded-full border-2 border-[#1E293B] animate-pulse"></span>
        )}
      </div>
      <span className={cn(
        "text-xs font-bold text-center w-24 px-2 py-1 rounded-lg backdrop-blur-sm",
        skill.status === 'unlocked' ? "text-white bg-white/10" :
        skill.status === 'in-progress' ? "text-[#FF5722] bg-[#FF5722]/10" :
        "text-[#64748B] bg-transparent"
      )}>{skill.label}</span>
    </motion.div>
  );
}
