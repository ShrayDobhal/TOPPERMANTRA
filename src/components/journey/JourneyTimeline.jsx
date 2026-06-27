import { motion } from 'framer-motion';
import { Check, Lock, Play, Circle, BookOpen, Code, Briefcase, FileText, Send, UserCheck, Star, Sparkles } from 'lucide-react';
import { cn } from '../../lib/utils';

export default function JourneyTimeline() {
  const modules = [
    {
      id: "foundation",
      title: "Foundation",
      status: "completed", // completed, in-progress, locked
      icon: <BookOpen size={20} />,
      estimatedTime: "2 Weeks",
      xpReward: 500,
      milestones: [
        { label: "Profile Complete", status: "completed" },
        { label: "Choose Career Goal", status: "completed" },
        { label: "Tech Industry 101", status: "completed" },
      ]
    },
    {
      id: "programming",
      title: "Programming",
      status: "in-progress",
      icon: <Code size={20} />,
      estimatedTime: "8 Weeks",
      xpReward: 1200,
      milestones: [
        { label: "JavaScript Fundamentals", status: "in-progress" },
        { label: "Data Structures & Algorithms", status: "locked" },
        { label: "React JS Basics", status: "locked" },
      ]
    },
    {
      id: "projects",
      title: "Projects",
      status: "locked",
      icon: <Briefcase size={20} />,
      estimatedTime: "6 Weeks",
      xpReward: 2000,
      milestones: [
        { label: "Build Portfolio Website", status: "locked" },
        { label: "API Integration Project", status: "locked" },
        { label: "Full Stack App", status: "locked" },
      ]
    },
    {
      id: "resume",
      title: "Resume & Portfolio",
      status: "locked",
      icon: <FileText size={20} />,
      estimatedTime: "2 Weeks",
      xpReward: 800,
      milestones: [
        { label: "Draft V1 Resume", status: "locked" },
        { label: "ATS Optimization", status: "locked" },
        { label: "Update GitHub Profile", status: "locked" },
      ]
    },
    {
      id: "networking",
      title: "Networking",
      status: "locked",
      icon: <UserCheck size={20} />,
      estimatedTime: "Ongoing",
      xpReward: 1500,
      milestones: [
        { label: "Optimize LinkedIn", status: "locked" },
        { label: "Connect with 50 Peers", status: "locked" },
        { label: "Receive Mentor Feedback", status: "locked" },
      ]
    },
    {
      id: "placement",
      title: "Placement",
      status: "locked",
      icon: <Sparkles size={20} />,
      estimatedTime: "4 Weeks",
      xpReward: 5000,
      milestones: [
        { label: "Apply to 50 Jobs", status: "locked" },
        { label: "Mock Interviews", status: "locked" },
        { label: "Get Offer", status: "locked" },
      ]
    }
  ];

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E9ECEF] shadow-sm">
      <h2 className="text-xl font-bold font-heading text-[#0F172A] mb-8">Your Journey</h2>
      
      <div className="relative">
        {/* Main Vertical Line */}
        <div className="absolute left-[27px] sm:left-[35px] top-6 bottom-6 w-0.5 bg-[#F1F5F9] rounded-full" />
        
        <div className="space-y-8">
          {modules.map((mod, index) => {
            const isCompleted = mod.status === 'completed';
            const isInProgress = mod.status === 'in-progress';
            const isLocked = mod.status === 'locked';

            return (
              <motion.div 
                key={mod.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={cn("relative z-10 flex gap-4 sm:gap-6", isLocked && "opacity-60 grayscale")}
              >
                {/* Module Icon Indicator */}
                <div className={cn(
                  "w-[54px] h-[54px] sm:w-[70px] sm:h-[70px] shrink-0 rounded-2xl flex items-center justify-center border-4 border-white shadow-sm transition-all duration-300 relative",
                  isCompleted ? "bg-[#10B981] text-white" : 
                  isInProgress ? "bg-[#FF5722] text-white shadow-lg shadow-[#FF5722]/30 scale-110" : 
                  "bg-[#F1F5F9] text-[#94A3B8]"
                )}>
                  {isInProgress && (
                    <span className="absolute inset-0 rounded-2xl bg-[#FF5722] animate-ping opacity-20"></span>
                  )}
                  {mod.icon}
                </div>

                {/* Module Content */}
                <div className="flex-1 pt-1 sm:pt-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-[#0F172A]">{mod.title}</h3>
                      <div className="flex items-center gap-3 mt-1 text-xs font-bold text-[#64748B] uppercase tracking-wider">
                        <span>{mod.estimatedTime}</span>
                        <span className="w-1 h-1 rounded-full bg-[#CBD5E1]"></span>
                        <span className="text-[#FF5722]">{mod.xpReward} XP</span>
                      </div>
                    </div>
                    {isInProgress && (
                      <button className="self-start sm:self-center px-4 py-2 bg-[#FF5722]/10 text-[#FF5722] text-xs font-bold rounded-lg hover:bg-[#FF5722] hover:text-white transition-colors">
                        Continue
                      </button>
                    )}
                  </div>

                  {/* Milestones */}
                  <div className="space-y-3 bg-[#F8FAFC] rounded-xl p-4 sm:p-5 border border-[#E9ECEF]">
                    {mod.milestones.map((milestone, mIndex) => (
                      <div key={mIndex} className="flex items-start gap-3">
                        <div className="mt-0.5 shrink-0">
                          {milestone.status === 'completed' ? (
                            <div className="w-5 h-5 rounded-full bg-[#10B981] flex items-center justify-center text-white">
                              <Check size={12} strokeWidth={3} />
                            </div>
                          ) : milestone.status === 'in-progress' ? (
                            <div className="w-5 h-5 rounded-full border-2 border-[#FF5722] flex items-center justify-center">
                              <div className="w-2 h-2 rounded-full bg-[#FF5722] animate-pulse"></div>
                            </div>
                          ) : (
                            <div className="w-5 h-5 rounded-full bg-[#E2E8F0] flex items-center justify-center text-[#94A3B8]">
                              <Lock size={10} />
                            </div>
                          )}
                        </div>
                        <span className={cn(
                          "text-sm font-semibold",
                          milestone.status === 'completed' ? "text-[#64748B] line-through decoration-[#94A3B8]/50" :
                          milestone.status === 'in-progress' ? "text-[#0F172A]" : "text-[#94A3B8]"
                        )}>
                          {milestone.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
