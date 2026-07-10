import { motion } from 'framer-motion';
import { 
  Code, Cpu, Database, Shield, Cloud, Briefcase, 
  PenTool, Rocket, BookOpen, GraduationCap 
} from 'lucide-react';
import { cn } from '../../../lib/utils';

const goals = [
  { id: 'swe', title: 'Software Engineer', icon: <Code size={24} />, color: 'from-blue-500 to-cyan-400', shadow: 'shadow-blue-500/20' },
  { id: 'ai', title: 'AI Engineer', icon: <Cpu size={24} />, color: 'from-orange-500 to-red-400', shadow: 'shadow-orange-500/20' },
  { id: 'data', title: 'Data Scientist', icon: <Database size={24} />, color: 'from-green-500 to-emerald-400', shadow: 'shadow-green-500/20' },
  { id: 'cyber', title: 'Cyber Security', icon: <Shield size={24} />, color: 'from-purple-500 to-fuchsia-400', shadow: 'shadow-purple-500/20' },
  { id: 'cloud', title: 'Cloud Engineer', icon: <Cloud size={24} />, color: 'from-sky-500 to-blue-400', shadow: 'shadow-sky-500/20' },
  { id: 'pm', title: 'Product Manager', icon: <Briefcase size={24} />, color: 'from-yellow-500 to-orange-400', shadow: 'shadow-yellow-500/20' },
  { id: 'design', title: 'UI/UX Designer', icon: <PenTool size={24} />, color: 'from-pink-500 to-rose-400', shadow: 'shadow-pink-500/20' },
  { id: 'founder', title: 'Entrepreneur', icon: <Rocket size={24} />, color: 'from-indigo-500 to-violet-400', shadow: 'shadow-indigo-500/20' },
  { id: 'research', title: 'Research', icon: <BookOpen size={24} />, color: 'from-teal-500 to-cyan-400', shadow: 'shadow-teal-500/20' },
  { id: 'higher', title: 'Higher Studies', icon: <GraduationCap size={24} />, color: 'from-slate-600 to-slate-400', shadow: 'shadow-slate-500/20' },
];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } }
};

const item = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 }
};

export default function Step2CareerGoal({ data, updateData }) {
  return (
    <motion.div 
      className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {goals.map((goal) => {
        const isSelected = data === goal.id;
        
        return (
          <motion.button
            key={goal.id}
            variants={item}
            onClick={() => updateData(goal.id)}
            className={cn(
              "relative p-4 rounded-2xl flex items-center gap-4 transition-all duration-300 text-left border overflow-hidden group",
              isSelected 
                ? `bg-white border-transparent shadow-xl ${goal.shadow} scale-[1.02]`
                : "bg-white border-[#E9ECEF] hover:border-[#CBD5E1] hover:shadow-md hover:-translate-y-1"
            )}
          >
            {/* Selected Background Gradient */}
            {isSelected && (
              <div className="absolute inset-0 opacity-10 bg-gradient-to-br transition-opacity">
                <div className={cn("absolute inset-0 bg-gradient-to-br", goal.color)}></div>
              </div>
            )}

            <div className={cn(
              "w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-all",
              isSelected ? "text-white" : "text-[#64748B] group-hover:text-[#0F172A]"
            )}>
              {isSelected ? (
                <div className={cn("absolute inset-0 bg-gradient-to-br opacity-100 rounded-xl", goal.color)}></div>
              ) : (
                <div className="absolute inset-0 bg-[#F1F5F9] rounded-xl group-hover:bg-[#E2E8F0] transition-colors"></div>
              )}
              <span className="relative z-10">{goal.icon}</span>
            </div>
            
            <span className={cn(
              "font-bold text-sm sm:text-base relative z-10 transition-colors",
              isSelected ? "text-[#0F172A]" : "text-[#64748B] group-hover:text-[#0F172A]"
            )}>
              {goal.title}
            </span>

            {isSelected && (
              <motion.div 
                layoutId="outline"
                className={cn("absolute inset-0 border-2 rounded-2xl pointer-events-none z-20 opacity-50", `border-${goal.color.split('-')[1]}-500`)}
                initial={false}
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
          </motion.button>
        );
      })}
    </motion.div>
  );
}
