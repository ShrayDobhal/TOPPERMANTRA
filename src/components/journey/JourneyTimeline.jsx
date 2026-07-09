import { motion } from 'framer-motion';
import { CheckCircle2, Circle, Lock, Play, Trophy, Users, Briefcase } from 'lucide-react';
import { cn } from '../../lib/utils';
import useStudentStore from '../../store/useStudentStore';

export default function JourneyTimeline() {
  const profile = useStudentStore((s) => s.profile);
  const xp = profile?.xp || 0;

  // Dynamically calculate status based on actual XP
  const getStepStatus = (stepId) => {
    if (stepId === 1 || stepId === 2) return 'completed';
    if (stepId === 3) {
      if (xp >= 200) return 'completed';
      return 'in-progress';
    }
    if (stepId === 4) {
      if (xp >= 350) return 'completed';
      if (xp >= 200) return 'in-progress';
      return 'locked';
    }
    if (stepId === 5) {
      if (xp >= 650) return 'completed';
      if (xp >= 350) return 'in-progress';
      return 'locked';
    }
    // Rest are locked unless they reach higher thresholds
    return 'locked';
  };

  const getLineHeight = () => {
    if (xp >= 650) return '55%';
    if (xp >= 350) return '45%';
    if (xp >= 200) return '33%';
    return '18%'; // only up to Step 2 when they have 0 XP
  };

  const roadmapSteps = [
    { id: 1, title: 'Profile Complete', type: 'setup', status: getStepStatus(1), desc: 'Added details and goals.', xp: 50 },
    { id: 2, title: 'Career Selected', type: 'setup', status: getStepStatus(2), desc: 'AI Engineer track chosen.', xp: 50 },
    { id: 3, title: 'Python Basics', type: 'learning', status: getStepStatus(3), desc: 'Mastered core syntax and data structures.', xp: 200 },
    { id: 4, title: 'Git & GitHub', type: 'learning', status: getStepStatus(4), desc: 'Version control fundamentals.', xp: 150 },
    { id: 5, title: 'Build Portfolio Website', type: 'project', status: getStepStatus(5), desc: 'Showcase your skills online.', xp: 300 },
    { id: 6, title: 'Complete AI Project', type: 'project', status: getStepStatus(6), desc: 'Resume Analyzer with NLP.', xp: 500 },
    { id: 7, title: 'Participate in Hackathon', type: 'community', status: getStepStatus(7), desc: 'Test your skills under pressure.', xp: 400 },
    { id: 8, title: 'Get Mentor Review', type: 'mentorship', status: getStepStatus(8), desc: 'Feedback from a senior engineer.', xp: 150 },
    { id: 9, title: 'Apply Internship', type: 'career', status: getStepStatus(9), desc: 'Land your first tech role.', xp: 500 },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <div className="bg-white rounded-[32px] p-6 sm:p-10 border border-[#E9ECEF] shadow-sm relative">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h2 className="text-2xl font-bold font-heading text-[#0F172A] mb-1">Roadmap</h2>
          <p className="text-sm font-semibold text-[#64748B]">Your personalized path to success.</p>
        </div>
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="relative"
      >
        {/* Vertical Track */}
        <div className="absolute left-[27px] top-4 bottom-8 w-1.5 bg-[#F1F5F9] rounded-full z-0"></div>
        {/* Animated Fill for completed steps */}
        <motion.div 
          initial={{ height: 0 }}
          whileInView={{ height: getLineHeight() }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          viewport={{ once: true }}
          className="absolute left-[27px] top-4 w-1.5 bg-gradient-to-b from-[#22C55E] via-[#22C55E] to-[#FF5722] rounded-full z-0"
        ></motion.div>

        <div className="space-y-8 relative z-10">
          {roadmapSteps.map((step, i) => (
            <motion.div key={step.id} variants={itemVariants} className="flex gap-6 group">
              
              {/* Icon / Status */}
              <div className="shrink-0 relative">
                <div className={cn(
                  "w-14 h-14 rounded-2xl flex items-center justify-center border-4 border-white shadow-sm transition-all duration-300",
                  step.status === 'completed' ? "bg-[#22C55E] text-white" :
                  step.status === 'in-progress' ? "bg-[#FF5722] text-white shadow-[0_0_20px_rgba(255,87,34,0.3)] scale-110" :
                  "bg-[#F1F5F9] text-[#94A3B8]"
                )}>
                  {step.status === 'completed' ? <CheckCircle2 size={24} /> :
                   step.status === 'in-progress' ? <Play size={24} className="fill-current ml-1" /> :
                   <Lock size={20} />}
                </div>
                
                {/* Pulse ring for in-progress */}
                {step.status === 'in-progress' && (
                  <div className="absolute inset-0 rounded-2xl border-2 border-[#FF5722] animate-ping opacity-20 scale-110"></div>
                )}
              </div>

              {/* Content Card */}
              <div className={cn(
                "flex-1 p-5 rounded-2xl border transition-all duration-300",
                step.status === 'completed' ? "bg-white border-[#E9ECEF] group-hover:border-[#22C55E]/30" :
                step.status === 'in-progress' ? "bg-[#FF5722]/5 border-[#FF5722]/30" :
                "bg-[#F8FAFC] border-transparent"
              )}>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className={cn(
                      "text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full",
                      step.status === 'completed' ? "bg-[#22C55E]/10 text-[#22C55E]" :
                      step.status === 'in-progress' ? "bg-[#FF5722]/10 text-[#FF5722]" :
                      "bg-[#E2E8F0] text-[#64748B]"
                    )}>
                      {step.type}
                    </span>
                    {step.status === 'in-progress' && (
                      <span className="text-[10px] font-bold text-[#FF5722] animate-pulse flex items-center gap-1">
                        <Circle size={8} className="fill-current" /> CURRENT STAGE
                      </span>
                    )}
                  </div>
                  <span className={cn(
                    "text-xs font-bold",
                    step.status === 'locked' ? "text-[#94A3B8]" : "text-[#F59E0B]"
                  )}>+{step.xp} XP</span>
                </div>
                
                <h3 className={cn(
                  "text-lg font-bold mb-1",
                  step.status === 'locked' ? "text-[#94A3B8]" : "text-[#0F172A]"
                )}>
                  {step.title}
                </h3>
                <p className="text-sm text-[#64748B]">{step.desc}</p>
                
                {step.status === 'in-progress' && (
                  <button className="mt-4 text-sm font-bold text-white bg-[#FF5722] px-4 py-2 rounded-lg hover:bg-[#E64A19] transition-colors shadow-sm">
                    Continue Task
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
