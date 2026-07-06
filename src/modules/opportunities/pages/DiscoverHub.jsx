import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { 
  Search, Sparkles, MapPin, Briefcase, IndianRupee, Clock, 
  Bookmark, ExternalLink, ChevronRight, Filter, Loader2
} from 'lucide-react';
import { cn } from '../../../lib/utils';
import useDiscoverStore from '../../../store/useDiscoverStore';

export default function DiscoverHub() {
  const [searchParams] = useSearchParams();
  const categoryFilter = searchParams.get('category');
  
  const { opportunities, featured, loading, fetchOpportunities } = useDiscoverStore();

  useEffect(() => {
    fetchOpportunities();
  }, [fetchOpportunities]);
  
  const [searchQuery, setSearchQuery] = useState('');

  const displayOpportunities = categoryFilter 
    ? opportunities.filter(opp => opp.type.toLowerCase() === categoryFilter.toLowerCase() || categoryFilter === 'jobs' && opp.type === 'Job')
    : opportunities;

  return (
    <div className="flex-1 overflow-y-auto custom-scrollbar h-full relative">
      
      {/* Sticky Search Header */}
      <div className="sticky top-0 z-50 bg-[#F8FAFC]/80 backdrop-blur-xl border-b border-[#E9ECEF] p-4 lg:p-6 shadow-sm">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center gap-4">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#64748B]" size={20} />
            <input 
              type="text" 
              placeholder="Search by role, company, or technology..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-[#E9ECEF] rounded-2xl py-3.5 pl-12 pr-4 text-sm font-bold text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#3B82F6] focus:ring-4 focus:ring-[#3B82F6]/10 transition-all shadow-sm"
            />
          </div>
          <button className="w-full sm:w-auto bg-white border border-[#E9ECEF] text-[#0F172A] px-5 py-3.5 rounded-2xl font-bold hover:bg-[#F8FAFC] transition-colors flex items-center justify-center gap-2 shadow-sm shrink-0">
            <Filter size={18} /> Filters
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex-1 flex items-center justify-center p-20">
          <Loader2 className="w-8 h-8 animate-spin text-[#3B82F6]" />
        </div>
      ) : (
      <div className="p-6 lg:p-10 max-w-6xl mx-auto space-y-12 pb-24">
        
        {/* Featured Opportunities (Only show if no category filter) */}
        {!categoryFilter && (
          <section>
            <h2 className="text-xl font-extrabold text-[#0F172A] mb-6 flex items-center gap-2">
              <Sparkles className="text-[#F59E0B]" size={24} /> Top Featured
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {featured.map(item => (
                <Link key={item.id} to={`/dashboard/opportunities/${item.id}`} className={cn("rounded-3xl p-6 md:p-8 border border-[#E9ECEF] shadow-sm hover:shadow-md transition-all group flex flex-col items-start cursor-pointer relative overflow-hidden", item.bg)}>
                  <div className="w-14 h-14 bg-white rounded-2xl p-2 mb-6 shadow-sm flex items-center justify-center relative z-10 group-hover:scale-110 transition-transform">
                    <img src={item.logo} alt={item.company} className="w-full h-full object-contain" />
                  </div>
                  <div className="relative z-10">
                    <span className="text-[10px] font-bold text-[#0F172A] uppercase tracking-wider bg-white/60 backdrop-blur-sm px-2 py-1 rounded-md border border-[#0F172A]/10 mb-3 inline-block">
                      {item.type}
                    </span>
                    <h3 className="text-xl md:text-2xl font-extrabold text-[#0F172A] leading-tight mb-2 group-hover:text-[#3B82F6] transition-colors">{item.title}</h3>
                    <p className="text-sm font-bold text-[#64748B] flex items-center gap-1.5"><Clock size={16}/> Deadline: {item.deadline}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Opportunity Feed */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-extrabold text-[#0F172A]">
              {categoryFilter ? `${categoryFilter.charAt(0).toUpperCase() + categoryFilter.slice(1)}` : 'Recommended For You'}
            </h2>
            <button className="text-sm font-bold text-[#3B82F6] hover:text-[#2563EB] transition-colors flex items-center gap-1">
              View All <ChevronRight size={16} />
            </button>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {displayOpportunities.map(opp => (
              <div key={opp.id} className="bg-white rounded-2xl border border-[#E9ECEF] p-5 md:p-6 shadow-sm hover:shadow-md hover:border-[#3B82F6]/30 transition-all flex flex-col group">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-[#F8FAFC] border border-[#E9ECEF] rounded-xl p-2 flex items-center justify-center shrink-0">
                      <img src={opp.logo} alt={opp.company} className="max-w-full max-h-full object-contain" />
                    </div>
                    <div>
                      <h3 className="text-base font-extrabold text-[#0F172A] group-hover:text-[#3B82F6] transition-colors line-clamp-1">{opp.title}</h3>
                      <p className="text-sm font-semibold text-[#64748B]">{opp.company}</p>
                    </div>
                  </div>
                  {opp.isMatch && (
                    <div className="shrink-0 flex items-center gap-1.5 bg-[#22C55E]/10 text-[#22C55E] px-2.5 py-1 rounded-lg border border-[#22C55E]/20">
                      <Sparkles size={14} />
                      <span className="text-[11px] font-extrabold uppercase tracking-wider">{opp.match}% Match</span>
                    </div>
                  )}
                </div>
                
                <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-[#64748B] mb-5">
                  <span className="flex items-center gap-1.5"><MapPin size={14}/> {opp.location}</span>
                  <span className="flex items-center gap-1.5"><IndianRupee size={14}/> {opp.stipend}</span>
                  <span className="flex items-center gap-1.5"><Briefcase size={14}/> {opp.duration}</span>
                </div>
                
                <div className="flex flex-wrap items-center gap-2 mb-6">
                  {opp.skills.map(skill => (
                    <span key={skill} className="text-xs font-bold text-[#0F172A] bg-[#F1F5F9] px-2.5 py-1 rounded-lg">
                      {skill}
                    </span>
                  ))}
                </div>
                
                <div className="mt-auto flex items-center gap-3 pt-4 border-t border-[#E9ECEF]">
                  <Link to={`/dashboard/opportunities/${opp.id}`} className="flex-1 bg-[#F8FAFC] text-[#0F172A] border border-[#E9ECEF] py-2.5 rounded-xl text-sm font-bold text-center hover:bg-[#3B82F6] hover:text-white hover:border-[#3B82F6] transition-colors shadow-sm">
                    View Details
                  </Link>
                  <button className="shrink-0 p-2.5 text-[#94A3B8] border border-[#E9ECEF] rounded-xl hover:text-[#3B82F6] hover:bg-[#F1F5F9] transition-colors shadow-sm">
                    <Bookmark size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
      )}
    </div>
  );
}
