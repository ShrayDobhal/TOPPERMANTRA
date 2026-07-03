import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, Filter, Star, MapPin, GraduationCap, Clock, Award, Check
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

          <div className="relative w-full md:w-[400px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#0F172A]/50" size={18} />
            <input 
              type="text" 
              placeholder="Search by name, company..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#FFFFFF] border border-[#E9ECEF] rounded-full py-2.5 pl-11 pr-4 text-sm font-medium text-[#000000] placeholder:text-[#0F172A]/50 focus:outline-none focus:border-[#FE6D4D] shadow-sm transition-all"
            />
          </div>
        </div>
      </div>

      <div className="p-6 lg:p-10 max-w-[1400px] mx-auto flex flex-col lg:flex-row gap-8 pb-24">
        
        {/* Left Sidebar Filters */}
        <div className="w-full lg:w-[280px] shrink-0 bg-[#FFFFFF] border border-[#E9ECEF] rounded-2xl p-6 shadow-sm self-start">
          <div className="flex items-center gap-2 mb-6">
            <Filter size={20} className="text-[#000000]" />
            <h3 className="text-lg font-bold text-[#000000]">Filters</h3>
          </div>

          <div className="space-y-6">
            <div>
              <h4 className="text-xs font-bold text-[#0F172A]/60 uppercase tracking-wider mb-4">Expertise</h4>
              <div className="space-y-3 h-48 overflow-y-auto custom-scrollbar pr-2">
                {filters.expertise.map((item, i) => (
                  <label key={i} className="flex items-center gap-3 cursor-pointer group">
                    <div className="w-4 h-4 rounded border border-[#B0B0B0] flex items-center justify-center group-hover:border-[#FE6D4D] transition-colors">
                      {/* Check icon would go here if selected */}
                    </div>
                    <span className="text-sm font-semibold text-[#0F172A]/70 group-hover:text-[#000000]">{item}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-[#E9ECEF]">
              <h4 className="text-xs font-bold text-[#0F172A]/60 uppercase tracking-wider mb-4">Experience Level</h4>
              <div className="space-y-3">
                {filters.experienceLevel.map((item, i) => (
                  <label key={i} className="flex items-center gap-3 cursor-pointer group">
                    <div className="w-4 h-4 rounded border border-[#B0B0B0] flex items-center justify-center group-hover:border-[#FE6D4D] transition-colors">
                    </div>
                    <span className="text-sm font-semibold text-[#0F172A]/70 group-hover:text-[#000000]">{item}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Content - Mentor Grid */}
        <div className="flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {mentors.map(mentor => (
              <div key={mentor.id} className="bg-[#FFFFFF] rounded-3xl border border-[#E9ECEF] p-6 shadow-sm hover:shadow-md hover:border-[#FE6D4D] transition-all flex flex-col relative">
                
                {/* Status Badge */}
                <div className="absolute top-6 right-6">
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

                {/* Avatar */}
                <div className="mb-4 mt-2 self-start flex justify-center w-full">
                  <Avatar size="2xl" src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${mentor.avatar}`} className="border border-[#E9ECEF] shadow-sm bg-[#FFFFFF]" />
                </div>

                {/* Info Header */}
                <div className="mb-4 text-center sm:text-left">
                  <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-2 mb-1">
                    <h3 className="text-xl font-bold text-[#000000]">{mentor.name}</h3>
                    <div className="flex items-center gap-1 text-sm font-bold text-[#000000] sm:ml-auto">
                      <Star size={16} className="text-[#FF5722] fill-current" /> {mentor.rating}
                    </div>
                  </div>
                  <p className="text-[#FF5722] text-sm font-bold">{mentor.role} @ {mentor.company}</p>
                </div>

                {/* Details List */}
                <div className="space-y-2.5 mb-6">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#0F172A]/80">
                    <MapPin size={14} className="shrink-0 text-[#FE6D4D]" />
                    <span>{mentor.education}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-bold text-[#0F172A]/80">
                    <Clock size={14} className="shrink-0 text-[#FE6D4D]" />
                    <span>{mentor.experience} • {mentor.type}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-bold text-[#0F172A]/80">
                    <Award size={14} className="shrink-0 text-[#FE6D4D]" />
                    <span>{mentor.achievement}</span>
                  </div>
                </div>

                {/* Skills Tags */}
                <div className="mt-auto flex flex-wrap gap-2 pt-4">
                  {mentor.skills.map(skill => (
                    <span key={skill} className="text-[11px] font-bold text-[#64748B] bg-[#F1F5F9] px-2 py-1 rounded">
                      {skill}
                    </span>
                  ))}
                </div>

              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
