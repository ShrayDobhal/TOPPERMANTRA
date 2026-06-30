import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Trophy, Flame, Target, ChevronRight, CheckCircle2, Circle, 
  Search, Users, Briefcase, Calendar, Star, Clock, ArrowRight,
  TrendingUp, Award, Activity, Loader2, Play, FileText, Bell, MessageSquare, Zap, GitBranch, Hexagon, PlusCircle
} from 'lucide-react';
import { cn } from '../../../lib/utils';
import { useQuery } from '@tanstack/react-query';
import api from '../../../lib/api';
import { ProgressRing } from '../../../components/ui/ProgressRing';

// === Mock Data ===
const profileMock = { 
  level: 8, 
  streak: 21, 
  careerGoal: 'AI Engineer', 
  xp: 2480, 
  communityScore: 850, 
  healthScore: 92,
  rank: 14 
};

const journeySteps = [
  { id: 1, title: 'Choose Career', status: 'completed', date: 'Oct 1' },
  { id: 2, title: 'Learn Python', status: 'completed', date: 'Oct 15' },
  { id: 3, title: 'JavaScript Fundamentals', status: 'in-progress', date: 'Est. 2 days left' },
  { id: 4, title: 'Build React Project', status: 'upcoming', date: 'Next' },
  { id: 5, title: 'Get Mentor', status: 'locked', date: '' },
];

const initialTasks = [
  { id: 1, text: 'Finish React Module', completed: false, category: 'Learning' },
  { id: 2, text: 'Apply for Stripe Internship', completed: false, category: 'Opportunity' },
  { id: 3, text: 'Join AI Community Discussion', completed: false, category: 'Community' },
  { id: 4, text: 'Complete Project Task #12', completed: false, category: 'Project' },
  { id: 5, text: 'Book Mentor Session', completed: true, category: 'Mentorship' },
];

const quickActions = [
  { icon: <Users size={24} className="text-[#3B82F6]" />, title: 'Find Mentor', desc: 'Get 1:1 guidance', bg: 'bg-[#3B82F6]/10' },
  { icon: <Target size={24} className="text-[#A855F7]" />, title: 'Opportunities', desc: 'Internships & Jobs', bg: 'bg-[#A855F7]/10' },
  { icon: <Briefcase size={24} className="text-[#22C55E]" />, title: 'Continue Project', desc: 'Resume Builder AI', bg: 'bg-[#22C55E]/10' },
  { icon: <MessageSquare size={24} className="text-[#F59E0B]" />, title: 'Join Community', desc: 'Discuss with peers', bg: 'bg-[#F59E0B]/10' },
  { icon: <FileText size={24} className="text-[#EC4899]" />, title: 'Resume Builder', desc: 'Update profile', bg: 'bg-[#EC4899]/10' },
  { icon: <PlusCircle size={24} className="text-[#FF5722]" />, title: 'Start Project', desc: 'Build something new', bg: 'bg-[#FF5722]/10' },
];

// Re-using lucide-react Plus since I didn't import it at the top, let me import it. Wait, I didn't import Plus. I'll just use Hexagon.

const recommendations = [
  { type: 'Mentor', title: 'Sarah Chen', subtitle: 'Senior AI Engineer at Google', why: 'Matches your goal to learn Machine Learning.', icon: <Users size={16}/>, color: 'text-blue-500', bg: 'bg-blue-50' },
  { type: 'Internship', title: 'Frontend Developer', subtitle: 'Stripe • Remote', why: 'You completed the React module requirement.', icon: <Briefcase size={16}/>, color: 'text-green-500', bg: 'bg-green-50' },
  { type: 'Hackathon', title: 'Build for India', subtitle: 'Online • Oct 24-26', why: 'Great way to boost your portfolio score.', icon: <Trophy size={16}/>, color: 'text-orange-500', bg: 'bg-orange-50' },
];

