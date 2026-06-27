import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Trophy, Flame, Target, ChevronRight, CheckCircle2, Circle, 
  Search, Users, Briefcase, Calendar, Star, Clock, ArrowRight,
  TrendingUp, Award, Activity, Loader2
} from 'lucide-react';
import { cn } from '../lib/utils';
import { useQuery } from '@tanstack/react-query';
import api from '../lib/api';

// Mock Data
const journeySteps = [
  { id: 1, title: 'Choose Career', status: 'completed', date: 'Oct 1' },
  { id: 2, title: 'Roadmap Started', status: 'completed', date: 'Oct 5' },
  { id: 3, title: 'Complete First Project', status: 'in-progress', date: 'Due Oct 15' },
  { id: 4, title: 'Get Mentor', status: 'upcoming', date: 'Oct 20' },
  { id: 5, title: 'Apply Internship', status: 'locked', date: '' },
  { id: 6, title: 'Portfolio Ready', status: 'locked', date: '' },
];

const initialTasks = [
  { id: 1, text: 'Complete Python Module 3', completed: false, category: 'Learning' },
  { id: 2, text: 'Review Resume with Mentor', completed: true, category: 'Career' },
  { id: 3, text: 'Apply for Google Internship', completed: false, category: 'Opportunity' },
  { id: 4, text: 'Finish Project Milestone', completed: false, category: 'Project' },
];

const quickActions = [
  { icon: <Users size={24} className="text-[#3B82F6]" />, title: 'Find Mentor', desc: 'Book a 1:1 session', bg: 'bg-[#3B82F6]/10' },
  { icon: <Briefcase size={24} className="text-[#22C55E]" />, title: 'Browse Projects', desc: 'Join a team', bg: 'bg-[#22C55E]/10' },
  { icon: <Search size={24} className="text-[#A855F7]" />, title: 'Explore Internships', desc: 'Apply today', bg: 'bg-[#A855F7]/10' },
  { icon: <Trophy size={24} className="text-[#F59E0B]" />, title: 'Join Hackathon', desc: 'Compete & win', bg: 'bg-[#F59E0B]/10' },
];

const recommendations = [
  { type: 'Mentor', title: 'Sarah Chen', subtitle: 'Senior AI Engineer at Google', icon: <Users size={16}/>, color: 'text-blue-500', bg: 'bg-blue-50' },
  { type: 'Internship', title: 'Frontend Developer', subtitle: 'Stripe • Remote', icon: <Briefcase size={16}/>, color: 'text-green-500', bg: 'bg-green-50' },
  { type: 'Hackathon', title: 'Build for India', subtitle: 'Online • Oct 24-26', icon: <Trophy size={16}/>, color: 'text-orange-500', bg: 'bg-orange-50' },
];

const stats = [
  { label: 'Projects', value: '12', icon: <Briefcase size={20}/>, color: 'text-[#3B82F6]' },
  { label: 'Sessions', value: '8', icon: <Users size={20}/>, color: 'text-[#22C55E]' },
  { label: 'Applications', value: '24', icon: <Target size={20}/>, color: 'text-[#F59E0B]' },
  { label: 'Certificates', value: '5', icon: <Award size={20}/>, color: 'text-[#A855F7]' },
];

const recentActivity = [
  { text: 'Applied to Google Hackathon', time: '2 hours ago', icon: <Briefcase size={14}/> },
  { text: 'Completed AI Project Milestone', time: 'Yesterday', icon: <CheckCircle2 size={14}/> },
  { text: 'Joined Startup Community', time: '2 days ago', icon: <Users size={14}/> },
  { text: 'Booked Mentor Session', time: '3 days ago', icon: <Calendar size={14}/> },
];

// Animation Variants
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

