import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Filter, Star, MapPin, GraduationCap, Clock, Award, Check, ChevronDown
} from 'lucide-react';
import { Avatar } from '../../../components/ui/Avatar';
import { cn } from '../../../lib/utils';

const filters = {
  expertise: ['AI', 'ML', 'Web Development', 'Competitive Programming', 'DSA', 'System Design', 'Research'],
  experienceLevel: ['Student', 'Alumni', 'Professional']
};

const mentors = [
  {
    id: 'm1', name: 'Rahul Sharma', role: 'Software Engineer', company: 'Google', 
    experience: '3 YOE', type: 'Alumni', rating: 4.9, 
    education: 'IIT Delhi • B.Tech Computer Science',
    achievement: 'SIH National Winner',
    status: 'Available',
    avatar: 'Rahul',
    skills: ['React', 'Node.js', 'System Design', '+1']
  },
  {
    id: 'm2', name: 'Neha Kapoor', role: 'Research Intern', company: 'OpenAI', 
    experience: '2 YOE', type: 'Student', rating: 5.0, 
    education: 'BITS Pilani • M.Sc Data Science',
    achievement: 'Published at NeurIPS',
    status: 'Available',
    avatar: 'Neha',
    skills: ['PyTorch', 'NLP', 'Machine Learning', '+1']
  },
  {
    id: 'm3', name: 'Arjun Reddy', role: 'Founder', company: 'BuildSpace', 
    experience: '4 YOE', type: 'Founder', rating: 4.8, 
    education: 'IIT Bombay • B.Tech Electrical',
    achievement: 'Raised $2M Seed',
    status: 'Booked',
    avatar: 'Arjun',
    skills: ['Product Management', 'Growth', 'Next.js', '+1']
  },
];