const stats = [
  { label: 'Projects', value: '4', icon: <Briefcase size={20}/>, color: 'text-[#3B82F6]' },
  { label: 'Mentor Sessions', value: '12', icon: <Users size={20}/>, color: 'text-[#22C55E]' },
  { label: 'Communities', value: '3', icon: <MessageSquare size={20}/>, color: 'text-[#A855F7]' },
  { label: 'Hackathons', value: '2', icon: <Trophy size={20}/>, color: 'text-[#F59E0B]' },
  { label: 'Applications', value: '8', icon: <Target size={20}/>, color: 'text-[#EC4899]' },
  { label: 'Certificates', value: '5', icon: <Award size={20}/>, color: 'text-[#14B8A6]' },
  { label: 'Open Source', value: '15', icon: <GitBranch size={20}/>, color: 'text-[#64748B]' },
];

const recentActivity = [
  { text: 'Applied to Microsoft Internship', time: '2 hours ago', icon: <Target size={14}/> },
  { text: 'Completed Python Roadmap', time: 'Yesterday', icon: <CheckCircle2 size={14}/> },
  { text: 'Joined AI Community', time: '2 days ago', icon: <Users size={14}/> },
  { text: 'Started New Project', time: '4 days ago', icon: <Briefcase size={14}/> },
  { text: 'Received Mentor Feedback', time: '5 days ago', icon: <MessageSquare size={14}/> },
];

const leaderboard = [
  { rank: 1, name: 'Alex K.', xp: 4200, isUser: false },
  { rank: 2, name: 'Priya M.', xp: 3950, isUser: false },
  { rank: 3, name: 'David L.', xp: 3800, isUser: false },
  { rank: 14, name: 'You', xp: 2480, isUser: true },
];

// === Animations ===
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } }
};

