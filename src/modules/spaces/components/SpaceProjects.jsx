import { Target, Users, ArrowRight, Plus } from 'lucide-react';

const projects = [
  { id: '1', title: 'AI Resume Analyzer', desc: 'NLP-powered resume parser that grades against JD.', difficulty: 'Advanced', team: 4, open: 2, xp: 1200, color: 'bg-[#3B82F6]' },
  { id: '2', title: 'Mock Interview Platform', desc: 'P2P platform for scheduling and recording mock interviews.', difficulty: 'Intermediate', team: 3, open: 0, xp: 800, color: 'bg-[#A855F7]' },
];

export default function SpaceProjects() {
  return (
    <div className="flex-1 overflow-y-auto custom-scrollbar p-6 bg-[#F8FAFC]">
      <div className="max-w-5xl mx-auto space-y-6">
        
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-extrabold text-[#0F172A] flex items-center gap-2 mb-1">
              <Target className="text-[#3B82F6]" size={24} /> Space Projects
            </h2>
            <p className="text-sm font-semibold text-[#64748B]">Projects currently being built by space members.</p>
          </div>
          <button className="bg-[#3B82F6] text-white px-4 py-2 rounded-xl font-bold hover:bg-[#2563EB] transition-colors flex items-center gap-2 shadow-sm">
            <Plus size={18} /> New Project
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map(project => (
            <div key={project.id} className="bg-white rounded-3xl border border-[#E9ECEF] p-6 hover:shadow-md hover:border-[#3B82F6]/30 transition-all group flex flex-col cursor-pointer">
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl ${project.color} flex items-center justify-center shrink-0`}>
                  <Target size={24} className="text-white" />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider bg-[#F1F5F9] px-2 py-1 rounded-lg">
                    {project.difficulty}
                  </span>
                </div>
              </div>
              
              <h3 className="text-lg font-bold text-[#0F172A] mb-2 group-hover:text-[#3B82F6] transition-colors">{project.title}</h3>
              <p className="text-sm text-[#64748B] mb-6 line-clamp-2 leading-relaxed">{project.desc}</p>
              
              <div className="mt-auto pt-4 border-t border-[#E9ECEF] flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm font-bold text-[#64748B]">
                  <span className="flex items-center gap-1.5"><Users size={16} /> {project.team} Team</span>
                  {project.open > 0 ? (
                    <span className="text-[#22C55E] flex items-center gap-1.5">{project.open} Open Roles</span>
                  ) : (
                    <span className="text-[#94A3B8]">Team Full</span>
                  )}
                </div>
                <div className="text-sm font-bold text-[#3B82F6] group-hover:translate-x-1 transition-transform flex items-center gap-1">
                  View <ArrowRight size={16} />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
