import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { 
  Search, Filter, Star, Sparkles, Building, Briefcase, ChevronRight, UserPlus
} from 'lucide-react';
import { Avatar } from '../../../components/ui/Avatar';
import { cn } from '../../../lib/utils';

const categories = [
  'Software Engineering', 'Product Management', 'Data Science', 'Design', 'Startup', 'Cloud'
];

const mentors = [
  {
    id: 'm1', name: 'Alex Kumar', role: 'Senior Software Engineer', company: 'Google', 
    experience: '8 YOE', rating: 4.9, reviews: 124, price: 'Free',
    avatar: 'Alex', logo: 'https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg',
    match: 96, matchReason: 'Ex-Amazon, SWE Expert', skills: ['System Design', 'React', 'Node.js']
  },
  {
    id: 'm2', name: 'Sarah Chen', role: 'Product Manager', company: 'Atlassian', 
    experience: '5 YOE', rating: 4.8, reviews: 89, price: '₹499/session',
    avatar: 'Sarah', logo: 'https://upload.wikimedia.org/wikipedia/commons/c/c5/Atlassian_logo.svg',
    match: 85, matchReason: 'Matches PM interest', skills: ['Product Strategy', 'Agile', 'Figma']
  },
  {
    id: 'm3', name: 'Rahul Dev', role: 'SDE II', company: 'Amazon', 
    experience: '4 YOE', rating: 4.9, reviews: 210, price: 'Free',
    avatar: 'Rahul', logo: 'https://upload.wikimedia.org/wikipedia/commons/4/4a/Amazon_icon.svg',
    match: 92, matchReason: 'Target Company Match', skills: ['DSA', 'Java', 'AWS']
  },
];

export default function MentorHub() {
  const [searchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') || 'recommended';
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="flex-1 overflow-y-auto custom-scrollbar h-full relative">
      
      {/* Sticky Header & Search */}
      <div className="sticky top-0 z-50 bg-[#F8FAFC]/80 backdrop-blur-xl border-b border-[#E9ECEF] p-4 lg:p-6 shadow-sm">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center gap-4">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#64748B]" size={20} />
            <input 
              type="text" 
              placeholder="Search mentors by name, company, or skills..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-[#E9ECEF] rounded-2xl py-3.5 pl-12 pr-4 text-sm font-bold text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#A855F7] focus:ring-4 focus:ring-[#A855F7]/10 transition-all shadow-sm"
            />
          </div>
          <button className="w-full sm:w-auto bg-white border border-[#E9ECEF] text-[#0F172A] px-5 py-3.5 rounded-2xl font-bold hover:bg-[#F8FAFC] transition-colors flex items-center justify-center gap-2 shadow-sm shrink-0">
            <Filter size={18} /> Filters
          </button>
        </div>
      </div>

      <div className="p-6 lg:p-10 max-w-6xl mx-auto space-y-12 pb-24">
        
        {/* Categories Carousel */}
        <section>
          <div className="flex items-center gap-3 overflow-x-auto custom-scrollbar pb-2">
            {categories.map((cat, i) => (
              <button key={i} className="shrink-0 bg-white border border-[#E9ECEF] text-[#64748B] hover:text-[#0F172A] hover:border-[#A855F7]/30 px-4 py-2 rounded-xl text-sm font-bold transition-all shadow-sm">
                {cat}
              </button>
            ))}
          </div>
        </section>

        {/* AI Recommendations */}
        {activeTab === 'recommended' && (
          <section>
            <h2 className="text-xl font-extrabold text-[#0F172A] mb-6 flex items-center gap-2">
              <Sparkles className="text-[#A855F7]" size={24} /> Recommended For You
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mentors.map(mentor => (
                <div key={mentor.id} className="bg-white rounded-3xl border border-[#E9ECEF] p-6 shadow-sm hover:shadow-md hover:border-[#A855F7]/30 transition-all group flex flex-col relative overflow-hidden">
                  
                  {/* Match Badge */}
                  <div className="absolute top-0 right-0 bg-gradient-to-bl from-[#A855F7]/10 to-transparent w-32 h-32 blur-2xl"></div>
                  <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-[#A855F7]/10 text-[#A855F7] px-2.5 py-1 rounded-lg border border-[#A855F7]/20 z-10">
                    <Sparkles size={12} />
                    <span className="text-[10px] font-extrabold uppercase tracking-wider">{mentor.match}% Match</span>
                  </div>

                  {/* Profile Header */}
                  <div className="flex flex-col items-center text-center mb-6 relative z-10">
                    <div className="relative mb-4 group-hover:scale-105 transition-transform">
                      <Avatar size="xl" src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${mentor.avatar}`} />
                      <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-white rounded-full p-1 shadow-sm border border-[#E9ECEF]">
                        <img src={mentor.logo} alt={mentor.company} className="w-full h-full object-contain" />
                      </div>
                    </div>
                    <h3 className="text-lg font-extrabold text-[#0F172A] group-hover:text-[#A855F7] transition-colors">{mentor.name}</h3>
                    <p className="text-sm font-bold text-[#64748B]">{mentor.role} at {mentor.company}</p>
                  </div>
                  
                  {/* Stats */}
                  <div className="flex items-center justify-center gap-4 mb-6 pb-6 border-b border-[#E9ECEF]">
                    <div className="text-center">
                      <p className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-wider mb-1">Experience</p>
                      <p className="text-sm font-bold text-[#0F172A]">{mentor.experience}</p>
                    </div>
                    <div className="w-px h-8 bg-[#E9ECEF]"></div>
                    <div className="text-center">
                      <p className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-wider mb-1">Rating</p>
                      <p className="text-sm font-bold text-[#0F172A] flex items-center gap-1 justify-center"><Star size={14} className="text-[#F59E0B] fill-current"/> {mentor.rating}</p>
                    </div>
                    <div className="w-px h-8 bg-[#E9ECEF]"></div>
                    <div className="text-center">
                      <p className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-wider mb-1">Price</p>
                      <p className="text-sm font-bold text-[#22C55E]">{mentor.price}</p>
                    </div>
                  </div>

                  {/* Skills */}
                  <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
                    {mentor.skills.map(skill => (
                      <span key={skill} className="text-[11px] font-bold text-[#64748B] bg-[#F1F5F9] px-2 py-1 rounded-md">
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="mt-auto flex items-center gap-3">
                    <Link to={`/dashboard/mentors/${mentor.id}`} className="flex-1 bg-[#F8FAFC] text-[#0F172A] border border-[#E9ECEF] py-2.5 rounded-xl text-sm font-bold text-center hover:bg-[#A855F7] hover:text-white hover:border-[#A855F7] transition-colors shadow-sm">
                      View Profile
                    </Link>
                    <button className="shrink-0 p-2.5 text-[#94A3B8] border border-[#E9ECEF] rounded-xl hover:text-[#A855F7] hover:bg-[#F1F5F9] transition-colors shadow-sm">
                      <UserPlus size={18} />
                    </button>
                  </div>

                </div>
              ))}
            </div>
          </section>
        )}

      </div>
    </div>
  );
}
