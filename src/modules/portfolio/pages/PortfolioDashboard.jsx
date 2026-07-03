import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, FileText } from 'lucide-react';
import useGamificationStore from '../../../store/useGamificationStore';
import PointsBank from '../components/PointsBank';
import BadgeShowcase from '../components/BadgeShowcase';
import ContributionGraph from '../components/ContributionGraph';
import ProjectPortfolio from '../components/ProjectPortfolio';

export default function PortfolioDashboard() {
  const fetchGamification = useGamificationStore((s) => s.fetchGamification);
  
  useEffect(() => {
    fetchGamification();
  }, [fetchGamification]);

  return (
    <div className="flex-1 overflow-y-auto custom-scrollbar h-full bg-[#F8FAFC]">
      
      {/* Header */}
      <div className="bg-white border-b border-[#E9ECEF] p-6 lg:p-10 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-[#0F172A] mb-2 font-heading tracking-tight">Portfolio & Gamification</h1>
            <p className="text-sm font-semibold text-[#64748B]">Your digital resume built automatically through your ecosystem activity.</p>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/@shraydobhal" target="_blank" className="bg-white border border-[#E9ECEF] text-[#0F172A] px-5 py-2.5 rounded-xl font-bold hover:bg-[#F8FAFC] transition-colors shadow-sm flex items-center gap-2">
              <ExternalLink size={18} /> View Public Profile
            </Link>
            <Link to="/dashboard/resume" className="bg-[#0F172A] text-white px-5 py-2.5 rounded-xl font-bold hover:bg-[#1E293B] transition-colors shadow-sm flex items-center gap-2">
              <FileText size={18} /> Resume Builder
            </Link>
          </div>
        </div>
      </div>

      <div className="p-6 lg:p-10 max-w-6xl mx-auto space-y-8 pb-24">
        
        {/* Phase 5 Elements */}
        
        {/* Top: Points Bank (Big Animated Number) */}
        <section>
          <PointsBank />
        </section>

        {/* Middle: Badges & Heatmap */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <BadgeShowcase />
          <ContributionGraph />
        </div>

        {/* Bottom: Project Portfolio (Verified Subparts) */}
        <section>
          <ProjectPortfolio />
        </section>

      </div>
    </div>
  );
}