export default function Dashboard() {
  const { data: dashboardData, isLoading, error } = useQuery({
    queryKey: ['dashboard'],
    queryFn: async () => {
      try {
        const response = await api.get('/dashboard');
        return response.data.data;
      } catch (err) {
        // Fallback to mock data since backend is not connected yet
        console.warn("Backend not available, using mock dashboard data");
        return {
          profile: { level: 2, streak: 5, careerGoal: 'Full Stack Developer', xp: 1250, communityScore: 450, progressPercentage: 65 },
          todayTasks: initialTasks,
          recommendations: recommendations
        };
      }
    },
    retry: false // Don't retry if it fails, just use mock data immediately
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
        <p className="text-red-500 font-bold mb-2">Error loading dashboard</p>
        <p className="text-gray-500 text-sm">Please try refreshing the page.</p>
      </div>
    );
  }

  const profile = dashboardData?.profile || {};
  const todayTasks = dashboardData?.todayTasks || tasks;
  const recommended = dashboardData?.recommendations || recommendations;

  const toggleTask = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const completedTasksCount = todayTasks.filter(t => t.completed).length;
  const progressPercentage = profile.progressPercentage || Math.round((completedTasksCount / todayTasks.length) * 100) || 0;

  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
      
      {/* Main Content Column */}
      <motion.div 
        className="xl:col-span-8 flex flex-col gap-8"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        
        {/* 1. Hero Card */}
        <motion.div variants={fadeUp} className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E9ECEF] shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#FF5722]/5 to-[#FF5722]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 group-hover:scale-110 transition-transform duration-700"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-[#0F172A] mb-2 tracking-tight">
                Good Morning, Shray 👋
              </h1>
              <p className="text-[#64748B] text-sm sm:text-base font-medium">Continue your growth journey.</p>
            </div>

            <div className="flex gap-4 sm:gap-6 bg-[#F8FAFC] p-4 rounded-2xl border border-[#E9ECEF]">
              <div className="flex flex-col">
                <span className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider mb-1">Level</span>
                <div className="flex items-center gap-1.5">
                  <Star size={16} className="text-[#F59E0B] fill-[#F59E0B]" />
                  <span className="text-base font-bold text-[#0F172A]">{profile.level || 1} Builder</span>
                </div>
              </div>
              <div className="w-px bg-[#E9ECEF]"></div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider mb-1">Streak</span>
                <div className="flex items-center gap-1.5">
                  <Flame size={16} className="text-[#EF4444] fill-[#EF4444]" />
                  <span className="text-base font-bold text-[#0F172A]">{profile.streak || 0} Days</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-[#E9ECEF] relative z-10">
            <div className="flex justify-between items-end mb-3">
              <div>
                <p className="text-xs font-bold text-[#64748B] uppercase tracking-wider mb-1">Current Goal</p>
                <p className="text-base font-bold text-[#0F172A]">{profile.careerGoal || 'AI Engineer'}</p>
              </div>
              <div className="text-right">
                <span className="text-2xl font-extrabold text-[#FF5722]">{progressPercentage}%</span>
                <p className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider">{profile.xp || 0} XP</p>
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="h-3 w-full bg-[#F1F5F9] rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "68%" }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-[#FF5722] to-[#FE6D4D] rounded-full relative"
              >
                <div className="absolute inset-0 bg-white/20 w-full animate-pulse"></div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* 2. Quick Actions */}
        <motion.div variants={fadeUp} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, i) => (
            <div key={i} className="bg-white p-5 rounded-2xl border border-[#E9ECEF] shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 cursor-pointer group">
              <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110", action.bg)}>
                {action.icon}
              </div>
              <h3 className="font-bold text-[#0F172A] mb-1">{action.title}</h3>
              <p className="text-xs text-[#64748B] font-medium">{action.desc}</p>
            </div>
          ))}
        </motion.div>

        {/* 3. My Journey (Timeline) */}
        <motion.div variants={fadeUp} className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E9ECEF] shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold font-heading text-[#0F172A]">My Journey</h2>
            <button className="text-sm font-semibold text-[#FF5722] hover:text-[#E64A19] flex items-center gap-1">
              View Full <ArrowRight size={16} />
            </button>
          </div>
          
          <div className="relative">
            {/* Horizontal Track line */}
            <div className="absolute top-5 left-0 w-full h-1 bg-[#F1F5F9] rounded-full hidden md:block z-0"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-6 gap-6 md:gap-0 relative z-10">
              {journeySteps.map((step, i) => (
                <div key={step.id} className="flex flex-row md:flex-col items-center gap-4 md:gap-3">
                  
                  {/* Status Indicator */}
                  <div className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center shrink-0 border-2 transition-colors z-10 bg-white",
                    step.status === 'completed' ? "border-[#22C55E] text-[#22C55E]" :
                    step.status === 'in-progress' ? "border-[#FF5722] text-[#FF5722] shadow-[0_0_15px_rgba(255,87,34,0.2)]" :
                    step.status === 'upcoming' ? "border-[#CBD5E1] text-[#94A3B8]" :
                    "border-[#F1F5F9] bg-[#F8FAFC] text-[#CBD5E1]"
                  )}>
                    {step.status === 'completed' ? <CheckCircle2 size={20} className="fill-[#22C55E]/10" /> :
                     step.status === 'in-progress' ? <Circle size={16} className="fill-[#FF5722] animate-pulse" /> :
                     <Circle size={12} className="fill-current" />}
                  </div>

                  {/* Desktop Connecting Line Fill (Visual trick) */}
                  {i > 0 && step.status !== 'locked' && step.status !== 'upcoming' && (
                    <div className="absolute top-5 left-0 h-1 bg-[#22C55E] -z-10 hidden md:block" style={{ width: `${(i / 5) * 100}%` }}></div>
                  )}

                  {/* Details */}
                  <div className="md:text-center flex-1">
                    <p className={cn(
                      "text-sm font-bold mb-1",
                      step.status === 'locked' ? "text-[#94A3B8]" : "text-[#0F172A]"
                    )}>{step.title}</p>
                    {step.date && (
                      <p className={cn(
                        "text-xs font-semibold",
                        step.status === 'in-progress' ? "text-[#FF5722]" : "text-[#64748B]"
                      )}>{step.date}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 4. Today's Tasks */}
          <motion.div variants={fadeUp} className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E9ECEF] shadow-sm flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold font-heading text-[#0F172A]">Today's Tasks</h2>
              <span className="text-sm font-bold text-[#FF5722] bg-[#FF5722]/10 px-3 py-1 rounded-full">
                {progressPercentage}% Done
              </span>
            </div>
            
            <div className="space-y-3 flex-1">
              {todayTasks.map(task => (
                <div 
                  key={task.id} 
                  onClick={() => toggleTask(task.id)}
                  className={cn(
                    "group flex items-center gap-4 p-4 rounded-2xl border transition-all cursor-pointer",
                    task.completed ? "bg-[#F8FAFC] border-[#E9ECEF]" : "bg-white border-[#E9ECEF] hover:border-[#FF5722]/30 hover:shadow-sm"
                  )}
                >
                  <div className={cn(
                    "w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors",
                    task.completed ? "border-[#22C55E] bg-[#22C55E]" : "border-[#CBD5E1] group-hover:border-[#FF5722]"
                  )}>
                    {task.completed && <CheckCircle2 size={16} className="text-white" />}
                  </div>
                  <div className="flex-1">
                    <p className={cn(
                      "text-sm font-bold transition-all",
                      task.completed ? "text-[#94A3B8] line-through" : "text-[#0F172A]"
                    )}>{task.text}</p>
                    <p className="text-[10px] uppercase tracking-wider font-bold text-[#64748B] mt-1">{task.category}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* 5. Recommended For You */}
          <motion.div variants={fadeUp} className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E9ECEF] shadow-sm flex flex-col">
            <h2 className="text-xl font-bold font-heading text-[#0F172A] mb-6">Recommended For You</h2>
            <div className="space-y-4 flex-1">
              {recommended.map((rec, i) => (
                <div key={i} className="flex items-center gap-4 p-4 rounded-2xl border border-[#E9ECEF] hover:shadow-md transition-shadow group cursor-pointer bg-white">
                  <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center shrink-0", rec.bg || 'bg-blue-50', rec.color || 'text-blue-500')}>
                    {rec.icon || <Star size={16} />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider mb-1">{rec.type}</p>
                    <h4 className="text-sm font-bold text-[#0F172A] truncate group-hover:text-[#FF5722] transition-colors">{rec.title}</h4>
                    <p className="text-xs text-[#64748B] truncate">{rec.subtitle}</p>
                  </div>
                  <ChevronRight size={20} className="text-[#CBD5E1] group-hover:text-[#FF5722] group-hover:translate-x-1 transition-all" />
                </div>
              ))}
            </div>
          </motion.div>
        </div>

      </motion.div>

      {/* Right Insights Panel */}
      <motion.div 
        className="xl:col-span-4 flex flex-col gap-8"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        
        {/* Stats Grid */}
        <motion.div variants={fadeUp} className="grid grid-cols-2 gap-4">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white p-5 rounded-2xl border border-[#E9ECEF] shadow-sm flex flex-col items-center text-center hover:shadow-md transition-shadow">
              <div className={cn("mb-3", stat.color)}>{stat.icon}</div>
              <span className="text-2xl font-extrabold text-[#0F172A] mb-1">{stat.value}</span>
              <span className="text-xs font-bold text-[#64748B] uppercase tracking-wider">{stat.label}</span>
            </div>
          ))}
          <div className="col-span-2 bg-gradient-to-br from-[#0F172A] to-[#1E293B] p-5 rounded-2xl border border-[#334155] shadow-sm flex items-center justify-between text-white relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF5722]/20 blur-2xl rounded-full translate-x-1/2 -translate-y-1/2"></div>
            <div className="relative z-10">
              <span className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider block mb-1">Community Score</span>
              <span className="text-3xl font-extrabold text-[#FF5722]">{profile.communityScore || 0}<span className="text-lg text-white/50 ml-1">pts</span></span>
            </div>
            <div className="relative z-10 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center">
              <TrendingUp size={24} className="text-[#22C55E]" />
            </div>
          </div>
        </motion.div>

        {/* Weekly Goals / Calendar Snapshot */}
        <motion.div variants={fadeUp} className="bg-white rounded-3xl p-6 border border-[#E9ECEF] shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold font-heading text-[#0F172A]">Weekly Goals</h3>
            <button className="text-[#FF5722] hover:bg-[#FF5722]/10 p-2 rounded-lg transition-colors">
              <Calendar size={18} />
            </button>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center text-sm">
              <span className="font-semibold text-[#64748B]">Complete 5 Tasks</span>
              <span className="font-bold text-[#0F172A]">3/5</span>
            </div>
            <div className="h-2 w-full bg-[#F1F5F9] rounded-full overflow-hidden">
              <div className="h-full bg-[#3B82F6] rounded-full" style={{ width: "60%" }}></div>
            </div>

            <div className="flex justify-between items-center text-sm pt-2">
              <span className="font-semibold text-[#64748B]">Learn 10 Hours</span>
              <span className="font-bold text-[#0F172A]">8/10</span>
            </div>
            <div className="h-2 w-full bg-[#F1F5F9] rounded-full overflow-hidden">
              <div className="h-full bg-[#A855F7] rounded-full" style={{ width: "80%" }}></div>
            </div>
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div variants={fadeUp} className="bg-white rounded-3xl p-6 border border-[#E9ECEF] shadow-sm flex-1">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold font-heading text-[#0F172A]">Recent Activity</h3>
            <Activity size={18} className="text-[#CBD5E1]" />
          </div>
          
          <div className="space-y-6 relative before:absolute before:inset-0 before:ml-2.5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-[#E9ECEF] before:to-transparent">
            {recentActivity.map((activity, i) => (
              <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                {/* Icon Marker */}
                <div className="flex items-center justify-center w-6 h-6 rounded-full border-2 border-white bg-[#F1F5F9] text-[#64748B] group-hover:bg-[#FF5722] group-hover:text-white transition-colors shadow-sm shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 relative z-10">
                  {activity.icon}
                </div>
                
                {/* Content */}
                <div className="w-[calc(100%-2.5rem)] md:w-[calc(50%-1.5rem)] bg-white p-3 rounded-xl border border-[#E9ECEF] shadow-sm group-hover:shadow-md transition-shadow">
                  <p className="text-sm font-bold text-[#0F172A] mb-1">{activity.text}</p>
                  <div className="flex items-center gap-1 text-[10px] font-bold text-[#94A3B8] uppercase tracking-wider">
                    <Clock size={12} />
                    {activity.time}
                  </div>
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