export default function MentorHub() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="flex-1 overflow-y-auto custom-scrollbar h-full bg-[#FFFFFF]">
      
      {/* Top Header */}
      <div className="bg-[#FFFFFF] border-b border-[#E9ECEF] pt-8 pb-6 px-6 lg:px-10">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h1 className="text-3xl font-extrabold text-[#000000] tracking-tight mb-2">
              Find Your Mentor
            </h1>
            <p className="text-[#0F172A]/80 text-sm font-semibold">
              Browse {mentors.length} highly vetted professionals.
            </p>
          </div>

          <div className="relative w-full md:w-[480px]">
            <div className="flex items-center bg-[#FFFFFF] border border-[#E9ECEF] rounded-full shadow-sm focus-within:border-[#FE6D4D] transition-all overflow-hidden relative z-20">
              <div className="pl-4 pr-2 flex items-center shrink-0">
                <Search className="text-[#0F172A]/50" size={18} />
              </div>
              <input 
                type="text" 
                placeholder="Search by name, company..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 py-2.5 px-2 text-sm font-medium text-[#000000] placeholder:text-[#0F172A]/50 focus:outline-none bg-transparent"
              />
              <div className="h-6 w-px bg-[#E9ECEF] shrink-0 mx-1"></div>
              <button 
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-1.5 px-4 py-2.5 text-sm font-bold text-[#0F172A] hover:bg-[#F1F5F9] transition-colors"
              >
                <Filter size={16} className={showFilters ? "text-[#FE6D4D]" : ""} />
                Filters
                <ChevronDown size={14} className={cn("transition-transform duration-200", showFilters ? "rotate-180 text-[#FE6D4D]" : "")} />
              </button>
            </div>

            {/* Filter Dropdown */}
            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 top-[calc(100%+12px)] w-[320px] bg-[#FFFFFF] border border-[#E9ECEF] rounded-2xl shadow-xl z-50 p-5 overflow-hidden"
                >
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-xs font-bold text-[#0F172A]/60 uppercase tracking-wider mb-3">Expertise</h4>
                      <div className="space-y-2.5 max-h-40 overflow-y-auto custom-scrollbar pr-2">
                        {filters.expertise.map((item, i) => (
                          <label key={i} className="flex items-center gap-3 cursor-pointer group">
                            <div className="w-4 h-4 rounded border border-[#B0B0B0] flex items-center justify-center group-hover:border-[#FE6D4D] transition-colors"></div>
                            <span className="text-sm font-semibold text-[#0F172A]/70 group-hover:text-[#000000]">{item}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                    <div className="pt-4 border-t border-[#E9ECEF]">
                      <h4 className="text-xs font-bold text-[#0F172A]/60 uppercase tracking-wider mb-3">Experience Level</h4>
                      <div className="space-y-2.5">
                        {filters.experienceLevel.map((item, i) => (
                          <label key={i} className="flex items-center gap-3 cursor-pointer group">
                            <div className="w-4 h-4 rounded border border-[#B0B0B0] flex items-center justify-center group-hover:border-[#FE6D4D] transition-colors"></div>
                            <span className="text-sm font-semibold text-[#0F172A]/70 group-hover:text-[#000000]">{item}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Click away overlay */}
            {showFilters && (
              <div 
                className="fixed inset-0 z-10" 
                onClick={() => setShowFilters(false)}
              />
            )}
          </div>
        </div>
      </div>

      <div className="p-6 lg:p-10 max-w-[1400px] mx-auto pb-24">
        
        {/* Main Content - Mentor List */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col gap-4">
            {mentors.map(mentor => (
              <div key={mentor.id} className="bg-[#FFFFFF] rounded-2xl border border-[#E9ECEF] p-5 shadow-sm hover:shadow-md hover:border-[#FE6D4D] transition-all flex flex-col lg:flex-row items-start lg:items-center gap-5">
                
                {/* Avatar */}
                <div className="shrink-0 flex justify-between w-full lg:w-auto items-start">
                  <Avatar size="xl" src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${mentor.avatar}`} className="border border-[#E9ECEF] shadow-sm bg-[#FFFFFF]" />
                  
                  {/* Mobile Badge */}
                  <div className="lg:hidden flex flex-col items-end gap-2">
                    {mentor.status === 'Available' ? (
                      <span className="bg-[#FFFFFF] text-[#FF5722] text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 border border-[#FE6D4D]">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#FF5722]"></div> Available
                      </span>
                    ) : (
                      <span className="bg-[#FFFFFF] text-[#0F172A]/60 text-[10px] font-bold px-2.5 py-1 rounded-full border border-[#E9ECEF]">
                        Booked
                      </span>
                    )}
                  </div>
                </div>

                {/* Info Container */}
                <div className="flex-1 min-w-0 flex flex-row flex-wrap items-center gap-x-6 gap-y-4 w-full">
                  
                  {/* Name & Role */}
                  <div className="w-[200px] shrink-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg font-bold text-[#000000] truncate">{mentor.name}</h3>
                      <div className="flex items-center gap-1 text-xs font-bold text-[#000000]">
                        <Star size={14} className="text-[#FF5722] fill-current" /> {mentor.rating}
                      </div>
                    </div>
                    <p className="text-[#FF5722] text-sm font-bold truncate">{mentor.role} @ {mentor.company}</p>
                  </div>

                  {/* Details */}
                  <div className="hidden sm:flex flex-col gap-1.5 w-[200px] shrink-0">
                    <div className="flex items-center gap-2 text-xs font-bold text-[#0F172A]/80">
                      <MapPin size={14} className="shrink-0 text-[#FE6D4D]" />
                      <span className="truncate">{mentor.education}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-bold text-[#0F172A]/80">
                      <Award size={14} className="shrink-0 text-[#FE6D4D]" />
                      <span className="truncate">{mentor.achievement}</span>
                    </div>
                  </div>

                  {/* Skills Tags */}
                  <div className="flex flex-wrap gap-1.5 flex-1 min-w-[180px]">
                    {mentor.skills.map(skill => (
                      <span key={skill} className="text-[10px] font-bold text-[#64748B] bg-[#F1F5F9] px-2 py-1 rounded whitespace-nowrap">
                        {skill}
                      </span>
                    ))}
                  </div>

                </div>

                {/* Desktop Action & Badge */}
                <div className="hidden lg:flex flex-col items-end gap-3 shrink-0 ml-auto pl-4 border-l border-[#E9ECEF]">
                  {mentor.status === 'Available' ? (
                    <span className="bg-[#FFFFFF] text-[#FF5722] text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 border border-[#FE6D4D]">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#FF5722]"></div> Available
                    </span>
                  ) : (
                    <span className="bg-[#FFFFFF] text-[#0F172A]/60 text-[10px] font-bold px-2.5 py-1 rounded-full border border-[#E9ECEF]">
                      Booked
                    </span>
                  )}
                  <button className="px-4 py-2 bg-[#FF5722] text-white text-sm font-bold rounded-xl hover:bg-[#FE6D4D] transition-colors whitespace-nowrap">
                    View Profile
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