export default function Dashboard() {
  const { data: dashboardData, isLoading, error } = useQuery({
    queryKey: ['dashboard'],
    queryFn: async () => {
      try {
        const response = await api.get('/dashboard');
        return response.data.data;
      } catch (err) {
        console.warn("Backend not available, using mock dashboard data");
        return {
          profile: profileMock,
          todayTasks: initialTasks,
          recommendations: recommendations
        };
      }
    },
    retry: false
  });

  const [tasks, setTasks] = useState(initialTasks);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-10 h-10 text-[#FF5722] animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <p className="text-red-500 font-bold mb-2">Error loading Mission Control</p>
        <p className="text-gray-500 text-sm">Please try refreshing.</p>
      </div>
    );
  }

  const profile = dashboardData?.profile || profileMock;
  const todayTasks = dashboardData?.todayTasks || tasks;
  const recommended = dashboardData?.recommendations || recommendations;

  const toggleTask = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const completedTasksCount = todayTasks.filter(t => t.completed).length;
  const progressPercentage = profile.progressPercentage || Math.round((completedTasksCount / todayTasks.length) * 100) || 0;

  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 xl:gap-8 max-w-[1600px] mx-auto">
      
      {/* Main Content Column */}
      <motion.div 
        className="xl:col-span-8 flex flex-col gap-6 xl:gap-8"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        
        {/* 1. HERO SECTION */}
        <motion.div variants={fadeUp} className="bg-white rounded-[32px] p-6 sm:p-10 border border-[#E9ECEF] shadow-sm relative overflow-hidden group">
          {/* Glassmorphic Background Elements */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-[#FF5722]/5 to-[#A855F7]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 group-hover:scale-110 transition-transform duration-1000 ease-out"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 md:gap-12">
            
            {/* Animated Progress Ring */}
            <div className="shrink-0 relative flex items-center justify-center">
              <ProgressRing progress={68} size={160} strokeWidth={14}>
                <div className="flex flex-col items-center text-center">
                  <span className="text-3xl font-extrabold text-[#0F172A] tracking-tight">68%</span>
                  <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Progress</span>
                </div>
              </ProgressRing>
            </div>

            {/* Welcome & Stats */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl sm:text-4xl font-extrabold font-heading text-[#0F172A] mb-2 tracking-tight">
                Good Morning, Shray 👋
              </h1>
              <p className="text-[#64748B] text-base font-medium mb-6">Continue your <strong className="text-[#0F172A]">AI Engineer</strong> Journey.</p>
              
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 sm:gap-6 mb-6">
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider mb-1">Current Level</span>
                  <div className="flex items-center gap-1.5">
                    <Star size={18} className="text-[#F59E0B] fill-[#F59E0B]" />
                    <span className="text-lg font-bold text-[#0F172A]">Builder Level {profile.level}</span>
                  </div>
                </div>
                <div className="w-px h-10 bg-[#E9ECEF] hidden sm:block"></div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider mb-1">Total XP</span>
                  <div className="flex items-center gap-1.5">
                    <Zap size={18} className="text-[#A855F7] fill-[#A855F7]" />
                    <span className="text-lg font-bold text-[#0F172A]">{profile.xp.toLocaleString()} XP</span>
                  </div>
                </div>
                <div className="w-px h-10 bg-[#E9ECEF] hidden sm:block"></div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider mb-1">Current Streak</span>
                  <div className="flex items-center gap-1.5">
                    <Flame size={18} className="text-[#EF4444] fill-[#EF4444]" />
                    <span className="text-lg font-bold text-[#0F172A]">{profile.streak} Days</span>
                  </div>
                </div>
              </div>

              <div className="bg-[#F8FAFC] rounded-2xl p-4 border border-[#E9ECEF] flex items-center justify-between gap-4 flex-wrap">
                <div>
                  <p className="text-xs font-bold text-[#FF5722] uppercase tracking-wider mb-1">Today's Mission</p>
                  <p className="text-sm font-bold text-[#0F172A]">Complete JavaScript Fundamentals</p>
                </div>
                <button className="flex items-center gap-2 bg-[#FF5722] text-white px-5 py-2.5 rounded-xl font-bold hover:bg-[#E64A19] transition-all shadow-[0_4px_14px_0_rgba(255,87,34,0.39)] hover:shadow-[0_6px_20px_rgba(255,87,34,0.23)] hover:-translate-y-0.5 w-full sm:w-auto justify-center">
                  <Play size={16} className="fill-current" />
                  Continue Journey
                </button>
              </div>
            </div>

          </div>
        </motion.div>

        {/* 2. MY JOURNEY SNAPSHOT */}
        <motion.div variants={fadeUp} className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E9ECEF] shadow-sm flex flex-col xl:flex-row gap-8 items-center">
          <div className="w-full xl:w-1/3 text-center xl:text-left">
            <h2 className="text-xl font-bold font-heading text-[#0F172A] mb-2">My Journey</h2>
            <p className="text-sm text-[#64748B] mb-6">Your customized path to becoming an AI Engineer.</p>
            
            <div className="flex items-center justify-center xl:justify-start gap-4 mb-6">
              <div className="relative">
                <ProgressRing progress={profile.healthScore} size={80} strokeWidth={8} primaryColor="#22C55E" secondaryColor="#16A34A">
                  <span className="text-xl font-bold text-[#0F172A]">{profile.healthScore}</span>
                </ProgressRing>
              </div>
              <div className="text-left">
                <p className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider">Health Score</p>
                <p className="text-sm font-bold text-[#22C55E]">Excellent Pace</p>
              </div>
            </div>
            
            <button className="text-sm font-bold text-[#FF5722] hover:text-[#E64A19] flex items-center justify-center xl:justify-start gap-1 w-full transition-colors">
              Open Full Journey <ArrowRight size={16} />
            </button>
          </div>
          
          <div className="w-full xl:w-2/3">
            <div className="relative pt-4">
              {/* Horizontal Track line */}
              <div className="absolute top-9 left-0 w-full h-1 bg-[#F1F5F9] rounded-full hidden md:block z-0"></div>
              
              <div className="grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-0 relative z-10">
                {journeySteps.map((step, i) => (
                  <div key={step.id} className="flex flex-row md:flex-col items-center gap-4 md:gap-3">
                    
                    {/* Status Indicator */}
                    <div className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center shrink-0 border-2 transition-colors z-10 bg-white shadow-sm",
                      step.status === 'completed' ? "border-[#22C55E] text-[#22C55E]" :
                      step.status === 'in-progress' ? "border-[#FF5722] text-[#FF5722] shadow-[0_0_15px_rgba(255,87,34,0.2)]" :
                      step.status === 'upcoming' ? "border-[#CBD5E1] text-[#94A3B8]" :
                      "border-[#F1F5F9] bg-[#F8FAFC] text-[#CBD5E1]"
                    )}>
                      {step.status === 'completed' ? <CheckCircle2 size={20} className="fill-[#22C55E]/10" /> :
                       step.status === 'in-progress' ? <Circle size={16} className="fill-[#FF5722] animate-pulse" /> :
                       <Circle size={12} className="fill-current" />}
                    </div>

                    {/* Desktop Connecting Line Fill */}
                    {i > 0 && step.status !== 'locked' && step.status !== 'upcoming' && (
                      <div className="absolute top-9 left-0 h-1 bg-[#22C55E] -z-10 hidden md:block" style={{ width: `${(i / 4) * 100}%` }}></div>
                    )}

                    {/* Details */}
                    <div className="md:text-center flex-1">
                      <p className={cn(
                        "text-[13px] font-bold mb-1 leading-tight",
                        step.status === 'locked' ? "text-[#94A3B8]" : "text-[#0F172A]"
                      )}>{step.title}</p>
                      {step.date && (
                        <p className={cn(
                          "text-[10px] font-bold uppercase tracking-wider",
                          step.status === 'in-progress' ? "text-[#FF5722]" : "text-[#64748B]"
                        )}>{step.date}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* 3. QUICK ACTIONS GRID */}
        <motion.div variants={fadeUp}>
          <h2 className="text-sm font-bold text-[#64748B] uppercase tracking-wider mb-4 px-2">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {quickActions.map((action, i) => (
              <div key={i} className="bg-white p-5 rounded-2xl border border-[#E9ECEF] shadow-sm hover:shadow-lg hover:-translate-y-1.5 transition-all duration-300 cursor-pointer group">
                <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110", action.bg)}>
                  {action.icon}
                </div>
                <h3 className="font-bold text-[#0F172A] mb-1">{action.title}</h3>
                <p className="text-xs text-[#64748B] font-medium">{action.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 xl:gap-8">
          {/* 4. TODAY'S TASKS */}
          <motion.div variants={fadeUp} className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E9ECEF] shadow-sm flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold font-heading text-[#0F172A]">Today's Checklist</h2>
              <span className="text-sm font-bold text-[#FF5722] bg-[#FF5722]/10 px-3 py-1 rounded-full">
                {completedTasksCount}/{todayTasks.length} Done
              </span>
            </div>
            
            <div className="space-y-3 flex-1">
              <AnimatePresence>
                {todayTasks.map(task => (
                  <motion.div 
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={task.id} 
                    onClick={() => toggleTask(task.id)}
                    className={cn(
                      "group flex items-center gap-4 p-4 rounded-2xl border transition-all cursor-pointer overflow-hidden relative",
                      task.completed ? "bg-[#F8FAFC] border-[#E9ECEF]" : "bg-white border-[#E9ECEF] hover:border-[#FF5722]/30 hover:shadow-sm"
                    )}
                  >
                    {task.completed && (
                      <motion.div 
                        initial={{ width: 0 }} animate={{ width: "100%" }} 
                        className="absolute left-0 top-0 bottom-0 bg-green-50/50 -z-10"
                      />
                    )}
                    <motion.div 
                      whileTap={{ scale: 0.8 }}
                      className={cn(
                      "w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors z-10",
                      task.completed ? "border-[#22C55E] bg-[#22C55E]" : "border-[#CBD5E1] group-hover:border-[#FF5722]"
                    )}>
                      {task.completed && <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}><CheckCircle2 size={16} className="text-white" /></motion.div>}
                    </motion.div>
                    <div className="flex-1 z-10">
                      <p className={cn(
                        "text-sm font-bold transition-all",
                        task.completed ? "text-[#94A3B8] line-through" : "text-[#0F172A]"
                      )}>{task.text}</p>
                      <p className="text-[10px] uppercase tracking-wider font-bold text-[#64748B] mt-1">{task.category}</p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* 5. RECOMMENDED FOR YOU */}
          <motion.div variants={fadeUp} className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E9ECEF] shadow-sm flex flex-col">
            <h2 className="text-xl font-bold font-heading text-[#0F172A] mb-6">AI Recommendations</h2>
            <div className="space-y-4 flex-1">
              {recommended.map((rec, i) => (
                <div key={i} className="flex flex-col p-4 rounded-2xl border border-[#E9ECEF] hover:shadow-md hover:border-[#FF5722]/30 transition-all group cursor-pointer bg-white">
                  <div className="flex items-start gap-4 mb-3">
                    <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center shrink-0", rec.bg || 'bg-blue-50', rec.color || 'text-blue-500')}>
                      {rec.icon || <Star size={16} />}
                    </div>
                    <div className="flex-1 min-w-0 pt-0.5">
                      <p className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider mb-0.5">{rec.type}</p>
                      <h4 className="text-sm font-bold text-[#0F172A] truncate group-hover:text-[#FF5722] transition-colors">{rec.title}</h4>
                      <p className="text-xs text-[#64748B] truncate">{rec.subtitle}</p>
                    </div>
                    <ChevronRight size={18} className="text-[#CBD5E1] group-hover:text-[#FF5722] group-hover:translate-x-1 transition-all mt-2" />
                  </div>
                  <div className="bg-[#F8FAFC] rounded-xl p-3 border border-[#E9ECEF]/50">
                    <p className="text-xs font-semibold text-[#0F172A] flex items-start gap-2">
                      <Zap size={14} className="text-[#F59E0B] shrink-0 mt-0.5" />
                      <span className="leading-snug">{rec.why}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

      </motion.div>

      {/* Right Insights Panel */}
      <motion.div 
        className="xl:col-span-4 flex flex-col gap-6 xl:gap-8"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        
        {/* 6. NOTIFICATION SUMMARY */}
        <motion.div variants={fadeUp} className="bg-gradient-to-br from-[#0F172A] to-[#1E293B] rounded-3xl p-6 border border-[#334155] shadow-lg text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF5722]/20 blur-2xl rounded-full translate-x-1/2 -translate-y-1/2"></div>
          <div className="flex items-center justify-between mb-4 relative z-10">
            <h3 className="text-sm font-bold text-[#94A3B8] uppercase tracking-wider flex items-center gap-2">
              <Bell size={16} /> What's New
            </h3>
            <span className="bg-[#EF4444] text-white text-xs font-bold px-2 py-0.5 rounded-full">3 Unread</span>
          </div>
          <div className="space-y-3 relative z-10">
            <div className="flex gap-3 items-start p-3 bg-white/10 rounded-xl backdrop-blur-sm border border-white/5 cursor-pointer hover:bg-white/20 transition-colors">
              <div className="w-2 h-2 rounded-full bg-[#3B82F6] mt-1.5 shrink-0"></div>
              <div>
                <p className="text-sm font-bold">New Mentor Reply</p>
                <p className="text-xs text-[#CBD5E1]">Sarah Chen replied to your message.</p>
              </div>
            </div>
            <div className="flex gap-3 items-start p-3 bg-white/10 rounded-xl backdrop-blur-sm border border-white/5 cursor-pointer hover:bg-white/20 transition-colors">
              <div className="w-2 h-2 rounded-full bg-[#22C55E] mt-1.5 shrink-0"></div>
              <div>
                <p className="text-sm font-bold">Project Approved</p>
                <p className="text-xs text-[#CBD5E1]">AI Resume Builder was approved.</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 7. LEADERBOARD PREVIEW */}
        <motion.div variants={fadeUp} className="bg-white rounded-3xl p-6 border border-[#E9ECEF] shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold font-heading text-[#0F172A]">Weekly Leaderboard</h3>
            <span className="text-xs font-bold text-[#FF5722] bg-[#FF5722]/10 px-2 py-1 rounded-md">Top 15%</span>
          </div>
          <div className="space-y-1">
            {leaderboard.map((user, i) => (
              <div key={i} className={cn(
                "flex items-center justify-between p-3 rounded-xl transition-colors cursor-pointer",
                user.isUser ? "bg-[#FF5722]/5 border border-[#FF5722]/20" : "hover:bg-[#F8FAFC] border border-transparent hover:border-[#E9ECEF]"
              )}>
                <div className="flex items-center gap-3">
                  <span className={cn(
                    "text-xs font-bold w-5",
                    user.rank === 1 ? "text-[#F59E0B]" : user.rank === 2 ? "text-[#94A3B8]" : user.rank === 3 ? "text-[#B45309]" : "text-[#64748B]"
                  )}>#{user.rank}</span>
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#3B82F6] to-[#8B5CF6] flex items-center justify-center text-white text-xs font-bold">
                    {user.name.charAt(0)}
                  </div>
                  <span className={cn("text-sm font-bold", user.isUser ? "text-[#FF5722]" : "text-[#0F172A]")}>{user.name}</span>
                </div>
                <span className="text-xs font-bold text-[#64748B]">{user.xp} XP</span>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 py-2 border border-[#E9ECEF] rounded-xl text-xs font-bold text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#0F172A] transition-colors">
            View Full Rankings
          </button>
        </motion.div>

        {/* 8. MY STATS EXPANDED */}
        <motion.div variants={fadeUp} className="bg-white rounded-3xl p-6 border border-[#E9ECEF] shadow-sm">
          <h3 className="text-lg font-bold font-heading text-[#0F172A] mb-6">My Stats</h3>
          <div className="grid grid-cols-2 gap-3">
            {stats.map((stat, i) => (
              <div key={i} className={cn(
                "bg-[#F8FAFC] p-4 rounded-2xl border border-[#E9ECEF] flex flex-col hover:border-[#FF5722]/30 transition-colors",
                i === stats.length - 1 ? "col-span-2 flex-row items-center justify-between" : ""
              )}>
                <div className="flex items-center gap-2 mb-2">
                  <div className={stat.color}>{stat.icon}</div>
                  {i === stats.length - 1 && <span className="text-xs font-bold text-[#64748B] uppercase tracking-wider">{stat.label}</span>}
                </div>
                {i !== stats.length - 1 && <span className="text-xs font-bold text-[#64748B] uppercase tracking-wider mb-1">{stat.label}</span>}
                <span className="text-xl font-extrabold text-[#0F172A]">{stat.value}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* 9. RECENT ACTIVITY TIMELINE */}
        <motion.div variants={fadeUp} className="bg-white rounded-3xl p-6 border border-[#E9ECEF] shadow-sm flex-1">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold font-heading text-[#0F172A]">Recent Activity</h3>
            <Activity size={18} className="text-[#CBD5E1]" />
          </div>
          
          <div className="space-y-6 relative before:absolute before:inset-0 before:ml-2.5 before:-translate-x-px before:h-full before:w-0.5 before:bg-[#E9ECEF]">
            {recentActivity.map((activity, i) => (
              <div key={i} className="relative flex items-start gap-4 group">
                <div className="flex items-center justify-center w-6 h-6 rounded-full border-2 border-white bg-[#F1F5F9] text-[#64748B] group-hover:bg-[#FF5722] group-hover:text-white transition-colors shadow-sm shrink-0 relative z-10 mt-1">
                  {activity.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-[#0F172A] mb-1 leading-snug">{activity.text}</p>
                  <p className="text-xs font-semibold text-[#64748B]">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
          
          <button className="w-full mt-6 py-3 border border-[#E9ECEF] rounded-xl text-sm font-bold text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#0F172A] transition-colors">
            View All Activity
          </button>
        </motion.div>

      </motion.div>

    </div>
  );
}
